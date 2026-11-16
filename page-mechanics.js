const M = window.MECHANICS || {};
const set = (id, value) => {
  const el = document.getElementById(id);
  if (el) el.textContent = value == null || value === "" ? "—" : String(value);
};

function fmtList(arr, suffix = "") {
  return (arr || []).map((v) => {
    const n = Number(v);
    return Number.isFinite(n) ? String(Math.round(n * 1000) / 1000) : "";
  }).join(" / ") + suffix;
}

set("star-scale", fmtList(M.starScale));
set("rarity-scale", fmtList(M.rarityScale));
const c = M.common || {};
set("max-level", c.GAME_PLAYER_MAX_LEVEL);
set("max-star", c.GAME_AVATAR_MAX_STAR_LEVEL);
set("max-rarity", c.GAME_AVATAR_MAX_RARITY_LEVEL);
set("max-skill", c.GAME_AVATAR_MAX_SKILL_LEVEL);
set("init-ap", c.GAME_PLAYER_INITIAL_AP);
set("max-ap", c.GAME_PLAYER_MAX_AP);
set("ap-restore", c.GAME_PLAYER_AP_RESTORE_DURATION ? `${c.GAME_PLAYER_AP_RESTORE_DURATION} 秒 / 点` : "—");

const exp = M.exp || [];
const table = document.getElementById("exp-table");
if (table) {
  const head = "<thead><tr><th>等级</th><th>玩家升级经验</th><th>角色升级经验</th></tr></thead>";
  const rows = exp.map((r) => `<tr><td class="num">${r.level}</td><td class="num">${r.playerExp}</td><td class="num">${r.avatarExp}</td></tr>`).join("");
  table.innerHTML = head + `<tbody>${rows}</tbody>`;
}
