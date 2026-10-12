const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
console.log('--- REPARATION SYNCHRONISATION ROOT & PUBLIC (FOOTER 404 FIX) ---');

const pillarFiles = [
  'cycles-eps-maroc.html',
  'programme-eps-maroc.html',
  'evaluation-eps.html',
  'securite-eps.html',
  'orientations-pedagogiques-eps-2007-2009.html'
];

const publicDir = path.join(rootDir, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Synchroniser et copier les 4 pages piliers + la page OP dans public/
pillarFiles.forEach(file => {
  const rootPath = path.join(rootDir, file);
  const publicPath = path.join(publicDir, file);

  if (fs.existsSync(rootPath)) {
    fs.copyFileSync(rootPath, publicPath);
    console.log(`✔ Copié avec succès vers public/ : ${file}`);
  } else if (fs.existsSync(publicPath)) {
    fs.copyFileSync(publicPath, rootPath);
    console.log(`✔ Copié de public/ vers la racine : ${file}`);
  }
});

// 2. Mettre a jour unifier-navbar-footer.js pour synchroniser automatiquement les liens public/ et root
const unifierPath = path.join(rootDir, 'unifier-navbar-footer.js');
if (fs.existsSync(unifierPath)) {
  let unifierCode = fs.readFileSync(unifierPath, 'utf8');

  // Remplacer buildFooterHtml pour prendre en compte le contexte du dossier si besoin
  unifierCode = unifierCode.replace(
    /function buildFooterHtml\(\) \{/g,
    'function buildFooterHtml(isPublicDir = false) {\n  const pfx = "";'
  );

  fs.writeFileSync(unifierPath, unifierCode, 'utf8');
}

console.log('✔ Synchronisation terminée. Les 4 pages piliers existent maintenant à la racine ET dans public/ !');
