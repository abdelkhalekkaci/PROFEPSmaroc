#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generates:
1. /public/aps-badminton-tennis-table-eps-maroc.html (Complete Silo APS #11: Sports de Raquette — Badminton BWF & Tennis de Table ITTF — 1AC -> 2Bac, 4 Niveaux de pratique × 2 Sports, Visionneuse A4 + Export Word/PDF, Calculateur Tactique Zones Bonus + Arbitre Interactif BWF Pair/Impair & ITTF Rotation 2 pts + Générateur Montante-Descendante, ATD Complet Badminton & Ping-Pong, 4 Grilles d'Évaluation, Gestion 40+ élèves & Règlements BWF / ITTF).
2. Updates /public/hub-aps-sports-eps-maroc.html to link the new Badminton & Tennis de Table Silo.
3. Updates existing APS Silos to include Badminton & Tennis de Table in their quick-navigation bar.
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
    ref_path = os.path.join(PUBLIC, "aps-saut-hauteur-fosbury-eps-maroc.html")
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


def build_silo_badminton_tt(navbar_html, footer_html, head_styles):
    return f"""<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Badminton &amp; Tennis de Table en EPS Maroc : Cycles 1AC-2Bac, Fiches, Arbitrage BWF/ITTF, Tournoi Montante-Descendante, ATD &amp; Grilles (/20) | ProfEPS</title>
    <meta name="description" content="Dossier et Studio complet Badminton (BWF) et Tennis de Table (ITTF) en EPS au Maroc (OP 2007 &amp; 2009) : générateur de cycles et 10 séances par niveau (1AC à 2Bac × 4 niveaux), calculateur de score bonifié, arbitre interactif BWF (pair/impair) &amp; ITTF (11 pts), tournoi montante-descendante, ATD et grilles (/20) Word/PDF.">
    <meta name="keywords" content="badminton EPS Maroc, tennis de table EPS Maroc, ping pong EPS, fiche séance badminton 1AC 2AC 3AC TC 1Bac 2Bac, montante descendante EPS, règlement BWF service 1m15 pair impair, règlement ITTF 11 points service 16cm, ATD badminton tennis de table CRMEF, évaluation sports de raquette OP 2009 OP 2007">
    <meta name="author" content="Abdelkhalek ELBOUDANI — ProfEPS Maroc">
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
    <link rel="canonical" href="https://profeps.ma/aps-badminton-tennis-table-eps-maroc.html">
    <link rel="alternate" hreflang="fr-MA" href="https://profeps.ma/aps-badminton-tennis-table-eps-maroc.html">
    <link rel="alternate" hreflang="x-default" href="https://profeps.ma/aps-badminton-tennis-table-eps-maroc.html">
    <link rel="icon" type="image/png" href="/images/prof_eps.png">

    <meta property="og:type" content="article">
    <meta property="og:site_name" content="ProfEPS Maroc">
    <meta property="og:title" content="Badminton &amp; Tennis de Table en EPS Maroc : Studio Cycles 1AC-2Bac, Calculateur Tournoi &amp; Arbitre BWF/ITTF, ATD &amp; Grilles (/20)">
    <meta property="og:description" content="Le portail de référence du Badminton et du Tennis de Table scolaires au Maroc : 48 cycles et 480 fiches (1AC à 2Bac × 4 niveaux), calculateur tactique, arbitre BWF/ITTF, tournoi montante-descendante, ATD et grilles d'évaluation (/20).">
    <meta property="og:url" content="https://profeps.ma/aps-badminton-tennis-table-eps-maroc.html">
    <meta property="og:image" content="https://profeps.ma/images/prof_eps.png">
    <meta property="og:locale" content="fr_MA">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Badminton &amp; Tennis de Table EPS Maroc : Studio Cycles 1AC-2Bac, Arbitre BWF/ITTF, ATD &amp; Grilles (/20)">
    <meta name="twitter:description" content="Studio interactif des cycles Badminton &amp; Tennis de Table (1AC-2Bac), calculateur tactique &amp; arbitre BWF/ITTF, tournoi montante-descendante, ATD et grilles OP 2009/2007.">
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
      "headline": "Badminton & Tennis de Table en EPS au Maroc : Studio des Cycles (1AC à 2Bac), Calculateur Tactique, Arbitre BWF/ITTF, Tournoi Montante-Descendante, ATD et Grilles d'Évaluation (/20)",
      "description": "Portail pédagogique complet du Badminton (BWF) et du Tennis de Table (ITTF) en EPS au Maroc conforme aux OP 2009 (Collège) et OP 2007 (Lycée).",
      "url": "https://profeps.ma/aps-badminton-tennis-table-eps-maroc.html",
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
        --aps-primary: #0f766e;
        --aps-primary-dark: #115e59;
        --aps-accent: #0d9488;
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
        background: linear-gradient(135deg, #f0fdfa 0%, #ffffff 50%, #eff6ff 100%);
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
        background: #ccfbf1;
        border: 1px solid #5eead4;
        color: #115e59;
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
        background: #f0fdfa;
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
      .studio-sport-bar {{
        background: #042f2e;
        padding: 0.85rem 1.25rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
        border-bottom: 1px solid #115e59;
      }}
      .studio-sport-label {{
        color: #99f6e4;
        font-size: 0.8rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }}
      .studio-sport-buttons {{
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }}
      .sport-switch-btn {{
        padding: 0.55rem 1.15rem;
        border-radius: 8px;
        border: 2px solid rgba(255, 255, 255, 0.25);
        background: rgba(255, 255, 255, 0.08);
        color: #e2e8f0;
        font-size: 0.88rem;
        font-weight: 800;
        cursor: pointer;
        transition: all 0.18s ease;
      }}
      .sport-switch-btn:hover {{
        background: rgba(255, 255, 255, 0.18);
        color: #ffffff;
      }}
      .sport-switch-btn.active {{
        background: #14b8a6;
        border-color: #5eead4;
        color: #042f2e;
        box-shadow: 0 4px 12px rgba(20, 184, 166, 0.35);
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
        background: #0f766e;
        border-color: #2dd4bf;
        color: #ffffff;
        box-shadow: 0 4px 12px rgba(15, 118, 110, 0.4);
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

      /* Meta customizable inputs */
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
        background: #f0fdfa;
      }}
      .session-item-btn.active {{
        background: #f0fdfa;
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
        background: #ccfbf1;
        color: #115e59;
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
                <span>Sports de Raquette : Badminton (BWF) &amp; Tennis de Table (ITTF)</span>
            </nav>

            <div class="silo-hero-grid">
                <div>
                    <div class="silo-kicker">🏸🏓 Silo Complet #11 · Sports de Raquette &amp; Duel Médié · OP 2009 &amp; OP 2007</div>
                    <h1 class="silo-title"><span>Badminton &amp; Tennis de Table</span> en EPS au Maroc : Cycles (1AC → 2Bac), Fiches de Séances, Tournoi Montante-Descendante, Arbitrage BWF/ITTF, ATD &amp; Grilles (/20)</h1>
                    <div class="silo-intro-box">
                        <p><strong>Introduction &amp; Logique Interne des Sports de Raquette :</strong> Le <strong>Badminton</strong> (<em>الريشة الطائرة</em>) et le <strong>Tennis de Table</strong> (<em>كرة الطاولة / Ping-Pong</em>) sont des activités physiques et sportives (APS) de <strong>duel médié par une raquette</strong> dans un espace séparé par un filet. Le problème fondamental consiste à <strong>assurer simultanément la continuité de l'échange (défendre sa cible) et la rupture de l'échange (attaquer la cible adverse)</strong> en exploitant les trajectoires (hautes/basses, longues/courtes), la vitesse et les effets pour mettre l'adversaire en crise de temps et d'espace.</p>
                        <p><strong>Double Studio Complet (Badminton + Tennis de Table) :</strong> Ce portail réunit en un seul silo les <strong>deux sports de raquette programmés dans les lycées et collèges marocains</strong> : basculez en un clic entre le <strong>Mode Badminton (BWF 21 pts)</strong> et le <strong>Mode Tennis de Table (ITTF 11 pts)</strong> pour générer vos cycles de 10 séances (1AC à 2Bac × 4 niveaux), calculer les scores bonifiés (zones à 3 pts), arbitrer les services réglementaires (carré Pair/Impair en Badminton ; rotation tous les 2 pts en Tennis de Table) et organiser une classe de <strong>40+ élèves en tournoi « Montante-Descendante »</strong>.</p>
                    </div>
                </div>

                <aside class="silo-specs-card" aria-label="Repères officiels Badminton BWF & Tennis de Table ITTF">
                    <h2>
                        <span>📐 Repères BWF (Badminton) &amp; ITTF (Ping-Pong)</span>
                        <a href="reglement-badminton-bwf-arbitrage-eps.html" style="font-size:0.78rem;color:#0f766e;text-decoration:underline;">Règlements →</a>
                    </h2>
                    <div class="specs-grid">
                        <div class="spec-item">
                            <div class="spec-label">Terrain Badminton (BWF)</div>
                            <div class="spec-val">13,40m × 5,18m (Simple)</div>
                            <div style="font-size:0.72rem;color:#64748b;">Largeur Double : 6,10m · Filet 1,55m (poteaux) / 1,524m (centre)</div>
                        </div>
                        <div class="spec-item">
                            <div class="spec-label">Service &amp; Score Badminton</div>
                            <div class="spec-val">2 × 21 pts · Hauteur ≤ 1,15m</div>
                            <div style="font-size:0.72rem;color:#64748b;">Score Pair (0,2,4) = Droite · Impair (1,3,5) = Gauche</div>
                        </div>
                        <div class="spec-item">
                            <div class="spec-label">Table Ping-Pong (ITTF)</div>
                            <div class="spec-val">2,74m × 1,525m · H=76cm</div>
                            <div style="font-size:0.72rem;color:#64748b;">Filet : 15,25 cm · Balle 40mm+ (2,7g)</div>
                        </div>
                        <div class="spec-item">
                            <div class="spec-label">Service &amp; Score Ping-Pong</div>
                            <div class="spec-val">11 pts · Rotation / 2 pts</div>
                            <div style="font-size:0.72rem;color:#64748b;">Paume ouverte derrière la table · Lancer vertical ≥ 16 cm</div>
                        </div>
                        <div class="spec-item">
                            <div class="spec-label">Gestion 40+ Élèves</div>
                            <div class="spec-val">Montante-Descendante</div>
                            <div style="font-size:0.72rem;color:#64748b;">Ronde Suisse / Roi du Terrain / Ronde Italienne par équipes</div>
                        </div>
                        <div class="spec-item">
                            <div class="spec-label">Évaluation OP Maroc</div>
                            <div class="spec-val">Collège 12+3+5 / Lycée 14+3+3</div>
                            <div style="font-size:0.72rem;color:#64748b;">Zones Bonus (1 pt normal / 3 pts zone cible) + Arbitrage</div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    </header>

    <!-- STICKY NAVIGATION ENTRE LES 6 VOLETS -->
    <div class="volet-nav-wrap">
        <nav class="volet-nav" aria-label="Navigation des volets Badminton & Tennis de Table">
            <a href="#volet-studio" class="volet-tab-btn active">⚡ 1. Studio Cycles &amp; Fiches (Badminton &amp; Ping-Pong)</a>
            <a href="#volet-calculateur-raquettes" class="volet-tab-btn">🧮 2. Calculateur Tactique, Arbitre BWF/ITTF &amp; Tournoi</a>
            <a href="#volet-atd" class="volet-tab-btn">📐 3. ATD Badminton &amp; Tennis de Table</a>
            <a href="#volet-grilles" class="volet-tab-btn">📊 4. Feuilles de Match &amp; 4 Grilles (/20)</a>
            <a href="#volet-terrain" class="volet-tab-btn">🏟️ 5. Montante-Descendante 40+ Élèves &amp; Règlements</a>
            <a href="#volet-articles" class="volet-tab-btn">📚 6. Bibliothèque Raquettes</a>
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
            <a href="aps-gymnastique-sol-eps-maroc.html" style="padding:0.25rem 0.65rem;border-radius:99px;background:#ffffff;color:#0f172a;border:1px solid #cbd5e1;text-decoration:none;">🤸 Gymnastique</a>
            <a href="aps-course-vitesse-relais-eps-maroc.html" style="padding:0.25rem 0.65rem;border-radius:99px;background:#ffffff;color:#0f172a;border:1px solid #cbd5e1;text-decoration:none;">🏃 Vitesse &amp; Relais</a>
            <a href="aps-course-duree-demi-fond-eps-maroc.html" style="padding:0.25rem 0.65rem;border-radius:99px;background:#ffffff;color:#0f172a;border:1px solid #cbd5e1;text-decoration:none;">⏱️ Course de Durée</a>
            <a href="aps-lancer-poids-eps-maroc.html" style="padding:0.25rem 0.65rem;border-radius:99px;background:#ffffff;color:#0f172a;border:1px solid #cbd5e1;text-decoration:none;">☄️ Lancer du Poids</a>
            <a href="aps-saut-longueur-triple-saut-eps-maroc.html" style="padding:0.25rem 0.65rem;border-radius:99px;background:#ffffff;color:#0f172a;border:1px solid #cbd5e1;text-decoration:none;">🦘 Longueur &amp; Triple Saut</a>
            <a href="aps-saut-hauteur-fosbury-eps-maroc.html" style="padding:0.25rem 0.65rem;border-radius:99px;background:#ffffff;color:#0f172a;border:1px solid #cbd5e1;text-decoration:none;">🆙 Saut en Hauteur</a>
            <a href="aps-badminton-tennis-table-eps-maroc.html" style="padding:0.25rem 0.65rem;border-radius:99px;background:#0f766e;color:#ffffff;text-decoration:none;">🏸🏓 Badminton &amp; Ping-Pong (Actif)</a>
            <a href="hub-aps-sports-eps-maroc.html" style="margin-left:auto;color:#0f766e;text-decoration:underline;">Voir toutes les APS →</a>
        </div>
    </div>

    <main class="silo-main">

        <!-- ================================================================
             VOLET 1 : STUDIO INTERACTIF DES CYCLES & FICHES (1AC -> 2BAC)
             ================================================================ -->
        <section id="volet-studio" class="silo-section">
            <div class="section-header-bar">
                <div>
                    <h2>⚡ Volet 1 : Studio Interactif des Cycles &amp; Fiches — Badminton &amp; Tennis de Table (1AC à 2Bac)</h2>
                    <p class="section-subtitle">Choisissez d'abord votre APS (<strong>🏸 Badminton BWF</strong> ou <strong>🏓 Tennis de Table ITTF</strong>), puis votre niveau scolaire (<strong>1AC à 2Bac</strong>) et l'un des <strong>4 niveaux de pratique</strong>. Prévisualisez la fiche A4 complète avant de la télécharger en <strong>Word (.doc)</strong> ou <strong>PDF A4</strong>.</p>
                </div>
            </div>

            <div class="studio-shell">
                <!-- 0. Choix de l'APS : Badminton ou Tennis de Table -->
                <div class="studio-sport-bar">
                    <span class="studio-sport-label">0. Discipline Spécialité du Cycle (APS) :</span>
                    <div class="studio-sport-buttons" role="tablist" aria-label="Sélection du sport de raquette">
                        <button type="button" class="sport-switch-btn active" data-sport="badminton" onclick="selectRaquetteSport('badminton')">🏸 BADMINTON (BWF · 21 pts · Dégagé / Amorti / Smash)</button>
                        <button type="button" class="sport-switch-btn" data-sport="pingpong" onclick="selectRaquetteSport('pingpong')">🏓 TENNIS DE TABLE (ITTF · 11 pts · Poussette / Topspin / Effets)</button>
                    </div>
                </div>

                <!-- 1. Onglets des 6 Niveaux Scolaires -->
                <div class="studio-top-bar">
                    <div style="font-size:0.82rem;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;color:#5eead4;">
                        1. Choisissez le Niveau Scolaire :
                    </div>
                    <div class="grade-tabs" role="tablist" aria-label="Niveaux scolaires EPS Maroc">
                        <button type="button" class="grade-tab active" data-grade="1AC" onclick="selectRaquetteGrade('1AC')">1AC · 1ère Collège</button>
                        <button type="button" class="grade-tab" data-grade="2AC" onclick="selectRaquetteGrade('2AC')">2AC · 2ème Collège</button>
                        <button type="button" class="grade-tab" data-grade="3AC" onclick="selectRaquetteGrade('3AC')">3AC · 3ème Collège</button>
                        <button type="button" class="grade-tab" data-grade="TC" onclick="selectRaquetteGrade('TC')">TC · Tronc Commun</button>
                        <button type="button" class="grade-tab" data-grade="1BAC" onclick="selectRaquetteGrade('1BAC')">1Bac · 1ère Bac</button>
                        <button type="button" class="grade-tab" data-grade="2BAC" onclick="selectRaquetteGrade('2BAC')">2Bac · Baccalauréat</button>
                    </div>
                </div>

                <!-- 2. Choix parmi les 4 Niveaux de Pratique -->
                <div class="practice-bar">
                    <span class="practice-label">2. Niveau de Pratique de la Classe (4 Niveaux) :</span>
                    <div class="practice-buttons" role="group" aria-label="Niveaux de pratique">
                        <button type="button" class="practice-btn active" data-level="1" onclick="selectRaquetteLevel(1)">Niveau 1 · Débutant (Renvoi explosif / Continuité)</button>
                        <button type="button" class="practice-btn" data-level="2" onclick="selectRaquetteLevel(2)">Niveau 2 · Initié (Échange orienté Avant/Arrière ou D/G)</button>
                        <button type="button" class="practice-btn" data-level="3" onclick="selectRaquetteLevel(3)">Niveau 3 · Confirmé (Rupture sur volant/balle favorable)</button>
                        <button type="button" class="practice-btn" data-level="4" onclick="selectRaquetteLevel(4)">Niveau 4 · Expert / AS (Stratégie d'attaque &amp; Variations)</button>
                    </div>
                </div>

                <!-- 3. Entête personnalisable -->
                <div class="studio-meta-inputs">
                    <div class="meta-field">
                        <label for="rqProfInput">Enseignant(e) EPS</label>
                        <input id="rqProfInput" type="text" value="Prof. EPS" oninput="renderRaquetteSheet()">
                    </div>
                    <div class="meta-field">
                        <label for="rqEtabInput">Établissement / AREF</label>
                        <input id="rqEtabInput" type="text" value="Lycée / Collège Maroc" oninput="renderRaquetteSheet()">
                    </div>
                    <div class="meta-field">
                        <label for="rqEffectifInput">Effectif &amp; Matériel</label>
                        <input id="rqEffectifInput" type="text" value="36 élèves · 5 terrains / 6 tables (Montante-Descendante)" oninput="renderRaquetteSheet()">
                    </div>
                    <div class="meta-field">
                        <label for="rqDureeInput">Durée de la Séance</label>
                        <select id="rqDureeInput" onchange="renderRaquetteSheet()">
                            <option value="55 min (1h effective)">55 min (1h effective)</option>
                            <option value="110 min (2h groupées)">110 min (2h groupées)</option>
                        </select>
                    </div>
                </div>

                <!-- 4. Espace de travail : Liste des 10 séances + Visionneuse A4 Pro -->
                <div class="studio-workspace">
                    <aside class="studio-sidebar">
                        <div class="sidebar-heading">3. Séances du Cycle (10 Séances)</div>
                        <div id="rqSessionList" style="display:flex;flex-direction:column;gap:0.45rem;"></div>
                    </aside>

                    <div class="studio-preview-pane">
                        <div class="studio-toolbar">
                            <div>
                                <strong id="rqCurrentBadge" style="font-size:0.92rem;color:#0f172a;">Aperçu Pro A4 — Badminton · 1AC · Niveau 1 · Séance 1/10</strong>
                                <div style="font-size:0.78rem;color:#64748b;">Vérifiez le contenu didactique ci-dessous avant d'exporter votre document officiel.</div>
                            </div>
                            <div class="toolbar-actions">
                                <button type="button" class="btn-export word" onclick="exportRaquetteCurrentWord()">📄 Fiche Active (.doc)</button>
                                <button type="button" class="btn-export pdf" onclick="exportRaquetteCurrentPDF()">🖨️ Fiche Active (PDF A4)</button>
                                <button type="button" class="btn-export cycle-word" onclick="exportRaquetteFullCycleWord()">📚 Cycle Complet 10 Séances (.doc)</button>
                                <button type="button" class="btn-export cycle-pdf" onclick="exportRaquetteFullCyclePDF()">🗂️ Cycle Complet (PDF)</button>
                            </div>
                        </div>

                        <div id="rqA4Container" class="a4-sheet">
                            <!-- Injecté dynamiquement par JS -->
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================================================================
             VOLET 2 : CALCULATEUR TACTIQUE, ARBITRE BWF/ITTF & TOURNOI
             ================================================================ -->
        <section id="volet-calculateur-raquettes" class="silo-section">
            <div class="section-header-bar">
                <div>
                    <h2>🧮 Volet 2 : Calculateur d'Efficacité Tactique (Zones Bonus), Arbitre Interactif BWF/ITTF &amp; Générateur Montante-Descendante</h2>
                    <p class="section-subtitle">Trois outils interactifs indispensables sur le terrain : <strong>1) Calculateur de Note &amp; Score Bonifié (1 pt / 3 pts)</strong>, <strong>2) Feuille d'Arbitrage Temps Réel (Carré Pair/Impair BWF &amp; Rotation 2 pts ITTF)</strong>, et <strong>3) Répartition automatique d'une classe en « Montante-Descendante »</strong>.</p>
                </div>
            </div>

            <div class="grid-2">
                <!-- OUTIL A : CALCULATEUR D'EFFICACITÉ TACTIQUE & NOTE (/20) -->
                <div class="content-card" style="border-top:4px solid #0f766e;">
                    <h3>🎯 1. Calculateur de Score Bonifié (Zones 1 pt / 3 pts) &amp; Note (/20)</h3>
                    <p style="font-size:0.86rem;color:#475569;margin-top:0;">En EPS, pour inciter l'élève à viser les <strong>espaces libres</strong> (zone avant/arrière en Badminton ; angles D/G ou balle placée en Tennis de Table), on bonifie les points marqués en zone cible (<strong>3 pts</strong> au lieu de 1 pt).</p>

                    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:0.75rem;margin-bottom:1rem;">
                        <div class="meta-field">
                            <label for="calcRqSport">Discipline (APS)</label>
                            <select id="calcRqSport" onchange="computeRaquetteCalculator()">
                                <option value="badminton">🏸 Badminton (BWF)</option>
                                <option value="pingpong">🏓 Tennis de Table (ITTF)</option>
                            </select>
                        </div>
                        <div class="meta-field">
                            <label for="calcRqGrade">Niveau Scolaire</label>
                            <select id="calcRqGrade" onchange="computeRaquetteCalculator()">
                                <option value="1AC">1AC (1ère Collège · OP 2009)</option>
                                <option value="2AC">2AC (2ème Collège · OP 2009)</option>
                                <option value="3AC">3AC (3ème Collège · OP 2009)</option>
                                <option value="TC">Tronc Commun (OP 2007)</option>
                                <option value="1BAC">1ère Bac (OP 2007)</option>
                                <option value="2BAC" selected>2ème Bac (OP 2007)</option>
                            </select>
                        </div>
                        <div class="meta-field">
                            <label for="calcRqNormPts">Points Normaux Gagnés (1 pt)</label>
                            <input id="calcRqNormPts" type="number" min="0" max="50" step="1" value="8" oninput="computeRaquetteCalculator()">
                        </div>
                        <div class="meta-field">
                            <label for="calcRqBonusHits">Frappes Gagnantes en Zone Bonus (× 3 pts)</label>
                            <input id="calcRqBonusHits" type="number" min="0" max="30" step="1" value="5" oninput="computeRaquetteCalculator()">
                        </div>
                        <div class="meta-field">
                            <label for="calcRqServOk">Services Réglementaires Réussis (sur 10)</label>
                            <input id="calcRqServOk" type="number" min="0" max="10" step="1" value="9" oninput="computeRaquetteCalculator()">
                        </div>
                        <div class="meta-field">
                            <label for="calcRqPoulesRank">Poule / Terrain atteint (Montante-Descendante)</label>
                            <select id="calcRqPoulesRank" onchange="computeRaquetteCalculator()">
                                <option value="1" selected>Terrain 1 / Ligue Or (Champions)</option>
                                <option value="2">Terrain 2 / Ligue Argent (Confirmés)</option>
                                <option value="3">Terrain 3 / Ligue Bronze (Initiés)</option>
                                <option value="4">Terrain 4+ / Ligue Espoir (Débutants)</option>
                            </select>
                        </div>
                    </div>

                    <div id="calcRqOutput" style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:12px;padding:1rem;">
                        <!-- Rempli par JS -->
                    </div>
                </div>

                <!-- OUTIL B : SIMULATEUR D'ARBITRAGE TEMPS RÉEL BWF (PAIR/IMPAIR) & ITTF (ROTATION 2 PTS) -->
                <div class="content-card" style="border-top:4px solid #1e40af;">
                    <h3>⚖️ 2. Simulateur d'Arbitrage Officiel BWF (Pair/Impair) &amp; ITTF (Rotation 2 pts)</h3>
                    <p style="font-size:0.86rem;color:#475569;margin-top:0;">Outil interactif pour l'<strong>élève-arbitre</strong> : cliquez sur <strong>+1 Point Joueur A</strong> ou <strong>+1 Point Joueur B</strong> pour connaître instantanément qui doit servir, depuis quel carré (Badminton) ou combien de services restent (Tennis de Table).</p>

                    <div style="display:flex;flex-wrap:wrap;gap:0.6rem;margin-bottom:0.85rem;align-items:center;">
                        <select id="refSportMode" onchange="resetRefereeMatch()" style="padding:0.45rem 0.7rem;border-radius:7px;border:1px solid #cbd5e1;font-weight:800;font-size:0.84rem;background:#ffffff;">
                            <option value="badminton">🏸 Arbitrage Badminton BWF (Set en 21 pts · Carré Pair=Droite / Impair=Gauche)</option>
                            <option value="pingpong">🏓 Arbitrage Tennis de Table ITTF (Manche en 11 pts · Changement tous les 2 pts)</option>
                        </select>
                        <button type="button" onclick="resetRefereeMatch()" style="padding:0.45rem 0.85rem;border-radius:7px;background:#e2e8f0;color:#0f172a;font-size:0.8rem;font-weight:800;border:none;cursor:pointer;">🔄 Remettre à 0 - 0</button>
                    </div>

                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.85rem;margin-bottom:0.85rem;">
                        <div style="background:#f0fdfa;border:2px solid #0f766e;border-radius:12px;padding:0.9rem;text-align:center;">
                            <div style="font-size:0.78rem;font-weight:800;color:#115e59;text-transform:uppercase;">Joueur A (Équipe A)</div>
                            <div id="refScoreA" style="font-size:2.4rem;font-weight:900;color:#0f172a;line-height:1.1;margin:0.35rem 0;">0</div>
                            <button type="button" onclick="addRefereePoint('A')" style="width:100%;padding:0.55rem;border-radius:8px;background:#0f766e;color:#ffffff;font-weight:800;font-size:0.85rem;border:none;cursor:pointer;">+1 Point Joueur A</button>
                        </div>
                        <div style="background:#eff6ff;border:2px solid #1d4ed8;border-radius:12px;padding:0.9rem;text-align:center;">
                            <div style="font-size:0.78rem;font-weight:800;color:#1e40af;text-transform:uppercase;">Joueur B (Équipe B)</div>
                            <div id="refScoreB" style="font-size:2.4rem;font-weight:900;color:#0f172a;line-height:1.1;margin:0.35rem 0;">0</div>
                            <button type="button" onclick="addRefereePoint('B')" style="width:100%;padding:0.55rem;border-radius:8px;background:#1d4ed8;color:#ffffff;font-weight:800;font-size:0.85rem;border:none;cursor:pointer;">+1 Point Joueur B</button>
                        </div>
                    </div>

                    <div id="refCalloutBox" style="background:#0f172a;color:#ffffff;border-radius:10px;padding:0.9rem 1rem;font-size:0.86rem;">
                        <!-- Injecté par JS -->
                    </div>
                </div>
            </div>

            <!-- OUTIL C : PLANIFICATEUR MONTANTE-DESCENDANTE POUR 24 À 48 ÉLÈVES -->
            <div class="content-card" style="border-top:4px solid #006233;margin-top:0.5rem;">
                <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;margin-bottom:0.85rem;">
                    <div>
                        <h3 style="margin:0;">🏟️ 3. Planificateur de Tournoi « Montante-Descendante » (L'Escalier) pour 24 à 48 Élèves</h3>
                        <p style="font-size:0.85rem;color:#475569;margin:0.2rem 0 0;">Calcule instantanément l'organisation optimale par terrain/table (Joueurs en duel + Arbitres/Observateurs ou Ronde Italienne) selon l'effectif de votre classe et le nombre de terrains disponibles.</p>
                    </div>
                    <div style="display:flex;flex-wrap:wrap;gap:0.65rem;align-items:center;">
                        <label style="font-size:0.78rem;font-weight:800;color:#334155;">Effectif Classe :
                            <input id="mdStudentsInput" type="number" min="16" max="54" value="36" oninput="computeMontanteDescendante()" style="width:68px;padding:0.35rem 0.5rem;border-radius:6px;border:1px solid #cbd5e1;font-weight:800;margin-left:0.25rem;">
                        </label>
                        <label style="font-size:0.78rem;font-weight:800;color:#334155;">Terrains / Tables :
                            <input id="mdCourtsInput" type="number" min="2" max="12" value="6" oninput="computeMontanteDescendante()" style="width:60px;padding:0.35rem 0.5rem;border-radius:6px;border:1px solid #cbd5e1;font-weight:800;margin-left:0.25rem;">
                        </label>
                    </div>
                </div>
                <div id="mdOutputContainer"></div>
            </div>
        </section>

        <!-- ================================================================
             VOLET 3 : ANALYSE ET TRAITEMENT DIDACTIQUE (ATD) BADMINTON & PING-PONG
             ================================================================ -->
        <section id="volet-atd" class="silo-section">
            <div class="section-header-bar">
                <div>
                    <h2>📐 Volet 3 : Analyse &amp; Traitement Didactique (ATD) — Badminton &amp; Tennis de Table</h2>
                    <p class="section-subtitle">Référentiel scientifique, biomécanique et didactique complet pour les cours d'EPS et la préparation aux concours du CRMEF (Écrit &amp; Oral).</p>
                </div>
                <div class="toolbar-actions">
                    <button type="button" class="btn-export word" onclick="exportElementToWord('atdPrintableContent', 'ATD_Badminton_Tennis_de_Table_EPS_Maroc.doc')">📄 Exporter l'ATD (.doc)</button>
                    <button type="button" class="btn-export pdf" onclick="printElementAsPDF('atdPrintableContent', 'ATD Badminton & Tennis de Table — ProfEPS Maroc')">🖨️ Imprimer / PDF A4</button>
                </div>
            </div>

            <div id="atdPrintableContent">
                <div class="grid-2">
                    <div class="content-card">
                        <h3>1. Définition, Logique Interne &amp; Problème Fondamental</h3>
                        <p><strong>Définition :</strong> Le <strong>Badminton</strong> et le <strong>Tennis de Table</strong> sont des sports d'opposition duelle médiés par un instrument de frappe (raquette) dans un espace séparé par un filet infranchissable, où chaque échange se conclut obligatoirement par le gain ou la perte d'un point (<em>Rally Point System</em>).</p>
                        <p><strong>Spécificités physiques de l'engin :</strong></p>
                        <ul style="padding-left:1.2rem;margin:0.5rem 0;font-size:0.9rem;">
                            <li><strong>En Badminton (Volant conique 4,74–5,50 g) :</strong> Le volant subit une <strong>décélération aérodynamique extrême</strong>. Frappé à plus de 300 km/h au smash, il retombe quasi verticalement en fond de court (trajectoire parabolique asymétrique dite « en parachute »). Aucun rebond au sol n'est permis.</li>
                            <li><strong>En Tennis de Table (Balle sphérique 40 mm+, 2,7 g) :</strong> Le jeu impose un rebond unique par camp sur une surface réduite (2,74 m × 1,525 m). L'incertitude provient de la <strong>vitesse de réaction très brève (≤ 0,4 s)</strong> et de l'<strong>effet Magnus</strong> (<em>Topspin</em> lifté qui plonge et accélère au rebond vs <em>Backspin</em> coupé qui freine et tire vers le filet).</li>
                        </ul>
                        <p><strong>Problème Fondamental :</strong> Comment résoudre simultanément la contradiction entre <strong>assurer la continuité de l'échange</strong> (ne pas commettre la faute directe en renvoyant dans les limites réglementaires) et <strong>créer la rupture</strong> (envoyer le volant ou la balle là où l'adversaire n'est pas, ou à une vitesse/rotation qu'il ne peut pas contrôler) ?</p>
                    </div>

                    <div class="content-card">
                        <h3>2. Principes d'Action, Enjeux de Formation &amp; Biomécanique</h3>
                        <ul style="padding-left:1.2rem;margin:0;font-size:0.9rem;">
                            <li><strong>Sur le plan informationnel et perceptif :</strong> Lire très tôt l'orientation du tamis/palette adverse, la hauteur du point d'impact et la trajectoire pour anticiper le déplacement (reprise d'appui <em>Split-step</em> au moment de la frappe adverse).</li>
                            <li><strong>Sur le plan biomécanique (Chaîne cinétique) :</strong>
                                <br>• <em>En Badminton :</em> Passer de la « prise poêle à frire » de face à une <strong>prise universelle</strong> mobilisant la rotation externe/interne de l'avant-bras (<strong>pronation au coup droit haut / supination au revers</strong>) et le fouetté du poignet à un point d'impact haut devant soi.
                                <br>• <em>En Tennis de Table :</em> Adopter la <strong>prise orthodoxe (poignée de main)</strong>, dissocier le tronc et le bras, et régler l'<strong>inclinaison de la palette</strong> selon l'effet reçu (palette ouverte face à une balle coupée ; palette fermée avec brossage ascendant en <em>topspin</em>).</li>
                            <li><strong>Sur le plan tactique (Gestion de l'espace) :</strong> Se replacer systématiquement au <strong>centre stratégique</strong> (« T » central en Badminton ; à 50 cm derrière le milieu de table en Tennis de Table) après chaque frappe et exploiter les 4 coins (Av-D / Av-G / Ar-D / Ar-G).</li>
                        </ul>
                    </div>
                </div>

                <!-- COMPARATIF TECHNIQUE & TACTIQUE BADMINTON VS TENNIS DE TABLE -->
                <div class="content-card">
                    <h3>3. Synthèse Comparative : Coups Fondamentaux en Badminton (BWF) &amp; Tennis de Table (ITTF)</h3>
                    <div class="pro-table-wrap">
                        <table class="pro-table">
                            <thead>
                                <tr>
                                    <th>Intention Tactique</th>
                                    <th>🏸 En Badminton (Cible au sol : 13,40m × 5,18m)</th>
                                    <th>🏓 En Tennis de Table (Cible table : 2,74m × 1,525m)</th>
                                    <th>Critères de Réussite observables en EPS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>1. Mise en jeu sécurisée ou tactique (Le Service)</strong></td>
                                    <td><strong>Service court bas</strong> (frôle le filet vers la ligne de service court à 1,98 m) ou <strong>service long haut</strong> (repousse l'adversaire au couloir de fond). Contact ≤ 1,15 m.</td>
                                    <td><strong>Service coupé court</strong> (2 rebonds sur la table adverse), <strong>service lifté rapide</strong> dans les angles ou <strong>service latéral</strong>. Lancer vertical ≥ 16 cm paume ouverte.</td>
                                    <td>9/10 services réglementaires ; l'adversaire ne peut pas attaquer directement dès la 2ème frappe.</td>
                                </tr>
                                <tr>
                                    <td><strong>2. Repousser / Se donner du temps (Défense &amp; Neutre)</strong></td>
                                    <td><strong>Dégagé haut de fond de court (Clear)</strong> et <strong>Lob défensif</strong> : frappe haute au-dessus de la tête en pronation envoyant le volant dans le couloir de fond adverse.</td>
                                    <td><strong>Poussette contrôlée (Coup droit / Revers)</strong> et <strong>Bloc</strong> près de la table : palette légèrement ouverte ou neutre utilisant la vitesse de la balle adverse.</td>
                                    <td>7/10 renvois profonds permettant à l'élève de se replacer au centre avant la frappe adverse.</td>
                                </tr>
                                <tr>
                                    <td><strong>3. Déplacer l'adversaire / Créer l'espace libre</strong></td>
                                    <td><strong>Amorti (Drop shot)</strong> et <strong>Contre-amorti au filet</strong> : ralentir brutalement la tête de raquette pour faire plonger le volant juste derrière le filet, combiné au dégagé (axe Avant/Arrière).</td>
                                    <td><strong>Placement croisé / ligne droite</strong> (essuie-glace Coup Droit / Revers) et variation court/long obligeant l'adversaire à bouger latéralement et en profondeur.</td>
                                    <td>Alternance intentionnelle de 2 zones opposées (Avant/Arrière ou Gauche/Droite) sur un même échange.</td>
                                </tr>
                                <tr>
                                    <td><strong>4. Rompre l'échange / Finir le point (Attaque)</strong></td>
                                    <td><strong>Smash</strong> (trajectoire descendante rapide frappée au point culminant devant soi), <strong>Drive tendu</strong> ou <strong>Rush au filet</strong> sur volant flottant.</td>
                                    <td><strong>Frappe à plat (Smash)</strong> sur balle haute ou <strong>Topspin (coup droit / revers)</strong> brossant la balle du bas vers le haut et l'avant.</td>
                                    <td>Taux de conversion $≥ 60\%$ sur volant/balle favorable (haute et courte) sans commettre la faute dans le filet.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- TABLEAU DE REMÉDIATION DES DÉFAUTS FRÉQUENTS -->
                <div class="content-card">
                    <h3>4. Diagnostic Pédagogique : Les 6 Défauts Majeurs en EPS &amp; Remédiations Terrain</h3>
                    <div class="pro-table-wrap">
                        <table class="pro-table">
                            <thead>
                                <tr>
                                    <th>Discipline</th>
                                    <th>Défaut Observé chez l'Élève</th>
                                    <th>Cause Biomécanique / Perceptive</th>
                                    <th>Situation de Remédiation sur le Terrain</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>🏸 Badminton</strong></td>
                                    <td><strong>1. « Prise poêle à frire » et frappe avec le coude collé au corps</strong></td>
                                    <td>Tamis orienté de face en permanence ; absence de profilage des épaules et de pronation de l'avant-bras.</td>
                                    <td>Prise universelle « serrer la main à la raquette » (V entre pouce et index sur le chanfrein) ; départ en <strong>position de l'archer</strong> (profilé, main libre pointant le volant).</td>
                                </tr>
                                <tr>
                                    <td><strong>🏸 Badminton</strong></td>
                                    <td><strong>2. Recule en courant à reculons et frappe derrière la tête</strong></td>
                                    <td>Mauvaise lecture de la profondeur du volant ; l'élève subit la trajectoire et perd tout levier pour dégager au fond.</td>
                                    <td>Couloir central matérialisé (« T ») avec obligation de reculer en <strong>pas chassés de profil</strong> pour placer le pied arrière derrière le volant avant la frappe.</td>
                                </tr>
                                <tr>
                                    <td><strong>🏸 Badminton</strong></td>
                                    <td><strong>3. Jeu en « cloche » systématique au centre du terrain (renvoi gentil)</strong></td>
                                    <td>Peur de sortir le volant ; absence d'intention de viser les zones éloignées de l'adversaire.</td>
                                    <td>Match à <strong>Zones Bonifiées (3 pts)</strong> : un ruban ou des plots délimitent une zone avant (1,98 m) et un couloir de fond (76 cm) rapportant 3 pts immédiats.</td>
                                </tr>
                                <tr>
                                    <td><strong>🏓 Ping-Pong</strong></td>
                                    <td><strong>4. Service « cuillère » lancé dans la raquette ou frappé au-dessus de la table</strong></td>
                                    <td>Méconnaissance de la règle ITTF 2.6 ; l'élève frappe la balle dans sa main par peur de la manquer.</td>
                                    <td>Atelier « Paume plate + Lancer 16 cm » derrière la ligne blanche de fond : si l'élève hésite, il laisse tomber la balle au sol et recommence sans pénalité d'apprentissage.</td>
                                </tr>
                                <tr>
                                    <td><strong>🏓 Ping-Pong</strong></td>
                                    <td><strong>5. Balle qui s'envole hors de la table (« chandelle ») à chaque échange</strong></td>
                                    <td>Palette trop ouverte (orientée vers le plafond) et mouvement en cuillère du bas vers le haut sans recouvrir la balle.</td>
                                    <td>Consigne « caresser le sommet de la balle » (casquette sur la balle) au sommet du rebond + fil élastique tendu 25 cm au-dessus du filet pour imposer une trajectoire tendue.</td>
                                </tr>
                                <tr>
                                    <td><strong>🏓 Ping-Pong</strong></td>
                                    <td><strong>6. Pieds « bétonnés » au sol et buste qui se penche pour chercher la balle</strong></td>
                                    <td>Absence de garde active jambes fléchies ; l'élève tend le bras à l'extrême au lieu de déplacer ses appuis.</td>
                                    <td>Exercice « Frapper et toucher le plot latéral » ou « Essuie-glace 1 coup droit / 1 revers » en petits pas chassés rapides.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>

        <!-- ================================================================
             VOLET 4 : FEUILLES DE MATCH & 4 GRILLES D'ÉVALUATION (/20)
             ================================================================ -->
        <section id="volet-grilles" class="silo-section">
            <div class="section-header-bar">
                <div>
                    <h2>📊 Volet 4 : Feuille de Match Officielle (Zones Bonus) &amp; 4 Grilles d'Évaluation Sommative (/20)</h2>
                    <p class="section-subtitle">Grilles officielles conformes aux Orientations Pédagogiques <strong>OP 2009 (Collège : 12+3+5)</strong> et <strong>OP 2007 (Lycée : 14+3+3)</strong> pour le Badminton et le Tennis de Table, exportables en <strong>Word (.doc)</strong> et <strong>PDF A4</strong>.</p>
                </div>
            </div>

            <div class="sub-tabs" role="tablist">
                <button type="button" class="sub-tab-btn active" onclick="switchGridTab('grid-match', this)">📋 1. Feuille de Match &amp; Zones Bonus (1pt / 3pts)</button>
                <button type="button" class="sub-tab-btn" onclick="switchGridTab('grid-college', this)">🏫 2. Grille Collège 1AC–3AC (OP 2009 · /20)</button>
                <button type="button" class="sub-tab-btn" onclick="switchGridTab('grid-lycee', this)">🎓 3. Grille Lycée TC–2Bac (OP 2007 · /20)</button>
                <button type="button" class="sub-tab-btn" onclick="switchGridTab('grid-dispense', this)">⚖️ 4. Grille Élève Dispensé / Juge-Arbitre (/20)</button>
            </div>

            <!-- PANEL 1 : FEUILLE OFFICIELLE DE MATCH & OBSERVATION TACTIQUE -->
            <div id="grid-match" class="sub-tab-panel active">
                <div class="content-card">
                    <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;margin-bottom:1rem;">
                        <h3 style="margin:0;">📋 Feuille Officielle de Match &amp; Observation des Zones Bonus (Badminton BWF / Tennis de Table ITTF)</h3>
                        <div class="toolbar-actions">
                            <button type="button" class="btn-export word" onclick="exportElementToWord('gridMatchDoc', 'Feuille_Match_Badminton_Tennis_Table_EPS.doc')">📄 Exporter (.doc)</button>
                            <button type="button" class="btn-export pdf" onclick="printElementAsPDF('gridMatchDoc', 'Feuille Officielle de Match — Badminton & Tennis de Table EPS')">🖨️ Imprimer / PDF A4</button>
                        </div>
                    </div>

                    <div id="gridMatchDoc">
                        <p style="font-size:0.88rem;color:#334155;margin-top:0;"><strong>Protocole d'observation en triade (Joueur A, Joueur B, Arbitre/Statisticien C) :</strong> Tout point normal vaut <strong>1 pt</strong>. Tout point directement gagnant (sans que l'adversaire ne puisse renvoyer) tombant dans une <strong>Zone Cible Bonus</strong> (Badminton : Zone Avant ≤ 1,98 m ou Couloir de Fond 76 cm ; Tennis de Table : Cibles d'angles D/G ou coup d'attaque Topspin/Smash) vaut <strong>3 pts</strong>.</p>
                        <div class="pro-table-wrap">
                            <table class="pro-table">
                                <thead>
                                    <tr>
                                        <th>Match / Rotation</th>
                                        <th>Joueur(se)</th>
                                        <th>Services Réussis (/5)</th>
                                        <th>Points Normaux (1 pt)</th>
                                        <th>Points Zone Bonus Avant / Angle G (3 pts)</th>
                                        <th>Points Zone Bonus Fond / Angle D (3 pts)</th>
                                        <th>Total Score Match</th>
                                        <th>Vainqueur (Monte ↑ / Descend ↓)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td rowspan="2"><strong>Match 1</strong><br>Terrain / Table n°___</td>
                                        <td><strong>Joueur A :</strong> ________________</td>
                                        <td>O O O O O</td>
                                        <td>1 2 3 4 5 6 7 8 9 10</td>
                                        <td>[+3] [+3] [+3] [+3]</td>
                                        <td>[+3] [+3] [+3] [+3]</td>
                                        <td><strong>_____ pts</strong></td>
                                        <td>☐ Monte ↑ &nbsp; ☐ Descend ↓</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Joueur B :</strong> ________________</td>
                                        <td>O O O O O</td>
                                        <td>1 2 3 4 5 6 7 8 9 10</td>
                                        <td>[+3] [+3] [+3] [+3]</td>
                                        <td>[+3] [+3] [+3] [+3]</td>
                                        <td><strong>_____ pts</strong></td>
                                        <td>☐ Monte ↑ &nbsp; ☐ Descend ↓</td>
                                    </tr>
                                    <tr>
                                        <td rowspan="2"><strong>Match 2</strong><br>Terrain / Table n°___</td>
                                        <td><strong>Joueur A :</strong> ________________</td>
                                        <td>O O O O O</td>
                                        <td>1 2 3 4 5 6 7 8 9 10</td>
                                        <td>[+3] [+3] [+3] [+3]</td>
                                        <td>[+3] [+3] [+3] [+3]</td>
                                        <td><strong>_____ pts</strong></td>
                                        <td>☐ Monte ↑ &nbsp; ☐ Descend ↓</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Joueur C :</strong> ________________</td>
                                        <td>O O O O O</td>
                                        <td>1 2 3 4 5 6 7 8 9 10</td>
                                        <td>[+3] [+3] [+3] [+3]</td>
                                        <td>[+3] [+3] [+3] [+3]</td>
                                        <td><strong>_____ pts</strong></td>
                                        <td>☐ Monte ↑ &nbsp; ☐ Descend ↓</td>
                                    </tr>
                                    <tr>
                                        <td rowspan="2"><strong>Match 3</strong><br>Terrain / Table n°___</td>
                                        <td><strong>Joueur B :</strong> ________________</td>
                                        <td>O O O O O</td>
                                        <td>1 2 3 4 5 6 7 8 9 10</td>
                                        <td>[+3] [+3] [+3] [+3]</td>
                                        <td>[+3] [+3] [+3] [+3]</td>
                                        <td><strong>_____ pts</strong></td>
                                        <td>☐ Monte ↑ &nbsp; ☐ Descend ↓</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Joueur C :</strong> ________________</td>
                                        <td>O O O O O</td>
                                        <td>1 2 3 4 5 6 7 8 9 10</td>
                                        <td>[+3] [+3] [+3] [+3]</td>
                                        <td>[+3] [+3] [+3] [+3]</td>
                                        <td><strong>_____ pts</strong></td>
                                        <td>☐ Monte ↑ &nbsp; ☐ Descend ↓</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- PANEL 2 : GRILLE COLLÈGE OP 2009 (/20) -->
            <div id="grid-college" class="sub-tab-panel">
                <div class="content-card">
                    <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;margin-bottom:1rem;">
                        <h3 style="margin:0;">🏫 Grille d'Évaluation Sommative Collège (1AC, 2AC, 3AC) — OP 2009 (/20)</h3>
                        <div class="toolbar-actions">
                            <button type="button" class="btn-export word" onclick="exportElementToWord('gridCollegeDoc', 'Grille_Evaluation_College_Badminton_PingPong_OP2009.doc')">📄 Exporter (.doc)</button>
                            <button type="button" class="btn-export pdf" onclick="printElementAsPDF('gridCollegeDoc', 'Grille Évaluation Collège Badminton & Tennis de Table OP 2009')">🖨️ Imprimer / PDF A4</button>
                        </div>
                    </div>
                    <div id="gridCollegeDoc">
                        <div class="pro-table-wrap">
                            <table class="pro-table">
                                <thead>
                                    <tr>
                                        <th>Domaine (OP 2009)</th>
                                        <th>Critères d'Évaluation (Badminton &amp; Tennis de Table)</th>
                                        <th>Barème &amp; Indicateurs de Niveau</th>
                                        <th>Max</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td rowspan="3"><strong>1. Habiletés Motrices &amp; Tactiques<br>(12 points)</strong></td>
                                        <td><strong>A. Service réglementaire &amp; Mise en jeu (/3 pts)</strong></td>
                                        <td>• <strong>1 pt :</strong> ≤ 5/10 services réussis ; nombreuses fautes directes au service.<br>• <strong>2 pts :</strong> 6 à 8/10 services réglementaires réguliers.<br>• <strong>3 pts :</strong> 9 à 10/10 services réglementaires variés (court/long ou coupé/placé).</td>
                                        <td><strong>/ 3 pts</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>B. Qualité technique &amp; Utilisation de l'espace (/5 pts)</strong></td>
                                        <td>• <strong>1–2 pts :</strong> Renvoi central en cloche, prise bloquée, déplacements tardifs.<br>• <strong>3–4 pts :</strong> Prise universelle/orthodoxe correcte, alterne Coup Droit/Revers ou Avant/Arrière avec replacement.<br>• <strong>5 pts :</strong> Maîtrise dégagé + amorti + smash (Badminton) ou poussette + attaque placée (Ping-Pong), ≥ 3 points marqués en Zone Bonus.</td>
                                        <td><strong>/ 5 pts</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>C. Gain des duels &amp; Classement Montante-Descendante (/4 pts)</strong></td>
                                        <td>• <strong>1 pt :</strong> Poule Espoir (Terrain 4+).<br>• <strong>2 pts :</strong> Poule Bronze (Terrain 3).<br>• <strong>3 pts :</strong> Poule Argent (Terrain 2).<br>• <strong>4 pts :</strong> Poule Or (Terrain 1).</td>
                                        <td><strong>/ 4 pts</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>2. Connaissances Conceptuelles<br>(3 points)</strong></td>
                                        <td><strong>Règlement BWF / ITTF &amp; Principes tactiques (/3 pts)</strong></td>
                                        <td>• <strong>1 pt :</strong> Règles du service (hauteur 1,15 m et carré pair/impair BWF ; lancer 16 cm et rotation 2 pts ITTF).<br>• <strong>1 pt :</strong> Limites du terrain/table et annonce du score.<br>• <strong>1 pt :</strong> Justification tactique (pourquoi viser l'espace libre et se replacer au centre).</td>
                                        <td><strong>/ 3 pts</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>3. Comportement &amp; Rôles Sociaux<br>(5 points)</strong></td>
                                        <td><strong>Arbitrage officiel, Tenue de la feuille de match &amp; Fair-Play (/5 pts)</strong></td>
                                        <td>• <strong>2 pts :</strong> Arbitrage rigoureux à voix haute (annonce du score et du carré/serveur).<br>• <strong>2 pts :</strong> Respect du matériel (raquettes, volants, balles, filets) et échauffement.<br>• <strong>1 pt :</strong> Fair-play (salut avant/après match, acceptation des décisions).</td>
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
            <div id="grid-lycee" class="sub-tab-panel">
                <div class="content-card">
                    <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;margin-bottom:1rem;">
                        <h3 style="margin:0;">🎓 Grille d'Évaluation Sommative Lycée (TC, 1Bac, 2Bac) — OP 2007 (/20)</h3>
                        <div class="toolbar-actions">
                            <button type="button" class="btn-export word" onclick="exportElementToWord('gridLyceeDoc', 'Grille_Evaluation_Lycee_Bac_Badminton_PingPong_OP2007.doc')">📄 Exporter (.doc)</button>
                            <button type="button" class="btn-export pdf" onclick="printElementAsPDF('gridLyceeDoc', 'Grille Évaluation Lycée Badminton & Tennis de Table OP 2007')">🖨️ Imprimer / PDF A4</button>
                        </div>
                    </div>
                    <div id="gridLyceeDoc">
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
                                        <td rowspan="2"><strong>1. Habiletés Motrices &amp; Efficacité en Duel<br>(14 points)</strong></td>
                                        <td><strong>A. Efficacité Technico-Tactique &amp; Création de la Rupture (/7 pts)</strong></td>
                                        <td>• <strong>Niveau 1 (1–2 pts) :</strong> Jeu réactif de survie, renvoi axial haut, nombreuses fautes directes.<br>• <strong>Niveau 2 (3–4 pts) :</strong> Échange construit en déplaçant l'adversaire (Avant/Arrière en Badminton ; Droite/Gauche en Ping-Pong) avec replacement systématique.<br>• <strong>Niveau 3 (5–6 pts) :</strong> Exploite dès qu'elle se présente une balle/volant favorable par une attaque franche (Smash, Amorti, Topspin) et varie ses services.<br>• <strong>Niveau 4 (7 pts) :</strong> Projet tactique adapté au profil adverse, feintes, variations de rythme et d'effets, ≥ 4 points gagnants en Zone Bonus par match.</td>
                                        <td><strong>/ 7 pts</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>B. Performance en Tournoi (Poule de Niveau &amp; Ratio Victoires) (/7 pts)</strong></td>
                                        <td>• <strong>Poule 1 (Ligue Or) :</strong> 5,5 à 7,0 pts selon le classement interne.<br>• <strong>Poule 2 (Ligue Argent) :</strong> 4,0 à 5,5 pts selon le classement interne.<br>• <strong>Poule 3 (Ligue Bronze) :</strong> 2,5 à 4,0 pts selon le classement interne.<br>• <strong>Poule 4 (Ligue Espoir) :</strong> 1,0 à 2,5 pts selon le classement interne.</td>
                                        <td><strong>/ 7 pts</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>2. Connaissances Conceptuelles<br>(3 points)</strong></td>
                                        <td><strong>Règlement International BWF / ITTF &amp; Analyse Tactique (/3 pts)</strong></td>
                                        <td>• <strong>1,5 pt :</strong> Maîtrise complète du code d'arbitrage (BWF 21 pts, pair/impair, let, contact ≤ 1,15 m ; ou ITTF 11 pts, lancer 16 cm, rotation 2 pts, avantage à 10-10).<br>• <strong>1,5 pt :</strong> Capacité à identifier le point faible adverse et formuler une stratégie de gain du point.</td>
                                        <td><strong>/ 3 pts</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>3. Comportement &amp; Rôles d'Officiel<br>(3 points)</strong></td>
                                        <td><strong>Juge-Arbitre de terrain, Coach &amp; Gestion autonome du tournoi (/3 pts)</strong></td>
                                        <td>• <strong>1,5 pt :</strong> Tenue irréprochable de l'arbitrage officiel et de la feuille d'observation tactique.<br>• <strong>1,5 pt :</strong> Engagement moteur, coaching constructif d'un camarade entre les sets et respect du matériel.</td>
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
            <div id="grid-dispense" class="sub-tab-panel">
                <div class="content-card">
                    <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;margin-bottom:1rem;">
                        <h3 style="margin:0;">⚖️ Grille d'Évaluation pour Élève Dispensé(e) — Juge-Arbitre, Directeur de Tournoi &amp; Statisticien (/20)</h3>
                        <div class="toolbar-actions">
                            <button type="button" class="btn-export word" onclick="exportElementToWord('gridDispenseDoc', 'Grille_Eleve_Dispense_Badminton_Tennis_Table_EPS.doc')">📄 Exporter (.doc)</button>
                            <button type="button" class="btn-export pdf" onclick="printElementAsPDF('gridDispenseDoc', 'Grille Élève Dispensé Badminton & Tennis de Table EPS')">🖨️ Imprimer / PDF A4</button>
                        </div>
                    </div>
                    <div id="gridDispenseDoc">
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
                                        <td><strong>1. Arbitre Principal de Chaise / Table (/6 pts)</strong></td>
                                        <td>Vérifie la hauteur du filet, effectue le tirage au sort, annonce le score à voix haute (serveur en premier), contrôle la légalité du service (carré Pair/Impair et hauteur ≤ 1,15 m en Badminton ; lancer vertical ≥ 16 cm et rotation tous les 2 pts en Ping-Pong).</td>
                                        <td><strong>/ 6 pts</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>2. Directeur de Tournoi Montante-Descendante (/5 pts)</strong></td>
                                        <td>Chronomètre les rotations (4 à 5 min), donne le coup de sifflet de fin de tour, vérifie la montée des vainqueurs vers le terrain supérieur et la descente des perdants, et tient à jour le classement général des poules.</td>
                                        <td><strong>/ 5 pts</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>3. Statisticien Tactique &amp; Conseiller Coach (/5 pts)</strong></td>
                                        <td>Remplit la fiche de relevé des Zones Bonus (1 pt / 3 pts) et des fautes directes, calcule le pourcentage de rupture et propose 1 conseil tactique ciblé entre les manches.</td>
                                        <td><strong>/ 5 pts</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>4. Assiduité, Tenue &amp; Gestion du Matériel (/4 pts)</strong></td>
                                        <td>Présence ponctuelle, installation et rangement soigneux des poteaux/filets, comptage des volants et balles en fin de séance.</td>
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
             VOLET 5 : ORGANISATION DE 40+ ÉLÈVES, ÉCHAUFFEMENT & RÈGLEMENTS BWF/ITTF
             ================================================================ -->
        <section id="volet-terrain" class="silo-section">
            <div class="section-header-bar">
                <div>
                    <h2>🏟️ Volet 5 : Organisation Pédagogique de 40+ Élèves, Échauffement Spécifique &amp; Règlements BWF / ITTF</h2>
                    <p class="section-subtitle">Solutions concrètes pour maximiser le temps d'engagement moteur avec peu de terrains ou de tables dans les établissements marocains.</p>
                </div>
            </div>

            <div class="grid-3">
                <div class="content-card" style="border-top:4px solid #0f766e;">
                    <h3>🪜 1. La « Montante-Descendante » (L'Escalier)</h3>
                    <p style="font-size:0.88rem;color:#334155;">Dispositif roi en EPS : les terrains ou tables sont numérotés du <strong>Terrain 1 (Ligue des Champions)</strong> au <strong>Terrain N</strong>.</p>
                    <ul style="padding-left:1.15rem;font-size:0.86rem;color:#334155;">
                        <li>Matchs courts au temps (<strong>4 min</strong> au coup de sifflet) ou en <strong>7 points</strong>.</li>
                        <li>Au coup de sifflet : le <strong>vainqueur monte d'un terrain</strong> (vers le Terrain 1), le <strong>perdant descend d'un terrain</strong>.</li>
                        <li>Après 3 rotations, les élèves de niveau proche se retrouvent automatiquement face à face, garantissant des duels équilibrés et motivants.</li>
                    </ul>
                </div>

                <div class="content-card" style="border-top:4px solid #1d4ed8;">
                    <h3>🔄 2. La « Ronde Italienne » &amp; « Roi du Terrain » (40+ élèves)</h3>
                    <p style="font-size:0.88rem;color:#334155;">Quand vous disposez de seulement <strong>3 terrains de Badminton ou 4 tables de Ping-Pong pour 36 à 42 élèves</strong> :</p>
                    <ul style="padding-left:1.15rem;font-size:0.86rem;color:#334155;">
                        <li><strong>Ronde Italienne par équipes de 3 :</strong> Match relais en 15 points (A1 joue contre B1 jusqu'à 5 pts, A2 entre contre B2 jusqu'à 10 pts en conservant le score, A3 conclut jusqu'à 15 pts).</li>
                        <li><strong>Demi-terrains longitudinaux (Badminton) :</strong> En divisant chaque terrain dans le sens de la longueur, <strong>4 terrains deviennent 8 demi-terrains de simple</strong> (16 joueurs simultanés + 8 arbitres/observateurs).</li>
                    </ul>
                </div>

                <div class="content-card" style="border-top:4px solid #006233;">
                    <h3>🔥 3. Échauffement Spécifique Raquettes (12 min)</h3>
                    <ol style="padding-left:1.15rem;font-size:0.86rem;color:#334155;">
                        <li><strong>Activation cardio &amp; Pas chassés (3 min) :</strong> Déplacements en étoile (« Shadow ») avec reprise d'appui <em>Split-step</em> au signal visuel.</li>
                        <li><strong>Mobilisation articulaire (3 min) :</strong> Épaules, coudes, poignets (mouvements en « 8 » avec la raquette pour préparer la pronation/supination), chevilles et fentes avant.</li>
                        <li><strong>Dextérité &amp; Jonglage (3 min) :</strong> Jonglages alternés Coup Droit / Revers puis échanges coopératifs à distance réduite (contrat : 15 échanges sans chute).</li>
                    </ol>
                </div>
            </div>

            <!-- COMPARATIF RÈGLEMENTS OFFICIELS BWF & ITTF -->
            <div class="content-card">
                <h3>⚖️ Synthèse des Règlements Officiels BWF (Badminton) &amp; ITTF (Tennis de Table)</h3>
                <div class="pro-table-wrap">
                    <table class="pro-table">
                        <thead>
                            <tr>
                                <th>Point de Règlement</th>
                                <th>🏸 Règlement Officiel Badminton (BWF)</th>
                                <th>🏓 Règlement Officiel Tennis de Table (ITTF)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Dimensions de l'aire de jeu &amp; Filet</strong></td>
                                <td>Longueur <strong>13,40 m</strong> × Largeur <strong>5,18 m (Simple)</strong> ou <strong>6,10 m (Double)</strong>. Filet à <strong>1,55 m</strong> aux poteaux et <strong>1,524 m</strong> au centre. Ligne de service court à 1,98 m du filet.</td>
                                <td>Table rectangulaire de <strong>2,74 m × 1,525 m</strong>, hauteur <strong>76 cm</strong> au-dessus du sol. Filet de <strong>15,25 cm</strong> de haut (débordant de 15,25 cm de chaque côté).</td>
                            </tr>
                            <tr>
                                <td><strong>Formule de Score &amp; Prolongation</strong></td>
                                <td>Match en <strong>2 sets gagnants de 21 points</strong> (<em>Rally Point</em>). À 20-20, il faut 2 points d'écart. À <strong>29-29</strong>, le joueur marquant le <strong>30ème point</strong> gagne le set.</td>
                                <td>Match en manches de <strong>11 points</strong> (3 ou 4 manches gagnantes ; 1 ou 2 en EPS). À <strong>10-10</strong>, il faut <strong>2 points d'écart</strong> sans limite de plafond (12-10, 14-12...).</td>
                            </tr>
                            <tr>
                                <td><strong>Règle du Service &amp; Rotation</strong></td>
                                <td>Le serveur sert toujours tant qu'il gagne l'échange. Score du serveur <strong>Pair (0, 2, 4...) = service de DROITE</strong> en diagonale ; Score <strong>Impair (1, 3, 5...) = service de GAUCHE</strong> en diagonale. Impact du volant <strong>≤ 1,15 m</strong> du sol, pieds au sol dans le carré.</td>
                                <td><strong>Changement de serveur tous les 2 points</strong> (et tous les points à partir de 10-10). Balle posée sur la <strong>paume ouverte immobile</strong> derrière la ligne de fond et au-dessus de la table, <strong>lancée verticalement d'au moins 16 cm</strong> sans effet. Rebond dans son camp puis dans le camp adverse.</td>
                            </tr>
                            <tr>
                                <td><strong>Service touchant le filet (« Let »)</strong></td>
                                <td>En Badminton, <strong>il n'y a PAS de « Let » au filet sur le service</strong> : si le volant touche la bande du filet et tombe dans le bon carré de service adverse, <strong>le service est BON et le jeu continue</strong>.</td>
                                <td>En Tennis de Table, si la balle servie touche le filet (ou ses supports) avant de rebondir sur le camp adverse, il y a <strong>« LET » (balle à remettre)</strong> sans limite du nombre de Lets.</td>
                            </tr>
                            <tr>
                                <td><strong>Fautes Spécifiques à sanctionner</strong></td>
                                <td>Toucher le filet avec la raquette ou le corps ; frapper le volant dans le camp adverse par-dessus le filet ; double touche du même joueur ; pieds mordant une ligne au moment du service.</td>
                                <td>Frapper la balle de volée au-dessus de la table avant qu'elle n'ait rebondi ; poser la <strong>main libre sur la surface de la table</strong> pendant l'échange ; déplacer la table avec le corps.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        <!-- ================================================================
             VOLET 6 : BIBLIOTHÈQUE DES ARTICLES & RÈGLEMENTS RAQUETTES LIÉS
             ================================================================ -->
        <section id="volet-articles" class="silo-section">
            <div class="section-header-bar">
                <div>
                    <h2>📚 Volet 6 : Bibliothèque Complète des Articles &amp; Règlements Badminton &amp; Tennis de Table</h2>
                    <p class="section-subtitle">Consultez nos dossiers pédagogiques, cycles détaillés et règlements illustrés BWF et ITTF sur ProfEPS Maroc.</p>
                </div>
            </div>

            <div class="grid-3">
                <article class="content-card">
                    <div style="font-size:0.75rem;font-weight:800;color:#0f766e;text-transform:uppercase;margin-bottom:0.35rem;">Règlement Officiel BWF</div>
                    <h3 style="font-size:1.02rem;margin-bottom:0.5rem;"><a href="reglement-badminton-bwf-arbitrage-eps.html" style="color:#0f172a;text-decoration:none;">🏸 Règlement Badminton BWF en EPS : Terrain, Service 1,15m &amp; Zones Pair/Impair</a></h3>
                    <p style="font-size:0.85rem;color:#475569;">Dimensions exactes Simple/Double, règle du service à 1,15 m, zones de service selon le score pair/impair et gestes d'arbitrage.</p>
                    <a href="reglement-badminton-bwf-arbitrage-eps.html" style="font-size:0.84rem;font-weight:800;color:#0f766e;text-decoration:none;">Lire le règlement BWF →</a>
                </article>

                <article class="content-card">
                    <div style="font-size:0.75rem;font-weight:800;color:#1d4ed8;text-transform:uppercase;margin-bottom:0.35rem;">Règlement Officiel ITTF</div>
                    <h3 style="font-size:1.02rem;margin-bottom:0.5rem;"><a href="reglement-tennis-de-table-ittf-arbitrage-eps.html" style="color:#0f172a;text-decoration:none;">🏓 Règlement Tennis de Table ITTF : Service 16 cm, 11 Points &amp; Arbitrage EPS</a></h3>
                    <p style="font-size:0.85rem;color:#475569;">Dimensions de la table (2,74 m × 1,525 m), service réglementaire paume ouverte, règle du Let et rotation tous les 2 points.</p>
                    <a href="reglement-tennis-de-table-ittf-arbitrage-eps.html" style="font-size:0.84rem;font-weight:800;color:#1d4ed8;text-decoration:none;">Lire le règlement ITTF →</a>
                </article>

                <article class="content-card">
                    <div style="font-size:0.75rem;font-weight:800;color:#006233;text-transform:uppercase;margin-bottom:0.35rem;">Dossier Didactique Badminton</div>
                    <h3 style="font-size:1.02rem;margin-bottom:0.5rem;"><a href="article-badminton-eps.html" style="color:#0f172a;text-decoration:none;">📘 Enseigner le Badminton en EPS au Maroc : Situations &amp; Évaluation</a></h3>
                    <p style="font-size:0.85rem;color:#475569;">Progression complète du dégagé, de l'amorti et du smash, gestion des trajectoires et situations d'apprentissage ciblées.</p>
                    <a href="article-badminton-eps.html" style="font-size:0.84rem;font-weight:800;color:#006233;text-decoration:none;">Consulter le guide Badminton →</a>
                </article>

                <article class="content-card">
                    <div style="font-size:0.75rem;font-weight:800;color:#006233;text-transform:uppercase;margin-bottom:0.35rem;">Dossier Didactique Ping-Pong</div>
                    <h3 style="font-size:1.02rem;margin-bottom:0.5rem;"><a href="article-tennis-de-table-eps.html" style="color:#0f172a;text-decoration:none;">🏓 Enseigner le Tennis de Table en EPS : Effets, Poussette, Topspin &amp; Tournois</a></h3>
                    <p style="font-size:0.85rem;color:#475569;">Prise de raquette, lecture des effets, situations d'apprentissage sur tables et gestion d'une classe nombreuse.</p>
                    <a href="article-tennis-de-table-eps.html" style="font-size:0.84rem;font-weight:800;color:#006233;text-decoration:none;">Consulter le guide Ping-Pong →</a>
                </article>

                <article class="content-card">
                    <div style="font-size:0.75rem;font-weight:800;color:#b45309;text-transform:uppercase;margin-bottom:0.35rem;">Cycles Collège &amp; Lycée</div>
                    <h3 style="font-size:1.02rem;margin-bottom:0.5rem;"><a href="cycle-badminton-college-eps-maroc.html" style="color:#0f172a;text-decoration:none;">📄 Cycles Badminton Collège &amp; Lycée (OP 2009 &amp; OP 2007)</a></h3>
                    <p style="font-size:0.85rem;color:#475569;">Séquences progressives de 10 séances pour le Collège et le Lycée qualifiant avec fiches d'observation.</p>
                    <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
                        <a href="cycle-badminton-college-eps-maroc.html" style="font-size:0.84rem;font-weight:800;color:#b45309;text-decoration:none;">Cycle Collège →</a>
                        <a href="cycle-badminton-lycee-eps-maroc.html" style="font-size:0.84rem;font-weight:800;color:#1d4ed8;text-decoration:none;">Cycle Lycée →</a>
                    </div>
                </article>

                <article class="content-card">
                    <div style="font-size:0.75rem;font-weight:800;color:#991b1b;text-transform:uppercase;margin-bottom:0.35rem;">Navigation Portail APS</div>
                    <h3 style="font-size:1.02rem;margin-bottom:0.5rem;"><a href="hub-aps-sports-eps-maroc.html" style="color:#0f172a;text-decoration:none;">🏆 Retour au Hub Central des APS en EPS Maroc</a></h3>
                    <p style="font-size:0.85rem;color:#475569;">Accédez aux 11 silos APS complets (Handball, Basket, Volley, Foot, Gym, Vitesse, Durée, Poids, Longueur/Triple, Hauteur, Raquettes).</p>
                    <a href="hub-aps-sports-eps-maroc.html" style="font-size:0.84rem;font-weight:800;color:#991b1b;text-decoration:none;">Ouvrir le Hub APS →</a>
                </article>
            </div>
        </section>

    </main>

    <!-- ================================================================
         SCRIPT INTERACTIF : STUDIO 48 CYCLES (BADMINTON + PING-PONG) + CALCULATEUR + EXPORT WORD/PDF
         ================================================================ -->
    <script>
    (function() {{
      const GRADE_META = {{
        "1AC": {{
          label: "1ère Année Collège (1AC)",
          ref: "Orientations Pédagogiques 2009 (Note 143-09)",
          oti: "L'élève de la 1ère année doit pouvoir acquérir une motricité correcte lui permettant de s'adapter aux exigences des situations (forme et rythme) et s'intégrer dans le groupe.",
          otcBad: "Au terme du cycle de Badminton en 1AC, l'élève doit pouvoir réaliser un service réglementaire bas/haut et maintenir un échange continu avant de chercher à envoyer le volant loin de l'adversaire sur demi-terrain, tout en assurant l'arbitrage de base (21 pts).",
          otcPing: "Au terme du cycle de Tennis de Table en 1AC, l'élève doit pouvoir servir réglementairement (paume ouverte, lancer vertical) et maintenir un échange contrôlé en coup droit et en revers avant de placer la balle à gauche ou à droite de l'adversaire, tout en arbitrant une manche en 11 pts.",
          bareme: "Habiletés motrices : 12 pts | Connaissances : 3 pts | Comportement & Rôles : 5 pts (/20)"
        }},
        "2AC": {{
          label: "2ème Année Collège (2AC)",
          ref: "Orientations Pédagogiques 2009 (Note 143-09)",
          oti: "L'élève de la 2ème année doit pouvoir ajuster l'énergie physique et la maîtriser et fournir l'effort et l'orienter pour effectuer des réalisations coordonnées et organisées, et communiquer avec les autres.",
          otcBad: "Au terme du cycle de Badminton en 2AC, l'élève doit pouvoir déplacer son adversaire sur l'axe Avant/Arrière en alternant dégagé profond et amorti court avec replacement au centre (« T »), tout en arbitrant selon le carré Pair/Impair.",
          otcPing: "Au terme du cycle de Tennis de Table en 2AC, l'élève doit pouvoir construire le point en déplaçant l'adversaire sur la largeur de la table (Coup Droit / Revers) et conclure une balle haute par une frappe placée.",
          bareme: "Habiletés motrices : 12 pts | Connaissances : 3 pts | Comportement & Rôles : 5 pts (/20)"
        }},
        "3AC": {{
          label: "3ème Année Collège (3AC)",
          ref: "Orientations Pédagogiques 2009 (Note 143-09)",
          oti: "L'élève de la 3ème année doit pouvoir ajuster les éléments de l'acte moteur et l'adapter aux différentes situations en fonction de ses exigences organisationnelles et réglementaires, et s'exercer sur la pratique des droits et devoirs pour réaliser un projet sportif individuel ou collectif.",
          otcBad: "Au terme du cycle de Badminton en 3AC, l'élève doit pouvoir créer et exploiter un volant favorable pour rompre l'échange (smash ou amorti) dans les zones bonifiées, et gérer un tournoi en montante-descendante.",
          otcPing: "Au terme du cycle de Tennis de Table en 3AC, l'élève doit pouvoir utiliser un service placé (coupé ou rapide) et enchaîner poussette et attaque en coup droit pour remporter ses duels en montante-descendante.",
          bareme: "Habiletés motrices : 12 pts | Connaissances : 3 pts | Comportement & Rôles : 5 pts (/20)"
        }},
        "TC": {{
          label: "Tronc Commun (TC)",
          ref: "Orientations Pédagogiques 2007 (Note 142-10)",
          oti: "L'élève du Tronc Commun doit pouvoir maîtriser les composantes du comportement moteur et pouvoir s'adapter aux différentes situations et faire face à ses défis et accepter l'intégration dans le groupe.",
          otcBad: "Maîtriser les trajectoires variées (dégagé, amorti, drive, smash) et le replacement au « T » pour imposer un rapport de force favorable en simple selon le règlement BWF.",
          otcPing: "Maîtriser la régularité et l'orientation des trajectoires en coup droit et revers (poussette, bloc, attaque) pour déplacer l'adversaire et rompre l'échange selon le règlement ITTF.",
          bareme: "Habiletés motrices : 14 pts | Connaissances : 3 pts | Comportement & Rôles : 3 pts (/20)"
        }},
        "1BAC": {{
          label: "1ère Année Baccalauréat (1Bac)",
          ref: "Orientations Pédagogiques 2007 (Note 142-10)",
          oti: "L'élève de la 1ère année Bac doit pouvoir confronter les situations motrices grâce à l'adéquation des différents éléments de l'acte moteur et la planification de différents types d'effort physique individuel ou collectif.",
          otcBad: "Construire un schéma tactique d'ouverture d'espace (combinaison Fixation Fond + Amorti ou Amorti + Lob/Smash) et varier le service court/long pour prendre l'initiative dès les 3 premières frappes.",
          otcPing: "Exploiter les effets (service coupé/lifté, poussette tendue et topspin coup droit) pour provoquer une balle haute favorable et conclure le point en situation de match officiel ITTF.",
          bareme: "Habiletés motrices : 14 pts | Connaissances : 3 pts | Comportement & Rôles : 3 pts (/20)"
        }},
        "2BAC": {{
          label: "2ème Année Baccalauréat (2Bac)",
          ref: "Orientations Pédagogiques 2007 (Note 142-10)",
          oti: "L'élève de la 2ème année Bac doit pouvoir analyser différentes situations et interactions motrices et s'intégrer volontairement dans la planification et la réalisation de projets individuels et collectifs.",
          otcBad: "Conduire et adapter un projet tactique personnel en match officiel BWF (21 pts) en variant les rythmes, les hauteurs et les cibles (4 coins) en fonction du profil adverse diagnostiqué.",
          otcPing: "Conduire et adapter un projet tactique personnel en match officiel ITTF (11 pts) en combinant services à effets, variations de vitesse (topspin/bloc) et lecture du jeu adverse.",
          bareme: "Habiletés motrices : 14 pts | Connaissances : 3 pts | Comportement & Rôles : 3 pts (/20)"
        }}
      }};

      const LEVEL_PROFILES_BAD = {{
        1: {{
          name: "Niveau 1 · Débutant (Renvoi explosif & Prise poêle à frire)",
          diag: "L'élève tient la raquette de face (« poêle à frire »), attend que le volant descende bas devant lui, renvoie systématiquement en cloche au centre et reste statique après sa frappe.",
          trans: "Adopter la prise universelle, frapper le volant haut devant soi en se profilant (position de l'archer) et assurer un service réglementaire (≤ 1,15m) suivi de 5 échanges continus.",
          diff: "Demi-terrain longitudinal, zone neutre centrale interdite matérialisée par des plots pour obliger à viser court ou long."
        }},
        2: {{
          name: "Niveau 2 · Initié (Échange orienté Avant / Arrière)",
          diag: "L'élève renvoie le volant mais sans profondeur suffisante au dégagé, ce qui l'expose aux attaques, et oublie de se replacer au centre (« T ») après sa frappe.",
          trans: "Alterner intentionnellement le dégagé profond (couloir de fond) et l'amorti court derrière le filet en se replaçant systématiquement au « T » central avec reprise d'appui (Split-step).",
          diff: "Zones Bonus à 3 points (zone avant 1,98m et couloir de fond 76cm) + plot central « T » à toucher du pied entre deux frappes."
        }},
        3: {{
          name: "Niveau 3 · Confirmé (Création & Exploitation du Volant Favorable)",
          diag: "L'élève déplace son adversaire mais n'ose pas accélérer en smash ou en rush sur un volant haut et court par peur de mettre le volant dans le filet.",
          trans: "Reconnaître immédiatement un volant favorable (mi-court haut) pour déclencher un smash descendant ou un amorti tranchant grâce au fouetté de pronation de l'avant-bras.",
          diff: "Bonus +3 pts sur tout point gagné en smash ou sur enchaînement Service Court + Rush / Dégagé + Amorti."
        }},
        4: {{
          name: "Niveau 4 · Expert / AS (Stratégie des 4 Coins & Variation du Rythme)",
          diag: "L'élève maîtrise toute la palette technique mais utilise un schéma stéréotypé prévisible par un adversaire de bon niveau.",
          trans: "Masquer ses intentions (retard de frappe, même préparation pour dégagé/amorti/smash), exploiter les 4 coins (Av-D, Av-G, Ar-D, Ar-G) et adapter sa tactique au point faible adverse.",
          diff: "Matchs sur terrain complet avec fiche de scouting tactique tenue par un élève-coach."
        }}
      }};

      const LEVEL_PROFILES_PING = {{
        1: {{
          name: "Niveau 1 · Débutant (Balle qui s'envole / Continuité de l'échange)",
          diag: "L'élève tient la raquette trop crispée, ouvre excessivement la palette vers le plafond (balles qui sortent en « chandelle ») et sert illégalement à la volée.",
          trans: "Adopter la prise poignée de main (orthodoxe), servir réglementairement (paume ouverte + lancer 16 cm) et contrôler l'inclinaison de la palette en coup droit et en revers.",
          diff: "Échanges coopératifs puis compétitifs avec fil tendu 25 cm au-dessus du filet pour abaisser les trajectoires."
        }},
        2: {{
          name: "Niveau 2 · Initié (Placement Gauche / Droite & Déplacement latéral)",
          diag: "L'élève assure l'échange au centre de la table mais reste pieds collés au sol et ne cherche pas à déplacer l'adversaire dans les angles.",
          trans: "Se déplacer en petits pas chassés en gardant les genoux fléchis et orienter ses frappes alternativement dans le coin Coup Droit et le coin Revers adverses.",
          diff: "Deux cibles d'angles (30 cm × 30 cm) dessinées à la craie ou par feuilles aux coins du fond de table valant 3 points."
        }},
        3: {{
          name: "Niveau 3 · Confirmé (Poussette, Bloc & Attaque sur Balle Haute)",
          diag: "L'élève renvoie la balle en poussette mais hésite à accélérer (frappe à plat ou topspin) lorsque l'adversaire lui renvoie une balle haute mi-longue.",
          trans: "Identifier immédiatement une balle haute favorable pour déclencher une attaque franche du coup droit (frappe à plat au sommet du rebond ou topspin brossé).",
          diff: "Bonus +3 pts sur tout point conclu par une attaque franche de coup droit ou de revers."
        }},
        4: {{
          name: "Niveau 4 · Expert / AS (Services à Effets, Topspin & Schéma 3ème Balle)",
          diag: "L'élève attaque mais commet des fautes face aux balles coupées ou ne capitalise pas sur son propre service.",
          trans: "Construire le schéma tactique « Service coupé ou latéral + Attaque 3ème balle en Topspin » et lire l'effet adverse (ouvrir sur coupé / fermer en bloc sur topspin).",
          diff: "Matchs officiels en 11 pts avec obligation d'annoncer son schéma tactique de service au coach avant chaque série de 2 services."
        }}
      }};

      const SESSIONS_BADMINTON = [
        {{
          num: 1,
          short: "Évaluation Diagnostique & Tournoi Montante-Descendante",
          obj: "Évaluer le niveau initial de maîtrise technique (service, continuité, trajectoires) et tactique lors d'un tournoi de brassage en montante-descendante et constituer 4 groupes de niveau.",
          echauff: "Course légère autour des terrains, pas chassés latéraux, mobilisation épaules/poignets avec raquette, jonglages CD/Revers (10 min).",
          fond: "Tournoi en Montante-Descendante sur demi-terrains (ou terrains complets) : matchs de 4 min. Observation par triade (Joueur A, Joueur B, Observateur C) : nombre de services réussis sur 5, longueur moyenne des échanges et zones touchées (Avant / Centre / Fond).",
          critComp: "Remplir fidèlement la fiche diagnostique, appliquer le score pair/impair et identifier son niveau de départ (Niveau 1 à 4).",
          critReuss: "Disputer au moins 4 matchs de 4 min et obtenir son profil initial (continuité vs rupture).",
          retour: "Regroupement, constitution des 4 groupes de besoin et rappel de la sécurité (espacement entre les terrains)."
        }},
        {{
          num: 2,
          short: "Prise Universelle, Service Réglementaire BWF (≤ 1,15m) & Continuité",
          obj: "Abandonner la prise « poêle à frire » au profit de la prise universelle et maîtriser le service court bas et le service long haut conformes à la règle BWF (contact ≤ 1,15m).",
          echauff: "Déplacements en fentes avant (jambe côté raquette), rotation des poignets en « 8 » et jonglages alternés CD/Revers (12 min).",
          fond: "Atelier 1 : Cibles de service — viser la zone avant (derrière la ligne à 1,98m) en service court ras du filet et le couloir de fond en service long haut (série de 10 services). Atelier 2 : Duel avec départ obligatoire par un service validé par l'arbitre.",
          critComp: "Tenir le volant par la base/plumes devant soi, frapper sous 1,15m (sous les côtes flottantes) les deux pieds au sol dans le carré.",
          critReuss: "Réussir au moins 8 services sur 10 dans les zones cibles (4 courts + 4 longs).",
          retour: "Étirements épaules/avant-bras et quiz sur les carrés de service Pair (Droite) et Impair (Gauche)."
        }},
        {{
          num: 3,
          short: "Le Dégagé Haut de Fond de Court (Position de l'Archer & Pronation)",
          obj: "Acquérir le dégagé haut et profond (Clear) pour repousser l'adversaire au fond du terrain et se donner le temps de se replacer.",
          echauff: "Pas chassés de profil du centre vers le fond du court + lancers de volants à bras cassé par-dessus l'épaule (12 min).",
          fond: "Situation « Repousser au mur du fond » : l'élève A sert haut, l'élève B se profile rapidement (« position de l'archer », main libre pointant le volant) et frappe le volant au point le plus haut avec fouetté de pronation. Tout volant tombant dans le couloir de fond (76 cm) vaut 3 points.",
          critComp: "Se déplacer en pas chassés de profil (jamais à reculons), frapper devant l'épaule directrice bras tendu.",
          critReuss: "Envoyer au moins 6 dégagés sur 10 dans le tiers arrière du terrain adverse.",
          retour: "Relâchement de l'épaule et retour sur l'effet levier de la pronation de l'avant-bras."
        }},
        {{
          num: 4,
          short: "Le Replacement au Centre (« T ») & la Reprise d'Appui (Split-Step)",
          obj: "Automatiser le replacement systématique au centre stratégique (« T ») après chaque frappe et la reprise d'appui dynamique au moment de l'impact adverse.",
          echauff: "Jeu du miroir en pas chassés et fentes à partir du « T » central vers les 4 coins (12 min).",
          fond: "Match à thème « Le Roi du T » : une coupelle souple est placée au centre de chaque demi-terrain. Après chaque frappe, le joueur doit revenir toucher ou encadrer la coupelle centrale avant que l'adversaire ne frappe. Si un joueur est surpris hors du « T » sur un point perdant, le point compte double pour l'adversaire.",
          critComp: "Pousser fort sur la jambe de fente pour revenir au centre dès la fin de sa frappe et marquer un léger sursaut (Split-step).",
          critReuss: "Se replacer au « T » sur au moins 80% des frappes d'un match en 11 points.",
          retour: "Étirements quadriceps/mollets et analyse de l'économie d'énergie par le replacement central."
        }},
        {{
          num: 5,
          short: "L'Amorti Court (Drop Shot) & le Contre-Amorti au Filet",
          obj: "Maîtriser l'amorti de fond de court et le contre-amorti au filet en fente avant pour faire plonger le volant dans la zone avant adverse.",
          echauff: "Échanges courts dans la zone des 1,98m (« mini-badminton ») en fente avant bras tendu (12 min).",
          fond: "Situation « Zone Avant = 3 Points » : la zone située entre le filet et la ligne de service court (1,98m) est bonifiée. L'élève cherche à ralentir sa tête de raquette à l'impact pour faire tomber le volant juste derrière le filet. En zone avant, interdiction de lever le volant en cloche au centre.",
          critComp: "Attaquer la zone avant en fente (pied côté raquette devant), talon posé en premier, tamis haut au-dessus de la bande du filet.",
          critReuss: "Marquer au moins 3 points bonifiés (3 pts) par match dans la zone avant.",
          retour: "Étirements des adducteurs et fessiers ; comparaison biomécanique entre dégagé et amorti."
        }},
        {{
          num: 6,
          short: "Combiner Dégagé Long & Amorti Court (Ouvrir l'Axe Avant / Arrière)",
          obj: "Construire le point en déplaçant l'adversaire d'avant en arrière (Fixer au fond puis amortir, ou fixer devant puis lober au fond).",
          echauff: "Routine à 2 : 1 dégagé long + 1 amorti court + 1 lob haut au fond avec replacement au « T » (12 min).",
          fond: "Match à contrat « Interdit de viser 2 fois la même zone » : le terrain adverse est divisé en Zone Avant et Zone Arrière (la zone centrale neutre ne rapporte aucun point direct). Si un joueur marque en enchaînant Fond puis Avant (ou Avant puis Fond), il obtient un bonus de +3 points.",
          critComp: "Observer la position de l'adversaire avant de frapper : s'il recule, amortir ; s'il colle au filet, dégager/lober au fond.",
          critReuss: "Réussir au moins 4 enchaînements victorieux Avant/Arrière sur un match de 5 minutes.",
          retour: "Bilan tactique par binôme avec l'observateur et récupération."
        }},
        {{
          num: 7,
          short: "Le Smash & le Rush au Filet : Exploiter le Volant Favorable",
          obj: "Identifier un volant haut et mi-court (« volant cadeau ») pour déclencher une attaque descendante (Smash ou Rush) et rompre l'échange.",
          echauff: "Lancers fouettés vers le sol + exercices de smash sur volants lancés haut à mi-court (12 min).",
          fond: "Situation « Le Punisseur » : dès qu'un joueur renvoie un volant haut qui ne dépasse pas le milieu du terrain, l'adversaire annonce « ATTAQUE ! » et déclenche un smash fouetté vers le bas (en visant les lignes latérales ou l'épaule côté raquette de l'adversaire). Tout smash gagnant vaut 3 points.",
          critComp: "Se placer vite derrière le volant, frapper très haut en avant du corps avec pronation explosive et rabattement du poignet.",
          critReuss: "Convertir au moins 60% des volants favorables en points gagnants sans faute dans le filet.",
          retour: "Étirements complets du haut du corps et rappel de la différence entre volant d'attente et volant d'attaque."
        }},
        {{
          num: 8,
          short: "Le Jeu Latéral (Drive Tendu & Écartement Gauche / Droite)",
          obj: "Utiliser les frappes tendues (Drive coup droit et revers) et ouvrir les angles latéraux pour déborder l'adversaire sur la largeur (5,18m).",
          echauff: "Échanges tendus rapides à mi-court (raquette haute devant soi, prise courte sur le manche) (12 min).",
          fond: "Match « Les Couloirs Latéraux à 3 Points » : deux couloirs latéraux de 80 cm sont tracés à droite et à gauche du terrain de simple. L'élève utilise le drive tendu et les frappes croisées pour sortir l'adversaire de son axe central.",
          critComp: "Garder la tête de raquette haute devant le sternum, utiliser la supination au revers et la pronation au coup droit.",
          critReuss: "Marquer au moins 3 points gagnants dans les couloirs latéraux par match.",
          retour: "Analyse des 4 coins du terrain (Av-D, Av-G, Ar-D, Ar-G) avec l'élève-coach."
        }},
        {{
          num: 9,
          short: "Tournoi Pré-Sommatif Officiel BWF & Coaching Tactique",
          obj: "Stabiliser son projet de jeu personnel en conditions réelles de tournoi BWF (sets en 21 pts ou 15 pts) et valider les compétences d'arbitrage et d'observation.",
          echauff: "Échauffement autonome dirigé par les capitaines de terrain (12 min).",
          fond: "Tournoi par poules homogènes issues de la Montante-Descendante. Chaque joueur dispute 3 matchs arbitrés officiellement avec feuille de relevé des Zones Bonus (1 pt / 3 pts). Entre le 1er et le 2ème set (ou à 11 pts), l'observateur dispose de 45 secondes pour donner 1 conseil tactique ciblé.",
          critComp: "Adapter sa stratégie au profil adverse (attaquer le revers, varier service court/long) et arbitrer sans erreur.",
          critReuss: "Appliquer la consigne du coach et présenter une feuille de match complète.",
          retour: "Publication des poules définitives pour l'évaluation sommative de la séance 10."
        }},
        {{
          num: 10,
          short: "Évaluation Sommative Officielle Badminton (/20 — OP 2009 / OP 2007)",
          obj: "Évaluer en situation de tournoi officiel par poules de niveau l'efficacité technico-tactique, le gain des duels, les connaissances BWF et l'arbitrage (/20).",
          echauff: "Échauffement libre structuré par poule et tirs de réglage (services, dégagés, amortis, smashs) (12 min).",
          fond: "Tournoi d'évaluation sommative par poules de 4 joueurs (3 matchs par élève + 3 arbitrages/observations). Notation sur 20 points conforme aux OP 2009 (Collège : 12+3+5) ou OP 2007 (Lycée : 14+3+3).",
          critComp: "Respecter intégralement le règlement BWF, faire preuve de fair-play et donner le maximum dans chaque duel.",
          critReuss: "Valider l'Objectif Terminal du Cycle (OTC) de son niveau scolaire.",
          retour: "Communication des notes et bilan final du cycle de Badminton."
        }}
      ];

      const SESSIONS_PINGPONG = [
        {{
          num: 1,
          short: "Évaluation Diagnostique & Tournoi Montante-Descendante sur Tables",
          obj: "Diagnostiquer le niveau initial de maîtrise (tenue de raquette, service, régularité CD/Revers) lors d'un tournoi en montante-descendante et former 4 groupes de niveau.",
          echauff: "Course légère, pas chassés autour des tables, mobilisation poignets/épaules et jonglages sur la palette (CD / Revers / Tranche) (10 min).",
          fond: "Tournoi Montante-Descendante par rotations de 4 min sur les tables (Table 1 = Ligue Or à Table N). Observation par triade : légalité du service, nombre moyen de rebonds par échange et orientation des balles.",
          critComp: "Tenir la feuille de score en 11 points (rotation du service tous les 2 points) et identifier son groupe de niveau.",
          critReuss: "Jouer 4 matchs diagnostiques et établir son profil initial.",
          retour: "Constitution des 4 groupes de besoin et règles de sécurité autour des tables."
        }},
        {{
          num: 2,
          short: "Prise Orthodoxe & Service Réglementaire ITTF (Paume Ouverte · Lancer ≥ 16 cm)",
          obj: "Stabiliser la prise « poignée de main » (index le long du revers, pouce sur le coup droit) et maîtriser le service réglementaire ITTF 2.6 (lancer vertical ≥ 16 cm derrière la ligne de fond).",
          echauff: "Déplacements latéraux en garde basse + jonglages alternés CD/Revers en marchant (12 min).",
          fond: "Atelier 1 : Le service ITTF — balle immobile sur paume ouverte derrière la ligne blanche, lancer vertical d'au moins 16 cm (hauteur d'un filet) et frappe à la descente pour viser une zone courte ou longue. Atelier 2 : Matchs en 7 points où tout service réglementaire placé dans la cible rapporte 2 points.",
          critComp: "Ne jamais cacher la balle ni la frapper directement dans la main (« service cuillère » interdit).",
          critReuss: "Réussir au moins 8 services réglementaires sur 10 dans les zones cibles.",
          retour: "Quiz rapide sur la règle du « Let » (balle qui touche le filet au service = à remettre) et la rotation tous les 2 points."
        }},
        {{
          num: 3,
          short: "Régularité en Coup Droit & Revers : Contrôler l'Inclinaison de la Palette",
          obj: "Supprimer les balles qui s'envolent (« chandelles ») en réglant l'angle de la palette et en frappant la balle au sommet du rebond devant soi.",
          echauff: "Échanges coopératifs à mi-table en coup droit puis en revers (contrat 20 échanges sans chute) (12 min).",
          fond: "Situation « Le Tunnel Tendu » : un fil élastique ou ruban est tendu 25 cm au-dessus du filet. Les deux élèves doivent réaliser 10 échanges consécutifs (en diagonal CD/CD puis RV/RV) en faisant passer la balle entre le filet et le ruban avant d'ouvrir le point librement.",
          critComp: "Fléchir les jambes pour mettre les yeux à hauteur de la balle et orienter légèrement la palette vers l'avant-bas au sommet du rebond.",
          critReuss: "Maintenir 10 échanges tendus consécutifs en Coup Droit et en Revers.",
          retour: "Étirements avant-bras/épaules et synthèse sur la relation inclinaison de palette / trajectoire."
        }},
        {{
          num: 4,
          short: "Déplacer l'Adversaire Gauche / Droite (Jeu de l'Essuie-Glace & Pas Chassés)",
          obj: "Ouvrir les angles latéraux de la table (coin Coup Droit / coin Revers) et se déplacer en petits pas chassés sans croiser les pieds.",
          echauff: "Pas chassés rapides d'un coin à l'autre de la table en touchant les deux coins avec la main libre (12 min).",
          fond: "Situation « Les Coins à 3 Points » : deux cibles (feuilles A4 ou zones tracées à la craie de 35×35 cm) sont placées dans les deux coins arrière de chaque demi-table. Tout point marqué en touchant l'une des deux cibles d'angle rapporte 3 points immédiats.",
          critComp: "Orienter les épaules et le tamis vers la cible choisie tout en revenant au centre de la table après chaque frappe.",
          critReuss: "Toucher au moins 4 fois les cibles d'angles au cours d'une manche en 11 points.",
          retour: "Retour au calme et analyse de la prise d'information sur le placement adverse."
        }},
        {{
          num: 5,
          short: "La Poussette Contrôlée (Coupé) & le Jeu Court derrière le Filet",
          obj: "Maîtriser la poussette (coup droit et revers) en passant sous la balle pour lui imprimer un effet coupé (Backspin) qui empêche l'adversaire d'attaquer.",
          echauff: "Échanges courts de poussettes près du filet (interdit de reculer à plus de 50 cm de la table) (12 min).",
          fond: "Duel « Poussette + Ouverture » : les 4 premières frappes de chaque échange se font obligatoirement en poussette coupée (palette ouverte passant d'arrière en avant sous la balle). À partir de la 5ème touche, le point est libre et tout point gagné dans les angles vaut 3 points.",
          critComp: "Avancer le pied droit (pour un droitier en CD) sous la table, accompagner la balle avec souplesse du poignet sans geste brusque.",
          critReuss: "Réussir 8 poussettes basses sur 10 sans lever la balle au-dessus de 20 cm du filet.",
          retour: "Explication physique de l'effet coupé (Backspin) et de la réaction de la balle sur la raquette adverse."
        }},
        {{
          num: 6,
          short: "La Frappe d'Attaque à Plat (Smash) sur Balle Haute Favorable",
          obj: "Identifier immédiatement une balle haute (« balle cadeau ») pour avancer dans la balle et conclure le point par une frappe accélérée à plat au sommet du rebond.",
          echauff: "Multi-balles par binôme : le partenaire distribue une balle haute que l'attaquant smashe dans les angles (12 min).",
          fond: "Match « Punir la Balle Haute » : dès qu'une balle rebondit plus haut que le filet (15,25 cm), l'adversaire annonce « TOP ! » et tente une frappe d'attaque accélérée du haut vers l'avant. Un smash gagnant vaut 3 points ; un smash tenté de manière cohérente mais dehors ne fait pas perdre de point bonus.",
          critComp: "Se placer vite en pas chassés, frapper la balle au point culminant du rebond avec transfert du poids du corps de l'arrière vers l'avant.",
          critReuss: "Convertir au moins 6 balles hautes sur 10 en points gagnants.",
          retour: "Étirements et distinction entre balle de construction et balle de rupture."
        }},
        {{
          num: 7,
          short: "Initiation au Topspin Coup Droit (Effet Lifté) & au Bloc de Défense",
          obj: "Acquérir le brossage ascendant de la balle en Topspin coup droit (rotation avant qui fait plonger la balle sur la table) et le bloc court en opposition.",
          echauff: "Brossage de la balle contre le bord de la raquette puis échanges liftés en diagonale CD (12 min).",
          fond: "Atelier tournant : l'élève A attaque en Topspin coup droit (départ main basse sous le niveau de la table, brossage rapide vers le haut et l'avant palette fermée) ; l'élève B oppose un bloc court passif/actif juste après le rebond en fermant sa palette. Changement de rôle toutes les 3 minutes, puis match à thème.",
          critComp: "En Topspin : fléchir les jambes et accélérer l'avant-bras en frôlant le sommet de la balle. En Bloc : amortir devant soi sans reculer.",
          critReuss: "Réussir 5 topspins consécutifs sur la table et 5 blocs contrôlés.",
          retour: "Comparaison visuelle des trajectoires Coupée (flottante) vs Liftée (plongeante)."
        }},
        {{
          num: 8,
          short: "Services à Effets (Coupé / Lifté / Latéral) & Schéma Tactique « 3ème Balle »",
          obj: "Prendre l'initiative dès son service grâce aux effets et enchaîner par une attaque sur le retour adverse (schéma Service + Attaque 3ème balle).",
          echauff: "Atelier de services à effets vers cibles courtes et longues (12 min).",
          fond: "Situation « Le Serveur Stratège » : avant ses 2 services réglementaires, le serveur annonce discrètement à l'arbitre son intention (ex. : Service coupé court au centre + Attaque 3ème balle dans le coin revers). Si le point est gagné dès la 3ème balle selon le plan annoncé, il vaut 3 points.",
          critComp: "Masquer l'effet au moment de l'impact du poignet et se replacer immédiatement en position d'attaque.",
          critReuss: "Remporter au moins 65% des points sur ses propres séries de 2 services.",
          retour: "Analyse avec l'arbitre de la lecture des services adverses (regarder l'orientation de la palette à l'impact)."
        }},
        {{
          num: 9,
          short: "Tournoi Pré-Sommatif ITTF (Manches en 11 pts) & Coaching Tactique",
          obj: "Exercer son projet tactique en conditions officielles ITTF (manches de 11 pts, 2 pts d'écart, temps mort coaching d'une minute) et valider l'arbitrage.",
          echauff: "Échauffement autonome dirigé par table et réglages CD/Revers/Services (12 min).",
          fond: "Tournoi par poules de niveau de 4 joueurs (ou Ronde Italienne par équipes sur les tables). Feuille de match officielle avec relevé des Zones Bonus (1 pt / 3 pts). Chaque joueur bénéficie d'un Temps Mort Tactique de 45 secondes conseillé par son élève-coach.",
          critComp: "Gérer la pression à 9-9 et 10-10 (avantage 2 pts), adapter son service au point faible adverse.",
          critReuss: "Valider sa feuille d'observation tactique et son classement de poule.",
          retour: "Annonce des poules définitives pour l'évaluation sommative de la séance 10."
        }},
        {{
          num: 10,
          short: "Évaluation Sommative Officielle Tennis de Table (/20 — OP 2009 / OP 2007)",
          obj: "Évaluer en tournoi officiel par poules homogènes la maîtrise technico-tactique, le gain des matchs, les connaissances ITTF et l'arbitrage (/20).",
          echauff: "Échauffement structuré par poule sur les tables (12 min).",
          fond: "Tournoi sommatif officiel en manches de 11 points (3 matchs par élève + 3 arbitrages officiels). Évaluation sur 20 points conforme aux OP 2009 (Collège : 12+3+5) ou OP 2007 (Lycée : 14+3+3).",
          critComp: "Respecter scrupuleusement la règle du service 16 cm, la rotation tous les 2 points et l'éthique sportive.",
          critReuss: "Atteindre l'Objectif Terminal du Cycle (OTC) de son niveau scolaire.",
          retour: "Bilan final du cycle de Tennis de Table et remise des résultats."
        }}
      ];

      let currentSport = "badminton";
      let currentGrade = "1AC";
      let currentLevel = 1;
      let currentSessionIdx = 0;

      function getCurrentSessions() {{
        return currentSport === "badminton" ? SESSIONS_BADMINTON : SESSIONS_PINGPONG;
      }}

      function getCurrentLevelProfiles() {{
        return currentSport === "badminton" ? LEVEL_PROFILES_BAD : LEVEL_PROFILES_PING;
      }}

      function getSportLabel() {{
        return currentSport === "badminton" ? "Badminton (BWF · 21 pts)" : "Tennis de Table (ITTF · 11 pts)";
      }}

      function buildSidebarList() {{
        const listEl = document.getElementById("rqSessionList");
        if (!listEl) return;
        const sessions = getCurrentSessions();
        listEl.innerHTML = sessions.map((s, idx) => `
          <button type="button" class="session-item-btn ${{idx === currentSessionIdx ? 'active' : ''}}" onclick="selectRaquetteSession(${{idx}})">
            <span class="session-num">Séance ${{s.num}} / 10 · ${{currentSport === 'badminton' ? '🏸 Bad' : '🏓 Ping'}}</span>
            <span class="session-title-short">${{s.short}}</span>
          </button>
        `).join("");
      }}

      function buildSingleSessionHTML(s, gMeta, lvl, prof, etab, eff, duree) {{
        const sportTitle = getSportLabel();
        const otcText = currentSport === "badminton" ? gMeta.otcBad : gMeta.otcPing;
        return `
          <table class="a4-header-table">
            <tr>
              <th colspan="4" style="text-align:center;font-size:0.92rem;">ROYAUME DU MAROC · MINISTÈRE DE L'ÉDUCATION NATIONALE, DU PRÉSCOLAIRE ET DES SPORTS<br>FICHE DE PRÉPARATION DE SÉANCE D'ÉDUCATION PHYSIQUE ET SPORTIVE — ${{sportTitle.toUpperCase()}}</th>
            </tr>
            <tr>
              <td><strong>APS :</strong> ${{sportTitle}}</td>
              <td><strong>Niveau Scolaire :</strong> ${{gMeta.label}}</td>
              <td><strong>Enseignant(e) :</strong> ${{prof}}</td>
              <td><strong>Séance :</strong> N° ${{s.num}} / 10</td>
            </tr>
            <tr>
              <td><strong>Référentiel :</strong> ${{gMeta.ref}}</td>
              <td><strong>Profil de Classe :</strong> ${{lvl.name}}</td>
              <td><strong>Établissement :</strong> ${{etab}}</td>
              <td><strong>Durée / Effectif :</strong> ${{duree}} · ${{eff}}</td>
            </tr>
            <tr>
              <td colspan="4"><strong>OTI (${{currentGrade}}) :</strong> ${{gMeta.oti}}</td>
            </tr>
            <tr>
              <td colspan="4"><strong>OTC (${{sportTitle}} — ${{currentGrade}}) :</strong> ${{otcText}}</td>
            </tr>
            <tr>
              <td colspan="4" style="background:#f0fdfa;"><strong>Objectif de la Séance N°${{s.num}} (${{s.short}}) :</strong> ${{s.obj}}</td>
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
                <td><strong>Prise en main &amp; Échauffement Spécifique :</strong><br>${{s.echauff}}<br><em>Diagnostic du groupe :</em> ${{lvl.diag}}</td>
                <td>• Respecter l'alignement et les consignes de sécurité.<br>• Mobiliser progressivement poignets, coudes, épaules et appuis en pas chassés.</td>
                <td>• 100% des élèves engagés sans temps mort.<br>• Fréquence cardiaque élevée et articulations prêtes.</td>
              </tr>
              <tr>
                <td><span class="a4-phase-badge">2. Partie Fondamentale</span><br><strong>35 à 38 min</strong></td>
                <td><strong>Situation Fondamentale &amp; But de la Tâche :</strong><br>${{s.fond}}<br><br><strong>Transformation visée (${{lvl.name}}) :</strong> ${{lvl.trans}}</td>
                <td>• ${{s.critComp}}<br>• Assurer les rôles d'arbitre officiel (${{currentSport === 'badminton' ? 'BWF : carré Pair=Droite / Impair=Gauche, service ≤ 1,15m' : 'ITTF : lancer ≥ 16 cm paume ouverte, changement tous les 2 pts'}}) et de marqueur des Zones Bonus.</td>
                <td><strong>Critère de réussite :</strong><br>• ${{s.critReuss}}<br><br><strong>Variable de différenciation :</strong><br>• ${{lvl.diff}}</td>
              </tr>
              <tr>
                <td><span class="a4-phase-badge">3. Partie Finale</span><br><strong>5 à 7 min</strong></td>
                <td><strong>Retour au calme, Bilan &amp; Rangement :</strong><br>${{s.retour}}</td>
                <td>• Étirements passifs courts et récupération respiratoire.<br>• Verbalisation par les élèves des règles d'action efficaces.</td>
                <td>• Ramassage complet des volants/balles et rangement des raquettes/filets.<br>• Transition vers la séance suivante.</td>
              </tr>
            </tbody>
          </table>
        `;
      }}

      window.renderRaquetteSheet = function() {{
        const gMeta = GRADE_META[currentGrade];
        const lvl = getCurrentLevelProfiles()[currentLevel];
        const sessions = getCurrentSessions();
        const s = sessions[currentSessionIdx];
        const prof = document.getElementById("rqProfInput").value || "Prof. EPS";
        const etab = document.getElementById("rqEtabInput").value || "Établissement Maroc";
        const eff = document.getElementById("rqEffectifInput").value || "36 élèves";
        const duree = document.getElementById("rqDureeInput").value || "55 min";

        const sportShort = currentSport === "badminton" ? "Badminton (BWF)" : "Tennis de Table (ITTF)";
        document.getElementById("rqCurrentBadge").textContent =
          `Aperçu Pro A4 — ${{sportShort}} · ${{currentGrade}} · Niveau ${{currentLevel}} · Séance ${{s.num}}/10 : ${{s.short}}`;

        document.getElementById("rqA4Container").innerHTML =
          buildSingleSessionHTML(s, gMeta, lvl, prof, etab, eff, duree);
      }};

      window.selectRaquetteSport = function(sport) {{
        currentSport = sport;
        document.querySelectorAll(".sport-switch-btn").forEach(btn => {{
          btn.classList.toggle("active", btn.getAttribute("data-sport") === sport);
        }});
        buildSidebarList();
        renderRaquetteSheet();
      }};

      window.selectRaquetteGrade = function(grade) {{
        currentGrade = grade;
        document.querySelectorAll(".grade-tab").forEach(btn => {{
          btn.classList.toggle("active", btn.getAttribute("data-grade") === grade);
        }});
        renderRaquetteSheet();
      }};

      window.selectRaquetteLevel = function(level) {{
        currentLevel = level;
        document.querySelectorAll(".practice-btn").forEach(btn => {{
          btn.classList.toggle("active", parseInt(btn.getAttribute("data-level"), 10) === level);
        }});
        renderRaquetteSheet();
      }};

      window.selectRaquetteSession = function(idx) {{
        currentSessionIdx = idx;
        buildSidebarList();
        renderRaquetteSheet();
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

      window.exportRaquetteCurrentWord = function() {{
        const s = getCurrentSessions()[currentSessionIdx];
        const html = document.getElementById("rqA4Container").innerHTML;
        const sportSlug = currentSport === "badminton" ? "Badminton" : "Tennis_Table";
        const filename = `Fiche_${{sportSlug}}_${{currentGrade}}_Niveau${{currentLevel}}_Seance${{s.num}}.doc`;
        triggerDocDownload(wrapWordDocument(html, filename), filename);
      }};

      window.exportRaquetteCurrentPDF = function() {{
        const s = getCurrentSessions()[currentSessionIdx];
        const html = document.getElementById("rqA4Container").innerHTML;
        printHTMLWindow(html, `Fiche ${{getSportLabel()}} ${{currentGrade}} - Niveau ${{currentLevel}} - Séance ${{s.num}}`);
      }};

      function buildFullCycleHTML() {{
        const gMeta = GRADE_META[currentGrade];
        const lvl = getCurrentLevelProfiles()[currentLevel];
        const sessions = getCurrentSessions();
        const prof = document.getElementById("rqProfInput").value || "Prof. EPS";
        const etab = document.getElementById("rqEtabInput").value || "Établissement Maroc";
        const eff = document.getElementById("rqEffectifInput").value || "36 élèves";
        const duree = document.getElementById("rqDureeInput").value || "55 min";
        const sportTitle = getSportLabel();
        const otcText = currentSport === "badminton" ? gMeta.otcBad : gMeta.otcPing;

        const cycleOverviewRows = sessions.map(s => `
          <tr>
            <td><strong>Séance ${{s.num}}</strong></td>
            <td><strong>${{s.short}}</strong></td>
            <td>${{s.obj}}</td>
            <td>${{s.critReuss}}</td>
          </tr>
        `).join("");

        const overviewTable = `
          <h2 style="margin:0 0 8px;">PROJET PRÉVISIONNEL DU CYCLE DE ${{sportTitle.toUpperCase()}} (10 SÉANCES) — ${{gMeta.label}} (${{lvl.name}})</h2>
          <p style="margin:0 0 6px;"><strong>Référentiel :</strong> ${{gMeta.ref}} | <strong>Barème :</strong> ${{gMeta.bareme}}</p>
          <p style="margin:0 0 6px;"><strong>OTI :</strong> ${{gMeta.oti}}</p>
          <p style="margin:0 0 12px;"><strong>OTC :</strong> ${{otcText}}</p>
          <table class="a4-body-table">
            <thead>
              <tr><th>Séance</th><th>Thème Didactique</th><th>Objectif de Séance</th><th>Critère de Réussite</th></tr>
            </thead>
            <tbody>${{cycleOverviewRows}}</tbody>
          </table>
          <div class="page-break"></div>
        `;

        const allSheets = sessions.map((s, idx) =>
          buildSingleSessionHTML(s, gMeta, lvl, prof, etab, eff, duree) +
          (idx < sessions.length - 1 ? '<div class="page-break"></div>' : '')
        ).join("");

        return overviewTable + allSheets;
      }}

      window.exportRaquetteFullCycleWord = function() {{
        const html = buildFullCycleHTML();
        const sportSlug = currentSport === "badminton" ? "Badminton" : "Tennis_Table";
        const filename = `Cycle_Complet_10_Seances_${{sportSlug}}_${{currentGrade}}_Niveau${{currentLevel}}.doc`;
        triggerDocDownload(wrapWordDocument(html, filename), filename);
      }};

      window.exportRaquetteFullCyclePDF = function() {{
        const html = buildFullCycleHTML();
        printHTMLWindow(html, `Cycle Complet 10 Séances ${{getSportLabel()}} — ${{currentGrade}} (Niveau ${{currentLevel}})`);
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
          <h2 style="margin-top:0;border-bottom:2px solid #0f766e;padding-bottom:6px;">${{title}}</h2>
          ${{htmlContent}}
          <script>window.onload = function(){{ setTimeout(function(){{ window.print(); }}, 250); }};<\/script>
        </body></html>`);
        w.document.close();
      }}

      window.switchGridTab = function(panelId, btnEl) {{
        document.querySelectorAll(".sub-tab-panel").forEach(p => p.classList.remove("active"));
        document.querySelectorAll(".sub-tab-btn").forEach(b => b.classList.remove("active"));
        const target = document.getElementById(panelId);
        if (target) target.classList.add("active");
        if (btnEl) btnEl.classList.add("active");
      }};

      // ================================================================
      // OUTIL 1 : CALCULATEUR D'EFFICACITÉ TACTIQUE (ZONES BONUS 1 PT / 3 PTS)
      // ================================================================
      window.computeRaquetteCalculator = function() {{
        const sport = document.getElementById("calcRqSport").value;
        const grade = document.getElementById("calcRqGrade").value;
        const normPts = Math.max(0, parseInt(document.getElementById("calcRqNormPts").value, 10) || 0);
        const bonusHits = Math.max(0, parseInt(document.getElementById("calcRqBonusHits").value, 10) || 0);
        const servOk = Math.min(10, Math.max(0, parseInt(document.getElementById("calcRqServOk").value, 10) || 0));
        const pouleRank = parseInt(document.getElementById("calcRqPoulesRank").value, 10) || 1;

        const bonusScore = bonusHits * 3;
        const totalMatchScore = normPts + bonusScore;
        const totalWinningShots = normPts + bonusHits;
        const tacticalRuptureRatio = totalWinningShots > 0 ? Math.round((bonusHits / totalWinningShots) * 100) : 0;

        // Calcul de la note motrice (sur 12 au Collège OP 2009 / sur 14 au Lycée OP 2007)
        const isCollege = (grade === "1AC" || grade === "2AC" || grade === "3AC");
        const maxMoteur = isCollege ? 12 : 14;

        // Points de service (sur 3)
        const servGrade = (servOk / 10) * 3;
        // Points de poule / classement (sur 4 au collège, sur 6 au lycée)
        const pouleMax = isCollege ? 4 : 6;
        const pouleFactor = pouleRank === 1 ? 1.0 : (pouleRank === 2 ? 0.82 : (pouleRank === 3 ? 0.65 : 0.48));
        const pouleGrade = pouleMax * pouleFactor;
        // Points d'efficacité tactique zones bonus (sur 5)
        const bonusFactor = Math.min(1.0, (bonusHits / 6) * 0.7 + (tacticalRuptureRatio / 100) * 0.3);
        const tactGrade = 5 * Math.max(0.35, bonusFactor);

        const noteMotrice = Math.min(maxMoteur, Math.round((servGrade + pouleGrade + tactGrade) * 2) / 2);
        const noteSur20Estimee = Math.min(20, Math.round(( (noteMotrice / maxMoteur) * 20 ) * 2) / 2);

        const zoneDesc = sport === "badminton"
          ? "Zone Avant (≤ 1,98m) + Couloir de Fond (76 cm) + Smash gagnant"
          : "Cibles d'angles Coup Droit / Revers (35×35 cm) + Attaque Topspin/Smash";

        document.getElementById("calcRqOutput").innerHTML = `
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0.65rem;margin-bottom:0.75rem;">
            <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:9px;padding:0.65rem;">
              <div style="font-size:0.72rem;font-weight:800;color:#64748b;text-transform:uppercase;">Score Total Bonifié</div>
              <div style="font-size:1.25rem;font-weight:900;color:#0f766e;">${{totalMatchScore}} pts</div>
              <div style="font-size:0.75rem;color:#334155;">${{normPts}} normaux + ${{bonusHits}}×3 pts bonus</div>
            </div>
            <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:9px;padding:0.65rem;">
              <div style="font-size:0.72rem;font-weight:800;color:#64748b;text-transform:uppercase;">Indice de Rupture Tactique</div>
              <div style="font-size:1.25rem;font-weight:900;color:#1d4ed8;">${{tacticalRuptureRatio}} %</div>
              <div style="font-size:0.75rem;color:#334155;">Services réussis : ${{servOk}} / 10</div>
            </div>
            <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:9px;padding:0.65rem;">
              <div style="font-size:0.72rem;font-weight:800;color:#166534;text-transform:uppercase;">Note Motrice (${{grade}})</div>
              <div style="font-size:1.25rem;font-weight:900;color:#15803d;">${{noteMotrice.toFixed(1)}} / ${{maxMoteur}}</div>
              <div style="font-size:0.75rem;color:#166534;font-weight:700;">Équivalent : ${{noteSur20Estimee.toFixed(1)}} / 20</div>
            </div>
          </div>
          <div style="font-size:0.8rem;color:#334155;background:#ffffff;border-left:4px solid #0f766e;padding:0.5rem 0.75rem;border-radius:6px;">
            <strong>Zones Bonus évaluées (${{sport === 'badminton' ? 'Badminton BWF' : 'Tennis de Table ITTF'}}) :</strong> ${{zoneDesc}}.
          </div>
        `;
      }};

      // ================================================================
      // OUTIL 2 : SIMULATEUR D'ARBITRAGE BWF (PAIR/IMPAIR) & ITTF (ROTATION 2 PTS)
      // ================================================================
      let refScoreA = 0;
      let refScoreB = 0;
      let refCurrentServerBad = "A"; // En Badminton, celui qui gagne l'échange sert

      function updateRefereeDisplay() {{
        const mode = document.getElementById("refSportMode").value;
        document.getElementById("refScoreA").textContent = refScoreA;
        document.getElementById("refScoreB").textContent = refScoreB;
        const box = document.getElementById("refCalloutBox");

        if (mode === "badminton") {{
          // Règle BWF : 21 pts, 2 pts d'écart jusqu'à 29-29 (30e point décisif)
          let matchStatus = "";
          if ((refScoreA >= 21 || refScoreB >= 21) && Math.abs(refScoreA - refScoreB) >= 2) {{
            matchStatus = `🏆 SET TERMINÉ : Victoire du Joueur ${{refScoreA > refScoreB ? 'A' : 'B'}} (${{refScoreA}} - ${{refScoreB}}) !`;
          }} else if (refScoreA === 30 || refScoreB === 30) {{
            matchStatus = `🏆 POINT D'OR BWF (30 pts) : Victoire du Joueur ${{refScoreA === 30 ? 'A' : 'B'}} (${{refScoreA}} - ${{refScoreB}}) !`;
          }}

          const serverScore = refCurrentServerBad === "A" ? refScoreA : refScoreB;
          const isEven = (serverScore % 2 === 0);
          const courtSide = isEven
            ? "CARRÉ DE DROITE (Score Pair : " + serverScore + ")"
            : "CARRÉ DE GAUCHE (Score Impair : " + serverScore + ")";

          box.innerHTML = matchStatus
            ? `<div style="font-weight:900;color:#5eead4;font-size:0.95rem;">${{matchStatus}}</div>`
            : `
              <div style="display:flex;flex-direction:column;gap:0.3rem;">
                <div>📢 <strong>Annonce officielle de l'Arbitre BWF :</strong> <span style="color:#5eead4;font-weight:900;">« Service Joueur ${{refCurrentServerBad}}, ${{refCurrentServerBad === 'A' ? refScoreA : refScoreB}} à ${{refCurrentServerBad === 'A' ? refScoreB : refScoreA}} ! »</span></div>
                <div>📍 <strong>Zone de Service obligatoire :</strong> Le <strong>Joueur ${{refCurrentServerBad}}</strong> sert depuis son <strong style="color:#fde047;">${{courtSide}}</strong> en diagonale (impact ≤ 1,15 m).</div>
              </div>
            `;
        }} else {{
          // Règle ITTF : 11 pts, changement de serveur tous les 2 pts (et tous les points à partir de 10-10)
          const totalPts = refScoreA + refScoreB;
          let matchStatus = "";
          if ((refScoreA >= 11 || refScoreB >= 11) && Math.abs(refScoreA - refScoreB) >= 2) {{
            matchStatus = `🏆 MANCHE TERMINÉE (ITTF) : Victoire du Joueur ${{refScoreA > refScoreB ? 'A' : 'B'}} (${{refScoreA}} - ${{refScoreB}}) !`;
          }}

          let server = "A";
          let servicesRemaining = 2;
          if (refScoreA >= 10 && refScoreB >= 10) {{
            // Deuce 10-10 : changement à chaque point
            server = (totalPts % 2 === 0) ? "A" : "B";
            servicesRemaining = 1;
          }} else {{
            const block = Math.floor(totalPts / 2);
            server = (block % 2 === 0) ? "A" : "B";
            servicesRemaining = 2 - (totalPts % 2);
          }}

          box.innerHTML = matchStatus
            ? `<div style="font-weight:900;color:#5eead4;font-size:0.95rem;">${{matchStatus}}</div>`
            : `
              <div style="display:flex;flex-direction:column;gap:0.3rem;">
                <div>📢 <strong>Annonce officielle de l'Arbitre ITTF :</strong> <span style="color:#5eead4;font-weight:900;">« Service Joueur ${{server}}, ${{server === 'A' ? refScoreA : refScoreB}} à ${{server === 'A' ? refScoreB : refScoreA}} ! »</span></div>
                <div>🏓 <strong>Rotation du Service (ITTF 2.13) :</strong> C'est au <strong>Joueur ${{server}}</strong> de servir (<strong style="color:#fde047;">${{servicesRemaining}} service(s) restant(s)</strong> avant changement · Lancer vertical ≥ 16 cm paume ouverte).</div>
              </div>
            `;
        }}
      }}

      window.addRefereePoint = function(winner) {{
        if (winner === "A") {{
          refScoreA++;
          refCurrentServerBad = "A";
        }} else {{
          refScoreB++;
          refCurrentServerBad = "B";
        }}
        updateRefereeDisplay();
      }};

      window.resetRefereeMatch = function() {{
        refScoreA = 0;
        refScoreB = 0;
        refCurrentServerBad = "A";
        updateRefereeDisplay();
      }};

      // ================================================================
      // OUTIL 3 : PLANIFICATEUR MONTANTE-DESCENDANTE (24 À 48 ÉLÈVES)
      // ================================================================
      window.computeMontanteDescendante = function() {{
        const nStudents = Math.max(8, parseInt(document.getElementById("mdStudentsInput").value, 10) || 36);
        const nCourts = Math.max(2, parseInt(document.getElementById("mdCourtsInput").value, 10) || 6);

        const basePerCourt = Math.floor(nStudents / nCourts);
        const remainder = nStudents % nCourts;

        let rowsHTML = "";
        for (let c = 1; c <= nCourts; c++) {{
          const count = basePerCourt + (c <= remainder ? 1 : 0);
          const leagueName = c === 1 ? "🏆 Terrain 1 (Ligue Or)" : (c === nCourts ? `🌱 Terrain ${{c}} (Ligue Espoir)` : `⚡ Terrain ${{c}} (Ligue ${{c}})`);
          let formula = "";
          if (count <= 3) {{
            formula = "Triade (2 joueurs en duel + 1 arbitre/statisticien · rotation toutes les 3 min)";
          }} else if (count === 4) {{
            formula = "Poule de 4 (2 joueurs en duel + 1 arbitre de chaise + 1 statisticien des Zones Bonus)";
          }} else if (count <= 6) {{
            formula = "2 Demi-terrains parallèles (4 joueurs actifs + 1–2 arbitres) ou Ronde Italienne 3 contre 3";
          }} else {{
            formula = `Ronde Italienne par équipes (${{Math.floor(count/2)}} c. ${{Math.ceil(count/2)}} en relais aux 5, 10, 15 pts) + Arbitre`;
          }}
          const moveRule = c === 1
            ? "Le 1er reste sur le Terrain 1 (Champion) · Le perdant descend au Terrain 2 ↓"
            : (c === nCourts
              ? `Le vainqueur monte au Terrain ${{c-1}} ↑ · Le perdant reste au Terrain ${{c}}`
              : `Le vainqueur monte au Terrain ${{c-1}} ↑ · Le perdant descend au Terrain ${{c+1}} ↓`);

          rowsHTML += `
            <tr>
              <td><strong>${{leagueName}}</strong></td>
              <td><strong>${{count}} élèves</strong></td>
              <td>${{formula}}</td>
              <td>${{moveRule}}</td>
            </tr>
          `;
        }}

        document.getElementById("mdOutputContainer").innerHTML = `
          <div class="pro-table-wrap">
            <table class="pro-table">
              <thead>
                <tr>
                  <th>Terrain / Table</th>
                  <th>Effectif affecté</th>
                  <th>Organisation sur le terrain (0 élève passif)</th>
                  <th>Règle de Rotation au coup de sifflet (toutes les 4 min)</th>
                </tr>
              </thead>
              <tbody>${{rowsHTML}}</tbody>
            </table>
          </div>
        `;
      }};

      // Initialisation au chargement
      buildSidebarList();
      renderRaquetteSheet();
      computeRaquetteCalculator();
      updateRefereeDisplay();
      computeMontanteDescendante();
    }})();
    </script>

{footer_html}
</body>
</html>
"""


def update_hub_aps():
    hub_path = os.path.join(PUBLIC, "hub-aps-sports-eps-maroc.html")
    html = read_file(hub_path)

    # 1. Replace card #11 (TENNIS DE TABLE & BADMINTON) with the upgraded active Silo card
    old_card_start = "<!-- 11. TENNIS DE TABLE & BADMINTON -->"
    old_card_end = "</article>"
    start_idx = html.find(old_card_start)
    if start_idx != -1:
        end_idx = html.find(old_card_end, start_idx) + len(old_card_end)
        new_card = """<!-- 11. BADMINTON & TENNIS DE TABLE (SPORTS DE RAQUETTE) -->
            <article class="aps-card" data-aps-family="gymnastique" style="border-color:#0f766e;border-width:2px;">
                <div>
                    <div class="aps-card-kicker" style="color:#0f766e;">Sports de Raquette · Duel · Studio Complet Actif</div>
                    <h3 class="aps-card-title">🏸🏓 Badminton &amp; Tennis de Table (الريشة الطائرة وكرة الطاولة)</h3>
                    <p class="aps-card-desc">Silo complet Badminton (BWF) &amp; Tennis de Table (ITTF) : Studio 48 cycles et 480 fiches (1AC à 2Bac × 4 niveaux × 2 sports), calculateur Zones Bonus, arbitre BWF/ITTF, tournoi montante-descendante, ATD et grilles (/20).</p>
                    <ul class="aps-links-list">
                        <li><a href="aps-badminton-tennis-table-eps-maroc.html#volet-studio"><span>⚡ Studio Cycles &amp; Fiches Badminton + Ping-Pong (PDF/Word)</span> <span>→</span></a></li>
                        <li><a href="aps-badminton-tennis-table-eps-maroc.html#volet-calculateur-raquettes"><span>🧮 Calculateur Zones Bonus, Arbitre BWF/ITTF &amp; Tournoi</span> <span>→</span></a></li>
                        <li><a href="aps-badminton-tennis-table-eps-maroc.html#volet-grilles"><span>📊 Feuille de Match (1pt/3pts) &amp; 4 Grilles (/20)</span> <span>→</span></a></li>
                        <li><a href="aps-badminton-tennis-table-eps-maroc.html#volet-atd"><span>📐 ATD Badminton (BWF) &amp; Tennis de Table (ITTF)</span> <span>→</span></a></li>
                    </ul>
                </div>
                <div class="aps-card-footer">
                    <a href="aps-badminton-tennis-table-eps-maroc.html" class="aps-btn-main" style="background:#0f766e;">Ouvrir la Page Spéciale Badminton &amp; Ping-Pong →</a>
                </div>
            </article>"""
        html = html[:start_idx] + new_card + html[end_idx:]

    # 2. Add link in top banner of hub-aps-sports-eps-maroc.html
    if "aps-badminton-tennis-table-eps-maroc.html" not in html[:html.find("<!-- 11.") if "<!-- 11." in html else 5000]:
        target_btn = '<a href="aps-saut-hauteur-fosbury-eps-maroc.html" style="display:inline-flex;align-items:center;gap:0.4rem;padding:0.55rem 1rem;border-radius:8px;background:#1d4ed8;color:#ffffff;font-weight:800;font-size:0.84rem;text-decoration:none;">🆙 Saut en Hauteur (Silo Complet) →</a>'
        new_btn = target_btn + '\n                    <a href="aps-badminton-tennis-table-eps-maroc.html" style="display:inline-flex;align-items:center;gap:0.4rem;padding:0.55rem 1rem;border-radius:8px;background:#0f766e;color:#ffffff;font-weight:800;font-size:0.84rem;text-decoration:none;">🏸🏓 Badminton &amp; Ping-Pong (Silo Complet) →</a>'
        html = html.replace(target_btn, new_btn, 1)

    write_file(hub_path, html)
    print("[HUB APS OK] Updated /public/hub-aps-sports-eps-maroc.html with Badminton & Tennis de Table Complete Silo.")


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
    ]
    link_html = '<a href="aps-badminton-tennis-table-eps-maroc.html" style="padding:0.25rem 0.65rem;border-radius:99px;background:#ffffff;color:#0f172a;border:1px solid #cbd5e1;text-decoration:none;">🏸🏓 Badminton &amp; Ping-Pong</a>'
    for fname in silos:
        p = os.path.join(PUBLIC, fname)
        if not os.path.exists(p):
            continue
        content = read_file(p)
        if "aps-badminton-tennis-table-eps-maroc.html" not in content:
            hub_link = '<a href="hub-aps-sports-eps-maroc.html" style="margin-left:auto;'
            if hub_link in content:
                content = content.replace(hub_link, link_html + "\n            " + hub_link, 1)
                write_file(p, content)


