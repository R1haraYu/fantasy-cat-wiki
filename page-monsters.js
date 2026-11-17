const MONSTERS = window.MONSTERS || [];
const META = window.SITE_META || {};
const app = document.getElementById("app");
const count = document.getElementById("count");

const state = { q: "", type: "", element: "", appear: "" };
state.q = new URLSearchParams(location.search).get("q") || "";

function esc(text) {
  return String(text == null ? "" : text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function fmt(value) {
  if (value === null || value === undefined || value === "") return "";
  const n = Number(value);
  if (!Number.isFinite(n)) return esc(value);
  if (Number.isInteger(n)) return String(n);
  return String(Math.round(n * 1000) / 1000);
}

function badge(text, cls) {
  return `<span class="badge ${cls || "soft"}">${esc(text)}</span>`;
}

function monsterCard(m) {
  const tags = [badge(m.element, m.element === "愚者" ? "S" : "")];
  if (m.isBoss) tags.push(badge("首领", "hidden-tag"));
  tags.push(badge(`${m.appearances.length} 处出现`));
  return `<a class="index-card monster-card" href="#/${m.id}">
    <span class="index-art"><img src="${esc(m.icon)}" alt="" loading="lazy" onerror="this.remove()"></span>
    <span class="index-name">${esc(m.name)}</span>
    <span class="index-sub">${esc(m.element)} · ${m.isBoss ? "首领" : "等级 " + esc(m.initialLevel)}</span>
  </a>`;
}

const APPEAR_KINDS = ["主线", "困难", "支线", "活动", "冒险者委托"];

function renderList() {
  const q = state.q.trim();
  const rows = MONSTERS.filter((m) => {
    if (state.type === "boss" && !m.isBoss) return false;
    if (state.type === "normal" && m.isBoss) return false;
    if (state.element && m.element !== state.element) return false;
    if (state.appear && !m.appearances.some((a) => a.kind === state.appear)) return false;
    if (!q) return true;
    return `${m.name} ${m.element}`.includes(q);
  });
  count.textContent = `${rows.length} 种怪物`;
  const options = (values, current, label = "全部") =>
    `<option value="">${label}</option>` + values.map((v) => `<option value="${esc(v)}" ${v === current ? "selected" : ""}>${esc(v)}</option>`).join("");
  const elements = [...new Set(MONSTERS.map((m) => m.element))];
  app.innerHTML = `
    <h1 class="page-title">怪物</h1>
    <p class="lead">全部 ${MONSTERS.length} 种怪物的属性、技能与出现地点。</p>
    <div class="toolbar">
      <label>搜索<input id="f-q" value="${esc(state.q)}" placeholder="名称 / 代号" autocomplete="off"></label>
      <label>类型<select id="f-type">${options([["boss", "首领"], ["normal", "普通"]].map((x) => x[1]), state.type === "boss" ? "首领" : state.type === "normal" ? "普通" : "")}</select></label>
      <label>属性<select id="f-el">${options(elements, state.element)}</select></label>
      <label>出现于<select id="f-appear">${options(APPEAR_KINDS, state.appear)}</select></label>
    </div>
    <section class="index-grid">${rows.map(monsterCard).join("") || `<p class="empty">没有符合条件的怪物。</p>`}</section>`;
  document.getElementById("f-q").addEventListener("input", (e) => { state.q = e.target.value; renderList(); });
  document.getElementById("f-type").addEventListener("change", (e) => { state.type = e.target.value; renderList(); });
  document.getElementById("f-el").addEventListener("change", (e) => { state.element = e.target.value; renderList(); });
  document.getElementById("f-appear").addEventListener("change", (e) => { state.appear = e.target.value; renderList(); });
}

function appearanceList(m) {
  const groups = {};
  for (const a of m.appearances) {
    const key = a.kind + (a.difficulty ? ` · ${a.difficulty}` : "");
    (groups[key] = groups[key] || []).push(a);
  }
  return Object.entries(groups).map(([kind, list]) => `
    <div class="appear-group">
      <h4>${esc(kind)}</h4>
      <div class="appear-lines">
        ${list.map((a) => `<span class="appear-line"><b>${esc(a.code)}</b> ${esc(a.stage)}${a.lv != null ? ` <em>${esc(a.lv)} 级</em>` : ""}${a.floors ? ` <em>${a.floors[0]}-${a.floors[1]} 层</em>` : ""}</span>`).join("")}
      </div>
    </div>`).join("");
}

function renderDetail(id) {
  const m = MONSTERS.find((x) => String(x.id) === String(id));
  count.textContent = "";
  if (!m) {
    app.innerHTML = `<p class="empty">没有这个怪物。</p><a class="back" href="monsters.html">返回怪物图鉴</a>`;
    return;
  }
  document.title = `${m.name} · 怪物图鉴`;
  const rows = [
    ["初始等级", m.initialLevel],
    ["生命", m.stats.hp],
    ["攻击力", m.stats.atk],
    ["防御力", m.stats.def],
    ["精神力", m.stats.mind],
    ["速度", m.stats.spd],
    ["暴击率", `${fmt(m.stats.crit * 100)}%`],
    ["暴击伤害", `${fmt(m.stats.critDmg * 100)}%`],
    ["攻击距离", m.combatDistanceName],
  ];
  const growth = [
    ["生命成长", `+${fmt(m.stats.hpGrow)} / 级`],
    ["攻击成长", `+${fmt(m.stats.atkGrow)} / 级`],
    ["防御成长", `+${fmt(m.stats.defGrow)} / 级`],
    ["精神成长", `+${fmt(m.stats.mindGrow)} / 级`],
  ];
  const skills = m.skills.length
    ? m.skills.map((s) => `<article class="skill"><div class="slot">${esc(s.slot)}</div><h3>${esc(s.name)}</h3><p>${esc(s.desc)}</p></article>`).join("")
    : `<p class="empty">暂无技能数据。</p>`;
  app.innerHTML = `
    <p class="preview-tag"><a href="monsters.html">← 返回怪物图鉴</a></p>
    <div class="monster-head">
      <div class="monster-art-box">${m.icon ? `<img src="${esc(m.icon)}" alt="" onerror="this.remove()">` : ""}</div>
      <div>
        <h1 class="page-title" style="margin-top:0">${esc(m.name)}</h1>
                <p class="card-tags">
          ${badge(m.element)}
          ${m.isBoss ? badge("首领", "hidden-tag") : badge("普通")}
          ${m.appearances.length ? badge(`${m.appearances.length} 处出现`) : ""}
        </p>
      </div>
    </div>
    <h2 class="section-title">属性</h2>
    <div class="table-wrap"><table class="data-table"><tbody>
      ${rows.filter(([, v]) => v !== "" && v != null).map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td class="num">${esc(fmt(v))}</td></tr>`).join("")}
    </tbody></table></div>
    <h2 class="section-title">成长</h2>
    <div class="table-wrap"><table class="data-table"><tbody>
      ${growth.map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td class="num">${esc(v)}</td></tr>`).join("")}
    </tbody></table></div>
    <h2 class="section-title">技能</h2>
    <section class="panel">${skills}</section>
    <h2 class="section-title">出现地点</h2>
    ${m.appearances.length ? `<section class="panel">${appearanceList(m)}</section>` : `<p class="empty">该怪物暂未在当前版本关卡中出现。</p>`}`;
}

function route() {
  const raw = location.hash.replace(/^#\/?/, "");
  const id = raw ? Number(raw) : 0;
  if (id) renderDetail(id);
  else {
    document.title = "怪物 · 幻想之都的黑猫";
    renderList();
  }
}

window.addEventListener("hashchange", route);
route();
