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

  Jumper.prototype = {
    vX: 0
    ,xY: 0
    ,x: 0
    ,y: constants.CANVAS_HEIGHT

    ,_pushLeft: function () {
      console.log('pushing left')
    }

    ,_pushRight: function () {
      console.log('pushing right')
    }

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

    /**
     * @param {string} direction Must be either 'left' or 'right'
     */
    ,push: function (direction) {
      direction === 'left'
        ? this._pushLeft()
        : this._pushRight()
    }

  }

  return Jumper

});
