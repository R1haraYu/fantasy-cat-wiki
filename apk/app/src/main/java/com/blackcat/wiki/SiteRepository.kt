package com.blackcat.wiki

import android.content.Context
import android.net.Uri
import android.webkit.WebResourceResponse
import org.json.JSONObject
import java.io.ByteArrayInputStream
import java.io.File
import java.io.FileInputStream
import java.io.InputStream
import java.security.MessageDigest

/**
 * Serves either the bundled read-only asset site or one active downloaded
 * version directory. Only one downloaded version is kept at a time.
 *
 * current.json:
 *   { "version": "1.7.3", "manifestSha256": "..." }
 */
class SiteRepository(private val context: Context) {
    private val wikiRoot = File(context.filesDir, "wiki")
    private val versionsRoot = File(wikiRoot, "versions")
    private val stagingRoot = File(wikiRoot, "staging")
    private val zipFile = File(wikiRoot, "update.zip")
    private val currentFile = File(wikiRoot, "current.json")

    data class Active(
        val version: String,
        val manifestSha256: String,
        val directory: File?
    )

    init {
        wikiRoot.mkdirs()
        versionsRoot.mkdirs()
        cleanupTransientFiles()
    }

    fun cleanupTransientFiles() {
        stagingRoot.deleteRecursively()
        zipFile.delete()
        val activeVersion = readCurrent()?.version
        versionsRoot.listFiles()?.forEach { dir ->
            if (dir.name != activeVersion) dir.deleteRecursively()
        }
        // A stale current.json that points at a deleted directory must fall
        // back to the bundled assets.
        if (activeVersion != null && !File(versionsRoot, activeVersion).isDirectory) {
            currentFile.delete()
        }
    }

    fun active(): Active {
        val current = readCurrent()
        if (current != null) {
            val dir = File(versionsRoot, current.version)
            val manifest = File(dir, MANIFEST)
            if (dir.isDirectory && manifest.isFile) {
                return Active(current.version, current.manifestSha256, dir)
            }
            currentFile.delete()
        }
        return Active(
            version = assetManifest().optString("version", "1.7.3"),
            manifestSha256 = sha256(assetManifestBytes()),
            directory = null
        )
    }

    fun assetManifestBytes(): ByteArray =
        context.assets.open(MANIFEST).use { it.readBytes() }

    fun assetManifest(): JSONObject = JSONObject(String(assetManifestBytes(), Charsets.UTF_8))

    fun activeManifest(): JSONObject {
        val a = active()
        val bytes = if (a.directory != null) {
            File(a.directory, MANIFEST).readBytes()
        } else {
            assetManifestBytes()
        }
        return JSONObject(String(bytes, Charsets.UTF_8))
    }

    fun response(relPath: String): WebResourceResponse {
        val rel = sanitize(relPath)
        if (rel == null) return notFound()
        val active = active()

        if (active.directory != null) {
            val root = active.directory.canonicalFile
            val file = File(root, rel).canonicalFile
            if (file.path.startsWith(root.path + File.separator) || file == root) {
                if (file.isFile) {
                    return WebResourceResponse(mimeOf(rel), null, FileInputStream(file))
                }
            }
        }
        // An incremental update directory only contains changed files. Any
        // unchanged file falls through to the APK's bundled baseline.
        try {
            return WebResourceResponse(mimeOf(rel), null, context.assets.open(rel))
        } catch (_: Exception) {
            // fall through to 404
        }
        return notFound()
    }

    /** Copy all files currently in the active overlay (if any) into staging. */
    fun copyActiveTo(target: File) {
        val dir = active().directory ?: return
        copyDirectory(dir, target)
    }

    fun activeDirectory(): File? = active().directory

    private fun copyDirectory(src: File, dst: File) {
        dst.mkdirs()
        src.listFiles()?.forEach { f ->
            val out = File(dst, f.name)
            if (f.isDirectory) copyDirectory(f, out)
            else f.inputStream().use { input -> out.outputStream().use { output -> input.copyTo(output) } }
        }
    }

    fun activate(staging: File, version: String, manifestSha256: String): File {
        val target = File(versionsRoot, version)
        if (target.exists()) target.deleteRecursively()
        if (!staging.renameTo(target)) {
            staging.copyRecursively(target, overwrite = true)
            staging.deleteRecursively()
        }
        val tmp = File(wikiRoot, "current.tmp")
        tmp.writeText(
            JSONObject()
                .put("version", version)
                .put("manifestSha256", manifestSha256)
                .toString(),
            Charsets.UTF_8
        )
        if (currentFile.exists()) currentFile.delete()
        if (!tmp.renameTo(currentFile)) {
            currentFile.writeText(tmp.readText(Charsets.UTF_8), Charsets.UTF_8)
            tmp.delete()
        }
        // Remove previous downloaded versions immediately. The bundled asset
        // copy is immutable and is the only baseline kept.
        versionsRoot.listFiles()?.forEach { dir ->
            if (dir.name != version) dir.deleteRecursively()
        }
        cleanupTransientFiles()
        return target
    }

    fun stagingDir(): File {
        stagingRoot.deleteRecursively()
        stagingRoot.mkdirs()
        return stagingRoot
    }

    fun zipFile(): File {
        zipFile.delete()
        return zipFile
    }

    private data class Current(val version: String, val manifestSha256: String)

    private fun readCurrent(): Current? {
        if (!currentFile.isFile) return null
        return try {
            val o = JSONObject(currentFile.readText(Charsets.UTF_8))
            val version = o.optString("version")
            val sha = o.optString("manifestSha256")
            if (version.isBlank() || sha.isBlank()) null else Current(version, sha)
        } catch (_: Exception) {
            null
        }
    }

    private fun sanitize(path: String): String? {
        var rel = Uri.decode(path).replace('\\', '/')
        while (rel.startsWith("/")) rel = rel.removePrefix("/")
        if (rel.isBlank()) rel = "index.html"
        if (rel.endsWith("/")) rel += "index.html"
        val parts = rel.split('/')
        if (parts.any { it == ".." || it.isEmpty() || it.contains(':') }) return null
        return rel
    }

    private fun mimeOf(path: String): String = when (path.substringAfterLast('.', "").lowercase()) {
        "html", "htm" -> "text/html"
        "js", "mjs" -> "text/javascript"
        "css" -> "text/css"
        "json" -> "application/json"
        "svg" -> "image/svg+xml"
        "png" -> "image/png"
        "jpg", "jpeg" -> "image/jpeg"
        "webp" -> "image/webp"
        "gif" -> "image/gif"
        "ico" -> "image/x-icon"
        "woff" -> "font/woff"
        "woff2" -> "font/woff2"
        "ttf" -> "font/ttf"
        "mp3" -> "audio/mpeg"
        "ogg" -> "audio/ogg"
        "wav" -> "audio/wav"
        "mp4" -> "video/mp4"
        "webm" -> "video/webm"
        "wasm" -> "application/wasm"
        "txt", "md" -> "text/plain"
        else -> "application/octet-stream"
    }

    private fun notFound(): WebResourceResponse =
        WebResourceResponse(
            "text/html",
            "UTF-8",
            404,
            "Not Found",
            hashMapOf("Cache-Control" to "no-store"),
            ByteArrayInputStream("404".toByteArray())
        )

    companion object {
        const val MANIFEST = "site_manifest.json"

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
    }
}
