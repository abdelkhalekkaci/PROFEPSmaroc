/**
 * indexnow-submit.js
 * ------------------
 * Notifie IndexNow (Bing + Yandex + partenaires) de toutes les URLs
 * presentes dans public/sitemap.xml. A executer apres chaque deploiement
 * contenant du nouveau contenu.
 *
 * Usage :
 *   node scripts/indexnow-submit.js              → soumet tout le sitemap
 *   node scripts/indexnow-submit.js url1 url2    → soumet les URLs passees en argument
 *
 * Docs : https://www.indexnow.org/documentation
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// ───────── Config ─────────
const HOST = 'www.profeps.ma';
const KEY = '90ce54bb05e24a9b87d11903ac01fc8b';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_PATH = path.join(__dirname, '..', 'public', 'sitemap.xml');
const ENDPOINT = 'https://api.indexnow.org/IndexNow';

// ───────── Extraction des URLs ─────────
function extractUrlsFromSitemap(sitemapPath) {
    if (!fs.existsSync(sitemapPath)) {
        console.error(`❌ Sitemap introuvable : ${sitemapPath}`);
        process.exit(1);
    }
    const xml = fs.readFileSync(sitemapPath, 'utf8');
    const matches = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)];
    return matches.map(m => m[1].trim());
}

// ───────── Appel IndexNow ─────────
function submitToIndexNow(urls) {
    return new Promise((resolve, reject) => {
        const payload = JSON.stringify({
            host: HOST,
            key: KEY,
            keyLocation: KEY_LOCATION,
            urlList: urls,
        });

        const req = https.request(ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': Buffer.byteLength(payload),
                'User-Agent': 'ProfEPS-IndexNow-Submitter/1.0',
            },
        }, (res) => {
            let body = '';
            res.on('data', (chunk) => { body += chunk; });
            res.on('end', () => {
                resolve({ status: res.statusCode, body });
            });
        });

        req.on('error', reject);
        req.write(payload);
        req.end();
    });
}

// ───────── Interpretation du code retour ─────────
function interpretStatus(status) {
    switch (status) {
        case 200: return '✅ 200 OK — URLs acceptées et en cours de traitement';
        case 202: return '✅ 202 Accepted — URLs reçues, vérification de la clé en cours';
        case 400: return '❌ 400 Bad Request — format JSON invalide';
        case 403: return '❌ 403 Forbidden — clé IndexNow invalide ou fichier de clé introuvable';
        case 422: return '❌ 422 Unprocessable — URLs invalides ou host ne correspond pas à la clé';
        case 429: return '⚠️  429 Too Many Requests — rate-limit, attendez avant de réessayer';
        default:  return `⚠️  ${status} — status inattendu`;
    }
}

// ───────── Main ─────────
async function main() {
    const argUrls = process.argv.slice(2).filter(a => a.startsWith('http'));
    const urls = argUrls.length > 0 ? argUrls : extractUrlsFromSitemap(SITEMAP_PATH);

    if (urls.length === 0) {
        console.error('❌ Aucune URL à soumettre.');
        process.exit(1);
    }

    console.log(`🔑 Clé IndexNow : ${KEY}`);
    console.log(`📍 Key location : ${KEY_LOCATION}`);
    console.log(`📤 Soumission de ${urls.length} URL(s) à ${ENDPOINT} …`);
    console.log('');
    urls.forEach((u, i) => console.log(`   ${i + 1}. ${u}`));
    console.log('');

    try {
        const { status, body } = await submitToIndexNow(urls);
        console.log(interpretStatus(status));
        if (body && body.trim()) {
            console.log('Réponse serveur :', body.trim());
        }
        process.exit(status === 200 || status === 202 ? 0 : 1);
    } catch (err) {
        console.error('❌ Erreur réseau :', err.message);
        process.exit(1);
    }
}

main();
