/* globals test expect jest */
// import { mockTo, mockOn } from 'socket.io';
import startIo, { linesToRoom } from './socket';

test('socket schould not smoke', () => {
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
