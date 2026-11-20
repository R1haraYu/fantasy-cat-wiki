/* Wiki Site 2.0 — shared shell behaviour */
(() => {
  "use strict";
  document.body.classList.add("v2");

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
    badge.textContent = "2.0";
    badge.title = "Wiki Site 2.0";
    brand.appendChild(badge);
  }

  if (!/ · 2\.0$/.test(document.title)) document.title += " · 2.0";
})();
