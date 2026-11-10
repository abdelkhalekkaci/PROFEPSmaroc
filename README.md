# ProfEPS.ma — Générateur de Fiches Pédagogiques EPS

Générateur intelligent de fiches pédagogiques conformes aux OP 2007/2009 pour les professeurs d'éducation physique et sportive au Maroc.

Site : [https://www.profeps.ma](https://www.profeps.ma)

## Fonctionnalités

- Génération de fiches de séance conformes aux OP 2007 (Lycée) et 2009 (Collège)
- Support de 15+ APS (Football, Handball, Basketball, Volleyball, Gymnastique, Athlétisme…)
- Export au format Word (A4 paysage)
- Critères de réalisation vs réussite distincts
- Gestion des tests d'observation et tests bilans
- Génération de projets pédagogiques complets (cycle complet)
- Grilles d'évaluation intégrées
- Design responsive (mobile/tablette/desktop)
- Blog avec articles pédagogiques
- Optimisé Core Web Vitals (WebP, CSS non-bloquant, Google Fonts optimisé)

## Optimisations SEO

- ✅ Core Web Vitals : WebP (logo -79%), CSS différé, Google Fonts asynchrone
- ✅ Traductions arabe → français (0 caractères arabes restants)
- ✅ Contenu frais : dates d'articles mises à jour (2026)
- ✅ Balisage sémantique riche (JSON-LD, Open Graph, méta-descriptions)
- ✅ Bibliothèque numérique EPS lienable
- ✅ Stratégie de netlinking documentée

## Structure

```
PROFEPSmaroc/
├── public/                  Pages web (77+ pages HTML)
│   ├── css/style.min.css    Styles minifiés
│   ├── images/              Images (prof_eps.webp + fallback PNG)
│   ├── index.html           Accueil
│   ├── generateur.html      Générateur de fiches
│   ├── blog.html            Blog pédagogique
│   └── ...
├── api/                     Routes API serverless (Vercel)
│   ├── generer-fiche.js     Génération fiche de séance
│   ├── generer-projet.js    Génération projet individuel
│   ├── generer-projet-complet.js  Cycle complet
│   └── generer-grille.js    Grille d'évaluation
├── api/data/                Données de référence (APS, situations)
├── server.js                Serveur Node.js local
├── package.json
├── vercel.json              Configuration Vercel
├── NETLINKING_STRATEGY.md   Plan de netlinking
└── README.md
```

## Installation locale

### Prérequis
- Node.js >= 16
- Clé API Groq (https://console.groq.com)

### Installation
```bash
git clone https://github.com/abdelkhalekkaci/PROFEPSmaroc.git
cd PROFEPSmaroc
npm install
node server.js
```

Ouvrir http://localhost:3000

## Déploiement

### Vercel (production)
Le site est déployé sur Vercel. Le fichier `vercel.json` configure les redirections et routes API.

### Railway / Render
- Build : `npm install`
- Start : `node server.js`

## Contact

- Email : profepsma@gmail.com
- Facebook : ProfEPS.ma
- Instagram : @profeps.ma

## Licence

ISC
