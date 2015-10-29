'use strict';
var path = require('path');

const Box2D = 'Box2D';

require('babel/register')(Object.assign({
  whitelist: [
    'es6.modules',
    'strict',
    'es6.parameters',
    'es6.spread',
    'es6.destructuring'
  ],
  ignore: function(filename) {
    return path.relative(__dirname, filename) !== `${Box2D}.js`;
  }
}, process.env.NODE_ENV === 'DEBUG'? { retainLines: true } : {}));

module.exports = require(`./${Box2D}`);
