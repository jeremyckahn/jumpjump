define([

    'src/constants'
    ,'src/jumper'

    ], function (

    constants
    ,Jumper

      ) {
  'use strict'


  /**
   * @constructor
   */
  function Game () {
    var canvas = document.getElementById('jump')
    this._ctx = canvas.getContext('2d')
    this._initCanvas(canvas)
    this._initControls()
    this._jumper = new Jumper(this._ctx)
    this._tick()
  }

  Game.prototype = {

    _initCanvas: function (canvas) {
      canvas.height = constants.CANVAS_HEIGHT
      canvas.width = constants.CANVAS_WIDTH
      canvas.style.height = constants.CANVAS_HEIGHT + 'px'
      canvas.style.width = constants.CANVAS_WIDTH + 'px'
      canvas.style.background = constants.BACKGROUND_COLOR
    }

    ,_initControls: function () {
      var body = document.body
    }

    ,_tick: function () {
      webkitRequestAnimationFrame(_.bind(this._tick, this))
      this._ctx.clearRect(0, 0, constants.CANVAS_WIDTH, constants.CANVAS_HEIGHT)
      this._jumper.draw()
    }

  }

  return Game

});
