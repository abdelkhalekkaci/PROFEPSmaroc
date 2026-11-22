import { isAllowedOrigin } from '../cloudflare/adapter.js';

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 30;
const rateLimitMap = new Map();

const LEGACY_HASHED_PDF_CANONICALS = {
  'ARABE_OP_2009_12fa6def.pdf': 'https://profeps.ma/orientations-pedagogiques-arabe-college-2009.html',
  'ARABE_OP_2007_18560008.pdf': 'https://profeps.ma/orientations-pedagogiques-arabe-lycee-2007.html',
  '28_7fc4e542.pdf': 'https://profeps.ma/orientations-pedagogiques-francais-college-2009.html',
  '43_5d2f40bc.pdf': 'https://profeps.ma/orientations-pedagogiques-francais-lycee-2007.html',
  '23_de42bac3.pdf': 'https://profeps.ma/orientations-pedagogiques-anglais-college-2009.html',
  '38_1893c607.pdf': 'https://profeps.ma/orientations-pedagogiques-anglais-lycee-2007.html',
  '27_9e312689.pdf': 'https://profeps.ma/orientations-pedagogiques-espagnol-college-2009.html',
  '39_4b901c89.pdf': 'https://profeps.ma/orientations-pedagogiques-espagnol-lycee-2007.html'
};

const SPECIAL_OP_PDF_CANONICALS = {
  'op-education-islamique-curriculum-2016.pdf': 'https://profeps.ma/orientations-pedagogiques-education-islamique-college-2009.html',
  'op-education-islamique-primaire-2016.pdf': 'https://profeps.ma/orientations-pedagogiques-primaire-2021.html',
  'op-sciences-ingenieur-ste-lycee-2007.pdf': 'https://profeps.ma/orientations-pedagogiques-sciences-ingenieur-lycee-2007.html',
  'op-sciences-ingenieur-stm-lycee-2007.pdf': 'https://profeps.ma/orientations-pedagogiques-sciences-ingenieur-lycee-2007.html'
};

function getRedirectTarget(url) {
  const host = url.hostname.toLowerCase();

  if (
    host === 'vmacalculateur.com' ||
    host === 'www.vmacalculateur.com' ||
    host === 'mascalculator.com' ||
    host === 'www.mascalculator.com'
  ) {
    return 'https://profeps.ma/calculateur-vma.html';
  }

  if (host === 'www.profeps.ma') {
    return `https://profeps.ma${url.pathname}${url.search}`;
  }

  const rawPath = url.pathname;
  let decodedPath = rawPath;
  try {
    decodedPath = decodeURIComponent(rawPath);
  } catch {
    decodedPath = rawPath;
  }

  if (rawPath === '/index.html') {
    return `${url.origin}/`;
  }

  if (rawPath === '/article-bareme-eps-bac-maroc.html') {
    return `${url.origin}/qa-coefficient-eps-bac-maroc.html`;
  }

  if (rawPath === '/concours-eps-maroc.html') {
    return `${url.origin}/article-concours.html`;
  }

  if (
    rawPath === '/article-s%C3%A9ance.html' ||
    decodedPath === '/article-séance.html' ||
    rawPath === '/article-seance.html' ||
    rawPath === '/article-structure-seance'
  ) {
    return `${url.origin}/article-structure-seance.html`;
  }

  if (
    rawPath === '/orientations-p%C3%A9dagogiques-eps-2007-2009.html' ||
    decodedPath === '/orientations-pédagogiques-eps-2007-2009.html' ||
    rawPath === '/orientations-pedagogiques-2007-2009.html' ||
    rawPath === '/orientations-pedagogiques-eps-2009.html' ||
    rawPath === '/orientations-pedagogiques-septembre-2007-et-2009.html'
  ) {
    return `${url.origin}/orientations-pedagogiques-eps-2007-2009.html`;
  }

  if (
    rawPath === '/biblioth%C3%A8que-num%C3%A9rique-eps.html' ||
    decodedPath === '/bibliothèque-numérique-eps.html' ||
    rawPath === '/article-cours.html'
  ) {
    return `${url.origin}/bibliotheque-numerique-eps.html`;
  }

  if (
    rawPath === '/article-arbitrage-volleyball.html' ||
    rawPath === '/article-gestes-arbitres-volleyball.html' ||
    rawPath === '/volleyball-eps-reglement-cycles-2bac.html'
  ) {
    return `${url.origin}/reglement-volleyball-fivb-gestes-arbitrage-eps.html`;
  }

  return null;
}

