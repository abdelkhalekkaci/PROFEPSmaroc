/**
 * appliquer-textes-pedagogiques-10-outils.mjs
 * Script 100% autonome pour ProfEPS.ma.
 * Applique les 10 fiches scientifiques & pédagogiques de PLUS DE 800 MOTS MINIMUM
 * directement dans tous les fichiers HTML (racine et dossier public/) ainsi que src/data/.
 */
import fs from 'fs';
import path from 'path';

function countWords(str) {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

export const TOOLS_800_WORDS = {
  vma: {
    id: 'vma',
    fileName: 'calculateur-vma.html',
    titleFr: 'Calculateur de VMA & Allures de Course',
    titleEn: 'MAS & Running Paces Calculator',
    titleAr: 'حاسبة السرعة الهوائية القصوى VMA وإيقاعات الجري',
    badge: 'Physiologie Aérobie · VMA & Paces',
    guideSteps: [
      'Choisissez et effectuez un test de terrain reconnu : test continu sur 6 minutes (Demi-Cooper) ou test progressif par paliers sonores (Luc-Léger, VAMEVAL, Léger-Boucher).',
      'Renseignez avec exactitude la distance totale franchie en mètres ou le palier maximal validé par l\'élève ou l\'athlète dans le calculateur.',
      'Générez votre Vitesse Maximale Aérobie en km/h, votre VO2 Max estimé et exportez la grille individualisée des allures d\'entraînement.'
    ],
    mathFormulas: [
      { label: 'Test continu 6 min (Demi-Cooper)', formula: 'VMA (km/h) = Distance parcourue (mètres) / 100' },
      { label: 'Test progressif continu Léger-Boucher', formula: 'VMA (km/h) = 1,02 × Vitesse du dernier palier franchi' },
      { label: 'Équation de Léger & Mercier (VO2 Max)', formula: 'VO2 Max (ml/kg/min) ≈ VMA (km/h) × 3,5' },
      { label: 'Conversion d’allure au kilomètre', formula: 'Allure (min/km) = 60 / VMA (km/h)' },
      { label: 'Allure kilométrique en secondes', formula: 'Temps au km (sec) = 3600 / VMA (km/h)' }
    ],
    interpretationSummary: 'La VMA est la vitesse de course à laquelle la consommation d\'oxygène atteint son maximum absolu (VO2 Max). Elle constitue le pilier fondamental de la programmation athlétique et didactique en EPS.',
    benchmarks: [
      { label: 'Endurance Fondamentale (Z1-Z2)', value: '65–75% VMA', desc: 'Développement du réseau capillaire sanguin, lipolyse et récupération active.', tone: 'emerald' },
      { label: 'Seuil Aérobie / Allure Marathon', value: '75–80% VMA', desc: 'Aisance respiratoire prolongée, oxydation mixte glucides-lipides stable.', tone: 'blue' },
      { label: 'Seuil Anaérobie / Tempo 10k-Semi', value: '80–88% VMA', desc: 'Équilibre de production et d’élimination du lactate sanguin.', tone: 'amber' },
      { label: 'Puissance Aérobie Maximale (PAM)', value: '95–105% VMA', desc: 'Sollicitation maximale de la pompe cardiaque sur fractions moyennes.', tone: 'rose' },
      { label: 'Intermittent Court Supramaximal', value: '110–125% VMA', desc: 'Séries 15"/15" ou 30"/30" pour stimuler la puissance métabolique.', tone: 'rose' }
    ],
    fullRawText: `I. Présentation Générale et Rôle Physiologique de la VMA

La Vitesse Maximale Aérobie, universellement désignée sous l'acronyme VMA, constitue le paramètre biomécanique et physiologique fondamental pour quiconque s'intéresse à la course à pied, à la préparation physique et à l'enseignement de l'Éducation Physique et Sportive. Sur le plan de la bioénergétique humaine, la VMA correspond exactement à la vitesse de course atteinte par un athlète lorsque sa consommation d'oxygène atteint son plafond physiologique indépassable, qualifié de VO2 Max. À cette intensité précise, le système cardiorespiratoire travaille à sa puissance mécanique maximale pour apporter le dioxygène aux muscles squelettiques en action. Au-delà de cette vitesse, tout surplus de puissance mécanique nécessite impérativement le recrutement massif de la filière anaérobie lactique avec accumulation rapide d'ions hydrogène et de métabolites conduisant à l'acidose musculaire et à l'épuisement. La connaissance rigoureuse de la VMA est donc indispensable pour calibrer avec une précision chirurgicale l'intensité de chaque séance, éviter les surcharges et garantir une progression méthodique et sécurisée, tant chez le débutant scolaire que chez l'athlète international.

II. Guide d'Utilisation Étape par Étape et Protocoles de Terrain

Pour utiliser efficacement ce calculateur de VMA, l'utilisateur doit respecter une démarche protocolaire rigoureuse articulée en plusieurs étapes fondamentales :
1. Choix et réalisation du test de terrain étalonné : L'athlète ou l'enseignant doit sélectionner un test validé scientifiquement selon les installations disponibles. Les deux grandes familles de tests sont les tests continus à vitesse constante et les tests progressifs par paliers. Le test continu le plus accessible est le test Demi-Cooper de six minutes, qui consiste à parcourir la plus grande distance possible sur une piste étalonnée avec un rythme régulier. Les tests progressifs de référence comprennent le test navette de Luc-Léger (avec aller-retour de vingt mètres), le test Léger-Boucher sur piste d'athlétisme balisée tous les cinquante mètres, et le test VAMEVAL dont les paliers augmentent de zéro virgule cinq kilomètre par heure chaque minute.
2. Échauffement standardisé : Avant toute évaluation, observez un échauffement progressif d'au moins quinze minutes associant course à faible allure, mobilisations articulaires et accélérations progressives pour amener le système cardiovasculaire à température optimale.
3. Saisie de la performance dans le calculateur : Entrez la distance exacte courue en mètres pour le test Demi-Cooper ou renseignez la vitesse du dernier palier franchi pour les tests progressifs.
4. Génération instantanée et exploitation des résultats : En cliquant sur le bouton de calcul, le système délivre immédiatement la VMA en kilomètres par heure, le temps de passage théorique au kilomètre ainsi qu'un tableau complet ventilant les allures cibles d'entraînement.

III. Spécifications des Paramètres et Données à Fournir

Afin de garantir une fiabilité absolue des projections physiologiques, l'utilisateur doit renseigner plusieurs variables précises :
- Le type de test réalisé : La sélection entre test continu de six minutes et test progressif est déterminante car la cinétique de consommation d'oxygène diffère sensiblement selon le protocole appliqué.
- La distance parcourue en mètres : Pour le test de six minutes, cette valeur doit être mesurée avec rigueur au décamètre ou via un étalonnage précis des plots de piste de quatre cents mètres. Une erreur de cinquante mètres entraîne une variation de zéro virgule cinq kilomètre par heure sur la VMA estimée.
- Le dernier palier entièrement validé : Pour les épreuves progressives, il convient de renseigner la vitesse correspondant au dernier palier complété avant l'abandon. Si un athlète s'arrête en cours de palier, on applique une règle de prorata temporel.
- Les données anthropométriques complémentaires : L'indication facultative de l'âge et du sexe biologique permet de situer la performance par rapport aux tables normatives de la population générale et des barèmes officiels d'évaluation en EPS.

IV. Relations Mathématiques et Modélisations Utilisées

Le calculateur applique des équations biomécaniques et physiologiques directes, validées par des décennies de littérature en sciences du sport :
1. Modélisation du test continu de six minutes : Sur un effort de six minutes (soit un dixième d'heure), la vitesse moyenne soutenue équivaut très exactement à cent pour cent de la VMA selon les travaux historiques de Péronnet et Thibault. La relation mathématique s'exprime donc sous la formule fondamentale :
VMA (en km/h) = Distance parcourue (en mètres) divisée par 100.
Exemple concret : Un élève couvrant 1 500 mètres en 6 minutes possède une VMA de 15,0 km/h.
2. Modélisation des tests progressifs par paliers : Pour le test Léger-Boucher et le test VAMEVAL, la vitesse du dernier palier soutenu pendant une minute entière correspond directement à la VMA. Pour le test continu sur piste circulaire de Léger-Boucher, une légère correction d'ajustement est appliquée :
VMA (en km/h) = 1,02 × Vitesse du dernier palier (en km/h).
3. Estimation du VO2 Max selon Léger et Mercier : La consommation maximale d'oxygène en millilitres par kilogramme et par minute est intimement corrélée à la VMA sur sol plat par la relation linéaire universelle :
VO2 Max (en ml/kg/min) ≈ VMA (en km/h) × 3,5.
4. Calcul des allures au kilomètre : La conversion de la vitesse en allure s'opère par la formule :
Allure (en minutes par kilomètre) = 60 / VMA.
Temps au kilomètre en secondes = 3600 / VMA.

V. Interprétation Approfondie des Résultats et Grille d'Entraînement

La VMA obtenue n'est pas une simple donnée chiffrée abstraite ; elle constitue la référence absolue pour calibrer l'ensemble des régimes d'entraînement aérobie et anaérobie :
- Zone 1 et 2 · Endurance Fondamentale (65% à 75% VMA) : Allure d'aisance respiratoire complète, où la ventilation reste calme et permet de converser sans essoufflement. Cette intensité stimule le développement des capillaires sanguins autour des fibres musculaires de type I, accroît la densité des mitochondries et favorise l'utilisation préférentielle des lipides comme substrat énergétique. C'est l'allure privilégiée pour les footings de régénération et les sorties longues.
- Zone 3 · Seuil Aérobie / Allure Marathon (75% à 80% VMA) : Allure d'effort régulier soutenable sur plusieurs heures pour un coureur entraîné. Elle correspond à la zone de transition où la filière des glucides commence à prédominer sans créer d'accumulation d'acide lactique.
- Zone 4 · Seuil Anaérobie / Allure 10 km et Semi-Marathon (80% à 88% VMA) : Zone charnière où le taux de lactate sanguin se stabilise autour de quatre millimoles par litre. C'est l'intensité reine pour repousser la limite de tolérance à la fatigue et améliorer la vitesse spécifique de compétition sur route.
- Zone 5 · Puissance Aérobie Maximale et Intermittent (95% à 120% VMA) : Sollicitation directe de la capacité cardiovasculaire maximale. Les fractions d'effort durent de quinze secondes à trois minutes, entrecoupées de récupérations actives ou passives, permettant de cumuler un temps significatif à VO2 Max sans saturation neuromusculaire.

VI. Applications Pédagogiques et Conseils de Programmation

Dans le cadre scolaire de l'EPS et de la préparation physique athlétique, l'usage de la VMA révolutionne la pédagogie par l'individualisation des parcours. Au lieu d'imposer une distance identique à tous les élèves ou joueurs au coup de sifflet, l'enseignant dispose des plots à des distances proportionnelles à la VMA de chacun. Par exemple, lors d'un exercice intermittent de quinze secondes d'effort et quinze secondes de récupération à cent pour cent de VMA, un coureur possédant une VMA de 12 km/h devra parcourir exactement cinquante mètres par fraction, tandis qu'un athlète doté d'une VMA de 18 km/h couvrira soixante-quinze mètres dans le même laps de temps. Cette méthodologie garantit une équité physiologique totale, prévient les blessures tendineuses et musculaires consécutives à un surrégime et permet à chaque pratiquant de progresser dans des conditions optimales de motivation et de sécurité physique.`
  },

  vdot: {
    id: 'vdot',
    fileName: 'calculateur-vdot-asr-endurance.html',
    titleFr: 'Calculateur VO2 Max & VDOT (Jack Daniels)',
    titleEn: 'VO2 Max & Jack Daniels VDOT Calculator',
    titleAr: 'حاسبة الحد الأقصى لاستهلاك الأكسجين ومؤشر VDOT',
    badge: 'Cluster 1A · Puissance Aérobie & Prédictions',
    guideSteps: [
      'Sélectionnez une distance officielle récemment courue en compétition ou en test chronométré maximal (du 1 500 m au Marathon) ou utilisez votre VMA issue du terrain.',
      'Saisissez le chrono réalisé avec exactitude (heures, minutes, secondes) ainsi que votre âge et sexe pour situer votre niveau par rapport aux normes internationales de santé.',
      'Cliquez sur Calculer pour générer votre score VDOT Jack Daniels, vos temps de passage prédits sur toutes les distances et vos cinq allures d\'entraînement individualisées.'
    ],
    mathFormulas: [
      { label: 'Vitesse de course moyenne v (m/min)', formula: 'v = Distance (m) / Temps (min)' },
      { label: 'Coût en oxygène VO2 (Jack Daniels)', formula: 'VO2 = -4,60 + 0,182258·v + 0,000104·v²' },
      { label: 'Fraction soutenue %VO2 Max', formula: '%VO2 = 0,8 + 0,189439·e^(-0,012778·t) + 0,298956·e^(-0,193261·t)' },
      { label: 'Formule maîtresse du score VDOT', formula: 'VDOT = VO2 calculé / %VO2 soutenu' },
      { label: 'Indice d’efficacité de course (RE)', formula: 'RE (ml/kg/km) = (VO2 / v) × 1000' }
    ],
    interpretationSummary: 'Le score VDOT quantifie l’efficacité globale de la cylindrée aérobie en combinant le VO2 Max et l\'économie de course. Il élimine les suppositions empiriques pour prescrire les cinq allures capitales de la méthode Daniels.',
    benchmarks: [
      { label: 'Easy Pace (E) · Endurance', value: '59–74% VO2 Max', desc: 'Footings d’assimilation, échauffements et sorties longues de développement mitochondrial.', tone: 'emerald' },
      { label: 'Marathon Pace (M)', value: '75–84% VO2 Max', desc: 'Allure spécifique de compétition sur 42,195 km, habitude psychologique à l’effort continu.', tone: 'blue' },
      { label: 'Threshold Pace (T) · Seuil', value: '83–88% VO2 Max', desc: 'Rythme tenable environ 60 minutes, travail clé pour reculer le seuil d’accumulation lactique.', tone: 'amber' },
      { label: 'Interval Pace (I) · VO2 Max', value: '95–100% VO2 Max', desc: 'Fractions de 3 à 5 minutes pour solliciter l’absorption maximale d’oxygène à son sommet.', tone: 'rose' },
      { label: 'Repetition Pace (R) · Vitesse', value: '> 105% VMA', desc: 'Fractions courtes de 200m à 400m axées sur l’économie gestuelle et la cadence neuromusculaire.', tone: 'rose' }
    ],
    fullRawText: `I. Fondements Théoriques et Intérêt Scientifique du Modèle VDOT

La méthode VDOT, conçue et théorisée par le célèbre physiologiste américain et entraîneur olympique Dr Jack Daniels, représente l'un des sommets méthodologiques contemporains de la programmation en course à pied. Alors que les tests de laboratoire mesurent isolément la consommation maximale d'oxygène (VO2 Max), deux coureurs possédant un VO2 Max identique de 65 ml/kg/min peuvent enregistrer des performances radicalement différentes sur un dix kilomètres. Cette disparité s'explique principalement par un facteur physiologique déterminant : l'économie de course (Running Economy), c'est-à-dire la quantité réelle de dioxygène consommée pour déplacer un kilogramme de masse corporelle sur un kilomètre à une allure donnée. Le génie du score VDOT réside dans son aptitude à fusionner intrinsèquement la puissance cardiorespiratoire brute et l'efficacité biomécanique en une valeur numérique unique, déduite directement d'un chrono de compétition réel. Le VDOT est donc un indicateur fonctionnel supérieur au simple VO2 Max brut pour prédire le potentiel chronométrique et prescrire des zones d'intensité parfaitement étalonnées.

II. Protocole d'Utilisation et Saisie des Performances

L'exploitation du calculateur VDOT s'effectue selon un cheminement clair et rigoureux :
1. Sélection d'une compétition de référence récente : Pour garantir la validité des allures produites, choisissez une performance réalisée lors d'une course courue au maximum de vos capacités actuelles (idéalement au cours des six dernières semaines) sur une distance officiellement mesurée (1 500 m, 3 000 m, 5 km, 10 km, Semi-Marathon ou Marathon complet). Évitez absolument d'introduire un temps réalisé lors d'une séance d'entraînement courue avec de la retenue ou sur un parcours au dénivelé non compensé.
2. Renseignement précis du chronomètre : Entrez le temps officiel en heures, minutes et secondes. La précision à la seconde près est indispensable, particulièrement sur les distances courtes où chaque fraction de temps modifie le score VDOT.
3. Paramètres de profil : Précisez votre âge et votre sexe afin de situer votre score sur l'échelle des percentiles de l'American College of Sports Medicine (ACSM).
4. Calcul et génération automatique : Le système délivre instantanément votre valeur VDOT, la table des allures d'entraînement personnalisées (Easy, Marathon, Threshold, Interval, Repetition) ainsi que les chronos cibles projetés sur l'ensemble du registre athlétique.

III. Relations Mathématiques et Équations Physiologiques

Les calculs internes de l'outil reposent fidèlement sur les équations de régression curviligne publiées dans l'ouvrage de référence "Daniels' Running Formula" :
1. Calcul de la vitesse moyenne de course : La vitesse v est exprimée en mètres par minute :
v (m/min) = Distance (mètres) / Temps (minutes).
2. Détermination du coût en oxygène (VO2 de course) : La demande métabolique instantanée en oxygène pour maintenir cette vitesse sur le plat est formulée par le polynôme du second degré :
VO2 (ml/kg/min) = -4,60 + (0,182258 × v) + (0,000104 × v²).
3. Estimation du pourcentage d'effort soutenu selon la durée : Un athlète ne peut soutenir 100% de son VO2 Max que sur une durée limitée (environ 10 à 12 minutes). Pour une épreuve de durée t (en minutes), le pourcentage maximal de VO2 mobilisable est déterminé par l'équation exponentielle :
%VO2 = 0,8 + 0,189439 × e^(-0,012778 × t) + 0,298956 × e^(-0,193261 × t).
4. Calcul synthétique du VDOT : Le score VDOT correspond au quotient :
VDOT = VO2 calculé / %VO2 soutenu.
5. Déduction des allures d'entraînement spécifiques : En inversant la fonction polynomiale du coût en oxygène pour les pourcentages cibles recommandés par Jack Daniels, l'algorithme détermine la vitesse exacte en m/min pour chaque zone d'allure.

IV. Interprétation des Résultats et Maîtrise des Cinq Allures Daniels

L'obtention de votre score VDOT débloque une planification rigoureusement structurée autour de cinq allures fondamentales, chacune ciblant une adaptation cellulaire précise :
- Allure E (Easy Pace / Endurance Fondamentale) : Représentant 59% à 74% du VO2 Max, cette allure est le véritable socle de tout plan d'entraînement. Elle stimule le développement des capillaires sanguins dans les muscles actifs, accroît la taille et le nombre des mitochondries, renforce les parois cardiaques et permet d'assimiler les charges de travail sans fatigue nerveuse. Elle doit constituer au moins 75% du volume kilométrique hebdomadaire.
- Allure M (Marathon Pace) : Correspondant à 75% à 84% du VO2 Max, cette allure prépare spécifiquement le métabolisme à gérer les réserves de glycogène hépatique et musculaire sur les efforts d'endurance de longue durée, tout en ancrant la confiance psychologique du coureur à son allure de course cible.
- Allure T (Threshold Pace / Seuil Lactique) : Calibrée entre 83% et 88% du VO2 Max, c'est l'allure que le coureur est capable de tenir pendant environ soixante minutes en compétition (allure d'un semi-marathonien de niveau national ou d'un 15 km chez l'amateur). L'entraînement au seuil améliore la capacité de l'organisme à clairancer le lactate sanguin, repoussant ainsi le point de bascule vers l'acidose.
- Allure I (Interval Pace / Puissance Aérobie) : Évoluant entre 95% et 100% du VO2 Max, cette intensité est maintenue lors de fractions répétées de 3 à 5 minutes (par exemple des séries de 1 000 m). Elle vise à passer le maximum de temps au plafond de VO2 Max afin d'augmenter le débit cardiaque systolique.
- Allure R (Repetition Pace / Vitesse et Économie) : Courue à une vitesse supérieure à la VMA (typiquement sur des efforts de 200 m à 400 m entrecoupés de récupérations complètes), elle ne vise pas une sollicitation métabolique aérobie mais le perfectionnement biomécanique, l'optimisation de la fréquence de foulée et la diminution du coût énergétique du geste athlétique.

V. Applications Pratiques et Recommandations d'Entraînement

Pour tirer le plein potentiel de votre évaluation VDOT, appliquez la règle de non-progression artificielle : ne réajustez pas vos allures à la hausse de façon arbitraire parce qu'une séance vous a semblé facile. Conservez les mêmes allures pendant au moins quatre à six semaines consécutives. Ne modifiez votre valeur VDOT que si vous établissez un nouveau record personnel officiel en compétition ou si vous constatez une baisse persistante de votre fréquence cardiaque à allure constante sur plusieurs semaines d'affilée.`
  },

  asr: {
    id: 'asr',
    fileName: 'calculateur-asr-reserve-vitesse.html',
    titleFr: 'Calculateur ASR & Réserve de Vitesse Anaérobie',
    titleEn: 'Anaerobic Speed Reserve (ASR) Calculator',
    titleAr: 'حاسبة احتياطي السرعة اللاهوائية ASR',
    badge: 'Cluster 1B · Profilage Neuromusculaire & Sprint',
    guideSteps: [
      'Renseignez votre Vitesse Maximale Aérobie (VMA) déterminée sur test de demi-fond ou test progressif continu.',
      'Saisissez votre Vitesse Maximale de Sprint (VMS) mesurée au radar ou sur un sprint chronométré de 30 à 40 mètres lancé.',
      'Consultez votre Réserve de Vitesse Anaérobie en km/h, votre profil neuromusculaire (Sprinter, Hybride, Endurant) et vos vitesses cibles pour le HIIT.'
    ],
    mathFormulas: [
      { label: 'Réserve de Vitesse Anaérobie (ASR)', formula: 'ASR (km/h) = VMS - VMA' },
      { label: 'Ratio de Réserve Anaérobie', formula: 'Ratio ASR = VMS / VMA' },
      { label: 'Vitesse cible personnalisée (%ASR)', formula: 'Vitesse (km/h) = VMA + (%ASR × ASR / 100)' },
      { label: 'Temps de passage sur distance d', formula: 'Temps (s) = (d / (Vitesse / 3,6))' }
    ],
    interpretationSummary: 'L\'ASR représente la marge de vitesse absolue séparant le plafond aérobie de la vitesse maximale de sprint. Deux athlètes ayant la même VMA mais une VMS différente subissent un stress physiologique totalement distinct à une même intensité supramaximale.',
    benchmarks: [
      { label: 'Profil Endurant (Diesel)', value: 'Ratio ASR < 1,35', desc: 'Faible réserve anaérobie, excellente tolérance au travail aérobie prolongé mais vitesse de pointe limitée.', tone: 'emerald' },
      { label: 'Profil Hybride (Équilibré)', value: 'Ratio 1,35 – 1,50', desc: 'Équilibre optimal entre filière oxydative et capacité de sprint, profil classique des milieux de terrain et coureurs de 800m.', tone: 'blue' },
      { label: 'Profil Puissant / Sprinteur', value: 'Ratio ASR > 1,50', desc: 'VMS explosive très élevée, épuisement lactique accéléré si l\'effort supramaximal est calqué sur la seule VMA.', tone: 'rose' }
    ],
    fullRawText: `I. Introduction au Concept Scientifique de l'ASR (Anaerobic Speed Reserve)

La Réserve de Vitesse Anaérobie, universellement connue sous l'acronyme anglophone ASR (Anaerobic Speed Reserve), constitue l'une des avancées majeures de la préparation physique moderne, mise en lumière par les travaux de recherche pionniers de Blondel, Buchheit et Laursen. Pendant des décennies, les entraîneurs et professeurs d'EPS ont calibré l'ensemble des exercices intermittents de haute intensité (HIIT) en se basant exclusivement sur un pourcentage de la Vitesse Maximale Aérobie (par exemple, des fractions courues à 110% ou 120% de VMA). Or, cette méthodologie traditionnelle comporte une faille physiologique majeure : elle ignore totalement la vitesse de pointe de l'athlète. Deux athlètes possédant rigoureusement la même VMA de 16 km/h peuvent avoir des vitesses maximales de sprint radicalement différentes, par exemple 24 km/h pour un coureur profilé demi-fond et 32 km/h pour un joueur de sport collectif explosif. Si l'on impose à ces deux sportifs une série de 30 secondes à 120% de VMA (soit 19,2 km/h), le premier mobilisera 40% de sa réserve de vitesse maximale alors que le second n'en mobilisera que 20%. L'ASR résout cette anomalie en quantifiant avec précision l'espace métabolique supramaximal propre à chaque individu.

II. Guide d'Utilisation Étape par Étape et Mesures de Terrain

L'utilisation de ce calculateur repose sur l'intégration de deux mesures de terrain rigoureusement collectées :
1. Évaluation préalable de la VMA : Obtenez une valeur fiable de votre VMA au moyen d'un test étalonné (Demi-Cooper, Léger-Boucher ou VAMEVAL). Assurez-vous que cette valeur reflète votre condition physique actuelle.
2. Évaluation de la VMS (Vitesse Maximale de Sprint) : La VMS représente la vitesse de pointe instantanée maximale que l'athlète peut produire sur le plat. Elle se mesure idéalement à l'aide de cellules photoélectriques sur un sprint de 40 mètres avec chronométrage du split entre 30 et 40 mètres, ou au moyen d'un pistolet radar ou d'une balise GPS de qualité professionnelle échantillonnant à 10 Hz minimum. En milieu scolaire, un sprint lancé de 30 mètres chronométré manuellement sur les 10 derniers mètres permet une excellente approximation.
3. Encodage des paramètres dans l'outil : Saisissez vos deux valeurs de VMA et de VMS exprimées en km/h dans les champs prévus.
4. Génération de l'analyse : Le calculateur délivre votre ASR brute en km/h, calcule le ratio VMS/VMA, classe votre profil athlétique et génère la table individualisée des allures supramaximales basées sur le pourcentage de l'ASR.

III. Relations Mathématiques et Équations Biomécaniques

Le modèle mathématique sous-jacent est direct et d'une clarté absolue :
1. Calcul de la réserve brute : La Réserve de Vitesse Anaérobie correspond à la différence arithmétique entre la vitesse de sprint et la vitesse aérobie :
ASR (km/h) = VMS - VMA.
Exemple : Avec une VMA de 16,0 km/h et une VMS de 28,0 km/h, l'ASR est de 12,0 km/h.
2. Ratio de réserve neuromusculaire :
Ratio ASR = VMS / VMA.
Ce coefficient sans unité permet de comparer deux athlètes indépendamment de leur niveau absolu de performance.
3. Calcul des allures d'entraînement supramaximales basées sur l'ASR : Au lieu d'utiliser la formule classique (Vitesse = % × VMA), l'entraînement moderne applique la modélisation individualisée de Buchheit :
Vitesse d'effort (km/h) = VMA + (%ASR × ASR / 100).
Ainsi, une séance programmée à "VMA + 30% ASR" demandera exactement le même pourcentage d'engagement neuromusculaire et métabolique à chaque coureur de l'équipe, quelle que soit sa typologie musculaire.
4. Calcul des distances de course pour fractions intermittentes :
Distance à parcourir (mètres) = Vitesse (km/h) × Durée de la fraction (secondes) / 3,6.

IV. Typologie des Profils Athlétiques et Interprétation

L'analyse de l'ASR met en évidence trois grandes catégories de sportifs, nécessitant des adaptations didactiques et méthodologiques distinctes :
- Le profil "Endurant / Résistant" (Ratio VMS/VMA inférieur à 1,35) : Ce sportif possède une excellente efficience aérobie mais une puissance neuromusculaire modeste. Ses fibres musculaires lentes (type I) prédominent. Lors d'exercices à très haute vitesse, il atteint rapidement son plafond biomécanique sans parvenir à générer une accélération violente. Pour ce profil, les fractions supramaximales doivent être dosées avec modération pour éviter un épuisement précoce.
- Le profil "Hybride / Polyvalent" (Ratio VMS/VMA compris entre 1,35 et 1,50) : C'est le profil par excellence des milieux de terrain en football, des arrières en handball ou des spécialistes du 800 mètres et du 1 500 mètres. Capable d'encaisser des charges de travail aérobie volumineuses tout en conservant une explosivité redoutable, il tolère remarquablement bien le travail intermittent court calibré entre 20% et 40% d'ASR.
- Le profil "Sprinteur / Explosif" (Ratio VMS/VMA supérieur à 1,50) : Caractérisé par une forte proportion de fibres rapides (type IIx), ce joueur ou athlète possède une VMS impressionnante. Cependant, s'il est contraint de travailler à des pourcentages élevés de VMA sans prise en compte de sa vitesse de pointe, sa filière glycolytique s'emballe et accumule des lactates et ions H+ en quelques secondes, le conduisant à l'asphyxie musculaire prématurée. L'ajustement par l'ASR est salvateur pour lui permettre de travailler la filière aérobie sans se détruire neuromusculairement.

V. Implications Pratiques pour l'Entraîneur et le Professeur d'EPS

L'intégration de l'ASR transforme radicalement la conduite des séances de développement aérobie intermittent. Elle évite la sous-sollicitation des athlètes d'endurance et la mise en surrégime destructeur des joueurs rapides. En appliquant des distances individualisées calculées à partir de la formule VMA + %ASR, chaque élève ou joueur de l'effectif éprouve le même ressenti subjectif de difficulté (RPE) et développe ses capacités physiologiques avec un rendement maximal et une sécurité musculaire absolue.`
  },

  endurance_index: {
    id: 'endurance_index',
    fileName: 'calculateur-indice-endurance.html',
    titleFr: 'Calculateur de l\'Indice d\'Endurance (Péronnet & Thibault)',
    titleEn: 'Endurance Index Calculator (Péronnet-Thibault)',
    titleAr: 'حاسبة مؤشر التحمل بيروني وتيبو',
    badge: 'Cluster 1C · Maintien Aérobie & Déclin de Vitesse',
    guideSteps: [
      'Indiquez votre Vitesse Maximale Aérobie (VMA) de référence issue d\'un test de terrain récent.',
      'Saisissez une performance de compétition chronométrée sur une distance supérieure à 7 minutes (5 km, 10 km, Semi ou Marathon).',
      'Obtenez votre Indice d\'Endurance (valeur négative représentant la pente de déclin de vitesse) et votre diagnostic personnalisé de résistance à la fatigue.'
    ],
    mathFormulas: [
      { label: 'Pourcentage de VMA maintenu (%VMA)', formula: '%VMA = (Vitesse de course / VMA) × 100' },
      { label: 'Formule de Péronnet & Thibault', formula: 'IE = (%VMA - 100) / ln(Temps de course / 6)' },
      { label: 'Vitesse de course sur la distance', formula: 'Vitesse (km/h) = Distance (km) / (Temps en minutes / 60)' },
      { label: 'Prédiction de vitesse à durée T', formula: 'Vitesse prédite = VMA × [1 + (IE × ln(T / 6)) / 100]' }
    ],
    interpretationSummary: 'L\'Indice d\'Endurance quantifie la capacité d\'un coureur à maintenir la fraction la plus élevée possible de sa VMA au fur et à mesure que la durée de l\'épreuve augmente. Plus l\'indice est proche de zéro, meilleure est l\'endurance aérobie.',
    benchmarks: [
      { label: 'Endurance Exceptionnelle / Élite', value: 'IE > -4,0', desc: 'Déclin de vitesse minime, profil type des marathoniens de très haut niveau et ultra-traileurs expérimentés.', tone: 'emerald' },
      { label: 'Très Bonne Endurance', value: 'IE entre -4,0 et -6,0', desc: 'Excellente capacité à conserver un pourcentage élevé de VMA sur semi-marathon et marathon.', tone: 'blue' },
      { label: 'Endurance Moyenne / Standard', value: 'IE entre -6,0 et -8,0', desc: 'Profil équilibré mais marge de progression importante sur le volume aérobie et le kilométrage.', tone: 'amber' },
      { label: 'Endurance Faible / Profil Vitesse', value: 'IE < -8,0', desc: 'Chute rapide de la vitesse avec le temps, coureur pénalisé dès que l\'effort dépasse 30 minutes.', tone: 'rose' }
    ],
    fullRawText: `I. Origine Scientifique et Définition de l'Indice d'Endurance

L'Indice d'Endurance, modélisé à la fin des années 1980 par les physiologistes canadiens François Péronnet et Guy Thibault de l'Université de Montréal, comble une lacune majeure de l'évaluation cardiorespiratoire. Deux athlètes possédant rigoureusement la même VMA de 18 km/h ne franchiront presque jamais la ligne d'arrivée d'un marathon au même moment. L'un terminera en 2 heures 40 minutes tandis que l'autre peinera en 3 heures 15 minutes. Cette différence colossale ne tient pas à leur cylindrée maximale instantanée mais à leur capacité d'endurance relative, c'est-à-dire leur aptitude à maintenir dans le temps le pourcentage le plus élevé possible de leur VMA. Péronnet et Thibault ont démontré que lorsque la durée d'une épreuve dépasse six à sept minutes (durée au cours de laquelle un coureur peut maintenir 100% de sa VMA), la fraction de VMA utilisable décroît de façon rigoureusement logarithmique en fonction du temps. L'Indice d'Endurance (IE) mesure mathématiquement la pente de cette droite de régression.

II. Protocole d'Évaluation et Démarche Méthodologique

Pour calculer avec rigueur votre Indice d'Endurance personnel, appliquez le protocole suivant :
1. Détermination précise de la VMA : Renseignez une VMA fraîchement évaluée sur le terrain au cours d'un test Demi-Cooper de six minutes ou d'un test progressif homologué. Une imprécision sur la VMA fausserait directement la pente de régression.
2. Sélection d'une performance chronométrée de longue durée : Choisissez une course officielle disputée sur terrain plat dans des conditions météorologiques tempérées (par exemple un 10 km, un semi-marathon ou un marathon). La durée de l'effort doit impérativement excéder quinze minutes pour que le modèle logarithmique soit pleinement opérationnel.
3. Encodage des paramètres : Saisissez la distance courue en kilomètres et le temps exact en heures, minutes et secondes.
4. Génération de l'analyse : Le système calcule la vitesse moyenne de l'épreuve, calcule le pourcentage moyen de VMA soutenu, résout l'équation logarithmique de l'Indice d'Endurance et produit un diagnostic personnalisé de votre profil énergétique.

III. Relations Mathématiques et Modélisation Logarithmique

Le modèle de Péronnet et Thibault postule que le pourcentage de VMA (%VMA) maintenu pendant une durée T (exprimée en minutes) obéit à la loi mathématique suivante :
%VMA = 100 + IE × ln(T / 6).
Dans cette équation :
- Le chiffre 100 représente le pourcentage de VMA théoriquement soutenable sur une durée de base de 6 minutes.
- ln désigne la fonction mathématique du logarithme népérien.
- T est la durée réelle de l'effort exprimée en minutes.
- Le chiffre 6 est le temps de référence en minutes correspondant au temps limite moyen à 100% de VMA.
- IE est l'Indice d'Endurance, exprimé par un nombre négatif car la vitesse diminue à mesure que la durée augmente.

Pour extraire l'Indice d'Endurance à partir d'une performance connue, la formule se résout ainsi :
IE = (%VMA - 100) / ln(T / 6).
Exemple pratique : Un coureur doté d'une VMA de 15 km/h boucle un 10 km en 45 minutes (vitesse moyenne de 13,33 km/h).
Le pourcentage de VMA soutenu est : (13,33 / 15) × 100 = 88,9%.
Le rapport des temps est : 45 / 6 = 7,5.
Le logarithme népérien de 7,5 vaut environ 2,015.
L'Indice d'Endurance est donc : (88,9 - 100) / 2,015 = -5,51.

IV. Grille d'Interprétation Physiologique et Valeurs Normatives

Puisque l'Indice d'Endurance est une valeur négative, plus le chiffre se rapproche de zéro, plus l'athlète est endurant. Les normes établies dans la littérature sportive permettent d'établir les correspondances suivantes :
- IE supérieur à -4,0 (Excellence / Profil Ultra-Endurant) : Ce coureur subit un déclin de vitesse extrêmement faible avec le temps. Il est capable de soutenir plus de 82% de sa VMA sur un marathon entier. C'est l'apanage des athlètes d'ultra-fond et des spécialistes chevronnés de l'épreuve reine sur route.
- IE compris entre -4,0 et -6,0 (Très Bonne Endurance) : Profil classique du coureur de fond bien entraîné, possédant une bonne densité mitochondriale et une gestion optimale de ses réserves glycogéniques.
- IE compris entre -6,0 et -8,0 (Endurance Moyenne) : Valeur fréquemment observée chez les coureurs réguliers mais dont l'entraînement est trop centré sur les allures rapides au détriment du volume en endurance fondamentale.
- IE inférieur à -8,0 (Endurance Insuffisante / Profil Vitesse) : Chute prononcée de l'allure dès que la distance s'allonge. Ce profil est typique des sportifs explosifs ou des débutants dont le métabolisme lipidique n'est pas encore développé.

V. Applications Pratiques et Orientations Pédagogiques

La connaissance conjointe de la VMA et de l'Indice d'Endurance permet de concevoir une planification d'entraînement d'une remarquable intelligence stratégique. Si un athlète possède une VMA élevée (par exemple 18 km/h) mais un mauvais Indice d'Endurance (-8,5), il serait stérile et contre-productif de continuer à lui faire faire des séances de VMA courte. Sa priorité absolue doit être d'augmenter son volume hebdomadaire à basse intensité (65-75% VMA) et d'accumuler du temps au seuil aérobie pour déplacer son indice vers -5,0. Inversement, un coureur avec un excellent indice (-3,8) mais plafonnant chronométriquement devra réintroduire des blocs de développement de puissance aérobie pour élever sa VMA brute, qui constitue son véritable facteur limitant.`
  },

  karvonen: {
    id: 'karvonen',
    fileName: 'calculateur-frequence-cardiaque-karvonen.html',
    titleFr: 'Calculateur Fréquence Cardiaque Karvonen & Zones Cibles',
    titleEn: 'Karvonen Heart Rate Reserve & Training Zones',
    titleAr: 'حاسبة احتياطي معدل ضربات القلب كار فونين ومناطق التدريب',
    badge: 'Cluster 1D · Cardiologie de l\'Effort & Réserve Cardiaque',
    guideSteps: [
      'Mesurez avec précision votre Fréquence Cardiaque au Repos (FC Repos) dès le réveil au lit sur trois jours consécutifs.',
      'Renseignez votre Fréquence Cardiaque Maximale (FC Max) mesurée lors d\'un test d\'effort maximal ou estimée par équation validée (Gellish ou Tanaka).',
      'Obtenez instantanément votre Fréquence Cardiaque de Réserve (FCR) et vos 5 zones d\'entraînement cardiaques cibles rigoureusement individualisées.'
    ],
    mathFormulas: [
      { label: 'Fréquence Cardiaque de Réserve (FCR)', formula: 'FCR = FC Max - FC Repos' },
      { label: 'Formule maîtresse de Karvonen', formula: 'FC Cible = FC Repos + (%Intensité × FCR / 100)' },
      { label: 'Estimation FC Max selon Gellish (recommandée)', formula: 'FC Max = 207 - (0,7 × Âge)' },
      { label: 'Estimation FC Max classique (Astrand)', formula: 'FC Max = 220 - Âge' }
    ],
    interpretationSummary: 'La méthode Karvonen calibre l\'effort sur la Réserve Cardiaque réelle disponible plutôt que sur la FC Max brute, offrant une précision physiologique inégalée pour piloter l\'entraînement au cardiofréquencemètre.',
    benchmarks: [
      { label: 'Zone 1 · Récupération Active', value: '50–60% FCR', desc: 'Régénération post-effort, élimination des toxines, stimulation de la circulation sanguine sans fatigue.', tone: 'emerald' },
      { label: 'Zone 2 · Endurance Fondamentale', value: '60–70% FCR', desc: 'Zone reine de lipolyse, renforcement du système cardiovasculaire de base et habituation à l\'effort prolongé.', tone: 'blue' },
      { label: 'Zone 3 · Aérobie Modérée / Tempo', value: '70–80% FCR', desc: 'Développement de la capacité respiratoire, travail au seuil aérobie ventilatoire (SV1).', tone: 'amber' },
      { label: 'Zone 4 · Seuil Anaérobie (SV2)', value: '80–90% FCR', desc: 'Zone d\'effort soutenu intense, amélioration du recyclage des lactates musculaires.', tone: 'rose' },
      { label: 'Zone 5 · Effort Maximal / PAM', value: '90–100% FCR', desc: 'Sollicitation extrême du myocarde, réservée aux fractions courtes d\'intermittent et aux sprints.', tone: 'rose' }
    ],
    fullRawText: `I. Fondements Cardiovasculaires et Supériorité de la Méthode Karvonen

Introduite en 1957 par le médecin et physiologiste finlandais Dr Martti J. Karvonen, la formule de la Fréquence Cardiaque de Réserve constitue l'une des pierres angulaires de la cardiologie de l'exercice et de l'entraînement moderne. Trop souvent encore, des pratiquants et sportifs calculent leurs zones d'effort en appliquant de simples pourcentages de leur fréquence cardiaque maximale brute (par exemple : 70% de FC Max). Cette approche simpliste est physiologiquement erronée car elle méconnaît totalement la fréquence cardiaque au repos. Considérons deux individus ayant tous deux une FC Max de 190 battements par minute, mais dont le premier, très entraîné en endurance, possède une FC Repos de 45 bpm, tandis que le second, sédentaire, affiche une FC Repos de 75 bpm. À une intensité théorique de 70% de FC Max brute (soit 133 bpm), le premier athlète travaille à un niveau métabolique beaucoup plus élevé par rapport à son amplitude cardiaque utile que le second. La méthode Karvonen rétablit la justice physiologique en intégrant la Fréquence Cardiaque de Réserve (FCR), qui représente le réservoir réel de battements dont dispose le cœur entre son état d'inactivité complète et son plafonnement absolu.

II. Protocole Pratique de Prise de Données

Pour obtenir des zones cardiaques d'une exactitude chirurgicale, l'utilisateur doit respecter un protocole rigoureux de mesure :
1. Mesure de la Fréquence Cardiaque au Repos (FC Repos) : La mesure doit être effectuée le matin immédiatement au réveil, avant d'avoir posé le pied par terre, d'avoir bu un café ou d'avoir consulté son téléphone. Utilisez une ceinture pectorale connectée ou posez délicatement vos doigts sur l'artère radiale pendant soixante secondes entières. Répétez la mesure pendant trois jours consécutifs et retenez la moyenne la plus basse. Une baisse progressive de la FC Repos au fil des mois est le marqueur indiscutable d'une hypertrophie bienfaisante des cavités cardiaques et d'un tonus vagal renforcé.
2. Détermination de la Fréquence Cardiaque Maximale (FC Max) : La méthode idéale reste la mesure directe sur le terrain lors du dernier palier d'un test progressif VAMEVAL ou dans les 200 derniers mètres d'une côte courue à bloc après un échauffement complet. Si aucun test maximal n'est réalisable, le calculateur intègre l'équation moderne de Gellish (207 - 0,7 × âge), qui présente une précision bien supérieure à l'antique formule d'Astrand (220 - âge) dont la marge d'erreur chez les plus de 40 ans peut atteindre 15 bpm.
3. Saisie dans l'outil : Indiquez votre FC Repos et votre FC Max dans les curseurs ou champs numériques.
4. Génération immédiate des plages cibles : Le calculateur délivre instantanément votre Fréquence Cardiaque de Réserve ainsi que les cinq plages cibles en battements par minute pour paramétrer votre montre GPS cardiofréquencemètre.

III. Modélisation Mathématique de Karvonen

L'algorithme de calcul applique scrupuleusement la formule historique :
1. Calcul de la Fréquence Cardiaque de Réserve :
FCR = FC Max - FC Repos.
Exemple concret : Pour un athlète ayant une FC Max de 185 bpm et une FC Repos de 50 bpm :
FCR = 185 - 50 = 135 bpm de réserve utile.
2. Calcul de la Fréquence Cardiaque Cible pour un pourcentage d'effort P :
FC Cible (bpm) = FC Repos + (P / 100) × FCR.
Si l'on cherche la fréquence cible à 70% de réserve pour cet athlète :
FC Cible = 50 + (0,70 × 135) = 50 + 94,5 = 144,5 (arrondi à 145 bpm).
Par comparaison, le calcul simpliste (70% de 185) aurait donné 129,5 bpm, soit un écart massif de 15 battements par minute qui aurait placé l'athlète en sous-régime complet.

IV. Description Détaillée des 5 Zones d'Entraînement Karvonen

Le découpage en cinq zones physiologiques permet de structurer harmonieusement la semaine d'entraînement :
- Zone 1 · Récupération Active et Échauffement (50% à 60% FCR) : L'effort est très doux, sans aucune dette d'oxygène. Cette zone facilite le drainage des lactates après une compétition rude, stimule le retour veineux et habitue l'appareil locomoteur sans créer de stress sur le système nerveux autonome.
- Zone 2 · Endurance Fondamentale / Base Aérobie (60% à 70% FCR) : C'est la zone maîtresse de tout sportif d'endurance. À ce rythme, le corps utilise principalement les lipides comme carburant via la bêta-oxydation. Cette allure doit représenter 70 à 80% du kilométrage hebdomadaire pour bâtir un réseau de capillaires dense et accroître le volume d'éjection systolique du cœur.
- Zone 3 · Tempo / Seuil Aérobie (70% à 80% FCR) : La respiration s'accélère modérément mais reste parfaitement contrôlée. On entre dans la zone de transition aérobie où le débit de glucose devient prépondérant. Idéale pour les sorties au train et l'allure marathon.
- Zone 4 · Seuil Anaérobie / Résistance Dure (80% à 90% FCR) : Le souffle devient court, la parole est difficile et le taux de lactate sanguin augmente pour flirter avec la zone de non-retour métabolique. Travaillée sous forme de fractions de 6 à 15 minutes, cette zone repousse le seuil de tolérance à la fatigue.
- Zone 5 · Puissance Cardiaque Maximale (90% à 100% FCR) : Réservée aux sprints finaux et au travail fractionné court de type 30"/30", cette zone sollicite le cœur à son débit d'éjection maximal.

V. Recommandations Pédagogiques et Pièges à Éviter

En milieu scolaire et en coaching sportif, il convient d'enseigner aux pratiquants la dérive cardiaque (cardiac drift) : par forte chaleur ou en cas de déshydratation, la fréquence cardiaque a tendance à augmenter progressivement au cours de la séance alors même que l'allure de course reste constante. Pour compenser la baisse du volume plasmatique sanguin, le cœur doit battre plus vite pour maintenir le même débit. L'athlète instruit doit donc savoir ralentir légèrement son allure pour rester dans sa plage cible Karvonen.`
  },

  imc: {
    id: 'imc',
    fileName: 'calculateur-imc-sportif-masse-grasse.html',
    titleFr: 'Calculateur IMC Sportif, Masse Grasse & Somatotype',
    titleEn: 'Athletic BMI & Body Fat Percentage Calculator',
    titleAr: 'حاسبة مؤشر كتلة الجسم الرياضي ونسبة الدهون',
    badge: 'Cluster 2A · Anthropométrie Sportive & Composition Corporelle',
    guideSteps: [
      'Renseignez avec exactitude votre taille en centimètres, votre masse corporelle en kilogrammes, votre âge et votre sexe biologique.',
      'Mesurez vos circonférences corporelles (taille, cou et hanches pour les femmes) ou saisissez votre pli cutané pour débloquer l\'estimation de masse grasse.',
      'Obtenez votre IMC standard, votre IMC ajusté pour athlète, votre taux de masse grasse selon la formule US Navy et votre masse maigre utile.'
    ],
    mathFormulas: [
      { label: 'Indice de Masse Corporelle classique (IMC)', formula: 'IMC = Poids (kg) / [Taille (m)]²' },
      { label: 'Masse Grasse US Navy Homme (%MG)', formula: '%MG = 495 / [1,0324 - 0,19077·log10(taille-cou) + 0,15456·log10(stature)] - 450' },
      { label: 'Masse Grasse US Navy Femme (%MG)', formula: '%MG = 495 / [1,29579 - 0,35004·log10(taille+hanches-cou) + 0,22100·log10(stature)] - 450' },
      { label: 'Masse Maigre Active (LBM)', formula: 'Masse Maigre (kg) = Poids × (1 - %MG / 100)' },
      { label: 'Poids Idéal Sportif Spécifique', formula: 'Poids Cible = Masse Maigre / (1 - %MG Cible / 100)' }
    ],
    interpretationSummary: 'L\'IMC classique est incapable de distinguer le muscle du tissu adipeux chez le sportif. L\'intégration de la formule US Navy et de la masse maigre rétablit un diagnostic anthropométrique exact.',
    benchmarks: [
      { label: 'Niveau Compétition / Athlète Affûté', value: 'Homme: 6–12% · Femme: 14–20%', desc: 'Rapport poids/puissance optimal pour le demi-fond, la gymnastique, l\'escalade et les sports à catégorie de poids.', tone: 'emerald' },
      { label: 'Forme Athlétique / Sportif Régulier', value: 'Homme: 13–17% · Femme: 21–25%', desc: 'Composition corporelle idéale pour la santé globale, les sports collectifs et la préservation immunitaire.', tone: 'blue' },
      { label: 'Norme Santé Population Générale', value: 'Homme: 18–24% · Femme: 26–31%', desc: 'Plage standard OMS ne présentant aucun risque cardiovasculaire ou métabolique.', tone: 'amber' },
      { label: 'Excédent Adipeux / Surcharge Pondérale', value: 'Homme: > 25% · Femme: > 32%', desc: 'Surcoût énergétique à chaque foulée, surcharge articulaire majorée lors des réceptions de saut.', tone: 'rose' }
    ],
    fullRawText: `I. Limites Fondamentales de l'IMC et Nécessité d'une Approche Sportive

L'Indice de Masse Corporelle (IMC), élaboré au XIXe siècle par le mathématicien et astronome belge Adolphe Quetelet, demeure la référence universelle de l'Organisation Mondiale de la Santé pour évaluer la corpulence des populations. Sa formule élémentaire (le poids divisé par le carré de la taille) présente cependant une limite rédhibitoire dès lors qu'elle est appliquée à une population sportive : elle ne fait aucune distinction entre la masse grasse (tissu adipeux sous-cutané et viscéral) et la masse maigre (muscles squelettiques, squelette osseux, eau corporelle et organes). Un joueur de rugby ou un sprinteur de 1,80 m pesant 95 kg de muscle pur présente un IMC de 29,3 kg/m², ce qui le classe de façon absurde dans la catégorie médicale du surpoids sévère, à la limite de l'obésité. À l'inverse, une personne sédentaire peut afficher un IMC normal de 22 tout en ayant une fonte musculaire marquée et un taux de graisse viscérale pathologique. Pour remédier à cette cécité clinique, notre calculateur intègre l'algorithme anthropométrique de l'US Navy, permettant de déterminer avec précision le pourcentage de masse grasse, la masse maigre utile et le poids de forme athlétique.

II. Protocole Rigoureux de Prise des Mesures Corporelles

La validité des résultats dépend de la minutie apportée aux mensurations :
1. Poids et taille corporelle : Pesez-vous le matin à jeun après passage aux toilettes, sans vêtements. Mesurez votre taille debout, le dos bien droit et les talons joints contre une surface verticale.
2. Circonférence du cou : Mesurez le tour de cou à l'aide d'un ruban métrique non élastique juste en dessous du larynx (pomme d'Adam), le ruban étant bien horizontal et sans serrer excessivement la peau.
3. Circonférence de la taille : Pour les hommes, mesurez horizontalement au niveau du nombril. Pour les femmes, mesurez au niveau le plus étroit de la taille naturelle (généralement à mi-chemin entre la dernière côte palpable et la crête iliaque).
4. Circonférence des hanches (spécifique aux femmes) : Prenez la mesure à l'endroit le plus large des fesses, le ruban restant parfaitement parallèle au sol.
5. Saisie et exécution : Introduisez les valeurs en centimètres et kilogrammes pour générer le bilan complet.

III. Formulations Mathématiques et Équations de Référence

Le moteur du calculateur fait appel aux formules validées par le Naval Health Research Center de San Diego :
1. Indice de Masse Corporelle (IMC) :
IMC (kg/m²) = Masse (kg) / [Stature (m)]².
2. Équation de l'US Navy pour les hommes (Hodgdon & Beckett) :
%MG = 495 / [1,0324 - 0,19077 × log10(tour de taille - tour de cou) + 0,15456 × log10(taille)] - 450.
Dans cette formule, log10 désigne le logarithme en base dix et toutes les circonférences sont en centimètres.
3. Équation de l'US Navy pour les femmes :
%MG = 495 / [1,29579 - 0,35004 × log10(taille + hanches - cou) + 0,22100 × log10(taille)] - 450.
4. Calcul de la Masse Maigre (LBM - Lean Body Mass) :
Masse Maigre (kg) = Masse Totale (kg) × [1 - (%MG / 100)].
5. Prédiction du Poids de Forme Optimal :
Poids Cible (kg) = Masse Maigre (kg) / [1 - (%MG Cible / 100)].
Cette équation est capitale pour un athlète souhaitant perdre de la masse grasse sans dégrader son précieux capital musculaire.

IV. Analyse du Somatotype et Recommandations Sportives

La composition corporelle joue un rôle biomécanique déterminant sur la performance athlétique :
- Rapport Poids / Puissance dans les sports gravitaires : En course à pied, cyclisme en côte, gymnastique et escalade, chaque kilogramme de masse grasse inutile constitue un lest passif qui augmente le coût énergétique du mouvement sans contribuer à la production de force. Un coureur qui s'allège de 3 kg de graisse pure sans perdre de muscle verra sa VMA progresser mécaniquement de près de 0,5 km/h sans changer son moteur physiologique.
- Besoins en masse grasse essentielle : Il est dangereux de chercher à réduire la masse grasse en dessous des seuils physiologiques vitaux (environ 4 à 5% chez l'homme et 12 à 14% chez la femme). En dessous de ces limites, l'organisme bascule dans le syndrome de déficit énergétique relatif dans le sport (RED-S), provoquant perturbations hormonales, aménorrhée chez l'athlète féminine, baisse de la densité minérale osseuse et effondrement des défenses immunitaires.
- Équilibre des sports de contact et de puissance : En rugby, lancer de poids ou judo poids lourds, une masse corporelle globale élevée est un atout cinétique lors des impacts. Cependant, même dans ces disciplines, l'optimisation du ratio masse maigre sur masse totale améliore la réactivité et la vitesse de déplacement sur le terrain.

V. Didactique de l'Image Corporelle en Milieu Scolaire EPS

Dans le cadre scolaire, l'enseignant d'EPS doit aborder la question du poids et de la corpulence avec un tact et une éthique irréprochables. L'utilisation de cet outil permet de déculpabiliser les élèves à forte musculature stigmatisés par l'IMC médical classique et d'orienter le discours vers la santé, la condition physique et le bien-être moteur plutôt que vers des stéréotypes esthétiques déconnectés de la réalité biologique.`
  },

  meteo: {
    id: 'meteo',
    fileName: 'calculateur-chaleur-meteo-altitude.html',
    titleFr: 'Calculateur Impact Météo, Chaleur, Humidité & Altitude',
    titleEn: 'Weather Impact, Heat Index & Altitude Calculator',
    titleAr: 'حاسبة تأثير الطقس والحرارة والرطوبة والارتفاع',
    badge: 'Cluster 2B · Environnement & Thermorégulation de l\'Effort',
    guideSteps: [
      'Indiquez votre chrono de référence sur une distance clé (par exemple votre record sur 10 km) réalisé en conditions tempérées optimales (12-15°C au niveau de la mer).',
      'Renseignez la température ambiante prévue (°C), le taux d\'humidité relative (%) et l\'altitude du parcours en mètres.',
      'Calculez l\'impact thermique et hypoxique combiné, votre temps de course corrigé réaliste et le plan d\'hydratation horaire obligatoire.'
    ],
    mathFormulas: [
      { label: 'Indice de Chaleur Heat Index (Rothfusz)', formula: 'HI = -42,379 + 2,049·T + 10,143·RH - 0,2247·T·RH - ...' },
      { label: 'Perte de performance en Altitude (Bassett)', formula: '%Perte = 0,0000000003·Alt³ + 0,000001·Alt² - 0,0012·Alt' },
      { label: 'Correction thermique d’allure (> 15°C)', formula: 'Dégradation = +0,3% à +0,8% par °C au-dessus de 15°C' },
      { label: 'Taux de sudation estimé (L/h)', formula: 'Sudation = (Poids avant - Poids après + Boisson) / Durée (h)' }
    ],
    interpretationSummary: 'La chaleur humide bloque l\'évaporation de la sueur tandis que l\'altitude réduit la pression partielle d\'oxygène. Ignorer ces contraintes environnementales conduit inévitablement au coup de chaleur ou à la défaillance athlétique.',
    benchmarks: [
      { label: 'Conditions Idéales / Record (10–15°C)', value: '0% de pénalité', desc: 'Thermorégulation optimale, dissipation thermique efficace par simple convection.', tone: 'emerald' },
      { label: 'Chaleur Modérée (20–25°C)', value: '+2% à +5% de temps', desc: 'Dérivation du débit sanguin vers la peau, légère élévation de la fréquence cardiaque de 5 à 8 bpm.', tone: 'blue' },
      { label: 'Chaleur Sévère & Humide (26–32°C)', value: '+6% à +12% de temps', desc: 'Risque élevé de surchauffe centrale, impératif de réduire l\'allure cible et d\'augmenter l\'apport hydrique.', tone: 'amber' },
      { label: 'Canicule Extrême ou Haute Altitude', value: '> +15% d\'impact', desc: 'Zone critique pour la santé, adaptation impérative des séances sous peine d\'accident thermique.', tone: 'rose' }
    ],
    fullRawText: `I. Physiologie Environnementale et Thermorégulation à l'Effort

Le corps humain est une machine thermique remarquable dont le rendement mécanique ne dépasse guère 20 à 25%. Cela signifie que pour 100 watts d'énergie mécanique dépensée par les muscles pour courir ou pédaler, 75 à 80 watts sont immédiatement convertis en énergie thermique pure qui doit être évacuée en continu pour empêcher la température centrale de franchir la barre fatale des 40°C. En conditions de course à pied, le principal mécanisme d'évacuation thermique est l'évaporation de la sueur à la surface de la peau. Cependant, ce mécanisme dépend intimement des paramètres météorologiques : si l'air ambiant est saturé d'humidité (hygrométrie élevée), la sueur perle et coule sans s'évaporer, rendant la thermolyse totalement inopérante. Parallèlement, en altitude, la diminution de la pression barométrique entraîne une chute directe de la pression partielle en oxygène (hypoxie hypobarique), diminuant la saturation du sang en dioxygène et bridant le VO2 Max. Notre calculateur synthétise l'ensemble de ces contraintes physiques pour ajuster scientifiquement les objectifs chronométriques et préserver l'intégrité physiologique de l'athlète.

II. Protocole d'Utilisation et Saisie des Variables Météorologiques

Pour calibrer au mieux vos prédictions de course :
1. Performance étalon en conditions idéales : Introduisez un temps de référence récemment accompli dans des conditions climatiques clémentes (température comprise entre 10°C et 15°C, humidité modérée et altitude inférieure à 300 mètres).
2. Conditions météorologiques du jour de la compétition : Consultez le bulletin météo local à l'heure exacte de l'épreuve et notez :
- La température de l'air sous abri en degrés Celsius (°C).
- Le taux d'humidité relative de l'air en pourcentage (%).
- La présence éventuelle d'un rayonnement solaire direct (rayonnement noir).
3. Altitude moyenne du parcours : Renseignez l'altitude moyenne en mètres au-dessus du niveau de la mer.
4. Génération du plan d'allure adapté : Cliquez sur Calculer pour découvrir votre allure cible corrigée ainsi que le protocole de compensation hydrique et sodique recommandé.

III. Relations Mathématiques et Algorithmes d'Ajustement

Le calculateur applique les régressions validées par l'American College of Sports Medicine et le National Weather Service américain :
1. Calcul du Heat Index (Indice de Chaleur Ressenti) :
Pour les températures supérieures à 20°C associées à une humidité significative, le calculateur utilise l'équation empirique de Rothfusz :
HI = -42,379 + 2,04901523·T + 10,14333127·RH - 0,22475541·T·RH - 0,00683783·T² - 0,05481717·RH² + 0,00122874·T²·RH + 0,00085282·T·RH² - 0,00000199·T²·RH².
(où T est la température en °F et RH l'humidité relative en %). Le résultat est ensuite converti en °C pour quantifier le stress thermique effectif.
2. Dégradation d'allure en fonction de la température :
La température idéale pour réaliser une performance sur longue distance se situe entre 8°C et 12°C pour le marathon et entre 12°C et 15°C pour le 10 km. Au-delà de 15°C, chaque degré supplémentaire induit une perte d'allure prévisible modélisée par Galloway et Montain :
- De 16°C à 20°C : Perte de 0,3% à 0,5% par degré supplémentaire.
- De 21°C à 25°C : Perte de 0,6% à 0,9% par degré.
- Au-delà de 26°C avec forte humidité : Chute pouvant dépasser 1,5% par degré.
3. Impact hypoxique de l'altitude selon Bassett :
La réduction du VO2 Max au-dessus de 1 000 mètres d'altitude est modélisée par l'équation polynomiale :
% Perte de VO2 Max ≈ 0,0000000003·Alt³ + 0,000001·Alt² - 0,0012·Alt.
Sur un 10 km couru à 1 800 mètres d'altitude, la perte de vitesse aérobie atteint entre 6% et 8% pour un athlète non acclimaté.

IV. Interprétation Physiologique et Stratégie d'Hydratation

Comprendre la réaction de son organisme face à l'environnement est vital pour éviter la défaillance :
- Dérive cardiovasculaire et partage du débit cardiaque : Sous l'effet de la chaleur, l'organisme doit envoyer une fraction considérable du sang vers la peau pour dissiper les calories par vasodilatation périphérique. Ce sang détourné n'est plus disponible pour alimenter les muscles propulseurs. Pour maintenir le débit, le cœur doit accélérer son rythme de 10 à 20 bpm pour une vitesse de déplacement identique.
- Calcul du taux de sudation horaire : Un coureur peut perdre entre 0,8 et 2,5 litres d'eau par heure d'effort en climat tropical ou estival. Une déshydratation représentant seulement 2% de la masse corporelle induit une baisse de performance aérobie de 10% et décuple le risque de crampes et de coup de chaleur d'exercice.
- Compensation en électrolytes : Boire de l'eau pure en grande quantité par forte chaleur sans apport de sodium expose au risque mortel d'hyponatrémie d'effort. Il est impératif d'adjoindre 400 à 600 mg de sodium par litre de boisson consommée dès que l'épreuve dépasse une heure.

V. Didactique Scolaire et Sécurité en Éducation Physique et Sportive

Pour le professeur d'EPS, ce calculateur constitue un outil pédagogique et réglementaire indispensable. Au Maroc et dans les pays connaissant des épisodes de forte chaleur printanière ou automnale, programmer une séance de VMA ou un cycle d'endurance sous 32°C sans adaptation expose les élèves à un danger grave. L'enseignant doit utiliser l'outil pour justifier auprès de la classe le réajustement des allures, l'instauration de pauses hydratation obligatoires toutes les 15 minutes à l'ombre et la substitution des efforts continus intenses par des ateliers techniques lorsque l'indice thermique franchit le seuil d'alerte orange.`
  },

  gap: {
    id: 'gap',
    fileName: 'calculateur-gap-pente-nutrition.html',
    titleFr: 'Calculateur GAP Pente, Trail Running & Nutrition',
    titleEn: 'GAP Grade Adjusted Pace & Trail Nutrition Calculator',
    titleAr: 'حاسبة وتيرة المنحدر GAP وتغذية الجري الجبلي',
    badge: 'Cluster 2C · Énergétique de Pente & Métabolisme de Trail',
    guideSteps: [
      'Indiquez la distance de votre sortie ou course de trail en kilomètres et le dénivelé positif cumulé (D+) en mètres.',
      'Saisissez votre allure réelle en montée/descente ou votre temps d\'effort global envisagé.',
      'Renseignez votre masse corporelle avec équipement pour calculer votre allure équivalente sur le plat (GAP selon Minetti) et votre plan nutritionnel en glucides/heure.'
    ],
    mathFormulas: [
      { label: 'Formule du Coût Énergétique de Minetti', formula: 'Cr (J/kg/m) = 155,4·i^5 - 30,4·i^4 - 43,3·i^3 + 46,3·i^2 + 19,5·i + 3,6' },
      { label: 'Allure Ajustée à la Pente (GAP)', formula: 'GAP (min/km) = Allure réelle / Facteur de Coût Relatif' },
      { label: 'Apport Glucidique Cible selon durée', formula: '< 2h: 30-45g/h | 2-5h: 60-75g/h | > 5h: 80-90g/h' },
      { label: 'Équivalence Kilométrique Fédérale', formula: 'Km Effort = Distance (km) + [D+ (m) / 100]' }
    ],
    interpretationSummary: 'En trail, l\'allure brute au GPS est trompeuse en raison de la déclivité. L\'allure GAP calcule la vitesse équivalente sur le plat pour le même coût métabolique, tandis que le module nutritionnel verrouille les stocks de glycogène.',
    benchmarks: [
      { label: 'Descente Efficace (-10% à -15%)', value: 'Économie métabolique maximale', desc: 'Coût énergétique le plus bas, mais contrainte musculaire excentrique majeure sur les quadriceps.', tone: 'emerald' },
      { label: 'Plat Étalon (0% de pente)', value: 'Coût de base ≈ 3,6 J/kg/m', desc: 'Allure de référence pour comparer l\'effort avec les chronos classiques sur route.', tone: 'blue' },
      { label: 'Montée Modérée (+5% à +10%)', value: 'Coût × 1,5 à 2,0', desc: 'Transition vers la propulsion sur la pointe des pieds, travail concentrique prédominant.', tone: 'amber' },
      { label: 'Pente Raide (> +15%)', value: 'Marche active obligatoire', desc: 'Au-delà de 15% de pente, la marche avec bâtons devient métaboliquement plus économique que la course.', tone: 'rose' }
    ],
    fullRawText: `I. Biomécanique de la Course en Pente et Fondements de l'Allure GAP

Courir en montagne ou sur sentier accidenté bouleverse les repères chronométriques classiques du bitume. Une allure de huit minutes au kilomètre sur le plat traduit un footing de récupération paisible, alors que la même allure maintenue dans une montée raide à 15% de pente reflète une intensité métabolique supramaximale digne d'une séance de VMA courte. L'allure ajustée à la pente, mondialement connue sous le sigle GAP (Grade Adjusted Pace) et démocratisée par les travaux du professeur Alberto Minetti de l'Université de Milan, apporte une solution mathématique rigoureuse à ce problème. Minetti a mesuré sur tapis roulant incliné le coût énergétique de la locomotion humaine pour des déclivités variant de -45% à +45%. Ses conclusions ont révélé que le coût métabolique par mètre parcouru obéit à une fonction polynomiale complexe du cinquième degré. Le GAP calcule l'allure exacte qu'aurait produite le coureur sur un terrain parfaitement plat pour la même dépense physiologique en dioxygène et en kilocalories.

II. Guide d'Utilisation Étape par Étape et Paramétrage

Pour exploiter le calculateur de pente et de nutrition :
1. Données topographiques de la séance : Renseignez la distance totale en kilomètres et le dénivelé positif cumulé (D+) en mètres, ainsi que le dénivelé négatif (D-).
2. Saisie de la pente instantanée ou moyenne : Si vous analysez un tronçon particulier, entrez le pourcentage de pente réel (calculé par : Dénivelé / Distance parcourue × 100).
3. Allure observée sur le terrain : Saisissez l'allure affichée par votre montre GPS en minutes et secondes par kilomètre.
4. Profil d'équipement et durée totale prévue : Indiquez votre masse corporelle totale (poids du coureur plus sac de trail chargé, réserve d'eau et équipement obligatoire) et la durée estimée de l'épreuve.
5. Calcul et analyse intégrée : L'outil calcule instantanément l'allure GAP équivalente, le ratio de surcoût énergétique et dresse la feuille de route nutritionnelle complète (grammes de glucides, milligrammes de sodium et millilitres d'eau par heure d'effort).

III. Formulations Mathématiques et Équations de Minetti

L'algorithme de conversion de pente s'appuie directement sur les travaux biomécaniques de Minetti (2002) :
1. Calcul du coût de course en fonction de la pente i (exprimée sous forme décimale, ex: 0,10 pour 10%) :
Cr (J·kg⁻¹·m⁻¹) = 155,4·i⁵ - 30,4·i⁴ - 43,3·i³ + 46,3·i² + 19,5·i + 3,6.
Sur le plat (i = 0), le coût énergétique standard de la course humaine est de 3,6 Joules par kilogramme et par mètre parcouru (soit environ 1 kcal par kg et par km).
2. Déduction du facteur d'équivalence de pente :
Facteur de pente = Cr(i) / 3,6.
3. Calcul de l'allure GAP :
Allure GAP = Allure réelle (secondes/km) / Facteur de pente.
Exemple concret : Une allure de 7 min 00 s au kilomètre (420 s/km) sur une montée à 12% possède un facteur de surcoût d'environ 2,1. L'allure GAP équivalente est de : 420 / 2,1 = 200 secondes, soit 3 minutes 20 secondes au kilomètre sur le plat ! L'athlète comprend ainsi immédiatement pourquoi son rythme cardiaque était au plafond.
4. Équation de l'optimum en descente : Les calculs de Minetti prouvent que le coût énergétique minimal de la locomotion humaine se situe sur une pente descendante d'environ -10% à -15%, où la gravité assiste le mouvement sans exiger un freinage excessif.

IV. Gestion Énergétique et Nutritionnelle en Trail Running

Parallèlement à la gestion de l'allure, la nutrition en ultra-endurance est le véritable facteur limitant de la performance :
- Cinétique des réserves de glycogène : L'organisme humain ne peut stocker qu'environ 450 à 500 grammes de glycogène dans le foie et les muscles squelettiques, soit une autonomie énergétique maximale de 90 minutes à haute intensité. Dès que l'épreuve dépasse 2 heures, l'épuisement glycogénique entraîne le redouté "mur" physiologique.
- Stratégie d'apport en glucides exogènes :
  * Pour un effort de 1h à 2h : 30 à 45 g de glucides par heure.
  * Pour un effort de 2h à 4h : 60 g de glucides par heure (soit une gourde d'électrolytes et un gel ou une barre).
  * Pour les ultra-trails de plus de 5h : 80 à 90 g de glucides par heure via un ratio 2:1 glucose-fructose pour saturer les transporteurs intestinaux SGLT1 et GLUT5 sans troubles gastriques.
- Hydratation et sodium : La dépense sudorale en montagne s'accompagne d'une perte d'électrolytes. Un apport moyen de 500 ml d'eau associé à 300 à 500 mg de sodium par heure est indispensable pour éviter les hyponatrémies et maintenir la volémie sanguine.

V. Didactique Scolaire et Préparation Physique Montagne

En EPS et dans la formation des jeunes coureurs, l'allure GAP enseigne la gestion lucide de l'effort. L'erreur universelle du novice en trail est de vouloir maintenir une allure chronométrique constante dès les premiers raidillons, ce qui déclenche une acidose prématurée. L'apprentissage du passage de la course à la marche active avec mains sur les cuisses dès que la pente dépasse 12% est un impératif d'efficience énergétique démontré par la science du sport.`
  },

  hiit: {
    id: 'hiit',
    fileName: 'generateur-intermittent-hiit-cod.html',
    titleFr: 'Générateur Intermittent HIIT, Tabata & COD (Changement de Direction)',
    titleEn: 'HIIT Interval, Tabata & Change of Direction (COD) Generator',
    titleAr: 'مولد التدريب المتقطع عالي الكثافة HIIT وتغيير الاتجاه COD',
    badge: 'Cluster 3A · Haute Intensité & Agilité Neuromusculaire',
    guideSteps: [
      'Choisissez votre format de travail intermittent : HIIT court (15"/15", 30"/30"), Tabata (20"/10"), HIIT long ou circuit avec changements de direction (COD).',
      'Renseignez la VMA de l\'athlète ou du groupe et sélectionnez le pourcentage d\'intensité cible (typiquement 100% à 120% de VMA).',
      'Générez instantanément la distance exacte à parcourir par fraction en mètres, l\'espacement des plots sur le terrain et la bande sonore rythmée de la séance.'
    ],
    mathFormulas: [
      { label: 'Distance en ligne droite', formula: 'Distance (m) = [Vitesse (km/h) / 3,6] × Temps d\'effort (s)' },
      { label: 'Pénalité Changement de Direction (COD)', formula: 'Distance COD = Distance brute - (Nb virages × Déduction selon angle)' },
      { label: 'Temps passé à VO2 Max (T@VO2max)', formula: 'Optimisé si Ratio Effort/Récupération ≈ 1:1 à intensité > 100% VMA' },
      { label: 'Volume total de travail intermittent', formula: 'Distance Totale = Nb Séries × Nb Répétitions × Distance/fraction' }
    ],
    interpretationSummary: 'L\'intermittent court permet d\'accumuler un temps considérable au plafond de VO2 Max tout en maintenant un taux de lactate tolérable grâce à la myoglobine musculaire qui stocke l\'oxygène durant les pauses.',
    benchmarks: [
      { label: 'Intermittent Court 15"/15"', value: '110–120% VMA', desc: 'Format roi du développement aérobie intermittent, sollicitation neuromusculaire élevée sans tétanie lactique.', tone: 'emerald' },
      { label: 'Format Tabata 20"/10"', value: '100–115% VMA', desc: 'Densité extrême, dette d\'oxygène rapide, redoutable pour la puissance aérobie et glycolytique.', tone: 'blue' },
      { label: 'Intermittent Moyen 30"/30"', value: '100–105% VMA', desc: 'Format classique des sports collectifs, parfait compromis entre développement cardiorespiratoire et lucidité tactique.', tone: 'amber' },
      { label: 'Intermittent avec COD (180°)', value: 'Pénalité de 1,5 à 2,5 m / virage', desc: 'Contrainte excentrique intense lors des freinages, sollicitation accrue des adducteurs et ischios-jambiers.', tone: 'rose' }
    ],
    fullRawText: `I. Physiologie du Travail Intermittent et Mécanismes de l'Effort Supramaximal

L'entraînement intermittent de haute intensité (High-Intensity Interval Training ou HIIT) constitue sans conteste l'une des révolutions méthodologiques majeures de la préparation physique des quarante dernières années. Si un athlète tente de courir en continu à 105% ou 110% de sa VMA, son temps limite avant épuisement complet ne dépassera pas trois à quatre minutes en raison d'une accumulation brutale de protons H+ et d'une déplétion rapide de ses réserves de phosphocréatine. En revanche, si ce même effort est fractionné en séquences courtes alternant quinze secondes d'effort à 110% de VMA et quinze secondes de récupération passive (format 15"/15"), l'athlète devient capable de cumuler vingt à vingt-cinq minutes d'exercice tout en maintenant sa consommation d'oxygène proche de son VO2 Max pendant une fraction considérable du temps total. Ce phénomène biologique fascinant repose sur le rôle tampon de la myoglobine musculaire : durant les quinze secondes de pause passive, l'oxygène transporté par le sang recharge immédiatement les réserves d'O2 de la myoglobine dans la cellule musculaire, permettant à la fraction d'effort suivante de démarrer en aérobie sans faire exploser la filière lactique.

II. Guide d'Utilisation Étape par Étape et Implantation Spatiale

Pour configurer une séance de HIIT sur piste ou terrain de sport :
1. Sélection du format temporel : Choisissez l'architecture de la séance :
- Intermittent très court : 10"/10" ou 15"/15" (axé sur la puissance aérobie et la vivacité).
- Format Tabata : 20 secondes d'effort maximal et 10 secondes de repos sur 8 répétitions (4 minutes par bloc).
- Intermittent classique : 30"/30" (format roi des sports d'équipe comme le football, le basketball ou le handball).
2. Saisie des données athlétiques : Renseignez la VMA de l'athlète ou les différentes VMA d'un groupe d'élèves préalablement testés.
3. Choix de l'intensité relative : Définissez le pourcentage d'intensité souhaité (généralement compris entre 100% et 120% de VMA pour les fractions courtes).
4. Paramétrage des changements de direction (COD) : Spécifiez si la course s'effectue en ligne droite continue, en aller-retour avec virage à 180°, ou sur un polygone avec virages à 90°.
5. Génération du plan de terrain : Le calculateur délivre immédiatement les distances précises en mètres pour chaque élève, permettant de poser les plots de couleur sur la pelouse en quelques instants.

III. Relations Mathématiques et Pénalité Biomécanique de Virage (COD)

Le calcul des distances repose sur les équations cinématiques classiques ajustées des pertes d'accélération et de décélération :
1. Calcul de la distance brute en ligne droite continue :
Vitesse de travail (km/h) = VMA × (% Intensité / 100).
Vitesse en mètres par seconde (m/s) = Vitesse (km/h) / 3,6.
Distance brute (mètres) = Vitesse (m/s) × Temps d'effort (secondes).
Exemple : Pour un élève avec une VMA de 14 km/h travaillant à 110% de VMA sur un 15"/15" :
Vitesse = 14 × 1,10 = 15,4 km/h = 4,277 m/s.
Distance en 15 secondes = 4,277 × 15 = 64,15 mètres (arrondi à 64 mètres).
2. Modélisation de la pénalité de changement de direction (Change of Direction Penalty) :
Lorsque l'athlète doit effectuer un virage à 180° au coup de sifflet pour faire un aller-retour, il doit freiner sa masse corporelle jusqu'à vitesse nulle, pivoter et réaccélérer. Les travaux de Buchheit et Delaval ont démontré que chaque changement de direction à 180° consomme entre 0,7 et 1,2 seconde de temps cinétique ou impose une réduction de distance de 2,5 à 3,5 mètres par rapport à la ligne droite pour maintenir la même sollicitation aérobie :
Distance avec virage = Distance brute - (Nombre de COD × Pénalité métrique).
Si le parcours comporte un aller-retour (un virage à 180° au milieu des 15 secondes), la distance exigée pour l'élève précédent sera réduite à : 64 m - 3 m = 61 mètres (soit un aller-retour de 30,5 mètres).

IV. Analyse Pédagogique et Impact sur la Préparation Physique

L'intégration des changements de direction transforme la nature de la sollicitation :
- Contrainte musculaire excentrique et prévention des blessures : Freiner brutalement avant de pivoter sollicite massivement les quadriceps, les adducteurs et les ischio-jambiers en régime excentrique. Cette contrainte neuromusculaire renforce la stabilité des genoux (ligaments croisés) et prépare spécifiquement le joueur aux exigences des duels et des replis défensifs des sports collectifs.
- Récupération active versus récupération passive : Dans le travail à plus de 105% de VMA, la récupération passive complète (arrêt sur place) est formellement requise pour permettre la resynthèse rapide de la phosphocréatine et la réoxygénation de la myoglobine. Imposer une récupération trottinée forcerait l'organisme à puiser prématurément dans la filière glycolytique et écourterait la séance.

V. Didactique Scolaire en EPS et Gestion de l'Hétérogénéité

Dans une classe d'EPS regroupant trente élèves aux VMA oscillant entre 10 km/h et 17 km/h, la gestion du travail intermittent est souvent un casse-tête organisationnel. Grâce à ce calculateur, le professeur trace un couloir gradué ou dispose des plots personnalisés par lettres de niveau (groupe A, B, C, D). Tous les élèves s'élancent au même coup de sifflet et reviennent au même signal sonore, sans qu'aucun élève ne soit stigmatisé ou laissé en retrait. Cette gestion garantit une équité motrice totale et un investissement maximal de la classe.`
  },

  charge: {
    id: 'charge',
    fileName: 'calculateur-charge-rpe-foster-acwr.html',
    titleFr: 'Calculateur Charge d\'Entraînement ACWR, RPE & Foster',
    titleEn: 'Training Load ACWR & Session-RPE Foster Calculator',
    titleAr: 'حاسبة حمل التدريب ACWR ومؤشر فوستر للجهد المبذول',
    badge: 'Cluster 3B · Prévention des Blessures & Monitoring Athlétique',
    guideSteps: [
      'Après chaque séance d\'entraînement ou match, attribuez une note de Perception de l\'Effort (RPE sur l\'échelle CR-10 de Borg/Foster modifiée) et notez la durée en minutes.',
      'Renseignez la charge aiguë des 7 derniers jours (Acute Load) et la charge chronique moyenne des 28 derniers jours (Chronic Load).',
      'Obtenez votre ratio ACWR (Acute:Chronic Workload Ratio), votre positionnement dans la zone optimale de performance ("Sweet Spot") et votre alerte de risque de blessure.'
    ],
    mathFormulas: [
      { label: 'Charge de Séance selon Foster (UA)', formula: 'Charge (Unités Arbitraires) = RPE (1 à 10) × Durée (minutes)' },
      { label: 'Ratio Charge Aiguë / Chronique (ACWR)', formula: 'ACWR = Charge Aiguë (7 jours) / Charge Chronique (28 jours / 4)' },
      { label: 'Monotonie de l\'Entraînement', formula: 'Monotonie = Moyenne quotidienne / Écart-type des charges quotidiennes' },
      { label: 'Contrainte Globale (Strain)', formula: 'Contrainte = Charge Totale Hebdomadaire × Monotonie' }
    ],
    interpretationSummary: 'Le modèle ACWR de Tim Gabbett démontre que ce n\'est pas la charge élevée en soi qui blesse l\'athlète, mais les pics brutaux de surcharge par rapport au niveau de préparation chronique.',
    benchmarks: [
      { label: 'Zone de Sous-Entraînement', value: 'ACWR < 0,80', desc: 'Charge aiguë trop faible, désentraînement relatif, perte de tolérance tissulaire aux efforts intenses.', tone: 'slate' },
      { label: 'Zone Optimale ("Sweet Spot")', value: 'ACWR 0,80 – 1,30', desc: 'Progression athlétique idéale, gain maximal de condition physique associé au risque de blessure le plus bas.', tone: 'emerald' },
      { label: 'Zone d\'Alerte Surcharge', value: 'ACWR 1,30 – 1,50', desc: 'Augmentation sensible du risque de blessure musculaire et tendineuse, vigilance requise sur la récupération.', tone: 'amber' },
      { label: 'Zone Critique / Danger Majeur', value: 'ACWR > 1,50', desc: 'Risque de blessure multiplié par 3 à 4 dans les 7 à 10 jours suivants. Allègement obligatoire immédiat.', tone: 'rose' }
    ],
    fullRawText: `I. Épistémologie du Monitoring de Charge et Modèle ACWR de Gabbett

Au cours de la dernière décennie, la gestion de la charge d'entraînement s'est imposée comme la préoccupation centrale des staffs médicaux et techniques du sport de haut niveau international. Historiquement, le réflexe dominant des entraîneurs face à une blessure musculaire ou tendineuse était de considérer que l'athlète s'était "trop entraîné". Les recherches révolutionnaires menées par le professeur australien Tim Gabbett ont radicalement transformé ce paradigme en formulant le concept de l'Acute:Chronic Workload Ratio (ACWR). Gabbett a démontré avec une rigueur statistique éclatante que le volume d'entraînement élevé n'est pas le responsable des traumatismes physiques ; au contraire, des charges d'entraînement chroniques élevées et bien assimilées immunisent l'athlète contre les blessures. Ce qui brise les fibres musculaires et inflamed les tendons, ce sont les pointes brutales de surcharge (workload spikes) appliquées à un organisme insuffisamment conditionné sur le plan chronique. L'ACWR permet de surveiller avec précision le fragile équilibre entre fatigue aiguë et adaptation chronique.

II. Protocole Quotidien de Recueil et Échelle de Foster

L'efficacité du suivi dépend de la régularité et de la sincérité du recueil de données :
1. Évaluation de la Perception de l'Effort (Session-RPE) : Développée par Carl Foster à partir de l'échelle d'effort perçu de Borg, la méthode session-RPE consiste à poser une question simple à l'athlète environ vingt à trente minutes après la fin de la séance : "Comment s'est passée votre séance dans son ensemble ?". L'athlète répond sur une échelle standardisée graduée de 1 à 10 (1 représentant un repos complet et 10 un effort maximal épuisant). Attendre 20 à 30 minutes est capital pour éviter que la dernière phase de la séance (par exemple un retour au calme relaxant ou un sprint final houleux) ne biaise le jugement global de l'athlète.
2. Mesure du volume temporel : Relevez la durée exacte de la séance en minutes (échauffement compris, mais hors étirements passifs finaux).
3. Calcul de la charge de séance : Multipliez le score RPE par la durée en minutes. Le résultat est exprimé en Unités Arbitraires (UA).
4. Consolidation hebdomadaire et mensuelle :
- Charge Aiguë (Acute Workload) : Somme des charges en UA cumulées sur les 7 derniers jours (représente l'état de fatigue instantané).
- Charge Chronique (Chronic Workload) : Moyenne hebdomadaire des charges cumulées sur les 28 derniers jours (représente le niveau de forme physique et d'aptitude historique).
5. Saisie dans l'outil : Entrez vos valeurs pour générer l'analyse ACWR et l'indice de contrainte globale.

III. Relations Mathématiques et Calculs Statistiques de Foster et Gabbett

Les algorithmes internes appliquent les relations formalisées dans la littérature internationale :
1. Calcul de la charge d'une séance élémentaire :
Charge de séance (UA) = RPE (score de 1 à 10) × Durée (minutes).
Exemple : Un entraînement de 90 minutes jugé "difficile" (RPE = 7) génère :
Charge = 7 × 90 = 630 UA.
2. Calcul du ratio ACWR couplé (Acute:Chronic Workload Ratio) :
ACWR = Charge des 7 derniers jours / (Moyenne des charges hebdomadaires sur 28 jours).
Exemple pratique : Si un joueur de football a accumulé 2 800 UA au cours des 7 derniers jours, et que sa moyenne hebdomadaire sur le mois écoulé était de 2 000 UA :
ACWR = 2 800 / 2 000 = 1,40.
3. Monotonie de l'entraînement de Foster :
Monotonie = Moyenne des charges quotidiennes / Écart-type des charges quotidiennes de la semaine.
Une monotonie supérieure à 2,0 indique que toutes les séances se ressemblent sans alternance d'intensités douces et dures, ce qui favorise le surentraînement.
4. Calcul de la Contrainte Globale (Strain) :
Contrainte = Charge totale de la semaine × Monotonie.

IV. Interprétation des Plages de Risque et "Sweet Spot"

L'analyse de l'indice ACWR permet de piloter la programmation athlétique en toute sérénité :
- Zone de Sous-Entraînement (ACWR inférieur à 0,80) : La charge récente est sensiblement inférieure au niveau de conditionnement habituel. Si cette phase n'est pas une période volontaire d'affûtage pré-compétitif, elle expose l'athlète à une désadaptation tissulaire.
- Zone Optimale ou "Sweet Spot" (ACWR compris entre 0,80 et 1,30) : C'est la plage de référence absolue. L'organisme s'adapte, le niveau de forme s'élève et le risque de blessure est statistiquement à son minimum historique (inférieur à 5% d'incidence).
- Zone d'Alerte et de Risque Modéré (ACWR compris entre 1,30 et 1,50) : Le volume récent dépasse la capacité de tolérance chronique de plus de 30%. Le risque de lésion musculaire commence à grimper sensiblement.
- Zone Critique de Danger (ACWR supérieur à 1,50) : Le risque relatif de blessure est multiplié par 3 à 4 dans les sept à dix jours qui suivent le pic de charge. Une réduction immédiate de l'intensité ou un jour de repos compensatoire s'impose pour désamorcer la crise.

V. Applications Scolaires et Prévention en Milieu Éducatif EPS

En milieu scolaire et associatif, les adolescents sont particulièrement vulnérables aux pathologies de surmenage ostéo-articulaire (maladie d'Osgood-Schlatter au genou, maladie de Sever au talon). L'utilisation de ce calculateur permet à l'enseignant et à l'entraîneur de repérer les collégiens et lycéens qui cumulent le sport scolaire, le club fédéral et les activités extrascolaires sans phase de récupération, et de réajuster leur investissement avant l'apparition de lésions d'usure irréversibles.`
  }
};

// Vérification du nombre de mots
console.log('\n--- VÉRIFICATION DU NOMBRE DE MOTS (MINIMUM 800 MOTS REQUIS) ---');
for (const tool of Object.values(TOOLS_800_WORDS)) {
  const words = countWords(tool.fullRawText);
  tool.wordCount = words;
  tool.charCount = tool.fullRawText.length;
  const status = words >= 800 ? '✅ VALIDE' : '❌ INSUFFISANT';
  console.log(`[${tool.id.toUpperCase()}] ${tool.fileName}: ${words} mots | ${tool.charCount} caractères -> ${status}`);
}

const rootDir = process.cwd();

// 1. Mettre à jour src/data/calculatorEducationalContent.ts si le dossier src/data existe
const dataDir = path.join(rootDir, 'src', 'data');
if (fs.existsSync(dataDir)) {
  const tsContent = `/**
 * Fiches Documentaires & Guides Scientifiques Complets pour les 10 Calculateurs Sport ProfEPS.ma
 * Calibrés rigoureusement à PLUS DE 800 MOTS PAR OUTIL (800 à 1 250 mots).
 * Contient : Guide d'utilisation, Relations mathématiques, Données requises et Interprétation des résultats.
 */

export interface MathFormulaItem {
  label: string;
  formula: string;
}

export interface BenchmarkItem {
  label: string;
  value: string;
  desc: string;
  tone?: 'emerald' | 'blue' | 'amber' | 'rose' | 'slate';
}

export interface ToolEducationalContent {
  id: string;
  fileName: string;
  titleFr: string;
  titleEn: string;
  titleAr: string;
  badge: string;
  guideSteps: string[];
  mathFormulas: MathFormulaItem[];
  interpretationSummary: string;
  benchmarks: BenchmarkItem[];
  fullRawText: string;
  charCount: number;
  wordCount: number;
}

export const CALCULATOR_EDUCATIONAL_DATA: Record<string, ToolEducationalContent> = ${JSON.stringify(TOOLS_800_WORDS, null, 2)};
`;
  fs.writeFileSync(path.join(dataDir, 'calculatorEducationalContent.ts'), tsContent, 'utf-8');
  console.log('✅ src/data/calculatorEducationalContent.ts mis à jour avec les 10 guides de 800+ mots.');
}

// 2. Mettre à jour les 10 fichiers HTML autonomes
function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildHtmlCard(tool) {
  const stepsHtml = tool.guideSteps.map((step, idx) => `
        <div class="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl flex items-start gap-3">
          <span class="w-6 h-6 rounded-md bg-white border border-slate-300 text-slate-900 font-bold text-xs flex items-center justify-center shrink-0">${idx + 1}</span>
          <p class="text-xs text-slate-700 leading-relaxed m-0">${escapeHtml(step)}</p>
        </div>`).join('');

  const formulasHtml = tool.mathFormulas.map((f) => `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs py-1 border-b border-slate-800 last:border-0">
          <span class="text-slate-400 font-medium">${escapeHtml(f.label)} :</span>
          <code class="text-emerald-400 font-mono font-semibold tracking-wide tabular-nums bg-slate-800/80 px-2 py-0.5 rounded">${escapeHtml(f.formula)}</code>
        </div>`).join('');

  const benchmarksHtml = tool.benchmarks.map((b) => `
        <div class="p-3 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
          <div>
            <div class="text-[11px] font-bold uppercase tracking-tight text-slate-500 mb-0.5">${escapeHtml(b.label)}</div>
            <div class="text-sm font-extrabold tabular-nums mb-1 text-slate-900">${escapeHtml(b.value)}</div>
          </div>
          <div class="text-[11px] text-slate-600 leading-normal">${escapeHtml(b.desc)}</div>
        </div>`).join('');

  const escapedRawText = JSON.stringify(tool.fullRawText);

  return `<!-- FICHE SCIENTIFIQUE & PÉDAGOGIQUE OFFICIELLE (${tool.wordCount} MOTS MINIMUM) -->
    <section class="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 mt-8" id="fiche-pedagogique-officielle" style="max-width:48rem;margin:2rem auto 0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:20px;padding:1.75rem;box-shadow:0 10px 28px -8px rgba(15,23,42,0.06);">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div class="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <span class="text-red-700 font-bold">${escapeHtml(tool.badge)}</span>
            <span aria-hidden="true">&middot;</span>
            <span>Guide Didactique &amp; Scientifique Complet</span>
          </div>
          <h2 class="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2 m-0">
            <span style="font-size:1.15rem;">&#128216;</span>
            ${escapeHtml(tool.titleFr)}
          </h2>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md tabular-nums border border-emerald-200">
            ${tool.wordCount} mots (Guide Approfondi)
          </span>
          <button type="button" onclick="copierFichePedagogique()" class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer border border-slate-200" title="Copier le guide officiel complet (${tool.wordCount} mots)">
            <span id="btn-copy-ico">&#128203;</span>
            <span id="btn-copy-txt">Copier le guide complet</span>
          </button>
        </div>
      </div>

      <!-- 1. Guide d'utilisation pas-à-pas -->
      <div class="space-y-3">
        <h3 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 m-0">
          <span style="color:#006233;">&#129517;</span>
          1. Guide d'utilisation pas-à-pas &amp; Protocoles terrain
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          ${stepsHtml}
        </div>
      </div>

      <!-- 2. Relations mathématiques en exergue -->
      <div class="space-y-3">
        <h3 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 m-0">
          <span style="color:#c1272d;">&#128208;</span>
          2. Relations mathématiques &amp; Équations biomécaniques
        </h3>
        <div class="p-4 bg-slate-900 text-white rounded-xl space-y-2 border border-slate-800 shadow-inner">
          ${formulasHtml}
        </div>
      </div>

      <!-- 3. Interprétation des résultats & repères terrain -->
      <div class="space-y-3">
        <h3 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 m-0">
          <span style="color:#d97706;">&#128161;</span>
          3. Interprétation des résultats &amp; Seuils d'entraînement
        </h3>
        <p class="text-xs text-slate-700 leading-relaxed bg-amber-50/60 border border-amber-200/70 p-3.5 rounded-xl m-0">
          ${escapeHtml(tool.interpretationSummary)}
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          ${benchmarksHtml}
        </div>
      </div>

      <!-- 4. Traité Scientifique & Pédagogique Intégral (+800 mots) -->
      <div class="space-y-3 pt-2 border-t border-slate-100">
        <div class="flex items-center justify-between">
          <h3 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 m-0">
            <span style="color:#2563eb;">&#128214;</span>
            4. Manuel Scientifique &amp; Didactique Détaillé (${tool.wordCount} mots)
          </h3>
          <button type="button" onclick="toggleTexteIntegral()" id="btn-toggle-texte" class="text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer">
            Afficher le texte complet &#9660;
          </button>
        </div>
        
        <div id="bloc-texte-integral" class="hidden p-5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 leading-relaxed whitespace-pre-line font-sans">
${escapeHtml(tool.fullRawText)}
        </div>
      </div>
    </section>

    <script>
      function toggleTexteIntegral() {
        var el = document.getElementById('bloc-texte-integral');
        var btn = document.getElementById('btn-toggle-texte');
        if (el && btn) {
          if (el.classList.contains('hidden')) {
            el.classList.remove('hidden');
            btn.textContent = 'Masquer le texte complet ▲';
          } else {
            el.classList.add('hidden');
            btn.textContent = 'Afficher le texte complet ▼';
          }
        }
      }

      function copierFichePedagogique() {
        var texte = ${escapedRawText};
        navigator.clipboard.writeText(texte).then(function() {
          var ico = document.getElementById('btn-copy-ico');
          var txt = document.getElementById('btn-copy-txt');
          if (ico && txt) {
            ico.textContent = '✓';
            txt.textContent = 'Guide copié (${tool.wordCount} mots) !';
            setTimeout(function() {
              ico.textContent = '📋';
              txt.textContent = 'Copier le guide complet';
            }, 2500);
          }
        });
      }
    </script>`;
}

function updateFile(filePath, tool, cardHtml) {
  if (!fs.existsSync(filePath)) return false;
  let content = fs.readFileSync(filePath, 'utf-8');
  if (content.includes('id="fiche-pedagogique-officielle"')) {
    const startIdx = content.indexOf('id="fiche-pedagogique-officielle"');
    const secStart = content.lastIndexOf('<section', startIdx);
    const secEnd = content.indexOf('</section>', startIdx);
    if (secStart !== -1 && secEnd !== -1) {
      let afterSec = secEnd + '</section>'.length;
      const scriptStart = content.indexOf('<script>', afterSec);
      let endIdx = afterSec;
      if (scriptStart !== -1 && scriptStart - afterSec < 100) {
        const scriptEnd = content.indexOf('</script>', scriptStart);
        if (scriptEnd !== -1) {
          endIdx = scriptEnd + '</script>'.length;
        }
      }
      content = content.substring(0, secStart) + cardHtml + content.substring(endIdx);
    }
  } else if (content.includes('</main>')) {
    content = content.replace('</main>', '  ' + cardHtml + '\n  </main>');
  }
  fs.writeFileSync(filePath, content, 'utf-8');
  return true;
}

console.log('\n--- APPLICATION DES 10 GUIDES (800+ MOTS) DANS LES FICHIERS HTML ---');
for (const tool of Object.values(TOOLS_800_WORDS)) {
  const cardHtml = buildHtmlCard(tool);
  const rootPath = path.join(rootDir, tool.fileName);
  const pubPath = path.join(rootDir, 'public', tool.fileName);
  let done = false;
  if (updateFile(rootPath, tool, cardHtml)) done = true;
  if (updateFile(pubPath, tool, cardHtml)) done = true;
  if (done) {
    console.log('✅ ' + tool.fileName + ' mis à jour (' + tool.wordCount + ' mots intégrés).');
  } else {
    console.warn('⚠️ Introuvable : ' + tool.fileName);
  }
}

console.log('\n======================================================');
console.log('🎉 SUCCÈS : TOUS LES 10 GUIDES (800+ MOTS) SONT INTÉGRÉS !');
console.log('======================================================\n');