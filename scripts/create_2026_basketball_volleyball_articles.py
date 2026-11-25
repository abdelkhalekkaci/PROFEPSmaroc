#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generates the two comprehensive 2026 regulatory articles for ProfEPS.ma:
1. /public/article-nouveautes-reglement-basketball-fiba-nba-2026.html
2. /public/article-nouveautes-reglement-volleyball-fivb-2026.html

Also updates:
- /public/blog.html (adds cards for both new 2026 articles in the Règlements / sports section)
- /public/sitemap.xml (adds canonical URLs for both new 2026 articles)
- Related Basketball & Volleyball articles in /public/ (adds clean contextual cross-link banners)
"""

import os
import re

PUBLIC_DIR = "/app/applet/public"
TEMPLATE_SRC = os.path.join(PUBLIC_DIR, "reglement-volleyball-fivb-gestes-arbitrage-eps.html")

with open(TEMPLATE_SRC, "r", encoding="utf-8") as f:
    tpl_html = f.read()

# Extract unified blocks from existing article
nav_match = re.search(
    r"(<!-- PROFEPS_UNIFIED_NAVBAR_START -->.*?<!-- PROFEPS_UNIFIED_NAVBAR_END -->)",
    tpl_html,
    re.DOTALL,
)
eeat_match = re.search(
    r"(<!-- PROFEPS_EEAT_AUTHOR_START -->.*?<!-- PROFEPS_EEAT_AUTHOR_END -->)",
    tpl_html,
    re.DOTALL,
)
footer_match = re.search(
    r"(<!-- PROFEPS_STATUT2024_APS_SCOREBOARDS_MESH_START -->.*?<!-- PROFEPS_FEEDBACK_SCRIPT_END -->)",
    tpl_html,
    re.DOTALL,
)

if not (nav_match and eeat_match and footer_match):
    raise RuntimeError("Could not extract unified navbar/eeat/footer from template article.")

NAVBAR_RAW = nav_match.group(1)
EEAT_BLOCK = eeat_match.group(1)
FOOTER_BLOCK = footer_match.group(1)


def get_navbar_for(filename: str) -> str:
    return re.sub(
        r'data-current-file="[^"]*"',
        f'data-current-file="{filename}"',
        NAVBAR_RAW,
    )


SHARED_ARTICLE_CSS = """
    :root {
      --bg: #f8fafc;
      --surface: #ffffff;
      --surface-alt: #f1f5f9;
      --text: #0f172a;
      --muted: #475569;
      --border: #e2e8f0;
      --primary: #c2410c;
      --primary-soft: #fff7ed;
      --primary-border: #fed7aa;
      --secondary: #1d4ed8;
      --secondary-soft: #eff6ff;
      --secondary-border: #bfdbfe;
      --success: #15803d;
      --success-soft: #f0fdf4;
      --success-border: #bbf7d0;
      --warning: #b45309;
      --warning-soft: #fffbeb;
      --warning-border: #fde68a;
      --danger: #b91c1c;
      --danger-soft: #fef2f2;
      --danger-border: #fecaca;
      --shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.06);
      --radius: 14px;
      --maxw: 1120px;
    }

    html[data-theme="dark"] {
      --bg: #0b1120;
      --surface: #1e293b;
      --surface-alt: #0f172a;
      --text: #f1f5f9;
      --muted: #94a3b8;
      --border: #334155;
      --primary: #fb923c;
      --primary-soft: rgba(251, 146, 60, 0.12);
      --primary-border: rgba(251, 146, 60, 0.35);
      --secondary: #60a5fa;
      --secondary-soft: rgba(96, 165, 250, 0.12);
      --secondary-border: rgba(96, 165, 250, 0.35);
      --success: #4ade80;
      --success-soft: rgba(74, 222, 128, 0.12);
      --success-border: rgba(74, 222, 128, 0.35);
      --warning: #fbbf24;
      --warning-soft: rgba(251, 191, 36, 0.12);
      --warning-border: rgba(251, 191, 36, 0.35);
      --danger: #f87171;
      --danger-soft: rgba(248, 113, 113, 0.12);
      --danger-border: rgba(248, 113, 113, 0.35);
      --shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.45);
    }

    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.7;
    }

    .reg2026-wrap {
      max-width: var(--maxw);
      margin: 0 auto;
      padding: 96px 18px 48px;
    }

    .reg2026-wrap a {
      color: var(--secondary);
      text-decoration: none;
    }
    .reg2026-wrap a:hover {
      text-decoration: underline;
    }

    .reg2026-breadcrumb {
      font-size: 0.92rem;
      color: var(--muted);
      margin-bottom: 18px;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      align-items: center;
    }

    .reg2026-hero {
      background: linear-gradient(135deg, var(--surface) 0%, var(--primary-soft) 100%);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 32px 28px;
      box-shadow: var(--shadow);
      margin-bottom: 26px;
    }

    .reg2026-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 14px;
    }

    .reg2026-badge {
      display: inline-flex;
      align-items: center;
      padding: 5px 11px;
      border-radius: 6px;
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.03em;
      text-transform: uppercase;
    }
    .reg2026-badge.fiba { background: var(--primary-soft); color: var(--primary); border: 1px solid var(--primary-border); }
    .reg2026-badge.nba { background: var(--secondary-soft); color: var(--secondary); border: 1px solid var(--secondary-border); }
    .reg2026-badge.eps { background: var(--success-soft); color: var(--success); border: 1px solid var(--success-border); }
    .reg2026-badge.warn { background: var(--warning-soft); color: var(--warning); border: 1px solid var(--warning-border); }

    .reg2026-hero h1 {
      font-size: clamp(1.85rem, 3vw, 2.55rem);
      line-height: 1.2;
      margin: 0 0 14px;
      color: var(--text);
      font-weight: 800;
      letter-spacing: -0.02em;
    }

    .reg2026-lead {
      font-size: 1.08rem;
      color: var(--muted);
      margin: 0 0 18px;
      max-width: 78ch;
    }

    .reg2026-meta {
      font-size: 0.9rem;
      color: var(--muted);
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      padding-top: 14px;
      border-top: 1px solid var(--border);
    }

    .reg2026-grid-layout {
      display: grid;
      grid-template-columns: 270px 1fr;
      gap: 26px;
      align-items: start;
    }

    .reg2026-toc {
      position: sticky;
      top: 90px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 18px;
      box-shadow: var(--shadow);
    }

    .reg2026-toc h2 {
      font-size: 0.95rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin: 0 0 12px;
      color: var(--text);
    }

    .reg2026-toc ol {
      margin: 0;
      padding-left: 18px;
    }

    .reg2026-toc li {
      margin: 8px 0;
      font-size: 0.92rem;
      line-height: 1.4;
    }

    .reg2026-article section {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 26px;
      margin-bottom: 22px;
      box-shadow: var(--shadow);
    }

    .reg2026-article h2 {
      margin-top: 0;
      font-size: 1.48rem;
      line-height: 1.3;
      color: var(--text);
      font-weight: 800;
      letter-spacing: -0.01em;
    }

    .reg2026-article h3 {
      font-size: 1.14rem;
      margin-top: 22px;
      margin-bottom: 8px;
      color: var(--text);
      font-weight: 700;
    }

    .reg2026-article p, .reg2026-article li {
      color: var(--text);
      max-width: 74ch;
    }

    .reg2026-article ul, .reg2026-article ol {
      padding-left: 22px;
    }

    .summary-box, .note-box, .warning-box, .eps-box {
      border-radius: 12px;
      padding: 16px 18px;
      margin: 16px 0;
      border: 1px solid var(--border);
    }

    .summary-box {
      background: var(--primary-soft);
      border-color: var(--primary-border);
    }

    .note-box {
      background: var(--secondary-soft);
      border-color: var(--secondary-border);
    }

    .warning-box {
      background: var(--warning-soft);
      border-color: var(--warning-border);
    }

    .eps-box {
      background: var(--success-soft);
      border-color: var(--success-border);
    }

    .table-wrap {
      overflow-x: auto;
      margin: 16px 0;
      border: 1px solid var(--border);
      border-radius: 12px;
    }

    .reg2026-table {
      width: 100%;
      border-collapse: collapse;
      min-width: 640px;
      background: var(--surface);
      font-variant-numeric: tabular-nums;
    }

    .reg2026-table th, .reg2026-table td {
      border-bottom: 1px solid var(--border);
      padding: 13px 14px;
      text-align: left;
      vertical-align: top;
      font-size: 0.94rem;
    }
    .reg2026-table tr:last-child td {
      border-bottom: none;
    }

    .reg2026-table th {
      background: var(--surface-alt);
      font-weight: 700;
      color: var(--text);
    }

    .cards-2 {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
      margin: 16px 0;
    }

    .mini-card {
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 16px 18px;
      background: var(--surface-alt);
    }

    .mini-card h3 {
      margin-top: 0;
      font-size: 1.05rem;
    }

    .svg-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 18px;
      margin: 18px 0;
    }

    .svg-card {
      border: 1px solid var(--border);
      border-radius: 12px;
      background: var(--surface-alt);
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .svg-card h4 {
      margin: 0;
      font-size: 1rem;
      font-weight: 700;
      color: var(--text);
    }

    .svg-card p {
      margin: 0;
      font-size: 0.88rem;
      color: var(--muted);
      line-height: 1.5;
    }

    .svg-canvas {
      width: 100%;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
    }

    .svg-canvas svg {
      width: 100%;
      height: auto;
      max-height: 230px;
      display: block;
    }

    .reg2026-article details {
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 14px 16px;
      margin: 12px 0;
      background: var(--surface-alt);
    }

    .reg2026-article summary {
      cursor: pointer;
      font-weight: 700;
      color: var(--text);
    }

    .sources-list li {
      margin-bottom: 10px;
      word-break: break-word;
    }

    .related-links-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 12px;
      margin-top: 16px;
    }

    .related-link-card {
      display: block;
      padding: 14px 16px;
      border-radius: 10px;
      border: 1px solid var(--border);
      background: var(--surface-alt);
      color: var(--text) !important;
      transition: transform 0.15s ease, border-color 0.15s ease;
    }
    .related-link-card:hover {
      transform: translateY(-2px);
      border-color: var(--primary);
      text-decoration: none !important;
    }
    .related-link-card strong {
      display: block;
      font-size: 0.96rem;
      margin-bottom: 4px;
      color: var(--text);
    }
    .related-link-card span {
      font-size: 0.84rem;
      color: var(--muted);
    }

    .reg2026-article code {
      background: var(--surface-alt);
      border: 1px solid var(--border);
      padding: 2px 6px;
      border-radius: 6px;
      font-size: 0.9em;
      font-variant-numeric: tabular-nums;
    }

    @media (max-width: 920px) {
      .reg2026-grid-layout { grid-template-columns: 1fr; }
      .reg2026-toc { position: static; }
      .cards-2, .svg-grid { grid-template-columns: 1fr; }
    }
