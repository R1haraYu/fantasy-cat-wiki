const MAP_DATA = window.MAP_DATA || { maps: [] };
const MAPS = MAP_DATA.maps || [];
const app = document.getElementById("app");
const count = document.getElementById("count");

const state = {
  mapId: MAPS[0] ? MAPS[0].id : "",
  q: "",
  kind: "all",
  selected: null,
  scale: 1,
  tx: 0,
  ty: 0,
};

function esc(text) {
  return String(text == null ? "" : text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function currentMap() {
  return MAPS.find((m) => m.id === state.mapId) || MAPS[0];
}

function readHash() {
  const raw = (location.hash || "").replace(/^#\/?/, "");
  if (!raw) return;
  const [mapId, markerId] = raw.split("/");
  const map = MAPS.find((m) => m.id === mapId);
  if (!map) return;
  state.mapId = map.id;
  state.selected = markerId ? map.markers.find((x) => x.id === decodeURIComponent(markerId)) || null : null;
}

function writeHash() {
  const suffix = state.selected ? "/" + encodeURIComponent(state.selected.id) : "";
  const next = "#/" + state.mapId + suffix;
  if (location.hash !== next) history.replaceState(null, "", next);
}

function markerKindLabel(kind) {
  return kind === "npc" ? "NPC" : kind;
}

function filtered() {
  const map = currentMap();
  const q = state.q.trim().toLowerCase();
  return map.markers.filter((m) => {
    if (state.kind !== "all" && markerKindLabel(m.kind) !== state.kind) return false;
    if (!q) return true;
    return `${m.name} ${m.type} ${m.meta} ${m.detail} ${m.id}`.toLowerCase().includes(q);
  });
}

function mapTabs() {
  return `<div class="map-tabs" role="tablist">${MAPS.map((m) => `<button class="map-tab ${m.id === state.mapId ? "on" : ""}" data-map="${esc(m.id)}" role="tab" aria-selected="${m.id === state.mapId}">
    <b>${esc(m.name)}</b><em>${m.markers.length}</em>
  </button>`).join("")}</div>`;
}

function filterChips() {
  const map = currentMap();
  const kinds = ["all", "NPC", "宝箱", "采集点", "修复点"].filter((k) => k === "all" || map.markers.some((m) => markerKindLabel(m.kind) === k));
  return kinds.map((k) => `<button class="chip ${state.kind === k ? "on" : ""}" data-kind="${esc(k)}">${k === "all" ? "全部" : esc(k)}</button>`).join("");
}

function markerHtml(m, idx) {
  const kindClass = m.kind === "npc" ? "npc" : "point";
  const icon = m.icon ? `<img src="${esc(m.icon)}" alt="" loading="lazy" onerror="this.remove()">` : `<span class="map-pin-initial">${esc((m.name || "?").slice(0, 1))}</span>`;
  return `<button class="map-pin ${kindClass} kind-${esc(m.kind)} ${state.selected && state.selected.id === m.id ? "sel" : ""}" data-idx="${idx}" style="left:${m.nx * 100}%;top:${m.ny * 100}%" title="${esc(m.name)}">
    <span class="map-pin-dot">${icon}</span>
    <span class="map-pin-label">${esc(m.name)}</span>
  </button>`;
}

function listHtml(rows) {
  if (!rows.length) return `<p class="empty">当前地图没有匹配的点位</p>`;
  return rows.map((m) => {
    const active = state.selected && state.selected.id === m.id;
    const icon = m.icon ? `<img src="${esc(m.icon)}" alt="" loading="lazy" onerror="this.remove()">` : `<span class="map-initial">${esc((m.name || "?").slice(0, 1))}</span>`;
    return `<button class="map-list-item ${active ? "on" : ""}" data-id="${esc(m.id)}">
      <span class="map-list-icon">${icon}</span>
      <span class="map-list-body"><b>${esc(m.name)}</b><em>${esc(m.meta)}</em></span>
    </button>`;
  }).join("");
}

function detailHtml(m) {
  if (!m) return `<p class="map-detail-empty">选择点位查看详情。</p>`;
  return `<span class="map-detail-kind">${esc(markerKindLabel(m.kind))}</span>
    <h3>${esc(m.name)}</h3>
    <p class="map-detail-meta">${esc(m.meta)}</p>
    <p>${esc(m.detail)}</p>`;
}

function render() {
  const map = currentMap();
  if (!map) {
    app.innerHTML = `<h1 class="page-title">地图</h1><p class="empty">暂无地图数据。</p>`;
    return;
  }
  const rows = filtered();
  if (state.selected && !rows.some((m) => m.id === state.selected.id)) state.selected = null;
  const total = MAPS.reduce((n, m) => n + m.markers.length, 0);
  count.textContent = `${MAPS.length} 张地图 · ${total} 个点位`;
  app.innerHTML = `
    <h1 class="page-title">地图</h1>
    <p class="lead">按区域查找城镇 NPC、宝箱、采集点与修复点。</p>
    <div class="map-tabs-wrap">${mapTabs()}</div>
    <div class="map-toolbar">
      <label class="map-search"><span>搜索点位 / NPC</span><input id="map-q" type="search" placeholder="名字、类型、奖励…" autocomplete="off" value="${esc(state.q)}"></label>
      <div class="chips map-chips">${filterChips()}</div>
    </div>
    <div class="map-layout">
      <section class="map-panel">
        <div class="map-bar"><b>${esc(map.name)}</b><span>${esc(map.city)} · ${esc(map.kind)} · 当前 ${rows.length} 个点位</span></div>
        <div class="map-stage" id="map-stage">
          <div class="map-canvas" id="map-canvas">
            <img class="map-image" id="map-image" src="${esc(map.image)}" alt="${esc(map.name)}地图" onerror="this.style.display='none';document.getElementById('map-stage').classList.add('missing')">
            <div class="map-pins" id="map-pins">${rows.map(markerHtml).join("")}</div>
            <img class="map-arrow" id="map-arrow" src="img/map/arrow.png" alt="">
          </div>
          <div class="map-zoom"><button id="map-zoom-out" type="button">−</button><button id="map-zoom-in" type="button">+</button></div>
        </div>
        <div class="map-legend"><span><i class="lg npc"></i>NPC</span><span><i class="lg chest"></i>宝箱</span><span><i class="lg gather"></i>采集点</span><span><i class="lg repair"></i>修复点</span><em>浅色 = 可通行道路</em></div>
      </section>
      <aside class="map-side">
        <div class="map-side-head"><b>${esc(map.name)}</b><span>${rows.length} / ${map.markers.length}</span></div>
        <div class="map-list" id="map-list">${listHtml(rows)}</div>
        <div class="map-detail" id="map-detail">${detailHtml(state.selected)}</div>
      </aside>
    </div>`;
  bind();
  updateArrow();
}

function updateArrow() {
  const arrow = document.getElementById("map-arrow");
  if (!arrow) return;
  const m = state.selected;
  if (!m) { arrow.style.display = "none"; return; }
  arrow.style.display = "block";
  arrow.style.left = `${m.nx * 100}%`;
  arrow.style.top = `${m.ny * 100}%`;
}

function applyTransform() {
  const canvas = document.getElementById("map-canvas");
  if (canvas) canvas.style.transform = `translate(${state.tx}px, ${state.ty}px) scale(${state.scale})`;
}

function selectMarker(id) {
  const map = currentMap();
  const m = map.markers.find((x) => x.id === id);
  if (!m) return;
  state.selected = m;
  document.querySelectorAll(".map-pin").forEach((el) => {
    const pin = map.markers[Number(el.dataset.idx)];
    el.classList.toggle("sel", !!pin && pin.id === m.id);
  });
  document.querySelectorAll(".map-list-item").forEach((el) => el.classList.toggle("on", el.dataset.id === m.id));
  document.getElementById("map-detail").innerHTML = detailHtml(m);
  updateArrow();
  writeHash();
}

function setMap(mapId, markerId) {
  const map = MAPS.find((m) => m.id === mapId);
  if (!map) return;
  state.mapId = map.id;
  state.selected = markerId ? map.markers.find((x) => x.id === markerId) || null : null;
  state.scale = 1;
  state.tx = 0;
  state.ty = 0;
  render();
  writeHash();
}

function bind() {
  document.querySelectorAll(".map-tab").forEach((el) => el.addEventListener("click", () => setMap(el.dataset.map)));
  document.querySelectorAll(".map-chips .chip").forEach((el) => el.addEventListener("click", () => {
    state.kind = el.dataset.kind;
    render();
  }));
  const q = document.getElementById("map-q");
  q.addEventListener("input", () => {
    state.q = q.value;
    render();
    document.getElementById("map-q").focus();
    document.getElementById("map-q").setSelectionRange(state.q.length, state.q.length);
  });
  document.querySelectorAll(".map-pin").forEach((el) => el.addEventListener("click", (ev) => {
    ev.stopPropagation();
    const marker = filtered()[Number(el.dataset.idx)];
    if (marker) selectMarker(marker.id);
  }));
  document.querySelectorAll(".map-list-item").forEach((el) => el.addEventListener("click", () => selectMarker(el.dataset.id)));
  const stage = document.getElementById("map-stage");
  const canvas = document.getElementById("map-canvas");
  if (stage && canvas) {
    let drag = null;
    stage.addEventListener("pointerdown", (ev) => {
      if (ev.target.closest(".map-pin")) return;
      drag = { x: ev.clientX, y: ev.clientY, tx: state.tx, ty: state.ty };
      stage.classList.add("dragging");
      stage.setPointerCapture(ev.pointerId);
    });
    stage.addEventListener("pointermove", (ev) => {
      if (!drag) return;
      state.tx = drag.tx + (ev.clientX - drag.x);
      state.ty = drag.ty + (ev.clientY - drag.y);
      applyTransform();
    });
    stage.addEventListener("pointerup", () => { drag = null; stage.classList.remove("dragging"); });
    stage.addEventListener("pointercancel", () => { drag = null; stage.classList.remove("dragging"); });
    stage.addEventListener("wheel", (ev) => {
      ev.preventDefault();
      state.scale = Math.min(3, Math.max(0.6, state.scale + (ev.deltaY < 0 ? 0.1 : -0.1)));
      applyTransform();
    }, { passive: false });
  }
  const zin = document.getElementById("map-zoom-in");
  const zout = document.getElementById("map-zoom-out");
  if (zin) zin.addEventListener("click", () => { state.scale = Math.min(3, state.scale + 0.2); applyTransform(); });
  if (zout) zout.addEventListener("click", () => { state.scale = Math.max(0.6, state.scale - 0.2); applyTransform(); });
}

readHash();
render();
window.addEventListener("hashchange", () => {
  readHash();
  render();
});
