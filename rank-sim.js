/* Browser adapter: RANK_SIM_DATA + shared RankCore -> output ranking rows. */
(() => {
  "use strict";
  const DATA = window.RANK_SIM_DATA;
  const CORE = window.RankCore || globalThis.RankCore;
  if (!DATA || !CORE) return;
  function bossAt(level) { return CORE.bossAt(DATA.boss, level); }
  function rank(rows, getter) {
    return rows.slice().sort((a, b) => getter(b) - getter(a) || b.id - a.id).map((r, i) => ({ ...r, rank: i + 1 }));
  }
  let cached = null;
  function output() {
    if (!cached) {
      const boss = bossAt(DATA.defaults.output);
      const rows = DATA.chars.map((c) => ({
        ...c,
        single: CORE.battleOutput(c, boss, 1),
        group: CORE.battleOutput(c, boss, 4),
      }));
      cached = {
        single: rank(rows, (r) => r.single.dps),
        group: rank(rows, (r) => r.group.dps),
      };
    }
    return cached;
  }
  window.RANK_SIM = {
    defaults: DATA.defaults,
    bossAt,
    output,
  };
})();
