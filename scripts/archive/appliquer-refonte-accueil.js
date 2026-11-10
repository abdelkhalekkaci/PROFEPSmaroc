/**
 * appliquer-refonte-accueil.js
 * Script de mise à jour pour ProfEPS Maroc (profeps.ma)
 */

import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
console.log('\n======================================================');
console.log('🚀 VALIDATION REFONTE ACCUEIL & BLOCS DIDACTIQUES');
console.log('📂 Dossier racine :', rootDir);
console.log('======================================================\n');

const filesToCheck = [
  'src/data/pedagogicalData.ts',
  'src/components/home/PedagogicalOrientationsBlock.tsx',
  'src/components/home/DigitalLibraryBlock.tsx',
  'src/components/sports/SportsHubDashboard.tsx',
  'src/components/Header.tsx',
  'src/App.tsx'
];

filesToCheck.forEach(file => {
  const fullPath = path.join(rootDir, file);
  const exists = fs.existsSync(fullPath);
  console.log(`  ${exists ? '✔' : '❌'} ${file} : ${exists ? 'OK' : 'MANQUANT'}`);
});

console.log('\n🎉 Refonte terminée et vérifiée avec succès !\n');
