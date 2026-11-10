#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Master Fix, Audit & Polish Script for ProfEPS Maroc:
1. Fixes JS string escaping in the 4 silo generator scripts (Durée/Demi-Fond, Lancer du Poids, Saut en Longueur/TS, Saut en Hauteur) and regenerates those 4 HTML files.
2. Cleans all remaining LaTeX ($...$, \text{...}, \times, \(...\), etc.) across all 13 APS silos and hub-aps-sports-eps-maroc.html.
3. Fixes broken link in aps-gymnastique-sol-eps-maroc.html (accident-scolaire-eps-maroc-rapport-procedure.html).
4. Adds ?level= URL query parameter auto-selection to any silo missing it.
5. Unifies the 13-Silo Quick-Navigation Bar across all 13 APS silos so every silo links to all 13 silos + Hub.
6. Upgrades hub-aps-sports-eps-maroc.html so all 13 silos have uniform featured cards + filter counts (13 APS: 5 Collectifs, 6 Athlétisme, 2 Gymnastique & Raquettes).
7. Updates Home Page (/public/index.html & /index.html): replaces the duplicated CRMEF Hub banner with a dedicated, interactive Hub des Sports & 13 Studios APS section.
8. Updates the Footer across all /public/*.html pages (STRICTLY EXCLUDING generateur.html) to add "Hub des Sports & APS" (hub-aps-sports-eps-maroc.html) right below "À propos".
"""

import os
import re
import glob
import shutil
import subprocess

ROOT_DIR = "/app/applet" if os.path.exists("/app/applet/public") else "."
PUBLIC_DIR = os.path.join(ROOT_DIR, "public")
SCRIPTS_DIR = os.path.join(ROOT_DIR, "scripts")


def step1_fix_4_generators_and_regenerate():
    print("=== STEP 1: Fixing JS escaping in 4 generator scripts & regenerating ===")
    # 1A. generate_duree_demi_fond_silo.py: replace \" with \\" inside JS strings
    duree_script = os.path.join(SCRIPTS_DIR, "generate_duree_demi_fond_silo.py")
    with open(duree_script, "r", encoding="utf-8") as f:
        code = f.read()
    # Replace unescaped \" in f''' string with \\"
    code_fixed = re.sub(r'(?<!\\)\\"', r'\\\\"', code)
    with open(duree_script, "w", encoding="utf-8") as f:
        f.write(code_fixed)
    subprocess.run(["python3", duree_script], check=True)

    # 1B. generate_lancer_poids_silo.py, generate_saut_longueur_triple_saut_silo.py, generate_saut_hauteur_silo.py
    for sname in [
        "generate_lancer_poids_silo.py",
        "generate_saut_longueur_triple_saut_silo.py",
        "generate_saut_hauteur_silo.py",
    ]:
        spath = os.path.join(SCRIPTS_DIR, sname)
        with open(spath, "r", encoding="utf-8") as f:
            scode = f.read()
        # Replace unescaped \' and \" inside the non-raw f''' string with \\' and \\"
        scode_fixed = re.sub(r"(?<!\\)\\'", r"\\\\'", scode)
        scode_fixed = re.sub(r'(?<!\\)\\"', r'\\\\"', scode_fixed)
        with open(spath, "w", encoding="utf-8") as f:
            f.write(scode_fixed)
        subprocess.run(["python3", spath], check=True)


def clean_latex_in_html(html_text):
    """Clean LaTeX math expressions into clean HTML/Unicode."""
    # Replace specific known LaTeX formulas first
    replacements = [
        (r"\(VMA\,(km/h) = \frac{Distance\,(m)}{100}\)", "VMA (km/h) = Distance (m) / 100"),
        (r"\(D/100\)", "(D / 100)"),
        (r"\(\div 3,6\)", "(÷ 3,6)"),
        (r"\(|T_i - T_{cible}|\)", "|Ti − Tcible|"),
        (r"\(T_{cible}\)", "Tcible"),
        (r"\(T_i\)", "Ti"),
        (r"\(T_1 = \)", "T1 = "),
        (r"\(T_2 = \)", "T2 = "),
        (r"\(T_3 = \)", "T3 = "),
        (r"\(T_4 = \)", "T4 = "),
        (r"\(T_5 = \)", "T5 = "),
        (r"\(\Delta = \)", "Δ = "),
        (r"$ΔT = T_{Haies} - T_{Plat}$", "ΔT = T_Haies − T_Plat"),
        (r"$T_{Plat}$", "T_Plat"),
        (r"$T_{Haies}$", "T_Haies"),
        (r"\text{ m/s}", " m/s"),
        (r"\text{ km/h}", " km/h"),
        (r"\text{ m}", " m"),
        (r"\text{ cm}", " cm"),
        (r"\text{ mm}", " mm"),
        (r"\text{ kg}", " kg"),
        (r"\text{ g}", " g"),
        (r"\text{ s}", " s"),
        (r"\text{ min}", " min"),
        (r"\text{ pt}", " pt"),
        (r"\text{ pts}", " pts"),
        (r"\text{ à }", " à "),
        (r"\text{–}", "–"),
        (r"\text{ - }", " - "),
        (r"\varnothing\,", "Ø "),
        (r"\varnothing", "Ø"),
        (r"^\circ", "°"),
        (r"\circ", "°"),
        (r"\{,\}", ","),
        (r"{,}", ","),
        (r"\times", "×"),
        (r"\approx", "≈"),
        (r"\le", "≤"),
        (r"\ge", "≥"),
        (r"\rightarrow", "→"),
        (r"\pm", "±"),
        (r"\div", "÷"),
        (r"\,\%", "%"),
        (r"\%", "%"),
        (r"\,", " "),
        (r"V_0", "v₀"),
        (r"v_0", "v₀"),
        (r"h_0", "h₀"),
        (r"V_x", "Vx"),
        (r"V_y", "Vy"),
        (r"V_{approche}", "V_approche"),
        (r"V_{envol}", "V_envol"),
    ]
    for old, new in replacements:
        html_text = html_text.replace(old, new)

    # Strip remaining \text{...}
    html_text = re.sub(r"\\text\{([^}]*)\}", r"\1", html_text)
    # Strip remaining \( ... \)
    html_text = re.sub(r"\\\((.*?)\\\)", r"\1", html_text)
    # Strip remaining $...$ math wrappers (avoiding JS ${...})
    html_text = re.sub(r"(?<!\\)\$([^$\n{]{1,80})\$", r"\1", html_text)
    return html_text


ALL_13_SILOS_META = [
    ("aps-handball-eps-maroc.html", "🤾 Handball", "#991b1b"),
    ("aps-basketball-eps-maroc.html", "🏀 Basket 5×5", "#006233"),
    ("aps-volleyball-eps-maroc.html", "🏐 Volley-Ball", "#1e40af"),
    ("aps-football-eps-maroc.html", "⚽ Foot & Futsal", "#b45309"),
    ("aps-rugby-scolaire-tag-eps-maroc.html", "🏉 Rugby & Tag", "#15803d"),
    ("aps-gymnastique-sol-eps-maroc.html", "🤸 Gymnastique", "#7c3aed"),
    ("aps-course-vitesse-relais-eps-maroc.html", "⚡ Vitesse & Relais", "#dc2626"),
    ("aps-course-duree-demi-fond-eps-maroc.html", "🏃 Durée & VMA", "#0f766e"),
    ("aps-course-haies-eps-maroc.html", "🚧 Course de Haies", "#c2410c"),
    ("aps-lancer-poids-eps-maroc.html", "🏋️ Lancer du Poids", "#475569"),
    ("aps-saut-longueur-triple-saut-eps-maroc.html", "🦘 Longueur & TS", "#b45309"),
    ("aps-saut-hauteur-fosbury-eps-maroc.html", "🆙 Hauteur Fosbury", "#1d4ed8"),
    ("aps-badminton-tennis-table-eps-maroc.html", "🏸🏓 Badminton & Ping", "#0f766e"),
]


def build_unified_quick_nav(active_filename):
    links_html = []
    for fname, label, color in ALL_13_SILOS_META:
        if fname == active_filename:
            links_html.append(
                f'<a href="{fname}" style="padding:0.28rem 0.65rem;background:{color};color:#ffffff;border-radius:999px;font-size:0.75rem;font-weight:800;text-decoration:none;box-shadow:0 2px 6px rgba(15,23,42,0.15);">{label} (Actif)</a>'
            )
        else:
            links_html.append(
                f'<a href="{fname}" style="padding:0.26rem 0.6rem;background:#f8fafc;border:1px solid #cbd5e1;color:{color};border-radius:999px;font-size:0.74rem;font-weight:800;text-decoration:none;">{label}</a>'
            )
    links_joined = "\n                ".join(links_html)
    return f'''<!-- PROFEPS_13_SILOS_QUICK_NAV_START -->
    <div style="background:#ffffff;border-bottom:1px solid #e2e8f0;padding:0.55rem 1rem;">
        <div style="max-width:1220px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.5rem;">
            <div style="display:flex;flex-wrap:wrap;align-items:center;gap:0.35rem;">
                <span style="font-size:0.72rem;font-weight:900;text-transform:uppercase;color:#475569;margin-right:0.25rem;">🏟️ 13 Studios APS :</span>
                {links_joined}
            </div>
            <a href="hub-aps-sports-eps-maroc.html" style="font-size:0.75rem;font-weight:800;color:#0f172a;text-decoration:underline;white-space:nowrap;">🧭 Portail Central des 13 APS →</a>
        </div>
    </div>
    <!-- PROFEPS_13_SILOS_QUICK_NAV_END -->'''


def step2_clean_and_unify_all_13_silos():
    print("=== STEP 2: Cleaning LaTeX, fixing links, adding ?level= support & unifying 13-Silo Quick-Nav ===")
    for fname, _, _ in ALL_13_SILOS_META:
        fpath = os.path.join(PUBLIC_DIR, fname)
        with open(fpath, "r", encoding="utf-8") as f:
            content = f.read()

        # 1. Clean LaTeX
        content = clean_latex_in_html(content)

        # 2. Fix broken link in gymnastique silo
        content = content.replace(
            "accident-scolaire-eps-maroc-procedure-rapport-croquis.html",
            "accident-scolaire-eps-maroc-rapport-procedure.html",
        )

        # 3. Add ?level= URL parameter auto-selector if missing
        if "URLSearchParams" not in content and "location.search" not in content:
            level_auto_js = """
        // Auto-select school level from ?level= URL parameter
        try {
            var urlParams = new URLSearchParams(window.location.search);
            var lvlParam = (urlParams.get('level') || '').toUpperCase();
            if (lvlParam && ['1AC','2AC','3AC','TC','1BAC','2BAC'].indexOf(lvlParam) !== -1) {
                if (typeof window.selectSchoolLevel === 'function') window.selectSchoolLevel(lvlParam);
                else if (typeof window.setSchoolLevel === 'function') window.setSchoolLevel(lvlParam);
                else if (typeof selectLevel === 'function') selectLevel(lvlParam);
            }
        } catch (e) {}
"""
            # Insert right before the last </script>
            last_script_idx = content.rfind("</script>")
            if last_script_idx != -1:
                content = content[:last_script_idx] + level_auto_js + "\n    " + content[last_script_idx:]

        # 4. Inject or replace the unified 13-Silo Quick-Nav bar right after <!-- PROFEPS_UNIFIED_NAVBAR_END -->
        quick_nav_block = build_unified_quick_nav(fname)
        if "<!-- PROFEPS_13_SILOS_QUICK_NAV_START -->" in content:
            content = re.sub(
                r"<!-- PROFEPS_13_SILOS_QUICK_NAV_START -->.*?<!-- PROFEPS_13_SILOS_QUICK_NAV_END -->",
                quick_nav_block,
                content,
                flags=re.DOTALL,
            )
        else:
            # Remove any older mini quick-nav bar that immediately follows PROFEPS_UNIFIED_NAVBAR_END
            content = re.sub(
                r"(<!-- PROFEPS_UNIFIED_NAVBAR_END -->)\s*(?:<!-- BARRE D'ACCÈS RAPIDE[^\n]*-->\s*)?(?:<div[^>]*>\s*<div[^>]*>\s*<span[^>]*>[^<]*Silos APS[^<]*</span>.*?</div>\s*</div>)?",
                r"\1\n    " + quick_nav_block,
                content,
                count=1,
                flags=re.DOTALL,
            )

        with open(fpath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  [OK] Cleaned & unified {fname}")


def step3_upgrade_hub_aps_page():
    print("=== STEP 3: Upgrading /public/hub-aps-sports-eps-maroc.html ===")
    hub_path = os.path.join(PUBLIC_DIR, "hub-aps-sports-eps-maroc.html")
    with open(hub_path, "r", encoding="utf-8") as f:
        h = f.read()

    # Clean any accidental '}}' in hub-aps-sports-eps-maroc.html
    h = h.replace("}}", "}")
    h = clean_latex_in_html(h)

    # Update filter buttons to reflect all 13 APS accurately
    old_filters = '''            <div class="filter-tabs" role="tablist" aria-label="Filtrer par famille d'APS">
                <button type="button" class="filter-btn active" onclick="filterApsHub('all', this)">Toutes les APS (11)</button>
                <button type="button" class="filter-btn" onclick="filterApsHub('collectifs', this)">Sports Collectifs (5)</button>
                <button type="button" class="filter-btn" onclick="filterApsHub('athletisme', this)">Athlétisme (4)</button>
                <button type="button" class="filter-btn" onclick="filterApsHub('gymnastique', this)">Gymnastique &amp; Autres (2)</button>
            </div>'''
    new_filters = '''            <div class="filter-tabs" role="tablist" aria-label="Filtrer par famille d'APS">
                <button type="button" class="filter-btn active" onclick="filterApsHub('all', this)">Toutes les APS (13 Studios)</button>
                <button type="button" class="filter-btn" onclick="filterApsHub('collectifs', this)">Sports Collectifs (5)</button>
                <button type="button" class="filter-btn" onclick="filterApsHub('athletisme', this)">Athlétisme (6)</button>
                <button type="button" class="filter-btn" onclick="filterApsHub('gymnastique', this)">Gymnastique &amp; Raquettes (2)</button>
            </div>'''
    h = h.replace(old_filters, new_filters)

    # Add CSS support for .featured-silo-banner so Silos 8, 9, 10 look clean and readable, OR replace Silos 8-10 banners with clean .featured-silo-card + add Silos 11, 12, 13 featured cards!
    silos_8_to_13_cards = '''        <!-- SILO VEDETTE 8 : LANCER DU POIDS (STUDIO COMPLET + CALCULATEUR BALISTIQUE) -->
        <section class="featured-silo-card" data-aps-family="athletisme" style="border-color:#991b1b;" aria-label="Silo Complet Lancer du Poids EPS Maroc">
            <div>
                <div class="featured-kicker" style="color:#991b1b;">Silo APS Complet Disponible · Collège (OP 2009) &amp; Lycée (OP 2007) · Calculateur Balistique 40° &amp; 34,92°</div>
                <h2 class="featured-title">🏋️ Lancer du Poids en EPS au Maroc : Calculateur Balistique &amp; Secteur 34,92°, ATD, Studio des 24 Cycles &amp; 240 Fiches (1AC à 2Bac) + Barèmes 3kg/4kg/5kg (/20)</h2>
                <p class="featured-desc">Accédez à la page spéciale Lancer du Poids (3kg, 4kg, 5kg) intégrant le calculateur balistique (portée, angle optimal ~40°, vitesse d'éjection v₀) et de tracé géométrique du secteur de 34,92° (corde = 0,6 × R), l'ATD complet, le studio A4 des 24 cycles et 240 fiches (1AC à 2Bac × 4 niveaux) et les barèmes officiels (/20) en Word et PDF.</p>
                <div class="featured-features">
                    <span>✓ Calculateur Balistique (Angle 40°, v₀, h₀) &amp; Secteur 34,92°</span>
                    <span>✓ 6 Niveaux Scolaires × 4 Niveaux (Poussé arrêté à O'Brien)</span>
                    <span>✓ Visionneuse A4 Pro avant téléchargement Word (.doc) &amp; PDF</span>
                    <span>✓ Barèmes 3kg / 4kg / 5kg &amp; Règle de Sécurité d'Or au Sifflet</span>
                </div>
                <div class="featured-actions">
                    <a href="aps-lancer-poids-eps-maroc.html" class="btn-primary-action" style="background:#991b1b;">Ouvrir le Silo Lancer du Poids →</a>
                    <a href="aps-lancer-poids-eps-maroc.html#volet-calculateur-balistique" class="btn-secondary-action">🧮 Calculateur Balistique &amp; 34,92°</a>
                </div>
            </div>
            <div class="featured-preview-box">
                <strong style="display:block;font-size:0.88rem;color:#0f172a;margin-bottom:0.35rem;">Accès direct par Niveau Scolaire (Lancer du Poids) :</strong>
                <p style="font-size:0.8rem;color:#475569;margin-bottom:0.65rem;">Cliquez sur votre niveau pour ouvrir directement ses 4 niveaux de pratique (Débutant à Élite) avec aperçu A4 + export Word/PDF :</p>
                <div class="level-matrix">
                    <a href="aps-lancer-poids-eps-maroc.html?level=1AC#volet-studio" class="level-item">1ère AC<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">Poussé du cou (2/3kg)</span></a>
                    <a href="aps-lancer-poids-eps-maroc.html?level=2AC#volet-studio" class="level-item">2ème AC<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">Profil &amp; Vissage (3/4kg)</span></a>
                    <a href="aps-lancer-poids-eps-maroc.html?level=3AC#volet-studio" class="level-item">3ème AC<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">Pas Chassé &amp; Blocage</span></a>
                    <a href="aps-lancer-poids-eps-maroc.html?level=TC#volet-studio" class="level-item">Tronc Commun<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">Chaîne J-B-T-B</span></a>
                    <a href="aps-lancer-poids-eps-maroc.html?level=1BAC#volet-studio" class="level-item">1ère Bac<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">Translation O'Brien</span></a>
                    <a href="aps-lancer-poids-eps-maroc.html?level=2BAC#volet-studio" class="level-item">2ème Bac<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">Concours 5kg G / 3kg F</span></a>
                </div>
                <div style="margin-top:0.85rem;padding-top:0.75rem;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;font-size:0.78rem;font-weight:700;color:#991b1b;">
                    <a href="aps-lancer-poids-eps-maroc.html#volet-calculateur-balistique">🧮 Calculateur Balistique &amp; 34,92°</a>
                    <a href="aps-lancer-poids-eps-maroc.html#volet-grilles">📊 Barèmes 3kg / 4kg / 5kg</a>
                </div>
            </div>
        </section>

        <!-- SILO VEDETTE 9 : SAUT EN LONGUEUR & TRIPLE SAUT (STUDIO COMPLET + CALCULATEUR ÉLAN) -->
        <section class="featured-silo-card" data-aps-family="athletisme" style="border-color:#b45309;" aria-label="Silo Complet Saut en Longueur et Triple Saut EPS Maroc">
            <div>
                <div class="featured-kicker" style="color:#b45309;">Silo APS Complet Disponible · Collège (OP 2009) &amp; Lycée (OP 2007) · Calculateur Élan &amp; Ratio 35-30-35%</div>
                <h2 class="featured-title">🦘 Saut en Longueur &amp; Triple Saut en EPS au Maroc : Calculateur d'Élan &amp; 3 Bonds (35-30-35%), ATD, Studio des 24 Cycles &amp; 240 Fiches + Barèmes (/20)</h2>
                <p class="featured-desc">Accédez à la page spéciale Saut en Longueur &amp; Triple Saut intégrant le calculateur d'étalonnage de la course d'élan (en mètres et en pieds) et de répartition des 3 bonds au Triple Saut (Cloche-Pied 35% · Foulée Bondissante 30% · Saut 35%), l'ATD complet, le studio A4 des 24 cycles et 240 fiches (1AC à 2Bac) et les barèmes (/20).</p>
                <div class="featured-features">
                    <span>✓ Calculateur d'Étalonnage d'Élan (m/pieds) &amp; Ratio 35-30-35%</span>
                    <span>✓ 6 Niveaux Scolaires × 4 Niveaux (Longueur &amp; Triple Saut)</span>
                    <span>✓ Visionneuse A4 Pro avant téléchargement Word (.doc) &amp; PDF</span>
                    <span>✓ Barèmes Officiels Longueur (5,40m/4,10m) &amp; Triple Saut (/20)</span>
                </div>
                <div class="featured-actions">
                    <a href="aps-saut-longueur-triple-saut-eps-maroc.html" class="btn-primary-action" style="background:#b45309;">Ouvrir le Silo Longueur &amp; Triple Saut →</a>
                    <a href="aps-saut-longueur-triple-saut-eps-maroc.html#volet-calculateur-sauts" class="btn-secondary-action">🧮 Calculateur Élan &amp; 35-30-35%</a>
                </div>
            </div>
            <div class="featured-preview-box">
                <strong style="display:block;font-size:0.88rem;color:#0f172a;margin-bottom:0.35rem;">Accès direct par Niveau Scolaire (Longueur &amp; Triple Saut) :</strong>
                <p style="font-size:0.8rem;color:#475569;margin-bottom:0.65rem;">Cliquez sur votre niveau pour ouvrir directement ses 4 niveaux de pratique (Débutant à Élite) avec aperçu A4 + export Word/PDF :</p>
                <div class="level-matrix">
                    <a href="aps-saut-longueur-triple-saut-eps-maroc.html?level=1AC#volet-studio" class="level-item">1ère AC<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">Zone 80cm &amp; Appel 1 pied</span></a>
                    <a href="aps-saut-longueur-triple-saut-eps-maroc.html?level=2AC#volet-studio" class="level-item">2ème AC<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">Élan 10-12F &amp; Multibonds</span></a>
                    <a href="aps-saut-longueur-triple-saut-eps-maroc.html?level=3AC#volet-studio" class="level-item">3ème AC<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">Étalonnage &amp; G-G-D</span></a>
                    <a href="aps-saut-longueur-triple-saut-eps-maroc.html?level=TC#volet-studio" class="level-item">Tronc Commun<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">Liaison Course-Appel</span></a>
                    <a href="aps-saut-longueur-triple-saut-eps-maroc.html?level=1BAC#volet-studio" class="level-item">1ère Bac<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">Ratio 35-30-35% &amp; 20°</span></a>
                    <a href="aps-saut-longueur-triple-saut-eps-maroc.html?level=2BAC#volet-studio" class="level-item">2ème Bac<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">Concours Bac 5,40m / 4,10m</span></a>
                </div>
                <div style="margin-top:0.85rem;padding-top:0.75rem;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;font-size:0.78rem;font-weight:700;color:#b45309;">
                    <a href="aps-saut-longueur-triple-saut-eps-maroc.html#volet-calculateur-sauts">🧮 Calculateur Élan &amp; 3 Bonds</a>
                    <a href="aps-saut-longueur-triple-saut-eps-maroc.html#volet-grilles">📊 Barèmes Longueur &amp; Triple Saut</a>
                </div>
            </div>
        </section>

        <!-- SILO VEDETTE 10 : SAUT EN HAUTEUR FOSBURY-FLOP (STUDIO COMPLET + RT 26.8) -->
        <section class="featured-silo-card" data-aps-family="athletisme" style="border-color:#1d4ed8;" aria-label="Silo Complet Saut en Hauteur Fosbury-Flop EPS Maroc">
            <div>
                <div class="featured-kicker" style="color:#1d4ed8;">Silo APS Complet Disponible · Collège (OP 2009) &amp; Lycée (OP 2007) · Course en J &amp; Départage RT 26.8</div>
                <h2 class="featured-title">🆙 Saut en Hauteur (Fosbury-Flop &amp; Ciseaux) en EPS au Maroc : Calculateur Course en J &amp; Départage RT 26.8, ATD, 24 Cycles &amp; 240 Fiches + Barèmes (/20)</h2>
                <p class="featured-desc">Accédez à la page spéciale Saut en Hauteur intégrant le calculateur géométrique de la course d'élan en « J » (selon le pied d'appel gauche/droit) et le simulateur officiel de départage des ex aequo (Règle Technique 26.8 World Athletics), l'ATD Fosbury-Flop, le studio A4 des 24 cycles et 240 fiches (1AC à 2Bac) et la feuille (O/X/-).</p>
                <div class="featured-features">
                    <span>✓ Calculateur Course en « J » &amp; Départage Ex Aequo RT 26.8</span>
                    <span>✓ 6 Niveaux Scolaires × 4 Niveaux (Ciseaux à Fosbury-Flop)</span>
                    <span>✓ Visionneuse A4 Pro avant téléchargement Word (.doc) &amp; PDF</span>
                    <span>✓ Feuille Officielle (O / X / -) &amp; Barèmes (1,65m G / 1,35m F)</span>
                </div>
                <div class="featured-actions">
                    <a href="aps-saut-hauteur-fosbury-eps-maroc.html" class="btn-primary-action" style="background:#1d4ed8;">Ouvrir le Silo Saut en Hauteur (Fosbury) →</a>
                    <a href="aps-saut-hauteur-fosbury-eps-maroc.html#volet-calculateur-hauteur" class="btn-secondary-action">🧮 Calculateur Course en J &amp; RT 26.8</a>
                </div>
            </div>
            <div class="featured-preview-box">
                <strong style="display:block;font-size:0.88rem;color:#0f172a;margin-bottom:0.35rem;">Accès direct par Niveau Scolaire (Saut en Hauteur) :</strong>
                <p style="font-size:0.8rem;color:#475569;margin-bottom:0.65rem;">Cliquez sur votre niveau pour ouvrir directement ses 4 niveaux de pratique (Débutant à Élite) avec aperçu A4 + export Word/PDF :</p>
                <div class="level-matrix">
                    <a href="aps-saut-hauteur-fosbury-eps-maroc.html?level=1AC#volet-studio" class="level-item">1ère AC<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">Appel 1 pied &amp; Ciseaux</span></a>
                    <a href="aps-saut-hauteur-fosbury-eps-maroc.html?level=2AC#volet-studio" class="level-item">2ème AC<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">Élan Courbe &amp; Rotation</span></a>
                    <a href="aps-saut-hauteur-fosbury-eps-maroc.html?level=3AC#volet-studio" class="level-item">3ème AC<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">Course en J &amp; Fosbury</span></a>
                    <a href="aps-saut-hauteur-fosbury-eps-maroc.html?level=TC#volet-studio" class="level-item">Tronc Commun<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">Élan en J (4+4) &amp; Dos</span></a>
                    <a href="aps-saut-hauteur-fosbury-eps-maroc.html?level=1BAC#volet-studio" class="level-item">1ère Bac<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">Pont Dorsal &amp; Rappel</span></a>
                    <a href="aps-saut-hauteur-fosbury-eps-maroc.html?level=2BAC#volet-studio" class="level-item">2ème Bac<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">Concours 1,65m / 1,35m</span></a>
                </div>
                <div style="margin-top:0.85rem;padding-top:0.75rem;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;font-size:0.78rem;font-weight:700;color:#1d4ed8;">
                    <a href="aps-saut-hauteur-fosbury-eps-maroc.html#volet-calculateur-hauteur">🧮 Simulateur RT 26.8 &amp; Course en J</a>
                    <a href="aps-saut-hauteur-fosbury-eps-maroc.html#volet-grilles">📊 Barèmes &amp; Feuille (O/X/-)</a>
                </div>
            </div>
        </section>

        <!-- SILO VEDETTE 11 : COURSE DE HAIES 50M/60M/80M/110MH (STUDIO COMPLET + CALCULATEUR ΔT) -->
        <section class="featured-silo-card" data-aps-family="athletisme" style="border-color:#c2410c;" aria-label="Silo Complet Course de Haies EPS Maroc">
            <div>
                <div class="featured-kicker" style="color:#c2410c;">Silo APS Complet Disponible · Collège (OP 2009) &amp; Lycée (OP 2007) · Calculateur ΔT &amp; Couloirs 3/4 Appuis</div>
                <h2 class="featured-title">🚧 Course de Haies (50m / 60m / 80m / 110mH) en EPS au Maroc : Calculateur d'Indice de Perte (ΔT), ATD, 24 Cycles &amp; 240 Fiches + Barèmes (/20)</h2>
                <p class="featured-desc">Accédez à la page spéciale Course de Haies intégrant le calculateur d'Indice de Perte de vitesse (ΔT = T_Haies − T_Plat) et de paramétrage des intervalles inter-obstacles pour couloirs différenciés (3 appuis / 4 appuis / 5 appuis), l'ATD complet (règle 2/3 attaque – 1/3 reprise), le studio A4 des 24 cycles et 240 fiches (1AC à 2Bac) et les 4 grilles (/20).</p>
                <div class="featured-features">
                    <span>✓ Calculateur d'Indice de Perte (ΔT) &amp; Couloirs Différenciés</span>
                    <span>✓ 6 Niveaux Scolaires × 4 Niveaux (50mH Collège à 80mH/110mH)</span>
                    <span>✓ Visionneuse A4 Pro avant téléchargement Word (.doc) &amp; PDF</span>
                    <span>✓ Barèmes Combinés (Chrono + ΔT ≤ 1,5s) &amp; Règle RT 22</span>
                </div>
                <div class="featured-actions">
                    <a href="aps-course-haies-eps-maroc.html" class="btn-primary-action" style="background:#c2410c;">Ouvrir le Silo Course de Haies →</a>
                    <a href="aps-course-haies-eps-maroc.html#volet-calculateur-haies" class="btn-secondary-action">🧮 Calculateur ΔT &amp; Couloirs</a>
                </div>
            </div>
            <div class="featured-preview-box">
                <strong style="display:block;font-size:0.88rem;color:#0f172a;margin-bottom:0.35rem;">Accès direct par Niveau Scolaire (Course de Haies) :</strong>
                <p style="font-size:0.8rem;color:#475569;margin-bottom:0.65rem;">Cliquez sur votre niveau pour ouvrir directement ses 4 niveaux de pratique (Débutant à Élite) avec aperçu A4 + export Word/PDF :</p>
                <div class="level-matrix">
                    <a href="aps-course-haies-eps-maroc.html?level=1AC#volet-studio" class="level-item">1ère AC<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">50mH · 4/5 appuis</span></a>
                    <a href="aps-course-haies-eps-maroc.html?level=2AC#volet-studio" class="level-item">2ème AC<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">50mH · Rythme 4 appuis</span></a>
                    <a href="aps-course-haies-eps-maroc.html?level=3AC#volet-studio" class="level-item">3ème AC<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">60mH · ΔT ≤ 2,0s</span></a>
                    <a href="aps-course-haies-eps-maroc.html?level=TC#volet-studio" class="level-item">Tronc Commun<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">60mH · Règle 2/3-1/3</span></a>
                    <a href="aps-course-haies-eps-maroc.html?level=1BAC#volet-studio" class="level-item">1ère Bac<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">60mH/80mH · 3 appuis</span></a>
                    <a href="aps-course-haies-eps-maroc.html?level=2BAC#volet-studio" class="level-item">2ème Bac<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">60mH/80mH · ΔT ≤ 1,4s</span></a>
                </div>
                <div style="margin-top:0.85rem;padding-top:0.75rem;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;font-size:0.78rem;font-weight:700;color:#c2410c;">
                    <a href="aps-course-haies-eps-maroc.html#volet-calculateur-haies">🧮 Calculateur ΔT &amp; Couloirs</a>
                    <a href="aps-course-haies-eps-maroc.html#volet-grilles">📊 Barèmes Chrono + ΔT (/20)</a>
                </div>
            </div>
        </section>

        <!-- SILO VEDETTE 12 : RUGBY SCOLAIRE, TAG RUGBY & TOUCH RUGBY (STUDIO COMPLET + CALCULATEUR IGT) -->
        <section class="featured-silo-card" data-aps-family="collectifs" style="border-color:#15803d;" aria-label="Silo Complet Rugby Scolaire et Tag Rugby EPS Maroc">
            <div>
                <div class="featured-kicker" style="color:#15803d;">Silo APS Complet Disponible · Collège (OP 2009) &amp; Lycée (OP 2007) · World Rugby &amp; Tag / Touch</div>
                <h2 class="featured-title">🏉 Rugby Scolaire, Tag Rugby &amp; Touch en EPS au Maroc : Calculateur Gagne-Terrain (IGT), ATD, 24 Cycles &amp; 240 Fiches (1AC à 2Bac) + Grilles (/20)</h2>
                <p class="featured-desc">Accédez à la page spéciale Rugby Scolaire, Tag Rugby (Flag) &amp; Touch Rugby intégrant le calculateur d'Indice de Gagne-Terrain (IGT) et le compteur d'arbitrage 6 Tags / World Rugby, l'ATD complet (paradoxe cible avant / passe arrière, 5 règles d'or de sécurité), le studio A4 des 24 cycles et 240 fiches (1AC à 2Bac) et les 4 grilles (/20).</p>
                <div class="featured-features">
                    <span>✓ Calculateur Gagne-Terrain (IGT) &amp; Compteur 6 Tags / Essais</span>
                    <span>✓ 6 Niveaux Scolaires × 4 Niveaux (Tag Rugby sans contact à 7×7)</span>
                    <span>✓ Visionneuse A4 Pro avant téléchargement Word (.doc) &amp; PDF</span>
                    <span>✓ 5 Règles d'Or de Sécurité &amp; 4 Grilles d'Évaluation (/20)</span>
                </div>
                <div class="featured-actions">
                    <a href="aps-rugby-scolaire-tag-eps-maroc.html" class="btn-primary-action" style="background:#15803d;">Ouvrir le Silo Rugby Scolaire &amp; Tag →</a>
                    <a href="aps-rugby-scolaire-tag-eps-maroc.html#volet-calculateur-rugby" class="btn-secondary-action">🧮 Calculateur IGT &amp; Arbitre 6 Tags</a>
                </div>
            </div>
            <div class="featured-preview-box">
                <strong style="display:block;font-size:0.88rem;color:#0f172a;margin-bottom:0.35rem;">Accès direct par Niveau Scolaire (Rugby &amp; Tag) :</strong>
                <p style="font-size:0.8rem;color:#475569;margin-bottom:0.65rem;">Cliquez sur votre niveau pour ouvrir directement ses 4 niveaux de pratique (Débutant à Élite) avec aperçu A4 + export Word/PDF :</p>
                <div class="level-matrix">
                    <a href="aps-rugby-scolaire-tag-eps-maroc.html?level=1AC#volet-studio" class="level-item">1ère AC<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">Tag Rugby &amp; Passe arrière</span></a>
                    <a href="aps-rugby-scolaire-tag-eps-maroc.html?level=2AC#volet-studio" class="level-item">2ème AC<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">Soutien axial &amp; 6 Tags</span></a>
                    <a href="aps-rugby-scolaire-tag-eps-maroc.html?level=3AC#volet-studio" class="level-item">3ème AC<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">Fixer-Donner &amp; Rideau</span></a>
                    <a href="aps-rugby-scolaire-tag-eps-maroc.html?level=TC#volet-studio" class="level-item">Tronc Commun<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">Pénétrer vs Contourner</span></a>
                    <a href="aps-rugby-scolaire-tag-eps-maroc.html?level=1BAC#volet-studio" class="level-item">1ère Bac<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">Continuité &amp; Surnombre</span></a>
                    <a href="aps-rugby-scolaire-tag-eps-maroc.html?level=2BAC#volet-studio" class="level-item">2ème Bac<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">Projet 7×7 &amp; IGT ≥ 70%</span></a>
                </div>
                <div style="margin-top:0.85rem;padding-top:0.75rem;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;font-size:0.78rem;font-weight:700;color:#15803d;">
                    <a href="aps-rugby-scolaire-tag-eps-maroc.html#volet-calculateur-rugby">🧮 Calculateur IGT &amp; 6 Tags</a>
                    <a href="aps-rugby-scolaire-tag-eps-maroc.html#volet-grilles">📊 Feuille IGT &amp; Grilles (/20)</a>
                </div>
            </div>
        </section>

        <!-- SILO VEDETTE 13 : BADMINTON (BWF) & TENNIS DE TABLE (ITTF) -->
        <section class="featured-silo-card" data-aps-family="gymnastique" style="border-color:#0f766e;" aria-label="Silo Complet Badminton et Tennis de Table EPS Maroc">
            <div>
                <div class="featured-kicker" style="color:#0f766e;">Double Silo APS Complet Disponible · Collège (OP 2009) &amp; Lycée (OP 2007) · BWF &amp; ITTF</div>
                <h2 class="featured-title">🏸🏓 Badminton &amp; Tennis de Table en EPS au Maroc : Studio des 48 Cycles &amp; 480 Fiches (1AC à 2Bac), Calculateur Zones Bonus, Arbitre BWF/ITTF &amp; Grilles (/20)</h2>
                <p class="featured-desc">Accédez au double silo Sports de Raquette (Badminton BWF + Tennis de Table ITTF) regroupant un sélecteur de discipline, le studio A4 des 48 cycles et 480 fiches (1AC à 2Bac × 4 niveaux × 2 sports), le calculateur d'Indice d'Efficacité Tactique (Zones Bonus 1pt/3pts), le compteur d'arbitrage BWF/ITTF et le générateur de ronde « Montante-Descendante » (8 tables pour 40 élèves).</p>
                <div class="featured-features">
                    <span>✓ Double Studio : 24 Cycles Badminton + 24 Cycles Tennis de Table</span>
                    <span>✓ Calculateur Zones Bonus (1pt/3pts) &amp; Arbitre BWF / ITTF</span>
                    <span>✓ Générateur de Tournoi « Montante-Descendante » (40+ élèves)</span>
                    <span>✓ Feuille de Match &amp; 4 Grilles d'Évaluation (/20 Collège &amp; Lycée)</span>
                </div>
                <div class="featured-actions">
                    <a href="aps-badminton-tennis-table-eps-maroc.html" class="btn-primary-action" style="background:#0f766e;">Ouvrir le Silo Badminton &amp; Tennis de Table →</a>
                    <a href="aps-badminton-tennis-table-eps-maroc.html#volet-calculateur-raquettes" class="btn-secondary-action">🧮 Calculateur Zones Bonus &amp; Tournoi</a>
                </div>
            </div>
            <div class="featured-preview-box">
                <strong style="display:block;font-size:0.88rem;color:#0f172a;margin-bottom:0.35rem;">Accès direct par Niveau Scolaire (Badminton &amp; Ping-Pong) :</strong>
                <p style="font-size:0.8rem;color:#475569;margin-bottom:0.65rem;">Cliquez sur votre niveau pour ouvrir directement ses cycles Badminton et Tennis de Table avec aperçu A4 + export Word/PDF :</p>
                <div class="level-matrix">
                    <a href="aps-badminton-tennis-table-eps-maroc.html?level=1AC#volet-studio" class="level-item">1ère AC<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">Mise en jeu &amp; Continuité</span></a>
                    <a href="aps-badminton-tennis-table-eps-maroc.html?level=2AC#volet-studio" class="level-item">2ème AC<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">Long / Court &amp; Droite / Gauche</span></a>
                    <a href="aps-badminton-tennis-table-eps-maroc.html?level=3AC#volet-studio" class="level-item">3ème AC<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">Zones Bonus (3 pts) &amp; Smash</span></a>
                    <a href="aps-badminton-tennis-table-eps-maroc.html?level=TC#volet-studio" class="level-item">Tronc Commun<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">Rupture &amp; Replacement</span></a>
                    <a href="aps-badminton-tennis-table-eps-maroc.html?level=1BAC#volet-studio" class="level-item">1ère Bac<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">Effets (Topspin) &amp; Feintes</span></a>
                    <a href="aps-badminton-tennis-table-eps-maroc.html?level=2BAC#volet-studio" class="level-item">2ème Bac<br><span style="font-size:0.7rem;font-weight:600;color:#64748b;">Stratégie de Duel &amp; Bac</span></a>
                </div>
                <div style="margin-top:0.85rem;padding-top:0.75rem;border-top:1px solid #e2e8f0;display:flex;justify-content:space-between;font-size:0.78rem;font-weight:700;color:#0f766e;">
                    <a href="aps-badminton-tennis-table-eps-maroc.html#volet-calculateur-raquettes">🧮 Arbitre BWF/ITTF &amp; Ronde</a>
                    <a href="aps-badminton-tennis-table-eps-maroc.html#volet-grilles">📊 Feuille 1pt/3pts &amp; Grilles (/20)</a>
                </div>
            </div>
        </section>'''

    # Replace from <!-- SILO MODÈLE N°8 : LANCER DU POIDS ... up to <!-- GRILLE DE TOUTES LES APS PAR FAMILLE -->
    h = re.sub(
        r"<!-- SILO (?:MODÈLE N°8|VEDETTE 8)[^>]*-->.*?(?=<!-- GRILLE DE TOUTES LES APS PAR FAMILLE -->)",
        silos_8_to_13_cards + "\n\n        ",
        h,
        flags=re.DOTALL,
    )

    with open(hub_path, "w", encoding="utf-8") as f:
        f.write(h)
    print("  [OK] Upgraded /public/hub-aps-sports-eps-maroc.html with all 13 uniform featured cards & filters")


def step4_update_home_page():
    print("=== STEP 4: Updating Home Page (/public/index.html & /index.html) ===")
    index_path = os.path.join(PUBLIC_DIR, "index.html")
    with open(index_path, "r", encoding="utf-8") as f:
        idx = f.read()

    # 1. Add a quick CTA button to Hub des Sports in Hero Section if not already present
    hero_target = '''            <a href="#bloc-op" class="px-5 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-xl text-sm font-bold flex items-center gap-2 transition-all">
              <span>📚 OP 2007 / 2009</span>
            </a>'''
    hero_replacement = '''            <a href="hub-aps-sports-eps-maroc.html" class="px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-extrabold flex items-center gap-2 transition-all shadow-xs">
              <span>🏟️ Hub des Sports (13 APS)</span>
              <span>→</span>
            </a>
            <a href="#bloc-op" class="px-5 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-xl text-sm font-bold flex items-center gap-2 transition-all">
              <span>📚 OP 2007 / 2009</span>
            </a>'''
    if 'href="hub-aps-sports-eps-maroc.html" class="px-5 py-3 bg-emerald-700' not in idx:
        idx = idx.replace(hero_target, hero_replacement, 1)

    # 2. Build the dedicated Hub des Sports & 13 Studios APS section to replace the duplicated CRMEF section + old APS banner
    dedicated_aps_home_section = '''  <!-- ═══ SECTION DÉDIÉE : HUB CENTRAL DES SPORTS & 13 STUDIOS APS (1AC → 2BAC) ═══ -->
  <section id="bloc-hub-sports-aps" aria-label="Hub Central des Sports et 13 Studios APS EPS Maroc" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
    <div class="bg-white border-2 border-emerald-700/85 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      <!-- En-tête de la section dédiée Hub des Sports -->
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div class="space-y-1.5">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-extrabold uppercase tracking-wider">
            <span>🏟️</span>
            <span>Portail Officiel des Activités Physiques et Sportives · OP 2009 (Collège) &amp; OP 2007 (Lycée)</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Hub Central des Sports &amp; 13 Studios APS Complets (1AC à 2Bac)
          </h2>
          <p class="text-sm text-slate-600 max-w-3xl leading-relaxed">
            Accédez aux <strong>13 silos sportifs complets</strong> : Analyse et Traitement Didactique (ATD), <strong>Studio interactif de 24 cycles et 240 fiches de séances par sport</strong> (6 niveaux scolaires × 4 niveaux de pratique avec visionneuse A4 Pro en Word et PDF), <strong>calculateurs biomécaniques intégrés</strong> et <strong>grilles d'évaluation (/20)</strong>.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3 shrink-0">
          <a href="hub-aps-sports-eps-maroc.html" class="px-5 py-3 bg-[#006233] hover:bg-[#064e3b] text-white rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition shadow-sm">
            <span>🧭 Ouvrir le Hub Central des 13 Sports</span>
            <span>→</span>
          </a>
          <a href="ressources-atd.html" class="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition">
            <span>📐 Toutes les Fiches ATD</span>
          </a>
        </div>
      </div>

      <!-- Barre de filtres par famille d'APS -->
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-xs font-bold text-slate-500 mr-1">Filtrer par famille d'APS :</span>
          <button type="button" onclick="filterHomeAps('all')" id="btn-home-aps-all" class="px-3.5 py-1.5 text-xs font-extrabold rounded-xl bg-slate-900 text-white transition cursor-pointer">
            Tous les 13 Studios APS
          </button>
          <button type="button" onclick="filterHomeAps('collectifs')" id="btn-home-aps-collectifs" class="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer">
            🤾 Sports Collectifs (5)
          </button>
          <button type="button" onclick="filterHomeAps('athletisme')" id="btn-home-aps-athletisme" class="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer">
            🏃 Athlétisme : Courses, Sauts, Lancers (6)
          </button>
          <button type="button" onclick="filterHomeAps('gym-raquettes')" id="btn-home-aps-gym-raquettes" class="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer">
            🤸🏸 Gymnastique &amp; Sports de Raquette (2)
          </button>
        </div>
        <span class="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
          ✔ Export Direct Word (.doc) &amp; PDF A4 Paysage
        </span>
      </div>

      <!-- Grille des 13 Studios APS -->
      <div id="home-aps-studios-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <!-- 1. Handball -->
        <a href="aps-handball-eps-maroc.html" data-home-aps-cat="collectifs" class="home-aps-card peps-card p-4 flex flex-col justify-between border-l-4 border-l-[#991b1b] hover:border-[#991b1b] group">
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="text-xs font-extrabold text-[#991b1b] bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">🤾 Sports Collectifs</span>
              <span class="text-[11px] font-bold text-slate-500">1AC → 2Bac</span>
            </div>
            <h3 class="text-sm font-black text-slate-900 group-hover:text-[#991b1b] transition">Handball (IHF · 7×7)</h3>
            <p class="text-xs text-slate-600 mt-1 leading-relaxed">ATD, 24 cycles &amp; 240 fiches (de la grappe à l'attaque placée), grilles (/20) &amp; 18 gestes IHF.</p>
          </div>
          <div class="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-[#991b1b]">
            <span>Ouvrir le Studio Handball</span>
            <span>→</span>
          </div>
        </a>

        <!-- 2. Basket-Ball à 5 -->
        <a href="aps-basketball-eps-maroc.html" data-home-aps-cat="collectifs" class="home-aps-card peps-card p-4 flex flex-col justify-between border-l-4 border-l-[#006233] hover:border-[#006233] group">
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="text-xs font-extrabold text-[#006233] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">🏀 Sports Collectifs</span>
              <span class="text-[11px] font-bold text-slate-500">1AC → 2Bac</span>
            </div>
            <h3 class="text-sm font-black text-slate-900 group-hover:text-[#006233] transition">Basket-Ball à 5 (FIBA)</h3>
            <p class="text-xs text-slate-600 mt-1 leading-relaxed">ATD, 24 cycles &amp; 240 fiches (triple menace, Pick &amp; Roll), grilles d'observation &amp; évaluation (/20).</p>
          </div>
          <div class="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-[#006233]">
            <span>Ouvrir le Studio Basket</span>
            <span>→</span>
          </div>
        </a>

        <!-- 3. Volley-Ball -->
        <a href="aps-volleyball-eps-maroc.html" data-home-aps-cat="collectifs" class="home-aps-card peps-card p-4 flex flex-col justify-between border-l-4 border-l-blue-700 hover:border-blue-700 group">
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="text-xs font-extrabold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">🏐 Sports Collectifs</span>
              <span class="text-[11px] font-bold text-slate-500">1AC → 2Bac</span>
            </div>
            <h3 class="text-sm font-black text-slate-900 group-hover:text-blue-700 transition">Volley-Ball (FIVB)</h3>
            <p class="text-xs text-slate-600 mt-1 leading-relaxed">ATD, 24 cycles &amp; 240 fiches (frappe brève, chaîne R-P-A, système W), grilles (/20) &amp; arbitrage.</p>
          </div>
          <div class="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-blue-700">
            <span>Ouvrir le Studio Volley</span>
            <span>→</span>
          </div>
        </a>

        <!-- 4. Football Scolaire & Futsal -->
        <a href="aps-football-eps-maroc.html" data-home-aps-cat="collectifs" class="home-aps-card peps-card p-4 flex flex-col justify-between border-l-4 border-l-amber-600 hover:border-amber-600 group">
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="text-xs font-extrabold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">⚽ Sports Collectifs</span>
              <span class="text-[11px] font-bold text-slate-500">1AC → 2Bac</span>
            </div>
            <h3 class="text-sm font-black text-slate-900 group-hover:text-amber-700 transition">Football Scolaire &amp; Futsal</h3>
            <p class="text-xs text-slate-600 mt-1 leading-relaxed">ATD, 24 cycles &amp; 240 fiches (appui-soutien, losange 1-2-1), grilles (/20) &amp; règles Futsal FIFA.</p>
          </div>
          <div class="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-amber-700">
            <span>Ouvrir le Studio Foot/Futsal</span>
            <span>→</span>
          </div>
        </a>

        <!-- 5. Rugby Scolaire, Tag & Touch -->
        <a href="aps-rugby-scolaire-tag-eps-maroc.html" data-home-aps-cat="collectifs" class="home-aps-card peps-card p-4 flex flex-col justify-between border-l-4 border-l-green-700 hover:border-green-700 group">
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="text-xs font-extrabold text-green-800 bg-green-50 px-2.5 py-0.5 rounded-full border border-green-200">🏉 Sports Collectifs</span>
              <span class="text-[11px] font-bold text-green-700">+ Calculateur IGT</span>
            </div>
            <h3 class="text-sm font-black text-slate-900 group-hover:text-green-700 transition">Rugby Scolaire, Tag &amp; Touch</h3>
            <p class="text-xs text-slate-600 mt-1 leading-relaxed">Calculateur Gagne-Terrain (IGT) &amp; 6 Tags, ATD, 24 cycles &amp; 240 fiches sans/avec contact + grilles (/20).</p>
          </div>
          <div class="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-green-700">
            <span>Ouvrir le Studio Rugby/Tag</span>
            <span>→</span>
          </div>
        </a>

        <!-- 6. Course de Vitesse & Relais -->
        <a href="aps-course-vitesse-relais-eps-maroc.html" data-home-aps-cat="athletisme" class="home-aps-card peps-card p-4 flex flex-col justify-between border-l-4 border-l-red-600 hover:border-red-600 group">
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="text-xs font-extrabold text-red-700 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">⚡ Athlétisme · Courses</span>
              <span class="text-[11px] font-bold text-slate-500">60m / 80m / 100m</span>
            </div>
            <h3 class="text-sm font-black text-slate-900 group-hover:text-red-600 transition">Course de Vitesse &amp; Relais</h3>
            <p class="text-xs text-slate-600 mt-1 leading-relaxed">ATD Sprint &amp; Relais (zone 30m), 24 cycles &amp; 240 fiches, barèmes chiffrés 60m/80m/100m &amp; gain de relais.</p>
          </div>
          <div class="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-red-600">
            <span>Ouvrir le Studio Vitesse</span>
            <span>→</span>
          </div>
        </a>

        <!-- 7. Course de Durée, Demi-Fond & VMA -->
        <a href="aps-course-duree-demi-fond-eps-maroc.html" data-home-aps-cat="athletisme" class="home-aps-card peps-card p-4 flex flex-col justify-between border-l-4 border-l-teal-600 hover:border-teal-600 group">
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="text-xs font-extrabold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">🏃 Athlétisme · Demi-Fond</span>
              <span class="text-[11px] font-bold text-teal-700">+ Calculateur VMA</span>
            </div>
            <h3 class="text-sm font-black text-slate-900 group-hover:text-teal-700 transition">Course de Durée &amp; Demi-Fond</h3>
            <p class="text-xs text-slate-600 mt-1 leading-relaxed">Calculateur VMA &amp; plots (25m/50m) intégré, ATD, 24 cycles &amp; 240 fiches, barèmes 600m/800m/1000m (/20).</p>
          </div>
          <div class="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-teal-700">
            <span>Ouvrir le Studio Durée/VMA</span>
            <span>→</span>
          </div>
        </a>

        <!-- 8. Course de Haies -->
        <a href="aps-course-haies-eps-maroc.html" data-home-aps-cat="athletisme" class="home-aps-card peps-card p-4 flex flex-col justify-between border-l-4 border-l-orange-600 hover:border-orange-600 group">
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="text-xs font-extrabold text-orange-800 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">🚧 Athlétisme · Haies</span>
              <span class="text-[11px] font-bold text-orange-700">+ Calculateur ΔT</span>
            </div>
            <h3 class="text-sm font-black text-slate-900 group-hover:text-orange-700 transition">Course de Haies (50m à 110mH)</h3>
            <p class="text-xs text-slate-600 mt-1 leading-relaxed">Calculateur d'Indice de Perte (ΔT = T_Haies − T_Plat) &amp; couloirs 3/4 appuis, ATD, 24 cycles &amp; barèmes (/20).</p>
          </div>
          <div class="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-orange-700">
            <span>Ouvrir le Studio Haies</span>
            <span>→</span>
          </div>
        </a>

        <!-- 9. Lancer du Poids -->
        <a href="aps-lancer-poids-eps-maroc.html" data-home-aps-cat="athletisme" class="home-aps-card peps-card p-4 flex flex-col justify-between border-l-4 border-l-slate-700 hover:border-slate-700 group">
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="text-xs font-extrabold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-300">🏋️ Athlétisme · Lancers</span>
              <span class="text-[11px] font-bold text-red-700">+ Calc. 40° &amp; 34,92°</span>
            </div>
            <h3 class="text-sm font-black text-slate-900 group-hover:text-red-700 transition">Lancer du Poids (3 / 4 / 5 kg)</h3>
            <p class="text-xs text-slate-600 mt-1 leading-relaxed">Calculateur balistique (40°) &amp; secteur 34,92°, ATD, 24 cycles &amp; 240 fiches, barèmes (/20) &amp; sécurité.</p>
          </div>
          <div class="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-slate-800">
            <span>Ouvrir le Studio Poids</span>
            <span>→</span>
          </div>
        </a>

        <!-- 10. Saut en Longueur & Triple Saut -->
        <a href="aps-saut-longueur-triple-saut-eps-maroc.html" data-home-aps-cat="athletisme" class="home-aps-card peps-card p-4 flex flex-col justify-between border-l-4 border-l-amber-700 hover:border-amber-700 group">
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="text-xs font-extrabold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">🦘 Sauts Horizontaux</span>
              <span class="text-[11px] font-bold text-amber-700">+ Calc. 35-30-35%</span>
            </div>
            <h3 class="text-sm font-black text-slate-900 group-hover:text-amber-700 transition">Saut en Longueur &amp; Triple Saut</h3>
            <p class="text-xs text-slate-600 mt-1 leading-relaxed">Calculateur d'étalonnage d'élan &amp; 3 bonds (35-30-35%), ATD, 24 cycles &amp; 240 fiches + barèmes (/20).</p>
          </div>
          <div class="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-amber-700">
            <span>Ouvrir le Studio Longueur/TS</span>
            <span>→</span>
          </div>
        </a>

        <!-- 11. Saut en Hauteur (Fosbury-Flop) -->
        <a href="aps-saut-hauteur-fosbury-eps-maroc.html" data-home-aps-cat="athletisme" class="home-aps-card peps-card p-4 flex flex-col justify-between border-l-4 border-l-blue-600 hover:border-blue-600 group">
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="text-xs font-extrabold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">🆙 Sauts Verticaux</span>
              <span class="text-[11px] font-bold text-blue-700">+ Calc. J &amp; RT 26.8</span>
            </div>
            <h3 class="text-sm font-black text-slate-900 group-hover:text-blue-700 transition">Saut en Hauteur (Fosbury-Flop)</h3>
            <p class="text-xs text-slate-600 mt-1 leading-relaxed">Calculateur Course en « J » &amp; départage des ex aequo RT 26.8, ATD, 24 cycles, feuille (O/X/-) &amp; barèmes.</p>
          </div>
          <div class="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-blue-700">
            <span>Ouvrir le Studio Hauteur</span>
            <span>→</span>
          </div>
        </a>

        <!-- 12. Gymnastique au Sol -->
        <a href="aps-gymnastique-sol-eps-maroc.html" data-home-aps-cat="gym-raquettes" class="home-aps-card peps-card p-4 flex flex-col justify-between border-l-4 border-l-purple-600 hover:border-purple-600 group">
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="text-xs font-extrabold text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">🤸 Gymnastique FIG</span>
              <span class="text-[11px] font-bold text-purple-700">Code A / B / C / D</span>
            </div>
            <h3 class="text-sm font-black text-slate-900 group-hover:text-purple-700 transition">Gymnastique au Sol</h3>
            <p class="text-xs text-slate-600 mt-1 leading-relaxed">Catalogue A/B/C/D par famille, ATD, 24 cycles &amp; 240 fiches, parades de sécurité &amp; grilles Jury D+E (/20).</p>
          </div>
          <div class="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-purple-700">
            <span>Ouvrir le Studio Gymnastique</span>
            <span>→</span>
          </div>
        </a>

        <!-- 13. Badminton & Tennis de Table -->
        <a href="aps-badminton-tennis-table-eps-maroc.html" data-home-aps-cat="gym-raquettes" class="home-aps-card peps-card p-4 flex flex-col justify-between border-l-4 border-l-teal-700 hover:border-teal-700 group sm:col-span-2 lg:col-span-1">
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="text-xs font-extrabold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">🏸🏓 Sports de Raquette</span>
              <span class="text-[11px] font-bold text-teal-700">+ Arbitre BWF/ITTF</span>
            </div>
            <h3 class="text-sm font-black text-slate-900 group-hover:text-teal-700 transition">Badminton &amp; Tennis de Table</h3>
            <p class="text-xs text-slate-600 mt-1 leading-relaxed">Double studio (48 cycles &amp; 480 fiches), calculateur Zones Bonus, tournoi Montante-Descendante &amp; grilles (/20).</p>
          </div>
          <div class="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-teal-700">
            <span>Ouvrir Badminton &amp; Ping-Pong</span>
            <span>→</span>
          </div>
        </a>
      </div>
    </div>
  </section>'''

    # Replace the duplicated CRMEF urgency banner + old APS studio banner with our dedicated Hub Sports section
    pattern_dup = re.compile(
        r"<!-- PROFEPS_CRMEF_URGENCY_MESH_START -->.*?<!-- PROFEPS_APS_STUDIO_HUB_BANNER_END -->",
        flags=re.DOTALL,
    )
    if pattern_dup.search(idx):
        idx = pattern_dup.sub(dedicated_aps_home_section, idx)
    else:
        # If already replaced or different markers
        idx = re.sub(
            r"<!-- PROFEPS_APS_STUDIO_HUB_BANNER_START -->.*?<!-- PROFEPS_APS_STUDIO_HUB_BANNER_END -->",
            dedicated_aps_home_section,
            idx,
            flags=re.DOTALL,
        )

    # Add filterHomeAps(cat) JS function before </script> at the bottom of index.html if not present
    if "function filterHomeAps(" not in idx:
        filter_home_aps_js = """
    // 7. Filtre interactif du Hub des Sports & 13 Studios APS sur la page d'accueil
    function filterHomeAps(cat) {
      cat = cat || 'all';
      var buttons = [
        { id: 'btn-home-aps-all', cat: 'all' },
        { id: 'btn-home-aps-collectifs', cat: 'collectifs' },
        { id: 'btn-home-aps-athletisme', cat: 'athletisme' },
        { id: 'btn-home-aps-gym-raquettes', cat: 'gym-raquettes' }
      ];
      buttons.forEach(function(b) {
        var el = document.getElementById(b.id);
        if (!el) return;
        if (b.cat === cat) {
          el.className = 'px-3.5 py-1.5 text-xs font-extrabold rounded-xl bg-slate-900 text-white transition cursor-pointer';
        } else {
          el.className = 'px-3.5 py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer';
        }
      });
      document.querySelectorAll('#home-aps-studios-grid .home-aps-card').forEach(function(card) {
        var c = card.getAttribute('data-home-aps-cat');
        if (cat === 'all' || c === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }
"""
        last_script_close = idx.rfind("</script>")
        if last_script_close != -1:
            idx = idx[:last_script_close] + filter_home_aps_js + "  " + idx[last_script_close:]

    with open(index_path, "w", encoding="utf-8") as f:
        f.write(idx)
    shutil.copy2(index_path, os.path.join(ROOT_DIR, "index.html"))
    print("  [OK] Replaced duplicated CRMEF section with dedicated Hub des Sports & 13 Studios APS section on Home Page")


def step5_add_hub_sports_to_footer_across_site():
    print("=== STEP 5: Adding Hub des Sports & APS below À propos in Footer across all HTML pages (excluding generateur.html) ===")
    target_line = '<li><a href="a-propos.html" data-i18n-fr="À propos" data-i18n-en="About Us" data-i18n-ar="من نحن">À propos</a></li>'
    hub_sports_footer_line = '<li><a href="hub-aps-sports-eps-maroc.html" data-i18n-fr="Hub des Sports &amp; APS" data-i18n-en="Sports &amp; PE Hub" data-i18n-ar="بوابة الرياضات والأنشطة البدنية">Hub des Sports &amp; APS</a></li>'

    html_files = sorted(glob.glob(os.path.join(PUBLIC_DIR, "*.html")))
    updated_count = 0
    for fpath in html_files:
        fname = os.path.basename(fpath)
        # HARD CONSTRAINT: NEVER touch generateur.html
        if fname == "generateur.html":
            continue

        with open(fpath, "r", encoding="utf-8") as f:
            content = f.read()

        # Check if footer has À propos and doesn't yet have hub-aps-sports-eps-maroc.html right under it
        if target_line in content and '<li><a href="hub-aps-sports-eps-maroc.html"' not in content:
            content = content.replace(
                target_line,
                target_line + "\n            " + hub_sports_footer_line,
            )
            with open(fpath, "w", encoding="utf-8") as f:
                f.write(content)
            updated_count += 1
        elif 'href="a-propos.html"' in content and '<li><a href="hub-aps-sports-eps-maroc.html"' not in content:
            content = re.sub(
                r'(<li><a href="a-propos\.html"[^>]*>.*?</a></li>)',
                r"\1\n            " + hub_sports_footer_line,
                content,
                count=1,
            )
            with open(fpath, "w", encoding="utf-8") as f:
                f.write(content)
            updated_count += 1

    # Mirror /public/index.html to /index.html
    shutil.copy2(os.path.join(PUBLIC_DIR, "index.html"), os.path.join(ROOT_DIR, "index.html"))

    # Also update scripts/unifier-navbar-footer.js and scripts/normalize-footer.js if they exist
    for sfile in ["unifier-navbar-footer.js", "normalize-footer.js"]:
        sp = os.path.join(SCRIPTS_DIR, sfile)
        if os.path.exists(sp):
            with open(sp, "r", encoding="utf-8") as f:
                sc = f.read()
            if target_line in sc and "hub-aps-sports-eps-maroc.html" not in sc:
                sc = sc.replace(
                    target_line,
                    target_line + "\n            " + hub_sports_footer_line,
                )
                with open(sp, "w", encoding="utf-8") as f:
                    f.write(sc)

    print(f"  [OK] Updated footer in {updated_count} HTML files (generateur.html untouched!)")


if __name__ == "__main__":
    step1_fix_4_generators_and_regenerate()
    step2_clean_and_unify_all_13_silos()
    step3_upgrade_hub_aps_page()
    step4_update_home_page()
    step5_add_hub_sports_to_footer_across_site()
    print("=== ALL 5 STEPS COMPLETED SUCCESSFULLY ===")
