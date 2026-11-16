const WORLD = window.WORLD || { cities: [], areas: [], npcs: [], points: [] };
const app = document.getElementById("app");
const count = document.getElementById("count");

let npcQuery = "";

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

function rewardChip(r) {
  return `<span class="reward-chip">${r.icon ? `<img src="${esc(r.icon)}" alt="" loading="lazy" onerror="this.remove()">` : ""}<span>${esc(r.name)}</span>${r.amount ? `<em>×${esc(r.amount)}</em>` : ""}</span>`;
}

function cityCard(c) {
  const tags = [c.size, c.citizen, c.rating].filter((t) => t && !/^[?？。\s]+$/.test(t)).map((t) => badge(t));
  return `<article class="card city-card">
    <div class="city-art">${c.logo ? `<img src="${esc(c.logo)}" alt="" loading="lazy" onerror="this.remove()">` : c.areaIcon ? `<img src="${esc(c.areaIcon)}" alt="" loading="lazy" onerror="this.remove()">` : ""}</div>
    <div class="card-body">
      <h3 class="card-title">${esc(c.name)}</h3>
      <p class="card-meta">${esc(c.homeName)}</p>
      <p class="card-text">${esc(c.info)}</p>
      <div class="card-tags">${tags.join("")}</div>
      ${c.areas.length ? `<p class="card-meta">区域：${c.areas.map((a) => esc(a)).join("、")}</p>` : ""}
      <p class="card-meta">城镇 NPC：${c.npcCount} 名</p>
    </div>
  </article>`;
}

function areaTable() {
  return `<div class="table-wrap"><table class="data-table"><thead><tr><th>区域</th><th>所属城市</th><th>类型</th><th>解锁条件</th></tr></thead><tbody>
    ${WORLD.areas.map((a) => `<tr><td>${esc(a.name)}</td><td>${esc(a.cityName || "—")}</td><td>${a.isRoom ? "房间" : a.isTown ? "城镇" : "野外"}</td><td>${esc(a.unlock || "—")}</td></tr>`).join("")}
  </tbody></table></div>`;
}

function npcGrid() {
  const q = npcQuery.trim();
  const rows = WORLD.npcs.filter((n) => !q || `${n.name}${n.areaName}${n.npcId}`.includes(q));
  return `<p class="section-sub">共 ${rows.length} 名</p><div class="npc-grid">${rows.map((n) => `<div class="npc-card">
    <span class="npc-avatar">${n.avatar ? `<img src="${esc(n.avatar)}" alt="" loading="lazy" onerror="this.remove()">` : ""}</span>
    <span class="npc-body"><b>${esc(n.name)}</b><em>${esc(n.areaName || "—")}</em></span>
  </div>`).join("")}</div>`;
}

function pointsFold() {
  return `<details class="fold">
    <summary>探索点与宝箱（${WORLD.points.length}）</summary>
    <div class="fold-body">
      <p class="note">世界探索中的宝箱、修复点与采集点，部分点位随主线/困难/支线进度解锁。</p>
      <div class="table-wrap"><table class="data-table"><thead><tr><th>类型</th><th>需求素材</th><th>奖励</th></tr></thead><tbody>
        ${WORLD.points.map((p) => `<tr><td>${esc(p.type)}</td><td>${p.request.length ? p.request.map((x) => `${esc(x.name)}×${esc(x.amount)}`).join("、") : "—"}</td><td><div class="rewards">${p.rewards.length ? p.rewards.map(rewardChip).join("") : "—"}</div></td></tr>`).join("")}
      </tbody></table></div>
    </div>
  </details>`;
}

function render() {
  count.textContent = `${WORLD.cities.length} 城市 · ${WORLD.areas.length} 区域 · ${WORLD.npcs.length} NPC`;
  app.innerHTML = `
    <h1 class="page-title">世界</h1>
    <p class="lead">大陆上的城市与区域、城镇 NPC，以及世界探索中的宝箱与采集点。</p>
    <p class="note"><strong>仅供参考：</strong>世界信息整理自游戏内容；解锁条件与点位奖励以游戏内实际版本为准。</p>
    <h2 class="section-title">城市</h2>
    <div class="grid-cards grid-wide">${WORLD.cities.map(cityCard).join("")}</div>
    <h2 class="section-title">区域</h2>
    ${areaTable()}
    <h2 class="section-title">城镇 NPC</h2>
    <div class="toolbar" style="grid-template-columns:minmax(0,1fr)">
      <label>搜索 NPC<input id="npc-q" placeholder="名字 / 区域" autocomplete="off"></label>
    </div>
    <div id="npc-list">${npcGrid()}</div>
    <h2 class="section-title">探索</h2>
    ${pointsFold()}`;
  document.getElementById("npc-q").addEventListener("input", (e) => {
    npcQuery = e.target.value;
    document.getElementById("npc-list").innerHTML = npcGrid();
  });
}

render();
