define([

    'src/constants'
    ,'src/shapes'

  ], function (

    constants
    ,shapes

  ) {
  tileRenderers = {

    '0': function () {}

    ,'1': function () {
      shapes.square(this._ctx, constants.DEFAULT_TILE_COLOR, this._x,
          constants.CANVAS_HEIGHT - this._y, this.getHeight(), this.getWidth())
    }

  }

  return /** @type {TileRenderers} */(tileRenderers)
});
