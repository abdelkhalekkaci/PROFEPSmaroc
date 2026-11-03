#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Étape 1 du Plan Directeur SEO ProfEPS Maroc :
1. Garde-fou terminologique (« Conforme aux OP 2007/2009 (MENPS Maroc) » au lieu de mentions ambiguës « Officiel » / « Direction des Curricula »).
2. Correction des liens doublons sur la page d'accueil (`index.html`).
3. Optimisation CTR (Axe 3 : mise en avant « 100% Gratuit (PDF & Word) » dans les balises <title> et <meta description> des pages piliers).
4. Déploiement du bloc Auteur & Sources E-E-A-T vérifiable (Abdelkhalek ELBOUDANI, Professeur d'EPS au Maroc + sources OP 2007/2009 & Fédérations + date de révision explicite) sur tous les articles du blog et guides didactiques.
Note stricte : Ne touche JAMAIS à `generateur.html`.
"""

import glob
import json
import os
import re
import shutil

PUBLIC_DIR = "public"


def update_meta_tags(html: str, new_title: str, new_desc: str) -> str:
    html = re.sub(r"<title>.*?</title>", f"<title>{new_title}</title>", html, count=1, flags=re.DOTALL)
    html = re.sub(
        r'<meta\s+name="description"\s+content="[^"]*"\s*/?>',
        f'<meta name="description" content="{new_desc}">',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta\s+property="og:title"\s+content="[^"]*"\s*/?>',
        f'<meta property="og:title" content="{new_title}">',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta\s+property="og:description"\s+content="[^"]*"\s*/?>',
        f'<meta property="og:description" content="{new_desc}">',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta\s+name="twitter:title"\s+content="[^"]*"\s*/?>',
        f'<meta name="twitter:title" content="{new_title}">',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta\s+name="twitter:description"\s+content="[^"]*"\s*/?>',
        f'<meta name="twitter:description" content="{new_desc}">',
        html,
        count=1,
    )
    return html


def process_index_html():
    path = os.path.join(PUBLIC_DIR, "index.html")
    with open(path, "r", encoding="utf-8") as f:
        html = f.read()

    # 1. CTR Title & Meta Description (100% Gratuit + PDF & Word + OP 2007/2009)
    new_title = "Fiche de Séance &amp; Cycle EPS Maroc : Générateur 100% Gratuit (PDF/Word) &amp; OP 2007/2009 | ProfEPS"
    new_desc = (
        "Portail N°1 de l'EPS au Maroc (100% Gratuit) : générateur de fiches de séance et projets de cycles "
        "en PDF & Word, Orientations Pédagogiques 2007/2009, 11 calculateurs VMA, 20 règlements APSA et QCM CRMEF."
    )
    html = update_meta_tags(html, new_title, new_desc)

    # 2. Garde-fou terminologique sur index.html
    html = html.replace(
        '<span class="text-emerald-600 font-black">✔</span> Direction des Curricula (MENPS)',
        '<span class="text-emerald-600 font-black">✔</span> Conforme aux OP 2007/2009 (MENPS Maroc)',
    )
    html = html.replace(
        "<p class=\"text-xs text-slate-500 mt-1\">Direction des Curricula · Ministère de l'Éducation Nationale</p>",
        "<p class=\"text-xs text-slate-500 mt-1\">Conforme au référentiel des OP (MENPS Maroc)</p>",
    )

    # 3. Correction des ancres doublons dans les 2 cartes OP (Collège 2009 & Lycée 2007)
    old_college_links = """          <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
            <a href="orientations-pedagogiques-eps-2007-2009.html" class="text-xs font-bold text-red-700 hover:underline">
              Lire le document complet →
            </a>
            <a href="orientations-pedagogiques-eps-2007-2009.html" class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold">
              Consulter en ligne
            </a>
          </div>"""
    new_college_links = """          <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
            <a href="cycles-eps-maroc.html" class="text-xs font-bold text-red-700 hover:underline">
              Voir les 13 cycles Collège (OP 2009) →
            </a>
            <a href="orientations-pedagogiques-eps-2007-2009.html" class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold">
              Synthèse OP 2009 Collège
            </a>
          </div>"""
    html = html.replace(old_college_links, new_college_links)

    old_lycee_links = """          <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
            <a href="orientations-pedagogiques-eps-2007-2009.html" class="text-xs font-bold text-emerald-700 hover:underline">
              Lire le document complet →
            </a>
            <a href="orientations-pedagogiques-eps-2007-2009.html" class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold">
              Consulter en ligne
            </a>
          </div>"""
    new_lycee_links = """          <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
            <a href="article-difference-op-2007-2009-eps.html" class="text-xs font-bold text-emerald-700 hover:underline">
              Comparatif OP 2007 vs OP 2009 →
            </a>
            <a href="orientations-pedagogiques-eps-2007-2009.html" class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold">
              Synthèse OP 2007 Lycée
            </a>
          </div>"""
    html = html.replace(old_lycee_links, new_lycee_links)

    with open(path, "w", encoding="utf-8") as f:
        f.write(html)
    print("Updated index.html (CTR meta + OP compliance + deduplicated OP anchor links)")


def process_strategic_pages():
    updates = {
        "cycles-eps-maroc.html": (
            "Projets de Cycles EPS Maroc Collège &amp; Lycée (100% Gratuit PDF/Word) — OP 2007/2009 | ProfEPS",
            "Téléchargez gratuitement en PDF et Word vos projets de cycles et séquences EPS pour le Collège (1AC, 2AC, 3AC - OP 2009) et le Lycée (TC, 1Bac, 2Bac - OP 2007) au Maroc.",
        ),
        "evaluation-eps.html": (
            "Grilles d'Évaluation &amp; Barèmes EPS Maroc (100% Gratuit PDF/Word) — OP 2007/2009 | ProfEPS",
            "Grilles d'évaluation diagnostique et sommative EPS au Maroc (Collège /20, Lycée & Bac Sport) : barèmes officiels athlétisme, sports collectifs et gymnastique conformes aux OP 2007/2009.",
        ),
        "orientations-pedagogiques-eps-2007-2009.html": (
            "Orientations Pédagogiques EPS Maroc 2007 (Lycée) &amp; 2009 (Collège) PDF Gratuit | ProfEPS",
            "Consultez et téléchargez gratuitement la synthèse complète et les PDF des Orientations Pédagogiques EPS au Maroc : OP 2009 Collège (1AC-3AC) et OP 2007 Lycée (TC-2Bac) avec OTI, OTC et barèmes.",
        ),
        "bibliotheque-numerique-eps.html": (
            "Bibliothèque Numérique EPS Maroc : OP 2007/2009, Cahier Journal &amp; Fiches PDF/Word Gratuites | ProfEPS",
            "Bibliothèque 100% gratuite de documents EPS au Maroc : Orientations Pédagogiques 2007 et 2009 PDF, cahier journal, grilles d'évaluation, règlements APSA 2026 et guides ASS.",
        ),
        "blog.html": (
            "Blog Didactique EPS Maroc : 113 Guides, Règlements APSA 2026, Cycles &amp; Physiologie VMA | ProfEPS",
            "113 dossiers pédagogiques et scientifiques pour les professeurs d'EPS au Maroc : 20 règlements officiels & gestes d'arbitrage, 26 cycles OP 2007/2009, physiologie VMA et concours CRMEF.",
        ),
        "a-propos.html": (
            "À Propos d'Abdelkhalek ELBOUDANI &amp; ProfEPS Maroc | Comité Pédagogique &amp; Charte E-E-A-T",
            "Découvrez le parcours d'Abdelkhalek ELBOUDANI (Professeur d'EPS au Maroc) et la méthodologie scientifique de ProfEPS : outils VMA, générateur PDF/Word 100% gratuit et conformité OP 2007/2009.",
        ),
    }

    for filename, (title, desc) in updates.items():
        path = os.path.join(PUBLIC_DIR, filename)
        if not os.path.exists(path):
            continue
        with open(path, "r", encoding="utf-8") as f:
            html = f.read()
        html = update_meta_tags(html, title, desc)
        with open(path, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"Updated strategic CTR meta tags in {filename}")


def build_eeat_author_card(filename: str) -> str:
    if filename.startswith("reglement-"):
        source_badge = "Lois du Jeu Fédérales 2025-2026 (IFAB, IHF, FIBA, FIVB, World Athletics, FIG, BWF, ITTF) & OP EPS Maroc (2007/2009)"
        rev_date = "Novembre 2026"
    elif filename.startswith("cycle-"):
        source_badge = "Orientations Pédagogiques EPS Maroc — OP 2009 (Collège 1AC-3AC) & OP 2007 (Lycée TC-2Bac) · MENPS"
        rev_date = "Octobre 2026"
    elif "crmef" in filename or "concours" in filename or "qcm" in filename:
        source_badge = "Cadre Référentiel CNEE des Concours d'Accès aux CRMEF, Loi-Cadre 51-17 & OP EPS 2007/2009"
        rev_date = "Octobre 2026"
    else:
        source_badge = "Orientations Pédagogiques EPS 2007/2009 (MENPS Maroc) & Littérature Scientifique en Physiologie de l'Effort"
        rev_date = "Octobre 2026"

    return f"""<!-- PROFEPS_EEAT_AUTHOR_START -->
  <aside id="peps-eeat-author-card" aria-label="Auteur et vérification pédagogique" style="max-width:1024px;margin:1.75rem auto;padding:1.25rem 1.5rem;background:#ffffff;border:1px solid #e2e8f0;border-left:4px solid #c1272d;border-radius:16px;box-shadow:0 2px 10px rgba(15,23,42,0.04);">
    <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;">
      <div style="display:flex;align-items:center;gap:0.9rem;">
        <a href="a-propos.html" style="width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,#991b1b,#006233);color:#ffffff;font-weight:900;font-size:1.05rem;display:flex;align-items:center;justify-content:center;text-decoration:none;flex-shrink:0;">AE</a>
        <div>
          <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.5rem;">
            <span style="font-size:0.72rem;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;color:#991b1b;background:#fef2f2;padding:0.15rem 0.55rem;border-radius:6px;border:1px solid #fecaca;">✔ Contenu Vérifié E-E-A-T</span>
            <span style="font-size:0.75rem;color:#64748b;font-weight:600;">Révision pédagogique : <time datetime="2026-11">{rev_date}</time></span>
          </div>
          <p style="margin:0.25rem 0 0 0;font-size:0.92rem;font-weight:800;color:#0f172a;">
            Rédigé et validé par <a href="a-propos.html" style="color:#991b1b;text-decoration:underline;">Abdelkhalek ELBOUDANI</a> — Professeur d'EPS au Maroc &amp; Fondateur de ProfEPS
          </p>
          <p style="margin:0.2rem 0 0 0;font-size:0.78rem;color:#475569;line-height:1.45;">
            <strong>Sources &amp; Référentiels :</strong> {source_badge}.
          </p>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem;">
        <a href="a-propos.html" style="padding:0.45rem 0.85rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:10px;font-size:0.76rem;font-weight:700;color:#1e293b;text-decoration:none;">Charte &amp; Auteur →</a>
        <a href="orientations-pedagogiques-eps-2007-2009.html" style="padding:0.45rem 0.85rem;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;font-size:0.76rem;font-weight:700;color:#166534;text-decoration:none;">OP 2007/2009</a>
      </div>
    </div>
  </aside>
<!-- PROFEPS_EEAT_AUTHOR_END -->"""


def process_articles_eeat_and_terminology():
    skip_files = {
        "generateur.html",  # NE JAMAIS TOUCHER AU GENERATEUR
        "index.html",
        "blog.html",
        "a-propos.html",
        "contact.html",
        "cgu.html",
        "mentions-legales.html",
        "politique-confidentialite.html",
        "widget-vma.html",
    }

    count_eeat = 0
    for path in sorted(glob.glob(os.path.join(PUBLIC_DIR, "*.html"))):
        fname = os.path.basename(path)
        if fname in skip_files:
            continue

        with open(path, "r", encoding="utf-8") as f:
            html = f.read()

        orig = html

        # 1. Clean up ambiguous "Guide Officiel" terminology in headings/JSON-LD
        html = html.replace(
            "Guide Officiel du Juge de Relais & Arbitrage Piste (FFA / World Athletics)",
            "Référentiel Fédéral du Juge de Relais & Arbitrage Piste (FFA / World Athletics)",
        )
        html = html.replace(
            "Guide Officiel des Juges de Lancers Longs (FFA / World Athletics)",
            "Référentiel Fédéral des Juges de Lancers Longs (FFA / World Athletics)",
        )
        html = html.replace(
            "Orientations Pédagogiques EPS Maroc 2007-2009 | Guide Officiel",
            "Orientations Pédagogiques EPS Maroc 2007-2009 | Guide Complet Conforme aux OP",
        )

        # 2. Inject E-E-A-T Author & Verification Card on content pages
        is_content_page = (
            fname.startswith("article-")
            or fname.startswith("reglement-")
            or fname.startswith("cycle-")
            or fname.startswith("howto-")
            or fname.startswith("qa-")
            or fname in {
                "allure-ajustee-pente-gap-modele-minetti.html",
                "charge-entrainement-rpe-foster-monotonie-acwr.html",
                "courir-forte-chaleur-point-de-rosee-altitude.html",
                "formule-karvonen-zones-cardiaques-fc-reserve.html",
                "imc-sportif-masse-grasse-formule-deurenberg.html",
                "indice-endurance-peronnet-thibault-vma.html",
                "intermittent-hiit-changement-direction-cod.html",
                "methode-vdot-jack-daniels-calcul-allures.html",
                "reserve-vitesse-anaerobie-asr-sports-co.html",
                "vma-differencier-course-duree-eps.html",
                "orientations-pedagogiques-eps-2007-2009.html",
                "programme-eps-maroc.html",
                "evaluation-eps.html",
                "securite-eps.html",
                "ressources-atd.html",
                "concours-eps-maroc.html",
            }
        )

        if is_content_page:
            card_html = build_eeat_author_card(fname)
            if "<!-- PROFEPS_EEAT_AUTHOR_START -->" in html:
                html = re.sub(
                    r"<!-- PROFEPS_EEAT_AUTHOR_START -->[\s\S]*?<!-- PROFEPS_EEAT_AUTHOR_END -->",
                    card_html,
                    html,
                )
                count_eeat += 1
            elif "<!-- PROFEPS_RELATED_MESH_START -->" in html:
                html = html.replace(
                    "<!-- PROFEPS_RELATED_MESH_START -->",
                    card_html + "\n  <!-- PROFEPS_RELATED_MESH_START -->",
                    1,
                )
                count_eeat += 1
            elif "<footer" in html:
                html = html.replace("<footer", card_html + "\n  <footer", 1)
                count_eeat += 1

        if html != orig:
            with open(path, "w", encoding="utf-8") as f:
                f.write(html)

    print(f"Injected/updated E-E-A-T Author & Verification Card across {count_eeat} articles & guides.")


def sync_public_to_root():
    synced = 0
    for path in sorted(glob.glob(os.path.join(PUBLIC_DIR, "*.html"))):
        fname = os.path.basename(path)
        if fname == "generateur.html":
            continue
        shutil.copy2(path, fname)
        synced += 1
    print(f"Synced {synced} HTML files from public/ to workspace root / (generateur.html untouched).")


if __name__ == "__main__":
    process_index_html()
    process_strategic_pages()
    process_articles_eeat_and_terminology()
    sync_public_to_root()
