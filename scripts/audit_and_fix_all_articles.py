#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Comprehensive Audit & Repair Script for all HTML articles in /public/
(strictly excluding generateur.html and google9e56188ccdfea7e9.html).
"""

import glob
import os
import re

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC_DIR = os.path.join(ROOT_DIR, "public")

BROKEN_LINK_MAP = {
    "article-fiche-seance-basketball-eps.html": "aps-basketball-eps-maroc.html",
    "article-fiche-seance-course-duree-eps.html": "article-course-duree-eps.html",
    "article-fiche-seance-course-vitesse-eps.html": "aps-course-vitesse-relais-eps-maroc.html",
    "article-fiche-seance-football-eps.html": "aps-football-eps-maroc.html",
    "article-fiche-seance-gymnastique-sol-eps.html": "aps-gymnastique-sol-eps-maroc.html",
    "article-fiche-seance-gymnastique-eps.html": "article-seance-gymnastique.html",
    "article-fiche-seance-handball-eps.html": "article-handball-eps.html",
    "article-fiche-seance-lancer-poids-eps.html": "aps-lancer-poids-eps-maroc.html",
    "article-fiche-seance-rugby-eps.html": "article-rugby-eps-maroc.html",
    "article-fiche-seance-saut-longueur-eps.html": "aps-saut-longueur-triple-saut-eps-maroc.html",
    "article-fiche-seance-volleyball-eps.html": "article-volleyball-eps.html",
    "article-gymnastique-sol-eps.html": "aps-gymnastique-sol-eps-maroc.html",
    "article-lancer-poids-eps.html": "aps-lancer-poids-eps-maroc.html",
    "aps-lancer-poids-disque-javelot-eps-maroc.html": "aps-lancer-poids-eps-maroc.html",
    "article-oral-crmef-eps-maroc.html": "article-oral-crmef-eps.html",
    "guide-reussir-oral-concours-crmef-eps.html": "article-oral-crmef-eps.html",
    "reglement-football-ifab-arbitrage-eps.html": "reglement-football-lois-jeu-ifab-arbitrage-eps.html",
    "cycle-athletisme-college-eps-maroc.html": "aps-course-vitesse-relais-eps-maroc.html",
    "cycle-athletisme-lycee-eps-maroc.html": "aps-course-duree-demi-fond-eps-maroc.html",
    "cycle-basketball-lycee-eps-maroc.html": "cycle-basketball-college-eps-maroc.html",
    "cycle-course-duree-college-eps-maroc.html": "aps-course-duree-demi-fond-eps-maroc.html",
    "cycle-course-duree-lycee-eps-maroc.html": "article-course-duree-eps.html",
    "cycle-course-haies-college-eps-maroc.html": "aps-course-haies-eps-maroc.html",
    "cycle-course-haies-lycee-eps-maroc.html": "reglement-course-haies-100m-110m-400m-athletisme-eps.html",
    "cycle-course-relais-college-eps-maroc.html": "aps-course-vitesse-relais-eps-maroc.html",
    "cycle-course-relais-lycee-eps-maroc.html": "reglement-course-relais-4x100m-4x400m-1200m-athletisme-eps.html",
    "cycle-course-vitesse-college-eps-maroc.html": "aps-course-vitesse-relais-eps-maroc.html",
    "cycle-course-vitesse-lycee-eps-maroc.html": "reglement-course-vitesse-100m-200m-400m-athletisme-eps.html",
    "cycle-football-college-eps-maroc.html": "aps-football-eps-maroc.html",
    "cycle-football-lycee-eps-maroc.html": "reglement-football-lois-jeu-ifab-arbitrage-eps.html",
    "cycle-gymnastique-college-eps-maroc.html": "aps-gymnastique-sol-eps-maroc.html",
    "cycle-gymnastique-lycee-eps-maroc.html": "article-seance-gymnastique.html",
    "cycle-handball-lycee-eps-maroc.html": "cycle-handball-college-eps-maroc.html",
    "cycle-lancer-poids-college-eps-maroc.html": "aps-lancer-poids-eps-maroc.html",
    "cycle-lancer-poids-lycee-eps-maroc.html": "reglement-lancer-poids-athletisme-bac-eps.html",
    "cycle-rugby-college-eps-maroc.html": "aps-rugby-scolaire-tag-eps-maroc.html",
    "cycle-rugby-lycee-eps-maroc.html": "reglement-rugby-world-rugby-arbitrage-eps.html",
    "cycle-saut-hauteur-college-eps-maroc.html": "aps-saut-hauteur-fosbury-eps-maroc.html",
    "cycle-saut-hauteur-lycee-eps-maroc.html": "aps-saut-hauteur-fosbury-eps-maroc.html",
    "cycle-saut-longueur-college-eps-maroc.html": "aps-saut-longueur-triple-saut-eps-maroc.html",
    "cycle-saut-longueur-lycee-eps-maroc.html": "reglement-saut-longueur-triple-saut-athletisme-eps.html",
    "cycle-tennis-de-table-college-eps-maroc.html": "article-tennis-de-table-eps.html",
    "cycle-tennis-de-table-lycee-eps-maroc.html": "reglement-tennis-de-table-ittf-arbitrage-eps.html",
    "cycle-tennis-table-lycee-eps-maroc.html": "aps-badminton-tennis-table-eps-maroc.html",
    "cycle-volleyball-lycee-eps-maroc.html": "cycle-volleyball-college-eps-maroc.html",
    "orientations-pedagogiques-eps-maroc.html": "orientations-pedagogiques-eps-2007-2009.html",
    "planificateur-seances-vma-groupes-eps.html": "calculateur-vma.html",
    "/documents/orientations-pedagogiques-eps-college-2009.pdf": "bibliotheque-numerique-eps.html",
    "/documents/orientations-pedagogiques-eps-lycee-2007.pdf": "bibliotheque-numerique-eps.html",
    "/documents/orientations-pedagogiques-college-2007.pdf": "bibliotheque-numerique-eps.html",
    "/documents/orientations-pedagogiques-lycee-2009.pdf": "bibliotheque-numerique-eps.html",
}

ARABIC_EPS_EEAT_CARD = """<!-- PROFEPS_EEAT_AUTHOR_START -->
  <aside id="peps-eeat-author-card" dir="rtl" aria-label="الكاتب والمراجعة التربوية والبيداغوجية" style="max-width:1024px;margin:1.75rem auto;padding:1.25rem 1.5rem;background:#ffffff;border:1px solid #e2e8f0;border-right:4px solid #991b1b;border-radius:16px;box-shadow:0 2px 10px rgba(15,23,42,0.04);text-align:right;">
    <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;">
      <div style="display:flex;align-items:center;gap:0.9rem;">
        <a href="a-propos.html" style="width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,#991b1b,#006233);color:#ffffff;font-weight:900;font-size:1.05rem;display:flex;align-items:center;justify-content:center;text-decoration:none;flex-shrink:0;">AE</a>
        <div>
          <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.5rem;">
            <span style="font-size:0.75rem;font-weight:800;color:#991b1b;background:#fef2f2;padding:0.15rem 0.55rem;border-radius:6px;border:1px solid #fecaca;">✔ محتوى تربوي وبيداغوجي موثق E-E-A-T</span>
            <span style="font-size:0.78rem;color:#64748b;font-weight:700;">مراجعة بيداغوجية : <time datetime="2026-11">نونبر 2026</time></span>
          </div>
          <p style="margin:0.25rem 0 0 0;font-size:0.94rem;font-weight:800;color:#0f172a;">
            إعداد ومراجعة الأستاذ <a href="a-propos.html" style="color:#991b1b;text-decoration:underline;">عبد الخالق البوداني (Abdelkhalek ELBOUDANI)</a> — أستاذ التربية البدنية والرياضية بالمغرب ومؤسس منصة ProfEPS
          </p>
          <p style="margin:0.2rem 0 0 0;font-size:0.8rem;color:#475569;line-height:1.5;">
            <strong>المصادر والنصوص المرجعية الرسمية :</strong> التوجيهات التربوية الرسمية لمادة التربية البدنية والرياضية بالمغرب (2007 للثانوي التأهيلي و2009 للثانوي الإعدادي) والقوانين الدولية للرياضات (IFAB, IHF, FIBA, FIVB, World Athletics, FIG).
          </p>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem;">
        <a href="a-propos.html" style="padding:0.45rem 0.85rem;background:#f8fafc;border:1px solid #cbd5e1;border-radius:10px;font-size:0.78rem;font-weight:800;color:#1e293b;text-decoration:none;">ميثاق التحرير والكاتب ←</a>
        <a href="orientations-pedagogiques-eps-2007-2009.html" style="padding:0.45rem 0.85rem;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;font-size:0.78rem;font-weight:800;color:#166534;text-decoration:none;">التوجيهات التربوية 2007/2009</a>
      </div>
    </div>
  </aside>
