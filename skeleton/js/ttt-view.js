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
    $(function(){
      this.container.on("click", "li", function(event){
        TTT.Game.playMove();
      })
    })
  };

  View.prototype.makeMove = function ($square) {
  };

  View.prototype.setupBoard = function () {
    var $grid = $("<ul class='grid group'></ul>");
    for ( var row = 0; row < 3; row++) {
      for ( var col = 0; col < 3; col++){
        var $square = $(("<li></li>"));
        $square.data("pos", [row, col]);
        $grid.append($square);
      }
    };

    this.container.append($grid);
  };
})();
