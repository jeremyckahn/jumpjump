define([

    'logic/util'

  ], function (

    util

  ) {
  'use strict'

  // This Object looks strange, and it is.  It exists to pass around Image
  // Objects and their srcs to get around cache and version name issues.
  function VersionedImage (imageId) {
    var img = document.getElementById(imageId)
    this._img = new Image
    this._isImageLoaded = false

    this._img.onload = _.bind(function () {
      this._isImageLoaded = true
    }, this)

    this._img.src = img.src
    util.createGetters(this, ['_isImageLoaded', '_img'])
  }

  return VersionedImage
});
