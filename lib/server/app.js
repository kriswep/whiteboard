'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allRoutes = allRoutes;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var server = _http2.default.Server(app);

var corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true
};

app.use((0, _cors2.default)(corsOptions));

// serve static assets normally
app.use(_express2.default.static(_path2.default.resolve(__dirname, '../../dist')));

// Handles all routes so you do not get a not found error
function allRoutes(request, response) {
  response.sendFile(_path2.default.resolve(__dirname, '../../dist', 'index.html'));
}
app.get('*', allRoutes);

exports.default = server;