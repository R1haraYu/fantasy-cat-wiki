const EQUIPMENT = window.EQUIPMENT || [];
const SETS = window.EQUIP_SETS || [];
const TRAITS = window.EQUIP_TRAITS || [];
const META = window.SITE_META || {};
const SET_TRAIT_IDS = new Set([200, 201, 210, 211, 220, 221, 230, 231, 240, 241]);
const RARITY_NAME = { 1: "R", 2: "SR", 3: "SSR" };
const TAG_CN = { normal: "普通", material: "材料", physics: "物理", spirit: "精神" };

function normTag(v) {
  return String(v == null ? "" : v).trim().replaceAll('"', "").toLowerCase();
}
function tagsOf(e) {
  if (e.traitTagsCn && e.traitTagsCn.length) return e.traitTagsCn;
  return (e.traitTags || []).map((t) => TAG_CN[normTag(t)]).filter(Boolean);
}
function rarityOf(e) {
  return RARITY_NAME[Number(e.rarity)] || e.rarityName || "";
}
function traitPoolFor(e) {
  const tags = tagsOf(e);
  const groups = {};
  for (const t of TRAITS) {
    if (SET_TRAIT_IDS.has(Number(t.index))) continue;
    const tag = t.tagCn || TAG_CN[normTag(t.tag)];
    if (!tag || !tags.includes(tag)) continue;
    const lim = Number(t.slotLimitation || 0);
    if (lim && lim !== Number(e.slot)) continue;
    (groups[t.group] = groups[t.group] || []).push(t);
  }
  const n = Object.keys(groups).length;
  const roll = [];
  for (const arr of Object.values(groups)) {
    const total = arr.reduce((sum, t) => sum + (Number(t.weight) || 0), 0);
    for (const t of arr) {
      const tier = t.tierPct != null ? Number(t.tierPct) : (total ? (Number(t.weight) || 0) * 100 / total : 0);
      roll.push({
        index: t.index,
        tagCn: t.tagCn || TAG_CN[normTag(t.tag)] || "",
        shortDesc: t.shortDesc || "",
        longDesc: t.longDesc || "",
        chance: Math.round((tier / n) * 100) / 100,
      });
    }
  }
  roll.sort((a, b) => a.index - b.index);
  return { groups: n, roll };
}
function traitDataFor(e) {
  const fallback = traitPoolFor(e);
  return {
    groups: e.traitGroups != null ? e.traitGroups : fallback.groups,
    roll: e.traitRoll && e.traitRoll.length ? e.traitRoll : fallback.roll,
  };
}
const listView = document.getElementById("list-view");
const detailView = document.getElementById("detail-view");
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
  const rarity = rarityOf(e);
  if (rarity) tags.push(`<span class="badge ${esc(rarity)}">${esc(rarity)}</span>`);
  if (e.price) tags.push(`<span class="badge soft">${esc(e.price)} 金</span>`);
  return `<article class="card equip-card" data-id="${esc(e.id)}" tabindex="0" role="button" aria-label="查看 ${esc(e.name)} 的词条概率">
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

function bindCards() {
  listEl.querySelectorAll(".equip-card").forEach((el) => {
    const go = () => { location.hash = "#/" + el.dataset.id; };
    el.addEventListener("click", go);
    el.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); go(); }
    });
  });
}

function renderEquip() {
  const q = state.q.trim().toLowerCase();
  const rows = EQUIPMENT.filter((e) => {
    if (state.slot && e.slotName !== state.slot) return false;
    if (state.rarity && rarityOf(e) !== state.rarity) return false;
    if (!q) return true;
    return `${e.name} ${e.text} ${e.slotName}`.toLowerCase().includes(q);
  });
  countEl.textContent = `${rows.length} 件装备`;
  listEl.innerHTML = rows.length
    ? `<div class="grid-cards grid-wide">${rows.map(equipCard).join("")}</div>`
    : `<p class="empty">没有符合条件的装备。</p>`;
  bindCards();
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
  </tr>`).join("");
  traitsEl.innerHTML = `<div class="table-wrap"><table class="data-table">
    <thead><tr><th>编号</th><th>标签</th><th>简述</th><th>效果</th></tr></thead>
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
  el.innerHTML = `<div class="table-wrap"><table class="data-table"><thead><tr><th>标签</th><th>可出现的词条</th><th>随机词条数</th></tr></thead><tbody>${pools.map((p) => `<tr><td><span class="badge soft">${esc(p.tag)}</span></td><td>${esc(TAG_DESC[p.tag] || "")}</td><td class="num">${p.count}</td></tr>`).join("")}</tbody></table></div>`;
}

function detailHtml(e) {
  const tags = [];
  tags.push(`<span class="badge soft">${esc(e.slotName)}</span>`);
  const rarity = rarityOf(e);
  if (rarity) tags.push(`<span class="badge ${esc(rarity)}">${esc(rarity)}</span>`);
  if (e.price) tags.push(`<span class="badge soft">售价 ${esc(e.price)} 金</span>`);
  (e.traitTagsCn || []).forEach((t) => tags.push(`<span class="badge soft">标签：${esc(t)}</span>`));
  const traitData = traitDataFor(e);
  const rows = (traitData.roll || []).map((t) => `<tr>
    <td>${esc(t.tagCn)}</td>
    <td>${esc(t.shortDesc)}</td>
    <td>${esc(t.longDesc)}</td>
    <td class="num">${esc(t.chance)}%</td>
  </tr>`).join("");
  return `<p class="crumbs"><a href="index.html">首页</a> / <a href="equipment.html">装备</a> / ${esc(e.name)}</p>
    <a class="back-link" href="equipment.html">← 返回装备列表</a>
    <div class="equip-detail-head">
      <div class="equip-detail-art">${e.icon ? `<img src="${esc(e.icon)}" alt="" loading="lazy" onerror="this.remove()">` : ""}</div>
      <div class="equip-detail-main">
        <h1 class="page-title">${esc(e.name)}</h1>
        <div class="card-tags">${tags.join("")}</div>
        <p class="card-text">${esc(e.text)}</p>
        ${e.obtain ? `<p class="card-meta">获取：${esc(e.obtain)}</p>` : ""}
      </div>
    </div>
    <h2 class="section-title">词条概率（鉴定 / 开箱）</h2>
    <p class="section-sub">该装备可用词条组共 ${esc(traitData.groups)} 组。单次鉴定从可用组中等概率抽 1 组，再按组内档位概率抽 1 条；表中概率 = 100% ÷ ${esc(traitData.groups)} × 组内档位概率。强化等级不改变词条。</p>
    <div class="table-wrap"><table class="data-table">
      <thead><tr><th>标签</th><th>词条</th><th>效果</th><th>单次概率</th></tr></thead>
      <tbody>${rows || `<tr><td colspan="4">暂无可用词条</td></tr>`}</tbody>
    </table></div>
    `;
}

function showDetail(id) {
  const e = EQUIPMENT.find((x) => String(x.id) === String(id));
  listView.hidden = true;
  detailView.hidden = false;
  if (!e) {
    detailView.innerHTML = `<p class="empty">没有找到这件装备。</p><a class="back-link" href="equipment.html">← 返回装备列表</a>`;
    countEl.textContent = "装备详情";
    return;
  }
  countEl.textContent = e.name;
  detailView.innerHTML = detailHtml(e);
  window.scrollTo(0, 0);
}

function showList() {
  detailView.hidden = true;
  listView.hidden = false;
  renderSets();
  renderTraits();
  renderTagGuide();
  renderEquip();
  window.scrollTo(0, 0);
}

function route() {
  const m = (location.hash || "").match(/^#\/(\d+)/);
  if (m) showDetail(Number(m[1]));
  else showList();
}

window.addEventListener("hashchange", route);
route();
