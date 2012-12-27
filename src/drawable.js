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
    util.createGetters(this, ['_x', '_y', '_height', '_width'])
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
    _x: 0
    ,_y: 0
    ,_height: 0
    ,_width: 0

    /**
     * @abstract
     */
    ,draw: function () {
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

  return Drawable

});
