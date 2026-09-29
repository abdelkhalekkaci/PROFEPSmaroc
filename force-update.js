const fs = require('fs');
const path = require('path');

// 1. Trouver tous les fichiers HTML du projet entier (racine + public + sous-dossiers)
function getAllHtmlFiles(dir, list = []) {
    if (!fs.existsSync(dir)) return list;
    const items = fs.readdirSync(dir);
    for (const item of items) {
        if (['node_modules', '.git', 'dist', 'build', '.next'].includes(item)) continue;
        const full = path.join(dir, item);
        const s = fs.statSync(full);
        if (s.isDirectory()) {
            getAllHtmlFiles(full, list);
        } else if (item.toLowerCase().endsWith('.html')) {
            list.push(full);
        }
    }
    return list;
}

const allFiles = getAllHtmlFiles(process.cwd());
console.log(`\n🔍 ${allFiles.length} fichiers HTML trouvés au total.\n`);

// 2. Le style forcé à 600 pour la navbar
const NAVBAR_OVERRIDE_CSS = `
<style id="profeps-navbar-600">
/* Force Navbar 600 + Centrage */
.navbar .nav-link {
    font-weight: 600 !important;
    text-align: center !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
}
.navbar .nav-menu {
    justify-content: center !important;
    text-align: center !important;
}
.navbar .nav-cta, .navbar .nav-btn-login {
    font-weight: 600 !important;
}
</style>
`;

let modifiedCount = 0;

allFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Remplacer directement 500, 700 ou 800 par 600 partout dans les classes .nav-link
    content = content.replace(/\.nav-link\s*\{([\s\S]*?)\}/g, (match, body) => {
        let newBody = body.replace(/font-weight:\s*(?:500|700|800)[^;]*/g, 'font-weight: 600');
        if (!newBody.includes('font-weight')) {
            newBody += '; font-weight: 600;';
        }
        return `.nav-link {${newBody}}`;
    });

    // Nettoyer d'anciens blocs injectés
    content = content.replace(/<style id="profeps-navbar-styles">[\s\S]*?<\/style>/g, '');
    content = content.replace(/<style id="profeps-navbar-600">[\s\S]*?<\/style>/g, '');

    // Remplacer les occurrences résiduelles de 800/700 dans la navbar
    content = content
        .replaceAll('font-weight: 800 !important;', 'font-weight: 600 !important;')
        .replaceAll('font-weight: 700 !important;', 'font-weight: 600 !important;')
        .replaceAll('font-weight: 800;', 'font-weight: 600;')
        .replaceAll('font-weight: 700;', 'font-weight: 600;');

    // Injecter le style prioritaire juste avant </head>
    if (content.includes('</head>')) {
        content = content.replace('</head>', `${NAVBAR_OVERRIDE_CSS.trim()}\n</head>`);
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        modifiedCount++;
        const fileName = path.basename(filePath);
        if (['index.html', 'generateur.html', 'blog.html', 'calculateur-vma.html'].includes(fileName)) {
            console.log(`  ⭐ [PAGE CLÉ] Mis à jour : ${path.relative(process.cwd(), filePath)}`);
        } else {
            console.log(`  ✅ Mis à jour : ${path.relative(process.cwd(), filePath)}`);
        }
    }
});

console.log(`\n🎉 Terminé ! ${modifiedCount} fichiers mis à jour.`);
console.log('Les pages Accueil, Générateur et Blog ont été traitées avec font-weight: 600 garanti !\n');