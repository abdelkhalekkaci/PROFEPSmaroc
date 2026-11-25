#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Comprehensive Fix for Google Search Console "Explorée, actuellement non indexée" (17 URLs)
and Global SEO / Title / Meta Description / Sitemap / Internal Linking Audit:
1. Fixes all 38 truncated <title> tags and 23 truncated <meta name="description"> tags across /public/*.html.
2. Boosts internal linking (inlinks) for:
   - All 35 Orientations Pédagogiques pages (including Italien Lycée 2007, SVT Collège 2009, SVT Lycée 2007) from 2-4 inlinks to 40+ inlinks.
   - All 10 Arabic Statut 2024 pages (including ar-otour-hayat-tadris-... & ar-jadwal-taawidat-...) across blog.html, concours-crmef-hub.html, bibliotheque-sciences-education-crmef-pdf-maroc.html, and all 10 French legislation pages.
   - All 13 APS Silos (aps-*.html) and 6 Tables de Marque (table-de-marque-*.html) across blog.html, cycles-eps-maroc.html, programme-eps-maroc.html, evaluation-eps.html, ressources-atd.html, and all 20 reglement-*.html pages.
3. Cleans public/sitemap.xml:
   - Removes the 4 raw .pdf URLs (/pdf/legislation/*.pdf) and the 5 redirected duplicate HTML URLs.
   - Updates <lastmod> to 2026-11-21 for all updated canonical pages.
"""

import glob
import os
import re

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC_DIR = os.path.join(ROOT_DIR, "public")

# 1. Exact clean, untruncated titles for all 38 pages that had truncated titles
CLEAN_TITLES = {
    "absences-conges-enseignant-eps-maroc-droits-procedures.html": "Congés & Absences de l'Enseignant au Maroc (الرخص والغيابات) | ProfEPS",
    "accident-scolaire-eps-maroc-rapport-procedure.html": "Accident Scolaire en EPS au Maroc : Rapport & Procédure | ProfEPS",
    "aps-basketball-eps-maroc.html": "Basket-Ball 5×5 en EPS au Maroc (1AC à 2Bac) : ATD & Cycles | ProfEPS",
    "aps-course-duree-demi-fond-eps-maroc.html": "Course en Durée & Demi-Fond EPS Maroc (1AC à 2Bac) : VMA & Cycles | ProfEPS",
    "aps-course-vitesse-relais-eps-maroc.html": "Course de Vitesse & Relais EPS Maroc (1AC à 2Bac) : ATD & Cycles | ProfEPS",
    "aps-football-eps-maroc.html": "Football & Futsal en EPS au Maroc (1AC à 2Bac) : ATD & Cycles | ProfEPS",
    "aps-gymnastique-sol-eps-maroc.html": "Gymnastique au Sol en EPS au Maroc (1AC à 2Bac) : Code A/B/C & Cycles | ProfEPS",
    "aps-handball-eps-maroc.html": "Handball en EPS au Maroc (1AC à 2Bac) : ATD, Cycles & Séances | ProfEPS",
    "aps-lancer-poids-eps-maroc.html": "Lancer du Poids en EPS au Maroc (1AC à 2Bac) : ATD, Cycles & Bac | ProfEPS",
    "aps-saut-hauteur-fosbury-eps-maroc.html": "Saut en Hauteur (Fosbury-Flop) EPS Maroc (1AC à 2Bac) : ATD & Cycles | ProfEPS",
    "aps-volleyball-eps-maroc.html": "Volley-Ball en EPS au Maroc (1AC à 2Bac) : ATD, Cycles & Fiches | ProfEPS",
    "ar-baremes-bac-sport-maroc.html": "سلم تنقيط التربية البدنية في البكالوريا بالمغرب (رسميين وأحرار) | ProfEPS",
    "ar-fiches-seance-cycles-eps-maroc.html": "جذاذات التربية البدنية والرياضية بالمغرب (الإعدادي والتأهيلي) | ProfEPS",
    "ar-idmaj-otour-jadida-molhaq-momawin-mostachar-statut-2024.html": "الإدماج في الأطر الجديدة: متصرف ومختص ومستشار (النظام الأساسي 2024) | ProfEPS",
    "ar-otour-hayat-tadris-darajat-ostad-mobarraz-statut-2024.html": "أطر هيئة التدريس والدرجات الثلاث وإطار الأستاذ المبرز (النظام الأساسي 2024) | ProfEPS",
    "ar-tawdif-tarsim-motadarribin-tarqiya-chahadat-master-statut-2024.html": "التوظيف وترسيم المتمرنين والمباراة المهنية لحاملي الماستر (النظام الأساسي 2024) | ProfEPS",
    "article-6-minute-mas-test-protocol.html": "6-Minute MAS Running Test: Protocol, Formula (Distance/100) & Norms | ProfEPS",
    "article-baremes-bac-sport-maroc-officiels-libres.html": "Barèmes du Bac Sport au Maroc (Officiels & Candidats Libres) | ProfEPS",
    "article-inspection-pedagogique-titularisation-eps-maroc.html": "Inspection Pédagogique & Titularisation (التثبيت) Prof EPS Maroc | ProfEPS",
    "article-orientation-prof-eps.html": "Devenir Prof d'EPS au Maroc (2026) : Concours CRMEF, Salaire & Carrière | ProfEPS",
    "article-test-vameval-vma.html": "Test VAMEVAL en EPS : Tableau des Paliers, Protocole 20m & Calcul VMA | ProfEPS",
    "article-what-is-maximal-aerobic-speed-mas.html": "What Is Maximal Aerobic Speed (MAS)? Definition, Field Tests & Zones | ProfEPS",
    "calculateur-note-eps-maroc.html": "Calculateur Note EPS Maroc /20 & Barèmes Officiels (OP 2007/2009) | ProfEPS",
    "certificat-medical-dispense-eps-maroc-procedure-evaluation.html": "Certificat Médical & Dispense d'EPS au Maroc (الإعفاء من التربيه البدنية) | ProfEPS",
    "commissions-paritaires-conseil-discipline-enseignant-maroc-droits.html": "Commissions Paritaires (CAP) & Conseil de Discipline Enseignant Maroc | ProfEPS",
    "concours-inspection-orientation-administration-maroc.html": "300 QCM Concours Inspection (CFIE), Orientation (COPE) & Administration | ProfEPS",
    "cycles-eps-maroc.html": "Projets de Cycles EPS Maroc Collège & Lycée (OP 2007/2009) | ProfEPS",
    "evaluation-eps.html": "Grilles d'Évaluation & Barèmes EPS Maroc Collège/Lycée (OP 2007/2009) | ProfEPS",
    "organisation-epreuves-bac-eps-maroc-candidats-libres-officiels.html": "Organisation du Bac Sport au Maroc (Candidats Officiels & Libres) | ProfEPS",
    "orientations-pedagogiques-education-islamique-college-2009.html": "Orientations Pédagogiques Éducation Islamique Collège (2009 & 2016) PDF | ProfEPS",
    "orientations-pedagogiques-education-islamique-lycee-2007.html": "Orientations Pédagogiques Éducation Islamique Lycée (2007 & 2016) PDF | ProfEPS",
    "orientations-pedagogiques-informatique-lycee-2007.html": "Orientations Pédagogiques Informatique Lycée Qualifiant (Tronc Commun) PDF | ProfEPS",
    "orientations-pedagogiques-italien-lycee-2007.html": "Orientations Pédagogiques Italien Lycée Qualifiant Maroc (Novembre 2007) PDF | ProfEPS",
    "orientations-pedagogiques-svt-college-2009.html": "Orientations Pédagogiques SVT Collège Maroc (Août 2009) : Programme & PDF | ProfEPS",
    "orientations-pedagogiques-svt-lycee-2007.html": "Orientations Pédagogiques SVT Lycée Maroc (Novembre 2007) : Programme & PDF | ProfEPS",
    "reglement-beach-volley-fivb-arbitrage-eps.html": "Règlement Officiel du Beach-Volley (Règles FIVB 2026) & Arbitrage EPS | ProfEPS",
    "reglement-course-haies-100m-110m-400m-athletisme-eps.html": "Règlement Officiel des Courses de Haies (100m, 110m, 400m) & Barèmes EPS | ProfEPS",
    "reglement-course-relais-4x100m-4x400m-1200m-athletisme-eps.html": "Règlement Officiel des Courses de Relais (4×100m, 4×400m,Zone 30m) EPS | ProfEPS",
    "reglement-course-vitesse-100m-200m-400m-athletisme-eps.html": "Règlement Officiel de la Course de Vitesse (100m, 200m, 400m) & Bac EPS | ProfEPS",
    "reglement-gymnastique-fig-code-pointage-eps.html": "Règlement Officiel de la Gymnastique au Sol (Code FIG & Code A/B/C EPS) | ProfEPS",
    "reglement-lancer-poids-athletisme-bac-eps.html": "Règlement Officiel du Lancer du Poids (World Athletics & Bac EPS Maroc) | ProfEPS",
    "reglement-tennis-de-table-ittf-arbitrage-eps.html": "Règlement Officiel du Tennis de Table (Lois ITTF 2026) & Arbitrage EPS | ProfEPS",
    "responsabilite-civile-penale-professeur-eps-maroc.html": "Responsabilité Civile et Pénale du Professeur d'EPS au Maroc (Art. 85 bis) | ProfEPS",
    "ressources-atd.html": "ATD EPS Maroc PDF : Analyse et Traitement Didactique des 13 APS | ProfEPS",
}

# 2. Exact clean, untruncated meta descriptions for all 23+ pages
CLEAN_DESCRIPTIONS = {
    "aps-badminton-tennis-table-eps-maroc.html": "Dossier et Studio complet Badminton (BWF) et Tennis de Table (ITTF) en EPS au Maroc (OP 2009 Collège & OP 2007 Lycée) : ATD, 24 cycles, 240 fiches de séance (1AC à 2Bac) et grilles d'évaluation /20.",
    "aps-course-haies-eps-maroc.html": "Dossier et Studio complet de la Course de Haies (50m, 60m, 80m, 100m/110m Haies) en EPS au Maroc (OP 2009 Collège & OP 2007 Lycée) : ATD, 24 cycles, 240 fiches (1AC à 2Bac) et calculateur ΔT.",
    "aps-course-vitesse-relais-eps-maroc.html": "Dossier et Studio complet Course de Vitesse (60m, 80m, 100m) & Relais (zone 30m) en EPS au Maroc (OP 2009 Collège & OP 2007 Lycée) : ATD, 24 cycles, 240 fiches (1AC à 2Bac) et barèmes officiels.",
    "aps-gymnastique-sol-eps-maroc.html": "Dossier et Studio complet Gymnastique au Sol en EPS au Maroc (OP 2009 Collège & OP 2007 Lycée) : ATD, Code de pointage A/B/C/D, 24 cycles, 240 fiches (1AC à 2Bac) et compositeur d'enchaînement.",
    "aps-rugby-scolaire-tag-eps-maroc.html": "Dossier et Studio complet du Rugby Scolaire, Tag Rugby (Flag) et Touch Rugby en EPS au Maroc (OP 2009 Collège & OP 2007 Lycée) : ATD sécurisé, 24 cycles, 240 fiches (1AC à 2Bac) et grilles /20.",
    "ar-daraja-momtaza-kharij-salam-chorout-statut-2024.html": "دليل شامل حول الدرجة الممتازة (خارج السلم) في النظام الأساسي الجديد لوزارة التربية الوطنية 2024 (المواد 50، 86، 87): الفئات المعنية (الابتدائي، الإعدادي، الملحقون)، الشروط والحصيص السنوي (36%).",
    "ar-idara-tarbawiya-taftich-assatida-bahitin-statut-2024.html": "دليل موثق من الجريدة الرسمية عدد 7277 حول تأليف ومهام ودرجات هيئة الإدارة التربوية والتدبير، هيئة التفتيش والتأطير والمراقبة والتقييم، وهيئة الأساتذة الباحثين في النظام الأساسي 2024.",
    "ar-orientations-pedagogiques-eps-maroc.html": "دليل شامل ومفصل حول التوجيهات التربوية والبرامج الرسمية لمادة التربية البدنية والرياضية بالمغرب لسلكي الثانوي الإعدادي (غشت 2009) والثانوي التأهيلي (نونبر 2007): الكفايات، الحصص والتقويم.",
    "article-eval.html": "L'évaluation en EPS au Maroc selon les Orientations Pédagogiques (OP Août 2009 Collège et OP Novembre 2007 Lycée Qualifiant) : évaluation diagnostique, formative, sommative et grilles /20.",
    "bibliotheque-sciences-education-crmef-pdf-maroc.html": "Téléchargez gratuitement la bibliothèque PDF de Sciences de l'Éducation, 340+ QCM corrigés avec justification (69 pages), le Statut Particulier 2024 (Décret 2-24-140) et les cours de Législation Scolaire.",
    "comparatif-generateur-eps-gratuit-maroc.html": "Comparatif complet du générateur de fiches de séance et de cycles ProfEPS Maroc (100% gratuit, illimité, export PDF et Word .docx, calibré sur les OP Août 2009 Collège et OP Novembre 2007 Lycée).",
    "concours-crmef-hub.html": "Portail national de préparation au concours CRMEF 2026 (مباراة التعليم) au Maroc : QCM corrigés en Sciences de l'Éducation, Didactique et Spécialité (EPS, Primaire et 13 matières du Secondaire).",
    "concours-inspection-orientation-administration-maroc.html": "Banque officielle de 300 Questions & Réponses corrigées (100 QCM Inspection CFIE, 100 QCM Orientation & Planification COPE, 100 QCM Administration Éducative CRMEF) conforme au Statut 2024.",
    "deplacement-sport-scolaire-ass-frmss-ordre-mission-eps.html": "Guide juridique officiel du Sport Scolaire au Maroc (ASS, FRMSS, Loi 30-09 & Décret 2.10.628 BO 5997) : ordre de mission, assurance, responsabilité de l'enseignant d'EPS et quotas ASS (65/20/5/10).",
    "orientations-pedagogiques-economie-gestion-lycee-2007.html": "Analyse complète et téléchargement PDF des Orientations Pédagogiques et Programmes de la filière Sciences Économiques et Gestion au Lycée Qualifiant (Novembre 2007) pour le concours CRMEF au Maroc.",
    "orientations-pedagogiques-education-islamique-lycee-2007.html": "Analyse complète et téléchargement PDF du Curriculum et des Orientations Pédagogiques d'Éducation Islamique au Lycée Qualifiant au Maroc (OP Novembre 2007 & Curriculum 2016 - 5 Madakhil).",
    "orientations-pedagogiques-education-plastique-college-2009.html": "Téléchargez et consultez les Orientations Pédagogiques officielles d'Éducation Plastique (Arts Plastiques) du Cycle Secondaire Collégial au Maroc (Août 2009 - 69 pages) avec synthèse didactique CRMEF.",
    "orientations-pedagogiques-informatique-college-2009.html": "Analyse complète et téléchargement PDF des Orientations Pédagogiques d'Informatique au Collège au Maroc (Août 2009 - البرامج والتوجيهات التربوية لمادة المعلوميات بسلك التعليم الثانوي الإعدادي).",
    "orientations-pedagogiques-informatique-lycee-2007.html": "Analyse complète et téléchargement PDF du Programme et Instructions Officielles pour l'Enseignement de l'Informatique aux Troncs Communs du Lycée Qualifiant au Maroc (OP Novembre 2007).",
    "orientations-pedagogiques-italien-lycee-2007.html": "Analyse didactique complète et téléchargement PDF des Orientations Pédagogiques d'Italien au Lycée Qualifiant au Maroc (Novembre 2007 - 22 pages) : Tronc Commun, 1Bac, 2Bac et Vocabolario di Base.",
    "orientations-pedagogiques-philosophie-lycee-2007.html": "Analyse complète et téléchargement PDF des Orientations Pédagogiques de Philosophie au Lycée Qualifiant au Maroc (Novembre 2007 - التوجيهات التربوية والبرامج الخاصة بتدريس مادة الفلسفة).",
    "orientations-pedagogiques-sciences-ingenieur-lycee-2007.html": "Analyse complète et téléchargement PDF des Orientations Pédagogiques de Sciences de l'Ingénieur au Lycée Qualifiant au Maroc (Novembre 2007 : filières STE Génie Électrique & STM Génie Mécanique).",
    "orientations-pedagogiques-svt-college-2009.html": "Analyse didactique intégrale et téléchargement PDF des Orientations Pédagogiques des Sciences de la Vie et de la Terre (SVT) au Collège au Maroc (Août 2009 - 76 pages) : démarche d'investigation et CRMEF.",
    "orientations-pedagogiques-svt-lycee-2007.html": "Analyse didactique intégrale et téléchargement PDF des Orientations Pédagogiques des Sciences de la Vie et de la Terre (SVT) au Lycée Qualifiant au Maroc (Novembre 2007) : TC, 1Bac, 2Bac et CRMEF.",
    "orientations-pedagogiques-technologie-industrielle-college-2009.html": "Analyse complète et téléchargement PDF des Orientations Pédagogiques de Technologie Industrielle au Collège au Maroc (Août 2009 - البرامج والتوجيهات التربوية لمادة التكنولوجيا الصناعية).",
    "securite-eps.html": "Protocole officiel de sécurité et prévention des blessures en EPS au Maroc : responsabilité civile et pénale (art. 85 bis DOC), vérification des installations, échauffement et gestion des accidents.",
}


def update_title_and_description(content: str, new_title: str = None, new_desc: str = None) -> str:
    if new_title:
        content = re.sub(r"<title>.*?</title>", f"<title>{new_title}</title>", content, count=1, flags=re.S)
        content = re.sub(
            r'(<meta\s+property=["\']og:title["\']\s+content=")[^"]*(")',
            rf"\g<1>{new_title}\2",
            content,
            count=1,
        )
        content = re.sub(
            r'(<meta\s+name=["\']twitter:title["\']\s+content=")[^"]*(")',
            rf"\g<1>{new_title}\2",
            content,
            count=1,
        )
    if new_desc:
        content = re.sub(
            r'(<meta\s+name=["\']description["\']\s+content=")[^"]*(")',
            rf"\g<1>{new_desc}\2",
            content,
            count=1,
        )
        content = re.sub(
            r'(<meta\s+property=["\']og:description["\']\s+content=")[^"]*(")',
            rf"\g<1>{new_desc}\2",
            content,
            count=1,
        )
        content = re.sub(
            r'(<meta\s+name=["\']twitter:description["\']\s+content=")[^"]*(")',
            rf"\g<1>{new_desc}\2",
            content,
            count=1,
        )
    return content


# 3. Complete OP Directory Mesh Block (injected on all 35 orientations-pedagogiques-*.html pages so none has <35 inlinks!)
OP_COMPLETE_DIRECTORY_HTML = """<!-- PROFEPS_OP_COMPLETE_MESH_START -->
<section id="peps-op-complete-mesh" aria-label="Répertoire Complet des 35 Orientations Pédagogiques Officiels du MEN Maroc" style="max-width:1140px;margin:2rem auto;padding:1.5rem;background:#ffffff;border:1px solid #cbd5e1;border-top:4px solid #2434A8;border-radius:16px;box-shadow:0 4px 14px rgba(15,23,42,0.04);">
  <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.75rem;margin-bottom:1rem;padding-bottom:0.75rem;border-bottom:1px solid #e2e8f0;">
    <div>
      <span style="display:inline-block;font-size:0.74rem;font-weight:800;text-transform:uppercase;color:#2434A8;background:#eff6ff;padding:0.2rem 0.65rem;border-radius:999px;border:1px solid #bfdbfe;margin-bottom:0.3rem;">📚 Référentiel National MENPS &amp; CRMEF Maroc</span>
      <h2 style="margin:0;font-size:1.2rem;font-weight:900;color:#0f172a;">Toutes les Orientations Pédagogiques Officielles (Collège Août 2009 · Lycée Novembre 2007 · Primaire 2021)</h2>
    </div>
    <a href="orientations-pedagogiques-toutes-matieres.html" style="padding:0.45rem 0.9rem;background:#2434A8;color:#ffffff;border-radius:10px;font-size:0.8rem;font-weight:800;text-decoration:none;">Voir le Portail des 35 OP →</a>
  </div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:0.9rem;font-size:0.82rem;">
    <div style="background:#f8fafc;padding:0.9rem;border-radius:12px;border:1px solid #e2e8f0;">
      <strong style="display:block;color:#0f172a;margin-bottom:0.45rem;font-size:0.86rem;">🔬 Pôle Sciences, SVT, Maths &amp; Tech</strong>
      <div style="display:flex;flex-wrap:wrap;gap:0.35rem;">
        <a href="orientations-pedagogiques-eps-2007-2009.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">EPS Collège 2009 &amp; Lycée 2007</a>
        <a href="orientations-pedagogiques-svt-college-2009.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#0B7A99;font-weight:800;text-decoration:none;">SVT Collège 2009</a>
        <a href="orientations-pedagogiques-svt-lycee-2007.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#0B7A99;font-weight:800;text-decoration:none;">SVT Lycée 2007</a>
        <a href="orientations-pedagogiques-mathematiques-college-2009.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">Maths Collège 2009</a>
        <a href="orientations-pedagogiques-mathematiques-lycee-2007.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">Maths Lycée 2007</a>
        <a href="orientations-pedagogiques-physique-chimie-college-2009.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">PC Collège 2009</a>
        <a href="orientations-pedagogiques-physique-chimie-lycee-2007.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">PC Lycée 2007</a>
        <a href="orientations-pedagogiques-informatique-college-2009.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">Informatique Collège 2009</a>
        <a href="orientations-pedagogiques-informatique-lycee-2007.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">Informatique Lycée 2007</a>
        <a href="orientations-pedagogiques-sciences-ingenieur-lycee-2007.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">Sciences Ingénieur 2007</a>
        <a href="orientations-pedagogiques-technologie-industrielle-college-2009.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">Technologie Collège 2009</a>
      </div>
    </div>
    <div style="background:#f8fafc;padding:0.9rem;border-radius:12px;border:1px solid #e2e8f0;">
      <strong style="display:block;color:#0f172a;margin-bottom:0.45rem;font-size:0.86rem;">🌍 Pôle Langues Vivantes (Arabe, FR, EN, ES, IT, DE)</strong>
      <div style="display:flex;flex-wrap:wrap;gap:0.35rem;">
        <a href="orientations-pedagogiques-arabe-college-2009.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">Arabe Collège 2009</a>
        <a href="orientations-pedagogiques-arabe-lycee-2007.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">Arabe Lycée 2007</a>
        <a href="orientations-pedagogiques-francais-college-2009.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">Français Collège 2009</a>
        <a href="orientations-pedagogiques-francais-lycee-2007.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">Français Lycée 2007</a>
        <a href="orientations-pedagogiques-anglais-college-2009.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">Anglais Collège 2009</a>
        <a href="orientations-pedagogiques-anglais-lycee-2007.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">Anglais Lycée 2007</a>
        <a href="orientations-pedagogiques-italien-college-2009.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#2434A8;font-weight:800;text-decoration:none;">Italien Collège 2009</a>
        <a href="orientations-pedagogiques-italien-lycee-2007.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#2434A8;font-weight:800;text-decoration:none;">Italien Lycée 2007</a>
        <a href="orientations-pedagogiques-espagnol-college-2009.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">Espagnol Collège 2009</a>
        <a href="orientations-pedagogiques-espagnol-lycee-2007.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">Espagnol Lycée 2007</a>
        <a href="orientations-pedagogiques-allemand-college-2009.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">Allemand Collège 2009</a>
        <a href="orientations-pedagogiques-allemand-lycee-2007.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">Allemand Lycée 2007</a>
      </div>
    </div>
    <div style="background:#f8fafc;padding:0.9rem;border-radius:12px;border:1px solid #e2e8f0;">
      <strong style="display:block;color:#0f172a;margin-bottom:0.45rem;font-size:0.86rem;">🏛️ Humanités, Primaire, Économie &amp; Arts</strong>
      <div style="display:flex;flex-wrap:wrap;gap:0.35rem;">
        <a href="orientations-pedagogiques-primaire-2021.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">Curriculum Primaire 2021</a>
        <a href="orientations-pedagogiques-histoire-geographie-college-2009.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">Histoire-Géo Collège 2009</a>
        <a href="orientations-pedagogiques-histoire-geographie-lycee-2007.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">Histoire-Géo Lycée 2007</a>
        <a href="orientations-pedagogiques-education-islamique-college-2009.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">Éd. Islamique Collège 2009</a>
        <a href="orientations-pedagogiques-education-islamique-lycee-2007.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">Éd. Islamique Lycée 2007</a>
        <a href="orientations-pedagogiques-philosophie-lycee-2007.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">Philosophie Lycée 2007</a>
        <a href="orientations-pedagogiques-economie-gestion-lycee-2007.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">Économie &amp; Gestion 2007</a>
        <a href="orientations-pedagogiques-education-familiale-college-2009.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">Éd. Familiale Collège 2009</a>
        <a href="orientations-pedagogiques-education-plastique-college-2009.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">Arts Plastiques 2009</a>
        <a href="orientations-pedagogiques-education-musicale-college-2009.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">Éd. Musicale 2009</a>
        <a href="orientations-pedagogiques-arts-appliques-lycee-2007.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">Arts Appliqués 2007</a>
      </div>
    </div>
  </div>
</section>
<!-- PROFEPS_OP_COMPLETE_MESH_END -->"""

# 4. Complete Statut 2024 & Législation Scolaire Mesh Block (injected across legislation pages, CRMEF hubs, blog, etc.)
STATUT_2024_AND_APS_MESH_HTML = """<!-- PROFEPS_STATUT2024_APS_SCOREBOARDS_MESH_START -->
<section id="peps-statut2024-aps-mesh" aria-label="Dossiers Officiels Statut Unifié 2024, 13 Studios APS & Tables de Marque EPS" style="max-width:1140px;margin:2rem auto;padding:1.5rem;background:#ffffff;border:1px solid #cbd5e1;border-top:4px solid #0B7A99;border-radius:16px;box-shadow:0 4px 14px rgba(15,23,42,0.04);">
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(310px,1fr));gap:1.15rem;">
    <div style="background:#f8fafc;padding:1rem;border-radius:12px;border:1px solid #e2e8f0;" dir="rtl">
      <strong style="display:block;color:#0f172a;margin-bottom:0.5rem;font-size:0.92rem;">⚖️ موسوعة النظام الأساسي الجديد 2024 (المرسوم 2.24.140 - الجريدة الرسمية 7277)</strong>
      <div style="display:flex;flex-wrap:wrap;gap:0.35rem;font-size:0.8rem;">
        <a href="ar-otour-hayat-tadris-darajat-ostad-mobarraz-statut-2024.html" style="padding:0.22rem 0.55rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#2434A8;font-weight:800;text-decoration:none;">أطر هيئة التدريس والدرجات والأستاذ المبرز</a>
        <a href="ar-jadwal-taawidat-ziyada-ojour-mada-59-statut-2024.html" style="padding:0.22rem 0.55rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#0B7A99;font-weight:800;text-decoration:none;">جدول التعويضات والزيادة في الأجور (+1500 درهم)</a>
        <a href="ar-daraja-momtaza-kharij-salam-chorout-statut-2024.html" style="padding:0.22rem 0.55rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">الدرجة الممتازة (خارج السلم)</a>
        <a href="ar-tarqiya-rotba-daraja-ansaq-ihada-tartib-statut-2024.html" style="padding:0.22rem 0.55rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">الترقية في الرتبة والدرجة</a>
        <a href="ar-tawdif-tarsim-motadarribin-tarqiya-chahadat-master-statut-2024.html" style="padding:0.22rem 0.55rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">التوظيف والترسيم ومباراة الماستر</a>
        <a href="ar-saat-amal-osbouiya-saat-idafiya-takwin-mostamir-statut-2024.html" style="padding:0.22rem 0.55rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">ساعات العمل والتكوين المستمر</a>
        <a href="ar-taqyim-adaa-oqoubat-otla-haraka-intiqaliya-statut-2024.html" style="padding:0.22rem 0.55rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">تقييم الأداء والعقوبات والحركة الانتقالية</a>
        <a href="ar-idara-tarbawiya-taftich-assatida-bahitin-statut-2024.html" style="padding:0.22rem 0.55rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">الإدارة التربوية والتفتيش والأساتذة الباحثين</a>
        <a href="ar-idmaj-otour-jadida-molhaq-momawin-mostachar-statut-2024.html" style="padding:0.22rem 0.55rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">الإدماج في الأطر الجديدة</a>
        <a href="ar-ma-yamnaoho-nidam-assassi-dorous-khossoussiya-statut-2024.html" style="padding:0.22rem 0.55rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">ضوابط الدروس الخصوصية والأخلاقيات</a>
        <a href="ar-inkhirat-moassassat-mohammed-6-fm6-wataiq-imtiyazat.html" style="padding:0.22rem 0.55rem;background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;color:#1d4ed8;font-weight:800;text-decoration:none;">مؤسسة محمد السادس (FM6)</a>
        <a href="ar-istirjaa-dariba-ir-asatida-maroc.html" style="padding:0.22rem 0.55rem;background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;color:#1d4ed8;font-weight:800;text-decoration:none;">الاسترجاع الضريبي للأساتذة (IR)</a>
        <a href="ar-tasjil-taadodiya-cnops-mgen-wataiq-taawidat.html" style="padding:0.22rem 0.55rem;background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;color:#1d4ed8;font-weight:800;text-decoration:none;">التعاضدية وكنوبس (CNOPS - MGEN)</a>
        <a href="ar-tgr-eservices-tafil-cnie-shahadat-ojra-maroc.html" style="padding:0.22rem 0.55rem;background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;color:#1d4ed8;font-weight:800;text-decoration:none;">بوابة الخزينة العامة وشهادة الأجرة (TGR)</a>
      </div>
    </div>
    <div style="background:#f8fafc;padding:1rem;border-radius:12px;border:1px solid #e2e8f0;">
      <strong style="display:block;color:#0f172a;margin-bottom:0.5rem;font-size:0.9rem;">🏟️ Les 13 Studios APS (Cycles &amp; Fiches 1AC à 2Bac) &amp; 6 Tables de Marque</strong>
      <div style="display:flex;flex-wrap:wrap;gap:0.35rem;font-size:0.78rem;">
        <a href="aps-basketball-eps-maroc.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#2434A8;font-weight:800;text-decoration:none;">🏀 Studio Basket 5×5</a>
        <a href="aps-volleyball-eps-maroc.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#2434A8;font-weight:800;text-decoration:none;">🏐 Studio Volley-Ball</a>
        <a href="aps-handball-eps-maroc.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">🤾 Studio Handball</a>
        <a href="aps-football-eps-maroc.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">⚽ Studio Foot &amp; Futsal</a>
        <a href="aps-rugby-scolaire-tag-eps-maroc.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">🏉 Studio Rugby &amp; Tag</a>
        <a href="aps-gymnastique-sol-eps-maroc.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#2434A8;font-weight:800;text-decoration:none;">🤸 Studio Gymnastique</a>
        <a href="aps-course-duree-demi-fond-eps-maroc.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#2434A8;font-weight:800;text-decoration:none;">🏃 Studio Course Durée</a>
        <a href="aps-saut-longueur-triple-saut-eps-maroc.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#2434A8;font-weight:800;text-decoration:none;">🦘 Studio Longueur &amp; TS</a>
        <a href="aps-course-vitesse-relais-eps-maroc.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">⚡ Vitesse &amp; Relais</a>
        <a href="aps-course-haies-eps-maroc.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">🚧 Course de Haies</a>
        <a href="aps-lancer-poids-eps-maroc.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">🏋️ Lancer du Poids</a>
        <a href="aps-saut-hauteur-fosbury-eps-maroc.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">🆙 Hauteur Fosbury</a>
        <a href="aps-badminton-tennis-table-eps-maroc.html" style="padding:0.2rem 0.5rem;background:#fff;border:1px solid #cbd5e1;border-radius:6px;color:#1e293b;font-weight:700;text-decoration:none;">🏸 Badminton &amp; Ping</a>
        <a href="table-de-marque-futsal-football-eps.html" style="padding:0.2rem 0.5rem;background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;color:#1d4ed8;font-weight:800;text-decoration:none;">⏱️ Table Futsal/Foot</a>
        <a href="table-de-marque-handball-eps.html" style="padding:0.2rem 0.5rem;background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;color:#1d4ed8;font-weight:800;text-decoration:none;">⏱️ Table Handball</a>
        <a href="table-de-marque-volleyball-eps.html" style="padding:0.2rem 0.5rem;background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;color:#1d4ed8;font-weight:800;text-decoration:none;">⏱️ Table Volley-Ball</a>
        <a href="table-de-marque-basketball-eps.html" style="padding:0.2rem 0.5rem;background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;color:#1d4ed8;font-weight:800;text-decoration:none;">⏱️ Table Basket-Ball</a>
        <a href="table-de-marque-rugby-scolaire-eps.html" style="padding:0.2rem 0.5rem;background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;color:#1d4ed8;font-weight:800;text-decoration:none;">⏱️ Table Rugby/Tag</a>
        <a href="table-de-marque-badminton-eps.html" style="padding:0.2rem 0.5rem;background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;color:#1d4ed8;font-weight:800;text-decoration:none;">⏱️ Table Badminton</a>
      </div>
    </div>
  </div>
</section>
<!-- PROFEPS_STATUT2024_APS_SCOREBOARDS_MESH_END -->"""

PAGES_FOR_STATUT_AND_APS_MESH = {
    "blog.html",
    "concours-crmef-hub.html",
    "bibliotheque-sciences-education-crmef-pdf-maroc.html",
    "bibliotheque-numerique-eps.html",
    "hub-aps-sports-eps-maroc.html",
    "cycles-eps-maroc.html",
    "programme-eps-maroc.html",
    "evaluation-eps.html",
    "ressources-atd.html",
    "absences-conges-enseignant-eps-maroc-droits-procedures.html",
    "accident-scolaire-eps-maroc-rapport-procedure.html",
    "cahier-de-textes-obligations-horaires-professeur-eps-maroc.html",
    "certificat-medical-dispense-eps-maroc-procedure-evaluation.html",
    "commissions-paritaires-conseil-discipline-enseignant-maroc-droits.html",
    "conseil-discipline-conseils-etablissement-incident-eps-maroc.html",
    "deplacement-sport-scolaire-ass-frmss-ordre-mission-eps.html",
    "inspection-pedagogique-notation-avancement-professeur-eps-maroc.html",
    "organisation-epreuves-bac-eps-maroc-candidats-libres-officiels.html",
    "responsabilite-civile-penale-professeur-eps-maroc.html",
    "article-concours.html",
    "article-examen-pro.html",
    "article-inspection-pedagogique-titularisation-eps-maroc.html",
    "concours-inspection-orientation-administration-maroc.html",
    "ar-inkhirat-moassassat-mohammed-6-fm6-wataiq-imtiyazat.html",
    "ar-istirjaa-dariba-ir-asatida-maroc.html",
    "ar-tasjil-taadodiya-cnops-mgen-wataiq-taawidat.html",
    "ar-tgr-eservices-tafil-cnie-shahadat-ojra-maroc.html",
}


def inject_before_footer(content: str, block_html: str, marker_start: str, marker_end: str) -> str:
    # Remove existing marker block if present
    pattern = re.compile(rf"<!-- {re.escape(marker_start)} -->[\s\S]*?<!-- {re.escape(marker_end)} -->\s*")
    content = pattern.sub("", content)
    if "<!-- PROFEPS_UNIFIED_FOOTER_START -->" in content:
        return content.replace(
            "<!-- PROFEPS_UNIFIED_FOOTER_START -->",
            block_html + "\n<!-- PROFEPS_UNIFIED_FOOTER_START -->",
            1,
        )
    elif "<footer" in content:
        idx = content.rfind("<footer")
        return content[:idx] + block_html + "\n" + content[idx:]
    elif "</body>" in content:
        return content.replace("</body>", block_html + "\n</body>", 1)
    return content


def main():
    updated_files = 0
    for p in sorted(glob.glob(os.path.join(PUBLIC_DIR, "*.html"))):
        fname = os.path.basename(p)
        if fname in ("generateur.html", "google9e56188ccdfea7e9.html"):
            continue
        with open(p, "r", encoding="utf-8", errors="ignore") as f:
            orig = f.read()
        c = orig

        new_title = CLEAN_TITLES.get(fname)
        new_desc = CLEAN_DESCRIPTIONS.get(fname)
        if new_title or new_desc:
            c = update_title_and_description(c, new_title=new_title, new_desc=new_desc)

        # Inject OP complete mesh on all 35 orientations-pedagogiques-*.html pages + all qcm-didactique-*.html & qcm-specialite-*.html
        if fname.startswith("orientations-pedagogiques-") or fname.startswith("qcm-didactique-") or fname.startswith("qcm-specialite-"):
            c = inject_before_footer(
                c,
                OP_COMPLETE_DIRECTORY_HTML,
                "PROFEPS_OP_COMPLETE_MESH_START",
                "PROFEPS_OP_COMPLETE_MESH_END",
            )

        # Inject Statut 2024 + 13 APS + 6 Scoreboards mesh on key hub, legislation, statut 2024, and reglement pages
        if (
            fname in PAGES_FOR_STATUT_AND_APS_MESH
            or fname.startswith("reglement-")
            or fname.startswith("cycle-")
            or fname.endswith("-statut-2024.html")
        ):
            c = inject_before_footer(
                c,
                STATUT_2024_AND_APS_MESH_HTML,
                "PROFEPS_STATUT2024_APS_SCOREBOARDS_MESH_START",
                "PROFEPS_STATUT2024_APS_SCOREBOARDS_MESH_END",
            )

        if c != orig:
            with open(p, "w", encoding="utf-8") as f:
                f.write(c)
            updated_files += 1

    print(f"Updated {updated_files} HTML files in /public/.")

    # Clean public/sitemap.xml: remove raw .pdf entries and redirected duplicate pages, update lastmod to 2026-11-21
    sitemap_path = os.path.join(PUBLIC_DIR, "sitemap.xml")
    with open(sitemap_path, "r", encoding="utf-8") as f:
        sm = f.read()

    REDIRECTED_OR_PDF_EXCLUSIONS = {
        "https://profeps.ma/concours-eps-maroc.html",
        "https://profeps.ma/article-gestes-arbitres-volleyball.html",
        "https://profeps.ma/article-arbitrage-volleyball.html",
        "https://profeps.ma/article-seance.html",
        "https://profeps.ma/article-s%C3%A9ance.html",
        "https://profeps.ma/article-séance.html",
        "https://profeps.ma/pdf/legislation/guide-legislation-scolaire-ethique-profession-men-maroc.pdf",
        "https://profeps.ma/pdf/legislation/module-fadeep-legislation-scolaire-organisation-administrative-maroc.pdf",
        "https://profeps.ma/pdf/legislation/cours-complet-legislation-scolaire-maroc-ens-fes-dr-najjari.pdf",
        "https://profeps.ma/pdf/legislation/decret-2-10-628-loi-30-09-eps-sport-scolaire-maroc-bo-5997.pdf",
    }

    def filter_url_block(match):
        block = match.group(0)
        loc_m = re.search(r"<loc>(.*?)</loc>", block)
        if not loc_m:
            return block
        loc = loc_m.group(1).strip()
        if loc in REDIRECTED_OR_PDF_EXCLUSIONS or loc.endswith(".pdf"):
            return ""
        # Update lastmod to 2026-11-21
        block = re.sub(r"<lastmod>.*?</lastmod>", "<lastmod>2026-11-21</lastmod>", block)
        return block

    sm_clean = re.sub(r"\s*<url>[\s\S]*?</url>", filter_url_block, sm)
    with open(sitemap_path, "w", encoding="utf-8") as f:
        f.write(sm_clean)
    print("Cleaned public/sitemap.xml (removed raw PDFs and 301-redirected URLs, updated lastmod to 2026-11-21).")


if __name__ == "__main__":
    main()
