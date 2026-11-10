#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Génération des 10 Articles Piliers Bilingues (FR + AR) sur la Législation Scolaire & EPS au Maroc
+ Hébergement des 4 Ouvrages & Textes Officiels Marocains en PDF (/public/pdf/legislation/)
+ 20 Modèles Administratifs Officiels (10 en Arabe dir="rtl" + 10 en Français) prêts à copier et imprimer en A4
+ Intégration dans /public/blog.html (filtre « Législation & Textes Officiels » data-category="documents"),
  /public/bibliotheque-numerique-eps.html, /public/index.html et /public/sitemap.xml.
CONTRAINTE STRICTE : Ne jamais toucher ni modifier generateur.html.
"""

import os
import json
import shutil

PUBLIC_DIR = "/app/applet/public"
ROOT_DIR = "/app/applet"
PDF_DEST_DIR = os.path.join(PUBLIC_DIR, "pdf", "legislation")


def setup_official_pdfs():
    """Copy the 4 authentic Moroccan Legislation PDFs to /public/pdf/legislation/ with clean SEO filenames."""
    os.makedirs(PDF_DEST_DIR, exist_ok=True)
    pdf_mappings = [
        (
            "/app/applet/public/assets/aistudio/_________________________________594a1311.pdf",
            os.path.join(PDF_DEST_DIR, "guide-legislation-scolaire-ethique-profession-men-maroc.pdf"),
            "Guide MEN : التشريع المدرسي وأخلاقيات المهنة (99 pages)"
        ),
        (
            "/app/applet/public/assets/aistudio/__________________________________________bbd4c182.pdf",
            os.path.join(PDF_DEST_DIR, "module-fadeep-legislation-scolaire-organisation-administrative-maroc.pdf"),
            "Module FADEEP : التشريع المدرسي والتنظيم الإداري والتربوي (30 pages)"
        ),
        (
            "/app/applet/public/assets/aistudio/_____________________6c9696b5.pdf",
            os.path.join(PDF_DEST_DIR, "cours-complet-legislation-scolaire-maroc-ens-fes-dr-najjari.pdf"),
            "Cours ENS Fès (Dr. Najjari) : مادة التشريع المدرسي (55 pages)"
        ),
        (
            "/app/applet/public/assets/aistudio/____________02.10.628____________________30.09___________________________________76dad2bb.pdf",
            os.path.join(PDF_DEST_DIR, "decret-2-10-628-loi-30-09-eps-sport-scolaire-maroc-bo-5997.pdf"),
            "Décret 2.10.628 & Loi 30-09 EPS & Sport Scolaire — BO 5997 (7 pages)"
        ),
    ]

    for src, dst, label in pdf_mappings:
        if os.path.exists(src):
            shutil.copy2(src, dst)
            print(f"[PDF OK] {label} -> {dst}")
        else:
            raise FileNotFoundError(f"Missing source PDF: {src}")


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


ALL_10_ARTICLES_META = [
    ("accident-scolaire-eps-maroc-rapport-procedure.html", "1. Accident Scolaire & de Service en EPS (Dahir 1942 & Rapport + Croquis)", "الحوادث المدرسية وحوادث المصلحة وتقرير الحادثة"),
    ("responsabilite-civile-penale-professeur-eps-maroc.html", "2. Responsabilité Civile, Pénale & Administrative du Prof d'EPS (Art. 85 bis DOC)", "المسؤولية المدنية والجنائية والإدارية لأستاذ ت.ب (الفصل 85 مكرر)"),
    ("deplacement-sport-scolaire-ass-frmss-ordre-mission-eps.html", "3. Déplacements ASS, Tournois FRMSS, Loi 30-09 & Décret 2.10.628", "تنقلات الجمعية الرياضية ASS والجامعة FRMSS والمرسوم 2.10.628"),
    ("certificat-medical-dispense-eps-maroc-procedure-evaluation.html", "4. Certificat Médical, Dispense d'EPS, Contrôle & Évaluation Alternative", "الشهادة الطبية والإعفاء من التربية البدنية والتقويم البديل"),
    ("absences-conges-enseignant-eps-maroc-droits-procedures.html", "5. Congés, Absences, Retenue (Loi 12.81) & Abandon de Poste (Art. 75 bis)", "الرخص والتغيبات والاقتطاع (12.81) وترك الوظيفة (الفصل 75 مكرر)"),
    ("inspection-pedagogique-notation-avancement-professeur-eps-maroc.html", "6. Inspection Pédagogique, Notation (/20), Échelons, Grades & Salaires", "التفتيش التربوي والنقطة الإدارية (/20) والترقي والأجور والتعويضات"),
    ("conseil-discipline-conseils-etablissement-incident-eps-maroc.html", "7. Conseils d'Établissement (Décret 2.02.376), Conseil de Discipline & Conflits", "مجالس المؤسسة (2.02.376) والمجلس التأديبي وتدبير النزاعات"),
    ("commissions-paritaires-conseil-discipline-enseignant-maroc-droits.html", "8. Commissions Paritaires (CAP), Garanties Disciplinaires & Éthique (Note 46)", "اللجان الثنائية المتساوية الأعضاء والضمانات التأديبية وأخلاقيات المهنة"),
    ("cahier-de-textes-obligations-horaires-professeur-eps-maroc.html", "9. Cahier de Textes, Note 155, Correspondance Administrative & Horaires EPS", "دفتر النصوص والمذكرة 155 وتقنيات التراسل الإداري والحصة الأسبوعية"),
    ("organisation-epreuves-bac-eps-maroc-candidats-libres-officiels.html", "10. Organisation du Bac Sport (Officiels & Libres) & Loi Anti-Fraude", "تنظيم امتحان البكالوريا الرياضي (الرسميين والأحرار) ومسطرة زجر الغش"),
]


def get_official_pdf_download_box():
    """Return the bilingual HTML box offering direct downloads of the 4 official Moroccan legislation PDFs."""
    return '''
            <div id="telecharger-pdfs-officiels" class="pdf-pack-box">
                <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.75rem;margin-bottom:0.85rem;">
                    <div>
                        <span style="display:inline-block;background:#991b1b;color:#ffffff;font-size:0.74rem;font-weight:800;padding:0.25rem 0.7rem;border-radius:999px;text-transform:uppercase;letter-spacing:0.05em;">📥 Bibliothèque Juridique Officielle Maroc · 4 PDF Gratuits</span>
                        <h3 style="margin:0.4rem 0 0;font-size:1.18rem;font-weight:900;color:#0f172a;">Télécharger les Textes &amp; Ouvrages Officiels de Législation Scolaire et EPS (تحميل مراجع التشريع المدرسي الرسمي PDF)</h3>
                    </div>
                </div>
                <p style="font-size:0.9rem;color:#334155;margin-bottom:1rem;">Ces 4 documents officiels du Ministère (MENPS), de la Formation FADEEP, de l'ENS Fès et du Bulletin Officiel constituent la référence juridique authentique pour les professeurs d'EPS et les candidats aux concours CRMEF / CAPEP :</p>
                <div class="pdf-grid">
                    <a href="/pdf/legislation/guide-legislation-scolaire-ethique-profession-men-maroc.pdf" download class="pdf-card">
                        <div class="pdf-card-top">
                            <span class="pdf-badge">📕 MENPS · 99 Pages</span>
                            <span class="pdf-dl-tag">⬇ PDF (853 Ko)</span>
                        </div>
                        <strong class="pdf-title-ar" dir="rtl">التشريع المدرسي وأخلاقيات المهنة — وزارة التربية الوطنية</strong>
                        <span class="pdf-desc-fr">Responsabilité civile/pénale (Art. 85 bis DOC), Statut général, CAP, Conseil de discipline, Éthique (Note 46) &amp; Circulaire 26/2012.</span>
                    </a>
                    <a href="/pdf/legislation/module-fadeep-legislation-scolaire-organisation-administrative-maroc.pdf" download class="pdf-card">
                        <div class="pdf-card-top">
                            <span class="pdf-badge">📘 Module FADEEP · 30 Pages</span>
                            <span class="pdf-dl-tag">⬇ PDF (809 Ko)</span>
                        </div>
                        <strong class="pdf-title-ar" dir="rtl">مجزوءة التشريع المدرسي والتنظيم الإداري والتربوي (FADEEP)</strong>
                        <span class="pdf-desc-fr">Accidents scolaires (Imprimés 1, 2, 3 &amp; croquis), Accidents de service (48h), Note 155, Règles de correspondance administrative &amp; Conseils.</span>
                    </a>
                    <a href="/pdf/legislation/cours-complet-legislation-scolaire-maroc-ens-fes-dr-najjari.pdf" download class="pdf-card">
                        <div class="pdf-card-top">
                            <span class="pdf-badge">📗 ENS Fès · 55 Pages</span>
                            <span class="pdf-dl-tag">⬇ PDF (547 Ko)</span>
                        </div>
                        <strong class="pdf-title-ar" dir="rtl">مادة التشريع المدرسي — د. خالد النجاري (المدرسة العليا للأساتذة فاس)</strong>
                        <span class="pdf-desc-fr">Recrutement, Titularisation, Notation (/20), Avancement d'échelon &amp; de grade, Salaires/Indemnités, Congés &amp; Procédure anti-fraude au Bac.</span>
                    </a>
                    <a href="/pdf/legislation/decret-2-10-628-loi-30-09-eps-sport-scolaire-maroc-bo-5997.pdf" download class="pdf-card">
                        <div class="pdf-card-top">
                            <span class="pdf-badge">⚖️ Bulletin Officiel n° 5997</span>
                            <span class="pdf-dl-tag">⬇ PDF (277 Ko)</span>
                        </div>
                        <strong class="pdf-title-ar" dir="rtl">المرسوم رقم 2.10.628 بتطبيق القانون 30.09 المتعلق بالتربية البدنية والرياضة</strong>
                        <span class="pdf-desc-fr">Texte intégral du BO 5997 : Statuts ASS &amp; FRMSS (Art. 3), Autorisations d'absence 15 jours (Art. 10), Sponsoring (Art. 11) &amp; Diplôme requis (Art. 17).</span>
                    </a>
                </div>
            </div>
'''


def build_dual_templates_html(doc_id_prefix, title_fr, title_ar, content_ar, content_fr):
    """Build the interactive Arabic + French A4 administrative document template block with Copy & Print buttons."""
    ar_id = f"tpl-ar-{doc_id_prefix}"
    fr_id = f"tpl-fr-{doc_id_prefix}"
    return f'''
            <div class="admin-templates-wrapper" id="modeles-administratifs">
                <div class="admin-templates-header">
                    <span class="template-pill">📄 Modèles Administratifs Officiels Prêts à Copier &amp; Imprimer (A4) · نماذج إدارية جاهزة للنسخ والطباعة</span>
                    <h3 style="margin:0.4rem 0 0.25rem;font-size:1.25rem;font-weight:900;color:#0f172a;">{title_fr}</h3>
                    <p dir="rtl" style="margin:0;font-size:1.05rem;font-weight:800;color:#991b1b;">{title_ar}</p>
                </div>

                <div class="template-card">
                    <div class="template-toolbar">
                        <span class="template-lang-badge ar-badge">🇲🇦 النسخة العربية الرسمية (جاهزة للنسخ والطباعة A4)</span>
                        <div class="template-actions">
                            <button type="button" class="btn-copy-tpl" onclick="copyAdminTemplate('{ar_id}', this)">📋 نسخ النموذج بالعربية</button>
                            <button type="button" class="btn-print-tpl" onclick="printAdminTemplate('{ar_id}')">🖨️ طباعة A4 / Imprimer</button>
                        </div>
                    </div>
                    <pre id="{ar_id}" class="template-pre-ar" dir="rtl">{content_ar.strip()}</pre>
                </div>

                <div class="template-card" style="margin-top:1.5rem;">
                    <div class="template-toolbar">
                        <span class="template-lang-badge fr-badge">🇫🇷 Version Française Officielle (Prête à copier &amp; imprimer A4)</span>
                        <div class="template-actions">
                            <button type="button" class="btn-copy-tpl" onclick="copyAdminTemplate('{fr_id}', this)">📋 Copier le modèle FR</button>
                            <button type="button" class="btn-print-tpl" onclick="printAdminTemplate('{fr_id}')">🖨️ Imprimer en A4</button>
                        </div>
                    </div>
                    <pre id="{fr_id}" class="template-pre-fr" dir="ltr">{content_fr.strip()}</pre>
                </div>
            </div>
'''


def build_cross_links_silo(current_filename):
    """Build the 10-article Legislation Silo internal linking block."""
    cards = []
    for fname, label_fr, label_ar in ALL_10_ARTICLES_META:
        is_current = (fname == current_filename)
        style_border = "2px solid #991b1b" if is_current else "1px solid #cbd5e1"
        bg = "#fff1f2" if is_current else "#ffffff"
        badge_now = '<span style="font-size:0.7rem;font-weight:800;color:#991b1b;background:#ffe4e6;padding:0.15rem 0.5rem;border-radius:999px;">📍 Dossier Actuel</span>' if is_current else ''
        cards.append(f'''
                    <a href="{fname}" style="display:flex;flex-direction:column;justify-content:space-between;padding:0.95rem 1.1rem;background:{bg};border:{style_border};border-radius:12px;text-decoration:none;transition:all 0.2s;">
                        <div>
                            <div style="display:flex;align-items:center;justify-content:space-between;gap:0.4rem;margin-bottom:0.25rem;">
                                <span style="font-size:0.75rem;font-weight:800;color:#991b1b;">⚖️ Législation EPS Maroc</span>
                                {badge_now}
                            </div>
                            <strong style="display:block;font-size:0.88rem;color:#0f172a;line-height:1.35;margin-bottom:0.3rem;">{label_fr}</strong>
                        </div>
                        <span dir="rtl" style="font-size:0.82rem;font-weight:700;color:#006233;text-align:right;">{label_ar} ←</span>
                    </a>''')
    return f'''
            <div class="silo-legislation-nav" style="margin:2.5rem 0;padding:1.5rem;background:linear-gradient(135deg,#fff8f8 0%,#ffffff 55%,#f3faf6 100%);border:2px solid #cbd5e1;border-radius:16px;">
                <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.75rem;margin-bottom:1rem;">
                    <div>
                        <span style="font-size:0.75rem;font-weight:800;color:#991b1b;text-transform:uppercase;letter-spacing:0.05em;">🧭 Silo Complet · 10 Dossiers Juridiques &amp; Administratifs EPS Maroc</span>
                        <h3 style="margin:0.25rem 0 0;font-size:1.18rem;font-weight:900;color:#0f172a;">Tous les Guides de Législation Scolaire &amp; Textes Officiels EPS (جميع ملفات التشريع المدرسي والتربية البدنية)</h3>
                    </div>
                    <a href="blog.html" style="font-size:0.84rem;font-weight:800;color:#991b1b;text-decoration:underline;">Filtrer « Législation &amp; Textes Officiels » sur le Blog →</a>
                </div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(265px,1fr));gap:0.8rem;">
                    {"".join(cards)}
                </div>
            </div>
'''


def build_bilingual_legislation_article(
    filename,
    title,
    meta_desc,
    badge,
    h1_fr,
    h1_ar,
    ref_label,
    read_time,
    toc_items,
    body_html,
    faq_list,
    breadcrumb_name
):
    navbar_html, footer_html = extract_template_parts()
    navbar_custom = navbar_html.replace(
        'data-current-file="article-baremes-bac-sport-maroc-officiels-libres.html"',
        f'data-current-file="{filename}"'
    )

    canonical_url = f"https://profeps.ma/{filename}"

    tech_article_schema = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": title.replace(" | ProfEPS", ""),
        "description": meta_desc,
        "inLanguage": ["fr-MA", "ar-MA"],
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
        "datePublished": "2026-11-04",
        "dateModified": "2026-11-04",
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
            {"@type": "ListItem", "position": 2, "name": "Blog & Législation EPS Maroc", "item": "https://profeps.ma/blog.html"},
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

    cross_links_html = build_cross_links_silo(filename)

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
    <meta property="og:locale:alternate" content="ar_MA">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{title}">
    <meta name="twitter:description" content="{meta_desc}">
    <meta name="twitter:image" content="https://profeps.ma/images/prof_eps.png">
    <link rel="canonical" href="{canonical_url}">
    <link rel="alternate" hreflang="fr-MA" href="{canonical_url}">
    <link rel="alternate" hreflang="ar-MA" href="{canonical_url}">
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
            --font-sans: 'Inter', 'Cairo', 'Tajawal', -apple-system, BlinkMacSystemFont, sans-serif;
            --font-display: 'Plus Jakarta Sans', 'Cairo', var(--font-sans);
        }}
        body {{ font-family: var(--font-sans); background: var(--bg-secondary); color: var(--text-primary); line-height: 1.7; }}
        a {{ text-decoration: none; color: inherit; }}
        .section-badge {{ display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.45rem 1rem; background: #fff1f2; border: 1px solid #fecdd3; border-radius: var(--radius-full); font-size: 0.85rem; font-weight: 800; color: var(--primary); margin-bottom: 0.85rem; }}
        .article-hero {{ padding: 130px 1.5rem 2.5rem; background: linear-gradient(135deg, #fff8f8 0%, #f8fafc 52%, #f3faf6 100%); border-bottom: 1px solid var(--border-light); text-align: center; }}
        .article-title {{ font-family: var(--font-display); font-size: clamp(1.55rem, 3.4vw, 2.25rem); font-weight: 900; color: var(--text-primary); max-width: 980px; margin: 0 auto 0.65rem; line-height: 1.28; }}
        .article-title-ar {{ font-family: 'Cairo', 'Tajawal', sans-serif; font-size: clamp(1.3rem, 2.8vw, 1.85rem); font-weight: 800; color: #006233; max-width: 960px; margin: 0 auto 1.1rem; line-height: 1.45; }}
        .article-meta {{ display: flex; flex-wrap: wrap; justify-content: center; gap: 1.15rem; color: var(--text-secondary); font-size: 0.88rem; font-weight: 600; }}
        .article-container {{ max-width: 1000px; margin: 0 auto; padding: 2.25rem 1.5rem; }}
        .back-link {{ display: inline-flex; align-items: center; gap: 0.5rem; color: var(--primary); font-weight: 700; }}
        .back-link:hover {{ text-decoration: underline; }}
        .article-content {{ line-height: 1.8; color: var(--text-secondary); }}
        .article-content h2 {{ font-size: 1.4rem; font-weight: 900; color: var(--text-primary); margin-top: 2.5rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 3px solid var(--primary); }}
        .article-content h3 {{ font-size: 1.18rem; font-weight: 800; color: var(--primary); margin-top: 1.6rem; margin-bottom: 0.6rem; }}
        .article-content p {{ margin-bottom: 1rem; }}
        .article-content ul, .article-content ol {{ margin: 0.85rem 0 1.25rem; padding-left: 1.75rem; }}
        .article-content li {{ margin-bottom: 0.5rem; }}
        .info-box {{ background: #fff8f8; border: 1px solid #f5c2c7; border-left: 5px solid var(--primary); padding: 1.35rem 1.5rem; border-radius: var(--radius-lg); margin: 1.4rem 0; }}
        .success-box {{ background: #f3faf6; border: 1px solid #a7d7c5; border-left: 5px solid var(--secondary); padding: 1.35rem 1.5rem; border-radius: var(--radius-lg); margin: 1.4rem 0; }}
        .arabic-law-box {{ background: #ffffff; border: 2px solid #006233; border-right: 6px solid #006233; padding: 1.4rem 1.6rem; border-radius: var(--radius-lg); margin: 1.5rem 0; direction: rtl; text-align: right; font-family: 'Cairo', 'Tajawal', sans-serif; line-height: 1.9; color: #0f172a; box-shadow: var(--shadow-sm); }}
        .arabic-law-box h3 {{ color: #006233 !important; margin-top: 0 !important; font-size: 1.22rem !important; }}
        .arabic-law-box ul, .arabic-law-box ol {{ padding-right: 1.5rem; padding-left: 0; }}
        .step-card {{ background: var(--bg-primary); border-radius: var(--radius-lg); padding: 1.35rem 1.5rem; margin: 1.2rem 0; border: 1px solid var(--border); box-shadow: var(--shadow-sm); }}
        .table-container {{ overflow-x: auto; margin: 1.4rem 0; }}
        .table-container table {{ width: 100%; border-collapse: collapse; background: #ffffff; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm); border: 1px solid var(--border); }}
        .table-container th {{ background: #f1f5f9; color: #0f172a; padding: 0.85rem 1rem; text-align: left; font-size: 0.88rem; font-weight: 800; border-bottom: 2px solid var(--border); }}
        .table-container td {{ padding: 0.85rem 1rem; border-bottom: 1px solid var(--border-light); font-size: 0.88rem; color: #1e293b; vertical-align: top; }}
        .table-container tr:nth-child(even) td {{ background: #f8fafc; }}
        .faq-item {{ background: var(--bg-primary); border-radius: var(--radius-lg); padding: 1.35rem 1.5rem; margin: 1rem 0; border: 1px solid var(--border); box-shadow: var(--shadow-sm); }}
        .toc-nav {{ background: #ffffff; border: 1px solid var(--border); border-radius: 16px; padding: 1.25rem 1.5rem; margin: 1.25rem 0 2rem; box-shadow: var(--shadow-sm); }}
        .toc-nav h3 {{ margin: 0 0 0.75rem 0 !important; font-size: 1rem !important; color: #0f172a !important; }}
        .toc-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.5rem; }}
        .toc-grid a {{ display: block; padding: 0.5rem 0.75rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 0.84rem; font-weight: 700; color: #1e293b; transition: all 0.2s; }}
        .toc-grid a:hover {{ border-color: var(--primary); color: var(--primary); background: #fff8f8; }}

        /* Pack PDF Box */
        .pdf-pack-box {{ background: linear-gradient(135deg, #fff1f2 0%, #ffffff 50%, #f0fdf4 100%); border: 2px solid #991b1b; border-radius: 16px; padding: 1.5rem; margin: 1.75rem 0; box-shadow: var(--shadow-md); }}
        .pdf-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.85rem; }}
        .pdf-card {{ display: flex; flex-direction: column; justify-content: space-between; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 12px; padding: 1rem; transition: all 0.2s; }}
        .pdf-card:hover {{ border-color: #991b1b; transform: translateY(-2px); box-shadow: 0 6px 16px rgba(153,27,27,0.12); }}
        .pdf-card-top {{ display: flex; align-items: center; justify-content: space-between; gap: 0.4rem; margin-bottom: 0.5rem; }}
        .pdf-badge {{ font-size: 0.72rem; font-weight: 800; color: #991b1b; background: #fef2f2; padding: 0.2rem 0.55rem; border-radius: 6px; }}
        .pdf-dl-tag {{ font-size: 0.72rem; font-weight: 800; color: #006233; background: #dcfce7; padding: 0.2rem 0.55rem; border-radius: 6px; }}
        .pdf-title-ar {{ display: block; font-size: 0.94rem; color: #0f172a; margin-bottom: 0.35rem; line-height: 1.4; }}
        .pdf-desc-fr {{ font-size: 0.78rem; color: #475569; line-height: 1.45; }}

        /* Administrative Templates FR & AR */
        .admin-templates-wrapper {{ background: #f8fafc; border: 2px solid #0f172a; border-radius: 18px; padding: 1.6rem; margin: 2.25rem 0; box-shadow: var(--shadow-md); }}
        .admin-templates-header {{ margin-bottom: 1.25rem; padding-bottom: 0.85rem; border-bottom: 2px dashed #cbd5e1; }}
        .template-pill {{ display: inline-block; background: #0f172a; color: #ffffff; font-size: 0.74rem; font-weight: 800; padding: 0.25rem 0.75rem; border-radius: 999px; }}
        .template-card {{ background: #ffffff; border: 1px solid #94a3b8; border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-sm); }}
        .template-toolbar {{ display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.75rem; padding: 0.75rem 1.1rem; background: #f1f5f9; border-bottom: 1px solid #cbd5e1; }}
        .template-lang-badge {{ font-size: 0.82rem; font-weight: 800; padding: 0.25rem 0.7rem; border-radius: 6px; }}
        .ar-badge {{ background: #dcfce7; color: #006233; }}
        .fr-badge {{ background: #fee2e2; color: #991b1b; }}
        .template-actions {{ display: flex; flex-wrap: wrap; gap: 0.5rem; }}
        .btn-copy-tpl {{ cursor: pointer; padding: 0.45rem 0.9rem; background: #991b1b; color: #ffffff; border: none; border-radius: 8px; font-size: 0.8rem; font-weight: 800; transition: all 0.2s; }}
        .btn-copy-tpl:hover {{ background: #7f1d1d; }}
        .btn-print-tpl {{ cursor: pointer; padding: 0.45rem 0.9rem; background: #006233; color: #ffffff; border: none; border-radius: 8px; font-size: 0.8rem; font-weight: 800; transition: all 0.2s; }}
        .btn-print-tpl:hover {{ background: #064e3b; }}
        .template-pre-ar {{ white-space: pre-wrap; word-wrap: break-word; padding: 1.5rem; font-family: 'Cairo', 'Tajawal', 'Amiri', serif; font-size: 0.98rem; line-height: 1.95; color: #0f172a; background: #ffffff; direction: rtl; text-align: right; }}
        .template-pre-fr {{ white-space: pre-wrap; word-wrap: break-word; padding: 1.5rem; font-family: 'Times New Roman', Georgia, serif; font-size: 0.96rem; line-height: 1.75; color: #0f172a; background: #ffffff; direction: ltr; text-align: left; }}

        @media print {{
            body * {{ visibility: hidden; }}
            .AdminPrintActive, .AdminPrintActive * {{ visibility: visible; }}
            .AdminPrintActive {{ position: absolute; left: 0; top: 0; width: 100%; border: none !important; box-shadow: none !important; padding: 15mm !important; font-size: 12pt !important; }}
        }}
    </style>
</head>
<body>
{navbar_custom}

    <section class="article-hero">
        <span class="section-badge">{badge}</span>
        <h1 class="article-title">{h1_fr}</h1>
        <p class="article-title-ar" dir="rtl">{h1_ar}</p>
        <div class="article-meta">
            <span>⚖️ Référentiel : {ref_label}</span>
            <span>📅 Mis à jour le 4 Novembre 2026</span>
            <span>⏱️ {read_time}</span>
            <span>✍️ Par <a href="a-propos.html" style="text-decoration:underline;color:#991b1b;">Abdelkhalek ELBOUDANI</a></span>
        </div>
    </section>

    <article class="article-container">
        <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;margin-bottom:1.5rem;">
            <a href="blog.html" class="back-link" style="margin:0;">← Retour au Blog (Filtre : Législation &amp; Textes Officiels)</a>
            <div style="display:flex;flex-wrap:wrap;gap:0.6rem;">
                <a href="#modeles-administratifs" style="padding:0.45rem 0.9rem;background:#006233;color:#ffffff;border-radius:8px;font-size:0.82rem;font-weight:800;">📄 Modèles FR &amp; AR à Copier/Imprimer</a>
                <a href="#telecharger-pdfs-officiels" style="padding:0.45rem 0.9rem;background:#ffffff;border:1px solid #991b1b;border-radius:8px;font-size:0.82rem;font-weight:800;color:#991b1b;">📥 4 PDF Législation Maroc</a>
                <a href="generateur.html" style="padding:0.45rem 0.9rem;background:#991b1b;color:#ffffff;border-radius:8px;font-size:0.82rem;font-weight:800;">⚡ Générateur EPS Gratuit</a>
            </div>
        </div>

        <div class="article-content">
            <nav class="toc-nav" aria-label="Sommaire de l'article">
                <h3>🧭 Sommaire du Dossier Juridique &amp; Administratif (فهرس الملف التشريعي والنماذج الإدارية)</h3>
                <div class="toc-grid">
{toc_links_html}
                </div>
            </nav>

{body_html}

            <h2 id="faq-officielle">Questions Fréquentes — Législation EPS &amp; Concours CRMEF / CAPEP (أسئلة شائعة في التشريع المدرسي)</h2>
{faq_blocks_html}

{cross_links_html}
        </div>
    </article>

    <script>
      function copyAdminTemplate(elementId, btn) {{
        var el = document.getElementById(elementId);
        if (!el) return;
        var text = el.innerText || el.textContent;
        if (navigator.clipboard && navigator.clipboard.writeText) {{
          navigator.clipboard.writeText(text).then(function() {{
            var old = btn.innerHTML;
            btn.innerHTML = "✅ تم النسخ بنجاح / Copié !";
            btn.style.background = "#006233";
            setTimeout(function() {{
              btn.innerHTML = old;
              btn.style.background = "#991b1b";
            }}, 2400);
          }});
        }} else {{
          var ta = document.createElement("textarea");
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
          var old = btn.innerHTML;
          btn.innerHTML = "✅ Copié !";
          setTimeout(function() {{ btn.innerHTML = old; }}, 2200);
        }}
      }}

      function printAdminTemplate(elementId) {{
        var el = document.getElementById(elementId);
        if (!el) return;
        var w = window.open("", "_blank", "width=900,height=750");
        if (!w) {{
          el.classList.add("AdminPrintActive");
          window.print();
          setTimeout(function() {{ el.classList.remove("AdminPrintActive"); }}, 1000);
          return;
        }}
        var isRtl = el.getAttribute("dir") === "rtl";
        w.document.write('<!DOCTYPE html><html dir="' + (isRtl ? 'rtl' : 'ltr') + '"><head><meta charset="UTF-8"><title>Impression Document Administratif EPS Maroc</title>');
        w.document.write('<style>@page {{ size: A4; margin: 18mm; }} body {{ font-family: ' + (isRtl ? '"Cairo","Amiri","Traditional Arabic",serif' : '"Times New Roman",Georgia,serif') + '; font-size: 12.5pt; line-height: 1.85; color: #000; direction: ' + (isRtl ? 'rtl' : 'ltr') + '; text-align: ' + (isRtl ? 'right' : 'left') + '; white-space: pre-wrap; }}</style></head><body>');
        w.document.write(el.innerHTML);
        w.document.write('</body></html>');
        w.document.close();
        w.focus();
        setTimeout(function() {{ w.print(); }}, 300);
      }}
    </script>

{footer_html}
'''


# ==============================================================================
# ARTICLE 1 : ACCIDENT SCOLAIRE & ACCIDENT DE SERVICE EN EPS (DAHIR 1942 & FADEEP)
# ==============================================================================
def create_article_1():
    filename = "accident-scolaire-eps-maroc-rapport-procedure.html"
    title = "Accident Scolaire en EPS au Maroc (الحوادث المدرسية وحوادث المصلحة) : Procédure, Délais & Modèle de Rapport (FR/AR) | ProfEPS"
    meta_desc = "Guide officiel de l'accident scolaire et de service en EPS au Maroc (Dahir 26 octobre 1942, Convention d'assurance MENPS, Module FADEEP p.25-27). Pièces du dossier (Imprimés 1, 2, 3), délais (48h / 10j) et modèles de rapport + croquis FR/AR."
    badge = "⚖️ Législation EPS Maroc · Dahir 26 Octobre 1942 &amp; FADEEP p. 25-27"
    h1_fr = "Accident Scolaire &amp; Accident de Service en Séance d'EPS au Maroc : Procédure Légale, Délais et Modèle de Rapport avec Croquis (FR/AR)"
    h1_ar = "الحوادث المدرسية وحوادث المصلحة في حصة التربية البدنية بالمغرب: المسطرة القانونية، الآجال ونموذج تقرير مفصل مع تصميم مكان الحادث"
    ref_label = "Dahir du 26 Octobre 1942 · Module FADEEP (p. 25-27) · Assurance Scolaire MENPS"
    read_time = "18 min de lecture (Bilingue FR/AR)"
    breadcrumb_name = "Accident Scolaire EPS Maroc & Rapport"

    toc_items = [
        ("definition-dahir-1942", "1. Définition juridique : Accident Scolaire vs Accident de Service (FADEEP p. 25-27)"),
        ("protocole-terrain-urgence", "2. Protocole d'urgence sur le terrain d'EPS (Les 5 réflexes vitaux)"),
        ("dossier-pieces-delais", "3. Constitution du dossier & Délais (Imprimés 1, 2, 3, 10 jours & 48h)"),
        ("resume-juridique-arabe", "4. الملخص القانوني الرسمي بالعربية (الحوادث المدرسية وحوادث المصلحة)"),
        ("modeles-administratifs", "5. Modèles de Rapport d'Accident + Croquis (تقرير حادثة مدرسية + تصميم FR/AR)"),
        ("telecharger-pdfs-officiels", "6. Télécharger les 4 Ouvrages Officiels de Législation PDF"),
        ("faq-officielle", "7. FAQ Accident Scolaire & Concours CRMEF / CAPEP")
    ]

    tpl_ar = """المملكة المغربية
وزارة التربية الوطنية والتعليم الأولي والرياضة
الأكاديمية الجهوية للتربية والتكوين لجهة: [اسم الجهة]
المديرية الإقليمية: [اسم المديرية]
المؤسسة التعليمية: [اسم الثانوية الإعدادية / التأهيلية]

تقرير مفصل حول حادثة مدرسية أثناء حصة التربية البدنية والرياضية
(مرفق بتصميم لمكان وقوع الحادثة وموقع المكلف بالحراسة طبقاً لمجزوءة التشريع المدرسي FADEEP ص 27)

من الأستاذ(ة): [الاسم الكامل للأستاذ(ة)]
رقم التأجير (PPR): [رقم التأجير] | الإطار: أستاذ(ة) التربية البدنية والرياضية
إلى السيد(ة) مدير(ة) المؤسسة المحترم(ة) — (تحت إشراف السلم الإداري)

الموضوع: التصريح بحادثة مدرسية تعرض لها التلميذ(ة) [الاسم الكامل للتلميذ(ة)].
المرجع: الظهير الشريف المؤرخ في 16 شوال 1361 (26 أكتوبر 1942) واتفاقية الضمان المدرسي والرياضي.

سلام تام بوجود مولانا الإمام،
وبعد، يشرفني أن أنهي إلى علمكم أنه بتاريخ [اليوم/الشهر/السنة]، على الساعة [الساعة والدقيقة]، وخلال حصة التربية البدنية والرياضية الخاصة بقسم [اسم القسم، مثلاً: الثانية بكالوريا علوم فيزيائية 2]، وفي إطار تدريس نشاط [اسم النشاط الرياضي، مثلاً: كرة اليد / الجري السريع / الجمباز] المبرمج رسمياً في دفتر النصوص، تعرض التلميذ(ة) المذكور(ة) أدناه لحادثة مدرسية عرضية:

