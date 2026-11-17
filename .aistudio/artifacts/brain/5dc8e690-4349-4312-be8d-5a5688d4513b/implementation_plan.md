# Plan d'Implémentation : 6 Pages Dédiées « Tables de Marque & Arbitrage EPS » (100% Conformes AdSense) + Maillage des Hubs

Ce plan détaille la création des **6 pages dédiées aux Tables de Marque et Simulateurs d'Arbitrage EPS** utilisables directement sur le terrain (smartphone, tablette, PC ou TNI en gymnase), accompagnées d'un **Guide Officiel de l'Élève-Marqueur, du Chronométreur et du Jeune Arbitre (1 200+ mots uniques par page)** pour garantir une conformité absolue avec **Google AdSense** (zéro *thin content*, zéro contenu dupliqué avec les pages APS), ainsi que leur intégration dans l'ensemble de l'architecture du site.

---

## 1. Architecture des 6 Nouvelles Pages Dédiées (`/public/table-de-marque-*-eps.html`)

Chaque page dédiée suit une structure ergonomique en **2 zones complémentaires** :
- **Zone Haute (Au-dessus de la ligne de flottaison — Mode Terrain Direct)** :
  - **Table de Marque Interactive & Simulateur d'Arbitrage Officiel** avec bouton **« ⛶ Mode Plein Écran Gymnase / Terrain »** (masquant l'en-tête pour maximiser la lisibilité des scores et chronomètres à distance).
  - **Saisie des noms d'équipes / joueurs, classe (1AC à 2Bac) et officiels de table** (Nom de l'Élève-Marqueur, de l'Élève-Chronométreur et de l'Arbitre Principal) pour valoriser les rôles sociaux (OP 2009 Collège `/5 pts` & OP 2007 Lycée `/4 pts` ou `/3 pts`).
  - **Export Officiel de la Feuille de Match A4** : téléchargement instantané en **Word (`.doc`)** et **Impression / PDF A4** incluant le détail des scores par période/set, l'historique horodaté des actions, les sanctions disciplinaires par N° de joueur et les signatures des élèves-officiels.
- **Zone Basse (Dossier Pédagogique & Réglementaire de 1 200+ mots — 100% Unique & AdSense Ready)** :
  - **Guide pas-à-pas de l'Élève-Marqueur et du Chronométreur en EPS** : comment tenir la feuille de marque officielle sans erreur, quand arrêter le chronomètre, comment communiquer avec l'arbitre central (coups de sifflet et gestes officiels).
  - **Protocole de résolution des cas litigieux en EPS scolaire** (égalité en fin de temps réglementaire, rotation erronée, double faute, infériorité numérique, gestion de la table à 2 élèves dispensés ou en rotation d'équipe).
  - **Grille d'évaluation des Rôles Sociaux (Connaissances Conceptuelles `/3 pts` & Comportementales `/3 à /5 pts`)** : barème clé en main permettant au professeur de noter l'élève-marqueur, le chronométreur et l'arbitre selon les Orientations Pédagogiques 2007 et 2009.
  - **FAQ Réglementaire interactive (JSON-LD `FAQPage` + `WebApplication` + `BreadcrumbList`)**.

---

## 2. Spécifications Réglementaires Exactes des 6 Tables de Marque

| # | URL de la Page Dédiée | Règles Officielles & Fonctionnalités de la Table de Marque | Contenu Pédagogique Unique (1 200+ mots) |
| :--- | :--- | :--- | :--- |
| **1** | `/table-de-marque-badminton-eps.html` | **BWF Badminton & ITTF Tennis de Table** : Indicateur automatique de zone de service (**Droite = score Pair / Gauche = score Impair**), set en **21 pts** avec **2 pts d'écart** (point décisif à **29–29 → 30e pt**), mode **Match Officiel** + **Ronde Italienne par équipe** (relais 5, 10, 15, 20 pts) + **Montante-Descendante**, journal des coups gagnants (Smash, Amorti, Dégagé, Faute filet/out). | Guide du juge de service et du marqueur en sports de raquettes, arbitrage de la hauteur de frappe sous la taille, gestion autonome des terrains en Montante-Descendante et barème OP des rôles d'officiels. |
| **2** | `/table-de-marque-volleyball-eps.html` | **FIVB Volley-Ball** : Bouton **+1 pt uniquement** (aucun bouton +3 pts), passage **automatique au set suivant à 25 pts avec 2 pts d'écart** (15 pts au Tie-Break), **Match Gagné à 3 sets**, **édition directe du N° des 6 joueurs sur les cartes du terrain (P1 à P6)**, affichage en temps réel de la **rotation officielle sur le terrain à chaque service** (rotation horaire sur *Side-Out*). | Guide du marqueur FIVB en EPS : contrôle de la position des 6 joueurs au coup de sifflet du service, détection des fautes de rotation (chevauchement avant/arrière et gauche/droite), gestes de l'arbitre sur chaise et notation OP. |
| **3** | `/table-de-marque-basketball-eps.html` | **FIBA Basket-Ball** : Actions **+1 pt (Lancer Franc)**, **+2 pts (Tir intérieur)**, **+3 pts (Tir derrière l'arc)**, chronomètre de match (4×10 min ou format EPS) + **chronomètre de possession 24s / remise à 14s** sur rebond offensif, cumul des **5 fautes d'équipe par quart-temps** avec alerte automatique **Bonus 2 Lancers Francs**, suivi des fautes personnelles par N° (5e faute = exclusion). | Répartition des rôles entre le **Marqueur** (feuille, fautes, temps morts) et l'**Opérateur des 24 secondes** en EPS, gestuelle officielle FIBA des fautes (numéro du joueur, type de faute, validation à 1, 2 ou 3 doigts) et barème OP. |
| **4** | `/table-de-marque-handball-eps.html` | **IHF Handball** : **+1 But uniquement** (Jeu courant ou **Jet de 7m** — zéro action à 2 pts), **exclusions temporaires de 2 minutes** avec compte à rebours individuel par N° de joueur, **3e exclusion = Carton Rouge automatique**, plafond réglementaire de **3 Cartons Jaunes maximum par équipe**, compteur de **Jeu Passif (bras levé : 4 à 6 passes max)**, **Temps Morts d'Équipe (TTO)**. | Coordination **Secrétaire / Chronométreur** au Handball scolaire : gestion simultanée du chrono général et des prisons de 2 minutes, contrôle des changements dans la zone de 4,50 m, signalement du bras levé (jeu passif) et évaluation OP. |
| **5** | `/table-de-marque-futsal-football-eps.html` | **FIFA Futsal & Football IFAB** : **+1 But uniquement** (Jeu courant ou **Penalty 6m / Jet franc à 10m** — zéro action à 2 pts), **cumul des 5 fautes d'équipe par mi-temps** (alerte automatique **6e faute = Jet Franc Direct à 10m sans mur**), **chrono des 4 secondes** (touche au pied, corner, coup franc, relance gardien), suivi par N° (**2e Jaune = Rouge** + **infériorité numérique Futsal de 2 min annulée automatiquement si l'adversaire marque un but**), module **Tirs au But (5 tireurs + Mort Subite)**. | Spécificités de la table de marque Futsal FIFA vs Football réduit en EPS : décompte à voix haute et au chrono des 4 secondes, affichage du panneau « 5 Fautes Cumulées » sur la table, règle du retour à 5 joueurs après un but encaissé en infériorité. |
| **6** | `/table-de-marque-rugby-scolaire-eps.html` | **World Rugby Scolaire, Tag Rugby & Touch Rugby** : **Compteur interactif des 6 Tags / Touchés** avec alerte sonore et visuelle de **changement de possession au 6e Tag**, **Calculateur d'Indice de Gagne-Terrain (IGT)** en temps réel (franchissements de la ligne d'avantage, essais en zone centrale vs couloirs), décompte des **Essais (5 pts / 1 pt Tag)**, **Transformations (2 pts)**, **Pénalités (3 pts)** et **Essais de Bonus (franchissement collectif sans perte de balle)**. | Guide de l'arbitre-compteur de Tags et de l'observateur statistique (IGT) en Rugby Scolaire sans placage (Tag/Touch) et avec placage sécurisé (ceinture/jambes), gestuelle du « hors-jeu » et de l'« en-avant », et grille d'évaluation OP. |

