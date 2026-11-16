const STORY = window.STORY || { dramas: [], databank: [] };
const app = document.getElementById("app");
const count = document.getElementById("count");

let dbCatalog = "";
let dbQuery = "";

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

function dramaEntry(d) {
  return `<details class="stage">
    <summary>
      <span class="stage-code">${esc(d.code || "剧情")}</span>
      <span class="stage-name">${esc(d.stage || "剧情回顾")}${esc(d.suffix)}</span>
      <span class="chips-inline">${d.type ? badge(d.type) : ""}${d.difficulty ? badge(d.difficulty) : ""}</span>
    </summary>
    <div class="stage-body"><p class="stage-desc">${esc(d.summary)}</p></div>
  </details>`;
}

function dramaSection() {
  const types = [...new Set(STORY.dramas.map((d) => d.type))];
  return types.map((type) => {
    const list = STORY.dramas.filter((d) => d.type === type);
    const chapters = [...new Set(list.map((d) => d.chapter))].filter((c) => c);
    let html = `<h2 class="section-title">${esc(type === "其他" ? "其他剧情" : type + "剧情")}</h2>`;
    if (chapters.length) {
      chapters.forEach((ch) => {
        const group = list.filter((d) => d.chapter === ch);
        html += `<h3 class="story-chapter">第 ${ch} 章</h3><div class="stage-list">${group.map(dramaEntry).join("")}</div>`;
      });
      const rest = list.filter((d) => !d.chapter);
      if (rest.length) html += `<div class="stage-list">${rest.map(dramaEntry).join("")}</div>`;
    } else {
      html += `<div class="stage-list">${list.map(dramaEntry).join("")}</div>`;
    }
    return html;
  }).join("");
}

function dbEntry(e) {
  return `<details class="stage db-entry">
    <summary><span class="stage-name">${esc(e.title)}</span><span class="chips-inline">${e.areaName ? badge(e.areaName) : ""}${e.unlock ? badge(e.unlock) : ""}</span></summary>
    <div class="stage-body">
      <p class="stage-desc">${esc(e.desc)}</p>
      ${e.chapterName ? `<p class="card-meta">${esc(e.chapterName)}</p>` : ""}
    </div>
  </details>`;
}

function databankSection() {
  const catalogs = [...new Set(STORY.databank.map((e) => e.catalogName))];
  const list = STORY.databank.filter((e) => {
    if (dbCatalog && e.catalogName !== dbCatalog) return false;
    if (!dbQuery.trim()) return true;
    return `${e.title}${e.desc}${e.areaName}`.includes(dbQuery.trim());
  });
  const groups = [...new Set(list.map((e) => e.catalogName))];
  return `<div class="toolbar" style="grid-template-columns:minmax(0,2fr) minmax(0,1fr)">
      <label>搜索资料<input id="db-q" value="${esc(dbQuery)}" placeholder="标题 / 内容" autocomplete="off"></label>
      <label>分类<select id="db-cat"><option value="">全部</option>${catalogs.map((c) => `<option value="${esc(c)}" ${c === dbCatalog ? "selected" : ""}>${esc(c)}</option>`).join("")}</select></label>
    </div>
    <div id="db-list">${groups.length ? groups.map((g) => {
      const entries = list.filter((e) => e.catalogName === g);
      const areas = [...new Set(entries.map((e) => e.areaName))];
      return `<h2 class="section-title">${esc(g)}</h2>` + areas.map((a) => `<h3 class="story-chapter">${esc(a || "其他")}</h3><div class="stage-list">${entries.filter((e) => e.areaName === a).map(dbEntry).join("")}</div>`).join("");
    }).join("") : `<p class="empty">没有符合条件的资料。</p>`}</div>`;
}

function render() {
  count.textContent = `${STORY.dramas.length} 段剧情 · ${STORY.databank.length} 条资料`;
  app.innerHTML = `
    <h1 class="page-title">剧情</h1>
    <p class="lead">主线、困难、支线、活动剧情的回顾，以及游戏内资料库（地理建筑 / 人物组织 / 冒险回顾 / 历史人文）。</p>
    <p class="note"><strong>仅供参考：</strong>剧情梗概与资料库内容整理自游戏内容，可能包含未在当前版本开放的内容。</p>
    ${dramaSection()}
    <h2 class="section-title">资料库</h2>
    ${databankSection()}`;
  const q = document.getElementById("db-q");
  const cat = document.getElementById("db-cat");
  const refresh = () => {
    dbQuery = q.value;
    dbCatalog = cat.value;
    const wrap = document.createElement("div");
    wrap.innerHTML = databankSection();
    const old = document.getElementById("db-list");
    old.replaceWith(wrap.querySelector("#db-list"));
    document.getElementById("db-q").addEventListener("input", onInput);
    document.getElementById("db-cat").addEventListener("change", onCat);
  };
  const onInput = (e) => { dbQuery = e.target.value; refresh(); };
  const onCat = (e) => { dbCatalog = e.target.value; refresh(); };
  q.addEventListener("input", onInput);
  cat.addEventListener("change", onCat);
}

render();
