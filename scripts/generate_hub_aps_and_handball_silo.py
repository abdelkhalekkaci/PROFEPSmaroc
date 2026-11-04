#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Création du Nouveau Silo APS & Sports Scolaires — ProfEPS Maroc (profeps.ma)
1. /public/hub-aps-sports-eps-maroc.html : Hub central des APS (Sports Collectifs, Athlétisme, Gymnastique)
2. /public/aps-handball-eps-maroc.html : Page Silo Complète du Handball en EPS au Maroc :
   - Intro pédagogique + Dimensions & Matériel officiel + Navigation UX en 5 volets fluides
   - Volet 1 : ATD Complet du Handball (Logique interne, Problèmes fondamentaux, Enjeux, 4 Niveaux, Export PDF/Word)
   - Volet 2 : Studio Interactif des Cycles & Fiches Pédagogiques (6 Niveaux scolaires : 1AC, 2AC, 3AC, TC, 1Bac, 2Bac
               × 4 Niveaux de pratique : Débutant, Débrouillé, Confirmé, Élite = 24 Cycles & 240 Séances)
               avec Visionneuse Pro A4 en direct avant téléchargement + Boutons Export Word (.doc) et PDF (A4)
   - Volet 3 : Grilles d'Observation Diagnostique & Grilles d'Évaluation Sommative (/20 Collège OP 2009, Lycée OP 2007, Dispensés)
               avec Visionneuse Pro A4 + Export Word (.doc) et PDF (A4)
   - Volet 4 : Guide Terrain Maroc (Grands effectifs 40+ élèves, Échauffement spécifique, Arbitrage IHF)
   - Volet 5 : Cartes de tous les articles et dossiers Handball du site
