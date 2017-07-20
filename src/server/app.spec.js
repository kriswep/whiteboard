/* globals test expect jest */
import path from 'path';
import { mockUse, mockStatic } from 'express';
import { allRoutes } from './app';

jest.mock('http');

test("app should use it's middleware", () => {
  expect(mockUse).toHaveBeenCalled();
  expect(mockStatic).toHaveBeenCalled();
  const response = {
    sendFile: jest.fn(),
  };
  expect(allRoutes.bind(null, null, response)).not.toThrow();
  expect(response.sendFile).toHaveBeenCalledWith(
    path.resolve(__dirname, '../../dist', 'index.html'),
  );
});
