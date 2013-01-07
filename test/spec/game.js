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
  var Jumper = require('logic/jumper')

  var mockRenderer =  new TileRenderer(ctx, {
      tileHeight: 25
      ,tileWidth: 25
      ,tiles: defaultTiles
      ,map:
        [[1, 0]
        ,[0, 0]]
    })

  module('Game#getCollidingTile')

  test('getCollidingTile gets colliding tile',
      function () {
    var g = new Game()
    var j = new Jumper()
    j.setX(0)
    j.setY(25)
    g._platformTiles = mockRenderer
    var tile = g.getCollidingTile(j)

    equal('boolean', typeof tile.canPass,
      'Got a tile')
  })
});
