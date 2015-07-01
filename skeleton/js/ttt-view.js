(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.container = $el;
    this.setupBoard();
  };

  View.prototype.bindEvents = function () {
  };

  View.prototype.makeMove = function ($square) {
  };

  View.prototype.setupBoard = function () {
    var $grid = $("<ul class='grid group'></ul>");
    var square = ( "<li></li>");
    for ( var i = 0; i < 9; i++) {
      $grid.append(square);
    };

    this.container.append($grid);
  };
})();
