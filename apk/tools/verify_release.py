# -*- coding: utf-8 -*-
"""Verify a generated release package against latest.json."""
from __future__ import annotations

import argparse
import hashlib
import json
import zipfile
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
    ap.add_argument("--release", required=True)
    args = ap.parse_args()
    out = Path(args.release)
    latest = json.loads((out / "latest.json").read_text(encoding="utf-8"))

    failures = []
    package = out / f"wiki-site-{latest['version']}.zip"
    if sha256_file(package).lower() != latest["packageSha256"].lower():
        failures.append("packageSha256")
    apk_name = Path(latest.get("apkUrl", "")).name
    if apk_name:
        apk = out / apk_name
        if not apk.is_file():
            failures.append("apk missing")
        elif latest.get("apkSha256") and sha256_file(apk).lower() != latest["apkSha256"].lower():
            failures.append("apkSha256")
    with zipfile.ZipFile(package) as zf:
        names = zf.namelist()
        if len(names) != len(set(names)):
            failures.append("zip duplicate entries")
        if MANIFEST not in names:
            failures.append("zip missing manifest")
        manifest_bytes = zf.read(MANIFEST)
        if hashlib.sha256(manifest_bytes).hexdigest().lower() != latest["manifestSha256"].lower():
            failures.append("manifestSha256")
        manifest = json.loads(manifest_bytes)
        pages = {n: zf.read(n) for n in names if n != MANIFEST}
        expected = manifest["files"]
        if set(pages) != set(expected):
            failures.append("zip file set != manifest")
        for rel, want in expected.items():
            if rel in pages and hashlib.sha256(pages[rel]).hexdigest().lower() != want.lower():
                failures.append(f"sha256:{rel}")
        print(f"version={latest['version']} files={len(expected)} zip_bytes={package.stat().st_size}")
        print(f"packageSha256={latest['packageSha256']}")
        print(f"manifestSha256={latest['manifestSha256']}")
        if latest.get("apkSha256"):
            print(f"apkSha256={latest['apkSha256']}")
    if failures:
        print("FAIL")
        for f in failures[:20]:
            print(" -", f)
        raise SystemExit(1)
    print("PASS")


if __name__ == "__main__":
    main()
