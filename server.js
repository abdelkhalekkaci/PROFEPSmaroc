const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Path resolution compatible Vercel
const rootDir = process.env.VERCEL ? '/var/task' : __dirname;

// En-têtes de sécurité globaux
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    if (!req.path.includes('widget-vma.html')) {
        res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    }
    next();
});

// Middleware CORS restreint aux domaines autorisés & JSON Body Parser sécurisé (limite 64kb contre les abus de payload)
const allowedOrigins = [
    'https://profeps.ma',
    'https://www.profeps.ma',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.run.app') || origin.endsWith('.vercel.app')) {
            return callback(null, true);
        }
        return callback(new Error('Origine non autorisée par la politique CORS'));
    }
}));
app.use(express.json({ limit: '64kb' }));
app.use(express.urlencoded({ extended: true, limit: '64kb' }));

// Redirection automatique des domaines secondaires VMA vers profeps.ma
app.use((req, res, next) => {
    const host = req.headers.host || '';
    if (host.includes('vmacalculateur.com') || host.includes('mascalculator.com')) {
        return res.redirect(301, 'https://profeps.ma/calculateur-vma.html');
    }
    if (req.path === '/index.html') {
        return res.redirect(301, '/');
    }
    let decodedPath = req.path;
    try {
        decodedPath = decodeURIComponent(req.path);
    } catch (e) {}

    if (
        req.path === '/article-s%C3%A9ance.html' ||
        decodedPath === '/article-séance.html' ||
        req.path === '/article-structure-seance'
    ) {
        return res.redirect(301, '/article-structure-seance.html');
    }
    if (
        req.path === '/orientations-p%C3%A9dagogiques-eps-2007-2009.html' ||
        decodedPath === '/orientations-pédagogiques-eps-2007-2009.html' ||
        req.path === '/orientations-pedagogiques-2007-2009.html' ||
        req.path === '/orientations-pedagogiques-eps-2009.html' ||
        req.path === '/orientations-pedagogiques-septembre-2007-et-2009.html'
    ) {
        return res.redirect(301, '/orientations-pedagogiques-eps-2007-2009.html');
    }
    if (
        req.path === '/biblioth%C3%A8que-num%C3%A9rique-eps.html' ||
        decodedPath === '/bibliothèque-numérique-eps.html' ||
        req.path === '/article-cours.html'
    ) {
        return res.redirect(301, '/bibliotheque-numerique-eps.html');
    }
    if (
        req.path === '/article-arbitrage-volleyball.html' ||
        req.path === '/article-gestes-arbitres-volleyball.html' ||
        req.path === '/volleyball-eps-reglement-cycles-2bac.html'
    ) {
        return res.redirect(301, '/reglement-volleyball-fivb-gestes-arbitrage-eps.html');
    }
    next();
});

// Rate-limiter léger en mémoire pour protéger les endpoints /api/generer-* (30 req / min / IP)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 30;

function apiRateLimiter(req, res, next) {
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
        return next();
    }

    entry.count += 1;
    if (entry.count > RATE_LIMIT_MAX) {
        res.setHeader('Retry-After', '60');
        return res.status(429).json({
            success: false,
            error: 'Trop de requêtes simultanées. Veuillez patienter quelques secondes avant de relancer la génération.'
        });
    }
    next();
}

// Servir explicitement le dossier images avec cache long
app.use('/images', express.static(path.join(rootDir, 'public', 'images'), {
    maxAge: '7d',
    setHeaders: (res) => {
        res.setHeader('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
    }
}));

// Servir les fichiers statiques du dossier public avec stratégie de cache différenciée et en-tête Link canonical sur les PDF OP
app.use(express.static(path.join(rootDir, 'public'), {
    setHeaders: (res, filePath) => {
        if (/\.(png|jpg|jpeg|gif|svg|webp|ico|woff2?)$/i.test(filePath)) {
            res.setHeader('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
        } else if (/\.(html|css|js)$/i.test(filePath)) {
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
            } else if (baseName === '23_de42bac3.pdf') {
                res.setHeader('Link', '<https://profeps.ma/orientations-pedagogiques-anglais-college-2009.html>; rel="canonical"');
            } else if (baseName === '38_1893c607.pdf') {
                res.setHeader('Link', '<https://profeps.ma/orientations-pedagogiques-anglais-lycee-2007.html>; rel="canonical"');
            } else if (baseName === '27_9e312689.pdf') {
                res.setHeader('Link', '<https://profeps.ma/orientations-pedagogiques-espagnol-college-2009.html>; rel="canonical"');
            } else if (baseName === '39_4b901c89.pdf') {
                res.setHeader('Link', '<https://profeps.ma/orientations-pedagogiques-espagnol-lycee-2007.html>; rel="canonical"');
            }
        }
    }
}));

// Routes API modulaires
const genererFiche = require('./api/generer-fiche');
const genererGrille = require('./api/generer-grille');
const genererProjet = require('./api/generer-projet');
const genererProjetComplet = require('./api/generer-projet-complet');

// Endpoint de santé
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', service: 'ProfEPS.ma', version: '2.0.0' });
});

// Route principale
app.get('/', (req, res) => {
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    res.sendFile(path.join(rootDir, 'public', 'index.html'));
});

// Montage des routes API protégées par le rate-limiter
app.post('/api/generer-fiche', apiRateLimiter, genererFiche);
app.post('/api/generer-grille', apiRateLimiter, genererGrille);
app.post('/api/generer-projet', apiRateLimiter, genererProjet);
app.post('/api/generer-projet-complet', apiRateLimiter, genererProjetComplet);

// Gestionnaire 404 propre pour les routes API inconnues
app.all('/api/*', (req, res) => {
    res.status(404).json({ success: false, error: 'Point de terminaison API introuvable' });
});

if (process.env.VERCEL) {
    module.exports = app;
} else {
    app.listen(PORT, () => {
        console.log(`🚀 Serveur ProfEPS Maroc actif sur http://localhost:${PORT}`);
    });
}

