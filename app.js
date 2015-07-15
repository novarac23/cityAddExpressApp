var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencoded = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

var cities = require('./routes/cities');
app.use('/cities', cities);

module.exports = app;
