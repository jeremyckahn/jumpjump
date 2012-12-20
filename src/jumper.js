define([

    'src/constants'

    ], function (

    constants

      ) {
  'use strict'

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @constructor
   */
  function Jumper (ctx) {
    this.ctx = ctx
  }

  _.extend(Jumper, {
    X_ACCELERATION: constants.JUMPER_PUSH_FORCE / constants.JUMPER_MASS
  })

  Jumper.prototype = {
    vX: 0
    ,vY: 0
    ,x: 0
    ,y: constants.CANVAS_HEIGHT

    ,_pushLeft: function (delta) {
      var initialVX = this.vX

      this.vX = Math.max(
          initialVX - (Jumper.X_ACCELERATION * delta),
          -constants.JUMPER_MAX_X_VELOCITY)
    }

    ,_pushRight: function (delta) {
      var initialVX = this.vX

      this.vX = Math.min(
          initialVX + (Jumper.X_ACCELERATION * delta),
          constants.JUMPER_MAX_X_VELOCITY)
    }

    ,_draw: function () {
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

    /**
     * @param {number} delta Number of milliseconds since last tick
     * @param {Object} keysDown Map of currently pressed keys
     */
    ,tick: function (delta, keysDown) {

      if (keysDown[constants.KEY_LEFT] || keysDown[constants.KEY_H]) {
        this._pushLeft(delta)
      }

      if (keysDown[constants.KEY_RIGHT] || keysDown[constants.KEY_L]) {
        this._pushRight(delta)
      }

      this._draw()
    }

  }

  return Jumper

});
