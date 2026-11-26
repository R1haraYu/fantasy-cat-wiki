# -*- coding: utf-8 -*-
"""Create the full offline site zip + latest.json for GitHub Releases."""
from __future__ import annotations

import argparse
import hashlib
import json
import zipfile
from datetime import datetime, timezone
from pathlib import Path

MANIFEST = "site_manifest.json"


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--site", required=True)
    ap.add_argument("--version", required=True)
    ap.add_argument("--repo", required=True, help="owner/repo")
    ap.add_argument("--tag", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--apk", default="")
    ap.add_argument("--apk-name", default="app-debug.apk")
    ap.add_argument("--min-app-version", default="1.7.3")
    ap.add_argument("--exclude", action="append", default=[])
    args = ap.parse_args()

    site = Path(args.site).resolve()
    out = Path(args.out).resolve()
    out.mkdir(parents=True, exist_ok=True)
    # If the release directory is inside the site root (GitHub root-site
    # layout), never include it in the package. Otherwise the zip can include
    # itself and grow forever.
    excludes = list(args.exclude)
    try:
        out_rel = out.relative_to(site).as_posix()
        if out_rel != ".":
            excludes.append(out_rel)
    except ValueError:
        pass
    manifest_path = out / MANIFEST
    if manifest_path.exists():
        manifest_path.unlink()

    # Build manifest first, then include it in the zip.
    import subprocess
    tool = Path(__file__).with_name("build_site_manifest.py")
    cmd = ["python", str(tool), "--site", str(site), "--version", args.version,
           "--out", str(manifest_path)]
    for e in excludes:
        cmd += ["--exclude", e]
    subprocess.run(cmd, check=True)
    manifest_sha = sha256_file(manifest_path)

    for old in out.glob("wiki-site-*.zip"):
        old.unlink()
    zip_path = out / f"wiki-site-{args.version}.zip"
    if zip_path.exists():
        zip_path.unlink()
    with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=6) as z:
        z.write(manifest_path, MANIFEST)
        for p in sorted(site.rglob("*")):
            if not p.is_file():
                continue
            rel = p.relative_to(site).as_posix()
            if any(rel == e or rel.startswith(e.rstrip("/") + "/") for e in excludes):
                continue
            z.write(p, rel)
    package_sha = sha256_file(zip_path)

    apk_sha = sha256_file(Path(args.apk)) if args.apk else ""
    latest = {
        "version": args.version,
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "manifestSha256": manifest_sha,
        "packageUrl": f"https://github.com/{args.repo}/releases/download/{args.tag}/{zip_path.name}",
        "packageBytes": zip_path.stat().st_size,
        "manifestUrl": f"https://github.com/{args.repo}/releases/download/{args.tag}/{MANIFEST}",
        "filesBaseUrl": f"https://raw.githubusercontent.com/{args.repo}/main/",
        "packageSha256": package_sha,
        "apkUrl": f"https://github.com/{args.repo}/releases/download/{args.tag}/{args.apk_name}",
        "apkSha256": apk_sha,
        "minAppVersion": args.min_app_version,
    }
    (out / "latest.json").write_text(
        json.dumps(latest, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(json.dumps({
        "zip": str(zip_path),
        "zipBytes": zip_path.stat().st_size,
        "packageSha256": package_sha,
        "manifestSha256": manifest_sha,
        "latest": str(out / "latest.json"),
    }, ensure_ascii=False))


if __name__ == "__main__":
    main()
