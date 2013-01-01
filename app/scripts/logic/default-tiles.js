define([

    'logic/constants'
    ,'logic/shapes'

  ], function (

    constants
    ,shapes

  ) {
  'use strict';

  var tiles = {

    '0': {
      canPass: true
      ,render: function () {}
    }

    ,'1': {
      canPass: false

      ,render: function () {
        var platformHeight = 5

        shapes.square(this._ctx, constants.DEFAULT_TILE_COLOR, this._x,
          this._y - platformHeight, this.getWidth(), platformHeight)
      }
    }
  }

  return /** @type {Tiles} */(tiles)
});