"""

# ==============================================================================
# 1. BASKETBALL 2026 ARTICLE HTML
# ==============================================================================
BASKETBALL_FILENAME = "article-nouveautes-reglement-basketball-fiba-nba-2026.html"
BASKETBALL_HTML = f"""<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){{dataLayer.push(arguments);}}
    gtag('consent', 'default', {{
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'analytics_storage': 'denied',
      'functionality_storage': 'denied',
      'personalization_storage': 'denied',
      'security_storage': 'granted',
      'wait_for_update': 500
    }});
  </script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-TH0Z1SGNXH"></script>
  <script>
    gtag('js', new Date());
    gtag('config', 'G-TH0Z1SGNXH');
  </script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Règlement basketball 2026 : ce qui change à la FIBA et à la NBA | ProfEPS</title>
  <meta name="description" content="Faute disruptive, faute flagrante, catégories de fautes techniques, action de tir, revisionnage : les nouveautés du règlement FIBA 2026 et les changements NBA récents, pour l'EPS.">
  <meta name="robots" content="index, follow">
  <meta name="author" content="Abdelkhalek Kaci — ProfEPS">
  <link rel="canonical" href="https://profeps.ma/article-nouveautes-reglement-basketball-fiba-nba-2026.html">
  <link rel="icon" type="image/png" href="images/prof_eps.png">
  <link rel="apple-touch-icon" href="images/prof_eps.png">

  <meta property="og:type" content="article">
  <meta property="og:site_name" content="ProfEPS">
  <meta property="og:locale" content="fr_MA">
  <meta property="og:title" content="Règlement basketball 2026 : ce qui change à la FIBA et à la NBA">
  <meta property="og:description" content="Synthèse claire et vérifiée des nouvelles règles FIBA 2026 (effet au 1er octobre 2026) et des changements NBA récents, avec lecture EPS et table de marque.">
  <meta property="og:url" content="https://profeps.ma/article-nouveautes-reglement-basketball-fiba-nba-2026.html">
  <meta property="og:image" content="https://profeps.ma/images/prof_eps.png">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Règlement basketball 2026 : ce qui change à la FIBA et à la NBA | ProfEPS">
  <meta name="twitter:description" content="Faute disruptive (DI), faute flagrante (FL), fautes techniques Cat. 1 et 2, action de tir (art. 15), IRS et règle des heaves NBA.">
  <meta name="twitter:image" content="https://profeps.ma/images/prof_eps.png">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/profeps-unifier.min.css?v=20261101">
  <link rel="stylesheet" href="/assets/site.css?v=20261117">
  <script defer src="profeps-cmp.js"></script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8253776880916865" crossorigin="anonymous"></script>

  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Règlement basketball 2026 : ce qui change à la FIBA et à la NBA",
    "description": "Synthèse des nouveautés du règlement FIBA 2026 (faute disruptive, faute flagrante, fautes techniques de catégorie 1 et 2, action de tir, IRS) et des changements NBA récents, expliqués pour l'EPS.",
    "inLanguage": "fr",
    "datePublished": "2026-04-21",
    "dateModified": "2026-11-23",
    "author": {{
      "@type": "Person",
      "name": "Abdelkhalek Kaci",
      "url": "https://profeps.ma/a-propos.html"
    }},
    "publisher": {{
      "@type": "Organization",
      "name": "ProfEPS",
      "logo": {{
        "@type": "ImageObject",
        "url": "https://profeps.ma/images/prof_eps.png"
      }}
    }},
    "mainEntityOfPage": "https://profeps.ma/article-nouveautes-reglement-basketball-fiba-nba-2026.html"
  }}
  </script>

  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {{
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://profeps.ma/index.html"
      }},
      {{
        "@type": "ListItem",
        "position": 2,
        "name": "Blog EPS",
        "item": "https://profeps.ma/blog.html"
      }},
      {{
        "@type": "ListItem",
        "position": 3,
        "name": "Règlement Basketball FIBA & NBA 2026",
        "item": "https://profeps.ma/article-nouveautes-reglement-basketball-fiba-nba-2026.html"
      }}
    ]
  }}
  </script>

  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {{
        "@type": "Question",
        "name": "Quand les nouvelles règles FIBA 2026 entrent-elles en vigueur ?",
        "acceptedAnswer": {{
          "@type": "Answer",
          "text": "Les modifications adoptées par le Conseil central de la FIBA prennent effet le 1er octobre 2026."
        }}
      }},
      {{
        "@type": "Question",
        "name": "La faute antisportive disparaît-elle en FIBA en 2026 ?",
        "acceptedAnswer": {{
          "@type": "Answer",
          "text": "L'ancienne catégorie unique est remplacée par deux catégories plus lisibles : la faute disruptive (DI) et la faute flagrante (FL)."
        }}
      }},
      {{
        "@type": "Question",
        "name": "Deux fautes disruptives entraînent-elles la disqualification ?",
        "acceptedAnswer": {{
          "@type": "Answer",
          "text": "Non. Une faute disruptive ne compte pas pour la disqualification automatique, même si elle reste une faute personnelle et d'équipe."
        }}
      }},
      {{
        "@type": "Question",
        "name": "Qu'est-ce qui change pour les chaussettes en FIBA ?",
        "acceptedAnswer": {{
          "@type": "Answer",
          "text": "L'obligation que les chaussettes soient visibles est supprimée, mais elles doivent conserver la même couleur dominante pour tous les joueurs de l'équipe."
        }}
      }},
      {{
        "@type": "Question",
        "name": "En quoi consiste la règle NBA sur les heaves ?",
        "acceptedAnswer": {{
          "@type": "Answer",
          "text": "Un tir manqué de très loin en toute fin des trois premiers quarts-temps peut être comptabilisé comme tir manqué d'équipe et non du joueur, sous conditions précises."
        }}
      }}
    ]
  }}
  </script>

  <style>{SHARED_ARTICLE_CSS}</style>
