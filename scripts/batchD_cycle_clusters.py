#!/usr/bin/env python3
"""Batch D: Upgrade existing Athletics & Collective Sports Cycle pages for GSC cycle keyword clusters
and add prominent top-of-main CTAs funneling users to /generateur.html and /calculateur-note-eps-maroc.html.
"""
import html
import json
import re
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path("public")
OG_BANNER = "https://profeps.ma/images/og-profeps-banner.png"

META_UPDATES = {
    "aps-course-duree-demi-fond-eps-maroc.html": (
        "Projet de Cycle Course en Durée (Collège, Lycée) | ProfEPS",
        "Projet de cycle course en durée EPS Maroc (3AC Collège, Lycée PDF) : test VMA, règles de la course en durée, grille d'observation, fiches et barèmes /20.",
    ),
    "article-course-duree-eps.html": (
        "Projet de Cycle Course en Durée (3AC, Lycée PDF) | ProfEPS",
        "Projet de cycle course en durée EPS Maroc (Collège 3AC & Lycée PDF) : règles de la course en durée, VMA, grille d'observation, séances et barème officiel /20.",
    ),
    "aps-course-vitesse-relais-eps-maroc.html": (
        "Projet de Cycle Course de Vitesse Collège 1AC–3AC | ProfEPS",
        "Projet de cycle course de vitesse Collège (1AC, 2AC, 3AC) & Lycée : les 4 phases de la course de vitesse, fiche de leçon PDF, ATD et barèmes EPS Maroc.",
    ),
    "aps-saut-longueur-triple-saut-eps-maroc.html": (
        "Projet de Cycle Saut en Longueur Collège 1AC–3AC | ProfEPS",
        "Projet de cycle saut en longueur Collège (1AC, 2AC, 3AC) & Lycée : étalonnage course d'élan, situation d'apprentissage, fiche PDF et grille d'observation.",
    ),
    "cycle-basketball-college-eps-maroc.html": (
        "Projet de Cycle Basketball Collège 1AC, 2AC, 3AC | ProfEPS",
        "Projet prévisionnel et cycle de basketball au collège (1AC, 2AC, 3AC) EPS Maroc : 10 fiches de séances, situations, grille d'observation et barème OP 2009.",
    ),
    "cycle-basketball-lycee-eps-maroc.html": (
        "Projet de Cycle Basketball Lycée TC, 1Bac, 2Bac | ProfEPS",
        "Projet de cycle basketball au lycée (Tronc Commun, 1Bac, 2Bac) EPS Maroc : situations, contre-attaque, grille d'observation et barèmes Bac Sport (OP 2007).",
    ),
    "cycle-handball-college-eps-maroc.html": (
        "Projet de Cycle Handball Collège (1AC, 2AC, 3AC) | ProfEPS",
        "Cycle de handball au collège (1AC, 2AC, 3AC) EPS Maroc : projet prévisionnel, fiches de séances PDF, démarquage, tirs et grille d'évaluation OP 2009.",
    ),
    "cycle-handball-lycee-eps-maroc.html": (
        "Projet de Cycle Handball Lycée (TC, 1Bac, 2Bac) | ProfEPS",
        "Cycle de handball au lycée (Tronc Commun, 1Bac, 2Bac) EPS Maroc : fiches de séances PDF, défense 0-6/1-5, contre-attaque et barème officiel OP 2007.",
    ),
}

