'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// TODO: emit function
// TODO: create rooms and events for each module
var ResponseSocket = function () {
  function ResponseSocket(socket, socketCallback) {
    _classCallCheck(this, ResponseSocket);

    this.socket = socket;
    this.send = socketCallback;
  }

  _createClass(ResponseSocket, null, [{
    key: 'voidCallback',
    value: function voidCallback() {}
  }]);

  return ResponseSocket;
}();

// TODO: implements methods GET, POST, ETC


var SocketServer = function () {
  function SocketServer(httpServer, modulesHandler) {
    _classCallCheck(this, SocketServer);

    this.httpServer = httpServer;
    this.modulesHandler = modulesHandler;
  }

  _createClass(SocketServer, [{
    key: 'start',
    value: function start() {
      this.io = (0, _socket2.default)(this.httpServer.app);
      this.io.on('connect', this.socketHandlerFunction(this.modulesHandler));
    }
  }, {
    key: 'socketHandlerFunction',
    value: function socketHandlerFunction(modulesHandler) {
      return function (socket) {
        var mapActions = modulesHandler.mapActions;
        if (mapActions['connect']) {
          mapActions['connect'](ResponseSocket.voidCallback, null);
        }
        Object.keys(mapActions).forEach(function (key) {
          var action = mapActions[key];
          socket.on(key, function (params, socketCallbackParam) {
            if (!action.auth || params.auth === action.auth) {
              var socketCallback = typeof socketCallbackParam === 'function' ? socketCallbackParam : ResponseSocket.voidCallback;
              var connection = new ResponseSocket(socket, socketCallback);
              action.handler(connection, params);
            }
          });
        });
      };
    }
  }]);

  return SocketServer;
}();

exports.default = SocketServer;