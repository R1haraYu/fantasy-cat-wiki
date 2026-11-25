# 黑猫Wiki 离线APK + GitHub增量发布

本项目只负责 **Wiki site**。

```text
输入：site
输出：完整离线Wiki APK + Wiki站点更新包
```

不包含、也不更新：

```text
02_Apps/BlackCatRank
BlackCatRankCalculator
任何排行计算器数据
```

Wiki APK的assets只来自 `site/`；计算器工程是另一个独立工程。

这是 `03_Wiki/site` 的 Android 离线壳，工程位于 `03_Wiki/app`。  
Wiki 文件在构建时直接打包进 APK，不在工程里再复制一份。

## 目录

```text
03_Wiki/app/
  app/                          Android App
  tools/build_site_manifest.py  生成逐文件SHA-256清单
  tools/make_release.py         生成完整站点zip和latest.json
  app/src/main/assets/site_manifest.json
```

## 构建

要求：

```text
JDK 17
Android SDK 34
Gradle 8.7
```

构建：

```bash
python app/tools/build_site_manifest.py \
  --site site \
  --version 1.7.3 \
  --out app/app/src/main/assets/site_manifest.json

gradle -p app assembleDebug
```

APK构建时会把站点文件同步到 `build/generated/wiki-assets`，不会在源码树里复制一份。

本地布局：

```text
03_Wiki/site
03_Wiki/app
```

GitHub根目录站点布局：

```text
site 文件在仓库根目录
apk/ 为Android工程
```

此时构建用：

```bash
gradle -p apk -PwikiSiteDir=../.. assembleDebug
```

## 已构建离线APK

```text
app/release/app-debug.apk
```

- 大小：448,706,415 bytes
- SHA-256：`4FDB1C98C88CDDFEAD380FF7EF5122BDB9C61D702E1EE487672454681F0C79C4`
- 版本：`1.7.3` / versionCode `17300`
- 签名：Android debug key，v2签名通过
- 内置Wiki清单：`1882`个文件（`.nojekyll`为站点部署空文件，APK不需要）

同目录发布文件：

```text
app/release/latest.json
app/release/site_manifest.json
app/release/wiki-site-1.7.3.zip
```

### 当前占位配置

`gradle.properties` 和APK里的更新URL仍是：

```text
https://github.com/R1haraYu/fantasy-cat-wiki/releases/latest/download/latest.json
```

需要把 `R1haraYu/fantasy-cat-wiki` 替换成实际GitHub仓库后才能在线检查更新。  
替换后重新构建APK，并按 `make_release.py` 生成实际 `latest.json`。

### 正式升级签名

当前是debug签名，适合首次安装测试。  
如果需要长期升级同一个APK，GitHub Actions每次生成的debug key可能不同，必须配置固定release keystore，否则Android会拒绝覆盖安装。

## GitHub发布


```bash
python app/tools/make_release.py \
  --site site \
  --version 1.7.3 \
  --repo R1haraYu/fantasy-cat-wiki \
  --tag v1.7.3 \
  --out build-release \
  --apk app/release/app-debug.apk \
  --apk-name app-debug.apk
```

生成：

```text
wiki-site-1.7.3.zip
latest.json
site_manifest.json
```

`latest.json` 示例：

```json
{
  "version": "1.7.3",
  "manifestSha256": "...",
  "packageUrl": "https://github.com/R1haraYu/fantasy-cat-wiki/releases/download/v1.7.3/wiki-site-1.7.3.zip",
  "packageSha256": "...",
  "apkUrl": "https://github.com/R1haraYu/fantasy-cat-wiki/releases/download/v1.7.3/app-debug.apk",
  "apkSha256": "...",
  "minAppVersion": "1.7.3"
}
```

App从GitHub Release的 `latest.json` 资产读取更新信息：

```text
https://github.com/R1haraYu/fantasy-cat-wiki/releases/latest/download/latest.json
```

构建前把 `gradle.properties` 里的 `R1haraYu/fantasy-cat-wiki` 改成实际仓库。

## App更新流程

```text
1. 启动读取 latest.json
2. 比较本地版本和manifestSha256
3. 一致 -> 直接离线使用，不下载
4. 不一致 -> 下载完整zip
5. 校验zip SHA-256
6. 解压到 files/wiki/staging
7. 校验site_manifest.json及其每个文件SHA-256
8. 原子写入current.json
9. 删除旧versions、staging、zip
```

## 存储策略

APK内只保留一份**基线站点**（assets，只读）。

更新后的站点放在：

```text
files/wiki/versions/<version>
files/wiki/current.json
```

只保留一个活动版本：

```text
更新成功后删除旧下载版本
不会累积 v1.7.2 / v1.7.3 / v1.7.4 多份
```

注意：APK内的基线assets无法在运行中删除；能保证的是：

```text
下载版本永远只保留最新一份
旧下载版本立即清理
staging和zip在成功后删除
```

## 哈希校验

APK自带：

```text
assets/site_manifest.json
```

更新包也带同一份清单。App会对每个文件算SHA-256，并核对：

```text
zip整包sha256
manifest sha256
每个文件sha256
manifest文件集合 == 实际文件集合
```

任何一项不一致都会拒绝更新并保留旧版本。

范围校验：

```bash
python app/tools/check_scope.py --release app/release
```

只允许 `site/` 文件，禁止 `BlackCatRank`/`02_Apps` 路径进入APK或更新包。

## APK更新

`latest.json` 同时提供：

```text
apkUrl
apkSha256
minAppVersion
```

App检测到 `minAppVersion` 高于当前APK版本时会提示先安装新版APK。  
当前壳内APP版本为：

```text
1.7.3
```
