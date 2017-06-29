'use strict';
const express = require('express');
const path = require('path');
const socketio = require('socket.io'); //let's you make an abstraction of a websocket connection

const app = express();

const server = app.listen(1337, function () {
  console.log('Server on port 1337');
});

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

let i = 0;

const io = socketio(server); //pass server into websocket constructor and we get an object based on EE

io.on('connection', function (socket) {

  console.log('new connection', ++i);

  socket.on('newMessage', function (message) {
    io.sockets.emit('chatMessage', message);
  });

});
