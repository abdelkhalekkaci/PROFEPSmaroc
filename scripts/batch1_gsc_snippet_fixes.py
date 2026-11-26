#!/usr/bin/env python3
"""Batch 1: Surgical GSC striking-distance snippet, truncation & factual fixes.
Protects all top-earning GSC pages from unnecessary churn.
"""
import html
import json
import re
from pathlib import Path

ROOT = Path("public")

PROTECTED_WINNERS = [
    "orientations-pedagogiques-eps-2007-2009.html",
    "article-concours.html",
    "index.html",
    "generateur.html",
    "bibliotheque-numerique-eps.html",
]

UPDATES = {
    "article-op.html": {
        "title": "Fiche Synthèse OP EPS Maroc (2007 & 2009) – Concours CRMEF",
        "desc": "Synthèse claire des Orientations Pédagogiques EPS au Maroc (Collège 2009 & Lycée 2007) pour le concours CRMEF : OTI, OTC, compétences et grille d'analyse.",
        "fix_op_inversion": True,
    },
    "ar-orientations-pedagogiques-eps-maroc.html": {
        "title": "التوجيهات التربوية التربية البدنية 2007 و 2009 PDF | ProfEPS",
        "desc": "دليل التوجيهات التربوية لمادة التربية البدنية بالمغرب (الإعدادي 2009 والتأهيلي 2007) PDF: الكفايات OTI/OTC، الأهداف، توزيع الحصص وشبكات التقويم الشاملة.",
    },
    "article-criteres.html": {
        "title": "Critère de Réalisation vs Réussite en EPS (+ Tableau APS)",
        "desc": "Distinguez Critère de Réalisation (comment faire) et Critère de Réussite (indicateur chiffré) en EPS selon les OP 2007/2009 avec tableau comparatif par APS.",
    },
    "article-structure-seance.html": {
        "title": "Structure d'une Séance d'EPS (60 min) : 3 Parties & Modèle",
        "desc": "Réussir sa fiche de séance en EPS (OP 2007/2009) : partie introductive (10-15 min), fondamentale (35-40 min) et bilan final (5-10 min), avec fiche modèle PDF.",
    },
    "article-gestes-arbitres-basketball.html": {
        "title": "Gestes d'Arbitrage Basket-Ball FIBA (72 Signaux SVG + PDF)",
        "desc": "Planche illustrée des 72 gestes officiels d'arbitrage Basket-Ball FIBA en EPS : chronomètre, +1/+2/+3 pts, marcher, fautes et livret PDF A4 prêt à imprimer.",
    },
    "article-mas-pace-chart-track-lap-splits.html": {
        "title": "MAS Pace Chart & 400m Track Lap Splits (10–22 km/h Table)",
        "desc": "Free MAS / VMA pace chart: convert 10–22 km/h speeds into exact 100m, 200m, and 400m track lap splits (80%–120% MAS) with printable interval coaching tables.",
    },
    "article-6-minute-mas-test-protocol.html": {
        "title": "6-Minute MAS Test: Track Protocol, Formula & VMA Norms",
        "desc": "Run the 6-Minute MAS (Demi-Cooper) test: track cone setup, pacing rules, instant VMA formula (Distance/100), and age/level normative scoring chart.",
    },
    "article-test-vameval-vma.html": {
        "title": "Test VAMEVAL EPS : Paliers 20m, Bande Son MP3 & Calcul VMA",
        "desc": "Organisez le test VAMEVAL (Cazorla) en EPS : plots tous les 20m, tableau des paliers (+0,5 km/h/min), gestion de la bande son MP3 et fiche d'observation VMA.",
    },
    "article-course-duree-eps.html": {
        "title": "Cycle Course en Durée EPS Maroc : VMA, Séances & Barème /20",
        "desc": "Cycle complet de course en durée EPS au Maroc (Collège OP 2009 & Lycée OP 2007) : test VMA, gestion des allures, grille d'évaluation et barème officiel /20.",
    },
    "article-creer-ass.html": {
        "title": "Créer une Association Sportive Scolaire (ASS) au Maroc PDF",
        "desc": "Guide pratique pour créer une Association Sportive Scolaire (ASS) au Maroc : statuts types FRMSS, assemblée générale constitutive, bureau exécutif et budget.",
    },
    "qa-situation-apprentissage-eps.html": {
        "title": "Situation d'Apprentissage en EPS : Définition & Fiche Type",
        "desc": "Qu'est-ce qu'une situation d'apprentissage en EPS ? Définition OP 2007/2009, composantes (but, tâche, variables didactiques), critère de réussite et exemple.",
    },
    "ar-concours-crmef-eps-maroc.html": {
        "title": "مباراة التعليم 2026 تخصص التربية البدنية: التوصيف والديداكتيك",
        "desc": "الدليل الكامل لمباراة التعليم 2026 تخصص التربية البدنية بالمغرب (CRMEF): محاور التوصيف الرسمي، ديداكتيك المادة، علوم التربية، القوانين الفدرالية وQCM تفاعلي.",
    },
    "concours-crmef-hub.html": {
        "title": "Concours CRMEF Maroc 2026 : QCM Corrigés & 13 Spécialités",
        "desc": "Portail national Concours CRMEF Maroc 2026 (مباراة التعليم) : QCM corrigés en Sciences de l'Éducation, Didactique et Spécialité (EPS, Primaire et 13 matières).",
    },
}


