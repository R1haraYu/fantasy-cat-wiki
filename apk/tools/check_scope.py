# -*- coding: utf-8 -*-
"""Assert the offline Wiki APK/release contains Wiki site only."""
from __future__ import annotations

import argparse
import json
import zipfile
from pathlib import Path

FORBIDDEN = ("BlackCatRank", "rankcalculator", "02_Apps")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--release", required=True)
    args = ap.parse_args()
    out = Path(args.release)
    latest = json.loads((out / "latest.json").read_text(encoding="utf-8"))
    manifest = json.loads((out / "site_manifest.json").read_text(encoding="utf-8"))
    files = list(manifest.get("files", {}))
    bad = [f for f in files if any(x.lower() in f.lower() for x in FORBIDDEN)]
    apk = out / Path(latest["apkUrl"]).name
    with zipfile.ZipFile(apk) as z:
        names = z.namelist()
    apk_bad = [n for n in names if any(x.lower() in n.lower() for x in FORBIDDEN)]
    package = out / f"wiki-site-{latest['version']}.zip"
    with zipfile.ZipFile(package) as z:
        package_names = z.namelist()
        zip_bad = [n for n in package_names if any(x.lower() in n.lower() for x in FORBIDDEN)]
    print(f"manifest_files={len(files)} forbidden={len(bad)}")
    print(f"apk_entries={len(names)} forbidden={len(apk_bad)}")
    print(f"package_entries={len(package_names)} forbidden={len(zip_bad)}")
    if bad or apk_bad or zip_bad:
        print("FAIL")
        print((bad + apk_bad + zip_bad)[:20])
        raise SystemExit(1)
    print("PASS: Wiki-only scope")


if __name__ == "__main__":
    main()