</head>
<body>
{get_navbar_for(BASKETBALL_FILENAME)}

  <div class="reg2026-wrap">
    <nav class="reg2026-breadcrumb" aria-label="Fil d'Ariane">
      <a href="index.html">Accueil</a> &rsaquo; <a href="blog.html">Blog EPS</a> &rsaquo; <a href="reglement-basketball-fiba-gestes-arbitrage-eps.html">Basketball</a> &rsaquo; <span>Nouveautés règlement FIBA &amp; NBA 2026</span>
    </nav>

    <header class="reg2026-hero">
      <div class="reg2026-badges">
        <span class="reg2026-badge fiba">FIBA 2026</span>
        <span class="reg2026-badge nba">NBA</span>
        <span class="reg2026-badge eps">Lecture EPS &amp; Arbitrage</span>
      </div>
      <h1>Règlement basketball 2026 : ce qui change à la FIBA et à la NBA</h1>
      <p class="reg2026-lead">
        Le Conseil central de la FIBA a validé un paquet de modifications applicables à partir du <strong>1er octobre 2026</strong>.
        De son côté, la NBA a introduit plusieurs ajustements de jeu, de statistiques, d'arbitrage vidéo et de format pour la NBA Cup.
        Voici l'essentiel, expliqué clairement pour les enseignants d'EPS, les élèves-arbitres, les marqueurs et les joueurs.
      </p>
      <div class="reg2026-meta">
        <span>Entrée en vigueur FIBA : <strong>1er octobre 2026</strong></span>
        <span>Référence : <strong>Official Basketball Rules 2026 (Articles 15, 24, 36, 37, 38 &amp; Annexes B, D, F)</strong></span>
        <span>Public : <strong>Professeurs d'EPS, arbitres scolaires, joueurs</strong></span>
      </div>
    </header>

    <div class="reg2026-grid-layout">
      <aside class="reg2026-toc" aria-label="Sommaire">
        <h2>Sommaire</h2>
        <ol>
          <li><a href="#sec-fautes">Nouveau système de fautes FIBA</a></li>
          <li><a href="#sec-schemas">Schémas SVG des gestes &amp; situations 2026</a></li>
          <li><a href="#sec-tir">Action de tir : nouvelles définitions</a></li>
          <li><a href="#sec-irs">Revisionnage instantané (IRS)</a></li>
          <li><a href="#sec-divers">Dribble, chaussettes, terrain, classement</a></li>
          <li><a href="#sec-nba">Les nouveautés récentes en NBA</a></li>
          <li><a href="#sec-eps">Impact pour l'EPS et la table de marque</a></li>
          <li><a href="#sec-faq">FAQ rapide</a></li>
          <li><a href="#sec-sources">Sources officielles</a></li>
        </ol>
      </aside>

      <main class="reg2026-article">
        <section>
          <div class="summary-box">
            <strong>En 30 secondes :</strong>
            <ul>
              <li>La FIBA remplace l'ancienne logique de faute antisportive par deux catégories distinctes : <strong>faute disruptive (DI)</strong> et <strong>faute flagrante (FL)</strong>.</li>
              <li>Les <strong>fautes techniques</strong> sont divisées en <strong>catégorie 1</strong> (qui compte pour la disqualification) et <strong>catégorie 2</strong> (qui ne compte pas pour la disqualification).</li>
              <li>L'<strong>action de tir</strong> est redéfinie plus précisément en distinguant le <em>tir en suspension/mouvement</em> et la <em>pénétration vers le panier (drive)</em>.</li>
              <li>En NBA, les tirs désespérés de fin de quart-temps (<em>heaves</em>) ne pénalisent plus le pourcentage individuel du joueur s'ils sont manqués dans les conditions prévues.</li>
            </ul>
          </div>
        </section>

        <section id="sec-fautes">
          <h2>1. FIBA 2026 : refonte des fautes techniques, disruptives et flagrantes</h2>
          <p>
            C'est le changement majeur du règlement FIBA 2026 (articles 36, 37 et 38). L'objectif est de mieux séparer :
            d'un côté les fautes qui cassent illégalement le jeu ou une contre-attaque, et de l'autre les contacts durs, dangereux ou excessifs.
          </p>

          <div class="table-wrap">
            <table class="reg2026-table">
              <thead>
                <tr>
                  <th>Type de faute (FIBA 2026)</th>
                  <th>Idée principale</th>
                  <th>Compte pour la disqualification ?</th>
                  <th>Sanction de base</th>
                  <th>Inscription feuille de marque</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Faute disruptive</strong></td>
                  <td>Contact illégal qui perturbe le rythme du jeu : faute sans effort légitime de jouer le ballon, arrêt de transition, contact par derrière ou sur le côté sans défenseur entre l'attaquant et le panier, ou sur remise en jeu en fin de match.</td>
                  <td><strong>Non</strong> (mais compte comme faute personnelle et faute d'équipe)</td>
                  <td>Lancers francs pour le joueur ayant subi la faute + possession en ligne de remise en jeu zone avant.</td>
                  <td><code>DI</code></td>
                </tr>
                <tr>
                  <td><strong>Faute flagrante</strong></td>
                  <td>Contact excessif, dur, imprudent ou dangereux pouvant blesser un adversaire (avec ou sans ballon).</td>
                  <td><strong>Oui</strong></td>
                  <td>Lancers francs pour le joueur ayant subi la faute + possession en ligne de remise en jeu zone avant.</td>
                  <td><code>FL</code> entouré d'un cercle</td>
                </tr>
                <tr>
                  <td><strong>Faute technique — catégorie 1</strong></td>
                  <td>Comportement non coopératif ou antisportif de nature comportementale (irrespect envers les arbitres, provocation, langage ou geste offensant, etc.).</td>
                  <td><strong>Oui</strong></td>
                  <td>1 lancer franc. Le jeu reprend à l'endroit et de la manière où il a été arrêté.</td>
                  <td><code>T</code> (ou <code>C</code> pour le coach) entouré d'un cercle</td>
                </tr>
                <tr>
                  <td><strong>Faute technique — catégorie 2</strong></td>
                  <td>Infraction technique liée au déroulement administratif ou procédural du jeu (retard de jeu, simulation, accrochage à l'anneau, passage de la main dans le cercle, etc.).</td>
                  <td><strong>Non</strong></td>
                  <td>1 lancer franc. Le jeu reprend à l'endroit et de la manière où il a été arrêté.</td>
                  <td><code>T</code> (ou <code>B</code> au banc) sans cercle</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Combien de lancers francs sur une faute disruptive ou flagrante ?</h3>
          <ul>
            <li><strong>Joueur non en action de tir :</strong> 2 lancers francs + possession.</li>
            <li><strong>Joueur en action de tir et panier marqué :</strong> le panier compte + 1 lancer franc + possession.</li>
            <li><strong>Joueur en action de tir et panier manqué :</strong> 2 ou 3 lancers francs (selon la zone du tir) + possession.</li>
          </ul>

          <h3>Quand un joueur est-il disqualifié ?</h3>
          <p>Un joueur est disqualifié pour le reste de la rencontre lorsqu'il cumule :</p>
          <ul>
            <li><strong>2 fautes flagrantes</strong>, ou</li>
            <li><strong>2 fautes techniques de catégorie 1</strong>, ou</li>
            <li><strong>1 faute technique de catégorie 1 + 1 faute flagrante</strong>.</li>
          </ul>

          <div class="note-box">
            <strong>Cas particulier (article 36.2.4) :</strong> si un joueur commet une faute de catégorie 2 comme <strong>5e faute</strong>, ou alors qu'il a déjà 5 fautes, cette nouvelle infraction est sanctionnée comme une <strong>faute technique de catégorie 1</strong> imputée à l'entraîneur mais inscrite en <code>B</code> (sans cercle).
          </div>

          <h3>Et pour l'entraîneur principal ?</h3>
          <p>L'entraîneur principal est disqualifié s'il cumule :</p>
          <ul>
            <li><strong>2 fautes techniques de catégorie 1</strong> (<code>C</code>) dues à son comportement personnel, ou</li>
            <li><strong>3 fautes techniques au total</strong> liées au banc (combinaison de fautes du banc <code>B</code> et de fautes personnelles <code>C</code>).</li>
          </ul>
        </section>

        <section id="sec-schemas">
          <h2>2. Schémas SVG : gestes d'arbitrage, feuille de marque et situations 2026</h2>
          <p>
            Les quatre planches vectorielles ci-dessous synthétisent les repères visuels essentiels à retenir pour l'arbitrage scolaire, la formation des officiels de table de marque (OTM) et l'analyse vidéo en EPS.
          </p>

          <div class="svg-grid">
            <!-- SVG 1: Faute Disruptive (DI) -->
            <div class="svg-card">
              <h4>1. Faute Disruptive (DI — Art. 37)</h4>
              <div class="svg-canvas">
                <svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schéma Faute Disruptive DI FIBA 2026">
                  <rect x="6" y="6" width="408" height="208" rx="10" fill="#fff7ed" stroke="#fed7aa" stroke-width="2"/>
                  <!-- Court half & basket -->
                  <line x1="210" y1="18" x2="210" y2="170" stroke="#fdba74" stroke-width="2" stroke-dasharray="5,5"/>
                  <circle cx="378" cy="95" r="11" fill="none" stroke="#c2410c" stroke-width="3"/>
                  <line x1="392" y1="72" x2="392" y2="118" stroke="#0f172a" stroke-width="3"/>
                  <!-- Fastbreak arrow -->
                  <path d="M 140 95 L 345 95" stroke="#15803d" stroke-width="3" stroke-dasharray="6,4"/>
                  <polygon points="352,95 340,89 340,101" fill="#15803d"/>
                  <text x="245" y="82" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="700" fill="#15803d" text-anchor="middle">CONTRE-ATTAQUE (AUCUN DÉFENSEUR DEVANT)</text>
                  <!-- Attacker A1 -->
                  <circle cx="215" cy="95" r="18" fill="#15803d"/>
                  <text x="215" y="99" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">A1</text>
                  <circle cx="236" cy="84" r="6" fill="#ea580c"/>
                  <!-- Defender B4 fouling from behind/side -->
                  <circle cx="168" cy="112" r="18" fill="#c2410c"/>
                  <text x="168" y="116" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">B4</text>
                  <path d="M 184 106 L 199 100" stroke="#b91c1c" stroke-width="4" stroke-linecap="round"/>
                  <!-- Whistle / DI badge -->
                  <rect x="20" y="22" width="116" height="54" rx="8" fill="#ffffff" stroke="#c2410c" stroke-width="2"/>
                  <text x="78" y="44" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="800" fill="#c2410c" text-anchor="middle">Code : DI</text>
                  <text x="78" y="62" font-family="Plus Jakarta Sans, sans-serif" font-size="10" font-weight="600" fill="#475569" text-anchor="middle">Sans cercle (Non-disq.)</text>
                  <!-- Bottom banner -->
                  <rect x="20" y="176" width="380" height="26" rx="6" fill="#ffffff" stroke="#fed7aa"/>
                  <text x="210" y="193" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="700" fill="#0f172a" text-anchor="middle">Sanction : 2 LF (ou 1/2/3 LF si tir) + Possession ligne remise en jeu zone avant</text>
                </svg>
              </div>
              <p>Arrêt tactique de transition ou contact par derrière/côté sans défenseur entre l'attaquant et le panier : noté <code>DI</code> sans cercle, ne compte pas pour la disqualification automatique.</p>
            </div>

            <!-- SVG 2: Faute Flagrante (FL) -->
            <div class="svg-card">
              <h4>2. Faute Flagrante (FL — Art. 37 / 38)</h4>
              <div class="svg-canvas">
                <svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Schéma Faute Flagrante FL FIBA 2026">
                  <rect x="6" y="6" width="408" height="208" rx="10" fill="#fef2f2" stroke="#fecaca" stroke-width="2"/>
                  <!-- Referee wrist grasp signal illustration -->
                  <circle cx="115" cy="95" r="46" fill="#ffffff" stroke="#b91c1c" stroke-width="2"/>
                  <!-- Forearms crossed / wrist grasped -->
                  <line x1="88" y1="122" x2="122" y2="75" stroke="#0f172a" stroke-width="7" stroke-linecap="round"/>
                  <line x1="142" y1="122" x2="112" y2="82" stroke="#c2410c" stroke-width="7" stroke-linecap="round"/>
                  <circle cx="116" cy="83" r="8" fill="#b91c1c"/>
                  <text x="115" y="156" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="700" fill="#b91c1c" text-anchor="middle">Poignet saisi haut</text>
                  <!-- Circled FL notation -->
                  <rect x="188" y="26" width="206" height="66" rx="8" fill="#ffffff" stroke="#b91c1c" stroke-width="2"/>
                  <circle cx="232" cy="59" r="21" fill="#fef2f2" stroke="#b91c1c" stroke-width="2.5"/>
                  <text x="232" y="64" font-family="Plus Jakarta Sans, sans-serif" font-size="15" font-weight="800" fill="#b91c1c" text-anchor="middle">FL</text>
                  <text x="266" y="52" font-family="Plus Jakarta Sans, sans-serif" font-size="12" font-weight="800" fill="#0f172a">Entouré d'un cercle</text>
                  <text x="266" y="70" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="600" fill="#475569">Compte pour disqualification</text>
                  <!-- Impact criteria -->
                  <rect x="188" y="102" width="206" height="62" rx="8" fill="#ffffff" stroke="#fecaca"/>
                  <text x="200" y="122" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="700" fill="#b91c1c">Critères FIBA 2026 :</text>
                  <text x="200" y="139" font-family="Plus Jakarta Sans, sans-serif" font-size="11" fill="#0f172a">• Contact dur, excessif, imprudent</text>
                  <text x="200" y="154" font-family="Plus Jakarta Sans, sans-serif" font-size="11" fill="#0f172a">• Risque de blessure (avec/sans ballon)</text>
                  <!-- Bottom banner -->
                  <rect x="20" y="176" width="380" height="26" rx="6" fill="#ffffff" stroke="#fecaca"/>
                  <text x="210" y="193" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="700" fill="#b91c1c" text-anchor="middle">Cumul disqualifiant : 2 (FL) ou 1 (FL) + 1 (T Cat. 1) = Disqualification (GD)</text>
                </svg>
              </div>
              <p>Contact excessif, dur ou dangereux : inscrit <code>FL</code> entouré d'un cercle sur la feuille de marque. Deux fautes entourées d'un cercle entraînent la disqualification.</p>
            </div>

            <!-- SVG 3: Feuille de marque Annexe B -->
            <div class="svg-card">
              <h4>3. Feuille de Marque FIBA 2026 (Annexe B)</h4>
              <div class="svg-canvas">
                <svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Feuille de marque FIBA 2026 Annexe B">
                  <rect x="6" y="6" width="408" height="208" rx="10" fill="#eff6ff" stroke="#bfdbfe" stroke-width="2"/>
                  <text x="210" y="28" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="800" fill="#1e3a8a" text-anchor="middle">EXEMPLES D'INSCRIPTION — ANNEXE B (1er OCTOBRE 2026)</text>
                  <!-- Row 1: Player remains in game despite DI and T2 -->
                  <rect x="20" y="42" width="380" height="58" rx="8" fill="#ffffff" stroke="#93c5fd"/>
                  <text x="32" y="63" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="800" fill="#15803d">Joueur N° 7 (Reste éligible jusqu'à 5 fautes)</text>
                  <!-- 5 foul boxes -->
                  <rect x="32" y="71" width="38" height="22" fill="#f8fafc" stroke="#cbd5e1"/><text x="51" y="86" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="700" fill="#0f172a" text-anchor="middle">P2</text>
                  <rect x="74" y="71" width="38" height="22" fill="#fff7ed" stroke="#fdba74"/><text x="93" y="86" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="800" fill="#c2410c" text-anchor="middle">DI2</text>
                  <rect x="116" y="71" width="38" height="22" fill="#eff6ff" stroke="#93c5fd"/><text x="135" y="86" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="800" fill="#1d4ed8" text-anchor="middle">T1</text>
                  <rect x="158" y="71" width="38" height="22" fill="#fff7ed" stroke="#fdba74"/><text x="177" y="86" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="800" fill="#c2410c" text-anchor="middle">DI2</text>
                  <rect x="200" y="71" width="38" height="22" fill="#f8fafc" stroke="#cbd5e1"/>
                  <text x="250" y="86" font-family="Plus Jakarta Sans, sans-serif" font-size="10.5" font-weight="600" fill="#475569">2 DI + 1 T (Cat.2) = Pas de GD</text>

                  <!-- Row 2: Player disqualified by FL + T1 circled -->
                  <rect x="20" y="110" width="380" height="58" rx="8" fill="#ffffff" stroke="#fca5a5"/>
                  <text x="32" y="131" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="800" fill="#b91c1c">Joueur N° 12 (Disqualifié — 2 fautes entourées d'un cercle)</text>
                  <rect x="32" y="139" width="38" height="22" fill="#fef2f2" stroke="#fca5a5"/>
                  <circle cx="51" cy="150" r="9" fill="none" stroke="#b91c1c" stroke-width="1.8"/>
                  <text x="51" y="154" font-family="Plus Jakarta Sans, sans-serif" font-size="9.5" font-weight="800" fill="#b91c1c" text-anchor="middle">FL2</text>
                  <rect x="74" y="139" width="38" height="22" fill="#fef2f2" stroke="#fca5a5"/>
                  <circle cx="93" cy="150" r="9" fill="none" stroke="#b91c1c" stroke-width="1.8"/>
                  <text x="93" y="154" font-family="Plus Jakarta Sans, sans-serif" font-size="9.5" font-weight="800" fill="#b91c1c" text-anchor="middle">T1</text>
                  <rect x="116" y="139" width="38" height="22" fill="#b91c1c" stroke="#b91c1c"/><text x="135" y="154" font-family="Plus Jakarta Sans, sans-serif" font-size="10.5" font-weight="800" fill="#ffffff" text-anchor="middle">GD</text>
                  <rect x="158" y="139" width="38" height="22" fill="#f8fafc" stroke="#cbd5e1"/>
                  <rect x="200" y="139" width="38" height="22" fill="#f8fafc" stroke="#cbd5e1"/>
                  <text x="250" y="154" font-family="Plus Jakarta Sans, sans-serif" font-size="10.5" font-weight="700" fill="#b91c1c">1 (FL) + 1 (T Cat.1) = GD</text>

                  <text x="210" y="192" font-family="Plus Jakarta Sans, sans-serif" font-size="10.5" font-weight="700" fill="#1e3a8a" text-anchor="middle">Règle d'or OTM : seules les fautes entourées d'un cercle (FL, T Cat. 1, C) comptent vers GD</text>
                </svg>
              </div>
              <p>Le cercle autour du code (<code>FL</code>, <code>T</code> de catégorie 1, <code>C</code>) permet au marqueur d'identifier instantanément les fautes comptant pour la disqualification (<code>GD</code>).</p>
            </div>

            <!-- SVG 4: Action de tir Art. 15 & Heave NBA -->
            <div class="svg-card">
              <h4>4. Action de Tir (Art. 15) &amp; Zone NBA « Heave »</h4>
              <div class="svg-canvas">
                <svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Action de tir FIBA Art 15 et Heave NBA 36 pieds">
                  <rect x="6" y="6" width="408" height="208" rx="10" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="2"/>
                  <!-- Split Left (FIBA Art 15) and Right (NBA Heave) -->
                  <line x1="210" y1="16" x2="210" y2="204" stroke="#86efac" stroke-width="2"/>
                  <!-- Left: FIBA Art 15 -->
                  <text x="108" y="28" font-family="Plus Jakarta Sans, sans-serif" font-size="11.5" font-weight="800" fill="#166534" text-anchor="middle">FIBA ART. 15 — ACTION DE TIR</text>
                  <rect x="18" y="38" width="180" height="72" rx="8" fill="#ffffff" stroke="#86efac"/>
                  <text x="28" y="56" font-family="Plus Jakarta Sans, sans-serif" font-size="10.5" font-weight="800" fill="#15803d">1. Tir en suspension / mouv.</text>
                  <text x="28" y="72" font-family="Plus Jakarta Sans, sans-serif" font-size="9.8" fill="#0f172a">Débute quand le ballon quitte le</text>
                  <text x="28" y="85" font-family="Plus Jakarta Sans, sans-serif" font-size="9.8" fill="#0f172a">dribble et monte en mouvement</text>
                  <text x="28" y="98" font-family="Plus Jakarta Sans, sans-serif" font-size="9.8" fill="#0f172a">continu vers le panier.</text>

                  <rect x="18" y="118" width="180" height="80" rx="8" fill="#ffffff" stroke="#86efac"/>
                  <text x="28" y="136" font-family="Plus Jakarta Sans, sans-serif" font-size="10.5" font-weight="800" fill="#c2410c">2. Pénétration (Drive)</text>
                  <text x="28" y="152" font-family="Plus Jakarta Sans, sans-serif" font-size="9.8" fill="#0f172a">Débute au gather (contrôle à</text>
                  <text x="28" y="165" font-family="Plus Jakarta Sans, sans-serif" font-size="9.8" fill="#0f172a">1 ou 2 mains) en course directe</text>
                  <text x="28" y="178" font-family="Plus Jakarta Sans, sans-serif" font-size="9.8" fill="#0f172a">sans s'arrêter ni changer d'axe.</text>

                  <!-- Right: NBA Heave 36 ft -->
                  <text x="312" y="28" font-family="Plus Jakarta Sans, sans-serif" font-size="11.5" font-weight="800" fill="#1d4ed8" text-anchor="middle">NBA — RÈGLE DES « HEAVES »</text>
                  <rect x="222" y="38" width="180" height="160" rx="8" fill="#ffffff" stroke="#93c5fd"/>
                  <!-- Mini court top-down -->
                  <rect x="236" y="48" width="152" height="82" fill="#eff6ff" stroke="#1d4ed8" stroke-width="1.5"/>
                  <!-- Backcourt shaded -->
                  <rect x="236" y="48" width="85" height="82" fill="#dbeafe"/>
                  <line x1="312" y1="48" x2="312" y2="130" stroke="#1d4ed8" stroke-width="1.5"/>
                  <line x1="321" y1="48" x2="321" y2="130" stroke="#b91c1c" stroke-width="2" stroke-dasharray="3,3"/>
                  <circle cx="380" cy="89" r="5" fill="none" stroke="#c2410c" stroke-width="2"/>
                  <text x="276" y="85" font-family="Plus Jakarta Sans, sans-serif" font-size="9.5" font-weight="800" fill="#1e3a8a" text-anchor="middle">ZONE &gt; 36 PIEDS</text>
                  <text x="276" y="98" font-family="Plus Jakarta Sans, sans-serif" font-size="8.8" font-weight="700" fill="#b91c1c" text-anchor="middle">(&gt; 11 m • ≤ 3,0 s QT1-3)</text>
                  <text x="232" y="148" font-family="Plus Jakarta Sans, sans-serif" font-size="9.8" font-weight="700" fill="#0f172a">• Départ en zone arrière</text>
                  <text x="232" y="163" font-family="Plus Jakarta Sans, sans-serif" font-size="9.8" font-weight="700" fill="#0f172a">• Tir manqué = FG manqué ÉQUIPE</text>
                  <text x="232" y="178" font-family="Plus Jakarta Sans, sans-serif" font-size="9.8" font-weight="700" fill="#15803d">• % individuel du joueur protégé</text>
                </svg>
              </div>
              <p>Distinction FIBA entre le tir en suspension et le <em>drive</em> au panier (Art. 15), et protection statistique en NBA pour les tirs au buzzer au-delà de 36 pieds (~11 m).</p>
            </div>
          </div>
        </section>

        <section id="sec-tir">
          <h2>3. Action de tir : des définitions plus nettes (article 15)</h2>
          <p>
            Pour harmoniser les décisions sur les fautes commises au moment où l'attaquant attaque le cercle, la FIBA distingue plus clairement deux situations :
          </p>

          <div class="cards-2">
            <div class="mini-card">
              <h3>A. Tir en suspension / tir en mouvement</h3>
              <p>
                L'action de tir commence lorsque le ballon a quitté les mains sur le dernier dribble et que le joueur débute
                le mouvement continu amenant le ballon vers le haut en direction du panier.
              </p>
            </div>
            <div class="mini-card">
              <h3>B. Pénétration vers le panier (<em>drive</em>)</h3>
              <p>
                L'action de tir commence lorsque le joueur ramasse/contrôle le ballon à une ou deux mains tout en se déplaçant
                directement vers le panier, sans s'arrêter ni changer de direction avant le lâcher du ballon.
              </p>
            </div>
          </div>

          <p>
            Autre précision importante : lorsqu'un joueur tire depuis sa <strong>zone arrière</strong>, l'action de tir se termine dès que le ballon a quitté sa ou ses mains.
          </p>
        </section>

        <section id="sec-irs">
          <h2>4. Revisionnage instantané (IRS) et challenge de l'entraîneur</h2>
          <p>
            Dans les compétitions utilisant l'<strong>Instant Replay System (IRS)</strong> (annexe F) :
          </p>
          <ul>
            <li><strong>Dans les 2 dernières minutes du 4e quart-temps et de chaque prolongation :</strong> les arbitres peuvent vérifier qui a envoyé le ballon hors des limites et s'il y a eu violation de retour en zone lors d'une situation de remise en jeu.</li>
            <li><strong>À tout moment du match :</strong> les arbitres peuvent vérifier une décision de <em>goaltending</em> ou d'interférence avec le panier s'il existe un doute sur la validité de l'intervention.</li>
            <li><strong>Challenge de l'entraîneur :</strong> l'entraîneur ne peut demander un challenge que sur les situations expressément prévues par l'annexe F, avec les mêmes restrictions temporelles que celles prévues pour la situation concernée.</li>
          </ul>
        </section>

        <section id="sec-divers">
          <h2>5. Autres ajustements FIBA 2026 à connaître</h2>
          <ul>
            <li><strong>Dribble (article 24.2) :</strong> la définition est clarifiée : un joueur qui touche accidentellement le ballon, hésite ou perd momentanément le contrôle ("fumble") avant de le récupérer est autorisé à entamer un dribble.</li>
            <li><strong>Tenues et chaussettes (article 4.3) :</strong> l'obligation que les chaussettes soient visibles est supprimée ; en revanche, la même couleur dominante pour toute l'équipe reste obligatoire.</li>
            <li><strong>Terrain (article 2.5) :</strong> quatre lignes supplémentaires sont tracées à l'extérieur du terrain, près des zones de banc d'équipe.</li>
            <li><strong>Commissaire / délégué technique (article 1) :</strong> le règlement mentionne explicitement "commissaire / délégué technique", s'il est présent.</li>
            <li><strong>Classement des équipes (annexe D.5.2) :</strong> clarification de la procédure en deux étapes lorsqu'une égalité persiste après une première application des critères de départage.</li>
          </ul>
        </section>

        <section id="sec-nba">
          <h2>6. Côté NBA : ce qui a changé récemment</h2>
          <p>
            Les élèves suivent beaucoup la NBA et confondent souvent ses règles avec celles de la FIBA. Voici les changements NBA récents les plus utiles à connaître :
          </p>

          <h3>1) La règle des « heaves » (tirs désespérés de fin de quart-temps)</h3>
          <p>
            Pour encourager les joueurs à tenter les tirs du milieu ou de leur propre camp au buzzer sans craindre pour leur pourcentage individuel,
            un tir manqué est désormais comptabilisé comme <strong>tir manqué d'équipe</strong> (et non comme tir manqué du joueur) lorsque toutes les conditions suivantes sont réunies :
          </p>
          <ul>
            <li>le tir a lieu dans les <strong>3 dernières secondes</strong> d'un des <strong>trois premiers quarts-temps</strong> ;</li>
            <li>il est déclenché à au moins <strong>36 pieds</strong> du panier (environ 11 mètres) ;</li>
            <li>l'action débute en <strong>zone arrière</strong>.</li>
          </ul>

          <h3>2) Coach's Challenge plus rapide sur les sorties de balle</h3>
          <p>
            Lorsqu'un entraîneur conteste une décision de sortie de balle (<em>out-of-bounds</em>), la décision finale est prise directement par le
            <strong>Replay Center</strong> de la NBA afin d'accélérer le traitement des révisions vidéo.
          </p>

          <h3>3) Évolution du format de la NBA Cup en 2026-27</h3>
          <p>
            À partir de la saison <strong>2026-27</strong>, les <strong>demi-finales de la NBA Cup</strong> se jouent dans la salle de l'équipe la mieux classée,
            et seule la <strong>finale</strong> reste disputée sur terrain neutre.
          </p>
        </section>

        <section id="sec-eps">
          <h2>7. Ce que cela change concrètement en EPS et en sport scolaire au Maroc</h2>
          <div class="eps-box">
            <strong>Lecture pédagogique pour l'enseignant d'EPS (OP 2007 &amp; OP 2009 / ASS-FRMSS) :</strong>
            <ul>
              <li><strong>Plus simple à faire comprendre aux élèves :</strong> distinguer une <em>faute qui coupe le jeu</em> (disruptive <code>DI</code>) d'une <em>faute dangereuse</em> (flagrante <code>FL</code>) est beaucoup plus parlant en séance d'EPS.</li>
              <li><strong>Sécurité d'abord :</strong> tout contact dangereux, même en contexte scolaire, relève de la logique de la <strong>faute flagrante</strong>.</li>
              <li><strong>Formation des élèves à la table de marque :</strong> il faut apprendre la différence entre les codes <code>DI</code>, <code>FL</code>, <code>T</code>, <code>C</code>, <code>B</code> et surtout le rôle du <strong>cercle</strong> autour des fautes qui comptent pour la disqualification.</li>
              <li><strong>Culture sportive :</strong> rappeler aux élèves que les règles vues en NBA (comme la règle statistique des <em>heaves</em> ou la ligne à 3 points à 7,24 m) ne s'appliquent pas en EPS ni en compétition FIBA / FRMBB.</li>
            </ul>
          </div>

          <h3>Articles et ressources Basketball associés sur ProfEPS</h3>
          <div class="related-links-grid">
            <a class="related-link-card" href="reglement-basketball-fiba-gestes-arbitrage-eps.html">
              <strong>Règlement Basketball FIBA &amp; Gestes d'Arbitrage</strong>
              <span>Terrain 28x15m, règles 3s/5s/8s/24s, pas zéro et signaux officiels PDF.</span>
            </a>
            <a class="related-link-card" href="table-de-marque-basketball-eps.html">
              <strong>Table de Marque Basketball en EPS</strong>
              <span>Rôles du marqueur et du chronométreur, feuille de marque simplifiée.</span>
            </a>
            <a class="related-link-card" href="article-gestes-arbitres-basketball.html">
              <strong>Guide des Gestes des Arbitres de Basketball</strong>
              <span>Code gestuel FIBA expliqué étape par étape pour les élèves-arbitres.</span>
            </a>
            <a class="related-link-card" href="aps-basketball-eps-maroc.html">
              <strong>APS Basketball en EPS au Maroc</strong>
              <span>Analyse didactique, niveaux d'apprentissage et situations de référence.</span>
            </a>
            <a class="related-link-card" href="article-nouveautes-reglement-volleyball-fivb-2026.html">
              <strong>Volleyball 2026 : Tests de règles FIVB expliqués</strong>
              <span>Rotation libre en réception, 8 remplacements, attaque stricte et challenge.</span>
            </a>
          </div>
        </section>

        <section id="sec-faq">
          <h2>8. FAQ — Questions fréquentes</h2>

          <details open>
            <summary>Quand les nouvelles règles FIBA 2026 entrent-elles en vigueur ?</summary>
            <p>Elles entrent officiellement en vigueur le <strong>1er octobre 2026</strong>.</p>
          </details>

          <details>
            <summary>La faute antisportive existe-t-elle toujours sous ce nom en FIBA ?</summary>
            <p>Non : le règlement 2026 la remplace par deux catégories distinctes : la <strong>faute disruptive</strong> (<code>DI</code>) et la <strong>faute flagrante</strong> (<code>FL</code>).</p>
          </details>

          <details>
            <summary>Un joueur qui commet deux fautes disruptives est-il expulsé ?</summary>
            <p>Non. Les fautes disruptives ne comptent pas pour la disqualification automatique, mais elles comptent bien dans ses 5 fautes personnelles.</p>
          </details>

          <details>
            <summary>Quelle est la différence entre faute technique de catégorie 1 et de catégorie 2 ?</summary>
            <p>La catégorie 1 sanctionne un comportement antisportif ou irrespectueux et compte pour la disqualification (inscrite avec un cercle). La catégorie 2 sanctionne une infraction procédurale (retard de jeu, simulation, accrochage à l'anneau…) et ne compte pas pour la disqualification.</p>
          </details>

          <details>
            <summary>Les chaussettes doivent-elles encore être visibles en FIBA ?</summary>
            <p>Non. À partir du 1er octobre 2026, l'obligation de visibilité est supprimée, mais tous les joueurs de l'équipe doivent garder des chaussettes de même couleur dominante.</p>
          </details>
        </section>

        <section id="sec-sources">
          <h2>9. Sources officielles consultées</h2>
          <ul class="sources-list">
            <li>
              FIBA — Communiqué officiel (27 mars 2026) :
              <a href="https://about.fiba.basketball/en/news/fiba-central-board-approves-basketball-rules-changes-for-2026" target="_blank" rel="noopener noreferrer">
                FIBA Central Board approves Basketball Rules changes for 2026
              </a>
            </li>
            <li>
              FIBA — Document officiel des amendements 2026 (texte intégral, 1er avril 2026) :
              <a href="https://assets.fiba.basketball/image/upload/2026_Official_Basketball_Rules_Changes_Final_Full_Text_v1.1a.pdf" target="_blank" rel="noopener noreferrer">
                2026 Official Basketball Rules Changes — Final Full Text (PDF)
              </a>
            </li>
            <li>
              NBA — Règle des « heaves » et arbitrage vidéo (10 septembre 2025) :
              <a href="https://www.nba.com/news/nba-board-of-governors-approves-heaves-rule-change-replay-review-for-2025-26-season" target="_blank" rel="noopener noreferrer">
                NBA Board of Governors approves rule changes for 2025-26 season
              </a>
            </li>
            <li>
              NBA — Évolution du format de la NBA Cup en 2026-27 :
              <a href="https://www.nba.com/news/bog-emirates-nba-cup-semifinal-games-change" target="_blank" rel="noopener noreferrer">
                Board of Governors approves change to Emirates NBA Cup semifinal games
              </a>
            </li>
          </ul>
        </section>
      </main>
    </div>
  </div>

{EEAT_BLOCK}
{FOOTER_BLOCK}
  <script src="profeps-communaute.js"></script>
</body>
</html>
"""

# ==============================================================================
# 2. VOLLEYBALL 2026 ARTICLE HTML
# ==============================================================================
VOLLEYBALL_FILENAME = "article-nouveautes-reglement-volleyball-fivb-2026.html"
VOLLEYBALL_HTML = f"""<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){{dataLayer.push(arguments);}}
    gtag('consent', 'default', {{
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'analytics_storage': 'denied',
      'functionality_storage': 'denied',
      'personalization_storage': 'denied',
      'security_storage': 'granted',
      'wait_for_update': 500
    }});
  </script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-TH0Z1SGNXH"></script>
  <script>
    gtag('js', new Date());
    gtag('config', 'G-TH0Z1SGNXH');
  </script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Volleyball 2026 : les tests de règles FIVB expliqués | ProfEPS</title>
  <meta name="description" content="Rotation libre en réception, 8 remplacements par set, challenge vidéo, attaques plus strictes, échauffement au service : les tests de règles FIVB 2026 expliqués pour l'EPS.">
  <meta name="robots" content="index, follow">
  <meta name="author" content="Abdelkhalek Kaci — ProfEPS">
  <link rel="canonical" href="https://profeps.ma/article-nouveautes-reglement-volleyball-fivb-2026.html">
  <link rel="icon" type="image/png" href="images/prof_eps.png">
  <link rel="apple-touch-icon" href="images/prof_eps.png">

  <meta property="og:type" content="article">
  <meta property="og:site_name" content="ProfEPS">
  <meta property="og:locale" content="fr_MA">
  <meta property="og:title" content="Volleyball 2026 : les tests de règles FIVB expliqués">
  <meta property="og:description" content="Synthèse claire et vérifiée des règles testées par la FIVB en 2026 (VNL, Mondiaux U17, Championnats continentaux) et de leur intérêt pédagogique en EPS.">
  <meta property="og:url" content="https://profeps.ma/article-nouveautes-reglement-volleyball-fivb-2026.html">
  <meta property="og:image" content="https://profeps.ma/images/prof_eps.png">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Volleyball 2026 : les tests de règles FIVB expliqués | ProfEPS">
  <meta name="twitter:description" content="Position libre en réception dès l'initiation du service, plafond jouable, 8 remplacements, attaque stricte (9.2.2) et double contact en 2e touche.">
  <meta name="twitter:image" content="https://profeps.ma/images/prof_eps.png">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/profeps-unifier.min.css?v=20261101">
  <link rel="stylesheet" href="/assets/site.css?v=20261117">
  <script defer src="profeps-cmp.js"></script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8253776880916865" crossorigin="anonymous"></script>

  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Volleyball 2026 : les tests de règles FIVB expliqués",
    "description": "Explication des tests réglementaires approuvés par la FIVB pour 2026 : positionnement de l'équipe en réception, ballon touchant le plafond, attaques, double contact en 2e touche, 8 remplacements, challenge vidéo et protocole d'échauffement.",
    "inLanguage": "fr",
    "datePublished": "2026-04-21",
    "dateModified": "2026-11-23",
    "author": {{
      "@type": "Person",
      "name": "Abdelkhalek Kaci",
      "url": "https://profeps.ma/a-propos.html"
    }},
    "publisher": {{
      "@type": "Organization",
      "name": "ProfEPS",
      "logo": {{
        "@type": "ImageObject",
        "url": "https://profeps.ma/images/prof_eps.png"
      }}
    }},
    "mainEntityOfPage": "https://profeps.ma/article-nouveautes-reglement-volleyball-fivb-2026.html"
  }}
  </script>

  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {{
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://profeps.ma/index.html"
      }},
      {{
        "@type": "ListItem",
        "position": 2,
        "name": "Blog EPS",
        "item": "https://profeps.ma/blog.html"
      }},
      {{
        "@type": "ListItem",
        "position": 3,
        "name": "Tests de règles Volleyball FIVB 2026",
        "item": "https://profeps.ma/article-nouveautes-reglement-volleyball-fivb-2026.html"
      }}
    ]
  }}
  </script>

  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {{
        "@type": "Question",
        "name": "Les nouveautés volleyball 2026 remplacent-elles déjà le règlement FIVB 2025-2028 ?",
        "acceptedAnswer": {{
          "@type": "Answer",
          "text": "Non. Le règlement officiel de référence reste le Règlement FIVB 2025-2028. Les mesures 2026 ont été approuvées comme tests officiels dans les compétitions internationales FIVB avant décision sur leur adoption définitive."
        }}
      }},
      {{
        "@type": "Question",
        "name": "Qu'est-ce qui change pour la position des joueurs en réception ?",
        "acceptedAnswer": {{
          "@type": "Answer",
          "text": "L'équipe en réception doit être en ordre de rotation au coup de sifflet de l'arbitre, mais ses joueurs peuvent se déplacer librement dès que le serveur amorce son mouvement de service."
        }}
      }},
      {{
        "@type": "Question",
        "name": "Le ballon qui touche le plafond est-il jouable dans les tests 2026 ?",
        "acceptedAnswer": {{
          "@type": "Answer",
          "text": "Oui, à condition que le ballon reste du même côté du filet et soit joué dans le cadre des trois touches de l'équipe."
        }}
      }},
      {{
        "@type": "Question",
        "name": "Combien de remplacements par set sont testés en 2026 ?",
        "acceptedAnswer": {{
          "@type": "Answer",
          "text": "Le quota testé passe de 6 à 8 remplacements réguliers par équipe et par set."
        }}
      }},
      {{
        "@type": "Question",
        "name": "La tolérance sur le double contact en deuxième touche est-elle maintenue ?",
        "acceptedAnswer": {{
          "@type": "Answer",
          "text": "Oui. Le test autorisant le double contact lors d'une passe en deuxième touche vers un partenaire du même camp est prolongé en 2026."
        }}
      }}
    ]
  }}
  </script>

  <style>{SHARED_ARTICLE_CSS}</style>
