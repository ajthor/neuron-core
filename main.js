'use strict';

const path = require('path');
const nconf = require('nconf');

const Manager = require('./src/manager');

//
// Create Express/Socket.io applocation.
//

// TODO: Determine if I really need to use Express at all. The web interface
// for control would be nice, but perhaps I could incorporate that into another
// repository.
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//
// Get nconf options
//
nconf.overrides({
  'always': 'be this value'
});

nconf.argv()
  .env()
  .file({file: `${path.join(__dirname, 'config')}/network.json`});

nconf.defaults({
  'l': 'info'
});

const network = nconf.get('network');

//
// Create Manager object for controlling the back-end.
//
var mgr = new Manager({
  network: network
});

//
// Set up Express/Socket.io listener.
//
server.listen(network.listener.port);

// var io = require('socket.io')(80);

//
// Express/Socket.io server events.
//
app.get('/', function(req, res){
  res.send('<p>Hello world</p>');
});

io.on('connection', function (socket) {
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('message', msg => {
    console.log('recieved message: ', JSON.stringify(msg));

  });
});

// server.listen(network.listener.port, function(){
//   console.log('listening on *:' + network.listener.port);
// });
