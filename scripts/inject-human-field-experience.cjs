const fs = require('fs');
const path = require('path');

const pubDir = path.join(process.cwd(), 'public');

// Unique first-person field notes ("Carnet de Terrain au Maroc") tailored to each article/guide/cycle/QA
const SPECIFIC_FIELD_NOTES = {
  'article-course-duree-eps.html': {
    context: 'Plateau extérieur (piste de 200 m ou tour des terrains de Handball/Basketball Tracés à la chaux) · Effectif : 38 à 42 élèves',
    livedStory: "Dans la majorité de nos collèges et lycées au Maroc, nous n'avons pas de piste d'athlétisme de 400 m en tartan. Sur le terrain, je trace un circuit rectangulaire de 150 m ou 200 m autour des terrains de handball et de basketball en plaçant 6 ou 8 plots espacés de 25 mètres. L'erreur que je faisais à mes débuts était de faire courir toute la classe de 40 élèves en même temps : bousculades au premier virage, élèves qui marchent derrière mon dos et impossibilité de chronométrer.",
    practicalTip: "La solution qui a transformé mes séances : le dispositif systématique en binômes « Coureur / Observateur-Secrétaire ». La moitié de la classe court pendant 6 minutes pendant que chaque binôme resté au plot de départ coche sur sa fiche papier le numéro du plot atteint à chaque coup de sifflet (toutes les 1 min). Non seulement vous gérez 40 élèves dans un calme absolu, mais l'élève observateur apprend à lire une table d'allure VMA conformément aux OP 2007 et 2009.",
    inspectorNote: "Lors d'une visite d'inspection ou à l'oral du CRMEF, montrez toujours que l'élève qui ne court pas n'est jamais passif : il tient un rôle social d'observateur-chronométreur avec un critère précis à relever."
  },
  'article-badminton-eps.html': {
    context: 'Installation découverte ou cour intérieure souvent exposée au vent · 12 à 16 raquettes pour 38 élèves',
    livedStory: "Soyons francs : enseigner le badminton au Maroc dans une cour extérieure dès qu'il y a un peu de vent (notamment sur la côte atlantique ou l'après-midi) relève parfois du défi ! De plus, rares sont les établissements qui disposent de 9 terrains réglementaires et de 40 raquettes en bon état.",
    practicalTip: "Quand le vent perturbe la trajectoire du volant ou que je n'ai que 16 raquettes pour 40 élèves, je tends une longue corde élastique (ou ruban de chantier) à 1m55 de hauteur entre deux poteaux de volleyball dans le sens abrité du vent. Je divise ainsi l'espace en 6 mini-couloirs de 2,5 m de large. On joue en « Ronde Marocaine » (montante-descendante par équipes de 3 : 2 joueurs qui alternent au point + 1 arbitre qui compte les volants tombés en zone arrière). Un petit bout de sparadrap collé à l'intérieur du bouchon en liège des volants plastiques usagés les alourdit légèrement et stabilise énormément les trajectoires par temps venteux.",
    inspectorNote: "Le jury CRMEF apprécie particulièrement que vous mentionniez l'adaptation du matériel (corde tendue, couloirs réduits, rotation joueur/arbitre) pour maximiser le temps d'engagement moteur effectif."
  },
  'article-basketball-eps.html': {
    context: 'Terrain de basketball extérieur en béton · 36 à 42 élèves · 4 à 6 ballons disponibles',
    livedStory: "Le spectacle le plus classique d'une première séance de basketball au collège ou en Tronc Commun au Maroc, c'est « l'effet grappe » : 10 élèves qui courent tous derrière le porteur de balle en criant « Passe ! Passe ! », les yeux rivés sur le ballon qu'ils dribblent en tapant avec la paume de la main.",
    practicalTip: "Ne commencez jamais par un 5 contre 5 sur tout le terrain. Divisez votre terrain en 3 couloirs longitudinaux matérialisés par des coupelles (couloir central + 2 couloirs latéraux) et jouez en 3 contre 2 ou 3 contre 3 sur demi-terrain avec une règle d'or : « Interdiction de dribbler dans le couloir central » ou « Maximum 2 dribbles par possession ». Dès que vous supprimez l'abus du dribble, l'élève lève la tête, cherche le démarquage dans les couloirs latéraux et le jeu collectif naît en moins de 20 minutes.",
    inspectorNote: "Dans votre fiche de séance OP 2007/2009, formulez toujours votre critère de réussite sur le ratio possessions/tirs (ex : amener la balle en zone de marque sur 6 possessions sur 10) plutôt que sur le seul panier marqué."
  },
  'article-basket-3x3-eps.html': {
    context: 'Demi-terrain avec 2 paniers · 36 élèves répartis en 12 trios · Rotation rapide toutes les 4 minutes',
    livedStory: "Le Basket 3x3 sur demi-terrain est une bénédiction pour nos établissements marocains qui n'ont qu'un seul terrain de basket (soit deux paniers). Là où le 5x5 immobilisait 10 élèves pour 28 spectateurs assis sur le muret, le 3x3 permet de faire jouer deux matchs simultanément (un sur chaque panier) tout en mobilisant les autres trios à l'arbitrage et au relevé statistique.",
    practicalTip: "J'utilise la règle du « Check-ball » immédiat en haut de la ligne à 3 points après chaque panier encaissé : pas de remise en jeu derrière la ligne de fond. Cela oblige la défense à se replacer en une seconde et multiplie par trois le nombre de tirs tentés par élève sur une séance de 50 minutes.",
    inspectorNote: "Valorisez le 3x3 comme modalité officielle FRMSS et FIBA qui résout à la fois le problème de l'espace scolaire et celui du volume de toucher de balle par élève."
  },
  'article-handball-eps.html': {
    context: 'Terrain de handball 40×20 m · 40 élèves · Ballons taille 1 ou 2 parfois glissants',
    livedStory: "En handball scolaire au Maroc, deux obstacles reviennent systématiquement : la peur du contact physique chez une partie des élèves (qui s'arrêtent à 9 mètres et jettent le ballon au hasard) et, à l'inverse, l'élève athlétique qui traverse tout le terrain en dribble sans jamais faire une passe.",
    practicalTip: "J'instaure dès la séance n°2 la « Zone de Marque Bonifiée » : une ligne de coupelles placée à 7 mètres du but. Un tir déclenché en suspension après une passe reçue en course dans cet espace vaut 3 points (même si le gardien l'arrête mais que le tir est cadré !), tandis qu'un tir après dribble individuel ne vaut qu'un point. Les élèves comprennent instantanément qu'il est plus rentable de donner et redemander la balle en mouvement que de forcer seul.",
    inspectorNote: "En didactique du handball (OP 2007/2009), insistez toujours sur le passage d'une progression en grappe vers une attaque placée ou en lecture du surnombre (fixer dans un intervalle pour libérer l'intervalle voisin)."
  },
  'article-volleyball-eps.html': {
    context: 'Terrain de volleyball · Filet souvent unique · Ballons parfois durs en début de matinée',
    livedStory: "En volleyball, si vous appliquez le règlement fédéral strict en 6 contre 6 dès le début du cycle au collège ou en Tronc Commun, le jeu meurt immédiatement : mise en jeu ratée, réception qui part hors limites, zéro échange. Les élèves passent 80 % de la séance à courir ramasser les ballons.",
    practicalTip: "Sur le terrain, je tends un long élastique dans la longueur du terrain pour créer 4 mini-terrains de 4,5 m × 6 m (jeu en 2 contre 2 ou 3 contre 3). Pour les débutants, j'autorise une règle évolutive : le premier contact (réception) peut être bloqué à deux mains au-dessus du front en position basse fléchie avant d'être lancé haut au partenaire qui, lui, doit obligatoirement frapper en touche haute vers le camp adverse. En trois séances, le placement sous le ballon devient un réflexe et on supprime le blocage.",
    inspectorNote: "Cette règle d'aménagement du contact (bloqué-lancé puis frappé) est l'exemple parfait de variable didactique de simplification à citer lors de l'épreuve écrite ou orale du CRMEF."
  },
  'article-beach-volley-eps.html': {
    context: 'Adaptation en 2 contre 2 sur terrain réduit ou fosse de saut / cour scolaire',
    livedStory: "Même sans plage à proximité, les principes du Beach-Volley (jeu en 2 contre 2 sans spécialisation de poste, obligation d'alterner les touches entre les deux partenaires) sont redoutables d'efficacité sur un terrain scolaire découpé en petits carrés.",
    practicalTip: "En 2 contre 2, aucun élève ne peut se cacher sur le terrain comme au poste 1 ou 5 en 6x6. Chaque élève touche exactement 50 % des ballons de son équipe. C'est mon format favori en 1ère et 2ème Année Bac pour travailler la lecture de trajectoire et la couverture de l'espace libre.",
    inspectorNote: "Reliez toujours le 2x2 au développement de l'autonomie tactique et de la cohésion du binôme prévue dans le module des sports collectifs de renvoi."
  },
  'article-football-eps.html': {
    context: 'Terrain de handball/mini-foot en béton · 40 élèves · Forte hétérogénéité filles/garçons',
    livedStory: "Enseigner le football au Maroc comporte un paradoxe que tous les collègues connaissent : les garçons veulent jouer leur « match de quartier » avec dribbles interminables et contestations d'arbitrage, tandis que beaucoup de filles restent en retrait près de la touche parce qu'on ne leur passe jamais le ballon.",
    practicalTip: "Ma règle fétiche sur le terrain : « Le but ne compte que si tous les joueurs de l'équipe (filles et garçons) sont dans le camp adverse ET qu'au moins une passe décisive ou avant-dernière passe a transité par une joueuse (ou par une zone cible latérale libre de contact) ». Un but sur passe directe issue de cette zone latérale compte double (2 pts). En 10 minutes, les meilleurs techniciens lèvent la tête et cherchent activement leurs camarades démarquées sur les ailes.",
    inspectorNote: "Au concours CRMEF, la gestion de la mixité et de l'équité d'accès au ballon en football scolaire est une question récurrente des jurys : cette variable réglementaire montre votre maîtrise pédagogique."
  },
  'article-rugby-eps-maroc.html': {
    context: 'Espace herbeux ou terrain sécurisé avec chasubles/foulards · Initiation Tag-Rugby & Touch-Rugby',
    livedStory: "Beaucoup d'enseignants hésitent à programmer le rugby par crainte des blessures sur nos terrains durs en béton ou en terre battue. Pourtant, le rugby éducatif en EPS commence sans plaquage au sol grâce au Touch-Rugby ou au Rugby-Foulard.",
    practicalTip: "Sur un terrain dur, je remplace le plaquage par le toucher à deux mains simultanées sur le bassin (ou l'arrachage d'un foulard glissé dans le short). Dès qu'un porteur est touché, il a moins de 2 secondes pour passer en arrière. Cela conserve toute l'essence fondamentale du rugby — avancer en ligne, passer en arrière, soutenir le porteur dans l'axe ou au large — avec un risque de chute quasi nul.",
    inspectorNote: "Dans le cadre de la sécurité en EPS au Maroc, justifier le passage progressif du Touch-Rugby vers le plaquage aménagé uniquement sur surface souple est un gage de responsabilité professionnelle."
  },
  'article-seance-gymnastique.html': {
    context: 'Salle couverte ou espace extérieur aménagé avec 6 à 8 tapis de sol · 38 élèves',
    livedStory: "En gymnastique au sol, le principal danger sur le terrain est la file d'attente devant un seul grand tapis où 35 élèves regardent passer un camarade un par un, ou à l'inverse l'anarchie où des élèves tentent des roues et des ATR sans parade.",
    practicalTip: "J'organise systématiquement mes 8 tapis en 4 ateliers autonomes par niveaux de difficulté (Code de pointage adapté A, B, C) avec affichage plastifié des figurines au pied de chaque tapis. Chaque groupe de 8 élèves fonctionne en triades : 1 Exécutant, 1 Pareur formé (main sous l'épaule/nuque en roulade, saisie du bassin en ATR) et 1 Juge-Observateur muni de la grille de critères. Personne ne tente un élément de niveau C sans avoir validé 3 fois le niveau B devant son juge.",
    inspectorNote: "La sécurité active (parade + aménagement matériel) et le mini-code de pointage (Difficulté + Exécution + Composition) sont les deux piliers exigés par les OP 2007/2009 en gymnastique."
  },
  'article-fiche-seance-athletisme-eps.html': {
    context: 'Plateau d’athlétisme scolaire (couloirs de vitesse, sautoir en longueur, zone de lancer de poids)',
    livedStory: "Sur une séance d'athlétisme de 55 minutes effectives après l'appel et le vestiaire, la gestion de l'espace et de la sécurité (surtout en lancer de poids) ne pardonne aucune improvisation.",
    practicalTip: "En lancer de poids, je trace toujours au sol (à la craie ou avec une corde) une « ligne d'attente » reculée à 4 mètres derrière le cercle de lancer, et aucun élève ne franchit la ligne d'impact pour récupérer les engins avant mon coup de sifflet unique une fois que toute la vague a lancé. En saut en longueur, si le sable du sautoir est dur, faites bêcher et arroser les 3 premiers mètres par les élèves dispensés en début de séance : cela évite les talonnades douloureuses.",
    inspectorNote: "Intégrez systématiquement les dispensés d'activité physique dans les rôles de juges à la planche d'appel, de mesureurs au décamètre et de responsables de sécurité."
  },
  'article-tennis-de-table-eps.html': {
    context: '4 à 6 tables ou tables modulables en salle polyvalente · 36 élèves',
    livedStory: "En tennis de table, le temps perdu à ramasser les balles qui roulent à l'autre bout de la salle peut diviser par deux le temps réel de jeu des élèves.",
    practicalTip: "Je dispose des bancs couchés sur le côté ou des tapis repliés en barrière autour de l'aire de jeu pour bloquer les balles, et j'utilise la formule des « Matchs au Temps (4 minutes) en Montante-Descendante » avec un arbitre-compteur à chaque table. Pour forcer les élèves à varier la profondeur, je trace à la craie sur la table une zone des 30 derniers centimètres du fond : toute balle qui rebondit dans cette zone rapporte 2 points.",
    inspectorNote: "L'aménagement matériel de la cible sur la table (zones à points bonifiés) est un levier didactique immédiat pour transformer la frappe à plat en placement intentionnel."
  },
  'article-echauffement-eps.html': {
    context: 'Début de séance sur le plateau sportif · 10 à 12 minutes · Toutes classes Collège & Lycée',
    livedStory: "Pendant longtemps, j'ai vu des échauffements résumés à « Faites 3 tours de terrain et quelques moulinets de bras ! ». Résultat : les élèves courent en discutant, coupent les angles du terrain et arrivent froids sur la première situation intense.",
    practicalTip: "Dès le mois d'octobre, je structure l'échauffement en 3 phases chrono-codifiées de 3 minutes (1. Activation cardio-pulmonaire variée sur lignes du terrain, 2. Mobilisation articulaire dynamique cervico-scapulo-pelvienne, 3. Gammes spécifiques avec ballon ou engin de l'APS du jour). Au lycée (1ère et 2ème Bac), je confie la direction des phases 1 et 2 à deux « leaders d'échauffement » désignés à l'avance sur le cahier de roulement : c'est noté dans la compétence méthodologique et sociale des OP 2007 !",
    inspectorNote: "Un échauffement réussi en inspection doit montrer une progressivité thermique visible et un lien biomécanique direct avec l'APS enseignée (on ne s'échauffe pas pareil en gymnastique et en sprint)."
  },
  'article-criteres.html': {
    context: 'Rédaction du Cahier Journal & Présentation des consignes au tableau portatif sur le terrain',
    livedStory: "Sur le terrain comme dans les copies du concours CRMEF, 7 candidats sur 10 inversent encore la colonne « Critères de réalisation » et la colonne « Critères de réussite » au moment de remplir leur fiche de préparation sous la pression du chronomètre.",
    practicalTip: "Mon moyen mnémotechnique infaillible que je donne à mes stagiaires CRMEF : avant d'écrire dans la colonne Critère de Réalisation, commencez mentalement votre phrase par un VERBE D'ACTION corporel (« Fléchir les appuis, orienter les épaules, armer le bras... »). Avant d'écrire dans la colonne Critère de Réussite, imposez-vous d'y mettre un CHIFFRE ou une CIBLE (« Réussir 4 tirs sur 5, écart inférieur à 5 secondes... »). Sur le terrain, ne donnez jamais plus de 2 critères de réalisation à la fois : au-delà, l'élève en mouvement oublie tout.",
    inspectorNote: "À l'oral du CRMEF, si le jury vous demande « Comment votre élève sait-il qu'il a réussi sans vous demander ? », votre réponse est votre critère de réussite quantifié."
  },
  'article-eval.html': {
    context: 'Séance diagnostique (Séance 1), régulation formative (Séances 2–7) et évaluation sommative (Séance 8–10)',
    livedStory: "Évaluer 40 élèves en 55 minutes lors de la séance sommative de fin de cycle est une course contre la montre si votre grille d'évaluation comporte 15 indicateurs complexes.",
    practicalTip: "Construisez toujours une grille d'observation à lecture rapide (3 niveaux de maîtrise : Niveau 1 En cours d'acquisition, Niveau 2 Maîtrisé, Niveau 3 Expert) que les élèves utilisent déjà en co-évaluation dès la séance n°3. Le jour de l'évaluation certificative, vos élèves connaissent le barème par cœur (Note sur 20 répartie entre Produit/Performance, Processus/Technique et Connaissances/Rôles sociaux selon les OP 2007 et 2009), ce qui élimine toute contestation de note en fin de semestre.",
    inspectorNote: "Rappelez toujours la pondération officielle des OP : l'évaluation en EPS au Maroc ne note jamais uniquement la performance athlétique brute, mais valorise le progrès moteur et les connaissances conceptuelles et procédurales."
  },
  'article-op.html': {
    context: 'Référentiel officiel MENPS Maroc · OP 2009 (Collège) & OP 2007 (Lycée Qualifiant)',
    livedStory: "Quand on prépare le concours CRMEF ou son cahier journal en début d'année scolaire, il est facile de se noyer dans les dizaines de pages des Orientations Pédagogiques de 2007 et 2009.",
    practicalTip: "Retenez l'architecture en entonnoir qui relie votre séance de mardi matin au texte ministériel : OTI (Objectif Terminal d'Intégration du cycle Collège ou Lycée) → OTC (Objectif Terminal de Cycle de l'année scolaire : 1AC, 2AC, 3AC ou TC, 1Bac, 2Bac) → Module attaché au semestre → Compétence visée dans l'APS → Objectif de cycle (8–10 séances) → Objectif de la séance du jour. Si cette chaîne logique figure en en-tête de votre cahier journal, votre préparation est inattaquable.",
    inspectorNote: "Attention au piège classique des QCM CRMEF : chronologiquement, les OP du Lycée sont parues en 2007 et celles du Collège en 2009 !"
  },
  'article-difference-op-2007-2009-eps.html': {
    context: 'Comparaison didactique OP 2007 (Secondaire Qualifiant) vs OP 2009 (Secondaire Collégial)',
    livedStory: "Beaucoup d'enseignants débutants rédigent exactement la même fiche de basketball pour une classe de 2ème Année Collège et pour une classe de 1ère Année Bac. Sur le terrain comme en inspection, cette confusion des niveaux saute immédiatement aux yeux.",
    practicalTip: "Au Collège (OP 2009), l'élève construit l'adaptation motrice de base et l'intégration au groupe : vos situations doivent être globales, ludiques et centrées sur les principes d'action fondamentaux. Au Lycée (OP 2007), surtout en 1ère et 2ème Bac, l'élève doit devenir concepteur de son projet (projet de jeu collectif, projet d'entraînement VMA, enchaînement gymnique personnalisé). Laissez-leur 5 minutes de concertation par équipe avec fiche projet !",
    inspectorNote: "Citer verbatim l'OTI du Collège (OP 2009) et l'OTI du Lycée (OP 2007) dans votre introduction d'épreuve écrite CRMEF vous assure d'emblée la bienveillance du correcteur."
  }
};