</head>
<body>
{get_navbar_for(VOLLEYBALL_FILENAME)}

  <div class="reg2026-wrap">
    <nav class="reg2026-breadcrumb" aria-label="Fil d'Ariane">
      <a href="index.html">Accueil</a> &rsaquo; <a href="blog.html">Blog EPS</a> &rsaquo; <a href="reglement-volleyball-fivb-gestes-arbitrage-eps.html">Volleyball</a> &rsaquo; <span>Tests de règles FIVB 2026</span>
    </nav>

    <header class="reg2026-hero">
      <div class="reg2026-badges">
        <span class="reg2026-badge nba">FIVB 2026</span>
        <span class="reg2026-badge warn">Tests officiels en compétition</span>
        <span class="reg2026-badge eps">Lecture EPS &amp; Arbitrage</span>
      </div>
      <h1>Volleyball 2026 : les tests de règles FIVB expliqués simplement</h1>
      <p class="reg2026-lead">
        En février 2026, le Conseil d'administration de la FIVB a approuvé une série de <strong>tests réglementaires</strong>
        pour les grandes compétitions internationales 2026 (Volleyball Nations League, Championnats du monde U17, Championnats continentaux)
        afin de fluidifier le jeu, réduire les arrêts artificiels et rendre l'arbitrage plus lisible.
      </p>
      <div class="reg2026-meta">
        <span>Texte de base : <strong>Règlement officiel FIVB 2025-2028</strong></span>
        <span>Statut 2026 : <strong>Tests officiels FIVB en compétition internationale</strong></span>
        <span>Public : <strong>Professeurs d'EPS, entraîneurs, arbitres scolaires</strong></span>
      </div>
    </header>

    <div class="reg2026-grid-layout">
      <aside class="reg2026-toc" aria-label="Sommaire">
        <h2>Sommaire</h2>
        <ol>
          <li><a href="#sec-statut">Règlement en vigueur vs tests 2026</a></li>
          <li><a href="#sec-schemas">Schémas SVG des situations testées 2026</a></li>
          <li><a href="#sec-jeu">Les 5 grands changements dans le jeu</a></li>
          <li><a href="#sec-video">Challenge vidéo et rythme du match</a></li>
          <li><a href="#sec-protocole">Nouveau protocole d'échauffement</a></li>
          <li><a href="#sec-eps">Ce qui est utile en EPS et en ASS</a></li>
          <li><a href="#sec-faq">FAQ rapide</a></li>
          <li><a href="#sec-sources">Sources officielles</a></li>
        </ol>
      </aside>

      <main class="reg2026-article">
        <section id="sec-statut">
          <div class="note-box">
            <strong>Distinction importante (Règlement en vigueur vs Tests FIVB 2026) :</strong><br>
            Le règlement officiel applicable par défaut en milieu scolaire et fédéral demeure le <strong>Règlement officiel de volleyball FIVB 2025-2028</strong>.
            Les nouveautés détaillées dans cet article constituent les <strong>tests officiels approuvés par le Conseil d'administration de la FIVB en février 2026</strong> pour les compétitions internationales ciblées (Volleyball Nations League 2026, Championnats du monde U17 et Championnats continentaux) en vue de leur évaluation par le Congrès mondial de la FIVB.
          </div>

          <div class="summary-box">
            <strong>En 30 secondes :</strong>
            <ul>
              <li>L'équipe en <strong>réception</strong> doit être bien placée au <strong>coup de sifflet</strong>, mais peut bouger dès que le serveur amorce son geste.</li>
              <li>Un ballon qui touche le <strong>plafond / la structure supérieure</strong> reste jouable s'il demeure du même côté du filet.</li>
              <li>Le contrôle des <strong>attaques portées / poussées / accompagnées</strong> est resserré : seul le <em>tip</em> bref et net reste toléré.</li>
              <li>La tolérance du <strong>double contact en 2e touche</strong> (passe à un partenaire du même camp) est prolongée en 2026.</li>
              <li>Le nombre de <strong>remplacements réguliers</strong> testé passe de <strong>6 à 8 par set</strong>.</li>
            </ul>
          </div>
        </section>

        <section id="sec-schemas">
          <h2>1. Schémas SVG : visualisation des 4 situations clés des tests FIVB 2026</h2>
          <p>
            Ces quatre schémas vectoriels illustrent la mécanique concrète des tests réglementaires FIVB 2026 sur le terrain, au filet et dans la gestion d'équipe.
          </p>

          <div class="svg-grid">
            <!-- SVG 1: Réception libre dès l'initiation du service -->
            <div class="svg-card">
              <h4>1. Réception : mouvement dès l'initiation du service</h4>
              <div class="svg-canvas">
                <svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Positionnement libre en réception FIVB 2026">
                  <rect x="6" y="6" width="408" height="208" rx="10" fill="#eff6ff" stroke="#bfdbfe" stroke-width="2"/>
                  <!-- Half court reception -->
                  <rect x="36" y="34" width="230" height="142" fill="#ffffff" stroke="#1d4ed8" stroke-width="2"/>
                  <!-- Net on left, attack line -->
                  <line x1="36" y1="26" x2="36" y2="184" stroke="#0f172a" stroke-width="4"/>
                  <line x1="112" y1="34" x2="112" y2="176" stroke="#60a5fa" stroke-width="2" stroke-dasharray="5,4"/>
                  <text x="24" y="108" font-family="Plus Jakarta Sans, sans-serif" font-size="10" font-weight="800" fill="#0f172a" transform="rotate(-90 24 108)" text-anchor="middle">FILET</text>
                  <!-- Setter P1 moving early to target zone 2/3 -->
                  <circle cx="222" cy="145" r="15" fill="#1d4ed8"/>
                  <text x="222" y="149" font-family="Plus Jakarta Sans, sans-serif" font-size="10.5" font-weight="800" fill="#ffffff" text-anchor="middle">P1</text>
                  <path d="M 208 138 Q 140 120 75 74" fill="none" stroke="#15803d" stroke-width="3" stroke-dasharray="5,4"/>
                  <polygon points="70,70 81,71 75,80" fill="#15803d"/>
                  <circle cx="66" cy="66" r="13" fill="#dcfce7" stroke="#15803d" stroke-width="2" stroke-dasharray="3,2"/>
                  <text x="66" y="70" font-family="Plus Jakarta Sans, sans-serif" font-size="9" font-weight="800" fill="#15803d" text-anchor="middle">Cible</text>
                  <!-- Receivers -->
                  <circle cx="170" cy="64" r="13" fill="#64748b"/><text x="170" y="68" font-family="Plus Jakarta Sans, sans-serif" font-size="10" font-weight="700" fill="#fff" text-anchor="middle">P4</text>
                  <circle cx="185" cy="105" r="13" fill="#64748b"/><text x="185" y="109" font-family="Plus Jakarta Sans, sans-serif" font-size="10" font-weight="700" fill="#fff" text-anchor="middle">P6</text>
                  <!-- Timeline box on right -->
                  <rect x="278" y="34" width="124" height="142" rx="8" fill="#ffffff" stroke="#93c5fd"/>
                  <text x="340" y="54" font-family="Plus Jakarta Sans, sans-serif" font-size="10.5" font-weight="800" fill="#1e3a8a" text-anchor="middle">CHRONOLOGIE</text>
                  <text x="288" y="76" font-family="Plus Jakarta Sans, sans-serif" font-size="9.5" font-weight="700" fill="#0f172a">1. Coup de sifflet :</text>
                  <text x="288" y="90" font-family="Plus Jakarta Sans, sans-serif" font-size="9" fill="#475569">Ordre de rotation</text>
                  <text x="288" y="102" font-family="Plus Jakarta Sans, sans-serif" font-size="9" fill="#475569">obligatoire.</text>
                  <text x="288" y="124" font-family="Plus Jakarta Sans, sans-serif" font-size="9.5" font-weight="700" fill="#15803d">2. Geste serveur :</text>
                  <text x="288" y="138" font-family="Plus Jakarta Sans, sans-serif" font-size="9" fill="#15803d">Lancer / course =</text>
                  <text x="288" y="150" font-family="Plus Jakarta Sans, sans-serif" font-size="9" fill="#15803d">déplacement libre</text>
                  <text x="288" y="162" font-family="Plus Jakarta Sans, sans-serif" font-size="9" fill="#15803d">avant la frappe !</text>
                  <text x="210" y="198" font-family="Plus Jakarta Sans, sans-serif" font-size="10.5" font-weight="700" fill="#1e3a8a" text-anchor="middle">Fin des fautes de position sifflées au millième de seconde de la frappe</text>
                </svg>
              </div>
              <p>Au sifflet, l'équipe en réception respecte la rotation. Dès que le serveur lance la balle ou amorce son élan, le passeur et les réceptionneurs peuvent permuter.</p>
            </div>

            <!-- SVG 2: Ballon touchant le plafond -->
            <div class="svg-card">
              <h4>2. Ballon touchant le plafond / l'infrastructure</h4>
              <div class="svg-canvas">
                <svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ballon touchant le plafond FIVB 2026">
                  <rect x="6" y="6" width="408" height="208" rx="10" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="2"/>
                  <!-- Ceiling structure -->
                  <rect x="24" y="20" width="372" height="16" fill="#334155" rx="4"/>
                  <text x="210" y="32" font-family="Plus Jakarta Sans, sans-serif" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">PLAFOND / POUTRES DU GYMNASE (&gt; 7m)</text>
                  <!-- Floor & Net -->
                  <line x1="24" y1="168" x2="396" y2="168" stroke="#0f172a" stroke-width="3"/>
                  <line x1="210" y1="92" x2="210" y2="168" stroke="#0f172a" stroke-width="4"/>
                  <text x="115" y="184" font-family="Plus Jakarta Sans, sans-serif" font-size="10.5" font-weight="800" fill="#15803d" text-anchor="middle">CAMP ÉQUIPE A (JOUABLE)</text>
                  <text x="305" y="184" font-family="Plus Jakarta Sans, sans-serif" font-size="10.5" font-weight="800" fill="#b91c1c" text-anchor="middle">CAMP ÉQUIPE B (FAUTE SI FRANCHI)</text>
                  <!-- Trajectory 1: stays in Side A (VALID) -->
                  <path d="M 70 148 Q 105 36 145 142" fill="none" stroke="#15803d" stroke-width="3"/>
                  <circle cx="107" cy="39" r="7" fill="#eab308" stroke="#0f172a" stroke-width="1.5"/>
                  <rect x="52" y="54" width="114" height="24" rx="5" fill="#ffffff" stroke="#15803d" stroke-width="1.5"/>
                  <text x="109" y="70" font-family="Plus Jakarta Sans, sans-serif" font-size="10" font-weight="800" fill="#15803d" text-anchor="middle">✓ JEU CONTINUE (1re→2e)</text>
                  <!-- Trajectory 2: crosses to Side B after ceiling (FAULT) -->
                  <path d="M 165 148 Q 225 36 315 142" fill="none" stroke="#b91c1c" stroke-width="2.5" stroke-dasharray="5,4"/>
                  <circle cx="232" cy="39" r="7" fill="#f87171" stroke="#b91c1c" stroke-width="1.5"/>
                  <rect x="242" y="54" width="136" height="24" rx="5" fill="#fef2f2" stroke="#b91c1c" stroke-width="1.5"/>
                  <text x="310" y="70" font-family="Plus Jakarta Sans, sans-serif" font-size="10" font-weight="800" fill="#b91c1c" text-anchor="middle">✗ BALLON HORS-JEU (POINT B)</text>
                  <text x="210" y="202" font-family="Plus Jakarta Sans, sans-serif" font-size="10" font-weight="600" fill="#166534" text-anchor="middle">Très pertinent dans les gymnases scolaires bas de plafond : l'échange est sauvé</text>
                </svg>
              </div>
              <p>Si une défense ou réception heurte le plafond et retombe dans le même camp, l'équipe peut jouer sa 2e ou 3e touche normalement.</p>
            </div>

            <!-- SVG 3: Attaque stricte (9.2.2) vs Double contact 2e touche -->
            <div class="svg-card">
              <h4>3. Attaque stricte (9.2.2) vs Double contact en 2e touche</h4>
              <div class="svg-canvas">
                <svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Attaque stricte 9.2.2 et double contact en 2e touche FIVB 2026">
                  <rect x="6" y="6" width="408" height="208" rx="10" fill="#fff7ed" stroke="#fed7aa" stroke-width="2"/>
                  <line x1="210" y1="16" x2="210" y2="204" stroke="#fdba74" stroke-width="2"/>
                  <!-- Left: Attack Hit strict 9.2.2 -->
                  <text x="108" y="28" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="800" fill="#b91c1c" text-anchor="middle">3e TOUCHE / ATTAQUE (STRICT)</text>
                  <rect x="18" y="38" width="180" height="72" rx="8" fill="#ffffff" stroke="#86efac"/>
                  <text x="28" y="56" font-family="Plus Jakarta Sans, sans-serif" font-size="10.5" font-weight="800" fill="#15803d">✓ Autorisé : Smash ou Tip franc</text>
                  <text x="28" y="72" font-family="Plus Jakarta Sans, sans-serif" font-size="9.5" fill="#0f172a">Contact unique, bref, net et</text>
                  <text x="28" y="86" font-family="Plus Jakarta Sans, sans-serif" font-size="9.5" fill="#0f172a">explosif du bout des doigts.</text>

                  <rect x="18" y="118" width="180" height="80" rx="8" fill="#fef2f2" stroke="#fca5a5"/>
                  <text x="28" y="136" font-family="Plus Jakarta Sans, sans-serif" font-size="10.5" font-weight="800" fill="#b91c1c">✗ Sifflé faute (Porté — 9.2.2)</text>
                  <text x="28" y="152" font-family="Plus Jakarta Sans, sans-serif" font-size="9.5" fill="#0f172a">• Changement de direction en l'air</text>
                  <text x="28" y="166" font-family="Plus Jakarta Sans, sans-serif" font-size="9.5" fill="#0f172a">• Poussée à deux mains / accompagné</text>
                  <text x="28" y="180" font-family="Plus Jakarta Sans, sans-serif" font-size="9.5" fill="#0f172a">• Contact prolongé au-dessus du filet</text>

                  <!-- Right: 2nd touch double contact tolerance -->
                  <text x="312" y="28" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="800" fill="#15803d" text-anchor="middle">2e TOUCHE / PASSE (TOLÉRANCE)</text>
                  <rect x="222" y="38" width="180" height="160" rx="8" fill="#ffffff" stroke="#86efac"/>
                  <!-- Setter passing to attacker in same court -->
                  <circle cx="262" cy="128" r="14" fill="#1d4ed8"/><text x="262" y="132" font-family="Plus Jakarta Sans, sans-serif" font-size="9.5" font-weight="800" fill="#fff" text-anchor="middle">Passe</text>
                  <circle cx="362" cy="112" r="14" fill="#15803d"/><text x="362" y="116" font-family="Plus Jakarta Sans, sans-serif" font-size="9.5" font-weight="800" fill="#fff" text-anchor="middle">Att.</text>
                  <path d="M 272 114 Q 312 52 350 100" fill="none" stroke="#15803d" stroke-width="2.5"/>
                  <circle cx="282" cy="96" r="6" fill="#eab308"/><circle cx="290" cy="90" r="6" fill="#eab308"/>
                  <text x="232" y="156" font-family="Plus Jakarta Sans, sans-serif" font-size="9.8" font-weight="700" fill="#15803d">✓ Double contact autorisé en 2e</text>
                  <text x="232" y="170" font-family="Plus Jakarta Sans, sans-serif" font-size="9.5" fill="#0f172a">touche si action unique et ballon</text>
                  <text x="232" y="184" font-family="Plus Jakarta Sans, sans-serif" font-size="9.5" fill="#0f172a">destiné à un partenaire du camp.</text>
                </svg>
              </div>
              <p>Sévérité accrue sur la 3e touche d'attaque (interdiction des ballons poussés ou redirigés), mais bienveillance maintenue sur le double contact lors de la passe en 2e touche.</p>
            </div>

            <!-- SVG 4: 8 remplacements & Protocole d'échauffement 90s -->
            <div class="svg-card">
              <h4>4. Quota de 8 remplacements &amp; Échauffement 90 s</h4>
              <div class="svg-canvas">
                <svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="8 remplacements par set et échauffement 90s FIVB 2026">
                  <rect x="6" y="6" width="408" height="208" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
                  <!-- Top card: 8 substitutions -->
                  <rect x="20" y="20" width="380" height="84" rx="8" fill="#ffffff" stroke="#93c5fd" stroke-width="1.5"/>
                  <text x="34" y="42" font-family="Plus Jakarta Sans, sans-serif" font-size="11.5" font-weight="800" fill="#1d4ed8">QUOTA DE REMPLACEMENTS PAR SET : 6 → 8</text>
                  <!-- 8 boxes -->
                  <g transform="translate(34, 52)">
                    <rect x="0" y="0" width="36" height="28" rx="5" fill="#dbeafe" stroke="#1d4ed8"/><text x="18" y="18" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="800" fill="#1e3a8a" text-anchor="middle">1</text>
                    <rect x="42" y="0" width="36" height="28" rx="5" fill="#dbeafe" stroke="#1d4ed8"/><text x="60" y="18" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="800" fill="#1e3a8a" text-anchor="middle">2</text>
                    <rect x="84" y="0" width="36" height="28" rx="5" fill="#dbeafe" stroke="#1d4ed8"/><text x="102" y="18" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="800" fill="#1e3a8a" text-anchor="middle">3</text>
                    <rect x="126" y="0" width="36" height="28" rx="5" fill="#dbeafe" stroke="#1d4ed8"/><text x="144" y="18" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="800" fill="#1e3a8a" text-anchor="middle">4</text>
                    <rect x="168" y="0" width="36" height="28" rx="5" fill="#dbeafe" stroke="#1d4ed8"/><text x="186" y="18" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="800" fill="#1e3a8a" text-anchor="middle">5</text>
                    <rect x="210" y="0" width="36" height="28" rx="5" fill="#dbeafe" stroke="#1d4ed8"/><text x="228" y="18" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="800" fill="#1e3a8a" text-anchor="middle">6</text>
                    <rect x="252" y="0" width="36" height="28" rx="5" fill="#dcfce7" stroke="#15803d" stroke-width="2"/><text x="270" y="18" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="800" fill="#15803d" text-anchor="middle">+7</text>
                    <rect x="294" y="0" width="36" height="28" rx="5" fill="#dcfce7" stroke="#15803d" stroke-width="2"/><text x="312" y="18" font-family="Plus Jakarta Sans, sans-serif" font-size="11" font-weight="800" fill="#15803d" text-anchor="middle">+8</text>
                  </g>
                  <text x="34" y="95" font-family="Plus Jakarta Sans, sans-serif" font-size="9.5" font-weight="600" fill="#475569">Harmonisation : 12 à 14 joueurs inscrits avec 1 ou 2 libéros dans tous les cas</text>

                  <!-- Bottom card: 90s service warm-up + Challenge rule -->
                  <rect x="20" y="114" width="380" height="86" rx="8" fill="#ffffff" stroke="#fdba74" stroke-width="1.5"/>
                  <text x="34" y="135" font-family="Plus Jakarta Sans, sans-serif" font-size="11.5" font-weight="800" fill="#c2410c">PROTOCOLE D'ÉCHAUFFEMENT AU SERVICE SÉPARÉ</text>
                  <rect x="34" y="144" width="166" height="28" rx="5" fill="#fff7ed" stroke="#c2410c"/>
                  <text x="117" y="162" font-family="Plus Jakarta Sans, sans-serif" font-size="10.5" font-weight="800" fill="#c2410c" text-anchor="middle">90 s — Équipe A seule</text>
                  <rect x="214" y="144" width="166" height="28" rx="5" fill="#eff6ff" stroke="#1d4ed8"/>
                  <text x="297" y="162" font-family="Plus Jakarta Sans, sans-serif" font-size="10.5" font-weight="800" fill="#1d4ed8" text-anchor="middle">90 s — Équipe B seule</text>
                  <text x="34" y="190" font-family="Plus Jakarta Sans, sans-serif" font-size="9.5" font-weight="600" fill="#475569">Sécurité accrue : fini les services croisés simultanés des deux équipes</text>
                </svg>
              </div>
              <p>8 remplacements par set pour impliquer davantage le banc, et deux fenêtres séparées de 90 secondes pour l'échauffement au service avant le match.</p>
            </div>
          </div>
        </section>

        <section id="sec-jeu">
          <h2>2. Les 5 grands changements testés dans le jeu</h2>

          <div class="table-wrap">
            <table class="reg2026-table">
              <thead>
                <tr>
                  <th>Point du règlement</th>
                  <th>Règle classique (2025-2028)</th>
                  <th>Test FIVB 2026</th>
                  <th>Objectif</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>1. Position de l'équipe en réception</strong></td>
                  <td>Les joueurs en réception doivent respecter leurs positions relatives jusqu'au <strong>moment où le ballon est frappé</strong> par le serveur.</td>
                  <td>L'équipe en réception doit être en ordre de rotation au <strong>coup de sifflet du 1er arbitre</strong>, mais peut se déplacer dès que le serveur <strong>amorce son mouvement de service</strong> (lancer ou prise d'élan).</td>
                  <td>Réduire les fautes de position purement techniques et fluidifier la mise en place offensive.</td>
                </tr>
                <tr>
                  <td><strong>2. Ballon touchant le plafond</strong></td>
                  <td>Un ballon qui touche le plafond ou une structure au-dessus du terrain est hors-jeu.</td>
                  <td>Si le ballon touche le plafond / l'infrastructure supérieure et <strong>reste du même côté du filet</strong>, l'échange continue dans la limite des 3 touches. S'il rebondit dans le camp adverse, l'équipe fautive perd le point.</td>
                  <td>Sauver des échanges spectaculaires en défense.</td>
                </tr>
                <tr>
                  <td><strong>3. Interprétation des attaques (règle 9.2.2)</strong></td>
                  <td>Tolérance parfois variable sur certaines attaques poussées, accompagnées ou redirigées.</td>
                  <td>Application plus stricte : en attaque, seul un <strong>tip bref et net</strong> est admis ; les ballons portés, accompagnés, poussés à deux mains ou avec changement de direction sont sanctionnés.</td>
                  <td>Clarifier la frontière entre frappe franche et ballon porté.</td>
                </tr>
                <tr>
                  <td><strong>4. Double contact en 2e touche</strong></td>
                  <td>Déjà testé en 2025 en VNL.</td>
                  <td><strong>Prolongation du test en 2026 :</strong> un double contact en <strong>2e touche</strong> (action de passe en un seul geste) reste autorisé si le ballon est joué vers un partenaire du même camp.</td>
                  <td>Favoriser la continuité du jeu et réduire les coups de sifflet jugés trop sévères.</td>
                </tr>
                <tr>
                  <td><strong>5. Nombre de remplacements</strong></td>
                  <td>6 remplacements réguliers maximum par équipe et par set.</td>
                  <td>Jusqu'à <strong>8 remplacements réguliers</strong> par équipe et par set (avec harmonisation des feuilles d'équipe : 12 à 14 joueurs peuvent inclure 1 ou 2 libéros).</td>
                  <td>Donner plus de souplesse tactique aux entraîneurs.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="sec-video">
          <h2>3. Challenge vidéo, temps morts et relation arbitre–entraîneur</h2>
          <p>
            Dans les compétitions équipées du système de <strong>Video Challenge</strong>, la FIVB teste également une procédure modernisée :
          </p>
          <ul>
            <li><strong>Marquage en cours d'échange :</strong> l'équipe peut "marquer" sur la tablette une action douteuse pendant l'échange, puis choisir en fin d'échange quelle action elle conteste réellement.</li>
            <li><strong>Touches en défense et en réception :</strong> le challenge est élargi à la vérification d'un contact sur une action de réception ou de défense.</li>
            <li><strong>Fin du challenge utilisé comme "faux temps mort" :</strong> l'équipe qui vient de demander un challenge ne peut pas demander immédiatement un temps mort avant le point suivant (l'équipe adverse, elle, le peut).</li>
            <li><strong>Moins de sifflets sur les fautes déjà couvertes par le challenge :</strong> certaines situations litigieuses (balle in/out très serrée, touche au bloc, filet hors antenne) sont laissées au challenge plutôt qu'interrompues prématurément si l'arbitre n'en est pas certain à 100 %.</li>
            <li><strong>Communication autorisée :</strong> les entraîneurs peuvent échanger avec le 1er arbitre pour demander une clarification ou un éclaircissement sur un challenge, tant que cela ne retarde pas le match.</li>
          </ul>
        </section>

        <section id="sec-protocole">
          <h2>4. Protocole d'avant-match : échauffement au service séparé</h2>
          <p>
            Pour améliorer la sécurité à l'échauffement, les deux équipes ne servent plus en même temps lors de la séquence officielle :
            chaque équipe dispose désormais de sa propre fenêtre dédiée de <strong>90 secondes</strong> pour l'échauffement au service.
          </p>
        </section>

        <section id="sec-eps">
          <h2>5. Ce qu'un professeur d'EPS peut retenir pour ses cours</h2>
          <div class="eps-box">
            <strong>Applications concrètes en EPS et à l'ASS (OP 2007 &amp; OP 2009 / FRMSS) :</strong>
            <ul>
              <li><strong>Le plafond jouable dans son propre camp :</strong> très pertinent dans les gymnases scolaires à plafond bas, où une réception haute touche souvent une poutre.</li>
              <li><strong>La tolérance sur le double contact en 2e touche :</strong> excellente règle pédagogique pour encourager les élèves à construire en 3 touches sans être coupés à chaque passe un peu vrillée.</li>
              <li><strong>L'interdiction des ballons poussés / accompagnés en attaque :</strong> utile pour apprendre aux élèves la différence entre une <em>passe</em>, un <em>tip franc</em> et un <em>ballon porté</em>.</li>
              <li><strong>Le départ des réceptionneurs dès le geste du serveur :</strong> plus naturel à arbitrer pour des élèves-arbitres que le contrôle au centième de seconde de la frappe.</li>
            </ul>
          </div>

          <h3>Articles et ressources Volleyball associés sur ProfEPS</h3>
          <div class="related-links-grid">
            <a class="related-link-card" href="reglement-volleyball-fivb-gestes-arbitrage-eps.html">
              <strong>Règlement Volleyball FIVB 2025-2028 &amp; Gestes d'Arbitrage</strong>
              <span>Terrain 18x9m, rotations, libéro, gestes officiels illustrés et PDF.</span>
            </a>
            <a class="related-link-card" href="table-de-marque-volleyball-eps.html">
              <strong>Table de Marque Volleyball en EPS</strong>
              <span>Feuille de match scolaire, suivi des rotations et des 8 remplacements.</span>
            </a>
            <a class="related-link-card" href="aps-volleyball-eps-maroc.html">
              <strong>APS Volleyball en EPS au Maroc</strong>
              <span>Didactique, compétences OP 2007 / 2009 et situations d'apprentissage.</span>
            </a>
            <a class="related-link-card" href="article-volleyball-eps.html">
              <strong>Enseigner le Volleyball en EPS</strong>
              <span>Progressions pédagogiques du jeu 2c2/4c4 au 6c6 réglementaire.</span>
            </a>
            <a class="related-link-card" href="article-nouveautes-reglement-basketball-fiba-nba-2026.html">
              <strong>Règlement Basketball 2026 : FIBA &amp; NBA</strong>
              <span>Faute disruptive (DI), faute flagrante (FL), action de tir et IRS.</span>
            </a>
          </div>
        </section>

        <section id="sec-faq">
          <h2>6. FAQ — Questions fréquentes</h2>

          <details open>
            <summary>Ces règles FIVB 2026 s'appliquent-elles déjà automatiquement à tous les matchs scolaires ?</summary>
            <p>Non. Le texte de base reste le <strong>Règlement FIVB 2025-2028</strong>. Les mesures 2026 sont d'abord des <strong>tests officiels FIVB</strong> dans des compétitions internationales ciblées, même si certaines idées peuvent servir d'aménagement pédagogique en EPS.</p>
          </details>

          <details>
            <summary>Les joueurs en réception peuvent-ils ignorer l'ordre de rotation ?</summary>
            <p>Non. L'ordre de rotation reste obligatoire au <strong>coup de sifflet</strong> de l'arbitre. Ce qui change dans le test 2026, c'est le moment à partir duquel ils peuvent bouger : dès l'initiation du geste de service, et non plus seulement à l'impact sur le ballon.</p>
          </details>

          <details>
            <summary>Un ballon qui touche le plafond et passe chez l'adversaire est-il bon ?</summary>
            <p>Non. Il n'est jouable que s'il reste <strong>dans le même camp</strong>. S'il rebondit dans le camp adverse après avoir touché le plafond, le point est perdu.</p>
          </details>

          <details>
            <summary>Le double contact est-il autorisé sur un renvoi en 3e touche ?</summary>
            <p>Non. La tolérance porte uniquement sur la <strong>2e touche</strong> lorsqu'il s'agit d'une passe en un seul geste vers un coéquipier de son propre camp.</p>
          </details>

          <details>
            <summary>Combien de remplacements par set sont testés en 2026 ?</summary>
            <p>Le quota testé passe de <strong>6 à 8 remplacements réguliers</strong> par équipe et par set.</p>
          </details>
        </section>

        <section id="sec-sources">
          <h2>7. Sources officielles et documents de référence</h2>
          <ul class="sources-list">
            <li>
              NORCECA / FIVB — Communiqué détaillant les règles testées en 2026 :
              <a href="https://norceca.net/fivb-set-to-test-rule-changes-in-2026.htm" target="_blank" rel="noopener noreferrer">
                FIVB set to test rule changes in 2026
              </a>
            </li>
            <li>
              FIVB — Règlement officiel de volleyball 2025-2028 (texte de référence en vigueur) :
              <a href="https://images.volleyballworld.com/image/upload/fl_attachment/fivb-prd/r9s632bbp1lxl2243442.pdf" target="_blank" rel="noopener noreferrer">
                Official Volleyball Rules 2025-2028 (PDF)
              </a>
            </li>
            <li>
              Synthèse détaillée du communiqué FIVB du 26 février 2026 :
              <a href="https://worldofvolley.com/latest_news/fivb/337590/fivb-to-trial-new-volleyball-rule-adjustments-across-2026-competitions.html" target="_blank" rel="noopener noreferrer">
                FIVB to trial new volleyball rule adjustments across 2026 competitions
              </a>
            </li>
          </ul>
        </section>
      </main>
    </div>
  </div>

