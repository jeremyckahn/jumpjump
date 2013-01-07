/*global test:true
global equal:true
global require:true
*/
require(['app'], function(Game) {

  var ctx = document.createElement('canvas').getContext('2d')
  var Drawable = require('logic/drawable')

  module('Drawable#getTop/Right')

  test('Drawable#getRight gets the right side of the Drawable',
      function () {
    var d1 = new Drawable(ctx)
    d1.setX(100)
    d1.setY(100)
    d1.setHeight(100)
    d1.setWidth(100)

    equal(d1.getRight(), 200, 'The right side was computed correctly')
  })

  test('Drawable#getTop gets the top side of the Drawable',
      function () {
    var d1 = new Drawable(ctx)
    d1.setX(100)
    d1.setY(100)
    d1.setHeight(100)
    d1.setWidth(100)

    equal(d1.getTop(), 200, 'The top side was computed correctly')
  })

  module('Drawable.areIntersecting')

  test('Drawable.areIntersecting is true when two Drawables collide',
      function () {
    var d1 = new Drawable(ctx)
    var d2 = new Drawable(ctx)

    d1.setX(0)
    d1.setY(0)
    d1.setHeight(100)
    d1.setWidth(100)
    d2.setX(50)
    d2.setY(50)
    d2.setHeight(100)
    d2.setWidth(100)

    equal(Drawable.areIntersecting(d1, d2), true,
      'Drawables are intersecting')
  })

  test('Drawable.areIntersecting is false when two Drawables do not collide',
      function () {
    var d1 = new Drawable(ctx)
    var d2 = new Drawable(ctx)

    d1.setX(0)
    d1.setY(0)
    d1.setHeight(100)
    d1.setWidth(100)
    d2.setX(200)
    d2.setY(200)
    d2.setHeight(100)
    d2.setWidth(100)

    equal(Drawable.areIntersecting(d1, d2), false,
      'Drawables are not intersecting')
  })

  test('Drawable.areIntersecting is exclusive',
      function () {
    var d1 = new Drawable(ctx)
    var d2 = new Drawable(ctx)

    d1.setX(0)
    d1.setY(0)
    d1.setHeight(100)
    d1.setWidth(100)
    d2.setX(100)
    d2.setY(100)
    d2.setHeight(100)
    d2.setWidth(100)

    equal(Drawable.areIntersecting(d1, d2), true,
      'Drawables are intersecting')

    d2.setX(101)

    equal(Drawable.areIntersecting(d1, d2), false,
      'Drawables are not intersecting')
  })
});
