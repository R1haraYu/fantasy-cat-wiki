/* Rebuild wiki ranking data using the same TeamEngine path as the calculator.
 *
 * The old generator used the legacy RankCore.battleOutput model, which made
 * Omega (and some other fast skills) rank far above the calculator result.
 */
const fs = require("fs");
const vm = require("vm");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..", "..");
const SITE = path.join(ROOT, "03_Wiki", "site");
const CALC = path.join(ROOT, "02_Apps", "BlackCatRank", "gui");
const core = require(path.join(CALC, "rank-core.js"));

const ELEMENT_NAMES = { 0: "王剑", 1: "圣杯", 2: "权杖", 3: "星穹", 4: "高塔", 5: "愚者", 6: "无" };
const ELEMENT_SYMBOLS = { 0: "剑", 1: "杯", 2: "杖", 3: "星", 4: "塔", 5: "愚", 6: "—" };
const ROLE_LABELS = { dps: "输出", tank: "坦克", healer: "疗愈", support: "辅助", special: "特殊" };

function loadWindow(file, key) {
  const ctx = { window: {}, console, document: { title: "" } };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(file, "utf8"), ctx);
  return ctx.window[key];
}

function bootCalculator() {
  const ctx = {
    window: {}, console,
    document: { title: "" },
    localStorage: { getItem: () => null, setItem: () => {} },
  };
  vm.createContext(ctx);
  const files = [
    "data.js", "common.js", "store.js",
    "special_scripts/ailo.js", "special_scripts/bai_xue.js",
    "special_scripts/ariel.js", "special_scripts/veronica.js",
    "special_scripts/holly.js",
    "action_animations.js", "rank-core.js", "engine.js",
    "boss_presets.js", "team_engine.js",
  ];
  for (const f of files) {
    vm.runInContext(fs.readFileSync(path.join(CALC, f), "utf8"), ctx);
  }
  return ctx.window;
}

const calc = bootCalculator();
const TEAM = calc.TeamEngine;
const STORE = calc.RankStore;
const state = STORE.load();
const scene = STORE.normalizeScene(state.scene);
const chars = STORE.allCharacters(state);
TEAM.setCharacters(chars);
const presetById = (id) => TEAM.PRESETS.find((p) => p.id === id) || TEAM.PRESETS[0];
const enemyIds = (scene.enemies || []).slice(0, 4);
const enemies = (enemyIds.length ? enemyIds : [TEAM.PRESETS[0].id]).map(presetById);
TEAM.setCharacters(chars);

const calcData = loadWindow(path.join(CALC, "data.js"), "RANK_DATA");
const wiki = loadWindow(path.join(SITE, "data.js"), "CODEX") || [];
const visible = new Set(wiki.filter((c) => !c.hidden).map((c) => Number(c.id)));
const rawChars = JSON.parse(fs.readFileSync(path.join(ROOT, "01_GameData", "extracted", "rules_json_final", "CHARACTERTABLE.json"), "utf8"));
const rawById = new Map(rawChars.map((r) => [Number(r.Id), r]));
const byId = new Map(chars.map((c) => [Number(c.id), c]));

// Wiki ranking must only contain characters visible on the wiki.
// The calculator can include hidden/unreleased test characters, but the
// public wiki must not.
const characters = calcData.characters
  .filter((c) => visible.has(Number(c.id)))
  .map((c) => {
    const current = byId.get(Number(c.id)) || c;
    const row = rawById.get(Number(c.id));
    return {
      id: c.id,
      name: c.name,
      role: c.role,
      roleLabel: ROLE_LABELS[c.role] || c.role,
      element: c.element,
      elementName: ELEMENT_NAMES[c.element] || "无",
      elementSymbol: ELEMENT_SYMBOLS[c.element] || "—",
      avatar: `img/rank_avatar/${c.id}.png`,
      link: `index.html#/${c.id}`,
      base: core.panelStats(row, 80),
      skills: current.dps?.skills || c.dps?.skills || [],
      tactics: current.tactics || c.tactics || { rules: [] },
    };
  });

function simplify(r) {
  return {
    dps: r ? r.dps : 0,
    effective: r ? r.effective : 0,
    killed: r ? !!r.bossKilled : false,
    killTime: r ? r.killTime : null,
    direct: 0,
    dot: 0,
    normal: 0,
  };
}

const rows = characters.map((c) => {
  const single = TEAM.simulateDps(c.id, enemies, scene.level, scene.element, scene.custom);
  const group = TEAM.simulateDps(c.id, Array.from({ length: 4 }, () => enemies[0]), scene.level, scene.element, scene.custom);
  return { ...c, single: simplify(single), group: simplify(group) };
});

function ranked(rows, getter) {
  return rows.slice()
    .sort((a, b) => getter(b) - getter(a) || b.id - a.id)
    .map((r, i) => ({ ...r, rank: i + 1 }));
}
const payload = {
  generated: new Date().toISOString(),
  version: "V1.2.2",
  title: "输出排行",
  note: "与计算器使用同一TeamEngine：50级究极大食花；单体1目标、群体4目标；期望暴击，含命中/元素亲和/DoT/特殊角色机制。",
  config: {
    maxTime: 90,
    boss: {
      name: enemies[0].name,
      enemyId: enemies[0].id,
      level: scene.level,
      hp: TEAM.bossStats(enemies[0], scene.level, scene.element, 0, scene.custom).hp,
      def: TEAM.bossStats(enemies[0], scene.level, scene.element, 0, scene.custom).def,
      atk: TEAM.bossStats(enemies[0], scene.level, scene.element, 0, scene.custom).atk,
      spd: TEAM.bossStats(enemies[0], scene.level, scene.element, 0, scene.custom).spd,
      element: scene.element,
    },
    single: { label: "单体", count: 1 },
    group: { label: "群体", count: 4 },
  },
  counts: { characters: characters.length, visible: visible.size, output: characters.length },
  boards: {
    output: {
      single: ranked(rows, (r) => r.single.dps),
      group: ranked(rows, (r) => r.group.dps),
    },
  },
};
const sim = {
  generated: payload.generated,
  version: payload.version,
  defaults: { output: 50 },
  boss: payload.config.boss,
  chars: characters,
};

fs.writeFileSync(path.join(SITE, "data", "rank.js"), "window.RANK_WIKI = " + JSON.stringify(payload, null, 2) + ";\n", "utf8");
fs.writeFileSync(path.join(SITE, "data", "rank_sim.js"), "window.RANK_SIM_DATA = " + JSON.stringify(sim) + ";\n", "utf8");
fs.copyFileSync(path.join(CALC, "rank-core.js"), path.join(SITE, "rank-core.js"));
console.log("wrote", characters.length, "characters;",
  "single top:", payload.boards.output.single[0].name, payload.boards.output.single[0].single.dps,
  "omega:", rows.find((r) => r.name === "欧米伽")?.single.dps);