{EEAT_BLOCK}
{FOOTER_BLOCK}
  <script src="profeps-communaute.js"></script>
</body>
</html>
"""

with open(os.path.join(PUBLIC_DIR, BASKETBALL_FILENAME), "w", encoding="utf-8") as f:
    f.write(BASKETBALL_HTML)
print(f"Created {BASKETBALL_FILENAME}")

with open(os.path.join(PUBLIC_DIR, VOLLEYBALL_FILENAME), "w", encoding="utf-8") as f:
    f.write(VOLLEYBALL_HTML)
print(f"Created {VOLLEYBALL_FILENAME}")

# ==============================================================================
# 3. UPDATE /public/blog.html
# ==============================================================================
BLOG_PATH = os.path.join(PUBLIC_DIR, "blog.html")
with open(BLOG_PATH, "r", encoding="utf-8") as f:
    blog_html = f.read()

NEW_BLOG_CARDS = """                <article class="article-card" data-category="reglements">
                    <div class="article-visual article-reglements">
                        <span class="category-badge category-reglements">🏀 Nouveautés FIBA &amp; NBA 2026</span>
                        <div class="article-icon">
                            <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#c2410c" stroke-width="2"/><path d="M5.6 5.6c3.5 3.5 9.3 3.5 12.8 0M5.6 18.4c3.5-3.5 9.3-3.5 12.8 0M12 3v18M3 12h18" stroke="#1e293b" stroke-width="1.8" stroke-linecap="round"/></svg>
                        </div>
                    </div>
                    <div class="article-content">
                        <h3 class="article-title">Règlement Basketball 2026 : Ce qui change à la FIBA (1er oct. 2026) et à la NBA</h3>
                        <p class="article-excerpt">Faute disruptive (DI), faute flagrante (FL), fautes techniques de catégorie 1 et 2, action de tir (art. 15), IRS, règle des « heaves » NBA et lecture pédagogique pour l'EPS et la table de marque.</p>
                        <div class="article-footer">
                            <span class="article-date">23 Novembre 2026</span>
                            <a href="article-nouveautes-reglement-basketball-fiba-nba-2026.html" class="read-more">Nouveautés 2026 →</a>
                        </div>
                    </div>
                </article>
                <article class="article-card" data-category="reglements">
                    <div class="article-visual article-reglements">
                        <span class="category-badge category-reglements">🏐 Tests FIVB 2026 · Arbitrage</span>
                        <div class="article-icon">
                            <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#1d4ed8" stroke-width="2"/><path d="M12 3c2.5 4 2.5 14 0 18M4.5 7.5c4.5 2 10.5 2 15 0M4.5 16.5c4.5-2 10.5-2 15 0" stroke="#0f766e" stroke-width="1.8" stroke-linecap="round"/></svg>
                        </div>
                    </div>
                    <div class="article-content">
                        <h3 class="article-title">Volleyball 2026 : Les Tests de Règles FIVB Expliqués pour l'EPS</h3>
                        <p class="article-excerpt">Déplacement libre en réception dès l'initiation du service, ballon touchant le plafond jouable, 8 remplacements par set, attaque stricte (9.2.2), double contact en 2e touche et challenge vidéo.</p>
                        <div class="article-footer">
                            <span class="article-date">23 Novembre 2026</span>
                            <a href="article-nouveautes-reglement-volleyball-fivb-2026.html" class="read-more">Tests FIVB 2026 →</a>
                        </div>
                    </div>
                </article>
