/* globals test expect jest */
import { mockTo, mockOn } from 'socket.io';
import startIo, { linesToRoom } from './socket';

test('socket should not smoke', () => {
  expect(startIo).not.toThrow();
  // expect(mockOn).toHaveBeenCalledWith();
});

test('Should map lines to rooms', () => {
  const socket = {
    rooms: {
      room1: 'room1',
      room2: 'room2',
    },
  };
  const line = 'line';
  const mockEmit = jest.fn();
  const mockIo = {
    to: jest.fn(() => ({
      emit: mockEmit,
    })),
  };
  expect(linesToRoom.bind(null, socket, line, mockIo)).not.toThrow();

  expect(mockIo.to).toHaveBeenCalled();
  expect(mockIo.to.mock.calls[0][0]).toEqual('room1');
  expect(mockIo.to.mock.calls[1][0]).toEqual('room2');

  expect(mockEmit).toHaveBeenCalled();
  expect(mockEmit.mock.calls[0]).toEqual(['draw_line', { line: 'line' }]);
  expect(mockEmit.mock.calls[1]).toEqual(['draw_line', { line: 'line' }]);
});

test('startIo should handle socket events', () => {
  const socket = {
    on: jest.fn(),
    leave: jest.fn(),
    join: jest.fn(),
    rooms: [1, 2],
  };
  mockOn.mockClear();
  expect(startIo).not.toThrow();
  expect(mockOn).toHaveBeenCalled();
  expect(typeof mockOn.mock.calls[0][1]).toBe('function');
  expect(mockOn.mock.calls[0][1].bind(null, socket)).not.toThrow();

  expect(socket.on).toHaveBeenCalled();
  /* test draw line, todo test output */
  expect(socket.on.mock.calls[0][0]).toBe('draw_line');
  expect(typeof socket.on.mock.calls[0][1]).toBe('function');
  expect(socket.on.mock.calls[0][1].bind(null, socket)).not.toThrow();
  /* test switch room, todo test output */
  expect(socket.on.mock.calls[1][0]).toBe('switch_board');
  expect(typeof socket.on.mock.calls[1][1]).toBe('function');
  expect(socket.on.mock.calls[1][1].bind(null, socket)).not.toThrow();
});
