"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ModulesHandler = function () {
  function ModulesHandler(modules) {
    _classCallCheck(this, ModulesHandler);

    this.modules = modules;
    this.setActions();
  }

  _createClass(ModulesHandler, [{
    key: "setActions",
    value: function setActions() {
      var mapActions = {};
      this.modules.forEach(function (module) {
        module.actions.forEach(function (action) {
          mapActions[action.name] = action;
        });
      });
      this.mapActions = mapActions;
    }
  }]);

  return ModulesHandler;
}();

exports.default = ModulesHandler;