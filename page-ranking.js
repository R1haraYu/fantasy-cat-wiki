(() => {
  "use strict";
  const DATA = window.RANK_WIKI;
  const SIM = window.RANK_SIM;
  const $ = (s) => document.querySelector(s);
  if (!DATA || !SIM) {
    document.getElementById("app").innerHTML = '<p class="rank-empty">排行数据加载失败。</p>';
    return;
  }
  const OUTPUT_MODES = {
    single: { label: "单体", title: "单体输出", primary: "DPS" },
    group: { label: "群体", title: "群体输出", primary: "DPS" },
  };
  let activeOutput = "single";
  let activeRows = [];
  let outputCache = null;

  function esc(s) {
    return String(s == null ? "" : s)
      .replaceAll("&", "&amp;").replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  }
  function fmt(n, digits = 1) {
    if (n == null || !Number.isFinite(Number(n))) return "—";
    return Number(n).toLocaleString("zh-CN", { minimumFractionDigits: digits, maximumFractionDigits: digits });
  }
  function kill(v) { return v == null ? "NA" : `${fmt(v, 2)}s`; }
  function outputData() {
    if (!outputCache) outputCache = SIM.output(SIM.defaults.output);
    return outputCache;
  }
  function boardRows() { return activeRows; }
  function primary(r) {
    return fmt(activeOutput === "single" ? r.single.dps : r.group.dps, 1);
  }
  function primaryLabel() { return "DPS"; }
  function secondary(r) {
    if (activeOutput === "single") return `击杀 ${kill(r.single.killTime)} · 总伤 ${fmt(r.single.effective, 0)}`;
    return `清场 ${kill(r.group.killTime)} · 总伤 ${fmt(r.group.effective, 0)}`;
  }
  function avatar(r) {
    return `<span class="rank-avatar"><img src="${esc(r.avatar)}" alt="" loading="lazy" onerror="this.remove()"></span>`;
  }
  function element(r) {
    return `<span class="rank-element"><i>${esc(r.elementSymbol || "—")}</i>${esc(r.elementName || "无")}</span>`;
  }
  function nameLink(r, cls) {
    return r.link ? `<a class="${cls}" href="${esc(r.link)}">${esc(r.name)}</a>` : `<span class="${cls}">${esc(r.name)}</span>`;
  }
  function champion() {
    const top = boardRows()[0];
    if (!top) return "";
    return `<a class="rank-champion" href="${top.link ? esc(top.link) : "javascript:void(0)"}">
      ${avatar(top)}
      <span class="rank-champion-text"><small>当前输出榜首</small><b>${esc(top.name)}</b><em>${primary(top)} DPS</em></span>
    </a>`;
  }
  function outputTabs() {
    return `<div class="rank-subbar">
      <div class="rank-subtabs" role="tablist" aria-label="输出场景">
        ${Object.entries(OUTPUT_MODES).map(([key, m]) => `<button class="rank-tab ${key === activeOutput ? "on" : ""}" type="button" role="tab" aria-selected="${key === activeOutput}" data-output="${key}">${m.label}</button>`).join("")}
      </div>
    </div>`;
  }
  function podium() {
    return `<section class="rank-podium" aria-label="前三名">${boardRows().slice(0, 3).map((r, i) => `
      <article class="rank-podium-card">
        <span class="rank-podium-rank">${i + 1}</span>
        ${avatar(r)}
        <span class="rank-podium-main">
          ${nameLink(r, "rank-podium-name")}
          <span class="rank-podium-meta">${esc(r.roleLabel)} · ${esc(r.elementName)} · DPS</span>
          <span class="rank-podium-meta">${esc(secondary(r))}</span>
        </span>
        <span class="rank-podium-value"><b>${primary(r)}</b><span>DPS</span></span>
      </article>`).join("")}</section>`;
  }
  function player(r) {
    return `<span class="rank-player">${avatar(r)}<span>${nameLink(r, "rank-player-name")}<span class="rank-player-sub">${esc(r.roleLabel)}</span></span></span>`;
  }
  function table() {
    const head = activeOutput === "single"
      ? `<tr><th>排名</th><th>角色</th><th>定位</th><th class="num">有效伤害</th><th class="num">DPS</th><th class="num">击杀时间</th><th>说明</th></tr>`
      : `<tr><th>排名</th><th>角色</th><th>定位</th><th class="num">总伤害</th><th class="num">DPS</th><th class="num">清场时间</th><th>说明</th></tr>`;
    const body = boardRows().map((r) => {
      const cls = r.rank <= 3 ? `top-${r.rank}` : "";
      const m = activeOutput === "single" ? r.single : r.group;
      return `<tr class="${cls}"><td><span class="rank-place">${r.rank}</span></td><td>${player(r)}</td><td>${element(r)}</td><td class="num">${fmt(m.effective, 0)}</td><td class="num rank-primary">${fmt(m.dps, 1)}</td><td class="num">${kill(m.killTime)}</td><td class="rank-muted">${activeOutput === "single" ? "单 Boss" : "4 目标"}</td></tr>`;
    }).join("");
    return `<section class="rank-panel">
      <div class="rank-panel-head"><h2>${esc(OUTPUT_MODES[activeOutput].title)}</h2><span>${boardRows().length} 名角色 · 完整显示</span></div>
      <div class="rank-table-wrap"><table class="rank-table"><thead>${head}</thead><tbody>${body}</tbody></table></div>
    </section>`;
  }
  function scenarioLine() {
    return "测试木桩：1-1-1 的 50 级究极大食花 · 属性无";
  }
  function render() {
    activeRows = outputData()[activeOutput];
    $("#app").innerHTML = `
      <section class="rank-hero">
        <div>
          <p class="rank-kicker">DATA RANKING · ${esc(DATA.version)}</p>
          <h1>输出排行</h1>
          <p class="rank-lead">${esc(scenarioLine())}</p>
        </div>
        <div class="rank-hero-side">
          ${champion()}
        </div>
      </section>
      ${outputTabs()}
      ${podium()}
      ${table()}
      <a class="rank-bottom-link" href="index.html">← 返回角色图鉴</a>
    `;
    document.querySelectorAll("[data-output]").forEach((btn) => btn.addEventListener("click", () => {
      activeOutput = btn.dataset.output;
      render();
    }));
  }
  render();
})();
