#!/bin/bash
echo "/*global test:true
global equal:true
global require:true
*/
require(['app'], function(Game) {

  var ctx = document.createElement('canvas').getContext('2d')

  module('')

  test('',
      function () {
  })
});" > $1.js
