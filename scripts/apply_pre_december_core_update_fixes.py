#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Surgical Pre-December 2026 Google Core Update Fixes (ProfEPS.ma)
Respects strict restraint against risky mass title/meta/content rewrites:
1. Boosts internal link equity (hub -> spoke) ONLY for the ~18 truly under-linked canonical pages:
   - alternative-gratuite-generateur-eps-maroc.html & comparatif-generateur-eps-gratuit-maroc.html
   - article-inspection-pedagogique-titularisation-eps-maroc.html
   - The 20 reglement-*.html official sports rules guides + cycle-badminton-lycee-eps-maroc.html
   - The 5 qa-*.html micro-guides
   - qcm-specialite-physique-chimie-maroc.html
2. Adds alternative-gratuite-generateur-eps-maroc.html card to blog.html.
3. Updates public/llms.txt (removes noindex widget-vma.html, adds Nov 2026 guides & under-linked resources).
"""

import os
import re

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC_DIR = os.path.join(ROOT_DIR, "public")


def insert_before_footer_or_marker(filepath: str, marker_id: str, html_block: str) -> bool:
    if not os.path.exists(filepath):
        return False
    with open(filepath, "r", encoding="utf-8") as f:
        c = f.read()
    if marker_id in c:
        return False

    for anchor in [
        "<!-- PROFEPS_EEAT_AUTHOR_START -->",
        "<!-- PROFEPS_STATUT2024_APS_SCOREBOARDS_MESH_START -->",
        '<footer class="footer" id="profeps-unified-footer">',
        "</body>",
    ]:
        if anchor in c:
            c = c.replace(anchor, html_block + "\n" + anchor, 1)
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(c)
            return True
    return False


# ------------------------------------------------------------------------------
# 1. Contextual Hub Block for APS Portal / Cycles / Programme / Evaluation / ATD
#    (Covers all 20 Sports Rules + 5 QA guides + Badminton Lycee + Generator guides)
# ------------------------------------------------------------------------------
HUB_RULES_AND_QA_BLOCK = """<!-- PROFEPS_PRE_DEC2026_RULES_QA_MESH_START -->
<section id="peps-rules-qa-mesh" aria-label="Règlements Fédéraux, Questions Fréquentes EPS et Outils Pédagogiques" style="max-width:1140px;margin:2rem auto;padding:1.5rem;background:var(--surface, #ffffff);border:1px solid var(--border, #cbd5e1);border-radius:16px;box-shadow:0 4px 14px rgba(15,23,42,0.04);">
  <div style="margin-bottom:1rem;padding-bottom:0.75rem;border-bottom:1px solid var(--border, #e2e8f0);">
    <span style="display:inline-block;font-size:0.74rem;font-weight:800;text-transform:uppercase;color:#1d4ed8;background:#eff6ff;padding:0.2rem 0.65rem;border-radius:6px;border:1px solid #bfdbfe;margin-bottom:0.35rem;">⚖️ Règlements Fédéraux 2026 &amp; Ressources Didactiques EPS</span>
    <h2 style="margin:0;font-size:1.18rem;font-weight:800;color:var(--text, #0f172a);">Répertoire des Règlements Officiels, Cycles &amp; Réponses OP 2007/2009</h2>
  </div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1rem;font-size:0.84rem;">
    <div style="background:var(--surface-alt, #f8fafc);padding:1rem;border-radius:12px;border:1px solid var(--border, #e2e8f0);">
      <strong style="display:block;color:var(--text, #0f172a);margin-bottom:0.5rem;">🏟️ Règlements Officiels &amp; Nouveautés 2026</strong>
      <div style="display:flex;flex-wrap:wrap;gap:0.35rem;">
        <a href="article-nouveautes-reglement-basketball-fiba-nba-2026.html" style="padding:0.24rem 0.55rem;background:#fff7ed;border:1px solid #fed7aa;border-radius:6px;color:#c2410c;font-weight:800;text-decoration:none;">🏀 Basketball FIBA &amp; NBA 2026</a>
        <a href="article-nouveautes-reglement-volleyball-fivb-2026.html" style="padding:0.24rem 0.55rem;background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;color:#1d4ed8;font-weight:800;text-decoration:none;">🏐 Volleyball Tests FIVB 2026</a>
        <a href="reglement-basketball-fiba-gestes-arbitrage-eps.html" style="padding:0.24rem 0.55rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;color:#0f172a;font-weight:700;text-decoration:none;">Basket FIBA 5×5</a>
        <a href="reglement-basket-3x3-fiba-arbitrage-eps.html" style="padding:0.24rem 0.55rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;color:#0f172a;font-weight:700;text-decoration:none;">Basket 3×3</a>
        <a href="reglement-volleyball-fivb-gestes-arbitrage-eps.html" style="padding:0.24rem 0.55rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;color:#0f172a;font-weight:700;text-decoration:none;">Volleyball FIVB</a>
        <a href="reglement-beach-volley-fivb-arbitrage-eps.html" style="padding:0.24rem 0.55rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;color:#0f172a;font-weight:700;text-decoration:none;">Beach-Volley FIVB</a>
        <a href="reglement-handball-ihf-gestes-arbitrage-eps.html" style="padding:0.24rem 0.55rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;color:#0f172a;font-weight:700;text-decoration:none;">Handball IHF</a>
        <a href="reglement-football-lois-jeu-ifab-arbitrage-eps.html" style="padding:0.24rem 0.55rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;color:#0f172a;font-weight:700;text-decoration:none;">Football IFAB</a>
        <a href="reglement-futsal-fifa-arbitrage-eps.html" style="padding:0.24rem 0.55rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;color:#0f172a;font-weight:700;text-decoration:none;">Futsal FIFA</a>
        <a href="reglement-rugby-world-rugby-arbitrage-eps.html" style="padding:0.24rem 0.55rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;color:#0f172a;font-weight:700;text-decoration:none;">Rugby World Rugby</a>
        <a href="reglement-badminton-bwf-arbitrage-eps.html" style="padding:0.24rem 0.55rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;color:#0f172a;font-weight:700;text-decoration:none;">Badminton BWF</a>
        <a href="reglement-tennis-de-table-ittf-arbitrage-eps.html" style="padding:0.24rem 0.55rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;color:#0f172a;font-weight:700;text-decoration:none;">Tennis de Table ITTF</a>
        <a href="reglement-gymnastique-fig-code-pointage-eps.html" style="padding:0.24rem 0.55rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;color:#0f172a;font-weight:700;text-decoration:none;">Gymnastique FIG</a>
        <a href="reglement-course-vitesse-100m-200m-400m-athletisme-eps.html" style="padding:0.24rem 0.55rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;color:#0f172a;font-weight:700;text-decoration:none;">Vitesse 100-400m</a>
        <a href="reglement-course-relais-4x100m-4x400m-1200m-athletisme-eps.html" style="padding:0.24rem 0.55rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;color:#0f172a;font-weight:700;text-decoration:none;">Relais 4×100m</a>
        <a href="reglement-course-haies-100m-110m-400m-athletisme-eps.html" style="padding:0.24rem 0.55rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;color:#0f172a;font-weight:700;text-decoration:none;">Courses de Haies</a>
        <a href="reglement-course-fond-1500m-3000m-5000m-marathon-eps.html" style="padding:0.24rem 0.55rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;color:#0f172a;font-weight:700;text-decoration:none;">Course de Fond</a>
        <a href="reglement-course-steeple-3000m-2000m-athletisme-eps.html" style="padding:0.24rem 0.55rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;color:#0f172a;font-weight:700;text-decoration:none;">Steeple 3000m</a>
        <a href="reglement-saut-longueur-triple-saut-athletisme-eps.html" style="padding:0.24rem 0.55rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;color:#0f172a;font-weight:700;text-decoration:none;">Longueur &amp; Triple Saut</a>
        <a href="reglement-saut-hauteur-perche-athletisme-eps.html" style="padding:0.24rem 0.55rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;color:#0f172a;font-weight:700;text-decoration:none;">Hauteur &amp; Perche</a>
        <a href="reglement-lancer-poids-athletisme-bac-eps.html" style="padding:0.24rem 0.55rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;color:#0f172a;font-weight:700;text-decoration:none;">Lancer du Poids</a>
        <a href="reglement-lancers-disque-javelot-marteau-athletisme-eps.html" style="padding:0.24rem 0.55rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;color:#0f172a;font-weight:700;text-decoration:none;">Disque, Javelot &amp; Marteau</a>
      </div>
    </div>
    <div style="background:var(--surface-alt, #f8fafc);padding:1rem;border-radius:12px;border:1px solid var(--border, #e2e8f0);">
      <strong style="display:block;color:var(--text, #0f172a);margin-bottom:0.5rem;">📘 Questions Pratiques EPS, Cycles &amp; Générateur</strong>
      <div style="display:flex;flex-wrap:wrap;gap:0.35rem;">
        <a href="qa-coefficient-eps-bac-maroc.html" style="padding:0.24rem 0.55rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;color:#0f172a;font-weight:700;text-decoration:none;">Coefficient EPS au Bac</a>
        <a href="qa-difference-op-2007-2009.html" style="padding:0.24rem 0.55rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;color:#0f172a;font-weight:700;text-decoration:none;">Différence OP 2007 vs 2009</a>
        <a href="qa-evaluation-eps-bac.html" style="padding:0.24rem 0.55rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;color:#0f172a;font-weight:700;text-decoration:none;">Évaluation EPS au Bac</a>
        <a href="qa-fiche-seance-eps.html" style="padding:0.24rem 0.55rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;color:#0f172a;font-weight:700;text-decoration:none;">Remplir une Fiche de Séance</a>
        <a href="qa-volume-horaire-eps-maroc.html" style="padding:0.24rem 0.55rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;color:#0f172a;font-weight:700;text-decoration:none;">Volume Horaire EPS</a>
        <a href="cycle-badminton-lycee-eps-maroc.html" style="padding:0.24rem 0.55rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;color:#0f172a;font-weight:700;text-decoration:none;">Cycle Badminton Lycée</a>
        <a href="cycle-basketball-lycee-eps-maroc.html" style="padding:0.24rem 0.55rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;color:#0f172a;font-weight:700;text-decoration:none;">Cycle Basketball Lycée</a>
        <a href="cycle-handball-lycee-eps-maroc.html" style="padding:0.24rem 0.55rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;color:#0f172a;font-weight:700;text-decoration:none;">Cycle Handball Lycée</a>
        <a href="comparatif-generateur-eps-gratuit-maroc.html" style="padding:0.24rem 0.55rem;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;color:#15803d;font-weight:800;text-decoration:none;">Comparatif Générateurs EPS</a>
        <a href="alternative-gratuite-generateur-eps-maroc.html" style="padding:0.24rem 0.55rem;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;color:#15803d;font-weight:800;text-decoration:none;">Alternative Gratuite Générateur EPS</a>
      </div>
    </div>
  </div>
