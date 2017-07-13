import { emitSocket } from './socket';
import { addListenerMulti } from './event';

export const input = {
  active: false,
  pos: { x: 0, y: 0 },
  pos_prev: false,
};

export const startInput = (canvas, width, height) => {
  // register mouse and touch event handlers
  addListenerMulti(canvas, 'mousedown touchstart', (e) => {
    e.preventDefault();
    input.active = true;
    input.pos_prev = false;
  });
  addListenerMulti(canvas, 'mousedown touchstart', (e) => {
    e.preventDefault();
    input.active = true;
    input.pos_prev = false;
  });

  addListenerMulti(canvas, 'mouseup mouseleave touchend touchcancel', (e) => {
    e.preventDefault();
    input.active = false;
    input.pos_prev = false;
  });

  addListenerMulti(canvas, 'mousemove touchmove', (e) => {
    e.preventDefault();
    // touches to clicks
    let x = false;
    let y = false;
    if (e.touches && e.touches.length > 0) {
      // touch
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else {
      // mouse click
      x = e.clientX;
      y = e.clientY;
    }
    // normalize click position to range 0.0 - 1.0
    input.pos.x = x / width;
    input.pos.y = y / height;
    // valid click or touch, is active, and was clicking before?
    if (x >= 0 && y >= 0 && input.active && input.pos_prev) {
      // send line to to the server
      emitSocket('draw_line', { line: [input.pos, input.pos_prev] });
    }
    if (x >= 0 && y >= 0) {
      input.pos_prev = { x: input.pos.x, y: input.pos.y };
    }
  });
};
