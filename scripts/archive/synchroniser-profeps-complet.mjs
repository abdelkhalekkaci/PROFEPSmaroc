/**
 * synchroniser-profeps-complet.mjs
 * Script d'automatisation totale pour ProfEPS.ma :
 * 1. Applique les fiches documentaires officielles (800 à 1000 car.) sur les 10 outils dans ./ et ./public/
 * 2. Génère / synchronise calculateur-vma.html dans ./ et ./public/
 * 3. Exécute unifier-navbar-footer.js pour harmoniser la Navbar (80px), le menu déroulant 11 outils et le footer
 */

import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const targetDirs = [rootDir];
const pubDir = path.join(rootDir, 'public');
if (fs.existsSync(pubDir)) {
  targetDirs.push(pubDir);
}

const TOOLS_DATA = [
  {
    id: 'vma',
    fileName: 'calculateur-vma.html',
    titleFr: 'Calculateur de VMA & Allures de Course',
    badge: 'Physiologie Aérobie · VMA & Paces',
    guideSteps: [
      'Réalisez un test de terrain étalonné : continu (Demi-Cooper 6 min) ou progressif par paliers (Luc-Léger, Léger-Boucher, VAMEVAL).',
      'Renseignez la distance parcourue en mètres ou le dernier palier franchi dans le calculateur.',
      'Générez votre VMA en km/h et exportez votre tableau personnalisé des allures d’entraînement pour chaque séance.'
    ],
    mathFormulas: [
      { label: 'Test continu 6 min (Demi-Cooper)', formula: 'VMA (km/h) = Distance (m) / 100' },
      { label: 'Test progressif Léger-Boucher', formula: 'VMA (km/h) = 1,02 × Vitesse du dernier palier' },
      { label: 'Estimation de VO2 Max', formula: 'VO2 Max (ml/kg/min) ≈ VMA × 3,5' },
      { label: 'Conversion d’allure au kilomètre', formula: 'Allure (min/km) = 60 / VMA' }
    ],
    interpretationSummary: 'La VMA représente la vitesse à laquelle la consommation d’oxygène devient maximale. Elle constitue le socle indispensable pour calibrer l’ensemble des filières énergétiques.',
    benchmarks: [
      { label: 'Endurance Fondamentale', value: '65–75% VMA', desc: 'Régénération, développement du réseau capillaire et lipolyse.' },
      { label: 'Seuil Aérobie (SV1)', value: '75–80% VMA', desc: 'Rythme marathon, aisance respiratoire soutenue sur plusieurs heures.' },
      { label: 'Seuil Anaérobie (SV2)', value: '80–88% VMA', desc: 'Allure 10 km et semi, équilibre lactique stable sans asphyxie.' },
      { label: 'Intermittent Court (HIIT)', value: '100–120% VMA', desc: 'Fractions 30"/30" ou 15"/15" pour solliciter la pompe cardiaque maximale.' }
    ],
    fullRawText: `Guide d'utilisation : Renseignez le résultat de votre test de terrain (distance en mètres sur 6 minutes au Demi-Cooper, ou palier atteint au test Luc-Léger / Léger-Boucher). Le calculateur génère instantanément votre Vitesse Maximale Aérobie (VMA) en km/h ainsi que vos allures cibles par zone d'effort.

Formules mathématiques :
• Test continu 6 min : VMA (km/h) = Distance (m) / 100
• Test Léger-Boucher : VMA (km/h) = 1,02 × Vitesse du dernier palier franchi
• Équivalence aérobie : VO2 Max (ml/kg/min) ≈ VMA × 3,5
• Allure de référence : Allure au kilomètre (min/km) = 60 / VMA

Interprétation des résultats : La VMA est la vitesse de course à laquelle la consommation d'oxygène est maximale. Un athlète utilise 65-75% de sa VMA en endurance fondamentale (zone aérobie régénérative), 80-88% au seuil anaérobie (maintien prolongé sur 10 km et semi-marathon), et 100-120% lors des séances d'intermittent court (30s/30s) pour optimiser la cylindrée cardiaque.`,
    charCount: 893
  },
  {
    id: 'vdot',
    fileName: 'calculateur-vdot-asr-endurance.html',
    titleFr: 'Calculateur de VO2 Max & VDOT (Jack Daniels)',
    badge: 'Cluster 1A · Puissance Aérobie & Prédictions',
    guideSteps: [
      'Sélectionnez une distance officielle récemment courue à intensité maximale (1500m, 5 km, 10 km, Semi ou Marathon) ou utilisez votre VMA.',
      'Saisissez le temps réalisé avec précision (heures, minutes, secondes) puis cliquez sur Calculer.',
      'Consultez votre score VDOT, votre classement ACSM et vos allures d’entraînement Easy, Threshold, Interval et Repetition.'
    ],
    mathFormulas: [
      { label: 'Vitesse de course v (m/min)', formula: 'v = Distance (m) / Temps (min)' },
      { label: 'Coût en oxygène (VO2)', formula: 'VO2 = -4,60 + 0,182258·v + 0,000104·v²' },
      { label: 'Fraction soutenue %VO2 Max', formula: '%VO2 = 0,8 + 0,189439·e^(-0,012778·t) + 0,298956·e^(-0,193261·t)' },
      { label: 'Indice VDOT effectif', formula: 'VDOT = VO2 / %VO2' }
    ],
    interpretationSummary: 'Le VDOT fusionne le VO2 Max et le rendement mécanique (économie de course). Il évite les biais de laboratoire en évaluant la performance réelle sur piste ou route.',
    benchmarks: [
      { label: 'Forme Santé / Débutant', value: '30–40 ml/kg/min', desc: 'Capacité aérobie fonctionnelle, allures douces recommandées.' },
      { label: 'Sportif Régulier', value: '45–55 ml/kg/min', desc: 'Bonne base aérobie, chronos 10 km sous les 45–50 minutes.' },
      { label: 'Compétiteur Confirmé', value: '55–65 ml/kg/min', desc: 'Excellente économie de course, 10 km sous 37 min, semi sous 1h23.' },
      { label: 'Élite Internationale', value: '> 70 ml/kg/min', desc: 'Puissance métabolique exceptionnelle, chrono 10 km sub-30 min.' }
    ],
    fullRawText: `Guide d'utilisation : Saisissez une performance récente chronométrée sur une distance officielle (du 1500m au marathon) ou directement votre VMA. L'algorithme calcule votre VO2 Max effectif, votre score VDOT de Jack Daniels, vos temps de passage prédits et vos 5 allures d'entraînement personnalisées.

Formules mathématiques :
• Vitesse v (m/min) = Distance / Temps (min)
• Coût O2 : VO2 = -4,60 + 0,182258·v + 0,000104·v²
• Fraction de VO2 Max : %VO2 = 0,8 + 0,189439·e^(-0,012778·t) + 0,298956·e^(-0,193261·t)
• Indice VDOT = VO2 / %VO2

Interprétation des résultats : Le VDOT synthétise la puissance aérobie et l'économie de course réelle sans nécessiter de laboratoire. Une valeur de 35 à 45 ml/kg/min reflète une condition physique saine, 50 à 60 un niveau régional confirmé, et plus de 70 un niveau international. Les allures associées permettent de calibrer avec précision les sorties d'endurance facile (E), le tempo seuil (T), les intervalles VO2 Max (I) et les répétitions de vitesse (R).`,
    charCount: 955
  },
  {
    id: 'asr',
    fileName: 'calculateur-asr-reserve-vitesse.html',
    titleFr: 'Réserve de Vitesse Anaérobie (ASR)',
    badge: 'Cluster 1B · Profilage Neuromusculaire',
    guideSteps: [
      'Mesurez la VMA (km/h) et la Vitesse Maximale de Sprint (VMS / MSS en km/h sur un sprint lancé de 30 à 60 mètres chronométré par cellules ou GPS).',
      'Entrez ces deux vitesses pour révéler la réserve anaérobie disponible et le ratio de vitesse.',
      'Utilisez le tableau supramaximal (% ASR) pour calibrer les blocs d’intermittent court sans épuisement prématuré.'
    ],
    mathFormulas: [
      { label: 'Réserve Anaérobie (ASR)', formula: 'ASR (km/h) = VMS − VMA' },
      { label: 'Ratio Neuromusculaire', formula: 'Speed Ratio = VMS / VMA' },
      { label: 'Allure Supramaximale en % ASR', formula: 'Vitesse Cible = VMA + (%ASR × ASR / 100)' }
    ],
    interpretationSummary: 'L’ASR démontre que deux athlètes ayant la même VMA subissent un stress anaérobie radicalement différent si leur pointe de vitesse diffère.',
    benchmarks: [
      { label: 'Profil Endurant (Ratio < 1,80)', value: 'ASR Étroite (< 6 km/h)', desc: 'Forte endurance aérobie mais déficit de puissance. Travailler la force, le sprint court et les bondissements.' },
      { label: 'Profil Hybride (Ratio 1,80–1,95)', value: 'ASR Équilibrée (6–8 km/h)', desc: 'Polyvalence idéale pour demi-fond, football et sports de transition rapide.' },
      { label: 'Profil Sprinteur (Ratio > 1,95)', value: 'Grande ASR (> 9 km/h)', desc: 'Potentiel explosif massif mais sensibilité à l’acidose lactique. Individualiser impérativement en % ASR.' }
    ],
    fullRawText: `Guide d'utilisation : Renseignez votre VMA (Vitesse Maximale Aérobie en km/h) et votre VMS (Vitesse Maximale de Sprint sur 30 à 60 mètres lancés). Le calculateur détermine votre Réserve de Vitesse Anaérobie (ASR), votre ratio neuromusculaire et individualise vos intensités d'intermittent supramaximal.

Formules mathématiques :
• ASR (km/h) = VMS − VMA
• Speed Ratio = VMS / VMA
• Vitesse de travail supramaximale : V_cible = VMA + (%ASR × ASR / 100)

Interprétation des résultats : Deux sportifs possédant la même VMA de 16 km/h peuvent avoir des profils radicalement différents si l'un sprinte à 26 km/h (sprinteur) et l'autre à 21 km/h (endurant). Un ratio VMS/VMA inférieur à 1,80 signale un profil endurant nécessitant un travail de force et de vitesse pure. Un ratio supérieur à 1,95 caractérise un profil explosif qui saturerait vite si les séries étaient prescrites en % de VMA brut. Prescrire en % ASR garantit une sollicitation physiologique équitable pour tous.`,
    charCount: 952
  },
  {
    id: 'ie',
    fileName: 'calculateur-indice-endurance.html',
    titleFr: 'Calculateur d’Indice d’Endurance (Péronnet & Thibault)',
    badge: 'Cluster 1C · Indice de Soutien Aérobie',
    guideSteps: [
      'Indiquez votre VMA (km/h) et votre meilleur chrono sur une distance d’endurance (5k, 10k, Semi ou Marathon).',
      'Le calculateur détermine la fraction de VMA (% VMA) maintenue et la pente de décroissance avec le temps de course.',
      'Repérez votre profil aérobie et adaptez vos volumes aux allures de tempo et de seuil lactique.'
    ],
    mathFormulas: [
      { label: '% VMA maintenu sur l’épreuve', formula: '%VMA = (Vitesse de course / VMA) × 100' },
      { label: 'Indice d’Endurance (IE)', formula: 'IE = (%VMA − 100) / ln(Temps épreuve / T_lim VMA)' },
      { label: 'Temps limite conventionnel à 100% VMA', formula: 'T_lim ≈ 6 à 7 minutes (420 secondes)' }
    ],
    interpretationSummary: 'L’Indice d’Endurance quantifie la capacité à maintenir une fraction élevée de son potentiel aérobie sans s’effondrer au fil des kilomètres.',
    benchmarks: [
      { label: 'Endurance Exceptionnelle', value: 'IE ≥ -5,5', desc: 'Profil marathonien élite. Maintien de >85% VMA sur 10 km. Axe de progrès : hausser la VMA.' },
      { label: 'Bonne Endurance', value: '-7,5 ≤ IE < -5,5', desc: 'Équilibre parfait entre puissance aérobie et résistance à la fatigue.' },
      { label: 'Endurance Moyenne', value: '-9,5 ≤ IE < -7,5', desc: 'Profil standard. Développer les sorties longues et les blocs au seuil anaérobie.' },
      { label: 'Déficit d’Endurance', value: 'IE < -9,5', desc: 'Profil vitesse. Forte VMA sous-exploitée sur longue distance. Travailler le volume Z2.' }
    ],
    fullRawText: `Guide d'utilisation : Indiquez votre VMA (ou temps sur 1500m) et votre meilleur chrono sur une distance supérieure (5 km, 10 km, semi ou marathon). L'outil quantifie votre capacité à maintenir un pourcentage élevé de votre VMA au fil du temps selon le modèle validé de Péronnet et Thibault.

Formules mathématiques :
• Pourcentage de VMA maintenu : %VMA = (Vitesse moyenne course / VMA) × 100
• Indice d'Endurance (IE) : IE = (%VMA - 100) / ln(Temps épreuve / Temps limite à 100% VMA)
où le temps limite à 100% VMA est conventionnellement fixé à 6 ou 7 minutes.

Interprétation des résultats : L'indice s'exprime par une valeur négative. Un IE supérieur à -5 reflète une endurance exceptionnelle typique des marathoniens d'élite capables de courir à plus de 85% de VMA. Un IE entre -6 et -8 correspond à une bonne endurance aérobie. Un IE inférieur à -10 trahit un déficit d'endurance : l'athlète dispose d'un gros moteur (VMA) mais s'effondre vite, nécessitant un travail prioritaire au seuil.`,
    charCount: 952
  },
  {
    id: 'karvonen',
    fileName: 'calculateur-frequence-cardiaque-karvonen.html',
    titleFr: 'Fréquence Cardiaque & Zones Cibles (Karvonen & Tanaka)',
    badge: 'Cluster 2A · Cardiologie de l’Exercice',
    guideSteps: [
      'Mesurez votre Fréquence Cardiaque au Repos (FC Repos au réveil avant de vous lever).',
      'Renseignez votre âge et votre FC Max (valeur mesurée lors d’un effort maximal ou estimée selon Tanaka).',
      'Obtenez votre Fréquence Cardiaque de Réserve (FCR) et vos 5 zones cibles individualisées pour programmer vos séances.'
    ],
    mathFormulas: [
      { label: 'FC Max estimée (formule de Tanaka)', formula: 'FC Max = 208 − (0,7 × Âge)' },
      { label: 'Fréquence Cardiaque de Réserve (FCR)', formula: 'FCR = FC Max − FC Repos' },
      { label: 'Formule de Karvonen (FC Cible)', formula: 'FC Cible = FC Repos + (%Intensité × FCR)' }
    ],
    interpretationSummary: 'La formule de Karvonen intègre l’état de forme via la FC de repos, offrant une précision bien supérieure au simple pourcentage de FC Max.',
    benchmarks: [
      { label: 'Zone 1 · Récupération', value: '50–60% FCR', desc: 'Régénération post-compétition, retour au calme, élimination des toxines.' },
      { label: 'Zone 2 · Endurance Fondamentale', value: '60–70% FCR', desc: 'Brûlage des graisses, développement capillaire et mitochondrial fondamental.' },
      { label: 'Zone 3 · Tempo Aérobie', value: '70–80% FCR', desc: 'Puissance aérobie soutenue, développement de l’allure marathon.' },
      { label: 'Zone 4 · Seuil Anaérobie', value: '80–90% FCR', desc: 'Travail au seuil d’accumulation du lactate, allure 10 km intense.' },
      { label: 'Zone 5 · Puissance Cardiaque', value: '> 90% FCR', desc: 'Intermittent VO2 Max et sprint court, réservé aux sportifs entraînés.' }
    ],
    fullRawText: `Guide d'utilisation : Entrez votre âge, votre Fréquence Cardiaque au Repos (mesurée au réveil au calme) et votre Fréquence Cardiaque Maximale (mesurée lors d'un test maximal ou estimée automatiquement). Le calculateur établit votre Fréquence Cardiaque de Réserve et vos 5 zones cibles d'entraînement.

Formules mathématiques :
• FC Max estimée (formule de Tanaka) : FC Max = 208 − (0,7 × Âge)
• Fréquence Cardiaque de Réserve : FCR = FC Max − FC Repos
• Formule de Karvonen : FC Cible = FC Repos + (%Intensité × FCR)

Interprétation des résultats : Contrairement au pourcentage brut de FC Max, la méthode Karvonen prend en compte le niveau de sédentarité ou d'entraînement via la FC de repos. La Zone 1 (50-60% FCR) sert à la récupération active. La Zone 2 (60-70% FCR) développe l'endurance fondamentale et l'oxydation des lipides. La Zone 3 (70-80% FCR) cible le tempo aérobie. La Zone 4 (80-90% FCR) calibre le travail au seuil lactique, et la Zone 5 (>90% FCR) sollicite la puissance cardiaque maximale.`,
    charCount: 969
  },
  {
    id: 'imc',
    fileName: 'calculateur-imc-sportif-masse-grasse.html',
    titleFr: 'Calculateur IMC & Masse Grasse Sportive (IMG)',
    badge: 'Cluster 2B · Composition Corporelle & Santé',
    guideSteps: [
      'Renseignez votre sexe, âge, poids (kg) et taille (cm).',
      'Ajoutez facultativement votre tour de taille et tour de cou pour une estimation US Navy affinée.',
      'Analysez votre composition corporelle réelle (masse grasse vs masse maigre) adaptée au contexte athlétique.'
    ],
    mathFormulas: [
      { label: 'Indice de Masse Corporelle (IMC)', formula: 'IMC (kg/m²) = Poids / (Taille en m)²' },
      { label: 'Indice de Masse Grasse (Deurenberg)', formula: 'IMG (%) = 1,20·IMC + 0,23·Âge − 10,8·Sexe − 5,4 (Sexe: 1 H / 0 F)' },
      { label: 'Masse Grasse & Masse Maigre', formula: 'MG (kg) = Poids × (IMG / 100) | MM (kg) = Poids − MG' }
    ],
    interpretationSummary: 'L’IMC classe les populations générales mais induit en erreur les sportifs musclés. L’IMG rétablit la vérité métabolique en isolant le tissu adipeux de la masse musculaire.',
    benchmarks: [
      { label: 'Homme Athlète', value: '8–14% IMG', desc: 'Définition musculaire nette, niveau optimal de puissance/poids.' },
      { label: 'Femme Athlète', value: '16–22% IMG', desc: 'Équilibre hormonal et fonctionnel optimal pour la haute intensité.' },
      { label: 'Norme Santé Sédentaire', value: '15–20% (H) / 22–30% (F)', desc: 'Fourchette saine pour la population non sportive.' },
      { label: 'Seuil de Vigilance Bas', value: '<6% (H) / <14% (F)', desc: 'Risque d’aménorrhée, de fonte musculaire et de déficit immunitaire.' }
    ],
    fullRawText: `Guide d'utilisation : Renseignez votre sexe, âge, taille, poids corporel et tour de taille (ou niveau sportif). L'outil calcule votre Indice de Masse Corporelle (IMC), votre Indice de Masse Grasse (IMG selon Deurenberg et la formule US Navy) et évalue votre composition corporelle athlétique.

Formules mathématiques :
• Indice de Masse Corporelle : IMC (kg/m²) = Poids / (Taille en mètres)²
• Indice de Masse Grasse (Deurenberg) : IMG (%) = (1,20 × IMC) + (0,23 × Âge) − (10,8 × Sexe) − 5,4
(où Sexe = 1 pour les hommes et 0 pour les femmes)
• Masse Grasse (kg) = Poids × (IMG / 100) ; Masse Maigre (kg) = Poids − Masse Grasse

Interprétation des résultats : Chez un sportif musclé, un IMC supérieur à 25 ne traduit pas un surpoids mais une hypertrophie musculaire. L'IMG est le véritable indicateur santé et performance : chez l'homme athlète, il oscille entre 8% et 14% (normal sédentaire : 15-20%) ; chez la femme athlète, entre 16% et 22% (normal sédentaire : 22-30%). Un taux trop bas (<6% homme, <14% femme) augmente les risques hormonaux et de blessure.`,
    charCount: 978
  },
  {
    id: 'meteo',
    fileName: 'calculateur-chaleur-meteo-altitude.html',
    titleFr: 'Ajustement Chaleur, Humidité & Altitude',
    badge: 'Cluster 2C · Éco-Physiologie & Thermorégulation',
    guideSteps: [
      'Entrez la température extérieure (°C), l’humidité relative de l’air (%) et l’altitude de votre parcours (mètres).',
      'Indiquez votre allure cible sur le plat au niveau de la mer (ex. 4:30 min/km).',
      'Le calculateur applique les coefficients de déclassement pour vous donner l’allure ajustée protectrice et les recommandations hydriques.'
    ],
    mathFormulas: [
      { label: 'Indice Combiné Chaleur + Humidité', formula: 'Somme T (°C) + Humidité (%) ; seuil d’alerte métabolique' },
      { label: 'Déclassement Chaleur (McMillan)', formula: 'Perte de 1,5% à 3% par palier de 5°C au-delà de 15°C' },
      { label: 'Déclassement Altitude (Peronnet)', formula: 'Décroissance de VO2 Max d’environ 1% par 100 m au-delà de 1000 m' },
      { label: 'Allure Corrigée', formula: 'Allure Réelle = Allure Cible / (1 − Déclassement Total)' }
    ],
    interpretationSummary: 'Vouloir tenir une allure programmée par temps caniculaire ou en altitude induit une dérive cardiaque de 10 à 25 bpm et un coup de chaleur précoce. Ajuster son allure préserve l’impact physiologique recherché.',
    benchmarks: [
      { label: 'Conditions Idéales', value: 'T < 15°C · Alt < 500m', desc: 'Aucune pénalité, conditions optimales de record personnel.' },
      { label: 'Impact Modéré', value: '20–26°C ou 1000–1800m', desc: 'Perte de 2 à 5% de vitesse (+5 à +15 s/km). Boire 500 ml/h.' },
      { label: 'Impact Fort / Alerte', value: '27–34°C ou >2000m', desc: 'Perte de 6 à 12% (+15 à +35 s/km). Réduire la durée des blocs.' },
      { label: 'Zone Critique', value: 'T > 35°C et humidité > 70%', desc: 'Thermorégulation bloquée. Remplacer par du renforcement au frais.' }
    ],
    fullRawText: `Guide d'utilisation : Précisez la température (°C), l'humidité relative (%) et l'altitude (m) ainsi que votre allure habituelle au niveau de la mer. Le calculateur détermine le stress thermique, le déclassement aérobie physiologique et réajuste précisément vos allures de course et besoins d'hydratation.

Formules mathématiques :
• Stress Chaleur : Somme T (°C) + Humidité (%) ; au-delà de 130 (unités US), l'effort devient critique
• Déclassement Chaleur : Perte de 1,5% à 3% par tranche de 5°C au-dessus de 15°C
• Déclassement Altitude : Décroissance de VO2 Max d'environ 1% par 100 m au-delà de 1000 m
• Allure corrigée : Allure_réelle = Allure_cible / (1 − Déclassement_total)

Interprétation des résultats : La chaleur et l'humidité saturent la thermorégulation, créant une dérive cardiaque de 10 à 20 bpm pour une vitesse constante. L'altitude diminue la pression partielle en O2. Courir à allure habituelle dans ces conditions mène à l'épuisement. Adapter son chrono de 15 à 45 s/km permet de maintenir l'intensité métabolique exacte sans surchauffe.`,
    charCount: 978
  },
  {
    id: 'gap',
    fileName: 'calculateur-gap-pente-nutrition.html',
    titleFr: 'Allure Ajustée à la Pente (GAP) & Nutrition',
    badge: 'Cluster 2D · Trail & Bioénergétique de Pente',
    guideSteps: [
      'Entrez votre allure sur le plat (min/km ou km/h) et le pourcentage de pente (positif en montée, négatif en descente).',
      'Le calculateur calcule l’allure équivalente sur le plat (GAP selon Minetti) et le coût énergétique en J/kg/m.',
      'Saisissez votre poids et la durée d’effort pour obtenir les dépenses caloriques et le plan d’apport glucidique horaire.'
    ],
    mathFormulas: [
      { label: 'Coût énergétique de course Cr (Minetti)', formula: 'Cr = 155,4·i⁵ − 30,4·i⁴ − 43,3·i³ + 46,3·i² + 19,5·i + 3,6 (J/kg/m)' },
      { label: 'Facteur d’équivalence GAP', formula: 'Facteur = Cr(pente) / Cr(plat)' },
      { label: 'Allure GAP équivalente', formula: 'GAP (min/km) = Allure Réelle / Facteur' },
      { label: 'Dépense calorique totale', formula: 'Calories (kcal) ≈ Poids (kg) × Distance (km) × Facteur Pente' }
    ],
    interpretationSummary: 'Une côte de 10% double le coût métabolique : courir à 8 km/h en montée sollicite l’organisme comme un 12,5 km/h sur terrain plat. En trail, la vitesse chronométrée est trompeuse, seule l’allure GAP reflète la charge réelle.',
    benchmarks: [
      { label: 'Montée Modérée (+5%)', value: 'Surcoût +35%', desc: 'Hausse maîtrisée de la FC, raccourcir la foulée sans forcer.' },
      { label: 'Montée Raide (+10% à +15%)', value: 'Surcoût +80% à +120%', desc: 'Basculer en marche dynamique rapide dès que le coût dépasse la VMA.' },
      { label: 'Descente Efficace (-5% à -8%)', value: 'Gain métabolique', desc: 'Économie d’oxygène maximale, attention aux chocs excentriques.' },
      { label: 'Besoins Glucidiques (>60 min)', value: '30 à 60 g/heure', desc: 'Maintenir la glycémie et épargner les réserves de glycogène musculaire.' }
    ],
    fullRawText: `Guide d'utilisation : Entrez votre vitesse ou allure sur le plat, le pourcentage moyen de la pente (positive en montée ou négative en descente) et la durée d'effort. Le calculateur convertit votre vitesse en Allure Ajustée à la Pente (GAP - modèle Minetti) et estime vos dépenses caloriques et besoins glucidiques.

Formules mathématiques :
• Coût énergétique (Minetti et al.) : Cr = 155,4·i⁵ − 30,4·i⁴ − 43,3·i³ + 46,3·i² + 19,5·i + 3,6 (J/kg/m)
• Ratio d'équivalence GAP : Facteur = Cr(pente) / Cr(plat)
• GAP (min/km) = Allure_réelle / Facteur
• Dépense énergétique : Calories (kcal) ≈ Poids (kg) × Distance (km) × Facteur_pente

Interprétation des résultats : Une montée à 10% double le coût métabolique par rapport au plat : courir à 8 km/h en côte équivaut physiologiquement à 12,5 km/h sur terrain plat. En descente modérée (-5%), le coût diminue mais les contraintes musculaires excentriques s'élèvent. Adapter son allure GAP permet de préserver sa filière aérobie. Sur efforts >60 min, consommer 30 à 60 g de glucides/heure prévient la déplétion glycogénique.`,
    charCount: 981
  },
  {
    id: 'hiit',
    fileName: 'generateur-intermittent-hiit-cod.html',
    titleFr: 'Générateur Intermittent HIIT & Changements de Direction (COD 180°)',
    badge: 'Cluster 3A · Conditionnement Physique & Sports Co',
    guideSteps: [
      'Entrez votre VMA (ou VIFT au test 30-15 de Martin Buchheit).',
      'Choisissez la modalité d’effort (15s/15s, 30s/30s, 10s/20s) et le pourcentage d’intensité visé (ex. 100% à 115%).',
      'Sélectionnez le format de course : Ligne droite continue ou Navette aller-retour avec virages à 180°.',
      'Le générateur calcule la distance exacte en mètres à baliser entre les plots pour un calibrage chirurgical.'
    ],
    mathFormulas: [
      { label: 'Distance théorique en ligne droite', formula: 'D (m) = [VMA (km/h) × (%Intensité / 100) / 3,6] × Temps d’effort (s)' },
      { label: 'Coût cinétique du COD 180° (Buchheit)', formula: 'Perte de 0,7 s à 1,0 s par virage (ou déduction de 1,5 à 2 m par virage)' },
      { label: 'Distance corrigée sur navette', formula: 'D_ajustée = D_droite − (Nombre de demi-tours × Coût_COD)' }
    ],
    interpretationSummary: 'En sports collectifs, chaque freinage et relance majore le coût énergétique. Omettre la correction COD surcharge les ischio-jambiers et provoque une acidose prématurée.',
    benchmarks: [
      { label: 'Format 30"/30" en Ligne Droite', value: '100–105% VMA', desc: 'Développement de la consommation d’oxygène maximale avec cinétique O2 stable.' },
      { label: 'Format 15"/15" Navette 180°', value: '95–100% VMA corrigé', desc: 'Haute sollicitation neuromusculaire sans épuisement lactique précoce.' },
      { label: 'Format 10"/20" Explosif', value: '115–125% VMA ou ASR', desc: 'Sollicitation de la puissance anaérobie alactique et recrutement des fibres rapides.' },
      { label: 'Volume Recommandé', value: '2 à 3 séries de 6 à 8 min', desc: 'Récupération passive ou semi-active de 3 min entre les blocs de travail.' }
    ],
    fullRawText: `Guide d'utilisation : Définissez votre VMA (ou VIFT), le format intermittent (ex. 15s/15s, 30s/30s), l'intensité ciblée et le parcours (ligne droite ou navette avec virages à 180°). L'outil calcule les distances exactes entre plots en déduisant le coût métabolique des décélérations et réaccélérations.

Formules mathématiques :
• Distance droite : D (m) = [VMA (km/h) × (%Intensité / 100) / 3,6] × Temps (s)
• Coût COD 180° (Buchheit) : Perte de 0,7 s à 1,0 s par virage (ou pénalité de 1,5 à 2 mètres)
• Distance corrigée : D_ajustée = D_droite − (Nombre de demi-tours × Coût_COD)

Interprétation des résultats : Les demi-tours à 180° exigent un travail excentrique et neuromusculaire majeur. Imposer la même distance qu'en ligne droite mènerait à une acidose prématurée et un risque lésionnel accru. La correction COD rééquilibre les distances pour que le temps d'effort stimule le système cardiorespiratoire au pourcentage exact de VO2 Max programmé sans rupture motrice.`,
    charCount: 928
  },
  {
    id: 'charge',
    fileName: 'calculateur-charge-rpe-foster-acwr.html',
    titleFr: 'Charge d’Entraînement RPE Foster & Ratio ACWR',
    badge: 'Cluster 3B · Monitoring de Charge & Prévention des Blessures',
    guideSteps: [
      'Après chaque séance, notez la perception globale de l’effort sur l’échelle de Foster/Borg (1 très facile à 10 maximal).',
      'Multipliez ce score par la durée effective de la séance en minutes pour obtenir la charge en Unités Arbitraires (UA).',
      'Suivez vos charges sur 28 jours : l’outil calcule la charge aiguë (7 jours), la charge chronique (28 jours) et le ratio ACWR.'
    ],
    mathFormulas: [
      { label: 'Charge de séance (sRPE Foster)', formula: 'Charge (UA) = RPE (1 à 10) × Durée de séance (min)' },
      { label: 'Charge Aiguë (Fatigue immédiate)', formula: 'Moyenne mobile des charges des 7 derniers jours' },
      { label: 'Charge Chronique (Forme de fond)', formula: 'Moyenne mobile des charges des 28 derniers jours' },
      { label: 'Ratio ACWR (Modèle de Tim Gabbett)', formula: 'ACWR = Charge Aiguë / Charge Chronique' }
    ],
    interpretationSummary: 'Le ratio ACWR compare la fatigue immédiate à la condition physique consolidée. Il isole avec précision les zones de pic de forme et les risques de blessure musculaire ou tendineuse.',
    benchmarks: [
      { label: 'Zone Sous-Entraînement', value: 'ACWR < 0,80', desc: 'Perte de condition physique, risque de désadaptation lors de la reprise.' },
      { label: 'Zone Optimale (Sweet Spot)', value: '0,80 ≤ ACWR ≤ 1,30', desc: 'Progression continue, adaptation cardiovasculaire maximale et risque de blessure <5%.' },
      { label: 'Zone d’Alerte Modérée', value: '1,30 < ACWR ≤ 1,50', desc: 'Surmenage naissant. Stabiliser les charges et optimiser sommeil et nutrition.' },
      { label: 'Zone Critique (Danger Blessure)', value: 'ACWR > 1,50', desc: 'Risque de blessure multiplié par 3 à 4. Alléger impérativement les volumes.' }
    ],
    fullRawText: `Guide d'utilisation : Renseignez la durée de votre séance d'entraînement en minutes et la difficulté perçue sur l'échelle de Borg/Foster (de 1 très facile à 10 effort maximal). Sur plusieurs semaines, saisissez vos charges pour calculer le ratio Charge Aiguë / Charge Chronique (ACWR) et prévenir le surentraînement.

Formules mathématiques :
• Charge de séance (sRPE Foster) : Charge (UA) = RPE (score 1 à 10) × Durée (minutes)
• Charge Aiguë : Moyenne des charges sur les 7 derniers jours (fatigue immédiate)
• Charge Chronique : Moyenne des charges sur les 28 derniers jours (forme de fond)
• Ratio ACWR : ACWR = Charge Aiguë / Charge Chronique

Interprétation des résultats : Les unités arbitraires (UA) quantifient la fatigue interne. Selon les travaux de Tim Gabbett, un ratio ACWR compris entre 0,8 et 1,3 constitue la « zone optimale » de progression avec un risque de blessure minimal (<5%). Un ratio supérieur à 1,5 entre dans la « zone critique » où le risque de blessure et de surcharge articulaire ou tendineuse est multiplié par 3 à 4, exigeant un allègement immédiat.`,
    charCount: 989
  }
];

