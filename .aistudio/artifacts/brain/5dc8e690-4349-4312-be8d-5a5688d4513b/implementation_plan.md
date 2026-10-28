# Plan Directeur d'Optimisation 360° — Portail ProfEPS Maroc

Ce plan directeur structure la résolution intégrale des points noirs identifiés lors de l'audit technique, visuel, SEO et backend sur les 150 pages du portail **ProfEPS Maroc**, organisé en **4 phases séquentielles avec validation à chaque étape**.

---

## Décisions Confirmées & Gouvernance d'Exécution

> [!IMPORTANT]
> Conformément à vos choix, l'exécution se déroulera **étape par étape avec validation entre chaque phase**, en commençant par la **Phase 1 (SEO, Sitemap & Maillage Interne)** dès votre approbation.

- **Décision Confirmée 1 — Déploiement progressif par phase** : Exécution séquentielle en 4 phases distinctes (Phase 1 : SEO & Indexation → Phase 2 : Palette douce sur les 10 Calculateurs → Phase 3 : Performance & Core Web Vitals → Phase 4 : Résilience & Sécurité Backend), avec point de contrôle et synchronisation GitHub à chaque étape.
- **Décision Confirmée 2 — Harmonisation visuelle des 10 Calculateurs** : Déploiement de la nouvelle palette douce et reposante (surfaces poudrées `#fff8f8` / `#f3faf6` / `#f8fafc`, bordures fines et accents bordeaux `#991b1b` / vert `#006233` / ardoise `#1e293b`) sur l'ensemble des 10 calculateurs physiologiques individuels.
- **Décision Confirmée 3 — Maintien du routage centralisé Node/Express** : Conservation du routage complet via le serveur applicatif principal tout en ajoutant des en-têtes de cache statique performants, une protection anti-abus (rate-limiting) sur les routes de génération IA et un basculement local garanti sans erreur.

---

## 1. Vue d'Ensemble & Diagnostic 360°

- **Objectif Global** : Éliminer 100 % des angles morts techniques et visuels du portail afin de maximiser l'indexation organique Google (SEO/GEO), le confort de lecture des enseignants et candidats CRMEF, la vitesse d'affichage mobile et la fiabilité des générateurs pédagogiques.
- **Public Cible** : Professeurs d'EPS au Maroc (Collège & Lycée), candidats aux concours CRMEF (13 spécialités + Tronc Commun Sciences de l'Éducation), entraîneurs et préparateurs physiques.
- **Synthèse des Points Noirs résolus par ce plan** :
  1. **Déficit d'indexation Sitemap (91 pages absentes sur 150)** : Actuellement, seules 59 URLs figurent dans le plan de site XML. Les 25 pages QCM CRMEF et 66 guides didactiques/APS sont invisibles pour le crawl prioritaire.
  2. **Métadonnées SEO & Partage Social incomplètes** : 53 pages manquent d'image OpenGraph/Twitter (`og:image`), 14 pages QCM CRMEF manquent de balise canonique (`rel="canonical"`) et 22 pages manquent de données structurées Schema.org (`JSON-LD`).
  3. **Maillage interne & Fichiers Robots** : Réparation du lien interne brisé (erreur 404 sur le cycle course de durée collège) et nettoyage des déclarations de sitemaps obsolètes dans le fichier d'instructions aux robots.
  4. **Incohérence chromatique sur les 10 Calculateurs** : Remplacement des boutons et bandeaux saturés ou disparates sur les pages d'outils individuels par la nouvelle charte douce et académique ProfEPS.
  5. **Poids du rendu Frontend & Scripts résiduels** : Optimisation du chargement CSS/polices sur les 63 pages utilisant le compilateur navigateur lourd et nettoyage des appels fantômes d'authentification inutilisés.
  6. **Exposition et latence des routes API de génération** : Protection des 4 moteurs de génération pédagogique (Fiches, Grilles, Projets, Projets Complets) par limitation de débit (rate-limiting), compression et en-têtes de sécurité.

---

## 2. Expérience Utilisateur & Design Visuel (Palette Douce ProfEPS)

