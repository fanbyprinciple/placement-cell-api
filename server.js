const express = require('express');
const mongoose = require('mongoose');
const bp = require('body-parser');
const app = express();

// for validation of body inputs
var validator = require('validator');
var sanitize = require('validator').sanitize;

// mongo db connection from mlab
const mongodb_uri = 'mongodb://ashwin:ashwin@ds263109.mlab.com:63109/placement';
mongoose.connect(mongodb_uri);

app.use(bp.json());
app.use(bp.urlencoded({extended: true}));

//route for main route api
var indexRoute = require('./routes/api');
app.use('/',indexRoute);

//static file inpublic directory
app.use('/',express.static(__dirname+"/public"));

app.listen(8080,function() {
	console.log("Listening to http://localhost:8080");
})