define([

    'src/constants'

    ], function (

    constants

      ) {
  'use strict'

  /**
   * @param {Game} game
   * @param {CanvasRenderingContext2D} ctx
   * @constructor
   */
  function Background (game, ctx) {
    this._game = game
    this._ctx = ctx
    this._isImageLoded = false
    this._img = new Image

    this._img.onload = _.bind(function () {
      this._isImageLoded = true
    }, this)

    this._img.src = constants.BACKGROUND_IMAGE_URL
    this._horizontalTiles = Math.ceil(
        constants.CANVAS_WIDTH / constants.BACKGROUND_IMAGE_TILE_WIDTH)
    this._verticalTiles = Math.ceil(
        constants.CANVAS_HEIGHT / constants.BACKGROUND_IMAGE_TILE_HEIGHT) + 1
  }

  Background.prototype = {
    tick: function () {
    }

    /**
     * @param {Viewport} viewport
     */
    ,draw: function (viewport) {
      if (!this._isImageLoded) {
        return
      }

      var yOffset =
          viewport.getYOffset() % constants.BACKGROUND_IMAGE_TILE_HEIGHT

      var i, j
      for (i = 0; i < this._horizontalTiles; i++) {
        for (j = 0; j < this._verticalTiles; j++) {
          this._ctx.drawImage(this._img,
              i * constants.BACKGROUND_IMAGE_TILE_WIDTH,
              ((j - 1) * constants.BACKGROUND_IMAGE_TILE_HEIGHT) + yOffset)
        }
      }
    }
  }

  return Background

});
