# 《幻想之都的黑猫》游戏本地数据来源与维护记录

记录生成时间：2026-11-17T17:56:41+08:00  
数据基线：`input/` 2026-11-16 快照  
基线标识：catalog `f7b54988…`、languagepack `04810f30…`、gamedata `88825c45…`

本文件用于记录游戏本地数据的来源、提取链路、当前 canonical 文件，以及游戏更新后的重建步骤。后续修改数据或重新打包前先读这一份。

## 1. 原始输入

原始数据放在 `input/`，不做手工修改：

- `input/幻想之都的黑猫.apk`：安装包本体
- `input/cache/`：热更缓存
- `input/files/`：热更文件、DARC、语言包、资源等

更新游戏版本时，先完整替换/保留旧快照，再记录 APK 与关键文件的哈希。当前基线约 1.2 GB，不适合直接纳入普通代码仓库。

## 2. 数据目录职责

```text
input/                         原始游戏快照
_extract/                      解包、解码、校验与 wiki 生成脚本
  rules.bin                    旧规则 DARC（build_wiki.py 使用）
  rules_new.bin                新规则 DARC（tables_final.py / tables_validate.py 使用）
  rules_json_final/            canonical 解码规则表 JSON
  tables3/                     canonical 规则表原始 BYTES
  rules_json / rules_json2/3   旧解码中间产物，不应再作为最终来源
  rules_json_final/            最终规则表 JSON
  all_skills_dump.txt          技能名称、倍率、描述提取结果
  build_wiki.py                生成 wiki 角色资料
  tables_validate.py           规则表校验/切分
  tables_final.py              规则表最终解码
  make_data_report.py          数据校验报告
  assets_manifest.json         美术资源导出清单
  gamedata_manifest.json       本文件的机器可读清单与哈希
wiki/                          Wiki 站点
  data.js                      可见角色 CODEX（当前 29 个）
  data/                        站点数据分片
  img/                         站点图片资源（当前 855 个文件）
tools/rank_calc/gui/          Rank 排行榜 GUI
  data.js                      Rank 角色数据（当前 36 个）
  local_skill_overrides.json   Wiki 缺失的 7 个本地角色覆盖数据
02_Source/BlackCatRank/       Rank 打包源码
03_Delivery/Current/          Rank 交付版本
07_Archive/                   Rank 归档
```

## 3. 当前数据规模

| 项目 | 数量 |
|---|---:|
| 规则表（已解出） | 102 张 |
| 语言文本表 | 209 张 / 2528 条 |
| 角色 | 36 |
| Wiki 可见角色 | 29 |
| Rank 角色 | 36 |
| Rank 本地覆盖角色 | 7 |
| 导出 PNG 资源 | 1829 张 |
| Wiki 图片文件 | 855 |
| Wiki 数据 JS | 19 |
| `rules_json_final` JSON | 102 |
| `tables3` BYTES | 103 |

## 4. 字段映射

角色属性 `Elemental`：

```text
0 王剑
1 圣杯
2 权杖
3 星穹
4 高塔
5 愚者
```

职业 `Job`：

```text
1 勇者
2 游侠
3 战士
4 干扰
5 疗愈
6 界外
```

稀有度：

```text
1 N
2 R
3 SR
4 SSR
```

技能槽：

```text
A = 技能 A
B = 技能 B
S = 终结技
```

技能描述里的 `{$T1}`、`{$T2}`、`{$T3}` 对应 `SKILLDESCTABLE` 的逐级数值串，通常取当前最高等级值。

## 5. 游戏更新后的重建流程

### 5.1 保存旧快照

1. 将旧 `input/` 复制到带日期的归档目录，例如 `input_2026-11-16/`。
2. 替换新 APK / cache / files。
3. 更新本文件的基线标识和 `gamedata_manifest.json` 的哈希。

### 5.2 规则表解码

当前脚本依赖：

- `_extract/luban.py`
- `_extract/_bean_plans.json`
- `_extract/rules_new.bin`
- `_extract/tables_validate.py`
- `_extract/tables_final.py`

建议顺序：

```bash
python _extract/tables_validate.py
python _extract/tables_final.py
python _extract/make_data_report.py
python _extract/build_wiki.py
```

注意：

- `tables_validate.py` 输出 `_extract/tables3/`
- `tables_final.py` 输出 `_extract/rules_json_final/`
- `build_wiki.py` 读取 `_extract/rules.bin` 并写入 `wiki/`
- 脚本内部使用了本机绝对路径；换电脑或移动工作区时需要先改 `ROOT`
- 旧目录 `rules_json/`、`rules_json2/`、`rules_json3/` 只作对照，不要作为最终数据源

