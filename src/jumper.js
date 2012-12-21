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

    /**
     * @param {number} delta Number of milliseconds since last tick
     */
    ,_pushLeft: function (delta) {
      this.vX = Math.max(
          this.vX - (Jumper.X_ACCELERATION * delta),
          -constants.JUMPER_MAX_X_VELOCITY)
    }

    /**
     * @param {number} delta Number of milliseconds since last tick
     */
    ,_pushRight: function (delta) {
      this.vX = Math.min(
          this.vX + (Jumper.X_ACCELERATION * delta),
          constants.JUMPER_MAX_X_VELOCITY)
    }

    /**
     * @param {number} delta Number of milliseconds since last tick
     */
    ,_applyHorizontalDeceleration: function (delta) {
      var isMovingRight = this.vX > 0
      var absoluteVelocity = Math.abs(this.vX)

      var deceleratedAbsoluteVelocity = Math.max(
          absoluteVelocity - (Jumper.X_ACCELERATION * delta), 0)

      this.vX = isMovingRight
        ? deceleratedAbsoluteVelocity
        : deceleratedAbsoluteVelocity * -1
    }

    /**
     * @param {number} delta Number of milliseconds since last tick
     * @param {Object} keysDown Map of currently pressed keys
     */
    ,_applyHorizontalForce: function (delta, keysDown) {
      var isBeingPushed = false

      if (keysDown[constants.KEY_LEFT] || keysDown[constants.KEY_H]) {
        this._pushLeft(delta)
        isBeingPushed = true
      }

      if (keysDown[constants.KEY_RIGHT] || keysDown[constants.KEY_L]) {
        this._pushRight(delta)
        isBeingPushed = true
      }

      if (!isBeingPushed && this.vX !== 0) {
        this._applyHorizontalDeceleration(delta)
      }

      this.x += this.vX
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
      this._applyHorizontalForce(delta, keysDown)
      this._draw()
    }

  }

  return Jumper

});
