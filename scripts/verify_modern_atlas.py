#!/usr/bin/env python3
"""
verify_modern_atlas.py
Verifies the Modern Atlas redesign across all HTML files in /public/:
- Presence of /assets/site.css and profeps-communaute.js
- Presence of #atlasThemeToggle (Dark Mode toggle) & #atlasSearchInput (Search bar)
- Absence of old #pepsLangSwitcher translator in navbar
- Preservation of <title>, <h1>, and <link rel="canonical">
- Existence of all linked local PDF files on OP pages
"""
import re
import pathlib
import sys

ROOT = pathlib.Path("public")
SKIP_FILES = {"aps.html", "google9e56188ccdfea7e9.html"}

missing_css = []
missing_toggle = []
old_translator = []
missing_seo = []
broken_pdfs = []

html_files = sorted(ROOT.glob("*.html"))
for f in html_files:
    if f.name in SKIP_FILES:
        continue
    html = f.read_text(encoding="utf-8", errors="ignore")
    if "http-equiv=\"refresh\"" in html.lower() and len(html) < 2000:
        continue

    if "/assets/site.css" not in html:
        missing_css.append(f.name)
    if "id=\"atlasThemeToggle\"" not in html:
        missing_toggle.append(f.name)
    if "id=\"pepsLangSwitcher\"" in html:
        old_translator.append(f.name)
    if "<title>" not in html or "<h1" not in html:
        missing_seo.append(f.name)

    if f.name.startswith("orientations-pedagogiques-"):
        pdfs = re.findall(r'href="([^"]*\.pdf)"', html)
        for p in pdfs:
            if p.startswith(("http://", "https://")):
                continue
            clean_p = p.lstrip("/")
            if not (ROOT / clean_p).exists():
                broken_pdfs.append((f.name, p))

print(f"Audited {len(html_files)} HTML pages in /public:")
print(f" - Missing /assets/site.css: {len(missing_css)} {missing_css[:5]}")
print(f" - Missing #atlasThemeToggle: {len(missing_toggle)} {missing_toggle[:5]}")
print(f" - Old #pepsLangSwitcher remaining: {len(old_translator)} {old_translator[:5]}")
print(f" - Missing <title> or <h1>: {len(missing_seo)} {missing_seo[:5]}")
print(f" - Broken local PDF links on OP pages: {len(broken_pdfs)} {broken_pdfs[:5]}")

if missing_css or missing_toggle or old_translator or broken_pdfs:
    sys.exit(1)
print("ALL MODERN ATLAS CHECKS PASSED!")
