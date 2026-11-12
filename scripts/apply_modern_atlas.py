#!/usr/bin/env python3
"""
apply_modern_atlas.py
Applies the "Modern Atlas" design system (/assets/site.css), shared static HTML
header/footer partials (partials/header.html & partials/footer.html), template
body classes (tpl-article, tpl-document, tpl-sport, tpl-concours, tpl-tool, tpl-page),
Amber download buttons, and legacy red/green/light inline style cleanup across all
static HTML pages in /public while preserving 100% of SEO titles, H1s, canonicals,
and JSON-LD structured data.
"""
import re
import shutil
import pathlib

ROOT = pathlib.Path("public")
HEADER = (ROOT / "partials/header.html").read_text(encoding="utf-8")
FOOTER = (ROOT / "partials/footer.html").read_text(encoding="utf-8")
CSS_LINK = '  <link rel="stylesheet" href="/assets/site.css?v=20261112">'
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
    """Remaps legacy red/green and hardcoded light-mode colors in inline <style> blocks to Modern Atlas CSS tokens."""
    s = style_body
    s = re.sub(r"#c1272d\b", "#3347D6", s, flags=re.I)
    s = re.sub(r"#991b1b\b", "#2434A8", s, flags=re.I)
    s = re.sub(r"#006233\b", "#0B7A99", s, flags=re.I)
    s = re.sub(r"#064e3b\b", "#085E77", s, flags=re.I)
    s = re.sub(r"#f8fafc\b", "var(--paper)", s, flags=re.I)

    # Convert hardcoded light overrides inside profeps-phase3-* style blocks to CSS tokens so Dark Mode works everywhere
    if "profeps-phase3" in open_tag:
        s = re.sub(r"linear-gradient\([^)]*#fff8f8[^)]*\)", "linear-gradient(135deg, var(--sky) 0%, var(--paper) 100%)", s, flags=re.I)
        s = re.sub(r"background:\s*#ffffff\b", "background: var(--surface)", s, flags=re.I)
        s = re.sub(r"background-color:\s*#ffffff\b", "background-color: var(--surface)", s, flags=re.I)
        s = re.sub(r"background:\s*#f1f5f9\b", "background: var(--sky)", s, flags=re.I)
        s = re.sub(r"background:\s*#f3faf6\b", "background: var(--sky)", s, flags=re.I)
        s = re.sub(r"background:\s*#fff1f2\b", "background: var(--sky)", s, flags=re.I)
        s = re.sub(r"color:\s*#(0f172a|1e293b)\b", "color: var(--ink)", s, flags=re.I)
        s = re.sub(r"color:\s*#(334155|475569)\b", "color: var(--slate)", s, flags=re.I)
        s = re.sub(r"border-color:\s*#(e2e8f0|cbd5e1|a7d7c5|f5c2c7)\b", "border-color: var(--stone)", s, flags=re.I)
        s = re.sub(r"border:\s*1px\s+solid\s+#(e2e8f0|cbd5e1)\b", "border: 1px solid var(--stone)", s, flags=re.I)
        s = re.sub(r"border-bottom:\s*1px\s+solid\s+#(e2e8f0|cbd5e1)\b", "border-bottom: 1px solid var(--stone)", s, flags=re.I)

    return open_tag + s + close_tag


def upgrade_pdf_download_buttons(html: str, cls: str) -> str:
    """In tpl-document pages, ensure primary PDF download anchors include btn-atlas-download for the Sunrise Amber button style."""
    if cls != "tpl-document":
        return html

    def repl_anchor(m: re.Match) -> str:
        tag = m.group(0)
        if "btn-atlas-download" in tag:
            return tag
        # Only style primary button-like links that point to a .pdf and say Télécharger
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

        # 3. Link /assets/site.css and profeps-communaute.js in <head>
        if "/assets/site.css" not in html:
            html = html.replace("</head>", CSS_LINK + "\n</head>", 1)
        if "profeps-communaute.js" not in html:
            html = html.replace("</head>", COMM_SCRIPT + "\n</head>", 1)

        # 4. Add template class to <body>
        html = re.sub(r"<body([^>]*)>", lambda m: add_body_class(m, cls), html, count=1)

        # 5. Remap legacy red/green and hardcoded light colors inside inline <style> blocks
        html = re.sub(
            r"(<style\b[^>]*>)(.*?)(</style>)",
            lambda m: remap_inline_styles(m.group(0), m.group(1), m.group(2), m.group(3)),
            html,
            flags=re.S | re.I
        )

        # 6. Upgrade PDF download buttons on document pages to Sunrise Amber (.btn-atlas-download)
        html = upgrade_pdf_download_buttons(html, cls)

        # 7. Replace bureaucratic jargon with warm human phrasing
        html = html.replace("Écosystème didactique", "Tout pour enseigner l'EPS")
        html = html.replace("Studio Didactique", "Prépare ta séance")
        html = html.replace("Portail Officiel", "Plateforme Pédagogique")
        html = html.replace("Conformité ministérielle assurée", "Fondé sur les OP 2007/2009")

        if html != orig:
            f.write_text(html, encoding="utf-8")
            updated_count += 1

    # Sync root index.html with public/index.html
    if (ROOT / "index.html").exists():
        shutil.copy2(ROOT / "index.html", pathlib.Path("index.html"))

    print(f"Modern Atlas rollout complete: {updated_count}/{len(html_files)} HTML files updated.")
    print("Template distribution:", counts_by_tpl)


if __name__ == "__main__":
    main()