### 5.3 生成 Wiki

```bash
python _extract/build_wiki.py
```

检查：

- `wiki/data.js` 角色数量
- 角色属性、职业、稀有度
- 技能倍率与说明
- `wiki/data/`、`wiki/img/` 是否完整

当前 `wiki/data.js` 只包含 29 个可见角色；隐藏 7 个角色当前只在 Rank 数据中维护。

### 5.4 重建 Rank 数据

Rank 当前数据源：

```text
tools/rank_calc/gui/data.js
```

其中：

- 29 个角色来自 Wiki 可见角色
- 7 个角色来自游戏本地技能表覆盖：
  - 10012 维罗妮卡
  - 10013 阿尔乔姆
  - 10014 艾玛
  - 10015 莉莉丝
  - 10016 贝塔
  - 10025 爱洛
  - 10036 爱丽儿

这 7 个角色的技能覆盖已单独保存在：

```text
tools/rank_calc/gui/local_skill_overrides.json
```

重新生成 Rank 数据时必须重新合并该文件，否则 7 个隐藏角色会丢失技能说明/效果。

### 5.5 重新打包 Rank

当前交付版本：V1.1.1。

```text
02_Source/BlackCatRank/packaging/build_exe.bat
02_Source/BlackCatRank/packaging/BlackCatRank_folder.spec
02_Source/BlackCatRank/packaging/assemble_delivery.py
```

使用 32 位 Python：

```bat
py -3.14-32 packaging/build_exe.bat
py -3.14-32 packaging/assemble_delivery.py
```

交付和归档路径：

```text
03_Delivery/Current/BlackCatRank_V1.1.1/
03_Delivery/Current/BlackCatRank_V1.1.1.zip
07_Archive/BlackCatRank_V1.1.1/
```

## 6. 更新后的校验清单

- [ ] `CHARACTERTABLE` 角色数量为 36
- [ ] `SKILLDESCTABLE` 技能描述数量正常
- [ ] Wiki 可见角色技能倍率/说明完整
- [ ] Rank 36 个角色都存在
- [ ] 7 个隐藏角色覆盖仍存在
- [ ] 欧米伽 B = 脆弱，S = 破甲
- [ ] 木桩多行独立生命/防御/属性
- [ ] 属性克制链与倍率正常
- [ ] GUI 无 JS 异常
- [ ] 32 位 EXE 可启动
- [ ] 交付 zip 可解压、归档快照不含 build/dist

## 7. 已知缺口与风险

1. `PAIDSHOP_PAIDSHOPTABLE` 仍有 1 张表未完全解出。
2. `wiki/data.js` 当前只有 29 个可见角色；7 个隐藏角色维护在 Rank 覆盖文件中。
3. 解包脚本使用硬编码根路径，迁移工作区后需要修改。
4. `_extract` 内有多轮解码中间目录，已确认 canonical 为 `rules_json_final/` + `tables3/`。
5. Wiki 图片只是站点子集；全量资源清单见 `assets_manifest.json`（1829 张 PNG）。
6. Rank 的技能倍率/效果来自 Wiki + 游戏本地覆盖；游戏更新后不能只替换 `data.js`，必须重新合并覆盖。
7. 治疗、控制、护盾等特殊效果目前只记录在 Rank 面板中，不全部进入输出模拟。

## 8. 关键文件哈希清单

完整机器可读清单：`_extract/gamedata_manifest.json`

