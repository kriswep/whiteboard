'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _socket = require('./socket');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 3000;

// start server
_app2.default.listen(port, function () {
  // eslint-disable-next-line no-console
  console.log('server started on port ' + port + '!');
});

// start socket io handling
(0, _socket2.default)(_app2.default);