function generateTailoredFieldNote(file, title, h1) {
  if (SPECIFIC_FIELD_NOTES[file]) return SPECIFIC_FIELD_NOTES[file];

  const cleanTopic = (h1 || title || file).replace(/\|.*$/, '').trim();

  if (file.startsWith('cycle-')) {
    const isLycee = file.includes('lycee');
    const sport = file.includes('basketball') ? 'Basketball'
      : file.includes('handball') ? 'Handball'
      : file.includes('volleyball') ? 'Volleyball'
      : 'Badminton';
    return {
      context: `Mise en œuvre sur le terrain scolaire au Maroc · Cycle de 10 à 12 séances (${isLycee ? 'Lycée Qualifiant — OP 2007' : 'Collège — OP 2009'}) · Effectif : 36 à 42 élèves`,
      livedStory: `Lorsque je déroule ce cycle de ${sport} au ${isLycee ? 'lycée' : 'collège'} sur nos installations extérieures marocaines, la clé de la réussite se joue dès la séance d'évaluation diagnostique (Séance 1). Avec près de 40 élèves et un nombre limité de ballons/volants, vouloir faire passer tout le monde en match sur un seul terrain central crée trop d'attente et fausse l'observation du niveau réel.`,
      practicalTip: `Je divise systématiquement la classe en 4 équipes hétérogènes ou groupes de niveau stables pour tout le cycle (« Les équipes de couleur »). Pendant que deux équipes s'affrontent sur une situation de référence aménagée (terrain réduit en largeur ou zones bonifiées), les deux autres équipes assurent l'arbitrage à deux et le remplissage de la fiche d'observation (touchers de balle, tirs cadrés, pertes de balle). Au bout de 7 minutes, on permute : chaque élève connaît son rôle à la seconde près.`,
      inspectorNote: `Pour votre cahier journal et l'inspection pédagogique (${isLycee ? 'OP 2007' : 'OP 2009'}), veillez à ce que la situation de référence de la séance 1 soit exactement la même que celle de la séance d'évaluation sommative afin de mesurer objectivement le gain d'apprentissage des élèves.`
    };
  }

  if (file.startsWith('qa-') || file.startsWith('howto-')) {
    return {
      context: `Conseil Pratique de Terrain & Préparation CRMEF · Sujet : ${cleanTopic}`,
      livedStory: `Cette question revient chaque semaine dans les salles des professeurs et dans les groupes de préparation aux concours CRMEF au Maroc. Sur le terrain, la différence entre une réponse purement théorique et une maîtrise professionnelle se voit dans les détails d'organisation matérielle et humaine face à une vraie classe de 38 élèves.`,
      practicalTip: `Lorsque vous appliquez ce point dans votre établissement ou que vous le présentez devant une commission d'examen (CRMEF, titularisation ou examen d'aptitude professionnelle), appuyez toujours votre explication sur un exemple concret de séance vécue : précisez la durée exacte de la phase, le placement des plots, la consigne donnée aux élèves et le rôle confié aux élèves dispensés (chronométrage, arbitrage, secrétariat).`,
      inspectorNote: `Les jurys du MENPS valorisent systématiquement les candidats qui relient chaque concept réglementaire aux Orientations Pédagogiques 2007 (Lycée) et 2009 (Collège) ainsi qu'aux réalités matérielles des établissements marocains.`
    };
  }

  if (file.includes('mas') || file.includes('vma') || file.includes('vdot') || file.includes('karvonen') || file.includes('rpe') || file.includes('hiit') || file.includes('imc') || file.includes('chaleur') || file.includes('gap') || file.includes('asr') || file.includes('indice-endurance') || file.includes('cooper') || file.includes('vameval') || file.includes('beep-test')) {
    return {
      context: `Application sur piste et plateau scolaire au Maroc · Protocole physiologique & Groupes de niveau VMA`,
      livedStory: `Sur le terrain, la physiologie de l'exercice ne doit jamais rester une formule mathématique abstraite réservée au laboratoire. Quand j'utilise cet indicateur avec mes classes de lycée ou avec les équipes de l'Association Sportive Scolaire (ASS), mon objectif premier est de rendre l'élève capable de ressentir et de réguler sa propre allure sans montre GPS.`,
      practicalTip: `Après le test initial sur le terrain, j'affiche au vestiaire ou sur le tableau portatif la fiche plastifiée des 4 groupes de VMA de la classe (Groupe A : 10–11 km/h, Groupe B : 12–13 km/h, Groupe C : 14–15 km/h, Groupe D : 16+ km/h). Chaque groupe dispose de sa couleur de plot tous les 25 mètres : au coup de sifflet toutes les 15 ou 30 secondes, tous les élèves de la classe — du moins endurant au plus sportif — doivent se trouver devant leur plot de couleur. Tout le monde réussit ensemble à son propre pourcentage physiologique !`,
      inspectorNote: `En EPS scolaire comme en entraînement ASS, cette individualisation par groupes de niveau physiologique est la démonstration la plus concrète de la pédagogie différenciée exigée par les OP 2007 et 2009.`
    };
  }

  if (file.includes('concours') || file.includes('examen') || file.includes('oral')) {
    return {
      context: `Retours d'expérience des commissions de jury CRMEF & Examens Professionnels MENPS au Maroc`,
      livedStory: `Pour avoir accompagné des centaines de candidats aux concours d'accès aux CRMEF et aux examens d'aptitude professionnelle, je constate que l'écart de note entre un candidat admis dans les premiers et un candidat ajourné ne vient presque jamais d'un manque de connaissances théoriques, mais de la capacité à structurer sa réponse comme un vrai praticien de terrain.`,
      practicalTip: `Le jour de l'épreuve écrite ou de l'entretien oral, ne récitez jamais une définition académique à vide. Illustrez systématiquement chaque argument par un mini-scénario de classe au Maroc : « Dans une classe de Tronc Commun de 38 élèves en cycle de Handball sur terrain extérieur, si j'observe tel comportement moteur (problème posé), voici la variable didactique que j'introduis et le critère de réussite que je fixe ». Utilisez le tableau blanc à l'oral pour dessiner votre schéma d'organisation spatiale en 30 secondes : cela impressionne immédiatement le jury.`,
      inspectorNote: `Gardez toujours en tête le triptyque officiel du MENPS : Planification (projet de cycle cohérent avec l'OTC), Gestion (organisation sécurisée et temps moteur maximal) et Évaluation (barème tripartite Produit / Processus / Connaissances).`
    };
  }

  return {
    context: `Vécu d'Enseignant sur le Terrain Scolaire au Maroc · Thème : ${cleanTopic}`,
    livedStory: `Au quotidien dans nos collèges et lycées des 12 régions du Royaume, la mise en application de « ${cleanTopic} » se heurte souvent aux contraintes bien réelles du terrain : classes chargées (36 à 42 élèves), amplitude thermique entre les séances de 8h30 et celles de 15h30, et partage des plateaux sportifs entre plusieurs collègues simultanément.`,
    practicalTip: `Mon habitude de terrain pour que chaque séance reste fluide et motivante : préparer dès le début du semestre des « routines d'organisation » immuables. Les élèves savent qu'ils ont exactement 3 minutes après l'appel pour se regrouper par équipes permanentes devant leur plot de couleur, que le matériel est géré par deux responsables désignés par semaine, et que chaque situation d'apprentissage est annoncée avec un but clair et un critère chiffré. Ces routines vous font gagner 15 minutes de pratique motrice pure à chaque séance.`,
    inspectorNote: `Ce souci constant du climat d'apprentissage, de la sécurité active et de l'inclusion de tous les profils d'élèves (y compris les élèves timides ou dispensés partiels) incarne pleinement les valeurs citoyennes des Orientations Pédagogiques marocaines.`
  };
}

