/* globals jest */
export const mockTo = jest.fn();
export const mockOn = jest.fn();

const socketio = jest.fn(() => ({
  to: mockTo,
  on: mockOn,
}));

export default socketio;
