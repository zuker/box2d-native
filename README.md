[![Build Status](https://travis-ci.org/zuker/box2d-native.svg?branch=dev)](https://travis-ci.org/zuker/box2d-native)

# box2d-native
Box2D as native Node.js addon

## Details

Box2D compiled as static library, Node.js C++ addon produced by [swig](http://www.swig.org/).

## Install

Install with [NPM](https://www.npmjs.com/):

```
npm install box2d-native
```
This needs `curl` and essential build tools (`gcc`, `make`) installed.
Build tested only in Ubuntu 15.04 with Node.js v4.2.1.

## Usage

```javascript
import {World, Vec2, BodyDef, Body} from 'box2d-native';

let world = new World(gravity);
let body world.CreateBody(new BodyDef());

world.Step(1 / 60, 3, 3);
```

"Namespaced" Box2D classes (b2Vec2, b2World...) are also exposed.

## Performance

Results from [bench2d](https://github.com/joelgwebber/bench2d) (i7 2.9GHZ, 4GB RAM, Ubuntu 15.04):
 - [box2d.js](https://www.npmjs.com/package/box2d.js): ms/frame: 3.5537109375 5th %ile: 3 95th %ile: 4

 - [box2d-native](https://www.npmjs.com/package/box2d-native) ms/frame: 1.689453125 5th %ile: 1 95th %ile: 2