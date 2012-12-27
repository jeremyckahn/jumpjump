define([

    'src/constants'
    ,'src/util'

    ], function (

    constants
    ,util

    ) {
  'use strict'

  var drawables = [];

  /**
   * @constructor
   */
  function Drawable () {
    drawables.push(this)
    this._x = 0
    this._y = 0
    this._height = 0
    this._width = 0
  }

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
     * @abstract
     */
    draw: function () {
      console.warn(
          'Calling Drawable#draw. You probably meant to override this.')
    }

    /**
     * @param {Viewport} viewport
     */
    ,_applyViewportOffset: function (viewport) {
      this._y -= viewport.getYOffset()
    }

    /**
     * @param {Viewport} viewport
     */
    ,_unapplyViewportOffset: function (viewport) {
      this._y += viewport.getYOffset()
    }
  }

  var accessorList = ['_x', '_y', '_height', '_width']
  util.createGetters(Drawable.prototype, accessorList)
  util.createSetters(Drawable.prototype, accessorList)

  return Drawable

});
