/* Shared rank math + turn-based battle engine.
 * Works in the browser (window.RankCore) and in Node (module.exports).
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.RankCore = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  const POW_MAX = 1000;
  const TP_START = 50;
  const TP_MAX = 100;
  const TP_REGEN_PER_SEC = 5;
  const GCD_COOL_TIME = 1.5;
  const COST_A_DEFAULT = 20;
  const COST_B_DEFAULT = 30;

  function roundEven(n) {
    const scaled = Math.round(n * 1000);
    const whole = Math.trunc(scaled / 1000);
    const frac = ((scaled % 1000) + 1000) % 1000;
    if (frac > 500 || (frac === 500 && Math.abs(whole % 2) === 1)) return whole + 1;
    return whole;
  }
  function grownInt(base, grow, steps) {
    return base + roundEven((grow || 0) * steps);
  }

  // In-game panel formula:
  // HP/ATK: (initial + rounded growth) * (star + rarity)
  // DEF/MIND: (initial + rounded growth) * star
  // CRIT/CRITDMG/SPD: initial + rounded growth
  function panelStats(row, level = 80) {
    const steps = Math.max(0, level - 1);
    const star = Number((row.StarLevel_f || [1])[0] ?? 1);
    const rarity = Number((row.RarityLevel_f || [])[Math.max(0, Number(row.InitialRarityLevel || 1) - 1)] ?? 0);
    const hpAtk = star + rarity;
    return {
      hp: roundEven(grownInt(row.Hp, row.Hp_f, steps) * hpAtk),
      atk: roundEven(grownInt(row.Atk, row.Atk_f, steps) * hpAtk),
      defense: roundEven(grownInt(row.Def, row.Def_f, steps) * star),
      mind: roundEven(grownInt(row.Mind, row.Mind_f, steps) * star),
      spd: grownInt(row.Spd, row.Spd_f, steps),
      crit: grownInt(row.CrtChance, row.CrtChance_f, steps),
      critDmg: grownInt(row.CrtRatio, row.CrtRatio_f, steps),
    };
  }

  function bossAt(base, level) {
    return {
      name: base.name, enemyId: base.enemyId, level,
      hp: Math.round(base.hp + base.hpF * (level - 1)),
      def: Math.round(base.def + base.defF * (level - 1)),
      atk: Math.round(base.atk + base.atkF * (level - 1)),
      spd: base.spd,
      element: base.element,
    };
  }

  function hitDamage(atk, ratio, crit, defense, reduction = 0) {
    const mitigation = 1145 + 3.5 * Math.max(0, defense);
    return Math.max(0, atk * ratio * crit * (1000 / mitigation) * (1 - Math.max(0, Math.min(.95, reduction))));
  }

  const ELEMENT_CHAIN = [1, 2, 3, 4, 0, -1, -1];
  function elementMultiplier(attacker, defender, advantage = 1.25) {
    if (attacker == null || defender == null) return 1;
    if (Number(attacker) === 6 || Number(defender) === 6) return 1;
    if (ELEMENT_CHAIN[Number(attacker)] === Number(defender)) return advantage;
    if (ELEMENT_CHAIN[Number(defender)] === Number(attacker)) return 1;
    return 1;
  }

  function battleOutput(character, boss, count) {
    const b = character.base;
    const states = Array.from({ length: count }, (_, i) => ({
      index: i, maxHp: boss.hp, hp: boss.hp, def: boss.def,
      atk: Number(boss.atk || 0), spd: Number(boss.spd || 0),
      element: boss.element,
      alive: true, effects: [], dots: new Map(),
    }));
    const skills = new Map((character.skills || []).map((s) => [s.slot, s]));
    const tactics = character.tactics || {};
    const conditions = Array.isArray(tactics.conditions) ? tactics.conditions : [];
    const playerEffects = [];
    const aliveStates = () => states.filter((s) => s.alive);
    const firstAlive = () => states.find((s) => s.alive) || null;
    const sumEffect = (list, stat) => (list || []).filter((e) => e.remaining > 0 && e.stat === stat).reduce((n, e) => n + Number(e.value || 0), 0);
    const applyEffect = (list, effect) => {
      const duration = Number(effect.duration || 0);
      if (!duration) return;
      const idx = list.findIndex((e) => e.stat === effect.stat && e.name === effect.name && e.remaining > 0);
      if (idx >= 0) list.splice(idx, 1);
      list.push({ ...effect, remaining: duration });
    };
    const tickEffects = (list, dt) => {
      for (const e of list) e.remaining -= dt;
      for (let i = list.length - 1; i >= 0; i -= 1) if (list[i].remaining <= 0) list.splice(i, 1);
    };

    const costA = Number(tactics.costA != null ? tactics.costA : (character.costA != null ? character.costA : COST_A_DEFAULT));
    const costB = Number(tactics.costB != null ? tactics.costB : (character.costB != null ? character.costB : COST_B_DEFAULT));
    const totalTp = Number(tactics.totalTp != null ? tactics.totalTp : TP_MAX);

    let effective = 0, dot = 0, direct = 0, normal = 0;
    let killed = false, killTime = null;
    let time = 0, tp = TP_START, pow = 0, actionIndex = 0, gcdUntil = 0;
    let chosenTarget = null;
    const lastUse = new Map();

    function currentDef(st) { return st.def * (1 - Math.max(0, Math.min(.95, sumEffect(st.effects, "defPct")))); }
    function snapshot() {
      const atk = b.atk * (1 + sumEffect(playerEffects, "atkPct"));
      const critChance = Math.max(0, Math.min(.95, b.crit + sumEffect(playerEffects, "critPct") + sumEffect(playerEffects, "crtPct")));
      const critDmg = b.critDmg + sumEffect(playerEffects, "cdPct") + sumEffect(playerEffects, "critDmgPct");
      const speed = Math.max(1, b.spd * (1 + sumEffect(playerEffects, "spdPct")));
      return { atk, critMult: 1 + critChance * (critDmg - 1), speed, dmgDealt: Math.max(0, 1 + sumEffect(playerEffects, "dmgDealtPct")) };
    }
    function applyDamage(st, amount, kind) {
      if (!st || !st.alive || amount <= 0) return;
      const use = Math.min(amount, st.hp);
      effective += use;
      if (kind === "direct") direct += use; else if (kind === "dot") dot += use; else if (kind === "normal") normal += use;
      st.hp -= use;
      if (st.hp <= 0) {
        st.hp = 0; st.alive = false; st.dots.clear(); st.effects.length = 0;
        if (states.every((x) => !x.alive)) { killed = true; killTime = time; }
      }
    }
    function tickDots(dt) {
      for (const st of states) {
        if (!st.alive) continue;
        for (const [key, ds] of st.dots) {
          const useTime = Math.min(dt, ds.remaining);
          if (useTime <= 0) continue;
          const taken = Math.max(0, 1 + sumEffect(st.effects, "dmgTakenPct"));
          applyDamage(st, st.maxHp * ds.rate * useTime * taken * elementMultiplier(character.element, st.element), "dot");
          ds.remaining -= useTime;
          if (ds.remaining <= 0) st.dots.delete(key);
          if (!st.alive) break;
        }
      }
    }

    function hpPercent(st) { return st && st.maxHp > 0 ? (st.hp / st.maxHp) * 100 : 0; }
    function pickTarget(type) {
      const alive = aliveStates();
      if (!alive.length) return null;
      const t = String(type || "Foe");
      const by = (fn) => alive.slice().sort(fn)[0];
      if (t.startsWith("Ally") || t === "Self") return null;
      if (t === "Foe_Random") return alive[0];
      if (t === "Foe_HighestAtk") return by((a, b) => Number(b.atk) - Number(a.atk) || a.index - b.index);
      if (t === "Foe_LowestAtk") return by((a, b) => Number(a.atk) - Number(b.atk) || a.index - b.index);
      if (t === "Foe_HighestDef") return by((a, b) => Number(b.def) - Number(a.def) || a.index - b.index);
      if (t === "Foe_LowestDef") return by((a, b) => Number(a.def) - Number(b.def) || a.index - b.index);
      if (t === "Foe_HighestHP") return by((a, b) => hpPercent(b) - hpPercent(a) || a.index - b.index);
      if (t === "Foe_LowestHP") return by((a, b) => hpPercent(a) - hpPercent(b) || a.index - b.index);
      if (t === "Foe_HighestSpeed") return by((a, b) => Number(b.spd) - Number(a.spd) || a.index - b.index);
      if (t === "Foe_LowestSpeed") return by((a, b) => Number(a.spd) - Number(b.spd) || a.index - b.index);
      return alive[0];
    }
    function selfConditionOk(node) {
      const s = String(node.self || "Any");
      if (s === "Any") return true;
      let m = s.match(/^HP_Less_(\d+)$/);
      if (m) return false; // 单人模拟/木桩不攻击，自身始终 100%
      m = s.match(/^HP_Greater_(\d+)$/);
      if (m) return 100 > Number(m[1]);
      if (s === "TP_Full") return tp >= totalTp;
      m = s.match(/^TP_Less_(\d+)$/);
      if (m) return (tp / Math.max(1, totalTp)) * 100 < Number(m[1]);
      if (s === "Pow_Full") return pow >= POW_MAX;
      m = s.match(/^Pow_Less_(\d+)$/);
      if (m) return (pow / POW_MAX) * 100 < Number(m[1]);
      return true;
    }
    function unitConditionOk(node, target) {
      const u = String(node.unit || "Any");
      if (u === "Any") return true;
      if (!target) return false;
      let m = u.match(/^HP_Less_(\d+)$/);
      if (m) return hpPercent(target) < Number(m[1]);
      m = u.match(/^HP_Greater_(\d+)$/);
      if (m) return hpPercent(target) > Number(m[1]);
      return true;
    }
    function turnConditionOk(node) {
      const t = String(node.turn || "Any");
      if (t === "Any") return true;
      if (t === "FirstTurn") return actionIndex === 0;
      if (t === "Manual") return false;
      let m = t.match(/^TurnStep(\d+)$/);
      if (m) { const n = Number(m[1]); return actionIndex >= 1 && actionIndex % n === 0; }
      m = t.match(/^Time(\d+)Sec$/);
      if (m) {
        const n = Number(m[1]);
        const last = Number(lastUse.get(node.action) || 0);
        return actionIndex >= 1 && time - last >= n;
      }
      return true;
    }
    function chooseAction() {
      chosenTarget = null;
      if (pow >= POW_MAX && skills.has("S")) return "S";
      if (time + 1e-9 < gcdUntil) return "normal";
      for (const node of conditions) {
        if (node.action === "Skill_S") continue;
        if (!turnConditionOk(node)) continue;
        if (!selfConditionOk(node)) continue;
        const target = pickTarget(node.target);
        if (String(node.target || "").startsWith("Foe") && !target) continue;
        if (!unitConditionOk(node, target)) continue;
        if (node.action === "Attack") { chosenTarget = target; return "normal"; }
        const slot = node.action === "Skill_A" ? "A" : node.action === "Skill_B" ? "B" : null;
        if (!slot || !skills.has(slot)) continue;
        const cost = slot === "A" ? costA : costB;
        if (tp < cost) continue;
        chosenTarget = target;
        return slot;
      }
      return "normal";
    }

    while (!killed && time < 90) {
      const p0 = snapshot();
      const interval = chargeTime(p0.speed);
      const at = time + interval;
      if (at > 90 + 1e-9) break;
      tickDots(interval);
      if (killed) break;
      tickEffects(playerEffects, interval);
      for (const st of states) if (st.alive) tickEffects(st.effects, interval);
      time = at;
      tp = Math.min(totalTp, tp + interval * TP_REGEN_PER_SEC);
      const choice = chooseAction();
      const skill = choice === "normal" ? null : skills.get(choice);
      const p = snapshot();
      if (skill) {
        const target = chosenTarget && chosenTarget.alive ? chosenTarget : firstAlive();
        const targets = skill.targets === "all" ? aliveStates() : ([target].filter(Boolean));
        if (Number(skill.damage || 0) > 0) {
          for (const st of targets) {
            const dmg = hitDamage(p.atk, Number(skill.damage), p.critMult, currentDef(st)) * p.dmgDealt * Math.max(0, 1 + sumEffect(st.effects, "dmgTakenPct")) * elementMultiplier(character.element, st.element);
            applyDamage(st, dmg, "direct");
          }
        }
        if (!killed) {
          for (const effect of skill.effects || []) {
            if (effect.target === "self" || effect.target === "all_allies") applyEffect(playerEffects, effect);
            else {
              const ts = effect.target === "enemy_all" ? aliveStates() : (targets[0]?.alive ? [targets[0]] : []);
              for (const st of ts) applyEffect(st.effects, effect);
            }
          }
          if (Number(skill.defDown || 0) > 0 && Number(skill.defDownDuration || 0) > 0) {
            for (const st of targets) applyEffect(st.effects, { name: "破防", stat: "defPct", value: Number(skill.defDown), duration: Number(skill.defDownDuration) });
          }
          if (skill.dot && Number(skill.dot.rate || 0) > 0 && Number(skill.dot.duration || 0) > 0) {
            const ds = skill.dot.targets === "all" ? aliveStates() : (targets[0]?.alive ? [targets[0]] : []);
            for (const st of ds) st.dots.set(String(skill.slot), { rate: Number(skill.dot.rate), remaining: Number(skill.dot.duration) });
          }
        }
        lastUse.set(String(nodeActionKey(choice)), time);
        gcdUntil = Math.max(gcdUntil, time + GCD_COOL_TIME);
        if (choice === "A") tp -= costA;
        else if (choice === "B") tp -= costB;
        else if (choice === "S") pow = 0;
      } else {
        const target = chosenTarget && chosenTarget.alive ? chosenTarget : firstAlive();
        if (target) {
          const dmg = hitDamage(p.atk, 1, p.critMult, currentDef(target)) * p.dmgDealt * Math.max(0, 1 + sumEffect(target.effects, "dmgTakenPct")) * elementMultiplier(character.element, target.element);
          applyDamage(target, dmg, "normal");
        }
      }
      if (killed) break;
      pow = Math.min(POW_MAX, pow + 150);
      actionIndex += 1;
    }
    function nodeActionKey(slot) {
      return slot === "A" ? "Skill_A" : slot === "B" ? "Skill_B" : "Skill_S";
    }
    return { dps: +(effective / Math.max(1, killTime || time)).toFixed(1), effective: Math.round(effective), killed, killTime: killTime ? +killTime.toFixed(2) : null, direct: Math.round(direct), dot: Math.round(dot), normal: Math.round(normal) };
  }

  function chargeTime(spd) {
    if (spd <= 0) return 1.6666666;
    if (spd <= 100) return 100 / spd;
    if (spd <= 160) return 100 / (100 + (spd - 100) * 1.66);
    if (spd <= 200) return 100 / (200 + (spd - 160) * .1);
    return .41666666;
  }

  return { POW_MAX, TP_START, TP_MAX, GCD_COOL_TIME, roundEven, grownInt, panelStats, bossAt, hitDamage, elementMultiplier, chargeTime, battleOutput };
});
