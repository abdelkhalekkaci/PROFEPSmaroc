#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Étape 2A du Plan Directeur SEO ProfEPS Maroc :
1. Maillage Sémantique Croisé « Dossier APSA 360° » (Règlement 2026 <-> Cycle Collège OP 2009 <-> Cycle Lycée OP 2007 <-> Article Didactique <-> Générateur PDF/Word).
2. Déploiement du module « Intégrer ce Calculateur (Widget Embed HTML + Citation Académique CRMEF/ENS) » sur les 11 calculateurs sportifs et leur Hub pour générer des backlinks naturels.
Note stricte : Ne touche JAMAIS à `generateur.html`.
"""

import glob
import os
import re
import shutil

PUBLIC_DIR = "public"

# Définition des clusters APSA 360° (Règlement 2026, Cycle Collège, Cycle Lycée, Articles Didactiques, Calculateur associé)
APSA_CLUSTERS = [
    {
        "name": "Basketball",
        "icon": "🏀",
        "reglement": ("reglement-basketball-fiba-gestes-arbitrage-eps.html", "Règlement FIBA 2026 & 28 Gestes d'Arbitrage Basketball"),
        "college": ("cycle-basketball-college-eps-maroc.html", "Projet de Cycle Basketball Collège (1AC, 2AC, 3AC — OP 2009)"),
        "lycee": ("cycle-basketball-lycee-eps-maroc.html", "Projet de Cycle Basketball Lycée (TC, 1Bac, 2Bac — OP 2007)"),
        "articles": [
            ("article-basketball-eps.html", "Guide Didactique Basketball en EPS : Progressions & Situations"),
            ("article-gestes-arbitres-basketball.html", "Mémento des Gestes d'Arbitres Basketball & Feuille de Marque"),
        ],
        "calc": ("calculateur-asr-reserve-vitesse.html", "Calculateur Réserve de Vitesse Anaérobie (ASR Sports Co)"),
    },
    {
        "name": "Handball",
        "icon": "🤾",
        "reglement": ("reglement-handball-ihf-gestes-arbitrage-eps.html", "Règlement IHF 2026 & 17 Gestes d'Arbitrage Handball"),
        "college": ("cycle-handball-college-eps-maroc.html", "Projet de Cycle Handball Collège (1AC, 2AC, 3AC — OP 2009)"),
        "lycee": ("cycle-handball-lycee-eps-maroc.html", "Projet de Cycle Handball Lycée (TC, 1Bac, 2Bac — OP 2007)"),
        "articles": [
            ("article-handball-eps.html", "Guide Didactique Handball en EPS : 10 Séances & Barèmes"),
        ],
        "calc": ("generateur-intermittent-hiit-cod.html", "Générateur d'Intermittent HIIT & Changement de Direction (COD 180°)"),
    },
    {
        "name": "Volleyball",
        "icon": "🏐",
        "reglement": ("reglement-volleyball-fivb-gestes-arbitrage-eps.html", "Règlement FIVB 2026, Rotation & Gestes d'Arbitrage Volleyball"),
        "college": ("cycle-volleyball-college-eps-maroc.html", "Projet de Cycle Volleyball Collège (1AC, 2AC, 3AC — OP 2009)"),
        "lycee": ("cycle-volleyball-lycee-eps-maroc.html", "Projet de Cycle Volleyball Lycée (TC, 1Bac, 2Bac — OP 2007)"),
        "articles": [
            ("article-volleyball-eps.html", "Guide Didactique Volleyball en EPS : Situations & Évaluation"),
            ("article-arbitrage-volleyball.html", "Arbitrage Scolaire en Volleyball : Rôles & Organisation"),
            ("article-gestes-arbitres-volleyball.html", "Les Gestes Officiels des Arbitres de Volleyball en Images"),
        ],
        "calc": ("calculateur-charge-rpe-foster-acwr.html", "Calculateur de Charge RPE Foster & Prévention des Blessures"),
    },
    {
        "name": "Football",
        "icon": "⚽",
        "reglement": ("reglement-football-lois-jeu-ifab-arbitrage-eps.html", "les 17 Lois du Jeu IFAB 2026 & Arbitrage Football en EPS"),
        "college": ("cycle-football-college-eps-maroc.html", "Projet de Cycle Football Collège (1AC, 2AC, 3AC — OP 2009)"),
        "lycee": ("cycle-football-lycee-eps-maroc.html", "Projet de Cycle Football Lycée (TC, 1Bac, 2Bac — OP 2007)"),
        "articles": [
            ("article-football-eps.html", "Enseigner le Football en EPS au Maroc : Du Grappe au Jeu Structuré"),
        ],
        "calc": ("calculateur-asr-reserve-vitesse.html", "Calculateur ASR & Profilage Aérobie/Sprint en Sports Collectifs"),
    },
    {
        "name": "Futsal (Foot à 5)",
        "icon": "🥅",
        "reglement": ("reglement-futsal-fifa-arbitrage-eps.html", "Règlement Officiel Futsal FIFA 2026 (Fautes Cumulées, 4s, Gardien)"),
        "college": ("cycle-football-college-eps-maroc.html", "Projet de Cycle Football / Futsal Collège (OP 2009)"),
        "lycee": ("cycle-football-lycee-eps-maroc.html", "Projet de Cycle Football / Futsal Lycée (OP 2007)"),
        "articles": [
            ("article-football-eps.html", "Didactique du Football & Futsal sur Plateau Scolaire (40 élèves)"),
        ],
        "calc": ("generateur-intermittent-hiit-cod.html", "Générateur HIIT Court & Navettes COD 180° Spécial Futsal"),
    },
    {
        "name": "Rugby Scolaire & Tag Rugby",
        "icon": "🏉",
        "reglement": ("reglement-rugby-world-rugby-arbitrage-eps.html", "Règlement World Rugby 2026, Rugby Tag Sans Contact & Arbitrage EPS"),
        "college": ("cycle-rugby-college-eps-maroc.html", "Projet de Cycle Rugby Collège (1AC, 2AC, 3AC — OP 2009)"),
        "lycee": ("cycle-rugby-lycee-eps-maroc.html", "Projet de Cycle Rugby Lycée (TC, 1Bac, 2Bac — OP 2007)"),
        "articles": [
            ("article-rugby-eps-maroc.html", "Enseigner le Rugby en EPS au Maroc : Sécurité & Situations"),
        ],
        "calc": ("calculateur-asr-reserve-vitesse.html", "Calculateur Réserve de Vitesse Anaérobie (ASR Rugby)"),
    },
    {
        "name": "Badminton",
        "icon": "🏸",
        "reglement": ("reglement-badminton-bwf-arbitrage-eps.html", "Règlement BWF 2026 Badminton : Score 21 pts, Service & Arbitrage"),
        "college": ("cycle-badminton-college-eps-maroc.html", "Projet de Cycle Badminton Collège (1AC, 2AC, 3AC — OP 2009)"),
        "lycee": ("cycle-badminton-lycee-eps-maroc.html", "Projet de Cycle Badminton Lycée (TC, 1Bac, 2Bac — OP 2007)"),
        "articles": [
            ("article-badminton-eps.html", "Guide Didactique Badminton en EPS : Montante-Descendante & Grille"),
        ],
        "calc": ("calculateur-frequence-cardiaque-karvonen.html", "Calculateur de Zones Cardiaques (Formule de Karvonen)"),
    },
    {
        "name": "Tennis de Table",
        "icon": "🏓",
        "reglement": ("reglement-tennis-de-table-ittf-arbitrage-eps.html", "Règlement ITTF 2026 Tennis de Table : Service, Set 11 pts & Arbitrage"),
        "college": ("cycle-tennis-de-table-college-eps-maroc.html", "Projet de Cycle Tennis de Table Collège (1AC, 2AC, 3AC — OP 2009)"),
        "lycee": ("cycle-tennis-de-table-lycee-eps-maroc.html", "Projet de Cycle Tennis de Table Lycée (TC, 1Bac, 2Bac — OP 2007)"),
        "articles": [
            ("article-tennis-de-table-eps.html", "Enseigner le Tennis de Table en EPS : Tournois & Évaluation"),
        ],
        "calc": ("calculateur-charge-rpe-foster-acwr.html", "Calculateur de Charge Interne RPE Foster"),
    },
    {
        "name": "Basket 3x3 (Demi-Terrain)",
        "icon": "🏀",
        "reglement": ("reglement-basket-3x3-fiba-arbitrage-eps.html", "Règlement FIBA 3x3 Officiel 2026 : 12 Secondes, Check-Ball & 21 Points"),
        "college": ("cycle-basketball-college-eps-maroc.html", "Projet de Cycle Basketball Collège (OP 2009)"),
        "lycee": ("cycle-basketball-lycee-eps-maroc.html", "Projet de Cycle Basketball Lycée (OP 2007)"),
        "articles": [
            ("article-basket-3x3-eps.html", "Organiser un Cycle de Basket 3x3 en EPS pour les Grands Effectifs"),
        ],
        "calc": ("generateur-intermittent-hiit-cod.html", "Générateur d'Intermittent HIIT & Navettes COD 180°"),
    },
    {
        "name": "Beach-Volley & Volley Plein Air",
        "icon": "🏖️",
        "reglement": ("reglement-beach-volley-fivb-arbitrage-eps.html", "Règlement FIVB Beach-Volley 2026 : Terrain 16x8m, Block & Arbitrage"),
        "college": ("cycle-volleyball-college-eps-maroc.html", "Projet de Cycle Volleyball Collège (OP 2009)"),
        "lycee": ("cycle-volleyball-lycee-eps-maroc.html", "Projet de Cycle Volleyball Lycée (OP 2007)"),
        "articles": [
            ("article-beach-volley-eps.html", "Adapter le Beach-Volley et le Volley 2x2 / 3x3 en EPS"),
        ],
        "calc": ("calculateur-chaleur-meteo-altitude.html", "Calculateur Chaleur, Humidité & Hydratation en Plein Air"),
    },
    {
        "name": "Gymnastique au Sol",
        "icon": "🤸",
        "reglement": ("reglement-gymnastique-fig-code-pointage-eps.html", "Code de Pointage Gymnastique au Sol (Niveaux A, B, C, D) & Jury EPS"),
        "college": ("cycle-gymnastique-college-eps-maroc.html", "Projet de Cycle Gymnastique au Sol Collège (1AC, 2AC, 3AC — OP 2009)"),
        "lycee": ("cycle-gymnastique-lycee-eps-maroc.html", "Projet de Cycle Gymnastique au Sol Lycée (TC, 1Bac, 2Bac — OP 2007)"),
        "articles": [
            ("article-seance-gymnastique.html", "Construire un Cycle et une Fiche de Séance de Gymnastique en EPS"),
        ],
        "calc": ("calculateur-imc-sportif-masse-grasse.html", "Calculateur IMC Sportif & Composition Corporelle"),
    },
    {
        "name": "Course de Durée & Demi-Fond",
        "icon": "🏃",
        "reglement": ("reglement-course-fond-1500m-3000m-5000m-marathon-eps.html", "Règlement Course de Fond & Demi-Fond (1000m, 1500m, 3000m) & Barèmes Bac"),
        "college": ("cycle-course-duree-college-eps-maroc.html", "Projet de Cycle Course de Durée Collège (1AC, 2AC, 3AC — OP 2009)"),
        "lycee": ("cycle-course-duree-lycee-eps-maroc.html", "Projet de Cycle Course de Durée Lycée (TC, 1Bac, 2Bac — OP 2007)"),
        "articles": [
            ("article-course-duree-eps.html", "Enseigner la Course de Durée en EPS : VMA, Groupes & Barèmes"),
            ("article-test-vma-eps.html", "Comparatif des Tests VMA en EPS (Navette Luc Léger, VAMEVAL, Demi-Cooper)"),
        ],
        "calc": ("planificateur-seances-vma-groupes-eps.html", "Planificateur de Séances VMA par Groupes de Niveau en EPS"),
    },
    {
        "name": "Course de Vitesse & Sprint",
        "icon": "⚡",
        "reglement": ("reglement-course-vitesse-100m-200m-400m-athletisme-eps.html", "Règlement Course de Vitesse (60m, 80m, 100m, 200m, 400m) & Départ"),
        "college": ("cycle-course-vitesse-college-eps-maroc.html", "Projet de Cycle Course de Vitesse Collège (1AC, 2AC, 3AC — OP 2009)"),
        "lycee": ("cycle-course-vitesse-lycee-eps-maroc.html", "Projet de Cycle Course de Vitesse Lycée (TC, 1Bac, 2Bac — OP 2007)"),
        "articles": [
            ("article-fiche-seance-athletisme-eps.html", "Fiches de Séance d'Athlétisme en EPS : Sprint, Sauts & Lancers"),
        ],
        "calc": ("calculateur-asr-reserve-vitesse.html", "Calculateur Vitesse Maximale de Sprint (MSS) & Réserve Anaérobie"),
    },
    {
        "name": "Course de Haies",
        "icon": "🚧",
        "reglement": ("reglement-course-haies-100m-110m-400m-athletisme-eps.html", "Règlement Course de Haies (60m/80m/100m/110m Haies) & Hauteurs Scolaires"),
        "college": ("cycle-course-haies-college-eps-maroc.html", "Projet de Cycle Course de Haies Collège (1AC, 2AC, 3AC — OP 2009)"),
        "lycee": ("cycle-course-haies-lycee-eps-maroc.html", "Projet de Cycle Course de Haies Lycée (TC, 1Bac, 2Bac — OP 2007)"),
        "articles": [
            ("article-fiche-seance-athletisme-eps.html", "Didactique de l'Athlétisme Scolaire : Franchissement & Rythme 3 Appuis"),
        ],
        "calc": ("calculateur-asr-reserve-vitesse.html", "Calculateur de Vitesse & Profil Explosif Athlétisme"),
    },
    {
        "name": "Course de Relais (4x100m / 4x50m)",
        "icon": " baton ",
        "reglement": ("reglement-course-relais-4x100m-4x400m-1200m-athletisme-eps.html", "Règlement Course de Relais (Zone de Transmission 30m, Témoin & Arbitrage)"),
        "college": ("cycle-course-relais-college-eps-maroc.html", "Projet de Cycle Course de Relais Collège (1AC, 2AC, 3AC — OP 2009)"),
        "lycee": ("cycle-course-relais-lycee-eps-maroc.html", "Projet de Cycle Course de Relais Lycée (TC, 1Bac, 2Bac — OP 2007)"),
        "articles": [
            ("article-fiche-seance-athletisme-eps.html", "Organiser un Cycle de Relais Vitesse en EPS : Marques & Gain de Temps"),
        ],
        "calc": ("calculateur-asr-reserve-vitesse.html", "Calculateur de Vitesse de Sprint & Temps de Passage"),
    },
    {
        "name": "Saut en Longueur & Triple Saut",
        "icon": "👟",
        "reglement": ("reglement-saut-longueur-triple-saut-athletisme-eps.html", "Règlement Saut en Longueur & Triple Saut : Planche d'Appel, Mesure & Jury"),
        "college": ("cycle-saut-longueur-college-eps-maroc.html", "Projet de Cycle Saut en Longueur Collège (1AC, 2AC, 3AC — OP 2009)"),
        "lycee": ("cycle-saut-longueur-lycee-eps-maroc.html", "Projet de Cycle Saut en Longueur Lycée (TC, 1Bac, 2Bac — OP 2007)"),
        "articles": [
            ("article-fiche-seance-athletisme-eps.html", "Étalonnage de la Course d'Élan & Barèmes Saut en Longueur en EPS"),
        ],
        "calc": ("calculateur-asr-reserve-vitesse.html", "Calculateur Vitesse d'Approche & Puissance Membres Inférieurs"),
    },
    {
        "name": "Saut en Hauteur & Saut à la Perche",
        "icon": "📏",
        "reglement": ("reglement-saut-hauteur-perche-athletisme-eps.html", "Règlement Saut en Hauteur (Fosbury-Flop), Départage aux Essais & Jury EPS"),
        "college": ("cycle-saut-hauteur-college-eps-maroc.html", "Projet de Cycle Saut en Hauteur Collège (1AC, 2AC, 3AC — OP 2009)"),
        "lycee": ("cycle-saut-hauteur-lycee-eps-maroc.html", "Projet de Cycle Saut en Hauteur Lycée (TC, 1Bac, 2Bac — OP 2007)"),
        "articles": [
            ("article-fiche-seance-athletisme-eps.html", "Didactique du Saut en Hauteur en EPS : Course Courbe & Franchissement"),
        ],
        "calc": ("calculateur-imc-sportif-masse-grasse.html", "Calculateur Rapport Poids/Puissance & Composition Corporelle"),
    },
    {
        "name": "Lancer du Poids",
        "icon": "☄️",
        "reglement": ("reglement-lancer-poids-athletisme-bac-eps.html", "Règlement Lancer du Poids : Masses (3kg, 4kg, 5kg), Cercle 2,135m & Barèmes Bac"),
        "college": ("cycle-lancer-poids-college-eps-maroc.html", "Projet de Cycle Lancer du Poids Collège (1AC, 2AC, 3AC — OP 2009)"),
        "lycee": ("cycle-lancer-poids-lycee-eps-maroc.html", "Projet de Cycle Lancer du Poids Lycée (TC, 1Bac, 2Bac — OP 2007)"),
        "articles": [
            ("article-fiche-seance-athletisme-eps.html", "Sécurité, Chaîne Cinétique & Évaluation du Lancer du Poids au Bac"),
        ],
        "calc": ("calculateur-charge-rpe-foster-acwr.html", "Calculateur de Charge & Suivi d'Entraînement"),
    },
    {
        "name": "Lancers Longs (Disque, Javelot, Marteau)",
        "icon": "🥏",
        "reglement": ("reglement-lancers-disque-javelot-marteau-athletisme-eps.html", "Règlement Lancers Longs (Disque, Javelot, Marteau) : Secteurs & Sécurité EPS"),
        "college": ("cycle-lancer-poids-college-eps-maroc.html", "Projet de Cycle Lancers Athlétiques Collège (OP 2009)"),
        "lycee": ("cycle-lancer-poids-lycee-eps-maroc.html", "Projet de Cycle Lancers Athlétiques Lycée (OP 2007)"),
        "articles": [
            ("article-fiche-seance-athletisme-eps.html", "Organisation Sécurisée d'un Atelier de Lancers en EPS"),
        ],
        "calc": ("calculateur-charge-rpe-foster-acwr.html", "Calculateur de Charge & Prévention des Blessures Épaule"),
    },
]

# Liste des 11 calculateurs + Hub pour le module d'intégration (Widget Backlink + Citation Académique)
CALCULATOR_PAGES = {
    "calculateur-vma.html": (
        "Calculateur VMA (Léger-Boucher, Luc Léger, VAMEVAL, Demi-Cooper) & Allures EPS",
        "Calculez instantanément la Vitesse Maximale Aérobie (VMA), le VO2max et les temps de passage par plot pour vos classes d'EPS.",
    ),
    "planificateur-seances-vma-groupes-eps.html": (
        "Planificateur de Séances VMA par Groupes de Niveau en EPS (Plots, Distances & Temps)",
        "Générez vos tableaux de groupes VMA (90% à 120% VMA) prêts à imprimer pour le terrain scolaire.",
    ),
    "calculateur-vdot-asr-endurance.html": (
        "Calculateur VO2 Max & VDOT (Tables de Jack Daniels) — Allures d'Entraînement",
        "Estimez l'indice VDOT et les 5 zones d'allures physiologiques (E, M, T, I, R) selon le modèle de Jack Daniels.",
    ),
    "calculateur-asr-reserve-vitesse.html": (
        "Calculateur de Réserve de Vitesse Anaérobie (ASR — Buchheit) Spécial Sports Collectifs & Sprint",
        "Individualisez l'intermittent haute intensité à partir de la VMA et de la Vitesse Maximale de Sprint (MSS).",
    ),
    "calculateur-indice-endurance.html": (
        "Calculateur d'Indice d'Endurance (Modèle de Péronnet & Thibault)",
        "Analysez le profil aérobie (endurant vs résistant) et prédisez les performances du 800m au marathon.",
    ),
    "calculateur-frequence-cardiaque-karvonen.html": (
        "Calculateur de Fréquence Cardiaque d'Entraînement (Formule de Karvonen & FC de Réserve)",
        "Déterminez les 5 zones cardiaques cibles personnalisées à partir de la FC au repos et de la FC maximale.",
    ),
    "calculateur-imc-sportif-masse-grasse.html": (
        "Calculateur d'IMC Sportif, FFMI & Pourcentage de Masse Grasse (Deurenberg / US Navy)",
        "Évaluez la composition corporelle et l'indice de masse hors graisse (FFMI) chez l'adolescent et l'adulte sportif.",
    ),
    "calculateur-chaleur-meteo-altitude.html": (
        "Calculateur d'Impact Chaleur, Humidité (Point de Rosée) & Altitude sur la VMA",
        "Ajustez scientifiquement les allures de course en EPS lors des fortes chaleurs au Maroc.",
    ),
    "calculateur-gap-pente-nutrition.html": (
        "Calculateur d'Allure Ajustée à la Pente (GAP — Modèle de Minetti) & Coût Énergétique",
        "Convertissez l'allure sur côte ou descente en allure équivalente sur terrain plat.",
    ),
    "generateur-intermittent-hiit-cod.html": (
        "Générateur d'Intermittent HIIT (15/15, 30/30) & Pénalité de Changement de Direction (COD 180°)",
        "Calculez les distances exactes de navettes avec prise en compte du coût énergétique des virages à 180°.",
    ),
    "calculateur-charge-rpe-foster-acwr.html": (
        "Calculateur de Charge d'Entraînement sRPE (Foster), Monotonie, Contrainte & Ratio ACWR",
        "Surveillez la charge interne et prévenez le surentraînement et les blessures en milieu scolaire et fédéral.",
    ),
    "hub-outils-sport-performance.html": (
        "Hub des 11 Calculateurs Scientifiques de Physiologie du Sport & EPS (VMA, ASR, Karvonen, RPE)",
        "Suite complète et 100% gratuite de 11 outils de calcul physiologique pour les professeurs d'EPS et entraîneurs.",
    ),
}


def build_apsa_pillar_block(cluster: dict, current_file: str) -> str:
    name = cluster["name"]
    icon = cluster["icon"].strip()
    reg_file, reg_label = cluster["reglement"]
    col_file, col_label = cluster["college"]
    lyc_file, lyc_label = cluster["lycee"]
    calc_file, calc_label = cluster["calc"]

    links = [
        ("📜 Règlement 2026 & Arbitrage", reg_file, reg_label, "#991b1b", "#fef2f2", "#fecaca"),
        ("🏫 Cycle Collège (OP 2009)", col_file, col_label, "#065f46", "#ecfdf5", "#a7f3d0"),
        ("🎓 Cycle Lycée & Bac (OP 2007)", lyc_file, lyc_label, "#1e40af", "#eff6ff", "#bfdbfe"),
    ]
    for art_file, art_label in cluster["articles"][:2]:
        links.append(("📘 Guide Didactique & Séances", art_file, art_label, "#92400e", "#fffbeb", "#fde68a"))
    links.append(("⚡ Calculateur Physiologique", calc_file, calc_label, "#5b21b6", "#f5f3ff", "#ddd6fe"))
    links.append(("📄 Générateur Fiches PDF/Word", "generateur.html", f"Générer une fiche de séance ou un cycle {name} en PDF & Word (100% Gratuit)", "#0f172a", "#f8fafc", "#cbd5e1"))

    cards_html = []
    for badge, href, title, text_col, bg_col, border_col in links:
        is_current = (href == current_file)
        active_tag = ' <span style="font-size:0.68rem;background:#0f172a;color:#fff;padding:0.1rem 0.45rem;border-radius:99px;margin-left:0.35rem;">Page actuelle</span>' if is_current else ""
        cards_html.append(
            f"""<a href="{href}" style="display:flex;flex-direction:column;justify-content:space-between;padding:0.85rem 1rem;background:{'#f8fafc' if is_current else '#ffffff'};border:1.5px solid {border_col if is_current else '#e2e8f0'};border-radius:14px;text-decoration:none;transition:all 0.2s;">
        <span style="display:inline-block;font-size:0.7rem;font-weight:800;color:{text_col};background:{bg_col};border:1px solid {border_col};padding:0.15rem 0.55rem;border-radius:6px;width:fit-content;margin-bottom:0.4rem;">{badge}{active_tag}</span>
        <span style="font-size:0.84rem;font-weight:800;color:#0f172a;line-height:1.35;">{title} →</span>
      </a>"""
        )

    cards_joined = "\n      ".join(cards_html)
    return f"""<!-- PROFEPS_APSA_PILLAR_START -->
  <section id="peps-apsa-pillar-mesh" aria-label="Dossier complet {name} en EPS" style="max-width:1024px;margin:2rem auto;padding:1.35rem 1.5rem;background:linear-gradient(135deg,#fff8f8 0%,#f8fafc 55%,#f0fdf4 100%);border:1px solid #cbd5e1;border-radius:20px;box-shadow:0 4px 16px rgba(15,23,42,0.05);">
    <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.75rem;margin-bottom:1rem;">
      <div>
        <span style="font-size:0.72rem;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;color:#991b1b;">{icon} Hub Disciplinaire 360° — Conforme OP 2007/2009</span>
        <h2 style="font-size:1.15rem;font-weight:900;color:#0f172a;margin:0.15rem 0 0 0;">Dossier Complet {name} en EPS : Règlement 2026, Cycles Collège/Lycée &amp; Fiches PDF/Word</h2>
      </div>
      <a href="evaluation-eps.html" style="padding:0.45rem 0.9rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;font-size:0.76rem;font-weight:800;color:#0f172a;text-decoration:none;">📊 Barèmes &amp; Grilles /20 →</a>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(265px,1fr));gap:0.75rem;">
      {cards_joined}
    </div>
  </section>
