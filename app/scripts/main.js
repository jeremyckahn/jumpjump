require.config({
  shim: {
  },

  paths: {
    jquery: 'vendor/jquery.min'
  }
});

require(['app'], function(Game) {
  // use app here
  console.log(new Game);
});
