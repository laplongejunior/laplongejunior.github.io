# Changelog du LaplongeMod

### LapMod 1.6.2.2: 2018 Patch (24/06/2018)							
- Les capes du mod HypeMod sont désactivées suite à la disparition de ce mod
   - Supprime quelques tentatives de connexion inutiles au démarrage

- Quelques bugfixes:
   - Ouvrir le Menu Avatar ne désynchronise plus les particules de sprint
   - Le jukebox refonctionne et son volume utilise le même réglage que la version vanilla
					
---

### LapMod 1.6.2.1 : Hypenio Patch (15/10/2017)						
- Les capes du mod HypeMod (serveur Hypenio) sont désormais supportées:
   - Tous leurs donateurs reçoivent une cape avec le logo de Hypenio

- Le menu Avatar dirige sur un menu avec la liste des mods supportés
   - Pour rappel, la plupart des mods fournissent les capes à leurs donateurs, mais pas tous!

- Bugfixe: Le réglage social des mods supportés avait le nom de l'autre réglage

- Bugfixe: La fonction "couche de skin en fonction de l'armure" empêchait d'utiliser le menu vanilla
   - Désormais, modifier la couche de skin directement désactive la synchronisation avec l'armure

- Interne: La gestion des capes moddées est simplifiée
   - Le démarrage du mod devrait également être légèrement plus rapide

 - Interne: Ajout d'un message d'avertissement si une version contient un ajout non-autorisé:
   - Par exemple, la cape d'un mod qui n'accepte pas les supports de donateurs
   - L'avertissement s'affiche en haut à gauche de votre écran (en plus du nom et de la version du mod)
     Si il y a un avertissement en haut à gauche de votre écran, supprimez la version SVP
					
---

### LapMod 1.6.2 : Legacy Update (03/10/2017)
- Les anciens skins au format de la 1.7 s'affichent correctement
   - S'applique à la fois aux skins rajoutés par le mod et aux skins fournis par l'API
   - Le mod est désormais capable d'afficher correctement l'intégralité des joueurs en multijoueurs!
     (Un skin format 1.7 est un skin en 64x32, avec un seul bras et une seule jambe)

- Le gestionnaire de l'API de Mojang peut détecter un UUID offline incorrect
   - Ce cas de figure ne peut survenir que si un serveur est fortement modifié

- En combinant l'API de Mojang et l'hébergeur, le mod peut déterminer quelle cape vous avez
   - Auparavant, seule la possession d'une cape pouvait être détectée, sans savoir laquelle

- Les textures fournies par les serveurs sont copiées dans le cache de l'API
   - Fonctionne même si la texture est associé à l'UUID offline
   - L'utilité est évidente : consommation réduite de la connexion à Internet

- Les textures rajoutées sur les autres joueurs ne sont pas téléchargées si son option est désactivée
   - Réduit l'usage de la connexion en multijoueurs, notemment l'accès aux accessoires rajoutés par d'autres mods
   - Les textures du joueur principal (vous!) sont toujours téléchargées afin de faire fonctionner le Menu Avatar

- Activer/désactiver l'accessoire rajouté par un mod supporté affiche un lien vers leur site web
   - Cette nouveauté est désactivable dans les Réglages Basiques
- Vous pouvez demander au Menu Avatar de simuler le rendu en portant une Elytra

- Création d'une sous-section du menu Avatar dédiée aux possesseurs de capes officielles:
   - Affiche votre cape, son rendu sous forme d'Elytra et quelques informations sur cette carte
   - Les rendus sont gérés par les données de Mojang et de Minecraft et sont donc 100% corrects
   - Les informations affichées, en revanche, proviennent du mod et peuvent donc contenir des erreurs

