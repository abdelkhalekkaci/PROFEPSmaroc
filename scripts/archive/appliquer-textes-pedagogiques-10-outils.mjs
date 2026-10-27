/**
 * Script de génération et validation des 10 textes pédagogiques et scientifiques
 * Calibrés à 800 MOTS MINIMUM par outil pour ProfEPS.ma.
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
      { label: 'Coût énergétique en oxygène (VO2)', formula: 'VO2 = -4,60 + 0,182258·v + 0,000104·v²' },
      { label: 'Fraction d’utilisation du VO2 Max (%VO2)', formula: '%VO2 = 0,8 + 0,189439·e^(-0,012778·t) + 0,298956·e^(-0,193261·t)' },
      { label: 'Score VDOT de performance effectif', formula: 'VDOT = VO2 / %VO2' },
      { label: 'Formule inverse de prédiction chronométrique', formula: 'Résolution itérative par dichotomie de VO2(d/t) = VDOT × %VO2(t)' }
    ],
    interpretationSummary: 'Le score VDOT formalisé par l\'entraîneur et physiologiste américain Jack Daniels synthétise le VO2 Max et l\'économie de course réelle pour calibrer l\'entraînement avec une justesse inégalée.',
    benchmarks: [
      { label: 'Niveau Débutant / Santé', value: 'VDOT 30–38', desc: '5 km en 28–35 min, 10 km en 58–72 min. Priorité à la régularité et au renforcement aérobie doux.', tone: 'slate' },
      { label: 'Niveau Intermédiaire / Régulier', value: 'VDOT 40–49', desc: '5 km en 21–26 min, 10 km en 44–54 min. Bonne base d’endurance, intégration du travail au seuil.', tone: 'blue' },
      { label: 'Niveau Confirmé / Régional', value: 'VDOT 50–59', desc: '5 km en 17–20 min, 10 km en 36–42 min, semi en 1h20–1h34. Économie de course affûtée.', tone: 'emerald' },
      { label: 'Niveau Élite National / International', value: 'VDOT 60–75+', desc: '10 km sub-33 min, marathon sub-2h30. Puissance métabolique et biomécanique exceptionnelles.', tone: 'rose' }
    ],
    fullRawText: `I. Introduction Scientifique et Spécificités du Concept VDOT

Le système VDOT, conçu et modélisé par le célèbre physiologiste américain Jack Daniels et son confrère Jimmy Gilbert, représente l'une des avancées méthodologiques les plus influentes dans l'histoire de la course de fond et de demi-fond moderne. Traditionnellement, les scientifiques mesurent en laboratoire le volume maximal d'oxygène qu'un athlète peut consommer par unité de temps et par kilogramme de poids corporel, désigné sous le terme de VO2 Max. Cependant, l'expérience de terrain prouve régulièrement que deux athlètes affichant un VO2 Max strictement identique de soixante-dix millilitres par minute et par kilogramme ne réalisent pas nécessairement les mêmes performances en compétition. La raison de cette divergence réside dans ce que la physiologie nomme l'économie de course : c'est-à-dire la quantité réelle d'oxygène requise pour propulser le corps à une vitesse donnée. L'innovation majeure de Jack Daniels a été d'associer la consommation d'oxygène brute et le rendement biomécanique dans un indice opérationnel unique : le score VDOT. Ce score reflète la capacité de performance aérobie réelle et permet de déduire des prédictions chronométriques et des allures d'entraînement remarquablement fiables, du quinze cents mètres jusqu'au marathon.

II. Guide d'Utilisation Étape par Étape du Calculateur

Pour exploiter toute la puissance du calculateur VDOT et en tirer les meilleures décisions d'entraînement, suivez la démarche suivante :
1. Choix de la performance de référence : Sélectionnez un résultat chronométré récent issu d'une compétition officielle ou d'un test maximal réalisé dans des conditions environnementales représentatives. Les distances standards proposées couvrent le 1 500 m, le 3 000 m, le 5 km, le 10 km, le Semi-Marathon (21,097 km) et le Marathon complet (42,195 km). Si vous ne disposez pas d'un chrono de course récent, vous pouvez également renseigner directement votre VMA de terrain.
2. Saisie du chrono précis : Renseignez les heures, les minutes et les secondes réalisées avec exactitude. Chaque seconde a un impact sur le calcul de la vitesse moyenne de course et sur la fraction métabolique correspondante.
3. Renseignement de l'âge et du sexe : Bien que le VDOT brut soit une valeur mécanique universelle, votre âge et votre sexe permettent au calculateur de situer votre VO2 Max par rapport aux barèmes percentile de l'American College of Sports Medicine (ACSM).
4. Validation et lecture des résultats : En déclenchant le calcul, vous débloquez simultanément votre score VDOT arrondi au dixième, votre classement sanitaire international, votre tableau des temps équivalents du 1 500 m au marathon, et les cinq allures d'entraînement individualisées.

III. Paramètres d'Entrée et Explication des Variables Demandées

Pour comprendre pourquoi ces informations sont réclamées, examinons leur signification physiologique :
- La distance de course : Elle conditionne directement le pourcentage de VO2 Max soutenable par l'organisme. Un être humain est capable de maintenir environ cent pour cent de sa consommation maximale d'oxygène pendant dix à douze minutes, mais ne peut tenir que quatre-vingt-cinq à quatre-vingt-dix pour cent sur un dix kilomètres, et soixante-quinze à quatre-vingt-cinq pour cent sur un marathon complet en raison de la dérive thermique et de la déplétion glycogénique.
- Le temps chronométré : C'est le dénominateur de la vitesse moyenne. Il permet d'estimer la durée exacte d'exposition à l'effort métabolique.
- Les données d'âge et de sexe : La fonction cardiorespiratoire décline physiologiquement d'environ zéro virgule cinq à un pour cent par an après trente ans en raison de la baisse de la fréquence cardiaque maximale et du volume d'éjection systolique. La grille ACSM contextualise ainsi votre performance par rapport à votre tranche démographique.

IV. Relations Mathématiques et Modélisation Algorithmique

L'algorithme de Daniels repose sur un système couplé d'équations non linéaires complexes reliant la vitesse de course, la consommation d'oxygène et la durée de l'effort :
1. Calcul de la vitesse moyenne en mètres par minute :
v = Distance totale (en mètres) / Temps total (en minutes).
2. Calcul du coût en oxygène requis par la vitesse de déplacement : Daniels et Gilbert ont modélisé le coût en oxygène par un polynôme du second degré prenant en compte la résistance de l'air et le travail musculaire :
VO2 = -4,60 + (0,182258 × v) + (0,000104 × v²).
Cette relation indique qu'à mesure que la vitesse augmente, le coût en oxygène croît de manière quadratique.
3. Calcul de la fraction soutenue du VO2 Max selon la durée t en minutes : L'équation exponentielle modélisant la baisse de fraction de VO2 Max tolérable dans le temps est :
%VO2 = 0,8 + 0,189439 × e^(-0,012778 × t) + 0,298956 × e^(-0,193261 × t).
4. Détermination du score VDOT : Le score effectif est le rapport entre le coût en oxygène et la fraction d'utilisation :
VDOT = VO2 / %VO2.
5. Algorithme de prédiction des chronos équivalents : Pour déterminer le temps prédit sur une autre distance, le calculateur résout numériquement par méthode de dichotomie l'égalité où le produit du VDOT par la fraction %VO2(t) égale le coût métabolique VO2(d/t).

V. Les Cinq Allures d'Entraînement de Jack Daniels et leur Signification

Le grand intérêt du VDOT réside dans la prescription rigoureuse des allures d'entraînement selon cinq zones physiologiques précises :
- Allure E · Easy Pace (Endurance Facile / 59% à 74% VO2 Max) : Courue à un rythme d'aisance totale, cette allure représente soixante-dix à quatre-vingts pour cent du kilométrage hebdomadaire. Elle développe l'endurance cellulaire, fortifie le système musculo-squelettique, favorise la capillarisation et assure la récupération sans stress cardiovasculaire excessif.
- Allure M · Marathon Pace (Allure Marathon / 75% à 84% VO2 Max) : Utilisée pour habituer l'organisme à l'effort prolongé, améliorer l'efficacité métabolique du stockage glycogénique et développer la confiance mentale sur la vitesse cible de compétition sur longue distance.
- Allure T · Threshold Pace (Allure Seuil / 83% à 88% VO2 Max) : Allure inconfortablement soutenable correspondant au seuil de transition lactique, que l'athlète peut maintenir environ soixante minutes en compétition continue. L'entraînement au seuil s'effectue sous forme de blocs continus de vingt minutes ou d'intervalles longs de cinq à dix minutes avec des récupérations très courtes (une minute). Son but est de retarder l'accumulation des ions H+ dans le sang.
- Allure I · Interval Pace (Allure Intervalles VO2 Max / 95% à 100% VO2 Max) : Fractions d'effort de trois à cinq minutes courues à plein régime aérobie pour solliciter la pompe cardiaque maximale. Le ratio temps d'effort / temps de récupération est idéalement de un pour un.
- Allure R · Repetition Pace (Allure Répétitions / Vitesse et Économie) : Courtes fractions de deux cents à quatre cents mètres courues plus vite que l'allure d'intervalle mais avec des récupérations généreuses. L'objectif n'est pas cardiorespiratoire mais neuromusculaire : perfectionner la foulée, la cadence, la réactivité du pied au sol et l'économie gestuelle globale sans acidose invalidante.`
  },

  asr: {
    id: 'asr',
    fileName: 'calculateur-asr-reserve-vitesse.html',
    titleFr: 'Réserve de Vitesse Anaérobie (ASR)',
    titleEn: 'Anaerobic Speed Reserve (ASR) Calculator',
    titleAr: 'حاسبة احتياطي السرعة اللاهوائية ASR',
    badge: 'Cluster 1B · Profilage Neuromusculaire',
    guideSteps: [
      'Mesurez votre VMA (en km/h) via un test aérobie reconnu et votre Vitesse Maximale de Sprint (VMS / MSS en km/h) enregistrée par radar, cellules photoélectriques ou GPS sur un sprint lancé de 30 à 60 mètres.',
      'Saisissez les deux vitesses dans les champs correspondants pour calculer l\'écart d\'ASR en km/h et votre ratio neuromusculaire (MSS / VMA).',
      'Consultez votre profilage de typologie musculaire (Endurant, Hybride, Explosif) et appliquez les intensités calibrées en pourcentage d\'ASR pour vos séances d\'intermittent supramaximal.'
    ],
    mathFormulas: [
      { label: 'Réserve de Vitesse Anaérobie brute (ASR)', formula: 'ASR (km/h) = VMS − VMA' },
      { label: 'Ratio de vitesse neuromusculaire (Speed Ratio)', formula: 'Speed Ratio = VMS / VMA' },
      { label: 'Conversion en mètres par seconde (m/s)', formula: 'Vitesse (m/s) = Vitesse (km/h) / 3,6' },
      { label: 'Prescription individualisée en % ASR', formula: 'Vitesse Cible (km/h) = VMA + (%ASR / 100 × ASR)' },
      { label: 'Indice de Sollicitation Lactique Relative', formula: '%ASR_utilisé = (Vitesse de course − VMA) / (VMS − VMA) × 100' }
    ],
    interpretationSummary: 'La Réserve de Vitesse Anaérobie développée par Martin Buchheit et Gareth Sandford révolutionne la préparation physique en démontrant que prescrire les efforts supramaximaux en simple pourcentage de VMA crée des disparités physiologiques inacceptables entre athlètes.',
    benchmarks: [
      { label: 'Profil Endurant / Moteur Diesel', value: 'Ratio < 1,80 · ASR < 6 km/h', desc: 'Forte endurance aérobie mais vitesse de pointe limitée. Travail prioritaire de force maximale, pliométrie et sprint court.', tone: 'blue' },
      { label: 'Profil Équilibré / Hybride', value: 'Ratio 1,80–1,95 · ASR 6–8 km/h', desc: 'Polyvalence athlétique optimale, profil standard des milieux de terrain et coureurs de demi-fond moderne.', tone: 'emerald' },
      { label: 'Profil Explosif / Sprinteur', value: 'Ratio > 1,95 · ASR > 8,5 km/h', desc: 'Puissance neuromusculaire colossale mais forte sensibilité à la fatigue lactique. Individualisation impérative en % ASR.', tone: 'rose' }
    ],
    fullRawText: `I. Fondements et Révolution du Concept d'ASR dans le Sport Moderne

Le concept de Réserve de Vitesse Anaérobie, mondialement abrégé sous le sigle ASR (pour Anaerobic Speed Reserve), s'est imposé au cours de la dernière décennie comme l'un des piliers les plus novateurs de la préparation physique de haut niveau, notamment sous l'impulsion des chercheurs et praticiens de renommée internationale tels que Martin Buchheit et Gareth Sandford. Pendant des générations, entraîneurs et enseignants ont eu pour habitude de calibrer les séances de fractionné court et d'intermittent en utilisant un pourcentage fixe de la VMA : par exemple, courir des fractions de quinze secondes à cent quinze pour cent ou cent vingt pour cent de VMA. Si cette approche fonctionne convenablement pour les intensités sous-maximales, elle s'avère profondément défaillante dès que l'on franchit le seuil des cent pour cent de VMA. En effet, au-delà de la VMA, l'énergie supplémentaire requise provient exclusivement des voies métaboliques anaérobies et dépend de la vitesse maximale de sprint de chaque individu. L'ASR représente précisément cette marge de manœuvre locomotrice située entre le plafond aérobie de l'athlète et son plafond neuromusculaire absolu.

II. Guide d'Utilisation Étape par Étape

Pour déterminer avec exactitude votre ASR et structurer vos charges d'entraînement, appliquez scrupuleusement la procédure suivante :
1. Mesure de la VMA : Réalisez au préalable une évaluation aérobie validée (comme un test Demi-Cooper de six minutes ou un test continu progressif VAMEVAL) pour obtenir votre Vitesse Maximale Aérobie en kilomètres par heure avec une précision d'au moins zéro virgule deux km/h.
2. Mesure de la Vitesse Maximale de Sprint (VMS / MSS) : Évaluez votre vitesse maximale de pointe. Le protocole d'or consiste à effectuer deux à trois sprints lancés de quarante à soixante mètres sur piste ou pelouse avec une récupération complète de trois à quatre minutes entre chaque essai. La vitesse maximale instantanée est mesurée soit par des cellules photoélectriques réparties sur une zone de dix mètres lancés, soit par un radar cinétique ou un boîtier GPS professionnel haute fréquence (10 Hz ou plus). Renseignez la meilleure performance en kilomètres par heure.
3. Saisie dans le calculateur : Introduisez votre VMA et votre VMS dans les champs correspondants.
4. Analyse du profil et exploitation : Le calculateur délivre instantanément votre écart d'ASR en km/h, votre ratio de vitesse, votre classification physiologique de profilage musculaire ainsi que les vitesses de passage cibles calibrées de vingt pour cent à soixante pour cent d'ASR.

III. Explication des Paramètres et Enjeux de Mesure

La pertinence des résultats repose sur la fidélité des deux mesures d'entrée :
- VMA (Vitesse Maximale Aérobie en km/h) : Elle symbolise la vitesse de croisière maximale oxygénée de votre machinerie aérobie. Si cette valeur est sous-estimée (par exemple lors d'un test mal géré où l'athlète est parti trop prudemment), votre ASR calculée sera artificiellement trop grande.
- VMS / MSS (Maximal Sprint Speed en km/h) : Elle reflète la puissance neuromusculaire, la force explosive des membres inférieurs, l'efficacité de la chaîne postérieure et la coordination motrice à haute cadence. Elle nécessite un engagement mental et physique absolu dans un état de fraîcheur neurologique total.

IV. Relations Mathématiques et Calculs de Normalisation

Les relations mathématiques qui régissent l'ASR sont limpides dans leur formulation mais capitales dans leurs implications :
1. Calcul de la Réserve de Vitesse Anaérobie :
ASR (en km/h) = VMS (km/h) − VMA (km/h).
Cette valeur représente la largeur en km/h du couloir anaérobie utilisable par l'athlète.
2. Calcul du ratio de vitesse (Speed Ratio) :
Speed Ratio = VMS / VMA.
Ce ratio adimensionnel isole la dominante contractile de l'athlète, indépendamment de son niveau de vitesse brute.
3. Formule d'individualisation des allures de travail supramaximales en % d'ASR :
Vitesse Cible (km/h) = VMA + [(%ASR / 100) × ASR].
Exemple concret démontrant la supériorité de l'ASR :
Considérons deux athlètes ayant la même VMA de 16,0 km/h. L'athlète A (profil endurant) possède une VMS de 22,0 km/h (son ASR est de 6,0 km/h). L'athlète B (profil sprinteur) possède une VMS de 32,0 km/h (son ASR est de 16,0 km/h).
Si l'entraîneur prescrit une séance à 120% de VMA, la vitesse imposée est de 19,2 km/h pour les deux :
- L'athlète A court à 3,2 km/h au-dessus de sa VMA, ce qui représente 3,2 / 6,0 = 53,3% de son ASR. Il sera en acidose lactique sévère en quelques répétitions.
- L'athlète B court également à 19,2 km/h, mais pour lui cela ne représente que 3,2 / 16,0 = 20,0% de son ASR. L'effort est pour lui modéré et peu stimulant.
En prescrivant plutôt la séance à 30% d'ASR :
- L'athlète A courra à 16 + (0,30 × 6) = 17,8 km/h.
- L'athlète B courra à 16 + (0,30 × 16) = 20,8 km/h.
Les deux coureurs subiront alors une contrainte métabolique et neuromusculaire strictement équivalente.

V. Profilage Typologique et Barèmes d'Interprétation

La valeur du Speed Ratio (VMS / VMA) permet de classer immédiatement les athlètes en trois familles physiologiques majeures :
- Profil « Endurant » ou Moteur Diesel (Speed Ratio < 1,80) : Ces sportifs disposent d'un moteur aérobie puissant et résistant mais manquent de vitesse de pointe et d'accélération. Leurs muscles sont majoritairement riches en fibres de type I à métabolisme oxydatif. Dans leur préparation, il convient de développer la force maximale, la raideur tendineuse, les sprints courts alactiques et la pliométrie pour élargir leur ASR par le haut.
- Profil « Hybride » ou Mixte (Speed Ratio entre 1,80 et 1,95) : C'est le profil le plus répandu et le plus polyvalent chez les joueurs de sports collectifs de haut niveau (football, rugby à sept, handball). Ils allient une VMA élevée à une excellente capacité de répétition de sprints.
- Profil « Explosif » ou Sprinteur (Speed Ratio > 1,95) : Athlètes dotés d'une pointe de vitesse prodigieuse et d'une prédominance de fibres de type IIa et IIx. Leur filière glycolytique s'emballe très vite. Si un entraîneur leur impose des volumes d'intermittent calibrés en pourcentage brut de VMA sans tenir compte de leur ASR, ils s'épuisent rapidement et s'exposent à des blessures musculaires aux ischio-jambiers.

VI. Applications Directes pour les Séances d'Intermittent Court

Sur le terrain, l'ASR permet d'ajuster les formats de travail intermittent :
- Pour les séances courtes de type 10s/10s ou 15s/15s : prescrivez entre 20% et 35% d'ASR pour un travail à dominante puissance aérobie, et entre 40% et 60% d'ASR pour stimuler la puissance lactique tolérée.
- Pour les sports collectifs : regroupez les joueurs par couloirs d'ASR plutôt que par postes de jeu afin d'homogénéiser la charge interne et la qualité du stimulus physiologique.`
  },

  ie: {
    id: 'ie',
    fileName: 'calculateur-indice-endurance.html',
    titleFr: 'Calculateur d’Indice d’Endurance (Péronnet & Thibault)',
    titleEn: 'Endurance Index (Péronnet & Thibault)',
    titleAr: 'حاسبة مؤشر التحمل الرياضي Péronnet & Thibault',
    badge: 'Cluster 1C · Indice de Soutien Aérobie',
    guideSteps: [
      'Indiquez votre VMA (en km/h) issue d\'un test Demi-Cooper de six minutes ou d\'un test progressif récent.',
      'Renseignez la distance exacte d\'une course officielle (5 000 m, 10 000 m, 21 097 m ou 42 195 m) et le chrono total réalisé exprimé en minutes avec décimales.',
      'Découvrez votre Indice d\'Endurance (valeur négative), votre pourcentage de VMA effectivement maintenu et votre axe d\'entraînement prioritaire pour briser vos paliers de progression.'
    ],
    mathFormulas: [
      { label: 'Fraction de VMA soutenue sur l’épreuve', formula: '%VMA = (Vitesse moyenne de course / VMA) × 100' },
      { label: 'Pente logarithmique de Péronnet & Thibault', formula: 'IE = (%VMA − 100) / ln(Temps épreuve en min / T_lim VMA en min)' },
      { label: 'Temps limite conventionnel à 100% de VMA', formula: 'T_lim VMA = 6,0 à 7,0 minutes (selon le niveau d\'entraînement)' },
      { label: 'Modélisation de vitesse maximale prédictible', formula: 'V(t) = VMA × [1 + (IE / 100) × ln(t / T_lim)]' }
    ],
    interpretationSummary: 'L\'Indice d\'Endurance de Péronnet et Thibault quantifie mathématiquement la capacité d\'un coureur à soutenir le plus haut pourcentage possible de sa VMA au fur et à mesure que la distance et le temps de course augmentent.',
    benchmarks: [
      { label: 'Endurance Phénoménale / Profil Marathonien Élite', value: 'IE ≥ -5,0', desc: 'Maintien exceptionnel de plus de 85% de VMA sur 10 km et plus de 80% sur marathon. Axe de progrès : augmenter la VMA.', tone: 'emerald' },
      { label: 'Bonne Endurance / Profil Équilibré', value: '-7,5 ≤ IE < -5,0', desc: 'Capacité aérobie très bien structurée, équilibre harmonieux entre cylindrée et résistance à la fatigue.', tone: 'blue' },
      { label: 'Endurance Moyenne / Coureur Standard', value: '-9,5 ≤ IE < -7,5', desc: 'Décroissance normale de la vitesse. Nécessité de développer les sorties longues et les blocs au seuil aérobie.', tone: 'amber' },
      { label: 'Déficit d’Endurance / Profil Vitesse Demi-Fond Court', value: 'IE < -9,5', desc: 'Forte VMA mais chute brutale de vitesse dès que l’épreuve s’allonge. Travailler prioritairement le volume et le seuil.', tone: 'rose' }
    ],
    fullRawText: `I. Contexte Théorique et Définition de l'Indice d'Endurance

Dans le domaine de la physiologie de l'exercice et de l'analyse de la performance en course de fond, deux athlètes possédant une Vitesse Maximale Aérobie rigoureusement identique de seize kilomètres par heure ne réalisent que très rarement le même temps sur un semi-marathon ou sur un marathon. Si l'un boucle les quarante-deux kilomètres en trois heures et dix minutes, l'autre peut franchir la ligne en trois heures et trente-cinq minutes. Cette divergence colossale s'explique par un paramètre fondamental que les physiologistes canadiens François Péronnet et Guy Thibault ont formalisé sous le nom d'Indice d'Endurance (IE). L'endurance, au sens scientifique du terme, ne se résume pas à posséder un gros moteur (la VMA ou le VO2 Max) ; elle définit spécifiquement la faculté d'un athlète à maintenir la plus grande fraction possible de cette VMA sur une durée d'effort prolongée. L'Indice d'Endurance mesure avec une rigueur mathématique la pente de décroissance de la vitesse en fonction du logarithme népérien du temps de course.

II. Guide d'Utilisation Étape par Étape

Pour déterminer avec exactitude votre Indice d'Endurance personnel, procédez selon les étapes suivantes :
1. Détermination de la VMA de référence : Renseignez votre VMA mesurée récemment lors d'un test continu de six minutes (Demi-Cooper) ou lors d'une épreuve progressive étalonnée.
2. Choix d'une performance chronométrée de compétition : Sélectionnez une course officielle courue à bloc (du cinq kilomètres au marathon) dont la distance a été certifiée par des géomètres officiels.
3. Saisie du temps en minutes décimales : Convertissez votre chrono en minutes avec précision. Par exemple, si vous avez réalisé quarante-deux minutes et trente secondes sur dix kilomètres, entrez quarante-deux virgule cinq minutes dans le champ dédié.
4. Calcul et diagnostic personnalisé : Le système compare instantanément votre vitesse de course à votre VMA théorique et calcule votre Indice d'Endurance en affichant un bilan pédagogique détaillé de vos points forts et de vos axes d'amélioration.

III. Paramètres d'Entrée et Explication des Variables

Pour obtenir un calcul mathématique valide, les informations suivantes sont requises :
- VMA (km/h) : Vitesse maximale aérobie correspondant conventionnellement à un temps limite d'épuisement compris entre six et sept minutes.
- Distance de la course (mètres) : Mesure étalonnée servant à établir la vitesse moyenne de déplacement (Vitesse = Distance / Temps).
- Temps de course (minutes) : Durée totale de l'effort. Plus la distance choisie est importante (semi-marathon ou marathon), plus l'Indice d'Endurance obtenu reflète fidèlement la qualité du métabolisme aérobie de longue durée.

IV. Relations Mathématiques et Démonstration de la Formule

La modélisation de Péronnet et Thibault part du constat physiologique universel que la diminution de la vitesse de course en fonction du temps suit une loi logarithmique :
1. Calcul du pourcentage de VMA maintenu :
%VMA = (Vitesse moyenne sur l'épreuve / VMA) × 100.
2. Formule de l'Indice d'Endurance (IE) :
IE = (%VMA − 100) / ln(Temps de l'épreuve / Temps limite à 100% VMA).
Dans cette équation, le temps limite à cent pour cent de VMA (T_lim) est conventionnellement fixé à 6,0 minutes pour la population générale et jusqu'à 7,0 minutes pour les athlètes très entraînés. Le symbole « ln » désigne le logarithme népérien.
Comme le temps de course sur longue distance est toujours supérieur à six minutes, le dénominateur ln(Temps / 6) est toujours strictement positif. De même, la vitesse moyenne sur longue distance étant inférieure à la VMA, le numérateur (%VMA − 100) est toujours négatif. Par conséquent, l'Indice d'Endurance s'exprime toujours par un nombre négatif.
3. Propriété mathématique remarquable : Moins le nombre est négatif (c'est-à-dire plus il se rapproche de zéro), plus la pente de chute de vitesse est faible, ce qui signifie que l'athlète conserve un haut pourcentage de son potentiel sans faiblir.
4. Formule inverse prédictive : Connaissant la VMA et l'IE d'un coureur, on peut prédire sa vitesse maximale soutenable sur n'importe quelle durée t par la relation :
Vitesse(t) = VMA × [1 + (IE / 100) × ln(t / 6)].

V. Grille d'Interprétation et Diagnostic d'Entraînement

L'interprétation chiffrée de l'Indice d'Endurance guide directement les choix de programmation :
- IE supérieur ou égal à -5,0 (Endurance Exceptionnelle) : Ce profil est la marque de fabrique des grands marathoniens et coureurs d'ultrafond. Ces athlètes sont capables de maintenir 88% à 90% de leur VMA sur dix kilomètres et 82% à 85% sur marathon. Leurs fibres musculaires utilisent les acides gras avec une efficacité redoutable. Pour eux, continuer à empiler des footings lents n'apportera que peu de gain : leur axe d'entraînement prioritaire consiste à hausser leur VMA par du travail intermittent pour relever leur plafond global.
- IE compris entre -7,5 et -5,1 (Bonne Endurance) : Profil équilibré typique du coureur régulier bien préparé. Les séances de seuil et les sorties longues ont produit leurs adaptations.
- IE compris entre -9,5 et -7,6 (Endurance Moyenne) : L'athlète subit une baisse de vitesse classique. Il gagnera beaucoup à structurer ses blocs à allure tempo et à optimiser sa gestion de course.
- IE inférieur à -9,5 (Déficit d'Endurance Marqué) : L'athlète dispose d'une VMA respectable mais s'effondre très rapidement au-delà de quelques kilomètres. Typique des coureurs issus du demi-fond court (800m-1500m) ou des sports collectifs qui débutent sur route. Pour eux, les séances de VMA pure sont secondaires : l'urgence consiste à développer l'endurance fondamentale (Zone 2) et le seuil anaérobie pour stabiliser la lactatémie.

VI. Conseils d'Application Didactique et d'Entraînement

En milieu scolaire et en club, l'Indice d'Endurance permet d'éviter l'erreur tragique qui consiste à prescrire les mêmes allures de cross ou de course longue à tous les élèves ayant la même VMA. Deux adolescents ayant 14 km/h de VMA n'ont pas la même autonomie : l'un tiendra 12 km/h pendant vingt minutes tandis que l'autre sera épuisé en dix minutes. L'Indice d'Endurance permet de valoriser les élèves endurants qui n'ont pas une pointe de vitesse spectaculaire et d'adapter les contrats de course pour une réussite partagée.`
  },

  karvonen: {
    id: 'karvonen',
    fileName: 'calculateur-frequence-cardiaque-karvonen.html',
    titleFr: 'Fréquence Cardiaque Karvonen & Tanaka',
    titleEn: 'Heart Rate Target Zones (Karvonen & Tanaka)',
    titleAr: 'حاسبة نبضات القلب المستهدفة (Karvonen & Tanaka)',
    badge: 'Cluster 2A · Cardiologie de l’Exercice',
    guideSteps: [
      'Mesurez votre Fréquence Cardiaque au Repos (FC Repos en battements par minute) le matin au réveil, allongé au calme avant tout effort et avant le café.',
      'Renseignez votre âge et votre FC Maximale réelle si elle a été mesurée lors d\'un test maximal d\'effort médical ou sur piste ; sinon, laissez le champ libre pour laisser le calculateur appliquer l\'équation de Tanaka.',
      'Générez instantanément votre Fréquence Cardiaque de Réserve (FCR) et vos cinq zones cardiaques d\'entraînement individualisées.'
    ],
    mathFormulas: [
      { label: 'Formule de Tanaka (FC Max estimée moderne)', formula: 'FC Max (bpm) = 208 − (0,7 × Âge)' },
      { label: 'Formule d’Astrand classique (FC Max historique)', formula: 'Hommes : 220 − Âge | Femmes : 226 − Âge' },
      { label: 'Fréquence Cardiaque de Réserve utile (FCR)', formula: 'FCR (bpm) = FC Max − FC Repos' },
      { label: 'Formule universelle de Karvonen (FC Cible)', formula: 'FC Cible = FC Repos + (%Intensité / 100 × FCR)' },
      { label: 'Indice de Réserve Cardiaque Résiduelle', formula: '%FCR = (FC Mesurée − FC Repos) / (FC Max − FC Repos) × 100' }
    ],
    interpretationSummary: 'La formule de Karvonen s\'impose comme la référence médicale et sportive absolue pour le pilotage du cardiofréquencemètre en intégrant le niveau de forme via la fréquence cardiaque de repos.',
    benchmarks: [
      { label: 'Zone 1 · Récupération Active / Régénération', value: '50–60% FCR', desc: 'Régénération post-compétition, retour au calme circulatoire, oxygénation tissulaire sans fatigue.', tone: 'slate' },
      { label: 'Zone 2 · Endurance Fondamentale / Brûlage Lipides', value: '60–70% FCR', desc: 'Développement de la pompe cardiaque, angiogenèse capillaire et métabolisme des graisses.', tone: 'emerald' },
      { label: 'Zone 3 · Tempo Aérobie / Allure Marathon', value: '70–80% FCR', desc: 'Rythme d’endurance active soutenable, renforcement de la capacité glycogénique.', tone: 'blue' },
      { label: 'Zone 4 · Seuil Anaérobie / Résistance Dure', value: '80–90% FCR', desc: 'Allure 10 km, équilibre lactique dynamique, respiration soutenue mais rythmée.', tone: 'amber' },
      { label: 'Zone 5 · Puissance Cardiaque Maximale', value: '90–100% FCR', desc: 'Sollicitation extrême du myocarde et de la PAM, réservée aux séries courtes d\'intermittent.', tone: 'rose' }
    ],
    fullRawText: `I. Fondements Physiologiques du Suivi Cardiaque et Rôle de la Méthode Karvonen

Dans toutes les disciplines sportives sollicitant l'appareil cardiorespiratoire, le cœur agit comme la pompe motrice centrale distribuant le dioxygène et les nutriments aux cellules musculaires tout en évacuant les métabolites acides et le dioxyde de carbone. L'usage du cardiofréquencemètre est devenu un outil universel pour les coureurs, cyclistes, triathlètes et élèves en EPS. Toutefois, une erreur méthodologique fréquente consiste à calculer ses zones d'entraînement en appliquant un pourcentage direct de sa Fréquence Cardiaque Maximale brute (par exemple courir à soixante-quinze pour cent de sa FC Max). Cette approche simpliste est scientifiquement inexacte car elle ignore totalement la Fréquence Cardiaque de Repos de l'individu. En 1957, le médecin et physiologiste finlandais Martti J. Karvonen a révolutionné la cardiologie de l'exercice en introduisant la notion de Fréquence Cardiaque de Réserve (FCR). Sa formule établit une relation mathématique étroite et directe entre le pourcentage de Fréquence Cardiaque de Réserve mobilisé et le pourcentage réel de consommation maximale d'oxygène (% VO2 Max), garantissant une justesse physiologique inégalée.

II. Guide d'Utilisation Étape par Étape

Pour déterminer vos zones cardiaques avec une exactitude clinique, suivez ces recommandations :
1. Mesure rigoureuse de la FC de Repos : La Fréquence Cardiaque de Repos doit impérativement être mesurée dans un état de quiétude absolue. Le protocole optimal consiste à poser sa montre cardio ou sa ceinture thoracique le matin au réveil, en restant allongé sur le dos pendant trois à cinq minutes dans le calme sans regarder son téléphone ni avoir consommé de boisson stimulante. Relevez la valeur minimale stable en battements par minute (bpm).
2. Évaluation de la FC Maximale : La valeur idéale provient d'un test maximal d'effort réel (en fin de test Demi-Cooper, de test VAMEVAL ou lors d'une ascension progressive en côte courue à bloc). Si vous n'avez pas de mesure récente de terrain, vous pouvez utiliser l'estimation automatique calculée selon la formule moderne de Tanaka.
3. Renseignement des données dans le calculateur : Saisissez votre âge, votre FC Repos et votre FC Max dans les champs respectifs.
4. Exploitation de la grille personnalisée : Le système génère instantanément vos cinq zones cardiaques cibles (Z1 à Z5), avec la fréquence cardiaque plancher et plafond exprimée en battements par minute pour chaque régime d'effort.

III. Explication des Paramètres et Signification Médicale

Les trois variables requises par le calculateur possèdent une signification cardiologique majeure :
- L'âge (en années) : La fréquence cardiaque maximale diminue inéluctablement avec l'avancée en âge, en raison de modifications intrinsèques du nœud sinusal et d'une moindre sensibilité aux catécholamines.
- La Fréquence Cardiaque de Repos (bpm) : C'est le marqueur par excellence de la forme parasympathique et du volume d'éjection systolique. Chez un sujet sédentaire, elle se situe entre 70 et 85 bpm. Chez un athlète d'endurance très entraîné dont le ventricule gauche est hypertrophié et plus compliant, elle peut descendre entre 38 et 48 bpm sans la moindre anomalie pathologique.
- La Fréquence Cardiaque Maximale (bpm) : Elle représente le plafond de contraction du myocarde au-delà duquel le temps de remplissage diastolique devient insuffisant pour maintenir le débit cardiaque.

IV. Relations Mathématiques et Formules Scientifiques

Le calculateur applique les modélisations cardiologiques les plus éprouvées :
1. Estimation de la FC Max selon Tanaka (2001) : La formule historique d'Astrand (220 − Âge) élaborée dans les années 1970 est aujourd'hui reconnue comme sous-estimant la FC Max des personnes de plus de quarante ans. La méta-analyse moderne du Dr Hirofumi Tanaka portant sur des milliers de sujets valide l'équation :
FC Max (en bpm) = 208 − (0,7 × Âge).
2. Calcul de la Fréquence Cardiaque de Réserve (FCR) :
FCR = FC Max − FC Repos.
La FCR représente la plage de battements réellement utilisable par l'organisme entre la survie au repos et l'effort paroxystique.
3. Équation fondamentale de Karvonen :
FC Cible (en bpm) = FC Repos + [(%Intensité visé / 100) × FCR].
Démonstration mathématique de la supériorité de Karvonen :
Soit deux personnes de 40 ans ayant une FC Max identique de 180 bpm. L'un est sédentaire avec une FC Repos de 80 bpm (FCR = 100 bpm). L'autre est athlète avec une FC Repos de 40 bpm (FCR = 140 bpm).
Si l'on cherche une intensité d'endurance de base à 70% :
- Selon le simple % de FC Max : Les deux devraient courir à 0,70 × 180 = 126 bpm.
- Selon Karvonen pour le sédentaire : 80 + (0,70 × 100) = 150 bpm.
- Selon Karvonen pour l'athlète : 40 + (0,70 × 140) = 138 bpm.
La formule Karvonen tient compte du fait que l'amplitude cardiaque disponible chez l'athlète est bien plus vaste.

V. Description et Rôle des Cinq Zones d'Entraînement Karvonen

Le calculateur segmente la charge cardiaque en cinq zones physiologiques distinctes :
- Zone 1 · Récupération Active (50% à 60% FCR) : Effort très doux. Idéal pour stimuler la circulation sanguine sans créer de fatigue, favoriser l'élimination des toxines musculaires au lendemain d'une épreuve et régénérer le système nerveux autonome.
- Zone 2 · Endurance Fondamentale (60% à 70% FCR) : C'est la zone reine où l'athlète d'endurance doit passer entre soixante-dix et quatre-vingts pour cent de son temps d'entraînement total. À cette intensité, le corps optimise la prolifération des mitochondries, améliore la capillarisation musculaire et utilise majoritairement les triglycérides intramusculaires comme source d'énergie.
- Zone 3 · Tempo Aérobie / Allure Marathon (70% à 80% FCR) : Allure de travail dynamique. La respiration devient plus profonde, la consommation de glycogène musculaire s'intensifie. Elle prépare le système cardiovasculaire à maintenir un débit cardiaque élevé sur la durée.
- Zone 4 · Seuil Anaérobie (80% à 90% FCR) : Zone de haute intensité correspondant à l'allure d'un dix kilomètres de compétition. Le taux d'acide lactique produit égale le taux d'acide lactique éliminé par le foie et les fibres lentes. L'entraînement dans cette zone repousse l'apparition de l'asphyxie musculaire.
- Zone 5 · Puissance Cardiaque Maximale (90% à 100% FCR) : Sollicitation extrême de la machinerie cardiorespiratoire. Elle est utilisée exclusivement lors de répétitions courtes de fractionné (trente secondes à deux minutes) pour booster le VO2 Max.

VI. Précautions et Facteurs d'Influence sur la Fréquence Cardiaque

L'utilisateur de cardiofréquencemètre doit garder à l'esprit que la fréquence cardiaque n'est pas insensible aux éléments extérieurs. La chaleur, l'humidité et la déshydratation provoquent une dérive cardiaque naturelle (élévation de 10 à 15 bpm pour une vitesse constante en raison de la baisse du volume plasmatique). De même, le manque de sommeil, le stress psychologique, l'altitude et la caféine majorent la fréquence cardiaque. En EPS et en préparation physique, croiser la fréquence cardiaque avec l'allure de course et le ressenti d'effort (RPE) offre la garantie d'un entraînement intelligent et protecteur de la santé.`
  },

  imc: {
    id: 'imc',
    fileName: 'calculateur-imc-sportif-masse-grasse.html',
    titleFr: 'Calculateur IMC & Masse Grasse Sportive',
    titleEn: 'Athletic BMI & Body Fat Percentage (Deurenberg & Navy)',
    titleAr: 'حاسبة مؤشر كتلة الجسم ونسبة الدهون الرياضية',
    badge: 'Cluster 2B · Composition Corporelle & Santé',
    guideSteps: [
      'Entrez votre taille précise en centimètres et votre poids corporel mesuré le matin à jeun sur une balance étalonnée.',
      'Renseignez votre âge et votre sexe biologique (Homme ou Femme), indispensables pour calibrer l\'équation de masse grasse de Deurenberg.',
      'Analysez votre Indice de Masse Corporelle (IMC), votre Indice de Masse Grasse estimé (IMG), votre poids de forme théorique et votre composition corporelle athlétique selon les standards internationaux.'
    ],
    mathFormulas: [
      { label: 'Indice de Masse Corporelle de Quetelet (IMC)', formula: 'IMC (kg/m²) = Poids (kg) / [Taille (m)]²' },
      { label: 'Indice de Masse Grasse de Deurenberg (IMG)', formula: 'IMG (%) = 1,20·IMC + 0,23·Âge − 10,8·Sexe − 5,4 (Sexe : 1 H / 0 F)' },
      { label: 'Estimation de la Masse Grasse absolue', formula: 'Masse Grasse (kg) = Poids (kg) × [IMG (%) / 100]' },
      { label: 'Estimation de la Masse Maigre active', formula: 'Masse Maigre (kg) = Poids (kg) − Masse Grasse (kg)' },
      { label: 'Indice de Masse Maigre Musculaire (FFMI)', formula: 'FFMI = Masse Maigre (kg) / [Taille (m)]²' }
    ],
    interpretationSummary: 'L\'IMC standard de l\'OMS classe les populations mais induit fréquemment en erreur les athlètes musclés. Ce calculateur croise l\'IMC avec l\'IMG et l\'indice musculaire pour une évaluation nutritionnelle et sportive exacte.',
    benchmarks: [
      { label: 'Homme Athlète / Compétition', value: '8–12% IMG', desc: 'Définition musculaire nette, ratio puissance/poids maximal en course et sports de combat.', tone: 'emerald' },
      { label: 'Femme Athlète / Compétition', value: '16–22% IMG', desc: 'Équilibre hormonal et énergétique idéal pour la performance sans risque d’aménorrhée.', tone: 'emerald' },
      { label: 'Norme Santé Population Masculine', value: '14–20% IMG', desc: 'Fourchette physiologique saine pour la longévité et la prévention métabolique.', tone: 'blue' },
      { label: 'Norme Santé Population Féminine', value: '21–28% IMG', desc: 'Maintien optimal des fonctions endocriniennes et de la densité minérale osseuse.', tone: 'blue' },
      { label: 'Seuil Critique Inférieur de Sécurité', value: '< 6% H / < 14% F', desc: 'Danger aigu : risque de blessure de fatigue, de déficit immunitaire et de trouble hormonal.', tone: 'rose' }
    ],
    fullRawText: `I. Introduction et Limites de l'IMC Traditionnel chez le Sportif

L'Indice de Masse Corporelle, universellement abrégé IMC (ou BMI pour Body Mass Index dans la littérature anglophone), a été inventé au dix-neuvième siècle par le mathématicien et statisticien belge Adolphe Quetelet. Adopté par l'Organisation Mondiale de la Santé (OMS) comme étalon international de référence pour évaluer les risques sanitaires liés à la dénutrition et à l'obésité dans les grandes populations, l'IMC se calcule simplement en divisant le poids corporel par le carré de la taille. Si cette formule mathématique remplit parfaitement son rôle d'indicateur épidémiologique à l'échelle d'une nation, elle montre des limites dramatiques dès lors qu'elle est appliquée aveuglément à des sportifs réguliers, à des athlètes ou à des élèves actifs en Éducation Physique et Sportive. En effet, la formule de Quetelet ne fait aucune distinction entre les différents compartiments de la masse corporelle : un kilogramme de tissu adipeux (graisse) et un kilogramme de muscle squelettique dense ou de masse osseuse sont traités de manière totalement identique. C'est pourquoi un joueur de rugby, un sprinteur ou un pratiquant de musculation doté d'une masse musculaire très développée et d'un taux de graisse très bas se retrouve fréquemment classé à tort comme étant en « surpoids » ou en « obésité » par l'IMC traditionnel. Pour pallier ce biais, notre calculateur croise l'IMC avec l'Indice de Masse Grasse (IMG) et l'analyse de la masse maigre.

II. Guide d'Utilisation Étape par Étape

Pour obtenir un bilan anthropométrique fidèle et scientifiquement fondé, procédez de la manière suivante :
1. Mesure standardisée du poids corporel : Pesez-vous le matin au lever, pieds nus et en sous-vêtements, après être passé aux toilettes et avant de prendre votre petit-déjeuner. Renseignez la valeur en kilogrammes avec une précision de cent grammes.
2. Mesure exacte de la stature : Tenez-vous droit contre un mur plat, talons joints, le regard à l'horizontale (plan de Francfort). Relevez votre taille en centimètres.
3. Renseignement du sexe et de l'âge : Le sexe biologique et l'âge chronologique sont absolument indispensables car la composition corporelle et la répartition graisseuse naturelle sont dictées par le profil hormonal (œstrogènes vs testostérone).
4. Analyse des résultats délivrés : En cliquant sur le bouton de calcul, le système dévoile votre IMC officiel, votre catégorie selon l'OMS, votre taux de masse grasse estimé selon Deurenberg (IMG %), votre masse grasse en kilogrammes, votre masse maigre active et votre intervalle de poids santé recommandé.

III. Explication des Paramètres et Enjeux Métaboliques

Les paramètres collectés sont cruciaux pour une analyse de la santé et de la performance :
- Le poids (kg) : Reflète la masse totale embarquée. En course à pied et en endurance, tout excédent de masse grasse augmente le coût mécanique de déplacement d'environ un virgule quatre pour cent par kilogramme superflu.
- La taille (cm) : Détermine le levier biomécanique et sert de dénominateur pour normaliser la surface corporelle.
- L'âge (années) : Avec l'âge, même à poids constant, le tissu musculaire a une propension naturelle à diminuer (phénomène de sarcopénie) au profit du tissu adipeux si aucun entraînement de renforcement n'est pratiqué.
- Le sexe : Les femmes possèdent physiologiquement un taux de graisse essentielle incompressible supérieur de huit à dix pour cent à celui des hommes, nécessaire aux fonctions endocriniennes et reproductives.

IV. Relations Mathématiques et Équations Utilisées

Le calculateur intègre les formules anthropométriques internationales validées par les comités scientifiques :
1. Formule de l'Indice de Masse Corporelle de Quetelet :
IMC (en kg/m²) = Poids (kg) / [Taille (en mètres)]².
Exemple : Un individu pesant 74 kg et mesurant 1,78 m possède un IMC de 74 / (1,78 × 1,78) = 23,36 kg/m².
2. Équation de l'Indice de Masse Grasse de Paul Deurenberg (1991) :
Développée à l'Université de Wageningen aux Pays-Bas sur une large cohorte d'hommes et de femmes comparée à l'absorptiométrie biphotonique à rayons X (DEXA), la formule s'exprime comme suit :
IMG (en %) = (1,20 × IMC) + (0,23 × Âge) − (10,8 × Sexe) − 5,4.
Dans cette relation, la variable « Sexe » prend la valeur 1 pour les hommes et 0 pour les femmes.
3. Décomposition des masses corporelles :
Masse Grasse absolue (en kg) = Poids (kg) × [IMG (%) / 100].
Masse Maigre active (en kg) = Poids (kg) − Masse Grasse (kg).
4. Calcul de l'intervalle de poids normal théorique de l'OMS :
Poids minimum sain (kg) = 18,5 × [Taille (m)]².
Poids maximum sain (kg) = 24,9 × [Taille (m)]².

V. Grille d'Interprétation Comparative : IMC Standard vs IMG Sportif

L'analyse croisée permet de comprendre avec finesse sa situation athlétique :
- Selon le barème universel de l'IMC de l'OMS :
  * Moins de 18,5 kg/m² : Insuffisance pondérale / Maigreur (à surveiller chez les coureurs de fond).
  * 18,5 à 24,9 kg/m² : Corpulence normale et optimale pour la population générale.
  * 25,0 à 29,9 kg/m² : Surpoids (normal pour un sportif musclé, à corriger pour un sédentaire).
  * 30,0 kg/m² et plus : Obésité de classe 1, 2 ou 3 avec risques cardiovasculaires avérés.
- Selon le barème de l'Indice de Masse Grasse (IMG) chez le sportif :
  * Chez l'homme : Un taux de 8% à 12% caractérise l'athlète affûté en période compétitive (12% à 15% en phase générale, 15% à 20% pour un homme sédentaire sain). En dessous de 6%, l'organisme entre dans une zone de danger immunitaire et articulaire.
  * Chez la femme : Un taux de 16% à 22% caractérise la sportive affûtée (22% à 25% en phase générale, 25% à 30% pour une femme sédentaire saine). Descendre sous les 14% expose la femme au syndrome RED-S (déficit énergétique relatif dans le sport) entraînant des dérèglements menstruels et une déminéralisation osseuse.

VI. Recommandations Nutritionnelles et Conseils d'Entraînement

Pour un sportif cherchant à optimiser son poids de forme, l'objectif ne doit jamais être de perdre du poids brut sur la balance de façon drastique, mais bien de modifier son ratio de composition corporelle : préserver ou développer la masse musculaire active tout en réduisant modérément l'excédent lipidique. En EPS et en préparation physique, ce suivi permet de sensibiliser les jeunes à l'adoption d'habitudes de vie saines, de lutter contre les régimes restrictifs dangereux et d'encourager la pratique régulière d'activités physiques complètes combinant endurance aérobie et renforcement musculaire.`
  },

  meteo: {
    id: 'meteo',
    fileName: 'calculateur-chaleur-meteo-altitude.html',
    titleFr: 'Ajustement Chaleur, Humidité, Vent & Altitude',
    titleEn: 'Weather, Heat Index & Altitude Paces Adjustment',
    titleAr: 'حاسبة تأثير الحرارة والرطوبة والارتفاع على إيقاع الجري',
    badge: 'Cluster 2C · Éco-Physiologie & Thermorégulation',
    guideSteps: [
      'Indiquez la température extérieure sous abri (°C) et le taux d\'humidité relative de l\'air (%), ou votre indice météo local.',
      'Renseignez l\'altitude du lieu d\'entraînement ou de compétition en mètres (ex. 0 m au bord de la mer, 1 650 m à Ifrane, 2 400 m à Font-Romeu).',
      'Indiquez votre vitesse habituelle ou allure cible sur le plat par temps frais (min/km ou sec/km) pour découvrir votre ralentissement physiologique inévitable, votre allure ajustée protectrice et vos besoins hydriques horaires en eau et sodium.'
    ],
    mathFormulas: [
      { label: 'Calcul du Point de Rosée (Formule de Magnus-Tetens)', formula: 'Td = (b × α) / (a − α) où α = [a·T / (b + T)] + ln(RH / 100)' },
      { label: 'Indice Combiné Chaleur & Humidité (Heat Stress)', formula: 'Score = Température (°C) + [Humidité relative (%) × 0,1]' },
      { label: 'Déclassement Thermique d’allure (McMillan / ACSM)', formula: 'Perte de 1,5% à 3,0% par palier de 5°C au-delà de 15°C' },
      { label: 'Déclassement Hypoxique d’Altitude (Peronnet)', formula: 'Perte de VO2 Max ≈ 1,0% à 1,5% par tranche de 100 m au-dessus de 900 m' },
      { label: 'Allure Corrigée Protectrice', formula: 'Allure Ajustée = Allure Référence / (1 − Déclassement Total)' },
      { label: 'Débit Sudoral et Besoins Électrolytiques', formula: 'Pertes = 500 à 1200 ml/h d’eau + 400 à 800 mg/h de Sodium (selon Td)' }
    ],
    interpretationSummary: 'Vouloir maintenir une allure de course programmée par temps chaud, humide ou en altitude provoque une dérive cardiaque sévère et expose l\'athlète au coup de chaleur. Ajuster l\'allure préserve le même bénéfice physiologique métabolique.',
    benchmarks: [
      { label: 'Conditions Idéales / Record Personnel', value: 'Température 8–14°C · Altitude < 500 m', desc: 'Thermorégulation optimale, évaporation complète de la sueur, aucune pénalité chronométrique.', tone: 'emerald' },
      { label: 'Conditions Modérées / Vigilance', value: 'Température 18–24°C · Altitude 1000–1600 m', desc: 'Ralentissement physiologique de 2% à 5% (+5 à +15 sec/km). Boire 500 à 700 ml d’eau par heure.', tone: 'blue' },
      { label: 'Conditions Sévères / Chaleur Lourde', value: 'Température 25–32°C ou Altitude > 2000 m', desc: 'Ralentissement de 6% à 12% (+15 à +35 sec/km). Dérive cardiaque de 10 à 20 bpm. Sodium requis.', tone: 'amber' },
      { label: 'Zone Critique / Risque Vital Coup de Chaleur', value: 'T > 33°C avec humidité > 70% ou WBGT > 28°C', desc: 'Évaporation bloquée. Remplacer les séances d’intensité par du renforcement à l’ombre fraîche.', tone: 'rose' }
    ],
    fullRawText: `I. Introduction à l'Éco-Physiologie de l'Effort et Thermorégulation

Lorsque nous courons ou pratiquons une activité physique soutenue, les muscles squelettiques ne convertissent qu'environ vingt à vingt-cinq pour cent de l'énergie chimique consommée en travail mécanique externe. Les soixante-quinze à quatre-vingts pour cent restants sont immédiatement dissipés sous forme d'énergie thermique pure : le corps humain agit ainsi littéralement comme un moteur à combustion qui dégage une chaleur colossale. Pour maintenir sa température centrale vitale dans un intervalle étroitement régulé entre trente-sept et trente-huit degrés Celsius, l'organisme met en branle des mécanismes de thermorégulation puissants, dont le plus déterminant est l'évaporation de la sueur sécrétée par les glandes sudoripares. Cependant, l'efficacité de cette évaporation ne dépend pas uniquement du thermomètre : elle est intimement liée au taux d'humidité de l'air ambiant. Par ailleurs, lorsque l'on s'entraîne en altitude, un tout autre phénomène physiologique entre en jeu : la raréfaction de la pression atmosphérique et la baisse de la pression partielle en dioxygène (hypoxie). Ignorer ces contraintes environnementales et s'obstiner à maintenir les chronos établis par temps frais au niveau de la mer est l'erreur la plus fréquente des sportifs, conduisant directement à l'épuisement prématuré, à la déshydratation aiguë et au redoutable coup de chaleur d'exercice.

II. Guide d'Utilisation Étape par Étape

Pour déterminer vos allures réelles et vos protocoles d'hydratation selon votre environnement :
1. Collecte des paramètres météorologiques : Renseignez la température sous abri en degrés Celsius ainsi que le pourcentage d'humidité relative de l'air au moment de votre sortie (données disponibles sur n'importe quelle application météo locale).
2. Saisie de l'altitude du parcours : Indiquez l'altitude moyenne en mètres. Si vous vous entraînez au bord de l'océan, entrez zéro ; si vous êtes sur les hauts plateaux de l'Atlas ou d'Ifrane, renseignez mille six cent cinquante mètres.
3. Renseignement de votre allure de référence sur le plat : Indiquez votre allure habituelle par temps frais (10°C à 15°C au niveau de la mer) sur la distance visée (ex. 4 min 30 s au kilomètre ou 270 secondes).
4. Analyse des résultats et recommandations : Le calculateur dévoile le point de rosée de votre environnement, le pourcentage exact de déclassement physiologique, l'allure corrigée à adopter pour préserver votre cœur, ainsi que le volume horaire précis d'eau et de sodium à absorber.

III. Explication des Paramètres et Notions Météorologiques Clés

Comprendre les variables d'ambiance est indispensable pour anticiper la fatigue :
- La température de l'air (°C) : Plus l'air est chaud, plus le gradient thermique entre la peau et l'environnement se réduit, diminuant la déperdition de chaleur par convection et rayonnement.
- L'humidité relative (%) : Elle indique le niveau de saturation de l'air en vapeur d'eau. Dans un air sec (30% d'humidité), la sueur s'évapore instantanément et refroidit le corps. Dans un air tropical ou étouffant (80% d'humidité), la sueur ruisselle sur la peau sans s'évaporer : le corps perd son eau et ses minéraux sans réussir à abaisser sa température interne.
- Le Point de Rosée (Dew Point) : C'est le véritable juge de paix de la chaleur ressentie par le coureur. Un point de rosée supérieur à 18°C commence à peser sur l'organisme ; au-delà de 22°C, l'effort devient éprouvant et dangereux.
- L'altitude (mètres) : Bien que la proportion d'oxygène dans l'air reste constante à 20,9%, la baisse de pression barométrique en altitude réduit la pression partielle d'oxygène dans les alvéoles pulmonaires, diminuant la saturation de l'hémoglobine et le VO2 Max d'environ un pour cent tous les cent mètres au-delà de mille mètres.

IV. Relations Mathématiques et Équations de Déclassement

Le calculateur intègre les formules physiques et biomédicales validées :
1. Calcul du point de rosée (Formule de Magnus-Tetens) :
Td = (b × α) / (a − α)
où a = 17,27, b = 237,7°C et α = [(a × T) / (b + T)] + ln(Humidité / 100).
2. Déclassement thermique d'allure (Modèle McMillan / ACSM) :
Entre 15°C et 20°C, la vitesse de course baisse d'environ 1,5% à 2,0%.
Entre 21°C et 26°C, la baisse atteint 3,0% à 5,0%.
Entre 27°C et 32°C, la baisse s'élève de 6,0% à 9,0%.
Au-delà de 33°C avec humidité élevée, le déclassement dépasse 12% à 15%.
3. Déclassement hypoxique en altitude (Modèle Péronnet) :
Jusqu'à 900 mètres, l'impact est négligeable sur les courses de fond.
Au-delà de 1 000 mètres, le VO2 Max diminue d'environ 1,2% par 100 mètres de dénivelé positif d'altitude.
4. Formule de calcul de l'allure corrigée :
Allure Réelle Ajustée (min/km) = Allure de Référence / (1 − Déclassement Total).
Exemple concret : Si un coureur vaut 4:00/km (240 s) par temps frais et subit un déclassement combiné de 8% (chaleur + altitude) :
Allure corrigée = 240 / (1 − 0,08) = 240 / 0,92 = 260,8 secondes, soit environ 4 min 21 s au kilomètre.
En courant à 4:21/km, son cœur battra exactement à la même fréquence et sollicitera la même fraction de VO2 Max qu'à 4:00/km dans des conditions tempérées.

V. Grille de Sécurité WBGT et Plans d'Hydratation

L'adaptation nutritionnelle et hydrique est indissociable du climat :
- Plan d'hydratation horaire : Pour un point de rosée inférieur à 15°C, boire 400 à 600 ml d'eau par heure suffit. Lorsque le point de rosée dépasse 18°C, le débit de sudation s'élève souvent à plus de 1 000 ml par heure. L'estomac ne pouvant guère absorber plus de 800 ml par heure, il convient de boire par petites gorgées régulières de 150 ml toutes les dix à quinze minutes.
- Compensation en Sodium : La sueur contient environ un gramme de sodium par litre. Par forte chaleur sur des efforts de plus d'une heure, boire de l'eau pure expose à l'hyponatrémie de dilution (chute dangereuse du sodium sanguin). Il est impératif d'ajouter 500 à 800 mg de sodium par litre de boisson d'effort.

VI. Recommandations Pédagogiques et Organisationnelles

En EPS comme en club d'athlétisme, l'enseignant et le coach doivent appliquer une politique de prudence climatique :
- Décaler les séances aux heures les plus fraîches de la matinée (avant 9h30) ou en soirée.
- Raccourcir la durée des fractions d'effort et allonger les temps de récupération passive à l'ombre.
- Encourager le port de vêtements légers, clairs et respirants qui facilitent la circulation de l'air.
- Surveiller les signaux d'alarme du coup de chaleur : vertiges, cessation anormale de la sudation, maux de tête violents, peau chaude et rouge, confusion ou nausées. À la moindre alerte, arrêt immédiat de l'exercice, mise au repos au frais et réhydratation active.`
  },

  gap: {
    id: 'gap',
    fileName: 'calculateur-gap-pente-nutrition.html',
    titleFr: 'Allure Ajustée à la Pente (GAP) & Nutrition',
    titleEn: 'Grade Adjusted Pace (GAP) & Trail Running Nutrition',
    titleAr: 'حاسبة إيقاع الجري في المنحدرات GAP والتغذية الرياضية',
    badge: 'Cluster 2D · Trail & Bioénergétique de Pente',
    guideSteps: [
      'Indiquez votre allure de référence sur le plat ou votre vitesse chronométrée réelle en montée ou en descente.',
      'Renseignez le pourcentage moyen de la pente (+% pour une côte, -% pour une descente) ou le dénivelé franchi sur la distance parcourue.',
      'Saisissez votre poids corporel et la durée totale estimée de votre sortie pour débloquer votre Allure Ajustée à la Pente (GAP - modèle de Minetti), vos dépenses caloriques et votre plan horaire d\'apport glucidique.'
    ],
    mathFormulas: [
      { label: 'Équation polynomiale du coût énergétique Cr (Minetti 2002)', formula: 'Cr = 155,4·i⁵ − 30,4·i⁴ − 43,3·i³ + 46,3·i² + 19,5·i + 3,6 (en J/kg/m)' },
      { label: 'Facteur d’équivalence mécanique de pente', formula: 'Facteur = Cr(pente i) / Cr(plat i = 0)' },
      { label: 'Allure Ajustée à la Pente équivalente (GAP)', formula: 'GAP (min/km) = Allure Réelle (min/km) / Facteur' },
      { label: 'Dépense énergétique kilométrique', formula: 'Énergie (kcal) ≈ Poids (kg) × Distance (km) × (Cr_pente / Cr_plat)' },
      { label: 'Cibles d’oxydation glucidique exogène (Jeukendrup)', formula: 'Durée 1h–2h : 30–60 g/h | Durée > 2h30 : 60–90 g/h (ratio 2:1 glucose-fructose)' }
    ],
    interpretationSummary: 'L\'Allure Ajustée à la Pente (Grade Adjusted Pace) convertit l\'effort produit en côte ou en descente en son équivalent métabolique exact sur terrain plat, neutralisant les pièges du dénivelé.',
    benchmarks: [
      { label: 'Pente Faible (+3% à +5%)', value: 'Surcoût énergétique +20% à +35%', desc: 'Hausse modérée du coût O2. Raccourcir légèrement la foulée, maintenir une cadence haute (> 175 spm).', tone: 'blue' },
      { label: 'Pente Forte (+8% à +12%)', value: 'Surcoût énergétique +60% à +95%', desc: 'Courir à 8 km/h équivaut physiologiquement à 13 km/h sur le plat. Gérer l\'acidose lactique.', tone: 'amber' },
      { label: 'Pente Très Raide (> +15%)', value: 'Surcoût supérieur à +120%', desc: 'La marche athlétique dynamique avec appui mains sur les cuisses devient plus économe que la course.', tone: 'rose' },
      { label: 'Descente Modérée (-5% à -8%)', value: 'Économie d’O2 maximale', desc: 'Vitesse supérieure pour un coût cardiaque faible, mais contrainte musculaire excentrique majeure.', tone: 'emerald' },
      { label: 'Descente Raide (< -12%)', value: 'Freinage musculaire coûteux', desc: 'Le coût énergétique remonte en raison de la force de freinage des quadriceps.', tone: 'amber' }
    ],
    fullRawText: `I. Introduction à la Biomécanique de Course en Pente et Concept GAP

Dans la pratique de la course sur route vallonnée, du trail running, du cross-country et de la course d'orientation en milieu naturel, le chronomètre traditionnel et la vitesse instantanée affichée sur la montre GPS deviennent des indicateurs trompeurs. Un coureur qui progresse à huit kilomètres par heure sur une montée sévère de dix pour cent peut avoir l'impression erronée de se traîner, alors que son système cardiorespiratoire et ses fibres musculaires travaillent en réalité à cent pour cent de leur VMA. À l'inverse, lors d'une descente rapide à seize kilomètres par heure, son cœur peut battre à une fréquence très modérée tout en soumettant ses quadriceps à une contrainte mécanique destructrice. Pour comparer équitablement les intensités d'effort indépendamment du relief et calibrer intelligemment ses allures, les chercheurs en biomécanique ont créé le concept d'Allure Ajustée à la Pente, mondialement connue sous l'acronyme GAP (pour Grade Adjusted Pace). Le modèle de référence absolue utilisé par les plus grandes plateformes scientifiques et d'analyse athlétique repose sur les travaux pionniers du professeur Alberto E. Minetti et de son équipe, publiés au début des années deux mille.

II. Guide d'Utilisation Étape par Étape

Pour utiliser le calculateur GAP et établir votre stratégie de gestion d'effort et de ravitaillement :
1. Renseignement de l'allure ou de la vitesse : Entrez votre allure chronométrée observée sur la pente en minutes et secondes par kilomètre, ou indiquez votre allure de base sur le plat.
2. Saisie du pourcentage de déclivité : Renseignez la pente moyenne du secteur. Utilisez un chiffre positif pour les montées (par exemple +8% pour une côte de 80 mètres de dénivelé sur 1 000 mètres de distance) et un chiffre négatif pour les descentes (par exemple -6%).
3. Renseignement du poids et de la durée : Entrez votre poids corporel en kilogrammes ainsi que la durée totale estimée de votre séance ou compétition en minutes.
4. Analyse des indicateurs délivrés : Le calculateur affiche instantanément votre allure GAP équivalente sur le plat, le surcoût énergétique métabolique encouru, la dépense calorique prévisionnelle et votre plan nutritionnel horaire en glucides et hydratation.

III. Explication des Paramètres et Notions de Biomécanique

La physique de la course en terrain accidenté obéit à des lois biomécaniques strictes :
- La pente (ou Grade en pourcentage) : Elle représente le dénivelé vertical divisé par la distance horizontale parcourue, multiplié par cent. Une pente de +10% signifie qu'à chaque kilomètre parcouru au sol, vous élevez votre centre de gravité de cent mètres verticalement contre la gravité terrestre.
- Le coût énergétique de locomotion (Cr) : C'est la quantité d'énergie métabolique (exprimée en Joules par kilogramme de masse corporelle et par mètre parcouru) nécessaire pour déplacer l'organisme. Sur le plat, le coût énergétique est remarquablement stable chez un coureur régulier, autour de 3,6 à 4,0 J/kg/m. Dès que la pente s'élève, le coût explose car le coureur doit vaincre son propre poids dans le champ de pesanteur.
- La durée totale de l'épreuve : Elle conditionne l'épuisement des réserves de glycogène hépatique et musculaire, dictant la stratégie d'apport en glucides exogènes.

IV. Relations Mathématiques et Équations de Minetti

Le modèle repose sur l'équation polynomiale du cinquième degré établie par Alberto Minetti (2002) mesurant la consommation d'oxygène sur tapis roulant incliné :
1. Équation du coût énergétique de course Cr :
Cr = 155,4·i⁵ − 30,4·i⁴ − 43,3·i³ + 46,3·i² + 19,5·i + 3,6 (en J/kg/m),
où « i » représente la pente sous forme décimale (par exemple i = +0,10 pour +10%, ou i = -0,05 pour -5%).
2. Calcul du facteur d'équivalence GAP :
Facteur = Cr(pente) / Cr(plat).
Sur le plat (i = 0), Cr(0) = 3,6 J/kg/m.
Pour une montée de +10% (i = 0,10), le coût Cr grimpe à environ 6,85 J/kg/m.
Le facteur d'équivalence vaut alors 6,85 / 3,6 ≈ 1,90.
3. Calcul de l'allure GAP :
GAP (en min/km) = Allure Réelle de montée / Facteur.
Exemple concret : Si vous montez une côte à 10% à une vitesse de 7:30/km (450 s/km) :
GAP = 450 / 1,90 = 236,8 secondes, soit 3 min 57 s au kilomètre sur le plat !
Cette égalité prouve que votre organisme subit exactement la même contrainte cardiaque et respiratoire que si vous couriez à 15,2 km/h sur une piste d'athlétisme plane.
4. Phénomène paradoxal en descente :
Entre 0% et -10%, le coût énergétique diminue jusqu'à un minimum situé vers -10% (où Cr tombe à environ 1,7 J/kg/m), car la gravité aide à la propulsion. Cependant, au-delà de -15% de pente négative, le coût énergétique remonte en flèche : le coureur doit exercer un freinage excentrique massif pour ne pas chuter, ce qui détruit les ponts actine-myosine et engendre des microlésions musculaires sévères.

V. Stratégie Nutritionnelle et Apports Glucidiques Horaires

En trail et course de longue durée, le métabolisme énergétique doit être compensé sans discontinuer :
- Ravitaillement selon la durée (Recommandations Asker Jeukendrup / ACSM) :
  * Moins de 45 minutes : Aucun apport glucidique nécessaire, un rinçage buccal peut suffire.
  * De 45 à 75 minutes : Apports légers de 30 g de glucides par heure.
  * De 1h15 à 2h30 : Apport standard de 30 à 60 g de glucides par heure sous forme de gels énergétiques ou de boisson isotonique.
  * Au-delà de 2h30 à 3h00 (Trails longs, marathons, ultra) : Les récepteurs intestinaux au glucose (SGLT1) saturent à 60 g/heure. Pour assimiler jusqu'à 90 g voire 100 g de glucides par heure sans troubles digestifs, il est impératif d'utiliser un mélange glucidique multiple associant maltodextrines/glucose et fructose selon un ratio 2:1 ou 1:0,8, exploitant les transporteurs GLUT5.

VI. Conseils Pratiques de Gestion de Course et de Sécurité

La gestion d'allure en côte impose de briser le piège psychologique de la vitesse chronométrique :
- En montée : Ne cherchez jamais à garder votre vitesse du plat. Fiez-vous à votre fréquence cardiaque, à votre perception d'effort (RPE) ou à votre allure GAP. Réduisez l'amplitude de votre foulée et augmentez votre cadence. Dès que la pente dépasse quinze à vingt pour cent, basculez en marche athlétique active en posant les mains sur les cuisses : le rendement métabolique est supérieur et épargne les mollets.
- En descente : Évitez l'attaque talon freinée jambe tendue qui martyrise les genoux et les quadriceps. Gardez le buste légèrement penché dans la pente, posez le médio-pied sous le bassin et laissez tourner les jambes avec agilité.`
  },

  hiit: {
    id: 'hiit',
    fileName: 'generateur-intermittent-hiit-cod.html',
    titleFr: 'Générateur Intermittent HIIT & Navette COD 180°',
    titleEn: 'HIIT Intermittent & 180° COD Shuttle Generator',
    titleAr: 'مولد التدريب المتقطع HIIT وتغيير الاتجاه 180 درجة',
    badge: 'Cluster 3A · Conditionnement Physique & Sports Co',
    guideSteps: [
      'Entrez la VMA (en km/h) de l\'élève ou du groupe homogène (ou la VIFT issue du test 30-15 de Martin Buchheit).',
      'Définissez les paramètres de la séquence intermittente : durée de la fraction d\'effort en secondes (ex. 10s, 15s ou 30s), temps de récupération (ex. 10s, 15s ou 30s) et pourcentage de VMA visé (ex. 100% à 120%).',
      'Choisissez la configuration du terrain : Ligne droite continue ou Navette avec virages à 180° en indiquant la longueur de terrain disponible (ex. 20 m gymnase handball, 25 m basket, 40 m ou 0 m sur piste).',
      'Le générateur calcule instantanément la distance exacte en mètres à baliser entre vos plots, le nombre de demi-tours et la pénalité biomécanique déduite.'
    ],
    mathFormulas: [
      { label: 'Distance théorique en ligne droite (Piste continue)', formula: 'Distance (m) = [VMA (km/h) / 3,6] × (%VMA / 100) × Durée effort (sec)' },
      { label: 'Vitesse de déplacement cible en mètres/seconde', formula: 'V_cible (m/s) = (VMA / 3,6) × (%Intensité / 100)' },
      { label: 'Pénalité biomécanique par virage COD 180° (Buchheit)', formula: 'Perte de temps ≈ 0,72 s par demi-tour (ou pénalité métabolique de 1,5 à 2,0 m)' },
      { label: 'Distance cible ajustée avec navettes', formula: 'D_ajustée (m) = D_linéaire − (Nombre de COD 180° × Pénalité_mètres)' },
      { label: 'Décomposition du parcours sur le terrain', formula: 'Trajet = N allers-retours complets de L mètres + reliquat métrique r' }
    ],
    interpretationSummary: 'En sports collectifs et en EPS de gymnase, chaque virage à 180° oblige le joueur à décélérer jusqu\'à l\'arrêt complet puis à réaccélérer. Omettre cette correction COD conduit inévitablement à un épuisement lactique précoce et à des risques de blessure.',
    benchmarks: [
      { label: 'Format Court Linéaire (15"/15" Piste)', value: '105–115% VMA', desc: 'Fractions d’effort à haute intensité sans relance. Excellent pour développer le VO2 Max sans contrainte excentrique.', tone: 'blue' },
      { label: 'Format Court Navette 180° (15"/15" Terrain 20m)', value: '95–100% VMA ajustée', desc: 'Contrainte neuromusculaire maximale. Distance réduite de 4 à 8 mètres pour compenser les freinages.', tone: 'emerald' },
      { label: 'Format Moyen (30"/30" Football / Rugby)', value: '100–105% VMA', desc: 'Sollicitation cardiorespiratoire soutenue avec cinétique de consommation d’oxygène élevée.', tone: 'amber' },
      { label: 'Format Puissance Supramaximale (10"/20" Explosif)', value: '115–125% VMA ou %ASR', desc: 'Recrutement massif des fibres rapides de type II, puissance alactique et PMA.', tone: 'rose' }
    ],
    fullRawText: `I. Introduction à l'Intermittent Court et Problématique Biomécanique du COD

L'entraînement par intervalles à haute intensité, universellement désigné sous l'acronyme HIIT (High-Intensity Interval Training) ou travail intermittent en milieu francophone, s'est imposé comme la méthode la plus efficace pour stimuler la puissance aérobie maximale (PAM) et le VO2 Max, tant en préparation physique athlétique qu'en Éducation Physique et Sportive. Les formats courts de type 15s/15s, 30s/30s ou 10s/20s permettent aux athlètes de cumuler un temps de travail effectif à haute intensité cardiovasculaire bien supérieur à ce qu'un effort continu permettrait avant épuisement. Cependant, une problématique pratique majeure surgit dès que cet entraînement quitte la piste d'athlétisme pour être réalisé sur les installations réelles des sports collectifs (terrains de football, gymnases de handball, terrains de basket-ball ou cours d'école). Sur ces surfaces confinées, la course ne se fait plus en ligne droite : elle impose des allers-retours en navettes avec des changements de direction brutaux à 180° (qualifiés de COD, pour Change Of Direction). Or, chaque demi-tour oblige l'athlète à freiner activement, à bloquer son centre de gravité en régime musculaire excentrique puissant, puis à réaccélérer en régime concentrique. Si l'entraîneur calcule la distance à parcourir en appliquant bêtement la formule de la ligne droite, les élèves ou joueurs se retrouvent en surrégime lactique prématuré en quelques répétitions et échouent à terminer la séance.

II. Guide d'Utilisation Étape par Étape

Pour baliser vos plots d'intermittent avec une exactitude chirurgicale sur n'importe quel terrain :
1. Évaluation et saisie de la VMA : Renseignez la Vitesse Maximale Aérobie de l'élève ou la moyenne d'un groupe homogène en kilomètres par heure (obtenue lors d'un test Demi-Cooper ou Luc-Léger). Si vous utilisez le test 30-15 Intermittent Fitness Test (30-15 IFT) de Martin Buchheit, vous pouvez entrer directement la VIFT.
2. Paramétrage de la structure temporelle : Choisissez la durée de la fraction d'effort en secondes (ex. 15 s) et la durée de la récupération (ex. 15 s). Définissez l'intensité ciblée en pourcentage de VMA (par exemple 100%, 105% ou 110%).
3. Choix de la configuration du terrain : Sélectionnez soit la piste linéaire continue (sans virage, longueur mise à 0), soit une navette délimitée par la taille de votre salle (ex. 20 m sur terrain de handball, 28 m sur terrain de basket, 40 m sur demi-terrain de football).
4. Génération des repères de terrain : Le calculateur délivre instantanément la distance exacte en mètres de la piste linéaire, la distance corrigée avec pénalité COD, le nombre de demi-tours à 180° et le balisage concret (ex. deux allers-retours de 20 m plus 7,5 mètres d'amorce).

III. Explication des Paramètres et Enjeux de Terrain

La précision du paramétrage garantit la réussite de la séance :
- VMA ou VIFT (km/h) : Vitesse étalon servant de base mécanique. La VIFT intègre déjà une composante d'accélération et de récupération intermittente.
- Longueur de la navette (mètres) : Plus la navette est courte (ex. 15 m ou 20 m), plus le nombre de virages par fraction est élevé, et plus la pénalité kilométrique à déduire est importante.
- Pourcentage d'intensité visé (% VMA) : En ligne droite, les intensités usuelles sur 15s/15s oscillent entre 105% et 115% de VMA. En navette avec virages 180°, il est fortement recommandé de calibrer entre 95% et 100% de VMA ajustée pour ne pas saturer prématurément le système neuromusculaire.

IV. Relations Mathématiques et Équations de Martin Buchheit

Le générateur applique la modélisation cinétique développée par Martin Buchheit :
1. Calcul de la distance théorique linéaire (sans virage) :
Vitesse en mètres par seconde (m/s) = [VMA (km/h) / 3,6] × (%VMA / 100).
Distance Linéaire (mètres) = Vitesse (m/s) × Durée de l'effort (secondes).
Exemple : Pour une VMA de 14,4 km/h (soit 4,0 m/s) à 100% sur 15 secondes d'effort :
Distance linéaire = 4,0 × 15 = 60,0 mètres.
2. Détermination du nombre de virages COD 180° :
Sur une navette de longueur L mètres (par exemple L = 20 mètres) :
Nombre de demi-tours complets N = Entier inférieur de (Distance linéaire / L).
Pour 60 mètres sur navette de 20 m, le coureur fait l'aller (20m), le retour (20m) et l'aller (20m), soit exactement 2 demi-tours à 180°.
3. Modélisation de la pénalité de virage :
Chaque demi-tour à 180° induit une perte de temps mécanique d'environ 0,72 seconde due à la phase de décélération et de réaccélération. En distance équivalente, cela correspond à une soustraction métrique d'environ :
Pénalité par virage (mètres) = Vitesse (m/s) × 0,72 seconde (soit environ 2 à 3 mètres selon la vitesse).
Distance Cible Ajustée = Distance Linéaire − (Nombre de virages × Pénalité).
Dans notre exemple : Distance ajustée = 60 m − (2 × 2,88 m) ≈ 54,2 mètres.
L'élève doit donc parcourir 54,2 mètres au lieu de 60 mètres : deux allers-retours de 20 m (40 m) plus 14,2 mètres balisés par un plot intermédiaire.

V. Grille d'Interprétation et Programmation par Niveaux

L'individualisation par plots offre des perspectives didactiques remarquables :
- Formats d'effort recommandés :
  * 15s effort / 15s récupération : Le grand classique polyvalent. Deux à trois blocs de six à huit minutes entrecoupés de trois minutes de récupération passive.
  * 30s effort / 30s récupération : Plus orienté sur la tolérance lactique et la résistance cardiovasculaire de moyenne durée. Idéal pour les sports comme le rugby et le football.
  * 10s effort / 20s récupération : Format explosif permettant de monter à 115%-120% de VMA sans acidification excessive grâce au renouvellement rapide de la phosphocréatine.
- Organisation pédagogique par couloirs homogènes :
En classe ou en club, tracez des couloirs parallèles. Les élèves de VMA 12 km/h courent dans le couloir 1, ceux de VMA 14 km/h dans le couloir 2, et ceux de VMA 16 km/h dans le couloir 3. Le coup de sifflet est simultané pour tout le monde, mais chaque groupe possède son plot d'arrivée ajusté.

VI. Sécurité Musculaire et Recommandations Pratiques

L'entraînement en navette sollicite intensément la chaîne musculaire postérieure et les ischio-jambiers lors des phases de freinage excentrique :
- Assurez-vous d'un échauffement spécifique préalable intégrant des accélérations progressives, des freinages contrôlés et du travail de proprioception des chevilles et des genoux.
- Vérifiez l'adhérence du sol (éviter les surfaces glissantes ou poussiéreuses propices aux entorses lors des pivots).
- Respectez une progression méthodique : commencez la saison par de l'intermittent en ligne droite avant d'introduire progressivement les navettes avec changements de direction à 180°.`
  },

  charge: {
    id: 'charge',
    fileName: 'calculateur-charge-rpe-foster-acwr.html',
    titleFr: 'Charge RPE Foster & Ratio ACWR',
    titleEn: 'Foster sRPE Training Load & ACWR Injury Risk Ratio',
    titleAr: 'حاسبة حمل التدريب RPE Foster ومؤشر الوقاية من الإصابات ACWR',
    badge: 'Cluster 3B · Monitoring de Charge & Prévention des Blessures',
    guideSteps: [
      'À l\'issue de chaque séance d\'entraînement ou de match (environ 15 à 30 minutes après le retour au calme), évaluez votre effort perçu global sur l\'échelle RPE de Foster / Borg CR10 (de 1 très léger à 10 effort maximal absolu).',
      'Renseignez la durée effective de la séance en minutes pour obtenir la charge interne en Unités Arbitraires (UA = Durée × RPE).',
      'Suivez vos charges quotidiennes sur la semaine pour obtenir votre Charge Aiguë (7 jours), votre Monotonie, votre Contrainte (Strain) et comparez-la à votre Charge Chronique habituelle (moyenne des 4 dernières semaines) pour obtenir votre ratio ACWR.'
    ],
    mathFormulas: [
      { label: 'Charge Interne de Séance de Carl Foster (sRPE)', formula: 'Charge de Séance (UA) = Durée de la séance (minutes) × Score RPE (0 à 10)' },
      { label: 'Charge Hebdomadaire Aiguë (Acute Load)', formula: 'Charge Aiguë (UA) = Somme des charges de séance des 7 derniers jours' },
      { label: 'Indice de Monotonie de Foster', formula: 'Monotonie = Charge journalière moyenne (7j) / Écart-type des charges journalières (7j)' },
      { label: 'Indice de Contrainte Globale (Training Strain)', formula: 'Contrainte (Strain) = Charge Hebdomadaire Aiguë × Monotonie' },
      { label: 'Ratio Charge Aiguë : Chronique (ACWR de Tim Gabbett)', formula: 'ACWR = Charge Aiguë (7 jours) / Charge Chronique Hebdomadaire Moyenne (28 jours)' }
    ],
    interpretationSummary: 'Le modèle couplé de Carl Foster et Tim Gabbett constitue le standard scientifique mondial pour monitorer la fatigue interne, optimiser le pic de forme et prévenir jusqu\'à 80% des blessures de surmenage musculaire et tendineux.',
    benchmarks: [
      { label: 'Zone de Sous-Entraînement', value: 'ACWR < 0,80', desc: 'Charge récente insuffisante par rapport aux habitudes. Risque de désadaptation aérobie et vulnérabilité lors de la reprise.', tone: 'slate' },
      { label: 'Zone Optimale / « Sweet Spot » de Gabbett', value: '0,80 ≤ ACWR ≤ 1,30', desc: 'Progression physiologique maximale avec risque de blessure minimal (< 5%). Adaptation parfaite.', tone: 'emerald' },
      { label: 'Zone de Vigilance / Surcharge Modérée', value: '1,31 ≤ ACWR ≤ 1,50', desc: 'Augmentation rapide de la fatigue. Surveillance du sommeil, réduction de la monotonie requise.', tone: 'amber' },
      { label: 'Zone Critique / Risque Majeur de Blessure', value: 'ACWR > 1,50', desc: 'Pic de charge brutal (+50%). Risque de blessure musculaire ou tendineuse triplé dans les 7 à 14 jours suivants.', tone: 'rose' }
    ],
    fullRawText: `I. Introduction au Suivi de Charge et Révolution du Modèle sRPE / ACWR

Dans l'univers du sport contemporain, de l'athlétisme aux sports collectifs professionnels jusqu'à la pratique scolaire en EPS, la performance athlétique résulte d'un équilibre délicat entre deux forces opposées : la charge d'entraînement qui stimule l'adaptation physiologique et la fatigue qui s'accumule au fil des séances. Pendant longtemps, les entraîneurs n'ont quantifié que la charge externe : le nombre de kilomètres courus, le nombre de levées de fonte ou la vitesse chronométrée. Cependant, deux athlètes effectuant la même séance externe subissent un stress interne radicalement différent selon leur niveau de forme, leur état de fatigue nerveuse, leur sommeil et leur niveau de stress personnel. Pour capturer cette réalité biologique interne sans recourir à des prises de sang ou des appareils invasifs coûteux, le professeur américain Carl Foster a mis au point dans les années quatre-vingt-dix la méthode de la Session-RPE (sRPE). Plus tard, le chercheur australien Tim Gabbett a enrichi cette approche en formalisant le concept de ratio Charge Aiguë / Charge Chronique (ACWR pour Acute:Chronic Workload Ratio). Ce couplage est aujourd'hui universellement reconnu comme l'outil le plus puissant pour maximiser la condition physique tout en réduisant drastiquement les blessures sans contact.

II. Guide d'Utilisation Étape par Étape

Pour monitorer avec rigueur votre charge d'entraînement et sécuriser votre progression :
1. Évaluation différée du RPE : Environ quinze à trente minutes après la fin de la séance d'entraînement ou du match (afin d'éviter que le ressenti des toutes dernières minutes ne biaise le jugement global), posez-vous la question simple : « Comment avez-vous trouvé la séance dans sa globalité ? ». Évaluez l'effort sur l'échelle de Borg CR10 modifiée de Foster, allant de 1 (très facile) à 10 (effort maximal absolu).
2. Calcul de la charge de séance : Renseignez la durée réelle de l'entraînement en minutes (sans compter les pauses prolongées de vestiaire) et multipliez-la par le score RPE. Le résultat s'exprime en Unités Arbitraires (UA).
3. Suivi hebdomadaire et calcul de la Monotonie : Enregistrez les charges quotidiennes sur l'ensemble des sept jours de la semaine pour obtenir la Charge Aiguë hebdomadaire et l'Indice de Monotonie.
4. Comparaison avec la Charge Chronique et lecture de l'ACWR : Saisissez la moyenne hebdomadaire des charges accumulées au cours des quatre dernières semaines (Charge Chronique de 28 jours). Le calculateur affiche immédiatement votre ratio ACWR et vous délivre un diagnostic de sécurité sans équivoque.

III. Explication des Paramètres et Notions Clés

Comprendre les variables calculées permet d'adapter intelligemment sa programmation :
- Le RPE (Rating of Perceived Exertion) : Il s'agit d'un intégrateur neurophysiologique exceptionnel validé scientifiquement. Il synthétise les signaux cardiorespiratoires (ventilation, fréquence cardiaque), musculaires (acidose, tensions myofibrillaires) et psychologiques du sportif.
- La Charge Aiguë (Acute Workload en UA) : Somme des charges des sept derniers jours. Elle représente la fatigue immédiate accumulée récemment.
- La Charge Chronique (Chronic Workload en UA) : Moyenne mobile des charges hebdomadaires sur les vingt-huit derniers jours. Elle représente la condition physique de fond, la robustesse et la tolérance à l'effort construites par l'athlète au fil du mois écoulé.
- L'Indice de Monotonie : Rapport entre la charge moyenne quotidienne et son écart-type sur la semaine. Une monotonie élevée signifie que toutes les séances se ressemblent en intensité sans aucune alternance entre jours durs et jours légers.
- La Contrainte (Strain) : Produit de la charge hebdomadaire par la monotonie. Elle reflète le stress biologique global et constitue le signal d'alarme du surentraînement.

IV. Relations Mathématiques et Équations de Foster et Gabbett

Les relations mathématiques qui pilotent le calculateur sont d'une rigueur absolue :
1. Charge d'une séance unitaire (Méthode de Carl Foster) :
Charge (UA) = Durée de la séance (en minutes) × RPE (score de 0 à 10).
Exemple : Une séance de 90 minutes évaluée à un RPE de 6 (difficile) représente 90 × 6 = 540 Unités Arbitraires (UA).
2. Charge Hebdomadaire Aiguë :
Charge Aiguë = Somme des charges des 7 jours de la semaine (UA).
3. Calcul de la Monotonie hebdomadaire de Foster :
Monotonie = Moyenne journalière des 7 jours / Écart-type des 7 jours.
4. Calcul de l'Indice de Contrainte (Training Strain) :
Strain = Charge Hebdomadaire Aiguë × Monotonie.
5. Calcul du ratio Charge Aiguë / Charge Chronique (ACWR de Tim Gabbett) :
ACWR = Charge Aiguë (semaine en cours) / Charge Chronique Moyenne (4 semaines précédentes).
Exemple concret : Si un athlète affiche une charge aiguë de 3 600 UA cette semaine, et que sa charge chronique moyenne sur les 4 dernières semaines était de 3 000 UA :
ACWR = 3 600 / 3 000 = 1,20.

V. Grille d'Interprétation du Ratio ACWR et Seuils de Risque

Les travaux de Tim Gabbett sur des milliers d'athlètes professionnels ont identifié des zones prédictives remarquables :
- ACWR < 0,80 (Zone de Sous-Entraînement) : La charge récente est trop faible par rapport aux habitudes de l'athlète. Bien que le risque de blessure immédiate soit bas, cette situation entraîne une perte d'adaptations physiologiques. L'athlète devient vulnérable dès qu'il devra réaccélérer ses charges.
- 0,80 ≤ ACWR ≤ 1,30 (Zone Optimale ou « Sweet Spot ») : C'est la zone idéale de progression. La charge augmente de manière progressive et maîtrisée (+5% à +10% par semaine). L'athlète développe sa forme physique tout en maintenant son risque de blessure en dessous de 5%.
- 1,31 ≤ ACWR ≤ 1,50 (Zone de Vigilance et Surcharge Modérée) : L'augmentation de la charge est rapide. Le risque de blessure augmente modérément. Il convient de stabiliser la charge sur les sept jours suivants et de surveiller la qualité du sommeil et de la nutrition.
- ACWR > 1,50 (Zone Critique et Risque Élevé de Blessure) : La charge a augmenté de plus de 50% d'un coup par rapport aux habitudes. Les études démontrent que dans cette zone de danger, le risque de blessure musculaire, tendineuse ou articulaire est multiplié par trois à quatre dans les sept à quatorze jours qui suivent.

VI. Règles d'Or pour la Planification et la Prévention des Blessures

Pour tirer le meilleur parti du suivi RPE et de l'ACWR en club ou en milieu scolaire :
- Ne jamais augmenter la charge hebdomadaire de plus de dix pour cent d'une semaine sur l'autre (règle des 10%).
- Casser la monotonie : Veillez à ce que l'indice de monotonie reste toujours inférieur à 2,0. Pour cela, alternez impérativement des journées très intenses (RPE 7-9) avec des journées très légères de régénération (RPE 2-3) ou de repos complet.
- Ne pas diaboliser la charge élevée : Gabbett rappelle qu'une charge chronique élevée protège contre les blessures. Ce n'est pas le fait de s'entraîner beaucoup qui blesse, mais le fait d'augmenter la charge trop brutalement sans préparation préalable.`
  }
};

// Vérification stricte des longueurs en mots
console.log('--- VÉRIFICATION DU NOMBRE DE MOTS (MINIMUM 800 MOTS REQUIS) ---');
let allValid = true;
for (const [key, data] of Object.entries(TOOLS_800_WORDS)) {
  const words = countWords(data.fullRawText);
  data.wordCount = words;
  data.charCount = data.fullRawText.length;
  console.log(`[${key.toUpperCase()}] ${data.fileName}: ${words} mots | ${data.charCount} caractères -> ${words >= 800 ? '✅ VALIDE' : '❌ INVALIDE'}`);
  if (words < 800) allValid = false;
}

if (!allValid) {
  console.error('Erreur : Certains textes ne respectent pas le seuil minimal de 800 mots !');
  process.exit(1);
} else {
  console.log('SUCCÈS : Tous les 10 outils dépassent largement le seuil strict de 800 mots minimum !');
}



const rootDir = process.cwd();

// 1. Mettre a jour src/data/calculatorEducationalContent.ts si le dossier src/data existe
const dataDir = path.join(rootDir, 'src', 'data');
if (fs.existsSync(dataDir)) {
  const tsContent = `/**
 * Fiches Documentaires & Guides Scientifiques Complets pour les 10 Calculateurs Sport ProfEPS.ma
 * Calibres rigoureusement a PLUS DE 800 MOTS PAR OUTIL (800 a 1 250 mots).
 * Contient : Guide d'utilisation, Relations mathematiques, Donnees requises et Interpretation des resultats.
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
  console.log('src/data/calculatorEducationalContent.ts mis a jour avec les 10 guides de 800+ mots.');
}

// 2. Mettre a jour les 10 fichiers HTML autonomes
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

  return `<!-- FICHE SCIENTIFIQUE & PEDAGOGIQUE OFFICIELLE (${tool.wordCount} MOTS MINIMUM) -->
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

      <!-- 1. Guide d'utilisation pas-a-pas -->
      <div class="space-y-3">
        <h3 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 m-0">
          <span style="color:#006233;">&#129517;</span>
          1. Guide d'utilisation pas-a-pas &amp; Protocoles terrain
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          ${stepsHtml}
        </div>
      </div>

      <!-- 2. Relations mathematiques en exergue -->
      <div class="space-y-3">
        <h3 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 m-0">
          <span style="color:#c1272d;">&#128208;</span>
          2. Relations mathematiques &amp; Equations biomecaniques
        </h3>
        <div class="p-4 bg-slate-900 text-white rounded-xl space-y-2 border border-slate-800 shadow-inner">
          ${formulasHtml}
        </div>
      </div>

      <!-- 3. Interpretation des resultats & reperes terrain -->
      <div class="space-y-3">
        <h3 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 m-0">
          <span style="color:#d97706;">&#128161;</span>
          3. Interpretation des resultats &amp; Seuils d'entrainement
        </h3>
        <p class="text-xs text-slate-700 leading-relaxed bg-amber-50/60 border border-amber-200/70 p-3.5 rounded-xl m-0">
          ${escapeHtml(tool.interpretationSummary)}
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          ${benchmarksHtml}
        </div>
      </div>

      <!-- 4. Traite Scientifique & Pedagogique Integral (+800 mots) -->
      <div class="space-y-3 pt-2 border-t border-slate-100">
        <div class="flex items-center justify-between">
          <h3 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 m-0">
            <span style="color:#2563eb;">&#128214;</span>
            4. Manuel Scientifique &amp; Didactique Detaille (${tool.wordCount} mots)
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
  } else if (content.includes('</body>')) {
    content = content.replace('</body>', '  ' + cardHtml + '\n</body>');
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
    console.log('✅ ' + tool.fileName + ' mis a jour (' + tool.wordCount + ' mots integres).');
  } else {
    console.warn('⚠️ Introuvable : ' + tool.fileName);
  }
}

console.log('\n======================================================');
console.log('🎉 SUCCES : TOUS LES 10 GUIDES (800+ MOTS) SONT INTEGRES !');
console.log('======================================================\n');