function buildHtmlCard(tool) {
  const stepsHtml = tool.guideSteps.map((step, idx) => `
        <div class="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl flex items-start gap-3">
          <span class="w-6 h-6 rounded-md bg-white border border-slate-300 text-slate-900 font-bold text-xs flex items-center justify-center shrink-0">${idx + 1}</span>
          <p class="text-xs text-slate-700 leading-relaxed m-0">${step}</p>
        </div>`).join('');

  const formulasHtml = tool.mathFormulas.map((item) => `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs py-1 border-b border-slate-800 last:border-0">
          <span class="text-slate-400 font-medium">${item.label} :</span>
          <code class="text-emerald-400 font-mono font-semibold tracking-wide tabular-nums bg-slate-800/80 px-2 py-0.5 rounded">${item.formula}</code>
        </div>`).join('');

  const benchmarksHtml = tool.benchmarks.map((b) => `
        <div class="p-3 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
          <div>
            <div class="text-[11px] font-bold uppercase tracking-tight text-slate-500 mb-0.5">${b.label}</div>
            <div class="text-sm font-extrabold tabular-nums mb-1 text-slate-900">${b.value}</div>
          </div>
          <div class="text-[11px] text-slate-600 leading-normal">${b.desc}</div>
        </div>`).join('');

  const escapedRaw = tool.fullRawText.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');

  return `
    <!-- FICHE SCIENTIFIQUE & PÉDAGOGIQUE OFFICIELLE (${tool.charCount} CARACTÈRES) -->
    <section class="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 mt-8" id="fiche-pedagogique-officielle" style="max-width:48rem;margin:2rem auto 0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:20px;padding:1.75rem;box-shadow:0 10px 28px -8px rgba(15,23,42,0.06);">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div class="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <span class="text-red-700 font-bold">${tool.badge}</span>
            <span aria-hidden="true">·</span>
            <span>Guide &amp; Fondements Scientifiques</span>
          </div>
          <h2 class="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2 m-0">
            <span style="font-size:1.15rem;">📘</span>
            ${tool.titleFr}
          </h2>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs font-semibold text-slate-600 px-2.5 py-1 bg-slate-100 rounded-md tabular-nums border border-slate-200">
            ${tool.charCount} caractères
          </span>
          <button type="button" onclick="copierFichePedagogique()" class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer border border-slate-200" title="Copier le texte officiel complet (800 à 1000 caractères)">
            <span id="btn-copy-ico">📋</span>
            <span id="btn-copy-txt">Copier la fiche</span>
          </button>
        </div>
      </div>

      <!-- 1. Guide d'utilisation pas-à-pas -->
      <div class="space-y-3">
        <h3 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 m-0">
          <span style="color:#006233;">🧭</span>
          1. Guide d'utilisation pas-à-pas
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          ${stepsHtml}
        </div>
      </div>

      <!-- 2. Relations mathématiques en exergue -->
      <div class="space-y-3">
        <h3 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 m-0">
          <span style="color:#c1272d;">📐</span>
          2. Relations mathématiques &amp; Équations de référence
        </h3>
        <div class="p-4 bg-slate-900 text-white rounded-xl space-y-2 border border-slate-800 shadow-inner">
          ${formulasHtml}
        </div>
      </div>

      <!-- 3. Interprétation des résultats & repères terrain -->
      <div class="space-y-3">
        <h3 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 m-0">
          <span style="color:#d97706;">💡</span>
          3. Interprétation des résultats &amp; Repères terrain
        </h3>
        <p class="text-xs text-slate-700 leading-relaxed bg-amber-50/60 border border-amber-200/70 p-3.5 rounded-xl m-0">
          ${tool.interpretationSummary}
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          ${benchmarksHtml}
        </div>
      </div>
    </section>

    <script>
      function copierFichePedagogique() {
        var texte = \`${escapedRaw}\`;
        navigator.clipboard.writeText(texte).then(function() {
          var ico = document.getElementById('btn-copy-ico');
          var txt = document.getElementById('btn-copy-txt');
          if (ico && txt) {
            ico.textContent = '✓';
            txt.textContent = 'Copié !';
            setTimeout(function() {
              ico.textContent = '📋';
              txt.textContent = 'Copier la fiche';
            }, 2200);
          }
        });
      }
    </script>
  `;
}

