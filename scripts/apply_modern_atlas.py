#!/usr/bin/env python3
"""
apply_modern_atlas.py
Applies the "Modern Atlas" design system (/assets/site.css), shared static HTML
header/footer partials (partials/header.html & partials/footer.html) with the new
EPS & Education SVG emblem, SVG + PNG favicons, template body classes,
Amber download buttons, and inline style/alignment cleanup across all static HTML
pages in /public while preserving 100% of SEO titles, H1s, canonicals, and JSON-LD.
"""
import re
import shutil
import pathlib

ROOT = pathlib.Path("public")
HEADER = (ROOT / "partials/header.html").read_text(encoding="utf-8")
FOOTER = (ROOT / "partials/footer.html").read_text(encoding="utf-8")
CSS_LINK = '  <link rel="stylesheet" href="/assets/site.css?v=20261113">'
FAVICON_SVG_LINK = '  <link rel="icon" type="image/svg+xml" href="/favicon.svg">'
COMM_SCRIPT = '  <script src="profeps-communaute.js" defer></script>'

TEMPLATES = [
    (r"^article-", "tpl-article"),
    (r"^orientations-pedagogiques-", "tpl-document"),
    (r"^(aps-|cycle-|hub-aps|fiche-|grille-|programmation-|bibliotheque-numerique-eps)", "tpl-sport"),
    (r"^(qcm-|concours)", "tpl-concours"),
    (r"^(calculateur-|generateur|test-navette|bareme-|hub-outils-sport)", "tpl-tool"),
]


def template_for(name: str) -> str:
    for pat, cls in TEMPLATES:
        if re.search(pat, name):
            return cls
    return "tpl-page"


def add_body_class(match: re.Match, cls: str) -> str:
    attrs = match.group(1) or ""
    attrs = re.sub(r"\btpl-(article|document|sport|concours|tool|page)\b\s*", "", attrs)
    if 'class="' in attrs:
        return "<body" + attrs.replace('class="', f'class="{cls} ', 1) + ">"
    return f'<body{attrs} class="{cls}">'


def remap_inline_styles(full_tag: str, open_tag: str, style_body: str, close_tag: str) -> str:
    """Remaps legacy red/green/pink, broken gradients, justify alignment, and fixed-navbar offsets in inline <style> blocks."""
    s = style_body

    # 1. Fix broken linear-gradient syntax from earlier regex (e.g., "linear-gradient(...) 52%, #f3faf6 100%)")
    s = re.sub(
        r"linear-gradient\(135deg,\s*var\(--sky\)\s*0%,\s*var\(--paper\)\s*100%\)\s*\d+%,\s*#[0-9a-fA-F]{3,6}\s*100%\)",
        "linear-gradient(135deg, var(--sky) 0%, var(--paper) 100%)",
        s,
        flags=re.I,
    )
    s = re.sub(
        r"linear-gradient\([^;{}]*#fff8f8[^;{}]*#[0-9a-fA-F]{3,6}\s*100%\)",
        "linear-gradient(135deg, var(--sky) 0%, var(--paper) 100%)",
        s,
        flags=re.I,
    )

    # 2. Replace text-align: justify with text-align: left to prevent irregular word spacing
    s = re.sub(r"text-align:\s*justify\b", "text-align: left", s, flags=re.I)

    # 3. Remove legacy fixed-navbar offsets (padding-top: 80px / 100px, margin-top: 80px)
    s = re.sub(r"padding-top:\s*(?:80|100)px(?:\s*!important)?\s*;?", "padding-top: 0;", s, flags=re.I)
    s = re.sub(r"margin-top:\s*80px(?:\s*!important)?\s*;?", "margin-top: 0;", s, flags=re.I)

    # 4. Remap legacy red/burgundy/green/pink hex tokens to Modern Atlas palette
    s = re.sub(r"#(c1272d|b91c1c|dc2626|e11d48)\b", "#3347D6", s, flags=re.I)
    s = re.sub(r"#(991b1b|881337|7f1d1d|a01f24)\b", "#2434A8", s, flags=re.I)
    s = re.sub(r"#(006233|047857|059669|15803d)\b", "#0B7A99", s, flags=re.I)
    s = re.sub(r"#(064e3b|065f46|004d28)\b", "#085E77", s, flags=re.I)
    s = re.sub(r"#(fff8f8|fff5f5|fef2f2|fff1f2|fee2e2|f3faf6|f0fdf4)\b", "var(--sky)", s, flags=re.I)
    s = re.sub(r"#(f5c2c7|fecaca|e5b4b7|fecdd3|fda4af|a7d7c5|a7f3d0)\b", "var(--stone)", s, flags=re.I)
    s = re.sub(r"#f8fafc\b", "var(--paper)", s, flags=re.I)

    # 5. Convert hardcoded light overrides inside profeps-phase3-* style blocks to CSS tokens
    if "profeps-phase3" in open_tag:
        s = re.sub(r"background:\s*#ffffff\b", "background: var(--surface)", s, flags=re.I)
        s = re.sub(r"background-color:\s*#ffffff\b", "background-color: var(--surface)", s, flags=re.I)
        s = re.sub(r"background:\s*#f1f5f9\b", "background: var(--sky)", s, flags=re.I)
        s = re.sub(r"color:\s*#(0f172a|1e293b)\b", "color: var(--ink)", s, flags=re.I)
        s = re.sub(r"color:\s*#(334155|475569)\b", "color: var(--slate)", s, flags=re.I)
        s = re.sub(r"border-color:\s*#(e2e8f0|cbd5e1)\b", "border-color: var(--stone)", s, flags=re.I)
        s = re.sub(r"border:\s*1px\s+solid\s+#(e2e8f0|cbd5e1)\b", "border: 1px solid var(--stone)", s, flags=re.I)
        s = re.sub(r"border-bottom:\s*1px\s+solid\s+#(e2e8f0|cbd5e1)\b", "border-bottom: 1px solid var(--stone)", s, flags=re.I)

    return open_tag + s + close_tag


