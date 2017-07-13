const express = require('express');
const cors = require('cors');

const app = express();
const path = require('path');
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3000;

// start server
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server started on port ${port}!`);
});

const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
};

app.use(cors(corsOptions));

// serve static assets normally
app.use(express.static(path.resolve(__dirname, '../../dist')));

// Handles all routes so you do not get a not found error
// app.get('*', (request, response) => {
//   response.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
// });

// array of all lines drawn
const lines = [];

// event-handler for new incoming connections
io.on('connection', (socket) => {
  // first send the history to the new client
  lines.map(line => socket.emit('draw_line', { line }));
  // add handler for message type "draw_line".
  socket.on('draw_line', (data) => {
    // add received line to history
    lines.push(data.line);
    // send line to all clients
    io.emit('draw_line', { line: data.line });
    io.emit('log', { text: 'hoorray' });
  });
});

export default app;
