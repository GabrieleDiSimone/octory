'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BusHandler = function () {
  function BusHandler(url, modulesHandler) {
    _classCallCheck(this, BusHandler);

    this.url = url;
    this.actions = {};
    this.modulesHandler = modulesHandler;
  }

  _createClass(BusHandler, [{
    key: 'start',
    value: function start() {
      var _this = this;

      this.socket = _socket2.default.connect(this.url);
      this.socket.on('connect', function () {
        _this.actionsHandler();
        _this.registerModules();
      });
    }
  }, {
    key: 'actionsHandler',
    value: function actionsHandler() {
      var _this2 = this;

      this.socket.on('actions', function (action) {
        _this2.actions[action.name] = action;
      });
    }
  }, {
    key: 'registerModules',
    value: function registerModules() {
      if (this.modulesHandler) {
        var modules = this.modulesHandler.modules;
        this.socket.emit('register', modules);
      }
    }
  }]);

  return BusHandler;
}();

exports.default = BusHandler;