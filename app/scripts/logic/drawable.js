define([

    'logic/util'

    ], function (

    util

    ) {
  'use strict';

  var drawables = []

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @constructor
   */
  function Drawable (ctx) {
    drawables.push(this)
    this._ctx = ctx
    this._x = 0
    this._y = 0
    this._height = 0
    this._width = 0
  }

  _.extend(Drawable, {
    /**
     * @param {Drawable} drawable1
     * @param {Drawable} drawable2
     * @return {number}
     */
    areIntersecting: function (drawable1, drawable2) {
      // Note: I'm lazy and stole the logic from here:
      // http://stackoverflow.com/questions/2752349/fast-rectangle-to-rectangle-intersection/2752387#2752387
      return !(drawable2._x > drawable1.getRight() ||
             drawable2.getRight() < drawable1._x ||
             drawable2.getTop() > drawable1._y ||
             drawable2._y < drawable1.getTop())
    }
  })

  /**
   * @param {Viewport} viewport
   */
  Drawable.applyViewPort = function (viewport) {
    drawables.forEach(function (drawable) {
      drawable._applyViewportOffset(viewport)
    })
  }

  /**
   * @param {Viewport} viewport
   */
  Drawable.unapplyViewPort = function (viewport) {
    drawables.forEach(function (drawable) {
      drawable._unapplyViewportOffset(viewport)
    })
  }

  Drawable.prototype = {

    /**
     * @param {Viewport} viewport
     */
    _applyViewportOffset: function (viewport) {
      this._y -= viewport.getYOffset()
    }

    /**
     * @param {Viewport} viewport
     */
    ,_unapplyViewportOffset: function (viewport) {
      this._y += viewport.getYOffset()
    }

    /**
     * @abstract
     */
    ,draw: function () {
      console.warn(
          'Calling Drawable#draw. You probably meant to override this.')
    }

    /**
     * @return {number}
     */
    ,getTop: function () {
      return this._y + this._height
    }

    /**
     * @return {number}
     */
    ,getRight: function () {
      return this._x + this._width
    }
  }

  var accessorList = ['_x', '_y', '_height', '_width', '_ctx']
  util.createAccessors(Drawable.prototype, accessorList)

  return Drawable

});
