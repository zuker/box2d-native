%module "Box2D"
%rename(_operator) operator();
%rename(_add) operator+;
%rename(_subtract) operator-;
%rename(_multiply) operator*;
%rename(equals) operator==;

%rename(add) operator+=;
%rename(subtract) operator-=;
%rename(multiply) operator*=;

%typemap(out) b2Shape* {
  swig_type_info *info = SWIGTYPE_p_b2CircleShape;
  b2Shape *shape = 0;
  shape = $1;
  if (shape) {
  	switch (shape->GetType())
      {
      	case b2Shape::e_circle:
      		{
      			info = SWIGTYPE_p_b2CircleShape;
      		}
      		break;

      	case b2Shape::e_edge:
      		{
      			info = SWIGTYPE_p_b2EdgeShape;
      		}
      		break;

      	case b2Shape::e_chain:
      		{
      			info = SWIGTYPE_p_b2ChainShape;
      		}
      		break;

      	case b2Shape::e_polygon:
      		{
      			info = SWIGTYPE_p_b2PolygonShape;
      		}
      		break;

        default:
            break;
			}
  }
  $result = SWIG_NewPointerObj(SWIG_as_voidptr($1), info, 0 |  0 );
}

%{
#include "Box2D/Box2D.h"
%}
%include "Box2D/Box2D.h"