1. معلومات حول التلميذ(ة) المصاب(ة):
- الاسم والنسب: [الاسم الكامل للتلميذ(ة)] | رقم مسار (Massar): [رقم مسار]
- تاريخ ومكان الازدياد: [تاريخ الازدياد] | القسم: [القسم]
- رقم وصل التأمين المدرسي والرياضي: [رقم الوصل] بتاريخ: [تاريخ الأداء]

2. ظروف وملابسات وقوع الحادثة بالتفصيل:
أثناء قيام التلميذ(ة) بـ [وصف دقيق للحركة الرياضية، مثلاً: الارتقاء للتصويب نحو المرمى / استقبال الكرة]، وبعد تأمين فضاء الممارسة وإجراء التسخينات القانونية وتوجيه التعليمات الأمنية القبلية، فقد التلميذ(ة) توازنه(ها) بشكل فجائي وعرضي إثر [سبب السقوط أو الاحتكاك العفوي دون خطأ عمدي]، مما أدى إلى سقوطه(ها) وإصابته(ها) على مستوى [تحديد موضع الإصابة الظاهرية، مثلاً: الكاحل الأيمن / المعصم الأيسر].
علماً أنني كنت متواجداً لحظة وقوع الحادث في الموقع المخصص للمراقبة البيداغوجية والأمنية المباشرة على بعد [عدد الأمتار، مثلاً: 4 أمتار] من مكان الحادث.

3. التلاميذ الشهود الحاضرون لحظة وقوع الحادثة:
- الشاهد الأول: [الاسم الكامل للتلميذ 1] — القسم: [القسم]
- الشاهد الثاني: [الاسم الكامل للتلميذ 2] — القسم: [القسم]

4. الإجراءات الفورية المتخذة:
- توقيف النشاط فوراً وتأمين باقي تلاميذ القسم في مكان آمن.
- عدم تحريك العضو المصاب وتفادي أي تدخل طبي غير مختص.
- إشعار الإدارة التربوية (السيد الحارس العام للخارجية والسيد المدير) فوراً على الساعة [الساعة].
- ربط الاتصال بعناصر الوقاية المدنية (الإسعاف) وبولي أمر التلميذ(ة) لنقله(ها) إلى المستشفى العمومي [اسم المستشفى].

5. تصميم (رسم تخطيطي) لمكان وقوع الحادث وموقع الأستاذ المكلف بالحراسة:
+-----------------------------------------------------------------------+
|                    ملعب التربية البدنية (فضاء الممارسة)                 |
|                                                                       |
|   [تجمع باقي التلاميذ]                  (X) مكان وقوع الحادثة للتلميذ   |
|                                         ^                             |
|                                         | مسافة الرؤية المباشرة (4m)   |
|                                         v                             |
|                                   [موقع تواجد أستاذ ت.ب.ر (الحراسة)]  |
|                                                                       |
|   [مدخل الملعب / مستودع الملابس]              [اتجاه الإدارة التربوية]  |
+-----------------------------------------------------------------------+

حرر بـ [المدينة]، في: [التاريخ]
توقيع أستاذ(ة) التربية البدنية والرياضية:                  خاتم وتوقيع السيد(ة) مدير(ة) المؤسسة:"""

    tpl_fr = """ROYAUME DU MAROC
MINISTÈRE DE L'ÉDUCATION NATIONALE, DU PRÉSCOLAIRE ET DES SPORTS
Académie Régionale d'Éducation et de Formation (AREF) : [Nom de l'AREF]
Direction Provinciale : [Nom de la Direction]
Établissement : [Nom du Collège / Lycée Qualifiant]

RAPPORT CIRCONSTANCIÉ D'ACCIDENT SCOLAIRE EN SÉANCE D'EPS
(Avec croquis des lieux et position du professeur — Réf. Dahir du 26 octobre 1942 & Module FADEEP p. 27)

De : M./Mme [Nom et Prénom du Professeur], Professeur d'EPS — PPR : [Numéro PPR]
À : Monsieur / Madame le(la) Directeur(trice) de l'établissement (Sous couvert de la voie hiérarchique)

