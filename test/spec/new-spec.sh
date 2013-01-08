#!/bin/bash

# cd into the directory this script is stored in.
# Stole this line from: http://stackoverflow.com/a/246128
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR

echo "/*global ok:true
global test:true
global equal:true
global notEqual:true
global require:true
*/
require([

  'app'

  ], function(

  Game

  ) {

  var ctx = document.createElement('canvas').getContext('2d')

  module('')

  test('',
      function () {
    ok(1)
  })
});" > $1.js

echo "Generated $1 spec boilerplate.  Remember to require it in the test runner!"

# This line adds the path the the "require" call in the test runner.
# It's unreadable.  I don't know how to make it better.
sed 's/])\;/',\'..\\/..\\/test\\/spec\\/$1\''\'$'\n]);/' ../index.html > index.html

mv index.html ../
cd -
