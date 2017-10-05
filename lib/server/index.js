'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _http = require('./interfaces/http');

var _http2 = _interopRequireDefault(_http);

var _websocket = require('./interfaces/websocket');

var _websocket2 = _interopRequireDefault(_websocket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// TODO: add HTTP/2
// TODO: add HTTPS
var InterfaceHandler = function () {
  function InterfaceHandler(modulesHandler) {
    var port = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8080;
    var socketEnabled = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    _classCallCheck(this, InterfaceHandler);

    this.modulesHandler = modulesHandler;
    this.port = port;
    this.socketEnabled = socketEnabled;
  }

  _createClass(InterfaceHandler, [{
    key: 'start',
    value: function start() {
      this.httpServer = new _http2.default(this.port, this.modulesHandler);
      this.httpServer.start();

      if (this.socketEnabled) {
        this.socketServer = new _websocket2.default(this.httpServer, this.modulesHandler);
        this.socketServer.start();
      }
    }
  }]);

  return InterfaceHandler;
}();

exports.default = InterfaceHandler;