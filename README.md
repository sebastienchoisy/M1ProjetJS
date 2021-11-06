# Projet Web

## Equipe
```
Sébastien CHOISY
MianMian SHAN
```

### Explication Projet

Le projet consiste à créer une page web qui permet de prendre des commandes de repas comme uber eat. Ce projet est codé en vue.js.


### Description du projet

Pour ce projet, différentes user stories peuvent être envisagées :
- L'utilisateur doit pouvoir accéder au site et consulter les différents restaurants et leurs détails.
- L'utilisateur doit pouvoir créer un compte en choissisant un rôle ( restaurateur ou client) et pouvoir s'identifier.
- Si l'utilisateur est un client, il peut passer commande après avoir choisi un restaurant
- Si c'est un restaurateur, il peut, en plus de passer commande, ajouter et modifier son/ses restaurant(s).

Pour implémenter les différentes fonctionnalités, la partie serveur (Backend) du projet a été modifié et de nouvelles routes et fonctions ont été ajoutés, cette partie va aussi créer automatiquement les collections nécessaires dans la MongoDB (users,orders,etc...).

Pour cette première user story, nous avons créé une page d'acceuil qui permet de visualiser les différents restaurants ainsi que leur photo récupérée directement de l'**API Google Places**. L'utilisateur peut séléctionner un restaurant et consulter ses détails (infos, localisation avec googleMap, menu). 
Pour faciliter la recherche nous avons mis à disposition une barre de recherche qui permet aux utilisateurs de trouver le restaurant plus facilement.

L'utilisateur peut s'enregistrer ou se connecter, pour cette fonctionnalité, **Bcrypt** a été utilisé pour encodé le mot de passe, une authentification avec **JWT Token** a été implémenté ( backend) et un **store** Vuex a été installé dans l'application, pour pouvoir facilement stocker les informations sans risques de l'utilisateur et son token, ainsi que gérer l'état de l'authentification :
 - L'utilisateur se connecte, si les informations correspondent, le serveur lui renvoit un token que l'application va stocker dans le localStorage, le store va changer l'état de l'authentification ( utilisateur authentifié ou non) selon la présence de ce token dans le localStorage, celui-ci est supprimé en cas de déconnexion.
 Ce token est passé en header des différentes requêtes ou il est nécessaire d'être connecté (passer commande par exemple), et permettra de valider l'identité de l'utilisateur.

Le store est aussi utilisé pour gérer l'état des commandes, on y retrouve donc un module authentification et un module order.
 
Points à Améliorer : 
- Les menus auraient pu être directement ajouter dans la MongoDB à partir du Json dans le back end, au lieu d'être utilisé sur le front.
- Les images des différents items des menus sont des urls extérieurs au lieu d'être dans nos assets.

### Usage
```
Pour démarrer le serveur : lancer un terminal et exécuter :
1 - git clone https://github.com/sebastienchoisy/M1ProjetJS.git
2 - cd serveur
3 - node .\serverCrudWithMongo.js

Lancer un autre terminal :
1 - npm run serve

```

