define([

    'logic/drawable'

    ], function (

    Drawable

    ) {
  'use strict';

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {TileRenderer.TileMap} tileMap
   * @constructor
   */
  function TileRenderer (ctx, tileMap) {
    var tiles = []

    /** @type {number} */
    this._tileHeight = tileMap.tileHeight
    /** @type {number} */
    this._tileWidth = tileMap.tileWidth
    /** @type {number} */
    this._tileGridRows = tileMap.map.length
    /** @type {number} */
    this._tileGridColumns = tileMap.map[0].length

    /** @type {Array.<Array.<TileRenderer.TileCode>>} */
    this._tiles = tileMap.map

    tileMap.map.reverse().forEach(function (row, y) {
      row.forEach(function (tileCode, x) {
        // NOTE: One could make a Tile Object (which would inherit from
        // Drawable) instead of decorating Drawable instances, but that may be
        // OOP overkill.
        var drawable = new Drawable(ctx)

        drawable.draw = tileMap.tiles[tileCode].render
        drawable.setHeight(tileMap.tileHeight)
        drawable.setWidth(tileMap.tileWidth)
        drawable.setX(tileMap.tileWidth * x)
        drawable.setY(tileMap.tileHeight * y)

        tiles.push(drawable)
      })
    })

    /** @type {Array.<Drawable>} */
    this._drawables = tiles
  }

  /**
   * @typedef {number}
   */
  //TileRenderer.TileCode

  /**
   * @typedef {{
   *   tileHeight: number,
   *   tileWidth: number,
   *   tiles: Tiles
   *   map: Array.<Array.<TileRenderer.TileCode>>
   * }}
   */
  //TileRenderer.TileMap

  /**
   * @typedef {Object.<number, TileRenderer.Tile>}
   */
  //TileRenderer.Tiles

  /**
   * @typedef {{
   *   canPass: boolean
   *   render: function
   * }}
   */
  //TileRenderer.Tile


  TileRenderer.prototype = {
    draw: function () {
      this._drawables.forEach(function (drawable) {
        drawable.draw()
      })
    }

    /**
     * @param {number} pointX
     * @param {number} pointY
     * @return {Tile|null} null is returned if there is no tile for pointX and
     * pointY.
     */
    ,getTileForPoint: function (pointX, pointY) {
      if (pointX < 0 || pointX > (this._tileHeight * this._tileGridRows)
        || pointY < 0 || pointY > (this._tileWidth * this._tileGridColumns)) {
        return null
      }

      var intPointX = parseInt(pointX, 10)
      var intPointY = parseInt(pointY, 10)
      var xCoord = parseInt(intPointX / this._tileWidth, 10)
      var yCoord = parseInt(intPointY / this._tileHeight, 10)

      return this._tiles[yCoord][xCoord]
    }
  }

  return TileRenderer

});
