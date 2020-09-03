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

router.route('/add').post((req, res) => {
    let todo = new Todo({text: "text", isCompleted: false})

    todo.save()
    .then(() => console.log('todo successfully created'))
    .catch(err => console.log(err))
    console.log(res)
})