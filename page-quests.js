const QUESTS = window.QUESTS || { main: [], sub: [], board: [], rarity: [] };
const app = document.getElementById("app");
const count = document.getElementById("count");

let query = (new URLSearchParams(location.search).get("q") || "").trim();

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
function chips(list) {
  if (!list || !list.length) return "—";
  return `<div class="rewards">${list.map((r) => `<span class="reward-chip">${r.icon ? `<img src="${esc(r.icon)}" alt="" loading="lazy" onerror="this.remove()">` : ""}<span>${esc(r.name)}</span>${r.amount ? `<em>×${esc(r.amount)}</em>` : ""}</span>`).join("")}</div>`;
}

function questCard(q) {
  const flags = [];
  if (q.tag) flags.push(badge(q.tag));
  if (q.reqPlayerLv) flags.push(badge(`玩家等级 ${q.reqPlayerLv}`));
  if (q.reqChapter) flags.push(badge(`主线 ${q.reqChapter}`));
  if (q.rank) flags.push(badge(`委托等级 ${q.rank}`));
  if (q.trigger) flags.push(badge(`触发 ${q.trigger}`));
  if (q.charName) flags.push(badge(q.charName));
  return `<details class="stage">
    <summary><span class="stage-name">${esc(q.name)}</span><span class="chips-inline">${flags.join("")}</span></summary>
    <div class="stage-body">
      ${q.desc ? `<p class="stage-desc">${esc(q.desc)}</p>` : ""}
      ${q.objectives && q.objectives.length ? `<h4 class="mini-title">目标</h4><ul class="kv-list">${q.objectives.map((o) => `<li><span>${esc(o)}</span></li>`).join("")}</ul>` : ""}
      ${q.reportDesc ? `<p class="card-meta">汇报：${esc(q.reportDesc)}</p>` : ""}
      ${q.rewards && q.rewards.length ? `<h4 class="mini-title">奖励</h4>${chips(q.rewards)}` : ""}
    </div>
  </details>`;
}

function group(title, list, sub) {
  if (!list.length) return "";
  return `<h2 class="section-title">${esc(title)} <span class="badge soft">${list.length}</span></h2>${sub ? `<p class="section-sub">${esc(sub)}</p>` : ""}<div class="stage-list">${list.map(questCard).join("")}</div>`;
}

function filtered(list) {
  const w = query.toLowerCase();
  if (!w) return list;
  return list.filter((q) => `${q.name} ${q.desc} ${q.objectives.join(" ")} ${q.tag}`.toLowerCase().includes(w));
}

function render() {
  const main = filtered(QUESTS.main || []);
  const sub = filtered(QUESTS.sub || []);
  const board = filtered(QUESTS.board || []);
  const rarity = filtered(QUESTS.rarity || []);
  count.textContent = `${(QUESTS.main || []).length + (QUESTS.sub || []).length + (QUESTS.board || []).length + (QUESTS.rarity || []).length} 个任务`;
  app.innerHTML = `
    <h1 class="page-title">任务</h1>
    <p class="lead">主线任务、支线任务、委托板与角色升阶任务的目标与奖励。</p>
    <p class="note"><strong>仅供参考：</strong>任务内容整理自游戏内容，正式服任务可能随版本调整。</p>
    <div class="toolbar" style="grid-template-columns:minmax(0,1fr)">
      <label>搜索任务<input id="q" type="search" value="${esc(query)}" placeholder="任务名 / 目标 / 描述" autocomplete="off"></label>
    </div>
    ${group("主线任务", main)}
    ${group("支线任务", sub)}
    ${group("委托板", board, "每日/常驻委托，完成后可获得对应奖励。")}
    ${group("角色升阶任务", rarity, "角色稀有度提升所需的任务链。")}
    ${main.length + sub.length + board.length + rarity.length ? "" : `<p class="empty">没有符合条件的任务。</p>`}`;
  document.getElementById("q").addEventListener("input", (e) => {
    query = e.target.value;
    clearTimeout(window.__qt);
    window.__qt = setTimeout(() => {
      render();
      const input = document.getElementById("q");
      if (input) { input.focus(); input.setSelectionRange(input.value.length, input.value.length); }
    }, 200);
  });
}

render();