- **Direction Esthétique** : Éditorial académique, institutionnel et reposant pour l'œil — conçu pour des sessions de révision prolongées (QCM CRMEF de 60 à 150 questions) et une lecture rapide sur le terrain (calculateurs VMA, Karvonen, HIIT).
- **Règle Chromatique 60-30-10 & Tokens Visuels** :
  - **60 % Canevas Neutre Dominant** : Blanc pur (`#ffffff`) et gris perle très clair (`#f8fafc`) assurant une clarté maximale sans éblouissement.
  - **30 % Surfaces Structurelles Douces** :
    - *Pôle Didactique / Aérobie* : Ivoire rosé subtil (`#fff8f8`) avec bordure fine (`#f5c2c7`) et texte bordeaux profond (`#881337`).
    - *Pôle Spécialité / Santé & Cardio* : Sauge poudré (`#f3faf6`) avec bordure fine (`#a7f3d0`) et texte vert forêt marocain (`#065f46`).
    - *Pôle Charge, Puissance & Méthodologie* : Ardoise perle (`#f8fafc` / `#f1f5f9`) avec bordure fine (`#e2e8f0`) et texte ardoise académique (`#1e293b`).
  - **10 % Budget d'Accentuation** : Bordeaux institutionnel (`#991b1b`) et Vert marocain (`#006233`) réservés strictement aux indicateurs actifs, badges d'étape et micro-interactions au survol.
- **Hiérarchie Typographique & Lisibilité Numérique** :
  - Titres en `Plus Jakarta Sans` (700/800) avec équilibrage des lignes (`text-wrap: balance`).
  - Tableaux d'allures VMA, zones cardiaques Z1–Z5 et barèmes exprimés en chiffres tabulaires (`tabular-nums`) pour un alignement vertical irréprochable.

---

## 3. Décisions Produit & Arbitrages Clés

- **Décision 1 — Exécution Séquentielle en 4 Phases Validées**
  - *Approche retenue* : Livrer et vérifier chaque pilier séparément (Phase 1 → Validation → Phase 2 → Validation → Phase 3 → Validation → Phase 4).
  - *Pourquoi* : Permet de contrôler visuellement et techniquement chaque lot sur le dépôt GitHub en production sans aucun risque de régression massive.
- **Décision 2 — Harmonisation Douce des 10 Calculateurs Sportifs**
  - *Approche retenue* : Remplacer les boutons d'action agressifs et les cartes disparates des 10 calculateurs par des composants harmonisés utilisant la palette douce ProfEPS et des indicateurs de zones lisibles (étiquettes textuelles + teintes pastel).
  - *Pourquoi* : Garantit une continuité visuelle parfaite lorsque l'enseignant clique depuis le carrousel de la page d'accueil vers un outil spécifique.
- **Décision 3 — Routage Serveur Unifié avec Cache Statique & Rate-Limiting**
  - *Approche retenue* : Conserver le serveur Node/Express comme point d'entrée tout en configurant des en-têtes `Cache-Control` optimisés pour les ressources statiques (HTML, images, scripts) et un limiteur de requêtes en mémoire sur les 4 routes `/api/generer-*`.
  - *Pourquoi* : Préserve votre architecture actuelle tout en accélérant la navigation répétée et en protégeant vos clés Gemini / Groq contre les abus.

---

## 4. Architecture Technique & Feuille de Route des 4 Phases

### Diagramme du Plan d'Exécution 360°

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                   FEUILLE DE ROUTE D'OPTIMISATION 360°                      │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
       ┌───────────────────────────────┼───────────────────────────────┐
       ▼                               ▼                               ▼