- Suppression des accessoires des mods de hacks rajoutés pour tester le système de Support:
   - Les mods "supportés" ne rajoutaient plus d'accessoires depuis des années
     (Je ne suis PAS contre le support des accessoires d'un hack, si leur attribution est limitée!)

- Bugfixe: Gestion des erreurs survenues lors de l'utilisation de l'API
   - Les requêtes erronées sont répétées après un petit délai
   - Le délai augmente à chaque fois, une panne chez Mojang ne démolira pas votre connexion

- Bugfixe: Porter une elytra interférait avec le Menu Avatar

- Interne: Le mod peut désormais dupliquer le joueur afin de l'afficher correctement dans un menu
   - Auparavant une seule variation pouvait être affichée en même temps, ce qui affectait le joueur IG
   - Cela rend également possible d'afficher plusieurs variations du joueur (cf. nouveaux ajouts)

- Launcher: Le cache de l'API enverra un avertissement si une requête a timeout
- Bugfixe: Il est désormais physiquement impossible que l'API relance accidentellement une requête
- Performances: Réduction de la création d'objets lors des requêtes au cache de l'API

---

### LaplongeMod 1.6.1.1 : API Patch (30/08/2017)
Pas de gros changements, surtout des perfectionnements des nouveaux systèmes rajoutés en 1.6.1
- L'hébergeur du mod peut désormais attribuer des skins à gros bras ("Steve?")
- Les logs du jeu affichent les requêtes envoyées à l'API de Mojang

- Amélioration vanilla: Rajout des splashs d'anniversaire retirés sur MC1.8.5
   - Fêtent l'anniversaire de Notch (créateur de Minecraft) et Ez (sa femme)
   - Honteusement supprimé car Notch avait revendu Mojang à l'époque

- Bugfixes:
   - La sécurité anti-skin-1.7 bloquait les capes
   - Suppression de quelques erreurs liées au cache de l'API

- Optimisation des performances de l'accès à l'API de Mojang:
   - Le mod classe désormais les UUIDs des joueurs en trois catégories:
      Les offlines (version 3) des serveurs cr@cks fonctionnent comme avant la mise à jour
      Les officiels (version 4) ne demandent pas l'UUID, déjà fourni par un serveur online
      Les impossibles (autres versions) sur des serveurs modifiés ne font rien: ce sont des NPCs
   - Cette modification a un côté positif et un côté négatif
      Le bon côté est que la connexion est moins souvent utilisée sur la plupart des serveurs
      Le mauvais est que le mod dépend en partie des données envoyées par le serveur de jeu	

- Interne: Amélioration du remplacement des skins
   Il s'applique automatiquement à toutes leurs utilisations au sein du jeu

- Interne: Les modèles des accessoires supportés sont séparés des modèles du mod
   Avec cette modification, les mods supportés sont complètement dissociés du LaplongeMod

- Interne: Augmentation des capacités d'utilisation de l'API de Mojang
   - Elle permet désormais d'obtenir le pseudo associé à un UUID
      Combiné à l'API existante afin d'éviter de faire deux résolutions opposées
   - Du code java peut être exécuté directement après la réussite ou l'échec d'une requête
   - Le nombre de requêtes simulanées sur l'API est désormais limité
   - (Légère?) réduction de l'impact de l'API sur les performances du jeu:
      Des accès "simplifiés" vers l'API regroupent plusieurs requêtes en une seule exécution

---

### LaplongeMod 1.6.1 : API Update (18/08/2017)
- Préface: cette MAJ est déployée sur deux fronts
   D'une part l'utilisation de l'API de Mojang afin d'améliorer le support
   des comptes Premiums sur les serveurs cracks non adaptés
   D'autre part une gestion plus adaptable des capes Moddées

   Le code des capes avait été conçu pour Optifine, et non pas pour une grande palette de mods
   Et même si la cape était indépendante du reste du code, les réglages étaient situé dans mon mod
   EN BREF, il fallait repartir de zéro pour obtenir un résultat convenable!
   Refaire le code d'une chose aussi simple qu'une cape, afin de le rendre adaptable, s'est averé être
   une tâche très grande, nécessitant une bonne semaine de modding...

   Gérer l'API de Mojang a été un véritable casse-tête chinois puisqu'il fallait
   1)Eviter de demander deux fois la même chose aux serveurs (pour économiser la connexion!)
   2)Ne le demander que quand nécessaire (certains serveurs cracks n'ont pas l'UUID, mais bien les skins!)
   3)Et faire tout ça en évitant de bloquer le jeu en attendant la réponse
   Je ne promets pas que la gestion sera parfaite du premier coup, mais j'espère l'avoir assez optimisée.