</section>
<!-- PROFEPS_PRE_DEC2026_RULES_QA_MESH_END -->
"""

for hub in [
    "hub-aps-sports-eps-maroc.html",
    "programme-eps-maroc.html",
    "cycles-eps-maroc.html",
    "evaluation-eps.html",
    "ressources-atd.html",
    "hub-outils-sport-performance.html",
    "faq.html",
]:
    if insert_before_footer_or_marker(os.path.join(PUBLIC_DIR, hub), "PROFEPS_PRE_DEC2026_RULES_QA_MESH_START", HUB_RULES_AND_QA_BLOCK):
        print(f"Added rules/QA/generator mesh to {hub}")

# ------------------------------------------------------------------------------
# 2. Cross-link Generator Alternative & Comparatif with each other + articles
# ------------------------------------------------------------------------------
GEN_TOOLS_PAIR = """<!-- PROFEPS_PRE_DEC2026_GEN_GUIDES_START -->
<aside aria-label="Guides et comparatifs du générateur EPS" style="max-width:1024px;margin:1.5rem auto;padding:1.25rem 1.5rem;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:14px;">
  <strong style="display:block;font-size:1rem;color:#14532d;margin-bottom:0.5rem;">⚡ Préparer vos fiches de séance et projets de cycle (100% Gratuit)</strong>
  <div style="display:flex;flex-wrap:wrap;gap:0.65rem;">
    <a href="generateur.html" style="padding:0.55rem 0.95rem;background:#15803d;color:#ffffff;border-radius:8px;font-weight:700;font-size:0.86rem;text-decoration:none;">Ouvrir le Générateur EPS →</a>
    <a href="comparatif-generateur-eps-gratuit-maroc.html" style="padding:0.55rem 0.95rem;background:#ffffff;border:1px solid #bbf7d0;color:#166534;border-radius:8px;font-weight:700;font-size:0.86rem;text-decoration:none;">Comparatif des Générateurs EPS</a>
    <a href="alternative-gratuite-generateur-eps-maroc.html" style="padding:0.55rem 0.95rem;background:#ffffff;border:1px solid #bbf7d0;color:#166534;border-radius:8px;font-weight:700;font-size:0.86rem;text-decoration:none;">Alternative Gratuite Générateur EPS Maroc</a>
  </div>
