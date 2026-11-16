const SYSTEMS = window.SYSTEMS || {};
const app = document.getElementById("app");
const count = document.getElementById("count");

const TABS = ["战令", "商店", "竞技场", "家园", "雇员", "成就", "收藏"];

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
function fmt(n) {
  if (n == null || n === "") return "";
  const num = Number(n);
  if (!Number.isFinite(num)) return String(n);
  if (Number.isInteger(num)) return String(num);
  return String(Math.round(num * 1000) / 1000);
}
function itemChip(r) {
  if (!r) return "—";
  return `<span class="reward-chip">${r.icon ? `<img src="${esc(r.icon)}" alt="" loading="lazy" onerror="this.remove()">` : ""}<span>${esc(r.name || "")}</span>${r.amount ? `<em>×${esc(r.amount)}</em>` : ""}</span>`;
}
function chips(list) {
  if (!list || !list.length) return "—";
  return `<div class="rewards">${list.map(itemChip).join("")}</div>`;
}
function kv(rows) {
  return `<ul class="kv-list">${rows.map(([k, v]) => `<li><b>${esc(k)}</b><span>${esc(v)}</span></li>`).join("")}</ul>`;
}
function panel(title, inner, note) {
  return `<section class="panel"><h2>${esc(title)}</h2>${note ? `<p class="stat-note">${esc(note)}</p>` : ""}${inner}</section>`;
}
function table(headers, rows) {
  return `<div class="table-wrap"><table class="data-table"><thead><tr>${headers.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div>`;
}

function renderBattlePass() {
  const b = SYSTEMS.battlepass || {};
  const d = b.defines || {};
  const seasonsList = (b.seasons || []).filter((s) => !String(s.id).startsWith("T"));
  const seasonName = Object.fromEntries(seasonsList.map((s) => [s.id, s.title]));
  const regionName = { tw: "繁中", cn: "简中", "": "通用" };
  const seasons = seasonsList.map((s) => `<tr><td>${esc(s.title)}</td><td>${esc(regionName[s.region] || "通用")}</td><td>${esc(s.start)}</td><td>${esc(s.end)}</td></tr>`).join("");
  const rewards = (b.rewards || []).filter((r) => !String(r.season).startsWith("T")).map((r) => `<tr><td>${esc(seasonName[r.season] || r.season)}</td><td class="num">${esc(fmt(r.tier))}</td><td>${itemChip(r.free)}</td><td>${itemChip(r.paid)}</td></tr>`).join("");
  const missions = (b.missions || []).filter((m) => !String(m.season).startsWith("T")).map((m) => `<tr><td>${esc(seasonName[m.season] || m.season)}</td><td class="num">第 ${esc(fmt(m.week))} 周</td><td class="num">${esc(fmt(m.exp))}</td><td>${esc(m.desc)}</td></tr>`).join("");
  return panel("战令规则", kv([
    ["每级经验", d.expPerTier], ["等级上限", d.maxTier], ["进阶价格", d.price ? `${d.price.name} × ${d.price.amount}` : ""],
    ["单级购买", d.pricePerTier ? `${d.pricePerTier.name} × ${d.pricePerTier.amount}` : ""], ["单次最多购买", d.maxTierPerPurchase],
  ]))
    + panel("赛季", table(["赛季", "地区", "开始", "结束"], seasons))
    + panel("战令奖励", table(["赛季", "等级", "免费", "进阶"], rewards))
    + panel("战令任务", table(["赛季", "周", "经验", "任务"], missions));
}

function renderShop() {
  const rows = (SYSTEMS.shop?.normal || []).map((r) => `<tr><td>${itemChip(r.product)}</td><td class="num">×${esc(fmt(r.amount))}</td><td>${itemChip(r.currency)} × ${esc(fmt(r.price))}</td><td class="num">${esc(fmt(r.limit))}</td></tr>`).join("");
  return panel("日常商店", table(["商品", "数量", "价格", "限购"], rows), "商店商品与价格会随版本调整。");
}

