var path = require('path');
var express = require('express');
var app = express();
var socketio = require('socket.io');

const server = app.listen(1337, function () {
  console.log('The server is listening on port 1337!');
});

var io = socketio(server);

var inMemoryDrawHistory = [];

app.use(express.static(path.join(__dirname, 'browser')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', function (socket) {
  console.log(socket.id, 'connected');

  socket.emit('load', inMemoryDrawHistory);

  socket.on('draw', function (start, end, color) {
    inMemoryDrawHistory.push({ start, end, color });
    socket.broadcast.emit('draw', start, end, color);
  });

  socket.on('disconnect', function () {
    console.log('Goodbye, ', socket.id, ' :(');
  });
});

