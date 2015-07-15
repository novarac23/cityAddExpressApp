var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencoded = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

//Redis connection
var redis = require('redis');

if (process.env.REDISTOGO_URL) {
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
  var client = redis.createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth.split(":")[1]);
} else {
  var client = redis.createClient();
  client.select((process.env.NODE_ENV || 'development').length);
}

//End redis connection

app.get('/cities', function(req, res) {
  client.hkeys('cities', function(error, names) {
    if(error) throw error;
    res.json(names);
  });  
  //res.json(Object.keys(cities));
});

app.post('/cities', urlencoded, function(req, res) {
  var newCity = req.body;
  client.hset('cities', newCity.name, newCity.description, function(error) {
    if(error) throw error;
    res.status(201).json(newCity.name);
  });
  //cities[newCity.name] = newCity.description; 
});

app.delete('/cities/:name', function(req,res) {
  client.hdel('cities', req.params.name, function(error) {
    if(error) throw error;
    res.sendStatus(204);
  });
});

module.exports = app;
