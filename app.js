var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencoded = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));
  
var cities = {
  'Lotopia': 'somedesc',
  'Caspiana': 'somedesc2', 
  'Indigo': 'somedesc3'
};

app.get('/cities', function(req, res) {
  res.json(Object.keys(cities));
});

app.post('/cities', urlencoded, function(req, res) {
  var newCity = req.body;
  cities[newCity.name] = newCity.description; 
  res.status(201).json(newCity);
});

module.exports = app;
