/**
 * inject-adsense.js
 * Injecte le code AdSense dans le <head> de toutes les pages HTML publiques.
 * Publisher ID : ca-pub-8253776880916865
 */
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public');
const PUBLISHER_ID = 'ca-pub-8253776880916865';

// Code AdSense à injecter dans le <head> (exactement comme Google le fournit)
const ADSENSE_SCRIPT = `    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLISHER_ID}"
         crossorigin="anonymous"></script>`;

// Fichiers à ignorer (pas de contenu éditorial)
const SKIP_FILES = ['google9e56188ccdfea7e9.html'];

const files = fs.readdirSync(dir).filter(f =>
    f.endsWith('.html') && !SKIP_FILES.includes(f)
);

let updated = 0, skipped = 0, alreadyDone = 0;

files.forEach(file => {
    const fp = path.join(dir, file);
    let content = fs.readFileSync(fp, 'utf8');

    // Ne pas dupliquer si déjà présent
    if (content.includes('pagead2.googlesyndication.com')) {
        alreadyDone++;
        return;
    }

    // Injecter juste avant </head>
    if (!content.includes('</head>')) {
        skipped++;
        console.log('SKIP (no </head>):', file);
        return;
    }

    content = content.replace('</head>', ADSENSE_SCRIPT + '\n</head>');
    fs.writeFileSync(fp, content);
    updated++;
});

console.log(`\nAdSense injecté : ${updated} pages | Déjà présent : ${alreadyDone} | Ignoré : ${skipped}`);
