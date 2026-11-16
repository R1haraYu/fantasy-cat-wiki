const SKILLS = window.SKILLS || [];
const META = window.SITE_META || {};
const listEl = document.getElementById("list");
const countEl = document.getElementById("count");
const tools = document.getElementById("tools");

const state = { q: "", owner: "", job: "", element: "" };

function esc(text) {
  return String(text == null ? "" : text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function levelValue(levels, idx) {
  const arr = levels[idx] || [];
  return arr.length ? arr[0] : "";
}

function renderDesc(skill) {
  let html = esc(skill.desc);
  ["T1", "T2", "T3"].forEach((name, index) => {
    const value = levelValue(skill.levels, index);
    if (value) html = html.replaceAll(`{$T${index + 1}}`, `<span class="vals">${esc(value)}</span>`);
  });
  return html;
}

function levelTable(skill) {
  const rows = [];
  ["T1", "T2", "T3"].forEach((name, index) => {
    const arr = skill.levels[index] || [];
    if (!arr.length) return;
    rows.push(`<tr><th scope="row">${name}</th>${arr.map((v) => `<td>${esc(v)}</td>`).join("")}</tr>`);
  });
  if (!rows.length) return "";
  const cols = Math.max(...skill.levels.map((a) => (a ? a.length : 0)));
  return `<div class="table-wrap"><table class="data-table"><thead><tr><th>数值</th>${Array.from({ length: cols }, (_, i) => `<th>Lv${i + 1}</th>`).join("")}</tr></thead><tbody>${rows.join("")}</tbody></table></div>`;
}

function card(skill) {
  const tags = [];
  tags.push(`<span class="badge soft">${esc(skill.ownerType)}</span>`);
  if (skill.slot) tags.push(`<span class="badge soft">${esc(skill.slot)}</span>`);
  if (skill.job) tags.push(`<span class="badge soft">${esc(skill.job)}</span>`);
  if (skill.rarity) tags.push(`<span class="badge ${skill.rarity}">${esc(skill.rarity)}</span>`);
  const cd = skill.cooldownValue ? `<span class="badge soft">冷却 ${esc(skill.cooldownValue)}</span>` : "";
  const lt = levelTable(skill);
  return `<article class="card clickable" data-owner="${esc(skill.ownerType)}" data-job="${esc(skill.job)}" data-element="${esc(skill.element)}">
    <div class="card-art">${skill.icon ? `<img src="${esc(skill.icon)}" alt="" loading="lazy" onerror="this.remove()">` : "?"}</div>
    <div class="card-body">
      <h3 class="card-title">${esc(skill.name)}</h3>
      <p class="card-meta">${esc(skill.ownerName || skill.skillId)}${skill.slot ? " · " + esc(skill.slot) : ""} · <code>${esc(skill.skillId)}</code></p>
      <p class="card-text">${renderDesc(skill)}</p>
      <div class="card-tags">${tags.join("")}${cd}</div>
      <details class="fold" style="margin-top:10px;padding:0 10px">
        <summary style="font-size:13px">等级数值</summary>
        <div class="fold-body">${lt}</div>
      </details>
    </div>
  </article>`;
}

function render() {
  const q = state.q.trim().toLowerCase();
  const rows = SKILLS.filter((s) => {
    if (state.owner && s.ownerType !== state.owner) return false;
    if (state.job && s.job !== state.job) return false;
    if (state.element && s.element !== state.element) return false;
    if (!q) return true;
    const hay = `${s.name} ${s.desc} ${s.ownerName} ${s.skillId} ${s.slot}`.toLowerCase();
    return hay.includes(q);
  });
  countEl.textContent = `${rows.length} 个技能`;
  listEl.innerHTML = rows.length
    ? `<div class="grid-cards grid-wide">${rows.map(card).join("")}</div>`
    : `<p class="empty">没有符合条件的技能。</p>`;
}

function options(values, current, allLabel = "全部") {
  return `<option value="">${allLabel}</option>` +
    values.map((v) => `<option value="${esc(v)}" ${v === current ? "selected" : ""}>${esc(v)}</option>`).join("");
}

tools.innerHTML = `
  <label>搜索<input id="f-q" value="${esc(state.q)}" placeholder="技能名 / 描述 / 归属" autocomplete="off"></label>
  <label>类型<select id="f-owner">${options(["角色", "敌人"], state.owner)}</select></label>
  <label>职业<select id="f-job">${options(Object.values(META.jobs || {}).map((j) => j.name), state.job)}</select></label>
  <label>属性<select id="f-element">${options(Object.values(META.elements || {}).map((e) => e.name), state.element)}</select></label>`;

document.getElementById("f-q").addEventListener("input", (e) => { state.q = e.target.value; render(); });
document.getElementById("f-owner").addEventListener("change", (e) => { state.owner = e.target.value; render(); });
document.getElementById("f-job").addEventListener("change", (e) => { state.job = e.target.value; render(); });
document.getElementById("f-element").addEventListener("change", (e) => { state.element = e.target.value; render(); });

render();