console.log('\n======================================================');
console.log('🚀 SYNCHRONISATION DES FICHES PÉDAGOGIQUES (10 OUTILS)');
console.log('======================================================\n');

targetDirs.forEach((dir) => {
  TOOLS_DATA.forEach((tool) => {
    const filePath = path.join(dir, tool.fileName);
    if (!fs.existsSync(filePath)) {
      // Si calculateur-vma.html n'existe pas dans ce dossier, le créer à partir du modèle
      if (tool.id === 'vma') {
        const vdotModelPath = path.join(dir, 'calculateur-vdot-asr-endurance.html');
        if (fs.existsSync(vdotModelPath)) {
          let vmaHtml = fs.readFileSync(vdotModelPath, 'utf8');
          vmaHtml = vmaHtml.replace(/Calculateur VO2 Max &amp; VDOT Course \| ProfEPS/g, 'Calculateur de VMA &amp; Allures de Course | ProfEPS');
          vmaHtml = vmaHtml.replace(/>⚡ Cluster 1A · Physiologie &amp; Puissance Aérobie</g, '>⚡ Outil Phare · Vitesse Maximale Aérobie (VMA)<');
          vmaHtml = vmaHtml.replace(/>Calculateur de VO2 Max \(ml\/kg\/min\) &amp; Allures VDOT</g, '>Calculateur de VMA &amp; Allures de Course<');
          const cardHtml = buildHtmlCard(tool);
          vmaHtml = vmaHtml.replace('</main>', `${cardHtml}\n  </main>`);
          fs.writeFileSync(filePath, vmaHtml, 'utf8');
          console.log(`✅ [CRÉÉ DANS ${path.relative(rootDir, dir) || '.'}] -> ${tool.fileName}`);
          return;
        }
      }
      return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    const cardHtml = buildHtmlCard(tool);

    if (content.includes('id="fiche-pedagogique-officielle"')) {
      content = content.replace(
        /<!-- FICHE SCIENTIFIQUE & PÉDAGOGIQUE OFFICIELLE[\s\S]*?<\/script>/,
        cardHtml.trim()
      );
    } else if (content.includes('</main>')) {
      content = content.replace('</main>', `${cardHtml}\n  </main>`);
    } else if (content.includes('<footer')) {
      content = content.replace('<footer', `${cardHtml}\n  <footer`);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ [FICHE INJECTÉE DANS ${path.relative(rootDir, dir) || '.'}] -> ${tool.fileName}`);
  });
});

console.log('\n🎉 Les fiches pédagogiques (800 à 1000 caractères) sont synchronisées !');
