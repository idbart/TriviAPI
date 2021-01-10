require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

// get a new express application
var app = express();

// setup body parsing middleware
express.use(bodyParser.json());

// call all of the controllers

// start the webserver listening on the port set in the .env file
app.listen(process.env.PORT);
console.log(`Listening on port ${process.env.PORT}`);