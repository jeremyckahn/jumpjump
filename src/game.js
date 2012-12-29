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
    ,TileBuilder
    ,tileDefaultRenderers

      ) {
  'use strict'


  /**
   * @constructor
   */
  function Game () {
    var canvas = document.getElementById('jump')
    this._keysDown = {}
    this._lockedKeys = {}
    this._isPaused = false
    this._ctx = canvas.getContext('2d')
    this._initCanvas(canvas)
    this._initControls()
    this._timestamp = util.now()
    this._background = new Background(this, this._ctx)
    this._jumper = new Jumper(this, this._ctx)
    this._viewport = new Viewport
    // TODO: Put this somewhere more reasonable - this is just a test.
    this._tileBuilder =
        new TileBuilder(util.getSampleMapData(), tileDefaultRenderers)
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

      if (evt.keyCode === constants.KEY_P) {
        this.togglePause()
      }
    }

    ,_onWindowBlur: function (evt) {
      this._keysDown = {}
      this._lockedKeys = {}
    }

    ,_tick: function () {
      if (!this._isPaused) {
        webkitRequestAnimationFrame(_.bind(this._tick, this))
      }

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

    ,togglePause: function () {
      this._isPaused = !this._isPaused

      if (!this._isPaused) {
        this._tick()
      }
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
