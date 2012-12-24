define(['exports'], function (shapes) {
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
    ctx.beginPath()
    ctx.moveTo(x, y - height)
    ctx.lineTo(x, y)
    ctx.lineTo(x + width, y)
    ctx.lineTo(x + width, y - height)
    ctx.fillStyle = ctx.strokeStyle = color
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
  }

});
