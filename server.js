const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ CLÉ API GROQ - Utilise UNIQUEMENT la variable d'environnement (PAS de clé en dur!)
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// Path resolution compatible Vercel
const rootDir = process.env.VERCEL ? '/var/task' : __dirname;

// Middleware
app.use(cors());
app.use(express.json());

// Redirection 301 : non-www → www
app.use((req, res, next) => {
    const host = req.headers.host || '';
    if (!host.startsWith('www.') && !host.includes('localhost') && !host.includes('vercel.app')) {
        return res.redirect(301, `https://www.${host}${req.url}`);
    }
    next();
});

// Redirection 301 : /index.html → /
app.get('/index.html', (req, res) => {
    res.redirect(301, '/');
});

// Servir les fichiers statiques du dossier public
app.use(express.static(path.join(rootDir, 'public')));

// Servir explicitement le dossier images
app.use('/images', express.static(path.join(rootDir, 'public', 'images')));

// Routes API modulaire
const genererFiche = require('./api/generer-fiche');
const genererGrille = require('./api/generer-grille');
const genererProjet = require('./api/generer-projet');
const genererProjetComplet = require('./api/generer-projet-complet');

// Route principale
app.get('/', (req, res) => {
    res.sendFile(path.join(rootDir, 'public', 'index.html'));
});

// Montage des routes API
app.post('/api/generer-fiche', genererFiche);
app.post('/api/generer-grille', genererGrille);
app.post('/api/generer-projet', genererProjet);
app.post('/api/generer-projet-complet', genererProjetComplet);

if (process.env.VERCEL) {
    module.exports = app;
} else {
    app.listen(PORT, () => {
        console.log(`🚀 Serveur EPS: http://localhost:${PORT}`);
        console.log('⚠️ Configurez GROQ_API_KEY dans les variables d\'environnement');
    });
}
