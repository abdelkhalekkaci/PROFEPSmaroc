/**
 * appliquer-refonte-accueil-v2.js
 * Script de mise à jour pour ProfEPS Maroc (profeps.ma)
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('\n=====================================================');
console.log('🚀 DÉPLOIEMENT PROF EPS MAROC : PAGE D\'ACCUEIL REVISITÉE');
console.log('=====================================================\n');

try {
  console.log('1. Génération de index.html avec la nouvelle hiérarchie...');
  execSync('node generer-page-accueil-statique.js', { stdio: 'inherit' });

  console.log('\n2. Harmonisation de la Navbar et du Footer unifié...');
  execSync('node unifier-navbar-footer.js', { stdio: 'inherit' });

  console.log('\n3. Compilation Vite de production (dist/)...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('\n=====================================================');
  console.log('🎉 SUCCÈS : TOUTES LES MODIFICATIONS SONT APPLIQUÉES !');
  console.log('=====================================================\n');
} catch (err) {
  console.error('Erreur lors du déploiement :', err);
  process.exit(1);
}