</aside>
<!-- PROFEPS_PRE_DEC2026_GEN_GUIDES_END -->
"""

for fname in [
    "comparatif-generateur-eps-gratuit-maroc.html",
    "alternative-gratuite-generateur-eps-maroc.html",
    "qa-fiche-seance-eps.html",
    "article-structure-seance.html",
    "article-fiche-seance-athletisme-eps.html",
]:
    if insert_before_footer_or_marker(os.path.join(PUBLIC_DIR, fname), "PROFEPS_PRE_DEC2026_GEN_GUIDES_START", GEN_TOOLS_PAIR):
        print(f"Added generator comparison/alternative links to {fname}")

# ------------------------------------------------------------------------------
# 3. Link CAPEP Titularisation & Inspection + QCM Physique-Chimie cleanly
# ------------------------------------------------------------------------------
TITULARISATION_MESH = """<!-- PROFEPS_PRE_DEC2026_TITULARISATION_START -->
<aside aria-label="Dossiers Inspection Pédagogique & Titularisation CAPEP" style="max-width:1024px;margin:1.5rem auto;padding:1.25rem 1.5rem;background:#eff6ff;border:1px solid #bfdbfe;border-radius:14px;">
  <strong style="display:block;font-size:1rem;color:#1e3a8a;margin-bottom:0.5rem;">🏛️ Inspection Pédagogique, Titularisation (CAPEP) &amp; Carrière EPS</strong>
  <div style="display:flex;flex-wrap:wrap;gap:0.6rem;">
    <a href="article-inspection-pedagogique-titularisation-eps-maroc.html" style="padding:0.5rem 0.9rem;background:#1d4ed8;color:#ffffff;border-radius:8px;font-weight:700;font-size:0.86rem;text-decoration:none;">Guide Inspection &amp; Titularisation (التثبيت) →</a>
    <a href="inspection-pedagogique-notation-avancement-professeur-eps-maroc.html" style="padding:0.5rem 0.9rem;background:#ffffff;border:1px solid #bfdbfe;color:#1e3a8a;border-radius:8px;font-weight:700;font-size:0.86rem;text-decoration:none;">Notation &amp; Avancement Professeur EPS</a>
    <a href="article-examen-sortie-crmef-eps.html" style="padding:0.5rem 0.9rem;background:#ffffff;border:1px solid #bfdbfe;color:#1e3a8a;border-radius:8px;font-weight:700;font-size:0.86rem;text-decoration:none;">Examen de Sortie CRMEF EPS</a>
    <a href="cahier-de-textes-obligations-horaires-professeur-eps-maroc.html" style="padding:0.5rem 0.9rem;background:#ffffff;border:1px solid #bfdbfe;color:#1e3a8a;border-radius:8px;font-weight:700;font-size:0.86rem;text-decoration:none;">Cahier de Textes &amp; Obligations Horaires</a>
  </div>
