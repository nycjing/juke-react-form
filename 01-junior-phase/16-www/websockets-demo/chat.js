'use strict';
/* global io */

const socket = io(window.location.origin);
const $main = $('main');
const $input = $('input');

// step 1: update server to use sockets 
// step 2: update client to use sockets
// step 3: when a client enters a chat, we need to emit this message up to the server
// step 4: when the server receives a message, we need to emit this message to all connected clients
// step 5: when a client receives an emitted message from the server, it needs to show it. 


$input.on('keydown', function (event) {
  // don't do anything unless the user presses ENTER
  if (event.keyCode !== 13) return;
  const message = $input.val();
  $input.val(null);
  socket.emit('newMessage', message);
});

socket.on('connect', function () {
  console.log('new connection');
});

socket.on('chatMessage', function (message) {
  $main.append(`<p>${message.trim()} </p>`);
});