FUNNELS = {
    "aps-course-duree-demi-fond-eps-maroc.html": (
        '<main class="silo-main">',
        """<main class="silo-main">
        <div id="profeps-cycle-tool-funnel" style="background:linear-gradient(135deg,#ecfeff 0%,#eef2ff 100%);border:2px solid #0B7A99;border-radius:16px;padding:1.15rem 1.4rem;margin:0 0 1.4rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;">
          <div style="flex:1 1 360px;">
            <strong style="display:block;font-size:1.02rem;color:#0f172a;margin-bottom:0.2rem;">⚡ Projet de Cycle Course en Durée (1AC, 2AC, 3AC &amp; Lycée) + Grille d'Observation /20</strong>
            <span style="font-size:0.86rem;color:#334155;">Exportez votre projet de cycle prêt à imprimer (PDF/Word) ou calculez instantanément les notes et critères du processus.</span>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:0.55rem;">
            <a href="/generateur.html?aps=Course%20en%20dur%C3%A9e&tab=projet" style="padding:0.6rem 1.05rem;background:#3347D6;color:#ffffff;font-weight:800;font-size:0.84rem;border-radius:10px;text-decoration:none;">⚡ Générateur Cycles &amp; Fiches PDF →</a>
            <a href="/calculateur-note-eps-maroc.html?aps=Course%20en%20dur%C3%A9e" style="padding:0.6rem 1.05rem;background:#0B7A99;color:#ffffff;font-weight:800;font-size:0.84rem;border-radius:10px;text-decoration:none;">📊 Calculateur Note /20 &amp; Grille →</a>
            <a href="/article-course-duree-eps.html" style="padding:0.6rem 1rem;background:#ffffff;color:#0f172a;border:1px solid #cbd5e1;font-weight:700;font-size:0.84rem;border-radius:10px;text-decoration:none;">📘 Règles &amp; Barèmes Course en Durée →</a>
          </div>
        </div>""",
    ),
    "article-course-duree-eps.html": (
        '<div class="article-content">',
        """<div class="article-content">
        <div id="profeps-cycle-tool-funnel" style="background:linear-gradient(135deg,#eef2ff 0%,#ecfeff 100%);border:2px solid #3347D6;border-radius:14px;padding:1.1rem 1.35rem;margin:0 0 1.4rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.85rem;">
          <div style="flex:1 1 320px;">
            <strong style="display:block;font-size:1rem;color:#0f172a;margin-bottom:0.2rem;">⚡ Télécharger votre Projet de Cycle Course en Durée (3AC / Lycée PDF)</strong>
            <span style="font-size:0.85rem;color:#334155;">Générez gratuitement le cycle complet, les fiches de séance et la grille d'observation officielle OP 2007/2009.</span>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
            <a href="/generateur.html?aps=Course%20en%20dur%C3%A9e&tab=projet" style="padding:0.55rem 1rem;background:#3347D6;color:#ffffff !important;font-weight:800;font-size:0.83rem;border-radius:10px;text-decoration:none;">⚡ Ouvrir le Générateur (Word/PDF) →</a>
            <a href="/calculateur-note-eps-maroc.html?aps=Course%20en%20dur%C3%A9e" style="padding:0.55rem 1rem;background:#0B7A99;color:#ffffff !important;font-weight:800;font-size:0.83rem;border-radius:10px;text-decoration:none;">📊 Grille &amp; Calculateur /20 →</a>
            <a href="/aps-course-duree-demi-fond-eps-maroc.html" style="padding:0.55rem 0.95rem;background:#ffffff;color:#0f172a !important;border:1px solid #cbd5e1;font-weight:700;font-size:0.83rem;border-radius:10px;text-decoration:none;">🏃 Studio 24 Cycles &amp; VMA →</a>
          </div>
        </div>""",
    ),
    "aps-course-vitesse-relais-eps-maroc.html": (
        '<main class="silo-main">',
        """<main class="silo-main">
        <div id="profeps-cycle-tool-funnel" style="background:linear-gradient(135deg,#eef2ff 0%,#fef3c7 100%);border:2px solid #3347D6;border-radius:16px;padding:1.15rem 1.4rem;margin:0 0 1.4rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;">
          <div style="flex:1 1 360px;">
            <strong style="display:block;font-size:1.02rem;color:#0f172a;margin-bottom:0.2rem;">⚡ Projet de Cycle Course de Vitesse Collège (1AC, 2AC, 3AC) &amp; 4 Phases (PDF)</strong>
            <span style="font-size:0.86rem;color:#334155;">Réaction, mise en action, vitesse maximale et maintien : générez vos fiches de leçon et grilles d'observation prêtes à imprimer.</span>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:0.55rem;">
            <a href="/generateur.html?aps=Course%20de%20vitesse&tab=projet" style="padding:0.6rem 1.05rem;background:#3347D6;color:#ffffff;font-weight:800;font-size:0.84rem;border-radius:10px;text-decoration:none;">⚡ Générateur Cycles &amp; Fiches PDF →</a>
            <a href="/calculateur-note-eps-maroc.html?aps=Course%20de%20vitesse" style="padding:0.6rem 1.05rem;background:#0B7A99;color:#ffffff;font-weight:800;font-size:0.84rem;border-radius:10px;text-decoration:none;">📊 Calculateur Note /20 &amp; Grille →</a>
          </div>
        </div>""",
    ),
    "aps-saut-longueur-triple-saut-eps-maroc.html": (
        '<main class="silo-main">',
        """<main class="silo-main">
        <div id="profeps-cycle-tool-funnel" style="background:linear-gradient(135deg,#eef2ff 0%,#f0fdf4 100%);border:2px solid #3347D6;border-radius:16px;padding:1.15rem 1.4rem;margin:0 0 1.4rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;">
          <div style="flex:1 1 360px;">
            <strong style="display:block;font-size:1.02rem;color:#0f172a;margin-bottom:0.2rem;">⚡ Projet de Cycle Saut en Longueur Collège (1AC, 2AC, 3AC) — Étalonnage &amp; Fiches PDF</strong>
            <span style="font-size:0.86rem;color:#334155;">Situations d'apprentissage de l'impulsion, étalonnage d'élan et grilles d'observation /20 exportables en Word/PDF.</span>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:0.55rem;">
            <a href="/generateur.html?aps=Saut%20en%20longueur&tab=projet" style="padding:0.6rem 1.05rem;background:#3347D6;color:#ffffff;font-weight:800;font-size:0.84rem;border-radius:10px;text-decoration:none;">⚡ Générateur Cycles &amp; Fiches PDF →</a>
            <a href="/calculateur-note-eps-maroc.html?aps=Saut%20en%20longueur" style="padding:0.6rem 1.05rem;background:#0B7A99;color:#ffffff;font-weight:800;font-size:0.84rem;border-radius:10px;text-decoration:none;">📊 Calculateur Note /20 &amp; Grille →</a>
          </div>
        </div>""",
    ),
    "cycle-basketball-college-eps-maroc.html": (
        '<main class="content">',
        """<main class="content">
        <div id="profeps-cycle-tool-funnel" style="background:linear-gradient(135deg,#eef2ff 0%,#ecfeff 100%);border:2px solid #3347D6;border-radius:14px;padding:1.1rem 1.35rem;margin:0 0 1.5rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.85rem;">
          <div style="flex:1 1 320px;">
            <strong style="display:block;font-size:1rem;color:#0f172a;margin-bottom:0.2rem;">⚡ Projet Prévisionnel &amp; Cycle Basketball Collège (1AC · 2AC · 3AC) en Word/PDF</strong>
            <span style="font-size:0.85rem;color:#334155;">Personnalisez ce cycle pour votre classe (1AC, 2AC ou 3AC) et téléchargez la grille d'observation OP 2009.</span>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
            <a href="/generateur.html?aps=Basketball&tab=projet" style="padding:0.55rem 1rem;background:#3347D6;color:#ffffff !important;font-weight:800;font-size:0.83rem;border-radius:10px;text-decoration:none;">⚡ Générer Cycle 1AC/2AC/3AC (PDF) →</a>
            <a href="/calculateur-note-eps-maroc.html?aps=Basketball" style="padding:0.55rem 1rem;background:#0B7A99;color:#ffffff !important;font-weight:800;font-size:0.83rem;border-radius:10px;text-decoration:none;">📊 Grille &amp; Calculateur /20 →</a>
          </div>
        </div>""",
    ),
    "cycle-basketball-lycee-eps-maroc.html": (
        '<main class="content">',
        """<main class="content">
        <div id="profeps-cycle-tool-funnel" style="background:linear-gradient(135deg,#eef2ff 0%,#ecfeff 100%);border:2px solid #3347D6;border-radius:14px;padding:1.1rem 1.35rem;margin:0 0 1.5rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.85rem;">
          <div style="flex:1 1 320px;">
            <strong style="display:block;font-size:1rem;color:#0f172a;margin-bottom:0.2rem;">⚡ Cycle Basketball Lycée (TC · 1Bac · 2Bac) — Outils Word/PDF &amp; Grille /20</strong>
            <span style="font-size:0.85rem;color:#334155;">Vous cherchez le collège (1AC, 2AC, 3AC) ? Consultez le <a href="/cycle-basketball-college-eps-maroc.html" style="color:#3347D6;font-weight:800;text-decoration:underline;">Cycle Basketball Collège</a> ou exportez votre projet ci-contre.</span>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
            <a href="/generateur.html?aps=Basketball&tab=projet" style="padding:0.55rem 1rem;background:#3347D6;color:#ffffff !important;font-weight:800;font-size:0.83rem;border-radius:10px;text-decoration:none;">⚡ Générer Cycle &amp; Fiches PDF →</a>
            <a href="/calculateur-note-eps-maroc.html?aps=Basketball" style="padding:0.55rem 1rem;background:#0B7A99;color:#ffffff !important;font-weight:800;font-size:0.83rem;border-radius:10px;text-decoration:none;">📊 Grille &amp; Calculateur /20 →</a>
          </div>
        </div>""",
    ),
    "cycle-handball-college-eps-maroc.html": (
        '<main class="content">',
        """<main class="content">
        <div id="profeps-cycle-tool-funnel" style="background:linear-gradient(135deg,#eef2ff 0%,#ecfeff 100%);border:2px solid #3347D6;border-radius:14px;padding:1.1rem 1.35rem;margin:0 0 1.5rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.85rem;">
          <div style="flex:1 1 320px;">
            <strong style="display:block;font-size:1rem;color:#0f172a;margin-bottom:0.2rem;">⚡ Projet de Cycle Handball Collège (1AC · 2AC · 3AC) &amp; Fiches PDF</strong>
            <span style="font-size:0.85rem;color:#334155;">Générez gratuitement les 10 fiches de séance handball (1AC, 2AC, 3AC) et la grille d'observation OP 2009.</span>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
            <a href="/generateur.html?aps=Handball&tab=projet" style="padding:0.55rem 1rem;background:#3347D6;color:#ffffff !important;font-weight:800;font-size:0.83rem;border-radius:10px;text-decoration:none;">⚡ Générer Cycle 1AC/2AC/3AC (PDF) →</a>
            <a href="/calculateur-note-eps-maroc.html?aps=Handball" style="padding:0.55rem 1rem;background:#0B7A99;color:#ffffff !important;font-weight:800;font-size:0.83rem;border-radius:10px;text-decoration:none;">📊 Grille &amp; Calculateur /20 →</a>
          </div>
        </div>""",
    ),
    "cycle-handball-lycee-eps-maroc.html": (
        '<main class="content">',
        """<main class="content">
        <div id="profeps-cycle-tool-funnel" style="background:linear-gradient(135deg,#eef2ff 0%,#ecfeff 100%);border:2px solid #3347D6;border-radius:14px;padding:1.1rem 1.35rem;margin:0 0 1.5rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.85rem;">
          <div style="flex:1 1 320px;">
            <strong style="display:block;font-size:1rem;color:#0f172a;margin-bottom:0.2rem;">⚡ Cycle Handball Lycée (TC · 1Bac · 2Bac) — Fiches PDF &amp; Grille /20</strong>
            <span style="font-size:0.85rem;color:#334155;">Vous enseignez au collège (1AC, 2AC, 3AC) ? Voir le <a href="/cycle-handball-college-eps-maroc.html" style="color:#3347D6;font-weight:800;text-decoration:underline;">Cycle Handball Collège</a> ou ouvrez les outils ci-contre.</span>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
            <a href="/generateur.html?aps=Handball&tab=projet" style="padding:0.55rem 1rem;background:#3347D6;color:#ffffff !important;font-weight:800;font-size:0.83rem;border-radius:10px;text-decoration:none;">⚡ Générer Cycle &amp; Fiches PDF →</a>
            <a href="/calculateur-note-eps-maroc.html?aps=Handball" style="padding:0.55rem 1rem;background:#0B7A99;color:#ffffff !important;font-weight:800;font-size:0.83rem;border-radius:10px;text-decoration:none;">📊 Grille &amp; Calculateur /20 →</a>
          </div>
        </div>""",
    ),
}