function renderArena() {
  const a = SYSTEMS.arena || {};
  const d = a.defines || {};
  const ranks = (a.ranks || []).map((r) => `<tr><td>${esc(r.name)}</td><td class="num">${esc(fmt(r.lv))}</td><td class="num">${esc(fmt(r.low))} ~ ${esc(fmt(r.high))}</td><td>${chips(r.rewards)}</td><td class="num">${esc(fmt(r.coinDaily))}</td><td class="num">${esc(fmt(r.coinWin))}</td></tr>`).join("");
  const exchange = (a.exchange || []).map((r) => `<tr><td>${chips([r])}</td><td class="num">${esc(fmt(r.coin))} ${esc(a.coin?.name || "竞技币")}</td><td class="num">${esc(fmt(r.limit))}</td><td>${esc(r.periodName || r.period || "")}</td></tr>`).join("");
  return panel("竞技场规则", kv([
    ["房间规模", d.roomSize], ["机器人数量", d.botAmount], ["最低等级", d.minLevel], ["每日挑战次数", d.dailyChallenge],
    ["重置消耗", (d.resetCost || []).join(" / ")], ["重置次数上限", d.resetLimit],
    ["竞技币", a.coin?.name || ""], ["竞技点", a.pt?.name || ""],
  ]))
    + panel("段位", table(["段位", "等级", "积分范围", "每日奖励", "每日币", "胜利币"], ranks))
    + panel("竞技场兑换", table(["奖励", "消耗", "限购", "刷新周期"], exchange));
}

function renderHome() {
  const slots = SYSTEMS.home?.slots || [];
  const rows = slots.map((s) => {
    const up = s.upgrades || {};
    const lvText = [1, 2, 3, 4].map((lv) => (up[lv] && up[lv].length ? `${lv} 级：${up[lv].map((x) => `${x.name}×${x.amount}`).join("、")}` : "")).filter(Boolean).join("<br>");
    return `<tr><td>${esc(s.furnitureTypeName || "")}</td><td>${s.isProduce ? "产出" : "普通"}</td><td class="num">${esc(fmt(s.produceValue))} / 小时</td><td class="num">${esc(fmt(s.maxLevel))}</td><td>${esc((s.produceStoreVals || []).join(" / "))}</td><td>${lvText}</td></tr>`;
  }).join("");
  return panel("家园生产位升级", table(["类型", "用途", "产出", "等级上限", "仓储", "升级材料"], rows), "家具/生产位的产出与升级材料来自游戏内配置。");
}

function renderLabor() {
  const l = SYSTEMS.labor || {};
  const RARITY_LABEL = { 1: "稀有度 1", 2: "稀有度 2", 3: "稀有度 3", 4: "稀有度 4", 5: "稀有度 5" };
  const chars = (l.characters || []).map((c) => {
    const busts = (c.largeBusts || c.busts || []).filter(Boolean);
    const bustRow = busts.length
      ? `<h4 class="mini-title">立绘变化</h4><div class="labor-busts">${busts.map((src, i) => `<figure class="labor-bust"><img src="${esc(src)}" alt="" loading="lazy" onerror="this.parentElement.remove()"><figcaption>${RARITY_LABEL[i + 1] || ""}</figcaption></figure>`).join("")}</div>`
      : "";
    const upRows = (c.upgrades || []).map((u) => {
      const mats = (u.items || []).map((x) => `${esc(x.name)}×${esc(fmt(x.amount))}`).join("、") || "—";
      const qs = (c.quests?.[u.rarity] || []).map((q) => esc(q.title)).join("；") || "无额外任务";
      return `<tr><td>突破 ${esc(fmt(u.rarity))} 阶</td><td>${mats}</td><td>${qs}</td></tr>`;
    }).join("");
    const abRows = Object.entries(c.abilities || {}).map(([lv, arr]) => `<tr><td>${esc(lv)} 阶</td><td>${arr.map((x) => esc(x.title)).join("、")}</td></tr>`).join("");
    return `<article class="card card-block">
      <div class="labor-head">
        <div class="card-art">${c.icon ? `<img src="${esc(c.icon)}" alt="" loading="lazy" onerror="this.remove()">` : ""}</div>
        <div class="card-body">
          <h3 class="card-title">${esc(c.name)}</h3>
          <p class="card-meta">${esc(c.race || "")} · ${esc(c.city || "")}${c.age ? " · " + esc(c.age) + " 岁" : ""}</p>
          <p class="card-text">${esc(c.desc)}</p>
          ${c.keyItem ? `<p class="card-meta">解锁道具：${itemChip(c.keyItem)}</p>` : ""}
        </div>
      </div>
      <details class="fold" style="margin:10px 0 0">
        <summary>立绘、突破材料与任务、雇员能力</summary>
        <div class="fold-body">
          ${bustRow}
          <h4 class="mini-title">突破所需材料与任务</h4>
          <div class="table-wrap"><table class="data-table"><thead><tr><th>阶段</th><th>所需材料</th><th>突破任务</th></tr></thead><tbody>${upRows || `<tr><td colspan="3">暂无突破数据</td></tr>`}</tbody></table></div>
          <h4 class="mini-title">雇员能力（按稀有度阶段）</h4>
          <div class="table-wrap"><table class="data-table"><thead><tr><th>阶段</th><th>能力</th></tr></thead><tbody>${abRows || `<tr><td colspan="2">暂无能力数据</td></tr>`}</tbody></table></div>
        </div>
      </details>
    </article>`;
  }).join("");
  const points = (l.points || []).map((p) => `<tr><td>${esc(p.name)}</td><td>${esc(p.city)}</td><td class="num">${esc(fmt(p.duration))} 分钟</td><td>${esc(fmt(p.chapter))}-${esc(fmt(p.level))}</td><td>${chips(p.rewards)}</td></tr>`).join("");
  const bonus = (l.bonus || []).map((b) => `<tr><td class="num">${esc(fmt(b.index))}</td><td>${chips(b.rewards)}</td></tr>`).join("");
  return panel("雇员", `<div class="labor-list">${chars}</div>`)
    + panel("远征地", table(["地点", "城市", "时长", "解锁关卡", "奖励"], points))
    + panel("额外奖励池", table(["编号", "奖励"], bonus));
}

