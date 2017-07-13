'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var express = require('express');
var cors = require('cors');

var app = express();
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 3000;

// start server
server.listen(port, function () {
  // eslint-disable-next-line no-console
  console.log('server started on port ' + port + '!');
});

var corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true
};

app.use(cors(corsOptions));

// serve static assets normally
app.use(express.static(path.resolve(__dirname, '../../dist')));

// Handles all routes so you do not get a not found error
// app.get('*', (request, response) => {
//   response.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
// });

// array of all lines drawn
var lines = [];

// event-handler for new incoming connections
io.on('connection', function (socket) {
  // first send the history to the new client
  lines.map(function (line) {
    return socket.emit('draw_line', { line: line });
  });
  // add handler for message type "draw_line".
  socket.on('draw_line', function (data) {
    // add received line to history
    lines.push(data.line);
    // send line to all clients
    io.emit('draw_line', { line: data.line });
    io.emit('log', { text: 'hoorray' });
  });
});

exports.default = app;