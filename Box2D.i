%module "Box2D"
%rename(_operator) operator();
%rename(_add) operator+;
%rename(_subtract) operator-;
%rename(_multiply) operator*;
%rename(equals) operator==;

%rename(add) operator+=;
%rename(subtract) operator-=;
%rename(multiply) operator*=;

%{
#include "Box2D/Box2D.h"
%}
%include "Box2D/Box2D.h"
