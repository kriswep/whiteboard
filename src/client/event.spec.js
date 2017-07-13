/* globals test expect jest */
import { addListenerMulti } from './event';

test('event helper should have addListenerMulti', () => {
  const elem = {
    addEventListener: jest.fn(),
  };
  expect(addListenerMulti).toBeDefined();
  addListenerMulti(elem, 'evt1 evt2', 'cb');

  expect(elem.addEventListener.mock.calls[0]).toEqual(['evt1', 'cb', false]);
  expect(elem.addEventListener.mock.calls[1]).toEqual(['evt2', 'cb', false]);
});
