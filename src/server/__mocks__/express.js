/* globals jest */
export const mockUse = jest.fn();
export const mockGet = jest.fn();
export const mockStatic = jest.fn();

const express = jest.fn(() => ({
  use: mockUse,
  get: mockGet,
}));
express.static = mockStatic;

export default express;