def remap_inline_style_attributes(html: str) -> str:
    """Remaps legacy red/green/pink colors inside inline style=\"...\" attributes on HTML elements."""
    def repl_style_attr(m: re.Match) -> str:
        val = m.group(1)
        val = re.sub(
            r"linear-gradient\([^;\"]*#fff8f8[^;\"]*#f3faf6\s*100%\)",
            "linear-gradient(135deg, var(--sky) 0%, var(--surface) 100%)",
            val,
            flags=re.I,
        )
        val = re.sub(
            r"linear-gradient\(135deg,\s*#c1272d\s*0%,\s*#991b1b\s*55%,\s*#006233\s*100%\)",
            "var(--grad)",
            val,
            flags=re.I,
        )
        val = re.sub(r"#(c1272d|991b1b|881337|7f1d1d)\b", "#3347D6", val, flags=re.I)
        val = re.sub(r"#(006233|065f46|064e3b)\b", "#0B7A99", val, flags=re.I)
        val = re.sub(r"#(fff8f8|fef2f2|fff1f2|f3faf6)\b", "var(--sky)", val, flags=re.I)
        val = re.sub(r"#(f5c2c7|fecaca|a7d7c5|a7f3d0)\b", "var(--stone)", val, flags=re.I)
        return f'style="{val}"'

    return re.sub(r'style="([^"]*)"', repl_style_attr, html)


def upgrade_pdf_download_buttons(html: str, cls: str) -> str:
    """In tpl-document pages, ensure primary PDF download anchors include btn-atlas-download for the Sunrise Amber button style."""
    if cls != "tpl-document":
        return html

    def repl_anchor(m: re.Match) -> str:
        tag = m.group(0)
        if "btn-atlas-download" in tag:
            return tag
        if "Télécharger" in tag and 'class="' in tag:
            return tag.replace('class="', 'class="btn-atlas-download ', 1)
        return tag

    return re.sub(r'<a\b[^>]*href="[^"]*\.pdf"[^>]*>.*?</a>', repl_anchor, html, flags=re.S | re.I)


