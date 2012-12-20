define([

    'src/constants'
    ,'src/jumper'

    ], function (

    constants
    ,Jumper

      ) {


  function Game (ctx) {
    this.ctx = ctx
    this.jumper = new Jumper(ctx)
    this.tick()
  }

  Game.prototype = {

    tick: function () {
      webkitRequestAnimationFrame(_.bind(this.tick, this))

      var ctx = this.ctx
      ctx.clearRect(0, 0, constants.CANVAS_WIDTH, constants.CANVAS_HEIGHT)
      this.jumper.draw()
    }

  }

  return Game

});
