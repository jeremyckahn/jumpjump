define([

    'src/constants'
    ,'src/jumper'

    ], function (

    constants
    ,Jumper

      ) {


  function Game () {
    var canvas = document.getElementById('jump')
    this.ctx = canvas.getContext('2d')
    this.decorateCanvas(canvas)
    this.jumper = new Jumper(this.ctx)
    this.tick()
  }

  Game.prototype = {

    tick: function () {
      webkitRequestAnimationFrame(_.bind(this.tick, this))

      var ctx = this.ctx
      ctx.clearRect(0, 0, constants.CANVAS_WIDTH, constants.CANVAS_HEIGHT)
      this.jumper.draw()
    }

    ,decorateCanvas: function (canvas) {
      canvas.height = constants.CANVAS_HEIGHT
      canvas.width = constants.CANVAS_WIDTH
      canvas.style.height = constants.CANVAS_HEIGHT + 'px'
      canvas.style.width = constants.CANVAS_WIDTH + 'px'
      canvas.style.background = constants.BACKGROUND_COLOR
    }

  }

  return Game

});
