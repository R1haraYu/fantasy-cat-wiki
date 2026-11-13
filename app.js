const roster = window.CODEX || [];
const app = document.getElementById("app");
const count = document.getElementById("count");

const elements = [...new Set(roster.map((c) => c.element))];
const jobs = [...new Set(roster.map((c) => c.job))];
const RARITY_ORDER = ["N", "R", "SR", "SSR"];
const rarities = RARITY_ORDER.filter((name) => roster.some((c) => c.rarity === name));

function stars(rank) {
  return "★".repeat(rank || 0);
}

function portrait(id, kind) {
  return `img/${kind}/${id}.png`;
}

function levelGroups(skill) {
  const levels = skill.levels || [];
  if (!levels.length) return [];
  return Array.isArray(levels[0]) ? levels : [levels];
}

function renderDesc(text, groups) {
  let html = escapeText(text);
  groups.forEach((group, index) => {
    const value = group.filter(Boolean).join("/");
    if (!value) return;
    html = html.replaceAll(`{$T${index + 1}}`, `<span class="vals">${escapeText(value)}</span>`);
  });
  return html;
}

function escapeText(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function skillBlock(skill) {
  const groups = levelGroups(skill);
  return `<article class="skill">
    <div class="slot">${escapeText(skill.slot)}</div>
    <h3>${escapeText(skill.name)}</h3>
    <p>${renderDesc(skill.desc, groups)}</p>
  </article>`;
}

function num(value) {
  if (value === null || value === undefined || value === "") return "";
  const n = Number(value);
  if (!Number.isFinite(n)) return escapeText(value);
  if (Number.isInteger(n)) return String(n);
  return String(Math.round(n * 100) / 100);
}

function roundEven(n) {
  const scaled = Math.round(n * 1000);
  const whole = Math.trunc(scaled / 1000);
  const frac = ((scaled % 1000) + 1000) % 1000;
  if (frac > 500 || (frac === 500 && Math.abs(whole % 2) === 1)) return whole + 1;
  return whole;
}

function rarityScale(rarity) {
  if (rarity === "SSR") return 1.1;
  if (rarity === "SR") return 1.05;
  return 1;
}

function atLevel(stats, level, rarity) {
  const steps = Math.max(0, level - 1);
  const scale = rarityScale(rarity);
  const crit = Math.round((stats.crit + stats.critGrow * steps) * 1000) / 10;
  return {
    hp: roundEven((stats.hp + stats.hpGrow * steps) * scale),
    def: roundEven(stats.def + stats.defGrow * steps),
    atk: roundEven((stats.atk + stats.atkGrow * steps) * scale),
    acc: stats.acc,
    mind: roundEven(stats.mind + stats.mindGrow * steps),
    crit,
    critDmg: Math.round(stats.critDmg * 1000) / 10,
    spd: stats.spd,
  };
}

function formatStat(key, value) {
  if (key === "crit" || key === "critDmg") return `${num(value)}%`;
  return num(value);
}

const BASE_ROWS = [
  ["生命", "hp"],
  ["防御力", "def"],
  ["攻击力", "atk"],
  ["精准", "acc"],
  ["精神力", "mind"],
  ["暴击率", "crit"],
  ["暴击伤害", "critDmg"],
  ["速度", "spd"],
];

function renderList() {
  const params = new URLSearchParams(location.hash.split("?")[1] || "");
  const q = (params.get("q") || "").trim();
  const element = params.get("el") || "";
  const job = params.get("job") || "";
  const rarity = params.get("r") || "";
  const filtered = roster.filter((c) => {
    if (q && !`${c.name}${c.element}${c.job}${c.race}`.includes(q)) return false;
    if (element && c.element !== element) return false;
    if (job && c.job !== job) return false;
    if (rarity && c.rarity !== rarity) return false;
    return true;
  });
  count.textContent = `${filtered.length} 条目`;
  const options = (list, current) =>
    `<option value="">全部</option>` +
    list.map((item) => `<option value="${escapeText(item)}" ${item === current ? "selected" : ""}>${escapeText(item)}</option>`).join("");
  app.innerHTML = `
    <h1 class="page-title">角色</h1>
    <form class="filter-panel" id="filters">
      <div class="filter-grid">
        <label>名字<input class="search" name="q" value="${escapeText(q)}" autocomplete="off"></label>
        <label>初始稀有度<select name="r">${options(rarities, rarity)}</select></label>
        <label>属性<select name="el">${options(elements, element)}</select></label>
        <label>职业<select name="job">${options(jobs, job)}</select></label>
      </div>
      <button class="query" type="submit">查询</button>
    </form>
    <section class="index-grid" id="grid">${
      filtered.length ? filtered.map(cardMarkup).join("") : `<p class="empty">没有符合条件的角色。</p>`
    }</section>`;
  document.getElementById("filters").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next = new URLSearchParams();
    for (const [key, value] of data.entries()) {
      if (String(value).trim()) next.set(key, String(value).trim());
    }
    const query = next.toString();
    location.hash = query ? `#/?${query}` : "#/";
  });
}

