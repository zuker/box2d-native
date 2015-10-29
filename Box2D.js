'use strict';
import bindings from 'bindings';
import {reduce} from 'lodash';

let box2d = bindings('Box2D.node')
  , regexp = new RegExp('^b2')
  ;

export default reduce(
  box2d,
  (box2d, val, key) => regexp.test(key) ?
    Object.assign(
      box2d,
      {
        [key.replace(regexp, '')]: val
      }
    ) : box2d,
  box2d
);