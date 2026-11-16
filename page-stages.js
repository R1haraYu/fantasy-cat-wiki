const STAGES = window.STAGES || { main: [], event: [], resource: [], ruins: [] };
const META = window.SITE_META || {};
const app = document.getElementById("app");
const count = document.getElementById("count");

const state = { q: "", type: "", chapter: "" };
state.q = new URLSearchParams(location.search).get("q") || "";

function esc(text) {
  return String(text == null ? "" : text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function badge(text, cls) {
  return `<span class="badge ${cls || "soft"}">${esc(text)}</span>`;
}

function rewardChips(list, first) {
  if (!list || !list.length) return "";
  return `<div class="rewards">${list.map((r) => `<span class="reward-chip">${r.icon ? `<img src="${esc(r.icon)}" alt="" loading="lazy" onerror="this.remove()">` : ""}<span>${esc(r.name)}</span>${r.amount ? `<em>×${esc(r.amount)}</em>` : ""}${!first && r.probability != null && Number(r.probability) < 1 ? `<em>(${Math.round(Number(r.probability) * 100)}%)</em>` : ""}</span>`).join("")}</div>`;
}

function enemyChips(list) {
  if (!list || !list.length) return "";
  return `<div class="lineup">${list.map((e) => `<span class="lineup-chip">${e.icon ? `<img src="${esc(e.icon)}" alt="" loading="lazy" onerror="this.remove()">` : ""}<span>${esc(e.name)}</span>${e.lv != null ? `<em>${esc(e.lv)} 级</em>` : ""}</span>`).join("")}</div>`;
}

function stageCard(s) {
  const flags = [];
  if (s.ap != null) flags.push(badge(`体力 ${s.ap}`));
  if (s.isBoss) flags.push(badge("首领", "hidden-tag"));
  if (s.isStory) flags.push(badge("剧情"));
  flags.push(badge(`${s.type} ${s.code}`));
  return `<details class="stage">
    <summary><span class="stage-code">${esc(s.code)}</span><span class="stage-name">${esc(s.name)}</span><span class="chips-inline">${flags.join("")}</span></summary>
    <div class="stage-body">
      ${s.desc ? `<p class="stage-desc">${esc(s.desc)}</p>` : ""}
      <div class="stage-meta">
        ${s.expPlayer ? badge(`玩家经验 ${s.expPlayer}`) : ""}
        ${s.expAvatar ? badge(`角色经验 ${s.expAvatar}`) : ""}
        ${s.favor ? badge(`好感 ${s.favor}`) : ""}
      </div>
      ${s.enemies && s.enemies.length ? `<h4 class="mini-title">敌人</h4>${enemyChips(s.enemies)}` : ""}
      ${s.rewards && s.rewards.length ? `<h4 class="mini-title">掉落</h4>${rewardChips(s.rewards)}` : ""}
      ${s.firstRewards && s.firstRewards.length ? `<p class="first-clear">首通奖励：</p>${rewardChips(s.firstRewards, true)}` : ""}
    </div>
  </details>`;
}

function stageGroup(title, list, subtitle) {
  if (!list.length) return "";
  return `<h2 class="section-title">${esc(title)}</h2>${subtitle ? `<p class="section-sub">${esc(subtitle)}</p>` : ""}<div class="stage-list">${list.map(stageCard).join("")}</div>`;
}

function matchesFilter(s) {
  const q = state.q.trim();
  if (state.chapter && String(s.chapter) !== state.chapter) return false;
  if (!q) return true;
  return `${s.code} ${s.name} ${s.desc} ${s.catalog || ""} ${s.difficultyName || ""}`.includes(q);
}

function renderRuins() {
  return STAGES.ruins.map((r) => `<details class="stage">
    <summary><span class="stage-code">难度${esc(r.difficulty)}</span><span class="stage-name">${esc(r.name)}</span><span class="chips-inline">${badge(`推荐等级 ${r.recommendLv}`)}${badge(`等级限制 ${r.limitLv}`)}</span></summary>
    <div class="stage-body">
      <p class="stage-desc">${esc(r.titleNormal)}</p>
      <p class="stage-desc">${esc(r.descNormal)}</p>
      ${r.titleBoss ? `<p class="stage-desc"><b>${esc(r.titleBoss)}</b><br>${esc(r.descBoss)}</p>` : ""}
      <h4 class="mini-title">敌人出现层级</h4>
      <div class="table-wrap"><table class="data-table"><thead><tr><th>敌人</th><th>层级</th><th>等级</th></tr></thead><tbody>
        ${r.enemies.map((e) => `<tr><td><span class="lineup-chip">${e.icon ? `<img src="${esc(e.icon)}" alt="" loading="lazy" onerror="this.remove()">` : ""}<span>${esc(e.name)}</span>${e.isBoss ? badge("BOSS", "hidden-tag") : ""}</span></td><td>${e.floors.map((f) => (f[0] === f[1] ? `${f[0]} 层` : `${f[0]}-${f[1]} 层`)).join("、")}</td><td class="num">${esc(e.lv)} 级</td></tr>`).join("")}
      </tbody></table></div>
    </div>
  </details>`).join("");
}

function render() {
  const kinds = ["主线", "困难", "支线", "活动", "委托"];
  const show = (k) => !state.type || state.type === k;
  const main = STAGES.main.filter((s) => matchesFilter(s));
  const byType = (t) => main.filter((s) => s.type === t);
  const chapters = [...new Set(byType("主线").map((s) => s.chapter))];

  let html = `
    <h1 class="page-title">关卡</h1>
    <p class="lead">主线、困难、支线、活动与冒险者委托的全部关卡：消耗、敌人阵容、掉落与首通奖励。</p>
    <p class="note"><strong>仅供参考：</strong>关卡掉落概率为游戏内配置值，实际以游戏内结算为准。</p>
    <div class="toolbar">
      <label>搜索<input id="f-q" value="${esc(state.q)}" placeholder="关卡名 / 编号 / 描述" autocomplete="off"></label>
      <label>类型<select id="f-type"><option value="">全部</option>${kinds.map((k) => `<option value="${k}" ${k === state.type ? "selected" : ""}>${k}</option>`).join("")}</select></label>
      <label>章节<select id="f-chapter"><option value="">全部</option>${chapters.map((c) => `<option value="${c}" ${String(c) === state.chapter ? "selected" : ""}>第 ${c} 章</option>`).join("")}</select></label>
      <label>&nbsp;<button class="query" id="f-reset" type="button" style="max-width:none">重置</button></label>
    </div>`;

  if (show("主线")) {
    const list = byType("主线").filter(matchesFilter);
    if (state.chapter) html += stageGroup("主线", list);
    else chapters.forEach((c) => { html += stageGroup(`主线 · 第 ${c} 章`, list.filter((s) => s.chapter === c)); });
  }
  if (show("困难")) {
    const list = byType("困难").filter(matchesFilter);
    const chaptersH = [...new Set(list.map((s) => s.chapter))];
    if (state.chapter) html += stageGroup("困难", list);
    else chaptersH.forEach((c) => { html += stageGroup(`困难 · 第 ${c} 章`, list.filter((s) => s.chapter === c)); });
  }
  if (show("支线")) html += stageGroup("支线", byType("支线").filter(matchesFilter));

  if (show("活动")) {
    const list = STAGES.event.filter((s) => matchesFilter(s) && (!state.chapter || String(s.chapter) === state.chapter));
    const normal = list.filter((s) => s.difficultyName === "普通");
    const hard = list.filter((s) => s.difficultyName === "困难");
    if (normal.length) html += stageGroup("活动 · 普通", normal);
    if (hard.length) html += stageGroup("活动 · 困难", hard);
  }

  if (show("委托")) {
    const list = STAGES.resource.filter((s) => matchesFilter(s));
    ["寻书之旅", "探宝之旅", "淬炼之旅"].forEach((cat) => {
      const group = list.filter((s) => s.catalog === cat);
      if (group.length) html += stageGroup(`冒险者委托 · ${cat}`, group);
    });
  }

  if (!html) html += `<p class="empty">没有符合条件的关卡。</p>`;
  app.innerHTML = html;
  const total = STAGES.main.length + STAGES.event.length + STAGES.resource.length;
  count.textContent = `${total} 个关卡`;
  document.getElementById("f-q").addEventListener("input", (e) => { state.q = e.target.value; render(); });
  document.getElementById("f-type").addEventListener("change", (e) => { state.type = e.target.value; render(); });
  document.getElementById("f-chapter").addEventListener("change", (e) => { state.chapter = e.target.value; render(); });
  document.getElementById("f-reset").addEventListener("click", () => { state.q = ""; state.type = ""; state.chapter = ""; render(); });
}

render();
