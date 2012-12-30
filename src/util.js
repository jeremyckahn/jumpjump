define(['exports'], function (util) {
  'use strict'

  /**
   * @param {string} getOrSet Must be either 'get' or 'set'
   * @param {string} propertyName
   */
  function buildPublicName (getOrSet, propertyName) {
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
      object[buildPublicName('get', property)] = function () {
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
      object[buildPublicName('set', property)] = function (val) {
        this[property] = val
      }
    })
  }

  /**
   * @param {Object} object
   * @param {Array.<string>} properties
   */
  util.createAccessors = function (object, properties) {
    util.createGetters(object, properties)
    util.createSetters(object, properties)
  }

  util.getSampleMapData = function () {
    return {
      tileHeight: 20
      ,tileWidth: 15
      ,map:
      [[0, 0, 0, 0, 0, 0, 0, 0]
      ,[0, 0, 0, 0, 0, 0, 0, 0]
      ,[1, 0, 0, 0, 0, 0, 0, 0]]
    }
  }

});
