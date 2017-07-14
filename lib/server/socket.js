'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// note for later: All rooms: io.sockets.adapter.rooms
// array of all lines drawn per room
var lines = [];

var startIo = function startIo(server) {
  var io = (0, _socket2.default)(server);

  /**
   * helper for sending lines to sockets' rooms
   */
  var linesToRoom = function linesToRoom(socket, line) {
    Object.keys(socket.rooms).map(function (room) {
      return (
        // lines[room].map(roomLines => roomLines.map(line => socket.emit('draw_line', { line }))),
        io.to(room).emit('draw_line', { line: line })
      );
    });
  };

  // event-handler for new incoming connections
  io.on('connection', function (socket) {
    // add handler for message type "draw_line".
    socket.on('draw_line', function (data) {
      // lines.map(line => socket.emit('draw_line', { line }));

      // add received line to history
      // lines.push(data.line);
      Object.keys(socket.rooms).map(function (room) {
        if (!lines[room]) lines[room] = [];
        lines[room].push(data.line);
        return true;
      });
      // send line to all clients in sockets rooms
      linesToRoom(socket, data.line);
      // io.emit('log', { text: 'hoorray' });
    });

    socket.on('switch_board', function (room) {
      // leave old rooms
      Object.keys(socket.rooms).map(function (oldRoom) {
        socket.leave(oldRoom);
        // nobody left in the room? when delete lines
        if (!io.sockets.adapter.rooms[oldRoom]) {
          lines[oldRoom] = undefined;
        }
        return true;
      });
      // join new room
      socket.join(room);
      // first send rooms' history to the new client
      if (lines[room]) {
        // lines[room].map(roomLines => roomLines.map(line => socket.emit('draw_line', { line })));
        lines[room].map(function (line) {
          return socket.emit('draw_line', { line: line });
        });
      }

      // io.to(room).emit('draw_line', lines[room]);
    });
  });
};
exports.default = startIo;