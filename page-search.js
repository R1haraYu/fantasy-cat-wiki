const INDEX = (window.SEARCH_INDEX || []).concat(window.MAP_SEARCH_INDEX || []);
const qInput = document.getElementById("q");
const resultsEl = document.getElementById("results");
const hintEl = document.getElementById("hint");
const countEl = document.getElementById("count");

const TYPE_ORDER = ["角色", "装备", "道具", "怪物", "关卡", "世界", "地图", "剧情", "资料库", "任务", "系统"];

function esc(text) {
  return String(text == null ? "" : text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function render(q) {
  const word = q.trim().toLowerCase();
  const rows = word
    ? INDEX.filter((e) => `${e.n} ${e.x || ""}`.toLowerCase().includes(word))
    : [];
  if (!word) {
    hintEl.textContent = "输入关键词开始搜索；也可以直接浏览顶部各图鉴页面。";
    countEl.textContent = "";
    resultsEl.innerHTML = `
      <div class="search-tips">
        <p class="section-sub">热门入口</p>
        <p>${["艾琳娜", "装备", "回声之森", "战令", "主线"].map((w) => `<a class="chip" href="search.html?q=${encodeURIComponent(w)}">${esc(w)}</a>`).join(" ")}</p>
      </div>`;
    return;
  }
  hintEl.textContent = `找到 ${rows.length} 条与「${q}」相关的内容`;
  countEl.textContent = `${rows.length} 条结果`;
  if (!rows.length) {
    resultsEl.innerHTML = `<p class="empty">没有找到相关内容，换个关键词试试。</p>`;
    return;
  }
  const groups = {};
  rows.forEach((e) => (groups[e.t] = groups[e.t] || []).push(e));
  const types = Object.keys(groups).sort((a, b) => TYPE_ORDER.indexOf(a) - TYPE_ORDER.indexOf(b));
  resultsEl.innerHTML = types.map((t) => `
    <h2 class="section-title">${esc(t)} <span class="badge soft">${groups[t].length}</span></h2>
    <div class="grid-cards">
      ${groups[t].map((e) => `<a class="card search-item" href="${esc(e.u)}">
        <div class="card-body">
          <h3 class="card-title">${esc(e.n)}</h3>
          ${e.x ? `<p class="card-text">${esc(e.x)}</p>` : ""}
        </div>
      </a>`).join("")}
    </div>`).join("");
}

const initial = new URLSearchParams(location.search).get("q") || "";
qInput.value = initial;
qInput.addEventListener("input", () => render(qInput.value));
render(initial);
