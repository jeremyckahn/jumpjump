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
  var mockMapData =  {
    tileHeight: 25
    ,tileWidth: 25
    ,tiles: defaultTiles
    ,map:
      [[1, 0, 0, 0, 0, 0, 0, 0]
      ,[0, 0, 0, 0, 0, 0, 0, 0]]
  }

  module('TileRenderer#getTileForPoint')

  test('Tile can be retrieved',
      function () {
    var t1 = new TileRenderer(ctx, mockMapData)
    var tile = t1.getTileForPoint(0, 0)

    notEqual(null, tile, 'Retrieved a Tile')
  })
});
