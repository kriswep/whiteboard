/* eslint-disable no-param-reassign */
export const drawLine = (context, width, height, line) => {
  context.beginPath();
  context.moveTo(line[0].x * width, line[0].y * height);
  context.lineTo(line[1].x * width, line[1].y * height);
  context.strokeStyle = line[2].color;
  context.lineWidth = line[2].width;
  context.stroke();
};

export const clearCanvas = (context, width, height) => {
  context.fillStyle = '#FFF';
  context.fillRect(0, 0, width, height);
};
