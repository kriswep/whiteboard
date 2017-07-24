/* globals window */
import io from 'socket.io-client';
import { drawLine } from './draw';

const socket = io(window.location.origin);

export const startSocket = (context, width, height) => {
  // draw line received from server
  socket.on('draw_line', (data) => {
    const line = data.line;
    drawLine(context, width, height, line);
  });

  socket.on('log', (data) => {
    // eslint-disable-next-line no-console
    console.log(data.text);
  });
};

export const emitSocket = (evt, data, fn) => socket.emit(evt, data, fn);

export const changeRoom = newRoom => emitSocket('switch_board', newRoom);