┌──────────────────────────────┐ ┌──────────────────────────────┐ ┌──────────────────────────────┐
│   PHASE 1 : SEO & MAILLAGE   │ │ PHASE 2 : UI 10 CALCULATEURS │ │ PHASE 3 : PERF & FRONTEND    │
├──────────────────────────────┤ ├──────────────────────────────┤ ├──────────────────────────────┤
│ • Sitemap XML : 59 → 149 URLs│ │ • Palette douce ProfEPS sur  │ │ • Optimisation du chargement │
│ • 14 Canonicals QCM CRMEF    │ │   les 10 outils scientifiques│ │   CSS/Fonts & Core Web Vitals│
│ • 53 balises og:image/twitter│ │ • Boutons & cartes reposants │ │ • Suppression du code mort   │
│ • 22 schémas JSON-LD (Quiz,  │ │   (Bordeaux doux, Sauge,     │ │   (stub Supabase inutilisé)  │
│   Article, WebApplication)   │ │   Ardoise perle)             │ │ • Lazy-loading images &      │
│ • Correction lien 404 &      │ │ • Tableaux de résultats en   │ │   attributs d'accessibilité  │
│   nettoyage robots.txt       │ │   chiffres tabulaires        │ │   (aria-label, contrastes)   │
└──────────────┬───────────────┘ └──────────────┬───────────────┘ └──────────────┬───────────────┘
               │                                │                                │
               └───────────────────────────────┬┴────────────────────────────────┘
                                               ▼
                        ┌──────────────────────────────────────────────┐
                        │    PHASE 4 : BACKEND, API & SÉCURITÉ         │
                        ├──────────────────────────────────────────────┤
                        │ • Routage Express conservé + Cache-Control   │
                        │ • Rate-limiting sur les 4 routes /api/*      │
                        │ • En-têtes de sécurité HTTP (X-Content-Type, │
                        │   Referrer-Policy, Frame-Options)            │
                        │ • Validation stricte des payloads & fallback │
                        │   didactique local 100% autonome (0 err 500) │
                        └──────────────────────────────────────────────┘
```

### Détail Opérationnel par Phase

1. **Phase 1 — SEO 100 %, Sitemap Exhaustif & Maillage Interne (Priorité Immédiate)**
   - Régénération complète du plan de site XML pour inclure les **149 pages publiques indexables** (ajout des 91 pages manquantes : hub CRMEF, 25 QCM par filière, guides physiologiques et articles APS) avec priorités et dates de mise à jour exactes.
   - Injection automatisée des balises `<link rel="canonical">`, `<meta property="og:image">` et `<meta name="twitter:image">` sur les 53 pages incomplètes.
   - Ajout des schémas structurés `JSON-LD` (`Quiz` + `EducationalOccupationalCredential` sur les QCM CRMEF, `TechArticle` / `Article` sur les guides).
   - Correction du lien cassé dans la page des cycles EPS et nettoyage des sitemaps obsolètes dans le fichier `robots.txt`.

2. **Phase 2 — Harmonisation Visuelle des 10 Pages Calculateurs & Générateur**
   - Application de la nouvelle charte douce et reposante ProfEPS sur les 10 calculateurs sportifs individuels (VMA, VDOT/VO2max, Karvonen, HIIT COD 180°, Foster ACWR, ASR, Péronnet, Chaleur/Altitude, GAP/Nutrition, IMC/Deurenberg) ainsi que sur le Widget VMA.
   - Remplacement des boutons criards par des contrôles apaisés à haute lisibilité, harmonisation des cartes de résultats (zones Z1 à Z5 avec badges pastel et typographie tabulaire) et alignement parfait des formulaires.

3. **Phase 3 — Performance Frontend, Core Web Vitals & Accessibilité**
   - Allègement du script d'unification global en supprimant le code mort résiduel (`window.supabase` factice et observateurs de mutation redondants).
   - Optimisation du chargement des polices (`font-display: swap`), ajout des dimensions explicites et du chargement différé (`loading="lazy"`, `decoding="async"`) sur les visuels secondaires pour éliminer tout décalage de mise en page (CLS = 0).
   - Vérification de l'accessibilité clavier et des contrastes WCAG AA sur l'ensemble des composants interactifs (QCM, filtres, menus déroulants).

4. **Phase 4 — Consolidation Backend (`server.js`) & Résilience des 4 API (`/api/generer-*`)**
   - Maintien du routage complet via `server.js` avec ajout d'en-têtes `Cache-Control` intelligents pour accélérer le service des pages et ressources statiques.
   - Ajout d'un middleware de protection anti-abus (rate-limiting par IP) et de validation des entrées sur les 4 routes de génération (`/api/generer-fiche`, `/api/generer-grille`, `/api/generer-projet`, `/api/generer-projet-complet`).
   - Garantie de continuité de service à 100 % : vérification que le moteur didactique local prend le relais instantanément en cas d'indisponibilité ou de dépassement de quota des API externes.
