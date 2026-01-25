# 🏃 EPS Maroc - Générateur de Fiches Pédagogiques

Générateur intelligent de fiches pédagogiques pour les professeurs d'éducation physique et sportive au Maroc.

## 📁 Structure des fichiers

```
📁 eps-maroc/
├── 📁 public/                    ← Dossier des pages web
│   ├── index.html               ← Page d'accueil
│   ├── generateur.html          ← Générateur de fiches
│   ├── blog.html                ← Blog / Articles
│   ├── a-propos.html            ← Page À propos
│   ├── contact.html             ← Page Contact
│   └── 📁 css/
│       └── style.css            ← Feuille de styles
├── server.js                    ← Serveur Node.js (Backend)
├── package.json                 ← Dépendances Node.js
└── README.md                    ← Ce fichier
```

## 🚀 Installation

### Prérequis
- Node.js (version 16 ou supérieure)
- NPM (inclus avec Node.js)
- Clé API Groq gratuite (https://console.groq.com)

### Étapes d'installation

1. **Créer le dossier du projet**
```bash
mkdir eps-maroc
cd eps-maroc
```

2. **Créer la structure de dossiers**
```bash
mkdir -p public/css
```

3. **Copier les fichiers**
- Placez `server.js` à la racine
- Placez les fichiers HTML dans `public/`
- Placez `style.css` dans `public/css/`

4. **Initialiser le projet Node.js**
```bash
npm init -y
```

5. **Installer les dépendances**
```bash
npm install express cors node-fetch@2
```

6. **Démarrer le serveur**
```bash
node server.js
```

7. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

## 🔑 Configuration API Groq

1. Allez sur https://console.groq.com
2. Créez un compte gratuit
3. Générez une clé API
4. La clé sera demandée lors de la première utilisation du générateur

## 📄 Pages du site

| Page | URL | Description |
|------|-----|-------------|
| Accueil | `/` | Présentation du site |
| Générateur | `/generateur.html` | Créer des fiches EPS |
| Blog | `/blog.html` | Articles et conseils |
| À propos | `/a-propos.html` | Notre mission |
| Contact | `/contact.html` | Nous contacter |

## ⚙️ Personnalisation

### Modifier les informations de contact
Éditez le fichier `contact.html` pour mettre à jour :
- Adresse email
- Numéro WhatsApp
- Liens réseaux sociaux

### Modifier le design
Éditez le fichier `public/css/style.css` :
- Couleurs : variables `--primary`, `--secondary`
- Polices : variable `--font-primary`
- Espacements : variables `--spacing-*`

### Ajouter des articles de blog
Éditez le fichier `blog.html` pour ajouter de nouveaux articles.

## 🌐 Déploiement en production

### Option 1 : Railway (Recommandé)
1. Créez un compte sur https://railway.app
2. Connectez votre dépôt GitHub
3. Railway détectera automatiquement Node.js
4. Définissez la variable `PORT` si nécessaire

### Option 2 : Render
1. Créez un compte sur https://render.com
2. Créez un nouveau "Web Service"
3. Connectez votre dépôt
4. Build command : `npm install`
5. Start command : `node server.js`

### Option 3 : Heroku
1. Installez Heroku CLI
2. `heroku create eps-maroc`
3. `git push heroku main`

## 📝 Fonctionnalités

- ✅ Génération de fiches conformes aux OP 2007/2009
- ✅ Support de 15+ activités sportives
- ✅ Export au format Word
- ✅ Critères de réalisation vs réussite distincts
- ✅ Design responsive (mobile/tablette/desktop)
- ✅ Blog intégré
- ✅ Formulaire de contact

## 🐛 Problèmes courants

### "Cannot find module 'express'"
```bash
npm install express cors node-fetch@2
```

### "API key invalid"
- Vérifiez votre clé sur https://console.groq.com
- Effacez le localStorage du navigateur et réessayez

### Port déjà utilisé
```bash
# Linux/Mac
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## 📞 Support

- Email : contact@epsmaroc.ma
- Facebook : @EPSMarocOfficiel

## 📜 Licence

© 2025 EPS Maroc. Tous droits réservés.
