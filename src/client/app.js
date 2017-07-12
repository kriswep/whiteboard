/* globals document window */
import io from 'socket.io-client';

import './app.css';

document.addEventListener('DOMContentLoaded', () => {
  const mouse = {
    click: false,
    move: false,
    pos: { x: 0, y: 0 },
    pos_prev: false,
  };
  // get canvas element and create context
  const canvas = document.getElementById('drawing');
  const context = canvas.getContext('2d');
  const width = window.innerWidth;
  const height = window.innerHeight;
  const socket = io.connect('http://localhost:3000');

  // set canvas to full browser width/height
  canvas.width = width;
  canvas.height = height;

  // register mouse event handlers
  canvas.onmousedown = function (e) {
    e.preventDefault();
    mouse.click = true;
  };
  canvas.onmouseup = function (e) {
    e.preventDefault();
    mouse.click = false;
  };

  canvas.onmousemove = function (e) {
    e.preventDefault();
    // normalize mouse position to range 0.0 - 1.0
    mouse.pos.x = e.clientX / width;
    mouse.pos.y = e.clientY / height;
    mouse.move = true;
  };

  // draw line received from server
  socket.on('draw_line', (data) => {
    const line = data.line;
    context.beginPath();
    context.moveTo(line[0].x * width, line[0].y * height);
    context.lineTo(line[1].x * width, line[1].y * height);
    context.stroke();
  });

  // main loop, running every 25ms
  function mainLoop() {
    // check if the user is drawing
    if (mouse.click && mouse.move && mouse.pos_prev) {
      // send line to to the server
      socket.emit('draw_line', { line: [mouse.pos, mouse.pos_prev] });
      mouse.move = false;
    }
    mouse.pos_prev = { x: mouse.pos.x, y: mouse.pos.y };
    setTimeout(mainLoop, 25);
  }
  mainLoop();
});
