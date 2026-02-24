/**
 * patch-data.js
 * Adds missing data entries to references.js:
 * 1. OTC for Course de haies + Course de relais
 * 2. OBJECTIFS_CYCLE for Tennis de table + Badminton
 */

const fs = require('fs');
const path = require('path');
const filepath = path.join(__dirname, '..', 'api', 'data', 'references.js');
let content = fs.readFileSync(filepath, 'utf8');

// ─── 1. OTC for Course de haies + Course de relais ────────────────────────
const otcInsert = `,
    'Course de haies': {
        '1AC': "Franchir des obstacles à rythme régulier sur une distance courte (50-60m), en maintenant la vitesse entre les haies et en respectant le couloir.",
        '2AC': "Améliorer la technique de franchissement (jambe d'attaque tendue, jambe d'esquive repliée) pour maintenir la vitesse et régulariser le rythme de course.",
        '3AC': "Gérer l'ensemble de la course (départ, rythme inter-haies, franchissement, finish) pour optimiser sa performance personnelle.",
        'TC': "Maîtriser les différentes phases de la course de haies pour réaliser une performance équilibrée entre vitesse et technique de franchissement.",
        '1AB': "Analyser ses points faibles techniques pour progresser vers son potentiel maximal en adaptant la longueur de la foulée d'élan.",
        '2AB': "Atteindre son potentiel maximal par une préparation technique et mentale optimale, en gérant la pression de la compétition."
    },
    'Course de relais': {
        '1AC': "Transmettre et recevoir le témoin dans la zone de passage tout en maintenant sa vitesse, en coopérant avec ses partenaires.",
        '2AC': "Optimiser la transmission du témoin (signal vocal, geste bras tendu) et synchroniser les vitesses passeur/receveur dans la zone de passage.",
        '3AC': "Coordonner les transitions passeur/receveur avec précision pour minimiser les pertes de vitesse et réaliser une performance d'équipe cohérente.",
        'TC': "Maîtriser les rôles de passeur et de receveur dans la course de relais, en gérant l'ordre de passage selon les caractéristiques de chaque coureur.",
        '1AB': "Analyser et optimiser la stratégie de relais (ordre des coureurs, technique de passage) en tenant compte des profils athlétiques individuels.",
        '2AB': "Concevoir et appliquer une tactique de relais élaborée, en maximisant l'efficacité de chaque transmission pour viser la meilleure performance d'équipe."
    }`;

// Find the exact Rugby OTC closing and insert before the final `};`
const otcRugbyEnd = `        '2AB': "Concevoir et appliquer des stratégies de jeu adaptées au rapport de force, en coordonnant les actions et en exploitant les points faibles adverses."
    }
};`;

const otcRugbyNew = `        '2AB': "Concevoir et appliquer des stratégies de jeu adaptées au rapport de force, en coordonnant les actions et en exploitant les points faibles adverses."
    }` + otcInsert + `
};`;

if (content.includes(otcRugbyEnd)) {
  content = content.replace(otcRugbyEnd, otcRugbyNew);
  console.log('✅ OTC entries added for Course de haies + Course de relais');
} else {
  console.log('⚠️  OTC Rugby end marker not found — check manually');
}

