(() => {
  const CODEX = window.CODEX || [];
  const EXTRA = window.CHAR_EXTRA || {};
  const ASSETS = window.CHARACTER_ASSETS || {};
  const VOICE = window.CHARACTER_VOICE || {};
  const query = new URLSearchParams(location.search);
  const id = Number(query.get('id') || 10001);
  const c = CODEX.find((item) => item.id === id) || CODEX[0];
  if (!c) { document.body.innerHTML = '<p style="padding:40px">没有角色数据。</p>'; return; }
  if (c.hidden && query.get('includeHidden') !== '1') {
    document.title = '未实装角色 · 幻想之都的黑猫';
    document.body.innerHTML = '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f7efe2;color:#2f4c3d;font:16px/1.8 Microsoft YaHei,serif;text-align:center"><div><h1 style="font-size:28px;margin:0 0 10px">尚未实装</h1><p style="margin:0 0 18px;color:#8a7960">该角色目前未实装，图鉴暂不展示。</p><a href="index.html" style="color:#8f6b70">← 返回角色图鉴</a></div></div>';
    return;
  }
  const x = EXTRA[String(c.id)] || {};
  const asset = ASSETS[String(c.id)] || { skins: [] };
  const skins = asset.skins.length ? asset.skins : [{ index: 0, name: c.name, desc: '', avatar: '', bust: '', art: '' }];
  const battle = x.battle || {};
  const isOmega = Number(c.id) === 10035;
  let mode = 'full';
  const $ = (s) => document.querySelector(s);
  const esc = (v) => String(v == null ? '' : v).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const placeholder = (name) => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="100%" height="100%" fill="#ded2bf"/><text x="50%" y="52%" fill="#7c6a50" font-size="96" text-anchor="middle" font-family="serif">' + esc(String(name || '?').slice(0, 1)) + '</text></svg>'
  );
  const setImg = (el, path, fallbackName) => {
    if (!el) return;
    el.onerror = () => { el.onerror = null; el.src = placeholder(fallbackName || c.name); };
    el.src = path || placeholder(fallbackName || c.name);
  };
  const elementIcon = (name) => ({ '王剑': 'Spade', '圣杯': 'Heart', '权杖': 'Club', '星穹': 'Diamond', '高塔': 'Joker', '愚者': 'Clown' }[name] || 'None');
  const jobIcon = (name) => ({ '勇者': 'Warrior', '战士': 'Fighter', '干扰': 'Saboteur', '游侠': 'Ranger', '疗愈': 'Healer', '界外': 'Outsider' }[name] || 'None');
  const rank = Math.max(1, Math.min(4, Number(c.rarityRank) || 1));
  const rarityIcon = 'img/rarity/T_Avatar_Rarity_' + rank + '.png';
  document.title = c.name + ' · 角色图鉴 · 幻想之都的黑猫';

  // Header
  setImg($('#heroPortrait'), skins[0].avatar || asset.icon, c.name);
  $('#heroId').textContent = 'ID · ' + c.id;
  $('#heroName').textContent = c.name;
  const tags = [
    '<span class="tag rare">' + esc(c.rarity) + '</span>',
    '<span class="tag" title="属性：' + esc(c.element) + '"><img src="img/element/T_Icon_Elemental_' + elementIcon(c.element) + '_' + rank + '.png" alt="">' + esc(c.element) + '</span>',
    '<span class="tag" title="职业：' + esc(c.job) + '"><img src="img/job/T_Icon_Job_' + jobIcon(c.job) + '_' + rank + '.png" alt="">' + esc(c.job) + '</span>'
  ];
  if (c.race) tags.push('<span class="tag">' + esc(c.race) + '</span>');
  if (c.hidden) tags.push('<span class="status-badge off">未实装</span>');
  $('#heroTags').innerHTML = tags.join('');
  const badge = $('#rarityBadge'); badge.onerror = () => { badge.style.display = 'none'; }; badge.src = rarityIcon; badge.alt = c.rarity;
  $('#heroFacts').innerHTML = [
    c.height ? '<span><em>身高</em><b>' + esc(c.height) + '</b></span>' : '',
    c.birthday ? '<span><em>生日</em><b>' + esc(c.birthday) + '</b></span>' : '',
    c.constellation ? '<span><em>星座</em><b>' + esc(c.constellation) + '</b></span>' : ''
  ].join('');
  $('#roleline').innerHTML = [
    ['属性', c.element], ['职业', c.job], ['种族', c.race], ['武器', battle.weaponName], ['距离', battle.combatDistanceName]
  ].filter(([, v]) => v).map(([k, v]) => '<span>' + esc(k) + '<b>' + esc(v) + '</b></span>').join('');
  $('#sideName').textContent = c.name + ' · ' + c.id;
  const city = x.city || '', home = x.homeCity || '';
  $('#sideMeta').textContent = city && home && city !== home ? '城市：' + city + ' / ' + home : (city || home) ? '城市：' + (city || home) : '城市：—';
  $('#stageId').textContent = 'ID · ' + c.id;
  $('#stageName').textContent = c.name;
  $('#stageMeta').textContent = [c.rarity, c.element, c.job].filter(Boolean).join(' · ');
  $('#sealRarity').textContent = c.rarity;
  $('#sealElement').textContent = c.element || '';

  // Stats
  const STAR_SCALE = [1, 1.1, 1.3, 1.6, 2, 2.5];
  function roundEven(n) {
    const scaled = Math.round(n * 1000), whole = Math.trunc(scaled / 1000), frac = ((scaled % 1000) + 1000) % 1000;
    if (frac > 500 || (frac === 500 && Math.abs(whole % 2) === 1)) return whole + 1;
    return whole;
  }
  function grownInt(base, grow, steps) { return (base || 0) + roundEven((grow || 0) * steps); }
  function atLevel(stats, level, star) {
    const steps = Math.max(0, level - 1), ss = STAR_SCALE[star] || 1;
    const hpAtk = ss + (c.rarity === 'SSR' ? 0.1 : c.rarity === 'SR' ? 0.05 : 0);
    return {
      hp: roundEven(grownInt(stats.hp, stats.hpGrow, steps) * hpAtk),
      atk: roundEven(grownInt(stats.atk, stats.atkGrow, steps) * hpAtk),
      def: roundEven(grownInt(stats.def, stats.defGrow, steps) * ss),
      mind: roundEven(grownInt(stats.mind, stats.mindGrow, steps) * ss),
      crit: Math.round(((stats.crit || 0) + (stats.critGrow || 0) * steps) * 1000) / 10,
      critDmg: Math.round(((stats.critDmg || 1.5) + (stats.critDmgGrow || 0) * steps) * 1000) / 10,
      spd: grownInt(stats.spd, stats.spdGrow, steps),
      acc: stats.acc
    };
  }
  const baseRows = [
    ['hp', '生命', 'hp', 'hpGrow'], ['atk', '攻击', 'atk', 'atkGrow'], ['def', '防御', 'def', 'defGrow'], ['mind', '精神', 'mind', 'mindGrow'],
    ['crit', '暴击', 'crit', null], ['critDmg', '暴伤', 'critDmg', null], ['spd', '速度', 'spd', null], ['acc', '精准', 'acc', null]
  ];
  const fmt = (key, v) => (key === 'crit' || key === 'critDmg') ? (Math.round(v * 10) / 10) + '%' : String(v);
  $('#baseStats').innerHTML = baseRows.map(([key, label, field, growth]) => {
    const raw = key === 'crit' ? Math.round((c.stats[field] || 0) * 1000) / 10 + '%' : key === 'critDmg' ? Math.round((c.stats[field] || 1.5) * 1000) / 10 + '%' : (c.stats[field] ?? '—');
    return '<div class="stat"><em>' + label + '</em><b>' + raw + '</b></div>';
  }).join('');
  $('#currentStats').innerHTML = [['hp', '生命'], ['atk', '攻击'], ['def', '防御'], ['mind', '精神'], ['crit', '暴击'], ['spd', '速度']]
    .map(([key, label]) => '<div class="stat"><em>' + label + '</em><b data-stat="' + key + '">—</b></div>').join('');
  let level = 80, star = 0;
  function paintStats() {
    $('#panel-tag').textContent = 'Lv.' + level + ' · ' + star + '★';
    const v = atLevel(c.stats, level, star);
    document.querySelectorAll('[data-stat]').forEach((el) => { el.textContent = fmt(el.dataset.stat, v[el.dataset.stat]); });
  }
  $('#lv').addEventListener('input', (e) => { level = Math.min(80, Math.max(1, Number(e.target.value) || 1)); $('#lv-range').value = level; paintStats(); });
  $('#lv-range').addEventListener('input', (e) => { level = Number(e.target.value); $('#lv').value = level; paintStats(); });
  $('#starBtns').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-star]'); if (!b) return;
    star = Number(b.dataset.star);
    $('#starBtns').querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b));
    paintStats();
  });
  paintStats();

  // Skills
  const skillsState = (c.skills || []).map(() => 4);
  function descAt(skill, idx) {
    let html = esc(skill.desc || '');
    (skill.levels || []).forEach((group, i) => {
      const value = Array.isArray(group) ? (group[idx] != null ? group[idx] : group[group.length - 1]) : group;
      if (value != null) html = html.replaceAll('{$T' + (i + 1) + '}', '<b>' + esc(value) + '</b>');
    });
    return html.replace(/\{\$T\d+\}/g, '');
  }
  function renderSkills() {
    const host = $('#skills');
    if (!c.skills || !c.skills.length) { host.innerHTML = '<p class="empty">暂无技能数据。</p>'; return; }
    host.innerHTML = c.skills.map((sk, i) => {
      const icon = (x.skillIcons || {})[sk.slot] || '';
      const hasLevels = (sk.levels || []).length > 0;
      const iconHtml = icon ? '<img src="' + esc(icon) + '" alt="" onerror="this.remove()">' : '<span class="skill-icon-fallback"></span>';
      return '<div class="skill' + (hasLevels ? '' : ' empty-levels') + '" data-skill-index="' + i + '">' + iconHtml + '<div><h4>' + esc(sk.name) + ' <span>' + esc(sk.slot) + '</span></h4><p class="skill-desc">' + descAt(sk, hasLevels ? skillsState[i] : 0) + '</p></div>' + (hasLevels ? '<div class="skill-ctl"><button data-skill="' + i + '" data-dir="-1">−</button><span class="lv">Lv.' + (skillsState[i] + 1) + '</span><button data-skill="' + i + '" data-dir="1">+</button></div>' : '') + '</div>';
    }).join('');
    host.querySelectorAll('.skill-ctl button').forEach((b) => b.addEventListener('click', () => {
      const i = Number(b.dataset.skill), dir = Number(b.dataset.dir);
      skillsState[i] = Math.max(0, Math.min(4, skillsState[i] + dir));
      const card = host.querySelector('[data-skill-index="' + i + '"]');
      card.querySelector('.skill-desc').innerHTML = descAt(c.skills[i], skillsState[i]);
      card.querySelector('.lv').textContent = 'Lv.' + (skillsState[i] + 1);
    }));
  }
  renderSkills();

  // Weapon / range / profile
  $('#weaponName').textContent = battle.weaponName || '—';
  $('#weaponDesc').textContent = battle.weaponDesc || '—';
  $('#combatRange').textContent = battle.combatDistanceName || '—';
  $('#atp').textContent = battle.atpPriority != null ? battle.atpPriority : '—';
  $('#profileText').innerHTML = (c.bio || '暂无角色档案。').split(/\n/).map((p) => p ? '<p>' + esc(p) + '</p>' : '').join('');

  // Skins
  let skinIndex = 0;
  const dots = $('#skinDots');
  dots.innerHTML = skins.map((s, i) => '<button data-skin="' + i + '" class="' + (i === 0 ? 'on' : '') + '"></button>').join('');
  $('#stageSkinSwitch').innerHTML = skins.map((s, i) => '<button data-stage-skin="' + i + '" class="' + (i === 0 ? 'on' : '') + '">皮肤 ' + (i + 1) + '</button>').join('');
  function skinTag(s, i) {
    const src = (x.skins || [])[i] || {};
    if (src.unlockMethod === 0) return '初始';
    if (src.unlockMethod === 1) return '突破 ' + (src.unlockParam || '');
    return '皮肤 ' + (i + 1);
  }
  function selectSkin(i) {
    skinIndex = (i + skins.length) % skins.length;
    const s = skins[skinIndex];
    setImg($('#skinArt'), s.art || s.avatar || s.bust, c.name);
    $('#skinName').textContent = s.name || c.name;
    $('#skinTag').textContent = skinTag(s, skinIndex);
    $('#skinDesc').textContent = s.desc || '';
    dots.querySelectorAll('button').forEach((b) => b.classList.toggle('on', Number(b.dataset.skin) === skinIndex));
    document.querySelectorAll('#stageSkinSwitch button').forEach((b) => b.classList.toggle('on', Number(b.dataset.stageSkin) === skinIndex));
    if (typeof renderStage === 'function') renderStage();
  }
  $('#skinPrev').addEventListener('click', () => selectSkin(skinIndex - 1));
  $('#skinNext').addEventListener('click', () => selectSkin(skinIndex + 1));
  dots.addEventListener('click', (e) => { const b = e.target.closest('button[data-skin]'); if (b) selectSkin(Number(b.dataset.skin)); });
  $('#stageSkinSwitch').addEventListener('click', (e) => { const b = e.target.closest('button[data-stage-skin]'); if (b) selectSkin(Number(b.dataset.stageSkin)); });
  // Initial stage is rendered after stage setup.

  // Voice
  (function renderVoice() {
    const raw = VOICE[String(c.id)] || [];
    const seen = new Set();
    const rows = raw.filter((r) => { const key = r.scene + '|' + r.text + '|' + (r.voice || ''); if (seen.has(key)) return false; seen.add(key); return true; });
    const groups = new Map();
    rows.forEach((r) => { if (!groups.has(r.scene)) groups.set(r.scene, []); groups.get(r.scene).push(r); });
    $('#voiceList').innerHTML = groups.size ? [...groups.entries()].map(([scene, list]) =>
      '<div class="voice-group"><h4>' + esc(scene) + '</h4>' + list.map((r) => '<div class="voice-line"><span class="txt">' + esc(r.text) + '</span>' + (r.audio ? '<button type="button" class="voice-play" data-audio="' + esc(r.audio) + '" title="播放" aria-label="播放">▶</button>' : '') + '</div>').join('') + '</div>'
    ).join('') : '<p class="empty">暂无游戏内台词记录。</p>';
  })();

  // Tabs
  document.querySelectorAll('.nav button').forEach((b) => b.addEventListener('click', () => {
    document.querySelectorAll('.nav button').forEach((x) => x.classList.toggle('on', x === b));
    document.querySelectorAll('.panel').forEach((p) => { p.hidden = p.id !== 'panel-' + b.dataset.tab; });
  }));
  if (query.get('tab')) {
    const tab = document.querySelector('.nav button[data-tab="' + query.get('tab') + '"]'); if (tab) tab.click();
  }

  // Stage: every character/skin can use an extracted Spine full/mini model when available.
  let fullPlayer = null, miniPlayer = null;
  let fullBase = '';
  let miniBase = '';
  let currentMode = 'full';
  const actionSelect = $('#actionSelect');
  const ACTION_LABELS = { idle:'待机', idle_01:'待机 2', idle_02:'待机 3', idle_03:'待机 4', move:'移动', move_02:'移动 2', run:'跑步', run_02:'跑步 2', attack:'普通攻击', hit:'受击', die:'倒下', die_02:'倒下 2', skill_01:'技能 1', skill_02:'技能 2', s_skill:'终结技', action_01:'动作 1', action_02:'动作 2', action_03:'动作 3' };
  const ONE_SHOT = new Set(['attack','hit','die','die_02','skill_01','skill_02','s_skill','action_01','action_02','action_03']);
  function disposePlayer(player) { try { if (player && typeof player.dispose === 'function') player.dispose(); } catch (e) {} }
  function canSpine() { return !!(window.spine && typeof window.spine.SpinePlayer === 'function'); }
  const SPINE_ROOT = 'assets/spine/models/';
  function spinePath(base) { return base && base.indexOf('assets/') === 0 ? base : SPINE_ROOT + base + '/' + base; }
  function playLoop(player) {
    if (!player || !player.skeleton || !player.skeleton.data) return false;
    const name = firstAnimation(player);
    if (!name) return false;
    try {
      player.setAnimation(name, true);
      if (typeof player.play === 'function') player.play();
      const track = player.animationState && player.animationState.getCurrent(0);
      if (track) track.loop = true;
      return true;
    } catch (e) { return false; }
  }
  function waitAndLoop(player) {
    let tries = 0;
    const timer = setInterval(() => {
      if (playLoop(player)) { if (player === miniPlayer) setTimeout(buildActions, 100); clearInterval(timer); }
      else if (++tries > 60) clearInterval(timer);
    }, 250);
  }
  function firstAnimation(player) {
    try {
      const names = player.skeleton.data.animations.map((a) => a.name);
      return ['idle','idle_01','idle_02','idle_03','action_01','move','run'].find((n) => names.includes(n)) || names[0];
    } catch (e) { return null; }
  }
  function createFull(base) {
    const box = $('#spine-full'); if (!box) return false;
    disposePlayer(fullPlayer); fullPlayer = null; box.innerHTML = '';
    if (!base || !canSpine()) return false;
    try {
      fullPlayer = new window.spine.SpinePlayer('spine-full', {
        skelUrl: spinePath(base) + '.skel', atlasUrl: spinePath(base) + '.atlas',
        showControls: false, premultipliedAlpha: false, backgroundColor: '#00000000',
        alpha: true, width: 640, height: 940
      });
      fullBase = base;
      window.__charPlayers = window.__charPlayers || {}; window.__charPlayers.full = fullPlayer;
      waitAndLoop(fullPlayer);
      return true;
    } catch (e) { console.warn('Spine full failed', base, e); fullPlayer = null; return false; }
  }
  function createMini(base) {
    const box = $('#spine-mini'); if (!box) return false;
    disposePlayer(miniPlayer); miniPlayer = null; box.innerHTML = '';
    if (!base || !canSpine()) return false;
    try {
      miniPlayer = new window.spine.SpinePlayer('spine-mini', {
        skelUrl: spinePath(base) + '.skel', atlasUrl: spinePath(base) + '.atlas',
        showControls: false, premultipliedAlpha: false, backgroundColor: '#00000000',
        alpha: true, width: 420, height: 560
      });
      miniBase = base;
      window.__charPlayers = window.__charPlayers || {}; window.__charPlayers.mini = miniPlayer;
      waitAndLoop(miniPlayer);
      setTimeout(buildActions, 900);
      return true;
    } catch (e) { console.warn('Spine mini failed', base, e); miniPlayer = null; return false; }
  }
  function buildActions() {
    if (!miniPlayer || !miniPlayer.skeleton || !miniPlayer.skeleton.data) return;
    const names = miniPlayer.skeleton.data.animations.map((a) => a.name);
    const order = ['idle','idle_01','idle_02','idle_03','move','move_02','run','run_02','attack','hit','die','die_02','skill_01','skill_02','s_skill','action_01','action_02','action_03'];
    const sorted = [...order.filter((n) => names.includes(n)), ...names.filter((n) => !order.includes(n))];
    actionSelect.innerHTML = sorted.map((n) => '<option value="' + esc(n) + '">' + esc(ACTION_LABELS[n] || n) + '</option>').join('');
  }
  actionSelect.addEventListener('change', () => { if (!miniPlayer) return; miniPlayer.setAnimation(actionSelect.value, true); if (typeof miniPlayer.play === 'function') miniPlayer.play(); const track = miniPlayer.animationState && miniPlayer.animationState.getCurrent(0); if (track) track.loop = true; });
  $('#modeSwitch').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-mode]'); if (!b) return;
    currentMode = b.dataset.mode; renderStage();
  });
  function renderStage() {
    const skin = skins[skinIndex] || {};
    const full = skin.spine || '';
    const mini = skin.mini || '';
    const hasFull = !!full && canSpine();
    const hasMini = !!mini && canSpine();
    if (currentMode === 'mini' && !hasMini) currentMode = 'full';
    if (!hasFull && hasMini) currentMode = 'mini';
    $('#modeSwitch').hidden = !hasMini;
    document.querySelectorAll('#modeSwitch button').forEach((b) => b.classList.toggle('on', b.dataset.mode === currentMode));
    document.querySelectorAll('#stageSkinSwitch button').forEach((b) => b.classList.toggle('on', Number(b.dataset.stageSkin) === skinIndex));
    const note = $('#staticNote');
    if (currentMode === 'mini' && hasMini) {
      if (miniBase !== mini || !miniPlayer) createMini(mini);
      $('#spine-mini').hidden = false;
      $('#spine-full').hidden = true; $('#spine-full-l2').hidden = true;
      $('#charStatic').hidden = true; note.hidden = true;
      $('#actions').hidden = false;
      $('#stageLive').textContent = 'SPINE / Q版';
      setTimeout(buildActions, 900);
      return;
    }
    $('#actions').hidden = true;
    $('#spine-mini').hidden = true;
    if (hasFull) {
      if (fullBase !== full || !fullPlayer) createFull(full);
      if (fullPlayer) {
        $('#spine-full').hidden = false; $('#spine-full-l2').hidden = true;
        $('#charStatic').hidden = true; note.hidden = true;
        $('#stageLive').textContent = 'SPINE / LIVE 2D';
        return;
      }
    }
    $('#spine-full').hidden = true; $('#spine-full-l2').hidden = true;
    $('#charStatic').hidden = true; note.hidden = false;
    const art = skin.art || skin.avatar || skin.bust;
    if (art) { note.textContent = '静态立绘 / BUST'; $('#charStatic').hidden = false; setImg($('#charStatic'), art, c.name); $('#stageLive').textContent = 'STATIC / BUST'; }
    else { note.textContent = '暂无立绘资源'; $('#stageLive').textContent = 'STATIC / NO ART'; }
  }
  selectSkin(0);

  // Character switcher
  (function initSwitch() {
    const modal = document.getElementById('switchModal');
    const list = document.getElementById('switchList');
    const search = document.getElementById('switchSearch');
    if (!modal || !list) return;
    const visible = CODEX.filter((c) => !c.hidden);
    function draw(q) {
      const word = String(q || '').trim().toLowerCase();
      const rows = visible.filter((c) => !word || `${c.name} ${c.element} ${c.job}`.toLowerCase().includes(word));
      list.innerHTML = rows.map((c) => {
        const a = (ASSETS[String(c.id)] || {}).icon || '';
        return '<button type="button" class="switch-card" data-id="' + c.id + '">' + (a ? '<img src="' + esc(a) + '" alt="">' : '<span style="height:76px;display:block"></span>') + '<span>' + esc(c.name) + '</span></button>';
      }).join('');
      list.querySelectorAll('[data-id]').forEach((b) => b.addEventListener('click', () => { location.href = 'character_detail.html?id=' + b.dataset.id; }));
    }
    function close() { modal.hidden = true; document.body.style.overflow = ''; }
    function open() { modal.hidden = false; document.body.style.overflow = 'hidden'; draw(search.value); setTimeout(() => search.focus(), 30); }
    document.getElementById('switchCharacter').addEventListener('click', open);
    document.getElementById('switchClose').addEventListener('click', close);
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    search.addEventListener('input', () => draw(search.value));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) close(); });
  })();

  // Playable voice
  (function initVoicePlay() {
    const host = document.getElementById('voiceList');
    if (!host) return;
    host.addEventListener('click', (e) => {
      const b = e.target.closest('[data-audio]');
      if (!b) return;
      try { const audio = new Audio(b.dataset.audio); audio.play(); } catch (err) {}
    });
  })();
})();
