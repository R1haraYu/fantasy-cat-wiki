/* Rebuild wiki ranking data from the current calculator core/data. */
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

const calcData = loadWindow(path.join(CALC, "data.js"), "RANK_DATA");
const wiki = loadWindow(path.join(SITE, "data.js"), "CODEX") || [];
const visible = new Set(wiki.filter((c) => !c.hidden).map((c) => Number(c.id)));
const rawChars = JSON.parse(fs.readFileSync(path.join(ROOT, "01_GameData", "extracted", "rules_json_final", "CHARACTERTABLE.json"), "utf8"));
const rawEnemies = JSON.parse(fs.readFileSync(path.join(ROOT, "01_GameData", "extracted", "rules_json_final", "ENEMYTABLE.json"), "utf8"));
const rawById = new Map(rawChars.map((r) => [Number(r.Id), r]));
const bossRow = rawEnemies.find((r) => r.EnemyId === "Enemy_UltimateChoompers_S01");
if (!bossRow) throw new Error("boss row missing");

const bossBase = {
  name: bossRow.Name,
  enemyId: bossRow.EnemyId,
  hp: bossRow.Hp,
  hpF: bossRow.Hp_f,
  def: bossRow.Def,
  defF: bossRow.Def_f,
  atk: bossRow.Atk,
  atkF: bossRow.Atk_f,
  spd: bossRow.Spd,
  element: 6,
};
const defaults = { output: 50 };
const boss = core.bossAt(bossBase, defaults.output);

const characters = calcData.characters
  .filter((c) => visible.has(Number(c.id)))
  .map((c) => {
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
      skills: c.dps?.skills || [],
      tactics: c.tactics || { rules: [] },
    };
  });

const rows = characters.map((c) => ({
  ...c,
  single: core.battleOutput(c, boss, 1),
  group: core.battleOutput(c, boss, 4),
}));
function ranked(rows, getter) {
  return rows.slice()
    .sort((a, b) => getter(b) - getter(a) || b.id - a.id)
    .map((r, i) => ({ ...r, rank: i + 1 }));
}
const payload = {
  generated: new Date().toISOString(),
  version: "V1.2.0",
  title: "输出排行",
  note: "80级0星实装角色；测试木桩为50级究极大食花；单人1目标、群体4目标；期望暴击，含命中/元素亲和/DoT。",
  config: {
    maxTime: 90,
    boss,
    single: { label: "单体", hp: boss.hp, def: boss.def, count: 1 },
    group: { label: "群体", hp: boss.hp, def: boss.def, count: 4 },
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
  defaults,
  boss: bossBase,
  chars: characters,
};

fs.writeFileSync(path.join(SITE, "data", "rank.js"), "window.RANK_WIKI = " + JSON.stringify(payload, null, 2) + ";\n", "utf8");
fs.writeFileSync(path.join(SITE, "data", "rank_sim.js"), "window.RANK_SIM_DATA = " + JSON.stringify(sim) + ";\n", "utf8");
fs.copyFileSync(path.join(CALC, "rank-core.js"), path.join(SITE, "rank-core.js"));
console.log("wrote", characters.length, "characters;", "single top:", payload.boards.output.single[0].name, payload.boards.output.single[0].single.dps);