---

## 3. Plan de Maillage Interne & Intégration dans les Hubs

Conformément à vos choix, les 6 nouvelles pages dédiées seront reliées à **3 niveaux stratégiques** :

1. **Dans chacune des 6 Pages APS correspondantes** :
   - Pages cibles :
     - `/public/aps-badminton-tennis-table-eps-maroc.html`
     - `/public/aps-volleyball-eps-maroc.html`
     - `/public/aps-basketball-eps-maroc.html`
     - `/public/aps-handball-eps-maroc.html`
     - `/public/aps-football-eps-maroc.html`
     - `/public/aps-rugby-scolaire-tag-eps-maroc.html`
   - Ajout d'un **bandeau d'action rapide en haut de la Table de Marque intégrée** (*« ⛶ Ouvrir la Table de Marque Officielle sur sa Page Dédiée (Mode Terrain Plein Écran + Guide de l'Élève-Marqueur) → »*) ainsi que d'un lien dans le sommaire rapide du sport.

2. **Sur les Cartes du Portail des 13 Sports (`/public/hub-aps-sports-eps-maroc.html`)** :
   - Sur les cartes de **Basket-Ball**, **Handball**, **Volley-Ball**, **Football / Futsal**, **Rugby Scolaire (Tag)** et **Badminton & Tennis de Table**, ajout d'un double bouton d'accès direct :
     - Bouton principal : `📘 Ouvrir le Guide Complet →`
     - Nouveau bouton terrain : `⏱️ Table de Marque Dédiée →` (pointant directement vers `/table-de-marque-*-eps.html`).

3. **Dans le Hub des Calculateurs (`/public/hub-outils-sport-performance.html`) et le Menu `Outils ▾` de la Navbar** :
   - Ajout d'une nouvelle section dédiée **« ⏱️ Les 6 Tables de Marque & Simulateurs d'Arbitrage Officiels EPS (Terrain & TNI) »** dans `/public/hub-outils-sport-performance.html` avec des cartes directes vers les 6 tables de marque.
   - Ajout des liens rapides vers les Tables de Marque dans le menu déroulant `Outils ▾` de la barre de navigation principale et mise à jour de `/public/sitemap.xml` (passage de 247 à **253 URLs canoniques** 100% indexables).

---

## 4. Vérification Qualité, AdSense & Déploiement GitHub / Vercel

- **Audit Automatique des 253 Pages** :
  - Vérification que chacune des 6 nouvelles pages dépasse **1 200 mots de contenu éditorial unique** (conformité AdSense *High Value Content*).
  - Vérification de **0 lien brisé** sur l'ensemble du maillage interne.
- **Synchronisation GitHub & Vercel** :
  - Commit et push sur `https://github.com/abdelkhalekkaci/PROFEPSmaroc.git` (branche `main`) avec l'auteur certifié `abdelkhalekkaci <kaci.abdelkhalek.95@gmail.com>` pour déclencher automatiquement le déploiement Vercel.
