#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Étape 2B du Plan Directeur SEO — ProfEPS Maroc (profeps.ma)
Création et indexation des 4 Articles Piliers Exclusifs Maroc (Axes 2 & 3 du Plan) :
1. article-baremes-bac-sport-maroc-officiels-libres.html
2. article-inspection-pedagogique-titularisation-eps-maroc.html
3. article-gestion-grands-effectifs-dispenses-eps-maroc.html
4. comparatif-generateur-eps-gratuit-maroc.html
+ Intégration dans blog.html, sitemap.xml et maillage interne
+ Synchronisation public/ -> racine / (SANS TOUCHER A generateur.html)
"""

import os
import re
import json
import shutil

PUBLIC_DIR = "/app/applet/public"
ROOT_DIR = "/app/applet"


def extract_template_parts():
    """Extract head/navbar and E-E-A-T/footer from an existing standardized article."""
    ref_path = os.path.join(PUBLIC_DIR, "reglement-lancer-poids-athletisme-bac-eps.html")
    with open(ref_path, "r", encoding="utf-8") as f:
        html = f.read()

    nav_start = html.find("<!-- PROFEPS_UNIFIED_NAVBAR_START -->")
    nav_end = html.find("<!-- PROFEPS_UNIFIED_NAVBAR_END -->") + len("<!-- PROFEPS_UNIFIED_NAVBAR_END -->")
    navbar_html = html[nav_start:nav_end]

    eeat_start = html.find("<!-- PROFEPS_EEAT_AUTHOR_START -->")
    footer_html = html[eeat_start:]

    return navbar_html, footer_html


def build_article_html(filename, title, meta_desc, badge, h1, ref_label, read_time, toc_items, body_html, faq_list, breadcrumb_name):
    navbar_html, footer_html = extract_template_parts()
    navbar_custom = navbar_html.replace(
        'data-current-file="reglement-lancer-poids-athletisme-bac-eps.html"',
        f'data-current-file="{filename}"'
    )

    canonical_url = f"https://profeps.ma/{filename}"

    tech_article_schema = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": title.replace(" | ProfEPS", ""),
        "description": meta_desc,
        "inLanguage": "fr-MA",
        "author": {
            "@type": "Person",
            "name": "Abdelkhalek ELBOUDANI",
            "jobTitle": "Professeur d'Éducation Physique et Sportive (EPS)",
            "url": "https://profeps.ma/a-propos.html",
            "worksFor": {
                "@type": "EducationalOrganization",
                "name": "ProfEPS Maroc",
                "url": "https://profeps.ma/"
            }
        },
        "publisher": {"@id": "https://profeps.ma/#organization"},
        "datePublished": "2026-11-03",
        "dateModified": "2026-11-03",
        "image": "https://profeps.ma/images/prof_eps.png",
        "mainEntityOfPage": {"@type": "WebPage", "@id": canonical_url}
    }

    faq_schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": q,
                "acceptedAnswer": {"@type": "Answer", "text": a}
            }
            for q, a in faq_list
        ]
    }

    breadcrumb_schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Accueil ProfEPS Maroc", "item": "https://profeps.ma/"},
            {"@type": "ListItem", "position": 2, "name": "Blog & Dossiers EPS Maroc", "item": "https://profeps.ma/blog.html"},
            {"@type": "ListItem", "position": 3, "name": breadcrumb_name, "item": canonical_url}
        ]
    }

    toc_links_html = "\n".join(
        [f'                    <a href="#{anchor}">{label}</a>' for anchor, label in toc_items]
    )

    faq_blocks_html = "\n".join(
        [
            f'''            <div class="faq-item">
                <h3 style="margin-top:0;font-size:1.05rem;color:#0f172a;">❓ {q}</h3>
                <p style="margin-bottom:0;color:#334155;">{a}</p>
            </div>'''
            for q, a in faq_list
        ]
    )

    return f'''<!DOCTYPE html>
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

    <script type="application/ld+json">{json.dumps(tech_article_schema, ensure_ascii=False)}</script>
    <script type="application/ld+json">{json.dumps(faq_schema, ensure_ascii=False)}</script>
    <script type="application/ld+json">{json.dumps(breadcrumb_schema, ensure_ascii=False)}</script>

    <style>
        *, *::before, *::after {{ margin: 0; padding: 0; box-sizing: border-box; }}
        :root {{
            --primary: #991b1b; --secondary: #006233; --text-primary: #0f172a; --text-secondary: #334155;
            --bg-primary: #ffffff; --bg-secondary: #f8fafc; --border: #cbd5e1; --border-light: #e2e8f0;
            --shadow-sm: 0 1px 3px rgba(15,23,42,0.06); --shadow-md: 0 4px 12px rgba(15,23,42,0.08);
            --radius: 8px; --radius-lg: 14px; --radius-full: 9999px;
            --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            --font-display: 'Plus Jakarta Sans', var(--font-sans);
        }}
        body {{ font-family: var(--font-sans); background: var(--bg-secondary); color: var(--text-primary); line-height: 1.65; }}
        a {{ text-decoration: none; color: inherit; }}
        .section-badge {{ display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.45rem 1rem; background: #fff1f2; border: 1px solid #fecdd3; border-radius: var(--radius-full); font-size: 0.85rem; font-weight: 800; color: var(--primary); margin-bottom: 1rem; }}
        .article-hero {{ padding: 130px 1.5rem 2.75rem; background: linear-gradient(135deg, #fff8f8 0%, #f8fafc 52%, #f3faf6 100%); border-bottom: 1px solid var(--border-light); text-align: center; }}
        .article-title {{ font-family: var(--font-display); font-size: clamp(1.65rem, 3.6vw, 2.4rem); font-weight: 900; color: var(--text-primary); max-width: 960px; margin: 0 auto 1rem; line-height: 1.25; }}
        .article-meta {{ display: flex; flex-wrap: wrap; justify-content: center; gap: 1.25rem; color: var(--text-secondary); font-size: 0.9rem; font-weight: 600; }}
        .article-container {{ max-width: 980px; margin: 0 auto; padding: 2.5rem 1.5rem; }}
        .back-link {{ display: inline-flex; align-items: center; gap: 0.5rem; color: var(--primary); font-weight: 700; margin-bottom: 1.75rem; }}
        .back-link:hover {{ text-decoration: underline; }}
        .article-content {{ line-height: 1.8; color: var(--text-secondary); }}
        .article-content h2 {{ font-size: 1.45rem; font-weight: 900; color: var(--text-primary); margin-top: 2.75rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 3px solid var(--primary); }}
        .article-content h3 {{ font-size: 1.2rem; font-weight: 800; color: var(--primary); margin-top: 1.75rem; margin-bottom: 0.65rem; }}
        .article-content p {{ margin-bottom: 1rem; }}
        .article-content ul, .article-content ol {{ margin: 1rem 0; padding-left: 1.75rem; }}
        .article-content li {{ margin-bottom: 0.5rem; }}
        .info-box {{ background: #fff8f8; border: 1px solid #f5c2c7; border-left: 5px solid var(--primary); padding: 1.35rem 1.5rem; border-radius: var(--radius-lg); margin: 1.5rem 0; }}
        .success-box {{ background: #f3faf6; border: 1px solid #a7d7c5; border-left: 5px solid var(--secondary); padding: 1.35rem 1.5rem; border-radius: var(--radius-lg); margin: 1.5rem 0; }}
        .step-card {{ background: var(--bg-primary); border-radius: var(--radius-lg); padding: 1.35rem 1.5rem; margin: 1.25rem 0; border: 1px solid var(--border); box-shadow: var(--shadow-sm); }}
        .table-container {{ overflow-x: auto; margin: 1.5rem 0; }}
        .table-container table {{ width: 100%; border-collapse: collapse; background: #ffffff; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm); border: 1px solid var(--border); }}
        .table-container th {{ background: #f1f5f9; color: #0f172a; padding: 0.85rem 1rem; text-align: left; font-size: 0.88rem; font-weight: 800; border-bottom: 2px solid var(--border); }}
        .table-container td {{ padding: 0.85rem 1rem; border-bottom: 1px solid var(--border-light); font-size: 0.88rem; color: #1e293b; vertical-align: top; }}
        .table-container tr:nth-child(even) td {{ background: #f8fafc; }}
        .signals-grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(275px, 1fr)); gap: 1.15rem; margin: 1.5rem 0; }}
        .faq-item {{ background: var(--bg-primary); border-radius: var(--radius-lg); padding: 1.35rem 1.5rem; margin: 1rem 0; border: 1px solid var(--border); box-shadow: var(--shadow-sm); }}
        .toc-nav {{ background: #ffffff; border: 1px solid var(--border); border-radius: 16px; padding: 1.25rem 1.5rem; margin: 1.5rem 0 2rem; box-shadow: var(--shadow-sm); }}
        .toc-nav h3 {{ margin: 0 0 0.75rem 0 !important; font-size: 1rem !important; color: #0f172a !important; }}
        .toc-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.5rem; }}
        .toc-grid a {{ display: block; padding: 0.5rem 0.75rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 0.84rem; font-weight: 700; color: #1e293b; transition: all 0.2s; }}
        .toc-grid a:hover {{ border-color: var(--primary); color: var(--primary); background: #fff8f8; }}
    </style>
</head>
<body>
{navbar_custom}

    <section class="article-hero">
        <span class="section-badge">{badge}</span>
        <h1 class="article-title">{h1}</h1>
        <div class="article-meta">
            <span>🏛️ Référentiel : {ref_label}</span>
            <span>📅 Mis à jour le 3 Novembre 2026</span>
            <span>⏱️ {read_time}</span>
            <span>✍️ Par <a href="a-propos.html" style="text-decoration:underline;color:#991b1b;">Abdelkhalek ELBOUDANI</a></span>
        </div>
    </section>

    <article class="article-container">
        <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;margin-bottom:1.5rem;">
            <a href="blog.html" class="back-link" style="margin:0;">← Retour au Blog &amp; Dossiers Pédagogiques EPS</a>
            <div style="display:flex;flex-wrap:wrap;gap:0.6rem;">
                <a href="evaluation-eps.html" style="padding:0.45rem 0.9rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;font-size:0.82rem;font-weight:700;color:#0f172a;">📊 Grilles d'Évaluation OP 2007/2009</a>
                <a href="generateur.html" style="padding:0.45rem 0.9rem;background:#991b1b;color:#ffffff;border-radius:8px;font-size:0.82rem;font-weight:800;">⚡ Générateur Fiches &amp; Cycles (PDF/Word Gratuit)</a>
            </div>
        </div>

        <div class="article-content">
            <nav class="toc-nav" aria-label="Sommaire de l'article">
                <h3>🧭 Sommaire du Dossier de Référence</h3>
                <div class="toc-grid">
{toc_links_html}
                </div>
            </nav>

{body_html}

            <h2 id="faq-officielle">Questions Fréquentes (FAQ terrain &amp; Concours CRMEF)</h2>
{faq_blocks_html}
        </div>
    </article>

{footer_html}
'''


def create_article_1_baremes_bac():
    filename = "article-baremes-bac-sport-maroc-officiels-libres.html"
    title = "Barèmes du Bac Sport au Maroc (Officiels & Candidats Libres) : Athlétisme, Gymnastique & Sports Collectifs (OP 2007) | ProfEPS"
    meta_desc = "Dossier complet sur les barèmes d'évaluation du Bac Sport en EPS au Maroc (OP 2007 Lycée & Bac Libre AREF) : course de vitesse (100m, 80m, 60m), demi-fond (1000m, 600m), lancer de poids (5kg, 3kg), saut en longueur, gymnastique (A, B, C) et sports collectifs (/20)."
    badge = "🇲🇦 Référentiel Examen Baccalauréat EPS Maroc · OP 2007 & Candidats Libres"
    h1 = "Barèmes du Bac Sport au Maroc (Élèves Officiels & Candidats Libres) : Tableaux de Notation Athlétisme, Gymnastique & Sports Collectifs (OP 2007)"
    ref_label = "Orientations Pédagogiques 2007 (2e Bac) & Notes Ministérielles Examen Bac Libre (MENPS / AREF)"
    read_time = "25 min de lecture"
    breadcrumb_name = "Barèmes Bac Sport Maroc (Officiels & Libres)"

    toc_items = [
        ("repartition-officielle", "1. Répartition des Notes sur 20 (OP 2007)"),
        ("bareme-vitesse", "2. Barèmes Course de Vitesse (100m, 80m, 60m)"),
        ("bareme-demi-fond", "3. Barèmes Course de Demi-Fond (1000m G / 600m F)"),
        ("bareme-poids-longueur", "4. Barèmes Lancer du Poids & Saut en Longueur"),
        ("bareme-gymnastique", "5. Barème Gymnastique au Sol (Difficultés A, B, C)"),
        ("bareme-sports-collectifs", "6. Notation en Sports Collectifs (2e Bac)"),
        ("modalites-bac-libre", "7. Déroulement & Dispense au Bac Libre Sport"),
        ("faq-officielle", "8. Questions Fréquentes (Bac & CRMEF)")
    ]

    body_html = '''
            <div class="info-box">
                <h4 style="color:#991b1b;margin-bottom:0.4rem;font-size:1.05rem;">📌 Synthèse Pédagogique : Notation de l'EPS en 2e Année du Baccalauréat au Maroc</h4>
                <p style="margin:0;color:#1e293b;">Conformément aux <strong>Orientations Pédagogiques d'Août 2007 (Lycée Qualifiant)</strong> et aux notes ministérielles encadrant les épreuves physiques des candidats scolarisés et des <strong>candidats libres (Bac Libre / الأحرار)</strong> dans les 12 AREF du Royaume, l'évaluation sommative en EPS repose sur l'articulation entre la <strong>performance motrice mesurable (Produit)</strong>, la <strong>maîtrise technique d'exécution (Processus)</strong> et les <strong>connaissances conceptuelles / rôles sociaux</strong>.</p>
            </div>

            <h2 id="repartition-officielle">I. Répartition Officielle de la Note sur 20 Points selon les OP 2007 (Lycée Qualifiant)</h2>
            <p>Une erreur fréquente chez les candidats au concours <strong>CRMEF EPS</strong> et chez les élèves de 2e année Bac consiste à croire que le barème sur 20 points est identique entre l'Athlétisme, la Gymnastique et les Sports Collectifs. Les <strong>Orientations Pédagogiques 2007</strong> fixent au contraire une pondération spécifique à chaque famille d'APSA pour respecter sa logique interne :</p>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Famille d'APSA (OP 2007 — TC, 1Bac, 2Bac)</th>
                            <th>Habiletés Motrices &amp; Performance</th>
                            <th>Connaissances Conceptuelles</th>
                            <th>Connaissances Comportementales (Rôles Sociaux)</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>🏃 Athlétisme</strong> (Courses, Lancers, Sauts)</td>
                            <td><strong>14 points / 20</strong><br><span style="font-size:0.8rem;color:#475569;">(7 pts Produit/Performance chiffrée + 7 pts Processus/Technique)</span></td>
                            <td><strong>3 points / 20</strong><br><span style="font-size:0.8rem;color:#475569;">Règlement, principes biomécaniques et physiologiques</span></td>
                            <td><strong>3 points / 20</strong><br><span style="font-size:0.8rem;color:#475569;">Assiduité, échauffement autonome, juge-chronométreur/mesureur</span></td>
                            <td><strong>20 / 20</strong></td>
                        </tr>
                        <tr>
                            <td><strong>🤸 Gymnastique au Sol</strong></td>
                            <td><strong>14 points / 20</strong><br><span style="font-size:0.8rem;color:#475569;">Difficulté (A, B, C), Composition de l'enchaînement &amp; Exécution</span></td>
                            <td><strong>3 points / 20</strong><br><span style="font-size:0.8rem;color:#475569;">Fiche d'enchaînement, terminologie et code de pointage scolaire</span></td>
                            <td><strong>3 points / 20</strong><br><span style="font-size:0.8rem;color:#475569;">Parade, sécurité active, montage/rangement des tapis, jugement</span></td>
                            <td><strong>20 / 20</strong></td>
                        </tr>
                        <tr>
                            <td><strong>🤾 Sports Collectifs</strong> (Handball, Basket, Volley, Foot, Rugby)</td>
                            <td><strong>14 points / 20</strong><br><span style="font-size:0.8rem;color:#475569;">(6 pts Capacité individuelle + 8 pts Rendement collectif dans le jeu)</span></td>
                            <td><strong>3 points / 20</strong><br><span style="font-size:0.8rem;color:#475569;">Lois du jeu, systèmes tactiques et principes d'attaque/défense</span></td>
                            <td><strong>3 points / 20</strong><br><span style="font-size:0.8rem;color:#475569;">Arbitrage officiel, tenue de la table de marque, fair-play</span></td>
                            <td><strong>20 / 20</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="success-box">
                <h4 style="color:#006233;margin-bottom:0.35rem;">💡 Rappel Clé pour l'Écrit et l'Oral du CRMEF EPS (Comparaison OP 2007 vs OP 2009)</h4>
                <p style="margin:0;color:#1e293b;">Au <strong>Collège (OP 2009)</strong>, les habiletés motrices sont notées sur <strong>12 points</strong> (Athlétisme/Gym) ou <strong>12 points</strong> (Sports Collectifs : 6 pts individuel + 6 pts collectif), les connaissances conceptuelles sur <strong>3 points</strong> et les connaissances comportementales sur <strong>5 points</strong> (pour renforcer l'éducation à la citoyenneté et au vivre-ensemble chez l'adolescent). Au <strong>Lycée (OP 2007)</strong>, la part motrice passe à <strong>14 points</strong> (et 3 pts conceptuel + 3 pts comportemental).</p>
            </div>

            <h2 id="bareme-vitesse">II. Barème Course de Vitesse au Bac Sport Maroc (100m, 80m et 60m — Garçons &amp; Filles)</h2>
            <p>Lors des épreuves du Baccalauréat (contrôle continu en 2e Bac ou examen officiel des Candidats Libres dans les centres d'examen AREF), la distance de sprint dépend de l'infrastructure disponible : <strong>100 mètres</strong> sur piste homologuée (ou <strong>80 m / 60 m</strong> sur plateau sportif d'établissement). Le départ s'effectue obligatoirement en <strong>position quadrupédique (3 ou 4 appuis)</strong> aux commandements officiels (<em>« À vos marques… Prêts… Partez / Coup de sifflet ! »</em>).</p>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Note Performance (sur 20 épreuve Bac Libre / Barème indicatif)</th>
                            <th>Note Produit Cycle 2Bac (sur 7 pts)</th>
                            <th>100m Garçons (2Bac)</th>
                            <th>100m Filles (2Bac)</th>
                            <th>80m Garçons (Plateau)</th>
                            <th>80m Filles (Plateau)</th>
                            <th>60m Garçons (Terrain court)</th>
                            <th>60m Filles (Terrain court)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td><strong>20 / 20</strong></td><td><strong>7,0 / 7</strong></td><td>≤ 12"0</td><td>≤ 14"2</td><td>≤ 9"8</td><td>≤ 11"5</td><td>≤ 7"5</td><td>≤ 8"7</td></tr>
                        <tr><td><strong>18 / 20</strong></td><td><strong>6,5 / 7</strong></td><td>12"3</td><td>14"6</td><td>10"1</td><td>11"9</td><td>7"8</td><td>9"0</td></tr>
                        <tr><td><strong>16 / 20</strong></td><td><strong>6,0 / 7</strong></td><td>12"7</td><td>15"1</td><td>10"4</td><td>12"3</td><td>8"1</td><td>9"4</td></tr>
                        <tr><td><strong>14 / 20</strong></td><td><strong>5,0 / 7</strong></td><td>13"2</td><td>15"7</td><td>10"8</td><td>12"8</td><td>8"4</td><td>9"8</td></tr>
                        <tr><td><strong>12 / 20</strong></td><td><strong>4,25 / 7</strong></td><td>13"7</td><td>16"4</td><td>11"3</td><td>13"4</td><td>8"8</td><td>10"3</td></tr>
                        <tr><td><strong>10 / 20 (Moyenne)</strong></td><td><strong>3,5 / 7</strong></td><td>14"3</td><td>17"2</td><td>11"8</td><td>14"0</td><td>9"2</td><td>10"8</td></tr>
                        <tr><td><strong>08 / 20</strong></td><td><strong>2,75 / 7</strong></td><td>15"0</td><td>18"1</td><td>12"4</td><td>14"8</td><td>9"7</td><td>11"4</td></tr>
                        <tr><td><strong>06 / 20</strong></td><td><strong>2,0 / 7</strong></td><td>15"8</td><td>19"2</td><td>13"1</td><td>15"7</td><td>10"3</td><td>12"1</td></tr>
                    </tbody>
                </table>
            </div>
            <p><strong>Critères du Processus Technique en Course de Vitesse (7 points en 2e Bac) :</strong></p>
            <ul>
                <li><strong>Départ quadrupédique et temps de réaction (2 pts) :</strong> Appuis équilibrés derrière la ligne, épaules légèrement en avant des mains, poussée explosive vers l'avant-haut sans se redresser brusquement dès le premier appui.</li>
                <li><strong>Mise en action et conservation de l'axe (2,5 pts) :</strong> Alignement pied-bassin-épaules, griffé actif du sol sous le centre de gravité, synchronisation bras-jambes dans le couloir sans empiéter sur les lignes.</li>
                <li><strong>Maintien de la vitesse maximale et franchissement (2,5 pts) :</strong> Relâchement scapulaire et facial entre 50 m et 100 m, attaque plante de pied haute et franchissement de la ligne d'arrivée sans ralentir ni sauter avant la ligne.</li>
            </ul>

            <h2 id="bareme-demi-fond">III. Barème Course de Demi-Fond et Course en Durée (1000m Garçons / 600m ou 800m Filles)</h2>
            <p>En demi-fond scolaire au Maroc, l'évaluation croise la <strong>performance chronométrique (ou le pourcentage de VMA maintenu)</strong> et la <strong>régularité d'allure (écart entre les tours)</strong> afin d'éviter le départ en sprint suivi d'une marche d'épuisement. Utilisez notre <a href="calculateur-vma.html" style="color:#991b1b;font-weight:800;text-decoration:underline;">Calculateur VMA &amp; Allures Cibles</a> et notre <a href="planificateur-seances-vma-groupes-eps.html" style="color:#006233;font-weight:800;text-decoration:underline;">Planificateur de Groupes de Niveau VMA</a> pour individualiser les temps de passage par plots :</p>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Note Performance (/20 Bac Libre)</th>
                            <th>Note Produit (/7 Cycle 2Bac)</th>
                            <th>1000 mètres Garçons (2Bac)</th>
                            <th>800 mètres Filles (2Bac)</th>
                            <th>600 mètres Filles (Bac Libre / Plateau)</th>
                            <th>Régularité Inter-Tours (Bonus Processus)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td><strong>20 / 20</strong></td><td><strong>7,0 / 7</strong></td><td>≤ 2'55"</td><td>≤ 2'48"</td><td>≤ 1'56"</td><td>Écart inter-tours ≤ 2 secondes (Allure 100-105 % VMA)</td></tr>
                        <tr><td><strong>18 / 20</strong></td><td><strong>6,5 / 7</strong></td><td>3'05"</td><td>2'58"</td><td>2'03"</td><td>Écart inter-tours ≤ 3 secondes</td></tr>
                        <tr><td><strong>16 / 20</strong></td><td><strong>6,0 / 7</strong></td><td>3'15"</td><td>3'08"</td><td>2'10"</td><td>Écart inter-tours ≤ 4 secondes</td></tr>
                        <tr><td><strong>14 / 20</strong></td><td><strong>5,0 / 7</strong></td><td>3'28"</td><td>3'20"</td><td>2'18"</td><td>Écart inter-tours ≤ 5 secondes</td></tr>
                        <tr><td><strong>12 / 20</strong></td><td><strong>4,25 / 7</strong></td><td>3'42"</td><td>3'34"</td><td>2'28"</td><td>Course continue sans arrêt ni marche</td></tr>
                        <tr><td><strong>10 / 20</strong></td><td><strong>3,5 / 7</strong></td><td>3'58"</td><td>3'50"</td><td>2'40"</td><td>1 ralentissement marqué mais sans arrêt complet</td></tr>
                        <tr><td><strong>08 / 20</strong></td><td><strong>2,75 / 7</strong></td><td>4'15"</td><td>4'08"</td><td>2'55"</td><td>Écart inter-tours &gt; 10 secondes</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="bareme-poids-longueur">IV. Barèmes Lancer du Poids (5 kg Garçons / 3 kg ou 4 kg Filles) et Saut en Longueur</h2>
            <p>Au <strong>Lancer du Poids</strong> (voir notre <a href="reglement-lancer-poids-athletisme-bac-eps.html" style="color:#991b1b;font-weight:800;text-decoration:underline;">Règlement Officiel Lancer du Poids RT 32-33</a>), la masse réglementaire en 2e année Bac au Maroc est de <strong>5 kg pour les Garçons (Cadets/Juniors scolaires)</strong> et de <strong>3 kg (ou 4 kg selon la note académique) pour les Filles</strong>. Chaque candidat dispose de <strong>3 essais</strong> et seule la meilleure performance validée (drapeau blanc, sortie contrôlée par la moitié arrière du cercle de 2,135 m) est retenue :</p>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Note (/20 Bac Libre)</th>
                            <th>Note Produit (/7 Cycle 2Bac)</th>
                            <th>Lancer du Poids Garçons (5 kg)</th>
                            <th>Lancer du Poids Filles (3 kg)</th>
                            <th>Lancer du Poids Filles (4 kg)</th>
                            <th>Saut en Longueur Garçons</th>
                            <th>Saut en Longueur Filles</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td><strong>20 / 20</strong></td><td><strong>7,0 / 7</strong></td><td>≥ 11,50 m</td><td>≥ 8,50 m</td><td>≥ 7,60 m</td><td>≥ 5,40 m</td><td>≥ 4,10 m</td></tr>
                        <tr><td><strong>18 / 20</strong></td><td><strong>6,5 / 7</strong></td><td>10,80 m</td><td>7,90 m</td><td>7,10 m</td><td>5,10 m</td><td>3,85 m</td></tr>
                        <tr><td><strong>16 / 20</strong></td><td><strong>6,0 / 7</strong></td><td>10,10 m</td><td>7,30 m</td><td>6,50 m</td><td>4,80 m</td><td>3,60 m</td></tr>
                        <tr><td><strong>14 / 20</strong></td><td><strong>5,0 / 7</strong></td><td>9,40 m</td><td>6,70 m</td><td>6,00 m</td><td>4,50 m</td><td>3,35 m</td></tr>
                        <tr><td><strong>12 / 20</strong></td><td><strong>4,25 / 7</strong></td><td>8,70 m</td><td>6,10 m</td><td>5,50 m</td><td>4,20 m</td><td>3,10 m</td></tr>
                        <tr><td><strong>10 / 20</strong></td><td><strong>3,5 / 7</strong></td><td>8,00 m</td><td>5,50 m</td><td>4,90 m</td><td>3,90 m</td><td>2,85 m</td></tr>
                        <tr><td><strong>08 / 20</strong></td><td><strong>2,75 / 7</strong></td><td>7,20 m</td><td>4,80 m</td><td>4,30 m</td><td>3,55 m</td><td>2,60 m</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="bareme-gymnastique">V. Barème et Code de Pointage Scolaire en Gymnastique au Sol (2e Bac — Difficultés A, B, C)</h2>
            <p>En <strong>Gymnastique au Sol</strong> (OP 2007), la compétence visée en 2e année du Baccalauréat demande à l'élève de <em>« concevoir, présenter et juger un enchaînement gymnique maîtrisé comprenant au moins <strong>3 éléments de difficulté A, 3 éléments de difficulté B et 2 éléments de difficulté C</strong> (3A + 3B + 2C en 2e Bac ; contre 4A + 2B + 1C en 1re Bac et 4A + 2B en Tronc Commun) »</em>. Consultez notre <a href="reglement-gymnastique-fig-code-pointage-eps.html" style="color:#991b1b;font-weight:800;text-decoration:underline;">Dossier Code de Pointage Gymnastique FIG &amp; Grille A-B-C Maroc</a> pour les illustrations complètes.</p>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Niveau Lycée (OP 2007)</th>
                            <th>Exigence Minimale de Difficulté (Note D)</th>
                            <th>Familles Gymniques Obligatoires</th>
                            <th>Décomposition de la Note Motrice (/14 points)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Tronc Commun (TC)</strong></td>
                            <td><strong>4 éléments A + 2 éléments B</strong></td>
                            <td>Rotations avant/arrière, appuis tendus (ATR passager), maintiens et sauts</td>
                            <td>• Difficulté (Note D) : <strong>6 pts</strong><br>• Composition &amp; occupation de l'espace : <strong>3 pts</strong><br>• Exécution technique &amp; tenue (Note E) : <strong>5 pts</strong></td>
                        </tr>
                        <tr>
                            <td><strong>1re Année Bac (1Bac)</strong></td>
                            <td><strong>4 éléments A + 2 éléments B + 1 élément C</strong></td>
                            <td>Combinaison de 4 familles minimum avec liaisons chorégraphiques fluides</td>
                            <td>• Difficulté (Note D) : <strong>6 pts</strong><br>• Composition &amp; rythme : <strong>3 pts</strong><br>• Exécution (alignement, réception pilée) : <strong>5 pts</strong></td>
                        </tr>
                        <tr>
                            <td><strong>2e Année Bac (2Bac)</strong></td>
                            <td><strong>3 éléments A + 3 éléments B + 2 éléments C</strong></td>
                            <td>Ouverture, diagonale acrobatique, série gymnique, sortie stabilisée</td>
                            <td>• Difficulté (3A+3B+2C) : <strong>6 pts</strong><br>• Composition &amp; originalité : <strong>3 pts</strong><br>• Exécution (fautes -0,1 / -0,3 / -0,5 / chute -1,0) : <strong>5 pts</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 id="bareme-sports-collectifs">VI. Grille d'Évaluation des Sports Collectifs en 2e Bac (6 pts Individuel + 8 pts Collectif)</h2>
            <p>En <strong>Handball, Basketball, Volleyball, Football ou Rugby</strong>, l'élève de 2e année Bac est évalué en situation de match de référence (4×4, 5×5 ou 6×6) à l'aide d'une fiche d'observation croisant l'efficacité individuelle du porteur/non-porteur de balle (<strong>6 points</strong>) et l'intégration au projet tactique de l'équipe (<strong>8 points</strong>) :</p>
            <ul>
                <li><strong>Note Individuelle en Situation de Jeu (6 points) :</strong> Maîtrise technique de la manipulation de balle sous pression temporelle (passes, tirs, dribbles, réceptions), lecture du rapport de force (choix pertinent entre progresser en dribble, passer au partenaire démarqué ou tirer) et efficacité défensive individuelle (cadrage du porteur, interception).</li>
                <li><strong>Note Collective dans le Projet d'Équipe (8 points) :</strong> Occupation rationnelle de l'espace de jeu en largeur et en profondeur, démarquage en appui et en soutien, enchaînement rapide transition défense → contre-attaque et repli défensif coordonné, respect du système défensif retenu par l'équipe (zone, homme-à-homme ou mixte).</li>
                <li><strong>Connaissances Conceptuelles (3 points) &amp; Comportementales (3 points) :</strong> Maîtrise des gestes officiels d'arbitrage (<a href="reglement-handball-ihf-gestes-arbitrage-eps.html" style="color:#991b1b;font-weight:700;">18 gestes IHF Handball</a>, <a href="reglement-basketball-fiba-gestes-arbitrage-eps.html" style="color:#991b1b;font-weight:700;">code FIBA Basketball</a>, <a href="reglement-volleyball-fivb-gestes-arbitrage-eps.html" style="color:#991b1b;font-weight:700;">signes FIVB Volleyball</a>), tenue de la feuille de match et coaching constructif.</li>
            </ul>

            <h2 id="modalites-bac-libre">VII. Déroulement de l'Épreuve d'EPS au Bac Libre Maroc (Candidats Libres) &amp; Procédure de Dispense</h2>
            <div class="step-card">
                <h3 style="margin-top:0;">1. Convocation et Déroulement sur le Terrain d'Examen (Février – Mars)</h3>
                <p>Les candidats libres qui n'ont pas déposé de dossier médical de dispense passent l'épreuve pratique d'EPS généralement entre <strong>fin février et fin mars</strong> dans le lycée centre d'examen désigné sur leur convocation AREF. Le candidat doit impérativement se présenter avec :</p>
                <ul>
                    <li>Sa <strong>Carte Nationale d'Identité Électronique (CNIE)</strong> originale et sa <strong>convocation officielle</strong> imprimée depuis le portail <em>candidaturebac.men.gov.ma</em> ;</li>
                    <li>Une <strong>tenue de sport complète et réglementaire</strong> (chaussures de course adaptées, survêtement/short et t-shirt de sport).</li>
                    <li>L'épreuve combine généralement <strong>une épreuve athlétique de course (vitesse 60m/80m/100m ou demi-fond 1000m/600m)</strong> et <strong>un concours (lancer du poids 5kg/3kg ou saut en longueur) ou un enchaînement gymnique au sol</strong> devant un jury composé de professeurs d'EPS assermentés.</li>
                </ul>
                <h3>2. Procédure Officielle de Dispense Médicale (الإعفاء من التربية البدنية للأحرار)</h3>
                <p>Tout candidat libre souhaitant être dispensé de l'épreuve physique doit déposer son dossier médical auprès de la Direction Provinciale (ou selon la procédure dématérialisée fixée par son AREF) <strong>avant la date butoir de clôture des inscriptions (généralement fin novembre / décembre)</strong>. Une absence non justifiée le jour de l'épreuve d'EPS pour un candidat non dispensé est sanctionnée par la mention <strong>« Absent (00/20 éliminatoire) »</strong> qui bloque la validation des épreuves écrites de juin !</p>
            </div>
    '''

    faq_list = [
        (
            "Comment est répartie la note sur 20 en EPS au Baccalauréat marocain selon les OP 2007 ?",
            "En 2e année du Baccalauréat (OP 2007), la note sur 20 se répartit en 14 points pour les habiletés motrices (7 pts Produit + 7 pts Processus en Athlétisme ; 14 pts Difficulté/Composition/Exécution en Gymnastique ; 6 pts Individuel + 8 pts Collectif en Sports Collectifs), 3 points pour les connaissances conceptuelles et 3 points pour les connaissances comportementales (rôles sociaux, arbitrage, assiduité)."
        ),
        (
            "Quel est le poids réglementaire de l'engin au Lancer du Poids pour le Bac Sport au Maroc ?",
            "Pour les élèves de 2e année du Baccalauréat et les candidats au Bac Libre au Maroc, la masse officielle du poids est de 5,000 kg pour les Garçons et de 3,000 kg (ou 4,000 kg selon les académies) pour les Filles."
        ),
        (
            "Combien d'éléments gymniques A, B et C sont exigés en Gymnastique au Sol en TC, 1Bac et 2Bac ?",
            "Selon les Orientations Pédagogiques 2007 : • Tronc Commun (TC) : 4 éléments A + 2 éléments B ; • 1re Année Bac (1Bac) : 4 éléments A + 2 éléments B + 1 élément C ; • 2e Année Bac (2Bac) : 3 éléments A + 3 éléments B + 2 éléments C."
        ),
        (
            "Que se passe-t-il si un candidat au Bac Libre ne se présente pas le jour de l'épreuve de Sport sans avoir demandé la dispense ?",
            "Tout candidat libre inscrit comme « Apte » qui s'absente à l'épreuve pratique d'EPS sans certificat médical validé par la commission médicale provinciale dans les délais réglementaires est déclaré « Absent », ce qui invalide sa session du Baccalauréat."
        )
    ]

    html = build_article_html(filename, title, meta_desc, badge, h1, ref_label, read_time, toc_items, body_html, faq_list, breadcrumb_name)
    out_path = os.path.join(PUBLIC_DIR, filename)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Created {filename}")


def create_article_2_inspection_capep():
    filename = "article-inspection-pedagogique-titularisation-eps-maroc.html"
    title = "Guide Complet de l'Inspection Pédagogique & Examen de Titularisation (CAPEP / Kafaâ) en EPS au Maroc : Cahier Journal, Dossier & Séance | ProfEPS"
    meta_desc = "Tout réussir lors d'une inspection pédagogique ou de l'Examen d'Aptitude Professionnelle / Titularisation (CAPEP - شهادة الكفاءة التربوية) en EPS au Maroc : les 8 pièces du dossier pédagogique, cahier journal, conduite de séance et 20 questions du jury."
    badge = "🏛️ Carrière & Inspection MENPS Maroc · Titularisation CAPEP (الكفاءة التربوية)"
    h1 = "Inspection Pédagogique & Examen de Titularisation (CAPEP) en EPS au Maroc : Dossier Officiel, Cahier Journal, Séance Modèle & Entretien"
    ref_label = "Textes Réglementaires MENPS Maroc, OP 2007/2009 & Référentiel d'Inspection Pédagogique EPS"
    read_time = "28 min de lecture"
    breadcrumb_name = "Inspection Pédagogique & Titularisation CAPEP EPS Maroc"

    toc_items = [
        ("cadre-juridique", "1. Déroulement Officiel de l'Inspection & du CAPEP"),
        ("dossier-pedagogique", "2. Les 8 Pièces Obligatoires du Dossier Pédagogique"),
        ("cahier-journal", "3. Tenir un Cahier Journal Irréprochable en EPS"),
        ("seance-observee", "4. Réussir la Séance Observée (Les 4 Phases Clés)"),
        ("grille-inspecteur", "5. Ce que Regarde l'Inspecteur sur le Terrain"),
        ("questions-entretien", "6. Les 15 Questions Types de l'Entretien Oral"),
        ("faq-officielle", "7. FAQ Titularisation & Inspection EPS Maroc")
    ]

    body_html = '''
            <div class="info-box">
                <h4 style="color:#991b1b;margin-bottom:0.4rem;font-size:1.05rem;">🎯 Pourquoi ce Guide est Indispensable aux Enseignants d'EPS au Maroc</h4>
                <p style="margin:0;color:#1e293b;">Que vous prépariez votre <strong>Examen de Certification et de Titularisation (CAPEP / شهادة الكفاءة التربوية)</strong> à l'issue de votre stage, une <strong>visite d'encadrement de Monsieur l'Inspecteur Pédagogique</strong> ou une révision de note administrative pour l'avancement d'échelon et l'<strong>Examen d'Aptitude Professionnelle (EAP)</strong>, la réussite repose à 50 % sur la rigueur de votre <strong>dossier écrit conforme aux OP 2007/2009</strong> et à 50 % sur votre <strong>régulation didactique en temps réel sur le plateau sportif</strong>.</p>
            </div>

            <h2 id="cadre-juridique">I. Déroulement Officiel de l'Examen de Titularisation (CAPEP) et de l'Inspection en EPS</h2>
            <p>Au Maroc, la certification pratique de titularisation (<em>Kafaâ Tarbawiya</em>) en Éducation Physique et Sportive se déroule devant une <strong>commission officielle présidée par l'Inspecteur Pédagogique d'EPS</strong> de la Direction Provinciale, assisté de professeurs agrégés ou principaux expérimentés et du chef d'établissement (ou son représentant). L'épreuve pratique comporte :</p>
            <ol>
                <li><strong>La conduite d'une ou deux séances effectives d'EPS (50 à 55 minutes effectives)</strong> avec les classes de l'enseignant (souvent deux niveaux ou deux familles d'APSA différentes : ex. un sport collectif + une activité athlétique ou gymnique) ;</li>
                <li><strong>L'examen approfondi du portefeuille professionnel (Dossier Pédagogique, Cahier Journal et Dossier ASS)</strong> ;</li>
                <li><strong>L'entretien oral de soutenance et d'analyse réflexive (30 à 45 minutes)</strong> portant sur l'analyse critique de la séance vécue, la maîtrise des Orientations Pédagogiques (OP 2007 Lycée ou OP 2009 Collège), la législation scolaire marocaine (responsabilité civile, accidents scolaires, dispenses, ASS) et l'éthique professionnelle.</li>
            </ol>

            <h2 id="dossier-pedagogique">II. Les 8 Pièces Obligatoires du Dossier Pédagogique de l'Enseignant d'EPS</h2>
            <p>Un inspecteur juge la cohérence verticale de votre enseignement dans les 3 premières minutes d'ouverture de votre classeur. Toutes vos fiches peuvent être générées proprement en PDF et Word modifiable grâce à notre <a href="generateur.html" style="color:#991b1b;font-weight:800;text-decoration:underline;">Générateur de Fiches &amp; Cycles EPS 100% Gratuit</a>. Voici les <strong>8 chemises indispensables</strong> :</p>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th style="width:24%;">Chemise / Document</th>
                            <th style="width:44%;">Contenu Exigé selon les OP 2007 / OP 2009</th>
                            <th style="width:32%;">Erreur Fréquente à Éviter</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>1. Fiche Administrative &amp; Emploi du Temps</strong></td>
                            <td>CV professionnel, arrêtés d'affectation, emploi du temps officiel visé par le Directeur (heures d'enseignement EPS + créneau du vendredi après-midi dédié à l'ASS), liste nominative des classes.</td>
                            <td>Emploi du temps non cacheté par l'administration ou absence des horaires d'ASS.</td>
                        </tr>
                        <tr>
                            <td><strong>2. Projet Prévisionnel Annuel (Programmation Cyclique)</strong></td>
                            <td>Calendrier annuel des 6 cycles (3 au 1er semestre, 3 au 2e semestre) de 10 à 12 séances chacun, croisant les 3 groupes d'APS (Sports collectifs, Athlétisme, Gymnastique/Raquettes) et la rotation des installations avec les collègues.</td>
                            <td>Programmer deux sports collectifs d'affilée sans alterner avec une activité individuelle (Athlétisme ou Gymnastique).</td>
                        </tr>
                        <tr>
                            <td><strong>3. Fiches du Projet d'Établissement &amp; Diagnostic</strong></td>
                            <td>Monographie de l'établissement, inventaire précis du matériel didactique (ballons, dossards, plots, poids, tapis) et de l'état des terrains, profil socio-moteur des élèves.</td>
                            <td>Présenter des séances nécessitant 15 ballons alors que l'inventaire de l'établissement n'en compte que 4 !</td>
                        </tr>
                        <tr>
                            <td><strong>4. Tests d'Observation (Séance 1) &amp; Bilans</strong></td>
                            <td>Grille d'évaluation diagnostique de début de cycle (comportements initiaux observés, problèmes moteurs prioritaires identifiés, répartition en groupes de besoin/niveau).</td>
                            <td>Commencer la séance 2 d'un cycle sans avoir conservé la trace chiffrée du test d'observation initial !</td>
                        </tr>
                        <tr>
                            <td><strong>5. Projets Prévisionnels de Cycles (10-12 séances)</strong></td>
                            <td>Pour chaque cycle : Module du niveau, Compétence visée officielle, Objectif Terminal d'Intégration (OTI), Objectif du Cycle (OC) et progression logique des 10 ou 12 objectifs de séances.</td>
                            <td>Copier-coller une compétence visée de 3e Année Collège (OP 2009) pour une classe de Tronc Commun (OP 2007).</td>
                        </tr>
                        <tr>
                            <td><strong>6. Fiches de Préparation des Séances</strong></td>
                            <td>Fiches détaillées (Partie introductive 10-15 min, Partie fondamentale 30-35 min, Partie finale 5 min) avec But, Conditions de réalisation, Schéma, Critères de réussite (quantitatifs) et Critères de réalisation (qualitatifs) + Variables didactiques.</td>
                            <td>Confondre <em>Critère de réalisation</em> (« Comment faire : pousser sur les jambes ») et <em>Critère de réussite</em> (« Preuve chiffrée : réussir 4 tirs sur 6 »).</td>
                        </tr>
                        <tr>
                            <td><strong>7. Cahier Journal &amp; Cahier d'Appel / Notes</strong></td>
                            <td>Traçabilité quotidienne des séances réalisées, absences, retards, dispenses médicales (temporaires ou annuelles) et grilles d'évaluation sommative sur 20.</td>
                            <td>Cahier journal arrêté 2 semaines avant la visite de l'inspecteur ou absence de bilan post-séance.</td>
                        </tr>
                        <tr>
                            <td><strong>8. Dossier de l'Association Sportive Scolaire (ASS)</strong></td>
                            <td>PV du bureau de l'ASS, programme des compétitions inter-classes du vendredi après-midi, listes des équipes engagées au championnat provincial/régional (cross-country scolaire, sports collectifs).</td>
                            <td>Négliger le dossier ASS alors que l'ASS fait partie intégrante de la charge horaire statutaire du professeur d'EPS au Maroc.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 id="cahier-journal">III. Comment Rédiger la Case « Bilan &amp; Régulation » du Cahier Journal</h2>
            <p>Le <strong>Cahier Journal (دفتر النصوص / المذكرة اليومية)</strong> est le document juridique qui atteste de l'exécution du service. L'inspecteur vérifie systématiquement la colonne <strong>« Observations &amp; Bilan de la séance »</strong> remplie à la fin du cours. Au lieu d'écrire une formule vague comme <em>« Séance réalisée dans de bonnes conditions »</em>, rédigez une observation didactique précise :</p>
            <div class="success-box">
                <p style="margin:0;color:#0f172a;"><strong>Exemple de Bilan Professionnel dans le Cahier Journal (Handball — 2AC, Séance 5) :</strong><br>
                <em>« Objectif atteint pour les groupes A et B (70 % des attaques franchissent la zone médiane en moins de 4 passes sans perte de balle). Difficulté persistante pour le groupe C (dribble systématique sur place face au défenseur). Régulation prévue en Séance 6 : interdire le dribble dans le couloir central et accorder un bonus de 2 points pour toute passe en mouvement vers un couloir latéral. »</em></p>
            </div>

            <h2 id="seance-observee">IV. Réussir la Séance Observée le Jour de l'Inspection (Les 4 Phases Minutées)</h2>
            <div class="step-card">
                <h3 style="margin-top:0;">Phase 1 : Prise en Main &amp; Appel Dynamique (5 minutes)</h3>
                <p>Le terrain doit être <strong>entièrement tracé et balisé avec les plots avant l'arrivée des élèves</strong>. Alignez ou regroupez la classe en demi-cercle dos au soleil (le professeur face au soleil pour que les élèves voient sans plisser les yeux). Vérifiez les tenues, attribuez immédiatement une fiche de rôle précis aux élèves dispensés (observateur, chronométreur, arbitre, responsable matériel) et annoncez l'objectif de la séance en une phrase simple.</p>
                <h3>Phase 2 : Échauffement Général et Spécifique Structuré (10 minutes)</h3>
                <p>Confiez si possible une partie des gammes ou des étirements activo-dynamiques à un <strong>élève leader par groupe</strong> (évaluation des connaissances comportementales !), puis enchaînez avec un jeu réduit ou une activation spécifique avec ballon directement liée au thème de la séance.</p>
                <h3>Phase 3 : Partie Fondamentale — Situations de Référence &amp; Apprentissage (30 à 35 minutes)</h3>
                <ul>
                    <li><strong>Temps d'Engagement Moteur (TEM) maximal :</strong> Aucune file d'attente de plus de 3 élèves ! Privilégiez le travail par ateliers parallèles ou en vagues continues.</li>
                    <li><strong>Intervention flash (règle des 90 secondes) :</strong> Lorsque vous arrêtez l'exercice pour corriger un défaut moteur commun, votre explication + démonstration ne doit jamais dépasser 90 secondes afin de ne pas refroidir les élèves.</li>
                    <li><strong>Activation d'une variable didactique devant l'inspecteur :</strong> Montrez au jury que vous savez adapter la tâche en direct (simplifier la contrainte pour le groupe en échec ; complexifier par l'ajout d'un défenseur ou la réduction du temps/espace pour le groupe qui réussit à plus de 80 %).</li>
                </ul>
                <h3>Phase 4 : Retour au Calme, Bilan Méta-Cognitif &amp; Rangement (5 minutes)</h3>
                <p>Rassemblez les élèves, interrogez-les sur la règle d'action apprise (<em>« Qu'est-ce qui vous a permis de conserver la balle aujourd'hui ? »</em>), faites annoncer les scores par les élèves-observateurs et organisez le ramassage du matériel avant de raccompagner la classe.</p>
            </div>

            <h2 id="questions-entretien">V. Les Questions Types de l'Inspecteur lors de l'Entretien Oral (Avec Réponses Clés)</h2>
            <ol>
                <li><strong>« Quel est le décalage entre la séance que vous aviez prévue sur papier et la séance réellement vécue par vos élèves ? »</strong><br>
                <em>→ Ne dites jamais que votre séance était parfaite à 100 %. Analysez lucidement ce qui a fonctionné, identifiez le groupe qui a rencontré un obstacle moteur et expliquez la variable didactique que vous avez activée (ou que vous activerez lors de la séance suivante).</em></li>
                <li><strong>« Comment justifiez-vous le choix de cet objectif de séance par rapport à votre test d'observation initial ? »</strong><br>
                <em>→ Montrez le lien direct avec votre grille diagnostique de Séance 1 (ex. : « Lors du test diagnostique, 68 % des ballons étaient perdus sur passe longue lobée ; cette séance vise donc l'écartement du jeu et la passe tendue dans les intervalles courts »).</em></li>
                <li><strong>« Quelle est votre responsabilité juridique en cas d'accident scolaire sur le terrain d'EPS ? »</strong><br>
                <em>→ Portez secours immédiatement sans laisser le reste de la classe sans surveillance (envoyer deux élèves délégués prévenir l'administration), sécuriser le périmètre et rédiger dans les 24 heures le rapport circonstancié d'accident scolaire en 4 exemplaires (heure, lieu, tâche pédagogique en cours, témoins, mesures de sécurité prises).</em></li>
            </ol>
    '''

    faq_list = [
        (
            "Combien de séances comporte l'examen pratique de titularisation (CAPEP / Kafaâ) en EPS au Maroc ?",
            "La certification pratique du CAPEP comporte la présentation du dossier pédagogique complet, la conduite effective d'une à deux séances d'EPS devant le jury présidé par l'Inspecteur Pédagogique, suivie d'un entretien oral d'analyse réflexive et de législation scolaire."
        ),
        (
            "Quelle est la différence entre un Critère de Réalisation et un Critère de Réussite sur une fiche de séance EPS ?",
            "Le Critère de Réalisation décrit le « COMMENT FAIRE » biomécanique ou tactique (ex. : armer le bras haut, regarder la cible, fléchir les jambes), tandis que le Critère de Réussite est un indicateur QUANTITATIF et mesurable permettant à l'élève de savoir s'il a atteint le but (ex. : réussir 4 tirs cadrés sur 5 essais, ou franchir la zone en moins de 6 secondes)."
        ),
        (
            "Que doit faire l'enseignant d'EPS avec les élèves dispensés le jour d'une inspection ?",
            "Un élève dispensé de pratique physique n'est jamais dispensé d'assister au cours ni d'apprentissage en EPS. Il doit être muni d'une fiche de tâche précise (observateur statistique, juge-arbitre, chronométreur, coach d'équipe ou secrétaire de table de marque) et être évalué sur ses connaissances conceptuelles et comportementales."
        )
    ]

    html = build_article_html(filename, title, meta_desc, badge, h1, ref_label, read_time, toc_items, body_html, faq_list, breadcrumb_name)
    out_path = os.path.join(PUBLIC_DIR, filename)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Created {filename}")


def create_article_3_grands_effectifs_dispenses():
    filename = "article-gestion-grands-effectifs-dispenses-eps-maroc.html"
    title = "Gérer une Classe de 40+ Élèves et Intégrer les Élèves Dispensés en EPS au Maroc : Ateliers, Rôles Sociaux & Grilles (OP 2007/2009) | ProfEPS"
    meta_desc = "Méthodologie terrain pour gérer les classes à grands effectifs (38 à 48 élèves) avec peu de matériel et évaluer les élèves dispensés en EPS au Maroc : organisation en ateliers, vagues, rôles sociaux (arbitre, observateur) et barèmes adaptés."
    badge = "🏟️ Gestion de Classe & Pédagogie Différenciée · Terrain EPS Maroc"
    h1 = "Gérer une Classe de 40+ Élèves et Évaluer les Élèves Dispensés en EPS au Maroc : Organisation Spatiale, Ateliers & Rôles Sociaux"
    ref_label = "Orientations Pédagogiques 2007/2009 & Circulaires Ministérielles EPS Maroc"
    read_time = "24 min de lecture"
    breadcrumb_name = "Gestion des Grands Effectifs (40+ Élèves) & Dispensés en EPS"

    toc_items = [
        ("realite-terrain-maroc", "1. Le Défi des 40+ Élèves et du Matériel Limité"),
        ("modeles-organisation", "2. 4 Modèles d'Organisation Spatiale à TEM > 65%"),
        ("formule-tem", "3. Calculer et Doubler le Temps d'Engagement Moteur"),
        ("protocole-dispenses", "4. Statut Officiel et Intégration des Dispensés"),
        ("grille-notation-dispense", "5. Grille d'Évaluation sur 20 d'un Élève Dispensé"),
        ("faq-officielle", "6. Questions Fréquentes (Terrain & Oral CRMEF)")
    ]

    body_html = '''
            <div class="info-box">
                <h4 style="color:#991b1b;margin-bottom:0.4rem;font-size:1.05rem;">⚡ Le Sujet N°1 des Épreuves Orales de Mise en Situation Pédagogique (MSP) au CRMEF EPS</h4>
                <p style="margin:0;color:#1e293b;">Dans la réalité quotidienne des collèges et lycées marocains, l'enseignant d'EPS fait souvent face à une triple contrainte : <strong>un effectif de 38 à 46 élèves par classe</strong>, <strong>un seul plateau extérieur partagé</strong> et <strong>4 à 6 ballons disponibles</strong>, avec 3 à 5 élèves porteurs d'un certificat médical de dispense. Voici les solutions didactiques concrètes validées par l'inspection pédagogique pour garantir sécurité, discipline et apprentissage moteur maximal.</p>
            </div>

            <h2 id="realite-terrain-maroc">I. Pourquoi l'Organisation Traditionnelle en « File Indienne » Échoue avec 42 Élèves</h2>
            <p>Si vous placez 42 élèves en deux files indiennes devant un seul panier de basket ou un seul sautoir en longueur avec un passage toutes les 30 secondes, chaque élève ne passera que <strong>3 fois en 35 minutes</strong>, soit un <strong>Temps d'Engagement Moteur (TEM) inférieur à 90 secondes sur toute la séance</strong> ! Les 33 minutes d'attente passive provoquent inévitablement bavardages, bousculades, perte de concentration et insécurité.</p>

            <h2 id="modeles-organisation">II. Les 4 Modèles d'Organisation Spatiale pour Faire Pratiquer 42 Élèves Simultanément</h2>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Modèle d'Organisation</th>
                            <th>Configuration Terrain &amp; Effectif (ex. 42 élèves)</th>
                            <th>Matériel Minimal Requis</th>
                            <th>APSA Idéales</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>1. Le Tournoi Triangulaire « Joueurs / Arbitres / Observateurs »</strong></td>
                            <td>6 équipes de 7 élèves réparties sur 2 demi-terrains (ou dans la largeur d'un terrain de Handball 40×20m découpé en 2 mini-terrains de 20×18m). Sur chaque demi-terrain : 2 équipes jouent (5 min), la 3e équipe assure l'arbitrage à 2, la table de marque et l'observation statistique individuelle en binôme !</td>
                            <td>Seulement <strong>2 ballons</strong>, 4 sifflets, 2 jeux de chasubles et 8 plots pour les buts.</td>
                            <td>Handball, Basketball, Futsal, Volleyball 4×4, Rugby Touch.</td>
                        </tr>
                        <tr>
                            <td><strong>2. Le Système par Vagues en Couloirs Parallèles</strong></td>
                            <td>Découpage du plateau en 6 couloirs parallèles de 2,5 m de large. 6 vagues de 7 élèves partent simultanément au coup de sifflet toutes les 25 secondes (retour en trottinant par les couloirs extérieurs de sécurité).</td>
                            <td>12 plots et 1 sifflet (ou 6 ballons pour conduite de balle / dribble en vagues).</td>
                            <td>Course de vitesse, Course de haies (lattes plates), Relais, Dribble Basket/Foot.</td>
                        </tr>
                        <tr>
                            <td><strong>3. Les Ateliers Rotatifs Complémentaires (Circuit 3 Postes)</strong></td>
                            <td>3 ateliers de 14 élèves tournant toutes les 10 minutes :<br>• <strong>Atelier A (Technique avec engin)</strong> : Lancer du poids (3 cercles tracés à la craie vers le même secteur sécurisé au commandement unique du prof) ;<br>• <strong>Atelier B (Médecine-ball / Pliométrie)</strong> : Lancers de médecine-balls ou ballons lestés ;<br>• <strong>Atelier C (Vitesse d'impulsion &amp; Gainage)</strong> : Bondissements sur lattes et gainage.</td>
                            <td>3 poids officiels + 3 vieux ballons lestés de sable + craie + décamètre.</td>
                            <td>Lancer du Poids, Saut en Longueur, Gymnastique au sol (par ateliers d'éléments A/B/C).</td>
                        </tr>
                        <tr>
                            <td><strong>4. Les Pelotons d'Allure VMA en Boucle Étalonnée</strong></td>
                            <td>Piste ou périmètre de 200 m balisé de 8 plots (1 plot tous les 25 m). Deux séries de 21 élèves : pendant que la Série 1 court par pelotons de VMA (13 km/h, 15 km/h, 17 km/h), chaque coureur est suivi par son binôme observateur de la Série 2 qui coche les plots franchis au coup de sifflet.</td>
                            <td>8 plots, 1 chronomètre et 21 fiches binômes.</td>
                            <td>Course en durée / Demi-fond, Test Demi-Cooper, Intermittent 15"/15" ou 30"/30".</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 id="formule-tem">III. Comment Calculer et Optimiser le Temps d'Engagement Moteur (TEM)</h2>
            <p>En didactique de l'EPS (question classique de l'écrit du CRMEF), le <strong>Temps d'Engagement Moteur (TEM)</strong> correspond au rapport entre le temps où l'élève est réellement en activité motrice spécifique et la durée totale de la séance :</p>
            <div class="success-box">
                <p style="margin:0;color:#0f172a;"><strong>Formule Didactique du TEM :</strong><br>
                <code>TEM (%) = [ Temps d'activité motrice effective d'un élève / Durée effective de la séance (50 min) ] × 100</code><br>
                <strong>Objectif qualité en EPS au Maroc :</strong> Viser un <strong>TEM effectif supérieur à 50–65 %</strong> (et un <strong>Temps d'Engagement Cognitif et Moteur combiné &gt; 85 %</strong> grâce aux tâches d'arbitrage et de co-observation pendant les phases de récupération).</p>
            </div>

            <h2 id="protocole-dispenses">IV. Statut Juridique et Intégration Pédagogique des Élèves Dispensés au Maroc</h2>
            <p>Conformément aux circulaires ministérielles régissant l'EPS au Maroc, <strong>le certificat médical dispense de la pratique physique intense, mais ne dispense en aucun cas de la présence obligatoire au cours d'EPS</strong>. Un élève dispensé qui quitte l'établissement pendant l'heure d'EPS reste sous la responsabilité administrative de l'établissement s'il n'a pas fait l'objet d'une autorisation régulière de l'administration. Sur le terrain, l'élève dispensé devient un <strong>auxiliaire pédagogique actif</strong> à travers 5 rôles progressifs :</p>
            <ol>
                <li><strong>Juge-Arbitre / Juge de ligne ou de secteur :</strong> Application des gestes réglementaires officiels (voir nos <a href="blog.html" style="color:#991b1b;font-weight:800;text-decoration:underline;">20 dossiers Règlements &amp; Gestes d'Arbitrage 2026</a>).</li>
                <li><strong>Observateur Statistique (Co-évaluation) :</strong> Relevé sur grille papier des ballons joués, des tirs tentés/marqués ou des temps de passage VMA d'un camarade ou d'une équipe.</li>
                <li><strong>Chronométreur &amp; Starter Officiel :</strong> Gestion des départs (<em>« À vos marques, Prêts, Partez »</em>) et annonce des temps de passage toutes les 30 secondes en course en durée.</li>
                <li><strong>Coach Tactique d'Équipe :</strong> Animation des 2 minutes de temps mort entre deux mi-temps de tournoi à partir des statistiques relevées au bord du terrain.</li>
                <li><strong>Responsable Matériel &amp; Sécurité :</strong> Vérification de l'espacement des tapis de gymnastique, ratissage de la fosse de saut ou remise en place des témoins et plots.</li>
            </ol>

            <h2 id="grille-notation-dispense">V. Grille d'Évaluation Adaptée sur 20 Points pour un Élève Dispensé (Temporaire ou Annuel)</h2>
            <p>Lorsqu'un élève présente une dispense médicale temporaire (sur un cycle) ou partielle et que l'enseignant évalue son implication théorique, méthodologique et sociale au sein du cycle, voici le barème pédagogique de référence :</p>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Compétence Évaluée chez l'Élève Dispensé</th>
                            <th>Barème (/20)</th>
                            <th>Indicateurs Observables et Productions Attendues</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>1. Maîtrise du Règlement &amp; Arbitrage Pratique sur le Terrain</strong></td>
                            <td><strong>06 points</strong></td>
                            <td>Connaissance exacte des dimensions, des fautes et application juste des gestes d'arbitrage et de la tenue de la feuille de match / mesure.</td>
                        </tr>
                        <tr>
                            <td><strong>2. Qualité des Fiches d'Observation &amp; Analyse Tactique/Technique</strong></td>
                            <td><strong>06 points</strong></td>
                            <td>Précision des relevés statistiques pendant les séances, identification des défauts moteurs de ses camarades et pertinence des conseils donnés en tant que coach.</td>
                        </tr>
                        <tr>
                            <td><strong>3. Dossier Théorique / Contrôle Écrit sur l'APSA et la Physiologie</strong></td>
                            <td><strong>04 points</strong></td>
                            <td>Réalisation d'une fiche synthétique sur l'APSA du cycle (historique, règlement, échauffement spécifique, muscles sollicités) et réussite au test écrit de fin de cycle.</td>
                        </tr>
                        <tr>
                            <td><strong>4. Assiduité, Ponctualité &amp; Responsabilité Sociale</strong></td>
                            <td><strong>04 points</strong></td>
                            <td>Présence systématique à toutes les séances, aide active à l'installation/rangement du matériel didactique et posture exemplaire.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
    '''

    faq_list = [
        (
            "Comment organiser un cycle de Lancer du Poids en toute sécurité avec 42 élèves et seulement 3 poids ?",
            "Il ne faut jamais faire lancer des élèves face à face ! Tracez 3 cercles alignés sur une même ligne de départ, orientés vers la même zone de chute, et appliquez un commandement unique en 4 temps au sifflet : 1) Les 3 lanceurs entrent dans leurs cercles ; 2) Tir groupé au coup de sifflet ; 3) Lecture de la mesure par les 3 binômes juges après atterrissage complet ; 4) Ramassage des 3 poids en les portant (jamais en les relançant vers l'arrière). Pendant ce temps, les autres groupes travaillent sur 2 ateliers parallèles (médecine-ball et pliométrie)."
        ),
        (
            "Un élève dispensé médicalement doit-il assister au cours d'EPS au Maroc ?",
            "Oui, sauf dispense administrative exceptionnelle d'assiduité accordée par la direction de l'établissement pour raison médicale lourde immobilisante, l'élève dispensé de pratique physique est tenu d'assister au cours d'EPS où il est intégré aux apprentissages conceptuels et aux rôles sociaux (arbitrage, observation, chronométrage, coaching)."
        ),
        (
            "Quel est le Temps d'Engagement Moteur (TEM) minimal recommandé par l'inspection pédagogique en EPS ?",
            "Une séance d'EPS bien structurée doit garantir un Temps d'Engagement Moteur (TEM) individuel supérieur à 50-60 % du temps effectif de la partie fondamentale, complété par un engagement cognitif actif (observation, arbitrage) durant les phases de récupération."
        )
    ]

    html = build_article_html(filename, title, meta_desc, badge, h1, ref_label, read_time, toc_items, body_html, faq_list, breadcrumb_name)
    out_path = os.path.join(PUBLIC_DIR, filename)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Created {filename}")


def create_article_4_comparatif_generateur():
    filename = "comparatif-generateur-eps-gratuit-maroc.html"
    title = "Comparatif des Générateurs de Fiches EPS : Pourquoi Choisir ProfEPS Maroc (100% Gratuit, Export PDF & Word, OP 2007/2009) | ProfEPS"
    meta_desc = "Comparatif complet entre le générateur de fiches de séance et de cycles ProfEPS Maroc (100% Gratuit, illimité, export PDF et Word .docx, calibré sur les OP 2007 Lycée et OP 2009 Collège) et les générateurs payants ou génériques."
    badge = "⚡ Comparatif Outils Numériques EPS · 100% Gratuit (Export PDF & Word)"
    h1 = "Comparatif des Générateurs de Fiches & Cycles EPS : Pourquoi ProfEPS Maroc est l'Outil N°1 100% Gratuit (PDF & Word) Conforme aux OP 2007/2009"
    ref_label = "Orientations Pédagogiques EPS Maroc (OP 2007 Lycée & OP 2009 Collège)"
    read_time = "18 min de lecture"
    breadcrumb_name = "Comparatif Générateur EPS 100% Gratuit (PDF & Word)"

    toc_items = [
        ("pourquoi-comparer", "1. Pourquoi les Générateurs Étrangers ou Payants Bloquent au Maroc"),
        ("tableau-comparatif", "2. Tableau Comparatif : ProfEPS Maroc vs Générateurs Payants"),
        ("avantages-word-pdf", "3. Double Export Instantané : PDF Prêt à Imprimer & Word (.docx)"),
        ("conformite-op", "4. Calibrage Exact sur les Modules et OTI des OP 2007 & OP 2009"),
        ("ecosysteme-complet", "5. L'Écosystème Intégré : 11 Calculateurs + 20 Règlements + CRMEF"),
        ("faq-officielle", "6. Questions Fréquentes sur le Générateur Gratuit")
    ]

    body_html = '''
            <div class="info-box">
                <h4 style="color:#991b1b;margin-bottom:0.4rem;font-size:1.05rem;">🏆 L'Engagement ProfEPS Maroc : Zéro Abonnement, Zéro Limite de Génération, 100% Conforme aux OP</h4>
                <p style="margin:0;color:#1e293b;">De nombreux générateurs de fiches d'EPS sur le web francophone imposent un <strong>abonnement payant mensuel après 2 ou 3 essais</strong> et génèrent des fiches calquées sur les <em>Attendus de Fin de Lycée (AFL)</em> ou les <em>Champs d'Apprentissage (CA1 à CA5)</em> du programme français — <strong>totalement rejetés lors d'une inspection pédagogique ou de l'examen du CAPEP/CRMEF au Maroc</strong>. Découvrez pourquoi <a href="generateur.html" style="color:#991b1b;font-weight:800;text-decoration:underline;">le Générateur ProfEPS Maroc</a> a été conçu spécifiquement par et pour les professeurs d'EPS au Maroc.</p>
            </div>

            <h2 id="pourquoi-comparer">I. Les 3 Limites Majeures des Générateurs Payants ou Génériques d'IA</h2>
            <ol>
                <li><strong>Incompatibilité curriculaire avec le Maroc :</strong> Utiliser une fiche mentionnant « Champ d'Apprentissage n°4 » ou « Socle commun français cycle 4 » devant un inspecteur marocain ou un jury CRMEF constitue une erreur éliminatoire. Au Maroc, toute fiche doit obligatoirement articuler le <strong>Module du semestre</strong>, l'<strong>Objectif Terminal d'Intégration (OTI)</strong>, la <strong>Compétence Visée officielle</strong> des <strong>OP 2009 (Collège : 1AC, 2AC, 3AC)</strong> ou des <strong>OP 2007 (Lycée : TC, 1Bac, 2Bac)</strong> et le barème réglementaire sur 20 points.</li>
                <li><strong>Restriction payante (Freemium bloqué à 3 fiches) :</strong> Un enseignant d'EPS qui prépare 6 cycles par an pour 3 niveaux différents a besoin de générer <strong>plus de 180 fiches de séances et 18 projets de cycles</strong> par année scolaire. Un outil limité à 3 générations gratuites est inutilisable au quotidien.</li>
                <li><strong>Absence d'export Word modifiable (`.docx`) :</strong> Beaucoup d'outils verrouillent le téléchargement en PDF non modifiable ou exigent une carte bancaire pour télécharger le fichier Word. Or chaque enseignant doit pouvoir adapter une variable didactique au matériel réel de son établissement.</li>
            </ol>

            <h2 id="tableau-comparatif">II. Tableau Comparatif Honnête : ProfEPS Maroc vs Générateurs EPS Payants</h2>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th style="width:28%;">Critère Technique &amp; Pédagogique</th>
                            <th style="width:36%;background:#fef2f2;color:#991b1b;">🇲🇦 Générateur ProfEPS Maroc (profeps.ma)</th>
                            <th style="width:36%;">🌍 Générateurs EPS Payants / Généralistes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Tarif &amp; Quota de Génération</strong></td>
                            <td><strong>100% Gratuit &amp; Illimité</strong> (aucune carte bancaire, aucun abonnement caché)</td>
                            <td>Payant (abonnement mensuel/annuel après 2 ou 3 essais gratuits)</td>
                        </tr>
                        <tr>
                            <td><strong>Formats d'Export Inclus</strong></td>
                            <td><strong>Double Export : PDF Haute Définition + Word (`.docx`)</strong> directement éditable</td>
                            <td>Souvent PDF verrouillé ou export Word réservé aux comptes Premium</td>
                        </tr>
                        <tr>
                            <td><strong>Référentiel Pédagogique</strong></td>
                            <td><strong>100% Conforme aux OP 2009 (Collège 1AC-3AC) &amp; OP 2007 (Lycée TC-2Bac)</strong> du Maroc</td>
                            <td>Programmes français (Champs d'apprentissage CA1-CA5, AFL) non conformes au Maroc</td>
                        </tr>
                        <tr>
                            <td><strong>Structure de la Fiche de Séance</strong></td>
                            <td><strong>Norme Marocaine Officielle :</strong> Partie Introductive (10-15 min), Partie Fondamentale (30-35 min), Partie Finale (5 min), But, Conditions de réalisation, Critères de réussite &amp; de réalisation, Variables didactiques</td>
                            <td>Structure générique souvent dépourvue de distinction entre critères de réalisation et critères de réussite</td>
                        </tr>
                        <tr>
                            <td><strong>Grilles d'Évaluation Sommative (/20)</strong></td>
                            <td><strong>Pondération exacte OP 2007 &amp; OP 2009 :</strong> 12/3/5 au Collège et 14/3/3 au Lycée (Produit/Processus, A/B/C en Gym, Individuel/Collectif en Sports Co)</td>
                            <td>Grilles sur 20 non conformes aux barèmes marocains</td>
                        </tr>
                        <tr>
                            <td><strong>Outils Physiologiques &amp; Règlements Associés</strong></td>
                            <td><strong>11 Calculateurs scientifiques intégrés</strong> (VMA, Groupes de niveau, Karvonen, Foster RPE, ACWR) + <strong>20 Règlements 2026 illustrés en SVG</strong></td>
                            <td>Aucun calculateur de terrain ni dossier d'arbitrage intégré</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 id="avantages-word-pdf">III. Pourquoi le Double Téléchargement PDF + Word Change le Quotidien de l'Enseignant</h2>
            <p>Dans <a href="generateur.html" style="color:#991b1b;font-weight:800;text-decoration:underline;">notre Générateur Pédagogique EPS</a>, vous disposez simultanément des deux formats indispensables pour votre classeur d'inspection et votre cahier journal :</p>
            <ul>
                <li><strong>Le bouton d'export PDF :</strong> Génère instantanément une fiche parfaitement mise en page au format A4, prête à être imprimée et glissée dans une pochette plastique sur le terrain ou présentée à Monsieur l'Inspecteur.</li>
                <li><strong>Le bouton d'export Word :</strong> Permet d'ouvrir la fiche ou le projet de cycle dans Microsoft Word, Google Docs ou LibreOffice afin de personnaliser le nom de votre établissement, votre Direction Provinciale / AREF, ou d'ajuster une situation à votre effectif réel.</li>
            </ul>

            <div style="margin:2rem 0;padding:1.5rem;background:linear-gradient(135deg,#fff1f2 0%,#f0fdf4 100%);border:2px solid #991b1b;border-radius:16px;text-align:center;">
                <h3 style="margin-top:0;color:#0f172a;font-size:1.25rem;">🚀 Testez Maintenant le Générateur de Fiches &amp; Cycles EPS (100% Gratuit)</h3>
                <p style="max-width:720px;margin:0.5rem auto 1.25rem;color:#334155;">Choisissez votre cycle (Collège OP 2009 ou Lycée OP 2007), votre niveau (1AC, 2AC, 3AC, TC, 1Bac, 2Bac) et votre APSA, puis téléchargez votre dossier en <strong>PDF</strong> ou <strong>Word</strong> sans aucune limite.</p>
                <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:0.85rem;">
                    <a href="generateur.html" style="padding:0.75rem 1.5rem;background:#991b1b;color:#ffffff;font-weight:800;border-radius:10px;box-shadow:0 4px 12px rgba(153,27,27,0.25);">⚡ Ouvrir le Générateur PDF &amp; Word Gratuit →</a>
                    <a href="cycles-eps-maroc.html" style="padding:0.75rem 1.5rem;background:#ffffff;color:#0f172a;font-weight:800;border:1px solid #cbd5e1;border-radius:10px;">📚 Consulter les 26 Cycles Complets OP 2007/2009</a>
                </div>
            </div>
    '''

    faq_list = [
        (
            "Le générateur de fiches et de cycles ProfEPS Maroc est-il vraiment 100% gratuit et illimité ?",
            "Oui, le générateur pédagogique de ProfEPS Maroc (profeps.ma) est 100% gratuit, sans abonnement, sans carte bancaire et sans limite sur le nombre de fiches de séances ou de cycles générés."
        ),
        (
            "Peut-on télécharger les fiches générées à la fois en PDF et en format Word modifiable ?",
            "Oui, le générateur dispose déjà de l'export direct en PDF (pour impression immédiate) et de l'export en format Word modifiable afin que chaque professeur d'EPS puisse personnaliser ses documents."
        ),
        (
            "Les fiches générées respectent-elles les Orientations Pédagogiques marocaines 2007 et 2009 ?",
            "Absolument : chaque fiche intègre les modules officiels par niveau, l'Objectif Terminal d'Intégration (OTI), la Compétence Visée et la structure tripartite réglementaire des OP 2009 (Collège) et OP 2007 (Lycée Qualifiant)."
        )
    ]

    html = build_article_html(filename, title, meta_desc, badge, h1, ref_label, read_time, toc_items, body_html, faq_list, breadcrumb_name)
    out_path = os.path.join(PUBLIC_DIR, filename)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Created {filename}")


def update_blog_html():
    blog_path = os.path.join(PUBLIC_DIR, "blog.html")
    with open(blog_path, "r", encoding="utf-8") as f:
        html = f.read()

    if "article-baremes-bac-sport-maroc-officiels-libres.html" in html:
        print("blog.html already contains the 4 new pillar articles.")
        return

    new_cards = '''
                <!-- PROFEPS_MOROCCAN_PILLARS_2026_START -->
                <article class="article-card" data-category="documents">
                    <div class="article-visual article-documents">
                        <span class="category-badge category-documents">🇲🇦 Barèmes Officiels OP 2007 &amp; Bac Libre</span>
                        <div class="article-icon">
                            <svg viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#1d4ed8" stroke-width="2"/><polyline points="14 2 14 8 20 8" stroke="#1d4ed8" stroke-width="2"/><line x1="16" y1="13" x2="8" y2="13" stroke="#991b1b" stroke-width="2"/><line x1="16" y1="17" x2="8" y2="17" stroke="#991b1b" stroke-width="2"/></svg>
                        </div>
                    </div>
                    <div class="article-content">
                        <h3 class="article-title">Barèmes du Bac Sport au Maroc (Officiels &amp; Candidats Libres) : Athlétisme, Gymnastique &amp; Sports Collectifs</h3>
                        <p class="article-excerpt">Tableaux complets des barèmes d'évaluation du Bac Sport en EPS au Maroc (OP 2007 &amp; Bac Libre AREF) : vitesse (100m, 80m, 60m), demi-fond (1000m, 600m), poids (5kg/3kg), longueur, gymnastique (3A+3B+2C) et sports collectifs.</p>
                        <div class="article-footer">
                            <span class="article-date">3 Novembre 2026</span>
                            <a href="article-baremes-bac-sport-maroc-officiels-libres.html" class="read-more">Consulter les barèmes →</a>
                        </div>
                    </div>
                </article>

                <article class="article-card" data-category="carriere">
                    <div class="article-visual article-carriere">
                        <span class="category-badge category-carriere">🏛️ Inspection &amp; Titularisation CAPEP</span>
                        <div class="article-icon">
                            <svg viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#b45309" stroke-width="2"/></svg>
                        </div>
                    </div>
                    <div class="article-content">
                        <h3 class="article-title">Inspection Pédagogique &amp; Examen de Titularisation (CAPEP) en EPS au Maroc : Dossier, Cahier Journal &amp; Séance</h3>
                        <p class="article-excerpt">Guide de référence pour réussir la visite d'inspection et la certification CAPEP (Kafaâ) en EPS au Maroc : les 8 pièces obligatoires du dossier pédagogique, tenue du cahier journal, séance observée et questions du jury.</p>
                        <div class="article-footer">
                            <span class="article-date">3 Novembre 2026</span>
                            <a href="article-inspection-pedagogique-titularisation-eps-maroc.html" class="read-more">Lire le dossier complet →</a>
                        </div>
                    </div>
                </article>

                <article class="article-card" data-category="pratique">
                    <div class="article-visual article-pratique">
                        <span class="category-badge category-pratique">🏟️ Terrain Maroc · 40+ Élèves &amp; Dispensés</span>
                        <div class="article-icon">
                            <svg viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#047857" stroke-width="2"/><circle cx="9" cy="7" r="4" stroke="#047857" stroke-width="2"/><path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="#991b1b" stroke-width="2"/></svg>
                        </div>
                    </div>
                    <div class="article-content">
                        <h3 class="article-title">Gérer une Classe de 40+ Élèves et Évaluer les Élèves Dispensés en EPS au Maroc : Ateliers &amp; Rôles Sociaux</h3>
                        <p class="article-excerpt">Solutions concrètes pour enseigner l'EPS à 40+ élèves avec peu de matériel (tournoi triangulaire, couloirs en vagues, ateliers rotatifs), maximiser le TEM (&gt;60%) et noter les élèves dispensés sur 20 points.</p>
                        <div class="article-footer">
                            <span class="article-date">3 Novembre 2026</span>
                            <a href="article-gestion-grands-effectifs-dispenses-eps-maroc.html" class="read-more">Méthodes &amp; Grilles →</a>
                        </div>
                    </div>
                </article>

                <article class="article-card" data-category="didactique">
                    <div class="article-visual article-didactique">
                        <span class="category-badge category-didactique">⚡ Outil 100% Gratuit · PDF &amp; Word</span>
                        <div class="article-icon">
                            <svg viewBox="0 0 24 24" fill="none"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" stroke="#6d28d9" stroke-width="2"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" stroke="#991b1b" stroke-width="2"/></svg>
                        </div>
                    </div>
                    <div class="article-content">
                        <h3 class="article-title">Comparatif des Générateurs EPS : Pourquoi Choisir ProfEPS Maroc (100% Gratuit, PDF &amp; Word, OP 2007/2009)</h3>
                        <p class="article-excerpt">Comparatif détaillé entre le générateur de fiches et cycles ProfEPS Maroc (100% gratuit, illimité, double export PDF et Word .docx, conforme aux OP 2007/2009) et les générateurs payants ou génériques.</p>
                        <div class="article-footer">
                            <span class="article-date">3 Novembre 2026</span>
                            <a href="comparatif-generateur-eps-gratuit-maroc.html" class="read-more">Voir le comparatif →</a>
                        </div>
                    </div>
                </article>
                <!-- PROFEPS_MOROCCAN_PILLARS_2026_END -->
'''

    marker = '<div class="articles-grid" id="articlesGrid">'
    html = html.replace(marker, marker + "\n" + new_cards, 1)

    # Update static counts in blog.html
    html = html.replace('<span class="theme-count" id="count-all">113</span>', '<span class="theme-count" id="count-all">117</span>')
    html = html.replace('<span class="articles-count" id="articlesCount">113 articles</span>', '<span class="articles-count" id="articlesCount">117 articles</span>')
    html = html.replace('<span class="theme-count" id="count-documents">8</span>', '<span class="theme-count" id="count-documents">9</span>')
    html = html.replace('<span class="theme-count" id="count-didactique">13</span>', '<span class="theme-count" id="count-didactique">14</span>')
    html = html.replace('<span class="theme-count" id="count-carriere">11</span>', '<span class="theme-count" id="count-carriere">12</span>')
    html = html.replace('<span class="theme-count" id="count-pratique">19</span>', '<span class="theme-count" id="count-pratique">20</span>')

    with open(blog_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("Updated blog.html with 4 new Moroccan pillar cards (117 total articles).")


def update_sitemap_xml():
    sitemap_path = os.path.join(PUBLIC_DIR, "sitemap.xml")
    with open(sitemap_path, "r", encoding="utf-8") as f:
        xml = f.read()

    new_urls = [
        "article-baremes-bac-sport-maroc-officiels-libres.html",
        "article-inspection-pedagogique-titularisation-eps-maroc.html",
        "article-gestion-grands-effectifs-dispenses-eps-maroc.html",
        "comparatif-generateur-eps-gratuit-maroc.html"
    ]

    entries = []
    for slug in new_urls:
        loc = f"https://profeps.ma/{slug}"
        if loc not in xml:
            entries.append(f'''  <url>
    <loc>{loc}</loc>
    <lastmod>2026-11-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.90</priority>
  </url>''')

    if entries:
        xml = xml.replace("</urlset>", "\n".join(entries) + "\n</urlset>")
        with open(sitemap_path, "w", encoding="utf-8") as f:
            f.write(xml)
        print(f"Added {len(entries)} new canonical URLs to sitemap.xml.")


def inject_pillar_links_in_core_pages():
    """Add contextual links to the 4 new Moroccan pillar guides on index.html and evaluation-eps.html."""
    for target_file in ["index.html", "evaluation-eps.html", "orientations-pedagogiques-eps-2007-2009.html"]:
        p = os.path.join(PUBLIC_DIR, target_file)
        if not os.path.exists(p):
            continue
        with open(p, "r", encoding="utf-8") as f:
            html = f.read()

        if "PROFEPS_MOROCCAN_AUTHORITY_HUB_START" in html:
            continue

        authority_hub = '''
  <!-- PROFEPS_MOROCCAN_AUTHORITY_HUB_START -->
  <section aria-label="Dossiers Exclusifs EPS Maroc" style="max-width:1140px;margin:2rem auto;padding:1.5rem;background:linear-gradient(135deg,#fff8f8 0%,#ffffff 55%,#f3faf6 100%);border:2px solid #cbd5e1;border-left:6px solid #991b1b;border-radius:18px;box-shadow:0 8px 22px rgba(15,23,42,0.06);">
    <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.75rem;margin-bottom:1rem;">
      <div>
        <span style="display:inline-block;font-size:0.74rem;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;color:#991b1b;background:#fef2f2;padding:0.2rem 0.65rem;border-radius:999px;border:1px solid #fecaca;">🇲🇦 Référentiels Exclusifs EPS Maroc · OP 2007/2009</span>
        <h2 style="margin:0.35rem 0 0;font-size:1.22rem;font-weight:900;color:#0f172a;">Guides de Référence : Barèmes Bac Sport, Inspection CAPEP, Grands Effectifs (40+) &amp; Comparatif Générateur Gratuit</h2>
      </div>
      <a href="blog.html" style="font-size:0.82rem;font-weight:800;color:#991b1b;text-decoration:underline;">Voir les 117 dossiers du Blog →</a>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:0.85rem;">
      <a href="article-baremes-bac-sport-maroc-officiels-libres.html" style="display:flex;flex-direction:column;justify-content:space-between;padding:1rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;text-decoration:none;">
        <span style="font-size:0.72rem;font-weight:800;color:#991b1b;margin-bottom:0.3rem;">🏅 Examen Bac &amp; Bac Libre</span>
        <strong style="font-size:0.88rem;color:#0f172a;line-height:1.35;">Barèmes du Bac Sport au Maroc (Officiels &amp; Libres) : Vitesse, Demi-Fond, Poids, Longueur &amp; Gym (OP 2007) →</strong>
      </a>
      <a href="article-inspection-pedagogique-titularisation-eps-maroc.html" style="display:flex;flex-direction:column;justify-content:space-between;padding:1rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;text-decoration:none;">
        <span style="font-size:0.72rem;font-weight:800;color:#b45309;margin-bottom:0.3rem;">🏛️ Inspection &amp; CAPEP (Kafaâ)</span>
        <strong style="font-size:0.88rem;color:#0f172a;line-height:1.35;">Guide de l'Inspection Pédagogique &amp; Examen de Titularisation EPS : Les 8 Pièces du Dossier &amp; Cahier Journal →</strong>
      </a>
      <a href="article-gestion-grands-effectifs-dispenses-eps-maroc.html" style="display:flex;flex-direction:column;justify-content:space-between;padding:1rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;text-decoration:none;">
        <span style="font-size:0.72rem;font-weight:800;color:#047857;margin-bottom:0.3rem;">🏟️ Terrain Maroc · 40+ Élèves</span>
        <strong style="font-size:0.88rem;color:#0f172a;line-height:1.35;">Gérer une Classe de 40+ Élèves et Noter les Élèves Dispensés (/20) en EPS : Ateliers &amp; Rôles Sociaux →</strong>
      </a>
      <a href="comparatif-generateur-eps-gratuit-maroc.html" style="display:flex;flex-direction:column;justify-content:space-between;padding:1rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;text-decoration:none;">
        <span style="font-size:0.72rem;font-weight:800;color:#6d28d9;margin-bottom:0.3rem;">⚡ 100% Gratuit (PDF &amp; Word)</span>
        <strong style="font-size:0.88rem;color:#0f172a;line-height:1.35;">Comparatif Générateur EPS : Pourquoi ProfEPS Maroc (PDF &amp; Word Gratuit) Surpasse les Outils Payants →</strong>
      </a>
    </div>
  </section>
  <!-- PROFEPS_MOROCCAN_AUTHORITY_HUB_END -->
'''

        if "<!-- PROFEPS_EEAT_AUTHOR_START -->" in html:
            html = html.replace("<!-- PROFEPS_EEAT_AUTHOR_START -->", authority_hub + "\n  <!-- PROFEPS_EEAT_AUTHOR_START -->", 1)
        elif '<footer class="footer"' in html:
            html = html.replace('<footer class="footer"', authority_hub + '\n  <footer class="footer"', 1)

        with open(p, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"Injected Moroccan Authority Hub into {target_file}")


def sync_public_to_root():
    count = 0
    for fname in os.listdir(PUBLIC_DIR):
        if fname == "generateur.html":
            continue
        if fname.endswith(".html") or fname in ("sitemap.xml", "robots.txt"):
            src = os.path.join(PUBLIC_DIR, fname)
            dst = os.path.join(ROOT_DIR, fname)
            if os.path.isfile(src):
                shutil.copy2(src, dst)
                count += 1
    print(f"Synced {count} files from public/ to workspace root / (generateur.html untouched).")


if __name__ == "__main__":
    create_article_1_baremes_bac()
    create_article_2_inspection_capep()
    create_article_3_grands_effectifs_dispenses()
    create_article_4_comparatif_generateur()
    update_blog_html()
    update_sitemap_xml()
    inject_pillar_links_in_core_pages()
    sync_public_to_root()
