const MAX_BODY_BYTES = 64 * 1024;

const ALLOWED_ORIGINS = new Set([
  'https://profeps.ma',
  'https://www.profeps.ma',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
]);

export function isAllowedOrigin(origin) {
  if (!origin) return true;
  if (ALLOWED_ORIGINS.has(origin)) return true;
  if (origin.endsWith('.pages.dev') || origin.endsWith('.run.app')) return true;
  return false;
}

export function syncEnvToProcess(env) {
  if (!env || typeof env !== 'object') return;
  if (typeof globalThis.process === 'undefined') {
    globalThis.process = { env: {}, stdout: { isTTY: false }, cwd: () => '/' };
  }
  if (!globalThis.process.env) {
    globalThis.process.env = {};
  }
  if (!globalThis.process.stdout) {
    globalThis.process.stdout = { isTTY: false };
  }
  if (!globalThis.process.env.DOTENV_CONFIG_QUIET) {
    globalThis.process.env.DOTENV_CONFIG_QUIET = 'true';
  }
  for (const [key, value] of Object.entries(env)) {
    if (typeof value === 'string' && value.length > 0) {
      globalThis.process.env[key] = value;
    }
  }
}

async function parseRequestBody(request, method) {
  if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS') {
    return {};
  }

  const contentLengthHeader = request.headers.get('content-length');
  if (contentLengthHeader) {
    const declaredLength = Number(contentLengthHeader);
    if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
      const err = new Error('Payload trop volumineux (limite 64kb)');
      err.statusCode = 413;
      throw err;
    }
  }

  const rawText = await request.text();
  if (!rawText) return {};

  const byteLength = new TextEncoder().encode(rawText).byteLength;
  if (byteLength > MAX_BODY_BYTES) {
    const err = new Error('Payload trop volumineux (limite 64kb)');
    err.statusCode = 413;
    throw err;
  }

  const contentType = (request.headers.get('content-type') || '').toLowerCase();
  if (contentType.includes('application/x-www-form-urlencoded')) {
    return Object.fromEntries(new URLSearchParams(rawText).entries());
  }

  try {
    return JSON.parse(rawText);
  } catch {
    const err = new Error('Corps JSON invalide');
    err.statusCode = 400;
    throw err;
  }
}

export async function runExpressHandler(context, loadHandler) {
  const { request, env } = context;
  syncEnvToProcess(env);

  const url = new URL(request.url);
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

  if (request.method === 'OPTIONS') {
    const headers = new Headers();
    if (origin) {
      headers.set('Access-Control-Allow-Origin', origin);
      headers.set('Vary', 'Origin');
    } else {
      headers.set('Access-Control-Allow-Origin', 'https://profeps.ma');
    }
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return new Response(null, { status: 204, headers });
  }

  let body = {};
  try {
    body = await parseRequestBody(request, request.method);
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message || 'Requête invalide' }),
      {
        status: err.statusCode || 400,
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      }
    );
  }

  const headersObj = {};
  request.headers.forEach((value, key) => {
    headersObj[key.toLowerCase()] = value;
  });
  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp && !headersObj['x-forwarded-for']) {
    headersObj['x-forwarded-for'] = cfIp;
  }

  const req = {
    method: request.method,
    url: url.pathname + url.search,
    path: url.pathname,
    query: Object.fromEntries(url.searchParams.entries()),
    headers: headersObj,
    body,
    socket: {
      remoteAddress: cfIp || headersObj['x-forwarded-for'] || '0.0.0.0'
    }
  };

  let statusCode = 200;
  const responseHeaders = new Headers();
  let responseBody = null;
  let finished = false;

  const res = {
    setHeader(key, value) {
      responseHeaders.set(String(key), String(value));
      return res;
    },
    getHeader(key) {
      return responseHeaders.get(String(key));
    },
    status(code) {
      statusCode = Number(code) || 200;
      return res;
    },
    json(payload) {
      if (!responseHeaders.has('Content-Type')) {
        responseHeaders.set('Content-Type', 'application/json; charset=utf-8');
      }
      responseBody = JSON.stringify(payload);
      finished = true;
      return res;
    },
    send(payload) {
      if (typeof payload === 'object' && payload !== null && !(payload instanceof ArrayBuffer)) {
        return res.json(payload);
      }
      responseBody = payload ?? '';
      finished = true;
      return res;
    },
    end(payload) {
      if (payload !== undefined) {
        responseBody = payload;
      }
      finished = true;
      return res;
    }
  };

  const handlerModule = loadHandler();
  const handler = typeof handlerModule === 'function' ? handlerModule : handlerModule?.default;
  if (typeof handler !== 'function') {
    return new Response(
      JSON.stringify({ success: false, error: 'Gestionnaire API introuvable' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      }
    );
  }

  await handler(req, res);

  if (origin && isAllowedOrigin(origin)) {
    responseHeaders.set('Access-Control-Allow-Origin', origin);
    responseHeaders.set('Vary', 'Origin');
  }

  return new Response(finished ? responseBody : null, {
    status: statusCode,
    headers: responseHeaders
  });
}
