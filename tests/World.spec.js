'use strict';
import 'should';
import {World, Vec2, BodyDef, Body} from '../';

describe('World', () => {
  let gravity = new Vec2(0, 0);
  it('should be created without an error', () => new World(gravity));

  describe('methods', () => {
    let world;
    beforeEach(() => world = new World(gravity));

    describe('#Step()', () => {
      it('should step without an error', () => world.Step(0, 0, 0));
    });
    describe('#CreateBody()', () => {
      it('should create body without an error', () => world.CreateBody(new BodyDef()).should.be.ok);
    });
  });

});