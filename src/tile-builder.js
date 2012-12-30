define([

    'src/drawable'

    ], function (

    Drawable

    ) {
  'use strict'

  /**
   * @type {number}
   */
  var TileCode

  /**
   * @type {{
   *   tileHeight: number,
   *   tileWidth: number,
   *   map: Array.<Array.<TileCode>>
   * }}
   */
  var TileMap

  /**
   * @type {Object.<number, function>}
   */
  var TileRenderers

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {TileMap} tileMap
   * @param {TileRenderers} tileRenderers
   * @constructor
   */
  function TileRenderer (ctx, tileMap, tileRenderers) {
    var tiles = []

    tileMap.map.reverse().forEach(function (row, y) {
      row.forEach(function (tileCode, x) {
        // NOTE: One could make a Tile Object (which would inherit from
        // Drawable) instead of decorating Drawable instances, but that may be
        // OOP overkill.
        var drawable = new Drawable(ctx)

        drawable.draw = tileRenderers[tileCode]
        drawable.setHeight(tileMap.tileHeight)
        drawable.setWidth(tileMap.tileWidth)
        drawable.setX(tileMap.tileWidth * x)
        drawable.setY(tileMap.tileWidth * y)

        tiles.push(drawable)
      })
    })

    /** @type {Array.<Drawable>} */
    this._drawables = tiles
  }

  TileRenderer.prototype = {
    tick: function () {}

    ,draw: function () {
      this._drawables.forEach(function (drawable) {
        drawable.draw()
      })
    }
  }

  return TileRenderer

});
