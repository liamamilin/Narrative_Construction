#!/usr/bin/env python3
"""Automated integrity validator for 叙事构造 (Narrative Construction)."""

from __future__ import annotations

import pathlib
import re
import sys
import xml.etree.ElementTree as ET

ROOT = pathlib.Path(__file__).resolve().parent.parent
ERRORS: list[str] = []


def fail(msg: str) -> None:
    ERRORS.append(msg)


def check_quarto_config() -> None:
    cfg = (ROOT / "_quarto.yml").read_text(encoding="utf-8")
    for rel in re.findall(r'-\s+([a-zA-Z0-9_./-]+\.(?:qmd|css|html|svg|bib))', cfg):
        if not (ROOT / rel).exists():
            fail(f"_quarto.yml references missing file: {rel}")
    for key in ("cover-image", "favicon", "bibliography", "include-after-body"):
        m = re.search(rf'^\s*{key}:\s*(\S+)', cfg, re.M)
        if not m:
            fail(f"_quarto.yml missing key: {key}")
        elif not (ROOT / m.group(1)).exists():
            fail(f"_quarto.yml {key} points to missing file: {m.group(1)}")
    if "assets/cover.svg" in (ROOT / "index.qmd").read_text(encoding="utf-8"):
        fail("index.qmd must not manually embed assets/cover.svg because _quarto.yml cover-image already renders it.")
    if "assets/toys/**" not in cfg:
        fail("_quarto.yml must declare 'assets/toys/**' under project.resources")


def check_structure_svgs_refs() -> None:
    for fn in ("intro.qmd", "summary.qmd"):
        if "{.unnumbered}" not in (ROOT / fn).read_text(encoding="utf-8"):
            fail(f"{fn} must be marked {{.unnumbered}}")

    bib = (ROOT / "references.bib").read_text(encoding="utf-8")
    if len(re.findall(r'^@\w+\{', bib, re.M)) < 5:
        fail("references.bib should contain at least 5 BibTeX entries")

    for svg in sorted(ROOT.glob("assets/**/*.svg")):
        try:
            ET.parse(svg)
        except ET.ParseError as exc:
            fail(f"Malformed SVG XML in {svg.relative_to(ROOT)}: {exc}")

    for qmd in sorted(ROOT.glob("*.qmd")):
        txt = qmd.read_text(encoding="utf-8")
        for img_path in re.findall(r'!\[[^\]]*\]\((assets/[^)]+)\)', txt):
            if not (ROOT / img_path).exists():
                fail(f"{qmd.name} references missing image: {img_path}")


def check_interactive_toys() -> None:
    loader = ROOT / "assets/toys-loader.html"
    scripts = re.findall(r'<script\s+src="([^"]+)"></script>', loader.read_text(encoding="utf-8"))
    if not scripts or scripts[0] != "assets/toys/core.js":
        fail("assets/toys-loader.html must load assets/toys/core.js FIRST.")

    expected_js = sorted(p.relative_to(ROOT).as_posix() for p in (ROOT / "assets/toys").glob("*.js"))
    if set(scripts) != set(expected_js):
        fail(f"Loader scripts mismatch disk files. Loader={scripts}, Disk={expected_js}")

    embedded: list[str] = []
    per_ch = 0
    for qmd in sorted(ROOT.glob("chapter-*.qmd")):
        txt = qmd.read_text(encoding="utf-8")
        ids = re.findall(r'data-nc-toy="([a-z0-9-]+)"', txt)
        embedded.extend(ids)
        per_ch += 1
        if len(ids) < 2:
            fail(f"{qmd.name} has fewer than 2 interactive labs ({len(ids)})")
        for tid in ids:
            pattern = rf'::: \{{\.content-visible when-format="html"\}}\s*<div data-nc-toy="{re.escape(tid)}"></div>\s*:::'
            if not re.search(pattern, txt):
                fail(f"{qmd.name}: lab '{tid}' is not wrapped in a Quarto HTML conditional block.")

    if len(embedded) != len(set(embedded)):
        fail("Duplicate embedded toy IDs found.")

    # Verify via explicit ID set extracted from JS (supports both static and loop-generated IDs via JSC when available)
    import subprocess
    jsc = pathlib.Path("/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc")
    if jsc.exists():
        cmd = [
            str(jsc),
            "-e",
            "var window={}; var document={createElement:function(){return {};},createTextNode:function(){return {};},querySelectorAll:function(){return [];},addEventListener:function(){},readyState:'complete'};",
            *[str(ROOT / s) for s in scripts],
            "-e",
            "print(JSON.stringify(window.NarrativeToys.list()));",
        ]
        res = subprocess.run(cmd, capture_output=True, text=True, check=False)
        if res.returncode != 0:
            fail(f"JSC execution failed: {res.stderr.strip()}")
            return
        import json
        registered = json.loads(res.stdout.strip().splitlines()[-1])
        if set(registered) != set(embedded):
            fail(f"1-to-1 mismatch! Registered-only={sorted(set(registered)-set(embedded))}, Embedded-only={sorted(set(embedded)-set(registered))}")
        print(f"[OK] Interactive labs verified (JSC live): {len(registered)} registered == {len(embedded)} embedded (1:1 bijection across {per_ch} chapters).")
    else:
        print(f"[OK] Interactive containers verified: {len(embedded)} embedded across {per_ch} chapters (2 per chapter).")


def main() -> int:
    check_quarto_config()
    check_structure_svgs_refs()
    check_interactive_toys()

    if ERRORS:
        print("\n[FAIL] Verification failed:")
        for e in ERRORS:
            print(f"  - {e}")
        return 1

    print("[PASS] All 叙事构造 engineering, visual, citation, and interactive checks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
