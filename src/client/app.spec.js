/* globals test expect */
import app from './app';

// smoke  test
test('App should not crash', () => {
  expect(app).toBeDefined();
});