<!-- PROFEPS_APSA_PILLAR_END -->"""


def inject_apsa_pillar_mesh():
    file_to_cluster = {}
    for cluster in APSA_CLUSTERS:
        file_to_cluster[cluster["reglement"][0]] = cluster
        file_to_cluster[cluster["college"][0]] = cluster
        file_to_cluster[cluster["lycee"][0]] = cluster
        for art_file, _ in cluster["articles"]:
            if art_file not in file_to_cluster:
                file_to_cluster[art_file] = cluster

    updated_count = 0
    for fname, cluster in file_to_cluster.items():
        if fname == "generateur.html":
            continue
        path = os.path.join(PUBLIC_DIR, fname)
        if not os.path.exists(path):
            continue
        with open(path, "r", encoding="utf-8") as f:
            html = f.read()

        block = build_apsa_pillar_block(cluster, fname)
        if "<!-- PROFEPS_APSA_PILLAR_START -->" in html:
            html = re.sub(
                r"<!-- PROFEPS_APSA_PILLAR_START -->[\s\S]*?<!-- PROFEPS_APSA_PILLAR_END -->",
                block,
                html,
            )
            updated_count += 1
        elif "<!-- PROFEPS_EEAT_AUTHOR_START -->" in html:
            html = html.replace(
                "<!-- PROFEPS_EEAT_AUTHOR_START -->",
                block + "\n  <!-- PROFEPS_EEAT_AUTHOR_START -->",
                1,
            )
            updated_count += 1
        elif "<!-- PROFEPS_RELATED_MESH_START -->" in html:
            html = html.replace(
                "<!-- PROFEPS_RELATED_MESH_START -->",
                block + "\n  <!-- PROFEPS_RELATED_MESH_START -->",
                1,
            )
            updated_count += 1
        elif "<footer" in html:
            html = html.replace("<footer", block + "\n  <footer", 1)
            updated_count += 1

        with open(path, "w", encoding="utf-8") as f:
            f.write(html)

    print(f"Injected 360° APSA Pillar Mesh across {updated_count} APSA pages (Règlements, Cycles, Articles).")


def build_calculator_embed_box(fname: str, title: str, desc: str) -> str:
    url = f"https://profeps.ma/{fname}"
    iframe_src = "https://profeps.ma/widget-vma.html" if fname == "calculateur-vma.html" else url
    embed_code = (
        f'<iframe src="{iframe_src}" width="100%" height="620" style="border:1px solid #cbd5e1;border-radius:16px;" loading="lazy" title="{title} - ProfEPS Maroc"></iframe>\n'
        f'<p style="font-size:12px;text-align:right;margin-top:4px;">Outil propulsé par <a href="{url}" target="_blank" rel="noopener">ProfEPS Maroc — {title}</a></p>'
    )
    embed_escaped = (
        embed_code.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )
    citation_text = (
        f"ELBOUDANI, A. (2026). {title}. Portail Scientifique et Didactique ProfEPS Maroc (Conforme OP 2007/2009). Consulté sur {url}"
    )

    return f"""<!-- PROFEPS_CALC_EMBED_START -->
  <section id="peps-embed-backlink-box" aria-label="Intégrer ou citer ce calculateur" style="max-width:1024px;margin:2rem auto;padding:1.35rem 1.5rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:18px;box-shadow:0 4px 14px rgba(15,23,42,0.04);">
    <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.75rem;margin-bottom:0.85rem;">
      <div>
        <span style="font-size:0.72rem;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;color:#065f46;background:#ecfdf5;padding:0.15rem 0.55rem;border-radius:6px;border:1px solid #a7f3d0;">🔗 Partage &amp; Référence Académique (100% Gratuit)</span>
        <h2 style="font-size:1.05rem;font-weight:900;color:#0f172a;margin:0.25rem 0 0 0;">Intégrer ce Calculateur sur votre Site/Blog ou le Citer dans un Mémoire CRMEF / ENS</h2>
      </div>
    </div>
    <p style="font-size:0.82rem;color:#475569;margin:0 0 1rem 0;line-height:1.5;">
      Vous êtes formateur au CRMEF, enseignant d'EPS, étudiant en Licence d'Éducation (LE-EPS) ou responsable d'un club sportif ? Vous pouvez intégrer gratuitement cet outil interactif sur votre site web ou le citer dans votre recherche action.
    </p>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:1rem;">
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:0.9rem;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.45rem;">
          <strong style="font-size:0.78rem;color:#0f172a;">💻 Code d'intégration HTML (Widget Blog / Site d'établissement)</strong>
          <button type="button" onclick="navigator.clipboard.writeText(this.parentElement.nextElementSibling.value);this.textContent='✔ Copié !';var b=this;setTimeout(function(){{b.textContent='📋 Copier le code';}},2000);" style="padding:0.25rem 0.65rem;background:#0f172a;color:#ffffff;border:none;border-radius:8px;font-size:0.72rem;font-weight:700;cursor:pointer;">📋 Copier le code</button>
        </div>
        <textarea readonly rows="3" style="width:100%;font-family:monospace;font-size:0.72rem;color:#334155;background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;padding:0.5rem;resize:none;">{embed_escaped}</textarea>
      </div>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:0.9rem;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.45rem;">
          <strong style="font-size:0.78rem;color:#0f172a;">🎓 Citation Bibliographique (Norme APA — Mémoire CRMEF / ENS)</strong>
          <button type="button" onclick="navigator.clipboard.writeText(this.parentElement.nextElementSibling.value);this.textContent='✔ Copié !';var b=this;setTimeout(function(){{b.textContent='📋 Copier la citation';}},2000);" style="padding:0.25rem 0.65rem;background:#991b1b;color:#ffffff;border:none;border-radius:8px;font-size:0.72rem;font-weight:700;cursor:pointer;">📋 Copier la citation</button>
        </div>
        <textarea readonly rows="3" style="width:100%;font-family:system-ui,sans-serif;font-size:0.75rem;color:#334155;background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;padding:0.5rem;resize:none;">{citation_text}</textarea>
      </div>
    </div>
  </section>