- Quelques améliorations "visibles" au système de Skin d'Urgence:
   - Finies les heures d'attente entre un changement de skin et un effet lors du redémarrage du mod
   - Les gros bras ("Steve?") et les bras fins ("Alex?") s'appliquent correctement en fonction du joueur

- Les URLs des capes par défaut sont stockées sur l'hébergeur
   - Cela permet de faire fonctionner des capes dont les textures sont normalement situées côté client

- Support des capes de certains clients hack pour tester
- Utilisation de l'API de Mojang (voir plus bas)
- Bug fixe: les boutons de "Config Sociale" étaient mélangés
- Interne: création d'un moyen d'accéder à <a href="http://wiki.vg/Mojang_API">l'API de Mojang</a>
   - Dispose d'un cache et d'un système de traitement parallèle afin de ne jamais refaire deux fois la même requête
   - Vous permet de disposer de toutes vos données officielles même sur un serveur crack!
   - Permet d'associer à votre pseudo votre véritable UUID stocké chez Mojang
   - Permet de récupérer vos textures de skin, cape et elytra ainsi que votre modèle Skin/Alex

- Interne: refonte complète du code de support
   - Ajout semi-automatique des réglages/configurations en fonction des mods supportés
   - Support de cape à texture unique
   - Création d'une structure commune pour toutes les capes moddées

---

### LaplongeMod 1.6 : Comeback Update (08.08.2017)
- Mise à jour en 1.12 (Pas de version 1.11 car laplonge était occupé par son TFE)
   - Le menu Avatar par défaut correspond par défaut à P ("player"), L étant les advancements
   - L'inventaire modifié contient le nouveau livre de recettes
   - La couleur d'une bannière n'est pas gérée de la même façon (aucun changement visuel normalement)
   - Hors code: Renommage de plusieurs fichiers afin de faire un Resource Pack 1.12

- Ajout d'une fonction "Simuler Crash" sur le menu pause
   - Bloque la connexion avec le serveur, causant un TimeOut au lieu d'une déconnexion classique
   - La connexion côté client n'est libérée qu'après que le serveur ait cessé de communiquer
   - ATTENTION: Le résultat de cette action sur un serveur non-vanilla est IMPREVISIBLE!
   - <font color="red">-Piéger un serveur en simulant une panne Internet est assimilable à un HACK et bannissable</font>

- Nouveau menu de réglage: le contrôle de l'armure du skin
   - Utile pour les joueurs avec la seconde couche (désactivable) sur leur skin
   - Masque la couche lorsqu'une armure est portée et la réaffiche lorsque l'armure est enlevée
   - Le casque, le plastron, et la combinaison pantalon+bottes sont configurables séparément
   - Le mod réduit autant que possible la quantité de changements transmis
      Réduit le spam, autant pour votre connexion que pour celle du serveur!

- Autres ajouts divers:
   - Le code de gestion des Elytras custom est désormais activé
   - Le zoom progressif a un effet comme lorsqu'on s'approche d'une WorldBorder
   - Les bannières du mod chargent un .json différent des bannières vanilla
   - Un serveur contournant la blacklist par SRV record sera tout de même détecté comme tel
      (Une seconde détection se fait lorsque l'IP entrée ne correspond pas à l'adresse de connexion de MC)

- Modifications diverses:
   - La gestion des niveaux de potions utilise le standard Vanilla si l'option est désactivée
   - Suppression du "localhost" du menu multi, trop peu utilisé
   - Les serveurs partenaires téléchargent automatiquement leur Resource Pack
   - Les ClientBinds sont de nouveau disponibles
   - Le masquage du /login ne masque plus les espaces

- Bugfix: Un problème hardware sur un LAN pouvait causer une boucle infinie de "serveur blacklisté"
    (Car Minecraft simule une panne LAN pour notifier le blocage d'un serveur)

- Interne:
  1) Il est désormais possible de changer d'interface graphique depuis le chargement d'une autre
  2) Optimisations diverses du code
   - Nettoyage du traitement des réglages/configurations
   - Simplification du stockage de la plupart des données du mod
      Jukeboxes, serveurs partenaires et les membres de l'ancienne team C0_Bl00d

   - Identification simplifiée des auras
   - Meilleure gestion des KeyBindings
   - Refonte du chargement des bannières

   - Les menus "Oui/Non" sont partiellement générés par du code source de Minecraft
   - Optimisation du chargement des menus de commandes
   - Amélioration massive du menu secret + correction d'un bug vieux de plusieurs années!
  
