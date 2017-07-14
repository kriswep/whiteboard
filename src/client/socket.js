/* globals window */
import io from 'socket.io-client';

const socket = io(window.location.origin);

export const startSocket = (context, width, height) => {
  // draw line received from server
  socket.on('draw_line', (data) => {
    const line = data.line;
    context.beginPath();
    context.moveTo(line[0].x * width, line[0].y * height);
    context.lineTo(line[1].x * width, line[1].y * height);
    context.stroke();
  });

  socket.on('log', (data) => {
    // eslint-disable-next-line no-console
    console.log(data.text);
  });
};

export const emitSocket = (evt, data, fn) => socket.emit(evt, data, fn);

export const changeRoom = newRoom => emitSocket('switch_board', newRoom);
