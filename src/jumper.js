define([

    'src/constants'

    ], function (

    constants

      ) {

  function Jumper (ctx) {
    this.ctx = ctx
  }

  Jumper.prototype = {
    vX: 0
    ,xY: 0
    ,x: 0
    ,y: constants.CANVAS_HEIGHT

    ,draw: function () {
      var x = this.x
      var y = this.y
      var ctx = this.ctx

      ctx.beginPath()
      ctx.moveTo(x, y - constants.JUMPER_HEIGHT)
      ctx.lineTo(x, y)
      ctx.lineTo(x + constants.JUMPER_WIDTH, y)
      ctx.lineTo(x + constants.JUMPER_WIDTH, y - constants.JUMPER_HEIGHT)
      ctx.fillStyle = ctx.strokeStyle = constants.JUMPER_COLOR
      ctx.fill()
      ctx.stroke()
      ctx.closePath()
    }
  }

  return Jumper

});