"""

if BASKETBALL_FILENAME not in blog_html:
    # Insert right before the existing reglement-basketball-fiba-gestes-arbitrage-eps.html card
    anchor_idx = blog_html.find('href="reglement-basketball-fiba-gestes-arbitrage-eps.html"')
    if anchor_idx != -1:
        card_start = blog_html.rfind('<article class="article-card"', 0, anchor_idx)
        if card_start != -1:
            blog_html = blog_html[:card_start] + NEW_BLOG_CARDS + blog_html[card_start:]
            with open(BLOG_PATH, "w", encoding="utf-8") as f:
                f.write(blog_html)
            print("Updated blog.html with both 2026 regulatory article cards.")

# ==============================================================================
# 4. UPDATE /public/sitemap.xml
# ==============================================================================
SITEMAP_PATH = os.path.join(PUBLIC_DIR, "sitemap.xml")
with open(SITEMAP_PATH, "r", encoding="utf-8") as f:
    sitemap_xml = f.read()

SITEMAP_ENTRIES = """  <url>
    <loc>https://profeps.ma/article-nouveautes-reglement-basketball-fiba-nba-2026.html</loc>
    <lastmod>2026-11-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://profeps.ma/article-nouveautes-reglement-volleyball-fivb-2026.html</loc>
    <lastmod>2026-11-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
