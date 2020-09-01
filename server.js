const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const Schema = mongoose.Schema();
const router = express.Router();

app.listen(4000, () => {
    console.log("The server is up and running on port 4000")
})