Objet : Déclaration et rapport détaillé d'accident scolaire survenu à l'élève [Nom et Prénom de l'élève].

Monsieur / Madame le(la) Directeur(trice),
J'ai l'honneur de porter à votre connaissance qu'en date du [JJ/MM/AAAA] à [Heure précise], durant la séance officielle d'Éducation Physique et Sportive de la classe de [Classe, ex. 2ème Bac PC 2], inscrite à l'emploi du temps et au cahier de textes (Cycle d'APS : [Nom de l'APS, ex. Handball / Gymnastique / Course de vitesse]), l'élève désigné(e) ci-dessous a été victime d'un accident scolaire :

1. IDENTITÉ DE L'ÉLÈVE VICTIME :
- Nom et Prénom : [Nom complet] | Code Massar : [Code Massar]
- Date de naissance : [Date] | Classe : [Classe]
- Quittance d'Assurance Scolaire et Sportive n° : [Numéro] du [Date de paiement]

2. CIRCONSTANCES EXACTES DE L'ACCIDENT :
Après vérification préalable de la sécurité des installations sportives, réalisation de l'échauffement général et spécifique, et rappel des consignes de sécurité, l'élève exécutait [décrire la tâche motrice précise, ex. une réception après un saut en course]. De manière purement fortuite et accidentelle, l'élève a perdu l'équilibre et a chuté sur [indiquer la zone touchée : cheville droite / poignet gauche], sans aucune faute intentionnelle d'un tiers.
Au moment précis de l'incident, j'assurais la surveillance pédagogique et sécuritaire directe du groupe à une distance d'environ [X mètres, ex. 4 mètres] avec une visibilité totale sur l'atelier.

3. ÉLÈVES TÉMOINS DE L'ACCIDENT :
- Témoin 1 : [Nom et Prénom de l'élève témoin 1] (Classe : [Classe])
- Témoin 2 : [Nom et Prénom de l'élève témoin 2] (Classe : [Classe])

4. MESURES IMMÉDIATES PRISES SUR LE TERRAIN :
- Arrêt immédiat de l'exercice et mise en sécurité du reste de la classe.
- Maintien de l'élève au repos sans manipulation médicale imprudente du membre blessé.
- Alerte immédiate de l'administration (Surveillant Général et Direction) à [Heure].
- Appel de la Protection Civile et information immédiate du tuteur légal pour évacuation vers l'hôpital public [Nom de l'hôpital].

5. CROQUIS DES LIEUX (AVEC EMPLACEMENT DE L'ACCIDENT ET POSITION DU PROFESSEUR) :
+-----------------------------------------------------------------------+
|                TERRAIN D'EPS / PLATEAU SPORTIF DE L'ÉTABLISSEMENT     |
|                                                                       |
|   [Groupe d'élèves en sécurité]        (X) Lieu exact de l'accident   |
|                                         ^                             |
|                                         | Champ de vision direct (4m) |
|                                         v                             |
|                                   [Position du Professeur d'EPS]      |
|                                                                       |
|   [Vestiaires / Entrée Terrain]             [Direction Administration]|
+-----------------------------------------------------------------------+

Fait à [Ville], le [Date]
Signature du Professeur d'EPS :                         Cachet et Visa du Chef d'Établissement :"""

    body_html = f'''
            <div class="info-box">
                <p style="margin:0;"><strong>⚖️ Pourquoi ce dossier est vital pour chaque professeur d'EPS au Maroc :</strong> En Éducation Physique et Sportive, le risque corporel est inhérent à l'action motrice. Que vous soyez enseignant sur le terrain ou candidat aux examens professionnels (<strong>CRMEF, CAPEP / الكفاءة التربوية, Examen professionnel</strong>), la maîtrise absolue de la procédure du <strong>Dahir du 26 octobre 1942 (ظهير 26 أكتوبر 1942)</strong>, de la <strong>Convention d'Assurance Scolaire et Sportive (اتفاقية الضمان المدرسي والرياضي)</strong> et des exigences du <strong>Module officiel FADEEP (pages 25 à 27)</strong> vous protège contre toute mise en cause personnelle.</p>
            </div>

            <h2 id="definition-dahir-1942">1. Définition Juridique : Accident Scolaire vs Accident de Service (الحوادث المدرسية وحوادث المصلحة)</h2>
            <p>Conformément au <strong>Module officiel de Législation Scolaire FADEEP (مجزوءة التشريع المدرسي والتنظيم الإداري والتربوي، ص 25-27)</strong> et au <strong>Guide ministériel MENPS</strong>, la législation scolaire marocaine distingue strictement deux régimes juridiques :</p>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Critère Juridique (المعيار القانوني)</th>
                            <th>Accident Scolaire (الحادثة المدرسية - التلاميذ)</th>
                            <th>Accident de Service / Travail du Prof d'EPS (حادثة المصلحة / الشغل للموظف)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Base Légale (المرجع القانوني)</strong></td>
                            <td><strong>Dahir du 16 Chaoual 1361 (26 octobre 1942)</strong> relatif à la réparation des accidents scolaires + Convention d'Assurance Scolaire et Sportive (MENPS / Compagnie d'assurance).</td>
                            <td><strong>Dahir n° 1.58.008 du 24 février 1958</strong> (Statut Général de la Fonction Publique, Art. 45) &amp; législation sur les accidents de service des fonctionnaires.</td>
                        </tr>
                        <tr>
                            <td><strong>Personnes Couvertes (الفئة المستفيدة)</strong></td>
                            <td>Tout élève régulièrement inscrit dans un établissement public (Dahir 1942) + élèves couverts par l'assurance scolaire/sportive lors des cours d'EPS, compétitions ASS et trajets aller-retour.</td>
                            <td>Le professeur d'EPS (titulaire ou stagiaire) victime d'un accident pendant sa séance d'EPS, lors de l'encadrement de l'ASS/FRMSS ou sur le trajet domicile-établissement.</td>
                        </tr>
                        <tr>
                            <td><strong>Délai de Déclaration (أجل التصريح)</strong></td>
                            <td>Rapport du professeur immédiat (le jour même ou sous 24h) ; Certificat médical initial daté du jour de l'accident ou dans un <strong>délai maximal de 10 jours</strong> (FADEEP p. 27).</td>
                            <td>Déclaration obligatoire par le Chef d'établissement à la Direction Provinciale dans un <strong>délai maximal de 48 heures</strong> (hors dimanches et jours fériés — FADEEP p. 26).</td>
                        </tr>
                        <tr>
                            <td><strong>Garanties &amp; Indemnisation (التعويضات)</strong></td>
                            <td>Prise en charge des frais médicaux, pharmaceutiques, d'hospitalisation et rente/indemnité en cas d'Incapacité Permanente Partielle (IPP) ou décès.</td>
                            <td>Congé de maladie à <strong>plein traitement (100% du salaire)</strong> jusqu'à guérison ou consolidation + remboursement des frais médicaux + rente d'invalidité si IPP &ge; 25% (FADEEP p. 26).</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 id="protocole-terrain-urgence">2. Protocole d'Urgence sur le Terrain d'EPS : Les 5 Réflexes Légaux</h2>
            <p>Lorsqu'un élève se blesse pendant une séance d'EPS ou une rencontre ASS, la jurisprudence administrative marocaine évalue la diligence du professeur selon 5 critères stricts :</p>
            <ol>
                <li><strong>Arrêt immédiat de l'atelier et sécurisation du groupe classe :</strong> Ne jamais laisser le reste des élèves sans consigne ni surveillance. Regroupez la classe dans une zone calme.</li>
                <li><strong>Abstention de tout acte médical non qualifié :</strong> Le professeur d'EPS apporte les premiers secours de protection (mise au repos, couverture, immobilisation prudente) mais ne doit jamais tenter de réduire une fracture ou une luxation.</li>
                <li><strong>Alerte immédiate de l'Administration (Direction / Surveillant Général) :</strong> Envoyez deux élèves responsables (ou le délégué de classe) prévenir immédiatement le Surveillant Général (الحارس العام للخارجية) et le Directeur tout en restant auprès de l'élève blessé.</li>
                <li><strong>Évacuation par la Protection Civile (الوقاية المدنية) et appel des parents :</strong> Il est formellement déconseillé au professeur de transporter l'élève blessé dans sa voiture personnelle (risque d'aggravation médicale et d'absence de couverture d'assurance automobile professionnelle).</li>
                <li><strong>Rédaction immédiate du Rapport circonstancié avec Croquis (تقرير الحادثة مرفق بتصميم) :</strong> Rédigez et déposez votre rapport en plusieurs exemplaires contre décharge auprès du bureau du Directeur.</li>
            </ol>

            <h2 id="dossier-pieces-delais">3. Constitution Officielle du Dossier d'Accident Scolaire &amp; de Service (Module FADEEP p. 26-27)</h2>
            <div class="step-card">
                <h3 style="margin-top:0;">📁 A. Les Pièces Obligatoires du Dossier d'Accident Scolaire (وثائق ملف الحادثة المدرسية — FADEEP p. 27)</h3>
                <ul>
                    <li><strong>Le Rapport détaillé du professeur d'EPS (تقرير مفصل عن الحادث)</strong> comportant obligatoirement un <strong>croquis de l'établissement et du terrain (تصميم للمدرسة يتضمن مكان وقوع الحادث ومكان تواجد المكلف بالحراسة)</strong> indiquant l'emplacement exact de l'accident et la position du professeur chargé de la surveillance.</li>
                    <li><strong>L'Imprimé n° 1 de déclaration d'accident (المطبوع رقم 1 الخاص بالتصريح بالحادث)</strong> dûment rempli et signé par le Directeur de l'établissement (en triple exemplaire).</li>
                    <li><strong>Les dépositions écrites des élèves témoins (شهادات التلاميذ الشهود)</strong> présents au moment de l'accident.</li>
                    <li><strong>Le Certificat Médical Initial (الشهادة الطبية الأولية)</strong> délivré par un médecin du secteur public, daté du jour de l'accident ou au plus tard dans les <strong>10 jours suivant l'accident</strong>, décrivant la nature exacte de la blessure et la durée de l'incapacité temporaire.</li>
                    <li><strong>L'Imprimé n° 2 : Certificat de guérison / consolidation (المطبوع رقم 2: شهادة الشفاء)</strong> précisant soit la guérison sans séquelles (شفاء بدون عجز), soit le taux d'Incapacité Permanente Partielle (نسبة العجز الدائم IPP).</li>
                    <li><strong>L'Imprimé n° 3 (المطبوع رقم 3) :</strong> requis uniquement s'il s'agit d'un accident de trajet (حادثة خط السير بين البيت والمؤسسة) accompagné du PV de la Police ou de la Gendarmerie Royale.</li>
                    <li><strong>Pièces d'état civil :</strong> 2 extraits d'acte de naissance de l'élève + 2 copies légalisées de la CIN du père ou tuteur légal + copie du reçu d'assurance scolaire et sportive.</li>
                </ul>
            </div>

            <div class="step-card">
                <h3 style="margin-top:0;">🏥 B. Procédure Spécifique si le Professeur d'EPS est lui-même Victime d'un Accident de Service (حادثة مصلحة — FADEEP p. 26)</h3>
                <ul>
                    <li>Le Directeur de l'établissement doit transmettre la déclaration d'accident de service à la Direction Provinciale dans un délai maximal de <strong>48 heures</strong> (sans compter les dimanches et jours fériés).</li>
                    <li>Les certificats médicaux de suivi doivent être transmis dans un délai ne dépassant pas <strong>15 jours</strong>.</li>
                    <li>Après guérison ou consolidation, le dossier est soumis à la <strong>Commission Médicale Provinciale (اللجنة الطبية الإقليمية)</strong>. Si le taux d'IPP attribué au professeur est <strong>égal ou supérieur à 25% (&ge; 25%)</strong>, le dossier est transmis à la Division du Contentieux du Ministère et au Ministère des Finances pour l'octroi d'une rente viagère d'invalidité cumulable avec le salaire.</li>
                </ul>
            </div>

            <div class="arabic-law-box" id="resume-juridique-arabe" dir="rtl">
                <h3>🇲🇦 الملخص القانوني الرسمي بالعربية: مسطرة الحوادث المدرسية وحوادث المصلحة (FADEEP ص 25-27)</h3>
                <p>يخضع تدبير الحوادث المدرسية بالمؤسسات التعليمية العمومية لمقتضيات <strong>الظهير الشريف الصادر في 16 شوال 1361 (26 أكتوبر 1942)</strong> ولاتفاقية الضمان المدرسي والرياضي المبرمة بين وزارة التربية الوطنية وشركة التأمين:</p>
                <ul>
                    <li><strong>تعريف الحادثة المدرسية:</strong> هي كل إصابة جسدية تلحق التلميذ المسجل بانتظام بالمؤسسة بفعل غير إرادي ناتج عن سبب خارجي ومفاجئ أثناء تواجده في عهدة المؤسسة (خلال حصص التربية البدنية، الأنشطة الرياضية المدرسية ASS، أو الخرجات التربوية المرخصة) أو خلال خط السير للمؤمنين.</li>
                    <li><strong>الوثيقة الحاسمة لأستاذ التربية البدنية (ص 27 من مجزوءة FADEEP):</strong> يجب على الأستاذ تحرير <strong>تقرير مفصل عن الحادث مرفق بتصميم للمدرسة/الملعب يتضمن مكان وقوع الحادث ومكان تواجد المكلف بالحراسة</strong>، مع ذكر أسماء التلاميذ الشهود والتأكيد على احترام شروط السلامة والتسخينات.</li>
                    <li><strong>الأجل القانوني للشهادة الطبية الأولية:</strong> يجب أن تكون مؤرخة يوم وقوع الحادثة أو خلال <strong>عشرة (10) أيام على الأكثر</strong> من تاريخ الحادثة، ومرفقة بـ <strong>المطبوع رقم 1</strong> (التصريح بالحادث) ثم <strong>المطبوع رقم 2</strong> (شهادة الشفاء مع تحديد نسبة العجز إن وجد).</li>
                    <li><strong>حادثة المصلحة الخاصة بأستاذ التربية البدنية (ص 26):</strong> إذا أصيب الأستاذ نفسه أثناء الحصة أو التأطير الرياضي، يصرح المدير بالحادثة في أجل <strong>48 ساعة</strong> (غير شاملة لأيام الآحاد والعطل)، ويستفيد الأستاذ من رخصة مرض بكامل الأجرة (100%) إلى حين شفائه التام، وإذا بلغت نسبة العجز <strong>25% فما فوق</strong> يحال الملف على قسم المنازعات لتخصيص معاش زمانة.</li>
                </ul>
            </div>

            {build_dual_templates_html(
                "accident-scolaire",
                "Modèle Officiel n°1 : Rapport Circonstancié d'Accident Scolaire en EPS avec Croquis des Lieux",
                "النموذج الإداري رقم 1: تقرير مفصل حول حادثة مدرسية في التربية البدنية مرفق بتصميم مكان الحادث",
                tpl_ar,
                tpl_fr
            )}

            {get_official_pdf_download_box()}
'''

    faq_list = [
        (
            "Quel est le délai légal pour le certificat médical initial lors d'un accident scolaire en EPS au Maroc ?",
            "Conformément au Module officiel de Législation Scolaire FADEEP (page 27), le certificat médical initial (الشهادة الطبية الأولية) doit être daté du jour même de l'accident ou au plus tard dans un délai maximal de 10 jours suivant la date de l'accident."
        ),
        (
            "Pourquoi le croquis des lieux (تصميم مكان الحادث) est-il obligatoire dans le rapport du professeur d'EPS ?",
            "Le Module FADEEP (page 27) exige expressément un croquis indiquant l'emplacement exact de l'accident et la position du professeur chargé de la surveillance (تصميم للمدرسة يتضمن مكان وقوع الحادث ومكان تواجد المكلف بالحراسة). Ce croquis prouve l'absence de défaut de surveillance et permet la substitution de la responsabilité de l'État (Art. 85 bis du DOC)."
        ),
        (
            "ما هو الأجل القانوني للتصريح بحادثة مصلحة يتعرض لها أستاذ التربية البدنية أثناء الحصة؟",
            "حسب مجزوءة التشريع المدرسي (FADEEP ص 26)، يتعين على رئيس المؤسسة إرسال التصريح بحادثة المصلحة إلى المديرية الإقليمية في أجل أقصاه 48 ساعة (غير شاملة لأيام الآحاد والعطل الرسمية)، مع إرسال الشهادات الطبية في أجل لا يتعدى 15 يوماً."
        ),
        (
            "Le professeur d'EPS doit-il transporter l'élève blessé dans sa voiture personnelle ?",
            "Non. Sur le plan légal et sécuritaire, le transport d'un élève blessé doit être assuré par l'ambulance de la Protection Civile (الوقاية المدنية) ou les services d'urgence, après alerte immédiate du Directeur et des parents. Utiliser son véhicule personnel expose l'enseignant en cas d'aggravation médicale ou d'accident de la route."
        )
    ]

    html = build_bilingual_legislation_article(
        filename, title, meta_desc, badge, h1_fr, h1_ar, ref_label, read_time, toc_items, body_html, faq_list, breadcrumb_name
    )
    with open(os.path.join(PUBLIC_DIR, filename), "w", encoding="utf-8") as f:
        f.write(html)
    print(f"[ARTICLE 1 OK] {filename}")


# ==============================================================================
# ARTICLE 2 : RESPONSABILITÉ CIVILE, PÉNALE & ADMINISTRATIVE (ART. 85 BIS DOC)
# ==============================================================================
def create_article_2():
    filename = "responsabilite-civile-penale-professeur-eps-maroc.html"
    title = "Responsabilité Civile et Pénale du Professeur d'EPS au Maroc (الفصل 85 مكرر ق.ل.ع) : Substitution de l'État & Sécurité | ProfEPS"
    meta_desc = "Analyse juridique complète de la responsabilité civile (Art. 77, 78, 85 bis du DOC), pénale (Art. 224-232, 432-435 Code Pénal) et administrative du professeur d'EPS au Maroc (Guide MEN p.32-35). Fiche d'audit sécurité terrain FR/AR."
    badge = "⚖️ Législation EPS Maroc · Art. 85 bis DOC &amp; Code Pénal (Guide MEN p. 32-35)"
    h1_fr = "Responsabilité Civile, Pénale et Administrative du Professeur d'EPS au Maroc : Article 85 bis du DOC et Substitution de l'État"
    h1_ar = "المسؤولية المدنية والجنائية والإدارية لأستاذ التربية البدنية بالمغرب: الفصل 85 مكرر من قانون الالتزامات والعقود وحلول الدولة"
    ref_label = "Art. 77, 78 & 85 bis DOC · Art. 432-435 Code Pénal · Guide MENPS p. 32-35"
    read_time = "19 min de lecture (Bilingue FR/AR)"
    breadcrumb_name = "Responsabilité Civile & Pénale Prof EPS (Art. 85 bis)"

    toc_items = [
        ("trois-responsabilites", "1. Les 3 Responsabilités du Professeur d'EPS (Civile, Pénale, Administrative)"),
        ("article-85-bis-doc", "2. Texte intégral & Analyse de l'Article 85 bis du DOC (الفصل 85 مكرر ق.ل.ع)"),
        ("responsabilite-penale-articles", "3. Responsabilité Pénale : Art. 224-232, 432-435 & 459-478 du Code Pénal"),
        ("resume-juridique-arabe", "4. النص القانوني الكامل للفصل 85 مكرر وتحليل المسؤوليات الثلاث بالعربية"),
        ("modeles-administratifs", "5. Modèle Officiel : Signalement d'Installation Sportive Dangereuse (FR/AR)"),
        ("telecharger-pdfs-officiels", "6. Télécharger les 4 Ouvrages Officiels de Législation PDF"),
        ("faq-officielle", "7. FAQ Responsabilité du Prof d'EPS & Concours CRMEF")
    ]

    tpl_ar = """المملكة المغربية
وزارة التربية الوطنية والتعليم الأولي والرياضة
الأكاديمية الجهوية للتربية والتكوين لجهة: [اسم الجهة]
المديرية الإقليمية: [اسم المديرية]
المؤسسة التعليمية: [اسم المؤسسة]

إشعار كتابي وتقرير تقني حول خطر بفضاء وتجهيزات التربية البدنية والرياضية
(لإخلاء المسؤولية التقصيرية للأستاذ طبقاً للفصلين 78 و85 مكرر من قانون الالتزامات والعقود)

من الأستاذ(ة): [الاسم الكامل للأستاذ(ة)] — رقم التأجير (PPR): [رقم التأجير]
بصفته(ها): أستاذ(ة) ومنسق(ة) مادة التربية البدنية والرياضية بالمؤسسة
إلى السيد(ة) مدير(ة) المؤسسة المحترم(ة)

الموضوع: إشعار بحالة خطر في المنشآت/التجهيزات الرياضية وطلب التدخل العاجل للصيانة أو التوقيف المؤقت للاستغلال.
المرجع: المذكرات الوزارية الخاصة بالأمن والسلامة المدرسية والفصل 85 مكرر من ق.ل.ع.

سلام تام بوجود مولانا الإمام،
وبعد، في إطار المراقبة القبلية الدورية لفضاءات وتجهيزات مادة التربية البدنية والرياضية بالمؤسسة حرصاً على سلامة التلاميذ والأطر التربوية، يشرفني أن أحيطكم علماً كتابياً بوجود خلل تقني يشكل خطراً مباشراً على السلامة الجسدية للمتعلمين، وتتمثل معالمه فيما يلي:

1. تحديد المنشأة أو التجهيز الرياضي المعني بالخطر:
- الفضاء الرياضي: [مثلاً: ملعب كرة اليد رقم 1 / قاعة الجمباز / مضمار القفز الطولي]
- طبيعة العطب أو الخطر المسجل: [مثلاً: عدم تثبيت مرمى كرة اليد بالأرضية وتآكل قوائمه الحديدية / تشقق خطير في أرضية الملعب / تلف بساط الاستقبال].

2. الإجراءات الوقائية المتخذة فوراً من طرف أساتذة المادة:
- منع التلاميذ من الاقتراب من التجهيز المعطوب وتحييد المنطقة الخطرة فوراً.
- تكييف البرمجة البيداغوجية مؤقتاً وتعويض الورشة الخطرة بنشاط آمن، مع تدوين ذلك في دفتر النصوص.

3. الملتمس الإداري والتقني:
نلتمس من سيادتكم التفضل بإعطاء أوامركم للمصالح المختصة (السيد المقتصد / مصالح الصيانة) من أجل:
- تثبيت أو إصلاح أو إزالة التجهيز الرياضي المذكور بصفة مستعجلة قبل إعادة استغلاله.
- تسليمنا وصل استلام هذا الإشعار الكتابي حفظاً لسلامة التلاميذ وتوثيقاً للإجراءات الوقائية المتخذة.

وتفضلوا، السيد(ة) المدير(ة)، بقبول فائق التقدير والاحترام.

حرر بـ [المدينة]، في: [التاريخ]
توقيع أستاذ(ة) / منسق(ة) التربية البدنية:                 خاتم وتوقيع الإدارة (وصل بالاستلام):"""

    tpl_fr = """ROYAUME DU MAROC
MINISTÈRE DE L'ÉDUCATION NATIONALE, DU PRÉSCOLAIRE ET DES SPORTS
Académie Régionale d'Éducation et de Formation (AREF) : [Nom de l'AREF]
Direction Provinciale : [Nom de la Direction]
Établissement : [Nom du Collège / Lycée]

SIGNALEMENT ÉCRIT ET PROCÈS-VERBAL DE DANGER SUR INSTALLATION SPORTIVE D'EPS
(Acte de diligence préventive — Art. 78 et Art. 85 bis du Dahir des Obligations et Contrats)

De : M./Mme [Nom et Prénom], Professeur / Coordonnateur d'EPS — PPR : [Numéro PPR]
À : Monsieur / Madame le(la) Directeur(trice) de l'établissement

Objet : Signalement d'un risque sécuritaire grave sur équipement sportif et demande de mise hors service / réparation urgente.
Réf. : Directives ministérielles relatives à la sécurité scolaire et Article 85 bis du DOC.

Monsieur / Madame le(la) Directeur(trice),
Dans le cadre du contrôle préventif systématique des installations et du matériel d'Éducation Physique et Sportive visant à garantir l'intégrité physique des élèves, j'ai l'honneur de vous signaler par écrit la présence d'une anomalie matérielle présentant un danger imminent :

1. IDENTIFICATION DE L'INSTALLATION OU DE L'ÉQUIPEMENT DANGEREUX :
- Lieu exact : [Ex : Terrain de Handball n°1 / Fosse de saut en longueur / Salle couverte]
- Nature du danger constaté : [Ex : But métallique de Handball non scellé au sol présentant un risque de basculement / Revêtement dégradé et glissant / Tapis de réception détérioré].

2. MESURES CONSERVATOIRES PRISES IMMÉDIATEMENT PAR L'ÉQUIPE D'EPS :
- Interdiction immédiate d'accès et neutralisation du périmètre autour de l'équipement défectueux.
- Adaptation immédiate du cycle pédagogique et mention de cette mesure de sécurité dans le Cahier de Textes officiel.

3. DEMANDE D'INTERVENTION ADMINISTRATIVE ET MATÉRIELLE :
Je vous prie de bien vouloir instruire les services compétents (Intendance / Maintenance) afin de :
- Procéder au scellement, à la réparation ou au retrait immédiat de l'équipement concerné.
- Viser le double du présent signalement à titre d'accusé de réception administratif.

Veuillez agréer, Monsieur / Madame le(la) Directeur(trice), l'expression de ma considération distinguée.

Fait à [Ville], le [Date]
Signature du Professeur / Coordonnateur d'EPS :          Accusé de réception et Cachet de la Direction :"""

    body_html = f'''
            <div class="info-box">
                <p style="margin:0;"><strong>⚖️ Question n°1 aux concours CRMEF et examens d'aptitude professionnelle :</strong> Quelle est la différence entre la responsabilité civile, pénale et administrative du professeur d'EPS au Maroc ? Quand la responsabilité de l'État se substitue-t-elle à celle de l'enseignant selon l'<strong>Article 85 bis du Dahir des Obligations et Contrats (الفصل 85 مكرر من قانون الالتزامات والعقود)</strong> ? Ce dossier cite textuellement le <strong>Guide officiel du Ministère (التشريع المدرسي وأخلاقيات المهنة، ص 32-35)</strong>.</p>
            </div>

            <h2 id="trois-responsabilites">1. Synthèse Comparative des 3 Responsabilités du Professeur d'EPS (Guide MENPS p. 32-35)</h2>
            <p>Dans l'exercice de ses fonctions, le professeur d'Éducation Physique et Sportive est soumis à trois ordres de responsabilité indépendants les uns des autres :</p>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Type de Responsabilité</th>
                            <th>Textes de Loi Marocains</th>
                            <th>Nature de la Faute &amp; Conséquence</th>
                            <th>Substitution de l'État ?</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>1. Responsabilité Civile (المسؤولية المدنية)</strong></td>
                            <td><strong>Articles 77, 78, 79, 80 et 85 bis du DOC</strong> (Dahir des Obligations et Contrats — قانون الالتزامات والعقود).</td>
                            <td>Faute de surveillance, imprudence ou négligence causant un dommage à un élève. Sanction : réparation pécuniaire (التعويض المالي).</td>
                            <td><strong>OUI (Art. 85 bis DOC) :</strong> L'État se substitue au professeur devant le Tribunal civil, sauf action récursoire en cas de faute lourde inexcusable.</td>
                        </tr>
                        <tr>
                            <td><strong>2. Responsabilité Pénale (المسؤولية الجنائية)</strong></td>
                            <td><strong>Code Pénal Marocain :</strong> Art. 224-232 (abus d'autorité), <strong>Art. 432-435</strong> (homicide ou blessures involontaires), Art. 459-478 (mise en danger d'enfant).</td>
                            <td>Infraction pénale (violence, châtiment corporel, négligence criminelle). Sanction personnelle : amende et/ou peine privative de liberté.</td>
                            <td><strong>NON :</strong> La responsabilité pénale est strictement personnelle (شخصية العقوبة). L'État ne remplace jamais le fonctionnaire au pénal.</td>
                        </tr>
                        <tr>
                            <td><strong>3. Responsabilité Administrative / Disciplinaire (المسؤولية الإدارية)</strong></td>
                            <td><strong>Dahir n° 1.58.008 du 24 février 1958</strong> (Art. 17 et Art. 65 à 75 — Statut Général de la Fonction Publique).</td>
                            <td>Manquement aux obligations professionnelles (retards, absences, refus d'exécuter les instructions, non-tenue des documents).</td>
                            <td><strong>Sanctions administratives :</strong> Avertissement, blâme, radiation du tableau d'avancement, exclusion temporaire ou révocation après Conseil de discipline.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 id="article-85-bis-doc">2. L'Article 85 bis du DOC (الفصل 85 مكرر من قانون الالتزامات والعقود) : Le Bouclier Juridique du Professeur d'EPS</h2>
            <p>Le <strong>Guide ministériel de Législation Scolaire (pages 33 à 35)</strong> rappelle les fondements de la responsabilité civile délictuelle et quasi-délictuelle :</p>
            <ul>
                <li><strong>Article 77 du DOC (الفصل 77) :</strong> Tout fait quelconque de l'homme qui, sans l'autorité de la loi, cause sciemment et volontairement à autrui un dommage matériel ou moral, oblige son auteur à réparer ledit dommage (responsabilité délictuelle / التقصيرية العمدية).</li>
                <li><strong>Article 78 du DOC (الفصل 78) :</strong> Chacun est responsable du dommage moral ou matériel qu'il a causé, non seulement par son fait, mais par sa faute, lorsqu'il est établi que cette faute en est la cause directe. La faute consiste soit à omettre ce qu'on était tenu de faire, soit à faire ce dont on était tenu de s'abstenir, sans intention de causer un dommage.</li>
                <li><strong>Article 85 bis du DOC (الفصل 85 مكرر — ajouté par le Dahir du 4 mai 1942) :</strong> Contrairement au droit commun des artisans et parents, <strong>la présomption de faute est écartée pour les enseignants et les fonctionnaires de la jeunesse et des sports</strong>. La faute d'imprudence ou de défaut de surveillance doit être <strong>prouvée par le demandeur</strong> selon le droit commun.</li>
            </ul>

            <div class="success-box">
                <h3 style="margin-top:0;color:#006233;">🛡️ Les 4 Garanties Majeures de l'Article 85 bis du DOC pour l'Enseignant d'EPS (Guide MEN p. 34-35)</h3>
                <ol style="margin-bottom:0;">
                    <li><strong>Pas de présomption automatique de culpabilité :</strong> C'est au plaignant de prouver devant le juge qu'il y a eu un défaut caractérisé de surveillance ou une imprudence de la part du professeur d'EPS.</li>
                    <li><strong>Substitution obligatoire de la responsabilité de l'État (حلول مسؤولية الدولة محل الموظف) :</strong> Dans tous les cas où la responsabilité du professeur est engagée à la suite d'un fait dommageable commis par les élèves ou subi par eux pendant qu'ils sont sous sa surveillance, <strong>la responsabilité de l'État est substituée à celle de l'enseignant, qui ne peut jamais être mis en cause directement devant le tribunal civil par la victime ou ses parents</strong>.</li>
                    <li><strong>Action intentée contre l'État :</strong> L'action en responsabilité est portée devant le Tribunal de Première Instance du lieu où le dommage a été causé, à l'encontre de l'État (Chef du Gouvernement / Ministre de l'Éducation Nationale / Agent Judiciaire du Royaume).</li>
                    <li><strong>Prescription abrégée de 3 ans (تقادم الدعوى في 3 سنوات) :</strong> L'action en réparation se prescrit par <strong>trois (3) années</strong> à compter du jour où le fait dommageable a été commis.</li>
                </ol>
            </div>
            <p><strong>Attention à l'Action Récursoire de l'État (دعوى الاسترداد) :</strong> Si l'État indemnise la victime mais qu'il est prouvé que le professeur d'EPS a commis une <strong>faute personnelle détachable du service ou une négligence grave inexcusable</strong> (ex. quitter le terrain d'EPS pendant la séance en laissant les élèves seuls, utiliser un but non fixé déjà signalé comme dangereux sans l'interdire), l'État peut exercer une action récursoire contre le professeur pour récupérer les sommes versées. Par ailleurs, l'adhésion à <strong>التضامن الجامعي المغربي (Solidarité Universitaire Marocaine)</strong> offre une assistance juridique et une défense par avocat aux enseignants poursuivis dans l'exercice de leurs fonctions (Guide MEN p. 34).</p>

            <h2 id="responsabilite-penale-articles">3. La Responsabilité Pénale du Professeur d'EPS (المسؤولية الجنائية — Guide MEN p. 32-33)</h2>
            <p>Le Guide officiel du Ministère (pages 32-33) détaille les articles précis du <strong>Code Pénal Marocain (القانون الجنائي المغربي)</strong> applicables aux fonctionnaires de l'enseignement :</p>
            <ul>
                <li><strong>Articles 224 à 232 du Code Pénal :</strong> Abus d'autorité commis par des fonctionnaires publics contre les particuliers (الشطط في استعمال السلطة).</li>
                <li><strong>Articles 432 à 435 du Code Pénal :</strong> Homicide involontaire et blessures involontaires (القتل أو الجرح غير العمدي) causés par maladresse, imprudence, inattention, négligence ou inobservation des règlements. C'est l'article invoqué si un équipement sportif mal sécurisé (ex. cage de handball non scellée) bascule sur un élève alors que la sécurité élémentaire n'a pas été vérifiée.</li>
                <li><strong>Articles 459 à 478 du Code Pénal :</strong> Exposition et délaissement d'enfants ou d'incapables (تعريض الأطفال للعجز أو الخطر).</li>
                <li><strong>Interdiction absolue des châtiments corporels et violences verbales :</strong> Toute violence physique ou humiliation envers un élève constitue une faute pénale personnelle ET une faute disciplinaire grave. En outre, selon la règle juridique marocaine <em>« الجنائي يعقل المدني » (Le criminel tient le civil en l'état)</em>, l'ouverture de poursuites pénales suspend le jugement civil et disciplinaire jusqu'à la décision définitive du juge pénal (Guide MEN p. 35).</li>
            </ul>

            <div class="arabic-law-box" id="resume-juridique-arabe" dir="rtl">
                <h3>🇲🇦 النص القانوني الرسمي للفصل 85 مكرر من قانون الالتزامات والعقود (دليل التشريع المدرسي ص 34)</h3>
                <p>ينص <strong>الفصل 85 مكرر من قانون الالتزامات والعقود (ظهير 4 ماي 1942)</strong> حرفياً على ما يلي:</p>
                <blockquote>« يسأل المعلمون وموظفو الشبيبة والرياضة عن الضرر الحاصل من الأطفال والشبان خلال الوقت الذي يوجدون فيه تحت رقابتهم. والخطأ أو عدم الحيطة أو الإهمال الذي يحتج به عليهم، باعتباره السبب في حصول الفعل الضار، يلزم المدعي إثباته وفقاً للقواعد القانونية العامة. وفي جميع الحالات التي تقوم فيها مسؤولية رجال التعليم العام وموظفي إدارة الشبيبة نتيجة ارتكاب فعل ضار أو بمناسبته إما من طرف الأطفال أو الشبان الذين عهد بهم إليهم بسبب وظائفهم وإما ضدهم في نفس الأحوال، <strong>تحل مسؤولية الدولة محل مسؤولية الموظفين السابقين، الذين لا تجوز مقاضاتهم أبداً أمام المحاكم المدنية من المتضرر أو من ممثله</strong>. ويطبق هذا الحكم في كل حالة يعهد فيها بالأطفال أو الشبان إلى الموظفين السابقين قصد التهذيب الخلقي أو الجسدي الذي لا يخالف الضوابط، ويوجدون بذلك تحت رقابتهم... وتتقادم دعوى المسؤولية بمضي <strong>ثلاث سنوات</strong> تبدأ من يوم ارتكاب الفعل الضار. »</blockquote>
                <ul>
                    <li><strong>قاعدة استقلال المسؤوليات الثلاث (ص 35):</strong> المسؤولية الجنائية والإدارية والمدنية مستقلة عن بعضها، غير أن <strong>« الجنائي يعقل المدني والإداري »</strong>، أي أن الإدارة والمحكمة المدنية توقفان البت إلى حين صدور حكم جنائي نهائي حائز لقوة الشيء المقضي به.</li>
                    <li><strong>حماية أستاذ التربية البدنية ميدانياً:</strong> لإثبات الحيطة والحذر (غياب الإهمال)، يجب على أستاذ ومنسق التربية البدنية فحص الملاعب والمرامي والتجهيزات في بداية الموسم، وإرسال <strong>إشعار كتابي رسمي لمدير المؤسسة</strong> حول أي تجهيز يشكل خطراً (مع الاحتفاظ بنسخة مؤشر عليها).</li>
                </ul>
            </div>

            {build_dual_templates_html(
                "signalement-securite",
                "Modèle Officiel n°2 : Signalement Écrit d'Installation Sportive Dangereuse (Décharge de Responsabilité)",
                "النموذج الإداري رقم 2: إشعار كتابي وتقرير تقني حول خطر بالمنشآت أو التجهيزات الرياضية (إخلاء المسؤولية)",
                tpl_ar,
                tpl_fr
            )}

            {get_official_pdf_download_box()}
'''

    faq_list = [
        (
            "Un parent d'élève peut-il poursuivre directement le professeur d'EPS devant le tribunal civil suite à un accident scolaire ?",
            "Non. En vertu de l'Article 85 bis du Dahir des Obligations et Contrats (الفصل 85 مكرر من ق.ل.ع), la responsabilité de l'État se substitue de plein droit à celle de l'enseignant du secteur public, qui ne peut jamais être poursuivi directement devant les juridictions civiles par la victime ou son représentant légal."
        ),
        (
            "Quel est le délai de prescription de l'action en responsabilité civile selon l'Article 85 bis du DOC ?",
            "L'action en responsabilité fondée sur l'Article 85 bis du DOC se prescrit par trois (3) ans à compter du jour où le fait dommageable a été commis."
        ),
        (
            "متى تسقط حماية الدولة عن أستاذ التربية البدنية أو تمارس ضده دعوى الاسترداد؟",
            "لا تحل الدولة محل الأستاذ في القضايا الجنائية (مثل الضرب أو الجرح أو القتل غير العمدي الناتج عن إهمال جسيم طبقا للفصول 432-435 من القانون الجنائي). كما يحق للدولة بعد أداء التعويض المدني للمتضرر أن ترفع 'دعوى الاسترداد' ضد الأستاذ إذا ثبت ارتكابه لخطأ شخصي جسيم منفصل عن المصلحة (مثل مغادرة الملعب وترك التلاميذ بدون حراسة)."
        ),
        (
            "Comment le professeur d'EPS se protège-t-il si un équipement sportif du lycée (ex: but de handball non fixé) est dangereux ?",
            "Il doit immédiatement interdire l'accès à l'équipement, neutraliser la zone, adapter sa séance dans le cahier de textes, et déposer un signalement écrit officiel auprès du Directeur de l'établissement contre accusé de réception (voir notre modèle FR/AR ci-dessus)."
        )
    ]

    html = build_bilingual_legislation_article(
        filename, title, meta_desc, badge, h1_fr, h1_ar, ref_label, read_time, toc_items, body_html, faq_list, breadcrumb_name
    )
    with open(os.path.join(PUBLIC_DIR, filename), "w", encoding="utf-8") as f:
        f.write(html)
    print(f"[ARTICLE 2 OK] {filename}")


# ==============================================================================
# ARTICLE 3 : DÉPLACEMENTS SPORT SCOLAIRE ASS, FRMSS, LOI 30-09 & DÉCRET 2.10.628
# ==============================================================================
def create_article_3():
    filename = "deplacement-sport-scolaire-ass-frmss-ordre-mission-eps.html"
    title = "Déplacements Sport Scolaire ASS & FRMSS au Maroc : Loi 30-09, Décret 2.10.628 & Ordre de Mission EPS | ProfEPS"
    meta_desc = "Guide juridique officiel du Sport Scolaire au Maroc (Association Sportive Scolaire ASS, FRMSS, Loi 30-09 & Décret 2.10.628 BO 5997). Articles 3, 10 (délai 15 jours), 11, 17 + Modèles d'Ordre de Mission et Autorisation Parentale (FR/AR)."
    badge = "⚖️ Législation Sport Scolaire · Loi 30-09 &amp; Décret 2.10.628 (BO n° 5997)"
    h1_fr = "Déplacements Sport Scolaire (ASS &amp; FRMSS) au Maroc : Loi 30-09, Décret 2.10.628, Ordre de Mission et Autorisation Parentale"
    h1_ar = "تنقلات الجمعية الرياضية المدرسية (ASS) والجامعة الملكية (FRMSS): القانون 30.09، المرسوم 2.10.628، الأمر بمهمة والترخيص الأبوي"
    ref_label = "Loi n° 30-09 · Décret n° 2.10.628 (BO 5997 du 21/11/2011) · Statuts ASS & FRMSS"
    read_time = "18 min de lecture (Bilingue FR/AR)"
    breadcrumb_name = "Déplacements ASS & FRMSS (Loi 30-09 & Décret 2.10.628)"

    toc_items = [
        ("loi-30-09-decret-2-10-628", "1. Analyse de la Loi 30-09 et du Décret d'application n° 2.10.628 (BO n° 5997)"),
        ("organisation-bureau-ass", "2. Organisation juridique et financière de l'Association Sportive Scolaire (ASS)"),
        ("procedure-deplacement-tournoi", "3. Les 6 pièces obligatoires avant tout déplacement à un tournoi ASS / FRMSS"),
        ("resume-juridique-arabe", "4. مقتضيات المرسوم رقم 2.10.628 والقانون 30.09 المتعلق بالرياضة المدرسية بالعربية"),
        ("modeles-administratifs", "5. Modèles Officiels : Ordre de Mission ASS + Autorisation Parentale (FR/AR)"),
        ("telecharger-pdfs-officiels", "6. Télécharger le Décret 2.10.628 (BO 5997) & les 4 PDF Officiels"),
        ("faq-officielle", "7. FAQ Sport Scolaire ASS / FRMSS & Concours CRMEF")
    ]

    tpl_ar = """المملكة المغربية
وزارة التربية الوطنية والتعليم الأولي والرياضة
الجامعة الملكية المغربية للرياضة المدرسية (FRMSS)
الفرع الإقليمي بمديرية: [اسم المديرية]
الجمعية الرياضية المدرسية لمؤسسة: [اسم المؤسسة]

[الوثيقة 1]: أمر بمهمة لتأطير ومرافقة فرق المؤسسة في منافسات الرياضة المدرسية (ASS)
================================================================================
يشهد السيد(ة) مدير(ة) المؤسسة ورئيس(ة) الجمعية الرياضية المدرسية بـ [اسم المؤسسة]، بتكليف:
- السيد(ة): [الاسم الكامل لأستاذ(ة) التربية البدنية والرياضية]
- رقم التأجير (PPR): [رقم التأجير] | الإطار: أستاذ(ة) التربية البدنية والرياضية
- المهمة: تأطير ومرافقة تلاميذ وتلميذات المؤسسة المشاركين في البطولة المدرسية لـ [طبيعة المنافسة: العدو الريفي / كرة اليد / ألعاب القوى] (صنف: [الفئة العمرية]).
- مكان إجراء المنافسة: [المدينة / الملعب أو القاعة الرياضية]
- تاريخ التنقل: يوم [التاريخ] من الساعة [ساعة الانطلاق] إلى غاية الساعة [ساعة العودة].
- وسيلة النقل المعتمدة: [نقل مدرسي / حافلة مرخصة / وسيلة نقل عمومية].

توقيع الأستاذ(ة) المؤطر(ة):                            خاتم وتوقيع رئيس(ة) المؤسسة / رئيس(ة) الجمعية (ASS):

--------------------------------------------------------------------------------
[الوثيقة 2]: ترخيص أبوي للمشاركة في منافسات الجمعية الرياضية المدرسية (ASS / FRMSS)
================================================================================
أنا الموقع(ة) أسفله:
- الاسم الكامل لولي الأمر (الأب / الأم / الوصي الشرعي): [الاسم الكامل للولي]
- رقم البطاقة الوطنية للتعريف الإلكترونية (CIN): [رقم البطاقة] | الهاتف: [رقم الهاتف]
- بصفتي ولي أمر التلميذ(ة): [الاسم الكامل للتلميذ(ة)] | رقم مسار: [رقم مسار]
- المسجل(ة) بقسم: [القسم] بمؤسسة: [اسم المؤسسة]
- رقم وصل التأمين المدرسي والرياضي: [رقم الوصل]

أشهد وأصرح بموافقتي التامة على مشاركة ابني/ابنتي في التداريب والمنافسات الرياضية الرسمية المنظمة في إطار الجمعية الرياضية المدرسية (ASS) والجامعة الملكية المغربية للرياضة المدرسية (FRMSS) برسم الموسم الدراسي [الموسم الدراسي]، وبمرافقته(ها) للوفد الرياضي للمؤسسة يوم [التاريخ] إلى [مكان المنافسة] تحت إشراف أساتذة التربية البدنية والرياضية بالمؤسسة. كما أصرح بأن ابني/ابنتي لا يعاني من أي مانع صحي يحول دون ممارسة التنافس الرياضي.

حرر بـ [المدينة]، في: [التاريخ]
إمضاء ولي الأمر (مصادق عليه أو مرفق بنسخة من بطاقة التعريف الوطنية):"""

    tpl_fr = """ROYAUME DU MAROC
MINISTÈRE DE L'ÉDUCATION NATIONALE, DU PRÉSCOLAIRE ET DES SPORTS
Fédération Royale Marocaine du Sport Scolaire (FRMSS)
Association Sportive Scolaire (ASS) de l'Établissement : [Nom du Collège / Lycée]

[DOCUMENT 1] : ORDRE DE MISSION D'ENCADREMENT — COMPÉTITION DU SPORT SCOLAIRE (ASS / FRMSS)
================================================================================
Le Chef d'Établissement, Président de l'Association Sportive Scolaire (ASS) de [Nom de l'établissement], mandate par le présent ordre de mission :
- Nom et Prénom : M./Mme [Nom complet du Professeur d'EPS]
- Numéro PPR : [Numéro PPR] | Grade : Professeur d'Éducation Physique et Sportive
- Objet de la mission : Encadrement pédagogique et accompagnement des équipes scolaires de l'établissement lors du championnat provincial/régional de [Discipline : Cross-country / Handball / Athlétisme].
- Lieu de la compétition : [Ville / Complexe sportif ou Établissement d'accueil]
- Date et horaires : Le [JJ/MM/AAAA] de [Heure de départ] à [Heure de retour].
- Moyen de transport utilisé : [Transport scolaire / Autocar agréé / Transport public].

Signature du Professeur Encadrant :               Cachet et Signature du Chef d'Établissement (Président ASS) :

--------------------------------------------------------------------------------
[DOCUMENT 2] : AUTORISATION PARENTALE DE PARTICIPATION ET DE DÉPLACEMENT (ASS / FRMSS)
================================================================================
Je soussigné(e) :
- Nom et Prénom du Père / Mère / Tuteur légal : [Nom complet du tuteur]
- Titulaire de la CIN n° : [Numéro CIN] | Téléphone d'urgence : [Numéro de téléphone]
- Agissant en qualité de tuteur légal de l'élève : [Nom et Prénom de l'élève] — Code Massar : [Code Massar]
- Inscrit(e) en classe de : [Classe] à l'établissement : [Nom de l'établissement]
- Quittance d'Assurance Scolaire et Sportive n° : [Numéro de quittance]

Autorise mon fils / ma fille à participer aux entraînements et aux compétitions officielles organisées par l'Association Sportive Scolaire (ASS) et la Fédération Royale Marocaine du Sport Scolaire (FRMSS) au titre de l'année scolaire [Année], et notamment au déplacement prévu le [Date] à [Lieu de la compétition] sous l'encadrement des professeurs d'EPS de l'établissement. Je certifie en outre qu'il/elle ne présente aucune contre-indication médicale à la pratique sportive de compétition.

Fait à [Ville], le [Date]
Signature du Parent / Tuteur légal (précédée de la mention « Lu et approuvé ») :"""

    body_html = f'''
            <div class="info-box">
                <p style="margin:0;"><strong>⚖️ Référence Légale Authentique (Bulletin Officiel n° 5997 du 21 Novembre 2011) :</strong> Ce dossier s'appuie directement sur la <strong>Loi n° 30-09 relative à l'Éducation Physique et aux Sports (القانون رقم 30.09 المتعلق بالتربية البدنية والرياضة)</strong> et son <strong>Décret d'application n° 2.10.628 du 4 novembre 2011 (المرسوم التطبيقي رقم 2.10.628)</strong> que vous pouvez télécharger gratuitement en PDF ci-dessous.</p>
            </div>

            <h2 id="loi-30-09-decret-2-10-628">1. Analyse de la Loi n° 30-09 et du Décret n° 2.10.628 (BO n° 5997) pour le Sport Scolaire</h2>
            <p>Le <strong>Décret n° 2.10.628 du 7 Dhou Al-Hijja 1432 (4 novembre 2011)</strong> pris pour l'application de la <strong>Loi n° 30-09</strong> fixe les règles impératives gouvernant l'enseignement de l'EPS, l'Association Sportive Scolaire (ASS) et la Fédération Royale Marocaine du Sport Scolaire (FRMSS) :</p>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Article du Décret n° 2.10.628 (BO 5997)</th>
                            <th>Article de la Loi n° 30-09 rattaché</th>
                            <th>Disposition Juridique Exacte &amp; Application en EPS / ASS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Article 3 (المادة 3)</strong></td>
                            <td>Articles 4 et 6 de la Loi 30-09</td>
                            <td>Les statuts-types des <strong>Associations Sportives Scolaires (الجمعيات الرياضية المدرسية ASS)</strong> sont fixés par arrêté conjoint de l'autorité gouvernementale chargée de l'Éducation Nationale et de celle chargée du Sport. Les statuts de la <strong>FRMSS (الجامعة الملكية المغربية للرياضة المدرسية)</strong> sont approuvés par arrêté conjoint des mêmes autorités.</td>
                        </tr>
                        <tr>
                            <td><strong>Article 10 (المادة 10)</strong></td>
                            <td>Articles 86, 87 et 89 de la Loi 30-09</td>
                            <td><strong>Autorisations d'absence pour compétitions et stages (رخص التغيب للمشاركة في المنافسات والتداريب) :</strong> Toute demande d'autorisation d'absence pour les sportifs, cadres sportifs, arbitres ou dirigeants appelés à participer à des compétitions ou stages régionaux, nationaux ou internationaux doit être déposée auprès de l'administration ou de l'employeur <strong>au moins quinze (15) jours avant la date d'ouverture de la manifestation ou du stage</strong>.</td>
                        </tr>
                        <tr>
                            <td><strong>Article 11 (المادة 11)</strong></td>
                            <td>Article 92 de la Loi 30-09</td>
                            <td><strong>Conventions de parrainage / sponsoring (اتفاقيات الاحتضان لتمويل الأنشطة الرياضية المدرسية) :</strong> Les conventions de sponsoring conclues par l'ASS d'un établissement ou par la FRMSS (section provinciale, régionale ou nationale) pour financer les activités du sport scolaire n'entrent en vigueur qu'après le <strong>visa (تأشيرة) du Ministre de l'Éducation Nationale</strong>.</td>
                        </tr>
                        <tr>
                            <td><strong>Article 17 (المادة 17)</strong></td>
                            <td>Article 63 de la Loi 30-09</td>
                            <td><strong>Obligation du Diplôme d'État :</strong> Nul ne peut enseigner l'Éducation Physique et Sportive ou exercer le métier d'entraîneur ou d'animateur sportif contre rémunération s'il n'est titulaire d'un diplôme d'État marocain ou d'un diplôme reconnu équivalent.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 id="organisation-bureau-ass">2. Organisation Juridique et Financière de l'Association Sportive Scolaire (ASS)</h2>
            <p>Au sein de chaque collège et lycée marocain, l'<strong>Association Sportive Scolaire (الجمعية الرياضية المدرسية ASS)</strong> est obligatoirement constituée conformément au Dahir de 1958 sur les associations et à la Loi 30-09 :</p>
            <ul>
                <li><strong>Présidence de droit :</strong> Le Directeur de l'établissement est le Président de droit (رئيس الجمعية الرياضية المدرسية بحكم القانون).</li>
                <li><strong>Composition du Bureau Exécutif (المكتب التنفيذي للجمعية) :</strong> Il comprend obligatoirement les professeurs d'Éducation Physique et Sportive de l'établissement (dont le coordonnateur d'EPS souvent Secrétaire Général), l'Intendant/Économe (Trésorier / أمين المال), un représentant de l'Association des Parents d'Élèves et des représentants élus des élèves (tiers des membres).</li>
                <li><strong>Obligation horaire du Professeur d'EPS en ASS :</strong> Les Orientations Pédagogiques (OP 2007/2009) intègrent l'animation sportive scolaire (Mercredi après-midi ou Vendredi après-midi : entraînement des équipes d'établissement, inter-classes et compétitions FRMSS) dans la charge hebdomadaire officielle du professeur d'EPS (comptabilisée à raison de 2h ou 3h selon le cycle).</li>
                <li><strong>Répartition des cotisations ASS :</strong> Les recettes issues des cotisations annuelles d'assurance et de sport scolaire sont réparties selon les pourcentages réglementaires entre la FRMSS nationale, le conseil régional, le conseil provincial et le compte bancaire/postal local de l'ASS de l'établissement (cosigné par le Président et le Trésorier).</li>
            </ul>

            <h2 id="procedure-deplacement-tournoi">3. Les 6 Pièces Obligatoires Avant Tout Déplacement Sportif (Cross, Sports Collectifs, Athlétisme)</h2>
            <p>Pour que la responsabilité du professeur d'EPS soit intégralement couverte (Art. 85 bis du DOC et Assurance Sportive) lors d'un déplacement hors de l'établissement :</p>
            <div class="step-card">
                <ol style="margin:0;">
                    <li><strong>L'Ordre de Mission écrit (أمر بمهمة — Ordre de Mission) :</strong> Signé et cacheté par le Directeur de l'établissement ou le Directeur Provincial avant le départ, précisant le nom du professeur, la date, le lieu, l'objet de la compétition et le moyen de transport.</li>
                    <li><strong>L'Autorisation Parentale écrite (الترخيص الأبوي المكتوب) :</strong> Signée par le père, la mère ou le tuteur légal de chaque élève convoqué.</li>
                    <li><strong>La Licence Sportive FRMSS &amp; Quittance d'Assurance (رخصة الجامعة الملكية المغربية للرياضة المدرسية ووصل التأمين) :</strong> Aucun élève non assuré et non licencié sur la plateforme officielle ne doit être aligné ou transporté.</li>
                    <li><strong>Le Certificat Médical d'Aptitude à la Compétition (شهادة الكفاءة الطبية للتنافس الرياضي) :</strong> Visé par le médecin scolaire ou du centre de santé pour les compétitions provinciales, régionales et nationales.</li>
                    <li><strong>La Liste Nominative Officielle de la Délégation (اللائحة الاسمية الرسمية للوفد الرياضي) :</strong> Visée par le Chef d'établissement (avec numéros Massar, dates de naissance et classe).</li>
                    <li><strong>Transport Réglementaire Agréé :</strong> Ne jamais transporter les élèves dans des véhicules particuliers non couverts par une assurance de transport collectif scolaire.</li>
                </ol>
            </div>

            <div class="arabic-law-box" id="resume-juridique-arabe" dir="rtl">
                <h3>🇲🇦 الملخص القانوني الرسمي بالعربية: الرياضة المدرسية في ضوء القانون 30.09 والمرسوم 2.10.628</h3>
                <p>يعتبر <strong>القانون رقم 30.09 المتعلق بالتربية البدنية والرياضة</strong> و<strong>مرسومه التطبيقي رقم 2.10.628 الصادر في 4 نونبر 2011 (الجريدة الرسمية عدد 5997)</strong> الإطار التشريعي المرجعي للرياضة المدرسية بالمغرب:</p>
                <ul>
                    <li><strong>إلزامية التربية البدنية والجمعية الرياضية المدرسية:</strong> تنص المادة 3 من المرسوم 2.10.628 على أن الأنظمة الأساسية النموذجية للجمعيات الرياضية المدرسية (ASS) والنظام الأساسي للجامعة الملكية المغربية للرياضة المدرسية (FRMSS) تحدد وتصادق عليها بقرار مشترك للسلطتين الحكوميتين المكلفتين بالتربية الوطنية والرياضة.</li>
                    <li><strong>رخص التغيب للمنافسات والتداريب الرياضية (المادة 10 من المرسوم):</strong> تطبيقاً للمواد 86 و87 و89 من القانون 30.09، يجب إيداع طلبات رخص التغيب للمشاركة في المنافسات أو التداريب الرياضية الجهوية أو الوطنية أو الدولية لدى الإدارة <strong>قبل افتتاح التظاهرة أو التدريب بخمسة عشر (15) يوماً على الأقل</strong>.</li>
                    <li><strong>اتفاقيات الاحتضان والتمويل (المادة 11 من المرسوم):</strong> كل اتفاقية احتضان تبرمها الجمعية الرياضية المدرسية (ASS) أو فروع الجامعة (FRMSS) لتمويل الأنشطة الرياضية المدرسية لا تصبح سارية المفعول إلا بعد <strong>التأشير عليها من طرف وزير التربية الوطنية</strong>.</li>
                    <li><strong>الحماية القانونية للأستاذ أثناء التنقل الرياضي:</strong> لا يجوز لأستاذ التربية البدنية مرافقة التلاميذ خارج المؤسسة إلا بعد التوفر على <strong>أمر بمهمة موقع ومختوم</strong>، و<strong>تراخيص أبوية</strong>، و<strong>تأمين رياضي ساري المفعول</strong> لكافة التلاميذ المشاركين.</li>
                </ul>
            </div>

            {build_dual_templates_html(
                "ass-ordre-mission",
                "Modèle Officiel n°3 : Ordre de Mission d'Encadrement ASS/FRMSS + Autorisation Parentale de Déplacement",
                "النموذج الإداري رقم 3: أمر بمهمة لتأطير منافسات الجمعية الرياضية المدرسية (ASS) + ترخيص أبوي للمشاركة",
                tpl_ar,
                tpl_fr
            )}

            {get_official_pdf_download_box()}
'''

    faq_list = [
        (
            "Quel est le délai légal de dépôt d'une demande d'autorisation d'absence pour participer à une compétition ou un stage sportif selon le Décret 2.10.628 ?",
            "En vertu de l'Article 10 du Décret n° 2.10.628 (pris pour l'application des articles 86, 87 et 89 de la Loi 30-09), la demande d'autorisation d'absence doit être déposée au moins quinze (15) jours avant la date d'ouverture de la compétition ou du stage."
        ),
        (
            "Une Association Sportive Scolaire (ASS) peut-elle signer une convention de sponsoring avec une entreprise privée ?",
            "Oui, mais selon l'Article 11 du Décret n° 2.10.628 (application de l'article 92 de la Loi 30-09), les conventions de parrainage (اتفاقيات الاحتضان) conclues par une ASS ou la FRMSS n'entrent en vigueur qu'après le visa officiel du Ministre de l'Éducation Nationale."
        ),
        (
            "ما هي الوثائق الإجبارية التي تحمي أستاذ التربية البدنية قانونياً أثناء التنقل لبطولات الرياضة المدرسية (ASS / FRMSS)؟",
            "الوثائق الست الأساسية هي: 1) أمر بمهمة (Ordre de Mission) موقع من المدير أو المدير الإقليمي، 2) الترخيص الأبوي الموقع لكل تلميذ، 3) وصل التأمين المدرسي والرياضي، 4) رخصة الجامعة (FRMSS) والشهادة الطبية، 5) اللائحة الاسمية المؤشر عليها، 6) وسيلة نقل قانونية ومرخصة."
        ),
        (
            "Qui préside l'Association Sportive Scolaire (ASS) dans un collège ou lycée marocain ?",
            "Le Chef d'établissement (Directeur du collège ou du lycée) est le Président de droit de l'Association Sportive Scolaire (ASS). Le bureau exécutif comprend les professeurs d'EPS, l'économe/intendant (trésorier), un représentant de l'association des parents d'élèves et des élèves élus."
        )
    ]

    html = build_bilingual_legislation_article(
        filename, title, meta_desc, badge, h1_fr, h1_ar, ref_label, read_time, toc_items, body_html, faq_list, breadcrumb_name
    )
    with open(os.path.join(PUBLIC_DIR, filename), "w", encoding="utf-8") as f:
        f.write(html)
    print(f"[ARTICLE 3 OK] {filename}")


# ==============================================================================
# ARTICLE 4 : CERTIFICAT MÉDICAL, DISPENSE D'EPS & ÉVALUATION ALTERNATIVE
# ==============================================================================
def create_article_4():
    filename = "certificat-medical-dispense-eps-maroc-procedure-evaluation.html"
    title = "Certificat Médical & Dispense d'EPS au Maroc (الإعفاء من التربية البدنية) : Procédure, Présence & Évaluation /20 | ProfEPS"
    meta_desc = "Règlement officiel des certificats médicaux et dispenses d'EPS au Maroc (Guide MEN p.27 & 32, OP 2007/2009, Notes 142-10 et 143-09). Validation par le médecin de santé scolaire, présence obligatoire et grille d'évaluation alternative FR/AR."
    badge = "⚖️ Législation EPS Maroc · Guide MEN p. 27 &amp; 32 · Notes 142-10 &amp; 143-09"
    h1_fr = "Certificat Médical et Dispense d'EPS au Maroc : Procédure de Validation, Obligation de Présence et Grille d'Évaluation Alternative (/20)"
    h1_ar = "الشهادة الطبية والإعفاء من التربية البدنية بالمغرب: مسطرة المصادقة، إلزامية الحضور وشبكة التقويم النظري والتنظيمي البديل"
    ref_label = "Guide MENPS (p. 27 & 32) · OP 2007/2009 · Notes n° 142-10 & n° 143-09"
    read_time = "17 min de lecture (Bilingue FR/AR)"
    breadcrumb_name = "Certificat Médical & Dispense d'EPS Maroc"

    toc_items = [
        ("cadre-reglementaire-dispense", "1. Cadre réglementaire : Qui valide le certificat médical de dispense d'EPS ? (Guide MEN p. 27 & 32)"),
        ("presence-obligatoire-seance", "2. L'élève dispensé doit-il assister au cours d'EPS ? (Inaptitude totale vs partielle)"),
        ("grille-evaluation-dispenses", "3. Comment évaluer et noter un élève dispensé temporaire ou partiel sur 20 ?"),
        ("resume-juridique-arabe", "4. الضوابط القانونية للإعفاء من التربية البدنية ومراقبة الصحة المدرسية بالعربية"),
        ("modeles-administratifs", "5. Modèle Officiel : Fiche de Suivi & d'Évaluation Alternative d'Élève Dispensé (FR/AR)"),
        ("telecharger-pdfs-officiels", "6. Télécharger les 4 Ouvrages Officiels de Législation PDF"),
        ("faq-officielle", "7. FAQ Dispense d'EPS, Bac Sport & Concours CRMEF")
    ]

    tpl_ar = """المملكة المغربية
وزارة التربية الوطنية والتعليم الأولي والرياضة
الأكاديمية الجهوية للتربية والتكوين لجهة: [اسم الجهة]
المديرية الإقليمية: [اسم المديرية] | المؤسسة: [اسم المؤسسة]

بطاقة التتبع البيداغوجي والتقويم البديل للتلميذ(ة) المعفى من الممارسة البدنية التطبيقية
(وفق التوجيهات التربوية 2007/2009 والنظام الداخلي للمؤسسات التعليمية — دليل التشريع ص 27 و32)

1. المعلومات الإدارية والطبية للتلميذ(ة):
- الاسم والنسب: [الاسم الكامل للتلميذ(ة)] | رقم مسار: [رقم مسار] | القسم: [القسم]
- نوع الإعفاء الطبي: [ ] إعفاء كلي سنوي   [ ] إعفاء مؤقت (الدورة 1 / الدورة 2)   [ ] إعفاء جزئي من نشاط محدد
- مدة الشهادة الطبية: من [تاريخ البداية] إلى [تاريخ النهاية] (عدد الأيام/الأشهر: [المدة])
- تأشيرة طبيب مراقبة الصحة المدرسية والحراسة العامة للخارجية: رقم [رقم التسجيل] بتاريخ [التاريخ]

2. المهام التربوية والتنظيمية المسندة للتلميذ(ة) خلال حصص الحلقة الدراسية (الأدوار الاجتماعية):
- النشاط الرياضي المبرمج للقسم (APS): [مثلاً: كرة السلة / ألعاب القوى / الجمباز]
- الدور المسند للتلميذ(ة) المعفى من الممارسة البدنية:
  [ ] التحكيم وتطبيق القانون الرسمي للنشاط (Arbitrage)
  [ ] الملاحظة وتدوين الإحصائيات الفردية والجماعية (Observation & Recueil statistique)
  [ ] التنظيم المادي وإعداد الورشات وتوقيت الحصة (Organisation & Chronométrage)
  [ ] إعداد ملف نظري متكامل حول قوانين وتقنيات النشاط المبرمج

3. شبكة التقويم البديل المعتمدة (تتكيف مع مكونات التقويم في التوجيهات التربوية):
- المعارف المفاهيمية (قوانين النشاط، تاريخ الرياضة، مبادئ التسخين والسلامة): ........ / 06 نقط
- المهارات التنظيمية والتحكيمية والملاحظة الميدانية داخل الحصة: .................. / 08 نقط
- المعارف السلوكية (المواظبة، الانضباط، إحضار الدفتر، روح التعاون والمسؤولية): .... / 06 نقط
--------------------------------------------------------------------------------
- النقطة الإجمالية المحصل عليها في الدورة: ....................................... [ .... / 20 ]

حرر بـ [المدينة]، في: [التاريخ]
توقيع التلميذ(ة):              توقيع أستاذ(ة) التربية البدنية:              تأشيرة الحارس العام للخارجية:"""

    tpl_fr = """ROYAUME DU MAROC
MINISTÈRE DE L'ÉDUCATION NATIONALE, DU PRÉSCOLAIRE ET DES SPORTS
Académie Régionale (AREF) : [Nom de l'AREF] | Direction Provinciale : [Nom]
Établissement : [Nom du Collège / Lycée]

FICHE DE SUIVI PÉDAGOGIQUE ET D'ÉVALUATION ALTERNATIVE D'UN ÉLÈVE DISPENSÉ EN EPS
(Conforme aux Orientations Pédagogiques 2007/2009 et au Règlement Intérieur — Guide MEN p. 27 & 32)

1. IDENTIFICATION ADMINISTRATIVE ET MÉDICALE DE L'ÉLÈVE :
- Nom et Prénom : [Nom complet de l'élève] | Code Massar : [Code Massar] | Classe : [Classe]
- Nature de la dispense : [ ] Totale annuelle   [ ] Temporaire (Semestre 1 / 2)   [ ] Partielle (APS spécifique)
- Période de validité du certificat médical : Du [Date début] au [Date fin]
- Visa du Médecin de la Santé Scolaire & du Surveillant Général : Enregistré sous le n° [Numéro] le [Date]

2. RÔLES SOCIAUX ET TÂCHES PÉDAGOGIQUES ATTRIBUÉS DURANT LE CYCLE :
- Cycle d'APS étudié par la classe : [Ex : Basket-Ball / Course de demi-fond / Gymnastique au sol]
- Mission confiée à l'élève dispensé de pratique physique :
  [ ] Arbitrage officiel et gestion du score / table de marque
  [ ] Observation critériée et recueil statistique sur fiches d'évaluation co-formatives
  [ ] Organisation matérielle des ateliers et chronométrage des séries
  [ ] Dossier théorique sur le règlement, la biomécanique et la sécurité de l'APS

3. GRILLE D'ÉVALUATION ALTERNATIVE SUR 20 POINTS :
- Connaissances Conceptuelles (Règlement de l'APS, physiologie de l'échauffement, sécurité) : .... / 06 pts
- Compétences Méthodologiques & Rôles Sociaux (Arbitrage, observation, chronométrage) : ......... / 08 pts
- Connaissances Comportementales (Assiduité en séance, tenue du cahier, respect et coopération) : / 06 pts
--------------------------------------------------------------------------------
- NOTE FINALE ATTRIBUÉE POUR LE CYCLE / SEMESTRE : ............................................ [ .... / 20 ]

Fait à [Ville], le [Date]
Signature de l'élève :             Signature du Professeur d'EPS :             Visa du Surveillant Général :"""

    body_html = f'''
            <div class="info-box">
                <p style="margin:0;"><strong>⚖️ Fin des idées reçues sur la dispense d'EPS au Maroc :</strong> Un certificat médical délivré par un médecin privé suffit-il à dispenser directement un élève auprès du professeur d'EPS ? L'élève dispensé a-t-il le droit de quitter l'établissement pendant les 2 heures d'EPS ? Voici la réponse juridique exacte tirée du <strong>Guide officiel du Ministère (التشريع المدرسي وأخلاقيات المهنة، ص 27 و32)</strong> et des <strong>Orientations Pédagogiques 2007/2009</strong>.</p>
            </div>

            <h2 id="cadre-reglementaire-dispense">1. Procédure Légale de Validation du Certificat Médical de Dispense d'EPS (Guide MEN p. 27 &amp; 32)</h2>
            <p>Le <strong>Guide ministériel de Législation Scolaire (chapitre sur le Règlement Intérieur et les attributions du Surveillant Général, pages 27 et 32)</strong> fixe deux règles impératives que tout professeur d'EPS doit connaître :</p>
            <ol>
                <li><strong>Validation obligatoire par le Médecin de Contrôle de la Santé Scolaire (طبيب مراقبة الصحة المدرسية) :</strong> Selon la page 32 du Guide MEN (<em>مقتضيات خاصة بالنظام الداخلي</em>), <strong>« لا يسلم الإعفاء من دروس التربية البدنية إلا بعد الإدلاء بشهادة طبية مسلمة من طرف طبيب مراقبة الصحة المدرسية »</strong> (La dispense des cours d'Éducation Physique et Sportive n'est accordée qu'après présentation d'un certificat médical délivré ou homologué par le médecin de contrôle de la santé scolaire).</li>
                <li><strong>Circuit administratif via le Surveillant Général (الحارس العام للخارجية — Guide MEN p. 27) :</strong> Le professeur d'EPS ne reçoit jamais directement un certificat médical des mains de l'élève sur le terrain. L'élève (ou son tuteur) dépose son certificat médical auprès du bureau du Surveillant Général dans les délais réglementaires (début d'année ou dans les 48h suivant la survenance de l'incapacité). Le Surveillant Général l'enregistre dans le dossier de l'élève et transmet un <strong>avis officiel de dispense (إشعار بالإعفاء من التربية البدنية)</strong> au professeur d'EPS.</li>
            </ol>

            <h2 id="presence-obligatoire-seance">2. Obligation de Présence en Séance &amp; Distinction entre Dispense de Pratique et Dispense de Présence</h2>
            <p>En droit scolaire marocain, le certificat médical dispense l'élève de <strong>l'effort physique incompatible avec son état de santé</strong>, mais ne le dispense pas de sa présence sous la responsabilité juridique de l'établissement :</p>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Type de Dispense Médicale</th>
                            <th>Statut sur Massar</th>
                            <th>Obligation de Présence &amp; Modalité d'Évaluation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>1. Dispense Totale Annuelle (إعفاء كلي سنوي)</strong></td>
                            <td>Mention officielle « Dispensé / معفى » validée par la Santé Scolaire.</td>
                            <td>Neutralisation du coefficient d'EPS dans le calcul de la moyenne générale annuelle et au Baccalauréat officiel. L'élève reste soumis au règlement intérieur de présence au sein de l'établissement (ou sur le terrain en tâches d'observation/organisation).</td>
                        </tr>
                        <tr>
                            <td><strong>2. Dispense Partielle / Handicap moteur léger (إعفاء جزئي)</strong></td>
                            <td>Inscrit avec adaptation pédagogique.</td>
                            <td><strong>Présence obligatoire en séance :</strong> Le professeur adapte l'épreuve ou l'atelier selon les capacités résiduelles de l'élève (ex. dispense de saut mais participation au lancer du poids ou arbitrage/observation).</td>
                        </tr>
                        <tr>
                            <td><strong>3. Dispense Temporaire d'un Cycle ou quelques semaines (إعفاء مؤقت)</strong></td>
                            <td>Évalué sur le semestre ou via évaluation alternative.</td>
                            <td><strong>Présence obligatoire avec la classe :</strong> L'élève participe aux rôles sociaux (arbitrage, recueil statistique, chronométrage) et est évalué sur les connaissances conceptuelles et comportementales.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 id="grille-evaluation-dispenses">3. Comment Intégrer et Évaluer l'Élève Dispensé Temporaire selon les OP 2007/2009 ?</h2>
            <p>Les <strong>Orientations Pédagogiques 2007 (Qualifiant) et 2009 (Collégial)</strong> ainsi que les <strong>Notes ministérielles n° 142-10 et n° 143-09</strong> décomposent la compétence en EPS en trois dimensions (Connaissances procédurales/motrices, Connaissances conceptuelles, Connaissances comportementales) :</p>
            <ul>
                <li><strong>Connaissances Conceptuelles (المعارف المفاهيمية — 6 points) :</strong> Maîtrise du règlement de l'APS étudiée, terminologie technique, principes physiologiques de l'échauffement et règles de sécurité.</li>
                <li><strong>Compétences Méthodologiques &amp; Rôles Sociaux (المهارات التنظيمية والتحكيمية — 8 points) :</strong> Tenue de la table de marque, arbitrage officiel avec gestes réglementaires, chronométrage des courses (VMA / sprint), remplissage des fiches d'observation co-formatives.</li>
                <li><strong>Connaissances Comportementales (المعارف السلوكية — 6 points) :</strong> Assiduité, ponctualité, tenue du cahier d'EPS, respect des camarades et engagement dans l'organisation matérielle.</li>
            </ul>

            <div class="arabic-law-box" id="resume-juridique-arabe" dir="rtl">
                <h3>🇲🇦 الضوابط القانونية للإعفاء من حصة التربية البدنية بالمغرب (دليل التشريع المدرسي ص 27 و32)</h3>
                <p>تنص الوثائق الرسمية لوزارة التربية الوطنية (دليل التشريع المدرسي وأخلاقيات المهنة ص 27 و32) والتوجيهات التربوية لمادة التربية البدنية والرياضية على القواعد الملزمة التالية:</p>
                <ul>
                    <li><strong>شرط طبيب مراقبة الصحة المدرسية (ص 32):</strong> ينص النظام الداخلي للمؤسسات التعليمية صراحة على أنه: <strong>« لا يسلم الإعفاء من دروس التربية البدنية إلا بعد الإدلاء بشهادة طبية مسلمة من طرف طبيب مراقبة الصحة المدرسية »</strong>.</li>
                    <li><strong>دور الحارس العام للخارجية (ص 27):</strong> يعتبر الحارس العام للخارجية المسؤول الإداري عن تلقي الشهادات الطبية، وضبط ملفات التلاميذ المعفيين من التربية البدنية، وإخبار أستاذ المادة رسمياً. لا يقبل الأستاذ أي شهادة طبية تسلم له يداً بيد في الملعب دون المرور عبر الإدارة.</li>
                    <li><strong>إلزامية الحضور والتقويم البديل:</strong> الشهادة الطبية تعفي التلميذ من المجهود البدني الذي يضر بصحته، لكنها لا تعفيه من واجب الحضور والانضباط داخل الحصة للمساهمة في الأدوار الاجتماعية (التحكيم، الملاحظة، التنظيم، الإحصاء) واكتساب المعارف المفاهيمية والسلوكية المنصوص عليها في التوجيهات التربوية 2007 و2009.</li>
                </ul>
            </div>

            {build_dual_templates_html(
                "dispense-eps",
                "Modèle Officiel n°4 : Fiche de Suivi Pédagogique & Grille d'Évaluation Alternative d'Élève Dispensé (/20)",
                "النموذج الإداري رقم 4: بطاقة التتبع البيداغوجي وشبكة التقويم البديل للتلميذ المعفى من الممارسة البدنية (/20)",
                tpl_ar,
                tpl_fr
            )}

            {get_official_pdf_download_box()}
'''

    faq_list = [
        (
            "Qui a l'autorité légale de valider un certificat médical de dispense d'EPS au Maroc ?",
            "Conformément au Guide officiel de Législation Scolaire du Ministère (page 32), la dispense des cours d'EPS n'est délivrée qu'après présentation d'un certificat médical délivré ou validé par le médecin de contrôle de la santé scolaire (طبيب مراقبة الصحة المدرسية), enregistré par le Surveillant Général."
        ),
        (
            "Un élève dispensé d'EPS a-t-il le droit de sortir de l'établissement pendant la séance d'EPS ?",
            "Non. L'élève reste sous la responsabilité juridique de l'établissement pendant toutes les heures inscrites à son emploi du temps. En cas de dispense temporaire ou partielle, il assiste à la séance d'EPS et participe aux rôles sociaux (arbitrage, observation, chronométrage, organisation)."
        ),
        (
            "هل يقبل أستاذ التربية البدنية الشهادة الطبية مباشرة من يد التلميذ في الملعب؟",
            "لا. المسطرة الإدارية القانونية (دليل التشريع المدرسي ص 27) تفرض على التلميذ أو ولي أمره إيداع الشهادة الطبية لدى مكتب الحارس العام للخارجية داخل الآجال القانونية، والذي يتولى مراقبتها وتسليم التلميذ أو الأستاذ ورقة الإعفاء الرسمية."
        ),
        (
            "Comment un candidat libre au Baccalauréat (الأحرار) obtient-il une dispense de l'épreuve d'EPS ?",
            "Le candidat libre inapte doit déposer son dossier médical auprès de la Direction Provinciale dans les délais fixés par la note ministérielle d'organisation du Baccalauréat, puis se présenter devant la Commission Médicale Provinciale officielle qui est seule habilitée à prononcer l'inaptitude définitive à l'épreuve du Bac Sport."
        )
    ]

    html = build_bilingual_legislation_article(
        filename, title, meta_desc, badge, h1_fr, h1_ar, ref_label, read_time, toc_items, body_html, faq_list, breadcrumb_name
    )
    with open(os.path.join(PUBLIC_DIR, filename), "w", encoding="utf-8") as f:
        f.write(html)
    print(f"[ARTICLE 4 OK] {filename}")


# ==============================================================================
# ARTICLE 5 : CONGÉS, ABSENCES, RETENUE (LOI 12.81) & ABANDON DE POSTE (75 BIS)
# ==============================================================================
def create_article_5():
    filename = "absences-conges-enseignant-eps-maroc-droits-procedures.html"
    title = "Congés & Absences de l'Enseignant au Maroc (الرخص والتغيبات والاقتطاع وترك الوظيفة) : Loi 12.81 & Art. 75 bis | ProfEPS"
    meta_desc = "Guide complet des congés et absences du professeur d'EPS au Maroc (FADEEP p.24, Guide MEN p.53-57 & 93-98, ENS Fès Ch.6). Délais certificat médical (48h/72h), congés familiaux, disponibilité, retenue sur salaire (Loi 12.81) et abandon de poste (Art. 75 bis)."
    badge = "⚖️ Législation Fonction Publique · Art. 38-46 &amp; 75 bis · Circulaire 26/2012"
    h1_fr = "Congés, Absences, Retenue sur Salaire (Loi 12.81) et Abandon de Poste (Art. 75 bis) : Guide Complet des Droits et Procédures du Professeur d'EPS"
    h1_ar = "الرخص والتغيبات والاقتطاع من الأجر (القانون 12.81) ومسطرة ترك الوظيفة (الفصل 75 مكرر): دليل حقوق ومساطر أستاذ التربية البدنية"
    ref_label = "Dahir 1.58.008 (Art. 38-46 & 75 bis) · Loi 12.81 · Circulaire 26/2012 (MEN p. 53-57 & 93-98)"
    read_time = "20 min de lecture (Bilingue FR/AR)"
    breadcrumb_name = "Congés, Absences, Loi 12.81 & Abandon de Poste"

    toc_items = [
        ("quatre-types-conges", "1. Les 4 grandes catégories de congés du fonctionnaire (FADEEP p. 24 & ENS Fès Ch. 6)"),
        ("conges-maladie-delais", "2. Congés de maladie : Délais de dépôt (48h urbain / 72h rural) & Traitements"),
        ("conges-exceptionnels-disponibilite", "3. Autorisations exceptionnelles (Mariage, Naissance, Décès, Hajj) & Disponibilité (الاستيداع)"),
        ("retenue-12-81-abandon-75-bis", "4. Retenue sur salaire (Loi 12.81 / Circulaire 26-2012) & Abandon de poste (Art. 75 bis)"),
        ("resume-juridique-arabe", "5. الملخص القانوني الشامل بالعربية: الرخص، الاستيداع، الاقتطاع ومسطرة ترك الوظيفة"),
        ("modeles-administratifs", "6. Modèles Officiels : Demande d'Autorisation d'Absence + Réponse à Demande d'Explication (FR/AR)"),
        ("telecharger-pdfs-officiels", "7. Télécharger les 4 Ouvrages Officiels de Législation PDF"),
        ("faq-officielle", "8. FAQ Congés, Absences & Concours CRMEF")
    ]

    tpl_ar = """المملكة المغربية
وزارة التربية الوطنية والتعليم الأولي والرياضة
الأكاديمية الجهوية للتربية والتكوين لجهة: [اسم الجهة]
المديرية الإقليمية: [اسم المديرية] | المؤسسة: [اسم المؤسسة]

[النموذج 1]: طلب رخصة تغيب استثنائية لأسباب عائلية أو لإجراء امتحانات جامعية/مهنية
================================================================================
من الأستاذ(ة): [الاسم الكامل للأستاذ(ة)] — رقم التأجير (PPR): [رقم التأجير]
الإطار: أستاذ(ة) التربية البدنية والرياضية
إلى السيد(ة) المدير(ة) الإقليمي(ة) لوزارة التربية الوطنية بـ [اسم المديرية]
تحت إشراف السيد(ة) مدير(ة) المؤسسة: [اسم المؤسسة]

الموضوع: طلب رخصة تغيب استثنائية لمدة [عدد الأيام] أيام.
المرجع: الفصل 41 من الظهير الشريف رقم 1.58.008 والمرسوم رقم 2.99.1219 الصادر في 10 ماي 2000.

سلام تام بوجود مولانا الإمام،
وبعد، يشرفني أن ألتمس من سيادتكم الموافقة على منحي رخصة تغيب استثنائية لمدة [عدد الأيام] أيام، وذلك ابتداءً من يوم [تاريخ البداية] إلى غاية يوم [تاريخ النهاية]، بسبب: [تحديد السبب القانوني: ازدياد مولود / زواج / وفاة أحد الأصول أو الفروع / اجتياز امتحان جامعي أو مباراة مهنية].
وتجدون رفقته الوثائق الثبوتية المبررة لهذا الطلب: [ذكر الوثيقة المرفقة: عقد ازدياد / استدعاء الامتحان...].
وتفضلوا بقبول فائق التقدير والاحترام.
حرر بـ [المدينة]، في: [التاريخ] — إمضاء الأستاذ(ة):

--------------------------------------------------------------------------------
[النموذج 2]: جواب كتابي عن استفسار إداري حول تغيب أو تأخر (Réponse à demande d'explication)
================================================================================
من الأستاذ(ة): [الاسم الكامل للأستاذ(ة)] — رقم التأجير (PPR): [رقم التأجير]
إلى السيد(ة) مدير(ة) مؤسسة [اسم المؤسسة] المحترم(ة)

الموضوع: جواب عن الاستفسار الكتابي المؤرخ في [تاريخ الاستفسار] تحت رقم [رقم المراسلة].

سلام تام بوجود مولانا الإمام،
وبعد، تبعا للاستفسار الكتابي الموجه إلي بتاريخ [التاريخ] بخصوص عدم التحاقي بالحصة التدريسية ليوم [تاريخ الغياب] من الساعة [الساعة] إلى الساعة [الساعة]، يشرفني أن أوضح لسيادتكم أن هذا التغيب كان ناتجاً عن ظرف طارئ وقاهر خارج عن إرادتي، تمثل في [توضيح السبب الحقيقي بدقة وموضوعية: وعكة صحية مفاجئة مبررة بشهادة طبية مرفقة / عطب طارئ في وسائل النقل مع إشعار الحراسة العامة هاتفياً في الحين].
وإذ أرفق لكم طيه الوثيقة التبريرية المشروعة [طبيعة الوثيقة المرفقة]، أؤكد لسيادتكم حرصي الدائم على أداء واجبي المهني والتربوي بكل التزام وانضباط، واستعدادي لتعويض الحصة لفائدة التلاميذ بتنسيق مع الإدارة التربوية.
وتفضلوا بقبول فائق الاحترام والتقدير.

حرر بـ [المدينة]، في: [التاريخ]
توقيع الأستاذ(ة) المعني(ة):                              تأشيرة وتاريخ توصل الإدارة:"""

    tpl_fr = """ROYAUME DU MAROC
MINISTÈRE DE L'ÉDUCATION NATIONALE, DU PRÉSCOLAIRE ET DES SPORTS
Académie Régionale (AREF) : [Nom de l'AREF] | Direction Provinciale : [Nom]
Établissement : [Nom du Collège / Lycée]

[MODÈLE 1] : DEMANDE D'AUTORISATION EXCEPTIONNELLE D'ABSENCE (Art. 41 du Statut Général)
================================================================================
De : M./Mme [Nom et Prénom du Professeur], Professeur d'EPS — PPR : [Numéro PPR]
À : Monsieur / Madame le(la) Directeur(trice) Provincial(e) de [Nom de la Direction]
Sous couvert de Monsieur / Madame le(la) Directeur(trice) de l'établissement [Nom]

Objet : Demande d'autorisation exceptionnelle d'absence de [Nombre] jours.
Réf. : Article 41 du Dahir n° 1.58.008 et Décret n° 2.99.1219 du 10 mai 2000.

Monsieur / Madame le(la) Directeur(trice) Provincial(e),
J'ai l'honneur de solliciter de votre haute bienveillance l'octroi d'une autorisation exceptionnelle d'absence d'une durée de [Nombre] jours, du [Date début] au [Date fin] inclus, pour le motif légal suivant : [Préciser : Mariage / Naissance d'un enfant / Décès d'un proche / Participation à un examen universitaire ou concours officiel].
Vous trouverez ci-joint la pièce justificative correspondante : [Convocation officielle / Acte d'état civil].
Veuillez agréer, Monsieur / Madame le(la) Directeur(trice), l'expression de ma haute considération.
Fait à [Ville], le [Date] — Signature du Professeur :

--------------------------------------------------------------------------------
[MODÈLE 2] : RÉPONSE ÉCRITE À UNE DEMANDE D'EXPLICATION ADMINISTRATIVE (جواب عن استفسار)
================================================================================
De : M./Mme [Nom et Prénom du Professeur], Professeur d'EPS — PPR : [Numéro PPR]
À : Monsieur / Madame le(la) Directeur(trice) de l'établissement [Nom]

Objet : Réponse à votre demande d'explication n° [Numéro] en date du [Date].

Monsieur / Madame le(la) Directeur(trice),
En réponse à votre demande d'explication citée en objet relative à mon absence du [Date de l'absence] de [Heure] à [Heure], j'ai l'honneur de porter à votre connaissance que cet empêchement est dû à une circonstance indépendante de ma volonté, à savoir : [Exposer de manière courtoise et factuelle le motif : malaise médical soudain justifié par certificat médical ci-joint / force majeure de transport ayant fait l'objet d'un appel téléphonique immédiat à la surveillance générale].
Tout en vous priant de trouver ci-joint le justificatif correspondant, je vous réaffirme mon attachement constant au respect de mes obligations professionnelles et ma disponibilité pour organiser une séance de rattrapage au profit des élèves en coordination avec l'administration.
Veuillez agréer, Monsieur / Madame le(la) Directeur(trice), l'expression de mes salutations respectueuses.

Fait à [Ville], le [Date]
Signature du Professeur :                                Visa et Date de réception par la Direction :"""

    body_html = f'''
            <div class="info-box">
                <p style="margin:0;"><strong>⚖️ Un chapitre incontournable des concours et de la vie professionnelle :</strong> Quels sont les délais exacts pour déposer un certificat médical de maladie (48h en milieu urbain, 72h en milieu rural) ? Combien de jours donnent droit le mariage, la naissance ou le décès ? Comment fonctionnent la <strong>mise en disponibilité (الاستيداع — Guide MEN p. 53-57)</strong>, la <strong>retenue sur salaire (Loi 12.81 &amp; Circulaire 26/2012 — Guide MEN p. 93-98)</strong> et la procédure d'<strong>abandon de poste (الفصل 75 مكرر)</strong> ?</p>
            </div>

            <h2 id="quatre-types-conges">1. Les 4 Grandes Catégories de Congés dans la Fonction Publique Marocaine (FADEEP p. 24 &amp; ENS Fès Ch. 6)</h2>
            <p>Conformément aux articles 38 à 46 du Dahir n° 1.58.008, au Décret n° 2.99.1219 du 10 mai 2000 et au <strong>Module FADEEP (page 24)</strong>, les congés des enseignants se divisent en 4 catégories :</p>
            <ol>
                <li><strong>Les Congés Administratifs (الرخص الإدارية) :</strong> Congé annuel (1 mois par an pendant les vacances scolaires d'été pour le corps enseignant) et Congé de Pèlerinage au Hajj (<strong>رخصة الحج : 2 mois / 60 jours consécutifs</strong> accordés une seule fois dans la carrière du fonctionnaire musulman, sans cumul avec le congé d'été la même année).</li>
                <li><strong>Les Congés pour Raisons de Santé (الرخص لأسباب صحية) :</strong> Courte durée, moyenne durée, longue durée, maternité (14 semaines) et congés suite à un accident de service.</li>
                <li><strong>Les Autorisations Exceptionnelles d'Absence (الرخص الاستثنائية بالتغيب) :</strong> Événements familiaux, examens, mandats syndicaux ou électifs, compétitions sportives (Art. 10 du Décret 2.10.628) et poursuite d'études universitaires (Notes ministérielles n° 1 et n° 106 : max 3h/semaine sous conditions).</li>
                <li><strong>Les Congés sans Solde &amp; la Disponibilité (الرخص بدون أجر والاستيداع) :</strong> Disponibilité sur demande de la femme fonctionnaire ou pour raisons familiales/études (Guide MEN p. 53-57).</li>
            </ol>

            <h2 id="conges-maladie-delais">2. Congés de Maladie &amp; Maternité : Durées, Salaires et Délais de Dépôt (48h / 72h)</h2>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Type de Congé Santé (نوع الرخصة المرضية)</th>
                            <th>Durée Maximale</th>
                            <th>Rémunération (الأجرة)</th>
                            <th>Procédure &amp; Délais Légaux (Курس ENS Fès Ch. 6 &amp; FADEEP p. 24)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Congé de Maladie de Courte Durée (رخصة مرض قصيرة الأمد)</strong></td>
                            <td><strong>6 mois maximum</strong> sur une période de 12 mois consécutifs.</td>
                            <td><strong>3 premiers mois à 100%</strong> du salaire, puis <strong>3 mois suivants à 50%</strong> (avec maintien intégral des allocations familiales).</td>
                            <td>Dépôt du certificat médical auprès du Directeur (via المسير contre récépissé mentionnant l'adresse de résidence) sous <strong>48 heures en milieu urbain</strong> et <strong>72 heures en milieu rural</strong>. L'administration peut ordonner une contre-visite médicale (الفحص الطبي المضاد).</td>
                        </tr>
                        <tr>
                            <td><strong>Congé de Maladie de Moyenne Durée (رخصة مرض متوسطة الأمد)</strong></td>
                            <td><strong>3 ans maximum</strong> (affections prolongées fixées par décret n° 2.94.279).</td>
                            <td><strong>2 premières années à 100%</strong> du salaire, puis <strong>1 an à 50%</strong>.</td>
                            <td>Accordé par tranches de 3 ou 6 mois après avis conforme du Conseil de Santé (المجلس الصحي).</td>
                        </tr>
                        <tr>
                            <td><strong>Congé de Maladie de Longue Durée (رخصة مرض طويلة الأمد)</strong></td>
                            <td><strong>5 ans maximum</strong> (cancers, maladies mentales graves, poliomyélite, lèpre, SIDA...).</td>
                            <td><strong>3 premières années à 100%</strong> du salaire, puis <strong>2 ans à 50%</strong>.</td>
                            <td>Accordé après validation du Conseil de Santé. Le poste budgétaire du fonctionnaire devient vacant mais sa réintégration est garantie après guérison.</td>
                        </tr>
                        <tr>
                            <td><strong>Congé de Maternité (رخصة الولادة)</strong></td>
                            <td><strong>14 semaines</strong> (98 jours).</td>
                            <td><strong>100% du salaire</strong> pendant toute la durée des 14 semaines.</td>
                            <td>Débute 4 semaines avant la date présumée d'accouchement (ou à la date de l'accouchement s'il est prématuré) + <strong>1 heure d'allaitement par jour (ساعة الرضاعة)</strong> pendant 12 mois à compter de la reprise (ou 18 mois selon conventions).</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 id="conges-exceptionnels-disponibilite">3. Barème Officiel des Congés Familiaux Exceptionnels &amp; Disponibilité (الاستيداع — Guide MEN p. 53-57)</h2>
            <p>Les durées légales des autorisations d'absence pour événements familiaux (<strong>رخص التغيب لأسباب عائلية</strong> — Décret 2.99.1219) et de la mise en disponibilité (<strong>الاستيداع — الفصول 57 إلى 63 من النظام الأساسي العام للوظيفة العمومية، دليل التشريع ص 53-57</strong>) sont fixées comme suit :</p>
            <ul>
                <li><strong>Mariage du fonctionnaire (زواج الموظف) :</strong> <strong>4 jours</strong> ouvrables.</li>
                <li><strong>Mariage d'un enfant du fonctionnaire (زواج أحد أبناء الموظف) :</strong> <strong>2 jours</strong>.</li>
                <li><strong>Naissance d'un enfant / Congé de paternité ou Circoncision (ازدياد مولود أو ختان) :</strong> Naissance (<strong>3 jours</strong> classiques / jusqu'à 15 jours selon la nouvelle réforme du congé de paternité), Circoncision (<strong>2 jours</strong>), Opération chirurgicale du conjoint ou d'un enfant à charge (<strong>2 jours</strong>).</li>
                <li><strong>Décès du conjoint, d'un ascendant (père/mère) ou d'un enfant (وفاة الزوج أو أحد الأصول أو الفروع) :</strong> <strong>3 jours</strong>.</li>
                <li><strong>Décès d'un frère, d'une sœur ou d'un ascendant du conjoint (وفاة أخ أو أخت أو أحد أصول الزوج) :</strong> <strong>2 jours</strong>.</li>
                <li><strong>Mise en Disponibilité sur demande (الاستيداع بطلب من الموظف — Guide MEN p. 53-57) :</strong> Position où le fonctionnaire cesse de percevoir son salaire et suspend ses droits à l'avancement et à la retraite. Elle est accordée <strong>de plein droit à la femme fonctionnaire</strong> pour élever un enfant de moins de 5 ans ou atteint d'une infirmité (2 ans renouvelables) ou pour suivre son conjoint (2 ans renouvelables jusqu'à 10 ans max), et sur avis de la CAP pour accident/maladie grave d'un proche (1 à 3 ans, renouvelable une fois), études ou recherches d'intérêt général (1 à 3 ans) ou convenances personnelles (1 à 2 ans non renouvelable). La demande de réintégration doit être présentée <strong>au moins 2 mois avant l'expiration</strong> de la période.</li>
            </ul>

            <h2 id="retenue-12-81-abandon-75-bis">4. Retenue sur Salaire (Loi 12.81 &amp; Circulaire 26/2012) et Abandon de Poste (Art. 75 bis)</h2>
            <div class="step-card">
                <h3 style="margin-top:0;">💸 A. La Règle « Salaire contre Travail » (الأجر مقابل العمل — Guide MEN p. 93-98)</h3>
                <p>Selon la <strong>Loi n° 12.81</strong>, le <strong>Décret n° 2.99.1216 du 10 mai 2000</strong> et la <strong>Circulaire du Chef du Gouvernement n° 26/2012 du 15 novembre 2012</strong> (reproduite intégralement aux pages 93 à 98 du Guide MEN) :</p>
                <ul>
                    <li>Toute absence non justifiée légalement donne lieu, après envoi d'une <strong>demande d'explication écrite (استفسار كتابي)</strong> au fonctionnaire, à une retenue directe sur salaire proportionnelle à la durée de l'absence : <strong>1/30ème du salaire mensuel par journée entière</strong> d'absence, ou <strong>1/60ème par demi-journée</strong>.</li>
                    <li>La retenue sur salaire est une mesure comptable (إجراء محاسباتي) qui n'exclut pas d'éventuelles poursuites disciplinaires en cas de récidive.</li>
                </ul>
            </div>

            <div class="step-card">
                <h3 style="margin-top:0;">🚨 B. La Procédure d'Abandon de Poste (مسطرة ترك الوظيفة — الفصل 75 مكرر)</h3>
                <p>L'<strong>Article 75 bis du Statut Général de la Fonction Publique (الفصل 75 مكرر)</strong> encadre strictement l'absence injustifiée prolongée :</p>
                <ol style="margin-bottom:0;">
                    <li><strong>Mise en demeure de rejoindre le poste (إنذار بالعودة إلى العمل) :</strong> Envoyée à la dernière adresse déclarée par le fonctionnaire par lettre recommandée avec accusé de réception (أو بواسطة مفوض قضائي). Elle informe l'agent qu'il dispose d'un <strong>délai de 7 jours (سبعة أيام)</strong> à compter de la notification pour reprendre son service, sous peine de radiation des cadres (العزل).</li>
                    <li><strong>Si le fonctionnaire reprend son poste dans les 7 jours :</strong> Son dossier est soumis au Conseil de discipline (avec retenue sur salaire pour les jours d'absence).</li>
                    <li><strong>Si le fonctionnaire ne reprend pas dans les 7 jours :</strong> Le Chef de l'administration prononce la <strong>suspension immédiate du salaire (توقيف الأجرة)</strong> et peut prononcer directement la <strong>révocation (العزل) sans consulter le Conseil de discipline</strong>.</li>
                    <li><strong>Si la mise en demeure n'a pas pu être notifiée à l'adresse :</strong> L'administration suspend immédiatement le salaire. Si le fonctionnaire ne se manifeste pas dans un délai de <strong>60 jours (ستون يوماً)</strong> à compter de la décision de suspension du salaire, sa révocation définitive est prononcée d'office.</li>
                </ol>
            </div>

            <div class="arabic-law-box" id="resume-juridique-arabe" dir="rtl">
                <h3>🇲🇦 الملخص القانوني الرسمي بالعربية: الرخص، الاقتطاع (منشور 26/2012) وترك الوظيفة (الفصل 75 مكرر)</h3>
                <ul>
                    <li><strong>إيداع الشهادة الطبية (FADEEP ص 24):</strong> يسلم الموظف الشهادة الطبية لرئيس المؤسسة إما شخصياً أو عن طريق ذويه أو ما يثبت ذلك في أجل لا يتعدى <strong>48 ساعة في الوسط الحضري و72 ساعة في الوسط القروي</strong>، مع تسليم وصل استلام وتحديد عنوان الإقامة خلال فترة المرض لاحتمال إجراء الفحص الطبي المضاد.</li>
                    <li><strong>الاقتطاع من الأجر بسبب التغيب غير المشروع (منشور رئيس الحكومة رقم 26/2012 — دليل التشريع ص 93-98):</strong> تطبيقاً للقانون رقم 12.81 والمرسوم رقم 2.99.1216، توجه الإدارة <strong>استفساراً كتابياً</strong> للموظف المتغيب بدون ترخيص أو مبرر مقبول، وتباشر اقتطاع <strong>1/30 من الأجرة الشهرية عن كل يوم غياب كامل</strong> (أو 1/60 عن نصف يوم).</li>
                    <li><strong>مسطرة ترك الوظيفة (الفصل 75 مكرر):</strong> توجه الإدارة للموظف المتغيب <strong>إنذاراً بمطالبته باستئناف عمله داخل أجل 7 أيام</strong> من تاريخ تسلم الإنذار. في حالة عدم الالتحاق بعد مرور 7 أيام، توقف أجرته ويحق لرئيس الإدارة إصدار عقوبة العزل مباشرة دون استشارة المجلس التأديبي. وإذا تعذر تبليغ الإنذار، توقف الأجرة فوراً، فإذا لم يستأنف عمله داخل أجل <strong>60 يوماً</strong> يصدر قرار العزل.</li>
                </ul>
            </div>

            {build_dual_templates_html(
                "absences-conges",
                "Modèle Officiel n°5 : Demande d'Autorisation d'Absence + Réponse Écrite à une Demande d'Explication",
                "النموذج الإداري رقم 5: طلب رخصة تغيب استثنائية + جواب كتابي عن استفسار إداري (استفسار حول تغيب)",
                tpl_ar,
                tpl_fr
            )}

            {get_official_pdf_download_box()}
'''

    faq_list = [
        (
            "Quel est le délai légal pour déposer un certificat médical de maladie dans l'enseignement public au Maroc ?",
            "Le fonctionnaire doit déposer (ou faire déposer par un proche) son certificat médical auprès du Directeur de l'établissement contre récépissé dans un délai maximal de 48 heures en milieu urbain et de 72 heures en milieu rural."
        ),
        (
            "Quelle est la durée du congé de maternité et du congé de pèlerinage (Hajj) au Maroc ?",
            "Le congé de maternité (رخصة الولادة) est de 14 semaines rémunérées à 100% du salaire. Le congé de pèlerinage au Hajj (رخصة الحج) est de 2 mois (60 jours consécutifs), accordé une seule fois dans la carrière du fonctionnaire."
        ),
        (
            "ما هي آجال مسطرة ترك الوظيفة حسب الفصل 75 مكرر من النظام الأساسي العام للوظيفة العمومية؟",
            "الأجل الأول هو سبعة (7) أيام من تاريخ تسلم الإنذار بالعودة إلى العمل. وفي حالة تعذر تبليغ الإنذار للموظف في عنوانه المصرح به، يتم توقيف الأجرة فوراً، ويمنح الموظف أجل ستين (60) يوماً من تاريخ توقيف الأجرة لاستئناف عمله وإلا صدر في حقه قرار العزل."
        ),
        (
            "Comment est calculée la retenue sur salaire en cas d'absence non justifiée selon la Loi n° 12.81 ?",
            "Après envoi d'une demande d'explication écrite (استفسار كتابي), la retenue est calculée à raison de 1/30ème de la rémunération mensuelle nette par journée d'absence (ou 1/60ème pour une demi-journée), conformément au Décret n° 2.99.1216 et à la Circulaire n° 26/2012."
        )
    ]

    html = build_bilingual_legislation_article(
        filename, title, meta_desc, badge, h1_fr, h1_ar, ref_label, read_time, toc_items, body_html, faq_list, breadcrumb_name
    )
    with open(os.path.join(PUBLIC_DIR, filename), "w", encoding="utf-8") as f:
        f.write(html)
    print(f"[ARTICLE 5 OK] {filename}")


# ==============================================================================
# ARTICLE 6 : INSPECTION PÉDAGOGIQUE, NOTATION (/20), ÉCHELONS, GRADES & SALAIRES
# ==============================================================================
def create_article_6():
    filename = "inspection-pedagogique-notation-avancement-professeur-eps-maroc.html"
    title = "Inspection Pédagogique, Notation (/20), Avancement & Salaire du Professeur d'EPS au Maroc (الترقي والأجور) | ProfEPS"
    meta_desc = "Guide officiel de l'inspection pédagogique, grille de notation administrative (/20), rythmes d'avancement d'échelon (الرتبة) et de grade (الدرجة), titularisation CAP et calcul des salaires/indemnités (Zone A/B/C, allocations) du professeur d'EPS au Maroc (ENS Fès Ch. 3-5 & Guide MEN p. 58-59)."
    badge = "⚖️ Carrière &amp; Législation EPS · Décret 2.05.1367 · ENS Fès Ch. 3-5 &amp; MEN p. 58-59"
    h1_fr = "Inspection Pédagogique, Grille de Notation (/20), Avancement d'Échelon et de Grade &amp; Salaires du Professeur d'EPS au Maroc"
    h1_ar = "التفتيش التربوي، شبكة التنقيط الإداري (/20)، الترقي في الرتبة والدرجة، الكفاءة التربوية والأجور والتعويضات لأستاذ التربية البدنية"
    ref_label = "Décret n° 2.05.1367 · Statut MENPS · Cours ENS Fès (Ch. 3, 4, 5) & Guide MEN (p. 58-59)"
    read_time = "21 min de lecture (Bilingue FR/AR)"
    breadcrumb_name = "Inspection, Notation (/20), Avancement & Salaires EPS"

    toc_items = [
        ("grille-notation-20", "1. La Grille Officielle de Notation Administrative sur 20 points (Décret 2.05.1367)"),
        ("avancement-echelon-grade", "2. Avancement d'Échelon (الترقي في الرتبة) et Avancement de Grade (الترقي في الدرجة)"),
        ("titularisation-cap-eps", "3. Examen de Titularisation (شهادة الكفاءة التربوية CAP) en EPS"),
        ("salaires-indemnites-zones", "4. Salaires, Indemnités (Zones A/B/C, Allocations familiales) et Retenues (Guide MEN p. 58-59)"),
        ("resume-juridique-arabe", "5. الملخص القانوني الشامل بالعربية: التنقيط، الترقية، الكفاءة التربوية والأجور والتعويضات"),
        ("modeles-administratifs", "6. Modèles Officiels : Demande d'Inspection Pédagogique + Fiche d'Avancement (FR/AR)"),
        ("telecharger-pdfs-officiels", "7. Télécharger les 4 Ouvrages Officiels de Législation PDF"),
        ("faq-officielle", "8. FAQ Inspection, Avancement & Concours CRMEF")
    ]

    tpl_ar = """المملكة المغربية
وزارة التربية الوطنية والتعليم الأولي والرياضة
الأكاديمية الجهوية للتربية والتكوين لجهة: [اسم الجهة]
المديرية الإقليمية: [اسم المديرية] | المؤسسة: [اسم المؤسسة]

طلب زيارة تربوية وتفتيش بيداغوجي (أو اجتياز شهادة الكفاءة التربوية / ترقية)
================================================================================
من الأستاذ(ة): [الاسم الكامل للأستاذ(ة)]
رقم التأجير (PPR): [رقم التأجير] | الإطار والدرجة: أستاذ(ة) التربية البدنية والرياضية — الدرجة [الدرجة] — الرتبة [الرتبة]
تاريخ التوظيف: [تاريخ التوظيف] | تاريخ التعيين بالمؤسسة: [التاريخ]
إلى السيد(ة) مفتش(ة) مادة التربية البدنية والرياضية بمديرية [اسم المديرية]
تحت إشراف السيد(ة) المدير(ة) الإقليمي(ة) والسيد(ة) مدير(ة) المؤسسة

الموضوع: طلب برمجة زيارة وتفتيش تربوي برسم الموسم الدراسي [الموسم الدراسي].
المرجع: المرسوم رقم 2.05.1367 المتعلق بمسطرة التنقيط وتقييم موظفي الإدارات العمومية والنظام الأساسي الخاص بموظفي الوزارة.

سلام تام بوجود مولانا الإمام،
وبعد، يشرفني أن ألتمس من سيادتكم التفضل ببرمجة زيارة تربوية وتفتيش بيداغوجي لفائدتي خلال الموسم الدراسي الحالي [الموسم الدراسي]، وذلك قصد:
[ ] تحيين نقطة التفتيش التربوي للترقي في الرتبة أو الدرجة (بالاختيار / الامتحان المهني).
[ ] اجتياز الشق التطبيقي والشفوي لامتحان شهادة الكفاءة التربوية (الترسيم — CAP).
[ ] المواكبة والتأطير البيداغوجي وتقويم الملف التربوي.

وتجدون رفقته نسخة من جدول حصصي الأسبوعي الرسمي والبرمجة السنوية للأنشطة الرياضية (الدورات التدريسية المبرمجة بالمؤسسة).
وتفضلوا، السيد(ة) المفتش(ة)، بقبول فائق التقدير والاحترام.

حرر بـ [المدينة]، في: [التاريخ]
توقيع الأستاذ(ة) المعني(ة):                              خاتم وتوقيع السيد(ة) مدير(ة) المؤسسة:"""

    tpl_fr = """ROYAUME DU MAROC
MINISTÈRE DE L'ÉDUCATION NATIONALE, DU PRÉSCOLAIRE ET DES SPORTS
Académie Régionale (AREF) : [Nom de l'AREF] | Direction Provinciale : [Nom]
Établissement : [Nom du Collège / Lycée]

DEMANDE OFFICIELLE DE VISITE ET D'INSPECTION PÉDAGOGIQUE EN EPS
================================================================================
De : M./Mme [Nom et Prénom du Professeur], Professeur d'EPS — PPR : [Numéro PPR]
Grade et Échelon : [Grade, ex. 2ème Grade / 1er Grade] — Échelon : [Échelon]
Date de recrutement : [Date] | Date d'affectation à l'établissement : [Date]
À : Monsieur / Madame l'Inspecteur(trice) Pédagogique d'Éducation Physique et Sportive
Sous couvert de M./Mme le(la) Directeur(trice) Provincial(e) et de M./Mme le(la) Chef d'Établissement

Objet : Demande de visite d'inspection pédagogique au titre de l'année scolaire [Année scolaire].
Réf. : Décret n° 2.05.1367 fixant la procédure de notation et d'évaluation des fonctionnaires.

Monsieur / Madame l'Inspecteur(trice) Pédagogique,
J'ai l'honneur de solliciter de votre bienveillance la programmation d'une visite d'inspection pédagogique au cours de la présente année scolaire [Année scolaire], en vue de :
[ ] L'actualisation de ma note pédagogique pour l'avancement d'échelon ou de grade (au choix / examen professionnel).
[ ] La passation des épreuves pratiques et orales de l'examen de titularisation (Certificat d'Aptitude Pédagogique — CAP).
[ ] L'encadrement pédagogique et la validation de mon dossier didactique d'EPS.

Vous trouverez ci-joint mon emploi du temps officiel visé par la direction ainsi que la programmation annuelle des cycles d'APS de mes classes.
Veuillez agréer, Monsieur / Madame l'Inspecteur(trice), l'expression de ma considération distinguée.

Fait à [Ville], le [Date]
Signature du Professeur d'EPS :                         Visa et Cachet du Chef d'Établissement :"""

    body_html = f'''
            <div class="info-box">
                <p style="margin:0;"><strong>⚖️ Tout comprendre sur votre carrière, votre notation et votre salaire :</strong> Comment est attribuée la note administrative sur 20 points ? Quels sont les 3 rythmes d'avancement d'échelon (Rapide, Moyen, Lent) et les conditions d'avancement de grade (Examen professionnel vs Choix) ? Comment sont calculés le salaire, les indemnités de zone (A, B, C) et les retenues ? Ce guide synthétise les chapitres 3, 4 et 5 du <strong>Cours de Législation Scolaire de l'ENS Fès (Dr. Khalid Najjari)</strong> et les pages 58-59 du <strong>Guide officiel du Ministère</strong>.</p>
            </div>

            <h2 id="grille-notation-20">1. La Grille Officielle de Notation Administrative sur 20 Points (Décret n° 2.05.1367 — ENS Fès Ch. 3)</h2>
            <p>Conformément au <strong>Décret n° 2.05.1367 du 2 décembre 2005</strong> (Chapitre 3 du cours ENS Fès), chaque fonctionnaire reçoit annuellement une note chiffrée de <strong>0 à 20 points</strong> attribuée par le Chef d'administration / Directeur selon <strong>5 critères réglementaires précis</strong> :</p>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Critère d'Évaluation Officiel (عناصر التنقيط الخمسة)</th>
                            <th>Barème Officiel</th>
                            <th>Application Concrète pour le Professeur d'EPS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>1. Accomplissement des tâches professionnelles (إنجاز الأعمال المرتبطة بالوظيفة)</strong></td>
                            <td><strong>0 à 5 points (/5)</strong></td>
                            <td>Assurer l'intégralité des séances d'EPS, tenue rigoureuse du cahier de textes, fiches de préparation, évaluation sur Massar et animation de l'ASS.</td>
                        </tr>
                        <tr>
                            <td><strong>2. Rendement et Efficacité (المردودية)</strong></td>
                            <td><strong>0 à 5 points (/5)</strong></td>
                            <td>Qualité de l'enseignement sur le terrain, progression motrice des élèves, résultats aux compétitions scolaires ASS/FRMSS et examens du Bac Sport.</td>
                        </tr>
                        <tr>
                            <td><strong>3. Capacité d'organisation (القدرة على التنظيم)</strong></td>
                            <td><strong>0 à 3 points (/3)</strong></td>
                            <td>Organisation sécuritaire des installations sportives, gestion du matériel d'EPS, coordination de l'équipe pédagogique et organisation des tournois inter-classes.</td>
                        </tr>
                        <tr>
                            <td><strong>4. Comportement professionnel (السلوك المهني)</strong></td>
                            <td><strong>0 à 4 points (/4)</strong></td>
                            <td>Assiduité, ponctualité, respect de la déontologie professionnelle, participation aux conseils d'établissement et relations avec l'administration et les collègues.</td>
                        </tr>
                        <tr>
                            <td><strong>5. Recherche et Innovation (البحث والابتكار)</strong></td>
                            <td><strong>0 à 3 points (/3)</strong></td>
                            <td>Innovation didactique, intégration des TICE/outils numériques en EPS, projets sportifs d'établissement et formation continue.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p><strong>Les 5 Mentions d'Appréciation Générale (التقديرات العامة — ENS Fès Ch. 3) :</strong> Excellent / ممتاز (<strong>18 à 20/20</strong>), Très Bien / جيد جدا (<strong>16 à &lt;18/20</strong>), Bien / جيد (<strong>14 à &lt;16/20</strong>), Moyen / متوسط (<strong>10 à &lt;14/20</strong>), Faible / ضعيف (<strong>&lt;10/20</strong>).</p>

            <h2 id="avancement-echelon-grade">2. Avancement d'Échelon (الترقي في الرتبة) et Avancement de Grade (الترقي في الدرجة — ENS Fès Ch. 3)</h2>
            <div class="step-card">
                <h3 style="margin-top:0;">📈 A. Les 3 Rythmes d'Avancement d'Échelon (نسق الترقي في الرتبة)</h3>
                <p>Le passage d'un échelon au suivant dépend de la moyenne des notes obtenues :</p>
                <ul>
                    <li><strong>Rythme Rapide (النسق السريع) :</strong> Moyenne <strong>&ge; 16/20</strong> (ou &ge; 14/20 selon grilles d'application ministérielles). Passage en 1 an (échelons 1-&gt;2, 2-&gt;3), puis 2 ans (échelons 3-&gt;4, 4-&gt;5, 5-&gt;6), puis 3 ans (échelons 6-&gt;7 à 9-&gt;10).</li>
                    <li><strong>Rythme Moyen (النسق المتوسط) :</strong> Moyenne comprise entre <strong>10 et &lt;16/20</strong> (1 an, puis 2 ans et demi, puis 3 ans et demi).</li>
                    <li><strong>Rythme Lent (النسق البطيء) :</strong> Moyenne <strong>&lt; 10/20</strong> (1 an, puis 3 ans, puis 4 ans). L'passage de l'échelon 10 à l'échelon exceptionnel (الرتبة الاستثنائية) s'effectue après 2 ans d'ancienneté à l'échelon 10 dans la limite du quota de 10%.</li>
                </ul>
            </div>

            <div class="step-card">
                <h3 style="margin-top:0;">🏅 B. Les 2 Voies d'Avancement de Grade (الترقي في الدرجة / السلم)</h3>
                <ul>
                    <li><strong>1. Par Examen d'Aptitude Professionnelle (الامتحان المهني) :</strong> Ouvert aux professeurs justifiant d'au moins <strong>6 ans d'ancienneté dans le grade (6 سنوات أقدمية في الدرجة)</strong>, dans la limite d'un quota annuel de <strong>13%</strong> (ou 14% selon accords sectoriels) des candidats remplissant la condition.</li>
                    <li><strong>2. Au Choix après inscription au Tableau d'Avancement (الترقي بالاختيار) :</strong> Ouvert aux professeurs justifiant d'au moins <strong>10 ans d'ancienneté dans le grade (10 سنوات أقدمية في الدرجة)</strong> (ou 5 ans à l'échelon 7 pour l'accès au Hors Échelle / الدرجة الممتازة), dans la limite du quota annuel réglementaire après avis de la Commission Administrative Paritaire (CAP).</li>
                </ul>
            </div>

            <h2 id="titularisation-cap-eps">3. L'Examen de Titularisation en EPS (شهادة الكفاءة التربوية — الترسيم — ENS Fès Ch. 3)</h2>
            <p>Après son année de stage (التدريب), le professeur stagiaire passe l'examen de certification / titularisation devant une commission présidée par l'Inspecteur pédagogique d'EPS :</p>
            <ul>
                <li><strong>Deux séances pratiques d'EPS (درسان تطبيقيان في أنشطتين رياضيتين مختلفتين) :</strong> Notées chacune sur 20 points (Total pratique : <strong>40 points</strong> — ex. un sport collectif et une activité athlétique ou gymnique).</li>
                <li><strong>Un entretien oral (اختبار شفوي — 20 points) :</strong> Portant sur la didactique de l'EPS, l'analyse des séances présentées, les Orientations Pédagogiques 2007/2009 et la <strong>législation scolaire et déontologie du métier</strong>.</li>
                <li>En cas d'échec, le stage peut être prolongé d'une seconde et dernière année.</li>
            </ul>

            <h2 id="salaires-indemnites-zones">4. Salaires, Indemnités (Zones A, B, C) et Retenues de l'Enseignant au Maroc (Guide MEN p. 58-59 &amp; ENS Fès Ch. 4-5)</h2>
            <p>Conformément aux pages 58 et 59 du <strong>Guide officiel du Ministère (الأجور والتعويضات والاقتطاعات)</strong> et aux chapitres 4 et 5 du cours de l'ENS Fès, la rémunération mensuelle du professeur d'EPS se compose de :</p>
            <ul>
                <li><strong>1. Le Traitement de Base (المرتب الأساسي) :</strong> Calculé sur la base du numéro indiciaire (الرقم الاستدلالي) correspondant au grade et à l'échelon.</li>
                <li><strong>2. L'Indemnité de Résidence (التعويض عن الإقامة — حسب المناطق) :</strong>
                    <ul>
                        <li><strong>Zone A (المنطقة أ) :</strong> <strong>25%</strong> du traitement de base (provinces sahariennes et zones éloignées classées A).</li>
                        <li><strong>Zone B (المنطقة ب) :</strong> <strong>15%</strong> du traitement de base.</li>
                        <li><strong>Zone C (المنطقة ج) :</strong> <strong>10%</strong> du traitement de base (grandes agglomérations urbaines).</li>
                    </ul>
                </li>
                <li><strong>3. Les Indemnités Statutaires du Corps Enseignant (التعويضات النظامية) :</strong> Indemnité d'enseignement (التعويض عن التعليم), Indemnité de charges (التعويض عن الأعباء), et Indemnité d'encadrement (التعويض عن التأطير — à partir du 1er Grade / Échelle 11 et Hors Échelle).</li>
                <li><strong>4. Les Allocations Familiales (التعويضات العائلية — Guide MEN p. 59) :</strong> Accordées dans la limite de 6 enfants (<strong>300 DH</strong> par enfant pour les 3 premiers selon la revalorisation récente / historiquement 200 DH pour les 2 premiers et 36 DH suivants dans le texte de base p. 59) + Prime de naissance (منحة الازدياد : <strong>150 DH</strong> au 1er enfant).</li>
                <li><strong>5. Les Retenues Légales à la Source (الاقتطاعات الإجبارية من المنبع) :</strong> Caisse Marocaine des Retraites (<strong>CMR — الصندوق المغربي للتقاعد</strong>), Impôt sur le Revenu (<strong>IR — الضريبة العامة على الدخل</strong>), Assurance Maladie Obligatoire et Mutuelle Générale de l'Éducation Nationale (<strong>CNOPS / MGEN — التعاضدية العامة للتربية الوطنية</strong>).</li>
            </ul>

            <div class="arabic-law-box" id="resume-juridique-arabe" dir="rtl">
                <h3>🇲🇦 الملخص القانوني الرسمي بالعربية: التفتيش، التنقيط (/20)، الترقية والأجور (دليل الوزارة ص 58-59 ودرس ENS فاس)</h3>
                <ul>
                    <li><strong>عناصر النقطة العددية الممنوحة للموظف من 0 إلى 20 (المرسوم 2.05.1367):</strong> إنجاز الأعمال المرتبطة بالوظيفة (<strong>5 نقط</strong>)، المردودية (<strong>5 نقط</strong>)، القدرة على التنظيم (<strong>3 نقط</strong>)، السلوك المهني (<strong>4 نقط</strong>)، البحث والابتكار (<strong>3 نقط</strong>).</li>
                    <li><strong>شروط الترقي في الدرجة (السلم):</strong> يتم إما عن طريق <strong>الامتحان المهني</strong> بعد قضاء <strong>6 سنوات</strong> على الأقل في الدرجة (في حدود حصيص 13%/14%)، أو عن طريق <strong>الاختيار</strong> بعد التسجيل في جدول الترقي لمالكي أقدمية <strong>10 سنوات</strong> في الدرجة (أو 5 سنوات في الرتبة 7 للولوج إلى الدرجة الممتازة خارج السلم).</li>
                    <li><strong>مكونات أجرة أستاذ التربية البدنية (دليل التشريع ص 58-59):</strong> تتكون الأجرة من <strong>المرتب الأساسي</strong> (حسب الرقم الاستدلالي)، و<strong>التعويض عن الإقامة</strong> (المنطقة أ: <strong>25%</strong>، المنطقة ب: <strong>15%</strong>، المنطقة ج: <strong>10%</strong>)، و<strong>التعويضات النظامية</strong> (التعويض عن التعليم، الأعباء، والتأطير)، و<strong>التعويضات العائلية</strong>، مع خصم اقتطاعات التقاعد (CMR) والتغطية الصحية (CNOPS/MGEN) والضريبة على الدخل (IR).</li>
                </ul>
            </div>

            {build_dual_templates_html(
                "inspection-avancement",
                "Modèle Officiel n°6 : Demande de Visite d'Inspection Pédagogique / Titularisation CAP / Avancement",
                "النموذج الإداري رقم 6: طلب برمجة زيارة وتفتيش تربوي (لتحيين النقطة أو الترقية أو اجتياز الكفاءة التربوية)",
                tpl_ar,
                tpl_fr
            )}

            {get_official_pdf_download_box()}
'''

    faq_list = [
        (
            "Quels sont les 5 critères officiels de la grille de notation administrative sur 20 points au Maroc (Décret 2.05.1367) ?",
            "Les 5 critères officiels sont : 1) Accomplissement des tâches professionnelles (/5 pts), 2) Rendement (/5 pts), 3) Capacité d'organisation (/3 pts), 4) Comportement professionnel (/4 pts), et 5) Recherche et innovation (/3 pts), soit un total sur 20 points."
        ),
        (
            "Quelle est l'ancienneté requise pour passer l'examen d'aptitude professionnelle (الامتحان المهني) ou bénéficier de l'avancement au choix (بالاختيار) ?",
            "L'examen d'aptitude professionnelle exige au moins 6 ans d'ancienneté dans le grade actuel. L'avancement au choix (après inscription au tableau d'avancement) exige au moins 10 ans d'ancienneté dans le grade."
        ),
        (
            "ما هي نسب التعويض عن الإقامة حسب المناطق (أ، ب، ج) في الوظيفة العمومية بالمغرب؟",
            "حسب دليل التشريع المدرسي للوزارة (ص 58) ودرس المدرسة العليا للأساتذة بفاس، يحدد التعويض عن الإقامة من المرتب الأساسي في: 25% للمنطقة (أ)، و15% للمنطقة (ب)، و10% للمنطقة (ج)."
        ),
        (
            "Comment se déroule l'examen de titularisation (شهادة الكفاءة التربوية CAP) pour le professeur d'EPS ?",
            "Il comporte deux séances pratiques d'EPS devant le jury d'inspection dans deux APS différentes (notées chacune sur 20, soit 40 points) et une épreuve orale (sur 20 points) portant sur la didactique de l'EPS, les Orientations Pédagogiques 2007/2009 et la législation scolaire."
        )
    ]

    html = build_bilingual_legislation_article(
        filename, title, meta_desc, badge, h1_fr, h1_ar, ref_label, read_time, toc_items, body_html, faq_list, breadcrumb_name
    )
    with open(os.path.join(PUBLIC_DIR, filename), "w", encoding="utf-8") as f:
        f.write(html)
    print(f"[ARTICLE 6 OK] {filename}")


# ==============================================================================
# ARTICLE 7 : CONSEILS D'ÉTABLISSEMENT (2.02.376), CONSEIL DE DISCIPLINE & CONFLITS
# ==============================================================================
def create_article_7():
    filename = "conseil-discipline-conseils-etablissement-incident-eps-maroc.html"
    title = "Conseils de l'Établissement (Décret 2.02.376), Règlement Intérieur & Conseil de Discipline Élève en EPS | ProfEPS"
    meta_desc = "Guide officiel des 4 Conseils de l'établissement (Décret 2.02.376), du Règlement intérieur (Guide MEN p.26-31 : récompenses, sanctions, absences d'élèves) et de la gestion des conflits (FADEEP p.28) en EPS au Maroc. Modèle de rapport d'incident FR/AR."
    badge = "⚖️ Législation Scolaire · Décret n° 2.02.376 · Guide MEN p. 26-31 &amp; FADEEP p. 28"
    h1_fr = "Conseils de l'Établissement (Décret 2.02.376), Règlement Intérieur, Conseil de Discipline Élève et Gestion des Conflits en EPS"
    h1_ar = "مجالس المؤسسة (المرسوم 2.02.376)، النظام الداخلي، المجلس التأديبي للتلاميذ وتدبير النزاعات في حصة التربية البدنية"
    ref_label = "Décret n° 2.02.376 du 17 Juillet 2002 · Guide MEN (p. 26-31) · FADEEP (p. 17 & 28)"
    read_time = "18 min de lecture (Bilingue FR/AR)"
    breadcrumb_name = "Conseils d'Établissement (2.02.376) & Conseil de Discipline"

    toc_items = [
        ("quatre-conseils-decret", "1. Les 4 Conseils de l'Établissement selon le Décret n° 2.02.376 (FADEEP p. 17)"),
        ("reglement-interieur-sanctions", "2. Règlement Intérieur : Absences d'élèves, Récompenses & Sanctions (Guide MEN p. 28-31)"),
        ("gestion-conflits-fadeep", "3. Gestion des incidents en EPS & Cellules d'écoute (لجنة الحكماء وخلايا الإنصات — FADEEP p. 28)"),
        ("resume-juridique-arabe", "4. الملخص القانوني بالعربية: مجالس المؤسسة الأربعة، العقوبات والجزاءات وتدبير النزاعات"),
        ("modeles-administratifs", "5. Modèle Officiel : Rapport d'Incident Disciplinaire d'Élève en Séance d'EPS (FR/AR)"),
        ("telecharger-pdfs-officiels", "6. Télécharger les 4 Ouvrages Officiels de Législation PDF"),
        ("faq-officielle", "7. FAQ Conseils d'Établissement, Discipline & Concours CRMEF")
    ]

    tpl_ar = """المملكة المغربية
وزارة التربية الوطنية والتعليم الأولي والرياضة
الأكاديمية الجهوية للتربية والتكوين لجهة: [اسم الجهة]
المديرية الإقليمية: [اسم المديرية] | المؤسسة: [اسم المؤسسة]

تقرير تربوي وإداري حول سلوك غير منضبط / شغب تلميذ(ة) أثناء حصة التربية البدنية
(يرفع إلى السيد مدير المؤسسة ورئيس مجلس القسم — طبقاً للمرسوم رقم 2.02.376 والنظام الداخلي للمؤسسة)

من الأستاذ(ة): [الاسم الكامل للأستاذ(ة)] — رقم التأجير (PPR): [رقم التأجير]
أستاذ(ة) مادة التربية البدنية والرياضية بالمؤسسة
إلى السيد(ة) مدير(ة) المؤسسة المحترم(ة) — (عن طريق الحراسة العامة للخارجية)

الموضوع: تقرير بخصوص مخالفة انضباطية جسيمة ارتكبها التلميذ(ة) [الاسم الكامل للتلميذ(ة)].

سلام تام بوجود مولانا الإمام،
وبعد، يشرفني أن أنهي إلى علمكم أنه بتاريخ [اليوم/الشهر/السنة]، على الساعة [الساعة]، وخلال حصة التربية البدنية الخاصة بقسم [اسم القسم]، أقدم التلميذ(ة) [الاسم الكامل للتلميذ(ة)] (رقم مسار: [رقم مسار]) على ارتكاب سلوك منافي لمقتضيات النظام الداخلي للمؤسسة ولشروط السلامة التربوية.

1. الوقائع المادية للمخالفة المسجلة:
أثناء سير الحصة التدريسية، قام التلميذ(ة) المعني(ة) بـ [وصف موضوعي ودقيق للوقائع دون انفعال: رفض الامتثال للتعليمات التربوية والأمنية / عرقلة سير الحصة / التلفظ بعبارات غير لائقة / تعريض سلامة زملائه للخطر أو إتلاف متعمد للعتاد الرياضي].

2. التلاميذ الشهود الحاضرون:
- التلميذ(ة) 1: [الاسم الكامل] | التلميذ(ة) 2: [الاسم الكامل]

3. الإجراءات التربوية المتخذة فوراً من طرف الأستاذ(ة):
- التحلي بضبط النفس التام وتفادي أي رد فعل لفظي أو جسدي.
- تنبيه التلميذ(ة) شفوياً وتهدئة الوضع لضمان السير العادي والآمن للحصة لباقي المتعلمين.
- إشعار السيد الحارس العام للخارجية ومرافقة التلميذ(ة) إلى مكتب الإدارة التربوية.

4. الملتمس التربوي والإداري:
ألتمس من سيادتكم استدعاء ولي أمر التلميذ(ة) وتفعيل المقتضيات التربوية والتأديبية المنصوص عليها في النظام الداخلي للمؤسسة (أو عرض الملف على لجنة الحكماء / مجلس القسم المنعقد كهيئة تأديبية طبقاً للمرسوم 2.02.376).

حرر بـ [المدينة]، في: [التاريخ]
توقيع أستاذ(ة) التربية البدنية والرياضية:                  تأشيرة الحراسة العامة وإدارة المؤسسة:"""

    tpl_fr = """ROYAUME DU MAROC
MINISTÈRE DE L'ÉDUCATION NATIONALE, DU PRÉSCOLAIRE ET DES SPORTS
Académie Régionale (AREF) : [Nom de l'AREF] | Direction Provinciale : [Nom]
Établissement : [Nom du Collège / Lycée]

RAPPORT D'INCIDENT DISCIPLINAIRE SURVENU EN SÉANCE D'EPS
(Saisine de la Direction et du Conseil de Classe — Réf. Décret n° 2.02.376 et Règlement Intérieur)

De : M./Mme [Nom et Prénom du Professeur], Professeur d'EPS — PPR : [Numéro PPR]
À : Monsieur / Madame le(la) Directeur(trice) de l'établissement (Sous couvert de la Surveillance Générale)

Objet : Rapport relatif à un manquement grave à la discipline commis par l'élève [Nom et Prénom de l'élève].

Monsieur / Madame le(la) Directeur(trice),
J'ai l'honneur de porter à votre connaissance qu'en date du [JJ/MM/AAAA] à [Heure], durant la séance d'Éducation Physique et Sportive de la classe de [Classe], l'élève [Nom et Prénom de l'élève] (Code Massar : [Code Massar]) a adopté un comportement gravement contraire au Règlement Intérieur de l'établissement et aux consignes de sécurité.

1. EXPOSÉ OBJECTIF ET FACTUEL DES FAITS :
Au cours de la séance consacrée à l'activité [Nom de l'APS], l'élève susmentionné(e) a [décrire précisément et sobrement les faits : refusé délibérément d'appliquer les consignes de sécurité / perturbé gravement le déroulement du cours / proféré des propos irrespectueux / dégradé volontairement le matériel pédagogique d'EPS ou mis en danger l'intégrité physique d'un camarade].

2. ÉLÈVES TÉMOINS DE L'INCIDENT :
- Témoin 1 : [Nom et Prénom] | Témoin 2 : [Nom et Prénom]

3. MESURES PÉDAGOGIQUES IMMÉDIATES PRISES PAR L'ENSEIGNANT :
- Maîtrise calme de la situation et mise en sécurité du groupe classe sans aucune altercation.
- Rappel immédiat des règles du règlement intérieur et signalement de l'élève auprès du bureau du Surveillant Général.

4. DEMANDE DE SUIVI ADMINISTRATIF ET DISCIPLINAIRE :
Je vous prie de bien vouloir convoquer le tuteur légal de l'élève et appliquer les mesures éducatives et disciplinaires prévues par le Règlement Intérieur et le Décret n° 2.02.376 (saisine de la cellule d'écoute / Conseil de classe siégeant en conseil de discipline).

Fait à [Ville], le [Date]
Signature du Professeur d'EPS :                         Visa de la Surveillance Générale et de la Direction :"""

    body_html = f'''
            <div class="info-box">
                <p style="margin:0;"><strong>⚖️ Gouvernance scolaire et gestion de la discipline en EPS :</strong> Quels sont les 4 Conseils de l'établissement institués par le <strong>Décret n° 2.02.376 du 17 juillet 2002 (المرسوم 2.02.376 بمثابة النظام الأساسي الخاص بمؤسسات التربية والتعليم العمومي)</strong> ? Que prévoit exactement le Règlement Intérieur ministériel (<strong>Guide MEN p. 28-31</strong>) pour les absences d'élèves, les récompenses et les sanctions ? Comment fonctionne la gestion des conflits (<strong>لجنة الحكماء وخلايا الإنصات — FADEEP p. 28</strong>) ?</p>
            </div>

            <h2 id="quatre-conseils-decret">1. Les 4 Conseils de l'Établissement selon le Décret n° 2.02.376 (مجالس المؤسسة الأربعة — FADEEP p. 17)</h2>
            <p>Le <strong>Décret n° 2.02.376 du 6 Joumada I 1423 (17 juillet 2002)</strong> structure la gouvernance participative de chaque collège et lycée marocain autour de <strong>4 conseils officiels</strong> dans lesquels le professeur d'EPS joue un rôle central :</p>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Nom du Conseil (اسم المجلس)</th>
                            <th>Composition &amp; Rythme des Réunions</th>
                            <th>Attributions &amp; Rôle du Professeur d'EPS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>1. Conseil de Gestion (مجلس التدبير)</strong></td>
                            <td>Présidé par le Directeur + représentants élus des enseignants, cadres administratifs, Association des parents d'élèves, conseil communal (et 2 élèves au lycée qualifiant). Se réunit au moins <strong>2 fois par an</strong>.</td>
                            <td>Adopte le <strong>Règlement Intérieur (النظام الداخلي)</strong>, le projet d'établissement, le programme d'action annuel (dont les activités sportives ASS) et examine les besoins matériels et budgétaires.</td>
                        </tr>
                        <tr>
                            <td><strong>2. Conseil Pédagogique (المجلس التربوي)</strong></td>
                            <td>Présidé par le Directeur + 1 représentant des enseignants par niveau/matière (souvent le coordonnateur d'EPS), Conseiller d'orientation, Président de l'Association des parents. Au moins <strong>2 réunions par an</strong>.</td>
                            <td>Élabore les programmes annuels d'activités pédagogiques et para-scolaires, coordonne entre les disciplines et organise les examens et activités culturelles et sportives.</td>
                        </tr>
                        <tr>
                            <td><strong>3. Conseil d'Enseignement d'EPS (المجلس التعليمي لمادة ت.ب.ر)</strong></td>
                            <td>Présidé par le Directeur + <strong>tous les professeurs d'EPS de l'établissement</strong> (animé par le Coordonnateur d'EPS). Se réunit au moins <strong>2 fois par an</strong> (début et fin d'année).</td>
                            <td>Établit la <strong>programmation annuelle des cycles d'APS</strong>, répartit les installations sportives (plateau d'EPS) et le matériel, analyse les résultats des élèves et harmonise les barèmes d'évaluation.</td>
                        </tr>
                        <tr>
                            <td><strong>4. Conseils de Classe (مجالس الأقسام)</strong></td>
                            <td>Présidé par le Directeur + tous les enseignants de la classe + représentant des parents d'élèves. Se réunit à la fin de chaque semestre.</td>
                            <td>Examine les résultats scolaires des élèves, décide du passage/redoublement/orientation, et <strong>siège en tant que Conseil de Discipline des élèves (مجلس الانضباط/التأديب)</strong> pour attribuer les récompenses ou prononcer les sanctions.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 id="reglement-interieur-sanctions">2. Règlement Intérieur : Absences d'Élèves, Tableau des Récompenses &amp; Sanctions (Guide MEN p. 28-31)</h2>
            <p>Le <strong>Guide officiel du Ministère (pages 28 à 31 : مقتضيات خاصة بالنظام الداخلي للمؤسسة)</strong> fixe avec une précision mathématique le traitement des absences d'élèves, les récompenses et les sanctions :</p>
            <ul>
                <li><strong>Procédure légale en cas d'absences répétées d'un élève (Guide MEN p. 29-30) :</strong>
                    <ul>
                        <li><strong>8 heures d'absences non consécutives dans le mois :</strong> Convocation écrite du tuteur légal, qui signe un engagement écrit (التزام كتابي) de suivi d'assiduité.</li>
                        <li><strong>1 semaine complète d'absence continue sans motif :</strong> Envoi d'une correspondance écrite au tuteur par le Surveillant Général.</li>
                        <li><strong>2 semaines d'absence continue :</strong> Envoi d'une lettre recommandée (رسالة مضمونة) invitant le tuteur à justifier l'absence ou déclarer l'abandon.</li>
                        <li><strong>1 mois complet d'absence continue sans réponse :</strong> Radiation de l'élève des listes officielles (التشطيب على التلميذ) après épuisement des relances.</li>
                    </ul>
                </li>
                <li><strong>Barème officiel des Récompenses et Sanctions du Conseil de Classe (Guide MEN p. 30-31) :</strong>
                    <ul>
                        <li><strong>Récompenses (المكافآت التشجيعية) :</strong> Tableau d'Honneur / لوحة الشرف (Moyenne <strong>&ge; 12/20</strong>), Encouragements / التشجيع (Moyenne <strong>&ge; 13/20</strong>), Félicitations / التهنئة (Moyenne <strong>&ge; 15/20</strong>).</li>
                        <li><strong>Sanctions de travail (العقوبات المتعلقة بالنتائج) :</strong> Avertissement / التنبيه (Moyenne <strong>&le; 07/20</strong>), Mise en garde / الإنذار (Moyenne <strong>&le; 05/20</strong>), Blâme / التوبيخ (Moyenne <strong>&le; 04/20</strong>).</li>
                        <li><strong>Sanctions disciplinaires comportementales :</strong> Avertissement écrit, Blâme versé au dossier, Exclusion temporaire de 1 à 7 jours (avec travaux d'intérêt éducatif), Changement d'établissement ou Exclusion définitive (sur décision du Conseil de classe validée par l'AREF/Direction Provinciale pour les élèves non soumis à l'âge de scolarité obligatoire). <em>Attention : Le professeur d'EPS n'a jamais le droit d'exclure un élève hors de l'établissement pendant l'heure de cours (l'élève reste sous la garde de l'administration).</em></li>
                    </ul>
                </li>
            </ul>

            <h2 id="gestion-conflits-fadeep">3. Gestion Pédagogique des Conflits : Comité des Sages &amp; Cellules d'Écoute (FADEEP p. 28)</h2>
            <p>Le <strong>Module FADEEP (page 28 : تدبير النزاعات في الوسط المدرسي)</strong> recommande de privilégier les mécanismes de médiation pédagogique avant la sanction lourde :</p>
            <ul>
                <li><strong>Les Cellules d'Écoute et de Médiation (خلايا الإنصات والوساطة) :</strong> Accompagnement psychopédagogique des élèves en difficulté comportementale.</li>
                <li><strong>Le Comité des Sages de l'Établissement (لجنة الحكماء بالمؤسسة) :</strong> Instance interne de conciliation permettant de désamorcer les tensions entre élèves ou entre un élève et un enseignant dans le respect de la dignité de l'école publique.</li>
            </ul>

            <div class="arabic-law-box" id="resume-juridique-arabe" dir="rtl">
                <h3>🇲🇦 الملخص القانوني الرسمي بالعربية: مجالس المؤسسة (المرسوم 2.02.376)، النظام الداخلي وتدبير النزاعات</h3>
                <ul>
                    <li><strong>مجالس المؤسسة الأربعة (المرسوم رقم 2.02.376 الصادر في 17 يوليوز 2002):</strong>
                        1) <strong>مجلس التدبير</strong> (المصادقة على النظام الداخلي ومشروع المؤسسة وبرنامج العمل السنوي)،
                        2) <strong>المجلس التربوي</strong> (إعداد البرامج السنوية للأنشطة التربوية والموازية)،
                        3) <strong>المجالس التعليمية</strong> (التنسيق بين أساتذة مادة التربية البدنية، توزيع الملاعب والعتاد والبرمجة السنوية للدورات)،
                        4) <strong>مجالس الأقسام</strong> (دراسة نتائج التلاميذ والانعقاد كـ <strong>مجلس انضباط/تأديب</strong> لاقتراح العقوبات).</li>
                    <li><strong>عتبات المكافآت والعقوبات في النظام الداخلي (دليل التشريع ص 31):</strong> تمنح لوحة الشرف ابتداءً من معدل <strong>12/20</strong>، والتشجيع من <strong>13/20</strong>، والتهنئة من <strong>15/20</strong>؛ بينما يوجه التنبيه عند معدل <strong>07/20 فما دون</strong>، والإنذار عند <strong>05/20 فما دون</strong>، والتوبيخ عند <strong>04/20 فما دون</strong>.</li>
                    <li><strong>منع طرد التلميذ إلى الشارع أثناء الحصة:</strong> في حالة شغب تلميذ أثناء حصة التربية البدنية، يمنع طرده خارج أسوار المؤسسة (لأنه تحت الحراسة القانونية للمؤسسة)، بل يوجه مرفوقاً إلى مكتب الحراسة العامة مع تحرير <strong>تقرير مكتوب</strong> يرفع إلى المدير ومجلس القسم.</li>
                </ul>
            </div>

            {build_dual_templates_html(
                "conseil-discipline-eleve",
                "Modèle Officiel n°7 : Rapport d'Incident Disciplinaire d'Élève en Séance d'EPS (Saisine du Conseil de Classe)",
                "النموذج الإداري رقم 7: تقرير تربوي وإداري حول مخالفة انضباطية لتلميذ أثناء حصة التربية البدنية",
                tpl_ar,
                tpl_fr
            )}

            {get_official_pdf_download_box()}
'''

    faq_list = [
        (
            "Quel texte juridique régit l'organisation et les conseils des établissements scolaires publics au Maroc ?",
            "Il s'agit du Décret n° 2.02.376 du 6 Joumada I 1423 (17 juillet 2002) formant statut particulier des établissements d'éducation et d'enseignement public, qui institue 4 conseils : le Conseil de gestion (مجلس التدبير), le Conseil pédagogique (المجلس التربوي), les Conseils d'enseignement (المجالس التعليمية) et les Conseils de classe (مجالس الأقسام)."
        ),
        (
            "Le professeur d'EPS a-t-il le droit de renvoyer un élève perturbateur hors de l'établissement pendant sa séance ?",
            "Non, jamais. Tant que la séance est inscrite à l'emploi du temps officiel, l'élève est sous la garde juridique de l'établissement. Si le comportement d'un élève met en péril la sécurité du cours, le professeur le confie au Surveillant Général (à l'intérieur de l'établissement) et rédige un rapport écrit."
        ),
        (
            "ما هو المجلس المختص قانونياً باقتراح العقوبات التأديبية في حق التلاميذ المخالفين للنظام الداخلي؟",
            "حسب المرسوم رقم 2.02.376، فإن 'مجلس القسم' (Conseil de classe) هو الهيئة المختصة التي تنعقد بصفة مجلس للانضباط (مجلس تأديبي) لدراسة الحالات التأديبية للتلاميذ واقتراح العقوبات التربوية أو التأديبية المناسبة."
        ),
        (
            "Quels sont les seuils officiels du Tableau d'Honneur, des Encouragements et des Félicitations selon le Guide MEN (p. 31) ?",
            "Selon la page 31 du Guide ministériel, le Tableau d'Honneur (لوحة الشرف) est accordé à partir de 12/20, les Encouragements (التشجيع) à partir de 13/20, et les Félicitations (التهنئة) à partir de 15/20."
        )
    ]

    html = build_bilingual_legislation_article(
        filename, title, meta_desc, badge, h1_fr, h1_ar, ref_label, read_time, toc_items, body_html, faq_list, breadcrumb_name
    )
    with open(os.path.join(PUBLIC_DIR, filename), "w", encoding="utf-8") as f:
        f.write(html)
    print(f"[ARTICLE 7 OK] {filename}")


# ==============================================================================
# ARTICLE 8 : COMMISSIONS PARITAIRES (CAP), CONSEIL DE DISCIPLINE PROF & ÉTHIQUE
# ==============================================================================
def create_article_8():
    filename = "commissions-paritaires-conseil-discipline-enseignant-maroc-droits.html"
    title = "Commissions Paritaires (CAP), Conseil de Discipline de l'Enseignant & Éthique (Note 46) au Maroc | ProfEPS"
    meta_desc = "Guide complet des Commissions Administratives Paritaires (اللجان الإدارية المتساوية الأعضاء Décret 2.59.0200), du Conseil de discipline du fonctionnaire (sanctions Art. 66, 12 garanties, effacement 5/10 ans) et de l'éthique professionnelle (Note 46 — Guide MEN p. 49-52 & 60-92)."
    badge = "⚖️ Droits &amp; Garanties du Fonctionnaire · Décret 2.59.0200 · Guide MEN p. 49-92"
    h1_fr = "Commissions Administratives Paritaires (CAP), Conseil de Discipline de l'Enseignant, Garanties Légales et Éthique Professionnelle (Note 46)"
    h1_ar = "اللجان الإدارية المتساوية الأعضاء (CAP)، المجلس التأديبي للموظف، الضمانات القانونية، سحب العقوبات وأخلاقيات المهنة (المذكرة 46)"
    ref_label = "Décret n° 2.59.0200 · Art. 65-75 Statut Général · Note n° 46 (Guide MEN p. 49-52 & 60-92)"
    read_time = "21 min de lecture (Bilingue FR/AR)"
    breadcrumb_name = "Commissions Paritaires (CAP), Discipline & Éthique"

    toc_items = [
        ("commissions-paritaires-cap", "1. Les Commissions Administratives Paritaires (CAP — Décret 2.59.0200, Guide MEN p. 60-74)"),
        ("echelle-sanctions-enseignant", "2. Échelle officielle des sanctions disciplinaires (Titulaires vs Stagiaires — Guide MEN p. 49-50)"),
        ("douze-garanties-effacement", "3. Les 12 Garanties Légales du Fonctionnaire & Effacement des Sanctions (5 ans / 10 ans)"),
        ("ethique-note-46", "4. Éthique de la profession & Note Ministérielle n° 46 (ميثاق حسن سلوك الموظف — MEN p. 75-92)"),
        ("resume-juridique-arabe", "5. الملخص القانوني الشامل بالعربية: اللجان الثنائية، العقوبات التأديبية، الضمانات وسحب العقوبة"),
        ("modeles-administratifs", "6. Modèles Officiels : Demande de Consultation du Dossier + Demande d'Effacement de Sanction (FR/AR)"),
        ("telecharger-pdfs-officiels", "7. Télécharger les 4 Ouvrages Officiels de Législation PDF"),
        ("faq-officielle", "8. FAQ CAP, Conseil de Discipline & Concours CRMEF")
    ]

    tpl_ar = """المملكة المغربية
وزارة التربية الوطنية والتعليم الأولي والرياضة
الأكاديمية الجهوية للتربية والتكوين لجهة: [اسم الجهة]
المديرية الإقليمية: [اسم المديرية] | المؤسسة: [اسم المؤسسة]

[النموذج 1]: طلب سحب عقوبة تأديبية ومحو آثارها من الملف الإداري (الفصل 75 من النظام الأساسي العام)
================================================================================
من الأستاذ(ة): [الاسم الكامل للأستاذ(ة)] — رقم التأجير (PPR): [رقم التأجير]
الإطار والدرجة: أستاذ(ة) التربية البدنية والرياضية — الدرجة [الدرجة]
العامل(ة) بمؤسسة: [اسم المؤسسة] — مديرية: [اسم المديرية]
إلى السيد(ة) مدير(ة) الأكاديمية الجهوية للتربية والتكوين لجهة [اسم الجهة]
تحت إشراف السلم الإداري (السيد مدير المؤسسة والسيد المدير الإقليمي)

الموضوع: طلب سحب عقوبة تأديبية من ملفي الإداري بعد انصرام الأجل القانوني.
المرجع: الفصل 75 من الظهير الشريف رقم 1.58.008 الصادر في 24 فبراير 1958 بمثابة النظام الأساسي العام للوظيفة العمومية.

سلام تام بوجود مولانا الإمام،
وبعد، طبقا لمقتضيات الفصل 75 من النظام الأساسي العام للوظيفة العمومية، يشرفني أن ألتمس من سيادتكم التفضل بإصدار قرار يقضي بسحب العقوبة التأديبية المتمثلة في [طبيعة العقوبة: الإنذار / التوبيخ (5 سنوات) — أو عقوبة أخرى (10 سنوات)] الصادرة في حقي بتاريخ [تاريخ القرار التأديبي] تحت رقم [رقم القرار]، ومحو جميع آثارها من ملفي الإداري بحيث يعاد تكوينه في صورته الجديدة.
وأحيط سيادتكم علماً بأن الأجل القانوني المحدد في [خمس (5) سنوات بالنسبة للإنذار أو التوبيخ / عشر (10) سنوات بالنسبة لباقي العقوبات] قد انصرم كاملاً دون أن تصدر في حقي أي عقوبة تأديبية أخرى، وقد أبنت طيلة هذه المدة عن سلوك مهني وتربوي مثالي.
وتفضلوا، السيد(ة) المدير(ة)، بقبول فائق التقدير والاحترام.
حرر بـ [المدينة]، في: [التاريخ] — إمضاء الأستاذ(ة):

--------------------------------------------------------------------------------
[النموذج 2]: طلب الاطلاع على الملف التأديبي والوثائق الملحقة به (حق الدفاع — الفصل 67)
================================================================================
من الأستاذ(ة): [الاسم الكامل للأستاذ(ة)] — رقم التأجير (PPR): [رقم التأجير]
إلى السيد(ة) مدير(ة) الأكاديمية الجهوية للتربية والتكوين (رئيس(ة) المجلس التأديبي)

الموضوع: طلب الاطلاع الكامل على ملفي الشخصي وجميع الوثائق الملحقة بملف المتابعة التأديبية.
المرجع: الفصل 67 من الظهير الشريف رقم 1.58.008 المتعلق بالضمانات التأديبية للموظف.

سلام تام بوجود مولانا الإمام،
وبعد، تبعا للاستدعاء الموجه إلي للمثول أمام اللجنة الإدارية المتساوية الأعضاء المنعقدة كمجلس تأديبي بتاريخ [تاريخ الجلسة]، وتفعيلاً للضمانات القانونية المنصوص عليها في الفصل 67 من النظام الأساسي العام للوظيفة العمومية، ألتمس من سيادتكم تمكيني (أو تمكين المدافع عني الأستاذ(ة) [اسم المحامي أو المدافع]) من الاطلاع على ملفي الشخصي بتمامه وعلى جميع الوثائق والتقارير الملحقة به قبل انعقاد الجلسة.
وتفضلوا بقبول فائق التقدير والاحترام.
حرر بـ [المدينة]، في: [التاريخ] — إمضاء الأستاذ(ة):"""

    tpl_fr = """ROYAUME DU MAROC
MINISTÈRE DE L'ÉDUCATION NATIONALE, DU PRÉSCOLAIRE ET DES SPORTS
Académie Régionale (AREF) : [Nom de l'AREF] | Direction Provinciale : [Nom]
Établissement : [Nom du Collège / Lycée]

[MODÈLE 1] : DEMANDE D'EFFACEMENT D'UNE SANCTION DISCIPLINAIRE (Article 75 du Statut Général)
================================================================================
De : M./Mme [Nom et Prénom du Professeur], Professeur d'EPS — PPR : [Numéro PPR]
Grade : [Grade] — Affecté(e) à l'établissement : [Nom de l'établissement]
À : Monsieur / Madame le(la) Directeur(trice) de l'Académie Régionale (AREF) de [Nom]
Sous couvert de la voie hiérarchique (M./Mme le Chef d'Établissement et M./Mme le Directeur Provincial)

Objet : Demande de retrait et d'effacement d'une sanction disciplinaire de mon dossier administratif.
Réf. : Article 75 du Dahir n° 1.58.008 du 24 février 1958 portant Statut Général de la Fonction Publique.

Monsieur / Madame le(la) Directeur(trice) de l'AREF,
Conformément aux dispositions de l'Article 75 du Statut Général de la Fonction Publique, j'ai l'honneur de solliciter de votre haute bienveillance le retrait et l'effacement définitif de mon dossier administratif de la sanction disciplinaire de [Préciser : Avertissement / Blâme (délai 5 ans) — ou autre sanction (délai 10 ans)] prononcée à mon encontre en date du [Date de la sanction] sous le n° [Numéro].
Je porte à votre connaissance que le délai légal de [cinq (5) années / dix (10) années] s'est intégralement écoulé sans qu'aucune autre sanction n'ait été prononcée à mon égard, et que mon comportement professionnel a donné entière satisfaction durant toute cette période.
Veuillez agréer, Monsieur / Madame le(la) Directeur(trice), l'expression de ma haute considération.
Fait à [Ville], le [Date] — Signature du Professeur :

--------------------------------------------------------------------------------
[MODÈLE 2] : DEMANDE DE CONSULTATION INTÉGRALE DU DOSSIER DISCIPLINAIRE (Article 67 du Statut Général)
================================================================================
De : M./Mme [Nom et Prénom du Professeur], Professeur d'EPS — PPR : [Numéro PPR]
À : Monsieur / Madame le(la) Directeur(trice) de l'AREF (Président(e) du Conseil de Discipline)

Objet : Demande de communication intégrale de mon dossier individuel et des pièces annexes (Droits de la défense).
Réf. : Article 67 du Dahir n° 1.58.008 du 24 février 1958.

Monsieur / Madame le(la) Directeur(trice),
Suite à ma convocation devant la Commission Administrative Paritaire siégeant en Conseil de discipline prévue le [Date de la séance], et en application des garanties légales prévues par l'Article 67 du Statut Général de la Fonction Publique, j'ai l'honneur de demander la communication intégrale de mon dossier individuel et de tous les documents et rapports annexes, à moi-même ainsi qu'à mon défenseur [Nom de l'avocat ou du représentant], préalablement à la réunion du Conseil.
Veuillez agréer, Monsieur / Madame le(la) Directeur(trice), l'expression de ma considération distinguée.
Fait à [Ville], le [Date] — Signature du Professeur :"""

    body_html = f'''
            <div class="info-box">
                <p style="margin:0;"><strong>⚖️ Le cœur du droit disciplinaire et représentatif de l'enseignant au Maroc :</strong> Ce dossier synthétise plus de 40 pages du <strong>Guide officiel du Ministère (التشريع المدرسي وأخلاقيات المهنة، ص 49-52 وص 60-92)</strong> : fonctionnement des <strong>Commissions Administratives Paritaires (اللجان الإدارية المتساوية الأعضاء — Décret 2.59.0200)</strong>, échelle des sanctions, les <strong>12 garanties légales devant le Conseil de discipline</strong>, la procédure d'<strong>effacement des sanctions (سحب العقوبات التأديبية : 5 ans / 10 ans)</strong> et la <strong>Charte de bonne conduite (Note n° 46)</strong>.</p>
            </div>

            <h2 id="commissions-paritaires-cap">1. Les Commissions Administratives Paritaires (اللجان الإدارية المتساوية الأعضاء CAP — Guide MEN p. 60-74)</h2>
            <p>Régies par l'Article 11 du Statut Général de la Fonction Publique et le <strong>Décret n° 2.59.0200 du 5 mai 1959</strong> (Guide MEN pages 60 à 74), les Commissions Administratives Paritaires (CAP) sont des organes consultatifs composés à <strong>parité égale (نصف بنصف)</strong> de représentants désignés par l'Administration et de représentants élus par les fonctionnaires (pour un mandat de <strong>6 ans</strong> au scrutin proportionnel de liste au plus fort reste).</p>
            <ul>
                <li><strong>Compétences consultatives des CAP (اختصاصات اللجان الإدارية المتساوية الأعضاء — Guide MEN p. 62) :</strong>
                    <ul>
                        <li>Titularisation des fonctionnaires stagiaires (ترسيم الموظفين المتدربين).</li>
                        <li>Avancement d'échelon et inscription au tableau d'avancement de grade au choix (الترقي في الرتبة والدرجة بالاختيار).</li>
                        <li>Examen des demandes de mise en disponibilité (الاستيداع) pour études ou convenances personnelles, et des demandes de démission (الاستقالة) en cas de refus initial.</li>
                        <li><strong>Rôle de Conseil de Discipline (المجلس التأديبي) :</strong> Lorsqu'elle examine une faute professionnelle, la CAP siège en formation disciplinaire (ne comprenant aucun membre d'un grade inférieur à celui du fonctionnaire poursuivi).</li>
                    </ul>
                </li>
            </ul>

            <h2 id="echelle-sanctions-enseignant">2. Échelle Officielle des Sanctions Disciplinaires : Titulaires vs Stagiaires (Guide MEN p. 49-50)</h2>
            <p>Conformément à l'<strong>Article 66 du Dahir n° 1.58.008</strong> et au <strong>Guide MEN (pages 49 et 50)</strong>, les sanctions disciplinaires sont classées par ordre croissant de gravité :</p>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Catégorie d'Agent</th>
                            <th>Sanctions du 1er Degré (sans Conseil de discipline, après demande d'explication)</th>
                            <th>Sanctions nécessitant obligatoirement l'avis du Conseil de Discipline (CAP)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Fonctionnaire Titulaire (الموظف الرسمي — Art. 66)</strong></td>
                            <td>
                                1. <strong>L'Avertissement (الإنذار)</strong><br>
                                2. <strong>Le Blâme (التوبيخ)</strong><br>
                                <em>(Prononcés par décision motivée de l'administration après استفسار كتابي).</em>
                            </td>
                            <td>
                                3. Radiation du tableau d'avancement (الحذف من لائحة الترقي)<br>
                                4. Abaissement d'échelon (القهقرة من الرتبة)<br>
                                5. Rétrogradation de grade (الانحدار من الطبقة/الدرجة)<br>
                                6. Exclusion temporaire de fonction avec privation de salaire (الإقصاء المؤقت عن العمل لمدة لا تتجاوز 6 أشهر)<br>
                                7. Mise à la retraite d'office (الإحالة الحتمية على التقاعد)<br>
                                8. Révocation sans suspension des droits à pension (العزل من غير توقيف حق التقاعد)<br>
                                9. Révocation avec suspension des droits à pension (العزل المصحوب بتوقيف حق التقاعد).
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Fonctionnaire Stagiaire (الموظف المتدرب — Décret Royal 1968)</strong></td>
                            <td>
                                1. L'Avertissement (الإنذار)<br>
                                2. Le Blâme (التوبيخ)
                            </td>
                            <td>
                                3. L'Exclusion temporaire pour <strong>2 mois maximum</strong> avec privation de toute rémunération (الإقصاء المؤقت لمدة لا تتجاوز شهرين)<br>
                                4. Le Licenciement définitif (الإعفاء النهائي من العمل).
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 id="douze-garanties-effacement">3. Les 12 Garanties Légales devant le Conseil de Discipline &amp; Effacement des Sanctions (Guide MEN p. 50-52)</h2>
            <div class="step-card">
                <h3 style="margin-top:0;">🛡️ A. Les Garanties Disciplinaires Inviolables du Fonctionnaire (الضمانات القانونية للموظف — Art. 67 à 73 &amp; MEN p. 51-52)</h3>
                <ol style="margin-bottom:0;">
                    <li><strong>Principe « Pas de sanction sans texte » et « Non bis in idem » :</strong> L'administration ne peut infliger qu'une sanction prévue par la loi et ne peut jamais punir deux fois la même faute.</li>
                    <li><strong>Consultation intégrale du dossier (حق الاطلاع على الملف الشخصي والوثائق الملحقة — Art. 67) :</strong> Dès l'ouverture des poursuites, le fonctionnaire a le droit absolu de consulter l'intégralité de son dossier et toutes les pièces annexes.</li>
                    <li><strong>Assistance d'un défenseur ou d'un avocat (حق الاستعانة بمدافع أو محام) :</strong> Le fonctionnaire peut se faire assister devant le Conseil de discipline par un avocat ou un collègue/représentant syndical, et citer des témoins.</li>
                    <li><strong>Règle de composition paritaire et de grade :</strong> Aucun membre du Conseil de discipline ne peut avoir un grade inférieur à celui de l'enseignant traduit devant lui.</li>
                    <li><strong>Interdiction d'aggraver la sanction sans l'accord du Chef du Gouvernement (Art. 71) :</strong> L'administration ne peut pas prononcer une sanction plus sévère que celle proposée par le Conseil de discipline, sauf approbation expresse du Chef du Gouvernement.</li>
                    <li><strong>Délai impératif de 4 mois en cas de suspension provisoire (التوقيف المؤقت في حالة الهفوة الخطيرة — Art. 73) :</strong> En cas de faute grave, si le fonctionnaire est suspendu provisoirement, sa situation doit être définitivement réglée par le Conseil de discipline dans un délai de <strong>4 mois (أربعة أشهر)</strong>. À défaut de décision au bout de 4 mois, le fonctionnaire retrouve automatiquement l'intégralité de son traitement (sauf s'il fait l'objet de poursuites pénales).</li>
                </ol>
            </div>

            <div class="step-card">
                <h3 style="margin-top:0;">🧹 B. Le Droit à l'Effacement des Sanctions Disciplinaires (سحب العقوبات التأديبية — Art. 75 &amp; MEN p. 51)</h3>
                <p>En vertu de l'<strong>Article 75 du Statut Général de la Fonction Publique</strong>, tout fonctionnaire qui n'a pas été exclu des cadres peut introduire une demande auprès du Ministre / Directeur d'AREF pour qu'aucune trace de la sanction ne subsiste dans son dossier administratif :</p>
                <ul>
                    <li>Après <strong>cinq (5) années (5 سنوات)</strong> s'il s'agit d'un <strong>Avertissement (إنذار)</strong> ou d'un <strong>Blâme (توبيخ)</strong>.</li>
                    <li>Après <strong>dix (10) années (10 سنوات)</strong> pour <strong>toutes les autres sanctions disciplinaires</strong>.</li>
                    <li>Si le comportement général de l'intéressé a donné satisfaction depuis la sanction, il est fait droit à sa demande après avis du Conseil de discipline, et son dossier administratif est intégralement reconstitué dans sa nouvelle forme.</li>
                </ul>
            </div>

            <h2 id="ethique-note-46">4. Éthique de la Profession &amp; Note Ministérielle n° 46 (ميثاق حسن سلوك الموظف العمومي — Guide MEN p. 75-92)</h2>
            <p>Le <strong>Guide officiel du Ministère (pages 75 à 92)</strong> publie le texte intégral de la <strong>Note Ministérielle n° 46 du 26 mai 2004 (المذكرة الوزارية رقم 46 حول ميثاق حسن سلوك الموظف العمومي)</strong> qui fixe les engagements déontologiques de l'enseignant :</p>
            <ul>
                <li><strong>Respect de la loi, neutralité et égalité de traitement des élèves :</strong> Évaluation équitable en EPS sans discrimination.</li>
                <li><strong>Secret professionnel et discrétion professionnelle (السر المهني وكثافة الكتمان — Art. 18 du Statut Général) :</strong> Interdiction de divulguer les délibérations des conseils ou les données personnelles/médicales des élèves.</li>
                <li><strong>Interdiction du cumul d'emplois rémunérés (منع الجمع بين الوظيفة ومهنة حرة تدر دخلاً — Art. 15) :</strong> Sauf dérogations légales (production d'œuvres scientifiques, littéraires, artistiques ou sportives, ou expertises/enseignement sur autorisation écrite préalable).</li>
            </ul>

            <div class="arabic-law-box" id="resume-juridique-arabe" dir="rtl">
                <h3>🇲🇦 الملخص القانوني الرسمي بالعربية: اللجان الثنائية (CAP)، الضمانات التأديبية وسحب العقوبات (دليل الوزارة ص 49-92)</h3>
                <ul>
                    <li><strong>اللجان الإدارية المتساوية الأعضاء (المرسوم 2.59.0200 — ص 60-74):</strong> تتألف من عدد متساوٍ من ممثلي الإدارة وممثلي الموظفين المنتخبين لمدة <strong>6 سنوات</strong> بالاقتراع اللائحي بالتمثيل النسبي حسب قاعدة أكبر بقية. تستشار في الترسيم، الترقي في الرتبة والدرجة بالاختيار، الاستيداع، وتنعقد بصفتها <strong>مجلساً تأديبياً</strong>.</li>
                    <li><strong>الضمانات التأديبية (الفصول 67 إلى 73 — ص 51-52):</strong> لا تصدر عقوبتا الإنذار والتوبيخ إلا بعد <strong>استفسار كتابي</strong>، ولا تصدر باقي العقوبات إلا بعد استشارة المجلس التأديبي مع تمكين الموظف من <strong>الاطلاع الكامل على ملفه الشخصي</strong> والاستعانة بمحامٍ أو مدافع، وعدم جواز تشديد العقوبة المقترحة من المجلس إلا بموافقة رئيس الحكومة. وفي حالة التوقيف المؤقت، يجب البت في ملف الموظف داخل أجل <strong>4 أشهر</strong> وإلا استرجع أجرته كاملة (ما لم يكن متابعاً جنائياً).</li>
                    <li><strong>مسطرة سحب العقوبات التأديبية (الفصل 75 — ص 51):</strong> يحق للموظف تقديم طلب سحب العقوبة ومحو آثارها من ملفه بعد مرور <strong>5 سنوات بالنسبة للإنذار أو التوبيخ</strong>، و<strong>10 سنوات بالنسبة لباقي العقوبات</strong>.</li>
                </ul>
            </div>

            {build_dual_templates_html(
                "cap-discipline-effacement",
                "Modèle Officiel n°8 : Demande d'Effacement de Sanction (Art. 75) + Demande de Consultation du Dossier (Art. 67)",
                "النموذج الإداري رقم 8: طلب سحب عقوبة تأديبية (الفصل 75) + طلب الاطلاع على الملف التأديبي (الفصل 67)",
                tpl_ar,
                tpl_fr
            )}

            {get_official_pdf_download_box()}
'''

    faq_list = [
        (
            "Après combien d'années un enseignant au Maroc peut-il demander l'effacement d'une sanction disciplinaire (سحب العقوبة التأديبية) ?",
            "Conformément à l'Article 75 du Statut Général de la Fonction Publique, le délai légal pour demander le retrait et l'effacement d'une sanction est de 5 ans pour l'avertissement (الإنذار) et le blâme (التوبيخ), et de 10 ans pour toutes les autres sanctions."
        ),
        (
            "Quel est le délai maximal pour statuer sur le cas d'un fonctionnaire suspendu provisoirement (التوقيف المؤقت) selon l'Article 73 ?",
            "Le Conseil de discipline doit statuer définitivement dans un délai maximal de 4 mois à compter du jour d'effet de la suspension provisoire. Passé ce délai de 4 mois sans décision (et hors poursuites pénales), le fonctionnaire retrouve de plein droit l'intégralité de son traitement."
        ),
        (
            "ما هي مدة انتداب أعضاء اللجان الإدارية المتساوية الأعضاء (CAP) ونمط الاقتراع المعتمد؟",
            "حسب المرسوم رقم 2.59.0200 (دليل التشريع المدرسي ص 62-63)، ينتخب ممثلو الموظفين في اللجان الإدارية المتساوية الأعضاء لمدة ست (6) سنوات، عن طريق الاقتراع اللائحي بالتمثيل النسبي على أساس قاعدة أكبر بقية."
        ),
        (
            "L'administration peut-elle infliger une sanction plus lourde que celle proposée par le Conseil de discipline ?",
            "Selon l'Article 71 du Statut Général de la Fonction Publique (Guide MEN p. 51), l'autorité ayant pouvoir disciplinaire ne peut prononcer une sanction plus sévère que celle proposée par le Conseil de discipline qu'après approbation expresse du Chef du Gouvernement."
        )
    ]

    html = build_bilingual_legislation_article(
        filename, title, meta_desc, badge, h1_fr, h1_ar, ref_label, read_time, toc_items, body_html, faq_list, breadcrumb_name
    )
    with open(os.path.join(PUBLIC_DIR, filename), "w", encoding="utf-8") as f:
        f.write(html)
    print(f"[ARTICLE 8 OK] {filename}")


# ==============================================================================
# ARTICLE 9 : CAHIER DE TEXTES, NOTE 155, CORRESPONDANCE ADMINISTRATIVE & HORAIRES
# ==============================================================================
def create_article_9():
    filename = "cahier-de-textes-obligations-horaires-professeur-eps-maroc.html"
    title = "Cahier de Textes EPS, Note 155, Correspondance Administrative & Obligations Horaires au Maroc | ProfEPS"
    meta_desc = "Guide officiel des documents du professeur d'EPS (Note 155 — FADEEP p.19), de la valeur juridique du Cahier de textes, des 14 règles de la correspondance administrative (تقنيات التراسل الإداري — FADEEP p.20-21) et des obligations horaires (24h Collège / 21h Lycée + ASS)."
    badge = "⚖️ Organisation Administrative &amp; EPS · Note n° 155 &amp; FADEEP p. 19-21"
    h1_fr = "Cahier de Textes, Note Ministérielle n° 155, Règles de la Correspondance Administrative et Obligations Horaires du Professeur d'EPS au Maroc"
    h1_ar = "دفتر النصوص، المذكرة 155، تقنيات التراسل الإداري الرسمية (14 قاعدة) والحصة الأسبوعية لأستاذ ومنسق التربية البدنية"
    ref_label = "Note Ministérielle n° 155 · Module FADEEP (p. 19-21) · OP EPS 2007/2009"
    read_time = "18 min de lecture (Bilingue FR/AR)"
    breadcrumb_name = "Cahier de Textes, Note 155 & Correspondance Administrative"

    toc_items = [
        ("documents-note-155", "1. Les documents obligatoires selon la Note n° 155 & Valeur juridique du Cahier de Textes (FADEEP p. 19)"),
        ("obligations-horaires-coordonnateur", "2. Obligations horaires du Professeur d'EPS (24h Collège / 21h Lycée + ASS) & Missions du Coordonnateur"),
        ("quatorze-regles-correspondance", "3. Les 7 Principes et 14 Règles Officielles de la Correspondance Administrative (FADEEP p. 20-21)"),
        ("resume-juridique-arabe", "4. الملخص القانوني بالعربية: الوثائق التربوية (المذكرة 155) والقواعد الـ 14 للتراسل الإداري"),
        ("modeles-administratifs", "5. Modèle Officiel : PV de Réunion de Coordination d'EPS & Répartition des Installations (FR/AR)"),
        ("telecharger-pdfs-officiels", "6. Télécharger les 4 Ouvrages Officiels de Législation PDF"),
        ("faq-officielle", "7. FAQ Cahier de Textes, Correspondance Administrative & Concours CRMEF")
    ]

    tpl_ar = """المملكة المغربية
وزارة التربية الوطنية والتعليم الأولي والرياضة
الأكاديمية الجهوية للتربية والتكوين لجهة: [اسم الجهة]
المديرية الإقليمية: [اسم المديرية] | المؤسسة: [اسم المؤسسة]

محضر اجتماع المجلس التعليمي والتنسيقي لمادة التربية البدنية والرياضية (بداية الموسم الدراسي)
(توزيع المنشآت الرياضية، البرمجة السنوية للدورات، وجرد العتاد — طبقاً للمرسوم 2.02.376 والتوجيهات التربوية)

بتاريخ [اليوم/الشهر/السنة]، على الساعة [الساعة]، انعقد بمؤسسة [اسم المؤسسة] اجتماع المجلس التعليمي لمادة التربية البدنية والرياضية برئاسة السيد(ة) مدير(ة) المؤسسة وبحضور السيد(ة) منسق(ة) المادة وكافة أساتذة التربية البدنية العاملين بالمؤسسة:
1. الأستاذ(ة): [الاسم الكامل] (رقم التأجير: [PPR] — منسق المادة)
2. الأستاذ(ة): [الاسم الكامل] (رقم التأجير: [PPR])
3. الأستاذ(ة): [الاسم الكامل] (رقم التأجير: [PPR])

جدول الأعمال:
1. انتخاب/تأكيد منسق(ة) مادة التربية البدنية والرياضية وتشكيل مكتب الجمعية الرياضية المدرسية (ASS).
2. جرد العتاد الرياضي وفحص سلامة المنشآت والملاعب الرياضية بالمؤسسة.
3. إعداد البرمجة السنوية الموحدة للدورات التدريسية (Cycles d'APS) وتناوب الملاعب (Rotation des installations).
4. برمجة أنشطة الجمعية الرياضية المدرسية (ASS) ليوم الجمعة بعد الزوال والمنافسات الإقليمية (FRMSS).

القرارات والتوصيات المصادق عليها:
- المصادقة على شبكة تناوب الملاعب والمنشآت الرياضية بين الأساتذة لضمان ظروف ممارسة آمنة ومنظمة.
- اعتماد البرمجة السنوية للأنشطة الرياضية لأسلاك المؤسسة وفق التوجيهات التربوية الرسمية (2007/2009).
- حصر لائحة الحاجيات من العتاد الديداكتيكي والرياضي ورفعها إلى مجلس التدبير.
- تسجيل الملاحظات التقنية الخاصة بصيانة وتأمين المرامي وأرضية الملاعب قبل انطلاق الدروس الفعلية.

ورفعت الجلسة على الساعة [الساعة] بعد قراءة المحضر والمصادقة عليه.

حرر بـ [المدينة]، في: [التاريخ]
توقيع منسق(ة) وأساتذة التربية البدنية:                      خاتم وتوقيع السيد(ة) مدير(ة) المؤسسة:"""

    tpl_fr = """ROYAUME DU MAROC
MINISTÈRE DE L'ÉDUCATION NATIONALE, DU PRÉSCOLAIRE ET DES SPORTS
Académie Régionale (AREF) : [Nom de l'AREF] | Direction Provinciale : [Nom]
Établissement : [Nom du Collège / Lycée]

PROCÈS-VERBAL DE RÉUNION DU CONSEIL D'ENSEIGNEMENT ET DE COORDINATION D'EPS
(Programmation annuelle des cycles, rotation des installations et inventaire — Réf. Décret n° 2.02.376 & OP 2007/2009)

En date du [JJ/MM/AAAA] à [Heure], s'est tenue au sein de l'établissement [Nom du Collège / Lycée] la réunion de rentrée du Conseil d'enseignement d'Éducation Physique et Sportive, sous la présidence du Chef d'Établissement et en présence de l'équipe pédagogique d'EPS :
1. M./Mme [Nom et Prénom] (PPR : [Numéro] — Coordonnateur(trice) d'EPS)
2. M./Mme [Nom et Prénom] (PPR : [Numéro] — Professeur d'EPS)
3. M./Mme [Nom et Prénom] (PPR : [Numéro] — Professeur d'EPS)

ORDRE DU JOUR :
1. Désignation du Coordonnateur d'EPS et structuration du Bureau Exécutif de l'Association Sportive Scolaire (ASS).
2. Inventaire du matériel didactique et audit de sécurité des installations sportives de l'établissement.
3. Élaboration de la programmation annuelle des cycles d'APS et du planning de rotation des terrains.
4. Planification des entraînements ASS, tournois inter-classes et compétitions provinciales FRMSS.

DÉCISIONS ET RÉSOLUTIONS ADOPTÉES :
- Validation de la grille annuelle de rotation des installations sportives entre les classes et enseignants.
- Adoption des familles d'APS programmées par niveau conformément aux Orientations Pédagogiques 2007/2009.
- Établissement de l'état des besoins en matériel sportif transmis à l'Intendance et au Conseil de Gestion.
- Consignation des vérifications de sécurité (scellement des buts, état des surfaces de course et fosses de saut).

La séance est levée à [Heure] après lecture et approbation du présent procès-verbal.

Fait à [Ville], le [Date]
Signatures du Coordonnateur et des Professeurs d'EPS :          Cachet et Signature du Chef d'Établissement :"""

    body_html = f'''
            <div class="info-box">
                <p style="margin:0;"><strong>⚖️ Pourquoi le Cahier de Textes et la Correspondance Administrative sont vos meilleures preuves légales :</strong> Le <strong>Module officiel de Législation Scolaire FADEEP (pages 19 à 21)</strong> consacre un chapitre entier aux documents régis par la <strong>Note Ministérielle n° 155 (المذكرة رقم 155)</strong> et aux <strong>14 règles impératives de la correspondance administrative (تقنيات التراسل الإداري)</strong>, questions récurrentes à l'écrit et à l'oral du concours CRMEF et de l'examen professionnel.</p>
            </div>

            <h2 id="documents-note-155">1. Les Documents Administratifs &amp; Pédagogiques selon la Note n° 155 et la Valeur Juridique du Cahier de Textes (FADEEP p. 19)</h2>
            <p>Conformément au <strong>Module FADEEP (page 19 : الوثائق التربوية والإدارية حسب المذكرة رقم 155 الصادرة في 17 نونبر 1997)</strong>, les documents officiels de l'établissement se répartissent en trois volets (pédagogique, administratif/social et financier). Pour le professeur d'EPS, cinq documents constituent une obligation légale :</p>
            <ol>
                <li><strong>Le Cahier de Textes (دفتر النصوص) :</strong> C'est un <strong>document administratif et juridique officiel (وثيقة إدارية وقانونية رسمية)</strong> qui reste la propriété de l'établissement. En cas d'accident scolaire sur le terrain d'EPS ou d'inspection pédagogique, le Cahier de Textes fait foi pour prouver que la séance, l'objectif moteur et les consignes de sécurité correspondaient exactement au cycle officiel programmé.</li>
                <li><strong>Le Dossier Pédagogique et Cahier Journal / Fiches de Préparation (الملف التربوي وجذاذات التحضير) :</strong> Contient le Projet Prévisionnel du Cycle (PPC), les fiches de séance (générables gratuitement en PDF et Word via notre <a href="generateur.html" style="color:#991b1b;font-weight:800;text-decoration:underline;">Générateur EPS Maroc</a>) et les grilles d'évaluation diagnostique, formative et sommative.</li>
                <li><strong>Le Cahier d'Appel et de Suivi des Élèves (سجل المناداة ومراقبة غياب التلاميذ واللباس الرياضي) :</strong> L'appel des élèves doit obligatoirement être effectué au tout début de la séance d'EPS et consigné auprès de la Surveillance Générale.</li>
                <li><strong>Le Dossier de l'Association Sportive Scolaire (ملف الجمعية الرياضية المدرسية ASS).</strong></li>
            </ol>

            <h2 id="obligations-horaires-coordonnateur">2. Obligations Horaires du Professeur d'EPS (24h Collège / 21h Lycée + ASS) &amp; Missions du Coordonnateur</h2>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Corps / Cycle d'Enseignement</th>
                            <th>Enveloppe Horaire Hebdomadaire</th>
                            <th>Répartition Cours d'EPS &amp; Sport Scolaire (ASS)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Professeur de l'Enseignement Secondaire Collégial (أستاذ التعليم الثانوي الإعدادي)</strong></td>
                            <td><strong>24 heures / semaine</strong></td>
                            <td>Enseignement des séances d'EPS (2h par classe/semaine) + heures réglementaires dédiées à l'encadrement de l'Association Sportive Scolaire (ASS — Vendredi après-midi).</td>
                        </tr>
                        <tr>
                            <td><strong>Professeur de l'Enseignement Secondaire Qualifiant (أستاذ التعليم الثانوي التأهيلي)</strong></td>
                            <td><strong>21 heures / semaine</strong></td>
                            <td>Enseignement des séances d'EPS (2h par classe/semaine) + heures réglementaires d'animation et d'entraînement des équipes de l'établissement (ASS).</td>
                        </tr>
                        <tr>
                            <td><strong>Coordonnateur d'EPS de l'Établissement (منسق مادة التربية البدنية بالمؤسسة)</strong></td>
                            <td>Décharge / Heures de coordination selon notes en vigueur</td>
                            <td>Animation du Conseil d'enseignement d'EPS, élaboration du planning de rotation des terrains, tenue du registre d'inventaire du matériel sportif, coordination des compétitions ASS/FRMSS et liaison avec l'Inspecteur pédagogique.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 id="quatorze-regles-correspondance">3. Les 7 Principes et les 14 Règles Officielles de la Correspondance Administrative (FADEEP p. 20-21)</h2>
            <p>Le <strong>Module officiel FADEEP (pages 20 et 21 : التواصل الإداري وتقنيات التراسل الإداري)</strong> énonce les <strong>7 principes de la communication administrative</strong> (clarté, précision, concision, courtoisie, objectivité, respect de la hiérarchie, référence aux textes) ainsi que les <strong>14 règles formelles de toute lettre administrative marocaine</strong> :</p>
            <div class="step-card">
                <ol style="margin:0;columns:2;column-gap:2rem;">
                    <li><strong>L'En-tête officiel (الحمدلة والتمجيد / المملكة المغربية — الوزارة — الأكاديمية — المديرية — المؤسسة)</strong> en haut à droite.</li>
                    <li><strong>Le Lieu et la Date (المكان والتاريخ)</strong> en haut à gauche.</li>
                    <li><strong>Le Numéro d'envoi (الرقم الترتيبي للإرسال)</strong> sous l'en-tête.</li>
                    <li><strong>L'Expéditeur (المرسل : الاسم الكامل، رقم التأجير PPR، الإطار، المؤسسة).</strong></li>
                    <li><strong>Le Destinataire (المرسل إليه : بصفته الإدارية وليس باسمه الشخصي، مثلاً: إلى السيد المدير الإقليمي).</strong></li>
                    <li><strong>La Voie Hiérarchique (السلم الإداري : تحت إشراف السيد مدير المؤسسة)</strong> obligatoire pour toute correspondance adressée à la Direction Provinciale, à l'AREF ou au Ministère.</li>
                    <li><strong>L'Objet (الموضوع : جملة موجزة ودقيقة تلخص مضمون المراسلة).</strong></li>
                    <li><strong>La Référence (المرجع : المذكرة أو القانون أو المراسلة السابقة المسند إليها).</strong></li>
                    <li><strong>Les Pièces Jointes (المرفقات : عدد وطبيعة الوثائق المرفقة).</strong></li>
                    <li><strong>La Formule d'ouverture officielle :</strong> <em>« سلام تام بوجود مولانا الإمام »</em>.</li>
                    <li><strong>Le Corps de la lettre (العرض : بضمير المفرد "يشرفني أن..."، بأسلوب إداري موضوعي ومحترم خالٍ من الحشو).</strong></li>
                    <li><strong>La Formule de politesse finale :</strong> <em>« وتفضلوا بقبول فائق التقدير والاحترام ، والسلام »</em>.</li>
                    <li><strong>La Signature manuscrite de l'expéditeur (الإمضاء والتوقيع).</strong></li>
                    <li><strong>L'Avis et le Cachet du supérieur hiérarchique (رأي وخاتم الرئيس المباشر عند سلوك السلم الإداري).</strong></li>
                </ol>
            </div>

            <div class="arabic-law-box" id="resume-juridique-arabe" dir="rtl">
                <h3>🇲🇦 الملخص القانوني الرسمي بالعربية: الوثائق التربوية (المذكرة 155) والقواعد الـ 14 للتراسل الإداري (FADEEP ص 19-21)</h3>
                <ul>
                    <li><strong>دفتر النصوص والوثائق التربوية (المذكرة رقم 155 — ص 19):</strong> يعتبر دفتر النصوص وثيقة إدارية وقانونية رسمية تظل ملكاً للمؤسسة، ويكتسي أهمية قصوى لأستاذ التربية البدنية لأنه الحجة القانونية أمام القضاء (في حالة حادثة مدرسية) وأمام المفتش التربوي لإثبات إنجاز الدرس واحترام التسلسل البيداغوجي.</li>
                    <li><strong>احترام السلم الإداري (القاعدة السادسة من قواعد التراسل الإداري — ص 20-21):</strong> كل مراسلة إدارية يوجهها الأستاذ إلى المدير الإقليمي أو مدير الأكاديمية أو الوزير يجب أن تمر وجوباً <strong>« تحت إشراف السيد(ة) مدير(ة) المؤسسة »</strong>، مع الاحتفاظ بنسخة مؤشر عليها تحمل رقم وتاريخ التسجيل بمكتب الضبط.</li>
                    <li><strong>مهام منسق مادة التربية البدنية بالمؤسسة:</strong> السهر على إعداد جدول تناوب الملاعب والمنشآت الرياضية، مسك سجل جرد العتاد الرياضي، تنشيط اجتماعات المجلس التعليمي للمادة، وتنسيق أنشطة الجمعية الرياضية المدرسية (ASS).</li>
                </ul>
            </div>

            {build_dual_templates_html(
                "pv-coordination-eps",
                "Modèle Officiel n°9 : Procès-Verbal (PV) de Réunion du Conseil d'Enseignement & Coordination d'EPS",
                "النموذج الإداري رقم 9: محضر اجتماع المجلس التعليمي والتنسيقي لمادة التربية البدنية وتوزيع المنشآت والعتاد",
                tpl_ar,
                tpl_fr
            )}

            {get_official_pdf_download_box()}
'''

    faq_list = [
        (
            "Quelle est la valeur juridique du Cahier de Textes (دفتر النصوص) pour le professeur d'EPS au Maroc ?",
            "Le Cahier de Textes est un document administratif officiel régi par la Note n° 155 (Module FADEEP p. 19). Il constitue une preuve juridique opposable en cas d'accident scolaire ou de contrôle d'inspection pour attester du contenu de la séance et du respect de la programmation officielle."
        ),
        (
            "Qu'est-ce que le respect de la voie hiérarchique (احترام السلم الإداري) dans la correspondance administrative ?",
            "Toute lettre administrative adressée par un enseignant à une autorité supérieure (Directeur Provincial, Directeur de l'AREF, Ministre) doit obligatoirement porter la mention « Sous couvert de Monsieur/Madame le(la) Directeur(trice) de l'établissement » (تحت إشراف السيد مدير المؤسسة) qui y appose son visa et son avis."
        ),
        (
            "ما هي الحصة الأسبوعية القانونية لأستاذ التربية البدنية في السلك الإعدادي والسلك التأهيلي بالمغرب؟",
            "تحدد الحصة الأسبوعية القانونية لأستاذ التعليم الثانوي الإعدادي في 24 ساعة أسبوعياً، ولأستاذ التعليم الثانوي التأهيلي في 21 ساعة أسبوعياً، وتشتمل على حصص التدريس الرسمية وحصص تنشيط وتأطير الجمعية الرياضية المدرسية (ASS)."
        ),
        (
            "À qui s'adresse une lettre administrative selon les 14 règles du Module FADEEP (pages 20-21) ?",
            "Une correspondance administrative est toujours adressée à la fonction administrative et jamais au nom personnel du responsable (ex. « À Monsieur le Directeur Provincial de... » et non « À Monsieur X »)."
        )
    ]

    html = build_bilingual_legislation_article(
        filename, title, meta_desc, badge, h1_fr, h1_ar, ref_label, read_time, toc_items, body_html, faq_list, breadcrumb_name
    )
    with open(os.path.join(PUBLIC_DIR, filename), "w", encoding="utf-8") as f:
        f.write(html)
    print(f"[ARTICLE 9 OK] {filename}")


# ==============================================================================
# ARTICLE 10 : ORGANISATION DU BAC SPORT (OFFICIELS & LIBRES) & LOI ANTI-FRAUDE
# ==============================================================================
def create_article_10():
    filename = "organisation-epreuves-bac-eps-maroc-candidats-libres-officiels.html"
    title = "Organisation du Bac Sport au Maroc (Officiels & Candidats Libres) & Loi Anti-Fraude (زجر الغش) | ProfEPS"
    meta_desc = "Guide juridique et réglementaire des épreuves d'EPS au Baccalauréat marocain (Candidats Officiels & Libres — OP 2007, Note 142-10) et de la procédure légale de répression de la fraude aux examens (مسطرة زجر الغش — ENS Fès Ch. 16, Dahir 1958 & Loi 02.13)."
    badge = "⚖️ Examen Bac Sport &amp; Législation · Note 142-10 · Loi 02.13 &amp; ENS Fès Ch. 16"
    h1_fr = "Organisation des Épreuves du Bac Sport au Maroc (Officiels &amp; Candidats Libres) et Procédure Légale Anti-Fraude aux Examens"
    h1_ar = "تنظيم اختبارات البكالوريا في التربية البدنية (الرسميين والأحرار) ومسطرة زجر الغش في الامتحانات المدرسية بالمغرب"
    ref_label = "OP 2007 · Note n° 142-10 · Dahir du 25 Juin 1958 & Loi n° 02.13 (ENS Fès Ch. 16)"
    read_time = "19 min de lecture (Bilingue FR/AR)"
    breadcrumb_name = "Organisation Bac Sport & Loi Anti-Fraude"

    toc_items = [
        ("cadre-bac-officiels-libres", "1. Cadre réglementaire du Bac Sport au Maroc : Candidats Officiels vs Candidats Libres (Note 142-10)"),
        ("commissions-epreuves-baremes", "2. Fonctionnement des Commissions d'Examen du Bac Libre EPS (Athlétisme & Gymnastique)"),
        ("loi-anti-fraude-examens", "3. Procédure légale de répression de la fraude aux examens (مسطرة زجر الغش — ENS Fès Ch. 16)"),
        ("resume-juridique-arabe", "4. الملخص القانوني بالعربية: تنظيم بكالوريا التربية البدنية ومسطرة زجر الغش في الامتحانات"),
        ("modeles-administratifs", "5. Modèle Officiel : Procès-Verbal (PV) de Commission d'Examen Bac Sport / Candidats Libres (FR/AR)"),
        ("telecharger-pdfs-officiels", "6. Télécharger les 4 Ouvrages Officiels de Législation PDF"),
        ("faq-officielle", "7. FAQ Bac Sport, Candidats Libres & Concours CRMEF")
    ]

    tpl_ar = """المملكة المغربية
وزارة التربية الوطنية والتعليم الأولي والرياضة
الأكاديمية الجهوية للتربية والتكوين لجهة: [اسم الجهة]
المديرية الإقليمية: [اسم المديرية]
مركز الامتحان: [اسم الثانوية التأهيلية / المركب الرياضي]

محضر اللجنة الإقليمية لاختبارات مادة التربية البدنية والرياضية لامتحانات البكالوريا (المترشحون الأحرار)
(دورة يونيو [السنة] — وفق التوجيهات التربوية 2007 والمذكرة الوزارية رقم 142-10)

بتاريخ [اليوم/الشهر/السنة]، على الساعة [الساعة]، اجتمعت بمركز الامتحان [اسم المركز] اللجنة رقم [رقم اللجنة] المكلفة بإجراء وتقويم اختبارات مادة التربية البدنية والرياضية الخاصة بالمترشحين الأحرار لامتحانات البكالوريا (مسلك: [اسم المسلك] — المعامل: [1]).

1. تشكيلة اللجنة الفاحصة (المكلفة بموجب تكليف رسمي من المديرية الإقليمية):
- رئيس(ة) اللجنة / المشرف(ة): الأستاذ(ة) [الاسم الكامل] — رقم التأجير: [PPR]
- عضو فاحص (الورشة 1 - الجري السريع / المطاول): الأستاذ(ة) [الاسم الكامل] — رقم التأجير: [PPR]
- عضو فاحص (الورشة 2 - دفع الجلة / القفز الطولي / الجمباز): الأستاذ(ة) [الاسم الكامل] — رقم التأجير: [PPR]

2. الإحصائيات الرسمية للمترشحين المسجلين باللجنة:
- العدد الإجمالي للمترشحين المسجلين في اللائحة الرسمية: [العدد] مترشحاً(ة).
- عدد المترشحين الحاضرين الذين اجتازوا الاختبارات التطبيقية: [العدد] مترشحاً(ة).
- عدد المترشحين المتغيبين: [العدد] (مفصلة أرقام امتحانهم في شبكة التنقيط المرفقة).
- عدد الحالات الصحية المحالة على اللجنة الطبية الإقليمية: [العدد].

3. سير الاختبارات التطبيقية والتحقق من الهوية:
- تم التحقق بدقة من الهوية الوطنية والاستدعاء الرسمي لكل مترشح(ة) قبل انطلاق الاختبارات.
- أجريت الاختبارات في احترام تام لسلم التنقيط الرسمي (OP 2007) وشروط السلامة البدنية للمترشحين.
- الحالات الاستثنائية أو المخالفات المسجلة (إن وجدت): [لا شيء / ذكر الحالة إن وجدت].

ورفعت أشغال اللجنة على الساعة [الساعة] بعد حصر وتوقيع جداول النقط الرسمية وتسليمها في أظرفة مغلقة لرئيس المركز.

حرر بـ [المدينة]، في: [التاريخ]
توقيعات أعضاء اللجنة الفاحصة:                            خاتم وتوقيع رئيس(ة) مركز الامتحان:"""

    tpl_fr = """ROYAUME DU MAROC
MINISTÈRE DE L'ÉDUCATION NATIONALE, DU PRÉSCOLAIRE ET DES SPORTS
Académie Régionale (AREF) : [Nom de l'AREF] | Direction Provinciale : [Nom]
Centre d'Examen : [Nom du Lycée / Complexe Sportif]

PROCÈS-VERBAL DE LA COMMISSION D'EXAMEN D'EPS AU BACCALAURÉAT (CANDIDATS LIBRES)
(Session Juin [Année] — Conforme aux Orientations Pédagogiques 2007 et à la Note n° 142-10)

En date du [JJ/MM/AAAA] à [Heure], s'est réunie au Centre d'examen [Nom du Centre] la Commission d'évaluation n° [Numéro] chargée de faire passer les épreuves pratiques d'Éducation Physique et Sportive aux candidats libres du Baccalauréat (Filière : [Filière] — Coefficient : [1]).

1. COMPOSITION DE LA COMMISSION D'EXAMEN :
- Président(e) / Coordonnateur(trice) de commission : M./Mme [Nom complet] — PPR : [Numéro]
- Examinateur Atelier 1 (Course de vitesse / Demi-fond) : M./Mme [Nom complet] — PPR : [Numéro]
- Examinateur Atelier 2 (Lancer du poids / Saut en longueur / Gymnastique) : M./Mme [Nom complet] — PPR : [Numéro]

2. BILAN STATISTIQUE DES CANDIDATS CONVOQUÉS :
- Nombre total de candidats inscrits sur le bordereau officiel : [Nombre]
- Nombre de candidats présents ayant passé les épreuves : [Nombre]
- Nombre de candidats absents : [Nombre] (Numéros d'examen consignés sur le bordereau)
- Nombre de candidats orientés vers la Commission Médicale Provinciale : [Nombre]

3. DÉROULEMENT RÉGLEMENTAIRE DES ÉPREUVES ET CONTRÔLE D'IDENTITÉ :
- Vérification systématique de la Carte Nationale d'Identité Électronique (CNIE) et de la convocation officielle de chaque candidat avant l'échauffement.
- Application stricte des barèmes nationaux officiels des Orientations Pédagogiques 2007 dans le respect des règles de sécurité.
- Incidents ou cas particuliers signalés : [Néant / Préciser le cas échéant].

Les travaux de la commission ont pris fin à [Heure] après clôture, signature et remise sous pli fermé des bordereaux de notation au Chef du centre d'examen.

Fait à [Ville], le [Date]
Signatures des Membres du Jury d'EPS :                   Cachet et Signature du Chef de Centre d'Examen :"""

    body_html = f'''
            <div class="info-box">
                <p style="margin:0;"><strong>⚖️ Évaluation officielle du Bac Sport et Législation des Examens au Maroc :</strong> Ce 10ème dossier complète notre silo juridique en reliant l'organisation officielle de l'épreuve d'EPS au Baccalauréat (<strong>Orientations Pédagogiques 2007 &amp; Note n° 142-10</strong>) et le <strong>Chapitre 16 du Cours de Législation Scolaire de l'ENS Fès (مسطرة زجر الغش في الامتحانات — Dahir du 25 juin 1958 &amp; Loi n° 02.13)</strong>. Consultez également notre <a href="article-baremes-bac-sport-maroc-officiels-libres.html" style="color:#991b1b;font-weight:800;text-decoration:underline;">dossier complet des Barèmes Chiffrés du Bac Sport Maroc</a>.</p>
            </div>

            <h2 id="cadre-bac-officiels-libres">1. Cadre Réglementaire du Bac Sport au Maroc : Candidats Officiels vs Candidats Libres (Note n° 142-10)</h2>
            <p>Au Maroc, l'Éducation Physique et Sportive est une matière obligatoire du Baccalauréat (généralement affectée du <strong>coefficient 1</strong> dans les filières générales et technologiques, et d'un coefficient spécifique en filière Éducation Physique / Sport-Études) :</p>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Catégorie de Candidat</th>
                            <th>Mode d'Évaluation Réglementaire</th>
                            <th>Activités Évaluées &amp;Gestion des Dispenses</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>1. Candidats Officiels Scolarisés (المترشحون الرسميون)</strong></td>
                            <td>Contrôle continu semestriel (Semestre 1 et Semestre 2 de 1ère Bac et 2ème Bac) saisi sur le système <strong>Massar</strong> selon la <strong>Note ministérielle n° 142-10</strong>.</td>
                            <td>3 cycles d'APS par année scolaire (Athlétisme, Gymnastique, Sports Collectifs) évalués sur 20 points (Habiletés motrices + Connaissances conceptuelles + Comportement/Assiduité). Dispense validée par le médecin de santé scolaire.</td>
                        </tr>
                        <tr>
                            <td><strong>2. Candidats Libres (المترشحون الأحرار — Bac Libre)</strong></td>
                            <td>Épreuve ponctuelle pratique officielle organisée par l'AREF et la Direction Provinciale devant une <strong>Commission officielle de professeurs d'EPS convoqués par ordre de mission</strong>.</td>
                            <td>Le candidat libre est évalué dans des épreuves individuelles standardisées issues des barèmes OP 2007 (ex. <strong>Athlétisme : Course de vitesse ou Demi-fond + Lancer du poids ou Saut en longueur</strong>, ou <strong>Gymnastique au sol</strong> selon l'organisation provinciale). Toute dispense doit être validée par la Commission Médicale Provinciale dans les délais officiels.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 id="commissions-epreuves-baremes">2. Fonctionnement Juridique des Commissions d'Examen du Bac Libre EPS</h2>
            <p>Lorsque le professeur d'EPS est convoqué comme membre d'un jury d'examen du Baccalauréat Libre (أستاذ فاحص في امتحانات البكالوريا للأحرار), il agit en qualité d'officier public d'évaluation soumis à des obligations strictes :</p>
            <ul>
                <li><strong>Caractère obligatoire de la convocation (إلزامية التكليف الرسمي بمهمة الامتحانات) :</strong> La surveillance et l'évaluation des examens nationaux font partie intégrante des obligations professionnelles statutaires de l'enseignant.</li>
                <li><strong>Contrôle rigoureux de l'identité (التحقق الصارم من الهوية) :</strong> Avant le début de chaque série sur le terrain, le jury vérifie la concordance entre la <strong>Carte Nationale d'Identité Électronique (CNIE)</strong> originale avec photo récente, la convocation officielle (الاستدعاء الرسمي) et le bordereau nominatif (محضر التنقيط).</li>
                <li><strong>Confidentialité des notes et signature collégiale du PV :</strong> Les performances brutes (temps en secondes/minutes, distance en mètres) et les notes sur 20 points ne sont jamais communiquées oralement sur le terrain aux candidats ; elles sont consignées sur le bordereau officiel signé par tous les membres du jury et remis sous pli scellé au Chef du centre d'examen.</li>
            </ul>

            <h2 id="loi-anti-fraude-examens">3. Procédure Légale de Répression de la Fraude aux Examens (مسطرة زجر الغش في الامتحانات — ENS Fès Ch. 16)</h2>
            <p>Le <strong>Chapitre 16 du Cours de Législation Scolaire de l'ENS Fès (Dr. Khalid Najjari, pages 51-55 : مسطرة زجر الغش في الامتحانات)</strong> ainsi que le <strong>Dahir n° 1.58.060 du 25 juin 1958</strong> et la <strong>Loi n° 02.13 relative à la répression de la fraude aux examens scolaires</strong> définissent les infractions et la procédure exacte à suivre par les enseignants surveillants ou examinateurs :</p>
            <ul>
                <li><strong>Cas de fraude aux épreuves du Bac (et notamment au Bac Sport Libre) :</strong>
                    <ul>
                        <li><strong>La substitution de personne / Usurpation d'identité (انتحال صفة مترشح آخر) :</strong> C'est la fraude la plus grave lors des épreuves sportives des candidats libres (un sportif tiers se présentant à la place du candidat inscrit). Elle constitue un <strong>délit pénal flagrant</strong> entraînant l'alerte immédiate du Chef de centre et des autorités judiciaires.</li>
                        <li><strong>Falsification de certificat médical d'inaptitude (الإدلاء بشهادة طبية مزورة أو غير صحيحة للإعفاء)</strong> ou détention/utilisation d'appareils électroniques interdits lors des épreuves écrites.</li>
                    </ul>
                </li>
                <li><strong>Sanctions disciplinaires et pénales encourues (ENS Fès Ch. 16 &amp; Loi 02.13) :</strong>
                    <ul>
                        <li><strong>Sanctions administratives et scolaires :</strong> Attribution de la note zéro (00/20), annulation de l'ensemble des résultats de la session et <strong>interdiction de se présenter à l'examen pendant une durée pouvant aller de 1 à 5 années consécutives</strong> sur décision de la Commission disciplinaire académique.</li>
                        <li><strong>Sanctions pénales (Dahir 1.58.060 &amp; Loi 02.13) :</strong> Peine d'emprisonnement (de 1 mois à 3 ans / 5 ans selon la gravité et la complicité) et/ou amende pénale prononcée par le Tribunal de Première Instance, notamment en cas d'usurpation d'identité ou de fuite organisée d'épreuves.</li>
                    </ul>
                </li>
            </ul>

            <div class="arabic-law-box" id="resume-juridique-arabe" dir="rtl">
                <h3>🇲🇦 الملخص القانوني الرسمي بالعربية: تنظيم بكالوريا التربية البدنية ومسطرة زجر الغش (درس ENS فاس الفصل 16 والقانون 02.13)</h3>
                <ul>
                    <li><strong>تنظيم اختبارات التربية البدنية للمترشحين الأحرار:</strong> تجرى الاختبارات التطبيقية للمترشحين الأحرار أمام لجان فاحصة رسمية مكونة من أساتذة التربية البدنية المكلفين بمهمة، مع التحقق الصارم من البطاقة الوطنية للتعريف الإلكترونية (CNIE) والاستدعاء الرسمي لكل مترشح قبل المناداة والتسخين.</li>
                    <li><strong>مسطرة زجر الغش في الامتحانات (الفصل 16 من درس التشريع المدرسي ENS فاس — الظهير الشريف 1.58.060 والقانون 02.13):</strong> يعتبر غشاً كل تحايل في الامتحانات والمباريات العمومية، ولا سيما <strong>انتحال صفة المترشح الحقيقي (إحضار شخص آخر لاجتياز اختبار التربية البدنية مكان المترشح الحر)</strong>، أو الإدلاء بوثائق أو شهادات طبية مزورة، أو حيازة وسائل الاتصال الإلكترونية أثناء الاختبارات الكتابية.</li>
                    <li><strong>الإجراءات القانونية عند ضبط حالة غش أو انتحال صفة:</strong> يحرر الأساتذة الفاحصون أو المراقبون <strong>محضراً رسمياً لضبط حالة الغش</strong>، ويرفع فوراً إلى رئيس مركز الامتحان الذي يحيله على الأكاديمية الجهوية (لاتخاذ العقوبات التأديبية: الصفر الموجب للسقوط والحرمان من اجتياز الامتحان من سنة إلى عدة سنوات) وعلى النيابة العامة في حالة انتحال الهوية أو الجنح الجنائية.</li>
                </ul>
            </div>

            {build_dual_templates_html(
                "pv-commission-bac-sport",
                "Modèle Officiel n°10 : Procès-Verbal (PV) de Commission d'Examen d'EPS au Baccalauréat (Candidats Libres)",
                "النموذج الإداري رقم 10: محضر اللجنة الفاحصة لاختبارات التربية البدنية والرياضية لامتحانات البكالوريا (الأحرار)",
                tpl_ar,
                tpl_fr
            )}

            {get_official_pdf_download_box()}
'''

    faq_list = [
        (
            "Quelle est la sanction en cas d'usurpation d'identité (انتحال صفة مترشح) lors de l'épreuve du Bac Sport Libre au Maroc ?",
            "Conformément au Dahir n° 1.58.060 du 25 juin 1958 et à la Loi n° 02.13 (Cours ENS Fès Ch. 16), le fait qu'une tierce personne se présente à la place du candidat inscrit constitue un délit pénal flagrant. Le Chef de centre dresse un PV immédiat et saisit le Procureur du Roi (emprisonnement et amende pénale pour les deux complices + annulation du Bac et interdiction pluriannuelle)."
        ),
        (
            "Le professeur d'EPS peut-il communiquer directement sa note sur 20 au candidat libre sur le terrain le jour de l'examen ?",
            "Non. Les membres de la commission d'examen relèvent les performances physiques brutes (temps chronométré, distance mesurée) et appliquent le barème officiel OP 2007 sur le bordereau confidentiel qui est remis sous pli scellé au Chef du centre d'examen."
        ),
        (
            "ما هي الوثائق الإجبارية التي يجب على المترشح الحر الإدلاء بها يوم اختبار التربية البدنية في البكالوريا؟",
            "يجب على المترشح الحر الحضور باللباس الرياضي المناسب في الموعد المحدد، والإدلاء وجوباً بـ: 1) أصل البطاقة الوطنية للتعريف الإلكترونية (CNIE) سارية الصلاحية، و2) الاستدعاء الرسمي لاجتياز اختبارات التربية البدنية."
        ),
        (
            "Où consulter les tableaux complets des barèmes chiffrés du Bac Sport au Maroc (Course de vitesse, Demi-fond, Poids, Longueur, Gymnastique) ?",
            "Tous les tableaux chiffrés officiels des Orientations Pédagogiques 2007 (Garçons et Filles) sont disponibles gratuitement sur notre guide dédié : article-baremes-bac-sport-maroc-officiels-libres.html."
        )
    ]

    html = build_bilingual_legislation_article(
        filename, title, meta_desc, badge, h1_fr, h1_ar, ref_label, read_time, toc_items, body_html, faq_list, breadcrumb_name
    )
    with open(os.path.join(PUBLIC_DIR, filename), "w", encoding="utf-8") as f:
        f.write(html)
    print(f"[ARTICLE 10 OK] {filename}")


# ==============================================================================
# INTÉGRATION DANS BLOG.HTML, BIBLIOTHEQUE-NUMERIQUE-EPS.HTML, INDEX.HTML & SITEMAP
# ==============================================================================
def update_blog_html():
    blog_path = os.path.join(PUBLIC_DIR, "blog.html")
    with open(blog_path, "r", encoding="utf-8") as f:
        html = f.read()

    if "accident-scolaire-eps-maroc-rapport-procedure.html" in html:
        print("[SKIP] blog.html already contains the 10 legislation articles.")
        return

    # 1. Update theme card title & counts
    html = html.replace(
        '<h3>Textes Officiels</h3>\n                <span class="theme-count" id="count-documents">9</span>\n                <p>OP 2007-2009</p>',
        '<h3>Législation &amp; Textes Officiels</h3>\n                <span class="theme-count" id="count-documents">19</span>\n                <p>Législation, OP &amp; Modèles</p>'
    )
    html = html.replace('<span class="theme-count" id="count-all">117</span>', '<span class="theme-count" id="count-all">127</span>')
    html = html.replace('<span class="articles-count" id="articlesCount">117 articles</span>', '<span class="articles-count" id="articlesCount">127 articles</span>')

    cards_data = [
        (
            "accident-scolaire-eps-maroc-rapport-procedure.html",
            "Législation EPS · Dahir 1942 &amp; FADEEP",
            "⚖️ Modèle Rapport + Croquis FR/AR",
            "18 min",
            "Accident Scolaire &amp; de Service en EPS au Maroc (الحوادث المدرسية وحوادث المصلحة) : Procédure, Délais (48h / 10j) &amp; Rapport avec Croquis",
            "Guide juridique complet (Dahir 26 octobre 1942, Module FADEEP p.25-27, Assurance MENPS) : pièces du dossier (Imprimés 1, 2, 3), délais légaux et modèles de rapport + croquis des lieux en Arabe et Français prêts à copier et imprimer.",
            ["Dahir 26 Octobre 1942", "Rapport + Croquis FR/AR", "الحوادث المدرسية"]
        ),
        (
            "responsabilite-civile-penale-professeur-eps-maroc.html",
            "Législation EPS · Art. 85 bis DOC",
            "🛡️ Substitution de l'État",
            "19 min",
            "Responsabilité Civile, Pénale &amp; Administrative du Professeur d'EPS au Maroc (الفصل 85 مكرر ق.ل.ع) : Substitution de l'État &amp; Sécurité",
            "Analyse intégrale des Articles 77, 78 et 85 bis du DOC (prescription 3 ans, action récursoire) et des Articles 224-232 et 432-435 du Code Pénal (Guide MEN p.32-35) + Modèle officiel de signalement d'installation sportive dangereuse (FR/AR).",
            ["Article 85 bis DOC", "Code Pénal Maroc", "المسؤولية المدنية والجنائية"]
        ),
        (
            "deplacement-sport-scolaire-ass-frmss-ordre-mission-eps.html",
            "Sport Scolaire · Loi 30-09 &amp; BO 5997",
            "🏅 ASS &amp; FRMSS · Ordre de Mission",
            "18 min",
            "Déplacements Sport Scolaire (ASS &amp; FRMSS) au Maroc : Loi 30-09, Décret 2.10.628, Ordre de Mission &amp; Autorisation Parentale (FR/AR)",
            "Texte officiel du Décret n° 2.10.628 (BO 5997 : Art. 3 statuts ASS/FRMSS, Art. 10 délai 15 jours, Art. 11 sponsoring, Art. 17 diplôme), checklist des 6 pièces de déplacement et modèles d'Ordre de Mission + Autorisation parentale (FR/AR).",
            ["Loi 30-09 &amp; Décret 2.10.628", "Ordre de Mission ASS", "الجمعية الرياضية المدرسية"]
        ),
        (
            "certificat-medical-dispense-eps-maroc-procedure-evaluation.html",
            "Législation EPS · Santé Scolaire",
            "🏥 Dispense &amp; Évaluation /20",
            "17 min",
            "Certificat Médical &amp; Dispense d'EPS au Maroc (الإعفاء من التربية البدنية) : Validation Santé Scolaire, Présence &amp; Grille /20",
            "Règlement officiel (Guide MEN p.27 &amp; 32, Notes 142-10 et 143-09) : homologation obligatoire par le médecin de contrôle de la santé scolaire, présence en séance et fiche d'évaluation alternative sur 20 points (FR/AR).",
            ["Médecin Santé Scolaire", "Grille Dispensé /20", "الإعفاء من التربية البدنية"]
        ),
        (
            "absences-conges-enseignant-eps-maroc-droits-procedures.html",
            "Fonction Publique · Circulaire 26/2012",
            "📋 Congés, Loi 12.81 &amp; Art. 75 bis",
            "20 min",
            "Congés, Absences, Retenue sur Salaire (Loi 12.81) &amp; Abandon de Poste (Art. 75 bis) : Droits et Procédures de l'Enseignant au Maroc",
            "Les 4 catégories de congés (maladie 48h/72h, maternité 14 sem., Hajj 60j, familiaux), disponibilité (Guide MEN p.53-57), retenue 1/30e (Circulaire 26/2012) et abandon de poste (7j / 60j) + Modèles de réponse à استفسار كتابي (FR/AR).",
            ["Délai 48h/72h &amp; Loi 12.81", "Abandon de poste 75 bis", "الرخص والتغيبات"]
        ),
        (
            "inspection-pedagogique-notation-avancement-professeur-eps-maroc.html",
            "Carrière &amp; Législation · Décret 2.05.1367",
            "📈 Notation /20, Échelons &amp; Salaires",
            "21 min",
            "Inspection Pédagogique, Grille de Notation (/20), Avancement (Échelon &amp; Grade), CAP &amp; Salaires du Professeur d'EPS au Maroc",
            "Grille officielle sur 20 points (5 critères Décret 2.05.1367), rythmes d'avancement (Rapide/Moyen/Lent), examen professionnel (6 ans) et choix (10 ans), titularisation CAP et calcul des salaires/indemnités Zones A 25%, B 15%, C 10%.",
            ["Grille /20 &amp; Avancement", "Salaires Zones A/B/C", "التفتيش والترقي والأجور"]
        ),
        (
            "conseil-discipline-conseils-etablissement-incident-eps-maroc.html",
            "Gouvernance Scolaire · Décret 2.02.376",
            "🏛️ 4 Conseils &amp; Règlement Intérieur",
            "18 min",
            "Conseils de l'Établissement (Décret 2.02.376), Règlement Intérieur, Conseil de Discipline Élève &amp; Gestion des Conflits en EPS",
            "Attributions des 4 conseils (Gestion, Pédagogique, Enseignement, Classe), barème officiel des récompenses (12, 13, 15/20) et sanctions (Guide MEN p.28-31), Comité des sages (FADEEP p.28) + Modèle de rapport d'incident disciplinaire (FR/AR).",
            ["Décret 2.02.376", "Conseil de Discipline", "مجالس المؤسسة والانضباط"]
        ),
        (
            "commissions-paritaires-conseil-discipline-enseignant-maroc-droits.html",
            "Droits de l'Enseignant · Décret 2.59.0200",
            "⚖️ CAP, 12 Garanties &amp; Note 46",
            "21 min",
            "Commissions Administratives Paritaires (CAP), Conseil de Discipline du Fonctionnaire, Effacement (5/10 ans) &amp; Éthique (Note 46)",
            "Fonctionnement des CAP (Décret 2.59.0200), échelle des 9 sanctions titulaires / 4 stagiaires, les 12 garanties légales (Art. 67-73, délai 4 mois), effacement des sanctions (Art. 75 : 5 ans / 10 ans) et Note 46 + Modèles officiels (FR/AR).",
            ["CAP &amp; Art. 66-75", "Effacement 5/10 ans", "اللجان الثنائية والمجلس التأديبي"]
        ),
        (
            "cahier-de-textes-obligations-horaires-professeur-eps-maroc.html",
            "Organisation EPS · Note 155 &amp; FADEEP",
            "📘 Cahier de Textes &amp; 14 Règles",
            "18 min",
            "Cahier de Textes, Note Ministérielle n° 155, les 14 Règles de la Correspondance Administrative &amp; Obligations Horaires en EPS",
            "Valeur juridique du Cahier de Textes en EPS, documents de la Note n° 155 (FADEEP p.19), obligations horaires (24h Collège / 21h Lycée + ASS), missions du Coordonnateur et les 14 règles de la correspondance administrative + PV de coordination (FR/AR).",
            ["Note 155 &amp; Cahier Textes", "14 Règles Correspondance", "دفتر النصوص والتراسل الإداري"]
        ),
        (
            "organisation-epreuves-bac-eps-maroc-candidats-libres-officiels.html",
            "Examens &amp; Législation · Loi 02.13",
            "🎓 Bac Sport &amp; Loi Anti-Fraude",
            "19 min",
            "Organisation des Épreuves du Bac Sport au Maroc (Officiels &amp; Candidats Libres) &amp; Procédure Légale Anti-Fraude (مسطرة زجر الغش)",
            "Cadre réglementaire du Bac Sport (Officiels Massar vs Candidats Libres jury officiel — OP 2007 &amp; Note 142-10), procédure anti-fraude et usurpation d'identité (Dahir 1958, Loi 02.13, ENS Fès Ch.16) + Modèle de PV de Commission Bac Sport (FR/AR).",
            ["Bac Sport Officiels/Libres", "Loi 02.13 Anti-Fraude", "بكالوريا التربية البدنية وزجر الغش"]
        ),
    ]

    cards_html_list = []
    for slug, cat_badge, meta_tag, read_t, card_title, card_excerpt, tags in cards_data:
        cards_html_list.append(f'''                <!-- Législation EPS Maroc : {slug} -->
                <article class="article-card" data-category="documents">
                    <div class="article-visual article-documents">
                        <span class="category-badge category-documents">{cat_badge}</span>
                        <div class="article-icon">
                            <svg viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#1d4ed8" stroke-width="2"/><polyline points="14 2 14 8 20 8" stroke="#1d4ed8" stroke-width="2"/><line x1="16" y1="13" x2="8" y2="13" stroke="#991b1b" stroke-width="2"/><line x1="16" y1="17" x2="8" y2="17" stroke="#991b1b" stroke-width="2"/></svg>
                        </div>
                    </div>
                    <div class="article-content">
                        <h3 class="article-title">{card_title}</h3>
                        <p class="article-excerpt">{card_excerpt}</p>
                        <div class="article-footer">
                            <span class="article-date">4 Novembre 2026 · {read_t}</span>
                            <a href="{slug}" class="read-more">Lire le dossier + Modèles FR/AR →</a>
                        </div>
                    </div>
                </article>''')

    marker = '<div class="articles-grid" id="articlesGrid">'
    html = html.replace(marker, marker + "\n" + "\n".join(cards_html_list), 1)

    with open(blog_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("[BLOG OK] Updated /public/blog.html with 10 new Legislation articles (total 127 articles, 19 in Législation & Textes Officiels).")


def update_bibliotheque_numerique():
    bib_path = os.path.join(PUBLIC_DIR, "bibliotheque-numerique-eps.html")
    if not os.path.exists(bib_path):
        return
    with open(bib_path, "r", encoding="utf-8") as f:
        html = f.read()

    if "guide-legislation-scolaire-ethique-profession-men-maroc.pdf" in html:
        print("[SKIP] bibliotheque-numerique-eps.html already updated.")
        return

    leg_section = '''
        <!-- PROFEPS_LEGISLATION_PDF_PACK_START -->
        <section id="legislation-scolaire-eps-maroc" style="margin:2rem 0 2.75rem;padding:1.75rem;background:linear-gradient(135deg,#fff1f2 0%,#ffffff 50%,#f0fdf4 100%);border:2px solid #991b1b;border-radius:18px;box-shadow:0 8px 24px rgba(15,23,42,0.07);">
            <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;margin-bottom:1.15rem;">
                <div>
                    <span style="display:inline-block;background:#991b1b;color:#ffffff;font-size:0.75rem;font-weight:800;padding:0.25rem 0.75rem;border-radius:999px;text-transform:uppercase;">⚖️ Pack Juridique Officiel Maroc · 4 PDF + 20 Modèles A4 (FR/AR)</span>
                    <h2 style="margin:0.45rem 0 0;font-size:1.35rem;font-weight:900;color:#0f172a;">Législation Scolaire, Éthique Professionnelle &amp; Textes Officiels EPS au Maroc (التشريع المدرسي وأخلاقيات المهنة)</h2>
                </div>
                <a href="blog.html" style="padding:0.5rem 1rem;background:#006233;color:#ffffff;border-radius:8px;font-size:0.84rem;font-weight:800;text-decoration:none;">Voir les 10 Dossiers Législation EPS →</a>
            </div>
            <p style="font-size:0.94rem;color:#334155;margin-bottom:1.25rem;">Téléchargez gratuitement les <strong>4 ouvrages et textes officiels marocains en PDF</strong> (Ministère de l'Éducation Nationale, Module FADEEP, Cours ENS Fès et Décret n° 2.10.628 de la Loi 30-09 au Bulletin Officiel n° 5997) et accédez à nos <strong>10 guides bilingues FR/AR</strong> contenant 20 modèles de rapports et documents administratifs prêts à copier et imprimer :</p>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1rem;margin-bottom:1.25rem;">
                <a href="/pdf/legislation/guide-legislation-scolaire-ethique-profession-men-maroc.pdf" download style="display:flex;flex-direction:column;justify-content:space-between;padding:1.1rem;background:#ffffff;border:1px solid #cbd5e1;border-left:5px solid #991b1b;border-radius:12px;text-decoration:none;">
                    <div>
                        <span style="font-size:0.74rem;font-weight:800;color:#991b1b;">📕 Guide Officiel MENPS · 99 Pages</span>
                        <strong dir="rtl" style="display:block;font-size:0.98rem;color:#0f172a;margin:0.35rem 0;">التشريع المدرسي وأخلاقيات المهنة — وزارة التربية الوطنية</strong>
                        <p style="font-size:0.8rem;color:#475569;margin:0;">Responsabilité civile/pénale (Art. 85 bis DOC), CAP, Conseil de discipline, Disponibilité, Salaires, Note 46 &amp; Circulaire 26/2012.</p>
                    </div>
                    <span style="margin-top:0.75rem;display:inline-block;font-size:0.8rem;font-weight:800;color:#006233;">⬇ Télécharger le PDF (853 Ko)</span>
                </a>
                <a href="/pdf/legislation/module-fadeep-legislation-scolaire-organisation-administrative-maroc.pdf" download style="display:flex;flex-direction:column;justify-content:space-between;padding:1.1rem;background:#ffffff;border:1px solid #cbd5e1;border-left:5px solid #006233;border-radius:12px;text-decoration:none;">
                    <div>
                        <span style="font-size:0.74rem;font-weight:800;color:#006233;">📘 Module Officiel FADEEP · 30 Pages</span>
                        <strong dir="rtl" style="display:block;font-size:0.98rem;color:#0f172a;margin:0.35rem 0;">مجزوءة التشريع المدرسي والتنظيم الإداري والتربوي</strong>
                        <p style="font-size:0.8rem;color:#475569;margin:0;">Accidents scolaires (Imprimés 1, 2, 3 &amp; croquis), Accidents de service (48h), Note 155, 14 règles de correspondance &amp; Conseils.</p>
                    </div>
                    <span style="margin-top:0.75rem;display:inline-block;font-size:0.8rem;font-weight:800;color:#006233;">⬇ Télécharger le PDF (809 Ko)</span>
                </a>
                <a href="/pdf/legislation/cours-complet-legislation-scolaire-maroc-ens-fes-dr-najjari.pdf" download style="display:flex;flex-direction:column;justify-content:space-between;padding:1.1rem;background:#ffffff;border:1px solid #cbd5e1;border-left:5px solid #991b1b;border-radius:12px;text-decoration:none;">
                    <div>
                        <span style="font-size:0.74rem;font-weight:800;color:#991b1b;">📗 Cours ENS Fès (Dr. Najjari) · 55 Pages</span>
                        <strong dir="rtl" style="display:block;font-size:0.98rem;color:#0f172a;margin:0.35rem 0;">مادة التشريع المدرسي — المدرسة العليا للأساتذة فاس</strong>
                        <p style="font-size:0.8rem;color:#475569;margin:0;">Titularisation CAP, Notation (/20), Avancement d'échelon &amp; grade, Salaires Zones A/B/C, Congés &amp; Loi anti-fraude au Bac.</p>
                    </div>
                    <span style="margin-top:0.75rem;display:inline-block;font-size:0.8rem;font-weight:800;color:#006233;">⬇ Télécharger le PDF (547 Ko)</span>
                </a>
                <a href="/pdf/legislation/decret-2-10-628-loi-30-09-eps-sport-scolaire-maroc-bo-5997.pdf" download style="display:flex;flex-direction:column;justify-content:space-between;padding:1.1rem;background:#ffffff;border:1px solid #cbd5e1;border-left:5px solid #006233;border-radius:12px;text-decoration:none;">
                    <div>
                        <span style="font-size:0.74rem;font-weight:800;color:#006233;">⚖️ Bulletin Officiel n° 5997 · 7 Pages</span>
                        <strong dir="rtl" style="display:block;font-size:0.98rem;color:#0f172a;margin:0.35rem 0;">المرسوم 2.10.628 بتطبيق القانون 30.09 للتربية البدنية والرياضة</strong>
                        <p style="font-size:0.8rem;color:#475569;margin:0;">Texte officiel du BO 5997 : Statuts ASS &amp; FRMSS (Art. 3), Autorisations d'absence 15j (Art. 10), Sponsoring (Art. 11) &amp; Diplôme (Art. 17).</p>
                    </div>
                    <span style="margin-top:0.75rem;display:inline-block;font-size:0.8rem;font-weight:800;color:#006233;">⬇ Télécharger le PDF (277 Ko)</span>
                </a>
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:0.55rem;">
                <a href="accident-scolaire-eps-maroc-rapport-procedure.html" style="font-size:0.78rem;font-weight:700;padding:0.35rem 0.75rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;">1. Accident Scolaire &amp; Rapport + Croquis →</a>
                <a href="responsabilite-civile-penale-professeur-eps-maroc.html" style="font-size:0.78rem;font-weight:700;padding:0.35rem 0.75rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;">2. Responsabilité Civile &amp; Pénale (Art. 85 bis) →</a>
                <a href="deplacement-sport-scolaire-ass-frmss-ordre-mission-eps.html" style="font-size:0.78rem;font-weight:700;padding:0.35rem 0.75rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;">3. Déplacements ASS/FRMSS &amp; Loi 30-09 →</a>
                <a href="certificat-medical-dispense-eps-maroc-procedure-evaluation.html" style="font-size:0.78rem;font-weight:700;padding:0.35rem 0.75rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;">4. Certificat Médical &amp; Dispense EPS →</a>
                <a href="absences-conges-enseignant-eps-maroc-droits-procedures.html" style="font-size:0.78rem;font-weight:700;padding:0.35rem 0.75rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;">5. Congés, Loi 12.81 &amp; Abandon 75 bis →</a>
                <a href="inspection-pedagogique-notation-avancement-professeur-eps-maroc.html" style="font-size:0.78rem;font-weight:700;padding:0.35rem 0.75rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;">6. Inspection, Notation /20 &amp; Salaires →</a>
                <a href="conseil-discipline-conseils-etablissement-incident-eps-maroc.html" style="font-size:0.78rem;font-weight:700;padding:0.35rem 0.75rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;">7. Conseils (2.02.376) &amp; Discipline Élève →</a>
                <a href="commissions-paritaires-conseil-discipline-enseignant-maroc-droits.html" style="font-size:0.78rem;font-weight:700;padding:0.35rem 0.75rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;">8. CAP, Garanties &amp; Éthique (Note 46) →</a>
                <a href="cahier-de-textes-obligations-horaires-professeur-eps-maroc.html" style="font-size:0.78rem;font-weight:700;padding:0.35rem 0.75rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;">9. Cahier de Textes, Note 155 &amp; 14 Règles →</a>
                <a href="organisation-epreuves-bac-eps-maroc-candidats-libres-officiels.html" style="font-size:0.78rem;font-weight:700;padding:0.35rem 0.75rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;">10. Bac Sport &amp; Loi Anti-Fraude →</a>
            </div>
        </section>
        <!-- PROFEPS_LEGISLATION_PDF_PACK_END -->
'''

    target_marker = '<div class="article-content">'
    if target_marker in html:
        html = html.replace(target_marker, target_marker + "\n" + leg_section, 1)
    elif "<!-- PROFEPS_EEAT_AUTHOR_START -->" in html:
        html = html.replace("<!-- PROFEPS_EEAT_AUTHOR_START -->", leg_section + "\n<!-- PROFEPS_EEAT_AUTHOR_START -->", 1)

    with open(bib_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("[BIBLIOTHEQUE OK] Updated /public/bibliotheque-numerique-eps.html with the 4 Official PDFs and 10 Legislation guides.")


def update_index_html():
    index_path = os.path.join(PUBLIC_DIR, "index.html")
    if not os.path.exists(index_path):
        return
    with open(index_path, "r", encoding="utf-8") as f:
        html = f.read()

    if "accident-scolaire-eps-maroc-rapport-procedure.html" in html:
        print("[SKIP] index.html already contains Legislation links.")
        return

    leg_banner = '''
  <!-- PROFEPS_LEGISLATION_HUB_BANNER_START -->
  <section aria-label="Législation Scolaire & Textes Officiels EPS Maroc" style="max-width:1140px;margin:1.75rem auto;padding:1.5rem;background:linear-gradient(135deg,#fff1f2 0%,#ffffff 50%,#f0fdf4 100%);border:2px solid #991b1b;border-radius:18px;box-shadow:0 8px 22px rgba(15,23,42,0.06);">
    <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.75rem;margin-bottom:1rem;">
      <div>
        <span style="display:inline-block;font-size:0.74rem;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;color:#ffffff;background:#991b1b;padding:0.22rem 0.7rem;border-radius:999px;">⚖️ Nouveau · Législation Scolaire &amp; EPS Maroc (Bilingue FR/AR)</span>
        <h2 style="margin:0.35rem 0 0;font-size:1.22rem;font-weight:900;color:#0f172a;">10 Dossiers Juridiques + 20 Modèles Administratifs (FR/AR) + 4 Ouvrages Officiels en PDF (التشريع المدرسي والتربية البدنية)</h2>
      </div>
      <a href="blog.html" style="font-size:0.84rem;font-weight:800;color:#991b1b;text-decoration:underline;">Voir les 127 dossiers du Blog →</a>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:0.8rem;">
      <a href="accident-scolaire-eps-maroc-rapport-procedure.html" style="display:flex;flex-direction:column;justify-content:space-between;padding:0.95rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;text-decoration:none;">
        <span style="font-size:0.72rem;font-weight:800;color:#991b1b;margin-bottom:0.25rem;">⚖️ Dahir 1942 &amp; FADEEP (p. 25-27)</span>
        <strong style="font-size:0.86rem;color:#0f172a;line-height:1.35;">Accident Scolaire &amp; de Service en EPS : Procédure, Délais &amp; Modèle de Rapport + Croquis (FR/AR) →</strong>
      </a>
      <a href="responsabilite-civile-penale-professeur-eps-maroc.html" style="display:flex;flex-direction:column;justify-content:space-between;padding:0.95rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;text-decoration:none;">
        <span style="font-size:0.72rem;font-weight:800;color:#006233;margin-bottom:0.25rem;">🛡️ Art. 85 bis DOC &amp; Code Pénal</span>
        <strong style="font-size:0.86rem;color:#0f172a;line-height:1.35;">Responsabilité Civile, Pénale &amp; Administrative du Prof d'EPS : Substitution de l'État (الفصل 85 مكرر) →</strong>
      </a>
      <a href="deplacement-sport-scolaire-ass-frmss-ordre-mission-eps.html" style="display:flex;flex-direction:column;justify-content:space-between;padding:0.95rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;text-decoration:none;">
        <span style="font-size:0.72rem;font-weight:800;color:#b45309;margin-bottom:0.25rem;">🏅 Loi 30-09 &amp; Décret 2.10.628 (BO 5997)</span>
        <strong style="font-size:0.86rem;color:#0f172a;line-height:1.35;">Déplacements Sport Scolaire (ASS &amp; FRMSS) : Ordre de Mission &amp; Autorisation Parentale (FR/AR) →</strong>
      </a>
      <a href="bibliotheque-numerique-eps.html#legislation-scolaire-eps-maroc" style="display:flex;flex-direction:column;justify-content:space-between;padding:0.95rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;text-decoration:none;">
        <span style="font-size:0.72rem;font-weight:800;color:#6d28d9;margin-bottom:0.25rem;">📥 Téléchargement Direct PDF</span>
        <strong style="font-size:0.86rem;color:#0f172a;line-height:1.35;">Télécharger les 4 Ouvrages Officiels de Législation Scolaire Maroc (MENPS, FADEEP, ENS Fès, BO 5997) →</strong>
      </a>
    </div>
  </section>
  <!-- PROFEPS_LEGISLATION_HUB_BANNER_END -->
'''

    if "<!-- PROFEPS_MOROCCAN_AUTHORITY_HUB_START -->" in html:
        html = html.replace("<!-- PROFEPS_MOROCCAN_AUTHORITY_HUB_START -->", leg_banner + "\n  <!-- PROFEPS_MOROCCAN_AUTHORITY_HUB_START -->", 1)
    elif "<!-- PROFEPS_EEAT_AUTHOR_START -->" in html:
        html = html.replace("<!-- PROFEPS_EEAT_AUTHOR_START -->", leg_banner + "\n  <!-- PROFEPS_EEAT_AUTHOR_START -->", 1)

    with open(index_path, "w", encoding="utf-8") as f:
        f.write(html)
    # Mirror only index.html to root /index.html for Vite entry point
    shutil.copy2(index_path, os.path.join(ROOT_DIR, "index.html"))
    print("[INDEX OK] Updated /public/index.html and mirrored to /index.html.")


def update_sitemap_xml():
    sitemap_path = os.path.join(PUBLIC_DIR, "sitemap.xml")
    with open(sitemap_path, "r", encoding="utf-8") as f:
        xml = f.read()

    new_urls = [slug for slug, _, _ in ALL_10_ARTICLES_META] + [
        "pdf/legislation/guide-legislation-scolaire-ethique-profession-men-maroc.pdf",
        "pdf/legislation/module-fadeep-legislation-scolaire-organisation-administrative-maroc.pdf",
        "pdf/legislation/cours-complet-legislation-scolaire-maroc-ens-fes-dr-najjari.pdf",
        "pdf/legislation/decret-2-10-628-loi-30-09-eps-sport-scolaire-maroc-bo-5997.pdf"
    ]

    entries = []
    for path_item in new_urls:
        loc = f"https://profeps.ma/{path_item}"
        if loc not in xml:
            prio = "0.90" if path_item.endswith(".html") else "0.80"
            entries.append(f'''  <url>
    <loc>{loc}</loc>
    <lastmod>2026-11-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>{prio}</priority>
  </url>''')

    if entries:
        xml = xml.replace("</urlset>", "\n".join(entries) + "\n</urlset>")
        with open(sitemap_path, "w", encoding="utf-8") as f:
            f.write(xml)
        print(f"[SITEMAP OK] Added {len(entries)} new canonical URLs (10 HTML articles + 4 PDFs) to /public/sitemap.xml.")


if __name__ == "__main__":
    setup_official_pdfs()
    create_article_1()
    create_article_2()
    create_article_3()
    create_article_4()
    create_article_5()
    create_article_6()
    create_article_7()
    create_article_8()
    create_article_9()
    create_article_10()
    update_blog_html()
    update_bibliotheque_numerique()
    update_index_html()
    update_sitemap_xml()
    print("=== ALL 10 BILINGUAL LEGISLATION ARTICLES + 4 PDFS + 20 TEMPLATES GENERATED SUCCESSFULLY ===")