function checkApiRateLimit(request) {
  const now = Date.now();
  const forwarded = request.headers.get('x-forwarded-for');
  const clientIp =
    request.headers.get('cf-connecting-ip') ||
    (forwarded ? forwarded.split(',')[0].trim() : null) ||
    'unknown';

  if (rateLimitMap.size > 2000) {
    for (const [ip, entry] of rateLimitMap.entries()) {
      if (now - entry.start > RATE_LIMIT_WINDOW_MS) {
        rateLimitMap.delete(ip);
      }
    }
  }

  const entry = rateLimitMap.get(clientIp);
  if (!entry || now - entry.start > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(clientIp, { count: 1, start: now });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function resolvePdfCanonical(pathname) {
  const lowerPath = pathname.toLowerCase();
  if (lowerPath.startsWith('/pdf/legislation/') || lowerPath.startsWith('/pdf/sciences-education/')) {
    return 'https://profeps.ma/bibliotheque-sciences-education-crmef-pdf-maroc.html';
  }

  const parts = pathname.split('/');
  const baseName = parts[parts.length - 1] || '';
  const lowerBase = baseName.toLowerCase();

  if (SPECIAL_OP_PDF_CANONICALS[lowerBase]) {
    return SPECIAL_OP_PDF_CANONICALS[lowerBase];
  }

  const opMatch = baseName.match(/^op-(.+)\.pdf$/i);
  if (opMatch) {
    const slug = opMatch[1].toLowerCase();
    return `https://profeps.ma/orientations-pedagogiques-${slug}.html`;
  }

  if (LEGACY_HASHED_PDF_CANONICALS[baseName]) {
    return LEGACY_HASHED_PDF_CANONICALS[baseName];
  }

  return null;
}

function applyResponseHeaders(response, pathname) {
  const headers = new Headers(response.headers);

  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('X-XSS-Protection', '1; mode=block');
  headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  if (pathname.includes('widget-vma.html')) {
    headers.delete('X-Frame-Options');
  } else {
    headers.set('X-Frame-Options', 'SAMEORIGIN');
  }

  if (!pathname.startsWith('/api/')) {
    if (/\.(png|jpg|jpeg|gif|svg|webp|ico|woff2?)$/i.test(pathname)) {
      headers.set('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
    } else if (/\.pdf$/i.test(pathname)) {
      headers.set('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
      const canonical = resolvePdfCanonical(pathname);
      if (canonical) {
        headers.set('Link', `<${canonical}>; rel="canonical"`);
      } else if (pathname.toLowerCase().startsWith('/assets/aistudio/')) {
        headers.set('X-Robots-Tag', 'noindex, nofollow');
      }
    } else if (pathname === '/' || /\.(html|css|js)$/i.test(pathname)) {
      headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
    }
  }

  const hasEmptyBodyStatus = response.status === 204 || response.status === 304;
  return new Response(hasEmptyBodyStatus ? null : response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  const redirectTarget = getRedirectTarget(url);
  if (redirectTarget) {
    return Response.redirect(redirectTarget, 301);
  }

  if (url.pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin');
    if (origin && !isAllowedOrigin(origin)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Origine non autorisée par la politique CORS' }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json; charset=utf-8' }
        }
      );
    }

    if (
      request.method !== 'OPTIONS' &&
      url.pathname !== '/api/health' &&
      checkApiRateLimit(request)
    ) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Trop de requêtes simultanées. Veuillez patienter quelques secondes avant de relancer la génération.'
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Retry-After': '60'
          }
        }
      );
    }
  }

  if (
    (request.method === 'GET' || request.method === 'HEAD') &&
    url.pathname !== '/index.html' &&
    url.pathname.endsWith('.html') &&
    !url.pathname.startsWith('/api/') &&
    context.env &&
    typeof context.env.ASSETS?.fetch === 'function'
  ) {
    const assetUrl = new URL(url.toString());
    assetUrl.pathname = url.pathname.slice(0, -5) || '/';
    const assetResponse = await context.env.ASSETS.fetch(new Request(assetUrl.toString(), request));
    if (assetResponse && (assetResponse.status === 200 || assetResponse.status === 304)) {
      return applyResponseHeaders(assetResponse, url.pathname);
    }
  }

  const response = await context.next();
  return applyResponseHeaders(response, url.pathname);
}
