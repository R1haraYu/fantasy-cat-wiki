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

function atLevel(stats, level) {
  const steps = Math.max(0, level - 1);
  const crit = Math.round((stats.crit + stats.critGrow * steps) * 1000) / 10;
  return {
    hp: roundEven((stats.hp + stats.hpGrow * steps) * 1.1),
    def: roundEven(stats.def + stats.defGrow * steps),
    atk: roundEven((stats.atk + stats.atkGrow * steps) * 1.1),
    acc: stats.acc,
    mind: roundEven(stats.mind + stats.mindGrow * steps),
    crit,
    critDmg: Math.round(stats.critDmg * 1000) / 10,
    spd: stats.spd,
  };
}

const STAT_ROWS = [
  ["生命", "hp", "hp"],
  ["防御力", "def", "def"],
  ["攻击力", "atk", "atk"],
  ["精准", "acc", ""],
  ["精神力", "mind", "mind"],
  ["暴击率", "crit", "crit"],
  ["暴击伤害", "critDmg", ""],
  ["速度", "spd", ""],
];

function growAmount(stats, key) {
  if (key === "hp") return stats.hpGrow * 1.1;
  if (key === "atk") return stats.atkGrow * 1.1;
  if (key === "def") return stats.defGrow;
  if (key === "mind") return stats.mindGrow;
  if (key === "crit") return stats.critGrow * 100;
  return 0;
}

function formatStat(key, value) {
  if (key === "crit" || key === "critDmg") return `${num(value)}%`;
  return num(value);
}

function formatGrow(key, value) {
  if (!value) return "—";
  return key === "crit" ? `+${num(value)}%` : `+${num(value)}`;
}

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
  count.textContent = `${roster.length}`;
  if (!c) {
    app.innerHTML = `<p class="empty">没有这个角色。</p><a class="back" href="#/">返回图鉴</a>`;
    return;
  }
  document.title = `${c.name} · 角色图鉴`;
  const field = (label, value) =>
    value
      ? `<div class="field"><div class="bar">${label}</div><div class="val">${value}</div></div>`
      : "";
  app.innerHTML = `
    <a class="back" href="#/">返回图鉴</a>
    <article class="sheet">
      <h1>${escapeText(c.name)}</h1>
      <div class="tabs" role="tablist">
        <button type="button" class="tab on" data-tab="data">角色数据</button>
        <button type="button" class="tab" data-tab="file">角色档案</button>
      </div>
      <div class="sheet-body">
        <div class="hero">
          <img src="${portrait(c.id, "bust")}" alt="${escapeText(c.name)}" onerror="this.parentElement.remove()">
        </div>
        <section class="pane on" data-pane="data">
          ${field("名字", escapeText(c.name))}
          ${field("初始稀有度", `${escapeText(c.rarity)} ${stars(c.rarityRank)}`)}
          ${field("属性", escapeText(c.element))}
          ${field("职业", escapeText(c.job))}
          <div class="bar">基础属性</div>
          <div class="level-line">
            <label for="lv">等级</label>
            <input id="lv" type="number" min="1" max="80" value="1">
            <span>/ 80</span>
            <input id="lv-range" type="range" min="1" max="80" value="1" aria-label="等级">
          </div>
          <table class="attr">
            <thead>
              <tr><th>属性</th><th>数值</th><th>成长</th></tr>
            </thead>
            <tbody>
              ${STAT_ROWS.map(([label, key, grow]) => `<tr>
                <th>${label}</th>
                <td data-stat="${key}"></td>
                <td class="grow">${formatGrow(grow, grow ? growAmount(c.stats, grow) : 0)}</td>
              </tr>`).join("")}
            </tbody>
          </table>
          <div class="bar">技能</div>
          ${c.skills.map(skillBlock).join("")}
        </section>
        <section class="pane" data-pane="file">
          ${field("种族", escapeText(c.race))}
          ${field("年龄", c.age ? `${escapeText(c.age)} 岁` : "")}
          ${field("星座", escapeText(c.constellation))}
          ${field("生日", escapeText(c.birthday))}
          ${field("身高", c.height ? `${c.height} cm` : "")}
          ${field("体重", c.weight ? `${escapeText(c.weight)} kg` : "")}
          <div class="bar">简介</div>
          <p class="bio">${escapeText(c.bio)}</p>
        </section>
      </div>
    </article>`;
  const lv = app.querySelector("#lv");
  const range = app.querySelector("#lv-range");
  const paintLevel = (level) => {
    const n = Math.min(80, Math.max(1, Math.round(Number(level)) || 1));
    lv.value = String(n);
    range.value = String(n);
    const cur = atLevel(c.stats, n);
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
    document.title = "角色图鉴 · 幻想之都的黑猫";
    renderList();
  }
}

window.addEventListener("hashchange", route);
route();
