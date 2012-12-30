define([

    'exports'
    ,'src/constants'

  ], function (

    shapes
    ,constants

  ) {
  'use strict'

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {string} color A valid canvas color string
   * @param {number} x
   * @param {number} y
   * @param {number} height
   * @param {number} width
   */
  shapes.square = function (ctx, color, x, y, height, width) {
    var flippedY = constants.CANVAS_HEIGHT - y
    ctx.beginPath()
    ctx.moveTo(x, flippedY - height)
    ctx.lineTo(x, flippedY)
    ctx.lineTo(x + width, flippedY)
    ctx.lineTo(x + width, flippedY - height)
    ctx.fillStyle = ctx.strokeStyle = color
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
  }

});
