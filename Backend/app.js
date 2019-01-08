var express = require("express");
var app = express();
var expressValidator = require('express-validator');

app.use(function(req,res,next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();

});

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(expressValidator());

var db = require('./db');
var customerController = require('./customer/customerController');

app.use('/customers', customerController);

module.exports = app;