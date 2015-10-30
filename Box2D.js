'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bindings = require('bindings');

var _bindings2 = _interopRequireDefault(_bindings);

var _lodash = require('lodash');

let box2d = (0, _bindings2.default)('Box2D.node'),
    regexp = new RegExp('^b2');

exports.default = (0, _lodash.reduce)(box2d, (box2d, val, key) => regexp.test(key) ? Object.assign(box2d, {
  [key.replace(regexp, '')]: val
}) : box2d, box2d);
module.exports = exports.default;

//# sourceMappingURL=Box2D.js.map