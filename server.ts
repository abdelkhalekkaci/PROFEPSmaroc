import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Middleware - CORS
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
      return;
    }
    next();
  });

  // Body parser
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Redirection automatique des domaines VMA
  app.use((req: Request, res: Response, next: NextFunction) => {
    const host = req.headers.host || '';
    if (host.includes('vmacalculateur.com') || host.includes('mascalculator.com')) {
      res.redirect(301, 'https://profeps.ma/calculateur-vma.html');
      return;
    }
    next();
  });

  // Servir explicitement les images et le dossier public
  app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

  // Routes API
  try {
    const genererFiche = require('./api/generer-fiche.js');
    const genererGrille = require('./api/generer-grille.js');
    const genererProjet = require('./api/generer-projet.js');
    const genererProjetComplet = require('./api/generer-projet-complet.js');

    app.post('/api/generer-fiche', genererFiche);
    app.post('/api/generer-grille', genererGrille);
    app.post('/api/generer-projet', genererProjet);
    app.post('/api/generer-projet-complet', genererProjetComplet);
  } catch (err) {
    console.warn('Note: API routes could not be loaded via CJS bridge:', err);
  }

  // En développement, monter les middlewares Vite pour servir l'application et les pages
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // Servir également les fichiers statiques de public/ si non interceptés par Vite
    app.use(express.static(path.join(__dirname, 'public')));
  } else {
    // Mode production
    app.use(express.static(path.join(__dirname, 'dist')));
    app.use(express.static(path.join(__dirname, 'public')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Serveur ProfEPS démarré sur http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
