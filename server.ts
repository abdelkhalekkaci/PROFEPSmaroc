import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

// Rate-limiter léger en mémoire pour protéger les endpoints /api/generer-* (30 req / min / IP)
const rateLimitMap = new Map<string, { count: number; start: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 30;

function apiRateLimiter(req: Request, res: Response, next: NextFunction) {
  const now = Date.now();
  const forwarded = req.headers['x-forwarded-for'];
  const clientIp = (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : req.socket?.remoteAddress) || 'unknown';

  if (rateLimitMap.size > 2000) {
    for (const [ip, entry] of rateLimitMap.entries()) {
      if (now - entry.start > RATE_LIMIT_WINDOW_MS) rateLimitMap.delete(ip);
    }
  }

  const entry = rateLimitMap.get(clientIp);
  if (!entry || now - entry.start > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(clientIp, { count: 1, start: now });
    next();
    return;
  }

  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX) {
    res.setHeader('Retry-After', '60');
    res.status(429).json({
      success: false,
      error: 'Trop de requêtes simultanées. Veuillez patienter quelques secondes avant de relancer la génération.'
    });
    return;
  }
  next();
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Middleware - CORS & Security Headers
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
      return;
    }
    next();
  });

  // Body parser sécurisé (limite 64kb)
  app.use(express.json({ limit: '64kb' }));
  app.use(express.urlencoded({ extended: true, limit: '64kb' }));

  // Redirection automatique des domaines VMA
  app.use((req: Request, res: Response, next: NextFunction) => {
    const host = req.headers.host || '';
    if (host.includes('vmacalculateur.com') || host.includes('mascalculator.com')) {
      res.redirect(301, 'https://profeps.ma/calculateur-vma.html');
      return;
    }
    next();
  });

  // Servir explicitement les images avec Cache-Control
  app.use('/images', express.static(path.join(__dirname, 'public', 'images'), {
    maxAge: '7d',
    setHeaders: (res) => {
      res.setHeader('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
    }
  }));

  // Endpoint de santé
  app.get('/api/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', service: 'ProfEPS.ma', version: '2.0.0' });
  });

  // Routes API
  try {
    const genererFiche = require('./api/generer-fiche.js');
    const genererGrille = require('./api/generer-grille.js');
    const genererProjet = require('./api/generer-projet.js');
    const genererProjetComplet = require('./api/generer-projet-complet.js');

    app.post('/api/generer-fiche', apiRateLimiter, genererFiche);
    app.post('/api/generer-grille', apiRateLimiter, genererGrille);
    app.post('/api/generer-projet', apiRateLimiter, genererProjet);
    app.post('/api/generer-projet-complet', apiRateLimiter, genererProjetComplet);
  } catch (err) {
    console.warn('Note: API routes could not be loaded via CJS bridge:', err);
  }

  app.all('/api/*', (_req: Request, res: Response) => {
    res.status(404).json({ success: false, error: 'Point de terminaison API introuvable' });
  });

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
    app.use(express.static(path.join(__dirname, 'public'), {
      setHeaders: (res, filePath) => {
        if (/\.(css|js|png|jpg|jpeg|gif|svg|webp|ico|woff2?)$/i.test(filePath)) {
          res.setHeader('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
        } else if (/\.html$/i.test(filePath)) {
          res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
        }
      }
    }));
    app.get('*', (_req: Request, res: Response) => {
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

