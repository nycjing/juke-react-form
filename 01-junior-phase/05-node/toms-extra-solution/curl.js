// using http

/*-----------------------------------------
const http = require('http');

module.exports = (done, url) => {
  http.get(url, res => {
    let raw = '';

    res.setEncoding('utf8');
    res.on('data', data => raw += data);
    res.on('error', err => done(err));
    res.on('end', () => done(raw));
  });
};
------------------------------------------*/

// using request

const request = require('request');

module.exports = (done, url) => {
  request(url, (err, res, body) =>
    err ? done(err) : done(body));
};
