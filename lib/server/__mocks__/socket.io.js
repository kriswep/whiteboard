"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* globals jest */
var mockTo = exports.mockTo = jest.fn();
var mockOn = exports.mockOn = jest.fn();

var socketio = jest.fn(function () {
  return {
    to: mockTo,
    on: mockOn
  };
});

exports.default = socketio;