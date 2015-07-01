(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.container = $el;
    this.setupBoard();
    this.bindEvents();
  };

  View.prototype.bindEvents = function () {
    var view = this;
    $(function(){
      view.container.on("click", "li", function(event){
        var pos = $(this).data("pos");
        view.makeMove($(this));
        view.game.playMove(pos);
      })
    })
  };

  View.prototype.makeMove = function ($square) {
    if (this.game.board.isEmptyPos($square.data("pos"))){
      $square.find("span").text(this.game.currentPlayer);
    } else {
      alert("Invalid Move!")
    }
  };

  View.prototype.setupBoard = function () {
    var $grid = $("<ul class='grid group'></ul>");
    for ( var row = 0; row < 3; row++) {
      for ( var col = 0; col < 3; col++){
        var $square = $(("<li><span></span></li>"));
        $square.data("pos", [row, col]);
        $grid.append($square);
      }
    };
    this.container.append($grid);
  };
})();
