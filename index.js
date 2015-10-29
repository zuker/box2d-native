'use strict';
require('babel/register')({
  whitelist: [
    'es6.modules',
    'strict',
    'es6.parameters',
    'es6.spread',
    'es6.destructuring'
  ]
});

require('./Box2D');
