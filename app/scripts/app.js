/*global webkitRequestAnimationFrame:true */
define([

    'logic/constants'
    ,'logic/util'
    ,'logic/background'
    ,'logic/drawable'
    ,'logic/jumper'
    ,'logic/viewport'
    ,'logic/tile-renderer'

    ], function (

    constants
    ,util
    ,Background
    ,Drawable
    ,Jumper
    ,Viewport
    ,TileRenderer

      ) {
  'use strict';


  /**
   * @constructor
   */
  function Game () {
    var canvas = document.getElementById('jump')
    if (!canvas) {
      console.warn(
          'No canvas present. Setup aborting; app is in testing mode.')
      return
    }

    this._keysDown = {}
    this._lockedKeys = {}
    this._ctx = canvas.getContext('2d')
    this._initCanvas(canvas)
    this._initControls()
    this._timestamp = util.now()
    this._pauseTimestamp = 0
    this._isPaused = false
    this._background = new Background(this, this._ctx)
    this._jumper = new Jumper(this, this._ctx)
    this._viewport = new Viewport()
    // TODO: Put this somewhere more reasonable - this is just a test.
    this._tileRenderer = new TileRenderer(this._ctx, util.getSampleMapData())
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
      delete this._keysDown[evt.keyCode];
      delete this._lockedKeys[evt.keyCode];

      if (evt.keyCode === constants.KEY_P) {
        this.togglePause()
      }
    }

    ,_onWindowBlur: function (evt) {
      this._keysDown = {}
      this._lockedKeys = {}
    }

    /**
     * @param {number=} opt_timeSinceStart This is provided by
     * webkitRequestAnimationFrame.  This is a throwaway value that doesn't get
     * used (due to poor browser support).
     * @param {number=} opt_pauseOffset The number of milliseconds to offset
     * the delta calculation.
     */
    ,_tick: function (opt_timeSinceStart, opt_pauseOffset) {
      if (!this._isPaused) {
        webkitRequestAnimationFrame(_.bind(this._tick, this))
      }

      var pauseOffset = opt_pauseOffset || 0
      var now = util.now()
      var delta = now - this._timestamp - pauseOffset
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
      this._tileRenderer.draw()
      this._jumper.draw()
    }

    ,togglePause: function () {
      this._isPaused = !this._isPaused

      if (!this._isPaused) {
        this._tick(null, util.now() - this._pauseTimestamp)
      } else {
        this._pauseTimestamp = util.now()
      }
    }

    ,isKeyLocked: function (keyCode) {
      return !!this._lockedKeys[keyCode]
    }

    ,lockKey: function (keyCode) {
      this._lockedKeys[keyCode] = true
    }

    /**
     * @param {Drawable} drawable
     * @return {Drawable|null}
     */
    ,getCollidingDrawable: function (drawable) {
      return null
    }

  }

  return Game

});
