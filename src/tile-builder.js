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
   * @param {TileMap} tileMap
   * @param {TileRenderers} tileRenderers
   * @constructor
   */
  function TileRenderer (tileMap, tileRenderers) {
    var tiles = []

    tileMap.map.forEach(function (row, y) {
      row.forEach(function (tileCode, x) {
        // NOTE: One could make a Tile Object (which would inherit from
        // Drawable) instead of decorating Drawable instances, but that may be
        // OOP overkill.
        var drawable = new Drawable

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

  return TileRenderer

});