- REUPLOAD: correction de quelques défauts dans les interfaces graphiques

---

### LaplongeMod 1.5.3.1 : Anti-blacklist Patch (02.10.2016)
- <font color="red">Rajout d'une protection contre la blacklist pour les adresses locales</font>  
A l'heure actuelle, le code vanilla laisserait la blacklist agir même sur les réseaux locaux  
Désormais, le mod désactivera automatiquement la blacklist  
si l'adresse du serveur appartient à un "bloc réservé pour usage local"  

- Cela devrait légèrement optimiser l'accès à des serveurs sur réseau local  
N'aura que peu d'utilité, mais évitera un usage malhonnête dans le futur  

- Adresses IPv4:  
10.0.0.0/8 (gros réseau privé)  
127.0.0.0/8 (loopback/localhost)  
172.16.0.0/12 (moyen réseau privé)  
192.168.0.0/16 (petit réseau privé)  
  
- Adresses IPv6:  
::1 (loopback/localhost)  
fc00::/7 (adresses locales)

---

### LaplongeMod 1.5.3 : 1.10 Update (23.09.2016)
- Mise à jour en 1.10
- Pas d'autres ajouts puisque la 1.10 n'a pas beaucoup rajouté de contenu

- Si le démarrage du jeu est ralenti, le mod affichera un message dans la console pour le signaler
  - Cela permet de laisser la blacklist tout en pouvant l'éviter si besoin 
  ( Cela vous évitera de confondre une mauvaise connexion avec un crash! :P )

- Changements internes:
  - Accélération de l'accès aux valeurs du mod depuis le code de Minecraft
  - La compatibilité de la librarie Netty est calculée durant le démarrage du mod
  
- REUPLOAD: les livres et bibliothèques ne s'activaient pas

---

### LaplongeMod 1.5.2 : Blacklist Update (24.06.2016)
- **Tous les ajouts de la mise à jour 1.5.1.2**
- Suppression de l'implémentation de la blacklist de Mojang 

- Ajout d'une forme moddée de la librarie gérant la blacklist de mojang: 
  - Cela permet de laisser la blacklist tout en pouvant l'éviter si besoin 
  - Les conséquences de la blacklist restent les mêmes qu'en 1.5.1.2 

- Ajout de vérifications de sécurité: 
  - Les modifications apportées à la blacklist peuvent être désactivées via le fichier settings.txt 
  - Le bouton "se connecter" sera bloqué si la librarie Netty n'est pas compatible 
(Astuce: si vous ne désirez pas corriger le problème de compatibilité, vous pouvez masquer les erreurs dans la console en bloquant les modifications via settings.txt!) 

- Suppression de problèmes dans le code vanilla du jeu: 
  - `Session ID is...` est écrit dans les logs du jeu (information sensible, permet de pirater un compte) 
(Cette suppression sera intégrée en vanilla sur MC 1.9.1) 
  - Un "attribut inconnu" ne spam plus le jeu de "java.lang.IllegalArgumentException" 
(Le mod indiquera cependant une erreur plus claire dans la console) 

- Bugfixes: Suppression de spam de la console par des erreurs de connexion 
 - Le code de Mojang qui lit un "byte array" plantait les plugins channels 
 - Le mod gérait mal du tchat reçu avant de spawner le joueur

---

### Mise à jour annulée : LaplongeMod 1.5.1.2

*Cette mise à jour était prévue pour intégrer la blacklist de Minecraft 1.9.3*

- Recodage de la mise à jour précédente 
(Perdue suite à un crash de disque dur) 

- Implémentation de la blacklist de mojang prévue pour MC 1.9.3: 
Le mod permettra TOUJOURS de vous connecter (même en 1.9.3!) 

- Un partenaire du mod sur la BL sera *fortement* signalé dans le menu multi 

- Ajout d'un menu réduisant l'impact de la BlackList de Mojang 
 -Tenter de se connecter à un serveur blacklisté ouvre une fenêtre de confirmation 
 -La fenêtre de confirmation contient un lien vers les EULAs 

