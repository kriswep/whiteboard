/* globals test expect jest */
import app from './app';

jest.mock('./socket', () => {});
jest.mock('./input', () => {});

// smoke  test
test('App should not crash', () => {
  expect(app).toBeDefined();
});
