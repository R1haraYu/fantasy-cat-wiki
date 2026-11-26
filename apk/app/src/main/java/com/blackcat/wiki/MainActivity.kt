package com.blackcat.wiki

import android.app.Activity
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
        if (checking) return
        val now = System.currentTimeMillis()
        if (!force && now - lastCheckAt < 30_000) return
        checking = true
        lastCheckAt = now
        if (force) {
            Toast.makeText(this, "正在检查Wiki更新…", Toast.LENGTH_SHORT).show()
        }
        UpdateManager(this, site).checkAsync { result ->
            checking = false
            runOnUiThread {
                Log.i("BlackCatWiki", "update: updated=${result.updated}, message=${result.message}")
                if (result.updated) {
                    Toast.makeText(this, result.message, Toast.LENGTH_LONG).show()
                    // Do not let the WebView keep an old script/data cache after
                    // switching the active site directory.
                    webView.clearCache(true)
                    webView.clearHistory()
                    webView.loadUrl(START_URL)
                } else if (force || !result.message.startsWith("已是最新")) {
                    Toast.makeText(this, result.message, Toast.LENGTH_LONG).show()
                }
            }
        }
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
        // Release updates published while the app was in the background are
        // picked up when the user returns to the app.
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
