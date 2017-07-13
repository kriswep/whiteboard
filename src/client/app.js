/* globals document window */
import { startSocket } from './socket';
import { startInput } from './input';

import './app.css';

document.addEventListener('DOMContentLoaded', () => {
  // get canvas element and create context
  const canvas = document.getElementById('drawing');
  const context = canvas.getContext('2d');
  const width = window.innerWidth;
  const height = window.innerHeight;

  startSocket(context, width, height);
  startInput(canvas, width, height);

  // set canvas to full browser width/height
  canvas.width = width;
  canvas.height = height;
});
