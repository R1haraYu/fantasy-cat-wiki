package com.blackcat.wiki

import android.app.Activity
import android.app.AlertDialog
import android.app.ProgressDialog
import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.util.Log
import android.view.ViewGroup
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast

class MainActivity : Activity() {
    private lateinit var webView: WebView
    private lateinit var site: SiteRepository

    private var lastCheckAt = 0L
    private var checking = false
    private var prompting = false
    private var lastPromptedVersion = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        site = SiteRepository(this)

        webView = WebView(this).apply {
            setBackgroundColor(Color.WHITE)
            layoutParams = ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
            )
            settings.apply {
                javaScriptEnabled = true
                domStorageEnabled = true
                databaseEnabled = true
                allowFileAccess = false
                allowContentAccess = false
                cacheMode = WebSettings.LOAD_DEFAULT
                mediaPlaybackRequiresUserGesture = false
                mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
            }
            webViewClient = object : WebViewClient() {
                override fun shouldInterceptRequest(
                    view: WebView,
                    request: WebResourceRequest
                ): WebResourceResponse? {
                    val uri = request.url ?: return null
                    if (uri.host != "appassets.androidplatform.net") return null
                    val path = uri.path ?: return null
                    if (!path.startsWith("/wiki/")) return null
                    return site.response(path.removePrefix("/wiki/"))
                }

                override fun shouldOverrideUrlLoading(
                    view: WebView,
                    request: WebResourceRequest
                ): Boolean {
                    val uri = request.url
                    if (uri.host == "appassets.androidplatform.net") return false
                    startActivity(Intent(Intent.ACTION_VIEW, uri))
                    return true
                }
            }
            // Long-press anywhere to force a manual update check.
            setOnLongClickListener {
                checkForUpdates(force = true)
                true
            }
        }
        setContentView(webView)
        webView.loadUrl(START_URL)
        checkForUpdates(force = true)
    }

    private fun checkForUpdates(force: Boolean) {
        if (checking || prompting) return
        val now = System.currentTimeMillis()
        if (!force && now - lastCheckAt < 30_000) return
        checking = true
        lastCheckAt = now
        if (force) {
            lastPromptedVersion = ""
            Toast.makeText(this, "正在检查Wiki更新…", Toast.LENGTH_SHORT).show()
        }
        UpdateManager(this, site).checkAsync { check ->
            checking = false
            runOnUiThread {
                Log.i("BlackCatWiki", "check: ${check.message}")
                val plan = check.plan
                if (plan == null) {
                    if (force || !check.message.startsWith("已是最新")) {
                        Toast.makeText(this, check.message, Toast.LENGTH_LONG).show()
                    }
                    return@runOnUiThread
                }
                if (!force && plan.version == lastPromptedVersion) return@runOnUiThread
                lastPromptedVersion = plan.version
                showUpdatePrompt(plan)
            }
        }
    }

    private fun showUpdatePrompt(plan: UpdateManager.Plan) {
        if (isFinishing || isDestroyed) return
        prompting = true
        AlertDialog.Builder(this)
            .setTitle("发现 Wiki 更新 ${plan.version}")
            .setMessage(
                "${plan.summary()}\n\n" +
                    "确认后才开始下载。下载期间会显示进度，完成后自动切换并清理旧版本。"
            )
            .setPositiveButton("下载并更新") { _, _ ->
                prompting = false
                startDownload(plan)
            }
            .setNegativeButton("稍后") { _, _ ->
                prompting = false
                Toast.makeText(this, "已暂缓更新；长按页面可再次检查", Toast.LENGTH_SHORT).show()
            }
            .setOnCancelListener {
                prompting = false
                Toast.makeText(this, "已暂缓更新；长按页面可再次检查", Toast.LENGTH_SHORT).show()
            }
            .show()
    }

    private fun startDownload(plan: UpdateManager.Plan) {
        if (isFinishing || isDestroyed) return
        val progress = ProgressDialog(this).apply {
            setTitle("正在更新 Wiki")
            setMessage("准备中…")
            isIndeterminate = true
            setProgressStyle(ProgressDialog.STYLE_HORIZONTAL)
            max = 100
            setCancelable(false)
            show()
        }
        UpdateManager(this, site).downloadAsync(
            plan,
            { percent, message ->
                runOnUiThread {
                    if (percent < 0) {
                        progress.isIndeterminate = true
                        progress.setMessage(message)
                    } else {
                        progress.isIndeterminate = false
                        progress.progress = percent.coerceIn(0, 100)
                        progress.setMessage(message)
                    }
                }
            },
            { result ->
                runOnUiThread {
                    progress.dismiss()
                    Toast.makeText(this, result.message, Toast.LENGTH_LONG).show()
                    if (result.updated) {
                        webView.clearCache(true)
                        webView.clearHistory()
                        webView.loadUrl(START_URL)
                    }
                }
            }
        )
    }

    override fun onBackPressed() {
        if (webView.canGoBack()) webView.goBack() else super.onBackPressed()
    }

    override fun onPause() {
        webView.onPause()
        super.onPause()
    }

    override fun onResume() {
        super.onResume()
        webView.onResume()
        // Check metadata again when the user returns to the app. This never
        // downloads automatically; a prompt is shown if an update exists.
        checkForUpdates(force = false)
    }

    override fun onDestroy() {
        webView.destroy()
        super.onDestroy()
    }

    companion object {
        const val START_URL = "https://appassets.androidplatform.net/wiki/index.html"
    }
}
