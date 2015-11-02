[![Build Status](https://travis-ci.org/zuker/box2d-native.svg)](https://travis-ci.org/zuker/box2d-native)

# box2d-native
[Box2D](http://box2d.org/) v2.3.1 as native Node.js addon.

## Details

Box2D compiled as static library, Node.js C++ addon produced by [swig](http://www.swig.org/).

## Install

Requires `curl`, `make`, `cmake`, `g++`. See also requirements for [swig](http://www.swig.org/) and [node-gyp](https://www.npmjs.com/package/node-gyp)

Install with [NPM](https://www.npmjs.com/):

```
npm install node-gyp -g
npm install box2d-native
```

**IMPORTANT:** Installation tested only in Ubuntu 15.04 with Node.js v4.2.1.

## Usage

```javascript
import {World, Vec2, BodyDef, Body} from 'box2d-native';

let world = new World(gravity);
let body = world.CreateBody(new BodyDef());

world.Step(1 / 60, 3, 3);
```

Original "namespaced" Box2D classes (`b2Vec2`, `b2World`...) are also exposed.

## Demo

```
npm run demo
```


## Performance

Results from [bench2d](https://github.com/joelgwebber/bench2d) (i7 2.9GHZ, 4GB RAM, Ubuntu 15.04):
 - [box2d.js](https://www.npmjs.com/package/box2d.js): ms/frame: 3.5537109375 5th %ile: 3 95th %ile: 4

 - [box2d-native](https://www.npmjs.com/package/box2d-native): ms/frame: 1.689453125 5th %ile: 1 95th %ile: 2

## TODO

 - Box2D methods with abstract class return type returns to JS instances of that abstract class (i.e. `b2Shape` instead of `b2EdgeShape`), as a result only properties declared in abstract class are accessible.
 - Improve demo (implement all stuff from C++ Box2D testbed).
 - Refactor build, use more convenient tool.
 - Provide more benchmark results to compare with.
 - Tests.
