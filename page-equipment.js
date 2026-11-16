const EQUIPMENT = window.EQUIPMENT || [];
const SETS = window.EQUIP_SETS || [];
const TRAITS = window.EQUIP_TRAITS || [];
const META = window.SITE_META || {};
const listEl = document.getElementById("list");
const setsEl = document.getElementById("sets");
const traitsEl = document.getElementById("traits");
const countEl = document.getElementById("count");
const tools = document.getElementById("tools");

const state = { q: "", slot: "", rarity: "" };
state.q = new URLSearchParams(location.search).get("q") || "";

function esc(text) {
  return String(text == null ? "" : text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function equipCard(e) {
  const tags = [`<span class="badge soft">${esc(e.slotName)}</span>`];
  if (e.rarityName) tags.push(`<span class="badge ${esc(e.rarityName)}">${esc(e.rarityName)}</span>`);
  if (e.price) tags.push(`<span class="badge soft">${esc(e.price)} 金</span>`);
  if (e.isGacha) tags.push(`<span class="badge soft">祈愿</span>`);
  return `<article class="card" data-slot="${esc(e.slotName)}" data-rarity="${esc(e.rarityName)}">
    <div class="card-art">${e.icon ? `<img src="${esc(e.icon)}" alt="" loading="lazy" onerror="this.remove()">` : ""}</div>
    <div class="card-body">
      <h3 class="card-title">${esc(e.name)}</h3>
      <p class="card-meta">${esc(e.slotName)}${e.price ? " · 售价 " + esc(e.price) : ""}</p>
      <p class="card-text">${esc(e.text)}</p>
      <div class="card-tags">${tags.join("")}${(e.traitTagsCn || []).map((t) => `<span class="badge soft">${esc(t)}</span>`).join("")}</div>
      ${e.obtain ? `<p class="card-meta">获取：${esc(e.obtain)}</p>` : ""}
    </div>
  </article>`;
}

function renderEquip() {
  const q = state.q.trim().toLowerCase();
  const rows = EQUIPMENT.filter((e) => {
    if (state.slot && e.slotName !== state.slot) return false;
    if (state.rarity && e.rarityName !== state.rarity) return false;
    if (!q) return true;
    return `${e.name} ${e.text} ${e.itemId} ${e.slotName}`.toLowerCase().includes(q);
  });
  countEl.textContent = `${rows.length} 件装备`;
  listEl.innerHTML = rows.length
    ? `<div class="grid-cards grid-wide">${rows.map(equipCard).join("")}</div>`
    : `<p class="empty">没有符合条件的装备。</p>`;
}

function renderSets() {
  setsEl.innerHTML = SETS.map((s) => `
    <article class="card">
      <div class="card-art">${s.icon ? `<img src="${esc(s.icon)}" alt="" loading="lazy" onerror="this.remove()">` : ""}</div>
      <div class="card-body">
        <h3 class="card-title">${esc(s.title)}</h3>
        <p class="card-meta">2 件套：${esc(s.trait2.short || s.trait2.text)}</p>
        <p class="card-text">${esc(s.trait2.text)}</p>
        <p class="card-meta">5 件套：${esc(s.trait5.short || s.trait5.text)}</p>
        <p class="card-text">${esc(s.trait5.text)}</p>
      </div>
    </article>`).join("");
}

function renderTraits() {
  const rows = TRAITS.map((t) => `<tr>
    <th scope="row">${esc(t.index)}</th>
    <td>${esc(t.tagCn)}</td>
    <td>${esc(t.shortDesc)}</td>
    <td>${esc(t.longDesc)}</td>
    <td class="num">${esc(t.rangeText || "")}</td>
    <td class="num">${esc(t.weight)}</td>
  </tr>`).join("");
  traitsEl.innerHTML = `<div class="table-wrap"><table class="data-table">
    <thead><tr><th>编号</th><th>标签</th><th>简述</th><th>效果</th><th>数值范围</th><th>权重</th></tr></thead>
    <tbody>${rows}</tbody></table></div>`;
}

function options(values, current, label = "全部") {
  return `<option value="">${label}</option>` +
    values.map((v) => `<option value="${esc(v)}" ${v === current ? "selected" : ""}>${esc(v)}</option>`).join("");
}

const slots = (META.slots || []).map((s) => s.name);
const rarities = ["R", "SR", "SSR"];
tools.innerHTML = `
  <label>搜索<input id="f-q" value="${esc(state.q)}" placeholder="名称 / 描述 / 部位" autocomplete="off"></label>
  <label>部位<select id="f-slot">${options(slots, state.slot)}</select></label>
  <label>稀有度<select id="f-rarity">${options(rarities, state.rarity)}</select></label>
  <label>&nbsp;<button class="query" id="f-reset" type="button" style="max-width:none">重置</button></label>`;

document.getElementById("f-q").addEventListener("input", (e) => { state.q = e.target.value; renderEquip(); });
document.getElementById("f-slot").addEventListener("change", (e) => { state.slot = e.target.value; renderEquip(); });
document.getElementById("f-rarity").addEventListener("change", (e) => { state.rarity = e.target.value; renderEquip(); });
document.getElementById("f-reset").addEventListener("click", () => {
  state.q = ""; state.slot = ""; state.rarity = "";
  document.getElementById("f-q").value = "";
  document.getElementById("f-slot").value = "";
  document.getElementById("f-rarity").value = "";
  renderEquip();
});

function renderTagGuide() {
  const el = document.getElementById("tag-guide");
  const pools = window.EQUIP_TAGS || [];
  if (!el) return;
  const TAG_DESC = {
    "普通": "防御力、精准、生命，以及部分战斗特殊效果",
    "物理": "攻击力、暴击率、暴击伤害",
    "精神": "精神力",
    "材料": "特殊装备效果（分解获得装备部件）",
  };
  el.innerHTML = `<div class="table-wrap"><table class="data-table"><thead><tr><th>标签</th><th>可出现的词条</th><th>词条数量</th></tr></thead><tbody>${pools.map((p) => `<tr><td><span class="badge soft">${esc(p.tag)}</span></td><td>${esc(TAG_DESC[p.tag] || p.effects.join("、"))}</td><td class="num">${p.count}</td></tr>`).join("")}</tbody></table></div>`;
}

renderEquip();
renderSets();
renderTraits();
renderTagGuide();
