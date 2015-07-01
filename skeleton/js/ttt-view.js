(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$container = $el;
    this.setupBoard();
    this.bindEvents();
  };

  View.prototype.bindEvents = function () {
    var view = this;
    view.$container.on("click", "li", function(event){
      view.makeMove($(this));
    })
  };

  View.prototype.handleGameOver = function() {
    if (this.game.board.winner() === null) {
      alert("Tie");
    } else {
      this.game.swapTurn();
      alert("Congratulations, " + this.game.currentPlayer + " wins!");
    }
  }

  View.prototype.makeMove = function ($square) {
    if (this.game.board.isEmptyPos($square.data("pos"))){
      $square.addClass(this.game.currentPlayer);
      var pos = $square.data("pos");
      this.game.playMove(pos);
      if (this.game.isOver()) {
        this.handleGameOver();
      }
    } else {
      alert("Invalid Move!")
    }
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
    this.$container.append($grid);
  };
})();
