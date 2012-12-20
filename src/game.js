define([

    'src/constants'
    ,'src/jumper'

    ], function (

    constants
    ,Jumper

      ) {
  'use strict'


  function now () {
    return +(new Date)
  }


  /**
   * @constructor
   */
  function Game () {
    var canvas = document.getElementById('jump')
    this._keysDown = {}
    this._ctx = canvas.getContext('2d')
    this._initCanvas(canvas)
    this._initControls()
    this._timestamp = now()
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
      body.addEventListener('keydown', _.bind(this._onKeyDown, this))
      body.addEventListener('keyup', _.bind(this._onKeyUp, this))
    }

    ,_onKeyDown: function (evt) {
      this._keysDown[evt.keyCode] = true
    }

    ,_onKeyUp: function (evt) {
      delete this._keysDown[evt.keyCode]
    }

    ,_tick: function () {
      webkitRequestAnimationFrame(_.bind(this._tick, this))

      var currentTime = now()
      var delta = currentTime - this._timestamp
      this._timestamp = currentTime

      this._ctx.clearRect(0, 0,
          constants.CANVAS_WIDTH, constants.CANVAS_HEIGHT)
      this._jumper.tick(delta, this._keysDown)
    }

  }

  return Game

});
