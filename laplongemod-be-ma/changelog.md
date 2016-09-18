# Changelog LaplongeMod
### LaplongeMod 1.5.2 : Blacklist Update (24.06.2016)
- **Tous les ajouts de la mise à jour 1.5.1.2**
- Suppression de l'implémentation de la blacklist de Mojang 

- *Ajout d'une forme moddée de la librarie gérant la blacklist de mojang: 
 -Cela permet de laisser la blacklist tout en pouvant l'éviter si besoin 
 -Les conséquences de la blacklist restent les mêmes qu'en 1.5.1.2 

- Ajout de vérifications de sécurité: 
 -Les modifications apportées à la blacklist peuvent être désactivées via le fichier settings.txt 
 -Le bouton "se connecter" sera bloqué si la librarie Netty n'est pas compatible 
(Astuce: si vous ne désirez pas corriger le problème de compatibilité, vous pouvez masquer les erreurs dans la console en bloquant les modifications via settings.txt!) 

- Suppression de problèmes dans le code vanilla du jeu: 
- `Session ID is...` est écrit dans les logs du jeu (information sensible, permet de pirater un compte) 
(Cet suppression sera intégrée en vanilla sur MC 1.9.1) 
- Un "attribut inconnu" ne spam plus le jeu de "java.lang.IllegalArgumentException" 
(Le mod indiquera cependant une erreur plus claire dans la console) 

- Bugfixes: Suppression de spam de la console par des erreurs de connexion 
 -Le code de Mojang qui lit un "byte array" plantait les plugins channels 
 -Le mod gérait mal du tchat reçu avant de spawner le joueur

---

### Mise à jour annulée : LaplongeMod 1.5.1.2

(Cette mise à jour était prévue pour intégrer la blacklist de Minecraft 1.9.3) 

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
