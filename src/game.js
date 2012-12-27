define([

    'src/constants'
    ,'src/util'
    ,'src/background'
    ,'src/drawable'
    ,'src/jumper'
    ,'src/viewport'
    ,'src/tile-builder'
    ,'src/tile-default-renderers'

    ], function (

    constants
    ,util
    ,Background
    ,Drawable
    ,Jumper
    ,Viewport

      ) {
  'use strict'


  /**
   * @constructor
   */
  function Game () {
    var canvas = document.getElementById('jump')
    this._keysDown = {}
    this._lockedKeys = {}
    this._ctx = canvas.getContext('2d')
    this._initCanvas(canvas)
    this._initControls()
    this._timestamp = util.now()
    this._background = new Background(this, this._ctx)
    this._jumper = new Jumper(this, this._ctx)
    this._viewport = new Viewport
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
      window.addEventListener('blur', _.bind(this._onWindowBlur, this))
    }

    ,_onKeyDown: function (evt) {
      this._keysDown[evt.keyCode] = true
    }

    ,_onKeyUp: function (evt) {
      delete this._keysDown[evt.keyCode]
      delete this._lockedKeys[evt.keyCode]
    }

    ,_onWindowBlur: function (evt) {
      this._keysDown = {}
      this._lockedKeys = {}
    }

    ,_tick: function () {
      webkitRequestAnimationFrame(_.bind(this._tick, this))

      var now = util.now()
      var delta = now - this._timestamp
      this._timestamp = now

      this._background.tick()
      this._jumper.tick(delta, this._keysDown)
      this._viewport.tick(this._jumper)

      Drawable.applyViewPort(this._viewport)
      this._draw()
      Drawable.unapplyViewPort(this._viewport)
    }

    ,_draw: function () {
      var viewport = this._viewport

      this._background.draw(viewport)
      this._jumper.draw()
    }

    ,isKeyLocked: function (keyCode) {
      return !!this._lockedKeys[keyCode]
    }

    ,lockKey: function (keyCode) {
      this._lockedKeys[keyCode] = true
    }

  }

  return Game

});