| 文件 | 大小 | SHA-256 |
|---|---:|---|
| `input/幻想之都的黑猫.apk` | 139,883,781 B | `4418b962909faf95ebabf6f74309a944a6eac47246e1dbb1d42663dd36cf12e9` |
| `input/cache` | 目录 | 1 文件 / 1,176,302 B | — |
| `input/files` | 目录 | 206 文件 / 1,061,600,130 B | — |
| `_extract/rules.bin` | 577,458 B | `3b46d8d7da8e2771c3f697f3f9539196880dbaa2b3adf695fc5320a5118f3221` |
| `_extract/rules_new.bin` | 577,458 B | `d7fbc9968a1f927cc849171d580d9e6ea866776e10a43f46a29dffe3100d58fa` |
| `_extract/_android_meta.bundle` | 13,664,166 B | `4cc318b76c16204456f02ac023980f085338503bfd296a24280a0a26c1e8a684` |
| `_extract/_gameblob.bin` | 5,265,408 B | `39bc3530cc1d5ce285b66e2c22a09a7c1efa7cc7ba06ddaed7e169b928e3845e` |
| `_extract/_bean_plans.json` | 82,869 B | `cdace300f608ab4a967d0a3c49fb9fe0aaf9359cef1693af4b5cc5531aeaf5a9` |
| `_extract/luban.py` | 8,995 B | `76471eb3ef0a88074c098425e0ffc5099ea9b89579c6a809817a46bbaa88aca8` |
| `_extract/darc.py` | 3,674 B | `06c45dafa444e26b05b9fc370cd9c9088551bde1539cb956feaec13353f6baaf` |
| `_extract/tables_validate.py` | 6,499 B | `ba00ef0bfcb387a7366d2b03de0f5cb594f948e1994e4af865bbcdc6c0da2d85` |
| `_extract/tables_final.py` | 7,689 B | `5dddac09edf7d5513eae573549d16fabd94c7e4943182ad178b6d51a88e82507` |
| `_extract/build_wiki.py` | 14,073 B | `3bc7ffd3c6cc928a259b92bb0263f5cd7cbb4aaf9e488583a18ccd148cacd2e8` |
| `_extract/make_data_report.py` | 6,399 B | `19a0feb30dc3426f47be5a934e208702ed11bcbf656ad759fc16ddb81d0e58f7` |
| `_extract/rules_json_final/CHARACTERTABLE.json` | 41,522 B | `98c19eb0b041cd52a5d381b458d7e2be3fcbd3dc9110e81069f90800689a9079` |
| `_extract/rules_json_final/CHARACTERSKINSTABLE.json` | 22,003 B | `64d6d12692dd16fffbee06e947ce1943f5c6acca4aa0fa43721caa349bf71372` |
| `_extract/rules_json_final/SKILLDESCTABLE.json` | 53,413 B | `787f7ba9d5166011eddf0de4bf14626ba831ba167d2f9bbd922c1961ce6d800a` |
| `_extract/rules_json_final/ENEMYTABLE.json` | 81,909 B | `3af67630883dfdb87ceffb6b5c6131063c0b42c309dc6fd2b9f9e8a5d74d6743` |
| `_extract/assets_manifest.json` | 310,584 B | `14b6c22baf37374f1d5175561c8715543c462c93b57be3d36ef72b237e98201a` |
| `_extract/all_skills_dump.txt` | 31,284 B | `f768e5cd4c84f76683066f0d4814ed0d7ffca63706213f6b74a384ef054c88f3` |
| `wiki/data.js` | 52,371 B | `0d2b5b621ad12f9c7e0afb3177f52329a246b2ab40af8781c59f50aba78fc089` |
| `tools/rank_calc/gui/data.js` | 65,604 B | `d39d819f15775241abb0985e9ca6300736a4f5d0f512f874eab5771039d7e8e0` |

## 9. Wiki 数据排行

- 页面：`wiki/ranking.html`
- 样式：`wiki/rank.css`
- 页面脚本：`wiki/page-ranking.js`
- 数据：`wiki/data/rank.js`
- 核心公式/轮次引擎：`wiki/rank-core.js`（浏览器与 Node 共用）
- Node 数据整理：`_extract/rank-data-lib.js`
- 页面运行时：`wiki/rank-sim.js`（薄适配层）
- 运行时数据：`wiki/data/rank_sim.js`
- 静态兜底：`wiki/data/rank.js`

- 生成脚本：`_extract/build_rank_wiki.js`
- 只读；图鉴列表仅展示 29 名已实装角色；未实装角色数据保留 `hidden` 标记，页面可直接访问但不进入列表。
- 一级标签：输出。坦克榜、治疗榜已移除。
- Boss 木桩：1-1-1（`SUB_010101_01`）的 50 级「究极大食花」，属性无，固定不可调节。
- 50 级木桩属性：生命 19222、攻击 1696、防御 349、速度 60、精神 16263。
- 输出：单人测试，单体 1 个木桩、群体 4 个木桩。

## 战斗公式

- 实际游戏面板（与游戏内 13 级 1 星格洛瑞娅数据一致）：
  - HP / 攻击 = roundEven((初始值 + roundEven(成长值 × (等级 - 1))) × (星级系数 + 稀有度系数))
  - 防御 / 精神 = roundEven((初始值 + roundEven(成长值 × (等级 - 1))) × 星级系数)
  - 暴击、暴伤、速度 = 初始值 + roundEven(成长值 × (等级 - 1))，不再乘星级/稀有度系数
- 当前排名采用 80 级、0 星、角色初始稀有度。
- 伤害 = 面板攻击力 × 技能倍率 × 暴击伤害 × 属性克制 × 1000 / (1145 + 3.5 × 目标防御力) × (1 - 免伤率)
- 最大防御 = 1000，最大防御2 = 1145，减伤比例为 3.5；免伤率来自 Buff/技能效果。
- 输出木桩属性为无，属性克制按元素链计算。
