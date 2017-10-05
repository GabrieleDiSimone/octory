'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect('mongodb://localhost/test', { useMongoClient: true });

var DbHandler = function DbHandler(url) {
  _classCallCheck(this, DbHandler);

  this.url = url;
  this.mongoose = _mongoose2.default.createConnection(this.url);
};

exports.default = DbHandler;