<!-- PROFEPS_EEAT_AUTHOR_END -->"""

OLD_LANG_JS_PATTERN = re.compile(
    r"(?:var nativeLang\s*=[\s\S]*?)?window\.profepsSetLang\s*=\s*function\([^)]*\)\s*\{[\s\S]*?\}\s*\}\s*\)\(\);",
    re.MULTILINE
)

NEW_LANG_JS_BLOCK = """var nativeLang = ((document.documentElement.getAttribute('lang') || 'fr').toLowerCase().slice(0, 2));
  var nativeDir = document.documentElement.getAttribute('dir') || (nativeLang === 'ar' ? 'rtl' : 'ltr');

  window.profepsSetLang = function(lang, isAutoInit) {
    if (!isAutoInit) {
      try { localStorage.setItem('profeps_lang', lang); } catch(e) {}
    }
    ['fr', 'en', 'ar'].forEach(function(code) {
      var btn = document.getElementById('peps-btn-lang-' + code);
      if (btn) btn.className = (code === lang) ? 'peps-lang-btn active' : 'peps-lang-btn';
      document.querySelectorAll('.peps-lang-btn[data-lang="' + code + '"]').forEach(function(b) {
        b.className = (code === lang) ? 'peps-lang-btn active' : 'peps-lang-btn';
      });
    });
    document.querySelectorAll('[data-i18n-' + lang + ']').forEach(function(el) {
      var val = el.getAttribute('data-i18n-' + lang);
      if (val) el.textContent = val;
    });
    if (typeof window.setToolLang === 'function') window.setToolLang(lang);
    if (typeof window.changeLang === 'function') window.changeLang(lang);
    if (typeof window.setLanguage === 'function') window.setLanguage(lang);
    var hasBodyI18n = (
      typeof window.setToolLang === 'function' ||
      typeof window.changeLang === 'function' ||
      typeof window.setLanguage === 'function' ||
      document.querySelector('main [data-i18n-ar], .hero [data-i18n-ar], .vma-hero [data-i18n-ar]') !== null
    );
    if (hasBodyI18n) {
      document.documentElement.lang = lang;
      document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    } else {
      document.documentElement.lang = nativeLang;
      document.documentElement.dir = nativeDir;
    }
  };

  var saved = nativeLang === 'ar' ? 'ar' : 'fr';
  try {
    var storedLang = localStorage.getItem('profeps_lang');
    if (nativeLang === 'ar') {
      saved = 'ar';
    } else if (storedLang) {
      saved = storedLang;
    }
  } catch(e) {}
  if (saved && (saved !== 'fr' || nativeLang === 'ar')) {
    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', function() { window.profepsSetLang(saved, true); });
    } else {
      window.profepsSetLang(saved, true);
    }
  }
})();"""


def fix_anchors_and_specific_pages(fname: str, content: str) -> str:
    # 1. qcm-150-questions-crmef-eps.html missing tailwind-precompiled.min.css
    if fname == "qcm-150-questions-crmef-eps.html":
        if "/css/tailwind-precompiled.min.css" not in content:
            content = content.replace(
                '<link rel="stylesheet" href="/css/profeps-unifier.min.css?v=20261101">',
                '<link rel="stylesheet" href="/css/tailwind-precompiled.min.css?v=20261101">\n    <link rel="stylesheet" href="/css/profeps-unifier.min.css?v=20261101">'
            )

    # 2. Add /css/profeps-unifier.min.css?v=20261101 if missing
    if "/css/profeps-unifier.min.css" not in content:
        content = content.replace(
            "</head>",
            '    <link rel="stylesheet" href="/css/profeps-unifier.min.css?v=20261101">\n</head>',
            1
        )

    # 3. Localize #peps-eeat-author-card on the 4 Arabic EPS pages
    if fname in (
        "ar-baremes-bac-sport-maroc.html",
        "ar-concours-crmef-eps-maroc.html",
        "ar-fiches-seance-cycles-eps-maroc.html",
        "ar-orientations-pedagogiques-eps-maroc.html",
    ):
        content = re.sub(
            r"<!-- PROFEPS_EEAT_AUTHOR_START -->[\s\S]*?<!-- PROFEPS_EEAT_AUTHOR_END -->",
            ARABIC_EPS_EEAT_CARD,
            content,
            count=1
        )

    # 4. Remove leftover PROFEPS_MOROCCAN_AUTHORITY_HUB
    if "PROFEPS_MOROCCAN_AUTHORITY_HUB_START" in content:
        content = re.sub(
            r"<!-- PROFEPS_MOROCCAN_AUTHORITY_HUB_START -->[\s\S]*?<!-- PROFEPS_MOROCCAN_AUTHORITY_HUB_END -->\s*",
            "",
            content
        )

    # 5. Fix truncated JSON-LD in hub-aps-sports-eps-maroc.html
    if fname == "hub-aps-sports-eps-maroc.html":
        content = content.replace(
            '"publisher": {"@id": "https://profeps.ma/#organization"}</script>',
            '"publisher": {"@id": "https://profeps.ma/#organization"}}</script>'
        )

    # 6. Fix raw markdown **2 cm** in aps-saut-hauteur-fosbury-eps-maroc.html
    if fname == "aps-saut-hauteur-fosbury-eps-maroc.html":
        content = content.replace("**2 cm**", "<strong>2 cm</strong>")

    # 7. Fix missing #anchors in the 7 specific pages
    if fname == "ar-baremes-bac-sport-maroc.html":
        if 'id="conseils-examen"' not in content:
            content = content.replace(
                '<h2 id="faq-ar">',
                '<div id="conseils-examen"></div>\n            <h2 id="faq-ar">'
            )
    elif fname == "ar-concours-crmef-eps-maroc.html":
        if 'id="sciences-education"' not in content:
            content = content.replace(
                '<h2 id="epreuve-orale">',
                '<div id="sciences-education"></div>\n            <h2 id="epreuve-orale">'
            )
        if 'id="qcm-simulateurs"' not in content:
            content = content.replace(
                '<h2 id="faq-ar">',
                '<div id="qcm-simulateurs"></div>\n            <h2 id="faq-ar">'
            )
    elif fname == "ar-fiches-seance-cycles-eps-maroc.html":
        if 'id="structure-cycle"' not in content:
            content = content.replace(
                '<h2 id="criteres-diff">',
                '<div id="structure-cycle"></div>\n            <h2 id="criteres-diff">'
            )
    elif fname == "ar-orientations-pedagogiques-eps-maroc.html":
        if 'id="evaluation-20"' not in content:
            content = content.replace(
                '<h2 id="generateur-link">',
                '<div id="evaluation-20"></div>\n            <h2 id="generateur-link">'
            )
    elif fname == "article-inspection-pedagogique-titularisation-eps-maroc.html":
        if 'id="grille-inspecteur"' not in content:
            content = content.replace(
                '<h2 id="seance-observee">',
                '<div id="grille-inspecteur"></div>\n            <h2 id="seance-observee">'
            )
    elif fname == "comparatif-generateur-eps-gratuit-maroc.html":
        if 'id="conformite-op"' not in content:
            content = content.replace(
                '<h2 id="tableau-comparatif">',
                '<div id="conformite-op"></div>\n            <h2 id="tableau-comparatif">'
            )
        if 'id="ecosysteme-complet"' not in content:
            content = content.replace(
                '<h2 id="avantages-word-pdf">',
                '<div id="ecosysteme-complet"></div>\n            <h2 id="avantages-word-pdf">'
            )
    elif fname == "qcm-concours-crmef.html":
        card_map = {
            "card-francais": "qcm-didactique-francais-maroc.html",
            "card-arabe": "qcm-didactique-arabe-maroc.html",
            "card-anglais": "qcm-didactique-anglais-maroc.html",
            "card-islam": "qcm-didactique-education-islamique-maroc.html",
        }
        for cid, target_href in card_map.items():
            if f'id="{cid}"' not in content:
                content = content.replace(f'href="{target_href}"', f'id="{cid}" href="{target_href}"', 1)

    return content


def main():
    files = sorted(glob.glob(os.path.join(PUBLIC_DIR, "*.html")))
    modified_count = 0

    for fpath in files:
        fname = os.path.basename(fpath)
        if fname in ("generateur.html", "google9e56188ccdfea7e9.html"):
            continue

        with open(fpath, "r", encoding="utf-8") as f:
            orig = f.read()

        updated = orig

        # Replace broken internal links & assets
        for bad_href, good_href in BROKEN_LINK_MAP.items():
            updated = updated.replace(f'href="{bad_href}"', f'href="{good_href}"')
            updated = updated.replace(f'href="/{bad_href.lstrip("/")}"', f'href="{good_href}"')

        updated = updated.replace('href="/favicon.svg"', 'href="/images/prof_eps.png"')

        # Fix window.profepsSetLang RTL/LTR bug
        if "window.profepsSetLang" in updated:
            updated = OLD_LANG_JS_PATTERN.sub(NEW_LANG_JS_BLOCK, updated)

        # Page-specific fixes
        updated = fix_anchors_and_specific_pages(fname, updated)

        if updated != orig:
            with open(fpath, "w", encoding="utf-8") as f:
                f.write(updated)
            modified_count += 1

    print(f"[OK] Audited and repaired {modified_count} additional HTML files in /public/.")


if __name__ == "__main__":
    main()