function renderAchievements() {
  const rows = (SYSTEMS.achievements || []).map((a) => `<tr><td class="num">${esc(fmt(a.index))}</td><td>${esc(a.desc)}</td><td>${chips(a.rewards)}</td></tr>`).join("");
  return panel("成就", `<div class="table-wrap"><table class="data-table"><thead><tr><th>编号</th><th>成就</th><th>奖励</th></tr></thead><tbody>${rows}</tbody></table></div>`);
}

function renderCollection() {
  const c = SYSTEMS.collection || {};
  const bp = (c.bp || []).map((b) => `<article class="card"><div class="card-art">${b.icon ? `<img src="${esc(b.icon)}" alt="" loading="lazy" onerror="this.remove()">` : ""}</div><div class="card-body"><h3 class="card-title">${esc(b.name)}</h3><p class="card-text">${esc(b.desc)}</p>${(b.recipe || []).length ? `<p class="card-meta">配方：${b.recipe.map((r) => `${esc(r.name)} ×${esc(fmt(r.min))}-${esc(fmt(r.max))}${r.bonus ? "（+成功率 " + Math.round(r.bonus * 100) + "%）" : ""}`).join("、")}</p>` : ""}</div></article>`).join("");
  const daily = (c.daily || []).map((d) => `<tr><td class="num">第 ${esc(fmt(d.day))} 天</td><td>${chips(d.rewards)}</td></tr>`).join("");
  const newbie = (c.newbie || []).map((d) => `<tr><td class="num">第 ${esc(fmt(d.day))} 天</td><td>${chips(d.rewards)}</td></tr>`).join("");
  const topup = (c.firstTopup || []).map((d) => `<tr><td class="num">第 ${esc(fmt(d.day))} 天</td><td>${chips(d.rewards)}</td></tr>`).join("");
  return panel("收藏", `<div class="grid-cards grid-wide">${bp}</div>`)
    + panel("每日登录", table(["天数", "奖励"], daily))
    + panel("新手登录", table(["天数", "奖励"], newbie))
    + panel("首充奖励", table(["档位", "奖励"], topup));
}

const RENDER = {
  "战令": renderBattlePass, "商店": renderShop, "竞技场": renderArena,
  "家园": renderHome, "雇员": renderLabor, "成就": renderAchievements, "收藏": renderCollection,
};

function currentTab() {
  const key = decodeURIComponent((location.hash || "").replace(/^#\/?/, ""));
  return RENDER[key] ? key : "战令";
}

function render() {
  const tab = currentTab();
  count.textContent = "玩法系统";
  app.innerHTML = `
    <h1 class="page-title">玩法系统</h1>
    <p class="lead">战令、商店、竞技场、家园、雇员、成就与收藏等系统资料。</p>
    <p class="note"><strong>仅供参考：</strong>系统规则与数值整理自游戏内容，部分会随版本/活动调整，以游戏内为准。</p>
    <div class="sys-tabs">${TABS.map((name) => `<a class="tab ${name === tab ? "on" : ""}" href="#${encodeURIComponent(name)}">${esc(name)}</a>`).join("")}</div>
    <div id="sys-body">${RENDER[tab]()}</div>`;
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", render);
render();
