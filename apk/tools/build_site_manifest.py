# -*- coding: utf-8 -*-
"""Build site_manifest.json for the offline wiki APK/update package."""
from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path

MANIFEST = "site_manifest.json"


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def build_manifest(site: Path, version: str, excludes=()) -> dict:
    files = {}
    for p in sorted(site.rglob("*")):
        if not p.is_file():
            continue
        rel = p.relative_to(site).as_posix()
        if rel == MANIFEST:
            continue
        if any(rel == e or rel.startswith(e.rstrip("/") + "/") for e in excludes):
            continue
        files[rel] = sha256_file(p)
    return {
        "version": version,
        "files": files,
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--site", required=True)
    ap.add_argument("--version", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--exclude", action="append", default=[])
    args = ap.parse_args()
    manifest = build_manifest(Path(args.site), args.version, args.exclude)
    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(manifest, ensure_ascii=False, sort_keys=True, indent=2), encoding="utf-8")
    print(json.dumps({
        "manifest": str(out),
        "files": len(manifest["files"]),
        "version": args.version,
        "sha256": hashlib.sha256(out.read_bytes()).hexdigest(),
    }, ensure_ascii=False))


if __name__ == "__main__":
    main()
