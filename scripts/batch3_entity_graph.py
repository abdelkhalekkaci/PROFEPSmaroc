#!/usr/bin/env python3
"""Batch 3: Unify Entity & Knowledge Graph Schema (@id Person + EducationalOrganization)
across all 257 indexable HTML pages.
"""
import json
import re
from pathlib import Path

ROOT = Path("public")

AUTHOR_ID = "https://profeps.ma/a-propos.html#author"
ORG_ID = "https://profeps.ma/#organization"

ORG_MINIMAL = {
    "@type": "EducationalOrganization",
    "@id": ORG_ID,
    "name": "ProfEPS Maroc",
    "url": "https://profeps.ma/",
    "logo": {
        "@type": "ImageObject",
        "url": "https://profeps.ma/images/prof_eps.png",
    },
}

ORG_FULL_LD = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": ORG_ID,
    "name": "ProfEPS Maroc",
    "url": "https://profeps.ma/",
    "logo": "https://profeps.ma/images/prof_eps.png",
    "areaServed": {"@type": "Country", "name": "Morocco"},
    "sameAs": [
        "https://www.facebook.com/profile.php?id=61559954402311",
        "https://www.instagram.com/profeps.ma",
    ],
}

PERSON_NAMES = {
    "Abdelkhalek ELBOUDANI",
    "Abdelkhalek Kaci",
    "عبد الخالق البوداني (Abdelkhalek ELBOUDANI)",
}

ORG_AUTHOR_NAMES = {
    "Prof EPS & MAS Calculator",
    "Prof EPS Maroc",
    "ProfEPS Maroc",
    "ProfEPS",
}


def normalize_node(obj):
    if isinstance(obj, list):
        return [normalize_node(x) for x in obj]
    if not isinstance(obj, dict):
        return obj

    new_obj = {}
    for k, v in obj.items():
        if k == "author":
            if isinstance(v, list):
                new_obj[k] = [normalize_author(x) for x in v]
            elif isinstance(v, dict):
                new_obj[k] = normalize_author(v)
            else:
                new_obj[k] = v
        elif k == "publisher" and isinstance(v, dict):
            new_obj[k] = normalize_publisher(v)
        elif k == "founder" and isinstance(v, dict) and v.get("name") in PERSON_NAMES:
            f = dict(v)
            f["@id"] = AUTHOR_ID
            f["name"] = "Abdelkhalek ELBOUDANI"
            new_obj[k] = f
        elif k == "@type" and v == "EducationalOrganization" and obj.get("@id") == ORG_ID:
            new_obj[k] = v
        else:
            new_obj[k] = normalize_node(v)

    if new_obj.get("@id") == ORG_ID and new_obj.get("@type") == "EducationalOrganization":
        if "areaServed" not in new_obj and "sameAs" in new_obj:
            new_obj["areaServed"] = {"@type": "Country", "name": "Morocco"}
    return new_obj


def normalize_author(a: dict) -> dict:
    name = a.get("name", "")
    if name in PERSON_NAMES:
        out = dict(a)
        out["@type"] = "Person"
        out["@id"] = AUTHOR_ID
        if name == "Abdelkhalek Kaci":
            out["name"] = "Abdelkhalek ELBOUDANI"
        elif name.startswith("عبد الخالق"):
            out["alternateName"] = "Abdelkhalek ELBOUDANI"
        out["url"] = "https://profeps.ma/a-propos.html"
        wf = out.get("worksFor")
        if isinstance(wf, dict) and ("Prof" in wf.get("name", "")):
            out["worksFor"] = {
                "@type": "EducationalOrganization",
                "@id": ORG_ID,
                "name": "ProfEPS Maroc",
                "url": "https://profeps.ma/",
            }
        return out
    if name in ORG_AUTHOR_NAMES:
        return {
            "@type": "EducationalOrganization",
            "@id": ORG_ID,
            "name": "ProfEPS Maroc",
            "url": "https://profeps.ma/",
            "areaServed": {"@type": "Country", "name": "Morocco"},
        }
    return normalize_node(a)


def normalize_publisher(p: dict) -> dict:
    name = p.get("name", "")
    if p.get("@id") == ORG_ID and not name:
        return dict(ORG_MINIMAL)
    if name in ORG_AUTHOR_NAMES:
        return dict(ORG_MINIMAL)
    return normalize_node(p)


def main():
    ld_pat = re.compile(
        r'(<script\b[^>]*type=["\']application/ld\+json["\'][^>]*>)(.*?)(</script>)',
        re.S | re.I,
    )

    updated_files = 0
    injected_org = 0
    total_indexable = 0

    for path in sorted(ROOT.glob("*.html")):
        if path.name.startswith("google"):
            continue
        src = path.read_text(encoding="utf-8")
        if "noindex" in src.lower():
            continue
        total_indexable += 1

        changed = False
        if "Abdelkhalek Kaci — ProfEPS" in src:
            src = src.replace("Abdelkhalek Kaci — ProfEPS", "Abdelkhalek ELBOUDANI — ProfEPS Maroc")
            changed = True

        def repl(m):
            nonlocal changed
            prefix, raw, suffix = m.group(1), m.group(2), m.group(3)
            data = json.loads(raw)
            norm = normalize_node(data)
            if norm != data:
                changed = True
                return prefix + json.dumps(norm, ensure_ascii=False) + suffix
            return m.group(0)

        new_src = ld_pat.sub(repl, src)

        # Ensure every indexable page links to ProfEPS #organization
        if ORG_ID not in new_src:
            org_tag = f'  <script type="application/ld+json">{json.dumps(ORG_FULL_LD, ensure_ascii=False)}</script>\n</head>'
            new_src = new_src.replace("</head>", org_tag, 1)
            injected_org += 1
            changed = True

        if changed:
            path.write_text(new_src, encoding="utf-8")
            updated_files += 1

    print(f"Batch 3 complete: {updated_files}/{total_indexable} files updated ({injected_org} org nodes injected).")


if __name__ == "__main__":
    main()
