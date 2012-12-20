require([

    'src/game'
    ,'src/constants'

    ], function (

    Game
    ,constants

      ) {


  // SETUP
  var canvas = document.getElementById('jump')
  var ctx = canvas.getContext('2d')

  canvas.height = constants.CANVAS_HEIGHT
  canvas.width = constants.CANVAS_WIDTH
  canvas.style.height = constants.CANVAS_HEIGHT + 'px'
  canvas.style.width = constants.CANVAS_WIDTH + 'px'
  canvas.style.background = constants.BACKGROUND_COLOR

  var game = new Game(ctx)

});
