/* globals jest */
export const mockEmit = jest.fn();
export const mockTo = jest.fn(() => ({
  emit: mockEmit,
}));
export const mockOn = jest.fn();

const socketio = jest.fn(() => ({
  to: mockTo,
  on: mockOn,
  sockets: {
    adapter: {
      rooms: [],
    },
  },
}));

export default socketio;