</urlset>"""

if BASKETBALL_FILENAME not in sitemap_xml:
    sitemap_xml = sitemap_xml.replace("</urlset>", SITEMAP_ENTRIES)
    with open(SITEMAP_PATH, "w", encoding="utf-8") as f:
        f.write(sitemap_xml)
    print("Updated sitemap.xml with both 2026 regulatory articles.")

# ==============================================================================
# 5. CROSS-LINK IN RELATED BASKETBALL & VOLLEYBALL ARTICLES
# ==============================================================================
BASKETBALL_RELATED_FILES = [
    "reglement-basketball-fiba-gestes-arbitrage-eps.html",
    "article-gestes-arbitres-basketball.html",
    "article-basketball-eps.html",
    "article-basket-3x3-eps.html",
    "aps-basketball-eps-maroc.html",
    "table-de-marque-basketball-eps.html",
    "cycle-basketball-college-eps-maroc.html",
    "cycle-basketball-lycee-eps-maroc.html",
]

VOLLEYBALL_RELATED_FILES = [
    "reglement-volleyball-fivb-gestes-arbitrage-eps.html",
    "article-volleyball-eps.html",
    "article-beach-volley-eps.html",
    "aps-volleyball-eps-maroc.html",
    "table-de-marque-volleyball-eps.html",
    "cycle-volleyball-college-eps-maroc.html",
    "cycle-volleyball-lycee-eps-maroc.html",
]

BASKET_CROSSLINK_BLOCK = """<!-- PROFEPS_2026_BASKET_CROSSLINK_START -->
<section aria-label="Nouveautés règlement basketball 2026" style="max-width:1120px;margin:24px auto;padding:0 18px;">
  <div style="background:linear-gradient(135deg,#fff7ed 0%,#ffffff 100%);border:1px solid #fed7aa;border-radius:14px;padding:18px 22px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;box-shadow:0 6px 18px -4px rgba(15,23,42,0.06);">
    <div style="flex:1 1 520px;">
      <span style="display:inline-block;padding:4px 10px;border-radius:6px;background:#ffedd5;color:#c2410c;font-size:0.76rem;font-weight:800;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px;">Mise à jour réglementaire FIBA &amp; NBA 2026</span>
      <h3 style="margin:0 0 6px;font-size:1.12rem;color:#0f172a;font-weight:800;">Règlement Basketball 2026 : Faute disruptive (DI), faute flagrante (FL), action de tir et nouveautés NBA</h3>
      <p style="margin:0;font-size:0.93rem;color:#475569;line-height:1.55;">Consultez notre dossier complet sur les nouvelles règles FIBA applicables au 1er octobre 2026 (articles 15, 24, 36, 37, 38, IRS, feuille de marque Annexe B) et la règle NBA des « heaves » avec schémas SVG.</p>
    </div>
    <a href="article-nouveautes-reglement-basketball-fiba-nba-2026.html" style="display:inline-flex;align-items:center;gap:8px;padding:11px 18px;border-radius:10px;background:#c2410c;color:#ffffff;font-weight:700;font-size:0.92rem;text-decoration:none;white-space:nowrap;">Lire les nouveautés FIBA &amp; NBA 2026 &rarr;</a>
  </div>