CONTRAINTE STRICTE : Ne jamais toucher ni modifier generateur.html.
"""

import os
import json
import shutil

PUBLIC_DIR = "/app/applet/public"
ROOT_DIR = "/app/applet"


def extract_template_parts():
    """Extract standardized navbar and E-E-A-T/footer from an existing article in /public/."""
    ref_path = os.path.join(PUBLIC_DIR, "article-baremes-bac-sport-maroc-officiels-libres.html")
    with open(ref_path, "r", encoding="utf-8") as f:
        html = f.read()

    nav_start = html.find("<!-- PROFEPS_UNIFIED_NAVBAR_START -->")
    nav_end = html.find("<!-- PROFEPS_UNIFIED_NAVBAR_END -->") + len("<!-- PROFEPS_UNIFIED_NAVBAR_END -->")
    navbar_html = html[nav_start:nav_end]

    eeat_start = html.find("<!-- PROFEPS_EEAT_AUTHOR_START -->")
    footer_html = html[eeat_start:]

    return navbar_html, footer_html


# ==============================================================================
# 1. CRÉATION DU HUB CENTRAL DES APS : /public/hub-aps-sports-eps-maroc.html
# ==============================================================================
def create_hub_aps_page():
    filename = "hub-aps-sports-eps-maroc.html"
    navbar_html, footer_html = extract_template_parts()
    navbar_custom = navbar_html.replace(
        'data-current-file="article-baremes-bac-sport-maroc-officiels-libres.html"',
        f'data-current-file="{filename}"'
    )

    canonical_url = f"https://profeps.ma/{filename}"
    title = "Portail des APS & Sports en EPS au Maroc (OP 2007 & 2009) : ATD, Cycles 1AC-2Bac, Fiches & Grilles (PDF/Word) | ProfEPS"
    meta_desc = "Hub officiel des Activités Physiques et Sportives (APS) en EPS au Maroc (Collège OP 2009 & Lycée OP 2007) : Handball, Basket-Ball, Volley-Ball, Football, Gymnastique et Athlétisme. ATD, générateur de cycles et fiches par niveau (1AC à 2Bac) et grilles d'évaluation en PDF et Word."

    collection_schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": title.replace(" | ProfEPS", ""),
        "description": meta_desc,
        "url": canonical_url,
        "inLanguage": "fr-MA",
        "author": {
            "@type": "Person",
            "name": "Abdelkhalek ELBOUDANI",
            "jobTitle": "Professeur d'Éducation Physique et Sportive (EPS)",
            "url": "https://profeps.ma/a-propos.html"
        },
        "publisher": {"@id": "https://profeps.ma/#organization"}
    }

    breadcrumb_schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Accueil ProfEPS Maroc", "item": "https://profeps.ma/"},
            {"@type": "ListItem", "position": 2, "name": "Portail des APS & Sports EPS Maroc", "item": canonical_url}
        ]
    }

    html = f'''<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{meta_desc}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="ProfEPS Maroc">
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{meta_desc}">
    <meta property="og:url" content="{canonical_url}">
    <meta property="og:image" content="https://profeps.ma/images/prof_eps.png">
    <meta property="og:locale" content="fr_MA">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{title}">
    <meta name="twitter:description" content="{meta_desc}">
    <meta name="twitter:image" content="https://profeps.ma/images/prof_eps.png">
    <link rel="canonical" href="{canonical_url}">
    <link rel="alternate" hreflang="fr-MA" href="{canonical_url}">
    <link rel="alternate" hreflang="x-default" href="{canonical_url}">
    <title>{title}</title>
    <link rel="icon" type="image/png" href="/images/prof_eps.png">

    <!-- Google tag (gtag.js) & Consent Mode v2 ProfEPS.ma -->
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){{dataLayer.push(arguments);}}
      try {{
        var saved = JSON.parse(localStorage.getItem("profeps_cookie_consent_v2") || "null");
        if (saved) {{
          gtag("consent", "default", {{
            "ad_storage": saved.ads ? "granted" : "denied",
            "ad_user_data": saved.ads ? "granted" : "denied",
            "ad_personalization": saved.ads ? "granted" : "denied",
            "analytics_storage": saved.analytics ? "granted" : "denied"
          }});
        }} else {{
          gtag("consent", "default", {{
            "ad_storage": "granted",
            "ad_user_data": "granted",
            "ad_personalization": "granted",
            "analytics_storage": "granted"
          }});
          gtag("consent", "default", {{
            "ad_storage": "denied",
            "ad_user_data": "denied",
            "ad_personalization": "denied",
            "analytics_storage": "denied",
            "region": ["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IS","IE","IT","LV","LI","LT","LU","MT","NL","NO","PL","PT","RO","SK","SI","ES","SE","GB","CH"],
            "wait_for_update": 500
          }});
        }}
      }} catch (e) {{}}
    </script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-TH0Z1SGNXH"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){{dataLayer.push(arguments);}}
      gtag('js', new Date());
      gtag('config', 'G-TH0Z1SGNXH');
    </script>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8253776880916865" crossorigin="anonymous"></script>
    <script src="profeps-cmp.js" defer></script>
    <link rel="stylesheet" href="/css/profeps-unifier.min.css?v=20261101">

    <script type="application/ld+json">{json.dumps(collection_schema, ensure_ascii=False)}</script>
    <script type="application/ld+json">{json.dumps(breadcrumb_schema, ensure_ascii=False)}</script>

    <style>
        *, *::before, *::after {{ margin: 0; padding: 0; box-sizing: border-box; }}
        :root {{
            --primary: #991b1b; --primary-dark: #7f1d1d; --secondary: #006233; --secondary-dark: #064e3b;
            --text-primary: #0f172a; --text-secondary: #334155; --text-muted: #64748b;
            --bg-primary: #ffffff; --bg-secondary: #f8fafc; --border: #cbd5e1; --border-light: #e2e8f0;
            --shadow-sm: 0 1px 3px rgba(15,23,42,0.06); --shadow-md: 0 6px 18px rgba(15,23,42,0.07);
            --radius: 10px; --radius-lg: 16px;
            --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            --font-display: 'Plus Jakarta Sans', var(--font-sans);
        }}
        body {{ font-family: var(--font-sans); background: var(--bg-secondary); color: var(--text-primary); line-height: 1.65; }}
        a {{ text-decoration: none; color: inherit; }}

        .hub-hero {{ padding: 130px 1.5rem 2.75rem; background: linear-gradient(135deg, #fff8f8 0%, #f8fafc 50%, #f3faf6 100%); border-bottom: 1px solid var(--border-light); }}
        .hub-hero-inner {{ max-width: 1180px; margin: 0 auto; }}
        .hub-kicker {{ font-size: 0.82rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: var(--primary); margin-bottom: 0.5rem; }}
        .hub-title {{ font-family: var(--font-display); font-size: clamp(1.75rem, 3.6vw, 2.5rem); font-weight: 900; color: var(--text-primary); line-height: 1.22; margin-bottom: 0.85rem; max-width: 960px; }}
        .hub-lead {{ font-size: 1.02rem; color: var(--text-secondary); max-width: 900px; margin-bottom: 1.35rem; }}
        .hub-meta-line {{ display: flex; flex-wrap: wrap; gap: 0.75rem 1.5rem; font-size: 0.86rem; font-weight: 600; color: var(--text-muted); padding-top: 0.85rem; border-top: 1px solid var(--border-light); }}

        .hub-container {{ max-width: 1180px; margin: 0 auto; padding: 2.25rem 1.5rem 3.5rem; }}

        /* Segmented Filter Controls */
        .filter-bar {{ display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 2rem; background: #ffffff; padding: 0.85rem 1.15rem; border: 1px solid var(--border); border-radius: 12px; box-shadow: var(--shadow-sm); }}
        .filter-tabs {{ display: flex; flex-wrap: wrap; gap: 0.4rem; background: #f1f5f9; padding: 0.3rem; border-radius: 9px; }}
        .filter-btn {{ cursor: pointer; border: none; background: transparent; padding: 0.55rem 1rem; font-size: 0.86rem; font-weight: 700; color: var(--text-secondary); border-radius: 7px; transition: all 0.2s; }}
        .filter-btn:hover {{ color: var(--text-primary); }}
        .filter-btn.active {{ background: #ffffff; color: var(--primary); box-shadow: var(--shadow-sm); font-weight: 800; }}

        /* Featured Silo Banner (Handball Studio Complet) */
        .featured-silo-card {{ background: #ffffff; border: 2px solid var(--primary); border-radius: var(--radius-lg); padding: 1.75rem; margin-bottom: 2.25rem; box-shadow: var(--shadow-md); display: grid; grid-template-columns: 1.45fr 1fr; gap: 1.75rem; align-items: center; }}
        .featured-kicker {{ font-size: 0.78rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: var(--secondary); margin-bottom: 0.4rem; }}
        .featured-title {{ font-family: var(--font-display); font-size: 1.55rem; font-weight: 900; color: var(--text-primary); margin-bottom: 0.65rem; line-height: 1.28; }}
        .featured-desc {{ font-size: 0.94rem; color: var(--text-secondary); margin-bottom: 1.15rem; }}
        .featured-features {{ display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.55rem; margin-bottom: 1.35rem; font-size: 0.85rem; color: var(--text-primary); font-weight: 600; }}
        .featured-actions {{ display: flex; flex-wrap: wrap; gap: 0.75rem; }}
        .btn-primary-action {{ display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.35rem; background: var(--primary); color: #ffffff; font-size: 0.9rem; font-weight: 800; border-radius: 9px; transition: background 0.2s; }}
        .btn-primary-action:hover {{ background: var(--primary-dark); }}
        .btn-secondary-action {{ display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.2rem; background: #f8fafc; color: var(--text-primary); border: 1px solid var(--border); font-size: 0.88rem; font-weight: 700; border-radius: 9px; transition: all 0.2s; }}
        .btn-secondary-action:hover {{ border-color: var(--primary); color: var(--primary); }}
        .featured-preview-box {{ background: #f8fafc; border: 1px solid var(--border); border-radius: 12px; padding: 1.25rem; }}
        .level-matrix {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; margin-top: 0.75rem; }}
        .level-item {{ display: block; text-align: center; padding: 0.55rem 0.4rem; background: #ffffff; border: 1px solid var(--border); border-radius: 8px; font-size: 0.8rem; font-weight: 800; color: var(--text-primary); transition: all 0.2s; }}
        .level-item:hover {{ border-color: var(--primary); color: var(--primary); background: #fff8f8; }}

        /* APS Grid */
        .section-heading {{ font-family: var(--font-display); font-size: 1.35rem; font-weight: 900; color: var(--text-primary); margin: 2rem 0 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid var(--border); display: flex; align-items: center; justify-content: space-between; }}
        .aps-grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1.25rem; }}
        .aps-card {{ background: #ffffff; border: 1px solid var(--border); border-radius: 14px; padding: 1.4rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: var(--shadow-sm); transition: transform 0.2s, border-color 0.2s; }}
        .aps-card:hover {{ transform: translateY(-2px); border-color: var(--primary); }}
        .aps-card-kicker {{ font-size: 0.76rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-muted); margin-bottom: 0.35rem; }}
        .aps-card-title {{ font-size: 1.18rem; font-weight: 900; color: var(--text-primary); margin-bottom: 0.5rem; }}
        .aps-card-desc {{ font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1rem; }}
        .aps-links-list {{ list-style: none; border-top: 1px solid var(--border-light); padding-top: 0.85rem; margin-bottom: 1rem; display: flex; flex-direction: column; gap: 0.45rem; }}
        .aps-links-list a {{ font-size: 0.84rem; font-weight: 700; color: var(--text-primary); display: flex; align-items: center; justify-content: space-between; padding: 0.3rem 0; }}
        .aps-links-list a:hover {{ color: var(--primary); text-decoration: underline; }}
        .aps-card-footer {{ display: flex; gap: 0.5rem; padding-top: 0.75rem; border-top: 1px solid var(--border-light); }}
        .aps-btn-main {{ flex: 1; text-align: center; padding: 0.55rem 0.85rem; background: var(--primary); color: #ffffff; border-radius: 8px; font-size: 0.82rem; font-weight: 800; }}
        .aps-btn-main:hover {{ background: var(--primary-dark); }}
        .aps-btn-alt {{ padding: 0.55rem 0.85rem; background: #f8fafc; color: var(--text-primary); border: 1px solid var(--border); border-radius: 8px; font-size: 0.82rem; font-weight: 700; }}
        .aps-btn-alt:hover {{ border-color: var(--secondary); color: var(--secondary); }}

        /* OTI Table */
        .table-wrap {{ overflow-x: auto; margin-top: 1rem; background: #ffffff; border: 1px solid var(--border); border-radius: 12px; box-shadow: var(--shadow-sm); }}
        .table-wrap table {{ width: 100%; border-collapse: collapse; }}
        .table-wrap th {{ background: #f1f5f9; color: var(--text-primary); font-size: 0.84rem; font-weight: 800; text-align: left; padding: 0.85rem 1rem; border-bottom: 2px solid var(--border); }}
        .table-wrap td {{ padding: 0.85rem 1rem; font-size: 0.86rem; color: var(--text-secondary); border-bottom: 1px solid var(--border-light); vertical-align: top; }}

        @media (max-width: 900px) {{
            .featured-silo-card {{ grid-template-columns: 1fr; }}
            .featured-features {{ grid-template-columns: 1fr; }}
        }}
    </style>
</head>
<body>
{navbar_custom}

    <header class="hub-hero">
        <div class="hub-hero-inner">
            <div class="hub-kicker">Référentiel Didactique &amp; Pédagogique EPS Maroc · OP 2009 (Collège) &amp; OP 2007 (Lycée)</div>
            <h1 class="hub-title">Portail des APS &amp; Sports Scolaires : ATD, Cycles (1AC à 2Bac), Fiches de Séance &amp; Grilles d'Évaluation (PDF / Word)</h1>
            <p class="hub-lead">Choisissez votre Activité Physique et Sportive (APS) pour accéder à son écosystème complet : Analyse et Traitement Didactique (ATD), studio de visualisation et téléchargement des projets de cycles et fiches pédagogiques pour les 6 niveaux scolaires (du Débutant à l'Élite), grilles d'observation et d'évaluation sommative (/20) et règlements officiels.</p>
            <div class="hub-meta-line">
                <span>6 Niveaux Scolaires (1AC · 2AC · 3AC · TC · 1Bac · 2Bac)</span>
                <span>·</span>
                <span>4 Niveaux de Pratique par Classe (Débutant à Élite ASS)</span>
                <span>·</span>
                <span>Visionnage Pro A4 avant Téléchargement (.doc Word &amp; PDF)</span>
                <span>·</span>
                <span>Par <a href="a-propos.html" style="text-decoration:underline;color:#991b1b;">Abdelkhalek ELBOUDANI</a></span>
            </div>
        </div>
    </header>

    <main class="hub-container">
        <!-- FILTRE PAR FAMILLE D'APS -->
        <div class="filter-bar">
            <div class="filter-tabs" role="tablist" aria-label="Filtrer par famille d'APS">
                <button type="button" class="filter-btn active" onclick="filterApsHub('all', this)">Toutes les APS (11)</button>
                <button type="button" class="filter-btn" onclick="filterApsHub('collectifs', this)">Sports Collectifs (5)</button>
                <button type="button" class="filter-btn" onclick="filterApsHub('athletisme', this)">Athlétisme (4)</button>
                <button type="button" class="filter-btn" onclick="filterApsHub('gymnastique', this)">Gymnastique &amp; Autres (2)</button>
            </div>
            <div style="display:flex;gap:0.6rem;flex-wrap:wrap;">
                <a href="ressources-atd.html" class="btn-secondary-action" style="padding:0.5rem 0.9rem;font-size:0.82rem;">📚 Toutes les Fiches ATD</a>
                <a href="generateur.html" class="btn-primary-action" style="padding:0.5rem 0.95rem;font-size:0.82rem;">⚡ Générateur EPS Global</a>
            </div>
        </div>

        <!-- SILO VEDETTE : HANDBALL (STUDIO COMPLET 1AC-2BAC) -->
        <section class="featured-silo-card" data-aps-family="collectifs" aria-label="Silo Complet Handball EPS Maroc">
            <div>
                <div class="featured-kicker">Silo APS Complet Disponible · Collège (OP 2009) &amp; Lycée (OP 2007)</div>
                <h2 class="featured-title">🤾 Handball en EPS au Maroc : ATD, Studio des 24 Cycles &amp; 240 Fiches (1AC à 2Bac) + Grilles d'Observation &amp; Évaluation (/20)</h2>
                <p class="featured-desc">Accédez à la page dédiée au Handball regroupant l'Analyse et Traitement Didactique (ATD), le créateur et visualiseur professionnel de projets de cycles et de fiches de séances pour les 6 niveaux scolaires (1AC, 2AC, 3AC, TC, 1Bac, 2Bac) déclinés en 4 niveaux d'habileté, ainsi que les grilles d'observation et de notation sur 20 points prêtes à télécharger en Word et PDF.</p>
                <div class="featured-features">
                    <span>✓ ATD Complet (Logique interne, Problèmes fondamentaux, Enjeux)</span>
                    <span>✓ 6 Niveaux Scolaires × 4 Niveaux (Débutant, Débrouillé, Confirmé, Élite)</span>
                    <span>✓ Visionneuse A4 Pro avant téléchargement Word (.doc) &amp; PDF</span>
                    <span>✓ Grilles d'Observation Diagnostique &amp; Évaluation (/20 Collège &amp; Lycée)</span>
                </div>
                <div class="featured-actions">
                    <a href="aps-handball-eps-maroc.html" class="btn-primary-action">Ouvrir le Silo Complet Handball (Cycles, Fiches &amp; Grilles) →</a>
                    <a href="aps-handball-eps-maroc.html#volet-grilles" class="btn-secondary-action">Grilles d'Observation &amp; Évaluation (/20)</a>
                </div>
            </div>
            <div class="featured-preview-box">
                <strong style="display:block;font-size:0.88rem;color:#0f172a;margin-bottom:0.35rem;">Accès direct par Niveau Scolaire (Handball) :</strong>
                <p style="font-size:0.8rem;color:#475569;margin-bottom:0.65rem;">Cliquez sur votre niveau pour ouvrir directement ses 4 niveaux de pratique (Débutant à Élite) avec aperçu A4 + export Word/PDF :</p>
                <div class="level-matrix">
                    <a href="aps-handball-eps-maroc.html?level=1AC#volet-studio" class="level-item">1ère AC<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">4 Cycles + Fiches</span></a>
                    <a href="aps-handball-eps-maroc.html?level=2AC#volet-studio" class="level-item">2ème AC<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">4 Cycles + Fiches</span></a>
                    <a href="aps-handball-eps-maroc.html?level=3AC#volet-studio" class="level-item">3ème AC<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">4 Cycles + Fiches</span></a>
                    <a href="aps-handball-eps-maroc.html?level=TC#volet-studio" class="level-item">Tronc Commun<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">4 Cycles + Fiches</span></a>
                    <a href="aps-handball-eps-maroc.html?level=1BAC#volet-studio" class="level-item">1ère Bac<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">4 Cycles + Fiches</span></a>
                    <a href="aps-handball-eps-maroc.html?level=2BAC#volet-studio" class="level-item">2ème Bac<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">4 Cycles + Fiches</span></a>
                </div>
                <div style="margin-top:0.85rem;padding-top:0.75rem;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;font-size:0.78rem;font-weight:700;color:#006233;">
                    <a href="aps-handball-eps-maroc.html#volet-atd">📐 Voir l'ATD Handball</a>
                    <a href="reglement-handball-ihf-gestes-arbitrage-eps.html">⚖️ Règlement IHF &amp; 18 Gestes</a>
                </div>
            </div>
        </section>

        <!-- GRILLE DE TOUTES LES APS PAR FAMILLE -->
        <h2 class="section-heading">
            <span>Catalogue des Activités Physiques et Sportives (APS) au Maroc</span>
            <span style="font-size:0.84rem;font-weight:700;color:#64748b;">Classées par famille officielle (OP 2007 &amp; 2009)</span>
        </h2>

        <div class="aps-grid" id="apsHubGrid">
            <!-- 1. HANDBALL -->
            <article class="aps-card" data-aps-family="collectifs" style="border-color:#991b1b;border-width:2px;">
                <div>
                    <div class="aps-card-kicker" style="color:#991b1b;">Sports Collectifs · Démarquage · Studio Complet Actif</div>
                    <h3 class="aps-card-title">🤾 Handball (كرة اليد)</h3>
                    <p class="aps-card-desc">Silo complet : ATD officiel, 24 projets de cycles et 240 fiches de séances (1AC à 2Bac × 4 niveaux), grilles d'observation et d'évaluation (/20) et règlement IHF 2026.</p>
                    <ul class="aps-links-list">
                        <li><a href="aps-handball-eps-maroc.html#volet-studio"><span>⚡ Studio Cycles &amp; Fiches (1AC → 2Bac · PDF/Word)</span> <span>→</span></a></li>
                        <li><a href="aps-handball-eps-maroc.html#volet-grilles"><span>📊 Grilles d'Observation &amp; Évaluation (/20)</span> <span>→</span></a></li>
                        <li><a href="aps-handball-eps-maroc.html#volet-atd"><span>📐 ATD Handball (Logique interne &amp; Problèmes)</span> <span>→</span></a></li>
                        <li><a href="reglement-handball-ihf-gestes-arbitrage-eps.html"><span>⚖️ Règlement IHF 2026 &amp; 18 Gestes d'Arbitrage</span> <span>→</span></a></li>
                    </ul>
                </div>
                <div class="aps-card-footer">
                    <a href="aps-handball-eps-maroc.html" class="aps-btn-main">Ouvrir la Page Spéciale Handball →</a>
                </div>
            </article>

            <!-- 2. BASKET-BALL -->
            <article class="aps-card" data-aps-family="collectifs">
                <div>
                    <div class="aps-card-kicker">Sports Collectifs · Démarquage · FIBA</div>
                    <h3 class="aps-card-title">🏀 Basket-Ball &amp; Basket 3×3 (كرة السلة)</h3>
                    <p class="aps-card-desc">Analyse didactique (ATD), cycles Collège (OP 2009) et Lycée (OP 2007), contre-attaque, attaque de zone, règles FIBA 2026 (pas zéro, 24s) et grilles d'évaluation.</p>
                    <ul class="aps-links-list">
                        <li><a href="article-basketball-eps.html"><span>📘 Guide Complet Basket-Ball EPS : ATD &amp; Séances</span> <span>→</span></a></li>
                        <li><a href="cycle-basketball-college-eps-maroc.html"><span>📋 Cycle Basket-Ball Collège (10 Séances OP 2009)</span> <span>→</span></a></li>
                        <li><a href="cycle-basketball-lycee-eps-maroc.html"><span>📋 Cycle Basket-Ball Lycée (10 Séances OP 2007)</span> <span>→</span></a></li>
                        <li><a href="reglement-basketball-fiba-arbitrage-eps.html"><span>⚖️ Règlement FIBA 2026 &amp; Gestes d'Arbitrage</span> <span>→</span></a></li>
                    </ul>
                </div>
                <div class="aps-card-footer">
                    <a href="article-basketball-eps.html" class="aps-btn-main">Dossier &amp; Cycles Basket →</a>
                    <a href="evaluation-eps.html" class="aps-btn-alt">Grilles /20</a>
                </div>
            </article>

            <!-- 3. VOLLEY-BALL -->
            <article class="aps-card" data-aps-family="collectifs">
                <div>
                    <div class="aps-card-kicker">Sports Collectifs · Renvoi · FIVB</div>
                    <h3 class="aps-card-title">🏐 Volley-Ball (الكرة الطائرة)</h3>
                    <p class="aps-card-desc">Traitement didactique de la cible au sol (1c1 à 6c6), manchette, touche haute, service, attaque/réception, code d'arbitrage FIVB et grilles d'évaluation OP 2007/2009.</p>
                    <ul class="aps-links-list">
                        <li><a href="article-volleyball-eps.html"><span>📘 Guide Complet Volley-Ball EPS : ATD &amp; Situations</span> <span>→</span></a></li>
                        <li><a href="cycle-volleyball-college-eps-maroc.html"><span>📋 Cycle Volley-Ball Collège (10 Séances OP 2009)</span> <span>→</span></a></li>
                        <li><a href="cycle-volleyball-lycee-eps-maroc.html"><span>📋 Cycle Volley-Ball Lycée (10 Séances OP 2007)</span> <span>→</span></a></li>
                        <li><a href="reglement-volleyball-fivb-gestes-arbitrage-eps.html"><span>⚖️ Règlement FIVB 2026 &amp; Gestes d'Arbitrage</span> <span>→</span></a></li>
                    </ul>
                </div>
                <div class="aps-card-footer">
                    <a href="article-volleyball-eps.html" class="aps-btn-main">Dossier &amp; Cycles Volley →</a>
                    <a href="evaluation-eps.html" class="aps-btn-alt">Grilles /20</a>
                </div>
            </article>

            <!-- 4. FOOTBALL & FUTSAL -->
            <article class="aps-card" data-aps-family="collectifs">
                <div>
                    <div class="aps-card-kicker">Sports Collectifs · Démarquage · FIFA / IFAB</div>
                    <h3 class="aps-card-title">⚽ Football &amp; Futsal (كرة القدم داخل القاعة)</h3>
                    <p class="aps-card-desc">Adaptations scolaires sur terrain de handball (Futsal 5c5), ATD, conservation et progression collective, lois du jeu FIFA/IFAB et évaluation sommative.</p>
                    <ul class="aps-links-list">
                        <li><a href="article-football-eps.html"><span>📘 Guide Football &amp; Futsal EPS Maroc : ATD &amp; Cycles</span> <span>→</span></a></li>
                        <li><a href="reglement-football-ifab-arbitrage-eps.html"><span>⚖️ Lois du Jeu Football IFAB 2026 &amp; Arbitrage</span> <span>→</span></a></li>
                        <li><a href="reglement-futsal-fifa-terrain-eps.html"><span>🏟️ Règlement Officiel Futsal FIFA (5 fautes, 4s)</span> <span>→</span></a></li>
                        <li><a href="ressources-atd.html"><span>📐 Fiche ATD Football Scolaire (PDF)</span> <span>→</span></a></li>
                    </ul>
                </div>
                <div class="aps-card-footer">
                    <a href="article-football-eps.html" class="aps-btn-main">Dossier &amp; Cycles Foot/Futsal →</a>
                    <a href="evaluation-eps.html" class="aps-btn-alt">Grilles /20</a>
                </div>
            </article>

            <!-- 5. RUGBY SCOLAIRE -->
            <article class="aps-card" data-aps-family="collectifs">
                <div>
                    <div class="aps-card-kicker">Sports Collectifs · Combat Collectif &amp; Touch</div>
                    <h3 class="aps-card-title">🏉 Rugby Scolaire &amp; Touch Rugby</h3>
                    <p class="aps-card-desc">Progression sécuritaire du jeu au toucher au plaquage réglementé, règle du hors-jeu et de l'en-avant, ATD, situations de gagne-terrain et arbitrage World Rugby.</p>
                    <ul class="aps-links-list">
                        <li><a href="article-rugby-eps.html"><span>📘 Guide Rugby en EPS au Maroc : ATD, Sécurité &amp; Cycles</span> <span>→</span></a></li>
                        <li><a href="reglement-rugby-world-rugby-securite-eps.html"><span>⚖️ Règlement World Rugby &amp; Sécurité Scolaire</span> <span>→</span></a></li>
                        <li><a href="evaluation-eps.html"><span>📊 Grilles d'Évaluation Sports Collectifs (/20)</span> <span>→</span></a></li>
                    </ul>
                </div>
                <div class="aps-card-footer">
                    <a href="article-rugby-eps.html" class="aps-btn-main">Dossier &amp; Cycles Rugby →</a>
                    <a href="evaluation-eps.html" class="aps-btn-alt">Grilles /20</a>
                </div>
            </article>

            <!-- 6. COURSE DE VITESSE & RELAIS -->
            <article class="aps-card" data-aps-family="athletisme">
                <div>
                    <div class="aps-card-kicker">Athlétisme · Courses · OP 2007/2009</div>
                    <h3 class="aps-card-title">⚡ Course de Vitesse &amp; Relais (الجري السريع والتناوب)</h3>
                    <p class="aps-card-desc">Départ commandé, réaction au signal, fréquence/amplitude, transmission du témoin dans la zone de 30m, barèmes officiels du Bac Sport (60m, 80m, 100m).</p>
                    <ul class="aps-links-list">
                        <li><a href="article-vitesse-relais-eps.html"><span>📘 Guide Course de Vitesse &amp; Relais en EPS</span> <span>→</span></a></li>
                        <li><a href="reglement-course-vitesse-relais-haies-athletisme-eps.html"><span>⚖️ Règlement Officiel Sprint, Relais (30m) &amp; Haies</span> <span>→</span></a></li>
                        <li><a href="article-baremes-bac-sport-maroc-officiels-libres.html"><span>📊 Barèmes Chiffrés Vitesse (Collège, Lycée &amp; Bac)</span> <span>→</span></a></li>
                        <li><a href="calculateur-sprint.html"><span>⏱️ Calculateur de Sprint &amp; Profil Force-Vitesse</span> <span>→</span></a></li>
                    </ul>
                </div>
                <div class="aps-card-footer">
                    <a href="article-vitesse-relais-eps.html" class="aps-btn-main">Dossier Vitesse &amp; Relais →</a>
                    <a href="article-baremes-bac-sport-maroc-officiels-libres.html" class="aps-btn-alt">Barèmes /20</a>
                </div>
            </article>

            <!-- 7. DEMI-FOND & VMA -->
            <article class="aps-card" data-aps-family="athletisme">
                <div>
                    <div class="aps-card-kicker">Athlétisme · Demi-Fond &amp; Endurance</div>
                    <h3 class="aps-card-title">🏃 Course de Durée, Demi-Fond &amp; VMA (الجري المطاول)</h3>
                    <p class="aps-card-desc">Tests VMA (Luc Léger, Demi-Cooper 6 min, Vameval), projets d'allure (90% à 110% VMA), cycles Collège et Lycée, et barèmes officiels 600m / 1000m au Bac Sport.</p>
                    <ul class="aps-links-list">
                        <li><a href="cycle-course-duree-college-eps-maroc.html"><span>📋 Cycle Course de Durée Collège (10 Séances OP 2009)</span> <span>→</span></a></li>
                        <li><a href="cycle-course-duree-lycee-eps-maroc.html"><span>📋 Cycle Course de Durée Lycée (10 Séances OP 2007)</span> <span>→</span></a></li>
                        <li><a href="reglement-demi-fond-cross-country-eps-ass.html"><span>⚖️ Règlement Demi-Fond (600m/1000m) &amp; Cross ASS</span> <span>→</span></a></li>
                        <li><a href="calculateur-vma.html"><span>🧮 Calculateur VMA &amp; Groupes d'Allures EPS</span> <span>→</span></a></li>
                    </ul>
                </div>
                <div class="aps-card-footer">
                    <a href="cycle-course-duree-lycee-eps-maroc.html" class="aps-btn-main">Cycles Demi-Fond →</a>
                    <a href="calculateur-vma.html" class="aps-btn-alt">Outil VMA</a>
                </div>
            </article>

            <!-- 8. LANCER DU POIDS -->
            <article class="aps-card" data-aps-family="athletisme">
                <div>
                    <div class="aps-card-kicker">Athlétisme · Lancers · OP 2007/2009</div>
                    <h3 class="aps-card-title">🏋️ Lancer du Poids (دفع الجلة)</h3>
                    <p class="aps-card-desc">Chaîne cinétique (jambes-tronc-bras), angle d'envol (40°), sécurité de l'atelier, cercle de 2,135m, masses réglementaires (3kg, 4kg, 5kg) et barèmes officiels sur 20.</p>
                    <ul class="aps-links-list">
                        <li><a href="article-lancer-poids-eps.html"><span>📘 Guide Didactique Lancer du Poids en EPS</span> <span>→</span></a></li>
                        <li><a href="reglement-lancer-poids-athletisme-bac-eps.html"><span>⚖️ Règlement Officiel Lancer du Poids &amp; Jury Bac</span> <span>→</span></a></li>
                        <li><a href="article-baremes-bac-sport-maroc-officiels-libres.html"><span>📊 Barèmes Officiels Poids Garçons &amp; Filles (/20)</span> <span>→</span></a></li>
                        <li><a href="ressources-atd.html"><span>📐 Fiche ATD Athlétisme — Lancer du Poids</span> <span>→</span></a></li>
                    </ul>
                </div>
                <div class="aps-card-footer">
                    <a href="article-lancer-poids-eps.html" class="aps-btn-main">Dossier Lancer du Poids →</a>
                    <a href="article-baremes-bac-sport-maroc-officiels-libres.html" class="aps-btn-alt">Barèmes /20</a>
                </div>
            </article>

            <!-- 9. SAUT EN LONGUEUR & HAUTEUR -->
            <article class="aps-card" data-aps-family="athletisme">
                <div>
                    <div class="aps-card-kicker">Athlétisme · Sauts · OP 2007/2009</div>
                    <h3 class="aps-card-title">🦘 Saut en Longueur, Triple Saut &amp; Hauteur (القفز الطولي والعلوي)</h3>
                    <p class="aps-card-desc">Étalonnage de la course d'élan, impulsion sur la planche d'appel (20cm), liaison course-impulsion, mesure perpendiculaire à 90° et barèmes officiels OP 2007/2009.</p>
                    <ul class="aps-links-list">
                        <li><a href="article-saut-longueur-eps.html"><span>📘 Guide Didactique Saut en Longueur en EPS</span> <span>→</span></a></li>
                        <li><a href="reglement-sauts-longueur-hauteur-triple-saut-eps.html"><span>⚖️ Règlement Officiel Longueur, Triple Saut &amp; Hauteur</span> <span>→</span></a></li>
                        <li><a href="article-baremes-bac-sport-maroc-officiels-libres.html"><span>📊 Barèmes Chiffrés Saut en Longueur (/20)</span> <span>→</span></a></li>
                    </ul>
                </div>
                <div class="aps-card-footer">
                    <a href="article-saut-longueur-eps.html" class="aps-btn-main">Dossier Saut en Longueur →</a>
                    <a href="article-baremes-bac-sport-maroc-officiels-libres.html" class="aps-btn-alt">Barèmes /20</a>
                </div>
            </article>

            <!-- 10. GYMNASTIQUE AU SOL -->
            <article class="aps-card" data-aps-family="gymnastique">
                <div>
                    <div class="aps-card-kicker">Gymnastique · Production de Formes · OP 2007/2009</div>
                    <h3 class="aps-card-title">🤸 Gymnastique au Sol (الجمباز الأرضي)</h3>
                    <p class="aps-card-desc">Classification des difficultés (A, B, C, D), familles gymniques (rotations, ATR, souplesses, attitudes), aide et parade, enchaînements Collège/Lycée et fiche de jugement sur 20.</p>
                    <ul class="aps-links-list">
                        <li><a href="article-seance-gymnastique.html"><span>📘 Guide Gymnastique au Sol en EPS : ATD &amp; Séances</span> <span>→</span></a></li>
                        <li><a href="cycle-gymnastique-college-eps-maroc.html"><span>📋 Cycle Gymnastique Collège (10 Séances OP 2009)</span> <span>→</span></a></li>
                        <li><a href="cycle-gymnastique-lycee-eps-maroc.html"><span>📋 Cycle Gymnastique Lycée (10 Séances OP 2007)</span> <span>→</span></a></li>
                        <li><a href="reglement-gymnastique-sol-code-pointage-eps-maroc.html"><span>⚖️ Code de Pointage Scolaire (A, B, C, D) &amp; Jugement</span> <span>→</span></a></li>
                    </ul>
                </div>
                <div class="aps-card-footer">
                    <a href="cycle-gymnastique-lycee-eps-maroc.html" class="aps-btn-main">Dossier &amp; Cycles Gym →</a>
                    <a href="reglement-gymnastique-sol-code-pointage-eps-maroc.html" class="aps-btn-alt">Code A/B/C/D</a>
                </div>
            </article>

            <!-- 11. TENNIS DE TABLE & BADMINTON -->
            <article class="aps-card" data-aps-family="gymnastique">
                <div>
                    <div class="aps-card-kicker">Sports de Raquette · Duel</div>
                    <h3 class="aps-card-title">🏓 Tennis de Table &amp; Badminton</h3>
                    <p class="aps-card-desc">Organisation en tournois montants-descendants (ronde italienne/suisse), ATD, service réglementaire, placement de balle et règlements officiels ITTF / BWF.</p>
                    <ul class="aps-links-list">
                        <li><a href="article-tennis-de-table-eps.html"><span>📘 Guide Tennis de Table en EPS : ATD &amp; Tournois</span> <span>→</span></a></li>
                        <li><a href="reglement-tennis-de-table-ittf-eps.html"><span>⚖️ Règlement Officiel Tennis de Table ITTF (11 pts)</span> <span>→</span></a></li>
                        <li><a href="reglement-badminton-bwf-zones-service-eps.html"><span>🏸 Règlement Officiel Badminton BWF &amp; Zones</span> <span>→</span></a></li>
                    </ul>
                </div>
                <div class="aps-card-footer">
                    <a href="article-tennis-de-table-eps.html" class="aps-btn-main">Dossier Tennis de Table →</a>
                    <a href="reglement-badminton-bwf-zones-service-eps.html" class="aps-btn-alt">Badminton</a>
                </div>
            </article>
        </div>

        <!-- TABLEAU OFFICIEL DES OTI ET COMPÉTENCES VISÉES (1AC -> 2BAC) -->
        <h2 class="section-heading" style="margin-top:3rem;">
            <span>Référentiel Officiel : OTI &amp; Répartition des Points par Niveau Scolaire (OP 2009 &amp; OP 2007)</span>
        </h2>
        <div class="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>Niveau Scolaire</th>
                        <th>Référentiel</th>
                        <th>Objectif Terminal d'Intégration (OTI Officiel)</th>
                        <th>Barème Officiel d'Évaluation Sommative (/20)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>1ère Année Collège (1AC)</strong></td>
                        <td>OP 2009 · Note 143-09</td>
                        <td>L'élève de la 1ère année doit pouvoir acquérir une motricité correcte lui permettant de s'adapter aux exigences des situations (forme et rythme) et s'intégrer dans le groupe.</td>
                        <td>Habiletés motrices : <strong>12 pts</strong> · Connaissances conceptuelles : <strong>3 pts</strong> · Comportement / Rôles sociaux : <strong>5 pts</strong></td>
                    </tr>
                    <tr>
                        <td><strong>2ème Année Collège (2AC)</strong></td>
                        <td>OP 2009 · Note 143-09</td>
                        <td>L'élève de la 2ème année doit pouvoir ajuster l'énergie physique et la maîtriser et fournir l'effort et l'orienter pour effectuer des réalisations coordonnées et organisées, et communiquer avec les autres.</td>
                        <td>Habiletés motrices : <strong>12 pts</strong> · Connaissances conceptuelles : <strong>3 pts</strong> · Comportement / Rôles sociaux : <strong>5 pts</strong></td>
                    </tr>
                    <tr>
                        <td><strong>3ème Année Collège (3AC)</strong></td>
                        <td>OP 2009 · Note 143-09</td>
                        <td>L'élève de la 3ème année doit pouvoir ajuster les éléments de l'acte moteur et l'adapter aux différentes situations en fonction de ses exigences organisationnelles et réglementaires, et s'exercer sur la pratique des droits et devoirs pour réaliser un projet sportif individuel ou collectif.</td>
                        <td>Habiletés motrices : <strong>12 pts</strong> · Connaissances conceptuelles : <strong>3 pts</strong> · Comportement / Rôles sociaux : <strong>5 pts</strong></td>
                    </tr>
                    <tr>
                        <td><strong>Tronc Commun (TC)</strong></td>
                        <td>OP 2007 · Note 142-10</td>
                        <td>L'élève du Tronc Commun doit pouvoir maîtriser les composantes du comportement moteur et pouvoir s'adapter aux différentes situations et faire face à ses défis et accepter l'intégration dans le groupe.</td>
                        <td>Habiletés motrices : <strong>14 pts</strong> · Connaissances conceptuelles : <strong>3 pts</strong> · Comportement / Rôles sociaux : <strong>3 pts</strong></td>
                    </tr>
                    <tr>
                        <td><strong>1ère Année Bac (1Bac)</strong></td>
                        <td>OP 2007 · Note 142-10</td>
                        <td>L'élève de la 1ère année Bac doit pouvoir confronter les situations motrices grâce à l'adéquation des différents éléments de l'acte moteur et la planification de différents types d'effort physique individuel ou collectif.</td>
                        <td>Habiletés motrices : <strong>14 pts</strong> · Connaissances conceptuelles : <strong>3 pts</strong> · Comportement / Rôles sociaux : <strong>3 pts</strong></td>
                    </tr>
                    <tr>
                        <td><strong>2ème Année Bac (2Bac)</strong></td>
                        <td>OP 2007 · Note 142-10</td>
                        <td>L'élève de la 2ème année Bac doit pouvoir analyser différentes situations et interactions motrices et s'intégrer volontairement dans la planification et la réalisation de projets individuels et collectifs.</td>
                        <td>Habiletés motrices : <strong>14 pts</strong> · Connaissances conceptuelles : <strong>3 pts</strong> · Comportement / Rôles sociaux : <strong>3 pts</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>

    <script>
      function filterApsHub(family, btn) {{
        document.querySelectorAll('.filter-btn').forEach(function(b) {{ b.classList.remove('active'); }});
        if (btn) btn.classList.add('active');
        document.querySelectorAll('[data-aps-family]').forEach(function(el) {{
          if (family === 'all' || el.getAttribute('data-aps-family') === family) {{
            el.style.display = '';
          }} else {{
            el.style.display = 'none';
          }}
        }});
      }}
    </script>

{footer_html}
'''
    with open(os.path.join(PUBLIC_DIR, filename), "w", encoding="utf-8") as f:
        f.write(html)
    print(f"[HUB APS OK] Created /public/{filename}")


# ==============================================================================
# 2. CRÉATION DE LA PAGE SILO HANDBALL : /public/aps-handball-eps-maroc.html
# ==============================================================================
def create_handball_silo_page():
    filename = "aps-handball-eps-maroc.html"
    navbar_html, footer_html = extract_template_parts()
    navbar_custom = navbar_html.replace(
        'data-current-file="article-baremes-bac-sport-maroc-officiels-libres.html"',
        f'data-current-file="{filename}"'
    )

    canonical_url = f"https://profeps.ma/{filename}"
    title = "Handball en EPS au Maroc (1AC à 2Bac) : ATD, Studio Cycles & Fiches (PDF/Word) + Grilles d'Évaluation (/20) | ProfEPS"
    meta_desc = "Silo officiel du Handball en EPS au Maroc (OP 2009 Collège & OP 2007 Lycée) : Analyse et Traitement Didactique (ATD), Studio interactif de projets de cycles et fiches de séances (1AC, 2AC, 3AC, TC, 1Bac, 2Bac × 4 niveaux du Débutant à l'Élite) avec visionneuse A4 avant téléchargement PDF/Word et grilles d'observation et d'évaluation /20."

    course_schema = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Silo Complet Handball EPS Maroc (1AC à 2Bac) : ATD, 24 Cycles, 240 Fiches & Grilles /20",
        "description": meta_desc,
        "provider": {"@id": "https://profeps.ma/#organization"},
        "educationalLevel": ["1AC", "2AC", "3AC", "Tronc Commun", "1ère Bac", "2ème Bac"],
        "inLanguage": "fr-MA"
    }

    breadcrumb_schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Accueil ProfEPS Maroc", "item": "https://profeps.ma/"},
            {"@type": "ListItem", "position": 2, "name": "Portail des APS & Sports EPS", "item": "https://profeps.ma/hub-aps-sports-eps-maroc.html"},
            {"@type": "ListItem", "position": 3, "name": "Handball EPS Maroc (Cycles, Fiches, ATD & Grilles)", "item": canonical_url}
        ]
    }

    html = f'''<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{meta_desc}">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="ProfEPS Maroc">
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{meta_desc}">
    <meta property="og:url" content="{canonical_url}">
    <meta property="og:image" content="https://profeps.ma/images/prof_eps.png">
    <meta property="og:locale" content="fr_MA">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{title}">
    <meta name="twitter:description" content="{meta_desc}">
    <meta name="twitter:image" content="https://profeps.ma/images/prof_eps.png">
    <link rel="canonical" href="{canonical_url}">
    <link rel="alternate" hreflang="fr-MA" href="{canonical_url}">
    <link rel="alternate" hreflang="x-default" href="{canonical_url}">
    <title>{title}</title>
    <link rel="icon" type="image/png" href="/images/prof_eps.png">

    <!-- Google tag (gtag.js) & Consent Mode v2 ProfEPS.ma -->
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){{dataLayer.push(arguments);}}
      try {{
        var saved = JSON.parse(localStorage.getItem("profeps_cookie_consent_v2") || "null");
        if (saved) {{
          gtag("consent", "default", {{
            "ad_storage": saved.ads ? "granted" : "denied",
            "ad_user_data": saved.ads ? "granted" : "denied",
            "ad_personalization": saved.ads ? "granted" : "denied",
            "analytics_storage": saved.analytics ? "granted" : "denied"
          }});
        }} else {{
          gtag("consent", "default", {{
            "ad_storage": "granted",
            "ad_user_data": "granted",
            "ad_personalization": "granted",
            "analytics_storage": "granted"
          }});
          gtag("consent", "default", {{
            "ad_storage": "denied",
            "ad_user_data": "denied",
            "ad_personalization": "denied",
            "analytics_storage": "denied",
            "region": ["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IS","IE","IT","LV","LI","LT","LU","MT","NL","NO","PL","PT","RO","SK","SI","ES","SE","GB","CH"],
            "wait_for_update": 500
          }});
        }}
      }} catch (e) {{}}
    </script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-TH0Z1SGNXH"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){{dataLayer.push(arguments);}}
      gtag('js', new Date());
      gtag('config', 'G-TH0Z1SGNXH');
    </script>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8253776880916865" crossorigin="anonymous"></script>
    <script src="profeps-cmp.js" defer></script>
    <link rel="stylesheet" href="/css/profeps-unifier.min.css?v=20261101">

    <script type="application/ld+json">{json.dumps(course_schema, ensure_ascii=False)}</script>
    <script type="application/ld+json">{json.dumps(breadcrumb_schema, ensure_ascii=False)}</script>

    <style>
        *, *::before, *::after {{ margin: 0; padding: 0; box-sizing: border-box; }}
        :root {{
            --primary: #991b1b; --primary-dark: #7f1d1d; --secondary: #006233; --secondary-dark: #064e3b;
            --text-primary: #0f172a; --text-secondary: #334155; --text-muted: #64748b;
            --bg-primary: #ffffff; --bg-secondary: #f8fafc; --border: #cbd5e1; --border-light: #e2e8f0;
            --shadow-sm: 0 1px 3px rgba(15,23,42,0.06); --shadow-md: 0 6px 20px rgba(15,23,42,0.08);
            --radius: 10px; --radius-lg: 16px;
            --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            --font-display: 'Plus Jakarta Sans', var(--font-sans);
        }}
        body {{ font-family: var(--font-sans); background: var(--bg-secondary); color: var(--text-primary); line-height: 1.65; }}
        a {{ text-decoration: none; color: inherit; }}

        /* Hero & Intro */
        .silo-hero {{ padding: 125px 1.5rem 2.25rem; background: linear-gradient(135deg, #fff8f8 0%, #f8fafc 52%, #f3faf6 100%); border-bottom: 1px solid var(--border-light); }}
        .silo-hero-inner {{ max-width: 1220px; margin: 0 auto; }}
        .silo-breadcrumb {{ font-size: 0.84rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.65rem; display: flex; flex-wrap: wrap; gap: 0.4rem; align-items: center; }}
        .silo-breadcrumb a:hover {{ color: var(--primary); text-decoration: underline; }}
        .silo-title {{ font-family: var(--font-display); font-size: clamp(1.65rem, 3.3vw, 2.35rem); font-weight: 900; color: var(--text-primary); line-height: 1.24; margin-bottom: 0.85rem; }}
        .silo-intro-box {{ background: #ffffff; border: 1px solid var(--border); border-left: 5px solid var(--primary); border-radius: 12px; padding: 1.2rem 1.4rem; margin-bottom: 1.25rem; box-shadow: var(--shadow-sm); display: grid; grid-template-columns: 1.6fr 1fr; gap: 1.25rem; align-items: center; }}
        .silo-intro-text {{ font-size: 0.94rem; color: var(--text-secondary); line-height: 1.65; }}
        .specs-strip {{ display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.55rem; background: #f8fafc; padding: 0.85rem; border-radius: 10px; border: 1px solid var(--border-light); font-size: 0.8rem; color: var(--text-primary); }}
        .specs-strip div strong {{ display: block; color: var(--primary); font-size: 0.76rem; text-transform: uppercase; }}

        /* Sticky Main Volet Navigation */
        .volet-nav-wrapper {{ position: sticky; top: 74px; z-index: 90; background: rgba(255,255,255,0.97); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); box-shadow: 0 2px 10px rgba(15,23,42,0.04); }}
        .volet-nav {{ max-width: 1220px; margin: 0 auto; padding: 0.6rem 1.5rem; display: flex; flex-wrap: wrap; gap: 0.45rem; align-items: center; justify-content: space-between; }}
        .volet-tabs {{ display: flex; flex-wrap: wrap; gap: 0.35rem; }}
        .volet-tab-btn {{ cursor: pointer; border: 1px solid transparent; background: #f1f5f9; color: var(--text-secondary); padding: 0.58rem 1rem; border-radius: 8px; font-size: 0.85rem; font-weight: 800; transition: all 0.2s; display: inline-flex; align-items: center; gap: 0.4rem; }}
        .volet-tab-btn:hover {{ color: var(--text-primary); background: #e2e8f0; }}
        .volet-tab-btn.active {{ background: var(--primary); color: #ffffff; box-shadow: var(--shadow-sm); }}

        .silo-main {{ max-width: 1220px; margin: 0 auto; padding: 2rem 1.5rem 3.5rem; }}
        .volet-panel {{ display: none; }}
        .volet-panel.active {{ display: block; }}

        /* Studio Cycles & Fiches Control Panel */
        .studio-shell {{ background: #ffffff; border: 1px solid var(--border); border-radius: var(--radius-lg); box-shadow: var(--shadow-md); overflow: hidden; }}
        .studio-top-bar {{ background: #0f172a; color: #ffffff; padding: 1.25rem 1.5rem; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; }}
        .studio-top-bar h2 {{ font-size: 1.22rem; font-weight: 900; color: #ffffff; margin: 0; }}
        .studio-top-bar p {{ font-size: 0.84rem; color: #cbd5e1; margin: 0.2rem 0 0; }}

        .studio-controls {{ padding: 1.35rem 1.5rem; background: #f8fafc; border-bottom: 1px solid var(--border); display: flex; flex-direction: column; gap: 1.15rem; }}
        .control-row {{ display: flex; flex-direction: column; gap: 0.45rem; }}
        .control-label {{ font-size: 0.78rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-secondary); }}

        /* 6 School Level Tabs (1AC -> 2Bac) */
        .school-level-tabs {{ display: grid; grid-template-columns: repeat(6, 1fr); gap: 0.5rem; }}
        .school-tab {{ cursor: pointer; padding: 0.7rem 0.5rem; background: #ffffff; border: 2px solid var(--border); border-radius: 10px; text-align: center; transition: all 0.2s; }}
        .school-tab strong {{ display: block; font-size: 0.92rem; color: var(--text-primary); font-weight: 900; }}
        .school-tab span {{ display: block; font-size: 0.73rem; color: var(--text-muted); font-weight: 600; margin-top: 0.15rem; }}
        .school-tab:hover {{ border-color: var(--primary); }}
        .school-tab.active {{ background: #fff1f2; border-color: var(--primary); box-shadow: var(--shadow-sm); }}
        .school-tab.active strong {{ color: var(--primary); }}

        /* 4 Practice Level Tabs (N1 -> N4) */
        .practice-level-tabs {{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; }}
        .practice-tab {{ cursor: pointer; padding: 0.65rem 0.75rem; background: #ffffff; border: 2px solid var(--border); border-radius: 10px; text-align: left; transition: all 0.2s; }}
        .practice-tab strong {{ display: block; font-size: 0.85rem; color: var(--text-primary); font-weight: 800; }}
        .practice-tab span {{ display: block; font-size: 0.74rem; color: var(--text-muted); margin-top: 0.15rem; line-height: 1.3; }}
        .practice-tab:hover {{ border-color: var(--secondary); }}
        .practice-tab.active {{ background: #f0fdf4; border-color: var(--secondary); box-shadow: var(--shadow-sm); }}
        .practice-tab.active strong {{ color: var(--secondary); }}

        /* View Mode & Custom Meta Inputs */
        .meta-and-view-grid {{ display: grid; grid-template-columns: 1.1fr 1.4fr; gap: 1rem; align-items: end; padding-top: 0.5rem; border-top: 1px dashed var(--border); }}
        .view-mode-group {{ display: flex; flex-wrap: wrap; gap: 0.4rem; background: #e2e8f0; padding: 0.3rem; border-radius: 9px; }}
        .view-mode-btn {{ flex: 1; cursor: pointer; border: none; background: transparent; padding: 0.5rem 0.75rem; font-size: 0.81rem; font-weight: 800; color: var(--text-secondary); border-radius: 7px; white-space: nowrap; }}
        .view-mode-btn.active {{ background: #ffffff; color: var(--text-primary); box-shadow: var(--shadow-sm); }}
        .custom-inputs-row {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; }}
        .custom-inputs-row input, .seance-select {{ width: 100%; padding: 0.5rem 0.65rem; border: 1px solid var(--border); border-radius: 8px; font-size: 0.82rem; font-family: inherit; background: #ffffff; color: var(--text-primary); }}

        /* Download Action Bar (Word & PDF for Cycle + Fiches) */
        .export-action-bar {{ padding: 1rem 1.5rem; background: #fff8f8; border-bottom: 1px solid #fecdd3; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.85rem; }}
        .export-btn-group {{ display: flex; flex-wrap: wrap; gap: 0.55rem; }}
        .btn-export {{ cursor: pointer; border: none; padding: 0.62rem 1rem; border-radius: 8px; font-size: 0.82rem; font-weight: 800; display: inline-flex; align-items: center; gap: 0.45rem; transition: all 0.2s; }}
        .btn-word-cycle {{ background: #1e40af; color: #ffffff; }}
        .btn-word-cycle:hover {{ background: #1e3a8a; }}
        .btn-pdf-cycle {{ background: #991b1b; color: #ffffff; }}
        .btn-pdf-cycle:hover {{ background: #7f1d1d; }}
        .btn-word-fiches {{ background: #006233; color: #ffffff; }}
        .btn-word-fiches:hover {{ background: #064e3b; }}
        .btn-pdf-fiches {{ background: #0f172a; color: #ffffff; }}
        .btn-pdf-fiches:hover {{ background: #1e293b; }}
        .btn-copy-doc {{ background: #ffffff; color: var(--text-primary); border: 1px solid var(--border); }}
        .btn-copy-doc:hover {{ border-color: var(--primary); color: var(--primary); }}

        /* Professional A4 Document Viewer */
        .viewer-canvas {{ background: #cbd5e1; padding: 1.75rem 1.25rem; max-height: 820px; overflow-y: auto; }}
        .a4-sheet {{ background: #ffffff; max-width: 960px; margin: 0 auto; padding: 2rem 2.25rem; border-radius: 6px; box-shadow: 0 10px 30px rgba(15,23,42,0.18); color: #0f172a; font-size: 0.9rem; line-height: 1.6; }}
        .a4-header-table {{ width: 100%; border-collapse: collapse; margin-bottom: 1.15rem; border-bottom: 3px double #0f172a; padding-bottom: 0.75rem; }}
        .a4-header-table td {{ border: none !important; padding: 0.2rem 0 !important; vertical-align: top; font-size: 0.84rem; }}
        .a4-doc-title {{ text-align: center; background: #f1f5f9; border: 2px solid #0f172a; padding: 0.7rem 1rem; margin: 0.85rem 0 1.15rem; border-radius: 6px; }}
        .a4-doc-title h3 {{ font-size: 1.12rem; font-weight: 900; color: #991b1b; text-transform: uppercase; margin: 0; }}
        .a4-doc-title p {{ font-size: 0.84rem; font-weight: 700; color: #0f172a; margin: 0.2rem 0 0; }}
        .a4-meta-box {{ background: #f8fafc; border: 1px solid #94a3b8; border-radius: 6px; padding: 0.85rem 1rem; margin-bottom: 1.15rem; font-size: 0.85rem; }}
        .a4-meta-box p {{ margin-bottom: 0.35rem; }}
        .a4-meta-box p:last-child {{ margin-bottom: 0; }}
        .a4-table {{ width: 100%; border-collapse: collapse; margin: 0.85rem 0 1.25rem; font-size: 0.83rem; }}
        .a4-table th {{ background: #0f172a; color: #ffffff; font-weight: 800; padding: 0.6rem 0.7rem; border: 1px solid #0f172a; text-align: left; }}
        .a4-table td {{ padding: 0.6rem 0.7rem; border: 1px solid #64748b; vertical-align: top; color: #0f172a; }}
        .a4-table tr:nth-child(even) td {{ background: #f8fafc; }}
        .seance-fiche-block {{ border: 2px solid #0f172a; border-radius: 8px; margin-bottom: 1.5rem; page-break-inside: avoid; overflow: hidden; }}
        .seance-fiche-head {{ background: #991b1b; color: #ffffff; padding: 0.65rem 1rem; display: flex; justify-content: space-between; align-items: center; font-weight: 800; font-size: 0.9rem; }}

        /* Content Cards for Volet ATD, Grilles, Terrain & Articles */
        .content-panel-card {{ background: #ffffff; border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 1.75rem; margin-bottom: 1.5rem; box-shadow: var(--shadow-sm); }}
        .content-panel-card h2 {{ font-size: 1.38rem; font-weight: 900; color: var(--text-primary); margin-bottom: 0.85rem; padding-bottom: 0.5rem; border-bottom: 3px solid var(--primary); }}
        .content-panel-card h3 {{ font-size: 1.12rem; font-weight: 800; color: var(--primary); margin: 1.35rem 0 0.55rem; }}
        .atd-grid-2 {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.1rem; margin: 1rem 0; }}
        .atd-box {{ background: #f8fafc; border: 1px solid var(--border); border-left: 4px solid var(--secondary); padding: 1.15rem; border-radius: 10px; }}
        .atd-box h4 {{ font-size: 0.98rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.45rem; }}
        .atd-box ul {{ padding-left: 1.25rem; font-size: 0.88rem; color: var(--text-secondary); }}
        .atd-box li {{ margin-bottom: 0.35rem; }}

        /* Related Articles Grid */
        .articles-cards-grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.2rem; margin-top: 1.25rem; }}
        .rel-card {{ background: #ffffff; border: 1px solid var(--border); border-radius: 12px; padding: 1.3rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: var(--shadow-sm); transition: all 0.2s; }}
        .rel-card:hover {{ border-color: var(--primary); transform: translateY(-2px); }}
        .rel-card-kicker {{ font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: var(--primary); margin-bottom: 0.35rem; }}
        .rel-card h3 {{ font-size: 1.05rem; font-weight: 800; color: var(--text-primary); margin: 0 0 0.5rem; line-height: 1.35; }}
        .rel-card p {{ font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 1rem; }}
        .rel-card-link {{ font-size: 0.84rem; font-weight: 800; color: var(--primary); display: inline-flex; align-items: center; gap: 0.3rem; }}

        @media (max-width: 960px) {{
            .silo-intro-box {{ grid-template-columns: 1fr; }}
            .school-level-tabs {{ grid-template-columns: repeat(3, 1fr); }}
            .practice-level-tabs {{ grid-template-columns: repeat(2, 1fr); }}
            .meta-and-view-grid {{ grid-template-columns: 1fr; }}
            .custom-inputs-row {{ grid-template-columns: 1fr; }}
        }}
        @media (max-width: 560px) {{
            .school-level-tabs {{ grid-template-columns: repeat(2, 1fr); }}
            .practice-level-tabs {{ grid-template-columns: 1fr; }}
        }}
    </style>
</head>
<body>
{navbar_custom}

    <!-- EN-TÊTE & INTRODUCTION PÉDAGOGIQUE DU HANDBALL -->
    <header class="silo-hero">
        <div class="silo-hero-inner">
            <nav class="silo-breadcrumb" aria-label="Fil d'Ariane">
                <a href="index.html">Accueil</a> <span>›</span>
                <a href="hub-aps-sports-eps-maroc.html">Portail des APS &amp; Sports</a> <span>›</span>
                <span style="color:#991b1b;">Handball EPS Maroc (1AC à 2Bac)</span>
            </nav>
            <h1 class="silo-title">🤾 Handball en EPS au Maroc : ATD, Studio des Cycles &amp; Fiches (1AC à 2Bac) et Grilles d'Observation &amp; d'Évaluation (/20)</h1>

            <div class="silo-intro-box">
                <div class="silo-intro-text">
                    <strong style="color:#0f172a;display:block;margin-bottom:0.3rem;font-size:1rem;">Introduction Didactique &amp; Spécificité du Handball Scolaire au Maroc (OP 2009 &amp; OP 2007) :</strong>
                    Le <strong>Handball (كرة اليد)</strong> est le sport collectif de démarquage et d'interpénétration numéro 1 dans les collèges et lycées marocains. Grâce à la préhension manuelle du ballon et à une cible verticale protégée par une zone de 6 mètres interdite aux joueurs de champ, il permet de développer rapidement la prise d'information, la solidarité collective et la gestion de l'alternative <em>« Passer, Dribbler ou Tirer »</em>. Retrouvez sur cette page unique : le <strong>Studio interactif de génération et visionnage pro (A4) des Cycles et Fiches de séances du 1AC au 2Bac (4 niveaux de pratique par classe)</strong>, l'<strong>ATD complet</strong>, les <strong>Grilles d'observation et d'évaluation (/20)</strong> et tous nos articles spécialisés.
                </div>
                <div class="specs-strip">
                    <div><strong>Terrain Officiel IHF</strong>40 m × 20 m · Zone but : 6 m · Jet franc : 9 m · Penalty : 7 m</div>
                    <div><strong>Cages &amp; Temps</strong>Buts : 3 m × 2 m · 3 pas max · 3 secondes max balle en main</div>
                    <div><strong>Ballons Scolaires</strong>Collège / Filles : Taille 1 (50-52cm) · Lycée Garçons : Taille 2 (54-56cm)</div>
                    <div><strong>Évaluation OP</strong>Collège (143-09) : 12+3+5 (/20) · Lycée (142-10) : 14+3+3 (/20)</div>
                </div>
            </div>
        </div>
    </header>

    <!-- BARRE DE NAVIGATION INTERNE EN 5 VOLETS (UX CLAIRE & RAPIDE) -->
    <div class="volet-nav-wrapper">
        <div class="volet-nav">
            <div class="volet-tabs" role="tablist" aria-label="Sections du Silo Handball">
                <button type="button" class="volet-tab-btn active" id="tab-btn-studio" onclick="switchHandballVolet('studio')">⚡ 1. Studio Cycles &amp; Fiches (1AC → 2Bac)</button>
                <button type="button" class="volet-tab-btn" id="tab-btn-atd" onclick="switchHandballVolet('atd')">📐 2. ATD Handball Complet</button>
                <button type="button" class="volet-tab-btn" id="tab-btn-grilles" onclick="switchHandballVolet('grilles')">📊 3. Grilles d'Observation &amp; Évaluation (/20)</button>
                <button type="button" class="volet-tab-btn" id="tab-btn-terrain" onclick="switchHandballVolet('terrain')">🏟️ 4. Terrain 40+ Élèves &amp; Arbitrage IHF</button>
                <button type="button" class="volet-tab-btn" id="tab-btn-articles" onclick="switchHandballVolet('articles')">📚 5. Articles &amp; Dossiers Handball (7)</button>
            </div>
            <a href="hub-aps-sports-eps-maroc.html" style="font-size:0.8rem;font-weight:800;color:#991b1b;">← Toutes les APS</a>
        </div>
    </div>

    <main class="silo-main">

        <!-- ================================================================== -->
        <!-- VOLET 1 : STUDIO INTERACTIF CYCLES & FICHES (1AC -> 2BAC × 4 NIV)  -->
        <!-- ================================================================== -->
        <section id="volet-studio" class="volet-panel active" aria-label="Studio Cycles et Fiches Handball">
            <div class="studio-shell">
                <div class="studio-top-bar">
                    <div>
                        <h2>⚡ Studio Professionnel Handball : Projets de Cycles &amp; Fiches de Séances (Visionnage A4 + Export Word &amp; PDF)</h2>
                        <p>Sélectionnez votre niveau scolaire (1AC à 2Bac) puis le niveau de pratique de vos élèves (Débutant à Élite) pour visualiser et télécharger le dossier complet.</p>
                    </div>
                    <span id="studioCurrentBadge" style="background:#991b1b;color:#fff;padding:0.4rem 0.85rem;border-radius:8px;font-size:0.8rem;font-weight:800;white-space:nowrap;">1AC · Niveau 1 (Débutant)</span>
                </div>

                <div class="studio-controls">
                    <!-- ÉTAPE 1 : LES 6 NIVEAUX SCOLAIRES -->
                    <div class="control-row">
                        <span class="control-label">Étape 1 — Choisissez le Niveau Scolaire (Orientations Pédagogiques 2009 Collège &amp; 2007 Lycée) :</span>
                        <div class="school-level-tabs" role="tablist">
                            <button type="button" class="school-tab active" data-school="1AC" onclick="selectSchoolLevel('1AC')">
                                <strong>1ère AC</strong>
                                <span>Collège · OP 2009</span>
                            </button>
                            <button type="button" class="school-tab" data-school="2AC" onclick="selectSchoolLevel('2AC')">
                                <strong>2ème AC</strong>
                                <span>Collège · OP 2009</span>
                            </button>
                            <button type="button" class="school-tab" data-school="3AC" onclick="selectSchoolLevel('3AC')">
                                <strong>3ème AC</strong>
                                <span>Collège · OP 2009</span>
                            </button>
                            <button type="button" class="school-tab" data-school="TC" onclick="selectSchoolLevel('TC')">
                                <strong>Tronc Commun</strong>
                                <span>Lycée · OP 2007</span>
                            </button>
                            <button type="button" class="school-tab" data-school="1BAC" onclick="selectSchoolLevel('1BAC')">
                                <strong>1ère Bac</strong>
                                <span>Lycée · OP 2007</span>
                            </button>
                            <button type="button" class="school-tab" data-school="2BAC" onclick="selectSchoolLevel('2BAC')">
                                <strong>2ème Bac</strong>
                                <span>Bac Sport · OP 2007</span>
                            </button>
                        </div>
                    </div>

                    <!-- ÉTAPE 2 : LES 4 NIVEAUX DE PRATIQUE -->
                    <div class="control-row">
                        <span class="control-label">Étape 2 — Choisissez le Niveau de Pratique de votre Classe dans ce Niveau Scolaire :</span>
                        <div class="practice-level-tabs" role="tablist">
                            <button type="button" class="practice-tab active" data-practice="N1" onclick="selectPracticeLevel('N1')">
                                <strong>Niveau 1 · Débutant</strong>
                                <span>Sortir de la grappe, conserver la balle et progresser en passes courtes</span>
                            </button>
                            <button type="button" class="practice-tab" data-practice="N2" onclick="selectPracticeLevel('N2')">
                                <strong>Niveau 2 · Débrouillé</strong>
                                <span>Couloir de jeu direct, montée de balle rapide et tir en course cadré</span>
                            </button>
                            <button type="button" class="practice-tab" data-practice="N3" onclick="selectPracticeLevel('N3')">
                                <strong>Niveau 3 · Confirmé</strong>
                                <span>Attaque placée en surnombre, jeu sur les ailes et défense étagée</span>
                            </button>
                            <button type="button" class="practice-tab" data-practice="N4" onclick="selectPracticeLevel('N4')">
                                <strong>Niveau 4 · Élite / ASS</strong>
                                <span>Combinaisons tactiques (croisé, bloc), transition rapide et défense 5-1 / 6-0</span>
                            </button>
                        </div>
                    </div>

                    <!-- ÉTAPE 3 : MODE DE VISIONNAGE & PERSONNALISATION EN-TÊTE -->
                    <div class="meta-and-view-grid">
                        <div>
                            <span class="control-label" style="display:block;margin-bottom:0.35rem;">Étape 3 — Document affiché dans la Visionneuse Pro :</span>
                            <div class="view-mode-group">
                                <button type="button" class="view-mode-btn active" id="vmode-ppc" onclick="selectViewMode('ppc')">📋 Projet de Cycle (PPC)</button>
                                <button type="button" class="view-mode-btn" id="vmode-all-fiches" onclick="selectViewMode('all_fiches')">📚 Les 10 Fiches de Séance</button>
                                <button type="button" class="view-mode-btn" id="vmode-single-fiche" onclick="selectViewMode('single_fiche')">🔍 Fiche par Séance</button>
                            </div>
                            <div id="singleSeanceSelectorWrap" style="display:none;margin-top:0.5rem;">
                                <select id="singleSeanceSelect" class="seance-select" onchange="renderStudioPreview()">
                                    <option value="0">Séance 1 — Évaluation Diagnostique (Situation de Référence)</option>
                                    <option value="1">Séance 2 — Conservation du ballon &amp; démarquage d'appui</option>
                                    <option value="2">Séance 3 — Progression rapide vers la cible en couloir direct</option>
                                    <option value="3">Séance 4 — Enchaînement Réception - 3 pas - Tir en course</option>
                                    <option value="4">Séance 5 — Exploiter le surnombre offensif (3c2 / 4c3)</option>
                                    <option value="5">Séance 6 — Écarter le jeu sur les ailes &amp; tir excentré</option>
                                    <option value="6">Séance 7 — Organisation défensive (Récupération &amp; Repli)</option>
                                    <option value="7">Séance 8 — Transition Défense-Attaque (Contre-attaque)</option>
                                    <option value="8">Séance 9 — Match dirigé à thème &amp; Rôles sociaux (Arbitrage)</option>
                                    <option value="9">Séance 10 — Évaluation Sommative Finale (/20)</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <span class="control-label" style="display:block;margin-bottom:0.35rem;">Personnaliser l'en-tête officiel avant export (Optionnel) :</span>
                            <div class="custom-inputs-row">
                                <input type="text" id="inpProfName" placeholder="Nom du Professeur..." oninput="renderStudioPreview()">
                                <input type="text" id="inpEtabName" placeholder="Établissement / Lycée..." oninput="renderStudioPreview()">
                                <input type="text" id="inpArefName" placeholder="AREF / Direction..." oninput="renderStudioPreview()">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- BARRE DES 4 BOUTONS DE TÉLÉCHARGEMENT (PROJET DE CYCLE WORD/PDF + FICHES PÉDAGOGIQUES WORD/PDF) -->
                <div class="export-action-bar">
                    <div class="export-btn-group">
                        <button type="button" class="btn-export btn-word-cycle" onclick="exportHandballDoc('ppc', 'word')">📝 Projet de Cycle (.doc Word)</button>
                        <button type="button" class="btn-export btn-pdf-cycle" onclick="exportHandballDoc('ppc', 'pdf')">📄 Projet de Cycle (PDF A4)</button>
                        <button type="button" class="btn-export btn-word-fiches" onclick="exportHandballDoc('fiches', 'word')">📝 Fiches Pédagogiques (.doc Word)</button>
                        <button type="button" class="btn-export btn-pdf-fiches" onclick="exportHandballDoc('fiches', 'pdf')">📄 Fiches Pédagogiques (PDF A4)</button>
                    </div>
                    <button type="button" class="btn-export btn-copy-doc" onclick="copyCurrentPreview(this)">📋 Copier l'aperçu</button>
                </div>

                <!-- VISIONNEUSE PROFESSIONNELLE A4 EN DIRECT -->
                <div class="viewer-canvas">
                    <div id="studioA4Preview" class="a4-sheet">
                        <!-- Injecté dynamiquement par JS dès le chargement -->
                    </div>
                </div>
            </div>
        </section>

        <!-- ================================================================== -->
        <!-- VOLET 2 : ANALYSE ET TRAITEMENT DIDACTIQUE (ATD) DU HANDBALL       -->
        <!-- ================================================================== -->
        <section id="volet-atd" class="volet-panel" aria-label="Analyse et Traitement Didactique Handball">
            <div class="content-panel-card">
                <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;margin-bottom:1rem;">
                    <div>
                        <span style="font-size:0.78rem;font-weight:800;color:#006233;text-transform:uppercase;">Référentiel Didactique Officiel · Concours CRMEF, CAPEP &amp; Dossier Pédagogique</span>
                        <h2 style="border:none;margin:0.2rem 0 0;padding:0;">📐 Analyse et Traitement Didactique (ATD) du Handball en EPS</h2>
                    </div>
                    <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
                        <button type="button" class="btn-export btn-word-cycle" onclick="exportElementAsWord('atdPrintableContent', 'ATD-Handball-EPS-Maroc')">📝 Télécharger ATD (.doc Word)</button>
                        <button type="button" class="btn-export btn-pdf-cycle" onclick="printElementAsPdf('atdPrintableContent', 'ATD Handball EPS Maroc')">📄 Imprimer / PDF A4</button>
                    </div>
                </div>

                <div id="atdPrintableContent">
                    <h3>1. Définition &amp; Logique Interne du Handball</h3>
                    <p>Le <strong>Handball</strong> est un sport collectif de démarquage et d'interpénétration codifié, opposant deux équipes de <strong>7 joueurs</strong> (6 joueurs de champ et 1 gardien de but) sur un espace rectangulaire de <strong>40 m × 20 m</strong>. L'objectif est de faire pénétrer le ballon (joué exclusivement à la main par les joueurs de champ) plus souvent que l'adversaire dans une <strong>cible verticale (3 m × 2 m)</strong> protégée par un gardien et une <strong>zone restrictive de 6 mètres</strong>, tout en respectant les règles fondamentales du déplacement avec ballon (<strong>3 pas maximum, 3 secondes maximum, interdiction du double dribble et du contact irrégulier</strong>).</p>

                    <div class="atd-grid-2">
                        <div class="atd-box">
                            <h4>🎯 Problèmes Fondamentaux du Handball</h4>
                            <ul>
                                <li><strong>Gérer l'alternative offensive (Passer / Dribbler / Tirer) :</strong> Choisir rapidement entre conserver, faire progresser le ballon vers un partenaire démarqué ou tirer en fonction du placement des défenseurs.</li>
                                <li><strong>Assurer la continuité du mouvement vers la cible :</strong> Se déplacer à distance de passe (en appui ou en soutien) hors de l'ombre du défenseur (couloir de passe).</li>
                                <li><strong>Dissocier le train supérieur du train inférieur :</strong> Courir, sauter à l'extérieur des 6 m et armer le bras haut pour tirer en suspension avant de retomber dans la zone.</li>
                                <li><strong>Coordonner les actions défensives :</strong> Passer de la poursuite individuelle du ballon au repli défensif et à la protection collective de l'axe central (zone des 6m-9m).</li>
                            </ul>
                        </div>
                        <div class="atd-box" style="border-left-color:#991b1b;">
                            <h4>🌱 Enjeux de Formation pour l'Élève Marocain (OP 2007/2009)</h4>
                            <ul>
                                <li><strong>Plan Moteur &amp; Psychomoteur :</strong> Coordination motrice (courir-recevoir-passer-tirer), dissociation segmentaire, adresse manuelle et vitesse de réaction.</li>
                                <li><strong>Plan Cognitif &amp; Tactique :</strong> Lecture rapide du rapport de force (surnombre vs égalité numérique), prise de décision sous pression temporelle (règle des 3 secondes).</li>
                                <li><strong>Plan Socio-Affectif &amp; Citoyen :</strong> Maîtrise de soi dans un sport de contact réglementé, solidarité collective, acceptation de la décision arbitrale et exercice des rôles sociaux (arbitre IHF, observateur statistique, chef d'équipe).</li>
                            </ul>
                        </div>
                    </div>

                    <h3>2. Modélisation Didactique des 4 Niveaux d'Habileté en Handball Scolaire</h3>
                    <div class="table-wrap" style="margin-top:0.75rem;">
                        <table class="a4-table">
                            <thead>
                                <tr>
                                    <th>Niveau Didactique</th>
                                    <th>Comportements Initiaux Observables (Porteur / Non-Porteur / Défense)</th>
                                    <th>Thème d'Étude Prioritaire &amp; Objectif de Transformation</th>
                                    <th>Situation de Référence Évolutive</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Niveau 1<br>Débutant (Grappe)</strong></td>
                                    <td>Attroupement autour du ballon (« grappe »), regard rivé sur le ballon, passes en cloche aléatoires, marcher fréquent, tirs à l'arrêt loin du but.</td>
                                    <td>Sortir de la grappe, contrôler le ballon à deux mains, respecter les 3 pas et progresser par passes courtes vers l'avant sans perte de balle.</td>
                                    <td>Jeu 4c4 ou 5c5 sur terrain réduit avec zones latérales protégées et bonus aux passes avant tir.</td>
                                </tr>
                                <tr>
                                    <td><strong>Niveau 2<br>Débrouillé (Jeu direct)</strong></td>
                                    <td>Jeu centré dans l'axe, abus du dribble individuel, appels de balle à l'arrêt, tirs précipités face au gardien sans cadrage.</td>
                                    <td>Construire une montée de balle rapide dans le couloir de jeu direct (appui/soutien) et enchaîner réception-3 pas-tir en course cadré.</td>
                                    <td>Situation 4c3 puis 5c5 avec obligation de franchir la zone médiane en moins de 4 passes sans dribble.</td>
                                </tr>
                                <tr>
                                    <td><strong>Niveau 3<br>Confirmé (Jeu placé)</strong></td>
                                    <td>Progression rapide mais blocage face à une défense repliée sur les 6 mètres, oubli des partenaires sur les ailes.</td>
                                    <td>Alterner contre-attaque rapide et attaque placée : fixer la défense dans l'axe pour décaler sur les ailes et tirer en suspension dans les intervalles.</td>
                                    <td>Match 6c6 avec bonification des buts marqués sur fixation-passe à l'aile ou sur contre-attaque en &lt; 6 secondes.</td>
                                </tr>
                                <tr>
                                    <td><strong>Niveau 4<br>Élite / ASS</strong></td>
                                    <td>Maîtrise technique individuelle acquise mais manque de synchronisation collective face à une défense étagée (5-1 ou 3-2-1).</td>
                                    <td>Mettre en œuvre un projet tactique collectif (croisé, écran/bloc, circulation de balle et de joueurs) et adapter le système défensif (6-0 / 5-1).</td>
                                    <td>Match officiel 7c7 IHF avec contrat tactique par mi-temps et analyse statistique de l'efficacité.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================================================================== -->
        <!-- VOLET 3 : GRILLES D'OBSERVATION & D'ÉVALUATION SOMMATIVE (/20)     -->
        <!-- ================================================================== -->
        <section id="volet-grilles" class="volet-panel" aria-label="Grilles d'Observation et d'Évaluation Handball">
            <div class="studio-shell">
                <div class="studio-top-bar" style="background:#006233;">
                    <div>
                        <h2>📊 Grilles Officielles d'Observation &amp; d'Évaluation Sommative Handball (/20)</h2>
                        <p>Conformes aux Notes ministérielles n° 143-09 (Collège OP 2009) et n° 142-10 (Lycée Qualifiant &amp; Bac OP 2007) — Prêtes à imprimer en A4 ou télécharger en Word.</p>
                    </div>
                </div>

                <div class="studio-controls">
                    <span class="control-label">Choisissez la Grille à visualiser et télécharger :</span>
                    <div class="practice-level-tabs">
                        <button type="button" class="practice-tab active" data-grille="diag" onclick="selectHandballGrille('diag', this)">
                            <strong>1. Fiche d'Observation Diagnostique</strong>
                            <span>Recueil statistique en binôme (Séance 1 &amp; Évaluation formative)</span>
                        </button>
                        <button type="button" class="practice-tab" data-grille="college" onclick="selectHandballGrille('college', this)">
                            <strong>2. Grille Sommative Collège (/20)</strong>
                            <span>1AC · 2AC · 3AC (OP 2009 &amp; Note 143-09 : 12 + 3 + 5 pts)</span>
                        </button>
                        <button type="button" class="practice-tab" data-grille="lycee" onclick="selectHandballGrille('lycee', this)">
                            <strong>3. Grille Sommative Lycée &amp; Bac (/20)</strong>
                            <span>TC · 1Bac · 2Bac (OP 2007 &amp; Note 142-10 : 14 + 3 + 3 pts)</span>
                        </button>
                        <button type="button" class="practice-tab" data-grille="dispense" onclick="selectHandballGrille('dispense', this)">
                            <strong>4. Grille Élève Dispensé &amp; Arbitre (/20)</strong>
                            <span>Évaluation théorique, arbitrage IHF et observation</span>
                        </button>
                    </div>
                </div>

                <div class="export-action-bar" style="background:#f0fdf4;border-color:#bbf7d0;">
                    <div class="export-btn-group">
                        <button type="button" class="btn-export btn-word-fiches" onclick="exportElementAsWord('grilleA4Preview', 'Grille-Evaluation-Handball-EPS-Maroc')">📝 Télécharger cette Grille (.doc Word)</button>
                        <button type="button" class="btn-export btn-pdf-fiches" onclick="printElementAsPdf('grilleA4Preview', 'Grille Evaluation Handball EPS Maroc')">📄 Imprimer / Télécharger en PDF A4</button>
                    </div>
                    <button type="button" class="btn-export btn-copy-doc" onclick="copyGrillePreview(this)">📋 Copier la grille</button>
                </div>

                <div class="viewer-canvas">
                    <div id="grilleA4Preview" class="a4-sheet">
                        <!-- Injecté dynamiquement par JS -->
                    </div>
                </div>
            </div>
        </section>

        <!-- ================================================================== -->
        <!-- VOLET 4 : TERRAIN MAROC (40+ ÉLÈVES), ÉCHAUFFEMENT & ARBITRAGE IHF -->
        <!-- ================================================================== -->
        <section id="volet-terrain" class="volet-panel" aria-label="Gestion Grands Effectifs et Arbitrage Handball">
            <div class="content-panel-card">
                <h2>🏟️ Gérer 40 à 44 Élèves en Handball sur un Seul Terrain avec Peu de Matériel</h2>
                <p>Dans la réalité des collèges et lycées marocains, les classes comptent fréquemment entre 38 et 44 élèves pour un seul terrain de handball (40×20m) et 4 à 6 ballons. Voici les deux dispositifs d'organisation terrain qui garantissent un Temps d'Engagement Moteur (TEM) optimal et une sécurité totale :</p>

                <div class="atd-grid-2">
                    <div class="atd-box">
                        <h4>Dispositif A : La Formule « 3 Terrains Transversaux » (Séances d'apprentissage 2 à 7)</h4>
                        <ul>
                            <li><strong>Découpage de l'espace :</strong> Utilisez la largeur du terrain de handball (20m) pour tracer avec des plots <strong>3 couloirs transversaux de 20m × 13m</strong>.</li>
                            <li><strong>Rotation des 42 élèves :</strong> 6 équipes de 6 joueurs (36 élèves actifs simultanément en 3c3 ou 4c2 sur les 3 mini-terrains) + 6 élèves responsables du chronométrage, de l'arbitrage et des cibles aux plots.</li>
                            <li><strong>Avantage :</strong> 85% des élèves sont en activité motrice simultanée avec seulement 3 à 6 ballons.</li>
                        </ul>
                    </div>
                    <div class="atd-box" style="border-left-color:#991b1b;">
                        <h4>Dispositif B : Le Tournoi Triangulaire Rotatif de 6 Minutes (Séances 1, 8, 9, 10)</h4>
                        <ul>
                            <li><strong>Répartition de la classe en 6 équipes homogènes de 6 ou 7 élèves (Équipes A, B, C, D, E, F) :</strong></li>
                            <li><strong>Séquence 1 :</strong> A joue contre B sur le grand terrain · C observe et relève les statistiques de A et B en binôme · D arbitre à 2 arbitres + tient la table de marque · E et F travaillent en atelier autonome de tirs/passes sur le côté sécurisé.</li>
                            <li><strong>Rotation toutes les 6 minutes</strong> au coup de sifflet du professeur.</li>
                        </ul>
                    </div>
                </div>

                <h3>🔥 Protocole d'Échauffement Spécifique Handball (12 minutes)</h3>
                <ol style="padding-left:1.5rem;font-size:0.9rem;color:#334155;">
                    <li><strong>Phase 1 — Activation Cardio-Pulmonaire Générale (3 min) :</strong> Course légère autour du terrain (40×20m) avec variations au coup de sifflet (pas chassés, talons-fesses, montées de genoux, changements de direction à 90°).</li>
                    <li><strong>Phase 2 — Mobilisation Articulaire Spécifique Handball (4 min) :</strong> Insister impérativement sur les <strong>épaules</strong> (circumductions bras tendus, ouvertures thoraciques), les <strong>coudes, poignets et doigts</strong> (prévention des entorses digitales) ainsi que les <strong>chevilles et genoux</strong> (réceptions de sauts).</li>
                    <li><strong>Phase 3 — Échauffement Dynamique avec Ballon &amp; Gardien (5 min) :</strong> Passes à deux en course sur la longueur, puis échauffement progressif du gardien de but (tirs sur les mains, à mi-hauteur, puis dans les coins bas, sans jamais tirer au visage).</li>
                </ol>

                <h3>⚖️ Rappel Express des Règles IHF 2026 pour l'Élève Arbitre</h3>
                <div class="table-wrap">
                    <table class="a4-table">
                        <thead>
                            <tr>
                                <th>Règle Fondamentale IHF</th>
                                <th>Application Scolaire en EPS</th>
                                <th>Sanction / Remise en Jeu</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Marcher &amp; 3 Secondes (Règle 7)</strong></td>
                                <td>Maximum <strong>3 pas</strong> balle en main sans dribbler ; maximum <strong>3 secondes</strong> balle tenue à l'arrêt.</td>
                                <td>Jet franc direct pour l'équipe adverse à l'endroit de la faute.</td>
                            </tr>
                            <tr>
                                <td><strong>Double Dribble &amp; Pied (Règle 7)</strong></td>
                                <td>Interdiction de dribbler, tenir la balle à 2 mains puis redribbler. Interdiction de toucher la balle avec le pied/jambe sous le genou.</td>
                                <td>Perte de balle — Jet franc pour l'adversaire.</td>
                            </tr>
                            <tr>
                                <td><strong>Empiètement Zone des 6m (Règle 6)</strong></td>
                                <td>Aucun joueur de champ (attaquant ou défenseur) n'a le droit de poser un pied sur ou à l'intérieur de la ligne des 6m (sauf en l'air après impulsion avant les 6m et lâcher de balle avant de toucher le sol).</td>
                                <td>Renvoi par le gardien (si faute d'attaquant) ou Jet de 7m (si défenseur en zone empêchant une occasion nette de but).</td>
                            </tr>
                            <tr>
                                <td><strong>Contact Défensif (Règle 8 &amp; 16)</strong></td>
                                <td>Le défenseur peut faire obstacle avec son buste face à l'attaquant, mais il est formellement interdit de pousser, ceinturer, tirer le maillot ou frapper le bras armé du tireur.</td>
                                <td>Jet franc à 9m (ou Jet de 7m si occasion manifeste de but) + Exclusion temporaire de <strong>2 minutes</strong> en cas de faute dangereuse.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        <!-- ================================================================== -->
        <!-- VOLET 5 : CARTES DE TOUS LES ARTICLES & DOSSIERS HANDBALL DU SITE  -->
        <!-- ================================================================== -->
        <section id="volet-articles" class="volet-panel" aria-label="Articles et Dossiers Handball sur ProfEPS">
            <div class="content-panel-card">
                <h2>📚 Bibliothèque Complète des Articles &amp; Dossiers Handball sur ProfEPS Maroc</h2>
                <p>Consultez nos guides d'approfondissement didactique, réglementaire et pédagogique consacrés au Handball et à son enseignement au collège et au lycée :</p>

                <div class="articles-cards-grid">
                    <article class="rel-card">
                        <div>
                            <div class="rel-card-kicker">Règlement Officiel &amp; Arbitrage · IHF 2026</div>
                            <h3>Règlement Handball (Lois IHF 2026 &amp; 18 Gestes d'Arbitrage) : Terrain 40×20m, Signes Illustrés &amp; PDF</h3>
                            <p>Dossier complet sur les Règles du Jeu IHF 2025-2026 : tracé du terrain, zone des 6m, 3 pas/3s, jeu passif à 4 passes, échelle des sanctions et les 18 gestes officiels d'arbitrage expliqués.</p>
                        </div>
                        <a href="reglement-handball-ihf-gestes-arbitrage-eps.html" class="rel-card-link">Consulter le Règlement IHF &amp; les 18 Gestes →</a>
                    </article>

                    <article class="rel-card">
                        <div>
                            <div class="rel-card-kicker">Guide Didactique Complet · Collège &amp; Lycée</div>
                            <h3>Handball en EPS au Maroc : Guide Pédagogique, Situations d'Apprentissage &amp; Défense Étagée</h3>
                            <p>Analyse approfondie de la circulation de balle, de la montée de balle en surnombre, du tir en suspension et du passage de la défense individuelle à la défense de zone étagée.</p>
                        </div>
                        <a href="article-handball-eps.html" class="rel-card-link">Lire le guide pédagogique Handball →</a>
                    </article>

                    <article class="rel-card">
                        <div>
                            <div class="rel-card-kicker">Cycle Secondaire Collégial · OP 2009</div>
                            <h3>Cycle Handball Collège EPS Maroc : Progression Détaillée de 10 Séances &amp; Grille OP 2009</h3>
                            <p>Dossier pédagogique dédié au cycle collégial (1AC, 2AC, 3AC) : situations de passe et va, jeu en appui-soutien, tir en course et arbitrage autonome.</p>
                        </div>
                        <a href="cycle-handball-college-eps-maroc.html" class="rel-card-link">Voir le dossier Cycle Handball Collège →</a>
                    </article>

                    <article class="rel-card">
                        <div>
                            <div class="rel-card-kicker">Cycle Secondaire Qualifiant · OP 2007</div>
                            <h3>Cycle Handball Lycée EPS Maroc : Progression de 10 Séances, Contre-Attaque &amp; Attaque Placée</h3>
                            <p>Dossier pédagogique pour le Tronc Commun, 1ère Bac et 2ème Bac : attaque de zone 6-0/5-1, jeu sur les ailes, transition rapide et barème sur 20 points.</p>
                        </div>
                        <a href="cycle-handball-lycee-eps-maroc.html" class="rel-card-link">Voir le dossier Cycle Handball Lycée →</a>
                    </article>

                    <article class="rel-card">
                        <div>
                            <div class="rel-card-kicker">Fiches ATD Officielles · PDF</div>
                            <h3>Analyses et Traitements Didactiques (ATD) des APS au Maroc : Dossier Complet Handball &amp; Sports Co</h3>
                            <p>Téléchargez les fiches ATD synthétiques (Logique interne, Problèmes fondamentaux, Enjeux de formation) pour préparer vos dossiers d'inspection et le concours CRMEF.</p>
                        </div>
                        <a href="ressources-atd.html" class="rel-card-link">Accéder aux Fiches ATD PDF →</a>
                    </article>

                    <article class="rel-card">
                        <div>
                            <div class="rel-card-kicker">Pédagogie de Terrain · 40+ Élèves</div>
                            <h3>Gérer une Classe de 40+ Élèves et Évaluer les Élèves Dispensés en EPS au Maroc</h3>
                            <p>Méthodes concrètes de gestion des grands effectifs en sports collectifs (tournoi triangulaire, ateliers rotatifs) et grilles de notation des élèves dispensés sur 20 points.</p>
                        </div>
                        <a href="article-gestion-grands-effectifs-dispenses-eps-maroc.html" class="rel-card-link">Consulter le guide Grands Effectifs →</a>
                    </article>

                    <article class="rel-card">
                        <div>
                            <div class="rel-card-kicker">Sport Scolaire ASS &amp; Législation</div>
                            <h3>Déplacements Sport Scolaire (ASS &amp; FRMSS) : Loi 30-09, Décret 2.10.628 &amp; Ordre de Mission</h3>
                            <p>Toutes les procédures légales et les modèles d'Ordre de Mission et d'Autorisation Parentale (FR/AR) pour accompagner votre équipe de Handball aux tournois provinciaux FRMSS.</p>
                        </div>
                        <a href="deplacement-sport-scolaire-ass-frmss-ordre-mission-eps.html" class="rel-card-link">Voir la procédure &amp; les modèles ASS →</a>
                    </article>
                </div>
            </div>
        </section>

    </main>

    <!-- SCRIPT INTERACTIF DU STUDIO HANDBALL (6 NIVEAUX × 4 NIVEAUX DE PRATIQUE + GRILLES + EXPORT WORD/PDF) -->
    <script>
      var HB_SCHOOL_LEVELS = {{
        "1AC": {{
          label: "1ère Année Collège (1AC)",
          ref: "Orientations Pédagogiques 2009 (Cycle Secondaire Collégial) · Note n° 143-09",
          oti: "L'élève de la 1ère année collégiale doit pouvoir acquérir une motricité correcte lui permettant de s'adapter aux exigences des situations (forme et rythme) et s'intégrer dans le groupe.",
          comp: "S'approprier les règles fondamentales du jeu collectif, maîtriser la manipulation de balle à deux mains et coopérer avec ses partenaires pour faire progresser le ballon vers la cible adverse.",
          bareme: "Habiletés motrices : 12 pts (Produit 6 pts + Processus 6 pts) · Connaissances conceptuelles : 3 pts · Comportement & Rôles sociaux : 5 pts"
        }},
        "2AC": {{
          label: "2ème Année Collège (2AC)",
          ref: "Orientations Pédagogiques 2009 (Cycle Secondaire Collégial) · Note n° 143-09",
          oti: "L'élève de la 2ème année collégiale doit pouvoir ajuster l'énergie physique et la maîtriser et fournir l'effort et l'orienter pour effectuer des réalisations coordonnées et organisées, et communiquer avec les autres.",
          comp: "Rechercher le gain de la rencontre par la mise en place d'une attaque rapide basée sur le démarquage en appui/soutien et l'enchaînement réception-3 pas-tir cadré.",
          bareme: "Habiletés motrices : 12 pts (Produit 6 pts + Processus 6 pts) · Connaissances conceptuelles : 3 pts · Comportement & Rôles sociaux : 5 pts"
        }},
        "3AC": {{
          label: "3ème Année Collège (3AC)",
          ref: "Orientations Pédagogiques 2009 (Cycle Secondaire Collégial) · Note n° 143-09",
          oti: "L'élève de la 3ème année collégiale doit pouvoir ajuster les éléments de l'acte moteur et l'adapter aux différentes situations en fonction de ses exigences organisationnelles et réglementaires, et s'exercer sur la pratique des droits et devoirs pour réaliser un projet sportif individuel ou collectif.",
          comp: "Construire et exécuter un projet collectif d'attaque (exploitation du surnombre et des couloirs latéraux) et de défense de zone (6-0) tout en assumant l'arbitrage officiel.",
          bareme: "Habiletés motrices : 12 pts (Produit 6 pts + Processus 6 pts) · Connaissances conceptuelles : 3 pts · Comportement & Rôles sociaux : 5 pts"
        }},
        "TC": {{
          label: "Tronc Commun (TC)",
          ref: "Orientations Pédagogiques 2007 (Cycle Secondaire Qualifiant) · Note n° 142-10",
          oti: "L'élève du Tronc Commun doit pouvoir maîtriser les composantes du comportement moteur et pouvoir s'adapter aux différentes situations et faire face à ses défis et accepter l'intégration dans le groupe.",
          comp: "Conserver collectivement la balle et progresser rapidement dans le couloir de jeu direct pour conclure par un tir en course ou en suspension face à une défense organisée.",
          bareme: "Habiletés motrices : 14 pts (Efficacité collective/individuelle 7 pts + Processus technique/tactique 7 pts) · Connaissances conceptuelles : 3 pts · Comportement : 3 pts"
        }},
        "1BAC": {{
          label: "1ère Année Baccalauréat (1Bac)",
          ref: "Orientations Pédagogiques 2007 (Cycle Secondaire Qualifiant) · Note n° 142-10",
          oti: "L'élève de la 1ère année Bac doit pouvoir confronter les situations motrices grâce à l'adéquation des différents éléments de l'acte moteur et la planification de différents types d'effort physique individuel ou collectif.",
          comp: "Alterner jeu rapide de contre-attaque et attaque placée (fixation dans l'axe et décalage aux ailes) face à une défense de zone étagée, et participer activement au repli défensif.",
          bareme: "Habiletés motrices : 14 pts (Efficacité 7 pts + Processus 7 pts) · Connaissances conceptuelles : 3 pts · Comportement : 3 pts"
        }},
        "2BAC": {{
          label: "2ème Année Baccalauréat (2Bac)",
          ref: "Orientations Pédagogiques 2007 (Examen National / Contrôle Continu Bac Sport) · Note n° 142-10",
          oti: "L'élève de la 2ème année Bac doit pouvoir analyser différentes situations et interactions motrices et s'intégrer volontairement dans la planification et la réalisation de projets individuels et collectifs.",
          comp: "Concevoir et mettre en œuvre un projet tactique collectif offensif (combinaisons, circulation de balle et de joueurs) et défensif (système 5-1 ou 6-0) pour gagner le match dans le respect strict du code IHF.",
          bareme: "Habiletés motrices : 14 pts (Efficacité 7 pts + Processus 7 pts) · Connaissances conceptuelles : 3 pts · Comportement : 3 pts"
        }}
      }};

      var HB_PRACTICE_LEVELS = {{
        "N1": {{
          shortName: "Niveau 1 (Débutant)",
          title: "Niveau 1 — Débutant : Sortir de la grappe, conserver la balle et progresser en passes courtes",
          otcPrefix: "Rechercher le gain d'une rencontre en 5c5 ou 6c6 en rompant l'attroupement autour du ballon (la grappe) pour progresser par passes courtes assurées vers l'avant et conclure par un tir cadré à proximité des 6 mètres.",
          seances: [
            ["Séance 1 — Évaluation Diagnostique", "Identifier le niveau initial des élèves dans une situation de référence en 5c5 (2×7 min) à l'aide de la fiche d'observation binôme.", "2 terrains ou tournoi 3 équipes sur 40×20m · Matchs de 6 min.", "Respecter les 3 pas, la zone des 6m et l'interdiction de contact brutal.", "Prendre l'information avant de recevoir ; orienter ses appuis vers la cible.", "Indice collectif de conservation > 40% et au moins 3 tirs tentés par match.", "Terrain réduit en largeur ou 5c5 pour augmenter le nombre de ballons touchés."],
            ["Séance 2 — Manipulation & Passe-Réception à l'arrêt puis en mouvement", "Maîtriser la prise de balle à deux mains (panier) et la passe d'épaule tendue vers un partenaire proche.", "Couloirs de 15m × 6m · Groupes de 3 élèves avec 1 ballon (passe en triangle puis en mouvement).", "Armer le bras au-dessus de l'épaule, pied opposé au bras lanceur devant.", "Présenter une cible avec les deux mains au porteur ; amortir la réception.", "Réussir 8 passes consécutives sur 10 sans chute de balle au sol.", "Réduire ou augmenter la distance de passe (4m à 7m) ; ajouter un défenseur passif."],
            ["Séance 3 — Sortir de la grappe : Occuper l'espace en largeur", "S'écarter du porteur de balle pour offrir des solutions de passe hors de l'attroupement.", "Terrain divisé en 3 couloirs longitudinaux (gauche, centre, droite) · Situation 4c2 puis 4c3.", "Obligation d'avoir au moins un attaquant dans chaque couloir pour valider le but.", "Ne pas courir vers le porteur ; occuper un couloir libre à distance de passe (5m).", "Franchir la ligne des 9m adverses avec le ballon passé dans au moins 2 couloirs sur 3 actions.", "Interdire le dribble pour forcer la prise d'information et la passe."],
            ["Séance 4 — Respecter la règle du Marcher (3 pas) et des 3 secondes", "Se déplacer réglementairement avec le ballon sans commettre de marcher ni de double dribble.", "Atelier en vagues de 3 joueurs sur demi-terrain avec plots repères des 3 appuis.", "Compter ses appuis à haute voix (1-2-3) et lâcher la balle avant le 4ème appui.", "Poser le pied d'appel équilibré ; protéger le ballon à deux mains.", "4 montées de balle sur 5 réalisées sans aucun coup de sifflet pour marcher.", "Autoriser 1 dribble unique si aucun partenaire n'est démarqué dans les 3 secondes."],
            ["Séance 5 — Se démarquer en Appui (devant le porteur) et en Soutien", "Offrir deux solutions simultanées au porteur de balle (un joueur en avant, un joueur en soutien).", "Situation 3c1 puis 3c2 dans un espace de 20m × 12m avec cibles.", "Interdiction de dribbler ; le porteur doit avoir en permanence 2 angles de passe.", "Se déplacer dans un espace libre (hors de l'ombre du défenseur) en regardant le porteur.", "Amener la balle dans la zone de marque 3 fois sur 5 tentatives.", "Passer de 3c1 à 3c2 dès que l'équipe réussit 3 montées consécutives."],
            ["Séance 6 — Enchaîner Réception, 3 pas et Tir cadré devant le gardien", "Acquérir le rythme des 3 pas d'élan (Gauche-Droite-Gauche pour un droitier) et tirer hors des 6m.", "Demi-terrain · 2 colonnes à 11m face au but + 1 passeur fixe au centre.", "Recevoir en course, poser G-D-G sans dribbler, sauter avant la ligne des 6m et tirer.", "Armer le bras haut et viser les 4 coins du but (éviter de tirer sur le gardien).", "Cadrer 4 tirs sur 5 et marquer au moins 3 buts sur 5 face au gardien.", "Ajouter un défenseur en poursuite retardée pour imposer de la vitesse."],
            ["Séance 7 — Progresser en surnombre offensif (3c2 vers le but)", "Identifier et utiliser le partenaire libre en situation de supériorité numérique simple.", "Demi-terrain · 3 attaquants départ ligne médiane contre 2 défenseurs placés à 9m.", "Progresser en passes rapides : si le défenseur monte sur moi, je passe ; s'il recule, j'avance et je tire.", "Fixer le défenseur proche avant de lâcher la balle au partenaire démarqué.", "Terminer l'action par un tir à 6m sans opposition directe 3 fois sur 5.", "Limiter le temps de l'attaque à 8 secondes maximum."],
            ["Séance 8 — Se replier et protéger sa cible en défense", "Réagir dès la perte de balle pour revenir se placer entre l'adversaire et son propre but (zone 6m-9m).", "Jeu 4c4 sur tout le terrain · But adverse compte double si toute la défense n'est pas repliée à 9m.", "Dès la perte de balle, sprinter vers sa zone des 6m et lever les bras face au tireur.", "Se placer sur l'axe ballon-but ; ne jamais pousser dans le dos ni ceinturer.", "Récupérer ou stopper 3 attaques adverses sur 5 sans faute de 7m.", "Imposer une défense de zone 6-0 alignée sur la ligne des 6m."],
            ["Séance 9 — Match dirigé à thème & Apprentissage de l'Arbitrage IHF", "Appliquer les acquis en match 6c6 tout en assurant à tour de rôle l'arbitrage (marcher, 6m, contact).", "Tournoi triangulaire 6c6 · Matchs de 7 min · 2 arbitres-élèves + 2 observateurs.", "But de 1 pt (normal) ou 3 pts (si marqué après 3 passes sans dribble et sans marcher).", "Respecter les coups de sifflet et utiliser les gestes officiels IHF (marcher, empiètement, remise en jeu).", "80% des décisions d'arbitrage justes et respect total des règles par les joueurs.", "Accorder un point bonus d'équipe au meilleur duo d'arbitres de la séance."],
            ["Séance 10 — Évaluation Sommative Finale (/20)", "Évaluer le degré d'acquisition de la compétence visée en situation réelle de tournoi 6c6.", "Tournoi officiel par poules de niveau · Matchs de 8 min · Grille officielle OP.", "Application intégrale du règlement simplifié et rotation sur les rôles sociaux.", "Mobiliser les habiletés techniques, tactiques et citoyennes construites durant le cycle.", "Validation de la grille sommative sur 20 points (Habiletés + Connaissances + Comportement).", "Matchs équilibrés par groupes de niveau homogènes."]
          ]
        }},
        "N2": {{
          shortName: "Niveau 2 (Débrouillé)",
          title: "Niveau 2 — Débrouillé : Couloir de jeu direct, montée de balle rapide et tir en suspension",
          otcPrefix: "Rechercher le gain d'une rencontre de Handball en faisant progresser rapidement le ballon dans le couloir de jeu direct (passes en course sans rebond) pour prendre de vitesse le repli adverse et conclure par un tir en suspension cadré.",
          seances: [
            ["Séance 1 — Évaluation Diagnostique", "Évaluer la capacité des élèves à faire progresser le ballon vers la cible et à tirer en course lors d'un match 6c6.", "Terrain 40×20m · Tournoi 3 équipes · Fiche d'observation binôme.", "Règlement officiel IHF adapté · Observation des balles jouées, passes et tirs.", "Enchaîner réception et passe sans s'arrêter systématiquement.", "Taux de balles amenées en zone de tir (9m) supérieur à 50%.", "Interdire plus de 1 dribble par possession individuelle."],
            ["Séance 2 — Passe et Va en course dans le couloir de jeu direct", "Supprimer les temps d'arrêt à la réception pour transmettre le ballon en pleine course vers l'avant.", "Vagues de 3 joueurs sur 40m (3 couloirs) · Aller en 5 passes max sans dribble.", "Donner la balle en avant de la course du partenaire (passe dans la course).", "Capter la balle en mouvement sur le pied droit (droitier) et passer sur le 2ème appui.", "Franchir les 40m et tirer en moins de 7 secondes sur 4 passages sur 5.", "Ajouter un défenseur central au milieu du terrain (situation 3c1 rapide)."],
            ["Séance 3 — Le Tir en Suspension (Impulsion verticale et longitudinale)", "Franchir légalement l'espace aérien de la zone des 6m pour réduire la distance avec le gardien avant de tirer.", "Demi-terrain · 2 ateliers de tir (arrière gauche et arrière droit) avec appel sur tapis/marque à 6m20.", "Sauter sur le pied gauche (droitier), monter le genou droit, armer haut et tirer avant de retomber.", "Dissocier l'impulsion de la jambe d'appel et le fouetté du bras lanceur ; viser loin du gardien.", "Réussir 4 tirs en suspension réglementaires et cadrés sur 5 essais.", "Placer une haie basse ou un défenseur bras levés sur la ligne des 6m pour obliger à sauter haut."],
            ["Séance 4 — Gérer le Surnombre Offensif 2c1 puis 3c2 en montée de balle", "Fixer le défenseur dans son espace pour libérer le partenaire démarqué dans l'intervalle.", "Couloir central de 20m × 12m · 2c1 à l'aller, 3c2 au retour.", "Le porteur attaque l'épaule interne du défenseur : s'il flotte, je tire ; s'il monte, je passe.", "Engager franchement son duel vers le but pour obliger le défenseur à intervenir.", "Marquer ou obtenir un tir seul à 6m sur 4 attaques sur 5.", "Réduire la largeur du couloir ou limiter le nombre de passes à 3."],
            ["Séance 5 — Écarter le jeu : De la grappe centrale vers les couloirs latéraux", "Utiliser toute la largeur du terrain (20m) lorsque l'axe central est fermé par la défense.", "Demi-terrain · Situation 4c4 avec 2 zones d'ailes inattaquables par les défenseurs centraux pendant 3s.", "But marqué depuis le secteur central = 1 pt ; but marqué après passage par l'aile = 3 pts.", "Faire circuler rapidement la balle en U (Aile gauche - Arrière - Demi-centre - Arrière - Aile droite).", "Obtenir au moins 4 tirs ouverts depuis les secteurs latéraux par période de 6 min.", "Autoriser le défenseur latéral à sortir après la réception de l'ailier."],
            ["Séance 6 — Lecture de la Cible & Duel Tireur / Gardien de But", "Prendre l'information sur la position et les déplacements du gardien de but avant de déclencher le tir.", "Ateliers de tirs à 9m et 6m · Le gardien annonce un déplacement (gauche/droite/avancé) au dernier moment.", "Tirer à l'opposé du déplacement du gardien (tir croisé ou tir au premier poteau ouvert).", "Lever la tête pendant les 3 pas d'élan (ne pas regarder ses pieds ni le ballon).", "Marquer 3 buts sur 5 face à un gardien actif.", "Enchaîner un tir à 9m suivi immédiatement d'un second ballon aux 6m."],
            ["Séance 7 — Organisation Défensive Collective : La Défense Alignée 6-0", "Protéger collectivement la zone des 6m en coulissant latéralement du côté du ballon.", "Demi-terrain · 5 attaquants contre 5 défenseurs alignés entre 6m et 7m.", "Les défenseurs se déplacent en pas chassés, bras hauts, en maintenant l'entraide avec leurs deux voisins.", "Surveiller à la fois son adversaire direct et le ballon (vision périphérique).", "Empêcher le tir à 6m sans faute sur 4 possessions adverses sur 5.", "Demander au défenseur face au porteur de monter à 8m (flottement + montée) puis de reculer."],
            ["Séance 8 — La Contre-Attaque Immédiate dès la Récupération (1ère et 2ème vague)", "Exploiter les 5 premières secondes suivant un arrêt du gardien ou une interception pour marquer avant le repli.", "Terrain complet · 4c4 devant un but : au coup de sifflet ou arrêt du gardien, contre-attaque vers l'autre but.", "Relance immédiate du gardien vers l'ailier parti en sprint ou vers le demi-centre en relais.", "Démarrer l'appel en profondeur dès le déclenchement du tir adverse.", "Réaliser la contre-attaque et tirer en moins de 6 secondes sans dribble.", "Faire partir 2 défenseurs en repli défensif pour créer un 3c2 à haute vitesse."],
            ["Séance 9 — Match à Thème 6c6 & Arbitrage à 2 Arbitres (Juge de but / Juge de champ)", "Intégrer la montée de balle rapide et la défense 6-0 dans un match arbitré en duo selon le code IHF.", "Tournoi 6c6 sur 40×20m · Duo d'arbitres positionnés en diagonale (arbitre de champ + arbitre de ligne de but).", "Match en 2 mi-temps de 5 min avec contrat d'équipe choisi (Contre-attaque ou Jeu aux ailes).", "Communiquer entre partenaires ; appliquer les 18 gestes d'arbitrage IHF.", "Réalisation du contrat tactique d'équipe (> 60% de réussite) et arbitrage fluide.", "Temps mort tactique de 45 secondes géré en autonomie par le capitaine d'équipe."],
            ["Séance 10 — Évaluation Sommative Finale (/20)", "Valider les acquis moteurs, tactiques, conceptuels et comportementaux en tournoi officiel.", "Tournoi final 6c6 · Grille officielle OP 2009 / OP 2007 sur 20 points.", "Respect absolu du règlement IHF, de l'adversaire et de l'arbitre.", "Efficacité dans les rôles d'attaquant (porteur/non-porteur), de défenseur et d'officiel.", "Attribution de la note finale sur 20 points.", "Rotation complète sur les rôles d'arbitre et d'observateur statistique."]
          ]
        }},
        "N3": {{
          shortName: "Niveau 3 (Confirmé)",
          title: "Niveau 3 — Confirmé : Attaque placée en surnombre, fixation-décalage aux ailes et défense étagée",
          otcPrefix: "Rechercher le gain de la rencontre par le choix pertinent entre contre-attaque rapide et attaque placée (fixation d'un intervalle et décalage vers les ailes ou le pivot) face à une défense étagée.",
          seances: [
            ["Séance 1 — Évaluation Diagnostique", "Évaluer la capacité collective à alterner jeu rapide et jeu placé face à une défense repliée en 6c6.", "Terrain 40×20m · Matchs de 8 min · Recueil statistique (Pertinence des choix rapides vs placés).", "Règles IHF intégrales (y compris avertissement de jeu passif).", "Identifier en 3 secondes si le surnombre de contre-attaque est jouable ou s'il faut placer l'attaque.", "Plus de 55% d'attaques aboutissant à un tir en secteur favorable.", "Valoriser à 2 pts les buts sur contre-attaque ou sur décalage à l'aile."],
            ["Séance 2 — Fixer dans un Intervalle (1-2 / 2-3) et Décaler", "Attaquer l'intervalle entre deux défenseurs pour les contraindre à se resserrer et libérer le partenaire suivant.", "Demi-terrain · 3 arrières + 1 ailier contre 4 défenseurs en zone 6-0.", "S'engager balle en main en course vers l'intervalle entre deux défenseurs avant de lâcher la balle.", "Réceptionner en mouvement (engagement dans l'espace libre), fixer le 2ème défenseur et passer dans le tempo.", "Créer un décalage franc pour l'ailier ou l'arrière opposé 4 fois sur 5.", "Ajouter un pivot glissant dans le dos des défenseurs qui montent."],
            ["Séance 3 — Le Tir à l'Aile (Ouverture d'angle par impulsion vers le point de penalty)", "Optimiser l'angle de tir depuis les secteurs excentrés (ailes gauche et droite).", "Demi-terrain · Ateliers aux deux ailes avec réception en course après circulation de la base arrière.", "Prendre son impulsion dans le coin mais sauter vers l'intérieur (direction 7m) pour agrandir l'angle du but.", "Maintenir le temps de suspension, contourner les bras du gardien (tir au second poteau ou entre les jambes).", "Marquer 3 buts sur 5 depuis l'aile avec ouverture d'angle nette.", "Placer un défenseur n°1 qui ferme l'angle court."],
            ["Séance 4 — Relation Base Arrière / Pivot (Jeu dans la profondeur défensive)", "Intégrer un joueur intérieur (pivot) glissant le long des 6m pour offrir une solution entre les lignes.", "Demi-terrain · 3 arrières + 1 pivot contre 4 défenseurs.", "L'arrière menace le tir à 9m : si le défenseur monte à 8m, passe à rebond ou tendue au pivot démarqué à 6m.", "Pour le pivot : bloquer son défenseur avec le dos, présenter une main cible hors de portée de l'adversaire.", "Réussir 3 relations Arrière-Pivot suivies d'un tir à 6m sur 5 attaques.", "Passer en 5c5 avec 2 ailiers pour élargir le dispositif."],
            ["Séance 5 — Le Tir de Loin à 9 mètres (en appui et en suspension au-dessus du contre)", "Sanctionner une défense 6-0 trop basse par des tirs puissants de la base arrière au-delà des 9m.", "Demi-terrain · Circulation de balle Arrière G - Demi-centre - Arrière D face à 3 défenseurs restant à 6m.", "Enchaîner prise d'élan profonde (de 12m à 9m), impulsion haute et tir puissant au-dessus des bras du contre.", "Gainage abdo-lombaire en l'air, fouetté rapide de l'épaule et du poignet, ciblage des lucarnes ou à rebond.", "3 tirs cadrés et puissants sur 5 au-dessus du rideau défensif.", "Obliger l'un des défenseurs à sortir à 9m au signal (choix tir à 9m ou passe au pivot)."],
            ["Séance 6 — La Défense Étagée 5-1 (Flottement, Harcèlement et Dissuasion)", "Perturber la circulation de balle de la base arrière adverse grâce à un défenseur avancé (le « 1 » à 9m).", "Demi-terrain · Défense 5-1 (5 joueurs à 6m + 1 joueur avancé sur le demi-centre) contre 6 attaquants.", "Le défenseur avancé coupe la relation avec le demi-centre ; les 5 arrières coulissent et ferment l'accès au pivot.", "Communication verbale permanente (« J'ai le pivot ! », « Monte ! », « Glisse ! »).", "Provoquer 3 pertes de balle ou tirs forcés hors secteur sur 5 attaques adverses.", "Alterner entre défense 6-0 et 5-1 selon le score."],
            ["Séance 7 — Enchaînement d'Actions : Le Croisé Simple et le Passe-et-Suit", "Créer une incertitude chez les défenseurs par une permutation de postes en course (croisé).", "Demi-terrain · Base arrière (AG, DC, AD) + Ailiers contre défense 5-1 ou 6-0.", "Le demi-centre fixe l'intervalle central et croise dans son dos avec l'arrière gauche lancé à pleine vitesse.", "Changer de rythme au moment du croisé ; protéger le ballon du côté opposé au défenseur.", "Obtenir un tir ouvert à 7-8m ou un surnombre à l'aile 4 fois sur 5.", "Autoriser le demi-centre à feinter le croisé et tirer s'il n'est pas pris en charge."],
            ["Séance 8 — Gestion de la Transition Rapide (Engagement rapide & 2ème vague)", "Organiser la contre-attaque structurée à plusieurs couloirs même après un but encaissé (engagement rapide).", "Terrain complet 6c6 · Chronométrage des 8 premières secondes de chaque possession.", "Répartition immédiate des 3 couloirs : Ailiers le long des lignes de touche, Arrières dans les couloirs intermédiaires.", "Ne jamais ralentir la balle par un dribble inutile au milieu du terrain.", "Marquer ou tirer en moins de 8 secondes sur au moins 40% des possessions.", "Bonifier de +2 pts tout but marqué sur montée de balle collective en moins de 7s."],
            ["Séance 9 — Match Officiel avec Projet Tactique d'Équipe & Coaching Autonome", "Choisir et adapter en autonomie le système offensif et défensif de son équipe pour remporter le match.", "Tournoi 6c6 / 7c7 · Fiche de projet tactique remplie par chaque équipe avant le match.", "Chaque équipe dispose d'un temps mort de 1 minute pour ajuster sa défense (6-0 ou 5-1) d'après les stats.", "Respecter son poste spécifique (Ailier, Arrière, Demi-centre, Pivot, Gardien) et les consignes collectives.", "Adéquation entre le projet annoncé et les réalisations observées (> 65%).", "Arbitrage intégral IHF (2 min, carton jaune, jeu passif à 4 passes après bras levé)."],
            ["Séance 10 — Évaluation Sommative Finale (/20)", "Évaluer la compétence individuelle et collective en situation réglementaire de compétition.", "Tournoi final · Grille officielle sur 20 points (OP 2009 / OP 2007).", "Application intégrale du code IHF et rotation sur les rôles d'officiels (Arbitres + Table de marque).", "Maîtrise technique en mouvement, efficacité tactique dans le projet collectif et responsabilité citoyenne.", "Note finale chiffrée sur 20 points saisie sur Massar.", "Poule finale d'opposition équilibrée."]
          ]
        }},
        "N4": {{
          shortName: "Niveau 4 (Élite / ASS)",
          title: "Niveau 4 — Élite & Sport Scolaire ASS : Combinaisons tactiques, bloc/écran et systèmes 5-1 / 3-2-1",
          otcPrefix: "Concevoir et piloter collectivement des stratégies offensives élaborées (combinaisons annoncées, blocs autour du pivot, attaque des défenses étagées 5-1 et 3-2-1) et une défense agressive de récupération pour performer en compétition scolaire ASS / FRMSS.",
          seances: [
            ["Séance 1 — Diagnostic Tactique & Profilage par Poste Spécifique", "Évaluer le rendement individuel par poste (Gardien, Ailiers, Base arrière, Pivot) et l'organisation collective en 7c7.", "Terrain 40×20m · Match 7c7 (2×10 min) · Fiche d'analyse statistique avancée par poste.", "Règles officielles IHF / FRMSS.", "Optimiser le ratio Balles jouées / Pertes de balle (< 15%) et Tirs / Buts (> 60%).", "Identification précise du système préférentiel et des postes de chaque joueur.", "Imposer un système défensif différent à chaque mi-temps (6-0 puis 5-1)."],
            ["Séance 2 — Attaque de la Défense 5-1 : Exploitation des Espaces dans le Dos du « 1 »", "Désorganiser une défense 5-1 par la circulation d'un second pivot ou l'entrée d'ailier en deuxième pivot.", "Demi-terrain · 6c6 face à une défense 5-1 agressive.", "Lorsque le défenseur avancé monte sur le demi-centre, l'ailier opposé rentre dans son dos en 2ème pivot.", "Synchroniser le départ de l'ailier avec la prise d'élan de l'arrière ; passes à rebond précises.", "Réussir 4 combinaisons d'entrée en 2ème pivot sur 6 tentatives.", "Autoriser la défense à basculer en 3-2-1 pour tester la lecture de jeu."],
            ["Séance 3 — Le Bloc (Écran) du Pivot et l'Exploitation du 2c2 (Arrière + Pivot)", "Créer un surnombre localisé par la pose d'un bloc légal du pivot sur le défenseur n°2 ou n°3.", "Demi-terrain · Ateliers 2c2 (Arrière + Pivot) puis intégration en 6c6.", "Le pivot pose un écran latéral équilibré (sans faute offensive) : si les défenseurs changent, passe au pivot qui pivote ; s'ils ne changent pas, tir de l'arrière.", "Lire instantanément la réaction des deux défenseurs impliqués dans le 2c2.", "Obtenir un tir franc à 6m ou 8m sur 4 situations de 2c2 sur 5.", "Exiger un enchaînement croisé de la base arrière avant le 2c2 avec le pivot."],
            ["Séance 4 — Perfectionnement du Tir : Roucoulette, Lob, Tir à la Hanche et Impact", "Diversifier la palette de tirs pour battre un gardien de bon niveau à 6m et à 9m.", "Demi-terrain · Séries intensives par poste avec gardien + 1 défenseur en opposition.", "Adapter la trajectoire du tir à la parade du gardien (tir à la hanche autour du contre, lob sur gardien avancé, tir en appui retardé).", "Retarder le lâcher de balle en l'air (temps de suspension long) pour lire la parade du gardien.", "Taux de réussite au tir supérieur à 65% sur 10 tentatives par poste.", "Introduire une fatigue préalable (sprint aller-retour 20m) avant la série de tirs."],
            ["Séance 5 — La Défense Agressive 3-2-1 : Harcèlement, Interception et Contre", "Empêcher la base arrière adverse de prendre de la vitesse grâce à un dispositif étagé sur 3 lignes.", "Demi-terrain · 6 défenseurs en 3-2-1 contre 6 attaquants.", "Le triangle central (les deux n°2 et le n°3 avancé) flotte et monte en piston sur le porteur de balle tout en fermant l'axe.", "Agressivité contrôlée sur les trajectoires de passe sans se faire éliminer en 1c1.", "Récupérer au moins 3 ballons par interception ou passage en force sur 6 attaques.", "Transformation immédiate de chaque interception en contre-attaque à 2 ou 3 joueurs."],
            ["Séance 6 — Montée de Balle Structurée sur Engagement Rapide & Gestion du Surnombre 4c3", "Maintenir une pression constante sur l'adversaire par un jeu de transition ultra-rapide sur 60 minutes.", "Terrain 40×20m · Situations d'aller-retour en 4c3 puis 6c5 avec contraintes temporelles (< 6s).", "Structuration des couloirs : 1er échelon (Ailiers), 2ème échelon (Arrières), 3ème échelon (Demi-centre + Pivot).", "Prise de balle à pleine vitesse au niveau de la ligne médiane sans aucun rebond.", "Plus de 70% de réussite sur les situations de surnombre rapide 4c3.", "Pénaliser toute balle tombée au sol par un repli défensif immédiat en infériorité 4c5."],
            ["Séance 7 — Gestion des Situations Spéciales : Supériorité (6c5) et Infériorité Numérique (5c6)", "Savoir gérer tactiquement les exclusions temporaires de 2 minutes en attaque et en défense.", "Demi-terrain · Séquences chronométrées de 2 minutes en 6c5 puis en 5c6.", "En 6c5 : fixer large d'une aile à l'autre pour décaler sur l'aile opposée. En 5c6 : défense 5-0 très mobile et solidaire.", "Patience en supériorité numérique (attendre le décalage franc à 6m) ; gestion du temps en infériorité.", "Marquer sur 4 possessions sur 5 en 6c5 ; concéder moins de 2 buts en 2 min en 5c6.", "Situation de fin de match : -1 but à 45 secondes de la fin."],
            ["Séance 8 — Combinaisons Annoncées (« Espagnole », « Polonaise », « Yugo ») & Jets Francs à 9m", "Exécuter des enclenchements collectifs codifiés pour débloquer une défense hermétique.", "Demi-terrain · 6c6 en attaque placée · Catalogue de 3 combinaisons tactiques.", "Le demi-centre annonce le code gestuel : synchronisation des courses sans ballon, des écrans et du timing de passe.", "Respecter le tempo d'engagement : engager pour son partenaire avant d'engager pour soi.", "Aboutir à une solution de tir ouverte sur 4 enclenchements annoncés sur 5.", "Jeu sous menace du bras levé des arbitres (4 passes maximum pour tirer)."],
            ["Séance 9 — Compétition Réglementaire 7c7 type Championnat ASS / FRMSS", "Mobiliser l'ensemble du répertoire technico-tactique en condition réelle de compétition officielle.", "Match officiel 7c7 · Table de marque officielle (Feuille de match, Chrono 2 min, Cartons) · Duo d'arbitres.", "Application intégrale du code IHF 2026.", "Lucidité tactique sous fatigue, coaching mutuel et maîtrise émotionnelle.", "Indice d'efficacité collective > 70% et zéro sanction disciplinaire pour contestation.", "Scénario de prolongation / jets de 7m en cas d'égalité."],
            ["Séance 10 — Évaluation Sommative Finale & Bilan de Compétence (/20)", "Évaluer la performance sportive, la maîtrise technico-tactique et les compétences d'officiel sur 20 points.", "Tournoi officiel · Grille sommative OP 2007 / OP 2009 (/20).", "Double évaluation : Performance dans le jeu + Maîtrise des rôles d'arbitre et d'analyste tactique.", "Excellence motrice, lecture du jeu et exemplarité citoyenne.", "Validation de la note finale sur 20 points.", "Remise des bilans individuels et sélection pour l'équipe ASS de l'établissement."]
          ]
        }}
      }};

      var currentSchool = "1AC";
      var currentPractice = "N1";
      var currentViewMode = "ppc";
      var currentGrilleType = "diag";

      function switchHandballVolet(voletName) {{
        document.querySelectorAll('.volet-panel').forEach(function(p) {{ p.classList.remove('active'); }});
        document.querySelectorAll('.volet-tab-btn').forEach(function(b) {{ b.classList.remove('active'); }});
        var panel = document.getElementById('volet-' + voletName);
        var btn = document.getElementById('tab-btn-' + voletName);
        if (panel) panel.classList.add('active');
        if (btn) btn.classList.add('active');
      }}

      function selectSchoolLevel(code) {{
        currentSchool = code;
        document.querySelectorAll('.school-tab').forEach(function(b) {{
          b.classList.toggle('active', b.getAttribute('data-school') === code);
        }});
        renderStudioPreview();
      }}

      function selectPracticeLevel(code) {{
        currentPractice = code;
        document.querySelectorAll('.practice-tab[data-practice]').forEach(function(b) {{
          b.classList.toggle('active', b.getAttribute('data-practice') === code);
        }});
        renderStudioPreview();
      }}

      function selectViewMode(mode) {{
        currentViewMode = mode;
        document.getElementById('vmode-ppc').classList.toggle('active', mode === 'ppc');
        document.getElementById('vmode-all-fiches').classList.toggle('active', mode === 'all_fiches');
        document.getElementById('vmode-single-fiche').classList.toggle('active', mode === 'single_fiche');
        document.getElementById('singleSeanceSelectorWrap').style.display = (mode === 'single_fiche') ? 'block' : 'none';
        renderStudioPreview();
      }}

      function getHeaderMetaHtml(docTitle, docSubtitle) {{
        var prof = (document.getElementById('inpProfName').value || '........................................').trim();
        var etab = (document.getElementById('inpEtabName').value || '........................................').trim();
        var aref = (document.getElementById('inpArefName').value || '........................................').trim();
        var sInfo = HB_SCHOOL_LEVELS[currentSchool];
        var pInfo = HB_PRACTICE_LEVELS[currentPractice];
        return '<table class="a4-header-table"><tr>' +
          '<td style="width:36%;"><strong>ROYAUME DU MAROC</strong><br>Ministère de l\\'Éducation Nationale,<br>du Préscolaire et des Sports<br>AREF / Direction : <strong>' + aref + '</strong></td>' +
          '<td style="width:28%;text-align:center;"><strong>ÉDUCATION PHYSIQUE &amp; SPORTIVE</strong><br>Référentiel Officiel Maroc<br>APS : <strong>HANDBALL (كرة اليد)</strong></td>' +
          '<td style="width:36%;text-align:right;">Établissement : <strong>' + etab + '</strong><br>Professeur : <strong>' + prof + '</strong><br>Niveau : <strong>' + sInfo.label + '</strong></td>' +
          '</tr></table>' +
          '<div class="a4-doc-title"><h3>' + docTitle + '</h3><p>' + docSubtitle + '</p></div>' +
          '<div class="a4-meta-box">' +
          '<p><strong>🏛️ Cadre Réglementaire :</strong> ' + sInfo.ref + '</p>' +
          '<p><strong>🎯 Objectif Terminal d\\'Intégration (OTI — ' + currentSchool + ') :</strong> ' + sInfo.oti + '</p>' +
          '<p><strong>🧭 Compétence Visée (' + currentSchool + ') :</strong> ' + sInfo.comp + '</p>' +
          '<p><strong>🏅 Objectif Terminal du Cycle (OTC — ' + pInfo.shortName + ') :</strong> ' + pInfo.otcPrefix + '</p>' +
          '<p><strong>📊 Barème Officiel d\\'Évaluation (/20) :</strong> ' + sInfo.bareme + '</p>' +
          '</div>';
      }}

      function buildPpcHtml() {{
        var sInfo = HB_SCHOOL_LEVELS[currentSchool];
        var pInfo = HB_PRACTICE_LEVELS[currentPractice];
        var html = getHeaderMetaHtml(
          'PROJET PRÉVISIONNEL DU CYCLE DE HANDBALL — ' + sInfo.label.toUpperCase(),
          pInfo.title + ' · Cycle de 10 Séances Conforme aux OP Maroc'
        );
        html += '<table class="a4-table"><thead><tr>' +
          '<th style="width:14%;">Séance</th>' +
          '<th style="width:23%;">Objectif de Séance</th>' +
          '<th style="width:23%;">Situation d\\'Apprentissage &amp; Dispositif</th>' +
          '<th style="width:20%;">Critères de Réalisation</th>' +
          '<th style="width:20%;">Critères de Réussite &amp; Variables</th>' +
          '</tr></thead><tbody>';

        pInfo.seances.forEach(function(s) {{
          html += '<tr>' +
            '<td><strong>' + s[0] + '</strong></td>' +
            '<td>' + s[1] + '</td>' +
            '<td><strong>Dispositif :</strong> ' + s[2] + '<br><strong>Consignes :</strong> ' + s[3] + '</td>' +
            '<td>' + s[4] + '</td>' +
            '<td><strong>Réussite :</strong> ' + s[5] + '<br><em>Variable : ' + s[6] + '</em></td>' +
            '</tr>';
        }});

        html += '</tbody></table>' +
          '<table style="width:100%;margin-top:1.25rem;border:none;"><tr>' +
          '<td style="border:none;font-weight:700;">Signature du Professeur d\\'EPS :</td>' +
          '<td style="border:none;text-align:center;font-weight:700;">Visa de M. l\\'Inspecteur Pédagogique :</td>' +
          '<td style="border:none;text-align:right;font-weight:700;">Cachet et Visa du Directeur :</td>' +
          '</tr></table>';
        return html;
      }}

      function buildSingleFicheHtml(idx) {{
        var sInfo = HB_SCHOOL_LEVELS[currentSchool];
        var pInfo = HB_PRACTICE_LEVELS[currentPractice];
        var s = pInfo.seances[idx];
        return '<div class="seance-fiche-block">' +
          '<div class="seance-fiche-head"><span>FICHE DE PRÉPARATION DE SÉANCE — HANDBALL (' + currentSchool + ' · ' + pInfo.shortName + ')</span><span>Durée : 55 à 60 min</span></div>' +
          '<div style="padding:1rem;">' +
          '<p style="margin-bottom:0.5rem;"><strong>📌 Titre de la Séance :</strong> <span style="color:#991b1b;font-weight:800;">' + s[0] + '</span></p>' +
          '<p style="margin-bottom:0.75rem;"><strong>🎯 Objectif Opérationnel de la Séance :</strong> ' + s[1] + '</p>' +
          '<table class="a4-table" style="margin:0;"><thead><tr>' +
          '<th style="width:16%;">Phase &amp; Durée</th>' +
          '<th style="width:28%;">Contenu, But &amp; Dispositif d\\'Organisation</th>' +
          '<th style="width:28%;">Consignes &amp; Critères de Réalisation (Comment faire)</th>' +
          '<th style="width:28%;">Critères de Réussite (Quantitatifs) &amp; Variables Didactiques</th>' +
          '</tr></thead><tbody>' +
          '<tr>' +
          '<td><strong>1. Partie Introductive</strong><br>(10 à 12 min)</td>' +
          '<td><strong>Appel, contrôle de la tenue et présentation de l\\'objectif.</strong><br>Échauffement général (course progressive autour du 40×20m) puis mobilisation articulaire (épaules, poignets, doigts, chevilles) et passes dynamiques par binômes.</td>' +
          '<td>Vérifier l\\'absence d\\'objets dangereux (bijoux, montres).<br>Augmenter progressivement la température corporelle et la fréquence cardiaque.</td>' +
          '<td>100% des élèves engagés sans essoufflement excessif ; articulations des épaules et chevilles prêtes à l\\'effort.</td>' +
          '</tr>' +
          '<tr>' +
          '<td><strong>2. Partie Fondamentale</strong><br>(35 à 40 min)</td>' +
          '<td><strong>Situation Fondamentale &amp; Match d\\'Application :</strong><br>' + s[2] + '<br><br><strong>But de la tâche :</strong> ' + s[1] + '</td>' +
          '<td><strong>Consignes d\\'action :</strong> ' + s[3] + '<br><br><strong>Critères de réalisation :</strong> ' + s[4] + '</td>' +
          '<td><strong>Critères de réussite :</strong> ' + s[5] + '<br><br><strong>Variables de régulation :</strong> ' + s[6] + '</td>' +
          '</tr>' +
          '<tr>' +
          '<td><strong>3. Partie Finale</strong><br>(5 à 8 min)</td>' +
          '<td><strong>Retour au calme, étirements actifs et bilan collectif de la séance.</strong><br>Ramassage du matériel (plots, chasubles, ballons) par l\\'équipe responsable.</td>' +
          '<td>Verbalisation par les élèves des règles d\\'action efficaces découvertes pendant la séance.</td>' +
          '<td>Retour du rythme cardiaque à la normale, validation du cahier de textes et présentation du thème suivant.</td>' +
          '</tr>' +
          '</tbody></table>' +
          '</div></div>';
      }}

      function buildAllFichesHtml() {{
        var sInfo = HB_SCHOOL_LEVELS[currentSchool];
        var pInfo = HB_PRACTICE_LEVELS[currentPractice];
        var html = getHeaderMetaHtml(
          'DOSSIER COMPLET DES 10 FICHES PÉDAGOGIQUES DE SÉANCES — HANDBALL (' + currentSchool + ')',
          pInfo.title
        );
        for (var i = 0; i < pInfo.seances.length; i++) {{
          html += buildSingleFicheHtml(i);
        }}
        return html;
      }}

      function renderStudioPreview() {{
        var sInfo = HB_SCHOOL_LEVELS[currentSchool];
        var pInfo = HB_PRACTICE_LEVELS[currentPractice];
        var badge = document.getElementById('studioCurrentBadge');
        if (badge) badge.textContent = currentSchool + ' · ' + pInfo.shortName;

        var container = document.getElementById('studioA4Preview');
        if (!container) return;

        if (currentViewMode === 'ppc') {{
          container.innerHTML = buildPpcHtml();
        }} else if (currentViewMode === 'all_fiches') {{
          container.innerHTML = buildAllFichesHtml();
        }} else {{
          var idx = parseInt(document.getElementById('singleSeanceSelect').value || '0', 10);
          container.innerHTML = getHeaderMetaHtml(
            'FICHE PÉDAGOGIQUE DÉTAILLÉE — ' + pInfo.seances[idx][0].toUpperCase(),
            sInfo.label + ' · ' + pInfo.shortName
          ) + buildSingleFicheHtml(idx);
        }}
      }}

      function exportHandballDoc(docKind, format) {{
        var htmlContent = (docKind === 'ppc') ? buildPpcHtml() : buildAllFichesHtml();
        var fileBase = 'Handball-' + currentSchool + '-' + currentPractice + '-' + (docKind === 'ppc' ? 'Projet-Cycle' : '10-Fiches-Seances');
        if (format === 'word') {{
          downloadHtmlAsWord(htmlContent, fileBase + '.doc');
        }} else {{
          openPrintWindow(htmlContent, fileBase);
        }}
      }}

      function exportElementAsWord(elementId, fileBase) {{
        var el = document.getElementById(elementId);
        if (!el) return;
        downloadHtmlAsWord(el.innerHTML, fileBase + '.doc');
      }}

      function printElementAsPdf(elementId, docTitle) {{
        var el = document.getElementById(elementId);
        if (!el) return;
        openPrintWindow(el.innerHTML, docTitle);
      }}

      function downloadHtmlAsWord(innerHtml, filename) {{
        var fullDoc = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">' +
          '<head><meta charset="utf-8"><title>' + filename + '</title>' +
          '<style>body {{ font-family: Arial, sans-serif; font-size: 10.5pt; color: #0f172a; line-height: 1.45; }} ' +
          'table {{ width: 100%; border-collapse: collapse; margin: 10px 0; }} ' +
          'th {{ background: #0f172a; color: #ffffff; padding: 6px; border: 1px solid #000; font-size: 9.5pt; text-align: left; }} ' +
          'td {{ padding: 6px; border: 1px solid #475569; font-size: 9.5pt; vertical-align: top; }} ' +
          'h3 {{ color: #991b1b; margin: 8px 0; }} .a4-doc-title {{ text-align: center; background: #f1f5f9; border: 2px solid #000; padding: 8px; margin: 10px 0; }}</style>' +
          '</head><body>' + innerHtml + '</body></html>';
        var blob = new Blob(['\\ufeff', fullDoc], {{ type: 'application/msword;charset=utf-8' }});
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function() {{ URL.revokeObjectURL(url); }}, 1500);
      }}

      function openPrintWindow(innerHtml, title) {{
        var w = window.open('', '_blank', 'width=1020,height=800');
        if (!w) {{
          window.print();
          return;
        }}
        w.document.write('<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>' + title + '</title>');
        w.document.write('<style>@page {{ size: A4 landscape; margin: 12mm; }} body {{ font-family: Arial, sans-serif; font-size: 10pt; color: #0f172a; line-height: 1.45; }} table {{ width: 100%; border-collapse: collapse; margin: 8px 0; }} th {{ background: #0f172a !important; color: #fff !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; padding: 6px; border: 1px solid #000; text-align: left; }} td {{ padding: 6px; border: 1px solid #334155; vertical-align: top; }} .a4-doc-title {{ text-align: center; border: 2px solid #000; padding: 6px; margin: 8px 0; background: #f1f5f9; }} .a4-meta-box {{ border: 1px solid #334155; padding: 8px; margin-bottom: 10px; }} .seance-fiche-block {{ border: 2px solid #000; margin-bottom: 14px; page-break-inside: avoid; }} .seance-fiche-head {{ background: #991b1b !important; color: #fff !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; padding: 6px 10px; font-weight: bold; display: flex; justify-content: space-between; }}</style>');
        w.document.write('</head><body>' + innerHtml + '</body></html>');
        w.document.close();
        w.focus();
        setTimeout(function() {{ w.print(); }}, 350);
      }}

      function copyCurrentPreview(btn) {{
        var el = document.getElementById('studioA4Preview');
        if (!el) return;
        navigator.clipboard.writeText(el.innerText).then(function() {{
          var old = btn.innerHTML;
          btn.innerHTML = '✅ Copié !';
          setTimeout(function() {{ btn.innerHTML = old; }}, 2000);
        }});
      }}

      function copyGrillePreview(btn) {{
        var el = document.getElementById('grilleA4Preview');
        if (!el) return;
        navigator.clipboard.writeText(el.innerText).then(function() {{
          var old = btn.innerHTML;
          btn.innerHTML = '✅ Grille copiée !';
          setTimeout(function() {{ btn.innerHTML = old; }}, 2000);
        }});
      }}

      /* GRILLES D'OBSERVATION ET D'ÉVALUATION (/20) */
      var HB_GRILLES_HTML = {{
        "diag": '<div class="a4-doc-title"><h3>FICHE D\\'OBSERVATION DIAGNOSTIQUE &amp; CO-ÉVALUATION EN BINÔME — HANDBALL</h3><p>Recueil Statistique Individuel &amp; Collectif en Situation de Référence (Match 5c5 / 6c6 — 2 × 6 min)</p></div>' +
          '<p style="font-size:0.85rem;margin-bottom:0.75rem;"><strong>Classe :</strong> ...................... | <strong>Date :</strong> ..../..../2026 | <strong>Élève Observateur :</strong> .......................................... | <strong>Équipe observée :</strong> ......................</p>' +
          '<table class="a4-table"><thead><tr>' +
          '<th>N° / Nom &amp; Prénom du Joueur Observé</th>' +
          '<th>Balles Jouées (BJ)</th>' +
          '<th>Passes Réussies (PR)</th>' +
          '<th>Balles Perdues / Marcher (BP)</th>' +
          '<th>Tirs Cadrés (TC)</th>' +
          '<th>Buts Marqués (B)</th>' +
          '<th>Indice d\\'Efficacité<br>Ie = (PR+TC+B)/BJ</th>' +
          '<th>Niveau Initial Identifié (N1 à N4)</th>' +
          '</tr></thead><tbody>' +
          '<tr><td>1. ..................................................</td><td></td><td></td><td></td><td></td><td></td><td>....... %</td><td>[ ] N1  [ ] N2  [ ] N3  [ ] N4</td></tr>' +
          '<tr><td>2. ..................................................</td><td></td><td></td><td></td><td></td><td></td><td>....... %</td><td>[ ] N1  [ ] N2  [ ] N3  [ ] N4</td></tr>' +
          '<tr><td>3. ..................................................</td><td></td><td></td><td></td><td></td><td></td><td>....... %</td><td>[ ] N1  [ ] N2  [ ] N3  [ ] N4</td></tr>' +
          '<tr><td>4. ..................................................</td><td></td><td></td><td></td><td></td><td></td><td>....... %</td><td>[ ] N1  [ ] N2  [ ] N3  [ ] N4</td></tr>' +
          '<tr><td>5. ..................................................</td><td></td><td></td><td></td><td></td><td></td><td>....... %</td><td>[ ] N1  [ ] N2  [ ] N3  [ ] N4</td></tr>' +
          '<tr><td>6. ..................................................</td><td></td><td></td><td></td><td></td><td></td><td>....... %</td><td>[ ] N1  [ ] N2  [ ] N3  [ ] N4</td></tr>' +
          '<tr><td>7. ..................................................</td><td></td><td></td><td></td><td></td><td></td><td>....... %</td><td>[ ] N1  [ ] N2  [ ] N3  [ ] N4</td></tr>' +
          '</tbody></table>' +
          '<div class="a4-meta-box" style="margin-top:0.85rem;"><strong>Clé de détermination du Niveau de Pratique :</strong><br>' +
          '• <strong>Niveau 1 (Débutant) :</strong> Ie &lt; 40% (Jeu en grappe, pertes de balle fréquentes, marcher).<br>' +
          '• <strong>Niveau 2 (Débrouillé) :</strong> Ie entre 40% et 60% (Progression dans l\\'axe direct, tirs en course parfois précipités).<br>' +
          '• <strong>Niveau 3 (Confirmé) :</strong> Ie entre 60% et 75% (Démarquage en appui/soutien, utilisation des ailes, tir en suspension).<br>' +
          '• <strong>Niveau 4 (Élite / ASS) :</strong> Ie &gt; 75% (Lecture tactique du surnombre, relation pivot/ailes, leadership défensif).</div>',

        "college": '<div class="a4-doc-title"><h3>GRILLE OFFICIELLE D\\'ÉVALUATION SOMMATIVE HANDBALL — CYCLE COLLÉGIAL (/20)</h3><p>Conforme aux Orientations Pédagogiques 2009 &amp; à la Note Ministérielle n° 143-09 (1AC · 2AC · 3AC)</p></div>' +
          '<table class="a4-table"><thead><tr>' +
          '<th style="width:24%;">Composante Évaluée</th>' +
          '<th style="width:14%;">Barème OP 2009</th>' +
          '<th style="width:42%;">Critères &amp; Indicateurs Observables en Situation de Match (6c6)</th>' +
          '<th style="width:20%;">Échelle d\\'Attribution des Points</th>' +
          '</tr></thead><tbody>' +
          '<tr><td><strong>1. Habiletés Motrices — Processus (Maîtrise technique &amp; tactique individuelle)</strong></td><td><strong>06 Points</strong><br>(/12 pts moteurs)</td><td>• <strong>Porteur de balle (3 pts) :</strong> Contrôle à 2 mains, respect des 3 pas, passe précise dans la course, enchaînement réception-3 pas-tir.<br>• <strong>Non-Porteur &amp; Défenseur (3 pts) :</strong> Démarquage en appui/soutien hors de la grappe, repli défensif et gêne régulière à 6m.</td><td>• Niveau 1 : 1 à 2 pts<br>• Niveau 2 : 2,5 à 3,5 pts<br>• Niveau 3 : 4 à 5 pts<br>• Niveau 4 : 5,5 à 6 pts</td></tr>' +
          '<tr><td><strong>2. Habiletés Motrices — Produit (Rendement &amp; Efficacité collective/individuelle)</strong></td><td><strong>06 Points</strong><br>(/12 pts moteurs)</td><td>• <strong>Efficacité individuelle (3 pts) :</strong> Ratio (Passes réussies + Tirs cadrés + Récupérations) / Balles jouées.<br>• <strong>Gain des rencontres &amp; Progression collective (3 pts) :</strong> Classement de l\\'équipe et pourcentage d\\'attaques arrivant en zone de marque.</td><td>• Ie &lt; 40% : 1 à 2 pts<br>• Ie 40-60% : 2,5 à 4 pts<br>• Ie 60-75% : 4,5 à 5 pts<br>• Ie &gt; 75% : 5,5 à 6 pts</td></tr>' +
          '<tr><td><strong>3. Connaissances Conceptuelles</strong></td><td><strong>03 Points</strong></td><td>• Connaissance des règles fondamentales du Handball IHF (marcher, double dribble, zone 6m, jet franc 9m, penalty 7m) et des principes d\\'échauffement et de sécurité.</td><td>• 1 pt par réponse / règle maîtrisée en situation</td></tr>' +
          '<tr><td><strong>4. Connaissances Comportementales &amp; Rôles Sociaux</strong></td><td><strong>05 Points</strong></td><td>• Assiduité et tenue sportive (1,5 pt) · Fair-play et respect des décisions (1,5 pt) · Tenue efficace du rôle d\\'arbitre-élève IHF et d\\'observateur statistique (2 pts).</td><td>• Barème progressif de 0 à 5 points</td></tr>' +
          '<tr><td colspan="3" style="text-align:right;font-weight:900;font-size:0.95rem;">NOTE SOMMATIVE TOTALE COLLÈGE (OP 2009 — NOTE 143-09) :</td><td style="font-weight:900;font-size:1rem;color:#991b1b;">......... / 20 Points</td></tr>' +
          '</tbody></table>',

        "lycee": '<div class="a4-doc-title"><h3>GRILLE OFFICIELLE D\\'ÉVALUATION SOMMATIVE HANDBALL — CYCLE QUALIFIANT &amp; BAC (/20)</h3><p>Conforme aux Orientations Pédagogiques 2007 &amp; à la Note Ministérielle n° 142-10 (Tronc Commun · 1ère Bac · 2ème Bac)</p></div>' +
          '<table class="a4-table"><thead><tr>' +
          '<th style="width:24%;">Composante Évaluée</th>' +
          '<th style="width:14%;">Barème OP 2007</th>' +
          '<th style="width:42%;">Critères &amp; Indicateurs Observables en Compétition 6c6 / 7c7</th>' +
          '<th style="width:20%;">Échelle d\\'Attribution des Points</th>' +
          '</tr></thead><tbody>' +
          '<tr><td><strong>1. Habiletés Motrices — Processus Technico-Tactique</strong></td><td><strong>07 Points</strong><br>(/14 pts moteurs)</td><td>• <strong>Porteur de balle (2,5 pts) :</strong> Fixation d\\'intervalle, passe dans le tempo, tir en suspension ou à l\\'aile avec ouverture d\\'angle.<br>• <strong>Non-Porteur (2,5 pts) :</strong> Appels en course dans les intervalles, jeu sur les ailes / pivot, transition rapide.<br>• <strong>Défenseur (2 pts) :</strong> Flottement, montée sur le tireur, entraide et couverture dans le système (6-0 ou 5-1).</td><td>• Niveau 1 : 1,5 à 3 pts<br>• Niveau 2 : 3,5 à 4,5 pts<br>• Niveau 3 : 5 à 6 pts<br>• Niveau 4 : 6,5 à 7 pts</td></tr>' +
          '<tr><td><strong>2. Habiletés Motrices — Produit (Efficacité Individuelle &amp; Collective)</strong></td><td><strong>07 Points</strong><br>(/14 pts moteurs)</td><td>• <strong>Indice d\\'efficacité individuelle (4 pts) :</strong> Taux de réussite dans les duels, les passes décisives et les tirs cadrés/marqués.<br>• <strong>Performance collective (3 pts) :</strong> Résultat des matchs et réalisation du contrat tactique d\\'équipe.</td><td>• Ie &lt; 45% : 2 à 3 pts<br>• Ie 45-65% : 3,5 à 5 pts<br>• Ie 65-80% : 5,5 à 6,25 pts<br>• Ie &gt; 80% : 6,5 à 7 pts</td></tr>' +
          '<tr><td><strong>3. Connaissances Conceptuelles</strong></td><td><strong>03 Points</strong></td><td>• Maîtrise du code d\\'arbitrage IHF 2026 (18 gestes, échelle des sanctions, jeu passif), terminologie tactique (fixation, croisé, défense étagée) et physiologie de l\\'effort.</td><td>• 0 à 3 points</td></tr>' +
          '<tr><td><strong>4. Connaissances Comportementales &amp; Rôles Sociaux</strong></td><td><strong>03 Points</strong></td><td>• Arbitrage officiel en duo (1,5 pt), engagement dans le projet collectif, respect de l\\'éthique sportive et assiduité (1,5 pt).</td><td>• 0 à 3 points</td></tr>' +
          '<tr><td colspan="3" style="text-align:right;font-weight:900;font-size:0.95rem;">NOTE SOMMATIVE TOTALE LYCÉE QUALIFIANT &amp; BAC (OP 2007 — NOTE 142-10) :</td><td style="font-weight:900;font-size:1rem;color:#991b1b;">......... / 20 Points</td></tr>' +
          '</tbody></table>',

        "dispense": '<div class="a4-doc-title"><h3>GRILLE D\\'ÉVALUATION ALTERNATIVE HANDBALL — ÉLÈVE DISPENSÉ DE PRATIQUE (/20)</h3><p>Évaluation par les Rôles Sociaux (Arbitrage IHF, Observation Statistique &amp; Dossier Théorique — OP 2007/2009)</p></div>' +
          '<table class="a4-table"><thead><tr>' +
          '<th>Volet d\\'Évaluation Alternative</th>' +
          '<th>Barème (/20)</th>' +
          '<th>Tâches Pédagogiques et Critères d\\'Évaluation durant le Cycle de Handball</th>' +
          '</tr></thead><tbody>' +
          '<tr><td><strong>1. Compétences Méthodologiques, Arbitrage IHF &amp; Observation Terrain</strong></td><td><strong>08 Points</strong></td><td>• Diriger un match scolaire en appliquant les coups de sifflet et les <strong>18 gestes officiels IHF</strong> (4 pts).<br>• Tenir la table de marque (chronométrage, score, exclusions 2 min) et remplir avec précision les fiches d\\'observation statistique de ses camarades (4 pts).</td></tr>' +
          '<tr><td><strong>2. Connaissances Conceptuelles &amp; Règlement Handball</strong></td><td><strong>06 Points</strong></td><td>• Dossier écrit ou interrogation orale sur : le tracé et les dimensions du terrain (40×20m, 6m, 7m, 9m), les règles du joueur et du gardien, et les principes d\\'échauffement et de sécurité en Handball.</td></tr>' +
          '<tr><td><strong>3. Connaissances Comportementales &amp; Assiduité</strong></td><td><strong>06 Points</strong></td><td>• Présence effective et ponctualité à toutes les séances du cycle (2 pts), aide à l\\'installation du matériel et des plots (2 pts), sérieux et impartialité dans l\\'arbitrage (2 pts).</td></tr>' +
          '<tr><td colspan="2" style="text-align:right;font-weight:900;">NOTE FINALE ÉLÈVE DISPENSÉ :</td><td style="font-weight:900;color:#006233;">......... / 20 Points</td></tr>' +
          '</tbody></table>'
      }};

      function selectHandballGrille(gKey, btn) {{
        currentGrilleType = gKey;
        document.querySelectorAll('.practice-tab[data-grille]').forEach(function(b) {{ b.classList.remove('active'); }});
        if (btn) btn.classList.add('active');
        var container = document.getElementById('grilleA4Preview');
        if (container) container.innerHTML = HB_GRILLES_HTML[gKey] || '';
      }}

      /* Initialisation au chargement + lecture paramètre URL ?level= */
      window.addEventListener('DOMContentLoaded', function() {{
        try {{
          var params = new URLSearchParams(window.location.search);
          var lvl = (params.get('level') || '').toUpperCase();
          if (lvl && HB_SCHOOL_LEVELS[lvl]) {{
            currentSchool = lvl;
            document.querySelectorAll('.school-tab').forEach(function(b) {{
              b.classList.toggle('active', b.getAttribute('data-school') === lvl);
            }});
          }}
          if (window.location.hash === '#volet-atd') switchHandballVolet('atd');
          else if (window.location.hash === '#volet-grilles') switchHandballVolet('grilles');
          else if (window.location.hash === '#volet-terrain') switchHandballVolet('terrain');
          else if (window.location.hash === '#volet-articles') switchHandballVolet('articles');
        }} catch(e) {{}}
        renderStudioPreview();
        selectHandballGrille('diag', document.querySelector('.practice-tab[data-grille="diag"]'));
      }});
    </script>

{footer_html}
'''
    with open(os.path.join(PUBLIC_DIR, filename), "w", encoding="utf-8") as f:
        f.write(html)
    print(f"[SILO HANDBALL OK] Created /public/{filename}")


# ==============================================================================
# 3. MISE À JOUR DU MAILLAGE INTERNE (BLOG.HTML, INDEX.HTML, SITEMAP.XML)
# ==============================================================================
def update_site_links_for_aps_hub():
    # A. Update blog.html with the 2 new APS Hub & Handball Silo cards
    blog_path = os.path.join(PUBLIC_DIR, "blog.html")
    with open(blog_path, "r", encoding="utf-8") as f:
        bhtml = f.read()

    if "aps-handball-eps-maroc.html" not in bhtml:
        new_aps_cards = '''                <!-- Silo APS & Sports : hub-aps-sports-eps-maroc.html -->
                <article class="article-card" data-category="aps">
                    <div class="article-visual article-aps">
                        <span class="category-badge category-aps">🏟️ Portail Officiel APS · 1AC à 2Bac</span>
                        <div class="article-icon">
                            <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#991b1b" stroke-width="2"/><path d="M4.93 4.93l14.14 14.14" stroke="#006233" stroke-width="2"/><path d="M19.07 4.93L4.93 19.07" stroke="#006233" stroke-width="2"/></svg>
                        </div>
                    </div>
                    <div class="article-content">
                        <h3 class="article-title">Portail des APS &amp; Sports Scolaires au Maroc (OP 2007/2009) : ATD, Cycles (1AC-2Bac), Fiches &amp; Grilles (PDF/Word)</h3>
                        <p class="article-excerpt">Hub central de toutes les Activités Physiques et Sportives (Sports collectifs, Athlétisme, Gymnastique) : accès direct aux ATD, aux projets de cycles par niveau (1AC à 2Bac) et aux grilles d'évaluation (/20).</p>
                        <div class="article-footer">
                            <span class="article-date">4 Novembre 2026 · Portail APS</span>
                            <a href="hub-aps-sports-eps-maroc.html" class="read-more">Ouvrir le Portail des APS →</a>
                        </div>
                    </div>
                </article>

                <!-- Silo Complet Handball : aps-handball-eps-maroc.html -->
                <article class="article-card" data-category="aps">
                    <div class="article-visual article-aps">
                        <span class="category-badge category-aps">🤾 Studio Handball · 24 Cycles &amp; 240 Fiches</span>
                        <div class="article-icon">
                            <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#991b1b" stroke-width="2"/><polyline points="12 6 12 12 16 14" stroke="#006233" stroke-width="2"/></svg>
                        </div>
                    </div>
                    <div class="article-content">
                        <h3 class="article-title">Silo Handball en EPS au Maroc (1AC à 2Bac) : ATD, Studio Cycles &amp; Fiches (4 Niveaux · PDF/Word) + Grilles (/20)</h3>
                        <p class="article-excerpt">Page spéciale Handball tout-en-un : ATD complet, créateur et visionneuse A4 pro des cycles et fiches pour les 6 niveaux scolaires (1AC à 2Bac × 4 niveaux du Débutant à l'Élite) en Word/PDF et grilles d'observation et d'évaluation (/20).</p>
                        <div class="article-footer">
                            <span class="article-date">4 Novembre 2026 · Studio PDF/Word</span>
                            <a href="aps-handball-eps-maroc.html" class="read-more">Ouvrir le Studio Handball →</a>
                        </div>
                    </div>
                </article>'''

        marker = '<div class="articles-grid" id="articlesGrid">'
        bhtml = bhtml.replace(marker, marker + "\n" + new_aps_cards, 1)
        bhtml = bhtml.replace('<h3>Tous <span class="theme-count" id="count-all">134</span></h3>', '<h3>Tous <span class="theme-count" id="count-all">136</span></h3>')
        bhtml = bhtml.replace('<span class="articles-count" id="articlesCount">134 articles</span>', '<span class="articles-count" id="articlesCount">136 articles</span>')
        bhtml = bhtml.replace('<h3>Activités Sportives <span class="theme-count" id="count-aps">23</span></h3>', '<h3>Activités Sportives <span class="theme-count" id="count-aps">25</span></h3>')

        with open(blog_path, "w", encoding="utf-8") as f:
            f.write(bhtml)
        print("[BLOG OK] Added Hub APS & Silo Handball cards to /public/blog.html.")

    # B. Update index.html with a prominent callout to the new Hub APS & Handball Studio
    index_path = os.path.join(PUBLIC_DIR, "index.html")
    if os.path.exists(index_path):
        with open(index_path, "r", encoding="utf-8") as f:
            ihtml = f.read()

        if "hub-aps-sports-eps-maroc.html" not in ihtml:
            aps_hub_banner = '''
  <!-- PROFEPS_APS_STUDIO_HUB_BANNER_START -->
  <section aria-label="Portail des APS & Studio Handball 1AC-2Bac" style="max-width:1140px;margin:1.75rem auto;padding:1.5rem;background:linear-gradient(135deg,#f0fdf4 0%,#ffffff 50%,#fff1f2 100%);border:2px solid #006233;border-radius:18px;box-shadow:0 8px 22px rgba(15,23,42,0.06);">
    <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.75rem;margin-bottom:1rem;">
      <div>
        <span style="display:inline-block;font-size:0.74rem;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;color:#ffffff;background:#006233;padding:0.22rem 0.7rem;border-radius:999px;">🏟️ Nouveau · Portail par Sport (APS) &amp; Studio Cycles 1AC → 2Bac</span>
        <h2 style="margin:0.35rem 0 0;font-size:1.22rem;font-weight:900;color:#0f172a;">Portail des APS &amp; Page Spéciale Handball : ATD, 24 Cycles &amp; 240 Fiches (Visionneuse A4 + Export Word/PDF) + Grilles (/20)</h2>
      </div>
      <a href="hub-aps-sports-eps-maroc.html" style="font-size:0.84rem;font-weight:800;color:#006233;text-decoration:underline;">Ouvrir le Portail des APS →</a>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:0.8rem;">
      <a href="aps-handball-eps-maroc.html" style="display:flex;flex-direction:column;justify-content:space-between;padding:0.95rem;background:#ffffff;border:2px solid #991b1b;border-radius:12px;text-decoration:none;">
        <span style="font-size:0.72rem;font-weight:800;color:#991b1b;margin-bottom:0.25rem;">🤾 Studio Complet Handball (1AC → 2Bac)</span>
        <strong style="font-size:0.86rem;color:#0f172a;line-height:1.35;">6 Niveaux Scolaires × 4 Niveaux (Débutant à Élite) : Visionner &amp; Télécharger Cycles + Fiches en Word (.doc) et PDF →</strong>
      </a>
      <a href="aps-handball-eps-maroc.html#volet-atd" style="display:flex;flex-direction:column;justify-content:space-between;padding:0.95rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;text-decoration:none;">
        <span style="font-size:0.72rem;font-weight:800;color:#006233;margin-bottom:0.25rem;">📐 ATD Handball Officiel</span>
        <strong style="font-size:0.86rem;color:#0f172a;line-height:1.35;">Analyse &amp; Traitement Didactique du Handball : Logique interne, Problèmes fondamentaux &amp; Enjeux (PDF/Word) →</strong>
      </a>
      <a href="aps-handball-eps-maroc.html#volet-grilles" style="display:flex;flex-direction:column;justify-content:space-between;padding:0.95rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;text-decoration:none;">
        <span style="font-size:0.72rem;font-weight:800;color:#1d4ed8;margin-bottom:0.25rem;">📊 Grilles d'Observation &amp; Évaluation (/20)</span>
        <strong style="font-size:0.86rem;color:#0f172a;line-height:1.35;">Fiches d'Observation Diagnostique en Binôme + Grilles Sommatives Collège (143-09), Lycée (142-10) &amp; Dispensés →</strong>
      </a>
      <a href="hub-aps-sports-eps-maroc.html" style="display:flex;flex-direction:column;justify-content:space-between;padding:0.95rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;text-decoration:none;">
        <span style="font-size:0.72rem;font-weight:800;color:#b45309;margin-bottom:0.25rem;">🏟️ Catalogue des 11 APS Maroc</span>
        <strong style="font-size:0.86rem;color:#0f172a;line-height:1.35;">Accéder au Hub Central des APS : Sports Collectifs, Athlétisme, Gymnastique au Sol &amp; Référentiel des OTI →</strong>
      </a>
    </div>
  </section>
  <!-- PROFEPS_APS_STUDIO_HUB_BANNER_END -->
'''
            if "<!-- PROFEPS_LEGISLATION_HUB_BANNER_START -->" in ihtml:
                ihtml = ihtml.replace("<!-- PROFEPS_LEGISLATION_HUB_BANNER_START -->", aps_hub_banner + "\n  <!-- PROFEPS_LEGISLATION_HUB_BANNER_START -->", 1)
            elif "<!-- PROFEPS_EEAT_AUTHOR_START -->" in ihtml:
                ihtml = ihtml.replace("<!-- PROFEPS_EEAT_AUTHOR_START -->", aps_hub_banner + "\n  <!-- PROFEPS_EEAT_AUTHOR_START -->", 1)

            with open(index_path, "w", encoding="utf-8") as f:
                f.write(ihtml)
            shutil.copy2(index_path, os.path.join(ROOT_DIR, "index.html"))
            print("[INDEX OK] Updated /public/index.html and mirrored to /index.html.")

    # C. Update sitemap.xml
    sitemap_path = os.path.join(PUBLIC_DIR, "sitemap.xml")
    with open(sitemap_path, "r", encoding="utf-8") as f:
        xml = f.read()

    entries = []
    for slug in ["hub-aps-sports-eps-maroc.html", "aps-handball-eps-maroc.html"]:
        loc = f"https://profeps.ma/{slug}"
        if loc not in xml:
            entries.append(f'''  <url>
    <loc>{loc}</loc>
    <lastmod>2026-11-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>''')

    if entries:
        xml = xml.replace("</urlset>", "\n".join(entries) + "\n</urlset>")
        with open(sitemap_path, "w", encoding="utf-8") as f:
            f.write(xml)
        print("[SITEMAP OK] Added hub-aps-sports-eps-maroc.html and aps-handball-eps-maroc.html to /public/sitemap.xml.")


if __name__ == "__main__":
    create_hub_aps_page()
    create_handball_silo_page()
    update_site_links_for_aps_hub()
    print("=== HUB APS + SILO COMPLET HANDBALL GENERATED SUCCESSFULLY ===")