Il est conseillé de ne pas donner d'argent à un serveur blacklisté: 
1) Ce dernier peut fermer très rapidement (et se prendre une action en justice) 
2) La blacklist ne s'applique qu'aux serveurs dits "Pay to Win" 
3) Un admin laissant son serveur se faire blacklister n'est pas digne de confiance 

- Bugfixe: les messages d'erreurs n'étaient pas formattés correctement

---

### LaplongeMod 1.5.1.1 : 1.9 Patch (14.03.2016)
- Réactivation de certaines portions de code désactivées en 1.5.1:
 - Menu Principal et Menu Pause
 - Affichage du disque du LaplongeJukebox
 - Inversion des entités, masquage du nameplate

- Le slot "cape" du menu Avatar est remplacé par un slot "Elytra"
 - Les messages concernant la cape restent affichés dans ce slot
 - Ceux de l'élytra ne s'afficheront qu'en cas d'absence de cape

- Hors-code:
 - L'inventaire est de nouveau en HD
 - Modifications des crédits pour correspondre à la 1.9
 - Le modèle de la bannière a un rendu adéquat

- Bugfixes:
 - Le menu avatar génère un rendu correct en gamemode Spectateur
 - Le Steve Co. Supply Crate affiche de nouveau son bloc animé
 - Le menu `réglages du mod` devenait fou via le menu principal du mod
 - La barre de vie se comportait bizarrement à cause de la 1.9

- Changements internes:
 - Suppression du code du Menu Avatar concernant les partenaires
 - Le chargement de l'hébergeur se fait AVANT de lancer le mod

---

