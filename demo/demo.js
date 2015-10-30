'use strict';
let Box2D = require('../');
let World = Box2D.World;
let Vec2 = Box2D.Vec2;
let b2Vec2 = Box2D.b2Vec2;
let b2Draw = Box2D.b2Draw;
let b2Shape = Box2D.b2Shape;
let b2Mul = Box2D.b2Mul;
let b2Assert = Box2D.b2Assert;
let b2_maxPolygonVertices = Box2D.b2_maxPolygonVertices;
let b2Color = Box2D.b2Color;
let _clientDebugDraw;
let world = new World(new Vec2(0, -9.8));
let _ = require('../node_modules/lodash');
let util = require('util');
let step;

var bd_ground = new Box2D.b2BodyDef();
var bd_circle = new Box2D.b2BodyDef();
bd_circle.position = new Vec2(20, 120);
bd_circle.type = Box2D.b2_dynamicBody;
var ground = world.CreateBody(bd_ground);
var circle = world.CreateBody(bd_circle);

var shape = new Box2D.b2EdgeShape();
let circleShape = new Box2D.b2CircleShape();

circleShape.m_radius = 10;
shape.Set(new Box2D.b2Vec2(-40.0, 0.0), new Box2D.b2Vec2(40.0, 0.0));

let fixture = ground.CreateFixture(shape, 0.0);
let circleFixture = circle.CreateFixture(circleShape, 0.0);
circleFixture.SetRestitution(0.5);

fixture._shape = shape;
circleFixture._shape = circleShape;

ground._fixtures = [fixture];
circle._fixtures = [circleFixture];

world._bodies = [ground, circle];
function DrawShape(fixture, xf, color, g_debugDraw) {

  switch (fixture.GetType())
  {
    case b2Shape.e_circle:
    {
      let circle = fixture._shape;

      let center = b2Mul(xf, circle.m_p);
      let radius = circle.m_radius;
      let axis = b2Mul(xf.q, new b2Vec2(1.0, 0.0));
        g_debugDraw.DrawSolidCircle(center, radius, axis, color);
    }
      break;

    case b2Shape.e_edge:
    {
      let edge = fixture._shape;
      let v1 = b2Mul(xf, edge.m_vertex1);
      let v2 = b2Mul(xf, edge.m_vertex2);
        g_debugDraw.DrawSegment(v1, v2, color);
    }
      break;

    case b2Shape.e_chain:
    {
      let chain = fixture.GetShape();
      let count = chain.m_count;
      const vertices = chain.m_vertices;

      let v1 = b2Mul(xf, vertices[0]);
      for (let i = 1; i < count; ++i)
      {
        let v2 = b2Mul(xf, vertices[i]);
          g_debugDraw.DrawSegment(v1, v2, color);
          g_debugDraw.DrawCircle(v1, 0.05, color);
        v1 = v2;
      }
    }
      break;

    case b2Shape.e_polygon:
    {
      let poly = fixture.GetShape();
      let vertexCount = poly.m_count;
      b2Assert(vertexCount <= b2_maxPolygonVertices);
      let vertices = new Array(b2_maxPolygonVertices);

      for (let i = 0; i < vertexCount; ++i)
      {
        vertices[i] = b2Mul(xf, poly.m_vertices[i]);
      }

        g_debugDraw.DrawSolidPolygon(vertices, vertexCount, color);
    }
      break;

    default:
      break;
  }
}


world.DrawDebugData = function () {
  if (!this._debugDraw) {
    return;
  }
  let flags = this._debugDraw.GetFlags();

  if (flags & Box2D.b2Draw.e_shapeBit) {
    for (let b, j = 0; b = this._bodies[j]; j++) {
      let xf = b.GetTransform();
      for (let i = 0, f; f = b._fixtures[i]; i++) {
        if (b.IsActive() == false)
        {
          DrawShape(f, xf, b2Color(0.5, 0.5, 0.3), this._debugDraw);
        }
        else if (b.GetType() == Box2D.b2_staticBody)
        {
          DrawShape(f, xf, new b2Color(0.5, 0.9, 0.5), this._debugDraw);
        }
        else if (b.GetType() == Box2D.b2_kinematicBody)
        {
          DrawShape(f, xf, new b2Color(0.5, 0.5, 0.9), this._debugDraw);
        }
        else if (b.IsAwake() == false)
        {
          DrawShape(f, xf, new b2Color(0.6, 0.6, 0.6), this._debugDraw);
        }
        else
        {
          DrawShape(f, xf, new b2Color(0.9, 0.7, 0.7), this._debugDraw);
        }
      }
    }
  }

  if (flags & b2Draw.e_jointBit)
  {
    for (let j = m_jointList; j; j = j.GetNext())
    {
      DrawJoint(j);
    }
  }

  if (flags & b2Draw.e_aabbBit)
  {
    let color = new Box2D.b2Color(0.9, 0.3, 0.9);
    let bp = m_contactManager.m_broadPhase;

    for (let b = this.m_bodyList; b; b = b.GetNext())
    {
      if (b.IsActive() == false)
      {
        continue;
      }

      for (let f = b.GetFixtureList(); f; f = f.GetNext())
      {
        for (let i = 0; i < f.m_proxyCount; ++i)
        {
          let proxy = f.m_proxies + i;
          let aabb = bp.GetFatAABB(proxy.proxyId);
          let vs = [new Vec2(), new Vec2(), new Vec2(), new Vec2()];
          vs[0].Set(aabb.lowerBound.x, aabb.lowerBound.y);
          vs[1].Set(aabb.upperBound.x, aabb.lowerBound.y);
          vs[2].Set(aabb.upperBound.x, aabb.upperBound.y);
          vs[3].Set(aabb.lowerBound.x, aabb.upperBound.y);

            this._debugDraw.DrawPolygon(vs, 4, color);
        }
      }
    }
  }

  if (flags & Box2D.b2Draw.e_centerOfMassBit)
  {
    for (let b = this.m_bodyList; b; b = b.GetNext())
    {
      let xf = b.GetTransform();
      xf.p = b.GetWorldCenter();
        this._debugDraw.DrawTransform(xf);
    }
  }
};
let lastTimestamp;
exports.step = function () {
  let now = Date.now();
  let stepRate = (now - lastTimestamp) / 1000;
  lastTimestamp = now;
  world.Step(stepRate, 10, 10);
  world.DrawDebugData();
};

exports.init = function (debugDraw) {
  world._debugDraw = debugDraw;
};