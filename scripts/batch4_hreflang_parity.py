#!/usr/bin/env python3
"""Batch 4: Multilingual hreflang completion & FR/AR/EN reciprocity fixes."""
import re
from pathlib import Path

ROOT = Path("public")

AR_QCM_PAGES = {
    "qcm-didactique-arabe-maroc.html",
    "qcm-didactique-education-islamique-maroc.html",
    "qcm-didactique-histoire-geographie-maroc.html",
    "qcm-didactique-philosophie-maroc.html",
    "qcm-specialite-arabe-maroc.html",
    "qcm-specialite-education-islamique-maroc.html",
    "qcm-specialite-histoire-geographie-maroc.html",
    "qcm-specialite-philosophie-maroc.html",
}

MISSING_HREFLANG_PAGES = [
    ("ar-daraja-momtaza-kharij-salam-chorout-statut-2024.html", "ar-MA"),
    ("ar-idara-tarbawiya-taftich-assatida-bahitin-statut-2024.html", "ar-MA"),
    ("ar-idmaj-otour-jadida-molhaq-momawin-mostachar-statut-2024.html", "ar-MA"),
    ("ar-jadwal-taawidat-ziyada-ojour-mada-59-statut-2024.html", "ar-MA"),
    ("ar-ma-yamnaoho-nidam-assassi-dorous-khossoussiya-statut-2024.html", "ar-MA"),
    ("ar-otour-hayat-tadris-darajat-ostad-mobarraz-statut-2024.html", "ar-MA"),
    ("ar-saat-amal-osbouiya-saat-idafiya-takwin-mostamir-statut-2024.html", "ar-MA"),
    ("ar-taqyim-adaa-oqoubat-otla-haraka-intiqaliya-statut-2024.html", "ar-MA"),
    ("ar-tarqiya-rotba-daraja-ansaq-ihada-tartib-statut-2024.html", "ar-MA"),
    ("ar-tawdif-tarsim-motadarribin-tarqiya-chahadat-master-statut-2024.html", "ar-MA"),
    ("article-nouveautes-reglement-basketball-fiba-nba-2026.html", "fr-MA"),
    ("article-nouveautes-reglement-volleyball-fivb-2026.html", "fr-MA"),
    ("bibliotheque-sciences-education-crmef-pdf-maroc.html", "fr-MA"),
    ("orientations-pedagogiques-education-musicale-college-2009.html", "fr-MA"),
    ("orientations-pedagogiques-education-plastique-college-2009.html", "fr-MA"),
    ("orientations-pedagogiques-histoire-geographie-college-2009.html", "fr-MA"),
    ("orientations-pedagogiques-histoire-geographie-lycee-2007.html", "fr-MA"),
    ("orientations-pedagogiques-physique-chimie-college-2009.html", "fr-MA"),
    ("orientations-pedagogiques-physique-chimie-lycee-2007.html", "fr-MA"),
    ("orientations-pedagogiques-svt-college-2009.html", "fr-MA"),
    ("orientations-pedagogiques-svt-lycee-2007.html", "fr-MA"),
]


def insert_after_canonical(src: str, tags_block: str) -> str:
    m = re.search(r'(<link\b[^>]+rel=["\']canonical["\'][^>]*>)', src, re.I)
    if m:
        idx = m.end()
        return src[:idx] + "\n" + tags_block + src[idx:]
    return src.replace("</head>", tags_block + "\n</head>", 1)


def main():
    fixed_ar_qcm = 0
    for fname in sorted(AR_QCM_PAGES):
        p = ROOT / fname
        s = p.read_text(encoding="utf-8")
        new_s = re.sub(
            r'(<link\b[^>]*rel=["\']alternate["\'][^>]*hreflang=["\'])fr-MA(["\'])',
            r'\g<1>ar-MA\2',
            s,
            flags=re.I,
        )
        if new_s != s:
            p.write_text(new_s, encoding="utf-8")
            fixed_ar_qcm += 1

    # Add reciprocal AR alternate tags on orientations-pedagogiques-eps-2007-2009.html
    op_fr = ROOT / "orientations-pedagogiques-eps-2007-2009.html"
    op_s = op_fr.read_text(encoding="utf-8")
    ar_url = "https://profeps.ma/ar-orientations-pedagogiques-eps-maroc.html"
    if ar_url not in op_s:
        ar_links = (
            f'  <link rel="alternate" hreflang="ar-MA" href="{ar_url}">\n'
            f'  <link rel="alternate" hreflang="ar" href="{ar_url}">'
        )
        op_s = re.sub(
            r'(<link\b[^>]*hreflang=["\']fr-MA["\'][^>]*>)',
            r'\1\n' + ar_links,
            op_s,
            count=1,
            flags=re.I,
        )
        op_fr.write_text(op_s, encoding="utf-8")
        print("Added reciprocal AR hreflang on orientations-pedagogiques-eps-2007-2009.html")

    added_missing = 0
    for fname, hl in MISSING_HREFLANG_PAGES:
        p = ROOT / fname
        s = p.read_text(encoding="utf-8")
        if "hreflang=" in s:
            continue
        url = f"https://profeps.ma/{fname}"
        block = (
            f'  <link rel="alternate" hreflang="{hl}" href="{url}">\n'
            f'  <link rel="alternate" hreflang="x-default" href="{url}">'
        )
        new_s = insert_after_canonical(s, block)
        p.write_text(new_s, encoding="utf-8")
        added_missing += 1

    print(f"Batch 4 complete: fixed {fixed_ar_qcm} AR QCM hreflangs, added hreflang to {added_missing} pages.")


if __name__ == "__main__":
    main()
