/* globals document window */
import './app.css';

import { startSocket, emitSocket } from './socket';

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

  startSocket(context, width, height);

  // set canvas to full browser width/height
  canvas.width = width;
  canvas.height = height;

  // register mouse event handlers
  canvas.onmousedown = (e) => {
    e.preventDefault();
    mouse.click = true;
    mouse.pos_prev = false;
  };
  canvas.onmouseup = (e) => {
    e.preventDefault();
    mouse.click = false;
    mouse.pos_prev = false;
  };
  canvas.onmouseleave = (e) => {
    e.preventDefault();
    mouse.click = false;
    mouse.pos_prev = false;
  };

  canvas.onmousemove = (e) => {
    e.preventDefault();
    // normalize mouse position to range 0.0 - 1.0
    mouse.pos.x = e.clientX / width;
    mouse.pos.y = e.clientY / height;
    // is clicking, and was clicking before?
    if (mouse.click && mouse.pos_prev) {
      // send line to to the server
      emitSocket('draw_line', { line: [mouse.pos, mouse.pos_prev] });
    }
    mouse.pos_prev = { x: mouse.pos.x, y: mouse.pos.y };
  };
});
