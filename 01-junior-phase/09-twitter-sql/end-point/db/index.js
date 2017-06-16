var pg = require('pg');
var client = new pg.Client('postgres://localhost/twitterdb3');

client.connect();

module.exports = client;