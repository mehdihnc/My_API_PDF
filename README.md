
# API de Gestion de PDFs

Ce projet est une API développée en utilisant Express.js et Node.js pour gérer les opérations sur les PDFs.

## Fonctionnalités

- Génération de nouveaux PDFs avec du contenu personnalisé.
- Modification de PDFs existants (ajout de texte, d'images, etc.).
- Téléchargement de PDFs depuis le serveur.
- Listing de tous les PDFs disponibles sur le serveur.

## Installation

Pour utiliser cette API, vous devez avoir Node.js et npm installés sur votre machine.

1. Clonez ou téléchargez ce projet sur votre machine.
2. Ouvrez un terminal dans le dossier du projet.
3. Exécutez `npm install` pour installer les dépendances nécessaires.

## Démarrage du Serveur

Exécutez `node app.js` pour démarrer le serveur. Par défaut, il écoute sur le port 3000.

## Utilisation de l'API

### Générer un PDF

- **Route :** POST `/pdf/generate`
- **Fonction :** Génère un nouveau PDF avec du contenu personnalisé.

### Modifier un PDF

- **Route :** PUT `/pdf/modify`
- **Fonction :** Modifie un PDF existant.

### Télécharger un PDF

- **Route :** GET `/pdf/download/:filename`
- **Fonction :** Télécharge un PDF spécifique du serveur.

### Lister les PDFs

- **Route :** GET `/pdf/list`
- **Fonction :** Liste tous les PDFs disponibles sur le serveur.

## Test de l'API

Vous pouvez tester l'API à l'aide d'outils comme Postman ou via le navigateur pour les requêtes GET.