<!-- PROFEPS_CALC_EMBED_END -->"""


def inject_calculator_embeds():
    count = 0
    for fname, (title, desc) in CALCULATOR_PAGES.items():
        path = os.path.join(PUBLIC_DIR, fname)
        if not os.path.exists(path):
            continue
        with open(path, "r", encoding="utf-8") as f:
            html = f.read()

        embed_box = build_calculator_embed_box(fname, title, desc)
        if "<!-- PROFEPS_CALC_EMBED_START -->" in html:
            html = re.sub(
                r"<!-- PROFEPS_CALC_EMBED_START -->[\s\S]*?<!-- PROFEPS_CALC_EMBED_END -->",
                embed_box,
                html,
            )
            count += 1
        elif "<!-- PROFEPS_RELATED_MESH_START -->" in html:
            html = html.replace(
                "<!-- PROFEPS_RELATED_MESH_START -->",
                embed_box + "\n  <!-- PROFEPS_RELATED_MESH_START -->",
                1,
            )
            count += 1
        elif "<footer" in html:
            html = html.replace("<footer", embed_box + "\n  <footer", 1)
            count += 1

        with open(path, "w", encoding="utf-8") as f:
            f.write(html)

    print(f"Injected Calculator Embed & Academic Citation Widget across {count} calculator pages.")


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
    inject_apsa_pillar_mesh()
    inject_calculator_embeds()
    sync_public_to_root()
