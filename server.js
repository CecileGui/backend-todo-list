const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const Schema = mongoose.Schema;
const router = express.Router();

app.use(bodyParser.json())

app.listen(4000, () => {
    console.log("The server is up and running on port 4000")
})

const db = "mongodb+srv://user_a:8O5asWvipBFKaTAK1t2X@cluster0.oxdgo.mongodb.net/TodoMERN?retryWrites=true&w=majority"


mongoose.connect(db)
.then(() => console.log("Connexion sucess!"))
.catch(err => (console.log(err)))

// Schema
let todoSchema = new Schema({
    text: String,
    isCompleted: Boolean
})

let Todo = mongoose.model('Todo', todoSchema)

// Routes
app.use('/todos', router)

//Récupérer tous les documents de la DB
//GET
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
//POST
router.route('/add').post((req, res) => {
    let todo = new Todo({text: "text3", isCompleted: false})

    todo.save()
    .then(() => {
        res.status(200).send()
    })
    .catch(err => {
        res.status(400).send(err)

    })
    
    
})

// Pour supprimer de la DB
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
// PUT
/*router.route('/:id').put((req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if(err) {
            res.send(err)
        }
        todo.text = req.body.text
        todo.isCompleted = req.body.isCompleted
        todo.save((err) => {
            if(err){
                res.send(err)
            }
            res.send('todo successfully updated')
        })
    })
})*/