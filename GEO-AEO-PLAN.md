# Plan GEO / AEO — ProfEPS Maroc

Objectif : faire apparaître ProfEPS dans les réponses générées par ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews, Bing Copilot, Apple Intelligence.

Légende : `[ ]` à faire · `[~]` en cours · `[x]` fait

---

## PHASE 1 — Crawlabilité LLM (prérequis, quick wins)

Sans ça, tout le reste est invisible pour les LLM. À attaquer en premier.

- [x] **1.1** Auditer `public/robots.txt` existant
- [x] **1.2** Autoriser `GPTBot` (ChatGPT training + browsing)
- [x] **1.3** Autoriser `OAI-SearchBot` (ChatGPT Search)
- [x] **1.4** Autoriser `ClaudeBot` + `anthropic-ai` + `Claude-Web`
- [x] **1.5** Autoriser `PerplexityBot` + `Perplexity-User`
- [x] **1.6** Autoriser `Google-Extended` (distinct de Googlebot — pour AI Overviews / Gemini)
- [x] **1.7** Autoriser `Applebot-Extended` (Apple Intelligence)
- [x] **1.8** Autoriser `CCBot` (Common Crawl — base d'entraînement de beaucoup de LLM)
- [x] **1.9** Autoriser `Bytespider`, `DuckAssistBot`, `YouBot`, `Meta-ExternalAgent`, `cohere-ai`, `MistralAI-User`, `Diffbot`, `Timpibot`
- [x] **1.10** Créer `public/llms.txt` à la racine (standard llmstxt.org) — index Markdown de tous les articles
- [x] **1.11** Créer `public/llms-full.txt` — version étendue avec résumés
- [x] **1.12** Vérifier qu'aucune balise `<meta name="robots" content="noai, noimageai">` ne bloque les LLM ✓ (seul `login.html` a `noindex`, comportement souhaité)

## PHASE 2 — Schema.org enrichi (JSON-LD)

Les LLM aspirent directement le JSON-LD comme source de vérité structurée. Levier le plus rentable.

### 2.A — FAQPage schema
- [x] **2.1** `FAQPage` JSON-LD sur `article-orientation-prof-eps.html` ✓ (9 Q&A verbatim)
- [x] **2.2** `FAQPage` JSON-LD sur `article-sport-etudes-maroc.html` ✓ (9 Q&A verbatim)
- [x] **2.3** `FAQPage` JSON-LD sur `article-examen-sortie-crmef-eps.html` ✓ (6 Q&A verbatim)
- [ ] **2.4** `FAQPage` JSON-LD sur `article-concours.html` — SKIP : pas de FAQ à extraire verbatim (article court)
- [x] **2.5** `FAQPage` JSON-LD sur `article-bareme-eps-bac-maroc.html` ✓ (5 Q&A verbatim)
- [x] **2.6** `FAQPage` JSON-LD sur `article-op.html` (Orientations Pédagogiques) ✓ (6 Q&A verbatim + fix description inversée collège/lycée)
- [ ] **2.7** `FAQPage` JSON-LD sur `article-difference-op-2007-2009-eps.html`
- [ ] **2.8** `FAQPage` JSON-LD sur `faq.html`
- [x] **2.A.bonus** `FAQPage` JSON-LD sur `article-structure-seance.html` ✓ (5 Q&A verbatim — 4 phases + timing)

### 2.B — HowTo schema
- [ ] **2.9** `HowTo` sur `article-structure-seance.html` (structurer une séance EPS)
- [ ] **2.10** `HowTo` sur `article-creer-ass.html` (créer une Association Sportive)
- [ ] **2.11** `HowTo` sur `article-projet-annuel-ass.html`
- [ ] **2.12** `HowTo` sur `article-fiche-seance-athletisme-eps.html`
- [ ] **2.13** `HowTo` sur `article-seance-gymnastique.html`

### 2.C — BreadcrumbList
- [ ] **2.14** `BreadcrumbList` sur tous les articles de blog (Accueil > Blog > Catégorie > Article)

### 2.D — Organization / EducationalOrganization
- [ ] **2.15** `Organization` schema complet sur `a-propos.html` (logo, sameAs, contactPoint)
- [ ] **2.16** `EducationalOrganization` sur `index.html` (homepage)
- [ ] **2.17** `sameAs` vers réseaux sociaux ProfEPS (Instagram, Facebook, YouTube, LinkedIn…)
- [ ] **2.18** `WebSite` schema avec `SearchAction` (sitelinks searchbox) sur homepage

### 2.E — Article schema — enrichissement
- [ ] **2.19** Ajouter `speakable` property sur articles piliers (Google Assistant / voice)
- [ ] **2.20** Ajouter `author` avec `Person` détaillé (E-E-A-T) quand un auteur humain est identifiable
- [ ] **2.21** Ajouter `citation` pointant vers textes officiels (loi-cadre 51.17, BO…)

## PHASE 3 — Format "Answer-first" (réponse directe)

Les LLM préfèrent extraire les 2-3 premières phrases. Il faut y placer **la** réponse à la question titre.

- [x] **3.1** Créer un composant visuel `.answer-box` / `.tldr-box` standardisé (CSS commun) ✓ (snippet canonique ci-dessous)
- [x] **3.2** Bloc "En bref" sur `article-orientation-prof-eps.html` ✓
- [x] **3.3** Bloc "En bref" sur `article-sport-etudes-maroc.html` ✓
- [x] **3.4** Bloc "En bref" sur `article-examen-sortie-crmef-eps.html` ✓
- [x] **3.5** Bloc "En bref" sur `article-concours.html` ✓
- [x] **3.6** Bloc "En bref" sur `article-examen-pro.html` ✓
- [x] **3.7** Bloc "En bref" sur `article-bareme-eps-bac-maroc.html` ✓
- [x] **3.8** Bloc "En bref" sur `article-op.html` ✓
- [ ] **3.9** Bloc "En bref" sur `article-eval.html`
- [ ] **3.10** Bloc "En bref" sur `article-approche-competences.html`
- [x] **3.11** Bloc "En bref" sur `article-structure-seance.html` ✓
- [ ] **3.12** Audit H1 + H2 : chaque H2 doit être formulé comme une **question** quand c'est naturel

## PHASE 4 — Densité factuelle & citations

Les LLM citent ce qui cite des sources fiables.

- [ ] **4.1** Lister les sources officielles autorisées (men.gov.ma, tawjih.ma, BO Maroc, loi-cadre 51.17, décrets CRMEF)
- [ ] **4.2** Section "Sources officielles" standardisée en bas de chaque article pilier
- [ ] **4.3** Remplacer formulations vagues par chiffres/dates précis (coefficients, nb CRMEF, dates concours)
- [ ] **4.4** Standardiser les noms d'entités (MENPS, CRMEF, ESEF, ENS, I2S, ISS, IRFC) — toujours sigle + développement la première fois
- [ ] **4.5** Créer page `glossaire-eps-maroc.html` — définitions courtes, chaque terme = 1 `<dt>/<dd>` avec `DefinedTerm` schema

## PHASE 5 — Contenu structuré extractible

Les LLM adorent les tableaux comparatifs et les listes.

- [ ] **5.1** Tableau "Comparatif des 5 voies pour devenir prof EPS" (à extraire comme image ET HTML)
- [ ] **5.2** Tableau "Coefficients EPS bac par filière" avec headers clairs
- [ ] **5.3** Tableau "Sport-Études : établissements × disciplines × ville"
- [ ] **5.4** Tableau "12 CRMEF du Maroc : ville × région × spécialités offertes"
- [ ] **5.5** Tableau "APSA officielles au Maroc par cycle"
- [ ] **5.6** Listes numérotées pour toutes les étapes/procédures (`<ol>`, pas `<ul>`, quand l'ordre compte)

## PHASE 6 — Indexation moteurs AI-adjacent

Perplexity = Bing. Copilot = Bing. Ne pas oublier Bing.

- [x] **6.1** Créer compte **Bing Webmaster Tools** ✓
- [x] **6.1b** Ajouter `<meta name="msvalidate.01">` sur la homepage ✓ (commit `a4a5308`)
- [x] **6.2** Soumettre `sitemap.xml` à Bing ✓ (2026-04-12)
- [ ] **6.3** Vérifier couverture Bing dans 48-72h (Perplexity + Copilot dépendent de ça)
- [x] **6.4** Configurer **IndexNow** ✓ (clé : `90ce54bb05e24a9b87d11903ac01fc8b`)
- [x] **6.4a** Fichier de clé servi à la racine ✓ ([/90ce54bb05e24a9b87d11903ac01fc8b.txt](https://www.profeps.ma/90ce54bb05e24a9b87d11903ac01fc8b.txt))
- [x] **6.4b** Script `scripts/indexnow-submit.js` créé et fonctionnel ✓
- [x] **6.4c** Premier batch soumis (48 URLs) — réponse `202 Accepted` ✓
- [ ] **6.5** Google Search Console — surveiller "Google AI Overviews" quand dispo au Maroc
- [ ] **6.6** Soumettre à **Yandex Webmaster** (certains LLM pullent Yandex)
- [ ] **6.7** Soumettre flux RSS (si existe) aux agrégateurs

## PHASE 7 — Performance technique

Les crawlers LLM sont plus stricts que Googlebot sur le JS.

- [ ] **7.1** Vérifier que tout le contenu textuel est dans le HTML statique (pas rendu JS)
- [ ] **7.2** Lighthouse Performance ≥ 90 sur articles piliers
- [ ] **7.3** `Cache-Control` long sur assets statiques
- [ ] **7.4** Images avec `alt` descriptif riche en entités (pas juste "image1.jpg")
- [ ] **7.5** `loading="lazy"` mais sur images hors fold uniquement
- [ ] **7.6** `rel="canonical"` sur toutes les pages (audit)
- [ ] **7.7** `hreflang` cohérent (fr-MA, ar-MA quand applicable)

## PHASE 8 — Entités & Knowledge Graph

Objectif : ProfEPS devient une **entité reconnue** par les LLM.

- [ ] **8.1** Wikipedia/Wikidata — créer entrée "ProfEPS" si éligible (difficile, mais très impactant)
- [ ] **8.2** Fiche Google Business Profile (si entité locale)
- [ ] **8.3** Profils cohérents sur LinkedIn, Crunchbase (si applicable), ORCID (auteurs)
- [ ] **8.4** Backlinks depuis sites `.gov.ma` / `.ac.ma` (universités, associations prof EPS)
- [ ] **8.5** Citations dans articles de presse éducation Maroc

## PHASE 9 — Contenu orienté requêtes LLM

Les LLM répondent à des **questions**, pas à des mots-clés.

- [ ] **9.1** Lister les 50 questions réelles posées sur "prof EPS Maroc" (AnswerThePublic, AlsoAsked, PAA Google)
- [ ] **9.2** Mapper chaque question à un article existant ou nouvel article
- [ ] **9.3** Créer pages Q&A individuelles pour les 10 top questions (URL courte type `q/comment-devenir-prof-eps.html`)
- [ ] **9.4** Version arabe des réponses clés (les LLM arabisent très bien, le contenu ar reste rare → avantage compétitif)
- [ ] **9.5** Articles "vs" (ex: "ENS vs ESEF vs I2S — Quelle voie choisir ?") — format très aimé des LLM

## PHASE 10 — Monitoring & itération

Sans mesure, pas de progrès.

- [ ] **10.1** Définir 20 prompts de contrôle (ex: "Comment devenir prof EPS au Maroc ?", "Combien dure la formation CRMEF ?", "Qu'est-ce que le sport-études au Maroc ?")
- [ ] **10.2** Tester chaque prompt chaque semaine sur : ChatGPT, Perplexity, Claude, Gemini, Copilot
- [ ] **10.3** Feuille de suivi : date × prompt × moteur × ProfEPS cité (oui/non) × position
- [ ] **10.4** Logs serveur : surveiller la hausse de hits depuis User-Agents LLM (GPTBot, ClaudeBot, PerplexityBot…)
- [ ] **10.5** Google Search Console : surveiller impressions depuis AI Overviews (quand GSC expose la data)
- [ ] **10.6** Alertes Google sur `site:profeps.ma` pour détecter citations externes

---

## Ordre d'exécution recommandé

1. **Phase 1 complète** (1h) — sans ça rien ne sert
2. **Phase 2.A (FAQPage) sur les 5 articles piliers** (2h)
3. **Phase 3 (Answer-first) sur les 5 articles piliers** (1h)
4. **Phase 6.1-6.4 (Bing + IndexNow)** (30 min, côté utilisateur)
5. **Phase 2.B à 2.E** (HowTo, Breadcrumb, Organization) — itératif
6. **Phase 5 (tableaux)** — à faire en même temps que l'audit de chaque article
7. **Phase 4 + 7 + 8 + 9** — travail de fond, continu
8. **Phase 10 (monitoring)** — à démarrer dès que Phase 1-2 sont faites pour avoir une baseline

---

## Snippets canoniques réutilisables

Ces snippets sont la **source de vérité** pour les composants répétés dans plusieurs articles. Copier-coller tels quels dans la `<style>` et le `<body>` de chaque article concerné.

### Composant `.answer-box` — Bloc "En bref" pour les LLM

Objectif : fournir aux LLM une réponse directe et extractible dans les 2-3 premières phrases de l'article, juste après le H1.

**CSS — à coller dans le `<style>` de l'article** :

```css
.answer-box {
    background: linear-gradient(135deg, rgba(0,98,51,0.06), rgba(193,39,45,0.04));
    border-left: 5px solid var(--secondary);
    border-radius: 0 var(--radius-lg, 12px) var(--radius-lg, 12px) 0;
    padding: 1.5rem 1.75rem;
    margin: 1.5rem 0 2rem;
    box-shadow: var(--shadow-md, 0 4px 6px rgba(0,0,0,0.07));
    position: relative;
}
.answer-box::before {
    content: "💡";
    position: absolute;
    top: -12px;
    left: 16px;
    background: white;
    padding: 0 8px;
    font-size: 1.2rem;
}
.answer-box-label {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--secondary);
    margin-bottom: 0.5rem;
}
.answer-box p {
    margin: 0 0 0.5rem;
    color: var(--text-primary);
    font-size: 1.02rem;
    line-height: 1.65;
}
.answer-box p:last-child { margin-bottom: 0; }
.answer-box strong { color: var(--primary); }
.answer-box ul {
    margin: 0.5rem 0 0 1.25rem;
    color: var(--text-primary);
}
.answer-box ul li { margin-bottom: 0.35rem; }
```

**HTML — à coller juste après le `</header>` de l'article, avant la première `<h2>`** :

```html
<div class="answer-box" itemscope itemtype="https://schema.org/Answer">
    <span class="answer-box-label">En bref — Réponse directe</span>
    <p itemprop="text">
        <!-- 2 à 3 phrases max, factuelles, répondant à la question du titre -->
        <!-- Exemple orientation : "Pour devenir prof d'EPS au Maroc, il faut obtenir une licence (ENS, ESEF, I2S, ISS ou toute licence universitaire), réussir le concours de recrutement MENPS, puis suivre la formation CRMEF (~6 à 8 mois en 2 semestres) avant la titularisation." -->
    </p>
</div>
```

**Règles d'écriture du bloc "En bref"** :
- 2 à 3 phrases maximum, jamais plus
- Répondre **directement** à la question du H1, sans intro narrative
- Chiffres, dates et noms précis (pas "environ", "plusieurs", "quelques")
- `<strong>` uniquement sur les entités clés (noms d'établissements, durées, sigles)
- Si liste : maximum 5 items, chacun 1 ligne

### Composant `FAQPage` JSON-LD

À ajouter dans le `<head>` de chaque article qui a une section FAQ.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Question exacte telle qu'elle apparaît dans l'article",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Réponse complète, factuelle, auto-suffisante (pas de 'voir ci-dessus'). Peut contenir du HTML simple : <p>, <ul>, <li>, <strong>."
      }
    }
  ]
}
</script>
```

### Composant `BreadcrumbList` JSON-LD

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.profeps.ma/" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.profeps.ma/blog.html" },
    { "@type": "ListItem", "position": 3, "name": "Catégorie", "item": "https://www.profeps.ma/blog.html#categorie" },
    { "@type": "ListItem", "position": 4, "name": "Titre de l'article" }
  ]
}
</script>
```

---

## Journal d'avancement

| Date | Phase | Action | Notes |
|------|-------|--------|-------|
| 2026-04-12 | - | Plan créé | Baseline |
| 2026-04-12 | 1 | robots.txt enrichi avec 18 User-Agents LLM | GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, CCBot, Bytespider, Meta-ExternalAgent, DuckAssistBot, YouBot, cohere-ai, MistralAI-User, Diffbot, Timpibot… |
| 2026-04-12 | 1 | `public/llms.txt` créé | Index Markdown de tous les articles (standard llmstxt.org) |
| 2026-04-12 | 1 | `public/llms-full.txt` créé | Version étendue avec connaissances structurées (métier, voies, CRMEF, Sport-Études, OP, glossaire) |
| 2026-04-12 | 3 | Snippet `.answer-box` documenté | Source de vérité dans ce fichier |
| 2026-04-12 | 6 | Bing `msvalidate.01` sur homepage | Commit `a4a5308` |
| 2026-04-12 | 6 | IndexNow configuré + 48 URLs soumises | Clé `90ce54bb…`, 202 Accepted, commit `01799f4` |
| 2026-04-12 | 6 | Bing Webmaster Tools : domaine vérifié + sitemap soumis | Côté utilisateur |
| 2026-04-12 | 2.A + 3 | Session 2 : FAQPage JSON-LD + blocs "En bref" sur 8 articles piliers | orientation, sport-etudes, examen-sortie-CRMEF, bareme-bac, op, structure-seance (FAQPage + En bref) ; concours, examen-pro (En bref only). Règle stricte : contenu verbatim uniquement, zéro invention. Fix bonus : description JSON-LD inversée collège/lycée sur article-op.html corrigée. |