def replace_meta(head: str, attr_name: str, attr_val: str, new_val: str) -> str:
    esc = html.escape(new_val, quote=True)
    p1 = re.compile(
        rf'(<meta\b[^>]*\b{attr_name}=(["\']){re.escape(attr_val)}\2[^>]*\bcontent=)(["\']).*?\3',
        re.I | re.S,
    )
    if p1.search(head):
        return p1.sub(rf'\g<1>"{esc}"', head, count=1)
    p2 = re.compile(
        rf'(<meta\b[^>]*\bcontent=)(["\']).*?\2([^>]*\b{attr_name}=(["\']){re.escape(attr_val)}\4)',
        re.I | re.S,
    )
    if p2.search(head):
        return p2.sub(rf'\g<1>"{esc}"\g<3>', head, count=1)
    return head


def main():
    for fn, (t, d) in META_UPDATES.items():
        assert 40 <= len(t) <= 62, f"{fn} title {len(t)}: {t}"
        assert 130 <= len(d) <= 160, f"{fn} desc {len(d)}: {d}"
        p = ROOT / fn
        src = p.read_text(encoding="utf-8")
        idx = src.find("</head>")
        assert idx != -1
        head = src[:idx]
        body = src[idx:]

        head = re.sub(
            r"<title>.*?</title>",
            lambda _m: f"<title>{html.escape(t, quote=False)}</title>",
            head,
            count=1,
            flags=re.S | re.I,
        )
        head = replace_meta(head, "name", "description", d)
        head = replace_meta(head, "property", "og:title", t)
        head = replace_meta(head, "property", "og:description", d)
        head = replace_meta(head, "name", "twitter:title", t)
        head = replace_meta(head, "name", "twitter:description", d)
        head = replace_meta(head, "property", "og:image", OG_BANNER)
        head = replace_meta(head, "name", "twitter:image", OG_BANNER)
        if 'property="og:image:width"' not in head:
            head = head.replace(
                f'content="{OG_BANNER}">',
                f'content="{OG_BANNER}">\n  <meta property="og:image:width" content="1200">\n  <meta property="og:image:height" content="630">',
                1,
            )

        if "profeps-cycle-tool-funnel" not in body:
            anchor, replacement = FUNNELS[fn]
            assert anchor in body, f"{fn} missing anchor {anchor}"
            body = body.replace(anchor, replacement, 1)

        # Reinforce explicit Collège level keywords in Collège basket/handball H1s
        if fn == "cycle-basketball-college-eps-maroc.html":
            body = body.replace(
                "<h1>Projet de cycle basketball — Collège EPS Maroc (10 séances, OP 2009)</h1>",
                "<h1>Projet de cycle basketball Collège (1AC, 2AC, 3AC) — EPS Maroc (OP 2009)</h1>",
                1,
            )
        elif fn == "cycle-handball-college-eps-maroc.html":
            body = body.replace(
                "<h1>Projet de cycle handball — Collège EPS Maroc (10 séances, OP 2009)</h1>",
                "<h1>Projet de cycle handball Collège (1AC, 2AC, 3AC) — EPS Maroc (OP 2009)</h1>",
                1,
            )

        p.write_text(head + body, encoding="utf-8")
        print(f"OK {fn:46s} | T={len(t)} | D={len(d)}")


if __name__ == "__main__":
    main()
