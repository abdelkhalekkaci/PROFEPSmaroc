#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generates:
1. /public/aps-rugby-scolaire-tag-eps-maroc.html (Complete Silo APS #13: Rugby Scolaire, Tag Rugby & Touch Rugby — 1AC -> 2Bac, 4 Niveaux de pratique, Visionneuse A4 + Export Word/PDF, Calculateur d'Indice de Gagne-Terrain IGT & Simulateur World Rugby / Compteur 6 Tags, ATD Complet, 4 Grilles d'Évaluation, Sécurité Terrain Dur vs Pelouse & Lois World Rugby 2026).
2. Updates /public/hub-aps-sports-eps-maroc.html to link the Rugby Scolaire & Tag Rugby Silo.
3. Updates existing APS Silos to include Rugby in their quick-navigation bar.
4. Updates /public/blog.html, /public/index.html, /index.html, and /public/sitemap.xml.
Never touches /public/generateur.html.
"""

import os
import re

ROOT = "/app/applet"
PUBLIC = os.path.join(ROOT, "public")


def read_file(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()


def write_file(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)


def extract_chrome():
    ref_path = os.path.join(PUBLIC, "aps-course-haies-eps-maroc.html")
    html = read_file(ref_path)

    nav_start = html.find("<!-- PROFEPS_UNIFIED_NAVBAR_START -->")
    nav_end_marker = "<!-- PROFEPS_UNIFIED_NAVBAR_END -->"
    nav_end = html.find(nav_end_marker) + len(nav_end_marker)
    navbar_html = html[nav_start:nav_end]

    foot_start = html.find('<footer class="footer">')
    foot_end = html.find("</body>")
    footer_html = html[foot_start:foot_end]

    head_style_start = html.find('<link rel="stylesheet" href="/css/profeps-unifier.min.css?v=20261101">')
    head_style_end = html.find("</style>", html.find('<style id="profeps-Required-styles">'))
    if head_style_end == -1:
        head_style_end = html.find("</head>")
    head_styles = html[head_style_start:head_style_end]

    return navbar_html, footer_html, head_styles


def build_silo_rugby(navbar_html, footer_html, head_styles):
    return f"""<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rugby Scolaire, Tag Rugby &amp; Touch Rugby en EPS Maroc : Cycles 1AC-2Bac, Fiches, Calculateur Gagne-Terrain (IGT), ATD, Grilles (/20) &amp; World Rugby | ProfEPS</title>
    <meta name="description" content="Dossier et Studio complet du Rugby Scolaire, Tag Rugby (Flag) et Touch Rugby en EPS au Maroc (OP 2007 &amp; 2009) : 24 cycles et 240 fiches (1AC à 2Bac × 4 niveaux), calculateur d'Indice de Gagne-Terrain (IGT) et compteur 6 Tags / World Rugby, ATD, grilles (/20) et sécurité terrain dur vs pelouse.">
    <meta name="keywords" content="rugby EPS Maroc, tag rugby EPS, touch rugby EPS, rugby scolaire sans contact Maroc, fiche séance rugby 1AC 2AC 3AC TC 1Bac 2Bac, ATD rugby CRMEF, règle en avant hors jeu rugby EPS, grille évaluation rugby OP 2009 OP 2007">
    <meta name="author" content="Abdelkhalek ELBOUDANI — ProfEPS Maroc">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
    <link rel="canonical" href="https://profeps.ma/aps-rugby-scolaire-tag-eps-maroc.html">
    <link rel="alternate" hreflang="fr-MA" href="https://profeps.ma/aps-rugby-scolaire-tag-eps-maroc.html">
    <link rel="alternate" hreflang="x-default" href="https://profeps.ma/aps-rugby-scolaire-tag-eps-maroc.html">
    <link rel="icon" type="image/png" href="/images/prof_eps.png">

    <meta property="og:type" content="article">
    <meta property="og:site_name" content="ProfEPS Maroc">
    <meta property="og:title" content="Rugby Scolaire, Tag &amp; Touch Rugby en EPS Maroc : Studio Cycles 1AC-2Bac, Calculateur IGT, ATD &amp; Grilles (/20)">
    <meta property="og:description" content="Portail complet du Rugby Scolaire, Tag Rugby et Touch Rugby au Maroc : générateur de cycles et 10 séances (1AC à 2Bac × 4 niveaux), calculateur d'Indice de Gagne-Terrain (IGT), ATD, grilles (/20) et règlement World Rugby.">
    <meta property="og:url" content="https://profeps.ma/aps-rugby-scolaire-tag-eps-maroc.html">
    <meta property="og:image" content="https://profeps.ma/images/prof_eps.png">
    <meta property="og:locale" content="fr_MA">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Rugby Scolaire &amp; Tag Rugby EPS Maroc : Studio Cycles 1AC-2Bac, Calculateur IGT, ATD &amp; Grilles (/20)">
    <meta name="twitter:description" content="Studio interactif des cycles Rugby Scolaire &amp; Tag/Touch Rugby (1AC-2Bac), calculateur de Gagne-Terrain IGT, ATD et grilles OP 2009/2007.">
    <meta name="twitter:image" content="https://profeps.ma/images/prof_eps.png">

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
    {head_styles}

    <script type="application/ld+json">
    {{
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Rugby Scolaire, Tag Rugby & Touch Rugby en EPS au Maroc : Studio des Cycles (1AC à 2Bac), Calculateur d'Indice de Gagne-Terrain (IGT), ATD, Grilles (/20) et Lois World Rugby",
      "description": "Portail pédagogique complet du Rugby Scolaire, Tag Rugby et Touch Rugby en EPS au Maroc conforme aux OP 2009 (Collège) et OP 2007 (Lycée) et aux Lois du Jeu World Rugby 2026.",
      "url": "https://profeps.ma/aps-rugby-scolaire-tag-eps-maroc.html",
      "inLanguage": ["fr-MA", "ar-MA"],
      "datePublished": "2026-11-04",
      "dateModified": "2026-11-04",
      "author": {{
        "@type": "Person",
        "name": "Abdelkhalek ELBOUDANI",
        "jobTitle": "Professeur d'Éducation Physique et Sportive (EPS)",
        "url": "https://profeps.ma/a-propos.html"
      }},
      "publisher": {{
        "@type": "EducationalOrganization",
        "name": "ProfEPS Maroc",
        "url": "https://profeps.ma/"
      }}
    }}
    </script>

    <style>
      :root {{
        --aps-primary: #15803d;
        --aps-primary-dark: #166534;
        --aps-accent: #16a34a;
        --aps-green: #006233;
        --aps-red: #991b1b;
        --aps-slate: #0f172a;
        --aps-muted: #475569;
        --aps-border: #e2e8f0;
        --aps-bg: #f8fafc;
      }}
      body {{
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: var(--aps-bg);
        color: var(--aps-slate);
        margin: 0;
        line-height: 1.65;
      }}
      .silo-hero {{
        padding: 120px 1.5rem 2.25rem;
        background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #fff8f8 100%);
        border-bottom: 1px solid var(--aps-border);
      }}
      .silo-container {{
        max-width: 1320px;
        margin: 0 auto;
      }}
      .silo-breadcrumb {{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.45rem;
        font-size: 0.84rem;
        font-weight: 600;
        color: #64748b;
        margin-bottom: 1rem;
      }}
      .silo-breadcrumb a {{
        color: var(--aps-primary);
        text-decoration: none;
      }}
      .silo-breadcrumb a:hover {{
        text-decoration: underline;
      }}
      .silo-hero-grid {{
        display: grid;
        grid-template-columns: 1.5fr 1fr;
        gap: 1.75rem;
        align-items: start;
      }}
      .silo-kicker {{
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.35rem 0.85rem;
        border-radius: 8px;
        background: #dcfce7;
        border: 1px solid #86efac;
        color: #166534;
        font-size: 0.78rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 0.75rem;
      }}
      .silo-title {{
        font-size: clamp(1.75rem, 3.2vw, 2.55rem);
        font-weight: 900;
        color: #0f172a;
        line-height: 1.18;
        margin: 0 0 0.75rem;
        letter-spacing: -0.02em;
      }}
      .silo-title span {{
        color: var(--aps-primary);
      }}
      .silo-intro-box {{
        background: #ffffff;
        border: 1px solid #cbd5e1;
        border-left: 5px solid var(--aps-primary);
        border-radius: 12px;
        padding: 1.15rem 1.35rem;
        box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
      }}
      .silo-intro-box p {{
        margin: 0 0 0.65rem;
        font-size: 0.96rem;
        color: #334155;
      }}
      .silo-intro-box p:last-child {{
        margin-bottom: 0;
      }}
      .silo-specs-card {{
        background: #ffffff;
        border: 1px solid var(--aps-border);
        border-radius: 14px;
        padding: 1.25rem;
        box-shadow: 0 6px 20px rgba(15, 23, 42, 0.05);
      }}
      .silo-specs-card h2 {{
        font-size: 0.95rem;
        font-weight: 800;
        color: #0f172a;
        margin: 0 0 0.85rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid #f1f5f9;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }}
      .specs-grid {{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0.65rem;
      }}
      .spec-item {{
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        padding: 0.65rem 0.75rem;
      }}
      .spec-label {{
        font-size: 0.72rem;
        font-weight: 700;
        text-transform: uppercase;
        color: #64748b;
        letter-spacing: 0.04em;
      }}
      .spec-val {{
        font-size: 0.92rem;
        font-weight: 800;
        color: #0f172a;
        font-variant-numeric: tabular-nums;
      }}

      /* Sticky Volet Navigation */
      .volet-nav-wrap {{
        position: sticky;
        top: 72px;
        z-index: 90;
        background: rgba(255, 255, 255, 0.96);
        backdrop-filter: blur(12px);
        border-bottom: 1px solid var(--aps-border);
        box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
      }}
      .volet-nav {{
        max-width: 1320px;
        margin: 0 auto;
        padding: 0.65rem 1.5rem;
        display: flex;
        gap: 0.5rem;
        overflow-x: auto;
        scrollbar-width: thin;
      }}
      .volet-tab-btn {{
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        padding: 0.55rem 1rem;
        border-radius: 8px;
        border: 1px solid #cbd5e1;
        background: #ffffff;
        color: #334155;
        font-size: 0.85rem;
        font-weight: 800;
        cursor: pointer;
        white-space: nowrap;
        transition: all 0.2s ease;
        text-decoration: none;
      }}
      .volet-tab-btn:hover {{
        border-color: var(--aps-primary);
        color: var(--aps-primary);
        background: #f0fdf4;
      }}
      .volet-tab-btn.active {{
        background: var(--aps-primary);
        color: #ffffff;
        border-color: var(--aps-primary-dark);
      }}

      .silo-main {{
        max-width: 1320px;
        margin: 0 auto;
        padding: 2rem 1.5rem 4rem;
      }}
      .silo-section {{
        margin-bottom: 3.25rem;
        scroll-margin-top: 140px;
      }}
      .section-header-bar {{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: 1.25rem;
        padding-bottom: 0.85rem;
        border-bottom: 2px solid #e2e8f0;
      }}
      .section-header-bar h2 {{
        font-size: 1.45rem;
        font-weight: 900;
        color: #0f172a;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 0.6rem;
      }}
      .section-subtitle {{
        font-size: 0.92rem;
        color: #475569;
        margin: 0.25rem 0 0;
      }}

      /* STUDIO FICHE CREATOR */
      .studio-shell {{
        background: #ffffff;
        border: 1px solid #cbd5e1;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
      }}
      .studio-top-bar {{
        background: #0f172a;
        color: #ffffff;
        padding: 1rem 1.25rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
      }}
      .grade-tabs {{
        display: flex;
        flex-wrap: wrap;
        gap: 0.45rem;
      }}
      .grade-tab {{
        padding: 0.55rem 1rem;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background: rgba(255, 255, 255, 0.08);
        color: #e2e8f0;
        font-size: 0.86rem;
        font-weight: 800;
        cursor: pointer;
        transition: all 0.18s ease;
      }}
      .grade-tab:hover {{
        background: rgba(255, 255, 255, 0.16);
        color: #ffffff;
      }}
      .grade-tab.active {{
        background: #15803d;
        border-color: #4ade80;
        color: #ffffff;
        box-shadow: 0 4px 12px rgba(21, 128, 61, 0.4);
      }}
      .practice-bar {{
        background: #f1f5f9;
        padding: 0.85rem 1.25rem;
        border-bottom: 1px solid #cbd5e1;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 0.85rem;
      }}
      .practice-label {{
        font-size: 0.82rem;
        font-weight: 800;
        color: #334155;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }}
      .practice-buttons {{
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }}
      .practice-btn {{
        padding: 0.48rem 0.9rem;
        border-radius: 8px;
        border: 1px solid #cbd5e1;
        background: #ffffff;
        color: #334155;
        font-size: 0.82rem;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.18s ease;
      }}
      .practice-btn:hover {{
        border-color: var(--aps-primary);
        color: var(--aps-primary);
      }}
      .practice-btn.active {{
        background: #006233;
        color: #ffffff;
        border-color: #064e3b;
      }}

      .studio-meta-inputs {{
        padding: 0.85rem 1.25rem;
        background: #f8fafc;
        border-bottom: 1px solid #e2e8f0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 0.75rem;
      }}
      .meta-field {{
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }}
      .meta-field label {{
        font-size: 0.74rem;
        font-weight: 800;
        color: #475569;
        text-transform: uppercase;
      }}
      .meta-field input, .meta-field select {{
        padding: 0.48rem 0.65rem;
        border-radius: 7px;
        border: 1px solid #cbd5e1;
        font-size: 0.86rem;
        font-weight: 600;
        color: #0f172a;
        background: #ffffff;
      }}

      .studio-workspace {{
        display: grid;
        grid-template-columns: 330px 1fr;
        min-height: 680px;
      }}
      .studio-sidebar {{
        border-right: 1px solid #e2e8f0;
        background: #f8fafc;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }}
      .sidebar-heading {{
        font-size: 0.78rem;
        font-weight: 800;
        text-transform: uppercase;
        color: #64748b;
        letter-spacing: 0.05em;
        margin-bottom: 0.35rem;
      }}
      .session-item-btn {{
        width: 100%;
        text-align: left;
        padding: 0.65rem 0.75rem;
        border-radius: 9px;
        border: 1px solid #e2e8f0;
        background: #ffffff;
        color: #1e293b;
        cursor: pointer;
        transition: all 0.16s ease;
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
      }}
      .session-item-btn:hover {{
        border-color: var(--aps-primary);
        background: #f0fdf4;
      }}
      .session-item-btn.active {{
        background: #f0fdf4;
        border-color: var(--aps-primary);
        border-left: 4px solid var(--aps-primary);
      }}
      .session-num {{
        font-size: 0.73rem;
        font-weight: 800;
        color: var(--aps-primary);
        text-transform: uppercase;
      }}
      .session-title-short {{
        font-size: 0.83rem;
        font-weight: 700;
        color: #0f172a;
        line-height: 1.3;
      }}

      .studio-preview-pane {{
        padding: 1.25rem;
        background: #f1f5f9;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }}
      .studio-toolbar {{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
        background: #ffffff;
        border: 1px solid #cbd5e1;
        border-radius: 10px;
        padding: 0.75rem 1rem;
      }}
      .toolbar-actions {{
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }}
      .btn-export {{
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.55rem 0.95rem;
        border-radius: 8px;
        font-size: 0.82rem;
        font-weight: 800;
        cursor: pointer;
        border: 1px solid transparent;
        transition: all 0.18s ease;
        text-decoration: none;
      }}
      .btn-export.word {{
        background: #1e40af;
        color: #ffffff;
      }}
      .btn-export.word:hover {{
        background: #1e3a8a;
      }}
      .btn-export.pdf {{
        background: #991b1b;
        color: #ffffff;
      }}
      .btn-export.pdf:hover {{
        background: #7f1d1d;
      }}
      .btn-export.cycle-word {{
        background: #006233;
        color: #ffffff;
      }}
      .btn-export.cycle-word:hover {{
        background: #064e3b;
      }}
      .btn-export.cycle-pdf {{
        background: #0f172a;
        color: #ffffff;
      }}

      /* A4 Pro Sheet Preview */
      .a4-sheet {{
        background: #ffffff;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        padding: 1.75rem;
        box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
        color: #0f172a;
      }}
      .a4-header-table, .a4-body-table {{
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 1rem;
      }}
      .a4-header-table th, .a4-header-table td,
      .a4-body-table th, .a4-body-table td {{
        border: 1px solid #334155;
        padding: 0.55rem 0.7rem;
        font-size: 0.85rem;
        vertical-align: top;
      }}
      .a4-header-table th {{
        background: #0f172a;
        color: #ffffff;
        font-weight: 800;
        text-transform: uppercase;
        font-size: 0.78rem;
      }}
      .a4-body-table th {{
        background: #f1f5f9;
        color: #0f172a;
        font-weight: 800;
        font-size: 0.8rem;
        text-transform: uppercase;
      }}
      .a4-phase-badge {{
        display: inline-block;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        font-weight: 800;
        font-size: 0.75rem;
        background: #dcfce7;
        color: #166534;
      }}

      /* Content Cards & Tables */
      .content-card {{
        background: #ffffff;
        border: 1px solid #cbd5e1;
        border-radius: 14px;
        padding: 1.5rem;
        margin-bottom: 1.25rem;
        box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
      }}
      .content-card h3 {{
        font-size: 1.15rem;
        font-weight: 800;
        color: #0f172a;
        margin: 0 0 0.85rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }}
      .grid-2 {{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.25rem;
      }}
      .grid-3 {{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.15rem;
      }}
      .pro-table-wrap {{
        overflow-x: auto;
      }}
      .pro-table {{
        width: 100%;
        border-collapse: collapse;
      }}
      .pro-table th, .pro-table td {{
        border: 1px solid #cbd5e1;
        padding: 0.65rem 0.8rem;
        font-size: 0.87rem;
        text-align: left;
        vertical-align: top;
      }}
      .pro-table th {{
        background: #f1f5f9;
        color: #0f172a;
        font-weight: 800;
      }}
      .pro-table tr:nth-child(even) td {{
        background: #f8fafc;
      }}

      /* Sub-tabs for Evaluation Grids */
      .sub-tabs {{
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }}
      .sub-tab-btn {{
        padding: 0.55rem 1rem;
        border-radius: 8px;
        border: 1px solid #cbd5e1;
        background: #ffffff;
        color: #334155;
        font-size: 0.85rem;
        font-weight: 800;
        cursor: pointer;
      }}
      .sub-tab-btn.active {{
        background: #0f172a;
        color: #ffffff;
        border-color: #0f172a;
      }}
      .sub-tab-panel {{
        display: none;
      }}
      .sub-tab-panel.active {{
        display: block;
      }}

      @media (max-width: 980px) {{
        .silo-hero-grid, .studio-workspace, .grid-2, .grid-3 {{
          grid-template-columns: 1fr;
        }}
        .studio-sidebar {{
          border-right: none;
          border-bottom: 1px solid #e2e8f0;
          max-height: 290px;
          overflow-y: auto;
        }}
      }}
    </style>
</head>
<body>
{navbar_html}

    <!-- HERO + INTRO + REPÈRES OFFICIELS -->
    <header class="silo-hero">
        <div class="silo-container">
            <nav class="silo-breadcrumb" aria-label="Fil d'Ariane">
                <a href="index.html">Accueil</a> <span>›</span>
                <a href="hub-aps-sports-eps-maroc.html">Hub Central des APS</a> <span>›</span>
                <span>Sports Collectifs : Rugby Scolaire, Tag Rugby (Flag) &amp; Touch Rugby</span>
            </nav>

            <div class="silo-hero-grid">
                <div>
                    <div class="silo-kicker">🏉🏷️ Silo Complet #13 · Combat Collectif, Tag &amp; Touch Rugby · World Rugby 2026 &amp; OP Maroc</div>
                    <h1 class="silo-title"><span>Rugby Scolaire, Tag Rugby &amp; Touch Rugby</span> en EPS au Maroc : Cycles (1AC → 2Bac), Fiches, Calculateur Gagne-Terrain (IGT), ATD, Grilles (/20) &amp; World Rugby</h1>
                    <div class="silo-intro-box">
                        <p><strong>Introduction &amp; Paradoxe Fondamental du Rugby :</strong> Le <strong>Rugby</strong> (<em>الريكبي المدرسي</em>) est le seul sport collectif de démarquage et de gagne-terrain régi par une contradiction fondatrice : <strong>pour faire avancer le ballon vers l'en-but adverse (cible horizontale au sol), il est strictement interdit de le passer vers l'avant à la main (Règle de l'En-Avant — Loi 11 World Rugby)</strong>. Tout partenaire situé devant le porteur du ballon est <strong>Hors-Jeu</strong> ; le soutien doit donc permanence se replacer en arrière du porteur tout en sprintant vers l'avant.</p>
                        <p><strong>Adaptation Sécuritaire Impérative au Maroc (Terrain Bitumé vs Pelouse/Tapis) :</strong> Sur les terrains scolaires durs (goudron, ciment), le cycle s'enseigne en <strong>Tag Rugby (ceintures à 2 rubans scratchs)</strong> ou en <strong>Touch Rugby (toucher simultané à 2 mains sur les hanches — règle des 6 touchers)</strong>, garantissant 100% de sécurité et de mixité Filles/Garçons tout en conservant toute la richesse tactique du gagne-terrain et de la passe après contact. Sur pelouse ou tapis, le <strong>plaquage ceinturé bas (entre les hanches et les genoux)</strong> est introduit progressivement.</p>
                    </div>
                </div>

                <aside class="silo-specs-card" aria-label="Repères officiels World Rugby 2026 & EPS Maroc">
                    <h2>
                        <span>📐 Repères World Rugby &amp; Tag / Touch EPS</span>
                        <a href="reglement-rugby-world-rugby-arbitrage-eps.html" style="font-size:0.78rem;color:#15803d;text-decoration:underline;">Lois World Rugby →</a>
                    </h2>
                    <div class="specs-grid">
                        <div class="spec-item">
                            <div class="spec-label">Règle d'Or (Loi 11 &amp; 10)</div>
                            <div class="spec-val">Passe en ARRIÈRE</div>
                            <div style="font-size:0.72rem;color:#64748b;">En-avant = mêlée/changement · Soutien placé DERRIÈRE le porteur</div>
                        </div>
                        <div class="spec-item">
                            <div class="spec-label">Tag &amp; Touch Rugby (EPS)</div>
                            <div class="spec-val">Max 6 Tags / Possession</div>
                            <div style="font-size:0.72rem;color:#64748b;">Passe en ≤ 3 pas / 3s après « TAG ! » · Défense recule à 5m</div>
                        </div>
                        <div class="spec-item">
                            <div class="spec-label">Valeurs des Points (Loi 8)</div>
                            <div class="spec-val">Essai = 5 pts · Transf = 2</div>
                            <div style="font-size:0.72rem;color:#64748b;">Essai de pénalité = 7 pts · Pénalité / Drop = 3 pts</div>
                        </div>
                        <div class="spec-item">
                            <div class="spec-label">Terrain Scolaire EPS</div>
                            <div class="spec-val">5c5 ou 7c7 (40m × 25m)</div>
                            <div style="font-size:0.72rem;color:#64748b;">Terrain de Handball ou 2 demi-terrains transversaux</div>
                        </div>
                        <div class="spec-item">
                            <div class="spec-label">Plaquage Sécurisé (Pelouse)</div>
                            <div class="spec-val">Hanches → Genoux</div>
                            <div style="font-size:0.72rem;color:#64748b;">Ceinturer avec les bras obligatoire · Haut (> sternum) interdit</div>
                        </div>
                        <div class="spec-item">
                            <div class="spec-label">Poteaux Officiels en « H »</div>
                            <div class="spec-val">Largeur 5,60m · Barre 3,00m</div>
                            <div style="font-size:0.72rem;color:#64748b;">Hauteur min : 3,40m · Carton jaune Sevens = 2 min (XV = 10 min)</div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    </header>

    <!-- STICKY NAVIGATION ENTRE LES 6 VOLETS -->
    <div class="volet-nav-wrap">
        <nav class="volet-nav" aria-label="Navigation des volets Rugby Scolaire & Tag Rugby">
            <a href="#volet-studio" class="volet-tab-btn active">⚡ 1. Studio Cycles &amp; Fiches (1AC → 2Bac)</a>
            <a href="#volet-calculateur-rugby" class="volet-tab-btn">🧮 2. Calculateur Gagne-Terrain (IGT) &amp; Arbitre 6 Tags</a>
            <a href="#volet-atd" class="volet-tab-btn">📐 3. ATD Rugby Scolaire &amp; Tag/Touch</a>
            <a href="#volet-grilles" class="volet-tab-btn">📊 4. Feuille Match &amp; 4 Grilles (/20)</a>
            <a href="#volet-terrain" class="volet-tab-btn">🏟️ 5. Sécurité Terrain Dur vs Pelouse &amp; World Rugby</a>
            <a href="#volet-articles" class="volet-tab-btn">📚 6. Bibliothèque Rugby</a>
        </nav>
    </div>

    <!-- BARRE D'ACCÈS RAPIDE AUX AUTRES SILOS APS -->
    <div style="background:#f1f5f9;border-bottom:1px solid #cbd5e1;padding:0.5rem 1.5rem;">
        <div style="max-width:1320px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;gap:0.5rem;font-size:0.78rem;font-weight:700;color:#475569;">
            <span>🔗 Silos APS :</span>
            <a href="aps-handball-eps-maroc.html" style="padding:0.25rem 0.65rem;border-radius:99px;background:#ffffff;color:#0f172a;border:1px solid #cbd5e1;text-decoration:none;">🤾 Handball</a>
            <a href="aps-basketball-eps-maroc.html" style="padding:0.25rem 0.65rem;border-radius:99px;background:#ffffff;color:#0f172a;border:1px solid #cbd5e1;text-decoration:none;">🏀 Basket-Ball</a>
            <a href="aps-volleyball-eps-maroc.html" style="padding:0.25rem 0.65rem;border-radius:99px;background:#ffffff;color:#0f172a;border:1px solid #cbd5e1;text-decoration:none;">🏐 Volley-Ball</a>
            <a href="aps-football-eps-maroc.html" style="padding:0.25rem 0.65rem;border-radius:99px;background:#ffffff;color:#0f172a;border:1px solid #cbd5e1;text-decoration:none;">⚽ Football</a>
            <a href="aps-rugby-scolaire-tag-eps-maroc.html" style="padding:0.25rem 0.65rem;border-radius:99px;background:#15803d;color:#ffffff;text-decoration:none;">🏉 Rugby &amp; Tag (Actif)</a>
            <a href="aps-gymnastique-sol-eps-maroc.html" style="padding:0.25rem 0.65rem;border-radius:99px;background:#ffffff;color:#0f172a;border:1px solid #cbd5e1;text-decoration:none;">🤸 Gymnastique</a>
            <a href="aps-course-vitesse-relais-eps-maroc.html" style="padding:0.25rem 0.65rem;border-radius:99px;background:#ffffff;color:#0f172a;border:1px solid #cbd5e1;text-decoration:none;">🏃 Vitesse &amp; Relais</a>
            <a href="aps-course-duree-demi-fond-eps-maroc.html" style="padding:0.25rem 0.65rem;border-radius:99px;background:#ffffff;color:#0f172a;border:1px solid #cbd5e1;text-decoration:none;">⏱️ Course de Durée</a>
            <a href="aps-lancer-poids-eps-maroc.html" style="padding:0.25rem 0.65rem;border-radius:99px;background:#ffffff;color:#0f172a;border:1px solid #cbd5e1;text-decoration:none;">☄️ Lancer du Poids</a>
            <a href="aps-saut-longueur-triple-saut-eps-maroc.html" style="padding:0.25rem 0.65rem;border-radius:99px;background:#ffffff;color:#0f172a;border:1px solid #cbd5e1;text-decoration:none;">🦘 Longueur &amp; Triple Saut</a>
            <a href="aps-saut-hauteur-fosbury-eps-maroc.html" style="padding:0.25rem 0.65rem;border-radius:99px;background:#ffffff;color:#0f172a;border:1px solid #cbd5e1;text-decoration:none;">🆙 Saut en Hauteur</a>
            <a href="aps-badminton-tennis-table-eps-maroc.html" style="padding:0.25rem 0.65rem;border-radius:99px;background:#ffffff;color:#0f172a;border:1px solid #cbd5e1;text-decoration:none;">🏸🏓 Badminton &amp; Ping-Pong</a>
            <a href="aps-course-haies-eps-maroc.html" style="padding:0.25rem 0.65rem;border-radius:99px;background:#ffffff;color:#0f172a;border:1px solid #cbd5e1;text-decoration:none;">🚧 Course de Haies</a>
            <a href="hub-aps-sports-eps-maroc.html" style="margin-left:auto;color:#15803d;text-decoration:underline;">Voir toutes les APS →</a>
        </div>
    </div>

    <main class="silo-main">

        <!-- ================================================================
             VOLET 1 : STUDIO INTERACTIF DES CYCLES & FICHES (1AC -> 2BAC)
             ================================================================ -->
        <section id="volet-studio" class="silo-section">
            <div class="section-header-bar">
                <div>
                    <h2>⚡ Volet 1 : Studio Interactif des Cycles &amp; Fiches — Rugby Scolaire, Tag &amp; Touch Rugby (1AC à 2Bac)</h2>
                    <p class="section-subtitle">Sélectionnez le niveau scolaire (<strong>1AC à 2Bac</strong>) puis l'un des <strong>4 niveaux de pratique</strong>. Choisissez aussi la modalité terrain (<strong>Tag/Touch sans contact</strong> sur bitume ou <strong>Plaquage ceinturé bas</strong> sur pelouse/tapis) et téléchargez en <strong>Word (.doc)</strong> ou <strong>PDF A4</strong>.</p>
                </div>
            </div>

            <div class="studio-shell">
                <!-- 1. Onglets des 6 Niveaux Scolaires -->
                <div class="studio-top-bar">
                    <div style="font-size:0.82rem;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;color:#86efac;">
                        1. Choisissez le Niveau Scolaire :
                    </div>
                    <div class="grade-tabs" role="tablist" aria-label="Niveaux scolaires EPS Maroc">
                        <button type="button" class="grade-tab active" data-grade="1AC" onclick="selectRugbyGrade('1AC')">1AC · Touch/Tag 5c5</button>
                        <button type="button" class="grade-tab" data-grade="2AC" onclick="selectRugbyGrade('2AC')">2AC · Tag Rugby 5c5/6c6</button>
                        <button type="button" class="grade-tab" data-grade="3AC" onclick="selectRugbyGrade('3AC')">3AC · Tag / Rugby 7c7</button>
                        <button type="button" class="grade-tab" data-grade="TC" onclick="selectRugbyGrade('TC')">TC · Tronc Commun</button>
                        <button type="button" class="grade-tab" data-grade="1BAC" onclick="selectRugbyGrade('1BAC')">1Bac · 1ère Bac</button>
                        <button type="button" class="grade-tab" data-grade="2BAC" onclick="selectRugbyGrade('2BAC')">2Bac · Baccalauréat</button>
                    </div>
                </div>

                <!-- 2. Choix parmi les 4 Niveaux de Pratique -->
                <div class="practice-bar">
                    <span class="practice-label">2. Niveau de Pratique de la Classe (4 Niveaux) :</span>
                    <div class="practice-buttons" role="group" aria-label="Niveaux de pratique">
                        <button type="button" class="practice-btn active" data-level="1" onclick="selectRugbyLevel(1)">Niveau 1 · Débutant (Grappe &amp; Course en reculant)</button>
                        <button type="button" class="practice-btn" data-level="2" onclick="selectRugbyLevel(2)">Niveau 2 · Initié (Avancer dans l'axe &amp; Passe en arrière)</button>
                        <button type="button" class="practice-btn" data-level="3" onclick="selectRugbyLevel(3)">Niveau 3 · Confirmé (Soutien en V &amp; Fixer-Donner 2c1)</button>
                        <button type="button" class="practice-btn" data-level="4" onclick="selectRugbyLevel(4)">Niveau 4 · Expert / AS (Alternance Pénétrant / Déployé)</button>
                    </div>
                </div>

                <!-- 3. Entête personnalisable -->
                <div class="studio-meta-inputs">
                    <div class="meta-field">
                        <label for="rugbyProfInput">Enseignant(e) EPS</label>
                        <input id="rugbyProfInput" type="text" value="Prof. EPS" oninput="renderRugbySheet()">
                    </div>
                    <div class="meta-field">
                        <label for="rugbyEtabInput">Établissement / AREF</label>
                        <input id="rugbyEtabInput" type="text" value="Lycée / Collège Maroc" oninput="renderRugbySheet()">
                    </div>
                    <div class="meta-field">
                        <label for="rugbyModeSelect">Modalité Sécuritaire (Surface)</label>
                        <select id="rugbyModeSelect" onchange="renderRugbySheet()">
                            <option value="Tag / Touch Rugby sans plaquage (Terrain bitumé / Mixte)">🏷️ Tag / Touch Rugby sans plaquage (Terrain dur / Mixte)</option>
                            <option value="Rugby Scolaire à Plaquage ceinturé bas (Pelouse / Tapis)">🏉 Plaquage ceinturé bas sous la taille (Pelouse / Tapis)</option>
                        </select>
                    </div>
                    <div class="meta-field">
                        <label for="rugbyDureeInput">Effectif &amp; Durée</label>
                        <input id="rugbyDureeInput" type="text" value="36 élèves (6 équipes de 6) · 55 min" oninput="renderRugbySheet()">
                    </div>
                </div>

                <!-- 4. Espace de travail : Liste des 10 séances + Visionneuse A4 Pro -->
                <div class="studio-workspace">
                    <aside class="studio-sidebar">
                        <div class="sidebar-heading">3. Séances du Cycle (10 Séances)</div>
                        <div id="rugbySessionList" style="display:flex;flex-direction:column;gap:0.45rem;"></div>
                    </aside>

                    <div class="studio-preview-pane">
                        <div class="studio-toolbar">
                            <div>
                                <strong id="rugbyCurrentBadge" style="font-size:0.92rem;color:#0f172a;">Aperçu Pro A4 — Rugby Scolaire / Tag · 1AC · Niveau 1 · Séance 1/10</strong>
                                <div style="font-size:0.78rem;color:#64748b;">Vérifiez le contenu didactique ci-dessous avant d'exporter votre document officiel.</div>
                            </div>
                            <div class="toolbar-actions">
                                <button type="button" class="btn-export word" onclick="exportRugbyCurrentWord()">📄 Fiche Active (.doc)</button>
                                <button type="button" class="btn-export pdf" onclick="exportRugbyCurrentPDF()">🖨️ Fiche Active (PDF A4)</button>
                                <button type="button" class="btn-export cycle-word" onclick="exportRugbyFullCycleWord()">📚 Cycle Complet 10 Séances (.doc)</button>
                                <button type="button" class="btn-export cycle-pdf" onclick="exportRugbyFullCyclePDF()">🗂️ Cycle Complet (PDF)</button>
                            </div>
                        </div>

                        <div id="rugbyA4Container" class="a4-sheet">
                            <!-- Injecté dynamiquement par JS -->
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================================================================
             VOLET 2 : CALCULATEUR GAGNE-TERRAIN (IGT) & SIMULATEUR WORLD RUGBY / 6 TAGS
             ================================================================ -->
        <section id="volet-calculateur-rugby" class="silo-section">
            <div class="section-header-bar">
                <div>
                    <h2>🧮 Volet 2 : Calculateur d'Indice de Gagne-Terrain (IGT) &amp; Simulateur d'Arbitrage World Rugby / Compteur des 6 Tags</h2>
                    <p class="section-subtitle">Deux outils interactifs de terrain : <strong>1) Calculateur d'Indice de Gagne-Terrain (IGT), de Continuité sans En-Avant et de Note (/20)</strong>, et <strong>2) Tableau de Marque Officiel World Rugby (5/2/7/3 pts) + Compteur des 6 Tags/Touchers</strong>.</p>
                </div>
            </div>

            <div class="grid-2">
                <!-- OUTIL 1 : CALCULATEUR D'INDICE DE GAGNE-TERRAIN (IGT) & CONTINUITÉ -->
                <div class="content-card" style="border-top:4px solid #15803d;">
                    <h3>📈 1. Calculateur d'Indice de Gagne-Terrain (IGT), Continuité &amp; Note (/20)</h3>
                    <p style="font-size:0.86rem;color:#475569;margin-top:0;">Évaluez l'efficacité collective d'une équipe et la maîtrise individuelle d'un élève à partir du relevé de match (franchissements de la ligne d'avantage, passes en arrière réussies, essais et en-avants).</p>

                    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:0.75rem;margin-bottom:1rem;">
                        <div class="meta-field">
                            <label for="calcRgGrade">Niveau Scolaire</label>
                            <select id="calcRgGrade" onchange="computeRugbyCalculator()">
                                <option value="1AC">1AC (Collège · OP 2009)</option>
                                <option value="2AC">2AC (Collège · OP 2009)</option>
                                <option value="3AC">3AC (Collège · OP 2009)</option>
                                <option value="TC">Tronc Commun (OP 2007)</option>
                                <option value="1BAC">1ère Bac (OP 2007)</option>
                                <option value="2BAC" selected>2ème Bac (OP 2007)</option>
                            </select>
                        </div>
                        <div class="meta-field">
                            <label for="calcRgPoss">Possessions d'Équipe Jouées</label>
                            <input id="calcRgPoss" type="number" min="1" max="30" value="10" oninput="computeRugbyCalculator()">
                        </div>
                        <div class="meta-field">
                            <label for="calcRgGainLine">Franchissements Ligne d'Avantage</label>
                            <input id="calcRgGainLine" type="number" min="0" max="30" value="7" oninput="computeRugbyCalculator()">
                        </div>
                        <div class="meta-field">
                            <label for="calcRgTries">Essais Marqués (En-but)</label>
                            <input id="calcRgTries" type="number" min="0" max="20" value="3" oninput="computeRugbyCalculator()">
                        </div>
                        <div class="meta-field">
                            <label for="calcRgPassOk">Passes en Arrière Réussies (Indiv.)</label>
                            <input id="calcRgPassOk" type="number" min="0" max="30" value="8" oninput="computeRugbyCalculator()">
                        </div>
                        <div class="meta-field">
                            <label for="calcRgTagsDef">Tags Arrachés / Plaquages Réussis</label>
                            <input id="calcRgTagsDef" type="number" min="0" max="30" value="5" oninput="computeRugbyCalculator()">
                        </div>
                    </div>

                    <div id="calcRugbyOutput" style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:12px;padding:1rem;">
                        <!-- Injecté par JS -->
                    </div>
                </div>

                <!-- OUTIL 2 : SIMULATEUR DE SCORE WORLD RUGBY & COMPTEUR DES 6 TAGS / TOUCHERS -->
                <div class="content-card" style="border-top:4px solid #991b1b;">
                    <h3>🏉 2. Tableau de Marque World Rugby (Loi 8) &amp; Compteur des 6 Tags / Touchers</h3>
                    <p style="font-size:0.86rem;color:#475569;margin-top:0;">Outil interactif pour l'<strong>élève-arbitre</strong> : gérez le score officiel (Essai 5 pts, Transformation 2 pts, Pénalité/Drop 3 pts, Essai Cible Centrale EPS 7 pts) et le <strong>compteur des 6 Tags/Touchers</strong>.</p>

                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.85rem;margin-bottom:0.85rem;">
                        <div style="background:#f0fdf4;border:2px solid #15803d;border-radius:12px;padding:0.85rem;text-align:center;">
                            <div style="font-size:0.76rem;font-weight:800;color:#166534;text-transform:uppercase;">Équipe A (Verts)</div>
                            <div id="rgScoreA" style="font-size:2.2rem;font-weight:900;color:#0f172a;margin:0.2rem 0;">0</div>
                            <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.35rem;">
                                <button type="button" onclick="addRugbyScore('A', 5, 'Essai (5 pts)')" style="padding:0.4rem;border-radius:6px;background:#15803d;color:#fff;font-size:0.75rem;font-weight:800;border:none;cursor:pointer;">+5 Essai</button>
                                <button type="button" onclick="addRugbyScore('A', 2, 'Transformation (2 pts)')" style="padding:0.4rem;border-radius:6px;background:#0d9488;color:#fff;font-size:0.75rem;font-weight:800;border:none;cursor:pointer;">+2 Transfo</button>
                                <button type="button" onclick="addRugbyScore('A', 7, 'Essai Zone Centrale / Pénalité (7 pts)')" style="padding:0.4rem;border-radius:6px;background:#1e40af;color:#fff;font-size:0.75rem;font-weight:800;border:none;cursor:pointer;">+7 Cible Or</button>
                                <button type="button" onclick="addRugbyScore('A', 3, 'Pénalité / Drop (3 pts)')" style="padding:0.4rem;border-radius:6px;background:#475569;color:#fff;font-size:0.75rem;font-weight:800;border:none;cursor:pointer;">+3 Drop/Pén</button>
                            </div>
                        </div>

                        <div style="background:#fff1f2;border:2px solid #991b1b;border-radius:12px;padding:0.85rem;text-align:center;">
                            <div style="font-size:0.76rem;font-weight:800;color:#991b1b;text-transform:uppercase;">Équipe B (Rouges)</div>
                            <div id="rgScoreB" style="font-size:2.2rem;font-weight:900;color:#0f172a;margin:0.2rem 0;">0</div>
                            <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.35rem;">
                                <button type="button" onclick="addRugbyScore('B', 5, 'Essai (5 pts)')" style="padding:0.4rem;border-radius:6px;background:#991b1b;color:#fff;font-size:0.75rem;font-weight:800;border:none;cursor:pointer;">+5 Essai</button>
                                <button type="button" onclick="addRugbyScore('B', 2, 'Transformation (2 pts)')" style="padding:0.4rem;border-radius:6px;background:#b45309;color:#fff;font-size:0.75rem;font-weight:800;border:none;cursor:pointer;">+2 Transfo</button>
                                <button type="button" onclick="addRugbyScore('B', 7, 'Essai Zone Centrale / Pénalité (7 pts)')" style="padding:0.4rem;border-radius:6px;background:#1e40af;color:#fff;font-size:0.75rem;font-weight:800;border:none;cursor:pointer;">+7 Cible Or</button>
                                <button type="button" onclick="addRugbyScore('B', 3, 'Pénalité / Drop (3 pts)')" style="padding:0.4rem;border-radius:6px;background:#475569;color:#fff;font-size:0.75rem;font-weight:800;border:none;cursor:pointer;">+3 Drop/Pén</button>
                            </div>
                        </div>
                    </div>

                    <div style="background:#0f172a;color:#ffffff;border-radius:10px;padding:0.85rem 1rem;">
                        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:0.5rem;margin-bottom:0.5rem;">
                            <span id="rgTagCounterDisplay" style="font-weight:900;color:#4ade80;font-size:0.92rem;">🏷️ Compteur de Possession : TAG 0 / 6 (Jouez !)</span>
                            <div style="display:flex;gap:0.4rem;">
                                <button type="button" onclick="incrementTagCount()" style="padding:0.35rem 0.75rem;border-radius:6px;background:#eab308;color:#0f172a;font-weight:900;font-size:0.78rem;border:none;cursor:pointer;">+1 TAG / TOUCHER !</button>
                                <button type="button" onclick="resetTagCount('Nouvelle possession (0/6)')" style="padding:0.35rem 0.65rem;border-radius:6px;background:#334155;color:#ffffff;font-weight:800;font-size:0.75rem;border:none;cursor:pointer;">Réinitialiser Tags</button>
                                <button type="button" onclick="resetRugbyMatch()" style="padding:0.35rem 0.65rem;border-radius:6px;background:#475569;color:#ffffff;font-weight:800;font-size:0.75rem;border:none;cursor:pointer;">Score 0-0</button>
                            </div>
                        </div>
                        <div id="rgLastEventText" style="font-size:0.8rem;color:#cbd5e1;">Annonce Arbitre : Au cri « TAG ! », le porteur a 3 secondes (max 3 pas) pour passer en arrière ; la défense recule de 5 m derrière le point du tag.</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================================================================
             VOLET 3 : ANALYSE ET TRAITEMENT DIDACTIQUE (ATD) RUGBY SCOLAIRE & TAG
             ================================================================ -->
        <section id="volet-atd" class="silo-section">
            <div class="section-header-bar">
                <div>
                    <h2>📐 Volet 3 : Analyse &amp; Traitement Didactique (ATD) — Rugby Scolaire, Tag &amp; Touch Rugby</h2>
                    <p class="section-subtitle">Référentiel scientifique, réglementaire et didactique complet pour les cours d'EPS et la préparation aux concours du CRMEF.</p>
                </div>
                <div class="toolbar-actions">
                    <button type="button" class="btn-export word" onclick="exportElementToWord('atdRugbyPrintable', 'ATD_Rugby_Scolaire_Tag_Rugby_EPS_Maroc.doc')">📄 Exporter l'ATD (.doc)</button>
                    <button type="button" class="btn-export pdf" onclick="printElementAsPDF('atdRugbyPrintable', 'ATD Rugby Scolaire & Tag Rugby — ProfEPS Maroc')">🖨️ Imprimer / PDF A4</button>
                </div>
            </div>

            <div id="atdRugbyPrintable">
                <div class="grid-2">
                    <div class="content-card">
                        <h3>1. Définition, Logique Interne &amp; Paradoxe Fondamental</h3>
                        <p><strong>Définition :</strong> Le Rugby (sous ses formes à XV, à 7, Touch Rugby ou Tag/Flag Rugby) est un sport collectif d'affrontement et de gagne-terrain opposant deux équipes qui se disputent un ballon ovale pour aller l'aplatir dans l'<strong>en-but adverse</strong> (cible horizontale située au bout du terrain), tout en empêchant l'adversaire de franchir la ligne d'avantage.</p>
                        <p><strong>Le Paradoxe Fondamental du Rugby :</strong></p>
                        <ul style="padding-left:1.2rem;margin:0.5rem 0;font-size:0.9rem;">
                            <li><strong>Cible devant soi vs Passe derrière soi :</strong> Dans tous les autres sports collectifs (Handball, Basket, Football), on attaque la cible en envoyant le ballon vers l'avant. En Rugby, <strong>toute passe ou chute du ballon vers l'avant (En-Avant — Loi 11) est une faute</strong>.</li>
                            <li><strong>Règle du Hors-Jeu (Loi 10) :</strong> Tout coéquipier situé en avant du porteur du ballon est hors-jeu et ne peut ni recevoir le ballon ni gêner la défense. Le <strong>Porteur du Ballon (PB) est donc obligatoirement la pointe avancée de son équipe</strong> (« le premier de cordée »).</li>
                        </ul>
                    </div>

                    <div class="content-card">
                        <h3>2. Les 3 Formes de Jeu Collectif &amp; Rôles (PB / NPB / Défenseur)</h3>
                        <ul style="padding-left:1.2rem;margin:0;font-size:0.9rem;">
                            <li><strong>Les 3 Modalités de Progression Collective :</strong>
                                <br>1) <strong>Le jeu groupé pénétrant (dans l'axe) :</strong> Avancer au cœur de la défense par courses droites et passes courtes au soutien axial proche (« au ras »).
                                <br>2) <strong>Le jeu déployé (sur la largeur) :</strong> Faire circuler le ballon en vague (« en V » profond) vers les couloirs latéraux pour déborder la défense par la vitesse.
                                <br>3) <strong>Le jeu au pied (par-dessus) :</strong> Botter dans le dos du rideau défensif (autorisé uniquement si les poursuivants partent de derrière le botteur).</li>
                            <li><strong>Porteur de Balle (PB) :</strong> Courir droit vers l'intervalle libre avant de passer, fixer un défenseur et transmettre en arrière avant ou juste après le Tag/Contact.</li>
                            <li><strong>Non-Porteur de Balle (NPB) :</strong> Se replacer vite derrière le PB et arriver lancé dans l'intervalle (« course en V ») en criant « <em>À droite ! / À gauche !</em> ».</li>
                            <li><strong>Défenseur :</strong> Monter en <strong>rideau aligné</strong> pour réduire le temps de décision adverse et arracher le Tag (ou plaquer bas aux jambes).</li>
                        </ul>
                    </div>
                </div>

                <!-- COMPARATIF PÉDAGOGIQUE : TOUCH RUGBY VS TAG RUGBY VS RUGBY PLAQUAGE CEINTURÉ -->
                <div class="content-card">
                    <h3>3. Progression Didactique et Sécuritaire en EPS au Maroc : Touch → Tag → Plaquage Ceinturé</h3>
                    <div class="pro-table-wrap">
                        <table class="pro-table">
                            <thead>
                                <tr>
                                    <th>Paramètre Didactique</th>
                                    <th>🖐️ 1. Touch Rugby (Rugby à Toucher 2 mains)</th>
                                    <th>🏷️ 2. Tag / Flag Rugby (Ceintures à 2 rubans)</th>
                                    <th>🏉 3. Rugby Scolaire à Plaquage Ceinturé Réglementé</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Surface &amp; Niveaux Recommandés</strong></td>
                                    <td>Tous terrains (y compris bitume/ciment) · <strong>1AC / 2AC &amp; Débutants</strong> · Mixité totale F/G.</td>
                                    <td>Tous terrains (bitume, stabilisé, salle) · <strong>1AC à 2Bac</strong> · Évaluation objective sans litige de toucher.</td>
                                    <td><strong>Exclusivement sur pelouse souple ou grands tapis</strong> · Lycée (TC à 2Bac) ou AS Rugby.</td>
                                </tr>
                                <tr>
                                    <td><strong>Comment arrêter le Porteur de Balle ?</strong></td>
                                    <td>Toucher simultanément des <strong>2 mains sur les hanches/bassin</strong> en criant « TOUCHÉ ! ».</td>
                                    <td>Arracher l'un des 2 rubans scratchés à la ceinture, le lever haut en criant « <strong>TAG !</strong> » puis le rendre au joueur.</td>
                                    <td>Plaquage ceinturé avec les 2 bras <strong>strictement entre les hanches et les genoux</strong>, épaule au contact et accompagnement au sol.</td>
                                </tr>
                                <tr>
                                    <td><strong>Continuité après l'arrêt (Max 6 Tags)</strong></td>
                                    <td>Le joueur touché pose le ballon au sol et le fait passer entre ses jambes (<em>Rollball</em>) ou fait une passe en arrière en moins de 3 s.</td>
                                    <td>Le joueur tagué dispose de <strong>max 3 pas ou 3 secondes</strong> pour faire une passe en arrière à un soutien lancé. Au 6ème Tag : ballon rendu à l'adversaire.</td>
                                    <td>Le joueur plaqué doit <strong>libérer immédiatement le ballon au sol</strong> vers son camp ; un soutien enjambe le ballon (<em>Ruck</em>) sur ses pieds.</td>
                                </tr>
                                <tr>
                                    <td><strong>Ligne de Hors-Jeu Défensive</strong></td>
                                    <td>Toute la défense doit reculer de <strong>5 mètres</strong> derrière le point du toucher.</td>
                                    <td>Ligne de hors-jeu à <strong>3 à 5 mètres</strong> derrière le point du Tag (matérialisée par le pied de l'arbitre).</td>
                                    <td>Derrière le pied du dernier joueur du Ruck ou du plaquage (Loi 14 &amp; 15 World Rugby).</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- TABLEAU DE REMÉDIATION DES 5 DÉFAUTS FRÉQUENTS -->
                <div class="content-card">
                    <h3>4. Diagnostic Pédagogique : Les 5 Défauts Majeurs en Rugby Scolaire &amp; Remédiations Terrain</h3>
                    <div class="pro-table-wrap">
                        <table class="pro-table">
                            <thead>
                                <tr>
                                    <th>Défaut Observé chez l'Élève</th>
                                    <th>Cause Affective / Perceptive</th>
                                    <th>Conséquence sur le Jeu Collectif</th>
                                    <th>Situation de Remédiation sur le Terrain</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>1. Le Porteur de Balle court en RECULANT vers son propre en-but ou en travers vers la touche</strong></td>
                                    <td>Appréhension du contact ou de se faire arracher son ruban Tag ; refus d'affronter le rideau défensif.</td>
                                    <td>Perte de 10 à 15 mètres de terrain ; enfermement des partenaires le long de la ligne de touche.</td>
                                    <td>Tracer des <strong>zones transversales de 5 mètres avec règle du « Cliquet anti-retour »</strong> : interdit de refranchir en arrière une ligne déjà conquise + bonus +2 pts si le PB avance droit avant de passer.</td>
                                </tr>
                                <tr>
                                    <td><strong>2. La « Grappe » autour du ballon ou des partenaires placés DEVANT le porteur (Hors-Jeu)</strong></td>
                                    <td>Habitude du Football/Handball où l'on demande la balle devant le porteur ; lecture centrée sur le ballon.</td>
                                    <td>Fautes de Hors-Jeu ou passes en-avant systématiques ; aucun espace pour progresser.</td>
                                    <td>Travailler la <strong>ligne d'attaque « en V » (escadrille d'oies sauvages)</strong> : chaque soutien doit voir le numéro dans le dos du porteur de balle avant d'appeler le ballon.</td>
                                </tr>
                                <tr>
                                    <td><strong>3. Passe « patate chaude » déclenchée à 8 mètres du défenseur (ou après en-avant)</strong></td>
                                    <td>Le porteur se débarrasse du ballon trop tôt sans avoir fixé son défenseur direct.</td>
                                    <td>Le défenseur glisse immédiatement sur le receveur qui se fait taguer sans avoir avancé.</td>
                                    <td>Situation <strong>2 contre 1 dans un couloir de 8m de large</strong> : le PB doit entrer dans la « zone de duel » (à 2m du défenseur) pour l'aimanter avant de donner dans l'intervalle au soutien lancé.</td>
                                </tr>
                                <tr>
                                    <td><strong>4. Joueur isolé qui tente de traverser seul toute l'équipe adverse (« L'individualiste »)</strong></td>
                                    <td>Recherche de l'exploit solitaire ; absence de prise d'information sur le soutien disponible.</td>
                                    <td>Perte de balle au Tag/Contact ou oubli d'un surnombre 3 contre 1 sur l'aile.</td>
                                    <td><strong>Règle de l'Essai Collectif Bonifié :</strong> un essai marqué après au moins <strong>4 passes en arrière sans en-avant vaut 7 points</strong> (contre 3 points pour un essai solitaire).</td>
                                </tr>
                                <tr>
                                    <td><strong>5. Défense passive qui recule ou monte en « pointe désorganisée »</strong></td>
                                    <td>Manque de communication entre défenseurs ; un seul élève sort du rang et laisse un trou béant (« intervalle »).</td>
                                    <td>L'attaque franchit facilement la ligne d'avantage dans les trous du rideau.</td>
                                    <td>Consigne du <strong>« Rideau de fer »</strong> : les 5 défenseurs doivent monter ensemble sur une même ligne en annonçant chacun leur vis-à-vis (« <em>J'ai le rouge !</em> »).</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================================================================
             VOLET 4 : FEUILLE DE MATCH (IGT) & 4 GRILLES D'ÉVALUATION (/20)
             ================================================================ -->
        <section id="volet-grilles" class="silo-section">
            <div class="section-header-bar">
                <div>
                    <h2>📊 Volet 4 : Feuille d'Observation Collective (Gagne-Terrain IGT) &amp; 4 Grilles d'Évaluation (/20)</h2>
                    <p class="section-subtitle">Feuille de match 5c5/7c7 et grilles officielles conformes aux <strong>OP 2009 (Collège : 12+3+5)</strong> et <strong>OP 2007 (Lycée : 14+3+3)</strong> exportables en <strong>Word (.doc)</strong> et <strong>PDF A4</strong>.</p>
                </div>
            </div>

            <div class="sub-tabs" role="tablist">
                <button type="button" class="sub-tab-btn active" onclick="switchRugbyGridTab('rgrid-match', this)">📋 1. Feuille de Match &amp; Relevé Gagne-Terrain (IGT)</button>
                <button type="button" class="sub-tab-btn" onclick="switchRugbyGridTab('rgrid-college', this)">🏫 2. Grille Collège 1AC–3AC (OP 2009 · /20)</button>
                <button type="button" class="sub-tab-btn" onclick="switchRugbyGridTab('rgrid-lycee', this)">🎓 3. Grille Lycée TC–2Bac (OP 2007 · /20)</button>
                <button type="button" class="sub-tab-btn" onclick="switchRugbyGridTab('rgrid-dispense', this)">⚖️ 4. Grille Élève Dispensé / Arbitre World Rugby (/20)</button>
            </div>

            <!-- PANEL 1 : FEUILLE D'OBSERVATION DE MATCH (IGT) -->
            <div id="rgrid-match" class="sub-tab-panel active">
                <div class="content-card">
                    <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;margin-bottom:1rem;">
                        <h3 style="margin:0;">📋 Feuille Officielle de Match Rugby Scolaire / Tag Rugby (5c5 ou 7c7) &amp; Calcul de l'IGT</h3>
                        <div class="toolbar-actions">
                            <button type="button" class="btn-export word" onclick="exportElementToWord('rugbyMatchDoc', 'Feuille_Match_Rugby_Scolaire_Tag_IGT_EPS.doc')">📄 Exporter (.doc)</button>
                            <button type="button" class="btn-export pdf" onclick="printElementAsPDF('rugbyMatchDoc', 'Feuille Officielle de Match Rugby Scolaire & Tag — EPS Maroc')">🖨️ Imprimer / PDF A4</button>
                        </div>
                    </div>

                    <div id="rugbyMatchDoc">
                        <div class="pro-table-wrap">
                            <table class="pro-table">
                                <thead>
                                    <tr>
                                        <th>Équipe / Joueur</th>
                                        <th>Possessions Jouées (P)</th>
                                        <th>Franchissements Ligne d'Avantage (F)</th>
                                        <th>Essais Couloirs (5 pts)</th>
                                        <th>Essais Zone Centrale / 4+ Passes (7 pts)</th>
                                        <th>Pertes (En-Avant / Hors-Jeu / 6e Tag)</th>
                                        <th>Tags Arrachés / Plaquages Bas</th>
                                        <th>Indice Gagne-Terrain IGT = (F+E)/P</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>ÉQUIPE A :</strong> ____________</td>
                                        <td>1 2 3 4 5 6 7 8 9 10</td>
                                        <td>1 2 3 4 5 6 7 8 9 10</td>
                                        <td>[5] [5] [5] [5]</td>
                                        <td>[7] [7] [7] [7]</td>
                                        <td>1 2 3 4 5 6</td>
                                        <td>1 2 3 4 5 6 7 8 9 10</td>
                                        <td><strong>_____ %</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>ÉQUIPE B :</strong> ____________</td>
                                        <td>1 2 3 4 5 6 6 7 8 9 10</td>
                                        <td>1 2 3 4 5 6 7 8 9 10</td>
                                        <td>[5] [5] [5] [5]</td>
                                        <td>[7] [7] [7] [7]</td>
                                        <td>1 2 3 4 5 6</td>
                                        <td>1 2 3 4 5 6 7 8 9 10</td>
                                        <td><strong>_____ %</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Élève 1 :</strong> ______________</td>
                                        <td>Courses vers l'avant : ___</td>
                                        <td>Passes en arrière OK : ___</td>
                                        <td>Soutiens en-jeu : ___</td>
                                        <td>Essais : ___</td>
                                        <td>En-avants : ___</td>
                                        <td>Tags / Plaquages : ___</td>
                                        <td><strong>Note : ___ /20</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Élève 2 :</strong> ______________</td>
                                        <td>Courses vers l'avant : ___</td>
                                        <td>Passes en arrière OK : ___</td>
                                        <td>Soutiens en-jeu : ___</td>
                                        <td>Essais : ___</td>
                                        <td>En-avants : ___</td>
                                        <td>Tags / Plaquages : ___</td>
                                        <td><strong>Note : ___ /20</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- PANEL 2 : GRILLE COLLÈGE OP 2009 (/20) -->
            <div id="rgrid-college" class="sub-tab-panel">
                <div class="content-card">
                    <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;margin-bottom:1rem;">
                        <h3 style="margin:0;">🏫 Grille d'Évaluation Sommative Collège (1AC, 2AC, 3AC) — Rugby / Tag Rugby OP 2009 (/20)</h3>
                        <div class="toolbar-actions">
                            <button type="button" class="btn-export word" onclick="exportElementToWord('rugbyCollegeDoc', 'Grille_Evaluation_College_Rugby_Tag_OP2009.doc')">📄 Exporter (.doc)</button>
                            <button type="button" class="btn-export pdf" onclick="printElementAsPDF('rugbyCollegeDoc', 'Grille Évaluation Collège Rugby Scolaire & Tag OP 2009')">🖨️ Imprimer / PDF A4</button>
                        </div>
                    </div>
                    <div id="rugbyCollegeDoc">
                        <div class="pro-table-wrap">
                            <table class="pro-table">
                                <thead>
                                    <tr>
                                        <th>Domaine (OP 2009)</th>
                                        <th>Critères d'Évaluation (Porteur PB, Soutien NPB, Défenseur &amp; Collectif)</th>
                                        <th>Barème &amp; Indicateurs de Niveau</th>
                                        <th>Max</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td rowspan="2"><strong>1. Habiletés Motrices &amp; Tactiques<br>(12 points)</strong></td>
                                        <td><strong>A. Maîtrise Individuelle : Porteur (PB), Soutien (NPB) &amp; Défenseur (/7 pts)</strong></td>
                                        <td>• <strong>Porteur (/3 pts) :</strong> Avance droit vers la ligne d'avantage (ne recule pas), fixe un défenseur et passe en arrière avant/après le Tag sans faire d'en-avant.<br>• <strong>Non-Porteur (/2 pts) :</strong> Se replace derrière le porteur (en-jeu) et propose une solution de soutien en V.<br>• <strong>Défenseur (/2 pts) :</strong> Monte en ligne et arrache le Tag à 2 mains (ou plaque bas à la taille sur tapis) en reculant de 5m après l'action.</td>
                                        <td><strong>/ 7 pts</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>B. Efficacité Collective &amp; Indice de Gagne-Terrain (IGT) (/5 pts)</strong></td>
                                        <td>• <strong>1–2 pts :</strong> Équipe en grappe, nombreuses pertes en-avant (IGT < 35%).<br>• <strong>3–4 pts :</strong> L'équipe franchit régulièrement la ligne d'avantage en 3+ passes ($IGT : 40 à 65%$).<br>• <strong>5 pts :</strong> Alternance jeu dans l'axe et jeu au large avec essais construits (IGT > 65%).</td>
                                        <td><strong>/ 5 pts</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>2. Connaissances Conceptuelles<br>(3 points)</strong></td>
                                        <td><strong>Règles Fondamentales World Rugby &amp; Tag Rugby (/3 pts)</strong></td>
                                        <td>• <strong>1 pt :</strong> Règle de l'En-Avant (passe/chute vers l'avant) et du Hors-Jeu (être derrière le porteur).<br>• <strong>1 pt :</strong> Règle des 6 Tags / Touchers et ligne de hors-jeu à 5 mètres.<br>• <strong>1 pt :</strong> Valeur des points (Essai 5 pts, Transfo 2 pts, Pénalité/Drop 3 pts) et sécurité.</td>
                                        <td><strong>/ 3 pts</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>3. Comportement &amp; Rôles Sociaux<br>(5 points)</strong></td>
                                        <td><strong>Respect absolu de l'intégrité physique, Arbitrage &amp; Fair-Play (/5 pts)</strong></td>
                                        <td>• <strong>2 pts :</strong> Maîtrise de soi, aucun geste dangereux (jamais de contact au-dessus de la taille, remise courtoise du ruban Tag).<br>• <strong>2 pts :</strong> Arbitrage clair (annonce des Tags 1 à 6 et des en-avants).<br>• <strong>1 pt :</strong> Solidarité et mixité active dans l'équipe.</td>
                                        <td><strong>/ 5 pts</strong></td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" style="text-align:right;font-weight:900;">NOTE TOTALE COLLÈGE (1AC / 2AC / 3AC) :</td>
                                        <td><strong>/ 20 pts</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- PANEL 3 : GRILLE LYCÉE / BAC OP 2007 (/20) -->
            <div id="rgrid-lycee" class="sub-tab-panel">
                <div class="content-card">
                    <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;margin-bottom:1rem;">
                        <h3 style="margin:0;">🎓 Grille d'Évaluation Sommative Lycée (TC, 1Bac, 2Bac) — Rugby / Tag Rugby OP 2007 (/20)</h3>
                        <div class="toolbar-actions">
                            <button type="button" class="btn-export word" onclick="exportElementToWord('rugbyLyceeDoc', 'Grille_Evaluation_Lycee_Bac_Rugby_Tag_OP2007.doc')">📄 Exporter (.doc)</button>
                            <button type="button" class="btn-export pdf" onclick="printElementAsPDF('rugbyLyceeDoc', 'Grille Évaluation Lycée Rugby Scolaire & Tag OP 2007')">🖨️ Imprimer / PDF A4</button>
                        </div>
                    </div>
                    <div id="rugbyLyceeDoc">
                        <div class="pro-table-wrap">
                            <table class="pro-table">
                                <thead>
                                    <tr>
                                        <th>Domaine (OP 2007)</th>
                                        <th>Critères d'Évaluation Lycée / Bac</th>
                                        <th>Barème &amp; Indicateurs de Maîtrise</th>
                                        <th>Max</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td rowspan="2"><strong>1. Habiletés Motrices &amp; Tactiques<br>(14 points)</strong></td>
                                        <td><strong>A. Efficacité Individuelle dans le Duel &amp; la Continuité (/8 pts)</strong></td>
                                        <td>• <strong>Porteur de Balle (/3,5 pts) :</strong> Attaque l'intervalle à haute vitesse, gagne ses duels 1c1 (cadrage-débordement) ou fixe 2 défenseurs pour libérer un partenaire dans le timing.<br>• <strong>Soutien NPB (/2,5 pts) :</strong> Enchaîne soutien axial (continuité au près) et soutien déployé profond en V sans jamais être hors-jeu.<br>• <strong>Défenseur (/2 pts) :</strong> Cadrage défensif en rideau, Tag/Plaquage ceinturé bas efficace et replacement immédiat.</td>
                                        <td><strong>/ 8 pts</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>B. Organisation Collective, Choix Tactique (Axial / Déployé) &amp; IGT (/6 pts)</strong></td>
                                        <td>• <strong>Indice de Gagne-Terrain (/3 pts) :</strong> $IGT ≥ 70% = 3 pts$ ; $50 à 69% = 2 pts$ ; $< 50% = 1 pt$.<br>• <strong>Alternance des formes de jeu (/3 pts) :</strong> Capacité de l'équipe à fixer la défense dans l'axe avant de déployer le ballon sur les ailes pour exploiter le surnombre.</td>
                                        <td><strong>/ 6 pts</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>2. Connaissances Conceptuelles<br>(3 points)</strong></td>
                                        <td><strong>Lois du Jeu World Rugby 2026 &amp; Principes Stratégiques (/3 pts)</strong></td>
                                        <td>• <strong>1,5 pt :</strong> Maîtrise des règles (En-avant, Hors-jeu de phase courante et de regroupement, Ruck vs Maul, règle de l'avantage, décompte des points).<br>• <strong>1,5 pt :</strong> Lecture tactique (quand jouer groupé pénétrant vs quand écarter au large).</td>
                                        <td><strong>/ 3 pts</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>3. Comportement &amp; Rôles d'Officiel<br>(3 points)</strong></td>
                                        <td><strong>Arbitrage Officiel, Sécurité Active &amp; Esprit Rugby (/3 pts)</strong></td>
                                        <td>• <strong>1,5 pt :</strong> Arbitrage gestuel et vocal codifié (avantage, en-avant, décompte des Tags, ligne de hors-jeu).<br>• <strong>1,5 pt :</strong> Respect absolu de la sécurité physique, de l'arbitre et de l'adversaire.</td>
                                        <td><strong>/ 3 pts</strong></td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" style="text-align:right;font-weight:900;">NOTE TOTALE LYCÉE (TC / 1BAC / 2BAC) :</td>
                                        <td><strong>/ 20 pts</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- PANEL 4 : GRILLE ÉLÈVE DISPENSÉ (/20) -->
            <div id="rgrid-dispense" class="sub-tab-panel">
                <div class="content-card">
                    <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;margin-bottom:1rem;">
                        <h3 style="margin:0;">⚖️ Grille d'Évaluation pour Élève Dispensé(e) — Arbitre Central, Juge de Hors-Jeu &amp; Statisticien IGT (/20)</h3>
                        <div class="toolbar-actions">
                            <button type="button" class="btn-export word" onclick="exportElementToWord('rugbyDispenseDoc', 'Grille_Eleve_Dispense_Rugby_Scolaire_EPS.doc')">📄 Exporter (.doc)</button>
                            <button type="button" class="btn-export pdf" onclick="printElementAsPDF('rugbyDispenseDoc', 'Grille Élève Dispensé Rugby Scolaire & Tag EPS')">🖨️ Imprimer / PDF A4</button>
                        </div>
                    </div>
                    <div id="rugbyDispenseDoc">
                        <div class="pro-table-wrap">
                            <table class="pro-table">
                                <thead>
                                    <tr>
                                        <th>Mission confiée à l'élève dispensé(e)</th>
                                        <th>Compétences Observées sur le Terrain</th>
                                        <th>Max</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>1. Arbitre Central &amp; Décompte des 6 Tags / Sécurité (/6 pts)</strong></td>
                                        <td>Se déplace à hauteur du ballon, annonce à voix forte chaque Tag (« <em>Tag 1 ! Tag 2 !...</em> »), applique la règle de l'avantage, siffle les passes en-avant et sanctionne immédiatement tout contact haut ou dangereux.</td>
                                        <td><strong>/ 6 pts</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>2. Juge de Ligne de Hors-Jeu (5 mètres) &amp; de Touche (/5 pts)</strong></td>
                                        <td>Se place exactement à 5 mètres derrière chaque point de Tag/Toucher, tend le bras horizontalement pour aligner le rideau défensif et signale tout défenseur qui part avant la remise en jeu.</td>
                                        <td><strong>/ 5 pts</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>3. Statisticien de l'Indice de Gagne-Terrain (IGT) &amp; Coach (/5 pts)</strong></td>
                                        <td>Relève sur la feuille de match le nombre de possessions, les franchissements de la ligne d'avantage, les essais et les en-avants, calcule l'IGT (%) à la mi-temps et propose un axe d'amélioration collectif.</td>
                                        <td><strong>/ 5 pts</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>4. Assiduité, Tenue &amp; Gestion du Matériel (/4 pts)</strong></td>
                                        <td>Distribution et comptage des ceintures Tag / rubans scratchs, des chasubles, des plots d'en-but et des ballons ovales.</td>
                                        <td><strong>/ 4 pts</strong></td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" style="text-align:right;font-weight:900;">NOTE TOTALE ÉLÈVE DISPENSÉ(E) :</td>
                                        <td><strong>/ 20 pts</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================================================================
             VOLET 5 : SÉCURITÉ TERRAIN DUR VS PELOUSE, 40+ ÉLÈVES & LOIS WORLD RUGBY
             ================================================================ -->
        <section id="volet-terrain" class="silo-section">
            <div class="section-header-bar">
                <div>
                    <h2>🏟️ Volet 5 : Sécurité Critique au Maroc (Terrain Bitumé vs Pelouse), Gestion de 40+ Élèves &amp; Lois World Rugby 2026</h2>
                    <p class="section-subtitle">Comment enseigner le Rugby en toute sécurité dans 100% des collèges et lycées marocains, même sans terrain gazonné ni ceintures officielles.</p>
                </div>
            </div>

            <div class="grid-3">
                <div class="content-card" style="border-top:4px solid #991b1b;">
                    <h3>🚨 1. Règle d'Or de Sécurité : Surface du Terrain</h3>
                    <p style="font-size:0.88rem;color:#334155;">Dans la majorité des établissements scolaires marocains, les terrains sont en <strong>bitume/ciment</strong> :</p>
                    <ul style="padding-left:1.15rem;font-size:0.86rem;color:#334155;">
                        <li><strong>Sur terrain dur (bitume/ciment) :</strong> Le plaquage au sol est <strong>formellement interdit</strong>. On pratique exclusivement le <strong>Tag Rugby</strong> (2 foulards/rubans glissés à la taille du short si vous n'avez pas de ceintures scratchs) ou le <strong>Touch Rugby à 2 mains sur les hanches</strong>.</li>
                        <li><strong>Pour aplatir l'essai sur terrain dur :</strong> Pas besoin de plonger au sol ! Il suffit de <strong>poser le ballon à 2 mains derrière la ligne d'en-but en fléchissant les genoux</strong>.</li>
                    </ul>
                </div>

                <div class="content-card" style="border-top:4px solid #15803d;">
                    <h3>🏟️ 2. Organisation de 40+ Élèves sur un Terrain de Handball</h3>
                    <p style="font-size:0.88rem;color:#334155;">Un terrain de Handball (40 m × 20 m) se divise dans la largeur en <strong>2 ou 3 mini-terrains transversaux de 20 m × 13 m</strong> :</p>
                    <ul style="padding-left:1.15rem;font-size:0.86rem;color:#334155;">
                        <li><strong>6 équipes de 6 élèves (36 élèves) :</strong> 4 équipes jouent simultanément en <strong>5 contre 5</strong> (+ 1 remplaçant par équipe) sur 2 terrains transversaux.</li>
                        <li>Les 2 autres équipes assurent l'<strong>arbitrage en binôme</strong> (1 arbitre central + 1 juge de ligne de hors-jeu à 5m) et le relevé statistique de l'<strong>IGT</strong>. Rotation toutes les 6 minutes.</li>
                    </ul>
                </div>

                <div class="content-card" style="border-top:4px solid #006233;">
                    <h3>🔥 3. Échauffement Spécifique Rugby (12 min)</h3>
                    <ol style="padding-left:1.15rem;font-size:0.86rem;color:#334155;">
                        <li><strong>Activation cardio &amp; Manipulation du ballon ovale (4 min) :</strong> Course en vagues de 4 avec passes courtes à 2 mains autour de la taille et ramassage du ballon au sol en fléchissant les jambes.</li>
                        <li><strong>Renforcement cervical, épaules &amp; gainage (4 min) :</strong> Mobilisation du cou, poussées d'épaules contrôlées dos-à-dos ou face-à-face en gainage.</li>
                        <li><strong>Jeu de « L'Épervier Tag » (4 min) :</strong> Traverser un couloir de 10m en cadrant/débordant un défenseur qui cherche à arracher le foulard/Tag.</li>
                    </ol>
                </div>
            </div>
        </section>

        <!-- ================================================================
             VOLET 6 : BIBLIOTHÈQUE DES ARTICLES RUGBY & SPORTS COLLECTIFS LIÉS
             ================================================================ -->
        <section id="volet-articles" class="silo-section">
            <div class="section-header-bar">
                <div>
                    <h2>📚 Volet 6 : Bibliothèque Complète des Articles &amp; Règlements Rugby et Sports Collectifs</h2>
                    <p class="section-subtitle">Retrouvez les Lois du Jeu World Rugby 2026 illustrées, nos dossiers didactiques et nos calculateurs de préparation physique.</p>
                </div>
            </div>

            <div class="grid-3">
                <article class="content-card">
                    <div style="font-size:0.75rem;font-weight:800;color:#991b1b;text-transform:uppercase;margin-bottom:0.35rem;">Règlement Officiel World Rugby</div>
                    <h3 style="font-size:1.02rem;margin-bottom:0.5rem;"><a href="reglement-rugby-world-rugby-arbitrage-eps.html" style="color:#0f172a;text-decoration:none;">🏉 Règlement Officiel du Rugby (Lois World Rugby 2026), Terrain &amp; Gestes d'Arbitrage</a></h3>
                    <p style="font-size:0.85rem;color:#475569;">Dimensions du terrain, poteaux en H (5,60 m × 3,00 m), règle de l'en-avant, du hors-jeu, du ruck et gestes d'arbitrage illustrés.</p>
                    <a href="reglement-rugby-world-rugby-arbitrage-eps.html" style="font-size:0.84rem;font-weight:800;color:#991b1b;text-decoration:none;">Lire le règlement World Rugby →</a>
                </article>

                <article class="content-card">
                    <div style="font-size:0.75rem;font-weight:800;color:#15803d;text-transform:uppercase;margin-bottom:0.35rem;">Dossier Pédagogique EPS Maroc</div>
                    <h3 style="font-size:1.02rem;margin-bottom:0.5rem;"><a href="article-rugby-eps-maroc.html" style="color:#0f172a;text-decoration:none;">📘 Enseigner le Rugby Scolaire en EPS au Maroc : Situations Sans Contact &amp; Sécurité</a></h3>
                    <p style="font-size:0.85rem;color:#475569;">Progression pédagogique complète du Touch Rugby et Flag Rugby, gestion de la mixité Filles/Garçons et situations d'apprentissage.</p>
                    <a href="article-rugby-eps-maroc.html" style="font-size:0.84rem;font-weight:800;color:#15803d;text-decoration:none;">Consulter le dossier Rugby →</a>
                </article>

                <article class="content-card">
                    <div style="font-size:0.75rem;font-weight:800;color:#1d4ed8;text-transform:uppercase;margin-bottom:0.35rem;">Préparation Physique Rugby</div>
                    <h3 style="font-size:1.02rem;margin-bottom:0.5rem;"><a href="article-mas-team-sports-conditioning-soccer-rugby.html" style="color:#0f172a;text-decoration:none;">⚡ VMA, Intermittent HIIT &amp; Réserve de Vitesse Anaérobie (ASR) en Rugby &amp; Sports Co</a></h3>
                    <p style="font-size:0.85rem;color:#475569;">Planification de l'endurance intermittente et des changements de direction (COD 180°) adaptés aux sports collectifs de grand terrain.</p>
                    <a href="article-mas-team-sports-conditioning-soccer-rugby.html" style="font-size:0.84rem;font-weight:800;color:#1d4ed8;text-decoration:none;">Lire l'étude scientifique →</a>
                </article>
            </div>
        </section>

    </main>

    <!-- ================================================================
         SCRIPT INTERACTIF : STUDIO 24 CYCLES RUGBY + CALCULATEUR IGT + EXPORT WORD/PDF
         ================================================================ -->
    <script>
    (function() {{
      const GRADE_META = {{
        "1AC": {{
          label: "1ère Année Collège (1AC · Touch & Tag Rugby 5c5)",
          ref: "Orientations Pédagogiques 2009 (Note 143-09)",
          oti: "L'élève de la 1ère année doit pouvoir acquérir une motricité correcte lui permettant de s'adapter aux exigences des situations (forme et rythme) et s'intégrer dans le groupe.",
          otc: "Au terme du cycle de Touch/Tag Rugby en 1AC, l'élève doit pouvoir courir vers l'en-but adverse sans reculer, passer le ballon en arrière à deux mains avant ou juste après le Tag, et respecter la règle du hors-jeu et l'intégrité physique d'autrui.",
          bareme: "Habiletés motrices : 12 pts (Individuel 7 + Collectif IGT 5) | Connaissances : 3 pts | Comportement : 5 pts (/20)"
        }},
        "2AC": {{
          label: "2ème Année Collège (2AC · Tag Rugby 5c5 / 6c6)",
          ref: "Orientations Pédagogiques 2009 (Note 143-09)",
          oti: "L'élève de la 2ème année doit pouvoir ajuster l'énergie physique et la maîtriser et fournir l'effort et l'orienter pour effectuer des réalisations coordonnées et organisées, et communiquer avec les autres.",
          otc: "Au terme du cycle de Tag Rugby en 2AC, l'élève doit pouvoir s'organiser en ligne d'attaque en V (soutien placé derrière le porteur) pour franchir un rideau défensif en 2 contre 1 et marquer en zone d'en-but.",
          bareme: "Habiletés motrices : 12 pts (Individuel 7 + Collectif IGT 5) | Connaissances : 3 pts | Comportement : 5 pts (/20)"
        }},
        "3AC": {{
          label: "3ème Année Collège (3AC · Tag Rugby / Rugby Scolaire 6c6 ou 7c7)",
          ref: "Orientations Pédagogiques 2009 (Note 143-09)",
          oti: "L'élève de la 3ème année doit pouvoir ajuster les éléments de l'acte moteur et l'adapter aux différentes situations en fonction de ses exigences organisationnelles et réglementaires, et s'exercer sur la pratique des droits et devoirs pour réaliser un projet sportif individuel ou collectif.",
          otc: "Au terme du cycle de Rugby en 3AC, l'élève doit pouvoir enchaîner plusieurs phases de jeu (continuité après Tag/Contact) en combinant pénétration dans l'axe et passes vers les ailes, tout en arbitrant selon le code World Rugby adapté.",
          bareme: "Habiletés motrices : 12 pts (Individuel 7 + Collectif IGT 5) | Connaissances : 3 pts | Comportement : 5 pts (/20)"
        }},
        "TC": {{
          label: "Tronc Commun (TC · Tag Rugby & Rugby à 7 Scolaire)",
          ref: "Orientations Pédagogiques 2007 (Note 142-10)",
          oti: "L'élève du Tronc Commun doit pouvoir maîtriser les composantes du comportement moteur et pouvoir s'adapter aux différentes situations et faire face à ses défis et accepter l'intégration dans le groupe.",
          otc: "Rechercher le gain de terrain par l'attaque résolue des intervalles, le soutien permanent en arrière du porteur et l'organisation d'un rideau défensif aligné à 5 mètres.",
          bareme: "Habiletés motrices : 14 pts (Individuel 8 + Collectif IGT 6) | Connaissances : 3 pts | Comportement : 3 pts (/20)"
        }},
        "1BAC": {{
          label: "1ère Année Baccalauréat (1Bac · Tag Rugby & Sevens 7c7)",
          ref: "Orientations Pédagogiques 2007 (Note 142-10)",
          oti: "L'élève de la 1ère année Bac doit pouvoir confronter les situations motrices grâce à l'adéquation des différents éléments de l'acte moteur et la planification de différents types d'effort physique individuel ou collectif.",
          otc: "Alterner intentionnellement le jeu groupé dans l'axe (pour fixer et resserrer la défense) et le jeu déployé sur la largeur (pour déborder dans les couloirs) afin d'atteindre un Indice de Gagne-Terrain IGT ≥ 65%.",
          bareme: "Habiletés motrices : 14 pts (Individuel 8 + Collectif IGT 6) | Connaissances : 3 pts | Comportement : 3 pts (/20)"
        }},
        "2BAC": {{
          label: "2ème Année Baccalauréat (2Bac · Projet Tactique Collectif Rugby / Tag 7c7)",
          ref: "Orientations Pédagogiques 2007 (Note 142-10)",
          oti: "L'élève de la 2ème année Bac doit pouvoir analyser différentes situations et interactions motrices et s'intégrer volontairement dans la planification et la réalisation de projets individuels et collectifs.",
          otc: "Concevoir, mettre en œuvre et réguler un projet collectif d'attaque et de défense en Rugby 7c7 (Tag ou Contact sécurisé) en optimisant la conservation du ballon, la création de surnombres et l'arbitrage officiel World Rugby.",
          bareme: "Habiletés motrices : 14 pts (Individuel 8 + Collectif IGT 6) | Connaissances : 3 pts | Comportement : 3 pts (/20)"
        }}
      }};

      const LEVEL_PROFILES = {{
        1: {{
          name: "Niveau 1 · Débutant (Jeu en grappe & Course en reculant)",
          diag: "Le porteur du ballon a peur d'être touché/tagué et court en reculant vers son propre camp ; les partenaires s'agglutinent autour de lui ou restent devant lui (hors-jeu), provoquant des en-avants incessants.",
          trans: "Oser courir droit vers l'avant (vers l'en-but adverse), tenir le ballon à 2 mains et le transmettre en arrière à un partenaire placé derrière soi avant ou dès le cri « TAG ! ».",
          diff: "Couloirs de progression avec lignes anti-retour tous les 5m, surnombre offensif 4 contre 2 et interdiction d'arracher le ballon des mains."
        }},
        2: {{
          name: "Niveau 2 · Initié (Avancer dans l'axe mais passes précipitées)",
          diag: "Le porteur avance mais lance le ballon trop tôt (« patate chaude ») sans avoir fixé son défenseur, ou s'isole en oubliant son soutien.",
          trans: "Fixer son défenseur direct en entrant dans sa zone d'action (à 2 m) puis donner dans le bon tempo à un partenaire arrivant lancé en arrière et sur le côté (formation en V).",
          diff: "Situations de 2c1 et 3c2 dans des couloirs de 10m de large ; essai après 3 passes en arrière = 7 points."
        }},
        3: {{
          name: "Niveau 3 · Confirmé (Soutien en V & Continuité après Tag/Contact)",
          diag: "L'équipe progresse sur la 1ère vague mais s'arrête dès que le porteur est tagué/plaqué faute de soutien axial proche pour assurer la remise en jeu rapide.",
          trans: "Enchaîner 3 à 4 temps de jeu consécutifs sans perdre le ballon grâce à un soutien axial immédiat (relais en moins de 3 secondes) et un soutien large disponible.",
          diff: "Jeu 5c5 ou 6c6 avec règle des 6 Tags : obligation de remettre le ballon en jeu en moins de 3 secondes après chaque Tag."
        }},
        4: {{
          name: "Niveau 4 · Expert / AS (Alternance Jeu Pénétrant Axial & Jeu Déployé Large)",
          diag: "L'équipe maîtrise la continuité mais utilise toujours la même forme de jeu (uniquement au large ou uniquement dans l'axe) sans lire la densité du rideau défensif.",
          trans: "Lire le dispositif défensif adverse : fixer dans l'axe pour attirer les défenseurs au centre, puis écarter rapidement en vagues profondes vers les couloirs extérieurs libres.",
          diff: "Cible centrale bonifiée (7 pts) + couloirs latéraux (5 pts) avec coaching tactique à la mi-temps basé sur l'IGT."
        }}
      }};

      const SESSIONS = [
        {{
          num: 1,
          short: "Évaluation Diagnostique : Matchs 5c5 en Tag/Touch Rugby & Relevé de l'IGT",
          obj: "Évaluer le comportement initial des élèves face au paradoxe du rugby (avancer vers l'avant en passant en arrière), relever l'Indice de Gagne-Terrain (IGT) et constituer 4 groupes de niveau.",
          echauff: "Course en vagues avec passes d'un ballon ovale à 2 mains, mobilisations cervicales/épaules et jeu de l'Épervier Tag (12 min).",
          fond: "Tournoi diagnostique en 5 contre 5 sur mini-terrains (40m × 20m) en Tag Rugby (2 rubans à la taille) ou Touch Rugby à 2 mains. Règle des 6 Tags par possession. L'équipe observatrice relève les franchissements de la ligne médiane, les passes en arrière réussies, les essais et les en-avants.",
          critComp: "Respecter les 3 règles d'or : 1) Interdit de passer vers l'avant ; 2) Soutien placé derrière le porteur ; 3) Zéro contact haut ou brutal.",
          critReuss: "Participer activement à 3 matchs de 6 min et obtenir son profil initial (IGT et rôle PB/NPB/Déf).",
          retour: "Regroupement, explication du paradoxe fondamental du Rugby et constitution des équipes homogènes."
        }},
        {{
          num: 2,
          short: "Oser Avancer Droit (Le Gagne-Terrain) & Vaincre la Course en Reculant",
          obj: "Supprimer la fuite en arrière ou en travers du porteur de balle en l'amenant à courir droit vers l'en-but adverse pour gagner du terrain à chaque possession.",
          echauff: "Manipulations du ballon ovale (tour de taille, huit entre les jambes), courses de gagne-terrain en relais (12 min).",
          fond: "Situation « Les Zones Cliquets de 5 Mètres » : le terrain est découpé en 4 bandes transversales de 5m. En 4 contre 3, chaque bande franchie vers l'avant rapporte +1 point immédiat, mais il est interdit de refranchir en arrière une ligne déjà conquise. Si le porteur est tagué en avançant, son équipe conserve le ballon au point atteint.",
          critComp: "Tenir le ballon à deux mains devant le sternum, accélérer droit dans l'espace libre devant soi.",
          critReuss: "Franchir au moins 2 zones de 5 mètres vers l'avant sur 70% des possessions.",
          retour: "Étirements et verbalisation : pourquoi reculer fait perdre du terrain à toute l'équipe."
        }},
        {{
          num: 3,
          short: "La Passe en Arrière à Deux Mains & le Placement « En-Jeu » (Derrière le Porteur)",
          obj: "Acquérir la gestuelle de la passe vissée/balancée en arrière à deux mains et le réflexe du non-porteur de se placer toujours derrière le porteur de balle.",
          echauff: "Vagues de 4 joueurs en course : passes latérales en arrière sur signal sonore (12 min).",
          fond: "Atelier « L'Escadrille en V » : vagues de 4 attaquants contre 1 puis 2 défenseurs sur 25 mètres. Le porteur est la pointe du V ; les soutiens à gauche et à droite doivent impérativement voir le dos du porteur avant de demander la balle (« À droite ! / À gauche ! »). Tout en-avant ou réception devant le porteur rend la balle.",
          critComp: "Tourner les épaules et orienter les mains vers la cible arrière (hauteur poitrine du partenaire lancé).",
          critReuss: "Enchaîner 4 passes en arrière en course sans aucun en-avant sur 4 passages sur 5.",
          retour: "Rappel de la Loi 10 (Hors-jeu) et de la Loi 11 (En-avant) avec les gestes officiels de l'arbitre."
        }},
        {{
          num: 4,
          short: "Fixer un Défenseur et Donner dans l'Intervalle (Le Surnombre 2c1 & 3c2)",
          obj: "Apprendre au porteur de balle à fixer (« aimanter ») son défenseur direct avant de transmettre au partenaire démarqué dans l'intervalle libre.",
          echauff: "Passes courtes en mouvement à 2 et exercices de cadrage-débordement (appuis bas dynamiques) (12 min).",
          fond: "Situation « Le Couloir 2 contre 1 puis 3 contre 2 » (largeur 10m, longueur 20m) : le porteur attaque droit sur le défenseur pour l'obliger à s'arrêter sur lui. À 1,50m–2m du défenseur, il passe en arrière au soutien qui accélère dans le couloir libre. Si le porteur passe trop tôt (> 5m du défenseur), l'essai est annulé.",
          critComp: "PB : courir sur l'épaule interne du défenseur puis lâcher la balle avant le Tag. NPB : arriver lancé de derrière avec un léger retard.",
          critReuss: "Marquer l'essai sur au moins 7 situations de 2c1 / 3c2 sur 10.",
          retour: "Synthèse collective des 3 règles d'or du « Fixer-Donner »."
        }},
        {{
          num: 5,
          short: "La Continuité après le Tag / Contact : Libérer en Moins de 3 Secondes au Soutien Axial",
          obj: "Maintenir le ballon vivant malgré l'arrêt du porteur en organisant le relais immédiat avec le soutien axial proche (passe après Tag ou libération au sol).",
          echauff: "Échauffement spécifique + atelier « Tagué – Passé en 2 secondes » par trinômes (12 min).",
          fond: "Situation « Le Ballon Brûlant après Tag » (5 contre 4) : dès qu'un défenseur arrache le ruban et crie « TAG ! », l'arbitre compte à voix haute « 1 – 2 – 3 ! ». Le porteur doit transmettre en arrière à son soutien axial arrivé dans son dos avant « 3 » (ou sur tapis/pelouse : poser le ballon en arrière au sol pour le relayeur).",
          critComp: "Soutien axial : suivre à 2 mètres derrière le porteur pour être prêt dès le Tag. Porteur : se retourner vers son camp pour protéger et transmettre.",
          critReuss: "Enchaîner au moins 4 tags consécutifs dans une même possession sans perdre le ballon.",
          retour: "Explication de la différence entre Tag Rugby (passe debout ≤ 3s) et Ruck en Rugby à 7/XV (ballon au sol enjambé debout)."
        }},
        {{
          num: 6,
          short: "Organisation Défensive : Monter en Rideau Aligné & Règle des 5 Mètres",
          obj: "Organiser une défense collective qui monte ensemble en ligne (« rideau ») pour réduire l'espace-temps des attaquants et récupérer le ballon sans se mettre hors-jeu.",
          echauff: "Déplacements défensifs en pas chassés alignés à 5 joueurs au signal visuel (12 min).",
          fond: "Match à thème « Le Rideau de Fer » (5c5) : après chaque Tag, le juge de ligne place son drapeau à 5 mètres derrière le point du Tag. Tous les défenseurs doivent reculer derrière cette ligne, s'aligner en annonçant chacun leur vis-à-vis (« J'ai le n°3 ! ») et monter ensemble dès la passe. Tout Tag réussi avant la ligne d'avantage rapporte +2 points à la défense.",
          critComp: "Ne jamais sortir seul en pointe ; encadrer le porteur à deux (un qui bloque l'axe, un qui ferme l'extérieur).",
          critReuss: "Stopper l'attaque adverse (6 Tags atteints ou récupération) sur au moins 50% des possessions.",
          retour: "Étirements et retour sur la communication vocale en défense."
        }},
        {{
          num: 7,
          short: "Le Jeu Déployé sur la Largeur : Exploiter les Couloirs Latéraux",
          obj: "Faire circuler rapidement le ballon vers les ailes en formation profonde (« en V ») pour contourner une défense regroupée au centre.",
          echauff: "Circulation du ballon à 5 joueurs sur toute la largeur du terrain (aller-retour sans chute) (12 min).",
          fond: "Match « Les Couloirs d'Essai Bonifiés » (6c6) : deux couloirs latéraux de 4 mètres sont matérialisés le long des lignes de touche. Tout essai aplati dans les couloirs d'aile après au moins 3 passes en arrière vaut 7 points (contre 5 points au centre), incitant l'équipe à déployer le jeu.",
          critComp: "Conserver de la profondeur dans la ligne de trois-quarts pour courir vite tout en passant en arrière.",
          critReuss: "Marquer au moins 2 essais bonifiés par les ailes au cours du match.",
          retour: "Analyse des trajectoires de courses des ailiers."
        }},
        {{
          num: 8,
          short: "Alterner Jeu Groupé dans l'Axe (Fixation) & Jeu Déployé au Large",
          obj: "Construire une stratégie collective complète : fixer la défense au centre par 1 ou 2 temps de jeu pénétrants, puis écarter au large là où la défense est dégarnie.",
          echauff: "Routine collective à 6 : 1 fixation axiale + 1 relais + 2 passes larges vers l'aile (12 min).",
          fond: "Situation « Fixer au Centre pour Marquer au Large » (6c6 ou 7c7) : une zone centrale de fixation est tracée au milieu du terrain. Si l'attaque obtient un Tag dans la zone centrale (qui oblige 2 défenseurs à se resserrer) et marque sur le temps de jeu suivant dans un couloir extérieur, l'essai vaut 10 points.",
          critComp: "Relayeur (demi de mêlée) : lire vite de quel côté il y a le surnombre (3 contre 2) après le point de fixation.",
          critReuss: "Atteindre un Indice de Gagne-Terrain (IGT) ≥ 65% sur l'ensemble du match.",
          retour: "Bilan tactique par équipe avec le statisticien IGT."
        }},
        {{
          num: 9,
          short: "Tournoi Pré-Sommatif Officiel (Tag / Rugby 7c7) & Arbitrage World Rugby",
          obj: "Stabiliser le projet de jeu collectif de chaque équipe et valider les rôles d'arbitre central (gestes World Rugby), de juge de hors-jeu et de statisticien IGT.",
          echauff: "Échauffement autonome dirigé par les capitaines d'équipe (12 min).",
          fond: "Tournoi officiel entre les équipes en manches de 2 × 5 minutes. Application complète du règlement (Loi 8 : Essai 5 pts, Cible Centrale / 4 passes 7 pts ; décompte des 6 Tags ; ligne de hors-jeu à 5m ; règle de l'avantage). Feuille de match IGT tenue par l'équipe observatrice.",
          critComp: "Respecter les décisions de l'élève-arbitre, communiquer positivement et appliquer le plan de jeu choisi.",
          critReuss: "Valider l'arbitrage d'un match complet et présenter une feuille statistique IGT exacte.",
          retour: "Ajustements finaux avant l'évaluation sommative de la séance 10."
        }},
        {{
          num: 10,
          short: "Évaluation Sommative Officielle Rugby Scolaire / Tag Rugby (/20 — OP 2009 / OP 2007)",
          obj: "Évaluer en situation de tournoi officiel 5c5 ou 7c7 l'efficacité individuelle (PB, NPB, Défenseur), le gagne-terrain collectif (IGT), les connaissances World Rugby et le fair-play (/20).",
          echauff: "Échauffement structuré autonome par équipe (passes en vagues, défense en rideau) (12 min).",
          fond: "Tournoi d'évaluation sommative. Chaque élève est évalué sur 2 matchs complets ainsi que sur son rôle d'arbitre / juge de hors-jeu / statisticien IGT. Notation sur 20 points conforme aux OP 2009 (Collège : 12+3+5) ou OP 2007 (Lycée : 14+3+3).",
          critComp: "S'engager pleinement dans le gain de terrain tout en garantissant 100% de sécurité pour ses partenaires et adversaires.",
          critReuss: "Valider l'Objectif Terminal du Cycle (OTC) de son niveau scolaire.",
          retour: "Annonce des résultats, remise des notes et bilan final du cycle de Rugby."
        }}
      ];

      let currentGrade = "1AC";
      let currentLevel = 1;
      let currentSessionIdx = 0;

      function buildSidebarList() {{
        const listEl = document.getElementById("rugbySessionList");
        if (!listEl) return;
        listEl.innerHTML = SESSIONS.map((s, idx) => `
          <button type="button" class="session-item-btn ${{idx === currentSessionIdx ? 'active' : ''}}" onclick="selectRugbySession(${{idx}})">
            <span class="session-num">Séance ${{s.num}} / 10</span>
            <span class="session-title-short">${{s.short}}</span>
          </button>
        `).join("");
      }}

      function buildSingleSessionHTML(s, gMeta, lvl, prof, etab, mode, duree) {{
        return `
          <table class="a4-header-table">
            <tr>
              <th colspan="4" style="text-align:center;font-size:0.92rem;">ROYAUME DU MAROC · MINISTÈRE DE L'ÉDUCATION NATIONALE, DU PRÉSCOLAIRE ET DES SPORTS<br>FICHE DE PRÉPARATION DE SÉANCE D'ÉDUCATION PHYSIQUE ET SPORTIVE — RUGBY SCOLAIRE &amp; TAG RUGBY</th>
            </tr>
            <tr>
              <td><strong>APS :</strong> Rugby Scolaire / Tag Rugby</td>
              <td><strong>Niveau Scolaire :</strong> ${{gMeta.label}}</td>
              <td><strong>Enseignant(e) :</strong> ${{prof}}</td>
              <td><strong>Séance :</strong> N° ${{s.num}} / 10</td>
            </tr>
            <tr>
              <td><strong>Référentiel :</strong> ${{gMeta.ref}}</td>
              <td><strong>Profil de Classe :</strong> ${{lvl.name}}</td>
              <td><strong>Établissement :</strong> ${{etab}}</td>
              <td><strong>Modalité :</strong> ${{mode}} · ${{duree}}</td>
            </tr>
            <tr>
              <td colspan="4"><strong>OTI (${{currentGrade}}) :</strong> ${{gMeta.oti}}</td>
            </tr>
            <tr>
              <td colspan="4"><strong>OTC (Rugby — ${{currentGrade}}) :</strong> ${{gMeta.otc}}</td>
            </tr>
            <tr>
              <td colspan="4" style="background:#f0fdf4;"><strong>Objectif de la Séance N°${{s.num}} (${{s.short}}) :</strong> ${{s.obj}}</td>
            </tr>
          </table>

          <table class="a4-body-table">
            <thead>
              <tr>
                <th style="width:14%;">Phase &amp; Durée</th>
                <th style="width:36%;">Contenu &amp; Situations d'Apprentissage (${{lvl.name}})</th>
                <th style="width:26%;">Critères de Réalisation (Comment faire ?)</th>
                <th style="width:24%;">Critères de Réussite &amp; Différenciation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span class="a4-phase-badge">1. Partie Introductive</span><br><strong>10 à 12 min</strong></td>
                <td><strong>Prise en main &amp; Échauffement Spécifique Rugby :</strong><br>${{s.echauff}}<br><em>Diagnostic du groupe :</em> ${{lvl.diag}}</td>
                <td>• Retirer bijoux/montres et fixer correctement les 2 rubans Tag à la taille.<br>• Mobiliser cou, épaules, tronc et appuis en manipulant le ballon ovale à 2 mains.</td>
                <td>• 100% des élèves engagés en sécurité.<br>• Passes en arrière fluides dès l'échauffement.</td>
              </tr>
              <tr>
                <td><span class="a4-phase-badge">2. Partie Fondamentale</span><br><strong>35 à 38 min</strong></td>
                <td><strong>Situation Fondamentale &amp; But de la Tâche :</strong><br>${{s.fond}}<br><br><strong>Transformation visée (${{lvl.name}}) :</strong> ${{lvl.trans}}</td>
                <td>• ${{s.critComp}}<br>• Assurer les rôles d'arbitre central (en-avant, décompte des 6 Tags), de juge de hors-jeu (5m) et de statisticien IGT.</td>
                <td><strong>Critère de réussite :</strong><br>• ${{s.critReuss}}<br><br><strong>Variable de différenciation :</strong><br>• ${{lvl.diff}}</td>
              </tr>
              <tr>
                <td><span class="a4-phase-badge">3. Partie Finale</span><br><strong>5 à 7 min</strong></td>
                <td><strong>Retour au calme, Bilan &amp; Rangement :</strong><br>${{s.retour}}</td>
                <td>• Récupération respiratoire et bilan tactique par équipe.<br>• Remise en état des ceintures Tag, chasubles et ballons.</td>
                <td>• Validation de la feuille d'observation IGT.<br>• Transition vers la séance suivante.</td>
              </tr>
            </tbody>
          </table>
        `;
      }}

      window.renderRugbySheet = function() {{
        const gMeta = GRADE_META[currentGrade];
        const lvl = LEVEL_PROFILES[currentLevel];
        const s = SESSIONS[currentSessionIdx];
        const prof = document.getElementById("rugbyProfInput").value || "Prof. EPS";
        const etab = document.getElementById("rugbyEtabInput").value || "Établissement Maroc";
        const mode = document.getElementById("rugbyModeSelect").value || "Tag / Touch Rugby";
        const duree = document.getElementById("rugbyDureeInput").value || "36 élèves · 55 min";

        document.getElementById("rugbyCurrentBadge").textContent =
          `Aperçu Pro A4 — Rugby / Tag · ${{currentGrade}} · Niveau ${{currentLevel}} · Séance ${{s.num}}/10 : ${{s.short}}`;

        document.getElementById("rugbyA4Container").innerHTML =
          buildSingleSessionHTML(s, gMeta, lvl, prof, etab, mode, duree);
      }};

      window.selectRugbyGrade = function(grade) {{
        currentGrade = grade;
        document.querySelectorAll(".grade-tab").forEach(btn => {{
          btn.classList.toggle("active", btn.getAttribute("data-grade") === grade);
        }});
        renderRugbySheet();
      }};

      window.selectRugbyLevel = function(level) {{
        currentLevel = level;
        document.querySelectorAll(".practice-btn").forEach(btn => {{
          btn.classList.toggle("active", parseInt(btn.getAttribute("data-level"), 10) === level);
        }});
        renderRugbySheet();
      }};

      window.selectRugbySession = function(idx) {{
        currentSessionIdx = idx;
        buildSidebarList();
        renderRugbySheet();
      }};

      function wrapWordDocument(htmlBody, title) {{
        return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
        <head><meta charset="utf-8"><title>${{title}}</title>
        <style>
          body {{ font-family: Arial, sans-serif; font-size: 10.5pt; color: #0f172a; }}
          table {{ width: 100%; border-collapse: collapse; margin-bottom: 14px; }}
          th, td {{ border: 1px solid #334155; padding: 6px 8px; vertical-align: top; text-align: left; font-size: 10pt; }}
          th {{ background: #f1f5f9; font-weight: bold; }}
          h1, h2, h3 {{ color: #0f172a; }}
          .page-break {{ page-break-after: always; }}
        </style>
        </head><body>${{htmlBody}}</body></html>`;
      }}

      function triggerDocDownload(content, filename) {{
        const blob = new Blob(['\\ufeff', content], {{ type: 'application/msword;charset=utf-8' }});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }}

      window.exportRugbyCurrentWord = function() {{
        const s = SESSIONS[currentSessionIdx];
        const html = document.getElementById("rugbyA4Container").innerHTML;
        const filename = `Fiche_Rugby_Tag_${{currentGrade}}_Niveau${{currentLevel}}_Seance${{s.num}}.doc`;
        triggerDocDownload(wrapWordDocument(html, filename), filename);
      }};

      window.exportRugbyCurrentPDF = function() {{
        const s = SESSIONS[currentSessionIdx];
        const html = document.getElementById("rugbyA4Container").innerHTML;
        printHTMLWindow(html, `Fiche Rugby Scolaire & Tag ${{currentGrade}} - Niveau ${{currentLevel}} - Séance ${{s.num}}`);
      }};

      function buildFullCycleHTML() {{
        const gMeta = GRADE_META[currentGrade];
        const lvl = LEVEL_PROFILES[currentLevel];
        const prof = document.getElementById("rugbyProfInput").value || "Prof. EPS";
        const etab = document.getElementById("rugbyEtabInput").value || "Établissement Maroc";
        const mode = document.getElementById("rugbyModeSelect").value || "Tag / Touch Rugby";
        const duree = document.getElementById("rugbyDureeInput").value || "36 élèves · 55 min";

        const cycleOverviewRows = SESSIONS.map(s => `
          <tr>
            <td><strong>Séance ${{s.num}}</strong></td>
            <td><strong>${{s.short}}</strong></td>
            <td>${{s.obj}}</td>
            <td>${{s.critReuss}}</td>
          </tr>
        `).join("");

        const overviewTable = `
          <h2 style="margin:0 0 8px;">PROJET PRÉVISIONNEL DU CYCLE DE RUGBY SCOLAIRE &amp; TAG RUGBY (10 SÉANCES) — ${{gMeta.label}} (${{lvl.name}})</h2>
          <p style="margin:0 0 6px;"><strong>Référentiel :</strong> ${{gMeta.ref}} | <strong>Barème :</strong> ${{gMeta.bareme}}</p>
          <p style="margin:0 0 6px;"><strong>OTI :</strong> ${{gMeta.oti}}</p>
          <p style="margin:0 0 12px;"><strong>OTC :</strong> ${{gMeta.otc}}</p>
          <table class="a4-body-table">
            <thead>
              <tr><th>Séance</th><th>Thème Didactique</th><th>Objectif de Séance</th><th>Critère de Réussite</th></tr>
            </thead>
            <tbody>${{cycleOverviewRows}}</tbody>
          </table>
          <div class="page-break"></div>
        `;

        const allSheets = SESSIONS.map((s, idx) =>
          buildSingleSessionHTML(s, gMeta, lvl, prof, etab, mode, duree) +
          (idx < SESSIONS.length - 1 ? '<div class="page-break"></div>' : '')
        ).join("");

        return overviewTable + allSheets;
      }}

      window.exportRugbyFullCycleWord = function() {{
        const html = buildFullCycleHTML();
        const filename = `Cycle_Complet_10_Seances_Rugby_Tag_${{currentGrade}}_Niveau${{currentLevel}}.doc`;
        triggerDocDownload(wrapWordDocument(html, filename), filename);
      }};

      window.exportRugbyFullCyclePDF = function() {{
        const html = buildFullCycleHTML();
        printHTMLWindow(html, `Cycle Complet 10 Séances Rugby Scolaire & Tag — ${{currentGrade}} (Niveau ${{currentLevel}})`);
      }};

      window.exportElementToWord = function(elId, filename) {{
        const el = document.getElementById(elId);
        if (!el) return;
        triggerDocDownload(wrapWordDocument(el.innerHTML, filename), filename);
      }};

      window.printElementAsPDF = function(elId, title) {{
        const el = document.getElementById(elId);
        if (!el) return;
        printHTMLWindow(el.innerHTML, title);
      }};

      function printHTMLWindow(htmlContent, title) {{
        const w = window.open('', '_blank', 'width=1050,height=800');
        if (!w) return;
        w.document.open();
        w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${{title}}</title>
          <style>
            body {{ font-family: Arial, sans-serif; color: #0f172a; margin: 15mm; font-size: 11px; }}
            table {{ width: 100%; border-collapse: collapse; margin-bottom: 12px; }}
            th, td {{ border: 1px solid #334155; padding: 6px 8px; text-align: left; vertical-align: top; }}
            th {{ background: #f1f5f9; font-weight: bold; }}
            .page-break {{ page-break-after: always; }}
            @media print {{ @page {{ size: A4 portrait; margin: 10mm; }} }}
          </style>
        </head><body>
          <h2 style="margin-top:0;border-bottom:2px solid #15803d;padding-bottom:6px;">${{title}}</h2>
          ${{htmlContent}}
          <script>window.onload = function(){{ setTimeout(function(){{ window.print(); }}, 250); }};<\/script>
        </body></html>`);
        w.document.close();
      }}

      window.switchRugbyGridTab = function(panelId, btnEl) {{
        document.querySelectorAll(".sub-tab-panel").forEach(p => p.classList.remove("active"));
        document.querySelectorAll(".sub-tab-btn").forEach(b => b.classList.remove("active"));
        const target = document.getElementById(panelId);
        if (target) target.classList.add("active");
        if (btnEl) btnEl.classList.add("active");
      }};

      // ================================================================
      // OUTIL 1 : CALCULATEUR D'INDICE DE GAGNE-TERRAIN (IGT) & NOTE (/20)
      // ================================================================
      window.computeRugbyCalculator = function() {{
        const grade = document.getElementById("calcRgGrade").value;
        const poss = Math.max(1, parseInt(document.getElementById("calcRgPoss").value, 10) || 10);
        const gainLine = Math.max(0, parseInt(document.getElementById("calcRgGainLine").value, 10) || 0);
        const tries = Math.max(0, parseInt(document.getElementById("calcRgTries").value, 10) || 0);
        const passOk = Math.max(0, parseInt(document.getElementById("calcRgPassOk").value, 10) || 0);
        const tagsDef = Math.max(0, parseInt(document.getElementById("calcRgTagsDef").value, 10) || 0);

        const isCollege = (grade === "1AC" || grade === "2AC" || grade === "3AC");
        const maxMoteur = isCollege ? 12 : 14;
        const maxIndiv = isCollege ? 7 : 8;
        const maxColl = isCollege ? 5 : 6;

        const igtPct = Math.min(100, Math.round(((gainLine + tries) / poss) * 100));
        const tryConversionPct = Math.min(100, Math.round((tries / poss) * 100));

        // Note collective (sur 5 au Collège / sur 6 au Lycée)
        const collFactor = Math.min(1.0, Math.max(0.35, igtPct / 80));
        const noteColl = Math.round(maxColl * collFactor * 2) / 2;

        // Note individuelle (Passes en arrière + Défense Tags/Plaquages)
        const indivFactor = Math.min(1.0, Math.max(0.35, ((passOk / 8) * 0.6 + (tagsDef / 5) * 0.4)));
        const noteIndiv = Math.round(maxIndiv * indivFactor * 2) / 2;

        const totalMoteur = Math.min(maxMoteur, noteColl + noteIndiv);
        const equiv20 = Math.min(20, Math.round((totalMoteur / maxMoteur) * 20 * 2) / 2);

        let profileDiag = "";
        if (igtPct >= 70) {{
          profileDiag = "🟢 Niveau 4 (Expert) : Gagne-terrain très élevé, continuité fluide et exploitation des intervalles.";
        }} else if (igtPct >= 50) {{
          profileDiag = "🔵 Niveau 3 (Confirmé) : Bonne avancée collective ; travaillez encore le relais axial rapide après le Tag.";
        }} else if (igtPct >= 35) {{
          profileDiag = "🟠 Niveau 2 (Initié) : Avancée irrégulière ; fixez mieux le défenseur avant de passer en arrière.";
        }} else {{
          profileDiag = "🔴 Niveau 1 (Débutant) : Trop de courses en reculant ou d'en-avants ; utilisez les zones cliquets de 5m.";
        }}

        document.getElementById("calcRugbyOutput").innerHTML = `
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0.65rem;margin-bottom:0.75rem;">
            <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:9px;padding:0.65rem;">
              <div style="font-size:0.72rem;font-weight:800;color:#64748b;text-transform:uppercase;">Indice Gagne-Terrain (IGT)</div>
              <div style="font-size:1.25rem;font-weight:900;color:#15803d;">${{igtPct}} %</div>
              <div style="font-size:0.75rem;color:#334155;">${{gainLine}} franch. + ${{tries}} essais / ${{poss}} poss.</div>
            </div>
            <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:9px;padding:0.65rem;">
              <div style="font-size:0.72rem;font-weight:800;color:#64748b;text-transform:uppercase;">Efficacité Offensive</div>
              <div style="font-size:1.25rem;font-weight:900;color:#1d4ed8;">${{tryConversionPct}} % d'essais</div>
              <div style="font-size:0.75rem;color:#334155;">${{passOk}} passes AR · ${{tagsDef}} tags/plaq.</div>
            </div>
            <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:9px;padding:0.65rem;">
              <div style="font-size:0.72rem;font-weight:800;color:#166534;text-transform:uppercase;">Note Motrice (${{grade}})</div>
              <div style="font-size:1.25rem;font-weight:900;color:#15803d;">${{totalMoteur.toFixed(1)}} / ${{maxMoteur}}</div>
              <div style="font-size:0.75rem;color:#166534;font-weight:700;">Indiv ${{noteIndiv}} + Coll ${{noteColl}} (≈ ${{equiv20}}/20)</div>
            </div>
          </div>
          <div style="font-size:0.8rem;color:#334155;background:#ffffff;border-left:4px solid #15803d;padding:0.5rem 0.75rem;border-radius:6px;">
            <strong>Diagnostic Collectif :</strong> ${{profileDiag}}
          </div>
        `;
      }};

      // ================================================================
      // OUTIL 2 : TABLEAU DE MARQUE WORLD RUGBY & COMPTEUR DES 6 TAGS
      // ================================================================
      let rgScoreA = 0;
      let rgScoreB = 0;
      let rgTagCount = 0;

      window.addRugbyScore = function(team, pts, label) {{
        if (team === "A") rgScoreA += pts;
        else rgScoreB += pts;
        document.getElementById("rgScoreA").textContent = rgScoreA;
        document.getElementById("rgScoreB").textContent = rgScoreB;
        rgTagCount = 0;
        document.getElementById("rgTagCounterDisplay").textContent = "🏷️ Compteur de Possession : TAG 0 / 6 (Remise en jeu au centre)";
        document.getElementById("rgLastEventText").textContent =
          `🏆 Action validée : +${{pts}} pts pour l'Équipe ${{team}} (${{label}}) ! Le compteur de Tags est remis à 0/6.`;
      }};

      window.incrementTagCount = function() {{
        rgTagCount++;
        const disp = document.getElementById("rgTagCounterDisplay");
        const ev = document.getElementById("rgLastEventText");
        if (rgTagCount >= 6) {{
          disp.textContent = "🛑 6ème TAG ATTEINT (6 / 6) — CHANGEMENT DE POSSESSION !";
          disp.style.color = "#f87171";
          ev.textContent = "📢 Coup de sifflet de l'Arbitre : « 6ème Tag ! Ballon au sol, possession rendue à l'équipe adverse ! »";
          rgTagCount = 0;
        }} else {{
          disp.textContent = `🏷️ Compteur de Possession : TAG ${{rgTagCount}} / 6 (${{6 - rgTagCount}} restants)`;
          disp.style.color = rgTagCount === 5 ? "#fde047" : "#4ade80";
          ev.textContent = `📢 Arbitre : « TAG ${{rgTagCount}} ! » Le porteur a 3 secondes pour passer en arrière ; la défense recule à 5 mètres.`;
        }}
      }};

      window.resetTagCount = function(reason) {{
        rgTagCount = 0;
        const disp = document.getElementById("rgTagCounterDisplay");
        disp.textContent = "🏷️ Compteur de Possession : TAG 0 / 6 (Jouez !)";
        disp.style.color = "#4ade80";
        document.getElementById("rgLastEventText").textContent = `🔄 ${{reason || 'Nouvelle possession'}} — Compteur remis à 0/6.`;
      }};

      window.resetRugbyMatch = function() {{
        rgScoreA = 0;
        rgScoreB = 0;
        document.getElementById("rgScoreA").textContent = "0";
        document.getElementById("rgScoreB").textContent = "0";
        resetTagCount("Score remis à 0 - 0");
      }};

      // Initialisation au chargement
      buildSidebarList();
      renderRugbySheet();
      computeRugbyCalculator();
    }})();
    </script>

{footer_html}
</body>
</html>
"""


def update_hub_aps():
    hub_path = os.path.join(PUBLIC, "hub-aps-sports-eps-maroc.html")
    html = read_file(hub_path)

    # 1. Replace card #5 (RUGBY SCOLAIRE) with the active Silo card
    old_card_start = "<!-- 5. RUGBY SCOLAIRE -->"
    old_card_end = "</article>"
    start_idx = html.find(old_card_start)
    if start_idx != -1:
        end_idx = html.find(old_card_end, start_idx) + len(old_card_end)
        new_card = """<!-- 5. RUGBY SCOLAIRE, TAG RUGBY & TOUCH RUGBY -->
            <article class="aps-card" data-aps-family="collectifs" style="border-color:#15803d;border-width:2px;">
                <div>
                    <div class="aps-card-kicker" style="color:#15803d;">Sports Collectifs · Combat &amp; Tag Rugby · Studio Complet Actif</div>
                    <h3 class="aps-card-title">🏉 Rugby Scolaire, Tag &amp; Touch Rugby (الريكبي المدرسي)</h3>
                    <p class="aps-card-desc">Silo complet Rugby Scolaire, Tag Rugby (Flag) &amp; Touch Rugby : Calculateur d'Indice de Gagne-Terrain (IGT) &amp; compteur 6 Tags / World Rugby, ATD officiel, 24 cycles et 240 fiches (1AC à 2Bac × 4 niveaux) et grilles (/20).</p>
                    <ul class="aps-links-list">
                        <li><a href="aps-rugby-scolaire-tag-eps-maroc.html#volet-studio"><span>⚡ Studio Cycles &amp; Fiches (1AC → 2Bac · PDF/Word)</span> <span>→</span></a></li>
                        <li><a href="aps-rugby-scolaire-tag-eps-maroc.html#volet-calculateur-rugby"><span>🧮 Calculateur Gagne-Terrain (IGT) &amp; Arbitre 6 Tags</span> <span>→</span></a></li>
                        <li><a href="aps-rugby-scolaire-tag-eps-maroc.html#volet-grilles"><span>📊 Feuille Match IGT &amp; 4 Grilles (/20)</span> <span>→</span></a></li>
                        <li><a href="aps-rugby-scolaire-tag-eps-maroc.html#volet-atd"><span>📐 ATD Rugby Scolaire &amp; Tag/Touch</span> <span>→</span></a></li>
                    </ul>
                </div>
                <div class="aps-card-footer">
                    <a href="aps-rugby-scolaire-tag-eps-maroc.html" class="aps-btn-main" style="background:#15803d;">Ouvrir la Page Spéciale Rugby &amp; Tag →</a>
                </div>
            </article>"""
        html = html[:start_idx] + new_card + html[end_idx:]

    # 2. Add button in top banner
    target_btn = '<a href="aps-course-haies-eps-maroc.html" style="display:inline-flex;align-items:center;gap:0.4rem;padding:0.55rem 1rem;border-radius:8px;background:#c2410c;color:#ffffff;font-weight:800;font-size:0.84rem;text-decoration:none;">🚧 Course de Haies (Silo Complet) →</a>'
    if "aps-rugby-scolaire-tag-eps-maroc.html" not in html[:html.find("<!-- 5.") if "<!-- 5." in html else 5000]:
        new_btn = target_btn + '\n                    <a href="aps-rugby-scolaire-tag-eps-maroc.html" style="display:inline-flex;align-items:center;gap:0.4rem;padding:0.55rem 1rem;border-radius:8px;background:#15803d;color:#ffffff;font-weight:800;font-size:0.84rem;text-decoration:none;">🏉 Rugby Scolaire &amp; Tag (Silo Complet) →</a>'
        html = html.replace(target_btn, new_btn, 1)

    write_file(hub_path, html)
    print("[HUB APS OK] Updated /public/hub-aps-sports-eps-maroc.html with Rugby Scolaire & Tag Complete Silo.")


def update_sibling_silos():
    silos = [
        "aps-handball-eps-maroc.html",
        "aps-basketball-eps-maroc.html",
        "aps-volleyball-eps-maroc.html",
        "aps-football-eps-maroc.html",
        "aps-gymnastique-sol-eps-maroc.html",
        "aps-course-vitesse-relais-eps-maroc.html",
        "aps-course-duree-demi-fond-eps-maroc.html",
        "aps-lancer-poids-eps-maroc.html",
        "aps-saut-longueur-triple-saut-eps-maroc.html",
        "aps-saut-hauteur-fosbury-eps-maroc.html",
        "aps-badminton-tennis-table-eps-maroc.html",
        "aps-course-haies-eps-maroc.html",
    ]
    link_html = '<a href="aps-rugby-scolaire-tag-eps-maroc.html" style="padding:0.25rem 0.65rem;border-radius:99px;background:#ffffff;color:#0f172a;border:1px solid #cbd5e1;text-decoration:none;">🏉 Rugby &amp; Tag</a>'
    for fname in silos:
        p = os.path.join(PUBLIC, fname)
        if not os.path.exists(p):
            continue
        content = read_file(p)
        if "aps-rugby-scolaire-tag-eps-maroc.html" not in content:
            hub_link = '<a href="hub-aps-sports-eps-maroc.html" style="margin-left:auto;'
            if hub_link in content:
                content = content.replace(hub_link, link_html + "\n            " + hub_link, 1)
                write_file(p, content)


def update_blog_index_sitemap():
    # 1. Update blog.html
    blog_path = os.path.join(PUBLIC, "blog.html")
    blog_html = read_file(blog_path)
    if "aps-rugby-scolaire-tag-eps-maroc.html" not in blog_html:
        card_html = """
                <!-- SILO COMPLET RUGBY SCOLAIRE & TAG RUGBY -->
                <article class="article-card" data-category="aps">
                    <div class="article-card-header" style="background: linear-gradient(135deg, #15803d, #166534);">
                        <span class="article-category-badge">🏉 Silo APS Complet · Sports Co</span>
                        <span class="article-reading-time">⚡ Studio 1AC→2Bac + Calculateur IGT</span>
                    </div>
                    <div class="article-card-body">
                        <h3 class="article-card-title"><a href="aps-rugby-scolaire-tag-eps-maroc.html">Rugby Scolaire, Tag Rugby &amp; Touch Rugby en EPS Maroc : Cycles 1AC–2Bac, Fiches, Calculateur Gagne-Terrain (IGT), ATD, Grilles (/20) &amp; World Rugby</a></h3>
                        <p class="article-card-excerpt">Studio interactif des 24 cycles et 240 fiches Rugby Scolaire, Tag Rugby et Touch Rugby (1AC à 2Bac × 4 niveaux), calculateur d'Indice de Gagne-Terrain (IGT) et compteur des 6 Tags / World Rugby, ATD complet et grilles (/20) Word/PDF.</p>
                        <div class="article-card-footer">
                            <span class="article-date">OP 2009 &amp; OP 2007</span>
                            <a href="aps-rugby-scolaire-tag-eps-maroc.html" class="article-read-more">Ouvrir le Studio Rugby &amp; Tag →</a>
                        </div>
                    </div>
                </article>"""
        marker = "<!-- SILO COMPLET COURSE DE HAIES -->"
        if marker in blog_html:
            blog_html = blog_html.replace(marker, card_html + "\n                " + marker, 1)
        blog_html = re.sub(
            r'(<button class="category-tab active" data-category="all">Tous les articles <span class="count">)(\d+)(</span></button>)',
            lambda m: m.group(1) + str(int(m.group(2)) + 1) + m.group(3),
            blog_html,
            count=1,
        )
        blog_html = re.sub(
            r'(<button class="category-tab" data-category="aps">APS &amp; Didactique <span class="count">)(\d+)(</span></button>)',
            lambda m: m.group(1) + str(int(m.group(2)) + 1) + m.group(3),
            blog_html,
            count=1,
        )
        write_file(blog_path, blog_html)
        print("[BLOG OK] Added Silo Rugby Scolaire & Tag card to /public/blog.html.")

    # 2. Update index.html & /index.html
    idx_path = os.path.join(PUBLIC, "index.html")
    idx_html = read_file(idx_path)
    if "aps-rugby-scolaire-tag-eps-maroc.html" not in idx_html:
        target = '<a href="aps-course-haies-eps-maroc.html"'
        idx_pos = idx_html.find(target)
        if idx_pos != -1:
            end_a = idx_html.find("</a>", idx_pos) + 4
            snippet = idx_html[idx_pos:end_a]
            new_snippet = (
                snippet
                + '\n          <a href="aps-rugby-scolaire-tag-eps-maroc.html" style="display:inline-flex;align-items:center;gap:0.4rem;padding:0.55rem 0.95rem;border-radius:99px;background:#f0fdf4;border:1px solid #86efac;color:#166534;font-size:0.82rem;font-weight:800;text-decoration:none;">🏉 Silo Rugby Scolaire &amp; Tag (Cycles 1AC-2Bac + Calculateur IGT) →</a>'
            )
            idx_html = idx_html[:idx_pos] + new_snippet + idx_html[end_a:]
            write_file(idx_path, idx_html)
            write_file(os.path.join(ROOT, "index.html"), idx_html)
            print("[INDEX OK] Updated /public/index.html and mirrored to /index.html.")

    # 3. Update sitemap.xml
    sm_path = os.path.join(PUBLIC, "sitemap.xml")
    sm_xml = read_file(sm_path)
    if "aps-rugby-scolaire-tag-eps-maroc.html" not in sm_xml:
        entry = """  <url>
    <loc>https://profeps.ma/aps-rugby-scolaire-tag-eps-maroc.html</loc>
    <lastmod>2026-11-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>
</urlset>"""
        sm_xml = sm_xml.replace("</urlset>", entry)
        write_file(sm_path, sm_xml)
        print("[SITEMAP OK] Added aps-rugby-scolaire-tag-eps-maroc.html to /public/sitemap.xml.")


def main():
    navbar_html, footer_html, head_styles = extract_chrome()
    silo_html = build_silo_rugby(navbar_html, footer_html, head_styles)
    out_path = os.path.join(PUBLIC, "aps-rugby-scolaire-tag-eps-maroc.html")
    write_file(out_path, silo_html)
    print(f"[SILO RUGBY SCOLAIRE & TAG OK] Created {out_path}")

    update_hub_aps()
    update_sibling_silos()
    update_blog_index_sitemap()
    print("=== SILO COMPLET RUGBY SCOLAIRE & TAG RUGBY GENERATED SUCCESSFULLY ===")


if __name__ == "__main__":
    main()
