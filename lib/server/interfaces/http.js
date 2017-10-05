'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResponseHttp = function () {
  function ResponseHttp(res) {
    _classCallCheck(this, ResponseHttp);

    this.res = res;
  }

  _createClass(ResponseHttp, [{
    key: 'send',
    value: function send() {
      var err = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      this.res.writeHead(200);
      this.res.end(JSON.stringify({
        err: err,
        data: data
      }));
    }
  }]);

  return ResponseHttp;
}();

var HttpServer = function () {
  function HttpServer(port, modulesHandler) {
    _classCallCheck(this, HttpServer);

    this.modulesHandler = modulesHandler;
    this.port = port;
  }

  _createClass(HttpServer, [{
    key: 'start',
    value: function start() {
      this.app = _http2.default.createServer(this.httpHandlerFunction(this.modulesHandler));
      this.app.listen(this.port);
    }
  }, {
    key: 'httpHandlerFunction',
    value: function httpHandlerFunction(modulesHandler) {
      return function (req, res) {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
        var request = _url2.default.parse(req.url); // TODO: implements methods GET, POST, ETC
        var path = request.pathname;
        var query = request.query;
        var params = _querystring2.default.parse(query);
        var connection = new ResponseHttp(res);
        var action = modulesHandler.mapActions[path];
        if (action && (!action.auth || params.auth === action.auth)) {
          action.handler(connection, params);
        } else {
          connection.send('notExists');
        }
      };
    }
  }]);

  return HttpServer;
}();

exports.default = HttpServer;