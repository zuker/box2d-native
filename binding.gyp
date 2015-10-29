{
  "targets": [
    {
      "target_name": "Box2D",
      "sources": ["Box2D_wrap.cxx"],
      "include_dirs": ["Box2D-2.3.0/Box2D"],
      "libraries": [ "<!(pwd)/Box2D-2.3.0/Box2D/Box2D/libBox2D.a" ]
    }
  ]
}