</aside>
<!-- PROFEPS_PRE_DEC2026_TITULARISATION_END -->
"""

for fname in [
    "inspection-pedagogique-notation-avancement-professeur-eps-maroc.html",
    "concours-crmef-hub.html",
    "bibliotheque-sciences-education-crmef-pdf-maroc.html",
    "article-orientation-prof-eps.html",
    "article-examen-sortie-crmef-eps.html",
    "cahier-de-textes-obligations-horaires-professeur-eps-maroc.html",
    "responsabilite-civile-penale-professeur-eps-maroc.html",
    "article-oral-crmef-eps.html",
    "article-examen-pro.html",
]:
    if insert_before_footer_or_marker(os.path.join(PUBLIC_DIR, fname), "PROFEPS_PRE_DEC2026_TITULARISATION_START", TITULARISATION_MESH):
        print(f"Added titularisation career mesh to {fname}")

PC_QCM_MESH = """<!-- PROFEPS_PRE_DEC2026_PC_QCM_START -->
<aside aria-label="QCM Spécialité Physique-Chimie CRMEF" style="max-width:1024px;margin:1.5rem auto;padding:1.25rem 1.5rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:14px;">
  <strong style="display:block;font-size:0.98rem;color:#0f172a;margin-bottom:0.5rem;">⚗️ Préparation Concours CRMEF — Physique-Chimie (Collège &amp; Lycée)</strong>
  <div style="display:flex;flex-wrap:wrap;gap:0.6rem;">
    <a href="qcm-specialite-physique-chimie-maroc.html" style="padding:0.5rem 0.9rem;background:#0f172a;color:#ffffff;border-radius:8px;font-weight:700;font-size:0.85rem;text-decoration:none;">QCM Spécialité Physique-Chimie CRMEF →</a>
    <a href="qcm-didactique-physique-chimie-maroc.html" style="padding:0.5rem 0.9rem;background:#ffffff;border:1px solid #cbd5e1;color:#0f172a;border-radius:8px;font-weight:700;font-size:0.85rem;text-decoration:none;">QCM Didactique Physique-Chimie</a>
    <a href="orientations-pedagogiques-physique-chimie-college-2009.html" style="padding:0.5rem 0.9rem;background:#ffffff;border:1px solid #cbd5e1;color:#0f172a;border-radius:8px;font-weight:700;font-size:0.85rem;text-decoration:none;">OP Physique-Chimie Collège 2009</a>
    <a href="orientations-pedagogiques-physique-chimie-lycee-2007.html" style="padding:0.5rem 0.9rem;background:#ffffff;border:1px solid #cbd5e1;color:#0f172a;border-radius:8px;font-weight:700;font-size:0.85rem;text-decoration:none;">OP Physique-Chimie Lycée 2007</a>
  </div>