def main():
    html_files = sorted(ROOT.glob("*.html"))
    updated_count = 0
    counts_by_tpl = {}

    for f in html_files:
        fname = f.name
        if fname == "google9e56188ccdfea7e9.html":
            continue

        html = f.read_text(encoding="utf-8", errors="ignore")
        orig = html

        cls = template_for(fname)
        counts_by_tpl[cls] = counts_by_tpl.get(cls, 0) + 1

        # 1. Inject header partial with current file name
        page_header = re.sub(
            r'data-current-file="[^"]*"',
            f'data-current-file="{fname}"',
            HEADER
        )
        if "<!-- PROFEPS_UNIFIED_NAVBAR_START -->" in html and "<!-- PROFEPS_UNIFIED_NAVBAR_END -->" in html:
            html = re.sub(
                r"<!-- PROFEPS_UNIFIED_NAVBAR_START -->.*?<!-- PROFEPS_UNIFIED_NAVBAR_END -->",
                lambda _: page_header.strip(),
                html,
                count=1,
                flags=re.S
            )

        # 2. Inject footer partial
        if '<footer class="footer" id="profeps-unified-footer">' in html:
            html = re.sub(
                r'<footer class="footer" id="profeps-unified-footer">.*?</footer>',
                lambda _: FOOTER.strip(),
                html,
                count=1,
                flags=re.S
            )
        elif "<footer" in html:
            html = re.sub(
                r"<footer\b[^>]*>.*?</footer>",
                lambda _: FOOTER.strip(),
                html,
                count=1,
                flags=re.S
            )
        elif "</body>" in html and not ('http-equiv="refresh"' in html.lower() and len(html) < 2000):
            html = html.replace("</body>", "\n" + FOOTER.strip() + "\n</body>", 1)

        # 3. Link /favicon.svg, /assets/site.css, and profeps-communaute.js in <head>
        if "/favicon.svg" not in html:
            html = html.replace("</head>", FAVICON_SVG_LINK + "\n</head>", 1)
        if "/assets/site.css" not in html:
            html = html.replace("</head>", CSS_LINK + "\n</head>", 1)
        else:
            html = re.sub(r'/assets/site\.css\?v=\d+', '/assets/site.css?v=20261113', html)
        if "profeps-communaute.js" not in html:
            html = html.replace("</head>", COMM_SCRIPT + "\n</head>", 1)

        # 4. Add template class to <body>
        html = re.sub(r"<body([^>]*)>", lambda m: add_body_class(m, cls), html, count=1)

        # 5. Remap legacy red/green, broken gradients, justify alignment, and fixed offsets inside inline <style> blocks
        html = re.sub(
            r"(<style\b[^>]*>)(.*?)(</style>)",
            lambda m: remap_inline_styles(m.group(0), m.group(1), m.group(2), m.group(3)),
            html,
            flags=re.S | re.I
        )

        # 6. Remap inline style="..." attributes
        html = remap_inline_style_attributes(html)

        # 7. Remove Tailwind text-justify class if present
        html = re.sub(r"\btext-justify\b", "text-left", html)

        # 8. Upgrade PDF download buttons on document pages to Sunrise Amber (.btn-atlas-download)
        html = upgrade_pdf_download_buttons(html, cls)

        # 9. Replace bureaucratic jargon with warm human phrasing
        html = html.replace("Écosystème didactique", "Tout pour enseigner l'EPS")
        html = html.replace("Studio Didactique", "Prépare ta séance")
        html = html.replace("Portail Officiel", "Plateforme Pédagogique")
        html = html.replace("Conformité ministérielle assurée", "Fondé sur les OP 2007/2009")

        if html != orig:
            f.write_text(html, encoding="utf-8")
            updated_count += 1

    # Also update /public/css/profeps-unifier.min.css cache-buster
    unifier_css = ROOT / "css/profeps-unifier.min.css"
    if unifier_css.exists():
        unifier_css.write_text("@import url('/assets/site.css?v=20261113');\n", encoding="utf-8")

    # Sync root index.html with public/index.html
    if (ROOT / "index.html").exists():
        shutil.copy2(ROOT / "index.html", pathlib.Path("index.html"))

    print(f"Modern Atlas rollout complete: {updated_count}/{len(html_files) - 1} HTML files updated.")
    print("Template distribution:", counts_by_tpl)


if __name__ == "__main__":
    main()
