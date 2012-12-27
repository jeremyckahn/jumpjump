define(['exports'], function (util) {
  'use strict'

  function buildPublicName (propertyName) {
    return 'get' + propertyName[1].toUpperCase() + propertyName.slice(2)
  }

  util.now = function () {
    return +(new Date)
  }

  /**
   * @param {Object} child
   * @param {Object} parent
   */
  util.inherit = function (child, parent) {
    var proxy = function () {}
    proxy.prototype = parent.prototype
    child.prototype = new proxy
    child.prototype.constructor = child
  }

  /**
   * @param {Object} object
   * @param {Array.<string>} properties
   */
  util.createGetters = function (object, properties) {
    properties.forEach(function (property) {
      object[buildPublicName(property)] = function () {
        return object[property]
      }
    })
  }

  util.getSampleMapData = function () {
    return [
       [1, 0, 0, 0, 0, 0, 0, 0]
      ,[0, 0, 0, 0, 0, 0, 0, 0]
    ]
  }

});