</aside>
<!-- PROFEPS_PRE_DEC2026_PC_QCM_END -->
"""

for fname in [
    "qcm-didactique-physique-chimie-maroc.html",
    "orientations-pedagogiques-physique-chimie-college-2009.html",
    "orientations-pedagogiques-physique-chimie-lycee-2007.html",
    "bibliotheque-sciences-education-crmef-pdf-maroc.html",
]:
    if insert_before_footer_or_marker(os.path.join(PUBLIC_DIR, fname), "PROFEPS_PRE_DEC2026_PC_QCM_START", PC_QCM_MESH):
        print(f"Added PC QCM links to {fname}")

# ------------------------------------------------------------------------------
# 4. Add missing card for alternative-gratuite-generateur-eps-maroc.html in blog.html
# ------------------------------------------------------------------------------
BLOG_PATH = os.path.join(PUBLIC_DIR, "blog.html")
with open(BLOG_PATH, "r", encoding="utf-8") as f:
    blog_html = f.read()

ALT_CARD = """                <article class="article-card" data-category="didactique">
                    <div class="article-visual article-didactique">
                        <span class="category-badge category-didactique">⚡ Alternative Gratuite · Word &amp; PDF</span>
                        <div class="article-icon">
                            <svg viewBox="0 0 24 24" fill="none"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" stroke="#15803d" stroke-width="2" stroke-linecap="round"/></svg>
                        </div>
                    </div>
                    <div class="article-content">
                        <h3 class="article-title">Alternative Gratuite au Générateur de Fiches EPS au Maroc (Word &amp; PDF, OP 2007/2009)</h3>
                        <p class="article-excerpt">Découvrez pourquoi le générateur gratuit ProfEPS.ma remplace avantageusement les abonnements payants pour produire vos fiches de séance et projets de cycle EPS.</p>
                        <div class="article-footer">
                            <span class="article-date">25 Novembre 2026</span>
                            <a href="alternative-gratuite-generateur-eps-maroc.html" class="read-more">Découvrir l'alternative →</a>
                        </div>
                    </div>
                </article>
