# ==============================================================================
# ProfEPS.ma - Script de Nettoyage et Réorganisation Full-Stack (PowerShell)
# ==============================================================================
Write-Host " Nettoyage et restructuration professionnelle du projet en cours..." -ForegroundColor Cyan

# 1. Création des dossiers propres
New-Item -ItemType Directory -Force -Path "public", "scripts/archive", "docs" | Out-Null

# 2. Suppression définitive des fichiers obsolètes et résidus
$toDelete = @("nul", "clean-*.cjs", "generate-*.cjs", "sync-*.cjs", "sync-*.js", "update-*.cjs", "executer-*.js", "supabase-*.sql")
foreach ($pattern in $toDelete) {
    Remove-Item -Path $pattern -Force -ErrorAction SilentlyContinue
}
Write-Host "✔ Résidus Supabase et scripts obsolètes supprimés." -ForegroundColor Green

# 3. Déplacement des documents Markdown de stratégie dans docs/
$docsToMove = @("GEO-AEO-PLAN.md", "MONITORING_CHECKLIST.md", "NETLINKING_STRATEGY.md", "WIKIDATA_DRAFT.md")
foreach ($doc in $docsToMove) {
    if (Test-Path $doc) { Move-Item -Path $doc -Destination "docs/" -Force }
}
Write-Host "✔ Documentation archivée dans docs/." -ForegroundColor Green

# 4. Archivage des anciens scripts de migration ponctuels dans scripts/archive/
$legacyScripts = @("appliquer-*.js", "appliquer-*.mjs", "corriger-*.mjs", "generer-10-outils.js", "generer-page-accueil-statique.js", "generer-sitemap-seo.js", "generer-textes-800-mots.mjs", "make-standalone.mjs", "reparer-urgences-seo.js", "synchroniser-profeps-complet.mjs")
foreach ($script in $legacyScripts) {
    Get-ChildItem -Path . -Filter $script -ErrorAction SilentlyContinue | Move-Item -Destination "scripts/archive/" -Force
}

# 5. Déplacement des scripts actifs dans scripts/
$activeScripts = @("unifier-navbar-footer.js", "generer-10-articles-*.mjs")
foreach ($script in $activeScripts) {
    Get-ChildItem -Path . -Filter $script -ErrorAction SilentlyContinue | Move-Item -Destination "scripts/" -Force
}
Write-Host "✔ Scripts réorganisés dans scripts/ et scripts/archive/." -ForegroundColor Green

# 6. Déplacement de TOUS les fichiers HTML d'articles et calculateurs dans public/ (index.html reste à la racine)
Get-ChildItem -Path . -Filter "*.html" | Where-Object { $_.Name -ne "index.html" } | Move-Item -Destination "public/" -Force
Write-Host "✔ Tous les articles et calculateurs HTML sont désormais dans public/ (index.html préservé à la racine)." -ForegroundColor Green

# 7. Copie des fichiers statiques utiles dans public/
Copy-Item -Path "sitemap.xml", "ads.txt", "profeps-cmp.js", "profeps-communaute.js" -Destination "public/" -Force -ErrorAction SilentlyContinue

Write-Host "`n🎉 PROJET 100% PROPRE ET FULL-STACK CONFORME !" -ForegroundColor Green
Write-Host "  - Racine : index.html, package.json, vite.config.ts, src/" -ForegroundColor Yellow
Write-Host "  - public/ : Tous les articles, calculateurs et pages HTML" -ForegroundColor Yellow
Write-Host "  - scripts/ : Scripts utiles + archive/" -ForegroundColor Yellow
Write-Host "  - docs/ : Documentation et plans de netlinking" -ForegroundColor Yellow
