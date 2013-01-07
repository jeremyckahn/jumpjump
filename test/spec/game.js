/*global test:true
global equal:true
global notEqual:true
global require:true
*/
require([

  'app'
  ,'logic/default-tiles'

  ], function(

    Game
    ,defaultTiles

  ) {

  var ctx = document.createElement('canvas').getContext('2d')
  var TileRenderer = require('logic/tile-renderer')

  var mockRenderer =  new TileRenderer(ctx, {
      tileHeight: 25
      ,tileWidth: 25
      ,tiles: defaultTiles
      ,map:
        [[1, 0]
        ,[0, 0]]
    })

  module('Game#getCollidingDrawable')

  test('getCollidingDrawable gets colliding tile',
      function () {
    ok(1)
  })
});
