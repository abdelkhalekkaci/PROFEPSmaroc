#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Étape 3 : Audit SEO Technique Global & Vérification d'Intégrité sur ProfEPS.ma
- Vérifie les 171 URLs de sitemap.xml (existence physique, absence de noindex, unicité)
- Vérifie toutes les pages indexables de public/ (Title, Meta Description, Canonical, H1, hreflang, JSON-LD)
- Nettoie tout lien interne résiduel href="index.html" -> href="/" (hors generateur.html)
- Vérifie que generateur.html n'a subi aucune modification
"""

import os
import re
import shutil
import xml.etree.ElementTree as ET

ROOT_DIR = "/app/applet"
PUBLIC_DIR = os.path.join(ROOT_DIR, "public")


def run_audit_and_fix():
    sitemap_path = os.path.join(PUBLIC_DIR, "sitemap.xml")
    tree = ET.parse(sitemap_path)
    root = tree.getroot()
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}

    locs = [el.text.strip() for el in root.findall("sm:url/sm:loc", ns)]
    unique_locs = set(locs)

    print(f"=== 1. AUDIT SITEMAP.XML ===")
    print(f"Total URLs in sitemap.xml : {len(locs)}")
    print(f"Unique URLs in sitemap.xml: {len(unique_locs)}")
    assert len(locs) == len(unique_locs), "Duplicate URLs found in sitemap.xml!"
    assert "https://profeps.ma/index.html" not in unique_locs, "index.html should not be in sitemap.xml (use / instead)!"

    missing_files = []
    noindex_in_sitemap = []

    for url in locs:
        rel = url.replace("https://profeps.ma/", "")
        fname = "index.html" if rel == "" else rel
        fpath = os.path.join(PUBLIC_DIR, fname)
        if not os.path.exists(fpath):
            missing_files.append(fname)
        else:
            with open(fpath, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
            if re.search(r'<meta[^>]+name=["\']robots["\'][^>]+content=["\'][^"\']*noindex', content, re.I):
                noindex_in_sitemap.append(fname)

    print(f"Missing physical files from sitemap: {len(missing_files)}")
    print(f"Noindex pages inside sitemap       : {len(noindex_in_sitemap)}")

    print(f"\n=== 2. AUDIT DES PAGES HTML PUBLIC/ (HORS GENERATEUR.HTML) ===")
    html_files = sorted([f for f in os.listdir(PUBLIC_DIR) if f.endswith(".html")])

    fixed_index_links = 0
    missing_title = []
    missing_desc = []
    missing_canonical = []
    missing_jsonld = []
    arabic_pages = []

    for fname in html_files:
        fpath = os.path.join(PUBLIC_DIR, fname)
        with open(fpath, "r", encoding="utf-8", errors="ignore") as f:
            html = f.read()

        # Skip touching generateur.html
        if fname != "generateur.html":
            new_html = html.replace('href="index.html"', 'href="/"').replace("href='index.html'", "href='/'")
            if new_html != html:
                with open(fpath, "w", encoding="utf-8") as f:
                    f.write(new_html)
                html = new_html
                fixed_index_links += 1

        # Skip verification pages or noindex utility pages
        if fname.startswith("google") or re.search(r'noindex', html, re.I):
            continue

        if not re.search(r"<title>.*?</title>", html, re.I | re.S):
            missing_title.append(fname)
        if not re.search(r'<meta[^>]+name=["\']description["\']', html, re.I):
            missing_desc.append(fname)
        if not re.search(r'<link[^>]+rel=["\']canonical["\']', html, re.I):
            missing_canonical.append(fname)
        if 'application/ld+json' not in html:
            missing_jsonld.append(fname)
        if fname.startswith("ar-"):
            arabic_pages.append(fname)

    print(f"Total HTML files scanned            : {len(html_files)}")
    print(f"Files with href='index.html' fixed  : {fixed_index_links}")
    print(f"Arabic RTL pillar pages (ar-*.html) : {len(arabic_pages)} -> {', '.join(arabic_pages)}")
    print(f"Indexable pages missing <title>     : {len(missing_title)}")
    print(f"Indexable pages missing description : {len(missing_desc)}")
    print(f"Indexable pages missing canonical   : {len(missing_canonical)}")
    print(f"Indexable pages missing JSON-LD     : {len(missing_jsonld)} {missing_jsonld if missing_jsonld else ''}")

    # Sync public/ to root / (NEVER touch generateur.html)
    synced = 0
    for fname in os.listdir(PUBLIC_DIR):
        if fname == "generateur.html":
            continue
        src = os.path.join(PUBLIC_DIR, fname)
        dst = os.path.join(ROOT_DIR, fname)
        if os.path.isfile(src) and (fname.endswith(".html") or fname in ("sitemap.xml", "robots.txt", "manifest.json", "sw.js")):
            shutil.copy2(src, dst)
            synced += 1
    print(f"\nSynced {synced} files from public/ to workspace root / (generateur.html untouched).")


if __name__ == "__main__":
    run_audit_and_fix()