"""

if "alternative-gratuite-generateur-eps-maroc.html" not in blog_html:
    anchor = 'href="comparatif-generateur-eps-gratuit-maroc.html"'
    idx = blog_html.find(anchor)
    if idx != -1:
        card_start = blog_html.rfind('<article class="article-card"', 0, idx)
        if card_start != -1:
            blog_html = blog_html[:card_start] + ALT_CARD + blog_html[card_start:]
            with open(BLOG_PATH, "w", encoding="utf-8") as f:
                f.write(blog_html)
            print("Added alternative-gratuite-generateur-eps-maroc.html card to blog.html")

# ------------------------------------------------------------------------------
# 5. Update public/llms.txt (remove widget-vma.html, append Nov 2026 additions)
# ------------------------------------------------------------------------------
LLMS_PATH = os.path.join(PUBLIC_DIR, "llms.txt")
with open(LLMS_PATH, "r", encoding="utf-8") as f:
    llms = f.read()

llms = re.sub(r"^.*https://profeps\.ma/widget-vma\.html.*\n?", "", llms, flags=re.M)

NEW_LLMS_LINES = [
    ("article-nouveautes-reglement-basketball-fiba-nba-2026.html",
     "- [Règlement Basketball 2026 : FIBA & NBA expliqués pour l'EPS](https://profeps.ma/article-nouveautes-reglement-basketball-fiba-nba-2026.html): Nouveautés officielles FIBA applicables le 1er octobre 2026 (faute disruptive DI, faute flagrante FL, catégories de fautes techniques, action de tir, IRS) et règles NBA récentes avec schémas SVG."),
    ("article-nouveautes-reglement-volleyball-fivb-2026.html",
     "- [Volleyball 2026 : Les Tests de Règles FIVB expliqués pour l'EPS](https://profeps.ma/article-nouveautes-reglement-volleyball-fivb-2026.html): Tests officiels FIVB 2026 (réception libre dès l'élan du serveur, ballon touchant le plafond, 8 remplacements, attaque stricte 9.2.2, double contact en 2e touche) distingués du code FIVB 2025-2028."),
    ("alternative-gratuite-generateur-eps-maroc.html",
     "- [Alternative Gratuite Générateur de Fiches EPS Maroc](https://profeps.ma/alternative-gratuite-generateur-eps-maroc.html): Générateur gratuit illimité de fiches de séance et projets de cycle EPS (Word/PDF) conforme aux OP 2007 et 2009."),
    ("comparatif-generateur-eps-gratuit-maroc.html",
     "- [Comparatif des Générateurs de Fiches EPS au Maroc](https://profeps.ma/comparatif-generateur-eps-gratuit-maroc.html): Comparaison complète des fonctionnalités, exports et conformité OP 2007/2009."),
    ("article-inspection-pedagogique-titularisation-eps-maroc.html",
     "- [Inspection Pédagogique & Titularisation EPS au Maroc](https://profeps.ma/article-inspection-pedagogique-titularisation-eps-maroc.html): Guide complet de réussite du CAPEP, rapport d'inspection, grille d'observation et préparation documentaire."),
    ("ar-inkhirat-moassassat-mohammed-6-fm6-wataiq-imtiyazat.html",
     "- [الانخراط في مؤسسة محمد السادس للنهوض بالأعمال الاجتماعية (FM6)](https://profeps.ma/ar-inkhirat-moassassat-mohammed-6-fm6-wataiq-imtiyazat.html): الوثائق، الشروط، الامتيازات السكنية والصحية والمنح للأساتذة بالمغرب."),
    ("ar-istirjaa-dariba-ir-asatida-maroc.html",
     "- [الاسترجاع الضريبي على الدخل للأساتذة بالمغرب (IR)](https://profeps.ma/ar-istirjaa-dariba-ir-asatida-maroc.html): مسطرة ووثائق استرجاع الضريبة على الدخل (قروض السكن أو التغطية) عبر المديرية العامة للضرائب."),
    ("ar-tasjil-taadodiya-cnops-mgen-wataiq-taawidat.html",
     "- [التسجيل في التعاضدية العامة وكنوبس (CNOPS - MGEN)](https://profeps.ma/ar-tasjil-taadodiya-cnops-mgen-wataiq-taawidat.html): وثائق الانخراط، ملفات المرض، التحملات والتعويضات العائلية لأسرة التعليم."),
    ("ar-tgr-eservices-tafil-cnie-shahadat-ojra-maroc.html",
     "- [بوابة الخزينة العامة للمملكة (TGR eServices) وتفعيل البطاقة الوطنية](https://profeps.ma/ar-tgr-eservices-tafil-cnie-shahadat-ojra-maroc.html): كيفية استخراج شهادة الأجرة ووضعية الرتبة والدرجة للأساتذة."),
]

added_llms = 0
for slug, line in NEW_LLMS_LINES:
    if slug not in llms:
        if not llms.endswith("\n"):
            llms += "\n"
        llms += line + "\n"
        added_llms += 1

with open(LLMS_PATH, "w", encoding="utf-8") as f:
    f.write(llms)
print(f"Updated public/llms.txt (added {added_llms} entries, removed widget-vma.html).")
