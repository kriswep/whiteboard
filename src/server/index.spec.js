/* globals test expect jest */
import server from './app';
import startIo from './socket';
import './index';

jest.mock('./app', () => ({
  listen: jest.fn(),
}));
jest.mock('./socket', () => jest.fn());

test('index should start server and sockets', () => {
  expect(startIo).toHaveBeenCalledWith(server);
  expect(server.listen).toHaveBeenCalled();

  // callback server listen
  expect(typeof server.listen.mock.calls[0][1]).toBe('function');
  expect(server.listen.mock.calls[0][1]).not.toThrow();
});
