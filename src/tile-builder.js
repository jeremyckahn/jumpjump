define([

    'src/drawable'

    ], function (

    Drawable

    ) {

  /**
   * @type {number}
   */
  var TileCode

  /**
   * @type {Array.<Array.<TileCode>>}
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

    tileMap.forEach(function (row) {
      row.forEach(function (tileCode) {
        // NOTE: One could make a Tile Object (which would inherit from
        // Drawable) instead of decorating Drawable instances, but that may be
        // OOP overkill.
        var drawable = new Drawable
        drawable.draw = tileRenderers[tileCode]
        tiles.push(drawable)
      })

      /** @type {Array.<Drawable>} */
      this._drawables = tiles
    })
  }

  return TileRenderer

});
