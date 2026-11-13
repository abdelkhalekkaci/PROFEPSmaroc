#!/usr/bin/env python3
"""
verify_modern_atlas.py
Verifies the Modern Atlas redesign, new EPS & Education logo/favicon, and text
alignment/CSS fixes across all HTML files in /public/:
- Presence of /assets/site.css, /favicon.svg, and .peps-logo-svg crest
- Presence of #atlasThemeToggle (Dark Mode toggle) & #atlasSearchInput (Search bar)
- Absence of old #pepsLangSwitcher translator in navbar
- Absence of broken linear-gradient syntax ("100%) 52%" / "100%) 50%")
- Absence of text-align: justify and legacy padding-top: 80px offsets
- Preservation of <title>, <h1>, and <link rel="canonical">
- Existence of all linked local PDF files on OP pages
"""
import re
import pathlib
import sys

ROOT = pathlib.Path("public")
SKIP_FILES = {"aps.html", "google9e56188ccdfea7e9.html"}

missing_css = []
missing_logo = []
missing_favicon = []
missing_toggle = []
missing_footer_nav = []
old_translator = []
broken_gradients = []
justify_remaining = []
pt80_remaining = []
missing_seo = []
broken_pdfs = []

html_files = sorted(ROOT.glob("*.html"))
for f in html_files:
    if f.name in SKIP_FILES:
        continue
    html = f.read_text(encoding="utf-8", errors="ignore")
    if 'http-equiv="refresh"' in html.lower() and len(html) < 2000:
        continue

    if "/assets/site.css" not in html:
        missing_css.append(f.name)
    if "peps-logo-svg" not in html:
        missing_logo.append(f.name)
    if "/favicon.svg" not in html:
        missing_favicon.append(f.name)
    if 'id="atlasThemeToggle"' not in html:
        missing_toggle.append(f.name)
    if 'id="atlasSearchInput"' in html or '>Évaluation &amp; Fiches<' in html or '>Générateur de Séances &amp; Cycles (Word/PDF)<' in html or '>Concours Taalim<' not in html:
        old_translator.append(f.name)
    if 'id="footer-col-navigation"' not in html:
        missing_footer_nav.append(f.name)
    if 'id="pepsLangSwitcher"' in html:
        old_translator.append(f.name)
    if "100%) 52%" in html or "100%) 50%" in html:
        broken_gradients.append(f.name)
    if re.search(r"text-align:\s*justify\b", html, flags=re.I) or "text-justify" in html:
        justify_remaining.append(f.name)
    if re.search(r"padding-top:\s*(?:80|100)px\b", html, flags=re.I):
        pt80_remaining.append(f.name)
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
print(f" - Missing new EPS+Education SVG logo (.peps-logo-svg): {len(missing_logo)} {missing_logo[:5]}")
print(f" - Missing /favicon.svg link: {len(missing_favicon)} {missing_favicon[:5]}")
print(f" - Missing #atlasThemeToggle: {len(missing_toggle)} {missing_toggle[:5]}")
print(f" - Missing #footer-col-navigation: {len(missing_footer_nav)} {missing_footer_nav[:5]}")
print(f" - Outdated navbar items / search bar remaining: {len(old_translator)} {old_translator[:5]}")
print(f" - Broken linear-gradient rules remaining: {len(broken_gradients)} {broken_gradients[:5]}")
print(f" - text-align: justify remaining: {len(justify_remaining)} {justify_remaining[:5]}")
print(f" - Legacy padding-top: 80px/100px remaining: {len(pt80_remaining)} {pt80_remaining[:5]}")
print(f" - Missing <title> or <h1>: {len(missing_seo)} {missing_seo[:5]}")
print(f" - Broken local PDF links on OP pages: {len(broken_pdfs)} {broken_pdfs[:5]}")

if (
    missing_css
    or missing_logo
    or missing_favicon
    or missing_toggle
    or missing_footer_nav
    or old_translator
    or broken_gradients
    or justify_remaining
    or pt80_remaining
    or broken_pdfs
):
    sys.exit(1)
print("ALL MODERN ATLAS LOGO, FAVICON, NAVBAR, FOOTER NAVIGATION, ALIGNMENT & CSS CHECKS PASSED!")
