#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Étape 2C du Plan Directeur SEO — ProfEPS Maroc (profeps.ma)
Création du Silo SEO Arabe Statique Indexable (lang="ar" dir="rtl" + hreflang="ar-MA") :
1. ar-orientations-pedagogiques-eps-maroc.html
2. ar-fiches-seance-cycles-eps-maroc.html
3. ar-concours-crmef-eps-maroc.html
4. ar-baremes-bac-sport-maroc.html
+ Maillage hreflang bidirectionnel avec les pages françaises correspondantes
+ Indexation dans blog.html, index.html et sitemap.xml
+ Synchronisation public/ -> racine / (SANS TOUCHER A generateur.html)
"""

import os
import json
import shutil

PUBLIC_DIR = "/app/applet/public"
ROOT_DIR = "/app/applet"


def extract_template_parts():
    ref_path = os.path.join(PUBLIC_DIR, "reglement-lancer-poids-athletisme-bac-eps.html")
    with open(ref_path, "r", encoding="utf-8") as f:
        html = f.read()

    nav_start = html.find("<!-- PROFEPS_UNIFIED_NAVBAR_START -->")
    nav_end = html.find("<!-- PROFEPS_UNIFIED_NAVBAR_END -->") + len("<!-- PROFEPS_UNIFIED_NAVBAR_END -->")
    navbar_html = html[nav_start:nav_end]

    eeat_start = html.find("<!-- PROFEPS_EEAT_AUTHOR_START -->")
    footer_html = html[eeat_start:]

    return navbar_html, footer_html


def build_arabic_pillar_html(filename, fr_counterpart, title, meta_desc, badge, h1, ref_label, read_time, toc_items, body_html, faq_list, breadcrumb_name):
    navbar_html, footer_html = extract_template_parts()
    navbar_custom = navbar_html.replace(
        'data-current-file="reglement-lancer-poids-athletisme-bac-eps.html"',
        f'data-current-file="{filename}"'
    )

    canonical_url = f"https://profeps.ma/{filename}"
    fr_url = f"https://profeps.ma/{fr_counterpart}"

    tech_article_schema = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": title.replace(" | ProfEPS", ""),
        "description": meta_desc,
        "inLanguage": "ar-MA",
        "author": {
            "@type": "Person",
            "name": "عبد الخالق البوداني (Abdelkhalek ELBOUDANI)",
            "jobTitle": "أستاذ التربية البدنية والرياضية بالمغرب (Professeur d'EPS)",
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
            {"@type": "ListItem", "position": 1, "name": "الرئيسية ProfEPS المغرب", "item": "https://profeps.ma/"},
            {"@type": "ListItem", "position": 2, "name": "المدونة والدلائل التربوية", "item": "https://profeps.ma/blog.html"},
            {"@type": "ListItem", "position": 3, "name": breadcrumb_name, "item": canonical_url}
        ]
    }

    toc_links_html = "\n".join(
        [f'                    <a href="#{anchor}">{label}</a>' for anchor, label in toc_items]
    )

    faq_blocks_html = "\n".join(
        [
            f'''            <div class="faq-item">
                <h3 style="margin-top:0;font-size:1.08rem;color:#0f172a;">❓ {q}</h3>
                <p style="margin-bottom:0;color:#334155;">{a}</p>
            </div>'''
            for q, a in faq_list
        ]
    )

    return f'''<!DOCTYPE html>
<html lang="ar" dir="rtl">
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
    <meta property="og:locale" content="ar_MA">
    <meta property="og:locale:alternate" content="fr_MA">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{title}">
    <meta name="twitter:description" content="{meta_desc}">
    <meta name="twitter:image" content="https://profeps.ma/images/prof_eps.png">
    <link rel="canonical" href="{canonical_url}">
    <link rel="alternate" hreflang="ar-MA" href="{canonical_url}">
    <link rel="alternate" hreflang="ar" href="{canonical_url}">
    <link rel="alternate" hreflang="fr-MA" href="{fr_url}">
    <link rel="alternate" hreflang="fr" href="{fr_url}">
    <link rel="alternate" hreflang="x-default" href="{fr_url}">
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
            --font-sans: 'Cairo', 'Tajawal', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            --font-display: 'Cairo', 'Plus Jakarta Sans', var(--font-sans);
        }}
        body {{ font-family: var(--font-sans); background: var(--bg-secondary); color: var(--text-primary); line-height: 1.85; direction: rtl; text-align: right; }}
        a {{ text-decoration: none; color: inherit; }}
        .section-badge {{ display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.45rem 1rem; background: #fff1f2; border: 1px solid #fecdd3; border-radius: var(--radius-full); font-size: 0.88rem; font-weight: 800; color: var(--primary); margin-bottom: 1rem; }}
        .article-hero {{ padding: 130px 1.5rem 2.75rem; background: linear-gradient(135deg, #fff8f8 0%, #f8fafc 52%, #f3faf6 100%); border-bottom: 1px solid var(--border-light); text-align: center; }}
        .article-title {{ font-family: var(--font-display); font-size: clamp(1.65rem, 3.6vw, 2.35rem); font-weight: 900; color: var(--text-primary); max-width: 960px; margin: 0 auto 1rem; line-height: 1.4; }}
        .article-meta {{ display: flex; flex-wrap: wrap; justify-content: center; gap: 1.25rem; color: var(--text-secondary); font-size: 0.92rem; font-weight: 700; }}
        .article-container {{ max-width: 980px; margin: 0 auto; padding: 2.5rem 1.5rem; }}
        .back-link {{ display: inline-flex; align-items: center; gap: 0.5rem; color: var(--primary); font-weight: 800; margin-bottom: 1.75rem; }}
        .back-link:hover {{ text-decoration: underline; }}
        .article-content {{ line-height: 1.9; color: var(--text-secondary); font-size: 1.02rem; }}
        .article-content h2 {{ font-size: 1.45rem; font-weight: 900; color: var(--text-primary); margin-top: 2.75rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 3px solid var(--primary); }}
        .article-content h3 {{ font-size: 1.2rem; font-weight: 800; color: var(--primary); margin-top: 1.75rem; margin-bottom: 0.65rem; }}
        .article-content p {{ margin-bottom: 1rem; }}
        .article-content ul, .article-content ol {{ margin: 1rem 0; padding-right: 1.75rem; padding-left: 0; }}
        .article-content li {{ margin-bottom: 0.55rem; }}
        .info-box {{ background: #fff8f8; border: 1px solid #f5c2c7; border-right: 5px solid var(--primary); padding: 1.35rem 1.5rem; border-radius: var(--radius-lg); margin: 1.5rem 0; }}
        .success-box {{ background: #f3faf6; border: 1px solid #a7d7c5; border-right: 5px solid var(--secondary); padding: 1.35rem 1.5rem; border-radius: var(--radius-lg); margin: 1.5rem 0; }}
        .step-card {{ background: var(--bg-primary); border-radius: var(--radius-lg); padding: 1.35rem 1.5rem; margin: 1.25rem 0; border: 1px solid var(--border); box-shadow: var(--shadow-sm); }}
        .table-container {{ overflow-x: auto; margin: 1.5rem 0; }}
        .table-container table {{ width: 100%; border-collapse: collapse; background: #ffffff; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm); border: 1px solid var(--border); text-align: right; }}
        .table-container th {{ background: #f1f5f9; color: #0f172a; padding: 0.85rem 1rem; text-align: right; font-size: 0.9rem; font-weight: 800; border-bottom: 2px solid var(--border); }}
        .table-container td {{ padding: 0.85rem 1rem; border-bottom: 1px solid var(--border-light); font-size: 0.9rem; color: #1e293b; vertical-align: top; }}
        .table-container tr:nth-child(even) td {{ background: #f8fafc; }}
        .faq-item {{ background: var(--bg-primary); border-radius: var(--radius-lg); padding: 1.35rem 1.5rem; margin: 1rem 0; border: 1px solid var(--border); box-shadow: var(--shadow-sm); }}
        .toc-nav {{ background: #ffffff; border: 1px solid var(--border); border-radius: 16px; padding: 1.25rem 1.5rem; margin: 1.5rem 0 2rem; box-shadow: var(--shadow-sm); }}
        .toc-nav h3 {{ margin: 0 0 0.75rem 0 !important; font-size: 1.05rem !important; color: #0f172a !important; }}
        .toc-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.5rem; }}
        .toc-grid a {{ display: block; padding: 0.55rem 0.8rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 0.88rem; font-weight: 700; color: #1e293b; transition: all 0.2s; }}
        .toc-grid a:hover {{ border-color: var(--primary); color: var(--primary); background: #fff8f8; }}
    </style>
</head>
<body>
{navbar_custom}

    <section class="article-hero">
        <span class="section-badge">{badge}</span>
        <h1 class="article-title">{h1}</h1>
        <div class="article-meta">
            <span>🏛️ المرجع الرسمي : {ref_label}</span>
            <span>📅 تحديث : 3 نونبر 2026</span>
            <span>⏱️ {read_time}</span>
            <span>✍️ إعداد الأستاذ : <a href="a-propos.html" style="text-decoration:underline;color:#991b1b;">عبد الخالق البوداني (Abdelkhalek ELBOUDANI)</a></span>
        </div>
    </section>

    <article class="article-container">
        <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;margin-bottom:1.5rem;background:#ffffff;padding:0.9rem 1.25rem;border-radius:12px;border:1px solid #cbd5e1;">
            <a href="blog.html" class="back-link" style="margin:0;">→ العودة إلى المدونة والدلائل التربوية</a>
            <div style="display:flex;flex-wrap:wrap;gap:0.6rem;">
                <a href="{fr_counterpart}" style="padding:0.45rem 0.9rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;font-size:0.84rem;font-weight:800;color:#0f172a;">🇫🇷 Lire la version française complète</a>
                <a href="generateur.html" style="padding:0.45rem 0.9rem;background:#991b1b;color:#ffffff;border-radius:8px;font-size:0.84rem;font-weight:800;">⚡ مولد الجذاذات والدورات (PDF/Word مجاناً)</a>
            </div>
        </div>

        <div class="article-content">
            <nav class="toc-nav" aria-label="فهرس الدليل">
                <h3>🧭 فهرس الدليل المرجعي الشامل</h3>
                <div class="toc-grid">
{toc_links_html}
                </div>
            </nav>

{body_html}

            <h2 id="faq-ar">أسئلة شائعة في مباريات التعليم (CRMEF) والممارسة الميدانية</h2>
{faq_blocks_html}

            <div style="margin:2.25rem 0;padding:1.5rem;background:linear-gradient(135deg,#fff1f2 0%,#f0fdf4 100%);border:2px solid #991b1b;border-radius:16px;">
                <h3 style="margin-top:0;color:#0f172a;font-size:1.2rem;">🇲🇦 الدلائل المرجعية باللغة العربية على منصة ProfEPS المغرب</h3>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:0.75rem;margin-top:1rem;">
                    <a href="ar-orientations-pedagogiques-eps-maroc.html" style="padding:0.75rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;font-weight:800;font-size:0.88rem;color:#0f172a;">📘 التوجيهات التربوية 2007 و 2009 بالمغرب ←</a>
                    <a href="ar-fiches-seance-cycles-eps-maroc.html" style="padding:0.75rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;font-weight:800;font-size:0.88rem;color:#0f172a;">📄 جذاذات وتخطيط حصص التربية البدنية PDF/Word ←</a>
                    <a href="ar-concours-crmef-eps-maroc.html" style="padding:0.75rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;font-weight:800;font-size:0.88rem;color:#0f172a;">🎓 الاستعداد لمباراة التعليم تخصص التربية البدنية CRMEF ←</a>
                    <a href="ar-baremes-bac-sport-maroc.html" style="padding:0.75rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;font-weight:800;font-size:0.88rem;color:#0f172a;">🏅 سلم تنقيط البكالوريا (رسميين وأحرار) والإعفاء ←</a>
                </div>
            </div>
        </div>
    </article>

{footer_html}
'''


def create_ar_1_orientations_pedagogiques():
    filename = "ar-orientations-pedagogiques-eps-maroc.html"
    fr_counterpart = "orientations-pedagogiques-eps-2007-2009.html"
    title = "التوجيهات التربوية لمادة التربية البدنية والرياضية 2007 (الثانوي التأهيلي) و 2009 (الإعدادي) بالمغرب : ملخص شامل وجداول المجزوءات | ProfEPS"
    meta_desc = "دليل شامل ومفصل حول التوجيهات التربوية والبرامج الرسمية لمادة التربية البدنية والرياضية بالمغرب لسلكي الثانوي الإعدادي (شتنبر 2009) والثانوي التأهيلي (غشت 2007) : المجزوءات، الكفايات المستهدفة، هدف الإدماج OTI وشبكات التقويم."
    badge = "🇲🇦 المرجع الرسمي لوزارة التربية الوطنية · التوجيهات التربوية 2007 و 2009"
    h1 = "التوجيهات التربوية لمادة التربية البدنية والرياضية بالمغرب (2007 الثانوي التأهيلي و 2009 الثانوي الإعدادي) : المجزوءات، الكفايات وشبكات التقويم"
    ref_label = "التوجيهات التربوية الرسمية لوزارة التربية الوطنية والتعليم الأولي والرياضة (2007 / 2009)"
    read_time = "25 دقيقة للقراءة"
    breadcrumb_name = "التوجيهات التربوية للتربية البدنية 2007 و 2009"

    toc_items = [
        ("comparison-2007-2009", "1. مقارنة شاملة بين توجيهات 2007 (التأهيلي) و 2009 (الإعدادي)"),
        ("modules-college", "2. مجزوءات وكفايات السلك الثانوي الإعدادي (1AC, 2AC, 3AC)"),
        ("modules-lycee", "3. مجزوءات وكفايات السلك الثانوي التأهيلي (TC, 1Bac, 2Bac)"),
        ("evaluation-20", "4. توزيع نقط التقويم الإشهادي على 20 حسب الأنشطة"),
        ("generateur-link", "5. تحميل الجذاذات والدورات المطابقة للتوجيهات مجاناً"),
        ("faq-ar", "6. أسئلة شائعة في مباراة التعليم CRMEF")
    ]

    body_html = '''
            <div class="info-box">
                <h4 style="color:#991b1b;margin-bottom:0.4rem;font-size:1.08rem;">📌 الخلاصة المرجعية لأساتذة التربية البدنية والمترشحين لمباراة التعليم (CRMEF)</h4>
                <p style="margin:0;color:#1e293b;">تُشكّل <strong>التوجيهات التربوية لغشت 2007 (السلك الثانوي التأهيلي)</strong> و<strong>التوجيهات التربوية لشتنبر 2009 (السلك الثانوي الإعدادي)</strong> الإطار المنهجي والقانوني المعتمد لتدريس وتقويم مادة التربية البدنية والرياضية بالمغرب. يرتكز هذان المرجعان على <strong>المقاربة بالكفايات (Approche par Compétences - APC)</strong> وبيداغوجيا الإدماج، حيث تنتقل المادة من مجرد تلقين تقنيات رياضية معزولة إلى تكوين متعلم متوازن قادر على تعبئة موارده الحركية، المعرفية، والمنهجية والاجتماعية.</p>
            </div>

            <h2 id="comparison-2007-2009">أولاً : جدول المقارنة الدقيقة بين التوجيهات التربوية 2009 (الإعدادي) و 2007 (التأهيلي)</h2>
            <p>يُعدّ التمييز بين خصائص السلك الإعدادي والسلك التأهيلي السؤال الأكثر تكرراً في الاختبارات الكتابية والشفوية لـ <a href="qcm-didactique-eps-maroc.html" style="color:#991b1b;font-weight:800;text-decoration:underline;">مباراة التعليم تخصص التربية البدنية CRMEF</a> وفي امتحانات الكفاءة المهنية :</p>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>محور المقارنة</th>
                            <th>التوجيهات التربوية شتنبر 2009 (الثانوي الإعدادي)</th>
                            <th>التوجيهات التربوية غشت 2007 (الثانوي التأهيلي)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>الفئة المستهدفة والمستويات</strong></td>
                            <td>الأولى إعدادي (1AC)، الثانية إعدادي (2AC)، الثالثة إعدادي (3AC).</td>
                            <td>الجذع المشترك (TC)، الأولى بكالوريا (1Bac)، الثانية بكالوريا (2Bac).</td>
                        </tr>
                        <tr>
                            <td><strong>الغلاف الزمني الأسبوعي</strong></td>
                            <td><strong>ساعتان (2h)</strong> أسبوعياً للتدريس الفصلي + حصة الجمعية الرياضية المدرسية (ASS) يوم الجمعة مساءً.</td>
                            <td><strong>ساعتان (2h)</strong> أسبوعياً للتدريس الفصلي + حصة الجمعية الرياضية المدرسية (ASS) يوم الجمعة مساءً.</td>
                        </tr>
                        <tr>
                            <td><strong>تنظيم السنة الدراسية</strong></td>
                            <td><strong>6 دورات دراسية (Cycles)</strong> في السنة (3 دورات في الأسدس الأول و 3 دورات في الأسدس الثاني)، بمعدل 10 إلى 12 حصة لكل دورة.</td>
                            <td><strong>6 دورات دراسية (Cycles)</strong> في السنة (3 دورات في كل أسدس)، بمعدل 10 إلى 12 حصة لكل نشاط رياضي (APSA).</td>
                        </tr>
                        <tr>
                            <td><strong>توزيع النقطة على 20 (ألعاب القوى والجمباز)</strong></td>
                            <td>• المهارات الحركية : <strong>12 نقطة</strong><br>• المعارف المفاهيمية : <strong>03 نقط</strong><br>• المعارف السلوكية : <strong>05 نقط</strong></td>
                            <td>• المهارات الحركية : <strong>14 نقطة</strong><br>• المعارف المفاهيمية : <strong>03 نقط</strong><br>• المعارف السلوكية : <strong>03 نقط</strong></td>
                        </tr>
                        <tr>
                            <td><strong>توزيع النقطة على 20 (الرياضات الجماعية)</strong></td>
                            <td>• المهارات الحركية : <strong>12 نقطة</strong> (6 فردي + 6 جماعي)<br>• المعارف المفاهيمية : <strong>03 نقط</strong><br>• المعارف السلوكية : <strong>05 نقط</strong></td>
                            <td>• المهارات الحركية : <strong>14 نقطة</strong> (6 فردي + 8 جماعي)<br>• المعارف المفاهيمية : <strong>03 نقط</strong><br>• المعارف السلوكية : <strong>03 نقط</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 id="modules-college">ثانياً : المجزوءات وأهداف الإدماج (OTI) بالسلك الثانوي الإعدادي (توجيهات 2009)</h2>
            <p>يتدرج المتعلم في السلك الثانوي الإعدادي عبر ثلاث سنوات لبناء استجابات حركية سليمة والاندماج الإيجابي داخل الجماعة :</p>
            <ul>
                <li><strong>السنة الأولى إعدادي (1AC) :</strong> التركيز على <em>التكيف الحركي واكتشاف القوانين الأساسية للأنشطة</em> والانتقال من اللعب العفوي المتمركز حول الكرة إلى التنظيم الجماعي البسيط واحترام قواعد السلامة.</li>
                <li><strong>السنة الثانية إعدادي (2AC) :</strong> التركيز على <em>تعبئة الموارد التقنية والتكتيكية البسيطة داخل مشروع جماعي</em>، وتبادل الأدوار الاجتماعية (حكم، ملاحظ، منظم).</li>
                <li><strong>السنة الثالثة إعدادي (3AC) :</strong> التركيز على <em>إعداد وتنفيذ مشروع فردي أو جماعي وتدبير المجهود البدني بفعالية</em> استعداداً للامتحان الجهوي والانتقال إلى السلك التأهيلي.</li>
            </ul>

            <h2 id="modules-lycee">ثالثاً : المجزوءات وأهداف الإدماج (OTI) بالسلك الثانوي التأهيلي (توجيهات 2007)</h2>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>المستوى الدراسي</th>
                            <th>المجزوءة الرسمية والهدف النهائي للإدماج (OTI)</th>
                            <th>متطلبات الجمباز الأرضي (كمثال تطبيقي)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>الجذع المشترك (Tronc Commun)</strong></td>
                            <td><strong>التوازن الحركي والاندماج بالوسط الجديد :</strong> التحكم في المهارات الأساسية واستثمار الإمكانات البدنية في وضعيات مقننة مع احترام القوانين الفدرالية المبسطة.</td>
                            <td>إنجاز سلسلة جمبازية تتضمن <strong>4 عناصر A + 2 عناصر B</strong> على الأقل.</td>
                        </tr>
                        <tr>
                            <td><strong>الأولى بكالوريا (1re Année Bac)</strong></td>
                            <td><strong>المجهود البدني والتواصل الجماعي :</strong> تحليل الوضعيات التنافسية واختيار الخطة التكتيكية أو الإيقاع الفيزيولوجي المناسب لتحقيق أفضل مردودية.</td>
                            <td>إنجاز سلسلة جمبازية تتضمن <strong>4 عناصر A + 2 عناصر B + 1 عنصر C</strong>.</td>
                        </tr>
                        <tr>
                            <td><strong>الثانية بكالوريا (2e Année Bac)</strong></td>
                            <td><strong>النجاعة الحركية والاستقلالية في التدبير :</strong> تصميم وتنفيذ وتقويم مشروع فردي أو جماعي يحقق أقصى نجاعة حركية ومردودية بدنية.</td>
                            <td>إنجاز سلسلة جمبازية تتضمن <strong>3 عناصر A + 3 عناصر B + 2 عناصر C</strong>.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 id="generateur-link">رابعاً : توليد الجذاذات والدورات الدراسية المطابقة للتوجيهات التربوية 2007 و 2009 مجاناً</h2>
            <p>توفر لكم منصة <strong>ProfEPS المغرب</strong> أول <a href="generateur.html" style="color:#991b1b;font-weight:800;text-decoration:underline;">مولّد رقمي مجاني 100% للجذاذات والدورات التربوية</a> مبرمج بدقة وفق المجزوءات والكفايات الرسمية للتوجيهات التربوية 2007 و 2009، مع إمكانية التحميل الفوري بصيغتي <strong>PDF جاهز للطباعة</strong> و<strong>Word قابل للتعديل</strong> بدون أي اشتراك.</p>
    '''

    faq_list = [
        (
            "ما هو الفرق في توزيع النقط بين التوجيهات التربوية 2009 (الإعدادي) و 2007 (التأهيلي) ؟",
            "في السلك الإعدادي (توجيهات 2009) تُخصّص 12 نقطة للمهارات الحركية، 3 نقط للمعارف المفاهيمية و 5 نقط للمعارف السلوكية (لتعزيز التربية على المواطنة والانضباط). أما في السلك التأهيلي (توجيهات 2007) فتُخصّص 14 نقطة للمهارات الحركية، 3 نقط للمعارف المفاهيمية و 3 نقط للمعارف السلوكية."
        ),
        (
            "كم عدد الدورات الدراسية (Cycles) المبرمجة سنوياً في مادة التربية البدنية بالمغرب ؟",
            "تتكون السنة الدراسية من 6 دورات دراسية (3 دورات في الأسدس الأول و 3 دورات في الأسدس الثاني)، وتتراوح مدة كل دورة بين 10 و 12 حصة فعلية تشمل حصة التقويم التشخيصي (الملاحظة)، حصص التعلم والتكوين، وحصة التقويم الإشهادي."
        ),
        (
            "كيف تتوزع الـ 14 نقطة الخاصة بالمهارات الحركية في الرياضات الجماعية بالسلك التأهيلي (OP 2007) ؟",
            "في الرياضات الجماعية بالثانوي التأهيلي (كرة اليد، كرة السلة، الكرة الطائرة، كرة القدم)، تنقسم الـ 14 نقطة الحركية إلى 6 نقط للقدرة الفردية (التحكم التقني الفردي) و 8 نقط للمردودية الجماعية داخل مشروع الفريق."
        )
    ]

    html = build_arabic_pillar_html(filename, fr_counterpart, title, meta_desc, badge, h1, ref_label, read_time, toc_items, body_html, faq_list, breadcrumb_name)
    with open(os.path.join(PUBLIC_DIR, filename), "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Created {filename}")


def create_ar_2_fiches_et_cycles():
    filename = "ar-fiches-seance-cycles-eps-maroc.html"
    fr_counterpart = "cycles-eps-maroc.html"
    title = "جذاذات التربية البدنية والرياضية بالمغرب (الإعدادي والتأهيلي) : تخطيط الحصص والدورات وتحميل PDF و Word مجاناً | ProfEPS"
    meta_desc = "دليل منهجي لإعداد وتحميل جذاذات التربية البدنية والرياضية ومشاريع الدورات الدراسية للسلكين الإعدادي (OP 2009) والتأهيلي (OP 2007) بالمغرب بصيغتي PDF و Word مجاناً : المراحل الثلاث للحصة، معايير الإنجاز ومعايير النجاح."
    badge = "📄 التخطيط التربوي والجذاذات · تحميل PDF و Word مجاناً"
    h1 = "جذاذات التربية البدنية والرياضية وتخطيط الدورات الدراسية بالمغرب (الإعدادي والتأهيلي) : المنهجية الرسمية وتحميل PDF و Word"
    ref_label = "التوجيهات التربوية 2007 و 2009 · الدليل البيداغوجي لأستاذ التربية البدنية"
    read_time = "22 دقيقة للقراءة"
    breadcrumb_name = "جذاذات وتخطيط حصص التربية البدنية PDF و Word"

    toc_items = [
        ("structure-fiche", "1. الهندسة الرسمية لجذاذة حصة التربية البدنية بالمغرب"),
        ("criteres-diff", "2. الفرق الدقيق بين معايير الإنجاز ومعايير النجاح والمتغيرات الديداكتيكية"),
        ("structure-cycle", "3. كيفية بناء مشروع الدورة الدراسية (Projet de Cycle)"),
        ("apsa-list", "4. جذاذات جميع الأنشطة الرياضية (ألعاب القوى، الجماعية، الجمباز)"),
        ("faq-ar", "5. أسئلة شائعة حول الجذاذات والدفتر اليومي")
    ]

    body_html = '''
            <div class="info-box">
                <h4 style="color:#991b1b;margin-bottom:0.4rem;font-size:1.08rem;">⚡ صمّم وحمّل جذاذاتك ومشاريع الدورات في 30 ثانية (PDF و Word مجاناً)</h4>
                <p style="margin:0;color:#1e293b;">يُعتبر إعداد <strong>مشروع الدورة الدراسية (Projet Prévisionnel de Cycle)</strong> و<strong>جذاذة الحصة (Fiche de Préparation de Séance)</strong> حجر الزاوية في الملف التربوي لأستاذ التربية البدنية بالمغرب وفي الاختبارات العملية لشهادة الكفاءة التربوية (<a href="article-inspection-pedagogique-titularisation-eps-maroc.html" style="color:#991b1b;font-weight:800;text-decoration:underline;">التفتيش التربوي والترسيم CAPEP</a>). يمكنك توليد جميع جذاذاتك مباشرة عبر <a href="generateur.html" style="color:#006233;font-weight:800;text-decoration:underline;">مولّد الجذاذات المجاني ProfEPS (PDF &amp; Word)</a>.</p>
            </div>

            <h2 id="structure-fiche">أولاً : الهندسة الثلاثية الرسمية لحصة التربية البدنية والرياضية (55 إلى 60 دقيقة)</h2>
            <p>وفق التوجيهات التربوية المغربية (2007 و 2009)، تنقسم حصة التربية البدنية وجوباً إلى ثلاث مراحل متكاملة :</p>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>المرحلة</th>
                            <th>المدة الزمنية</th>
                            <th>الأهداف والمضامين البيداغوجية والفيزيولوجية</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>1. المرحلة التمهيدية (Partie Introductive)</strong></td>
                            <td><strong>10 إلى 15 دقيقة</strong></td>
                            <td>• <strong>الجانب التنظيمي :</strong> المناداة، مراقبة البذلة الرياضية، توزيع المهام على التلاميذ المعفيين، تقديم هدف الحصة.<br>• <strong>التسخين العام (Échauffement général) :</strong> تنشيط الجهاز القلبي التنفسي، تحريك المفاصل، التمديدات العضلية الديناميكية.<br>• <strong>التسخين الخاص (Échauffement spécifique) :</strong> ألعاب مصغرة أو تمارين تمهيدية مرتبطة مباشرة بنشاط الحصة.</td>
                        </tr>
                        <tr>
                            <td><strong>2. المرحلة الأساسية (Partie Fondamentale)</strong></td>
                            <td><strong>30 إلى 35 دقيقة</strong></td>
                            <td>• وضعيات تعلمية متدرجة (Situations d'apprentissage) ووضعية مرجعية (Situation de référence).<br>• تحديد دقيق لـ : <strong>هدف الوضعية (But)</strong>، <strong>شروط الإنجاز (Conditions de réalisation)</strong>، <strong>معايير الإنجاز (Critères de réalisation)</strong>، <strong>معايير النجاح (Critères de réussite)</strong>، و<strong>المتغيرات الديداكتيكية (Variables didactiques)</strong>.</td>
                        </tr>
                        <tr>
                            <td><strong>3. المرحلة الختامية (Partie Finale)</strong></td>
                            <td><strong>5 إلى 10 دقائق</strong></td>
                            <td>• <strong>الرجوع إلى الهدوء (Retour au calme) :</strong> استرجاع فيزيولوجي خفيف.<br>• <strong>الحصيلة المعرفية (Bilan métacognitif) :</strong> مناقشة القواعد الحركية المكتسبة مع التلاميذ، إعلان نتائج الملاحظين، وجمع العتاد الديداكتيكي.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 id="criteres-diff">ثانياً : التمييز المنهجي بين مكونات الوضعية التعلمية (أساس النجاح في CRMEF والتفتيش)</h2>
            <ul>
                <li><strong>هدف الوضعية (Le But de la tâche) :</strong> ما يجب على التلميذ تحقيقه بلغة واضحة ومباشرة (مثال في كرة اليد : <em>« إيصال الكرة لمنطقة التهديف في أقل من 4 تمريرات دون ضياعها »</em>).</li>
                <li><strong>معايير الإنجاز (Critères de réalisation — كيف أنجز ؟) :</strong> القواعد البيوميكانيكية والتكتيكية التي تضمن النجاح (مثال : <em>« التوجه نحو المرمى، تمرير الكرة في مسار حركة الزميل غير المراقب، عدم تنطيط الكرة في مكان ثابت »</em>).</li>
                <li><strong>معايير النجاح (Critères de réussite — الدليل الكمي الملموس) :</strong> مؤشر رقمي قابل للقياس يثبت تحقق التعلم (مثال : <em>« نجاح الفريق في 4 محاولات هجومية من أصل 6 »</em> أو <em>« تسجيل 3 إصابات من أصل 5 رميات »</em>).</li>
                <li><strong>المتغيرات الديداكتيكية (Variables didactiques) :</strong> العناصر التي يعدّلها الأستاذ لتبسيط الوضعية أو تعقيدها (مساحة الملعب، عدد المدافعين، عدد التمريرات أو لمسات الكرة، الوقت المسموح به).</li>
            </ul>

            <h2 id="apsa-list">ثالثاً : روابط مباشرة لجذاذات الأنشطة الرياضية والقوانين الفدرالية 2026</h2>
            <p>يمكنكم تصفح الدلائل البيداغوجية والقوانين الرسمية المرفقة بالرسوم التوضيحية لجميع الأنشطة المدرسة بالمغرب :</p>
            <ul>
                <li><strong>الرياضات الجماعية :</strong> <a href="article-fiche-seance-handball-eps.html" style="color:#991b1b;font-weight:800;">جذاذات كرة اليد</a> · <a href="article-fiche-seance-basketball-eps.html" style="color:#991b1b;font-weight:800;">جذاذات كرة السلة</a> · <a href="article-fiche-seance-volleyball-eps.html" style="color:#991b1b;font-weight:800;">جذاذات الكرة الطائرة</a> · <a href="article-fiche-seance-football-eps.html" style="color:#991b1b;font-weight:800;">جذاذات كرة القدم</a> · <a href="article-fiche-seance-rugby-eps.html" style="color:#991b1b;font-weight:800;">جذاذات الريكبي المدرسي</a>.</li>
                <li><strong>ألعاب القوى والجمباز :</strong> <a href="article-fiche-seance-athletisme-eps.html" style="color:#991b1b;font-weight:800;">جذاذات ألعاب القوى (السرعة، نصف الطويل، الجلة، الوثب)</a> · <a href="article-fiche-seance-gymnastique-eps.html" style="color:#991b1b;font-weight:800;">جذاذات الجمباز الأرضي</a> · <a href="cycles-eps-maroc.html" style="color:#006233;font-weight:800;">26 دورة دراسية كاملة لجميع المستويات</a>.</li>
            </ul>
    '''

    faq_list = [
        (
            "ما هو الفرق بين معيار الإنجاز (Critère de réalisation) ومعيار النجاح (Critère de réussite) ؟",
            "معيار الإنجاز يصف الكيفية التقنية أو التكتيكية لأداء المهارة (كيف أفعل ؟ مثل: ثني الركبتين، رفع المرفق عند الرمي)، بينما معيار النجاح هو مؤشر كمي رقمي يمكّن المتعلم والأستاذ من الحكم على تحقق الهدف (مثل: إصابة الهدف 4 مرات من أصل 5 محاولات)."
        ),
        (
            "كيف يمكنني تحميل جذاذات التربية البدنية بصيغة Word قابلة للتعديل مجاناً ؟",
            "عبر الدخول إلى أداة المولّد التربوي (Générateur) في منصة ProfEPS المغرب، اختيار السلك (إعدادي أو تأهيلي)، المستوى والنشاط الرياضي، ثم الضغط على زر التحميل بصيغة PDF أو بصيغة Word (.docx) مجاناً وبدون حدود."
        )
    ]

    html = build_arabic_pillar_html(filename, fr_counterpart, title, meta_desc, badge, h1, ref_label, read_time, toc_items, body_html, faq_list, breadcrumb_name)
    with open(os.path.join(PUBLIC_DIR, filename), "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Created {filename}")


def create_ar_3_concours_crmef():
    filename = "ar-concours-crmef-eps-maroc.html"
    fr_counterpart = "qcm-didactique-eps-maroc.html"
    title = "الاستعداد لمباراة التعليم تخصص التربية البدنية والرياضية (CRMEF) بالمغرب : التوصيف، الديداكتيك، علوم التربية و QCM تفاعلي | ProfEPS"
    meta_desc = "البوابة الشاملة للاستعداد لمباراة ولوج المراكز الجهوية لمهن التربية والتكوين (CRMEF) تخصص التربية البدنية والرياضية بالمغرب : محاور التوصيف الرسمي، ديداكتيك التخصص، علوم التربية، القوانين الفدرالية 2026 والاختبار الشفوي."
    badge = "🎓 بوابة مباراة التعليم CRMEF بالمغرب · تخصص التربية البدنية والرياضية"
    h1 = "الاستعداد الشامل لمباراة التعليم تخصص التربية البدنية والرياضية (CRMEF) بالمغرب : التوصيف الرسمي، الديداكتيك، علوم التربية والشفوي"
    ref_label = "الأطر المرجعية والتوصيفات الرسمية لمباريات توظيف الأساتذة (CNEE / MENPS)"
    read_time = "26 دقيقة للقراءة"
    breadcrumb_name = "الاستعداد لمباراة التعليم تخصص التربية البدنية CRMEF"

    toc_items = [
        ("descriptif-officiel", "1. محاور التوصيف الرسمي لمباراة التعليم تخصص التربية البدنية"),
        ("sciences-education", "2. مستجدات علوم التربية ونظام التربية والتكوين بالمغرب"),
        ("didactique-anatomie", "3. ديداكتيك التربية البدنية، الفيزيولوجيا والتشريح وقوانين الألعاب"),
        ("epreuve-orale", "4. منهجية النجاح في الاختبار الشفوي والعملي (MSP)"),
        ("qcm-simulateurs", "5. اختبارات QCM التفاعلية المجانية بالتصحيح المعلّل"),
        ("faq-ar", "6. أسئلة شائعة للمترشحين لمباراة CRMEF")
    ]

    body_html = '''
            <div class="info-box">
                <h4 style="color:#991b1b;margin-bottom:0.4rem;font-size:1.08rem;">🎯 دليلك المتكامل للنجاح في الكتابي والعملي والشفوي لمباراة التعليم (CRMEF EPS)</h4>
                <p style="margin:0;color:#1e293b;">تتطلب مباراة ولوج المراكز الجهوية لمهن التربية والتكوين (CRMEF) لتوظيف أساتذة التعليم الثانوي تخصص <strong>التربية البدنية والرياضية</strong> تحكماً مزدوجاً في <strong>مواد التخصص (الفيزيولوجيا، التشريح، البيوميكانيك، القوانين الفدرالية للرياضات، وديداكتيك المادة وفق توجيهات 2007 و 2009)</strong> وفي <strong>علوم التربية ومستجدات منظومة التربية والتكوين بالمغرب</strong>. نوفر لكم على منصة ProfEPS أزيد من <a href="concours-crmef-hub.html" style="color:#991b1b;font-weight:800;text-decoration:underline;">15 محاكي QCM تفاعلي مجاني مع التصحيح المفصل</a>.</p>
            </div>

            <h2 id="descriptif-officiel">أولاً : محاور التوصيف الرسمي لاختبارات مباراة التعليم تخصص التربية البدنية</h2>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>المجال الرئيسي في المباراة</th>
                            <th>المضامين والمحاور الدقيقة المطلوب ضبطها</th>
                            <th>الرابط التطبيقي للمراجعة على المنصة</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>1. ديداكتيك التربية البدنية والتوجيهات التربوية</strong></td>
                            <td>التوجيهات التربوية 2007 (التأهيلي) و 2009 (الإعدادي)، المقاربة بالكفايات، تخطيط الدورات والحصص، شبكات التقويم، تدبير الأقسام المكتظة والتلاميذ المعفيين.</td>
                            <td><a href="qcm-didactique-eps-maroc.html" style="color:#991b1b;font-weight:800;">محاكي QCM ديداكتيك التربية البدنية ←</a></td>
                        </tr>
                        <tr>
                            <td><strong>2. الفيزيولوجيا، التشريح والبيوميكانيك الرياضي</strong></td>
                            <td>المسالك الطاقية الثلاثة (الفوسفاجين اللاهوائي اللاحمضي، اللاهوائي اللبني، الهوائي)، السرعة الهوائية القصوى VMA، استهلاك الأوكسجين VO2max، معادلة Karvonen، الانقباض العضلي والسلاسل الحركية.</td>
                            <td><a href="hub-outils-sport-performance.html" style="color:#006233;font-weight:800;">بوابة الحاسبات الفيزيولوجية الـ 11 ←</a></td>
                        </tr>
                        <tr>
                            <td><strong>3. القوانين الفدرالية للأنشطة الرياضية والتحكيم (2026)</strong></td>
                            <td>الأبعاد القانونية للملاعب، أوزان الجلة والرمح والقرص، علو الشباك والحواجز، إشارات التحكيم الرسمية (IHF, FIBA, FIVB, IFAB, World Athletics, FIG).</td>
                            <td><a href="blog.html" style="color:#991b1b;font-weight:800;">موسوعة القوانين الفدرالية 2026 (20 رياضة) ←</a></td>
                        </tr>
                        <tr>
                            <td><strong>4. علوم التربية ومستجدات نظام التربية والتكوين</strong></td>
                            <td>نظريات التعلم (السلوكية، البنائية، السوسيوبنائية، المعرفية)، القانون الإطار 51.17، الرؤية الاستراتيجية 2015-2030، خارطة الطريق 2022-2026، الحياة المدرسية والجمعية الرياضية ASS.</td>
                            <td><a href="qcm-sciences-education-crmef.html" style="color:#006233;font-weight:800;">محاكي QCM علوم التربية الجذع المشترك ←</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 id="didactique-anatomie">ثانياً : أهم الأرقام الفيزيولوجية والقانونية التي تتكرر في أسئلة QCM الكتابي</h2>
            <ul>
                <li><strong>المسالك الطاقية (Filières énergétiques) :</strong> المسلك اللاهوائي اللاحمضي (ATP-CP) يسود في الجهود القصوى من <strong>0 إلى 7–10 ثوانٍ</strong> (بدون إنتاج حمض اللبنيك) ؛ المسلك اللاهوائي اللبني (Glycolyse anaérobie) يسود في الجهود من <strong>15 ثانية إلى دقيقتين</strong> (سباقات 200م، 400م، 800م) ؛ المسلك الهوائي (Filière aérobie) يسود في الجهود التي تتجاوز <strong>2–3 دقائق</strong>.</li>
                <li><strong>الأوزان الرسمية لدفع الجلة (Lancer du poids) :</strong> الكبار ذكور <strong>7,260 كلغ</strong> ؛ الشبان (U20) <strong>6 كلغ</strong> ؛ الفتيان وتلاميذ البكالوريا ذكور بالمغرب <strong>5 كلغ</strong> ؛ الكبيرات وتلاميذ الإعدادي ذكور <strong>4 كلغ</strong> ؛ تلميذات الإعدادي والبكالوريا إناث <strong>3 كلغ</strong> (وقطر دائرة الرمي <strong>2,135 متر</strong> وزاوية القطاع <strong>34,92 درجة</strong>).</li>
                <li><strong>العلو الرسمي لشبكة الكرة الطائرة (FIVB) :</strong> الكبار رجال <strong>2,43 متر</strong>، الكبيرات سيدات <strong>2,24 متر</strong> (مع تكييف العلو مدرسياً بين 2,00 م و 2,20 م حسب الفئة العمرية).</li>
            </ul>

            <h2 id="epreuve-orale">ثالثاً : منهجية النجاح في المقابلة الشفوية والوضعية المهنية (MSP)</h2>
            <p>خلال الاختبار الشفوي، تطرح اللجنة على المترشح <strong>وضعية مهنية ميدانية (Mise en Situation Professionnelle)</strong> مثل : <em>« لديك قسم من 42 تلميذاً في السنة الثانية إعدادي بملعب كرة يد واحد و 4 كرات فقط و 3 تلاميذ معفيين، كيف تخطط لحصة تعلمية في التقدم الجماعي نحو المرمى ؟ »</em>. للاطلاع على الإجابات النموذجية المفصلة، راجع دليلنا الخاص بـ <a href="article-oral-crmef-eps-maroc.html" style="color:#991b1b;font-weight:800;text-decoration:underline;">الاختبار الشفوي لمباراة التعليم CRMEF EPS</a> ودليل <a href="article-gestion-grands-effectifs-dispenses-eps-maroc.html" style="color:#006233;font-weight:800;text-decoration:underline;">تدبير الأقسام المكتظة (40+ تلميذ) والتلاميذ المعفيين</a>.</p>
    '''

    faq_list = [
        (
            "ما هي المواد والمعاملات في الاختبار الكتابي لمباراة التعليم تخصص التربية البدنية بالمغرب ؟",
            "يرتكز الاختبار الكتابي على اختبار في مادة التخصص وديداكتيك التربية البدنية والرياضية (الفيزيولوجيا، التشريح، قوانين الألعاب، التخطيط والتقويم وفق توجيهات 2007 و 2009) واختبار في علوم التربية ومستجدات منظومة التربية والتكوين بالمغرب."
        ),
        (
            "أين أجد اختبارات QCM تفاعلية مصححة للاستعداد لمباراة CRMEF ؟",
            "توفر منصة ProfEPS المغرب بوابة مجانية متكاملة (concours-crmef-hub.html) تضم محاكيات QCM تفاعلية في ديداكتيك التربية البدنية، علوم التربية، وجميع التخصصات مع تصحيح فوري مفصل."
        )
    ]

    html = build_arabic_pillar_html(filename, fr_counterpart, title, meta_desc, badge, h1, ref_label, read_time, toc_items, body_html, faq_list, breadcrumb_name)
    with open(os.path.join(PUBLIC_DIR, filename), "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Created {filename}")


def create_ar_4_baremes_bac_sport():
    filename = "ar-baremes-bac-sport-maroc.html"
    fr_counterpart = "article-baremes-bac-sport-maroc-officiels-libres.html"
    title = "سلم تنقيط التربية البدنية في البكالوريا بالمغرب (رسميين وأحرار - باك حر) ومسطرة الإعفاء الطبي | ProfEPS"
    meta_desc = "الجداول الكاملة لسلم تنقيط مادة التربية البدنية والرياضية في البكالوريا بالمغرب للمترشحين الرسميين والأحرار (باك حر) وفق توجيهات 2007 : الجري السريع، نصف الطويل، دفع الجلة، الوثب الطويل، الجمباز ومسطرة الإعفاء الطبي."
    badge = "🏅 امتحانات البكالوريا بالمغرب · سلم التنقيط الرسمي وباك حر"
    h1 = "سلم تنقيط التربية البدنية في البكالوريا بالمغرب (المترشحون الرسميون والأحرار - باك حر) : جداول الأداء ومسطرة الإعفاء الطبي"
    ref_label = "التوجيهات التربوية 2007 (الثانية بكالوريا) والمذكرات الوزارية لامتحانات البكالوريا (الأحرار)"
    read_time = "20 دقيقة للقراءة"
    breadcrumb_name = "سلم تنقيط التربية البدنية في البكالوريا وباك حر"

    toc_items = [
        ("bareme-athle-ar", "1. جدول سلم التنقيط في ألعاب القوى (السرعة، نصف الطويل، دفع الجلة، الوثب)"),
        ("bareme-gym-ar", "2. تنقيط الجمباز الأرضي في البكالوريا (العناصر A و B و C)"),
        ("dispense-bac-libre", "3. مسطرة الإعفاء الطبي من الرياضة للمترشحين الأحرار (باك حر)"),
        ("conseils-examen", "4. نصائح عملية يوم إجراء الاختبار البدني للأحرار"),
        ("faq-ar", "5. أسئلة شائعة حول امتحان الرياضة في البكالوريا")
    ]

    body_html = '''
            <div class="info-box">
                <h4 style="color:#991b1b;margin-bottom:0.4rem;font-size:1.08rem;">📌 كل ما يخص نقطة التربية البدنية في السنة الثانية بكالوريا وامتحان الأحرار (باك حر)</h4>
                <p style="margin:0;color:#1e293b;">تُحتسب نقطة التربية البدنية والرياضية في امتحانات البكالوريا بالمغرب للمترشحين الممدرسين (في إطار المراقبة المستمرة) وللمترشحين الأحرار (الذين لم يدلوا بملف الإعفاء الطبي داخل الآجال القانونية). للاطلاع على الجداول التفصيلية الكاملة بالفرنسية أيضاً، يمكنكم زيارة <a href="article-baremes-bac-sport-maroc-officiels-libres.html" style="color:#991b1b;font-weight:800;text-decoration:underline;">دليل سلم تنقيط بكالوريا التربية البدنية بالمغرب</a>.</p>
            </div>

            <h2 id="bareme-athle-ar">أولاً : جدول سلم التنقيط المرجعي لاختبارات ألعاب القوى في البكالوريا (ذكور وإناث)</h2>
            <p>في اختبارات ألعاب القوى بالثانية بكالوريا وباك حر، يُقاس الأداء الرقمي في سباق السرعة (100م أو 80م أو 60م حسب المدار المتوفر بمركز الامتحان)، سباق نصف الطويل (1000 متر للذكور و 600م أو 800م للإناث)، ودفع الجلة (<strong>5 كلغ للذكور</strong> و<strong>3 كلغ أو 4 كلغ للإناث</strong>) :</p>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>النقطة على 20</th>
                            <th>100 متر ذكور</th>
                            <th>100 متر إناث</th>
                            <th>1000 متر ذكور</th>
                            <th>600 متر إناث</th>
                            <th>دفع الجلة ذكور (5 كلغ)</th>
                            <th>دفع الجلة إناث (3 كلغ)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td><strong>20 / 20</strong></td><td>≤ 12"0</td><td>≤ 14"2</td><td>≤ 2'55"</td><td>≤ 1'56"</td><td>≥ 11,50 متر</td><td>≥ 8,50 متر</td></tr>
                        <tr><td><strong>18 / 20</strong></td><td>12"3</td><td>14"6</td><td>3'05"</td><td>2'03"</td><td>10,80 متر</td><td>7,90 متر</td></tr>
                        <tr><td><strong>16 / 20</strong></td><td>12"7</td><td>15"1</td><td>3'15"</td><td>2'10"</td><td>10,10 متر</td><td>7,30 متر</td></tr>
                        <tr><td><strong>14 / 20</strong></td><td>13"2</td><td>15"7</td><td>3'28"</td><td>2'18"</td><td>9,40 متر</td><td>6,70 متر</td></tr>
                        <tr><td><strong>12 / 20</strong></td><td>13"7</td><td>16"4</td><td>3'42"</td><td>2'28"</td><td>8,70 متر</td><td>6,10 متر</td></tr>
                        <tr><td><strong>10 / 20 (المعدل)</strong></td><td>14"3</td><td>17"2</td><td>3'58"</td><td>2'40"</td><td>8,00 متر</td><td>5,50 متر</td></tr>
                        <tr><td><strong>08 / 20</strong></td><td>15"0</td><td>18"1</td><td>4'15"</td><td>2'55"</td><td>7,20 متر</td><td>4,80 متر</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 id="bareme-gym-ar">ثانياً : متطلبات الجمباز الأرضي في السنة الثانية بكالوريا (3A + 3B + 2C)</h2>
            <p>إذا اختار المترشح أو برمجت المؤسسة نشاط <strong>الجمباز الأرضي (Gymnastique au Sol)</strong>، فإن التوجيهات التربوية 2007 تشترط في مستوى الثانية بكالوريا تقديم سلسلة جمبازية مترابطة تتضمن على الأقل <strong>3 عناصر من صعوبة A و 3 عناصر من صعوبة B وعنصرين (2) من صعوبة C</strong>، ويتم تقويم صعوبة العناصر، جودة التركيب الفضائي، وسلامة الإنجاز التقني (استقامة الأطراف، الثبات عند الاستقبال). راجع <a href="reglement-gymnastique-fig-code-pointage-eps.html" style="color:#991b1b;font-weight:800;text-decoration:underline;">دليل قانون الجمباز وتصنيف حركات A و B و C</a>.</p>

            <h2 id="dispense-bac-libre">ثالثاً : مسطرة الإعفاء الطبي من التربية البدنية للمترشحين الأحرار (باك حر)</h2>
            <div class="step-card">
                <h3 style="margin-top:0;">تنبيه هام جداً للمترشحين الأحرار (Candidats Libres)</h3>
                <p>كل مترشح حر لم يودع ملف الإعفاء الطبي لدى المديرية الإقليمية داخل الآجال المحددة أثناء التسجيل (غالباً قبل نهاية نونبر/دجنبر) يُعتبر <strong>مطالباً إجبارياً باجتياز اختبار التربية البدنية</strong> (الذي يُجرى عادة بين أواخر فبراير ومارس). تغيّب المترشح غير المعفي يوم اختبار الرياضة يؤدي قانونياً إلى تسجيل نقطة <strong>« غائب (Absent) »</strong> وهي حالة موجبة لعدم المداولة في النتائج النهائية للبكالوريا !</p>
                <ul>
                    <li><strong>الوثائق المطلوبة يوم الاختبار البدني :</strong> البطاقة الوطنية للتعريف الإلكترونية (CNIE) الأصلية + الاستدعاء الرسمي المستخرج من بوابة الترشيح + بذلة وحذاء رياضي ملائم.</li>
                </ul>
            </div>
    '''

    faq_list = [
        (
            "ما هو وزن الجلة الرسمي في امتحان البكالوريا بالمغرب للذكور والإناث ؟",
            "في امتحانات البكالوريا بالمغرب (رسميين وأحرار)، الوزن القانوني للجلة بالنسبة للذكور هو 5 كيلوغرامات، وبالنسبة للإناث هو 3 كيلوغرامات (أو 4 كلغ حسب المذكرة الجهوية للأكاديمية)."
        ),
        (
            "ماذا يحدث إذا تغيب مترشح باك حر عن امتحان الرياضة دون أن يكون معفياً ؟",
            "إذا لم يكن المترشح الحر يتوفر على إعفاء طبي مصادق عليه من اللجنة الطبية الإقليمية في الآجال المحددة وتغيب عن اختبار التربية البدنية، يُعتبر غائباً في مادة إجبارية مما يحرمه من النجاح في دورة البكالوريا."
        )
    ]

    html = build_arabic_pillar_html(filename, fr_counterpart, title, meta_desc, badge, h1, ref_label, read_time, toc_items, body_html, faq_list, breadcrumb_name)
    with open(os.path.join(PUBLIC_DIR, filename), "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Created {filename}")


def inject_bidirectional_hreflang_in_french_counterparts():
    """Add <link rel="alternate" hreflang="ar-MA" ...> and an Arabic banner into the 4 paired French pages."""
    pairs = [
        ("orientations-pedagogiques-eps-2007-2009.html", "ar-orientations-pedagogiques-eps-maroc.html", "التوجيهات التربوية 2007 و 2009 باللغة العربية"),
        ("cycles-eps-maroc.html", "ar-fiches-seance-cycles-eps-maroc.html", "دليل جذاذات وتخطيط حصص التربية البدنية بالعربية"),
        ("qcm-didactique-eps-maroc.html", "ar-concours-crmef-eps-maroc.html", "دليل الاستعداد لمباراة التعليم تخصص التربية البدنية CRMEF بالعربية"),
        ("article-baremes-bac-sport-maroc-officiels-libres.html", "ar-baremes-bac-sport-maroc.html", "سلم تنقيط التربية البدنية في البكالوريا (رسميين وأحرار) بالعربية"),
    ]

    for fr_file, ar_file, ar_label in pairs:
        fr_path = os.path.join(PUBLIC_DIR, fr_file)
        if not os.path.exists(fr_path):
            continue
        with open(fr_path, "r", encoding="utf-8") as f:
            html = f.read()

        ar_url = f"https://profeps.ma/{ar_file}"
        hreflang_tag = f'<link rel="alternate" hreflang="ar-MA" href="{ar_url}">\n    <link rel="alternate" hreflang="ar" href="{ar_url}">'

        if f'href="{ar_url}"' not in html:
            if '<link rel="alternate" hreflang="x-default"' in html:
                html = html.replace(
                    '<link rel="alternate" hreflang="x-default"',
                    hreflang_tag + '\n    <link rel="alternate" hreflang="x-default"',
                    1
                )
            elif "</head>" in html:
                html = html.replace("</head>", f"    {hreflang_tag}\n</head>", 1)

        with open(fr_path, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"Linked bidirectional hreflang ar-MA in {fr_file} -> {ar_file}")


def update_blog_and_sitemap():
    # 1. Update blog.html
    blog_path = os.path.join(PUBLIC_DIR, "blog.html")
    with open(blog_path, "r", encoding="utf-8") as f:
        html = f.read()

    if "ar-orientations-pedagogiques-eps-maroc.html" not in html:
        ar_cards = '''
                <!-- PROFEPS_ARABIC_SEO_SILO_2026_START -->
                <article class="article-card" data-category="documents" dir="rtl" style="text-align:right;">
                    <div class="article-visual article-documents">
                        <span class="category-badge category-documents">🇲🇦 النسخة العربية · التوجيهات التربوية 2007 و 2009</span>
                        <div class="article-icon">
                            <svg viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#1d4ed8" stroke-width="2"/><polyline points="14 2 14 8 20 8" stroke="#1d4ed8" stroke-width="2"/></svg>
                        </div>
                    </div>
                    <div class="article-content">
                        <h3 class="article-title">التوجيهات التربوية لمادة التربية البدنية والرياضية 2007 (التأهيلي) و 2009 (الإعدادي) بالمغرب : ملخص شامل</h3>
                        <p class="article-excerpt">الدليل المرجعي الشامل للتوجيهات التربوية الرسمية لمادة التربية البدنية بالمغرب : جدول المقارنة بين السلكين الإعدادي والتأهيلي، المجزوءات، الكفايات المستهدفة، هدف الإدماج OTI وتوزيع النقط على 20.</p>
                        <div class="article-footer">
                            <span class="article-date">3 نونبر 2026</span>
                            <a href="ar-orientations-pedagogiques-eps-maroc.html" class="read-more">قراءة الدليل بالعربية ←</a>
                        </div>
                    </div>
                </article>

                <article class="article-card" data-category="didactique" dir="rtl" style="text-align:right;">
                    <div class="article-visual article-didactique">
                        <span class="category-badge category-didactique">📄 النسخة العربية · جذاذات PDF و Word</span>
                        <div class="article-icon">
                            <svg viewBox="0 0 24 24" fill="none"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" stroke="#6d28d9" stroke-width="2"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" stroke="#991b1b" stroke-width="2"/></svg>
                        </div>
                    </div>
                    <div class="article-content">
                        <h3 class="article-title">جذاذات التربية البدنية والرياضية بالمغرب (الإعدادي والتأهيلي) : تخطيط الحصص والدورات PDF و Word مجاناً</h3>
                        <p class="article-excerpt">منهجية إعداد جذاذات التربية البدنية ومشاريع الدورات الدراسية وفق التوجيهات التربوية 2007 و 2009 : المراحل الثلاث للحصة، الفرق بين معايير الإنجاز ومعايير النجاح، وتحميل الجذاذات بصيغتي PDF و Word.</p>
                        <div class="article-footer">
                            <span class="article-date">3 نونبر 2026</span>
                            <a href="ar-fiches-seance-cycles-eps-maroc.html" class="read-more">تصفح الجذاذات بالعربية ←</a>
                        </div>
                    </div>
                </article>

                <article class="article-card" data-category="carriere" dir="rtl" style="text-align:right;">
                    <div class="article-visual article-carriere">
                        <span class="category-badge category-carriere">🎓 النسخة العربية · مباراة التعليم CRMEF</span>
                        <div class="article-icon">
                            <svg viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#b45309" stroke-width="2"/></svg>
                        </div>
                    </div>
                    <div class="article-content">
                        <h3 class="article-title">الاستعداد لمباراة التعليم تخصص التربية البدنية والرياضية (CRMEF) بالمغرب : التوصيف، الديداكتيك و QCM</h3>
                        <p class="article-excerpt">دليل المترشح لاجتياز مباراة توظيف أساتذة التربية البدنية والرياضية بالمغرب : محاور التوصيف الرسمي، الفيزيولوجيا والمسالك الطاقية، قوانين الألعاب 2026، علوم التربية والاختبار الشفوي.</p>
                        <div class="article-footer">
                            <span class="article-date">3 نونبر 2026</span>
                            <a href="ar-concours-crmef-eps-maroc.html" class="read-more">دليل المباراة بالعربية ←</a>
                        </div>
                    </div>
                </article>

                <article class="article-card" data-category="documents" dir="rtl" style="text-align:right;">
                    <div class="article-visual article-documents">
                        <span class="category-badge category-documents">🏅 النسخة العربية · بكالوريا رسميين وأحرار</span>
                        <div class="article-icon">
                            <svg viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#1d4ed8" stroke-width="2"/><line x1="16" y1="13" x2="8" y2="13" stroke="#991b1b" stroke-width="2"/></svg>
                        </div>
                    </div>
                    <div class="article-content">
                        <h3 class="article-title">سلم تنقيط التربية البدنية في البكالوريا بالمغرب (رسميين وأحرار - باك حر) ومسطرة الإعفاء الطبي</h3>
                        <p class="article-excerpt">جداول التنقيط الرسمية لمادة التربية البدنية في البكالوريا بالمغرب (الجري السريع، نصف الطويل، دفع الجلة 5 كلغ و 3 كلغ، الوثب الطويل، الجمباز) وشروط الإعفاء الطبي للمترشحين الأحرار.</p>
                        <div class="article-footer">
                            <span class="article-date">3 نونبر 2026</span>
                            <a href="ar-baremes-bac-sport-maroc.html" class="read-more">سلم التنقيط بالعربية ←</a>
                        </div>
                    </div>
                </article>
                <!-- PROFEPS_ARABIC_SEO_SILO_2026_END -->
'''
        marker = "<!-- PROFEPS_MOROCCAN_PILLARS_2026_END -->"
        if marker in html:
            html = html.replace(marker, marker + "\n" + ar_cards, 1)
        else:
            grid_marker = '<div class="articles-grid" id="articlesGrid">'
            html = html.replace(grid_marker, grid_marker + "\n" + ar_cards, 1)

        html = html.replace('<span class="theme-count" id="count-all">117</span>', '<span class="theme-count" id="count-all">121</span>')
        html = html.replace('<span class="articles-count" id="articlesCount">117 articles</span>', '<span class="articles-count" id="articlesCount">121 articles</span>')
        html = html.replace('<span class="theme-count" id="count-documents">9</span>', '<span class="theme-count" id="count-documents">11</span>')
        html = html.replace('<span class="theme-count" id="count-didactique">14</span>', '<span class="theme-count" id="count-didactique">15</span>')
        html = html.replace('<span class="theme-count" id="count-carriere">12</span>', '<span class="theme-count" id="count-carriere">13</span>')

        with open(blog_path, "w", encoding="utf-8") as f:
            f.write(html)
        print("Updated blog.html with 4 Arabic pillar cards (121 total articles).")

    # 2. Update sitemap.xml
    sitemap_path = os.path.join(PUBLIC_DIR, "sitemap.xml")
    with open(sitemap_path, "r", encoding="utf-8") as f:
        xml = f.read()

    ar_urls = [
        "ar-orientations-pedagogiques-eps-maroc.html",
        "ar-fiches-seance-cycles-eps-maroc.html",
        "ar-concours-crmef-eps-maroc.html",
        "ar-baremes-bac-sport-maroc.html"
    ]
    entries = []
    for slug in ar_urls:
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
        print(f"Added {len(entries)} Arabic canonical URLs to sitemap.xml.")

    # 3. Add Arabic Hub block inside index.html
    index_path = os.path.join(PUBLIC_DIR, "index.html")
    with open(index_path, "r", encoding="utf-8") as f:
        idx_html = f.read()

    if "ar-orientations-pedagogiques-eps-maroc.html" not in idx_html:
        ar_hub_block = '''
    <div dir="rtl" style="margin-top:1rem;padding:1rem 1.25rem;background:#ffffff;border:1px solid #cbd5e1;border-right:5px solid #006233;border-radius:12px;text-align:right;">
      <div style="font-size:0.82rem;font-weight:800;color:#006233;margin-bottom:0.5rem;">🇲🇦 البوابة العربية المرجعية لمادة التربية البدنية والرياضية بالمغرب (فهرسة مباشرة بالعربية) :</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:0.65rem;">
        <a href="ar-orientations-pedagogiques-eps-maroc.html" style="padding:0.55rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;font-size:0.84rem;font-weight:800;color:#0f172a;text-decoration:none;">📘 التوجيهات التربوية 2007 و 2009 بالمغرب ←</a>
        <a href="ar-fiches-seance-cycles-eps-maroc.html" style="padding:0.55rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;font-size:0.84rem;font-weight:800;color:#0f172a;text-decoration:none;">📄 جذاذات وتخطيط حصص التربية البدنية PDF/Word ←</a>
        <a href="ar-concours-crmef-eps-maroc.html" style="padding:0.55rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;font-size:0.84rem;font-weight:800;color:#0f172a;text-decoration:none;">🎓 الاستعداد لمباراة التعليم تخصص التربية البدنية CRMEF ←</a>
        <a href="ar-baremes-bac-sport-maroc.html" style="padding:0.55rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;font-size:0.84rem;font-weight:800;color:#0f172a;text-decoration:none;">🏅 سلم تنقيط البكالوريا (رسميين وأحرار) والإعفاء ←</a>
      </div>
    </div>'''
        idx_html = idx_html.replace(
            "<!-- PROFEPS_MOROCCAN_AUTHORITY_HUB_END -->",
            ar_hub_block + "\n  <!-- PROFEPS_MOROCCAN_AUTHORITY_HUB_END -->",
            1
        )
        with open(index_path, "w", encoding="utf-8") as f:
            f.write(idx_html)
        print("Added Arabic SEO Silo links to index.html.")


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
    create_ar_1_orientations_pedagogiques()
    create_ar_2_fiches_et_cycles()
    create_ar_3_concours_crmef()
    create_ar_4_baremes_bac_sport()
    inject_bidirectional_hreflang_in_french_counterparts()
    update_blog_and_sitemap()
    sync_public_to_root()