def esc_attr(val: str) -> str:
    return html.escape(val, quote=True)


def replace_meta_tag(head: str, attr_name: str, attr_val: str, new_content: str) -> str:
    escaped = esc_attr(new_content)
    # Handle name/property before content OR content before name/property
    p1 = re.compile(
        rf'(<meta\b[^>]*\b{attr_name}=(["\']){re.escape(attr_val)}\2[^>]*\bcontent=)(["\']).*?\3',
        re.I | re.S,
    )
    if p1.search(head):
        return p1.sub(rf'\g<1>"{escaped}"', head, count=1)
    p2 = re.compile(
        rf'(<meta\b[^>]*\bcontent=)(["\']).*?\2([^>]*\b{attr_name}=(["\']){re.escape(attr_val)}\4)',
        re.I | re.S,
    )
    if p2.search(head):
        return p2.sub(rf'\g<1>"{escaped}"\g<3>', head, count=1)
    return head


def main():
    for fname in PROTECTED_WINNERS:
        assert fname not in UPDATES, f"Refusing to touch protected GSC winner: {fname}"

    for fname, cfg in UPDATES.items():
        t = cfg["title"]
        d = cfg["desc"]
        assert 40 <= len(t) <= 62, f"{fname} title length out of bounds ({len(t)}): {t}"
        assert 125 <= len(d) <= 160, f"{fname} desc length out of bounds ({len(d)}): {d}"

    for fname, cfg in UPDATES.items():
        path = ROOT / fname
        src = path.read_text(encoding="utf-8")
        head_end = src.find("</head>")
        assert head_end != -1, f"Missing </head> in {fname}"
        head = src[:head_end]
        body = src[head_end:]

        t = cfg["title"]
        d = cfg["desc"]
        assert 40 <= len(t) <= 62, f"{fname} title length out of bounds ({len(t)}): {t}"
        assert 125 <= len(d) <= 160, f"{fname} desc length out of bounds ({len(d)}): {d}"

        head = re.sub(
            r"<title>.*?</title>",
            lambda _m: f"<title>{html.escape(t, quote=False)}</title>",
            head,
            count=1,
            flags=re.S | re.I,
        )
        head = replace_meta_tag(head, "name", "description", d)
        head = replace_meta_tag(head, "property", "og:title", t)
        head = replace_meta_tag(head, "property", "og:description", d)
        head = replace_meta_tag(head, "name", "twitter:title", t)
        head = replace_meta_tag(head, "name", "twitter:description", d)

        if cfg.get("fix_op_inversion"):
            head = head.replace("Collège 2007 & Lycée 2009", "Collège 2009 & Lycée 2007")
            head = head.replace("Collège 2007 &amp; Lycée 2009", "Collège 2009 &amp; Lycée 2007")
            body = body.replace("Collège 2007 & Lycée 2009", "Collège 2009 & Lycée 2007")
            body = body.replace("Collège 2007 &amp; Lycée 2009", "Collège 2009 &amp; Lycée 2007")

        # Validate any JSON-LD blocks inside head
        for m in re.finditer(r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', head, re.S | re.I):
            json.loads(m.group(1))

        path.write_text(head + body, encoding="utf-8")
        print(f"OK {fname:48s} | T={len(t):2d} | D={len(d):3d}")


if __name__ == "__main__":
    main()
