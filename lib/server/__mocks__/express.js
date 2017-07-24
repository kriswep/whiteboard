"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* globals jest */
var mockUse = exports.mockUse = jest.fn();
var mockGet = exports.mockGet = jest.fn();
var mockStatic = exports.mockStatic = jest.fn();

var express = jest.fn(function () {
  return {
    use: mockUse,
    get: mockGet
  };
});
express.static = mockStatic;

exports.default = express;