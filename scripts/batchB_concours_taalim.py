#!/usr/bin/env python3
"""Batch B: Upgrade existing QCM & Concours pages to capture 'Concours Taalim 2026'
across Primaire, Français, Maths, SVT, Économie & Gestion, Didactique & Sciences de l'Éducation.
"""
import html
import re
from pathlib import Path

ROOT = Path("public")

TARGETS = {
    "qcm-concours-crmef.html": (
        "Concours Taalim 2026 : QCM Didactique & Sciences Éducation",
        "Préparation Concours Taalim 2026 (CRMEF Maroc) : simulateur QCM corrigés en Didactique et Sciences de l'Éducation (toutes spécialités) selon le Tawsif 2026.",
    ),
    "qcm-sciences-education-crmef.html": (
        "QCM Sciences Éducation – Concours Taalim 2026 (CRMEF PDF)",
        "QCM Sciences de l'Éducation corrigés pour le Concours Taalim 2026 (CRMEF Maroc) : théories d'apprentissage, Loi-Cadre 51.17, APC et Écoles Pionnières PDF.",
    ),
    "qcm-didactique-primaire-maroc.html": (
        "Concours Taalim Primaire 2026 : QCM Didactique & Annales",
        "Préparation Concours Taalim Primaire 2026 (CRMEF Maroc) : QCM didactique corrigés (Arabe, Français, Maths, Sciences), TaRL, Écoles Pionnières et exemples PDF.",
    ),
    "qcm-specialite-primaire-maroc.html": (
        "Concours Taalim Primaire 2026 : QCM Spécialité & Exemples",
        "Sujets et QCM Spécialité Enseignement Primaire Concours Taalim 2026 (CRMEF) : épreuves corrigées de français, arabe, maths, sciences et préparation PDF.",
    ),
    "qcm-didactique-francais-maroc.html": (
        "Concours Taalim Français 2026 : QCM Didactique Collège",
        "Exemple Concours Taalim Français Collège & Lycée 2026 (CRMEF) : QCM corrigés en didactique du français, lecture méthodique, langue, production écrite et Tawsif.",
    ),
    "qcm-specialite-francais-maroc.html": (
        "Concours d'Enseignement Français 2026 : QCM & Exemples",
        "Concours Taalim 2026 Spécialité Français (CRMEF Maroc) : exemples corrigés d'enseignement secondaire français, grammaire, littérature et annales PDF.",
    ),
    "qcm-didactique-maths-maroc.html": (
        "Concours Taalim Math 2026 : QCM Didactique & Tawsif PDF",
        "Concours Taalim 2026 Maths (CRMEF Maroc) : QCM corrigés de didactique des mathématiques, situations-problèmes, obstacles didactiques et Tawsif officiel PDF.",
    ),
    "qcm-specialite-maths-maroc.html": (
        "Concours Taalim 2026 Math : QCM Spécialité & Annales",
        "Entraînement Concours Taalim 2026 Mathématiques (CRMEF Maroc) : 100 QCM corrigés en analyse, algèbre, probabilités, géométrie et exemples de sujets PDF.",
    ),
    "qcm-didactique-svt-maroc.html": (
        "Concours Taalim 2026 SVT : QCM Didactique & Démarche PDF",
        "Concours Taalim 2026 SVT (CRMEF Maroc) : QCM corrigés de didactique SVT, démarche d'investigation OHERIC, travaux pratiques et grilles du Tawsif officiel.",
    ),
    "qcm-specialite-svt-maroc.html": (
        "Concours Taalim 2026 SVT : QCM Spécialité & Exemples PDF",
        "Révision Concours Taalim 2026 SVT (CRMEF Maroc) : QCM corrigés en biologie cellulaire, génétique, physiologie, géologie marocaine et sujets d'annales PDF.",
    ),
    "qcm-didactique-economie-gestion-maroc.html": (
        "Concours Taalim Économie & Gestion 2026 : QCM Didactique",
        "Concours Taalim Économie et Gestion 2026 (CRMEF Maroc) : QCM corrigés de didactique SESG, comptabilité, management, approche par compétences et Tawsif PDF.",
    ),
    "qcm-specialite-economie-gestion-maroc.html": (
        "Concours Taalim Économie & Gestion 2026 : QCM Spécialité",
        "Préparation Concours Taalim Économie et Gestion 2026 (CRMEF) : QCM corrigés de microéconomie, macroéconomie, comptabilité générale et annales du concours.",
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
    for fn, (t, d) in TARGETS.items():
        assert 40 <= len(t) <= 62, f"{fn} title length {len(t)}: {t}"
        assert 130 <= len(d) <= 160, f"{fn} desc length {len(d)}: {d}"
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

        p.write_text(head + body, encoding="utf-8")
        print(f"OK {fn:46s} | T={len(t)} | D={len(d)}")


if __name__ == "__main__":
    main()
