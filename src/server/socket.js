import socketio from 'socket.io';

// note for later: All rooms: io.sockets.adapter.rooms
// array of all lines drawn per room
const lines = [];

const startIo = (server) => {
  const io = socketio(server);

  /**
   * helper for sending lines to sockets' rooms
   */
  const linesToRoom = (socket, line) => {
    Object.keys(socket.rooms).map(room =>
      // lines[room].map(roomLines => roomLines.map(line => socket.emit('draw_line', { line }))),
      io.to(room).emit('draw_line', { line }),
    );
  };

  // event-handler for new incoming connections
  io.on('connection', (socket) => {
    // add handler for message type "draw_line".
    socket.on('draw_line', (data) => {
      // lines.map(line => socket.emit('draw_line', { line }));

      // add received line to history
      // lines.push(data.line);
      Object.keys(socket.rooms).map((room) => {
        if (!lines[room]) lines[room] = [];
        lines[room].push(data.line);
        return true;
      });
      // send line to all clients in sockets rooms
      linesToRoom(socket, data.line);
      // io.emit('log', { text: 'hoorray' });
    });

    socket.on('switch_board', (room) => {
      // leave old rooms
      Object.keys(socket.rooms).map((oldRoom) => {
        socket.leave(oldRoom);
        // nobody left in the room? when delete lines
        if (!io.sockets.adapter.rooms[oldRoom]) {
          lines[oldRoom] = undefined;
        }
      });
      // join new room
      socket.join(room);
      // first send rooms' history to the new client
      if (lines[room]) {
        // lines[room].map(roomLines => roomLines.map(line => socket.emit('draw_line', { line })));
        lines[room].map(line => socket.emit('draw_line', { line }));
      }

      // io.to(room).emit('draw_line', lines[room]);
    });
  });
};
export default startIo;
