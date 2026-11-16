const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Load provisioned Firebase configuration
let firebaseConfig = {
  projectId: 'aerobic-fastness-3vc14',
  firestoreDatabaseId: 'ai-studio-profepsmaroc-5dc8e690-4349-4312-be8d-5a5688d4513b',
  apiKey: 'AIzaSyAOjVZJNa3_xjDMKYpOfv9PZ1eaIKEQaYI'
};
try {
  const cfgPath = path.join(__dirname, '..', 'firebase-applet-config.json');
  if (fs.existsSync(cfgPath)) {
    firebaseConfig = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
  }
} catch (_e) {}

const FIRESTORE_BASE_URL = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/${firebaseConfig.firestoreDatabaseId}/documents`;
const FIRESTORE_API_KEY = firebaseConfig.apiKey;

// Verified SHA-256 hash matching isServerModAuthorized() in firestore.rules
const SERVER_MOD_KEY_HASH = '7e8b1a9f2d4c6e0a3b5f8d2c1e9a7b4d6f0c2e8a1b3d5f7e9c0a2b4d6e8f1a3c';
const ADMIN_PASSWORD = process.env.ADMIN_MODERATION_PASSWORD || 'ProfEPS2026!';

// In-memory rate-limiting & report deduplication (uses salted SHA-256 IP hashes only — Law 09-08)
const submissionRateMap = new Map();
const reportDedupSet = new Set();

function hashClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  const rawIp = (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : req.socket?.remoteAddress) || '0.0.0.0';
  const daySalt = new Date().toISOString().slice(0, 10);
  return crypto
    .createHash('sha256')
    .update(`${rawIp}::profeps-cndp-law0908::${daySalt}`)
    .digest('hex');
}

function checkRateLimit(ipHash, maxPerWindow = 4, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  if (submissionRateMap.size > 3000) {
    for (const [k, v] of submissionRateMap.entries()) {
      if (now - v.start > windowMs) submissionRateMap.delete(k);
    }
  }
  const entry = submissionRateMap.get(ipHash);
  if (!entry || now - entry.start > windowMs) {
    submissionRateMap.set(ipHash, { count: 1, start: now });
    return true;
  }
  if (entry.count >= maxPerWindow) return false;
  entry.count += 1;
  return true;
}

function sanitizePlainText(input, maxLen) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLen);
}

// Comprehensive Anti-Spam & Anti-Abuse Filter (FR / AR / EN)
const SPAM_PATTERNS = [
  /https?:\/\//i,
  /www\.[a-z0-9-]+/i,
  /\[url/i,
  /<a\s+href/i,
  /<script/i,
  /\b(casino|viagra|cialis|crypto|bitcoin|forex|betting|1xbet|telegram\.me|t\.me|whatsapp\.com|porn|xxx|seo\s+service|backlinks|loan|crédit\s+rapide)\b/i,
  /\b(merde|connard|putain|salope|enculé|fdp|batard|bâtard|arnaque)\b/i,
  /(قحبة|زامل|كلب|حمار|نيك|شرموطة|قمار|كازينو)/,
  /(.)\1{7,}/ // 8+ identical consecutive characters
];

function detectSpamOrAbuse(name, comment, profession, city) {
  const combined = `${name} ${profession} ${city} ${comment}`;
  for (const regex of SPAM_PATTERNS) {
    if (regex.test(combined)) {
      return 'Votre message contient des liens ou des termes non autorisés par notre charte pédagogique.';
    }
  }
  // Reject comments made only of symbols/numbers without letters
  const letterMatch = comment.match(/[a-zA-ZÀ-ÿ\u0600-\u06FF]/g);
  if (!letterMatch || letterMatch.length < 4) {
    return 'Veuillez rédiger un commentaire clair contenant du texte.';
  }
  return null;
}

// Firestore REST v1 converters
function toFirestoreValue(val) {
  if (typeof val === 'number' && Number.isInteger(val)) {
    return { integerValue: String(val) };
  }
  if (typeof val === 'boolean') {
    return { booleanValue: val };
  }
  return { stringValue: String(val ?? '') };
}

function fromFirestoreFields(doc) {
  if (!doc || !doc.fields) return null;
  const f = doc.fields;
  const parts = (doc.name || '').split('/');
  const id = parts[parts.length - 1];
  const out = { id };
  for (const [k, v] of Object.entries(f)) {
    if (v.stringValue !== undefined) out[k] = v.stringValue;
    else if (v.integerValue !== undefined) out[k] = parseInt(v.integerValue, 10);
    else if (v.booleanValue !== undefined) out[k] = Boolean(v.booleanValue);
  }
  return out;
}

async function firestoreCreate(collectionName, docId, dataObj) {
  const fields = {};
  for (const [k, v] of Object.entries(dataObj)) {
    fields[k] = toFirestoreValue(v);
  }
  const url = `${FIRESTORE_BASE_URL}/${encodeURIComponent(collectionName)}?documentId=${encodeURIComponent(docId)}&key=${encodeURIComponent(FIRESTORE_API_KEY)}`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields })
  });
  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`Firestore create error (${resp.status}): ${errText}`);
  }
  const json = await resp.json();
  return fromFirestoreFields(json);
}

async function firestoreGet(collectionName, docId) {
  const url = `${FIRESTORE_BASE_URL}/${encodeURIComponent(collectionName)}/${encodeURIComponent(docId)}?key=${encodeURIComponent(FIRESTORE_API_KEY)}`;
  const resp = await fetch(url, { method: 'GET' });
  if (!resp.ok) return null;
  const json = await resp.json();
  return fromFirestoreFields(json);
}

async function firestorePatch(collectionName, docId, fullDataObj, updateFieldNames) {
  const fields = {};
  for (const [k, v] of Object.entries(fullDataObj)) {
    fields[k] = toFirestoreValue(v);
  }
  const maskQuery = updateFieldNames.map((f) => `updateMask.fieldPaths=${encodeURIComponent(f)}`).join('&');
  const url = `${FIRESTORE_BASE_URL}/${encodeURIComponent(collectionName)}/${encodeURIComponent(docId)}?${maskQuery}&key=${encodeURIComponent(FIRESTORE_API_KEY)}`;
  const resp = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields })
  });
  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`Firestore patch error (${resp.status}): ${errText}`);
  }
  const json = await resp.json();
  return fromFirestoreFields(json);
}

async function firestoreListPublished(collectionName, extraWhereField, extraWhereValue, limitCount = 50) {
  const filters = [
    {
      fieldFilter: {
        field: { fieldPath: 'status' },
        op: 'EQUAL',
        value: { stringValue: 'published' }
      }
    }
  ];
  if (extraWhereField && extraWhereValue) {
    filters.push({
      fieldFilter: {
        field: { fieldPath: extraWhereField },
        op: 'EQUAL',
        value: { stringValue: String(extraWhereValue) }
      }
    });
  }

  const structuredQuery = {
    from: [{ collectionId: collectionName }],
    where:
      filters.length === 1
        ? filters[0]
        : {
            compositeFilter: {
              op: 'AND',
              filters
            }
          },
    limit: limitCount
  };

  const url = `${FIRESTORE_BASE_URL}:runQuery?key=${encodeURIComponent(FIRESTORE_API_KEY)}`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ structuredQuery })
  });
  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`Firestore query error (${resp.status}): ${errText}`);
  }
  const rows = await resp.json();
  const items = [];
  if (Array.isArray(rows)) {
    for (const r of rows) {
      if (r.document) {
        const parsed = fromFirestoreFields(r.document);
        if (parsed && parsed.status === 'published') {
          delete parsed.ipHash;
          delete parsed.modKeyHash;
          items.push(parsed);
        }
      }
    }
  }
  items.sort((a, b) => String(b.createdAtIso || '').localeCompare(String(a.createdAtIso || '')));
  return items;
}

module.exports = async function feedbackHandler(req, res) {
  try {
    if (req.method === 'GET') {
      const type = String(req.query.type || 'testimonials');
      if (type === 'testimonials') {
        const items = await firestoreListPublished('testimonials', null, null, 60);
        return res.status(200).json({ success: true, items });
      }
      if (type === 'comments') {
        const slug = sanitizePlainText(String(req.query.slug || ''), 160);
        if (!slug || !/^[a-zA-Z0-9_\-\.]+$/.test(slug)) {
          return res.status(400).json({ success: false, error: 'Identifiant d\'article invalide.' });
        }
        const items = await firestoreListPublished('article_comments', 'articleSlug', slug, 80);
        return res.status(200).json({ success: true, items });
      }
      return res.status(400).json({ success: false, error: 'Type de requête inconnu.' });
    }

    if (req.method === 'POST') {
      const body = req.body || {};
      const action = String(body.action || '');
      const ipHash = hashClientIp(req);

      // 1. ACTION: CREATE TESTIMONIAL (Homepage or 1st Download Popup)
      if (action === 'create_testimonial') {
        // Honeypot check (silent rejection for bots)
        if (body.website_url && String(body.website_url).trim() !== '') {
          return res.status(200).json({ success: true, ignored: true });
        }
        // Minimum dwell time check (>= 2.5 seconds, immune to client/server clock skew)
        const openedAt = Number(body.formOpenedAt || 0);
        const clientDwell = Number(body.dwellMs || 0);
        const effectiveDwell = clientDwell > 0 ? clientDwell : (openedAt > 0 ? Math.abs(Date.now() - openedAt) : 0);
        if (effectiveDwell < 2500) {
          return res.status(400).json({
            success: false,
            error: 'Veuillez prendre quelques secondes pour rédiger votre avis avant de l\'envoyer.'
          });
        }
        if (!checkRateLimit(ipHash, 6, 15 * 60 * 1000)) {
          return res.status(429).json({
            success: false,
            error: 'Vous avez déjà envoyé plusieurs avis récemment. Merci de patienter quelques minutes.'
          });
        }

        const rating = Number(body.rating);
        if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
          return res.status(400).json({
            success: false,
            error: 'Veuillez sélectionner une note entre 1 et 5 étoiles.'
          });
        }

        const name = sanitizePlainText(body.name, 60);
        const comment = sanitizePlainText(body.comment, 800);
        const profession = sanitizePlainText(body.profession || '', 80);
        const city = sanitizePlainText(body.city || '', 80);
        const source = body.source === 'download_popup' ? 'download_popup' : 'homepage';

        if (name.length < 2) {
          return res.status(400).json({
            success: false,
            error: 'Le nom est obligatoire (minimum 2 caractères).'
          });
        }
        if (comment.length < 5) {
          return res.status(400).json({
            success: false,
            error: 'Veuillez écrire un avis d\'au moins 5 caractères.'
          });
        }

        const spamErr = detectSpamOrAbuse(name, comment, profession, city);
        if (spamErr) {
          return res.status(400).json({ success: false, error: spamErr });
        }

        const docId = `t_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
        const createdAtIso = new Date().toISOString();
        const payload = {
          name,
          rating,
          comment,
          profession,
          city,
          source,
          status: 'published',
          reportsCount: 0,
          ipHash,
          createdAtIso
        };

        const created = await firestoreCreate('testimonials', docId, payload);
        if (created) {
          delete created.ipHash;
          delete created.modKeyHash;
        }
        return res.status(201).json({ success: true, item: created });
      }

      // 2. ACTION: CREATE ARTICLE COMMENT (129 Pure Blog Articles Only)
      if (action === 'create_comment') {
        if (body.website_url && String(body.website_url).trim() !== '') {
          return res.status(200).json({ success: true, ignored: true });
        }
        const openedAt = Number(body.formOpenedAt || 0);
        const clientDwell = Number(body.dwellMs || 0);
        const effectiveDwell = clientDwell > 0 ? clientDwell : (openedAt > 0 ? Math.abs(Date.now() - openedAt) : 0);
        if (effectiveDwell < 2500) {
          return res.status(400).json({
            success: false,
            error: 'Veuillez prendre quelques secondes pour rédiger votre commentaire avant l\'envoi.'
          });
        }
        if (!checkRateLimit(ipHash, 5, 15 * 60 * 1000)) {
          return res.status(429).json({
            success: false,
            error: 'Trop de commentaires envoyés récemment. Veuillez patienter quelques minutes.'
          });
        }

        const articleSlug = sanitizePlainText(body.articleSlug || '', 160);
        if (!articleSlug || articleSlug.length < 5 || !/^[a-zA-Z0-9_\-\.]+$/.test(articleSlug)) {
          return res.status(400).json({
            success: false,
            error: 'Article cible invalide.'
          });
        }

        const name = sanitizePlainText(body.name, 60);
        const comment = sanitizePlainText(body.comment, 800);
        const profession = sanitizePlainText(body.profession || '', 80);
        const city = sanitizePlainText(body.city || '', 80);

        if (name.length < 2) {
          return res.status(400).json({
            success: false,
            error: 'Le nom est obligatoire (minimum 2 caractères).'
          });
        }
        if (comment.length < 5) {
          return res.status(400).json({
            success: false,
            error: 'Le commentaire est obligatoire (minimum 5 caractères).'
          });
        }

        const spamErr = detectSpamOrAbuse(name, comment, profession, city);
        if (spamErr) {
          return res.status(400).json({ success: false, error: spamErr });
        }

        const docId = `c_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
        const createdAtIso = new Date().toISOString();
        const payload = {
          articleSlug,
          name,
          comment,
          profession,
          city,
          status: 'published',
          reportsCount: 0,
          ipHash,
          createdAtIso
        };

        const created = await firestoreCreate('article_comments', docId, payload);
        if (created) {
          delete created.ipHash;
          delete created.modKeyHash;
        }
        return res.status(201).json({ success: true, item: created });
      }

      // 3. ACTION: COMMUNITY REPORT ("Signaler")
      if (action === 'report') {
        const targetType = body.targetType === 'comment' ? 'article_comments' : 'testimonials';
        const docId = sanitizePlainText(body.id || '', 128);
        if (!docId || !/^[a-zA-Z0-9_\-]+$/.test(docId)) {
          return res.status(400).json({ success: false, error: 'Identifiant invalide.' });
        }
        const dedupKey = `${targetType}:${docId}:${ipHash}`;
        if (reportDedupSet.has(dedupKey)) {
          return res.status(200).json({ success: true, alreadyReported: true });
        }
        const existing = await firestoreGet(targetType, docId);
        if (!existing || existing.status !== 'published') {
          return res.status(404).json({ success: false, error: 'Élément introuvable.' });
        }
        const nextReports = (Number(existing.reportsCount) || 0) + 1;
        const nextStatus = nextReports >= 2 ? 'hidden' : 'published';
        const fullData = { ...existing, reportsCount: nextReports, status: nextStatus };
        delete fullData.id;

        await firestorePatch(targetType, docId, fullData, ['reportsCount', 'status']);
        reportDedupSet.add(dedupKey);
        return res.status(200).json({
          success: true,
          hidden: nextStatus === 'hidden'
        });
      }

      // 4. ACTION: ADMIN DELETE / HIDE (Protected by Admin Password)
      if (action === 'admin_delete') {
        const password = String(body.adminPassword || '');
        if (password !== ADMIN_PASSWORD) {
          return res.status(403).json({
            success: false,
            error: 'Mot de passe administrateur incorrect.'
          });
        }
        const targetType = body.targetType === 'comment' ? 'article_comments' : 'testimonials';
        const docId = sanitizePlainText(body.id || '', 128);
        if (!docId || !/^[a-zA-Z0-9_\-]+$/.test(docId)) {
          return res.status(400).json({ success: false, error: 'Identifiant invalide.' });
        }
        const existing = await firestoreGet(targetType, docId);
        if (!existing) {
          return res.status(404).json({ success: false, error: 'Élément introuvable.' });
        }
        const fullData = {
          ...existing,
          status: 'hidden',
          modKeyHash: SERVER_MOD_KEY_HASH
        };
        delete fullData.id;

        await firestorePatch(targetType, docId, fullData, ['status', 'modKeyHash']);
        return res.status(200).json({ success: true, deletedId: docId });
      }

      return res.status(400).json({ success: false, error: 'Action non reconnue.' });
    }

    return res.status(405).json({ success: false, error: 'Méthode non autorisée.' });
  } catch (err) {
    console.error('Feedback API Error:', err);
    return res.status(500).json({
      success: false,
      error: 'Une erreur technique est survenue. Veuillez réessayer dans un instant.'
    });
  }
};
