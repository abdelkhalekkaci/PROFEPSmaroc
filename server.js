const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ CLÉ API GROQ - Utilise UNIQUEMENT la variable d'environnement (PAS de clé en dur!)
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// Middleware
app.use(cors());
app.use(express.json());

// Servir les fichiers statiques du dossier public
app.use(express.static(path.join(__dirname, 'public')));

// Servir explicitement le dossier images
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// Routes API modulaire
const genererFiche = require('./api/generer-fiche');
const genererGrille = require('./api/generer-grille');
const genererProjet = require('./api/generer-projet');

// Route principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Montage des routes API
app.post('/api/generer-fiche', genererFiche);
app.post('/api/generer-grille', genererGrille);
app.post('/api/generer-projet', genererProjet);

app.listen(PORT, () => {
    console.log(`🚀 Serveur EPS: http://localhost:${PORT}`);
    console.log('⚠️ Configurez GROQ_API_KEY dans les variables d\'environnement');
});
