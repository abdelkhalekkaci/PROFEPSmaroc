#!/usr/bin/env python3
import os
import re
import glob
import subprocess

PUBLIC_DIR = "/app/applet/public" if os.path.exists("/app/applet/public") else "public"

SILO_FILES = sorted(glob.glob(os.path.join(PUBLIC_DIR, "aps-*.html")))
ALL_TARGETS = SILO_FILES + [
    os.path.join(PUBLIC_DIR, "hub-aps-sports-eps-maroc.html"),
    os.path.join(PUBLIC_DIR, "index.html"),
]

print(f"Found {len(SILO_FILES)} APS silo files:")
for f in SILO_FILES:
    print(" -", os.path.basename(f))

for fpath in ALL_TARGETS:
    fname = os.path.basename(fpath)
    with open(fpath, "r", encoding="utf-8") as fh:
        content = fh.read()

    issues = []

    # 1. Check for unrendered LaTeX or template artifacts
    latex_matches = re.findall(r'(\$[^$\n]{1,60}\$|\\text\{|\\times|\\le\b|\\ge\b|\\approx|\\rightarrow|\{\{|\}\})', content)
    # filter out legitimate JS template literals or CSS/HTML
    real_latex = [m for m in latex_matches if not m.startswith("${")]
    if real_latex:
        issues.append(f"LaTeX/template artifacts: {real_latex[:5]}")

    # 2. Check internal href links
    hrefs = re.findall(r'href="([^"#?]+)', content)
    for h in set(hrefs):
        if h.startswith(("http://", "https://", "mailto:", "tel:", "javascript:", "/")):
            if h.startswith("/") and h != "/" and not h.startswith("//"):
                target_path = os.path.join(PUBLIC_DIR, h.lstrip("/"))
                if not os.path.exists(target_path):
                    issues.append(f"Broken root-relative link: {h}")
            continue
        target_path = os.path.join(PUBLIC_DIR, h)
        if not os.path.exists(target_path):
            issues.append(f"Broken relative link: {h}")

    # 3. Extract <script> blocks (excluding application/ld+json and external src) and run node --check
    script_blocks = re.findall(r'<script(?![^>]*type="application/ld\+json")(?![^>]*\bsrc=)[^>]*>(.*?)</script>', content, flags=re.DOTALL | re.IGNORECASE)
    for idx, js in enumerate(script_blocks):
        tmp_js = f"/tmp/check_{fname}_{idx}.js"
        with open(tmp_js, "w", encoding="utf-8") as jfh:
            jfh.write(js)
        res = subprocess.run(["node", "--check", tmp_js], capture_output=True, text=True)
        if res.returncode != 0:
            issues.append(f"JS syntax error in script #{idx}: {res.stderr.strip().splitlines()[0] if res.stderr else 'error'}")
        os.remove(tmp_js)

    # 4. For APS silos, check if URL query param ?level= is handled and check how many aps-*.html links exist
    if fname.startswith("aps-"):
        aps_links = set(re.findall(r'href="(aps-[^"#?]+\.html)"', content))
        if len(aps_links) < 12:
            issues.append(f"Links to only {len(aps_links)}/13 APS silos in quick-nav")
        if "URLSearchParams" not in content and "location.search" not in content:
            issues.append("Missing ?level= URL parameter auto-selector")

    print(f"\n=== {fname} ===")
    if not issues:
        print("  ✅ OK (0 issues)")
    else:
        for iss in issues:
            print("  ❌", iss)