</section>
<!-- PROFEPS_2026_BASKET_CROSSLINK_END -->
"""

VOLLEY_CROSSLINK_BLOCK = """<!-- PROFEPS_2026_VOLLEY_CROSSLINK_START -->
<section aria-label="Tests de règles volleyball FIVB 2026" style="max-width:1120px;margin:24px auto;padding:0 18px;">
  <div style="background:linear-gradient(135deg,#eff6ff 0%,#ffffff 100%);border:1px solid #bfdbfe;border-radius:14px;padding:18px 22px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;box-shadow:0 6px 18px -4px rgba(15,23,42,0.06);">
    <div style="flex:1 1 520px;">
      <span style="display:inline-block;padding:4px 10px;border-radius:6px;background:#dbeafe;color:#1d4ed8;font-size:0.76rem;font-weight:800;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px;">Dossier Arbitrage &amp; Tests Officiels FIVB 2026</span>
      <h3 style="margin:0 0 6px;font-size:1.12rem;color:#0f172a;font-weight:800;">Volleyball 2026 : Réception libre dès l'élan du serveur, plafond jouable, 8 remplacements et attaque stricte</h3>
      <p style="margin:0;font-size:0.93rem;color:#475569;line-height:1.55;">Découvrez les tests réglementaires approuvés par la FIVB en 2026 (VNL, Mondiaux U17, Championnats continentaux), la distinction avec le code FIVB 2025-2028 et leur transposition en EPS avec schémas SVG.</p>
    </div>
    <a href="article-nouveautes-reglement-volleyball-fivb-2026.html" style="display:inline-flex;align-items:center;gap:8px;padding:11px 18px;border-radius:10px;background:#1d4ed8;color:#ffffff;font-weight:700;font-size:0.92rem;text-decoration:none;white-space:nowrap;">Lire les tests FIVB 2026 &rarr;</a>
  </div>
</section>
<!-- PROFEPS_2026_VOLLEY_CROSSLINK_END -->
"""


def inject_crosslink(rel_files, target_href, block_html):
    count = 0
    for fname in rel_files:
        fpath = os.path.join(PUBLIC_DIR, fname)
        if not os.path.exists(fpath):
            continue
        with open(fpath, "r", encoding="utf-8") as f:
            content = f.read()
        if target_href in content:
            continue
        if "<!-- PROFEPS_EEAT_AUTHOR_START -->" in content:
            content = content.replace(
                "<!-- PROFEPS_EEAT_AUTHOR_START -->",
                block_html + "\n<!-- PROFEPS_EEAT_AUTHOR_START -->",
                1,
            )
        elif "<!-- PROFEPS_UNIFIED_FOOTER_START -->" in content:
            content = content.replace(
                "<!-- PROFEPS_UNIFIED_FOOTER_START -->",
                block_html + "\n<!-- PROFEPS_UNIFIED_FOOTER_START -->",
                1,
            )
        else:
            content = content.replace("</body>", block_html + "\n</body>", 1)
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(content)
        count += 1
        print(f"Cross-linked {target_href} inside {fname}")
    return count


b_cnt = inject_crosslink(BASKETBALL_RELATED_FILES, BASKETBALL_FILENAME, BASKET_CROSSLINK_BLOCK)
v_cnt = inject_crosslink(VOLLEYBALL_RELATED_FILES, VOLLEYBALL_FILENAME, VOLLEY_CROSSLINK_BLOCK)
print(f"Cross-linking complete: {b_cnt} Basketball pages, {v_cnt} Volleyball pages.")
