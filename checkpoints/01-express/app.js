'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
module.exports = app; // this line is only used to make testing easier.

// we add body-parsing middleware first to ensure POST requests provided
// a body object with the accessible querystring or JSON values
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// We use our Router exported from ./routes as the next level of middleware
// because it is qualified by the '/users' path, it only applies to
// paths that match /users + (whatever the path in ./routes) 
app.use('/users', require('./routes'));

// error handling middleware comes last
// Express identifies this as error handling middleware
// because it has 4 parameters, the first of which is an 'err'
// provided from some error throwing middleware as a call like 'next(err)'
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message);
});

if (!module.parent) app.listen(3000); // conditional prevents a very esoteric EADDRINUSE issue with mocha watch + supertest + npm test.
