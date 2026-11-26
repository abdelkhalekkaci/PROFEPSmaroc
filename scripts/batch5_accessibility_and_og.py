#!/usr/bin/env python3
"""Batch 5: Add semantic <main id="main-content"> landmarks on all 117 unannotated
indexable pages and wire the 1200x630 OpenGraph banner image for summary_large_image.
"""
import re
from pathlib import Path

ROOT = Path("public")
OG_BANNER_URL = "https://profeps.ma/images/og-profeps-banner.png"
OLD_OG_SQUARE = "https://profeps.ma/images/prof_eps.png"


def main():
    main_added = 0
    og_updated = 0
    rtl_fixed = 0
    total = 0

    for path in sorted(ROOT.glob("*.html")):
        if path.name.startswith("google") or path.name == "generateur.html":
            continue
        src = path.read_text(encoding="utf-8")
        if "noindex" in src.lower():
            continue
        total += 1
        changed = False

        # 1. Wrap single <article ...>...</article> in <main id="main-content"> if missing
        if not re.search(r"<main\b", src, re.I):
            art_open = re.search(r"<article\b", src, re.I)
            art_close = re.search(r"</article>", src, re.I)
            if art_open and art_close and art_open.start() < art_close.start():
                idx1 = art_open.start()
                idx2 = art_close.end()
                src = src[:idx1] + '<main id="main-content">\n' + src[idx1:idx2] + "\n</main>" + src[idx2:]
                main_added += 1
                changed = True

        # 2. Wire 1200x630 OpenGraph & Twitter card image inside <head> (preserve favicon & JSON-LD logo)
        head_end = src.find("</head>")
        if head_end != -1:
            head = src[:head_end]
            body = src[head_end:]
            new_head = head

            # Replace square prof_eps.png / prof_eps.webp in og:image and twitter:image meta tags only
            new_head = re.sub(
                r'(<meta\b[^>]*(?:property=["\']og:image["\']|name=["\']twitter:image["\'])[^>]*\bcontent=["\'])'
                + r'https://profeps\.ma/images/prof_eps\.(?:png|webp)'
                + r'(["\'])',
                rf'\g<1>{OG_BANNER_URL}\g<2>',
                new_head,
                flags=re.I,
            )
            if not re.search(r'<meta\b[^>]*property=["\']og:image["\']', new_head, re.I):
                new_head = new_head + (
                    f'  <meta property="og:image" content="{OG_BANNER_URL}">\n'
                    '  <meta property="og:image:width" content="1200">\n'
                    '  <meta property="og:image:height" content="630">\n'
                )
            if not re.search(r'<meta\b[^>]*name=["\']twitter:image["\']', new_head, re.I):
                new_head = new_head + f'  <meta name="twitter:image" content="{OG_BANNER_URL}">\n'
            if OG_BANNER_URL in new_head and "og:image:width" not in new_head:
                new_head = re.sub(
                    r'(<meta\b[^>]*property=["\']og:image["\'][^>]*>)',
                    r'\1\n  <meta property="og:image:width" content="1200">\n  <meta property="og:image:height" content="630">',
                    new_head,
                    count=1,
                    flags=re.I,
                )

            # Verify Arabic pages carry dir="rtl"
            if re.search(r'<html\b[^>]*\blang=["\']ar', new_head, re.I) and 'dir="rtl"' not in new_head.lower():
                new_head = re.sub(r'(<html\b[^>]*)(>)', r'\1 dir="rtl"\2', new_head, count=1, flags=re.I)
                rtl_fixed += 1

            if new_head != head:
                src = new_head + body
                og_updated += 1
                changed = True

        if changed:
            path.write_text(src, encoding="utf-8")

    print(f"Batch 5 complete ({total} indexable): main_added={main_added}, og_updated={og_updated}, rtl_fixed={rtl_fixed}")


if __name__ == "__main__":
    main()
