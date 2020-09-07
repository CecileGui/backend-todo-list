// imports
const express = require('express'); // framework web, fournit routing
const bodyParser = require('body-parser'); // parsage back <-> DB
const mongoose = require('mongoose'); // modélisation d'objets en base de données mongoDB
const cors = require('cors') //Cross Origin Resource Sharing

/**
 * Création d'une application Express et de son routeur
 */
const app = express();
const router = express.Router();

/**
 * Permet d'utiliser des Schema Mongoose
 * Chaque Schema modélise un objet dans une collection en base de données MongoDB
 */
const Schema = mongoose.Schema;

/**
 * Permet de parser objets <-> JSON
 */
app.use(bodyParser.json())

/**
 * Pour permettre au front des faire des requètes en provenance d'un domaine différent
 */
app.use(cors())

/**
 * Création d'un serveur HTTP sur le port 4000
 *  TODO: port sur un fichier properties
 */

app.listen(4000, () => {
    console.log("The server is up and running on port 4000")
})


/**
 * Lien de connexion à la base de donnée
 * TODO: gérer avec un fichier properties
 */
const db = "mongodb+srv://user_a:8O5asWvipBFKaTAK1t2X@cluster0.oxdgo.mongodb.net/TodoMERN?retryWrites=true&w=majority"

/**
 * Connexion à la base de données
 * si succès : message de confirmation
 * sinon l'erreur est affichée
 */
mongoose.connect(db)
.then(() => console.log("Connexion sucess!"))
.catch(err => (console.log(err)))

/**
 * Création du Schema modélisant un todo
 * text: description de la tâche à effectuer
 * done : true si la tâche est effectuée, false sinon
 */
let todoSchema = new Schema({
    text: String,
    done: Boolean
})
let Todo = mongoose.model('Todo', todoSchema)

/**
 * Racine des routes pour faire des requète sur la collection contenant des objets todo
 */
app.use('/todos', router)

/////////////////REQUETES
//GET ALL
router.route('/').get((req, res) => {
    Todo.find(function (err, items) {
        if (err){
            res.status(400).send('Les todos ne sont pas en base')
        } else {
            res.status(200).json(items)
        }
    })
    
    
})


// Pour ajouter à la DB
// TODO: vérifier le todo passé en requète (description non vide)
// ADD
router.route('/add').post((req, res) => {
    let todo = new Todo(req.body)

    todo.save()
    .then(() => {
        res.status(200).send()
    })
    .catch(err => {
        res.status(400).send(err)

    })
    
    
})

// Pour supprimer de la DB
// TODO: cas id n'existe pas?
// DELETE
router.route('/:id').delete((req, res) => {
    Todo.findByIdAndRemove(req.params.id, (err, todo) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.status(200).json('suppression effectuée avec succès')
        }
    })
})

// Mettre à jour un document
// TODO: id n'existe pas? requète vide? mauvais type de données?
// UPDATE
router.route('/:id').put((req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if(err) {
            res.send(err)
        }
        todo.text = req.body.text
        todo.done = req.body.done
        todo.save((err) => {
            if(err){
                res.send(err)
            }
            res.status(200).json('todo successfully updated')
        })
    })
})