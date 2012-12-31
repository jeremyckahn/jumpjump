define([

    'src/constants'
    ,'src/shapes'

  ], function (

    constants
    ,shapes

  ) {
  tiles = {

    '0': {
      render: function () {}
    }

    ,'1': {
      render: function () {
        var platformHeight = 5

        shapes.square(this._ctx, constants.DEFAULT_TILE_COLOR, this._x,
          this._y - platformHeight, this.getWidth(), platformHeight)
      }
    }
  }

  return /** @type {Tiles} */(tiles)
});
