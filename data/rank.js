window.RANK_WIKI = {
  "generated": "2026-11-27T06:42:48.348Z",
  "version": "V1.2.3",
  "title": "输出排行",
  "note": "与计算器使用同一TeamEngine：50级究极大食花；单体1目标、群体4目标；期望暴击，含命中/元素亲和/DoT/特殊角色机制。",
  "config": {
    "maxTime": 90,
    "boss": {
      "name": "究极大食花",
      "enemyId": "ultimate_choompers",
      "level": 50,
      "hp": 19222,
      "def": 349,
      "atk": 1696,
      "spd": 60,
      "element": 5
    },
    "single": {
      "label": "单体",
      "count": 1
    },
    "group": {
      "label": "群体",
      "count": 4
    }
  },
  "counts": {
    "characters": 30,
    "visible": 30,
    "output": 30
  },
  "boards": {
    "output": {
      "single": [
        {
          "id": 10030,
          "name": "阿拉丁",
          "role": "dps",
          "roleLabel": "输出",
          "element": 2,
          "elementName": "权杖",
          "elementSymbol": "杖",
          "avatar": "img/rank_avatar/10030.png",
          "link": "index.html#/10030",
          "base": {
            "hp": 7974,
            "atk": 1321,
            "defense": 312,
            "mind": 734,
            "spd": 115,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 88
          },
          "skills": [
            {
              "slot": "A",
              "name": "全副武装",
              "damage": 2.3,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "敏捷",
                  "kind": "buff",
                  "stat": "spdPct",
                  "value": 0.2,
                  "duration": 12,
                  "target": "self"
                }
              ],
              "desc": "借助神灯中的“魔灵”增幅身体能力，对敌方单体造成相当于自身攻击力{$T1}的伤害，并赋予自身【敏捷】效果，使自身速度提高{$T2}，持续12秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "B",
              "name": "义警出动！",
              "damage": 2.25,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "青年以正义为信条，不会放过任何恶人。对敌方全体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "S",
              "name": "沙海驰骋",
              "damage": 3.2,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "暴伤",
                  "kind": "buff",
                  "stat": "critDmgPct",
                  "value": 0.41,
                  "duration": 12,
                  "target": "self"
                },
                {
                  "name": "集中",
                  "kind": "buff",
                  "stat": "critPct",
                  "value": 0.41,
                  "duration": 12,
                  "target": "self"
                },
                {
                  "name": "暴击提升",
                  "kind": "buff",
                  "stat": "critPct",
                  "value": 0.15,
                  "duration": 12,
                  "target": "self"
                }
              ],
              "desc": "有“魔灵”协助，无论多么困难的任务，阿拉丁都必定能完成。对敌方单体造成相当于自身攻击力{$T1}的伤害，并赋予自身【暴伤】和【集中】效果，使自身暴击伤害提高{$T2}，暴击率提升{$T3}，持续12秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10029.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "FirstTurn",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time15Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe_HighestSpeed",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 1471.3,
            "effective": 19222,
            "killed": true,
            "killTime": 13.06,
            "direct": 5801,
            "dot": 0,
            "normal": 13421
          },
          "group": {
            "dps": 1789.8,
            "effective": 76888,
            "killed": true,
            "killTime": 42.96,
            "direct": 33803,
            "dot": 0,
            "normal": 43085
          },
          "rank": 1
        },
        {
          "id": 10035,
          "name": "欧米伽",
          "role": "dps",
          "roleLabel": "输出",
          "element": 0,
          "elementName": "王剑",
          "elementSymbol": "剑",
          "avatar": "img/rank_avatar/10035.png",
          "link": "index.html#/10035",
          "base": {
            "hp": 8295,
            "atk": 1233,
            "defense": 327,
            "mind": 648,
            "spd": 115,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 82
          },
          "skills": [
            {
              "slot": "A",
              "name": "战场先锋",
              "damage": 2.7,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "率先冲入敌阵，对敌方单体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "B",
              "name": "威慑",
              "damage": 0,
              "targets": "all",
              "dot": null,
              "defDown": 0.2,
              "defDownDuration": 25,
              "effects": [
                {
                  "name": "脆弱",
                  "kind": "debuff",
                  "stat": "defPct",
                  "value": 0.2,
                  "duration": 25,
                  "target": "enemy_all"
                }
              ],
              "desc": "以武力震慑敌方。赋予敌方全体【脆弱】效果，使其防御力降低{$T1}，持续25秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "S",
              "name": "对决",
              "damage": 2.3,
              "targets": "all",
              "dot": null,
              "defDown": 0.13,
              "defDownDuration": 12,
              "effects": [
                {
                  "name": "破甲",
                  "kind": "debuff",
                  "stat": "defPct",
                  "value": 0.13,
                  "duration": 12,
                  "target": "enemy_all"
                }
              ],
              "desc": "包裹全身的厚重装甲，亦是威力惊人的武器。对敌方全体造成相当于自身攻击力{$T1}的伤害，并赋予其【破甲】效果，使其防御力降低{$T2}，持续12秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10034.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "FirstTurn",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "TurnStep3",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 1091.3,
            "effective": 19222,
            "killed": true,
            "killTime": 17.61,
            "direct": 10323,
            "dot": 0,
            "normal": 8899
          },
          "group": {
            "dps": 1433.3,
            "effective": 76888,
            "killed": true,
            "killTime": 53.64,
            "direct": 48854,
            "dot": 0,
            "normal": 28034
          },
          "rank": 2
        },
        {
          "id": 10005,
          "name": "阿尔法",
          "role": "dps",
          "roleLabel": "输出",
          "element": 4,
          "elementName": "高塔",
          "elementSymbol": "塔",
          "avatar": "img/rank_avatar/10005.png",
          "link": "index.html#/10005",
          "base": {
            "hp": 8573,
            "atk": 1389,
            "defense": 256,
            "mind": 640,
            "spd": 105,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 85
          },
          "skills": [
            {
              "slot": "A",
              "name": "过载",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "决心",
                  "kind": "buff",
                  "stat": "atkPct",
                  "value": 0.42,
                  "duration": 25,
                  "target": "self"
                }
              ],
              "desc": "超频驱动武装单元，短时间内大幅提高自身攻击力。赋予自身【决心】效果，使自身攻击力提高{$T1}，持续25秒。※自身生命值低于30%时不可触发。",
              "cooldown": 25,
              "cooldownType": 1,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "B",
              "name": "背水",
              "damage": 2.93,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "强烈的意志会成为力量之源。对敌方单体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "S",
              "name": "断念业火",
              "damage": 2.02,
              "targets": "all",
              "dot": {
                "rate": 0.01,
                "duration": 8,
                "targets": "all",
                "name": "灼伤"
              },
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "燃起火焰，将一切灼烧殆尽。对敌方全体造成相当于自身攻击力{$T1}的伤害，并赋予其【灼伤】效果，使其每秒损失1%的生命值，持续8秒。",
              "cooldown": 0,
              "cooldownType": 1,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10004.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "FirstTurn",
                "self": "HP_Greater_30",
                "target": "Self",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time25Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Time40Sec",
                "self": "HP_Greater_30",
                "target": "Self",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 1040.9,
            "effective": 19222,
            "killed": true,
            "killTime": 18.47,
            "direct": 3272,
            "dot": 2182,
            "normal": 13768
          },
          "group": {
            "dps": 1665.4,
            "effective": 76888,
            "killed": true,
            "killTime": 46.17,
            "direct": 27240,
            "dot": 20203,
            "normal": 29445
          },
          "rank": 3
        },
        {
          "id": 10026,
          "name": "安娜",
          "role": "tank",
          "roleLabel": "坦克",
          "element": 1,
          "elementName": "圣杯",
          "elementSymbol": "杯",
          "avatar": "img/rank_avatar/10026.png",
          "link": "index.html#/10026",
          "base": {
            "hp": 8181,
            "atk": 1120,
            "defense": 534,
            "mind": 751,
            "spd": 113,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 84
          },
          "skills": [
            {
              "slot": "A",
              "name": "跃动烛光",
              "damage": 2.7,
              "targets": "single",
              "dot": {
                "rate": 0.01,
                "duration": 8,
                "targets": "single",
                "name": "灼伤"
              },
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "擦亮火柴，引燃奄奄一息的敌人。对生命值最低的敌方单位造成相当于自身攻击力{$T1}的伤害，并赋予其【灼伤】效果，使其每秒损失1%的生命值，持续8秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "B",
              "name": "恒心之焰",
              "damage": 1.84,
              "targets": "all",
              "dot": null,
              "defDown": 0.16,
              "defDownDuration": 15,
              "effects": [
                {
                  "name": "脆弱",
                  "kind": "debuff",
                  "stat": "defPct",
                  "value": 0.16,
                  "duration": 15,
                  "target": "enemy_all"
                }
              ],
              "desc": "擦亮火柴，驱散前路的阴霾。对敌方全体造成相当于自身攻击力{$T1}的伤害，并赋予其【脆弱】效果，使敌方全体防御力降低{$T2}，持续15秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "S",
              "name": "引领者的灯火",
              "damage": 2.32,
              "targets": "single",
              "dot": null,
              "defDown": 0.28,
              "defDownDuration": 10,
              "effects": [
                {
                  "name": "决心",
                  "kind": "buff",
                  "stat": "atkPct",
                  "value": 0.28,
                  "duration": 10,
                  "target": "all_allies"
                },
                {
                  "name": "防护",
                  "kind": "buff",
                  "stat": "defPct",
                  "value": 0.28,
                  "duration": 10,
                  "target": "all_allies"
                },
                {
                  "name": "防御提升",
                  "kind": "buff",
                  "stat": "defPct",
                  "value": 0.28,
                  "duration": 10,
                  "target": "all_allies"
                }
              ],
              "desc": "擦亮火柴，于苦难中燃起斗志。对敌方单体造成相当于自身攻击力{$T1}的伤害，并赋予我方全体【决心】效果和【防护】效果，使我方全体攻击力提高{$T2}、防御力提高{$T3}，持续10秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10025.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "Time15Sec",
                "self": "Any",
                "target": "Foe_LowestHP",
                "unit": "HP_Less_30",
                "action": "Skill_A"
              },
              {
                "turn": "TurnStep3",
                "self": "HP_Less_80",
                "target": "Foe_LowestHP",
                "unit": "HP_Less_20",
                "action": "Skill_A"
              },
              {
                "turn": "Time20Sec",
                "self": "HP_Less_80",
                "target": "Foe",
                "unit": "HP_Less_60",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 934.8,
            "effective": 19222,
            "killed": true,
            "killTime": 20.56,
            "direct": 6055,
            "dot": 474,
            "normal": 12693
          },
          "group": {
            "dps": 973.8,
            "effective": 76888,
            "killed": true,
            "killTime": 78.96,
            "direct": 23721,
            "dot": 2262,
            "normal": 50905
          },
          "rank": 4
        },
        {
          "id": 10029,
          "name": "佩德萝",
          "role": "dps",
          "roleLabel": "输出",
          "element": 0,
          "elementName": "王剑",
          "elementSymbol": "剑",
          "avatar": "img/rank_avatar/10029.png",
          "link": "index.html#/10029",
          "base": {
            "hp": 8203,
            "atk": 1317,
            "defense": 303,
            "mind": 699,
            "spd": 110,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 83
          },
          "skills": [
            {
              "slot": "A",
              "name": "佣兵的决意",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "决心",
                  "kind": "buff",
                  "stat": "atkPct",
                  "value": 0.32,
                  "duration": 15,
                  "target": "self"
                }
              ],
              "desc": "行事果断，决不动摇。赋予自身【决心】效果，使自身攻击力提高{$T1}，持续15秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "B",
              "name": "边境守卫",
              "damage": 2.65,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "以一敌多也不在话下。对敌方全体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "S",
              "name": "剑术传承",
              "damage": 3.08,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "蹒跚",
                  "kind": "debuff",
                  "stat": "spdPct",
                  "value": 0.2,
                  "duration": 15,
                  "target": "enemy_single"
                }
              ],
              "desc": "老爹传授的剑术，对佩德萝而言意义非凡。对敌方单体造成相当于自身攻击力{$T1}的伤害，并赋予其【蹒跚】效果，使其速度降低{$T2}，持续15秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10028.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "FirstTurn",
                "self": "Any",
                "target": "Self",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time15Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Self",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 933.9,
            "effective": 19222,
            "killed": true,
            "killTime": 20.58,
            "direct": 6790,
            "dot": 0,
            "normal": 12432
          },
          "group": {
            "dps": 1093.3,
            "effective": 76888,
            "killed": true,
            "killTime": 70.33,
            "direct": 35488,
            "dot": 0,
            "normal": 41400
          },
          "rank": 5
        },
        {
          "id": 10017,
          "name": "爱丽丝",
          "role": "dps",
          "roleLabel": "输出",
          "element": 2,
          "elementName": "权杖",
          "elementSymbol": "杖",
          "avatar": "img/rank_avatar/10017.png",
          "link": "index.html#/10017",
          "base": {
            "hp": 7867,
            "atk": 1268,
            "defense": 335,
            "mind": 665,
            "spd": 108,
            "crit": 0.15399999916553497,
            "critDmg": 1.5,
            "accuracy": 84
          },
          "skills": [
            {
              "slot": "A",
              "name": "惊喜，穿越而来",
              "damage": 2.48,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "自其他时空召唤攻击，对敌方单体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "B",
              "name": "威胁预知",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "暴伤",
                  "kind": "buff",
                  "stat": "critDmgPct",
                  "value": 0.41,
                  "duration": 10,
                  "target": "self"
                },
                {
                  "name": "锐利",
                  "kind": "buff",
                  "stat": "critPct",
                  "value": 0.41,
                  "duration": 10,
                  "target": "self"
                },
                {
                  "name": "暴击提升",
                  "kind": "buff",
                  "stat": "critPct",
                  "value": 0.2,
                  "duration": 10,
                  "target": "self"
                }
              ],
              "desc": "借助准确的直觉，赋予自身【暴伤】和【锐利】效果，使自身暴击伤害提高{$T1}，暴击率提升{$T2}，持续10秒。",
              "cooldown": 15,
              "cooldownType": 1,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "S",
              "name": "终时之箭",
              "damage": 2.42,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "将“魔法少女”的力量叠加附着在箭矢上，射出击穿时空的一箭，对敌方全体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10016.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "FirstTurn",
                "self": "Any",
                "target": "Self",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time15Sec",
                "self": "Any",
                "target": "Self",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 837.5,
            "effective": 19222,
            "killed": true,
            "killTime": 22.95,
            "direct": 5772,
            "dot": 0,
            "normal": 13450
          },
          "group": {
            "dps": 1244.3,
            "effective": 76888,
            "killed": true,
            "killTime": 61.79,
            "direct": 41393,
            "dot": 0,
            "normal": 35495
          },
          "rank": 6
        },
        {
          "id": 10023,
          "name": "温妮弗德",
          "role": "support",
          "roleLabel": "辅助",
          "element": 3,
          "elementName": "星穹",
          "elementSymbol": "星",
          "avatar": "img/rank_avatar/10023.png",
          "link": "index.html#/10023",
          "base": {
            "hp": 8693,
            "atk": 1243,
            "defense": 303,
            "mind": 657,
            "spd": 108,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 83
          },
          "skills": [
            {
              "slot": "A",
              "name": "实验解析",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0.2,
              "defDownDuration": 12,
              "effects": [
                {
                  "name": "脆弱",
                  "kind": "debuff",
                  "stat": "defPct",
                  "value": 0.2,
                  "duration": 12,
                  "target": "enemy_single"
                }
              ],
              "desc": "针对性地削弱强者。赋予攻击力最高的敌方单位【脆弱】效果，使其防御力降低{$T1}，持续12秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "B",
              "name": "豌豆追踪",
              "damage": 2.4,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "在豌豆装置的协助下，对攻击力最高的敌方单位造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "S",
              "name": "最终爆破实验",
              "damage": 2.18,
              "targets": "all",
              "dot": null,
              "defDown": 0.2,
              "defDownDuration": 10,
              "effects": [
                {
                  "name": "破甲",
                  "kind": "debuff",
                  "stat": "defPct",
                  "value": 0.2,
                  "duration": 10,
                  "target": "enemy_all"
                }
              ],
              "desc": "结合战场环境解析敌方弱点，令豌豆装置进行攻击。对攻击力最高的敌方单位造成相当于自身攻击力{$T1}的伤害，并赋予敌方全体【破甲】效果，使其防御力降低{$T2}，持续10秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10022.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "Time25Sec",
                "self": "Any",
                "target": "Foe_HighestAtk",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time10Sec",
                "self": "Any",
                "target": "Foe_HighestAtk",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe_HighestAtk",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 806.5,
            "effective": 19222,
            "killed": true,
            "killTime": 23.83,
            "direct": 6858,
            "dot": 0,
            "normal": 12364
          },
          "group": {
            "dps": 1161.3,
            "effective": 76888,
            "killed": true,
            "killTime": 66.21,
            "direct": 41746,
            "dot": 0,
            "normal": 35142
          },
          "rank": 7
        },
        {
          "id": 10001,
          "name": "艾琳娜",
          "role": "special",
          "roleLabel": "特殊",
          "element": 5,
          "elementName": "愚者",
          "elementSymbol": "愚",
          "avatar": "img/rank_avatar/10001.png",
          "link": "index.html#/10001",
          "base": {
            "hp": 8618,
            "atk": 704,
            "defense": 511,
            "mind": 1194,
            "spd": 110,
            "crit": 0.03500000014901161,
            "critDmg": 1.5,
            "accuracy": 80
          },
          "skills": [
            {
              "slot": "A",
              "name": "精神鼓舞",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "英勇",
                  "kind": "buff",
                  "stat": "atkPct",
                  "value": 0.5,
                  "duration": 15,
                  "target": "all_allies"
                }
              ],
              "desc": "以激昂的魔法鼓舞伙伴。赋予我方全体【英勇】效果，使我方全体攻击力提高{$T1}，持续15秒。",
              "cooldown": 2,
              "cooldownType": 1,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "B",
              "name": "魔力爆破",
              "damage": 2.6,
              "targets": "single",
              "dot": null,
              "defDown": 0.5,
              "defDownDuration": 15,
              "effects": [
                {
                  "name": "脆弱",
                  "kind": "debuff",
                  "stat": "defPct",
                  "value": 0.5,
                  "duration": 15,
                  "target": "enemy_single"
                }
              ],
              "desc": "在阿帕的辅助下，锁定防御力最高的敌方单位进行攻击，造成相当于自身攻击力{$T1}的伤害，并赋予其【脆弱】效果，使其防御力降低{$T2}，持续15秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "S",
              "name": "弱点解析",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "鼓舞",
                  "kind": "buff",
                  "stat": "atkPct",
                  "value": 0.6,
                  "duration": 18,
                  "target": "all_allies"
                },
                {
                  "name": "集中",
                  "kind": "buff",
                  "stat": "critPct",
                  "value": 0.6,
                  "duration": 18,
                  "target": "all_allies"
                },
                {
                  "name": "暴击提升",
                  "kind": "buff",
                  "stat": "critPct",
                  "value": 0.1,
                  "duration": 18,
                  "target": "all_allies"
                }
              ],
              "desc": "启动阿帕对敌方进行解析，将其弱点信息共享给全体伙伴。赋予我方全体【鼓舞】和【集中】效果，使我方全体攻击力提高{$T1}、暴击率提高{$T2}，持续18秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BATTLE_RULE.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "FirstTurn",
                "self": "Any",
                "target": "Ally",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time15Sec",
                "self": "Any",
                "target": "Foe_HighestDef",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Time30Sec",
                "self": "Any",
                "target": "Ally",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Ally",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 800.5,
            "effective": 19222,
            "killed": true,
            "killTime": 24.01,
            "direct": 1907,
            "dot": 0,
            "normal": 17315
          },
          "group": {
            "dps": 1007.3,
            "effective": 76888,
            "killed": true,
            "killTime": 76.33,
            "direct": 6720,
            "dot": 0,
            "normal": 70168
          },
          "rank": 8
        },
        {
          "id": 10021,
          "name": "香纶",
          "role": "dps",
          "roleLabel": "输出",
          "element": 1,
          "elementName": "圣杯",
          "elementSymbol": "杯",
          "avatar": "img/rank_avatar/10021.png",
          "link": "index.html#/10021",
          "base": {
            "hp": 8062,
            "atk": 1268,
            "defense": 329,
            "mind": 776,
            "spd": 108,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 84
          },
          "skills": [
            {
              "slot": "A",
              "name": "香甜气息",
              "damage": 2.54,
              "targets": "single",
              "dot": null,
              "defDown": 0.23,
              "defDownDuration": 10,
              "effects": [
                {
                  "name": "脆弱",
                  "kind": "debuff",
                  "stat": "defPct",
                  "value": 0.23,
                  "duration": 10,
                  "target": "enemy_single"
                }
              ],
              "desc": "以糖果芳香吸引敌人的注意力，对敌方单体造成相当于自身攻击力{$T1}的伤害，并赋予其【脆弱】效果，使其防御力降低{$T2}，持续10秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "B",
              "name": "糕点盛宴",
              "damage": 2.9,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "香纶的糖果屋中，可不是只有惊喜！对敌方单体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "S",
              "name": "天降糖果雨！",
              "damage": 2.35,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "召唤巨大的甜食，对敌方全体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10020.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time15Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 777.7,
            "effective": 19222,
            "killed": true,
            "killTime": 24.72,
            "direct": 6813,
            "dot": 0,
            "normal": 12409
          },
          "group": {
            "dps": 1049.4,
            "effective": 76888,
            "killed": true,
            "killTime": 73.27,
            "direct": 42356,
            "dot": 0,
            "normal": 34532
          },
          "rank": 9
        },
        {
          "id": 10002,
          "name": "辛德瑞拉",
          "role": "support",
          "roleLabel": "辅助",
          "element": 2,
          "elementName": "权杖",
          "elementSymbol": "杖",
          "avatar": "img/rank_avatar/10002.png",
          "link": "index.html#/10002",
          "base": {
            "hp": 7770,
            "atk": 1278,
            "defense": 341,
            "mind": 682,
            "spd": 100,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 82
          },
          "skills": [
            {
              "slot": "A",
              "name": "女仆的职责",
              "damage": 2.95,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "疲惫",
                  "kind": "debuff",
                  "stat": "atkPct",
                  "value": 0.4,
                  "duration": 12,
                  "target": "enemy_single"
                }
              ],
              "desc": "优秀的女仆连清理战场也是易如反掌。对攻击力最高的敌方单位造成相当于自身攻击力{$T1}的伤害，并赋予其【疲惫】效果，使其攻击力降低{$T2}，持续12秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "B",
              "name": "严阵以待",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "敏捷",
                  "kind": "buff",
                  "stat": "spdPct",
                  "value": 0.2,
                  "duration": 12,
                  "target": "self"
                },
                {
                  "name": "蹒跚",
                  "kind": "debuff",
                  "stat": "spdPct",
                  "value": 0.2,
                  "duration": 12,
                  "target": "enemy_single"
                }
              ],
              "desc": "做好万全准备，赋予自身【敏捷】效果，使自身速度提高{$T1}，并赋予攻击力最高的敌方单位【蹒跚】效果，使其速度降低{$T2}，持续12秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "S",
              "name": "玻璃舞会之梦",
              "damage": 3.45,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "恍惚",
                  "kind": "debuff",
                  "stat": "critPct",
                  "value": 0.1,
                  "duration": 18,
                  "target": "enemy_single"
                }
              ],
              "desc": "无论命运如何流转，水晶鞋始终映出那段翩翩起舞的时光。对攻击力最高的敌方单位造成相当于自身攻击力{$T1}的伤害，并赋予其【恍惚】效果，使其暴击率降低{$T2}，持续18秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10001.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "Time25Sec",
                "self": "Any",
                "target": "Foe_HighestAtk",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "TurnStep5",
                "self": "Any",
                "target": "Foe_HighestAtk",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe_HighestAtk",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 768.9,
            "effective": 19222,
            "killed": true,
            "killTime": 25,
            "direct": 9755,
            "dot": 0,
            "normal": 9467
          },
          "group": {
            "dps": 859.9,
            "effective": 76566,
            "killed": false,
            "killTime": null,
            "direct": 40171,
            "dot": 0,
            "normal": 36395
          },
          "rank": 10
        },
        {
          "id": 10025,
          "name": "爱洛",
          "role": "support",
          "roleLabel": "辅助",
          "element": 0,
          "elementName": "王剑",
          "elementSymbol": "剑",
          "avatar": "img/rank_avatar/10025.png",
          "link": "index.html#/10025",
          "base": {
            "hp": 6809,
            "atk": 1365,
            "defense": 303,
            "mind": 563,
            "spd": 126,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 88
          },
          "skills": [
            {
              "slot": "A",
              "name": "荆棘诅咒",
              "damage": 0,
              "targets": "all",
              "dot": {
                "rate": 0.01,
                "duration": 3,
                "targets": "all",
                "name": "撕裂"
              },
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "荆棘",
                  "kind": "buff",
                  "stat": "specialPct",
                  "value": 0,
                  "duration": 20,
                  "target": "self",
                  "special": "normal_aoe"
                }
              ],
              "desc": "爱洛与“噩兆”身边围绕着不祥的荆棘。每次普通攻击都可以对敌方全体造成伤害，持续{$T1}秒，并赋予敌方全体【撕裂】效果，使其每秒失去1%的生命值，持续3秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "B",
              "name": "冥夜窥望",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "攻击提升",
                  "kind": "buff",
                  "stat": "atkPct",
                  "value": 0.58,
                  "duration": 20,
                  "target": "self"
                }
              ],
              "desc": "在黑夜中窥视梦境。使自身攻击力提升{$T1}，持续20秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "S",
              "name": "梦魇潜影",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "梦魇",
                  "kind": "buff",
                  "stat": "specialPct",
                  "value": 0,
                  "duration": 16,
                  "target": "self",
                  "special": "extra_attack_2x"
                }
              ],
              "desc": "撕裂梦境与现实的边界，吞噬敌方的精神。“噩兆”每次攻击都对目标敌方造成当于自身攻击力双倍的伤害，持续{$T1}秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10024.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "FirstTurn",
                "self": "Any",
                "target": "Self",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Self",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Self",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 764.4,
            "effective": 19222,
            "killed": true,
            "killTime": 25.15,
            "direct": 0,
            "dot": 828,
            "normal": 18394
          },
          "group": {
            "dps": 1000.7,
            "effective": 76888,
            "killed": true,
            "killTime": 76.84,
            "direct": 0,
            "dot": 6018,
            "normal": 70870
          },
          "rank": 11
        },
        {
          "id": 10034,
          "name": "芙蕾雅",
          "role": "dps",
          "roleLabel": "输出",
          "element": 2,
          "elementName": "权杖",
          "elementSymbol": "杖",
          "avatar": "img/rank_avatar/10034.png",
          "link": "index.html#/10034",
          "base": {
            "hp": 7935,
            "atk": 1301,
            "defense": 324,
            "mind": 648,
            "spd": 103,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 83
          },
          "skills": [
            {
              "slot": "A",
              "name": "汲寒",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "暴伤",
                  "kind": "buff",
                  "stat": "critDmgPct",
                  "value": 0.4,
                  "duration": 10,
                  "target": "self"
                },
                {
                  "name": "锐利",
                  "kind": "buff",
                  "stat": "critPct",
                  "value": 0.4,
                  "duration": 10,
                  "target": "self"
                },
                {
                  "name": "暴击提升",
                  "kind": "buff",
                  "stat": "critPct",
                  "value": 0.19,
                  "duration": 10,
                  "target": "self"
                }
              ],
              "desc": "化自然之力为己用，赋予自身【暴伤】和【锐利】效果，使自身暴击伤害提高{$T1}，暴击率提升{$T2}，持续10秒。",
              "cooldown": 10,
              "cooldownType": 1,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "B",
              "name": "冬之审判",
              "damage": 0,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "冻结",
                  "kind": "debuff",
                  "stat": "controlPct",
                  "value": 0,
                  "duration": 17,
                  "target": "enemy_all"
                }
              ],
              "desc": "自如操控风雪与冰霜，赋予敌方全体【冻结】效果，持续{$T1}秒。",
              "cooldown": 12,
              "cooldownType": 1,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "S",
              "name": "极寒裁断",
              "damage": 2.45,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "女王下达的判决不容违抗。对敌方全体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10033.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "FirstTurn",
                "self": "Any",
                "target": "Self",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "TurnStep4",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "TurnStep6",
                "self": "Any",
                "target": "Self",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 695.8,
            "effective": 19222,
            "killed": true,
            "killTime": 27.62,
            "direct": 4547,
            "dot": 0,
            "normal": 14675
          },
          "group": {
            "dps": 1121.1,
            "effective": 76888,
            "killed": true,
            "killTime": 68.58,
            "direct": 41114,
            "dot": 0,
            "normal": 35774
          },
          "rank": 12
        },
        {
          "id": 10020,
          "name": "白雪",
          "role": "dps",
          "roleLabel": "输出",
          "element": 1,
          "elementName": "圣杯",
          "elementSymbol": "杯",
          "avatar": "img/rank_avatar/10020.png",
          "link": "index.html#/10020",
          "base": {
            "hp": 8038,
            "atk": 1307,
            "defense": 316,
            "mind": 717,
            "spd": 111,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 84
          },
          "skills": [
            {
              "slot": "A",
              "name": "全力以赴",
              "damage": 2.6,
              "targets": "single",
              "dot": null,
              "defDown": 0.21,
              "defDownDuration": 13,
              "effects": [
                {
                  "name": "破甲",
                  "kind": "debuff",
                  "stat": "defPct",
                  "value": 0.21,
                  "duration": 13,
                  "target": "enemy_single"
                }
              ],
              "desc": "最大限度地运用“金苹果”的能力，对敌方单体造成相当于自身攻击力{$T1}的伤害，并赋予其【破甲】效果，使其防御力降低{$T2}，持续13秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "B",
              "name": "雪国护佑",
              "damage": 1.76,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "黄金之光将扫清雪国储君前行路上的障碍。对敌方全体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "S",
              "name": "辉煌威光",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "攻击提升",
                  "kind": "buff",
                  "stat": "atkPct",
                  "value": 0.58,
                  "duration": 30,
                  "target": "self",
                  "special": "golden_apple"
                },
                {
                  "name": "暴击提升",
                  "kind": "buff",
                  "stat": "critPct",
                  "value": 0.1,
                  "duration": 30,
                  "target": "self",
                  "special": "golden_apple"
                }
              ],
              "desc": "只有无瑕果实真正认可的人，才能叩响乐园的门扉，获得强大的力量。使自身攻击力提高{$T1}，暴击率提高{$T2}，持续30秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10019.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "Time15Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Self",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 688.8,
            "effective": 19222,
            "killed": true,
            "killTime": 27.9,
            "direct": 2695,
            "dot": 0,
            "normal": 16527
          },
          "group": {
            "dps": 805.7,
            "effective": 72217,
            "killed": false,
            "killTime": null,
            "direct": 18096,
            "dot": 0,
            "normal": 54121
          },
          "rank": 13
        },
        {
          "id": 10027,
          "name": "赛莉可",
          "role": "dps",
          "roleLabel": "输出",
          "element": 4,
          "elementName": "高塔",
          "elementSymbol": "塔",
          "avatar": "img/rank_avatar/10027.png",
          "link": "index.html#/10027",
          "base": {
            "hp": 4924,
            "atk": 890,
            "defense": 255,
            "mind": 484,
            "spd": 111,
            "crit": 0.15399999916553497,
            "critDmg": 1.5,
            "accuracy": 75
          },
          "skills": [
            {
              "slot": "A",
              "name": "相为表里",
              "damage": 2.05,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "对敌方单体造成相当于自身攻击力{$T1}的伤害。这是哪一个赛莉可的力量呢？",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "B",
              "name": "精灵的呼唤",
              "damage": 1.95,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "锐利",
                  "kind": "buff",
                  "stat": "critPct",
                  "value": 0.15,
                  "duration": 10,
                  "target": "self"
                }
              ],
              "desc": "瓶中仙子看似柔弱，却拥有强大的力量。对敌方单体造成相当于自身攻击力{$T1}的伤害，并赋予自身【锐利】效果，使自身暴击率提高{$T2}，持续10秒。※自身生命值高于80%时不可触发。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "S",
              "name": "双生依存之影",
              "damage": 2.15,
              "targets": "all",
              "dot": {
                "rate": 0.01,
                "duration": 6,
                "targets": "single",
                "name": "灼伤"
              },
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "“两个”赛莉可彼此依存，无法分离。对敌方全体造成相当于自身攻击力{$T1}的伤害，并赋予生命值最低的敌方单位【灼伤】效果，使其每秒损失1%的生命值，持续6秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10026.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "TurnStep3",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "TurnStep6",
                "self": "HP_Less_80",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Time20Sec",
                "self": "HP_Less_80",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 668.6,
            "effective": 19222,
            "killed": true,
            "killTime": 28.75,
            "direct": 8612,
            "dot": 3785,
            "normal": 6825
          },
          "group": {
            "dps": 827.2,
            "effective": 74143,
            "killed": false,
            "killTime": null,
            "direct": 40640,
            "dot": 11355,
            "normal": 22148
          },
          "rank": 14
        },
        {
          "id": 10028,
          "name": "霍莉",
          "role": "dps",
          "roleLabel": "输出",
          "element": 3,
          "elementName": "星穹",
          "elementSymbol": "星",
          "avatar": "img/rank_avatar/10028.png",
          "link": "index.html#/10028",
          "base": {
            "hp": 9023,
            "atk": 1112,
            "defense": 337,
            "mind": 807,
            "spd": 106,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 83
          },
          "skills": [
            {
              "slot": "A",
              "name": "游戏开始",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "英勇",
                  "kind": "buff",
                  "stat": "atkPct",
                  "value": 0.32,
                  "duration": 8,
                  "target": "all_allies"
                }
              ],
              "desc": "魔女的游戏就此开幕。赋予我方全体【英勇】效果，使我方全体攻击力提高{$T1}，持续8秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "B",
              "name": "珍爱的谜题",
              "damage": 2.12,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "锐利",
                  "kind": "buff",
                  "stat": "critPct",
                  "value": 0.2,
                  "duration": 10,
                  "target": "self"
                }
              ],
              "desc": "霍莉精心准备的谜题毫无破绽。对敌方全体造成相当于自身攻击力{$T1}的伤害，并赋予自身【锐利】效果，使自身暴击率提升{$T2}，持续10秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "S",
              "name": "决胜的骰子",
              "damage": 3.2,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "诱导",
                  "kind": "debuff",
                  "stat": "controlPct",
                  "value": 0,
                  "duration": 8,
                  "target": "enemy_single",
                  "special": "decoy"
                }
              ],
              "desc": "游戏盘上滚动的骰子，将决定敌方的命运。对攻击力最高的敌方单位造成相当于自身攻击力{$T1}的伤害，并赋予其【诱导】效果，持续8秒。",
              "special": "dice",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10027.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "FirstTurn",
                "self": "Any",
                "target": "Ally",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Time40Sec",
                "self": "Any",
                "target": "Ally",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe_HighestAtk",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 660.5,
            "effective": 19222,
            "killed": true,
            "killTime": 29.1,
            "direct": 6263,
            "dot": 0,
            "normal": 12959
          },
          "group": {
            "dps": 754.4,
            "effective": 67237,
            "killed": false,
            "killTime": null,
            "direct": 27951,
            "dot": 0,
            "normal": 39286
          },
          "rank": 15
        },
        {
          "id": 10003,
          "name": "克萝依",
          "role": "dps",
          "roleLabel": "输出",
          "element": 1,
          "elementName": "圣杯",
          "elementSymbol": "杯",
          "avatar": "img/rank_avatar/10003.png",
          "link": "index.html#/10003",
          "base": {
            "hp": 5391,
            "atk": 904,
            "defense": 276,
            "mind": 532,
            "spd": 105,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 70
          },
          "skills": [
            {
              "slot": "A",
              "name": "幻境花海",
              "damage": 2.8,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "描绘幻景，对敌方单体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "B",
              "name": "活力芳香",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "鼓舞",
                  "kind": "buff",
                  "stat": "atkPct",
                  "value": 0.25,
                  "duration": 12,
                  "target": "all_allies"
                }
              ],
              "desc": "以花香为媒介，赋予我方全体【鼓舞】效果，使我方全体攻击力提高{$T1}，持续12秒。",
              "cooldown": 1.5,
              "cooldownType": 1,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "S",
              "name": "炽灼星光",
              "damage": 1.7,
              "targets": "all",
              "dot": {
                "rate": 0.015,
                "duration": 6,
                "targets": "all",
                "name": "收工之炎"
              },
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "璀璨星光在克萝依手中绽放。对敌方全体造成相当于自身攻击力{$T1}的伤害，并赋予敌方全体【收工之炎】效果，使其每秒损失1.5%的生命值，持续6秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10002.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "FirstTurn",
                "self": "Any",
                "target": "Ally",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Time15Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 594.8,
            "effective": 19222,
            "killed": true,
            "killTime": 32.32,
            "direct": 3880,
            "dot": 6039,
            "normal": 9303
          },
          "group": {
            "dps": 1206.8,
            "effective": 76888,
            "killed": true,
            "killTime": 63.71,
            "direct": 17058,
            "dot": 42175,
            "normal": 17654
          },
          "rank": 16
        },
        {
          "id": 10004,
          "name": "琳赛",
          "role": "dps",
          "roleLabel": "输出",
          "element": 3,
          "elementName": "星穹",
          "elementSymbol": "星",
          "avatar": "img/rank_avatar/10004.png",
          "link": "index.html#/10004",
          "base": {
            "hp": 5414,
            "atk": 918,
            "defense": 259,
            "mind": 591,
            "spd": 117,
            "crit": 0.17499999701976776,
            "critDmg": 1.5,
            "accuracy": 70
          },
          "skills": [
            {
              "slot": "A",
              "name": "跃跃欲试",
              "damage": 2.95,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "试探着放上一箭，对随机敌方单体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "B",
              "name": "追风弩箭",
              "damage": 2.73,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "使用轻便趁手的弩箭，对敌方单体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "S",
              "name": "野性急袭",
              "damage": 3.45,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "抓住敌方的破绽进行攻击，对生命值最低的敌方单位造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            }
          ],
          "tactics": {
            "script": "BTAC_10003.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "FirstTurn",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Time25Sec",
                "self": "Any",
                "target": "Foe_Random",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time30Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe_LowestHP",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 560.1,
            "effective": 19222,
            "killed": true,
            "killTime": 34.32,
            "direct": 8012,
            "dot": 0,
            "normal": 11210
          },
          "group": {
            "dps": 555,
            "effective": 49779,
            "killed": false,
            "killTime": null,
            "direct": 20146,
            "dot": 0,
            "normal": 29633
          },
          "rank": 17
        },
        {
          "id": 10010,
          "name": "米芙",
          "role": "support",
          "roleLabel": "辅助",
          "element": 2,
          "elementName": "权杖",
          "elementSymbol": "杖",
          "avatar": "img/rank_avatar/10010.png",
          "link": "index.html#/10010",
          "base": {
            "hp": 5446,
            "atk": 853,
            "defense": 236,
            "mind": 600,
            "spd": 104,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 76
          },
          "skills": [
            {
              "slot": "A",
              "name": "针对性用药",
              "damage": 0,
              "targets": "single",
              "dot": {
                "rate": 0.012,
                "duration": 6,
                "targets": "single",
                "name": "中毒"
              },
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "挑选药剂进行战斗，赋予防御力最高的敌方单位【中毒】效果，使其每秒损失1.2%的生命值，持续{$T1}秒。",
              "cooldown": 5,
              "cooldownType": 1,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "B",
              "name": "实验守则",
              "damage": 2.53,
              "targets": "all",
              "dot": null,
              "defDown": 0.18,
              "defDownDuration": 8,
              "effects": [
                {
                  "name": "脆弱",
                  "kind": "debuff",
                  "stat": "defPct",
                  "value": 0.18,
                  "duration": 8,
                  "target": "enemy_all"
                }
              ],
              "desc": "战场上的“实验守则”都由米芙掌控。对敌方全体造成相当于自身攻击力{$T1}的伤害，并赋予防御力最高的敌方单位【脆弱】效果，使其防御力降低{$T2}，持续8秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "S",
              "name": "深海猛毒药",
              "damage": 0,
              "targets": "all",
              "dot": {
                "rate": 0.012,
                "duration": 10,
                "targets": "all",
                "name": "中毒"
              },
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "投放精心调制而成的剧毒药剂，赋予敌方全体【中毒】效果，使其每秒损失1.2%的生命值，持续{$T1}秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10009.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Foe_HighestDef",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time15Sec",
                "self": "Any",
                "target": "Foe_HighestDef",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 554,
            "effective": 19222,
            "killed": true,
            "killTime": 34.7,
            "direct": 1589,
            "dot": 7657,
            "normal": 9977
          },
          "group": {
            "dps": 1108,
            "effective": 76888,
            "killed": true,
            "killTime": 69.39,
            "direct": 9991,
            "dot": 47142,
            "normal": 19755
          },
          "rank": 18
        },
        {
          "id": 10033,
          "name": "奈亚",
          "role": "special",
          "roleLabel": "特殊",
          "element": 5,
          "elementName": "愚者",
          "elementSymbol": "愚",
          "avatar": "img/rank_avatar/10033.png",
          "link": "index.html#/10033",
          "base": {
            "hp": 5908,
            "atk": 722,
            "defense": 308,
            "mind": 572,
            "spd": 120,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 70
          },
          "skills": [
            {
              "slot": "A",
              "name": "致胜棋路",
              "damage": 2.4,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "锐利",
                  "kind": "buff",
                  "stat": "critPct",
                  "value": 0.08,
                  "duration": 8,
                  "target": "self"
                }
              ],
              "desc": "奈亚抛出的硬币，总是指示着胜局。对敌方单体造成相当于自身攻击力{$T1}的伤害，并赋予自身【锐利】效果，使自身暴击率提高{$T2}，持续8秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "B",
              "name": "棋局坍塌",
              "damage": 2.2,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "操纵棋局，对敌方全体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "S",
              "name": "投转硬币的瞬间",
              "damage": 2.85,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "爆发",
                  "kind": "buff",
                  "stat": "critDmgPct",
                  "value": 0.3,
                  "duration": 15,
                  "target": "self"
                }
              ],
              "desc": "转瞬之间，胜局已定。对敌方单体造成相当于自身攻击力{$T1}的伤害，并赋予自身【爆发】效果，使自身暴击伤害提高{$T2}，持续15秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10032.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "TurnStep3",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "TurnStep4",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 522.5,
            "effective": 19222,
            "killed": true,
            "killTime": 36.79,
            "direct": 10779,
            "dot": 0,
            "normal": 8443
          },
          "group": {
            "dps": 524.5,
            "effective": 46863,
            "killed": false,
            "killTime": null,
            "direct": 25758,
            "dot": 0,
            "normal": 21105
          },
          "rank": 19
        },
        {
          "id": 10009,
          "name": "奥斯汀",
          "role": "dps",
          "roleLabel": "输出",
          "element": 0,
          "elementName": "王剑",
          "elementSymbol": "剑",
          "avatar": "img/rank_avatar/10009.png",
          "link": "index.html#/10009",
          "base": {
            "hp": 6142,
            "atk": 660,
            "defense": 245,
            "mind": 614,
            "spd": 110,
            "crit": 0.10499999672174454,
            "critDmg": 1.5,
            "accuracy": 70
          },
          "skills": [
            {
              "slot": "A",
              "name": "森林守卫者",
              "damage": 2.95,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "对敌方单体造成相当于自身攻击力{$T1}的伤害，掐灭一切可能危及森林的苗头。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "B",
              "name": "猎人的准星",
              "damage": 0,
              "targets": "all",
              "dot": {
                "rate": 0.01,
                "duration": 8,
                "targets": "all",
                "name": "撕裂"
              },
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "一旦被这杆猎枪瞄准，就无法轻易逃离。赋予敌方全体【撕裂】效果，使其每秒失去1%生命，持续{$T1}秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "S",
              "name": "击发时刻",
              "damage": 3.35,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "决心",
                  "kind": "buff",
                  "stat": "atkPct",
                  "value": 0.4,
                  "duration": 12,
                  "target": "self"
                }
              ],
              "desc": "所有的准备，都是为了这精准的一击。对敌方单体造成相当于自身攻击力{$T1}的伤害。首次使用时，赋予自身【决心】效果，使自身攻击力提高{$T2}，持续12秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10008.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "Time15Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Time25Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 498.1,
            "effective": 19222,
            "killed": true,
            "killTime": 38.59,
            "direct": 5701,
            "dot": 3021,
            "normal": 10499
          },
          "group": {
            "dps": 712.6,
            "effective": 63555,
            "killed": false,
            "killTime": null,
            "direct": 15062,
            "dot": 24001,
            "normal": 24492
          },
          "rank": 20
        },
        {
          "id": 10031,
          "name": "瑞恩斯",
          "role": "support",
          "roleLabel": "辅助",
          "element": 1,
          "elementName": "圣杯",
          "elementSymbol": "杯",
          "avatar": "img/rank_avatar/10031.png",
          "link": "index.html#/10031",
          "base": {
            "hp": 5103,
            "atk": 765,
            "defense": 251,
            "mind": 586,
            "spd": 119,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 70
          },
          "skills": [
            {
              "slot": "A",
              "name": "裂空黑翼",
              "damage": 1.94,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "将魔力幻化成黑羽，对敌方全体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "B",
              "name": "恸哭锁链",
              "damage": 2.6,
              "targets": "single",
              "dot": null,
              "defDown": 0.21,
              "defDownDuration": 5,
              "effects": [
                {
                  "name": "破甲",
                  "kind": "debuff",
                  "stat": "defPct",
                  "value": 0.21,
                  "duration": 5,
                  "target": "enemy_single"
                }
              ],
              "desc": "以诅咒之锁束缚对手。对速度最低的敌方单位造成相当于自身攻击力{$T1}的伤害，并赋予其【破甲】效果，使其防御力降低{$T2}，持续5秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "S",
              "name": "苦痛刺鞭",
              "damage": 3.42,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "沉默",
                  "kind": "debuff",
                  "stat": "controlPct",
                  "value": 0,
                  "duration": 8,
                  "target": "enemy_single"
                }
              ],
              "desc": "困于永恒的黑暗之中吧！对速度最低的敌方单位造成相当于自身攻击力{$T1}的伤害，并赋予其【沉默】效果，持续8秒。",
              "cooldown": 5,
              "cooldownType": 1,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10030.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time15Sec",
                "self": "Any",
                "target": "Foe_LowestSpeed",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe_LowestSpeed",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 428.6,
            "effective": 19222,
            "killed": true,
            "killTime": 44.85,
            "direct": 5436,
            "dot": 0,
            "normal": 13786
          },
          "group": {
            "dps": 499.7,
            "effective": 44829,
            "killed": false,
            "killTime": null,
            "direct": 17276,
            "dot": 0,
            "normal": 27553
          },
          "rank": 21
        },
        {
          "id": 10032,
          "name": "凯伊",
          "role": "tank",
          "roleLabel": "坦克",
          "element": 2,
          "elementName": "权杖",
          "elementSymbol": "杖",
          "avatar": "img/rank_avatar/10032.png",
          "link": "index.html#/10032",
          "base": {
            "hp": 8714,
            "atk": 902,
            "defense": 421,
            "mind": 921,
            "spd": 100,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 65
          },
          "skills": [
            {
              "slot": "A",
              "name": "自然奥义",
              "damage": 2.47,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "冻结",
                  "kind": "debuff",
                  "stat": "controlPct",
                  "value": 0,
                  "duration": 8,
                  "target": "enemy_single"
                }
              ],
              "desc": "运用风雪的力量，对随机敌方单体造成相当于自身攻击力{$T1}的伤害，并赋予其【冻结】效果，持续8秒。",
              "cooldown": 10,
              "cooldownType": 1,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "B",
              "name": "霜雪之剑",
              "damage": 2.8,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "凯伊的剑术与魔法相辅相成，灵巧而精湛。对敌方单体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "S",
              "name": "统御冰雪之人",
              "damage": 3.03,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "持续恢复",
                  "kind": "buff",
                  "stat": "healPct",
                  "value": 0.16,
                  "duration": 5,
                  "target": "all_allies"
                }
              ],
              "desc": "怀抱守护一切的决心，对敌方单体造成相当于自身攻击力{$T1}的伤害，并赋予我方全体【持续恢复】效果，每秒恢复相当于自身精神力{$T2}的生命值，持续5秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            }
          ],
          "tactics": {
            "script": "BTAC_10031.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "TurnStep4",
                "self": "Any",
                "target": "Foe_Random",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Foe_Random",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 400.5,
            "effective": 19222,
            "killed": true,
            "killTime": 48,
            "direct": 9621,
            "dot": 0,
            "normal": 9601
          },
          "group": {
            "dps": 408.9,
            "effective": 36803,
            "killed": false,
            "killTime": null,
            "direct": 18972,
            "dot": 0,
            "normal": 17830
          },
          "rank": 22
        },
        {
          "id": 10008,
          "name": "杰佩托",
          "role": "support",
          "roleLabel": "辅助",
          "element": 3,
          "elementName": "星穹",
          "elementSymbol": "星",
          "avatar": "img/rank_avatar/10008.png",
          "link": "index.html#/10008",
          "base": {
            "hp": 6135,
            "atk": 788,
            "defense": 224,
            "mind": 607,
            "spd": 107,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 75
          },
          "skills": [
            {
              "slot": "A",
              "name": "工匠秘诀",
              "damage": 3.05,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "在杰佩托手中，任何小物件都能发挥意想不到的作用。对敌方单体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "B",
              "name": "忙里偷闲",
              "damage": 0,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "疲惫",
                  "kind": "debuff",
                  "stat": "atkPct",
                  "value": 0.2,
                  "duration": 10,
                  "target": "enemy_all"
                }
              ],
              "desc": "小憩一会也无妨嘛。赋予敌方全体单位【疲惫】效果，使其攻击力降低{$T1}，持续10秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "S",
              "name": "决战武装",
              "damage": 2.05,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "沉默",
                  "kind": "debuff",
                  "stat": "controlPct",
                  "value": 0,
                  "duration": 8,
                  "target": "enemy_all"
                }
              ],
              "desc": "现在正是展现工匠精妙手艺的关键时刻！对敌方全体造成相当于自身攻击力{$T1}的伤害，并赋予其【沉默】效果，持续8秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10007.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Time30Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 357.6,
            "effective": 19222,
            "killed": true,
            "killTime": 53.75,
            "direct": 4974,
            "dot": 0,
            "normal": 14248
          },
          "group": {
            "dps": 561.9,
            "effective": 50339,
            "killed": false,
            "killTime": null,
            "direct": 26943,
            "dot": 0,
            "normal": 23396
          },
          "rank": 23
        },
        {
          "id": 10018,
          "name": "匹诺曹",
          "role": "support",
          "roleLabel": "辅助",
          "element": 1,
          "elementName": "圣杯",
          "elementSymbol": "杯",
          "avatar": "img/rank_avatar/10018.png",
          "link": "index.html#/10018",
          "base": {
            "hp": 7330,
            "atk": 790,
            "defense": 374,
            "mind": 791,
            "spd": 95,
            "crit": 0.08399999886751175,
            "critDmg": 1.5,
            "accuracy": 75
          },
          "skills": [
            {
              "slot": "A",
              "name": "先声夺人",
              "damage": 0,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "蹒跚",
                  "kind": "debuff",
                  "stat": "spdPct",
                  "value": 0.21,
                  "duration": 5,
                  "target": "enemy_all"
                }
              ],
              "desc": "先下手为强。赋予敌方全体【蹒跚】效果，使其速度降低{$T1}，持续5秒。",
              "cooldown": 5,
              "cooldownType": 1,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "B",
              "name": "虚荣幻影",
              "damage": 2.9,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "设下引诱敌人的陷阱，对敌方单体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "S",
              "name": "傀儡的嘲弄",
              "damage": 1.8,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "眩晕",
                  "kind": "debuff",
                  "stat": "controlPct",
                  "value": 0,
                  "duration": 5,
                  "target": "enemy_all"
                }
              ],
              "desc": "以言语操控局势，对敌方全体造成相当于自身攻击力{$T1}的伤害，并赋予其【眩晕】效果，持续5秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10017.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time15Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 304.3,
            "effective": 19222,
            "killed": true,
            "killTime": 63.16,
            "direct": 6384,
            "dot": 0,
            "normal": 12838
          },
          "group": {
            "dps": 454.7,
            "effective": 40685,
            "killed": false,
            "killTime": null,
            "direct": 22264,
            "dot": 0,
            "normal": 18420
          },
          "rank": 24
        },
        {
          "id": 10019,
          "name": "莉娜",
          "role": "healer",
          "roleLabel": "疗愈",
          "element": 3,
          "elementName": "星穹",
          "elementSymbol": "星",
          "avatar": "img/rank_avatar/10019.png",
          "link": "index.html#/10019",
          "base": {
            "hp": 10329,
            "atk": 735,
            "defense": 546,
            "mind": 1450,
            "spd": 103,
            "crit": 0.041999999433755875,
            "critDmg": 1.5,
            "accuracy": 75
          },
          "skills": [
            {
              "slot": "A",
              "name": "祈愿之晨曲",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0.18,
              "defDownDuration": 12,
              "effects": [
                {
                  "name": "硬化",
                  "kind": "buff",
                  "stat": "defPct",
                  "value": 0.18,
                  "duration": 12,
                  "target": "ally_single"
                }
              ],
              "desc": "轻吟动听的歌谣，赋予最前排的我方单位【硬化】效果，使其防御力提高{$T1}，持续12秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "B",
              "name": "唤心之夜曲",
              "damage": 2.2,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "攻击恢复",
                  "kind": "buff",
                  "stat": "healOnHitPct",
                  "value": 2.1,
                  "duration": 0,
                  "target": "all_allies"
                }
              ],
              "desc": "以歌声鼓舞伙伴，令敌方心生动摇。对敌方全体造成相当于自身攻击力{$T1}的伤害，并赋予我方全体【攻击恢复】效果，使其在下次攻击时对自身进行治疗，恢复相当于该次伤害{$T2}的生命值。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "S",
              "name": "夜莺的幻想曲",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "治疗",
                  "kind": "buff",
                  "stat": "healPct",
                  "value": 2.79,
                  "duration": 1,
                  "target": "all_allies"
                }
              ],
              "desc": "吟唱优美温柔的乐曲，创造生机勃勃的幻境。对我方全体进行治疗，恢复其相当于自身精神力{$T1}的生命值。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10018.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "FirstTurn",
                "self": "Any",
                "target": "Ally",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Ally",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time15Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Ally",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 269.1,
            "effective": 19222,
            "killed": true,
            "killTime": 71.44,
            "direct": 2622,
            "dot": 0,
            "normal": 16600
          },
          "group": {
            "dps": 355,
            "effective": 31783,
            "killed": false,
            "killTime": null,
            "direct": 11019,
            "dot": 0,
            "normal": 20765
          },
          "rank": 25
        },
        {
          "id": 10011,
          "name": "科薇丝",
          "role": "healer",
          "roleLabel": "疗愈",
          "element": 2,
          "elementName": "权杖",
          "elementSymbol": "杖",
          "avatar": "img/rank_avatar/10011.png",
          "link": "index.html#/10011",
          "base": {
            "hp": 6890,
            "atk": 553,
            "defense": 335,
            "mind": 1092,
            "spd": 100,
            "crit": 0.03500000014901161,
            "critDmg": 1.5,
            "accuracy": 72
          },
          "skills": [
            {
              "slot": "A",
              "name": "海渊激流",
              "damage": 2.35,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "将水元素凝聚成水波，对敌方单体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "B",
              "name": "水波呓语",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "治疗",
                  "kind": "buff",
                  "stat": "healPct",
                  "value": 2,
                  "duration": 1,
                  "target": "ally_single"
                }
              ],
              "desc": "令温柔的海水抚慰伙伴的伤痛。对生命值低于70%的我方单体进行治疗，恢复其相当于自身精神力{$T1}的生命值。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "S",
              "name": "沧海祝福",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "持续恢复",
                  "kind": "buff",
                  "stat": "healPct",
                  "value": 0.27,
                  "duration": 10,
                  "target": "all_allies"
                }
              ],
              "desc": "播洒来自深海的祝福，赋予我方全体【持续恢复】效果，每秒恢复其相当于自身精神力{$T1}的生命值，持续10秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10010.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "TurnStep2",
                "self": "Any",
                "target": "Ally_LowestHP",
                "unit": "HP_Less_30",
                "action": "Skill_B"
              },
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Ally_LowestHP",
                "unit": "HP_Less_70",
                "action": "Skill_B"
              },
              {
                "turn": "Time15Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Ally",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 176.2,
            "effective": 15858,
            "killed": false,
            "killTime": null,
            "direct": 2567,
            "dot": 0,
            "normal": 13291
          },
          "group": {
            "dps": 176.2,
            "effective": 15858,
            "killed": false,
            "killTime": null,
            "direct": 2567,
            "dot": 0,
            "normal": 13291
          },
          "rank": 26
        },
        {
          "id": 10022,
          "name": "安琪儿",
          "role": "healer",
          "roleLabel": "疗愈",
          "element": 0,
          "elementName": "王剑",
          "elementSymbol": "剑",
          "avatar": "img/rank_avatar/10022.png",
          "link": "index.html#/10022",
          "base": {
            "hp": 6163,
            "atk": 527,
            "defense": 353,
            "mind": 1160,
            "spd": 103,
            "crit": 0.03500000014901161,
            "critDmg": 1.5,
            "accuracy": 66
          },
          "skills": [
            {
              "slot": "A",
              "name": "涤罪之铃",
              "damage": 2.6,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "以手摇铃的音色净化恶意，对敌方单体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "B",
              "name": "治愈之声",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "持续恢复",
                  "kind": "buff",
                  "stat": "healPct",
                  "value": 0.18,
                  "duration": 6,
                  "target": "ally_single"
                }
              ],
              "desc": "以铃声为媒介，赋予生命值最低的我方单位【持续恢复】效果，每秒恢复其相当于自身精神力{$T1}的生命值，持续6秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "S",
              "name": "永恒花园的福音",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "攻击恢复",
                  "kind": "buff",
                  "stat": "healOnHitPct",
                  "value": 2.52,
                  "duration": 0,
                  "target": "all_allies"
                }
              ],
              "desc": "给予伙伴们天上花园的庇佑。赋予我方全体【攻击恢复】效果，使其在下次攻击时对自身进行治疗，恢复相当于伤害{$T1}的生命值。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10021.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "Time15Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Ally_LowestHP",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Ally",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 151.1,
            "effective": 13534,
            "killed": false,
            "killTime": null,
            "direct": 2022,
            "dot": 0,
            "normal": 11512
          },
          "group": {
            "dps": 151.1,
            "effective": 13534,
            "killed": false,
            "killTime": null,
            "direct": 2022,
            "dot": 0,
            "normal": 11512
          },
          "rank": 27
        },
        {
          "id": 10007,
          "name": "凯茜",
          "role": "tank",
          "roleLabel": "坦克",
          "element": 1,
          "elementName": "圣杯",
          "elementSymbol": "杯",
          "avatar": "img/rank_avatar/10007.png",
          "link": "index.html#/10007",
          "base": {
            "hp": 7434,
            "atk": 261,
            "defense": 783,
            "mind": 751,
            "spd": 103,
            "crit": 0.07000000029802322,
            "critDmg": 1.5,
            "accuracy": 65
          },
          "skills": [
            {
              "slot": "A",
              "name": "换羽",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "受击恢复",
                  "kind": "buff",
                  "stat": "healOnBeHitPct",
                  "value": 2.1,
                  "duration": 0,
                  "target": "self",
                  "notAboveHpPct": 50
                }
              ],
              "desc": "鸭鸭也要学会保护自己！赋予自身【受击恢复】效果，在下次受击时对自身进行治疗，恢复相当于自身精神力{$T1}的生命值。※自身生命值大于50%时不可触发。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "B",
              "name": "鸭鸭冲锋",
              "damage": 2.55,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "勇敢的鸭鸭奋力撞向敌人，对敌方单体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "S",
              "name": "这是我们的力量！",
              "damage": 2.7,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "坚毅",
                  "kind": "buff",
                  "stat": "drPct",
                  "value": 0.2,
                  "duration": 10,
                  "target": "self"
                }
              ],
              "desc": "凯茜和鸭鸭齐心协力，共同发动攻击！对敌方单体造成相当于自身攻击力{$T1}的伤害，并赋予自身【坚毅】效果，获得{$T2}的伤害减免，持续10秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10006.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "Time15Sec",
                "self": "HP_Less_50",
                "target": "Self",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 102,
            "effective": 9129,
            "killed": false,
            "killTime": null,
            "direct": 3063,
            "dot": 0,
            "normal": 6065
          },
          "group": {
            "dps": 102,
            "effective": 9129,
            "killed": false,
            "killTime": null,
            "direct": 3063,
            "dot": 0,
            "normal": 6065
          },
          "rank": 28
        },
        {
          "id": 10006,
          "name": "格洛瑞娅",
          "role": "tank",
          "roleLabel": "坦克",
          "element": 3,
          "elementName": "星穹",
          "elementSymbol": "星",
          "avatar": "img/rank_avatar/10006.png",
          "link": "index.html#/10006",
          "base": {
            "hp": 11989,
            "atk": 261,
            "defense": 433,
            "mind": 921,
            "spd": 101,
            "crit": 0.07000000029802322,
            "critDmg": 1.5,
            "accuracy": 65
          },
          "skills": [
            {
              "slot": "A",
              "name": "傀儡自修复",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "治疗",
                  "kind": "buff",
                  "stat": "healPct",
                  "value": 1.7,
                  "duration": 1,
                  "target": "self"
                },
                {
                  "name": "坚毅",
                  "kind": "buff",
                  "stat": "drPct",
                  "value": 0.2,
                  "duration": 10,
                  "target": "self"
                }
              ],
              "desc": "启动自我修复功能，对自身进行治疗，恢复相当于自身精神力{$T1}的生命值，并赋予自身【坚毅】效果，获得{$T2}的伤害减免，持续10秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "B",
              "name": "重锤钝击",
              "damage": 2.2,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "用巨大的钝器重击对手，对敌方单体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "S",
              "name": "机关起源",
              "damage": 2.5,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "受击恢复",
                  "kind": "buff",
                  "stat": "healOnBeHitPct",
                  "value": 1.9,
                  "duration": 0,
                  "target": "self"
                }
              ],
              "desc": "发挥新旧技术融合带来的优势，对敌方单体造成相当于自身攻击力{$T1}的伤害，并赋予自身【受击恢复】效果，在下次受击时对自身进行治疗，恢复相当于自身精神力{$T2}的生命值。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10005.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "Time20Sec",
                "self": "HP_Less_50",
                "target": "Self",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time20Sec",
                "self": "HP_Greater_30",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 96.3,
            "effective": 8622,
            "killed": false,
            "killTime": null,
            "direct": 2787,
            "dot": 0,
            "normal": 5835
          },
          "group": {
            "dps": 96.3,
            "effective": 8622,
            "killed": false,
            "killTime": null,
            "direct": 2787,
            "dot": 0,
            "normal": 5835
          },
          "rank": 29
        },
        {
          "id": 10024,
          "name": "欧罗拉",
          "role": "tank",
          "roleLabel": "坦克",
          "element": 0,
          "elementName": "王剑",
          "elementSymbol": "剑",
          "avatar": "img/rank_avatar/10024.png",
          "link": "index.html#/10024",
          "base": {
            "hp": 7380,
            "atk": 233,
            "defense": 428,
            "mind": 1007,
            "spd": 101,
            "crit": 0.09099999815225601,
            "critDmg": 1.5,
            "accuracy": 60
          },
          "skills": [
            {
              "slot": "A",
              "name": "寒霜绽放",
              "damage": 2.02,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "施放冰雪魔法，对敌方全体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "B",
              "name": "护身晶雾",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0.24,
              "defDownDuration": 8,
              "effects": [
                {
                  "name": "防护",
                  "kind": "buff",
                  "stat": "defPct",
                  "value": 0.24,
                  "duration": 8,
                  "target": "self"
                }
              ],
              "desc": "张开魔法屏障，赋予自身【防护】效果，使自身防御力提高{$T1}，持续8秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "S",
              "name": "冰河之息",
              "damage": 2.25,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "受击恢复",
                  "kind": "buff",
                  "stat": "healOnBeHitPct",
                  "value": 2.7,
                  "duration": 0,
                  "target": "self"
                }
              ],
              "desc": "展开伞盾，对敌方全体造成相当于自身攻击力{$T1}的伤害，并赋予自身【受击恢复】效果，在下次受击时对自身进行治疗，恢复相当于自身精神力{$T2}的生命值。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10023.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "FirstTurn",
                "self": "Any",
                "target": "Self",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Self",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Time15Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 76.7,
            "effective": 6863,
            "killed": false,
            "killTime": null,
            "direct": 2286,
            "dot": 0,
            "normal": 4577
          },
          "group": {
            "dps": 148.8,
            "effective": 13320,
            "killed": false,
            "killTime": null,
            "direct": 8743,
            "dot": 0,
            "normal": 4577
          },
          "rank": 30
        }
      ],
      "group": [
        {
          "id": 10030,
          "name": "阿拉丁",
          "role": "dps",
          "roleLabel": "输出",
          "element": 2,
          "elementName": "权杖",
          "elementSymbol": "杖",
          "avatar": "img/rank_avatar/10030.png",
          "link": "index.html#/10030",
          "base": {
            "hp": 7974,
            "atk": 1321,
            "defense": 312,
            "mind": 734,
            "spd": 115,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 88
          },
          "skills": [
            {
              "slot": "A",
              "name": "全副武装",
              "damage": 2.3,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "敏捷",
                  "kind": "buff",
                  "stat": "spdPct",
                  "value": 0.2,
                  "duration": 12,
                  "target": "self"
                }
              ],
              "desc": "借助神灯中的“魔灵”增幅身体能力，对敌方单体造成相当于自身攻击力{$T1}的伤害，并赋予自身【敏捷】效果，使自身速度提高{$T2}，持续12秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "B",
              "name": "义警出动！",
              "damage": 2.25,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "青年以正义为信条，不会放过任何恶人。对敌方全体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "S",
              "name": "沙海驰骋",
              "damage": 3.2,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "暴伤",
                  "kind": "buff",
                  "stat": "critDmgPct",
                  "value": 0.41,
                  "duration": 12,
                  "target": "self"
                },
                {
                  "name": "集中",
                  "kind": "buff",
                  "stat": "critPct",
                  "value": 0.41,
                  "duration": 12,
                  "target": "self"
                },
                {
                  "name": "暴击提升",
                  "kind": "buff",
                  "stat": "critPct",
                  "value": 0.15,
                  "duration": 12,
                  "target": "self"
                }
              ],
              "desc": "有“魔灵”协助，无论多么困难的任务，阿拉丁都必定能完成。对敌方单体造成相当于自身攻击力{$T1}的伤害，并赋予自身【暴伤】和【集中】效果，使自身暴击伤害提高{$T2}，暴击率提升{$T3}，持续12秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10029.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "FirstTurn",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time15Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe_HighestSpeed",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 1471.3,
            "effective": 19222,
            "killed": true,
            "killTime": 13.06,
            "direct": 5801,
            "dot": 0,
            "normal": 13421
          },
          "group": {
            "dps": 1789.8,
            "effective": 76888,
            "killed": true,
            "killTime": 42.96,
            "direct": 33803,
            "dot": 0,
            "normal": 43085
          },
          "rank": 1
        },
        {
          "id": 10005,
          "name": "阿尔法",
          "role": "dps",
          "roleLabel": "输出",
          "element": 4,
          "elementName": "高塔",
          "elementSymbol": "塔",
          "avatar": "img/rank_avatar/10005.png",
          "link": "index.html#/10005",
          "base": {
            "hp": 8573,
            "atk": 1389,
            "defense": 256,
            "mind": 640,
            "spd": 105,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 85
          },
          "skills": [
            {
              "slot": "A",
              "name": "过载",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "决心",
                  "kind": "buff",
                  "stat": "atkPct",
                  "value": 0.42,
                  "duration": 25,
                  "target": "self"
                }
              ],
              "desc": "超频驱动武装单元，短时间内大幅提高自身攻击力。赋予自身【决心】效果，使自身攻击力提高{$T1}，持续25秒。※自身生命值低于30%时不可触发。",
              "cooldown": 25,
              "cooldownType": 1,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "B",
              "name": "背水",
              "damage": 2.93,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "强烈的意志会成为力量之源。对敌方单体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "S",
              "name": "断念业火",
              "damage": 2.02,
              "targets": "all",
              "dot": {
                "rate": 0.01,
                "duration": 8,
                "targets": "all",
                "name": "灼伤"
              },
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "燃起火焰，将一切灼烧殆尽。对敌方全体造成相当于自身攻击力{$T1}的伤害，并赋予其【灼伤】效果，使其每秒损失1%的生命值，持续8秒。",
              "cooldown": 0,
              "cooldownType": 1,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10004.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "FirstTurn",
                "self": "HP_Greater_30",
                "target": "Self",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time25Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Time40Sec",
                "self": "HP_Greater_30",
                "target": "Self",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 1040.9,
            "effective": 19222,
            "killed": true,
            "killTime": 18.47,
            "direct": 3272,
            "dot": 2182,
            "normal": 13768
          },
          "group": {
            "dps": 1665.4,
            "effective": 76888,
            "killed": true,
            "killTime": 46.17,
            "direct": 27240,
            "dot": 20203,
            "normal": 29445
          },
          "rank": 2
        },
        {
          "id": 10035,
          "name": "欧米伽",
          "role": "dps",
          "roleLabel": "输出",
          "element": 0,
          "elementName": "王剑",
          "elementSymbol": "剑",
          "avatar": "img/rank_avatar/10035.png",
          "link": "index.html#/10035",
          "base": {
            "hp": 8295,
            "atk": 1233,
            "defense": 327,
            "mind": 648,
            "spd": 115,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 82
          },
          "skills": [
            {
              "slot": "A",
              "name": "战场先锋",
              "damage": 2.7,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "率先冲入敌阵，对敌方单体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "B",
              "name": "威慑",
              "damage": 0,
              "targets": "all",
              "dot": null,
              "defDown": 0.2,
              "defDownDuration": 25,
              "effects": [
                {
                  "name": "脆弱",
                  "kind": "debuff",
                  "stat": "defPct",
                  "value": 0.2,
                  "duration": 25,
                  "target": "enemy_all"
                }
              ],
              "desc": "以武力震慑敌方。赋予敌方全体【脆弱】效果，使其防御力降低{$T1}，持续25秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "S",
              "name": "对决",
              "damage": 2.3,
              "targets": "all",
              "dot": null,
              "defDown": 0.13,
              "defDownDuration": 12,
              "effects": [
                {
                  "name": "破甲",
                  "kind": "debuff",
                  "stat": "defPct",
                  "value": 0.13,
                  "duration": 12,
                  "target": "enemy_all"
                }
              ],
              "desc": "包裹全身的厚重装甲，亦是威力惊人的武器。对敌方全体造成相当于自身攻击力{$T1}的伤害，并赋予其【破甲】效果，使其防御力降低{$T2}，持续12秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10034.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "FirstTurn",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "TurnStep3",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 1091.3,
            "effective": 19222,
            "killed": true,
            "killTime": 17.61,
            "direct": 10323,
            "dot": 0,
            "normal": 8899
          },
          "group": {
            "dps": 1433.3,
            "effective": 76888,
            "killed": true,
            "killTime": 53.64,
            "direct": 48854,
            "dot": 0,
            "normal": 28034
          },
          "rank": 3
        },
        {
          "id": 10017,
          "name": "爱丽丝",
          "role": "dps",
          "roleLabel": "输出",
          "element": 2,
          "elementName": "权杖",
          "elementSymbol": "杖",
          "avatar": "img/rank_avatar/10017.png",
          "link": "index.html#/10017",
          "base": {
            "hp": 7867,
            "atk": 1268,
            "defense": 335,
            "mind": 665,
            "spd": 108,
            "crit": 0.15399999916553497,
            "critDmg": 1.5,
            "accuracy": 84
          },
          "skills": [
            {
              "slot": "A",
              "name": "惊喜，穿越而来",
              "damage": 2.48,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "自其他时空召唤攻击，对敌方单体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "B",
              "name": "威胁预知",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "暴伤",
                  "kind": "buff",
                  "stat": "critDmgPct",
                  "value": 0.41,
                  "duration": 10,
                  "target": "self"
                },
                {
                  "name": "锐利",
                  "kind": "buff",
                  "stat": "critPct",
                  "value": 0.41,
                  "duration": 10,
                  "target": "self"
                },
                {
                  "name": "暴击提升",
                  "kind": "buff",
                  "stat": "critPct",
                  "value": 0.2,
                  "duration": 10,
                  "target": "self"
                }
              ],
              "desc": "借助准确的直觉，赋予自身【暴伤】和【锐利】效果，使自身暴击伤害提高{$T1}，暴击率提升{$T2}，持续10秒。",
              "cooldown": 15,
              "cooldownType": 1,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "S",
              "name": "终时之箭",
              "damage": 2.42,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "将“魔法少女”的力量叠加附着在箭矢上，射出击穿时空的一箭，对敌方全体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10016.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "FirstTurn",
                "self": "Any",
                "target": "Self",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time15Sec",
                "self": "Any",
                "target": "Self",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 837.5,
            "effective": 19222,
            "killed": true,
            "killTime": 22.95,
            "direct": 5772,
            "dot": 0,
            "normal": 13450
          },
          "group": {
            "dps": 1244.3,
            "effective": 76888,
            "killed": true,
            "killTime": 61.79,
            "direct": 41393,
            "dot": 0,
            "normal": 35495
          },
          "rank": 4
        },
        {
          "id": 10003,
          "name": "克萝依",
          "role": "dps",
          "roleLabel": "输出",
          "element": 1,
          "elementName": "圣杯",
          "elementSymbol": "杯",
          "avatar": "img/rank_avatar/10003.png",
          "link": "index.html#/10003",
          "base": {
            "hp": 5391,
            "atk": 904,
            "defense": 276,
            "mind": 532,
            "spd": 105,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 70
          },
          "skills": [
            {
              "slot": "A",
              "name": "幻境花海",
              "damage": 2.8,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "描绘幻景，对敌方单体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "B",
              "name": "活力芳香",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "鼓舞",
                  "kind": "buff",
                  "stat": "atkPct",
                  "value": 0.25,
                  "duration": 12,
                  "target": "all_allies"
                }
              ],
              "desc": "以花香为媒介，赋予我方全体【鼓舞】效果，使我方全体攻击力提高{$T1}，持续12秒。",
              "cooldown": 1.5,
              "cooldownType": 1,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "S",
              "name": "炽灼星光",
              "damage": 1.7,
              "targets": "all",
              "dot": {
                "rate": 0.015,
                "duration": 6,
                "targets": "all",
                "name": "收工之炎"
              },
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "璀璨星光在克萝依手中绽放。对敌方全体造成相当于自身攻击力{$T1}的伤害，并赋予敌方全体【收工之炎】效果，使其每秒损失1.5%的生命值，持续6秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10002.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "FirstTurn",
                "self": "Any",
                "target": "Ally",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Time15Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 594.8,
            "effective": 19222,
            "killed": true,
            "killTime": 32.32,
            "direct": 3880,
            "dot": 6039,
            "normal": 9303
          },
          "group": {
            "dps": 1206.8,
            "effective": 76888,
            "killed": true,
            "killTime": 63.71,
            "direct": 17058,
            "dot": 42175,
            "normal": 17654
          },
          "rank": 5
        },
        {
          "id": 10023,
          "name": "温妮弗德",
          "role": "support",
          "roleLabel": "辅助",
          "element": 3,
          "elementName": "星穹",
          "elementSymbol": "星",
          "avatar": "img/rank_avatar/10023.png",
          "link": "index.html#/10023",
          "base": {
            "hp": 8693,
            "atk": 1243,
            "defense": 303,
            "mind": 657,
            "spd": 108,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 83
          },
          "skills": [
            {
              "slot": "A",
              "name": "实验解析",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0.2,
              "defDownDuration": 12,
              "effects": [
                {
                  "name": "脆弱",
                  "kind": "debuff",
                  "stat": "defPct",
                  "value": 0.2,
                  "duration": 12,
                  "target": "enemy_single"
                }
              ],
              "desc": "针对性地削弱强者。赋予攻击力最高的敌方单位【脆弱】效果，使其防御力降低{$T1}，持续12秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "B",
              "name": "豌豆追踪",
              "damage": 2.4,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "在豌豆装置的协助下，对攻击力最高的敌方单位造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "S",
              "name": "最终爆破实验",
              "damage": 2.18,
              "targets": "all",
              "dot": null,
              "defDown": 0.2,
              "defDownDuration": 10,
              "effects": [
                {
                  "name": "破甲",
                  "kind": "debuff",
                  "stat": "defPct",
                  "value": 0.2,
                  "duration": 10,
                  "target": "enemy_all"
                }
              ],
              "desc": "结合战场环境解析敌方弱点，令豌豆装置进行攻击。对攻击力最高的敌方单位造成相当于自身攻击力{$T1}的伤害，并赋予敌方全体【破甲】效果，使其防御力降低{$T2}，持续10秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10022.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "Time25Sec",
                "self": "Any",
                "target": "Foe_HighestAtk",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time10Sec",
                "self": "Any",
                "target": "Foe_HighestAtk",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe_HighestAtk",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 806.5,
            "effective": 19222,
            "killed": true,
            "killTime": 23.83,
            "direct": 6858,
            "dot": 0,
            "normal": 12364
          },
          "group": {
            "dps": 1161.3,
            "effective": 76888,
            "killed": true,
            "killTime": 66.21,
            "direct": 41746,
            "dot": 0,
            "normal": 35142
          },
          "rank": 6
        },
        {
          "id": 10034,
          "name": "芙蕾雅",
          "role": "dps",
          "roleLabel": "输出",
          "element": 2,
          "elementName": "权杖",
          "elementSymbol": "杖",
          "avatar": "img/rank_avatar/10034.png",
          "link": "index.html#/10034",
          "base": {
            "hp": 7935,
            "atk": 1301,
            "defense": 324,
            "mind": 648,
            "spd": 103,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 83
          },
          "skills": [
            {
              "slot": "A",
              "name": "汲寒",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "暴伤",
                  "kind": "buff",
                  "stat": "critDmgPct",
                  "value": 0.4,
                  "duration": 10,
                  "target": "self"
                },
                {
                  "name": "锐利",
                  "kind": "buff",
                  "stat": "critPct",
                  "value": 0.4,
                  "duration": 10,
                  "target": "self"
                },
                {
                  "name": "暴击提升",
                  "kind": "buff",
                  "stat": "critPct",
                  "value": 0.19,
                  "duration": 10,
                  "target": "self"
                }
              ],
              "desc": "化自然之力为己用，赋予自身【暴伤】和【锐利】效果，使自身暴击伤害提高{$T1}，暴击率提升{$T2}，持续10秒。",
              "cooldown": 10,
              "cooldownType": 1,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "B",
              "name": "冬之审判",
              "damage": 0,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "冻结",
                  "kind": "debuff",
                  "stat": "controlPct",
                  "value": 0,
                  "duration": 17,
                  "target": "enemy_all"
                }
              ],
              "desc": "自如操控风雪与冰霜，赋予敌方全体【冻结】效果，持续{$T1}秒。",
              "cooldown": 12,
              "cooldownType": 1,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "S",
              "name": "极寒裁断",
              "damage": 2.45,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "女王下达的判决不容违抗。对敌方全体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10033.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "FirstTurn",
                "self": "Any",
                "target": "Self",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "TurnStep4",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "TurnStep6",
                "self": "Any",
                "target": "Self",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 695.8,
            "effective": 19222,
            "killed": true,
            "killTime": 27.62,
            "direct": 4547,
            "dot": 0,
            "normal": 14675
          },
          "group": {
            "dps": 1121.1,
            "effective": 76888,
            "killed": true,
            "killTime": 68.58,
            "direct": 41114,
            "dot": 0,
            "normal": 35774
          },
          "rank": 7
        },
        {
          "id": 10010,
          "name": "米芙",
          "role": "support",
          "roleLabel": "辅助",
          "element": 2,
          "elementName": "权杖",
          "elementSymbol": "杖",
          "avatar": "img/rank_avatar/10010.png",
          "link": "index.html#/10010",
          "base": {
            "hp": 5446,
            "atk": 853,
            "defense": 236,
            "mind": 600,
            "spd": 104,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 76
          },
          "skills": [
            {
              "slot": "A",
              "name": "针对性用药",
              "damage": 0,
              "targets": "single",
              "dot": {
                "rate": 0.012,
                "duration": 6,
                "targets": "single",
                "name": "中毒"
              },
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "挑选药剂进行战斗，赋予防御力最高的敌方单位【中毒】效果，使其每秒损失1.2%的生命值，持续{$T1}秒。",
              "cooldown": 5,
              "cooldownType": 1,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "B",
              "name": "实验守则",
              "damage": 2.53,
              "targets": "all",
              "dot": null,
              "defDown": 0.18,
              "defDownDuration": 8,
              "effects": [
                {
                  "name": "脆弱",
                  "kind": "debuff",
                  "stat": "defPct",
                  "value": 0.18,
                  "duration": 8,
                  "target": "enemy_all"
                }
              ],
              "desc": "战场上的“实验守则”都由米芙掌控。对敌方全体造成相当于自身攻击力{$T1}的伤害，并赋予防御力最高的敌方单位【脆弱】效果，使其防御力降低{$T2}，持续8秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "S",
              "name": "深海猛毒药",
              "damage": 0,
              "targets": "all",
              "dot": {
                "rate": 0.012,
                "duration": 10,
                "targets": "all",
                "name": "中毒"
              },
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "投放精心调制而成的剧毒药剂，赋予敌方全体【中毒】效果，使其每秒损失1.2%的生命值，持续{$T1}秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10009.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Foe_HighestDef",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time15Sec",
                "self": "Any",
                "target": "Foe_HighestDef",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 554,
            "effective": 19222,
            "killed": true,
            "killTime": 34.7,
            "direct": 1589,
            "dot": 7657,
            "normal": 9977
          },
          "group": {
            "dps": 1108,
            "effective": 76888,
            "killed": true,
            "killTime": 69.39,
            "direct": 9991,
            "dot": 47142,
            "normal": 19755
          },
          "rank": 8
        },
        {
          "id": 10029,
          "name": "佩德萝",
          "role": "dps",
          "roleLabel": "输出",
          "element": 0,
          "elementName": "王剑",
          "elementSymbol": "剑",
          "avatar": "img/rank_avatar/10029.png",
          "link": "index.html#/10029",
          "base": {
            "hp": 8203,
            "atk": 1317,
            "defense": 303,
            "mind": 699,
            "spd": 110,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 83
          },
          "skills": [
            {
              "slot": "A",
              "name": "佣兵的决意",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "决心",
                  "kind": "buff",
                  "stat": "atkPct",
                  "value": 0.32,
                  "duration": 15,
                  "target": "self"
                }
              ],
              "desc": "行事果断，决不动摇。赋予自身【决心】效果，使自身攻击力提高{$T1}，持续15秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "B",
              "name": "边境守卫",
              "damage": 2.65,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "以一敌多也不在话下。对敌方全体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "S",
              "name": "剑术传承",
              "damage": 3.08,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "蹒跚",
                  "kind": "debuff",
                  "stat": "spdPct",
                  "value": 0.2,
                  "duration": 15,
                  "target": "enemy_single"
                }
              ],
              "desc": "老爹传授的剑术，对佩德萝而言意义非凡。对敌方单体造成相当于自身攻击力{$T1}的伤害，并赋予其【蹒跚】效果，使其速度降低{$T2}，持续15秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10028.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "FirstTurn",
                "self": "Any",
                "target": "Self",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time15Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Self",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 933.9,
            "effective": 19222,
            "killed": true,
            "killTime": 20.58,
            "direct": 6790,
            "dot": 0,
            "normal": 12432
          },
          "group": {
            "dps": 1093.3,
            "effective": 76888,
            "killed": true,
            "killTime": 70.33,
            "direct": 35488,
            "dot": 0,
            "normal": 41400
          },
          "rank": 9
        },
        {
          "id": 10021,
          "name": "香纶",
          "role": "dps",
          "roleLabel": "输出",
          "element": 1,
          "elementName": "圣杯",
          "elementSymbol": "杯",
          "avatar": "img/rank_avatar/10021.png",
          "link": "index.html#/10021",
          "base": {
            "hp": 8062,
            "atk": 1268,
            "defense": 329,
            "mind": 776,
            "spd": 108,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 84
          },
          "skills": [
            {
              "slot": "A",
              "name": "香甜气息",
              "damage": 2.54,
              "targets": "single",
              "dot": null,
              "defDown": 0.23,
              "defDownDuration": 10,
              "effects": [
                {
                  "name": "脆弱",
                  "kind": "debuff",
                  "stat": "defPct",
                  "value": 0.23,
                  "duration": 10,
                  "target": "enemy_single"
                }
              ],
              "desc": "以糖果芳香吸引敌人的注意力，对敌方单体造成相当于自身攻击力{$T1}的伤害，并赋予其【脆弱】效果，使其防御力降低{$T2}，持续10秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "B",
              "name": "糕点盛宴",
              "damage": 2.9,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "香纶的糖果屋中，可不是只有惊喜！对敌方单体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "S",
              "name": "天降糖果雨！",
              "damage": 2.35,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "召唤巨大的甜食，对敌方全体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10020.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time15Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 777.7,
            "effective": 19222,
            "killed": true,
            "killTime": 24.72,
            "direct": 6813,
            "dot": 0,
            "normal": 12409
          },
          "group": {
            "dps": 1049.4,
            "effective": 76888,
            "killed": true,
            "killTime": 73.27,
            "direct": 42356,
            "dot": 0,
            "normal": 34532
          },
          "rank": 10
        },
        {
          "id": 10001,
          "name": "艾琳娜",
          "role": "special",
          "roleLabel": "特殊",
          "element": 5,
          "elementName": "愚者",
          "elementSymbol": "愚",
          "avatar": "img/rank_avatar/10001.png",
          "link": "index.html#/10001",
          "base": {
            "hp": 8618,
            "atk": 704,
            "defense": 511,
            "mind": 1194,
            "spd": 110,
            "crit": 0.03500000014901161,
            "critDmg": 1.5,
            "accuracy": 80
          },
          "skills": [
            {
              "slot": "A",
              "name": "精神鼓舞",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "英勇",
                  "kind": "buff",
                  "stat": "atkPct",
                  "value": 0.5,
                  "duration": 15,
                  "target": "all_allies"
                }
              ],
              "desc": "以激昂的魔法鼓舞伙伴。赋予我方全体【英勇】效果，使我方全体攻击力提高{$T1}，持续15秒。",
              "cooldown": 2,
              "cooldownType": 1,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "B",
              "name": "魔力爆破",
              "damage": 2.6,
              "targets": "single",
              "dot": null,
              "defDown": 0.5,
              "defDownDuration": 15,
              "effects": [
                {
                  "name": "脆弱",
                  "kind": "debuff",
                  "stat": "defPct",
                  "value": 0.5,
                  "duration": 15,
                  "target": "enemy_single"
                }
              ],
              "desc": "在阿帕的辅助下，锁定防御力最高的敌方单位进行攻击，造成相当于自身攻击力{$T1}的伤害，并赋予其【脆弱】效果，使其防御力降低{$T2}，持续15秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "S",
              "name": "弱点解析",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "鼓舞",
                  "kind": "buff",
                  "stat": "atkPct",
                  "value": 0.6,
                  "duration": 18,
                  "target": "all_allies"
                },
                {
                  "name": "集中",
                  "kind": "buff",
                  "stat": "critPct",
                  "value": 0.6,
                  "duration": 18,
                  "target": "all_allies"
                },
                {
                  "name": "暴击提升",
                  "kind": "buff",
                  "stat": "critPct",
                  "value": 0.1,
                  "duration": 18,
                  "target": "all_allies"
                }
              ],
              "desc": "启动阿帕对敌方进行解析，将其弱点信息共享给全体伙伴。赋予我方全体【鼓舞】和【集中】效果，使我方全体攻击力提高{$T1}、暴击率提高{$T2}，持续18秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BATTLE_RULE.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "FirstTurn",
                "self": "Any",
                "target": "Ally",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time15Sec",
                "self": "Any",
                "target": "Foe_HighestDef",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Time30Sec",
                "self": "Any",
                "target": "Ally",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Ally",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 800.5,
            "effective": 19222,
            "killed": true,
            "killTime": 24.01,
            "direct": 1907,
            "dot": 0,
            "normal": 17315
          },
          "group": {
            "dps": 1007.3,
            "effective": 76888,
            "killed": true,
            "killTime": 76.33,
            "direct": 6720,
            "dot": 0,
            "normal": 70168
          },
          "rank": 11
        },
        {
          "id": 10025,
          "name": "爱洛",
          "role": "support",
          "roleLabel": "辅助",
          "element": 0,
          "elementName": "王剑",
          "elementSymbol": "剑",
          "avatar": "img/rank_avatar/10025.png",
          "link": "index.html#/10025",
          "base": {
            "hp": 6809,
            "atk": 1365,
            "defense": 303,
            "mind": 563,
            "spd": 126,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 88
          },
          "skills": [
            {
              "slot": "A",
              "name": "荆棘诅咒",
              "damage": 0,
              "targets": "all",
              "dot": {
                "rate": 0.01,
                "duration": 3,
                "targets": "all",
                "name": "撕裂"
              },
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "荆棘",
                  "kind": "buff",
                  "stat": "specialPct",
                  "value": 0,
                  "duration": 20,
                  "target": "self",
                  "special": "normal_aoe"
                }
              ],
              "desc": "爱洛与“噩兆”身边围绕着不祥的荆棘。每次普通攻击都可以对敌方全体造成伤害，持续{$T1}秒，并赋予敌方全体【撕裂】效果，使其每秒失去1%的生命值，持续3秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "B",
              "name": "冥夜窥望",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "攻击提升",
                  "kind": "buff",
                  "stat": "atkPct",
                  "value": 0.58,
                  "duration": 20,
                  "target": "self"
                }
              ],
              "desc": "在黑夜中窥视梦境。使自身攻击力提升{$T1}，持续20秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "S",
              "name": "梦魇潜影",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "梦魇",
                  "kind": "buff",
                  "stat": "specialPct",
                  "value": 0,
                  "duration": 16,
                  "target": "self",
                  "special": "extra_attack_2x"
                }
              ],
              "desc": "撕裂梦境与现实的边界，吞噬敌方的精神。“噩兆”每次攻击都对目标敌方造成当于自身攻击力双倍的伤害，持续{$T1}秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10024.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "FirstTurn",
                "self": "Any",
                "target": "Self",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Self",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Self",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 764.4,
            "effective": 19222,
            "killed": true,
            "killTime": 25.15,
            "direct": 0,
            "dot": 828,
            "normal": 18394
          },
          "group": {
            "dps": 1000.7,
            "effective": 76888,
            "killed": true,
            "killTime": 76.84,
            "direct": 0,
            "dot": 6018,
            "normal": 70870
          },
          "rank": 12
        },
        {
          "id": 10026,
          "name": "安娜",
          "role": "tank",
          "roleLabel": "坦克",
          "element": 1,
          "elementName": "圣杯",
          "elementSymbol": "杯",
          "avatar": "img/rank_avatar/10026.png",
          "link": "index.html#/10026",
          "base": {
            "hp": 8181,
            "atk": 1120,
            "defense": 534,
            "mind": 751,
            "spd": 113,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 84
          },
          "skills": [
            {
              "slot": "A",
              "name": "跃动烛光",
              "damage": 2.7,
              "targets": "single",
              "dot": {
                "rate": 0.01,
                "duration": 8,
                "targets": "single",
                "name": "灼伤"
              },
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "擦亮火柴，引燃奄奄一息的敌人。对生命值最低的敌方单位造成相当于自身攻击力{$T1}的伤害，并赋予其【灼伤】效果，使其每秒损失1%的生命值，持续8秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "B",
              "name": "恒心之焰",
              "damage": 1.84,
              "targets": "all",
              "dot": null,
              "defDown": 0.16,
              "defDownDuration": 15,
              "effects": [
                {
                  "name": "脆弱",
                  "kind": "debuff",
                  "stat": "defPct",
                  "value": 0.16,
                  "duration": 15,
                  "target": "enemy_all"
                }
              ],
              "desc": "擦亮火柴，驱散前路的阴霾。对敌方全体造成相当于自身攻击力{$T1}的伤害，并赋予其【脆弱】效果，使敌方全体防御力降低{$T2}，持续15秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "S",
              "name": "引领者的灯火",
              "damage": 2.32,
              "targets": "single",
              "dot": null,
              "defDown": 0.28,
              "defDownDuration": 10,
              "effects": [
                {
                  "name": "决心",
                  "kind": "buff",
                  "stat": "atkPct",
                  "value": 0.28,
                  "duration": 10,
                  "target": "all_allies"
                },
                {
                  "name": "防护",
                  "kind": "buff",
                  "stat": "defPct",
                  "value": 0.28,
                  "duration": 10,
                  "target": "all_allies"
                },
                {
                  "name": "防御提升",
                  "kind": "buff",
                  "stat": "defPct",
                  "value": 0.28,
                  "duration": 10,
                  "target": "all_allies"
                }
              ],
              "desc": "擦亮火柴，于苦难中燃起斗志。对敌方单体造成相当于自身攻击力{$T1}的伤害，并赋予我方全体【决心】效果和【防护】效果，使我方全体攻击力提高{$T2}、防御力提高{$T3}，持续10秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10025.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "Time15Sec",
                "self": "Any",
                "target": "Foe_LowestHP",
                "unit": "HP_Less_30",
                "action": "Skill_A"
              },
              {
                "turn": "TurnStep3",
                "self": "HP_Less_80",
                "target": "Foe_LowestHP",
                "unit": "HP_Less_20",
                "action": "Skill_A"
              },
              {
                "turn": "Time20Sec",
                "self": "HP_Less_80",
                "target": "Foe",
                "unit": "HP_Less_60",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 934.8,
            "effective": 19222,
            "killed": true,
            "killTime": 20.56,
            "direct": 6055,
            "dot": 474,
            "normal": 12693
          },
          "group": {
            "dps": 973.8,
            "effective": 76888,
            "killed": true,
            "killTime": 78.96,
            "direct": 23721,
            "dot": 2262,
            "normal": 50905
          },
          "rank": 13
        },
        {
          "id": 10002,
          "name": "辛德瑞拉",
          "role": "support",
          "roleLabel": "辅助",
          "element": 2,
          "elementName": "权杖",
          "elementSymbol": "杖",
          "avatar": "img/rank_avatar/10002.png",
          "link": "index.html#/10002",
          "base": {
            "hp": 7770,
            "atk": 1278,
            "defense": 341,
            "mind": 682,
            "spd": 100,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 82
          },
          "skills": [
            {
              "slot": "A",
              "name": "女仆的职责",
              "damage": 2.95,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "疲惫",
                  "kind": "debuff",
                  "stat": "atkPct",
                  "value": 0.4,
                  "duration": 12,
                  "target": "enemy_single"
                }
              ],
              "desc": "优秀的女仆连清理战场也是易如反掌。对攻击力最高的敌方单位造成相当于自身攻击力{$T1}的伤害，并赋予其【疲惫】效果，使其攻击力降低{$T2}，持续12秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "B",
              "name": "严阵以待",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "敏捷",
                  "kind": "buff",
                  "stat": "spdPct",
                  "value": 0.2,
                  "duration": 12,
                  "target": "self"
                },
                {
                  "name": "蹒跚",
                  "kind": "debuff",
                  "stat": "spdPct",
                  "value": 0.2,
                  "duration": 12,
                  "target": "enemy_single"
                }
              ],
              "desc": "做好万全准备，赋予自身【敏捷】效果，使自身速度提高{$T1}，并赋予攻击力最高的敌方单位【蹒跚】效果，使其速度降低{$T2}，持续12秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "S",
              "name": "玻璃舞会之梦",
              "damage": 3.45,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "恍惚",
                  "kind": "debuff",
                  "stat": "critPct",
                  "value": 0.1,
                  "duration": 18,
                  "target": "enemy_single"
                }
              ],
              "desc": "无论命运如何流转，水晶鞋始终映出那段翩翩起舞的时光。对攻击力最高的敌方单位造成相当于自身攻击力{$T1}的伤害，并赋予其【恍惚】效果，使其暴击率降低{$T2}，持续18秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10001.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "Time25Sec",
                "self": "Any",
                "target": "Foe_HighestAtk",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "TurnStep5",
                "self": "Any",
                "target": "Foe_HighestAtk",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe_HighestAtk",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 768.9,
            "effective": 19222,
            "killed": true,
            "killTime": 25,
            "direct": 9755,
            "dot": 0,
            "normal": 9467
          },
          "group": {
            "dps": 859.9,
            "effective": 76566,
            "killed": false,
            "killTime": null,
            "direct": 40171,
            "dot": 0,
            "normal": 36395
          },
          "rank": 14
        },
        {
          "id": 10027,
          "name": "赛莉可",
          "role": "dps",
          "roleLabel": "输出",
          "element": 4,
          "elementName": "高塔",
          "elementSymbol": "塔",
          "avatar": "img/rank_avatar/10027.png",
          "link": "index.html#/10027",
          "base": {
            "hp": 4924,
            "atk": 890,
            "defense": 255,
            "mind": 484,
            "spd": 111,
            "crit": 0.15399999916553497,
            "critDmg": 1.5,
            "accuracy": 75
          },
          "skills": [
            {
              "slot": "A",
              "name": "相为表里",
              "damage": 2.05,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "对敌方单体造成相当于自身攻击力{$T1}的伤害。这是哪一个赛莉可的力量呢？",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "B",
              "name": "精灵的呼唤",
              "damage": 1.95,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "锐利",
                  "kind": "buff",
                  "stat": "critPct",
                  "value": 0.15,
                  "duration": 10,
                  "target": "self"
                }
              ],
              "desc": "瓶中仙子看似柔弱，却拥有强大的力量。对敌方单体造成相当于自身攻击力{$T1}的伤害，并赋予自身【锐利】效果，使自身暴击率提高{$T2}，持续10秒。※自身生命值高于80%时不可触发。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "S",
              "name": "双生依存之影",
              "damage": 2.15,
              "targets": "all",
              "dot": {
                "rate": 0.01,
                "duration": 6,
                "targets": "single",
                "name": "灼伤"
              },
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "“两个”赛莉可彼此依存，无法分离。对敌方全体造成相当于自身攻击力{$T1}的伤害，并赋予生命值最低的敌方单位【灼伤】效果，使其每秒损失1%的生命值，持续6秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10026.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "TurnStep3",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "TurnStep6",
                "self": "HP_Less_80",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Time20Sec",
                "self": "HP_Less_80",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 668.6,
            "effective": 19222,
            "killed": true,
            "killTime": 28.75,
            "direct": 8612,
            "dot": 3785,
            "normal": 6825
          },
          "group": {
            "dps": 827.2,
            "effective": 74143,
            "killed": false,
            "killTime": null,
            "direct": 40640,
            "dot": 11355,
            "normal": 22148
          },
          "rank": 15
        },
        {
          "id": 10020,
          "name": "白雪",
          "role": "dps",
          "roleLabel": "输出",
          "element": 1,
          "elementName": "圣杯",
          "elementSymbol": "杯",
          "avatar": "img/rank_avatar/10020.png",
          "link": "index.html#/10020",
          "base": {
            "hp": 8038,
            "atk": 1307,
            "defense": 316,
            "mind": 717,
            "spd": 111,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 84
          },
          "skills": [
            {
              "slot": "A",
              "name": "全力以赴",
              "damage": 2.6,
              "targets": "single",
              "dot": null,
              "defDown": 0.21,
              "defDownDuration": 13,
              "effects": [
                {
                  "name": "破甲",
                  "kind": "debuff",
                  "stat": "defPct",
                  "value": 0.21,
                  "duration": 13,
                  "target": "enemy_single"
                }
              ],
              "desc": "最大限度地运用“金苹果”的能力，对敌方单体造成相当于自身攻击力{$T1}的伤害，并赋予其【破甲】效果，使其防御力降低{$T2}，持续13秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "B",
              "name": "雪国护佑",
              "damage": 1.76,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "黄金之光将扫清雪国储君前行路上的障碍。对敌方全体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "S",
              "name": "辉煌威光",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "攻击提升",
                  "kind": "buff",
                  "stat": "atkPct",
                  "value": 0.58,
                  "duration": 30,
                  "target": "self",
                  "special": "golden_apple"
                },
                {
                  "name": "暴击提升",
                  "kind": "buff",
                  "stat": "critPct",
                  "value": 0.1,
                  "duration": 30,
                  "target": "self",
                  "special": "golden_apple"
                }
              ],
              "desc": "只有无瑕果实真正认可的人，才能叩响乐园的门扉，获得强大的力量。使自身攻击力提高{$T1}，暴击率提高{$T2}，持续30秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10019.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "Time15Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Self",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 688.8,
            "effective": 19222,
            "killed": true,
            "killTime": 27.9,
            "direct": 2695,
            "dot": 0,
            "normal": 16527
          },
          "group": {
            "dps": 805.7,
            "effective": 72217,
            "killed": false,
            "killTime": null,
            "direct": 18096,
            "dot": 0,
            "normal": 54121
          },
          "rank": 16
        },
        {
          "id": 10028,
          "name": "霍莉",
          "role": "dps",
          "roleLabel": "输出",
          "element": 3,
          "elementName": "星穹",
          "elementSymbol": "星",
          "avatar": "img/rank_avatar/10028.png",
          "link": "index.html#/10028",
          "base": {
            "hp": 9023,
            "atk": 1112,
            "defense": 337,
            "mind": 807,
            "spd": 106,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 83
          },
          "skills": [
            {
              "slot": "A",
              "name": "游戏开始",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "英勇",
                  "kind": "buff",
                  "stat": "atkPct",
                  "value": 0.32,
                  "duration": 8,
                  "target": "all_allies"
                }
              ],
              "desc": "魔女的游戏就此开幕。赋予我方全体【英勇】效果，使我方全体攻击力提高{$T1}，持续8秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "B",
              "name": "珍爱的谜题",
              "damage": 2.12,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "锐利",
                  "kind": "buff",
                  "stat": "critPct",
                  "value": 0.2,
                  "duration": 10,
                  "target": "self"
                }
              ],
              "desc": "霍莉精心准备的谜题毫无破绽。对敌方全体造成相当于自身攻击力{$T1}的伤害，并赋予自身【锐利】效果，使自身暴击率提升{$T2}，持续10秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "S",
              "name": "决胜的骰子",
              "damage": 3.2,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "诱导",
                  "kind": "debuff",
                  "stat": "controlPct",
                  "value": 0,
                  "duration": 8,
                  "target": "enemy_single",
                  "special": "decoy"
                }
              ],
              "desc": "游戏盘上滚动的骰子，将决定敌方的命运。对攻击力最高的敌方单位造成相当于自身攻击力{$T1}的伤害，并赋予其【诱导】效果，持续8秒。",
              "special": "dice",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10027.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "FirstTurn",
                "self": "Any",
                "target": "Ally",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Time40Sec",
                "self": "Any",
                "target": "Ally",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe_HighestAtk",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 660.5,
            "effective": 19222,
            "killed": true,
            "killTime": 29.1,
            "direct": 6263,
            "dot": 0,
            "normal": 12959
          },
          "group": {
            "dps": 754.4,
            "effective": 67237,
            "killed": false,
            "killTime": null,
            "direct": 27951,
            "dot": 0,
            "normal": 39286
          },
          "rank": 17
        },
        {
          "id": 10009,
          "name": "奥斯汀",
          "role": "dps",
          "roleLabel": "输出",
          "element": 0,
          "elementName": "王剑",
          "elementSymbol": "剑",
          "avatar": "img/rank_avatar/10009.png",
          "link": "index.html#/10009",
          "base": {
            "hp": 6142,
            "atk": 660,
            "defense": 245,
            "mind": 614,
            "spd": 110,
            "crit": 0.10499999672174454,
            "critDmg": 1.5,
            "accuracy": 70
          },
          "skills": [
            {
              "slot": "A",
              "name": "森林守卫者",
              "damage": 2.95,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "对敌方单体造成相当于自身攻击力{$T1}的伤害，掐灭一切可能危及森林的苗头。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "B",
              "name": "猎人的准星",
              "damage": 0,
              "targets": "all",
              "dot": {
                "rate": 0.01,
                "duration": 8,
                "targets": "all",
                "name": "撕裂"
              },
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "一旦被这杆猎枪瞄准，就无法轻易逃离。赋予敌方全体【撕裂】效果，使其每秒失去1%生命，持续{$T1}秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "S",
              "name": "击发时刻",
              "damage": 3.35,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "决心",
                  "kind": "buff",
                  "stat": "atkPct",
                  "value": 0.4,
                  "duration": 12,
                  "target": "self"
                }
              ],
              "desc": "所有的准备，都是为了这精准的一击。对敌方单体造成相当于自身攻击力{$T1}的伤害。首次使用时，赋予自身【决心】效果，使自身攻击力提高{$T2}，持续12秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10008.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "Time15Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Time25Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 498.1,
            "effective": 19222,
            "killed": true,
            "killTime": 38.59,
            "direct": 5701,
            "dot": 3021,
            "normal": 10499
          },
          "group": {
            "dps": 712.6,
            "effective": 63555,
            "killed": false,
            "killTime": null,
            "direct": 15062,
            "dot": 24001,
            "normal": 24492
          },
          "rank": 18
        },
        {
          "id": 10008,
          "name": "杰佩托",
          "role": "support",
          "roleLabel": "辅助",
          "element": 3,
          "elementName": "星穹",
          "elementSymbol": "星",
          "avatar": "img/rank_avatar/10008.png",
          "link": "index.html#/10008",
          "base": {
            "hp": 6135,
            "atk": 788,
            "defense": 224,
            "mind": 607,
            "spd": 107,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 75
          },
          "skills": [
            {
              "slot": "A",
              "name": "工匠秘诀",
              "damage": 3.05,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "在杰佩托手中，任何小物件都能发挥意想不到的作用。对敌方单体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "B",
              "name": "忙里偷闲",
              "damage": 0,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "疲惫",
                  "kind": "debuff",
                  "stat": "atkPct",
                  "value": 0.2,
                  "duration": 10,
                  "target": "enemy_all"
                }
              ],
              "desc": "小憩一会也无妨嘛。赋予敌方全体单位【疲惫】效果，使其攻击力降低{$T1}，持续10秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "S",
              "name": "决战武装",
              "damage": 2.05,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "沉默",
                  "kind": "debuff",
                  "stat": "controlPct",
                  "value": 0,
                  "duration": 8,
                  "target": "enemy_all"
                }
              ],
              "desc": "现在正是展现工匠精妙手艺的关键时刻！对敌方全体造成相当于自身攻击力{$T1}的伤害，并赋予其【沉默】效果，持续8秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10007.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Time30Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 357.6,
            "effective": 19222,
            "killed": true,
            "killTime": 53.75,
            "direct": 4974,
            "dot": 0,
            "normal": 14248
          },
          "group": {
            "dps": 561.9,
            "effective": 50339,
            "killed": false,
            "killTime": null,
            "direct": 26943,
            "dot": 0,
            "normal": 23396
          },
          "rank": 19
        },
        {
          "id": 10004,
          "name": "琳赛",
          "role": "dps",
          "roleLabel": "输出",
          "element": 3,
          "elementName": "星穹",
          "elementSymbol": "星",
          "avatar": "img/rank_avatar/10004.png",
          "link": "index.html#/10004",
          "base": {
            "hp": 5414,
            "atk": 918,
            "defense": 259,
            "mind": 591,
            "spd": 117,
            "crit": 0.17499999701976776,
            "critDmg": 1.5,
            "accuracy": 70
          },
          "skills": [
            {
              "slot": "A",
              "name": "跃跃欲试",
              "damage": 2.95,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "试探着放上一箭，对随机敌方单体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "B",
              "name": "追风弩箭",
              "damage": 2.73,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "使用轻便趁手的弩箭，对敌方单体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "S",
              "name": "野性急袭",
              "damage": 3.45,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "抓住敌方的破绽进行攻击，对生命值最低的敌方单位造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            }
          ],
          "tactics": {
            "script": "BTAC_10003.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "FirstTurn",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Time25Sec",
                "self": "Any",
                "target": "Foe_Random",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time30Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe_LowestHP",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 560.1,
            "effective": 19222,
            "killed": true,
            "killTime": 34.32,
            "direct": 8012,
            "dot": 0,
            "normal": 11210
          },
          "group": {
            "dps": 555,
            "effective": 49779,
            "killed": false,
            "killTime": null,
            "direct": 20146,
            "dot": 0,
            "normal": 29633
          },
          "rank": 20
        },
        {
          "id": 10033,
          "name": "奈亚",
          "role": "special",
          "roleLabel": "特殊",
          "element": 5,
          "elementName": "愚者",
          "elementSymbol": "愚",
          "avatar": "img/rank_avatar/10033.png",
          "link": "index.html#/10033",
          "base": {
            "hp": 5908,
            "atk": 722,
            "defense": 308,
            "mind": 572,
            "spd": 120,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 70
          },
          "skills": [
            {
              "slot": "A",
              "name": "致胜棋路",
              "damage": 2.4,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "锐利",
                  "kind": "buff",
                  "stat": "critPct",
                  "value": 0.08,
                  "duration": 8,
                  "target": "self"
                }
              ],
              "desc": "奈亚抛出的硬币，总是指示着胜局。对敌方单体造成相当于自身攻击力{$T1}的伤害，并赋予自身【锐利】效果，使自身暴击率提高{$T2}，持续8秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "B",
              "name": "棋局坍塌",
              "damage": 2.2,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "操纵棋局，对敌方全体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "S",
              "name": "投转硬币的瞬间",
              "damage": 2.85,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "爆发",
                  "kind": "buff",
                  "stat": "critDmgPct",
                  "value": 0.3,
                  "duration": 15,
                  "target": "self"
                }
              ],
              "desc": "转瞬之间，胜局已定。对敌方单体造成相当于自身攻击力{$T1}的伤害，并赋予自身【爆发】效果，使自身暴击伤害提高{$T2}，持续15秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10032.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "TurnStep3",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "TurnStep4",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 522.5,
            "effective": 19222,
            "killed": true,
            "killTime": 36.79,
            "direct": 10779,
            "dot": 0,
            "normal": 8443
          },
          "group": {
            "dps": 524.5,
            "effective": 46863,
            "killed": false,
            "killTime": null,
            "direct": 25758,
            "dot": 0,
            "normal": 21105
          },
          "rank": 21
        },
        {
          "id": 10031,
          "name": "瑞恩斯",
          "role": "support",
          "roleLabel": "辅助",
          "element": 1,
          "elementName": "圣杯",
          "elementSymbol": "杯",
          "avatar": "img/rank_avatar/10031.png",
          "link": "index.html#/10031",
          "base": {
            "hp": 5103,
            "atk": 765,
            "defense": 251,
            "mind": 586,
            "spd": 119,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 70
          },
          "skills": [
            {
              "slot": "A",
              "name": "裂空黑翼",
              "damage": 1.94,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "将魔力幻化成黑羽，对敌方全体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "B",
              "name": "恸哭锁链",
              "damage": 2.6,
              "targets": "single",
              "dot": null,
              "defDown": 0.21,
              "defDownDuration": 5,
              "effects": [
                {
                  "name": "破甲",
                  "kind": "debuff",
                  "stat": "defPct",
                  "value": 0.21,
                  "duration": 5,
                  "target": "enemy_single"
                }
              ],
              "desc": "以诅咒之锁束缚对手。对速度最低的敌方单位造成相当于自身攻击力{$T1}的伤害，并赋予其【破甲】效果，使其防御力降低{$T2}，持续5秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "S",
              "name": "苦痛刺鞭",
              "damage": 3.42,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "沉默",
                  "kind": "debuff",
                  "stat": "controlPct",
                  "value": 0,
                  "duration": 8,
                  "target": "enemy_single"
                }
              ],
              "desc": "困于永恒的黑暗之中吧！对速度最低的敌方单位造成相当于自身攻击力{$T1}的伤害，并赋予其【沉默】效果，持续8秒。",
              "cooldown": 5,
              "cooldownType": 1,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10030.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time15Sec",
                "self": "Any",
                "target": "Foe_LowestSpeed",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe_LowestSpeed",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 428.6,
            "effective": 19222,
            "killed": true,
            "killTime": 44.85,
            "direct": 5436,
            "dot": 0,
            "normal": 13786
          },
          "group": {
            "dps": 499.7,
            "effective": 44829,
            "killed": false,
            "killTime": null,
            "direct": 17276,
            "dot": 0,
            "normal": 27553
          },
          "rank": 22
        },
        {
          "id": 10018,
          "name": "匹诺曹",
          "role": "support",
          "roleLabel": "辅助",
          "element": 1,
          "elementName": "圣杯",
          "elementSymbol": "杯",
          "avatar": "img/rank_avatar/10018.png",
          "link": "index.html#/10018",
          "base": {
            "hp": 7330,
            "atk": 790,
            "defense": 374,
            "mind": 791,
            "spd": 95,
            "crit": 0.08399999886751175,
            "critDmg": 1.5,
            "accuracy": 75
          },
          "skills": [
            {
              "slot": "A",
              "name": "先声夺人",
              "damage": 0,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "蹒跚",
                  "kind": "debuff",
                  "stat": "spdPct",
                  "value": 0.21,
                  "duration": 5,
                  "target": "enemy_all"
                }
              ],
              "desc": "先下手为强。赋予敌方全体【蹒跚】效果，使其速度降低{$T1}，持续5秒。",
              "cooldown": 5,
              "cooldownType": 1,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "B",
              "name": "虚荣幻影",
              "damage": 2.9,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "设下引诱敌人的陷阱，对敌方单体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "S",
              "name": "傀儡的嘲弄",
              "damage": 1.8,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "眩晕",
                  "kind": "debuff",
                  "stat": "controlPct",
                  "value": 0,
                  "duration": 5,
                  "target": "enemy_all"
                }
              ],
              "desc": "以言语操控局势，对敌方全体造成相当于自身攻击力{$T1}的伤害，并赋予其【眩晕】效果，持续5秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10017.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time15Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 304.3,
            "effective": 19222,
            "killed": true,
            "killTime": 63.16,
            "direct": 6384,
            "dot": 0,
            "normal": 12838
          },
          "group": {
            "dps": 454.7,
            "effective": 40685,
            "killed": false,
            "killTime": null,
            "direct": 22264,
            "dot": 0,
            "normal": 18420
          },
          "rank": 23
        },
        {
          "id": 10032,
          "name": "凯伊",
          "role": "tank",
          "roleLabel": "坦克",
          "element": 2,
          "elementName": "权杖",
          "elementSymbol": "杖",
          "avatar": "img/rank_avatar/10032.png",
          "link": "index.html#/10032",
          "base": {
            "hp": 8714,
            "atk": 902,
            "defense": 421,
            "mind": 921,
            "spd": 100,
            "crit": 0.14000000059604645,
            "critDmg": 1.5,
            "accuracy": 65
          },
          "skills": [
            {
              "slot": "A",
              "name": "自然奥义",
              "damage": 2.47,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "冻结",
                  "kind": "debuff",
                  "stat": "controlPct",
                  "value": 0,
                  "duration": 8,
                  "target": "enemy_single"
                }
              ],
              "desc": "运用风雪的力量，对随机敌方单体造成相当于自身攻击力{$T1}的伤害，并赋予其【冻结】效果，持续8秒。",
              "cooldown": 10,
              "cooldownType": 1,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "B",
              "name": "霜雪之剑",
              "damage": 2.8,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "凯伊的剑术与魔法相辅相成，灵巧而精湛。对敌方单体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "S",
              "name": "统御冰雪之人",
              "damage": 3.03,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "持续恢复",
                  "kind": "buff",
                  "stat": "healPct",
                  "value": 0.16,
                  "duration": 5,
                  "target": "all_allies"
                }
              ],
              "desc": "怀抱守护一切的决心，对敌方单体造成相当于自身攻击力{$T1}的伤害，并赋予我方全体【持续恢复】效果，每秒恢复相当于自身精神力{$T2}的生命值，持续5秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            }
          ],
          "tactics": {
            "script": "BTAC_10031.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "TurnStep4",
                "self": "Any",
                "target": "Foe_Random",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Foe_Random",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 400.5,
            "effective": 19222,
            "killed": true,
            "killTime": 48,
            "direct": 9621,
            "dot": 0,
            "normal": 9601
          },
          "group": {
            "dps": 408.9,
            "effective": 36803,
            "killed": false,
            "killTime": null,
            "direct": 18972,
            "dot": 0,
            "normal": 17830
          },
          "rank": 24
        },
        {
          "id": 10019,
          "name": "莉娜",
          "role": "healer",
          "roleLabel": "疗愈",
          "element": 3,
          "elementName": "星穹",
          "elementSymbol": "星",
          "avatar": "img/rank_avatar/10019.png",
          "link": "index.html#/10019",
          "base": {
            "hp": 10329,
            "atk": 735,
            "defense": 546,
            "mind": 1450,
            "spd": 103,
            "crit": 0.041999999433755875,
            "critDmg": 1.5,
            "accuracy": 75
          },
          "skills": [
            {
              "slot": "A",
              "name": "祈愿之晨曲",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0.18,
              "defDownDuration": 12,
              "effects": [
                {
                  "name": "硬化",
                  "kind": "buff",
                  "stat": "defPct",
                  "value": 0.18,
                  "duration": 12,
                  "target": "ally_single"
                }
              ],
              "desc": "轻吟动听的歌谣，赋予最前排的我方单位【硬化】效果，使其防御力提高{$T1}，持续12秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "B",
              "name": "唤心之夜曲",
              "damage": 2.2,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "攻击恢复",
                  "kind": "buff",
                  "stat": "healOnHitPct",
                  "value": 2.1,
                  "duration": 0,
                  "target": "all_allies"
                }
              ],
              "desc": "以歌声鼓舞伙伴，令敌方心生动摇。对敌方全体造成相当于自身攻击力{$T1}的伤害，并赋予我方全体【攻击恢复】效果，使其在下次攻击时对自身进行治疗，恢复相当于该次伤害{$T2}的生命值。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "S",
              "name": "夜莺的幻想曲",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "治疗",
                  "kind": "buff",
                  "stat": "healPct",
                  "value": 2.79,
                  "duration": 1,
                  "target": "all_allies"
                }
              ],
              "desc": "吟唱优美温柔的乐曲，创造生机勃勃的幻境。对我方全体进行治疗，恢复其相当于自身精神力{$T1}的生命值。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10018.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "FirstTurn",
                "self": "Any",
                "target": "Ally",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Ally",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time15Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Ally",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 269.1,
            "effective": 19222,
            "killed": true,
            "killTime": 71.44,
            "direct": 2622,
            "dot": 0,
            "normal": 16600
          },
          "group": {
            "dps": 355,
            "effective": 31783,
            "killed": false,
            "killTime": null,
            "direct": 11019,
            "dot": 0,
            "normal": 20765
          },
          "rank": 25
        },
        {
          "id": 10011,
          "name": "科薇丝",
          "role": "healer",
          "roleLabel": "疗愈",
          "element": 2,
          "elementName": "权杖",
          "elementSymbol": "杖",
          "avatar": "img/rank_avatar/10011.png",
          "link": "index.html#/10011",
          "base": {
            "hp": 6890,
            "atk": 553,
            "defense": 335,
            "mind": 1092,
            "spd": 100,
            "crit": 0.03500000014901161,
            "critDmg": 1.5,
            "accuracy": 72
          },
          "skills": [
            {
              "slot": "A",
              "name": "海渊激流",
              "damage": 2.35,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "将水元素凝聚成水波，对敌方单体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "B",
              "name": "水波呓语",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "治疗",
                  "kind": "buff",
                  "stat": "healPct",
                  "value": 2,
                  "duration": 1,
                  "target": "ally_single"
                }
              ],
              "desc": "令温柔的海水抚慰伙伴的伤痛。对生命值低于70%的我方单体进行治疗，恢复其相当于自身精神力{$T1}的生命值。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "S",
              "name": "沧海祝福",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "持续恢复",
                  "kind": "buff",
                  "stat": "healPct",
                  "value": 0.27,
                  "duration": 10,
                  "target": "all_allies"
                }
              ],
              "desc": "播洒来自深海的祝福，赋予我方全体【持续恢复】效果，每秒恢复其相当于自身精神力{$T1}的生命值，持续10秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10010.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "TurnStep2",
                "self": "Any",
                "target": "Ally_LowestHP",
                "unit": "HP_Less_30",
                "action": "Skill_B"
              },
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Ally_LowestHP",
                "unit": "HP_Less_70",
                "action": "Skill_B"
              },
              {
                "turn": "Time15Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Ally",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 176.2,
            "effective": 15858,
            "killed": false,
            "killTime": null,
            "direct": 2567,
            "dot": 0,
            "normal": 13291
          },
          "group": {
            "dps": 176.2,
            "effective": 15858,
            "killed": false,
            "killTime": null,
            "direct": 2567,
            "dot": 0,
            "normal": 13291
          },
          "rank": 26
        },
        {
          "id": 10022,
          "name": "安琪儿",
          "role": "healer",
          "roleLabel": "疗愈",
          "element": 0,
          "elementName": "王剑",
          "elementSymbol": "剑",
          "avatar": "img/rank_avatar/10022.png",
          "link": "index.html#/10022",
          "base": {
            "hp": 6163,
            "atk": 527,
            "defense": 353,
            "mind": 1160,
            "spd": 103,
            "crit": 0.03500000014901161,
            "critDmg": 1.5,
            "accuracy": 66
          },
          "skills": [
            {
              "slot": "A",
              "name": "涤罪之铃",
              "damage": 2.6,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "以手摇铃的音色净化恶意，对敌方单体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "B",
              "name": "治愈之声",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "持续恢复",
                  "kind": "buff",
                  "stat": "healPct",
                  "value": 0.18,
                  "duration": 6,
                  "target": "ally_single"
                }
              ],
              "desc": "以铃声为媒介，赋予生命值最低的我方单位【持续恢复】效果，每秒恢复其相当于自身精神力{$T1}的生命值，持续6秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "S",
              "name": "永恒花园的福音",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "攻击恢复",
                  "kind": "buff",
                  "stat": "healOnHitPct",
                  "value": 2.52,
                  "duration": 0,
                  "target": "all_allies"
                }
              ],
              "desc": "给予伙伴们天上花园的庇佑。赋予我方全体【攻击恢复】效果，使其在下次攻击时对自身进行治疗，恢复相当于伤害{$T1}的生命值。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10021.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "Time15Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Ally_LowestHP",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Ally",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 151.1,
            "effective": 13534,
            "killed": false,
            "killTime": null,
            "direct": 2022,
            "dot": 0,
            "normal": 11512
          },
          "group": {
            "dps": 151.1,
            "effective": 13534,
            "killed": false,
            "killTime": null,
            "direct": 2022,
            "dot": 0,
            "normal": 11512
          },
          "rank": 27
        },
        {
          "id": 10024,
          "name": "欧罗拉",
          "role": "tank",
          "roleLabel": "坦克",
          "element": 0,
          "elementName": "王剑",
          "elementSymbol": "剑",
          "avatar": "img/rank_avatar/10024.png",
          "link": "index.html#/10024",
          "base": {
            "hp": 7380,
            "atk": 233,
            "defense": 428,
            "mind": 1007,
            "spd": 101,
            "crit": 0.09099999815225601,
            "critDmg": 1.5,
            "accuracy": 60
          },
          "skills": [
            {
              "slot": "A",
              "name": "寒霜绽放",
              "damage": 2.02,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "施放冰雪魔法，对敌方全体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "B",
              "name": "护身晶雾",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0.24,
              "defDownDuration": 8,
              "effects": [
                {
                  "name": "防护",
                  "kind": "buff",
                  "stat": "defPct",
                  "value": 0.24,
                  "duration": 8,
                  "target": "self"
                }
              ],
              "desc": "张开魔法屏障，赋予自身【防护】效果，使自身防御力提高{$T1}，持续8秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "S",
              "name": "冰河之息",
              "damage": 2.25,
              "targets": "all",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "受击恢复",
                  "kind": "buff",
                  "stat": "healOnBeHitPct",
                  "value": 2.7,
                  "duration": 0,
                  "target": "self"
                }
              ],
              "desc": "展开伞盾，对敌方全体造成相当于自身攻击力{$T1}的伤害，并赋予自身【受击恢复】效果，在下次受击时对自身进行治疗，恢复相当于自身精神力{$T2}的生命值。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10023.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "FirstTurn",
                "self": "Any",
                "target": "Self",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Self",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Time15Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 76.7,
            "effective": 6863,
            "killed": false,
            "killTime": null,
            "direct": 2286,
            "dot": 0,
            "normal": 4577
          },
          "group": {
            "dps": 148.8,
            "effective": 13320,
            "killed": false,
            "killTime": null,
            "direct": 8743,
            "dot": 0,
            "normal": 4577
          },
          "rank": 28
        },
        {
          "id": 10007,
          "name": "凯茜",
          "role": "tank",
          "roleLabel": "坦克",
          "element": 1,
          "elementName": "圣杯",
          "elementSymbol": "杯",
          "avatar": "img/rank_avatar/10007.png",
          "link": "index.html#/10007",
          "base": {
            "hp": 7434,
            "atk": 261,
            "defense": 783,
            "mind": 751,
            "spd": 103,
            "crit": 0.07000000029802322,
            "critDmg": 1.5,
            "accuracy": 65
          },
          "skills": [
            {
              "slot": "A",
              "name": "换羽",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "受击恢复",
                  "kind": "buff",
                  "stat": "healOnBeHitPct",
                  "value": 2.1,
                  "duration": 0,
                  "target": "self",
                  "notAboveHpPct": 50
                }
              ],
              "desc": "鸭鸭也要学会保护自己！赋予自身【受击恢复】效果，在下次受击时对自身进行治疗，恢复相当于自身精神力{$T1}的生命值。※自身生命值大于50%时不可触发。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "B",
              "name": "鸭鸭冲锋",
              "damage": 2.55,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "勇敢的鸭鸭奋力撞向敌人，对敌方单体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "S",
              "name": "这是我们的力量！",
              "damage": 2.7,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "坚毅",
                  "kind": "buff",
                  "stat": "drPct",
                  "value": 0.2,
                  "duration": 10,
                  "target": "self"
                }
              ],
              "desc": "凯茜和鸭鸭齐心协力，共同发动攻击！对敌方单体造成相当于自身攻击力{$T1}的伤害，并赋予自身【坚毅】效果，获得{$T2}的伤害减免，持续10秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10006.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "Time15Sec",
                "self": "HP_Less_50",
                "target": "Self",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time20Sec",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 102,
            "effective": 9129,
            "killed": false,
            "killTime": null,
            "direct": 3063,
            "dot": 0,
            "normal": 6065
          },
          "group": {
            "dps": 102,
            "effective": 9129,
            "killed": false,
            "killTime": null,
            "direct": 3063,
            "dot": 0,
            "normal": 6065
          },
          "rank": 29
        },
        {
          "id": 10006,
          "name": "格洛瑞娅",
          "role": "tank",
          "roleLabel": "坦克",
          "element": 3,
          "elementName": "星穹",
          "elementSymbol": "星",
          "avatar": "img/rank_avatar/10006.png",
          "link": "index.html#/10006",
          "base": {
            "hp": 11989,
            "atk": 261,
            "defense": 433,
            "mind": 921,
            "spd": 101,
            "crit": 0.07000000029802322,
            "critDmg": 1.5,
            "accuracy": 65
          },
          "skills": [
            {
              "slot": "A",
              "name": "傀儡自修复",
              "damage": 0,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "治疗",
                  "kind": "buff",
                  "stat": "healPct",
                  "value": 1.7,
                  "duration": 1,
                  "target": "self"
                },
                {
                  "name": "坚毅",
                  "kind": "buff",
                  "stat": "drPct",
                  "value": 0.2,
                  "duration": 10,
                  "target": "self"
                }
              ],
              "desc": "启动自我修复功能，对自身进行治疗，恢复相当于自身精神力{$T1}的生命值，并赋予自身【坚毅】效果，获得{$T2}的伤害减免，持续10秒。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            },
            {
              "slot": "B",
              "name": "重锤钝击",
              "damage": 2.2,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [],
              "desc": "用巨大的钝器重击对手，对敌方单体造成相当于自身攻击力{$T1}的伤害。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": true
            },
            {
              "slot": "S",
              "name": "机关起源",
              "damage": 2.5,
              "targets": "single",
              "dot": null,
              "defDown": 0,
              "defDownDuration": 0,
              "effects": [
                {
                  "name": "受击恢复",
                  "kind": "buff",
                  "stat": "healOnBeHitPct",
                  "value": 1.9,
                  "duration": 0,
                  "target": "self"
                }
              ],
              "desc": "发挥新旧技术融合带来的优势，对敌方单体造成相当于自身攻击力{$T1}的伤害，并赋予自身【受击恢复】效果，在下次受击时对自身进行治疗，恢复相当于自身精神力{$T2}的生命值。",
              "cooldown": 0,
              "cooldownType": 0,
              "cooldownStart": "effect_end",
              "useMovement": false
            }
          ],
          "tactics": {
            "script": "BTAC_10005.LUA",
            "maxTp": 200,
            "costA": 20,
            "costB": 30,
            "conditions": [
              {
                "turn": "Time20Sec",
                "self": "HP_Less_50",
                "target": "Self",
                "unit": "Any",
                "action": "Skill_A"
              },
              {
                "turn": "Time20Sec",
                "self": "HP_Greater_30",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_B"
              },
              {
                "turn": "Manual",
                "self": "Any",
                "target": "Foe",
                "unit": "Any",
                "action": "Skill_S"
              }
            ],
            "tpStart": 50,
            "tpMax": 200,
            "tpRegen": 5,
            "tpStrict": true
          },
          "single": {
            "dps": 96.3,
            "effective": 8622,
            "killed": false,
            "killTime": null,
            "direct": 2787,
            "dot": 0,
            "normal": 5835
          },
          "group": {
            "dps": 96.3,
            "effective": 8622,
            "killed": false,
            "killTime": null,
            "direct": 2787,
            "dot": 0,
            "normal": 5835
          },
          "rank": 30
        }
      ]
    }
  }
};
