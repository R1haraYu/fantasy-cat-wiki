# 角色图鉴 2.0 · 手动上传包

当前 GitHub 仓库：R1haraYu/fantasy-cat-wiki
基线：main 分支当前版本

## 重要

不能把 zip 直接上传到 GitHub 仓库，GitHub 不会自动解压。
请先解压本包，再按下面的方式上传文件。

## 方式 A：GitHub Desktop / 本地仓库

1. 解压本包。
2. 将解压内容覆盖到本地仓库根目录。
3. 删除 `DELETE_FILES.txt` 中列出的旧文件。
4. `git add .`
5. `git commit -m "feat(wiki): character 2.0 pages, spine models and voice audio"`
6. `git push`

## 方式 B：GitHub 网页上传

GitHub 网页一次上传大量文件不方便，建议分批：

1. 先上传代码和数据：
   - character_detail.html
   - character_detail_generic.js
   - index.html
   - app.js
   - style.css
   - data.js
   - data/ 新增文件
   - vendor/
2. 再按目录上传新增资源：
   - assets/spine/models/
   - assets/voice/
   - img/bust/
   - img/brand/
   - img/bg/character_stage.png
3. 按 `DELETE_FILES.txt` 删除旧的说明文件与旧数据。
4. 提交。

## 文件说明

新增：

```text
assets/spine/models/
assets/voice/
img/bust/
img/brand/
img/bg/character_stage.png
vendor/spine-player.min.js
character_detail.html
character_detail_generic.js
```

修改：

```text
index.html
app.js
style.css
data.js
data/characters_extra.js
data/character_assets.js
data/characters_voice.js
data/spine_models.json
```

不要上传：

```text
img/ 里的已有旧图片
文档 md
预览 png
```
