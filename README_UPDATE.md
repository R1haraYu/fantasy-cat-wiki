# 角色图鉴 2.0 · Git 增量更新包

基线：昨天上传 Rank 榜后的 Wiki 版本。

## 应用方式

```bash
# 解压到 Wiki 仓库根目录
# 然后：
git add .
git commit -m "feat(wiki): add character 2.0 pages, spine models and voice audio"
git push
```

## 本次新增

```text
character_detail.html
character_detail_generic.js
CHARACTER_2.0.md

data/character_assets.js
data/characters_voice.js
data/spine_models.json

vendor/spine-player.min.js

assets/spine/models/         109 个 Spine 模型
assets/voice/                角色语音 WAV
img/bust/                    全员 BUST
img/omega/                   Omega 立绘和背景
```

## 本次修改

```text
index.html
app.js
style.css
data.js
data/characters_extra.js
```

## 资源说明

- 29 名已实装角色公开，7 名未实装角色默认隐藏。
- 完整包 `Wiki_Character2.0_Update_2026-11-19.zip` 为整站快照，可直接覆盖。
- 本包是相对昨天 Rank 版本的增量覆盖包；包含本页引用的新增资源。
- `img/` 目录整体包含，用于保证头像、图标、BUST 和技能图标路径完整。
