define([

    'src/constants'
    ,'src/util'

    ], function (

    constants
    ,util

      ) {
  'use strict'

  /**
   * @param {Game} game
   * @constructor
   */
  function Viewport (game) {
    this._game = game
    util.createGetters(this, ['_yOffset'])
  }

  Viewport.prototype = {
    _yOffset: 0
    ,_previousJumperY: 0
    ,_previousYOffset: 0
    ,_panUpThreshold: constants.CANVAS_HEIGHT -
        constants.VIEWPORT_BORDER_DISTANCE_PAN_THRESHOLD
    ,_panDownThreshold: 0

    /**
     * @param {number} jumperY
     */
    ,_panUp: function (jumperY) {
      this._yOffset = jumperY -
          (constants.CANVAS_HEIGHT
          - constants.VIEWPORT_BORDER_DISTANCE_PAN_THRESHOLD)
    }

    /**
     * @param {number} jumperY
     */
    ,_panDown: function (jumperY) {
      this._yOffset = Math.max(
          jumperY - constants.VIEWPORT_BORDER_DISTANCE_PAN_THRESHOLD, 0)
    }

    /**
     * @param {Jumper} jumper Represents the player's avatar.
     */
    ,tick: function (jumper) {
      var jumperY = jumper.getY()

      if (jumperY > this._panUpThreshold) {
        this._panUp(jumperY)

        this._panUpThreshold = Math.max(jumperY,
          constants.CANVAS_HEIGHT -
          constants.VIEWPORT_BORDER_DISTANCE_PAN_THRESHOLD)

        this._panDownThreshold =
          jumperY - constants.CANVAS_HEIGHT
          + (2 * constants.VIEWPORT_BORDER_DISTANCE_PAN_THRESHOLD)

      } else if (jumperY < this._panDownThreshold) {
        this._panDown(jumperY)
        this._panDownThreshold = jumperY

        if (jumperY < constants.VIEWPORT_BORDER_DISTANCE_PAN_THRESHOLD) {
          this._panUpThreshold = constants.CANVAS_HEIGHT -
            constants.VIEWPORT_BORDER_DISTANCE_PAN_THRESHOLD
        } else {
          this._panUpThreshold -= this._previousJumperY - jumperY
        }
      }

      this._previousJumperY = jumperY
    }
  }

  return Viewport

});
