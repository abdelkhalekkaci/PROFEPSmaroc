import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
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
  const PORT = 3000;

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

  // Redirection automatique des domaines VMA et URLs dupliquées (301)
  app.use((req: Request, res: Response, next: NextFunction) => {
    const host = req.headers.host || '';
    if (host.includes('vmacalculateur.com') || host.includes('mascalculator.com')) {
      res.redirect(301, 'https://profeps.ma/calculateur-vma.html');
      return;
    }
    if (req.path === '/index.html') {
      res.redirect(301, '/');
      return;
    }
    let decodedPath = req.path;
    try {
      decodedPath = decodeURIComponent(req.path);
    } catch (_e) {}

    if (
      req.path === '/article-s%C3%A9ance.html' ||
      decodedPath === '/article-séance.html' ||
      req.path === '/article-structure-seance'
    ) {
      res.redirect(301, '/article-structure-seance.html');
      return;
    }
    if (
      req.path === '/orientations-p%C3%A9dagogiques-eps-2007-2009.html' ||
      decodedPath === '/orientations-pédagogiques-eps-2007-2009.html' ||
      req.path === '/orientations-pedagogiques-2007-2009.html' ||
      req.path === '/orientations-pedagogiques-eps-2009.html' ||
      req.path === '/orientations-pedagogiques-septembre-2007-et-2009.html'
    ) {
      res.redirect(301, '/orientations-pedagogiques-eps-2007-2009.html');
      return;
    }
    if (
      req.path === '/biblioth%C3%A8que-num%C3%A9rique-eps.html' ||
      decodedPath === '/bibliothèque-numérique-eps.html' ||
      req.path === '/article-cours.html'
    ) {
      res.redirect(301, '/bibliotheque-numerique-eps.html');
      return;
    }
    if (
      req.path === '/article-arbitrage-volleyball.html' ||
      req.path === '/article-gestes-arbitres-volleyball.html' ||
      req.path === '/volleyball-eps-reglement-cycles-2bac.html'
    ) {
      res.redirect(301, '/reglement-volleyball-fivb-gestes-arbitrage-eps.html');
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

  // Servir les fichiers statiques de public/ directement (HTML, CSS, JS, images, PDF avec Link canonical)
  app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, filePath) => {
      if (/\.(css|js|png|jpg|jpeg|gif|svg|webp|ico|woff2?)$/i.test(filePath)) {
        res.setHeader('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
      } else if (/\.html$/i.test(filePath)) {
        res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
      } else if (/\.pdf$/i.test(filePath)) {
        res.setHeader('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
        const baseName = path.basename(filePath);
        const opMatch = baseName.match(/^op-(.+)\.pdf$/i);
        if (opMatch) {
          const slug = opMatch[1].toLowerCase();
          res.setHeader('Link', `<https://profeps.ma/orientations-pedagogiques-${slug}.html>; rel="canonical"`);
        } else if (baseName === 'ARABE_OP_2009_12fa6def.pdf') {
          res.setHeader('Link', '<https://profeps.ma/orientations-pedagogiques-arabe-college-2009.html>; rel="canonical"');
        } else if (baseName === 'ARABE_OP_2007_18560008.pdf') {
          res.setHeader('Link', '<https://profeps.ma/orientations-pedagogiques-arabe-lycee-2007.html>; rel="canonical"');
        } else if (baseName === '28_7fc4e542.pdf') {
          res.setHeader('Link', '<https://profeps.ma/orientations-pedagogiques-francais-college-2009.html>; rel="canonical"');
        } else if (baseName === '43_5d2f40bc.pdf') {
          res.setHeader('Link', '<https://profeps.ma/orientations-pedagogiques-francais-lycee-2007.html>; rel="canonical"');
        }
      }
    }
  }));

  app.get('/', (_req: Request, res: Response) => {
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  // Démarrer l'écoute immédiatement sur le port 3000 pour répondre instantanément au contrôle de santé
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Serveur ProfEPS démarré sur http://0.0.0.0:${PORT}`);
  });

  // En développement, monter les middlewares Vite en arrière-plan sans bloquer le port 3000
  if (process.env.NODE_ENV !== 'production') {
    try {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        configFile: false,
        server: { middlewareMode: true, hmr: false, watch: null },
        optimizeDeps: { noDiscovery: true, include: [] },
        appType: 'custom',
      });
      app.use(vite.middlewares);
    } catch (viteErr) {
      console.warn('Vite middleware skipped:', viteErr);
    }
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
  }

  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});