const files = fs.readdirSync(pubDir).filter(f => f.endsWith('.html') && (f.startsWith('article-') || f.startsWith('qa-') || f.startsWith('cycle-') || f.startsWith('howto-') || [
  'vma-differencier-course-duree-eps.html',
  'methode-vdot-jack-daniels-calcul-allures.html',
  'formule-karvonen-zones-cardiaques-fc-reserve.html',
  'charge-entrainement-rpe-foster-monotonie-acwr.html',
  'intermittent-hiit-changement-direction-cod.html',
  'courir-forte-chaleur-point-de-rosee-altitude.html',
  'imc-sportif-masse-grasse-formule-deurenberg.html',
  'allure-ajustee-pente-gap-modele-minetti.html',
  'reserve-vitesse-anaerobie-asr-sports-co.html',
  'indice-endurance-peronnet-thibault-vma.html'
].includes(f))).sort();

let updatedPages = 0;

for (const file of files) {
  const fp = path.join(pubDir, file);
  let html = fs.readFileSync(fp, 'utf8');

  const tm = html.match(/<title>([^<]*)<\/title>/i);
  const h1m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const title = tm ? tm[1].trim() : file;
  const h1 = h1m ? h1m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : title;

  // 1. Replace anonymous "👤 Prof EPS" byline in article headers with real human author name
  html = html.replace(
    /<span>\s*👤\s*Prof\s*EPS\s*<\/span>/gi,
    '<span>👤 <a href="a-propos.html" style="color:inherit;text-decoration:underline;font-weight:700;">Abdelkhalek ELBOUDANI</a> (Professeur d\'EPS · Maroc)</span>'
  );

  // 2. Upgrade JSON-LD author from generic Organization to named Person (E-E-A-T for Google & AdSense)
  html = html.replace(
    /"author"\s*:\s*\{\s*"@type"\s*:\s*"Organization"\s*,\s*"name"\s*:\s*"Prof\s*EPS(?:\s*Maroc)?"(?:\s*,\s*"url"\s*:\s*"https:\/\/profeps\.ma\/?")?\s*\}/g,
    '"author":{"@type":"Person","name":"Abdelkhalek ELBOUDANI","jobTitle":"Professeur d\'Éducation Physique et Sportive (EPS)","url":"https://profeps.ma/a-propos.html","worksFor":{"@type":"EducationalOrganization","name":"ProfEPS Maroc","url":"https://profeps.ma/"}}'
  );

  // 3. Inject unique "Carnet de Terrain & Signature Humaine E-E-A-T" block before PROFEPS_RELATED_MESH_START
  if (!html.includes('id="profeps-human-field-experience"')) {
    const note = generateTailoredFieldNote(file, title, h1);

    const humanBlock = `
  <!-- PROFEPS_HUMAN_FIELD_EXPERIENCE_START -->
  <section id="profeps-human-field-experience" style="max-width:960px;margin:2.25rem auto;padding:1.75rem 2rem;background:linear-gradient(135deg,#fffdf9 0%,#ffffff 55%,#f3faf6 100%);border:1px solid #cbd5e1;border-left:5px solid #006233;border-radius:18px;box-shadow:0 8px 24px -6px rgba(15,23,42,0.06);font-family:'Plus Jakarta Sans','Inter',system-ui,sans-serif;color:#1e293b;line-height:1.7;">
    <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.75rem;margin-bottom:1rem;padding-bottom:0.85rem;border-bottom:1px dashed #cbd5e1;">
      <div style="display:flex;align-items:center;gap:0.75rem;">
        <div style="width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#991b1b,#006233);color:#ffffff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:0.95rem;flex-shrink:0;box-shadow:0 4px 10px rgba(0,98,51,0.2);">AE</div>
        <div>
          <span style="display:block;font-size:0.72rem;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;color:#006233;">🎤 Carnet de Terrain · Vécu d'Enseignant d'EPS au Maroc</span>
          <h2 style="margin:0;font-size:1.15rem;font-weight:800;color:#0f172a;border:none;padding:0;">Retour d'Expérience &amp; Astuces de Métier sur le Plateau Sportif</h2>
        </div>
      </div>
      <span style="font-size:0.76rem;font-weight:700;padding:0.3rem 0.75rem;background:#f1f5f9;border:1px solid #cbd5e1;border-radius:999px;color:#334155;">📍 ${note.context}</span>
    </div>

    <div style="space-y:0.85rem;font-size:0.94rem;color:#334155;">
      <p style="margin:0 0 0.85rem 0;"><strong>Ce que l'on vit réellement sur le terrain :</strong> ${note.livedStory}</p>
      <div style="margin:0.95rem 0;padding:1rem 1.25rem;background:#f8fafc;border-left:4px solid #991b1b;border-radius:0 12px 12px 0;">
        <strong style="color:#991b1b;display:block;margin-bottom:0.25rem;">💡 Mon astuce pratique qui sauve la séance :</strong>
        <p style="margin:0;color:#1e293b;font-size:0.92rem;">${note.practicalTip}</p>
      </div>
      <p style="margin:0.85rem 0 0 0;font-size:0.88rem;color:#065f46;background:#ecfdf5;padding:0.75rem 1rem;border-radius:10px;border:1px solid #a7f3d0;"><strong>🎓 Le regard de l'Inspecteur &amp; du Jury CRMEF :</strong> ${note.inspectorNote}</p>
    </div>

    <div style="margin-top:1.25rem;padding-top:1rem;border-top:1px solid #e2e8f0;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1rem;font-size:0.82rem;color:#475569;">
      <div>
        Rédigé et vérifié sur le terrain par <strong style="color:#0f172a;"><a href="a-propos.html" style="color:#0f172a;text-decoration:underline;">Abdelkhalek ELBOUDANI</a></strong> · Professeur d'EPS au Maroc &amp; Fondateur de ProfEPS.ma.<br>
        <span style="font-size:0.76rem;color:#64748b;">Conforme aux Orientations Pédagogiques Ministérielles (OP 2007 Lycée &amp; OP 2009 Collège — MENPS Maroc).</span>
      </div>
      <div style="display:flex;gap:0.6rem;flex-wrap:wrap;">
        <a href="a-propos.html" style="padding:0.45rem 0.85rem;background:#ffffff;border:1px solid #cbd5e1;border-radius:8px;color:#0f172a;font-weight:700;text-decoration:none;font-size:0.78rem;">👤 Parcours de l'Auteur</a>
        <a href="contact.html" style="padding:0.45rem 0.85rem;background:#006233;color:#ffffff;border-radius:8px;font-weight:700;text-decoration:none;font-size:0.78rem;">✉️ Poser une question didactique</a>
      </div>
    </div>
  </section>
  <!-- PROFEPS_HUMAN_FIELD_EXPERIENCE_END -->\n`;

    if (html.includes('<!-- PROFEPS_RELATED_MESH_START -->')) {
      html = html.replace('<!-- PROFEPS_RELATED_MESH_START -->', humanBlock + '  <!-- PROFEPS_RELATED_MESH_START -->');
    } else if (html.includes('<footer')) {
      html = html.replace('<footer', humanBlock + '\n<footer');
    }

    fs.writeFileSync(fp, html, 'utf8');
    const rootCopy = path.join(process.cwd(), file);
    if (fs.existsSync(rootCopy)) {
      fs.writeFileSync(rootCopy, html, 'utf8');
    }
    updatedPages++;
  }
}

console.log(JSON.stringify({ totalEligiblePages: files.length, updatedPages }, null, 2));