### Laplongemod 1.5.1 : 1.9 update (09.03.2016)
- Mise à jour vers Minecraft 1.9
(Optifine 1.9 n'étant pas encore disponible, pas de support élytra optifine)
(Si optifine modifie les élytras dans le futur, ce sera rajouté ^^)

- Le mode solo est désormais traité par le mod comme "serveur en 0.0.0.0"

- Support des Elytras:
 - La cape secondaire remplacera l'élytra (cf. section hors-code)
 - Le bloquage des capes Mojang bloquere le remplacement de l'Elytra
 - Une élytra secondaire est disponible, comme les skins et capes
 (La cape d'urgence étant traitée comme la véritable cape,
 l'Elytra la supporte automatiquement)

- Hors-code: Modification de certaines textures
 - La cape secondaire possède la texture de l'élytra par défaut
 - Modification de l'inventaire pour afficher le nouveau slot

- Changements internes:
 - Le code du mod est plus indépendent de celui du jeu
 - Renommage de la dernière méthode avec "Coblood" dans son nom

- Bugfixe: Le LaplongeCrypter bloquait parfois

---

### Laplongemod 1.5.0.2 : Host Patch (12.02.2016)

- Le démarrage du mod est désormais divisé en deux phases:
 - La connexion à l'hébergeur, très tôt durant le démarrage du jeu
 - Le chargement du mod avant la disparition du logo Mojang

- La connexion à l'hébergeur est géré par un thread séparé
Combiné à la division du démarrage, cela permet de démarrer plus vite

- Simplification du code gérant l'affichage des accessoires
 - L'accessoire Optifine par défaut n'est plus lié au joueur
 - Probablement des bugs rares corrigés "automatiquement" par le nettoyage

- Hors-code : Modifications des crédits du jeu pour y inclure ceux du mod

- Bugfixe : Le fichier des trophées devenait fou si il rétrécissait

- Interne : Changement des IDs de tous les trophées
 - AUCUNE CONSEQUENCE POUR VOUS : le mod convertit automatiquement l'ID
 - Tous les trophées tiennent dans un byte, ce qui réduit la taille du fichier

---

### Laplongemod 1.5.0.1 : Money Patch (07.11.2015)
- Le mod peut lire une IP de serveur au format IPv6
 - Aucun changement visible (retro-compatibilité)
 - Minecraft 1.9 ne bloquera plus l'usage de l'IPv6
 - Lapmod 1.5.0.1 supportera les nouvelles adresses
 
- Bugfixe : Le mod spammait `/money` si la valeur ne changeait pas
 
- Interne : Changement des IDs de tous les trophées
 - AUCUNE CONSEQUENCE POUR VOUS : le mod convertit automatiquement l'ID
 - Il s'agit de la seconde phase de la mise à jour du systèmes de trophées
 - Cela permettra dans la PROCHAINE mise à jour de réduire la taille du fichier

---

### LaplongeMod 1.5 : Trophies File Update (10.09.2015)
- Re-changement du design de l'inventaire:
 - Ne contient plus qu'un nouveau slot d'équipement afin de respecter la snapshot 15w31a
 - L'espace pour afficher le skin du joueur a de nouveau une largeur de 3 slots
 - Souhaitons une fois de plus adieu à la flèche de craft...

- Nouveau format de fichier pour stocker les trophées:
 - Occupe 4x fois moins de place sur le disque
 - N'utilise plus d'ancien code de stats de Minecraft (permet de déboguer en cas de besoin)
 - Les anciens trophées sont automatiquement transférés sur le nouveau format

- La connexion via les servers ne passent plus par les IPs mais par les ServerDatas:
 - Permet une redirection du port par les admins (coucou ShadowAxe!)
 - Supprime un ancien bugfixe qui évitait un crash lié aux Ressource Packs

- Le réglage `Santé des Amis` devient une config et la config `Notification Mails` devient un réglage

- Bugfixes :
 - Les anniversaires liés à Optifine inversaient le jour et mois
 - Les remotes ne s'activaient que lorsqu'elles étaient désactivées(!)
 - Les remotes affichaient leur "code d'activation" dans le chat

- Hors-code : Modification des limites de la traduction des niveaux de potions :
 - Au-dela du niveau 128, les niveaux de potions sont calculés à part de `-127`
 - Ajout des traductions `potion.potency.` supérieures et égales à `-127`
 - Les traductions de niveaux de potions supérieurs à 128 ont été supprimées

- NOTE : en réalité, les chiffres romains n'existent pas sous forme négative
- Le fichier de traductions rajoute un "moins" avant le chiffre correspondant

---

### LaplongeMod 1.4.2 : Laplonge Update  (27.07.2015)
- Changement du nom C0_Bl00dMod en LaplongeMod:
 - La touche par défaut du menu Avatar est le `L` et non plus le `C`
 - Suppression des "formes alternatives" du ClientBind et du ChatCrypter
 - Renommage du dossier ".minecraft/coblood" en ".minecraft/laplonge"
 - Le package (dans le .jar) `fr.coblood` devient `be.laplonge`

- Ajout d'un Jukebox customisable:
 - Fonction ajoutée suite à la forte demande des abonnés
 - Permet de faire charger par le LaplongeJukebox vos propres musiques
 - Petit défaut : implique d'ajouter vos musiques via un Resource Pack
 - La sélection des musiques se fait via le fichier `records.txt`
 (Note : l'emplacement pour le jukebox est semblable au `/playsound`)

- Introduction d'un système pour lancer deux musiques EN MEME TEMPS via le jukebox:
 - Permet par exemple d'écouter les disques 11 et 13 ensemble
 - Cet exemple est d'ailleurs intégré au jukebox standard
 (Si tous les morceaux sont du même auteur, son nom ne s'affiche qu'une seule fois)
 
- Légers changements au niveau du masque du `/login`:
 - Le caractère utilisé est une étoile (unicode) et non plus un astérisque
 - Le masque s'applique sans tenir compte de la casse de `login` (`/LOgin`, `/Login`, `/logIN`, ...)
 
- Suppression de quelques traductions et d'un peu de code inutilisé
 
- Les levels d'enchantements OPs se trouvent dans leur propre fichier:
 - Leurs "traductions" ont été migrées dans le fichier `en_XX.lang`
 - Evite de devoir modifier un énorme fichier à chaque changement de traduction
 
- Hors-code : Ajout d'une traduction pour `enchantment.level.0`:
 - Cette traduction peut être atteinte en vanilla via un `/give` mal paramétré
 - Le zéro n'existant pas en chiffres romains, le N (de nulli) est utilisé
 
- Interne :
 - Simplifcation des demandes d'affichage de messages d'erreur
 - Le port d'un serveur est directement intégré à son IP
 - Suppression du support de l'ancien format de l'hébergeur
 - Quelques autres optimisations dans le code
