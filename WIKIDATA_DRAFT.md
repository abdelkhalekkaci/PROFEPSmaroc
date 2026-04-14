# Brouillon d'entité Wikidata — Prof EPS Maroc

Ce fichier contient tout ce qu'il faut pour créer l'entité Wikidata de **Prof EPS Maroc** et l'ajouter comme `sameAs` dans le schema Organization du site. Il n'est pas déployé (hors de `public/`).

---

## 1. Vérifier d'abord si une entité existe déjà

Avant de créer, cherche sur https://www.wikidata.org :
- Recherche : `Prof EPS Maroc`
- Recherche : `ProfEPS`
- Recherche : `profeps.ma`

Si rien n'apparaît → créer. Si quelque chose existe déjà → éditer cette entité au lieu d'en créer une nouvelle (sinon risque de doublon refusé par la communauté).

---

## 2. Créer l'entité

URL : https://www.wikidata.org/wiki/Special:NewItem

Il te faut un compte Wikidata (gratuit, autoconfirmed après quelques modifs mineures). Si ton compte est neuf, fais d'abord 3-4 petites modifications sur des entités existantes (ajouter un label arabe, corriger un lien, etc.) pour éviter que ta création soit patrouillée trop strictement.

---

## 3. Champs à remplir

### Label (nom principal)

| Langue | Valeur |
|--------|--------|
| `fr` | Prof EPS Maroc |
| `en` | Prof EPS Morocco |
| `ar` | بروف إي بي إس المغرب |

### Description

| Langue | Valeur |
|--------|--------|
| `fr` | plateforme en ligne marocaine dédiée aux professeurs d'Éducation Physique et Sportive |
| `en` | Moroccan online platform for Physical Education teachers |
| `ar` | منصة مغربية للمدرسين في التربية البدنية والرياضية |

### Alias

- `ProfEPS`
- `profeps.ma`
- `Prof EPS`

---

## 4. Statements (déclarations)

À ajouter une par une via l'interface « Add statement ».

| Propriété | Valeur | Notes |
|-----------|--------|-------|
| `P31` (instance of) | `Q35127` (website) | **Obligatoire** pour notability |
| `P856` (official website) | `https://www.profeps.ma` | **Obligatoire** |
| `P407` (language of work or name) | `Q150` (French) | |
| `P407` (language of work or name) | `Q13955` (Arabic) | |
| `P17` (country) | `Q1028` (Morocco) | |
| `P2002` (X/Twitter username) | *(omettre — pas de compte)* | |
| `P2013` (Facebook username) | `profile.php?id=61586684012757` | Complexe — tu peux mettre le username si tu en crées un plus tard |
| `P2003` (Instagram username) | `profeps.ma` | |
| `P6634` (LinkedIn personal profile ID) | `eps-prof-maroc-814590190` | |
| `P921` (main subject) | `Q8block` (Physical education) — vérifier l'ID exact | Ou `Q2057958` (physical education in school) |
| `P2997` (age range of target demographic) | *(non applicable — éducateurs)* | |

### Statements qui renforcent l'identité thématique

| Propriété | Valeur |
|-----------|--------|
| `P921` (main subject) | physical education teacher training |
| `P921` (main subject) | CRMEF (si une entité existe, sinon skip) |

---

## 5. Identifiers externes

À ajouter dans la section « Identifiers » de l'entité :

- **Facebook Page ID** (`P4003`) : `61586684012757`
- **Instagram username** (`P2003`) : `profeps.ma`
- **LinkedIn personal profile ID** (`P6634`) : `eps-prof-maroc-814590190`

---

## 6. Sources à citer (pour chaque statement significatif)

Wikidata exige des sources. Utilise le bouton « add reference » sous chaque statement :

- **Reference URL** (`P854`) : `https://www.profeps.ma/a-propos.html`
- **Retrieved** (`P813`) : date du jour
- **Title** (`P1476`) : `À propos de ProfEPS`

---

## 7. Notability — point sensible

Wikidata rejette les entités jugées non-notables. Pour maximiser les chances d'acceptation :

- **Ne crée PAS** l'entité tant que le site n'a pas au moins un de ces signaux :
  - Mention dans une source de presse marocaine indépendante (Medias24, Le Matin, Hespress, etc.)
  - Référencé dans une publication académique ou un rapport officiel
  - Trafic organique significatif (>10k visites/mois via Google Search Console)
  - Mention dans la presse spécialisée éducation
- **Argumente dans la description** : insiste sur le fait que c'est une plateforme éducative francophone de référence au Maroc, couvrant un besoin spécifique (pas de concurrent francophone équivalent).

Si l'entité est supprimée via RfD (Request for Deletion), ne recrée pas immédiatement — attends d'avoir plus de signaux externes.

---

## 8. Une fois l'entité créée

Note l'identifiant Q (format `Q12345678`) et ajoute ces URLs comme `sameAs` dans le JSON-LD Organization des 3 pages :

**Fichiers à modifier** (ajouter une entrée dans le tableau `sameAs`) :
- `public/index.html` — JSON-LD `EducationalOrganization` (ligne ~108)
- `public/a-propos.html` — JSON-LD `EducationalOrganization` (ligne ~67)
- `public/blog.html` — JSON-LD `EducationalOrganization` (ligne ~30)

**Valeur à ajouter** (remplacer `Q12345678` par l'ID réel) :
```json
"https://www.wikidata.org/wiki/Q12345678"
```

Tu peux me dire l'ID une fois créé, je ferai les 3 edits + commit + IndexNow.

---

## 9. Entités Wikidata complémentaires utiles

Si tu veux aller plus loin, ces entités peuvent être enrichies ou créées pour renforcer le graphe thématique marocain :

- **Orientations Pédagogiques EPS 2007** — probablement pas d'entité dédiée, pas prioritaire
- **CRMEF** — chercher, créer si absent (c'est une institution publique marocaine, notability claire)
- **Baccalauréat marocain** — entité existe probablement (`Q19832898` ou similaire), à vérifier

Ces entités secondaires ne sont PAS bloquantes pour ProfEPS mais elles densifient le contexte quand Google fait de l'entity linking.
