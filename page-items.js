const ITEMS = window.ITEMS || [];
const META = window.SITE_META || {};
const listEl = document.getElementById("list");
const countEl = document.getElementById("count");
const tools = document.getElementById("tools");

const state = { q: "", group: "", rarity: "" };
state.q = new URLSearchParams(location.search).get("q") || "";

function esc(text) {
  return String(text == null ? "" : text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function itemCard(item) {
  const tags = [`<span class="badge soft">${esc(item.group)}</span>`];
  if (item.catalog) tags.push(`<span class="badge soft">${esc(item.catalog)}</span>`);
  if (item.rarityName) tags.push(`<span class="badge ${esc(item.rarityName)}">${esc(item.rarityName)}</span>`);
  if (item.maxAmount) tags.push(`<span class="badge soft">上限 ${esc(item.maxAmount)}</span>`);
  return `<article class="card" data-group="${esc(item.group)}" data-rarity="${esc(item.rarityName)}">
    ${item.icon ? `<div class="card-art"><img src="${esc(item.icon)}" alt="" loading="lazy" onerror="this.parentElement.remove()"></div>` : `<div class="card-art card-art-fallback">${esc((item.name || "?").slice(0, 1))}</div>`}
    <div class="card-body">
      <h3 class="card-title">${esc(item.name)}</h3>
      <p class="card-meta">${esc(item.group)}${item.catalog ? " · " + esc(item.catalog) : ""}</p>
      <p class="card-text">${esc(item.text)}</p>
      <div class="card-tags">${tags.join("")}</div>
      ${item.obtain ? `<p class="card-meta">获取：${esc(item.obtain)}</p>` : ""}
    </div>
  </article>`;
}

function render() {
  const q = state.q.trim().toLowerCase();
  const rows = ITEMS.filter((item) => {
    if (state.group && item.group !== state.group) return false;
    if (state.rarity && item.rarityName !== state.rarity) return false;
    if (!q) return true;
    return `${item.name} ${item.text} ${item.itemId} ${item.group} ${item.obtain}`.toLowerCase().includes(q);
  });
  countEl.textContent = `${rows.length} 件道具`;
  listEl.innerHTML = rows.length
    ? `<div class="grid-cards">${rows.map(itemCard).join("")}</div>`
    : `<p class="empty">没有符合条件的道具。</p>`;
}

function options(values, current, label = "全部") {
  return `<option value="">${label}</option>` +
    values.map((v) => `<option value="${esc(v)}" ${v === current ? "selected" : ""}>${esc(v)}</option>`).join("");
}

const groups = [...new Set(ITEMS.map((i) => i.group))];
const rarities = ["N", "R", "SR", "SSR"];
tools.innerHTML = `
  <label>搜索<input id="f-q" value="${esc(state.q)}" placeholder="名称 / 描述 / 获取途径" autocomplete="off"></label>
  <label>类别<select id="f-group">${options(groups, state.group)}</select></label>
  <label>稀有度<select id="f-rarity">${options(rarities, state.rarity)}</select></label>
  <label>&nbsp;<button class="query" id="f-reset" type="button" style="max-width:none">重置</button></label>`;

document.getElementById("f-q").addEventListener("input", (e) => { state.q = e.target.value; render(); });
document.getElementById("f-group").addEventListener("change", (e) => { state.group = e.target.value; render(); });
document.getElementById("f-rarity").addEventListener("change", (e) => { state.rarity = e.target.value; render(); });
document.getElementById("f-reset").addEventListener("click", () => {
  state.q = ""; state.group = ""; state.rarity = "";
  document.getElementById("f-q").value = "";
  document.getElementById("f-group").value = "";
  document.getElementById("f-rarity").value = "";
  render();
});

render();
