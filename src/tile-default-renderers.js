define([

    'src/shapes'

  ], function (

    shapes

  ) {
  tileRenderers = {

    '0': function () {}

    ,'1': function () {
      // TODO: Render a platform here
    }

  }

  return /** @type {TileRenderers} */(tileRenderers)
});
