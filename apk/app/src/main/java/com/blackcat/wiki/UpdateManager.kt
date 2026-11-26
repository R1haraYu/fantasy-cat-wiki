package com.blackcat.wiki

import android.content.Context
import org.json.JSONObject
import java.io.BufferedInputStream
import java.io.File
import java.io.FileOutputStream
import java.net.HttpURLConnection
import java.net.URL
import java.util.zip.ZipFile

/**
 * Pulls latest.json from GitHub, downloads the site zip, verifies SHA-256,
 * verifies every file against site_manifest.json, then switches the active
 * version atomically and deletes the previous version.
 */
class UpdateManager(
    private val context: Context,
    private val site: SiteRepository
) {
    data class Result(val updated: Boolean, val message: String)

    fun checkAsync(callback: (Result) -> Unit) {
        Thread {
            val result = try {
                checkNow()
            } catch (e: Exception) {
                android.util.Log.e("BlackCatWiki", "update check failed", e)
                Result(false, "离线使用：${e.message ?: "更新检查失败"}")
            }
            callback(result)
        }.start()
    }

    private fun checkNow(): Result {
        val url = BuildConfig.UPDATE_MANIFEST_URL
        if (url.contains("OWNER/REPO") || !url.startsWith("https://")) {
            return Result(false, "未配置GitHub更新地址，使用内置离线内容")
        }

        val latestText = fetchText(url, 2 * 1024 * 1024)
        val latest = JSONObject(latestText)
        val remoteVersion = latest.optString("version")
        val remoteManifestSha = latest.optString("manifestSha256")
        if (remoteVersion.isBlank() || remoteManifestSha.isBlank()) {
            return Result(false, "latest.json缺少version/manifestSha256")
        }

        val minApp = latest.optString("minAppVersion", "0")
        if (compareVersion(BuildConfig.APP_VERSION, minApp) < 0) {
            return Result(false, "需要先安装新版APK：$minApp")
        }

        // If the release publishes an APK hash, verify the installed APK too.
        var apkNotice = ""
        val apkSha = latest.optString("apkSha256")
        if (apkSha.isNotBlank()) {
            val installed = File(context.applicationInfo.sourceDir)
            val installedSha = SiteRepository.sha256(installed)
            if (!installedSha.equals(apkSha, true)) {
                // Do not block a Wiki content update just because the shell APK
                // was signed/built separately. Only surface the APK mismatch.
                apkNotice = "；APK不是发布版，Wiki内容仍会更新"
            }
        }

        val active = site.active()
        if (active.version == remoteVersion && active.manifestSha256.equals(remoteManifestSha, true)) {
            return Result(false, "已是最新内容：${active.version}$apkNotice")
        }

        val packageUrl = latest.optString("packageUrl")
        val packageSha = latest.optString("packageSha256")
        if (!packageUrl.startsWith("https://") || packageSha.isBlank()) {
            return Result(false, "latest.json缺少packageUrl/packageSha256")
        }

        android.util.Log.i("BlackCatWiki", "update available: ${active.version} -> $remoteVersion")
        val download = site.zipFile()
        downloadFile(packageUrl, download)
        val actualPackageSha = SiteRepository.sha256(download)
        if (!actualPackageSha.equals(packageSha, true)) {
            download.delete()
            return Result(false, "更新包SHA-256不匹配")
        }

        val staging = site.stagingDir()
        unzip(download, staging)
        download.delete()

        val manifestFile = File(staging, SiteRepository.MANIFEST)
        if (!manifestFile.isFile) {
            staging.deleteRecursively()
            return Result(false, "更新包缺少site_manifest.json")
        }
        val manifestSha = SiteRepository.sha256(manifestFile)
        if (!manifestSha.equals(remoteManifestSha, true)) {
            staging.deleteRecursively()
            return Result(false, "site_manifest.json哈希不匹配")
        }

        val manifest = JSONObject(manifestFile.readText(Charsets.UTF_8))
        if (manifest.optString("version") != remoteVersion) {
            staging.deleteRecursively()
            return Result(false, "manifest版本与latest.json不一致")
        }
        verifyFiles(staging, manifest)
        site.activate(staging, remoteVersion, manifestSha)
        return Result(true, "已更新到 $remoteVersion，旧版本已清理$apkNotice")
    }

    private fun verifyFiles(root: File, manifest: JSONObject) {
        val files = manifest.optJSONObject("files")
            ?: throw IllegalStateException("manifest缺少files")
        val expected = HashSet<String>()
        val keys = files.keys()
        while (keys.hasNext()) {
            val rel = keys.next()
            if (rel == SiteRepository.MANIFEST || rel.startsWith("/") || rel.contains("..")) {
                throw IllegalStateException("非法manifest路径：$rel")
            }
            expected += rel
            val f = File(root, rel)
            if (!f.isFile) throw IllegalStateException("缺少文件：$rel")
            val want = files.getString(rel)
            val got = SiteRepository.sha256(f)
            if (!got.equals(want, true)) throw IllegalStateException("哈希不匹配：$rel")
        }
        val actual = root.walkTopDown()
            .filter { it.isFile && it.name != SiteRepository.MANIFEST }
            .map { it.relativeTo(root).invariantSeparatorsPath }
            .toSet()
        if (actual != expected) {
            throw IllegalStateException("更新包文件清单不一致")
        }
    }

    private fun unzip(zip: File, out: File) {
        out.mkdirs()
        val seen = HashSet<String>()
        ZipFile(zip).use { zf ->
            for (entry in zf.entries()) {
                val name = entry.name.replace('\\', '/')
                if (name.isBlank()) continue
                if (name.startsWith("/") || name.contains("..")) {
                    throw IllegalStateException("非法ZIP路径：$name")
                }
                if (!seen.add(name)) {
                    throw IllegalStateException("ZIP内重复文件：$name")
                }
                val dst = File(out, name)
                val rootPath = out.canonicalFile.path
                if (!dst.canonicalFile.path.startsWith(rootPath + File.separator)) {
                    throw IllegalStateException("ZIP路径越界：$name")
                }
                if (entry.isDirectory) {
                    dst.mkdirs()
                } else {
                    dst.parentFile?.mkdirs()
                    zf.getInputStream(entry).use { input ->
                        FileOutputStream(dst).use { output -> input.copyTo(output) }
                    }
                }
            }
        }
    }

    private fun downloadFile(url: String, dst: File) {
        var current = URL(url)
        repeat(5) {
            val conn = (current.openConnection() as HttpURLConnection).apply {
                instanceFollowRedirects = true
                connectTimeout = 20_000
                readTimeout = 120_000
                setRequestProperty("User-Agent", "BlackCatWiki/${BuildConfig.APP_VERSION}")
            }
            try {
                if (conn.responseCode !in 200..299) {
                    throw IllegalStateException("HTTP ${conn.responseCode}")
                }
                conn.inputStream.use { input ->
                    dst.outputStream().use { output -> input.copyTo(output) }
                }
                return
            } finally {
                conn.disconnect()
            }
        }
    }

    private fun fetchText(url: String, max: Int): String {
        val conn = (URL(url).openConnection() as HttpURLConnection).apply {
            connectTimeout = 15_000
            readTimeout = 20_000
            setRequestProperty("User-Agent", "BlackCatWiki/${BuildConfig.APP_VERSION}")
        }
        try {
            if (conn.responseCode !in 200..299) throw IllegalStateException("HTTP ${conn.responseCode}")
            BufferedInputStream(conn.inputStream).use { input ->
                val out = java.io.ByteArrayOutputStream()
                val buf = ByteArray(8192)
                var total = 0
                while (true) {
                    val n = input.read(buf)
                    if (n <= 0) break
                    total += n
                    if (total > max) throw IllegalStateException("latest.json过大")
                    out.write(buf, 0, n)
                }
                return String(out.toByteArray(), Charsets.UTF_8)
            }
        } finally {
            conn.disconnect()
        }
    }

    private fun compareVersion(a: String, b: String): Int {
        fun parts(s: String) = s.trim().trimStart('v').split('.').map { it.toIntOrNull() ?: 0 }
        val pa = parts(a)
        val pb = parts(b)
        for (i in 0 until maxOf(pa.size, pb.size)) {
            val x = pa.getOrElse(i) { 0 }
            val y = pb.getOrElse(i) { 0 }
            if (x != y) return x.compareTo(y)
        }
        return 0
    }
}
