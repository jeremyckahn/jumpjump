;(function (window) {

  // CONSTANTS
  var
    CANVAS_HEIGHT = 500
    ,CANVAS_WIDTH = 300
    ,BACKGROUND_COLOR = '#444'
    ,JUMPER_COLOR = '#f0f'
    ,JUMPER_HEIGHT = 50
    ,JUMPER_WIDTH = 50

  function Jumper (ctx) {
    this.ctx = ctx
  }

  Jumper.prototype = {
    vX: 0
    ,xY: 0
    ,x: 0
    ,y: CANVAS_HEIGHT

    ,draw: function () {
      var x = this.x
      var y = this.y
      var ctx = this.ctx

      ctx.beginPath()
      ctx.moveTo(x, y - JUMPER_HEIGHT)
      ctx.lineTo(x, y)
      ctx.lineTo(x + JUMPER_WIDTH, y)
      ctx.lineTo(x + JUMPER_WIDTH, y - JUMPER_HEIGHT)
      ctx.fillStyle = ctx.strokeStyle = JUMPER_COLOR
      ctx.fill()
      ctx.stroke()
      ctx.closePath()
    }
  }

  function Game (ctx) {
    this.ctx = ctx
    this.jumper = new Jumper(ctx)
    this.tick()
  }

  Game.prototype = {
    tick: function () {
      webkitRequestAnimationFrame(_.bind(this.tick, this))

      var ctx = this.ctx
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      this.jumper.draw()
    }
  }

  // SETUP
  var canvas = document.getElementById('jump')
  var ctx = canvas.getContext('2d')

  canvas.height = CANVAS_HEIGHT
  canvas.width = CANVAS_WIDTH
  canvas.style.height = CANVAS_HEIGHT + 'px'
  canvas.style.width = CANVAS_WIDTH + 'px'
  canvas.style.background = BACKGROUND_COLOR

  var game = new Game(ctx)

} (this));
