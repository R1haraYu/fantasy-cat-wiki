/* Wiki Site — shared shell behaviour */
(() => {
  "use strict";
  document.body.classList.add("v2");

  const WIKI_VERSION = "0.8.13";
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const aliases = { "": "index.html", "/": "index.html" };
  const here = aliases[path] || path;
  document.querySelectorAll(".codex-nav a").forEach((a) => {
    const href = (a.getAttribute("href") || "").split("?")[0].toLowerCase();
    if (href === here) a.classList.add("on");
  });

  const brand = document.querySelector(".topbar .brand, .side .brand");
  if (brand && !brand.querySelector(".v2-version")) {
    const badge = document.createElement("span");
    badge.className = "v2-version";
    badge.textContent = WIKI_VERSION;
    badge.title = "Wiki Site " + WIKI_VERSION;
    brand.appendChild(badge);
  }

  document.title = document.title.replace(/\s*·\s*2\.0$/, "") + " · " + WIKI_VERSION;
})();
