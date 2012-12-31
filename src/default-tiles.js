define([

    'src/constants'
    ,'src/shapes'

  ], function (

    constants
    ,shapes

  ) {
  tiles = {

    '0': function () {}

    ,'1': function () {
      var platformWidth = 5

      shapes.square(this._ctx, constants.DEFAULT_TILE_COLOR, this._x,
        this._y - platformWidth, this.getWidth(), platformWidth)
    }

  }

  return /** @type {Tiles} */(tiles)
});
