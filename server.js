process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var mongoose = require('./config/mongoose');
var express = require('./config/express');

var db = mongoose();// return mongoose.connect(config.mongoUri);
var app = express();
app.listen(3000);

module.exports = app;


// var mongoose = require('mongoose');
// var uri = 'mongodb://localhost/my-project';
// var db = mongoose.connect(uri);

console.log('Sever running at http://localhost:3000');