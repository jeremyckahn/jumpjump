define([

    'logic/constants'
    ,'logic/util'
    ,'logic/shapes'
    ,'logic/drawable'

    ], function (

    constants
    ,util
    ,shapes
    ,Drawable

      ) {
  'use strict';

  /**
   * @param {Game} game
   * @param {CanvasRenderingContext2D} ctx
   * @constructor
   * @extends {Drawable}
   */
  function Jumper (game, ctx) {
    Drawable.call(this, ctx)
    this._vX = 0
    this._vY = 0
    this._color = constants.JUMPER_COLOR
    this._game = game
    this.setHeight(constants.JUMPER_HEIGHT)
    this.setWidth(constants.JUMPER_WIDTH)

  }
  util.inherit(Jumper, Drawable)

  // STATIC PROPERTIES
  _.extend(Jumper, {
    X_ACCELERATION: constants.JUMPER_PUSH_FORCE / constants.JUMPER_MASS
  })

  // PROTOTYPE PROPERTIES
  _.extend(Jumper.prototype, {
    _jumpTimestamp: 0

    /**
     * Calculate how much the Jumper will be out of bounds given the current
     * horizontal velocity and current X value.
     * @return {number} Positive is Jumper will be too far to the right,
     * negative if too far to the left, 0 if within bounds.
     */
    ,_getProjectedBoundsOverage: function () {
      var projectedX = this._x + this._vX
      var projectedRightEdge = projectedX + this._width

      if (projectedX < 0) {
        return projectedX
      } else if (projectedRightEdge > constants.CANVAS_WIDTH) {
        return projectedRightEdge - constants.CANVAS_WIDTH
      }

      return 0
    }

    /**
     * @param {number} delta Number of milliseconds since last tick
     */
    ,_pushLeft: function (delta) {
      this._vX = Math.max(
          this._vX - (Jumper.X_ACCELERATION * delta),
          -constants.JUMPER_MAX_X_VELOCITY)
    }

    /**
     * @param {number} delta Number of milliseconds since last tick
     */
    ,_pushRight: function (delta) {
      this._vX = Math.min(
          this._vX + (Jumper.X_ACCELERATION * delta),
          constants.JUMPER_MAX_X_VELOCITY)
    }

    /**
     * @param {number} delta Number of milliseconds since last tick
     */
    ,_applyHorizontalDeceleration: function (delta) {
      var isMovingRight = this._vX > 0
      var absoluteVelocity = Math.abs(this._vX)

      var deceleratedAbsoluteVelocity = Math.max(
          absoluteVelocity - (Jumper.X_ACCELERATION * delta), 0)

      this._vX = isMovingRight
        ? deceleratedAbsoluteVelocity
        : deceleratedAbsoluteVelocity * -1
    }

    /**
     * @param {number} delta Number of milliseconds since last tick
     */
    ,_applyGravity: function (delta) {
      this._vY = Math.max(
          this._vY - (constants.GRAVITY_ACCELERATION * delta),
          -constants.JUMPER_TERMINAL_VELOCITY)
    }

    /**
     * @param {number} delta Number of milliseconds since last tick
     */
    ,_applyJumpForce: function (delta) {
      if (this._game.isKeyLocked(constants.KEY_SPACE)) {
        return
      }

      var now = util.now()
      this._jumpTimestamp = now
      this._game.lockKey(constants.KEY_SPACE)

      this._vY = Math.min(
          this._vY + (constants.JUMPER_JUMP_FORCE * delta),
          constants.JUMPER_MAX_JUMP_VELOCITY)
    }

    /**
     * @param {number} delta Number of milliseconds since last tick
     * @param {Object} keysDown Map of currently pressed keys
     */
    ,_applyVerticalForce: function (delta, keysDown) {
      if (keysDown[constants.KEY_SPACE]) {
        this._applyJumpForce(delta)
      }

      this._applyGravity(delta)

      this._y = Math.max(this._y + this._vY, 0)
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

      if (!isBeingPushed && this._vX !== 0) {
        this._applyHorizontalDeceleration(delta)
      }

      var projectedBoundsOverage = this._getProjectedBoundsOverage()

      if (projectedBoundsOverage !== 0) {
        this._x = projectedBoundsOverage > 0
          ? constants.CANVAS_WIDTH - this._width
          : 0
      } else {
        this._x += this._vX
      }
    }

    /**
     * @param {number} delta Number of milliseconds since last tick
     * @param {Object} keysDown Map of currently pressed keys
     */
    ,tick: function (delta, keysDown) {
      this._applyHorizontalForce(delta, keysDown)
      this._applyVerticalForce(delta, keysDown)
    }

    /**
     * @override
     */
    ,draw: function () {
      shapes.square(this._ctx, this._color,
          this._x, this._y, this.getWidth(), this.getHeight())
    }

  })

  util.createGetters(Jumper.prototype, ['_vX', '_vY', '_color'])

  return Jumper

});
