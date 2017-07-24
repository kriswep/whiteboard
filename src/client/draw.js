export const drawLine = (context, width, height, line) => {
  context.beginPath();
  context.moveTo(line[0].x * width, line[0].y * height);
  context.lineTo(line[1].x * width, line[1].y * height);
  context.stroke();
};

export const clearCanvas = (context, width, height) => {
  // eslint-disable-next-line no-param-reassign
  context.fillStyle = '#FFF';
  context.fillRect(0, 0, width, height);
};
