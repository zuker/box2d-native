'use strict';
import 'should';
import {Vec2, World, BodyDef, EdgeShape, CircleShape, _dynamicBody} from '../';

let world = new World(new Vec2(0, 0));

describe('Box2D.i', () => {
  describe('%typemap(out) b2Shape*', () => [CircleShape, EdgeShape].forEach((Shape) => describe(`for ${Shape.name}`, () => {
    let shape = new Shape();

    it(`should return ${Shape.name}`, () => world
      .CreateBody(
        Object.assign(
          new BodyDef(),
          {
            position: new Vec2(0, 0),
            type: _dynamicBody
          }
        )
      )
      .CreateFixture(shape, 0)
      .GetShape().should.be.eql(shape));
  })));
});
