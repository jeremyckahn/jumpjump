define(['exports'], function (util) {
  'use strict'

  /**
   * @param {string} propertyName
   * @param {string} getOrSet Must be either 'get' or 'set'
   */
  function buildPublicName (propertyName, getOrSet) {
    return getOrSet + propertyName[1].toUpperCase() + propertyName.slice(2)
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
      object[buildPublicName(property, 'get')] = function () {
        return this[property]
      }
    })
  }

  /**
   * @param {Object} object
   * @param {Array.<string>} properties
   */
  util.createSetters = function (object, properties) {
    properties.forEach(function (property) {
      object[buildPublicName(property, 'set')] = function (val) {
        this[property] = val
      }
    })
  }

  util.getSampleMapData = function () {
    return {
      tileHeight: 20
      ,tileWidth: 15
      ,map:
      [[1, 0, 0, 0, 0, 0, 0, 0]
      ,[0, 0, 0, 0, 0, 0, 0, 0]]
    }
  }

});
