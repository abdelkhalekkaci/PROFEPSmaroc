#!/usr/bin/env python3
"""Batch E: Global tool anchor funnel optimization (Generaleur & Calculateur vs Evaluation theory)
and sitemap lastmod refresh for all Batches A-E upgraded pages.
"""
import re
from pathlib import Path

ROOT = Path("public")
TODAY = "2026-11-25"

BATCH_PAGES = [
    "generateur.html",
    "calculateur-note-eps-maroc.html",
    "evaluation-eps.html",
    "concours-crmef-hub.html",
    "qcm-concours-crmef.html",
    "qcm-sciences-education-crmef.html",
    "qcm-didactique-primaire-maroc.html",
    "qcm-specialite-primaire-maroc.html",
    "qcm-didactique-francais-maroc.html",
    "qcm-specialite-francais-maroc.html",
    "qcm-didactique-maths-maroc.html",
    "qcm-specialite-maths-maroc.html",
    "qcm-didactique-svt-maroc.html",
    "qcm-specialite-svt-maroc.html",
    "qcm-didactique-economie-gestion-maroc.html",
    "qcm-specialite-economie-gestion-maroc.html",
    "article-orientation-prof-eps.html",
    "aps-gymnastique-sol-eps-maroc.html",
    "cycles-eps-maroc.html",
    "index.html",
    "aps-course-duree-demi-fond-eps-maroc.html",
    "article-course-duree-eps.html",
    "aps-course-vitesse-relais-eps-maroc.html",
    "aps-saut-longueur-triple-saut-eps-maroc.html",
    "cycle-basketball-college-eps-maroc.html",
    "cycle-basketball-lycee-eps-maroc.html",
    "cycle-handball-college-eps-maroc.html",
    "cycle-handball-lycee-eps-maroc.html",
    "orientations-pedagogiques-eps-2007-2009.html",
    "programme-eps-maroc.html",
]


def main():
    footer_gen = 0
    footer_ev = 0
    apsa_strip = 0
    pill_strip = 0

    for path in sorted(ROOT.glob("*.html")):
        if path.name.startswith("google") or path.name == "generateur.html":
            continue
        src = path.read_text(encoding="utf-8")
        if "noindex" in src.lower():
            continue
        orig = src

        # 1. Unified footer anchor equity: route Cycles/Fiches/Grilles to /generateur.html
        if '<li><a href="/generateur.html">Générateur de Séances (Word/PDF)</a></li>' in src:
            src = src.replace(
                '<li><a href="/generateur.html">Générateur de Séances (Word/PDF)</a></li>',
                '<li><a href="/generateur.html">Générateur Cycles, Fiches &amp; Grilles</a></li>',
            )
            footer_gen += 1

        # 2. Unified footer anchor equity: label /evaluation-eps.html as Cadre Théorique
        if '<li><a href="/evaluation-eps.html">Évaluation &amp; Barèmes EPS</a></li>' in src:
            src = src.replace(
                '<li><a href="/evaluation-eps.html">Évaluation &amp; Barèmes EPS</a></li>',
                '<li><a href="/evaluation-eps.html">Cadre Théorique Évaluation EPS</a></li>',
            )
            footer_ev += 1

        # 3. APSA 360 hub header button: point Barèmes & Grilles /20 to calculateur-note-eps-maroc.html
        old_apsa_btn = 'href="evaluation-eps.html" style="padding:0.45rem 0.9rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;font-size:0.76rem;font-weight:800;color:#0f172a;text-decoration:none;">📊 Barèmes &amp; Grilles /20 →</a>'
        new_apsa_btn = 'href="calculateur-note-eps-maroc.html" style="padding:0.45rem 0.9rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;font-size:0.76rem;font-weight:800;color:#0f172a;text-decoration:none;">📊 Calculateur Notes &amp; Grilles /20 →</a>'
        if old_apsa_btn in src:
            src = src.replace(old_apsa_btn, new_apsa_btn)
            apsa_strip += 1

        # 4. Top-of-article pill bar: route Grilles d'Évaluation OP 2007/2009 to calculateur-note-eps-maroc.html
        old_pill = 'href="evaluation-eps.html" style="padding:0.45rem 0.9rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;font-size:0.82rem;font-weight:700;color:#0f172a;">📊 Grilles d\'Évaluation OP 2007/2009</a>'
        new_pill = 'href="calculateur-note-eps-maroc.html" style="padding:0.45rem 0.9rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;font-size:0.82rem;font-weight:700;color:#0f172a;">📊 Calculateur Notes &amp; Grilles /20</a>'
        if old_pill in src:
            src = src.replace(old_pill, new_pill)
            pill_strip += 1

        if src != orig:
            path.write_text(src, encoding="utf-8")

    # 5. Refresh sitemap.xml lastmod for all Batches A-E pages
    sm_path = ROOT / "sitemap.xml"
    sm = sm_path.read_text(encoding="utf-8")
    sm_updated = 0
    for fn in BATCH_PAGES:
        url = "https://profeps.ma/" if fn == "index.html" else f"https://profeps.ma/{fn}"
        pat = re.compile(
            r"(<loc>" + re.escape(url) + r"</loc>\s*<lastmod>)([^<]+)(</lastmod>)",
            re.S,
        )
        sm_new, n = pat.subn(rf"\g<1>{TODAY}\g<3>", sm)
        if n > 0 and sm_new != sm:
            sm = sm_new
            sm_updated += 1
    sm_path.write_text(sm, encoding="utf-8")

    print(
        f"Batch E complete: footer_gen={footer_gen}, footer_ev={footer_ev}, "
        f"apsa_strip={apsa_strip}, pill_strip={pill_strip}, sitemap_lastmod={sm_updated}"
    )


if __name__ == "__main__":
    main()