function cardMarkup(c) {
  return `<a class="index-card" href="#/${c.id}">
    <span class="index-art"><img src="${portrait(c.id, "icon")}" alt="" onerror="this.remove()"></span>
    <span class="index-name">${escapeText(c.name)}</span>
  </a>`;
}

function renderDetail(id) {
  const c = roster.find((item) => item.id === id);
  count.textContent = "";
  if (!c) {
    document.body.classList.remove("detail");
    app.innerHTML = `<p class="empty">没有这个角色。</p><a class="back" href="#/">返回图鉴</a>`;
    return;
  }
  document.body.classList.add("detail");
  document.title = `${c.name} · 角色图鉴`;
  const profile = [
    ["种族", c.race],
    ["年龄", c.age ? `${c.age} 岁` : ""],
    ["身高", c.height ? `${c.height} cm` : ""],
    ["体重", c.weight ? `${c.weight} kg` : "???"],
    ["星座", c.constellation],
    ["生日", c.birthday],
  ].filter(([, value]) => value);
  app.innerHTML = `
    <div class="fixed-bg parchment" aria-hidden="true"><img src="img/bg/paper.png" alt=""></div>
    <div class="fixed-figure" aria-hidden="true">
      <img src="${portrait(c.id, "bust")}" alt="" onerror="this.parentElement.remove()">
    </div>
    <main class="detail-sheet">
      <div class="detail-head">
        <p class="preview-tag"><a href="#/">返回图鉴</a></p>
        <h1>${escapeText(c.name)}</h1>
        <p class="meta">${escapeText(c.rarity)} ${stars(c.rarityRank)} · ${escapeText(c.element)} · ${escapeText(c.job)}</p>
        <div class="tabs" role="tablist">
          <button type="button" class="tab on" data-tab="data">角色数据</button>
          <button type="button" class="tab" data-tab="file">角色档案</button>
        </div>
      </div>
      <div class="pane-wrap">
        <div class="pane on" data-pane="data">
          <section class="panel">
            <h2>基础属性</h2>
            <div class="level-line">
              <label for="lv">等级</label>
              <input id="lv" type="number" min="1" max="80" value="1">
              <span>/ 80</span>
              <input id="lv-range" type="range" min="1" max="80" value="1" aria-label="等级">
            </div>
            <table>
              <tbody>
                ${BASE_ROWS.map(([label, key]) => `<tr><th>${label}</th><td data-stat="${key}"></td></tr>`).join("")}
              </tbody>
            </table>
          </section>
          <section class="panel">
            <h2>技能</h2>
            ${c.skills.map(skillBlock).join("")}
          </section>
        </div>
        <div class="pane" data-pane="file">
          <section class="panel">
            <h2>档案</h2>
            <table>
              <tbody>
                ${profile.map(([label, value]) => `<tr><th>${label}</th><td>${escapeText(value)}</td></tr>`).join("")}
              </tbody>
            </table>
          </section>
          ${c.bio ? `<section class="panel"><h2>简介</h2><p class="bio">${escapeText(c.bio)}</p></section>` : ""}
        </div>
      </div>
    </main>`;
  const lv = app.querySelector("#lv");
  const range = app.querySelector("#lv-range");
  const paintLevel = (level) => {
    const n = Math.min(80, Math.max(1, Math.round(Number(level)) || 1));
    lv.value = String(n);
    range.value = String(n);
    const cur = atLevel(c.stats, n, c.rarity);
    app.querySelectorAll("[data-stat]").forEach((cell) => {
      cell.textContent = formatStat(cell.dataset.stat, cur[cell.dataset.stat]);
    });
  };
  lv.addEventListener("input", () => paintLevel(lv.value));
  range.addEventListener("input", () => paintLevel(range.value));
  paintLevel(1);
  app.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      app.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("on", tab === button));
      app.querySelectorAll(".pane").forEach((pane) => pane.classList.toggle("on", pane.dataset.pane === button.dataset.tab));
    });
  });
}

function route() {
  const raw = location.hash.replace(/^#\/?/, "");
  const id = Number(raw.split("?")[0]);
  if (id) renderDetail(id);
  else {
    document.body.classList.remove("detail");
    document.title = "角色图鉴 · 幻想之都的黑猫";
    renderList();
  }
}

window.addEventListener("hashchange", route);
route();
