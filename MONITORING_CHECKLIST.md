# Checklist monitoring GEO/AEO — ProfEPS Maroc

Document de référence pour suivre l'impact des phases GEO/AEO (2.B → 9c) sur le ranking et les requêtes voice-first. Hors `public/`, donc non déployé.

---

## 1. Validation immédiate (J+0 à J+2)

### Rich Results Test (Google)

URL : https://search.google.com/test/rich-results

Tester chaque URL et vérifier qu'aucune erreur n'est remontée :

**Pages Q&A (QAPage + Speakable)**
- [ ] https://www.profeps.ma/qa-coefficient-eps-bac-maroc.html
- [ ] https://www.profeps.ma/qa-duree-seance-eps.html
- [ ] https://www.profeps.ma/qa-difference-op-2007-2009.html
- [ ] https://www.profeps.ma/qa-volume-horaire-eps-maroc.html
- [ ] https://www.profeps.ma/qa-evaluation-eps-bac.html

**Articles avec FAQPage + Speakable + Citation**
- [ ] https://www.profeps.ma/article-op.html
- [ ] https://www.profeps.ma/article-difference-op-2007-2009-eps.html
- [ ] https://www.profeps.ma/article-bareme-eps-bac-maroc.html
- [ ] https://www.profeps.ma/article-structure-seance.html
- [ ] https://www.profeps.ma/article-eval.html

**Articles avec HowTo (Phase 2.B)**
- [ ] https://www.profeps.ma/article-seance-gymnastique.html
- [ ] https://www.profeps.ma/article-fiche-seance-athletisme-eps.html
- [ ] https://www.profeps.ma/article-structure-seance.html

**Pages Organization (entité)**
- [ ] https://www.profeps.ma/
- [ ] https://www.profeps.ma/blog.html
- [ ] https://www.profeps.ma/a-propos.html

> Si une erreur apparaît : copier le message et le coller dans une nouvelle session pour correction immédiate.

### Schema Validator (alternatif)

URL : https://validator.schema.org/

Mêmes URLs. Plus permissif que Rich Results Test mais détecte les erreurs structurelles.

---

## 2. Soumission moteurs (J+0)

### Google Search Console

1. Connexion : https://search.google.com/search-console
2. Property : `https://www.profeps.ma`
3. **URL inspection** pour chaque page Q&A → bouton `Request indexing` (limite : ~10/jour)
4. **Sitemaps** → vérifier que `sitemap.xml` est resoumis avec lastmod 2026-04-15

### Bing Webmaster Tools

1. Connexion : https://www.bing.com/webmasters
2. **URL Submission** → coller les 5 URLs Q&A
3. **IndexNow** est déjà configuré (clé `90ce54bb05e24a9b87d11903ac01fc8b`), donc Bing devrait recevoir automatiquement les pings — vérifier dans la section IndexNow que les soumissions des derniers commits apparaissent.

---

## 3. Suivi requêtes (J+7 à J+30)

### GSC — Performance > Search results

Ajouter ces filtres `Query contains` un par un et noter impressions/clics chaque semaine :

| Requête (filter contains) | Page cible | Phase |
|---------------------------|-----------|-------|
| `coefficient eps` | qa-coefficient-eps-bac-maroc | 9 |
| `coefficient sport bac` | qa-coefficient-eps-bac-maroc | 9 |
| `durée séance eps` | qa-duree-seance-eps | 9 |
| `combien de temps eps` | qa-duree-seance-eps | 9 |
| `différence op 2007 2009` | qa-difference-op-2007-2009 | 9 |
| `volume horaire eps` | qa-volume-horaire-eps-maroc | 9 |
| `évaluation eps bac` | qa-evaluation-eps-bac | 9 |
| `barème eps bac maroc` | article-bareme-eps-bac-maroc | 4 |
| `phases séance eps` | article-structure-seance | 5 |
| `kafa'a eps` | article-examen-pro | 5 |
| `crmef eps` | article-examen-sortie-crmef-eps | 3.12 |

**Indicateurs clés à tracker :**
- Impressions hebdomadaires sur ces requêtes
- Position moyenne (objectif : top 10 sous 30 jours, top 3 sous 90 jours)
- CTR (objectif : >5% sur questions directes)

### GSC — Pages

Filtrer par URL contenant `/qa-` pour suivre la performance globale du nouveau cluster Q&A.

---

## 4. Voice search verification (J+14)

### Test manuel

Sur Google Assistant (téléphone Android ou Google Home) :

- [ ] "OK Google, quel est le coefficient de l'EPS au bac marocain ?"
- [ ] "OK Google, combien de temps dure une séance d'EPS au Maroc ?"
- [ ] "OK Google, quelle est la différence entre OP 2007 et OP 2009 ?"

Si la réponse vocale cite ProfEPS ou affiche un résultat issu d'une page Q&A → succès Speakable.

Si le résultat vient d'un autre site → noter lequel pour comprendre le concurrent à dépasser.

---

## 5. Bilan mensuel

Une fois par mois, compiler :

1. **Impressions totales** sur les requêtes du tableau (somme)
2. **Top 5 pages Q&A** par clics
3. **Position moyenne** des 5 pages Q&A
4. **Nouvelles requêtes** apparues (long tail découverte)
5. **Erreurs Schema** détectées dans GSC > Améliorations

---

## 6. Actions correctives possibles

Si après 30 jours une page Q&A n'a aucune impression :

- **Vérifier l'indexation** : `site:profeps.ma/qa-...` dans Google
- **Si non indexée** : augmenter le linking interne (ajouter depuis d'autres articles), republier IndexNow, et faire `Request indexing` dans GSC
- **Si indexée mais pas en top 50** : enrichir la réponse (ajouter contexte, citations supplémentaires) et republier
- **Si indexée mais en top 50 sans clics** : retravailler la meta description pour augmenter le CTR

---

## 7. Phases déjà déployées (rappel)

| Phase | Objet | Commit |
|-------|-------|--------|
| 2.B | HowTo schema sur articles séance | `e533681` |
| 2.E | Speakable sur 11 articles | `190f3e0` |
| 3.12 wave 1 | H2 → questions naturelles (5 articles) | `c2e1671` |
| 3.12 wave 2 | H2 → questions naturelles (6 articles) | `c4f9818` |
| 4 | Citations + Sources officielles (5 articles) | `fec7896` |
| 5 | Tableaux comparatifs (3 articles) | `3de1b2f` |
| 8 | Renforcement Organization + audience | `b3da89b` |
| 9 | 5 pages Q&A dédiées | `49cd90b` |
| 9b | Hub Q&A sur faq.html | `e2f38b2` |
| 9c | Callouts bidirectionnels piliers→Q&A | `0e75c32` |

Wikidata : voir `WIKIDATA_DRAFT.md` (en attente de notability).
