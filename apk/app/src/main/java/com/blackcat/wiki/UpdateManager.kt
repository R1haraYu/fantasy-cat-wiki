package com.blackcat.wiki

import android.content.Context
import org.json.JSONObject
import java.io.BufferedInputStream
import java.io.ByteArrayOutputStream
import java.io.File
import java.io.FileOutputStream
import java.net.HttpURLConnection
import java.net.URL
import java.net.URLEncoder
import java.security.MessageDigest
import java.util.zip.ZipFile

/**
 * Two-phase update manager:
 *  - checkNow() only inspects metadata and returns a Plan; it never downloads.
 *  - downloadAsync(plan) runs only after the user confirms.
 *
 * Prefer incremental updates: download only files whose SHA-256 differs from
 * the active manifest, using filesBaseUrl (raw.githubusercontent.com). Fall
 * back to the full zip if the release does not provide manifestUrl/filesBaseUrl.
 */
class UpdateManager(
    private val context: Context,
    private val site: SiteRepository
) {
    data class Plan(
        val version: String,
        val manifestSha256: String,
        val incremental: Boolean,
        val changedFiles: Int,
        val changedBytes: Long,
        val packageUrl: String,
        val packageSha256: String,
        val packageBytes: Long,
        val manifestUrl: String,
        val filesBaseUrl: String,
        val manifestBytes: ByteArray?,
        val manifest: JSONObject?,
        val changelog: String
    ) {
        fun summary(): String = if (incremental) {
            "增量更新：${changedFiles} 个文件，约 ${formatBytes(changedBytes)}"
        } else {
            "完整更新：${formatBytes(packageBytes)}"
        }
    }

    data class Check(val plan: Plan?, val message: String)
    data class Result(val updated: Boolean, val message: String)

    fun checkAsync(callback: (Check) -> Unit) {
        Thread {
            val result = try {
                checkNow()
            } catch (e: Exception) {
                android.util.Log.e("BlackCatWiki", "update check failed", e)
                Check(null, "离线使用：${e.message ?: "更新检查失败"}")
            }
            callback(result)
        }.start()
    }

    fun downloadAsync(
        plan: Plan,
        progress: (percent: Int, message: String) -> Unit,
        callback: (Result) -> Unit
    ) {
        Thread {
            val result = try {
                if (plan.incremental) downloadIncremental(plan, progress)
                else downloadFull(plan, progress)
                Result(true, "已更新到 ${plan.version}，旧版本已清理")
            } catch (e: Exception) {
                android.util.Log.e("BlackCatWiki", "update download failed", e)
                Result(false, "更新失败：${e.message ?: "下载或校验失败"}")
            }
            callback(result)
        }.start()
    }

    private fun checkNow(): Check {
        val url = BuildConfig.UPDATE_MANIFEST_URL
        if (!url.startsWith("https://")) {
            return Check(null, "未配置更新地址，使用内置离线内容")
        }

        val latest = JSONObject(fetchText(url, 2 * 1024 * 1024))
        val remoteVersion = latest.optString("version")
        val remoteManifestSha = latest.optString("manifestSha256")
        if (remoteVersion.isBlank() || remoteManifestSha.isBlank()) {
            return Check(null, "latest.json缺少version/manifestSha256")
        }

        val minApp = latest.optString("minAppVersion", "0")
        if (compareVersion(BuildConfig.APP_VERSION, minApp) < 0) {
            return Check(null, "需要先安装新版APK：$minApp")
        }

        var apkNotice = ""
        val apkSha = latest.optString("apkSha256")
        if (apkSha.isNotBlank()) {
            val installed = File(context.applicationInfo.sourceDir)
            if (!sha256(installed).equals(apkSha, true)) {
                apkNotice = "；APK不是发布版，Wiki内容仍可更新"
            }
        }

        val active = site.active()
        if (active.version == remoteVersion &&
            active.manifestSha256.equals(remoteManifestSha, true)
        ) {
            return Check(null, "已是最新内容：${active.version}$apkNotice")
        }

        val manifestUrl = latest.optString("manifestUrl")
        val filesBaseUrl = latest.optString("filesBaseUrl")
        if (manifestUrl.startsWith("https://") && filesBaseUrl.startsWith("https://")) {
            val manifestBytes = fetchBytes(manifestUrl, 12 * 1024 * 1024)
            val manifestSha = sha256(manifestBytes)
            if (!manifestSha.equals(remoteManifestSha, true)) {
                throw IllegalStateException("远端site_manifest.json哈希不匹配")
            }
            val manifest = JSONObject(String(manifestBytes, Charsets.UTF_8))
            if (manifest.optString("version") != remoteVersion) {
                throw IllegalStateException("manifest版本与latest.json不一致")
            }
            val remoteFiles = manifest.optJSONObject("files")
                ?: throw IllegalStateException("manifest缺少files")
            val sizes = manifest.optJSONObject("sizes") ?: JSONObject()
            val localFiles = site.activeManifest().optJSONObject("files") ?: JSONObject()

            var changedFiles = 0
            var changedBytes = 0L
            val keys = remoteFiles.keys()
            while (keys.hasNext()) {
                val rel = keys.next()
                val remoteHash = remoteFiles.optString(rel)
                val localHash = localFiles.optString(rel)
                if (!remoteHash.equals(localHash, true)) {
                    changedFiles += 1
                    changedBytes += sizes.optLong(rel, 0L)
                }
            }
            return Check(
                Plan(
                    remoteVersion, remoteManifestSha, true,
                    changedFiles, changedBytes,
                    "", "", latest.optLong("packageBytes", 0L),
                    manifestUrl, filesBaseUrl, manifestBytes, manifest,
                    latest.optString("changelog", "")
                ),
                "发现 Wiki 新版本 $remoteVersion$apkNotice"
            )
        }

        val packageUrl = latest.optString("packageUrl")
        val packageSha = latest.optString("packageSha256")
        if (!packageUrl.startsWith("https://") || packageSha.isBlank()) {
            return Check(null, "latest.json缺少packageUrl/packageSha256")
        }
        return Check(
            Plan(
                remoteVersion, remoteManifestSha, false,
                0, 0, packageUrl, packageSha,
                latest.optLong("packageBytes", 0L),
                "", "", null, null,
                latest.optString("changelog", "")
            ),
            "发现 Wiki 新版本 $remoteVersion$apkNotice"
        )
    }

    private fun downloadIncremental(
        plan: Plan,
        progress: (Int, String) -> Unit
    ) {
        val manifest = plan.manifest ?: throw IllegalStateException("缺少增量manifest")
        val manifestBytes = plan.manifestBytes ?: throw IllegalStateException("缺少manifest内容")
        val remoteFiles = manifest.optJSONObject("files")
            ?: throw IllegalStateException("manifest缺少files")
        val localFiles = site.activeManifest().optJSONObject("files") ?: JSONObject()
        val staging = site.stagingDir()

        progress(-1, "准备本地文件…")
        site.copyActiveTo(staging)

        val changed = ArrayList<String>()
        val keys = remoteFiles.keys()
        while (keys.hasNext()) {
            val rel = keys.next()
            if (!remoteFiles.optString(rel).equals(localFiles.optString(rel), true)) {
                changed += rel
            }
        }

        var done = 0
        for (rel in changed) {
            val safe = File(staging, rel)
            safe.parentFile?.mkdirs()
            progress((done * 100 / maxOf(1, changed.size)), "下载 $rel")
            downloadTo(joinUrl(plan.filesBaseUrl, rel), safe)
            val got = sha256(safe)
            if (!got.equals(remoteFiles.optString(rel), true)) {
                throw IllegalStateException("文件哈希不匹配：$rel")
            }
            done += 1
        }

        // Write the exact signed manifest bytes, not a re-serialized object.
        File(staging, SiteRepository.MANIFEST).writeBytes(manifestBytes)

        // Remove stale overlay files that are no longer in the remote file set.
        val remoteKeys = HashSet<String>()
        val allKeys = remoteFiles.keys()
        while (allKeys.hasNext()) remoteKeys += allKeys.next()
        staging.walkTopDown().filter { it.isFile && it.name != SiteRepository.MANIFEST }.forEach { f ->
            val rel = f.relativeTo(staging).invariantSeparatorsPath
            if (rel !in remoteKeys) f.delete()
        }

        // Verify all downloaded files and every remote entry that is not in
        // staging against the trusted baseline manifest.
        val checkKeys = remoteFiles.keys()
        while (checkKeys.hasNext()) {
            val rel = checkKeys.next()
            val f = File(staging, rel)
            val want = remoteFiles.optString(rel)
            if (f.isFile) {
                if (!sha256(f).equals(want, true)) throw IllegalStateException("哈希不匹配：$rel")
            } else {
                if (!localFiles.optString(rel).equals(want, true)) {
                    throw IllegalStateException("缺少基线文件：$rel")
                }
            }
        }

        progress(100, "校验完成")
        site.activate(staging, plan.version, plan.manifestSha256)
    }

    private fun downloadFull(plan: Plan, progress: (Int, String) -> Unit) {
        if (!plan.packageUrl.startsWith("https://") || plan.packageSha256.isBlank()) {
            throw IllegalStateException("缺少完整包地址或哈希")
        }
        val download = site.zipFile()
        progress(0, "下载更新包…")
        downloadWithProgress(plan.packageUrl, download) { pct -> progress(pct, "下载更新包…") }
        progress(100, "校验更新包…")
        val actualPackageSha = sha256(download)
        if (!actualPackageSha.equals(plan.packageSha256, true)) {
            download.delete()
            throw IllegalStateException("更新包SHA-256不匹配")
        }

        val staging = site.stagingDir()
        unzip(download, staging)
        download.delete()
        val manifestFile = File(staging, SiteRepository.MANIFEST)
        if (!manifestFile.isFile) throw IllegalStateException("更新包缺少site_manifest.json")
        val manifestSha = sha256(manifestFile)
        if (!manifestSha.equals(plan.manifestSha256, true)) {
            throw IllegalStateException("site_manifest.json哈希不匹配")
        }
        val manifest = JSONObject(manifestFile.readText(Charsets.UTF_8))
        if (manifest.optString("version") != plan.version) {
            throw IllegalStateException("manifest版本与latest.json不一致")
        }
        verifyFiles(staging, manifest)
        site.activate(staging, plan.version, manifestSha)
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
            if (!sha256(f).equals(files.getString(rel), true)) {
                throw IllegalStateException("哈希不匹配：$rel")
            }
        }
        val actual = root.walkTopDown()
            .filter { it.isFile && it.name != SiteRepository.MANIFEST }
            .map { it.relativeTo(root).invariantSeparatorsPath }
            .toSet()
        if (actual != expected) throw IllegalStateException("更新包文件清单不一致")
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
                if (!seen.add(name)) throw IllegalStateException("ZIP内重复文件：$name")
                val dst = File(out, name)
                val rootPath = out.canonicalFile.path
                if (!dst.canonicalFile.path.startsWith(rootPath + File.separator)) {
                    throw IllegalStateException("ZIP路径越界：$name")
                }
                if (entry.isDirectory) dst.mkdirs() else {
                    dst.parentFile?.mkdirs()
                    zf.getInputStream(entry).use { input ->
                        FileOutputStream(dst).use { output -> input.copyTo(output) }
                    }
                }
            }
        }
    }

    private fun downloadWithProgress(url: String, dst: File, onProgress: (Int) -> Unit) {
        val conn = (URL(url).openConnection() as HttpURLConnection).apply {
            instanceFollowRedirects = true
            connectTimeout = 20_000
            readTimeout = 180_000
            setRequestProperty("User-Agent", "BlackCatWiki/${BuildConfig.APP_VERSION}")
        }
        try {
            if (conn.responseCode !in 200..299) throw IllegalStateException("HTTP ${conn.responseCode}")
            val total = conn.contentLengthLong
            var read = 0L
            conn.inputStream.use { input ->
                dst.outputStream().use { output ->
                    val buf = ByteArray(1024 * 1024)
                    while (true) {
                        val n = input.read(buf)
                        if (n <= 0) break
                        output.write(buf, 0, n)
                        read += n
                        if (total > 0) onProgress(((read * 100) / total).toInt().coerceIn(0, 99))
                    }
                }
            }
        } finally {
            conn.disconnect()
        }
    }

    private fun downloadTo(url: String, dst: File) {
        val conn = (URL(url).openConnection() as HttpURLConnection).apply {
            instanceFollowRedirects = true
            connectTimeout = 20_000
            readTimeout = 180_000
            setRequestProperty("User-Agent", "BlackCatWiki/${BuildConfig.APP_VERSION}")
        }
        try {
            if (conn.responseCode !in 200..299) throw IllegalStateException("HTTP ${conn.responseCode}")
            conn.inputStream.use { input -> dst.outputStream().use { output -> input.copyTo(output) } }
        } finally {
            conn.disconnect()
        }
    }

    private fun joinUrl(base: String, rel: String): String {
        val encoded = rel.split('/').joinToString("/") {
            URLEncoder.encode(it, "UTF-8").replace("+", "%20")
        }
        return base.trimEnd('/') + "/" + encoded
    }

    private fun fetchText(url: String, max: Int): String =
        String(fetchBytes(url, max), Charsets.UTF_8)

    private fun fetchBytes(url: String, max: Int): ByteArray {
        val conn = (URL(url).openConnection() as HttpURLConnection).apply {
            instanceFollowRedirects = true
            connectTimeout = 15_000
            readTimeout = 20_000
            setRequestProperty("User-Agent", "BlackCatWiki/${BuildConfig.APP_VERSION}")
        }
        try {
            if (conn.responseCode !in 200..299) throw IllegalStateException("HTTP ${conn.responseCode}")
            BufferedInputStream(conn.inputStream).use { input ->
                val out = ByteArrayOutputStream()
                val buf = ByteArray(8192)
                var total = 0
                while (true) {
                    val n = input.read(buf)
                    if (n <= 0) break
                    total += n
                    if (total > max) throw IllegalStateException("响应过大")
                    out.write(buf, 0, n)
                }
                return out.toByteArray()
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

    companion object {
        fun sha256(bytes: ByteArray): String {
            val d = MessageDigest.getInstance("SHA-256")
            return d.digest(bytes).joinToString("") { "%02x".format(it) }
        }

        fun sha256(file: File): String {
            val d = MessageDigest.getInstance("SHA-256")
            file.inputStream().use { input ->
                val buf = ByteArray(1024 * 1024)
                while (true) {
                    val n = input.read(buf)
                    if (n <= 0) break
                    d.update(buf, 0, n)
                }
            }
            return d.digest().joinToString("") { "%02x".format(it) }
        }

        fun formatBytes(bytes: Long): String = when {
            bytes >= 1024 * 1024 -> String.format("%.1f MB", bytes / 1024.0 / 1024.0)
            bytes >= 1024 -> String.format("%.1f KB", bytes / 1024.0)
            else -> "$bytes B"
        }
    }
}
