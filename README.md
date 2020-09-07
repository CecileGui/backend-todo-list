# Projet
BackEnd de l'appli TodoList avec **MangoDB**, **Express**, **Node.js**
Les projets **backend-todo-list** et **frontend-todo-list** fonctionnent ensembles.  
Il s'agit de créer, supprimer, modifier, marquer comme terminées des tâches à effectuer. Les tâches sont représentées par un objet "todo", contenant les attributs :
- text : string de description de la tâche à effectuer  
 - done : boolean true si la tâche est terminée
### Autres dépendances
- **BodyParser** : parse les request bodies en JSON
- **Mongoose** : modélisation des objets en base de données
- **Cors** : autorise le Cross Origin Resource Sharing

### Comment ça marche
1. Installation  
**Pré-requis : Node.js dernière version**  
Le projet est installé via la commande `npm install` 
qui télécharge toutes les dépendances.  
2. Connexion à la base de donnée MongoDB  
Me donner son adresse IP publique pour que je l'ajoute à la liste des IPs ayant accès à la base.  
3. Lancer le projet  
Il est lancé grâce au script "start" présent dans **package.json**. Utiliser la commande `npm start`.
Ensuite, pour questionner la base de données, passer par l'application frontend-todo-list, où utiliser un outils comme postman pour effectuer des requètes.  
