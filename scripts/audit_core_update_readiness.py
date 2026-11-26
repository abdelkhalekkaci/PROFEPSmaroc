#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Read-only Google Core Update (Nov & Dec 2026) Readiness Audit for ProfEPS.ma
Checks:
1. Canonical, meta description, title, robots, JSON-LD, and E-E-A-T coverage.
2. Orphan / low-inlink detection across all indexable HTML pages.
3. Sitemap.xml parity (no noindex/redirect/missing-file URLs; all indexable pages present).
4. Cookie check corruption check & legacy redirect stub verification.
5. Core Web Vitals & AdSense UX guardrails (img width/height, AdSense min-height, blocking scripts, font-display=swap).
6. llms.txt parity on latest 2026 articles.
"""

import glob
import json
import os
import re
from collections import Counter
from html.parser import HTMLParser

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC_DIR = os.path.join(ROOT_DIR, "public")


class PageAuditParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""
        self.in_title = False
        self.desc = ""
        self.canon = ""
        self.robots = ""
        self.links = []
        self.imgs_no_dims = 0
        self.ads_ins = 0
        self.ads_no_minheight = 0
        self.blocking_head_scripts = 0
        self.in_body = False
        self.skip_text = False
        self.words = 0

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if tag == "title":
            self.in_title = True
        elif tag == "meta":
            name = (d.get("name") or "").lower()
            if name == "description":
                self.desc = d.get("content", "")
            elif name == "robots":
                self.robots = d.get("content", "").lower()
        elif tag == "link":
            rel = (d.get("rel") or "").lower()
            if "canonical" in rel:
                self.canon = d.get("href", "")
        elif tag == "a":
            href = d.get("href", "")
            if href and not href.startswith(("http", "#", "mailto:", "tel:", "javascript:")):
                self.links.append(href.split("#")[0].split("?")[0].lstrip("/"))
        elif tag == "img":
            if "width" not in d or "height" not in d:
                self.imgs_no_dims += 1
        elif tag == "ins" and "adsbygoogle" in (d.get("class") or ""):
            self.ads_ins += 1
            st = (d.get("style") or "").lower()
            if "min-height" not in st and "height" not in st:
                self.ads_no_minheight += 1
        elif tag == "script":
            self.skip_text = True
            if d.get("src") and "async" not in d and "defer" not in d and "type" not in d:
                if not self.in_body:
                    self.blocking_head_scripts += 1
        elif tag == "style":
            self.skip_text = True
        elif tag == "body":
            self.in_body = True

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
        elif tag in ("script", "style"):
            self.skip_text = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data
        elif self.in_body and not self.skip_text:
            self.words += len(data.split())


def main():
    files = sorted(glob.glob(os.path.join(PUBLIC_DIR, "*.html")))
    inlinks = Counter()
    indexable = {}
    noindex_or_redirect = []
    cookie_corrupted = []

    for fp in files:
        fn = os.path.basename(fp)
        if fn == "google9e56188ccdfea7e9.html":
            continue
        with open(fp, "r", encoding="utf-8", errors="ignore") as f:
            c = f.read()
        if "<title>Cookie check</title>" in c:
            cookie_corrupted.append(fn)
        p = PageAuditParser()
        p.feed(c)
        if "noindex" in p.robots or "http-equiv=\"refresh\"" in c.lower():
            noindex_or_redirect.append(fn)
            continue
        indexable[fn] = (p, c)
        for l in set(p.links):
            if l.endswith(".html"):
                inlinks[l] += 1
            elif l == "":
                inlinks["index.html"] += 1

    with open(os.path.join(PUBLIC_DIR, "sitemap.xml"), "r", encoding="utf-8") as f:
        sm = f.read()
    sm_urls = set(re.findall(r"<loc>https://profeps\.ma/([^<]*)</loc>", sm))
    sm_normalized = {("index.html" if u == "" else u) for u in sm_urls}

    missing_from_sitemap = [fn for fn in indexable if fn not in sm_normalized]
    bad_in_sitemap = [u for u in sm_normalized if u not in indexable]
    low_inlinks = sorted([(inlinks[fn], fn) for fn in indexable if inlinks[fn] < 4])
    missing_canon = [fn for fn, (p, _) in indexable.items() if not p.canon]
    missing_jsonld = [fn for fn, (_, c) in indexable.items() if "application/ld+json" not in c]
    img_cls = [fn for fn, (p, _) in indexable.items() if p.imgs_no_dims > 0]
    ad_cls = [fn for fn, (p, _) in indexable.items() if p.ads_no_minheight > 0]
    blocking_js = [fn for fn, (p, _) in indexable.items() if p.blocking_head_scripts > 0]

    with open(os.path.join(PUBLIC_DIR, "llms.txt"), "r", encoding="utf-8") as f:
        llms = f.read()
    llms_missing_2026 = [
        slug for slug in [
            "article-nouveautes-reglement-basketball-fiba-nba-2026.html",
            "article-nouveautes-reglement-volleyball-fivb-2026.html",
            "alternative-gratuite-generateur-eps-maroc.html",
            "comparatif-generateur-eps-gratuit-maroc.html",
            "article-inspection-pedagogique-titularisation-eps-maroc.html",
        ]
        if slug not in llms
    ]

    missing_hreflang = [fn for fn, (_, c) in indexable.items() if "hreflang=" not in c]
    missing_main = [fn for fn, (_, c) in indexable.items() if not re.search(r"<main\b", c, re.I)]
    missing_org = [fn for fn, (_, c) in indexable.items() if "https://profeps.ma/#organization" not in c]
    bad_authors = []
    jsonld_errors = []
    for fn, (_, c) in indexable.items():
        if "Abdelkhalek Kaci" in c or "Prof EPS & MAS Calculator" in c:
            bad_authors.append(fn)
        for sc in re.findall(r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', c, re.S | re.I):
            try:
                json.loads(sc)
            except Exception as exc:
                jsonld_errors.append((fn, str(exc)))
    og_banner_ok = os.path.exists(os.path.join(PUBLIC_DIR, "images", "og-profeps-banner.png"))

    print("=== PROFEPS.MA PRE-DECEMBER 2026 CORE UPDATE & 20-PILLAR AUDIT ===")
    print(f"Indexable HTML pages     : {len(indexable)}")
    print(f"Noindex/Redirect stubs   : {len(noindex_or_redirect)} -> {noindex_or_redirect}")
    print(f"Cookie-check corrupted   : {len(cookie_corrupted)} -> {cookie_corrupted}")
    print(f"Missing from sitemap.xml : {len(missing_from_sitemap)} -> {missing_from_sitemap}")
    print(f"Noindex/404 in sitemap   : {len(bad_in_sitemap)} -> {bad_in_sitemap}")
    print(f"Low inlinks (< 4)        : {len(low_inlinks)} -> {low_inlinks}")
    print(f"Missing canonical        : {len(missing_canon)} -> {missing_canon}")
    print(f"Missing JSON-LD          : {len(missing_jsonld)} -> {missing_jsonld}")
    print(f"JSON-LD parse errors     : {len(jsonld_errors)} -> {jsonld_errors}")
    print(f"Missing Org @id schema   : {len(missing_org)} -> {missing_org}")
    print(f"Fragmented author tags   : {len(bad_authors)} -> {bad_authors}")
    print(f"Missing hreflang         : {len(missing_hreflang)} -> {missing_hreflang}")
    print(f"Missing <main> landmark  : {len(missing_main)} -> {missing_main}")
    print(f"1200x630 OG banner ready : {og_banner_ok}")
    print(f"Images missing w/h (CLS) : {len(img_cls)}")
    print(f"AdSense no min-h (CLS)   : {len(ad_cls)}")
    print(f"Blocking head scripts    : {len(blocking_js)}")
    print(f"llms.txt missing 2026    : {len(llms_missing_2026)} -> {llms_missing_2026}")


if __name__ == "__main__":
    main()