def update_blog_index_sitemap():
    # 1. Update blog.html
    blog_path = os.path.join(PUBLIC, "blog.html")
    blog_html = read_file(blog_path)
    if "aps-badminton-tennis-table-eps-maroc.html" not in blog_html:
        card_html = """
                <!-- SILO COMPLET BADMINTON & TENNIS DE TABLE -->
                <article class="article-card" data-category="aps">
                    <div class="article-card-header" style="background: linear-gradient(135deg, #0f766e, #115e59);">
                        <span class="article-category-badge">🏸🏓 Silo APS Complet · Raquettes</span>
                        <span class="article-reading-time">⚡ Studio 1AC→2Bac + Arbitre BWF/ITTF</span>
                    </div>
                    <div class="article-card-body">
                        <h3 class="article-card-title"><a href="aps-badminton-tennis-table-eps-maroc.html">Badminton &amp; Tennis de Table en EPS Maroc : Cycles 1AC–2Bac, Fiches, Arbitre BWF/ITTF, Montante-Descendante, ATD &amp; Grilles (/20)</a></h3>
                        <p class="article-card-excerpt">Studio interactif des 48 cycles et 480 fiches Badminton et Tennis de Table (1AC à 2Bac × 4 niveaux), calculateur Zones Bonus (1pt/3pts), arbitre interactif BWF (pair/impair) et ITTF (11 pts), tournoi montante-descendante, ATD et grilles (/20) Word/PDF.</p>
                        <div class="article-card-footer">
                            <span class="article-date">OP 2009 &amp; OP 2007</span>
                            <a href="aps-badminton-tennis-table-eps-maroc.html" class="article-read-more">Ouvrir le Studio Raquettes →</a>
                        </div>
                    </div>
                </article>"""
        marker = "<!-- SILO COMPLET SAUT EN HAUTEUR (FOSBURY-FLOP) -->"
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
        print("[BLOG OK] Added Silo Badminton & Tennis de Table card to /public/blog.html.")

    # 2. Update index.html & /index.html
    idx_path = os.path.join(PUBLIC, "index.html")
    idx_html = read_file(idx_path)
    if "aps-badminton-tennis-table-eps-maroc.html" not in idx_html:
        target = '<a href="aps-saut-hauteur-fosbury-eps-maroc.html"'
        idx_pos = idx_html.find(target)
        if idx_pos != -1:
            end_a = idx_html.find("</a>", idx_pos) + 4
            snippet = idx_html[idx_pos:end_a]
            new_snippet = (
                snippet
                + '\n          <a href="aps-badminton-tennis-table-eps-maroc.html" style="display:inline-flex;align-items:center;gap:0.4rem;padding:0.55rem 0.95rem;border-radius:99px;background:#f0fdfa;border:1px solid #5eead4;color:#115e59;font-size:0.82rem;font-weight:800;text-decoration:none;">🏸🏓 Silo Badminton &amp; Ping-Pong (Cycles 1AC-2Bac + Arbitre BWF/ITTF) →</a>'
            )
            idx_html = idx_html[:idx_pos] + new_snippet + idx_html[end_a:]
            write_file(idx_path, idx_html)
            write_file(os.path.join(ROOT, "index.html"), idx_html)
            print("[INDEX OK] Updated /public/index.html and mirrored to /index.html.")

    # 3. Update sitemap.xml
    sm_path = os.path.join(PUBLIC, "sitemap.xml")
    sm_xml = read_file(sm_path)
    if "aps-badminton-tennis-table-eps-maroc.html" not in sm_xml:
        entry = """  <url>
    <loc>https://profeps.ma/aps-badminton-tennis-table-eps-maroc.html</loc>
    <lastmod>2026-11-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>
</urlset>"""
        sm_xml = sm_xml.replace("</urlset>", entry)
        write_file(sm_path, sm_xml)
        print("[SITEMAP OK] Added aps-badminton-tennis-table-eps-maroc.html to /public/sitemap.xml.")


def main():
    navbar_html, footer_html, head_styles = extract_chrome()
    silo_html = build_silo_badminton_tt(navbar_html, footer_html, head_styles)
    out_path = os.path.join(PUBLIC, "aps-badminton-tennis-table-eps-maroc.html")
    write_file(out_path, silo_html)
    print(f"[SILO BADMINTON & TENNIS DE TABLE OK] Created {out_path}")

    update_hub_aps()
    update_sibling_silos()
    update_blog_index_sitemap()
    print("=== SILO COMPLET BADMINTON & TENNIS DE TABLE GENERATED SUCCESSFULLY ===")


if __name__ == "__main__":
    main()