// ─── 2. OBJECTIFS_CYCLE for Tennis de table + Badminton ───────────────────
const cycleInsert = `,
    'Tennis de table': {
        commun: {
            S1: "Situation de référence diagnostique : match en simple. Observer la régularité de l'échange, la maîtrise du service et le placement du joueur.",
            S2: "Règlement officiel ITTF (service, fautes, rotation), principes tactiques (diagonales, zones vides), rôles d'arbitre et de marqueur.",
            S12: "Tournoi final en simple (round robin). Évaluation sur la régularité des échanges, la variété des services et l'efficacité du placement tactique."
        },
        debutant: [
            "Tenir la raquette correctement (prise orthodoxe) et frapper la balle de manière sécurisée.",
            "Réaliser un service réglementaire : balle dans la paume ouverte, lancer vertical, frappe après rebond.",
            "Maintenir un échange coup droit de 5 coups consécutifs sans faute sur la diagonale.",
            "Apprendre le replacement centre après chaque frappe pour être prêt à la balle suivante.",
            "S'initier au revers en situation défensive (balle vers le côté gauche).",
            "Comprendre le système de comptage (11 points, avantage, alternance service).",
            "Participer à un match dirigé en appliquant les règles de base sans disputer les décisions.",
            "Pratiquer l'arbitrage : annoncer le score, signaler les fautes de service.",
            "Match libre : réduire les fautes directes (balle dans le filet ou hors table)."
        ],
        moyen: [
            "Consolider le coup droit régulier et précis sur les deux diagonales.",
            "Développer le revers de régularité pour renvoyer les balles sur le côté gauche.",
            "Varier le service : court, long, avec effet coupé ou lifté pour mettre l'adversaire en difficulté.",
            "Appliquer une tactique simple : cibler les zones vides ou les points faibles adverses.",
            "S'initier au top spin coup droit : vitesse d'exécution et rotation avant de la balle.",
            "Développer le déplacement latéral (pas chassés) pour couvrir toute la largeur de la table.",
            "Construire le point en 3 temps : service + 2e balle d'attaque + finition.",
            "Gérer la pression du match : concentration, résilience après un point perdu.",
            "Tournoi : appliquer sa stratégie face à différents profils d'adversaires."
        ],
        avance: [
            "Maîtriser le top spin coup droit et l'initier en revers pour attaquer en premier.",
            "Utiliser le bloc de contre-attaque pour déstabiliser le top spin adverse.",
            "Varier les effets (lifté, coupé, plat) sur le service et en retour de service.",
            "Construire un schéma de points personnalisé (service court → ouverture diagonale → finition).",
            "Optimiser le jeu de jambes : couvrir rapidement les balles longues et courtes.",
            "Anticiper les intentions adverses par la lecture de la raquette et du placement du corps.",
            "Gérer les fins de set serrées : jouer la sécurité avant de tenter des gestes à risque.",
            "Arbitrer un match officiel avec précision et autorité.",
            "Auto-analyse : identifier ses erreurs et les corriger en entraînement."
        ],
        elite: [
            "Automatiser les enchaînements top spin coup droit / top spin revers en continuité.",
            "Développer le service court avec rotation maximale pour forcer l'adversaire à soulever.",
            "Maîtriser le coup à plat rapide (contre-attaque de comptoir) sur les attaques adverses.",
            "Construire des schémas de points variés adaptés à chaque profil d'adversaire.",
            "Optimiser la gestion physique : maintenir la concentration sur toute la durée du tournoi.",
            "Exploiter le jeu long à mi-distance pour désorganiser l'adversaire avant d'attaquer.",
            "Travailler la résistance mentale : comebacks sur des scores difficiles.",
            "Préparer une stratégie de match spécifique pour un adversaire connu.",
            "Arbitrage de compétition : appliquer les règles avancées (let, fautes d'obstruction)."
        ]
    },
    'Badminton': {
        commun: {
            S1: "Situation de référence diagnostique : match en simple 11 points. Observer la régularité du dégagé, la qualité du service et le replacement au centre du terrain.",
            S2: "Règlement officiel BWF (service, fautes de filet, lignes), principes tactiques (montée-filet, contre-attaque), rôles de joueur et d'arbitre.",
            S12: "Tournoi final en simple (round robin). Évaluation sur la régularité des échanges, la variété des coups et l'efficacité du placement tactique pour marquer le point."
        },
        debutant: [
            "Tenir la raquette avec la prise universelle et réaliser des frappes de base (frappe liftée et plate).",
            "Réaliser un service court réglementaire : volant sous la ceinture, frappe contrôlée vers l'avant.",
            "Maintenir un échange de dégagé haut régulier (fond de terrain à fond de terrain) de 5 coups sans faute.",
            "Apprendre le replacement au centre du terrain après chaque coup pour être en équilibre.",
            "S'initier à l'amorti : frappe douce pour déposer le volant près du filet.",
            "Comprendre le système de comptage rally-point (21 points, service continu).",
            "Participer à un match dirigé en respectant les règles de service et de faute de filet.",
            "Pratiquer l'arbitrage : annoncer le score, signaler les fautes.",
            "Match libre : réduire les fautes directes (volant dans le filet ou hors terrain)."
        ],
        moyen: [
            "Consolider le dégagé (forehand et backhand) pour repousser l'adversaire en fond de terrain.",
            "Développer l'amorti précis pour attirer l'adversaire vers le filet et créer de l'espace.",
            "Varier le service : long (fond terrain) et court (près du filet) selon la situation tactique.",
            "S'initier au smash : frappe haute et puissante vers le bas pour finir le point.",
            "Développer les déplacements : fente avant (filet), recul pied gauche (fond droit), pas chassés.",
            "Construire le point en alternant haut (dégagé) et bas (amorti) pour déséquilibrer l'adversaire.",
            "Appliquer une tactique simple : jouer sur les faiblesses adverses (revers, fond de terrain).",
            "Gérer l'effort : récupérer entre les échanges, maintenir la concentration sur toute la partie.",
            "Tournoi : adapter son jeu face à différents profils d'adversaires (défensif, offensif)."
        ],
        avance: [
            "Maîtriser le smash offensif et le drive rapide pour terminer les échanges rapidement.",
            "Utiliser le lob défensif pour se sortir des situations difficiles et relancer l'échange.",
            "Développer le jeu au filet : fente précise, contre-dépôt, push court.",
            "Construire des schémas de points : dégagé → montée filet → amorti gagnant.",
            "Optimiser les déplacements : couverture des 4 coins du terrain avec économie d'énergie.",
            "Anticiper les intentions adverses par la lecture du corps et de la raquette.",
            "Gérer les fins de set serrées et les situations de pression (20 partout).",
            "Arbitrer un match officiel avec précision : call des lignes, gestion des recours.",
            "Analyse de jeu : identifier ses points forts et ses zones de progrès."
        ],
        elite: [
            "Automatiser les enchaînements offensifs : smash → défense → contre-attaque.",
            "Développer les feintes au filet et les faux smashes pour déstabiliser l'adversaire.",
            "Maîtriser le service flick (service coup droit long) pour surprendre l'adversaire au filet.",
            "Construire des stratégies de match spécifiques à chaque adversaire.",
            "Optimiser la gestion physique : maintenir le niveau d'intensité en fin de match.",
            "Développer la résistance mentale pour les situations de comebacks difficiles.",
            "Jouer en double : adapter son positionnement (avant-arrière) et la communication partenaire.",
            "Préparation mentale : visualisation du match et gestion du stress compétitif.",
            "Arbitrage de compétition : maîtriser toutes les règles avancées (let, replay, obstruction)."
        ]
    }`;

// Find the Rugby elite cycle closing (last entry) and insert before the final `};`
const cycleEnd = `            "Séance de réglage : répétition des lancements de jeu 'signature' du collectif."
        ]
    }
};`;

const cycleEndNew = `            "Séance de réglage : répétition des lancements de jeu 'signature' du collectif."
        ]
    }` + cycleInsert + `
};`;

if (content.includes(cycleEnd)) {
  content = content.replace(cycleEnd, cycleEndNew);
  console.log('✅ OBJECTIFS_CYCLE entries added for Tennis de table + Badminton');
} else {
  console.log('⚠️  OBJECTIFS_CYCLE Rugby end marker not found — check manually');
}

fs.writeFileSync(filepath, content, 'utf8');
console.log('✅ references.js patched successfully');
