(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$el = $el;

    this.setupBoard();
    this.bindEvents();
  };

  View.prototype.bindEvents = function () {
    // install a handler on the `li` elements inside the board.
    this.$el.on('click', 'div.cell', (function (event) {
      var $square = $(event.currentTarget);
      this.makeMove($square);
    }).bind(this));
  };

  View.prototype.makeMove = function ($square) {
    var pos = $square.data("pos");
    var currentPlayer = this.game.currentPlayer;

    try {
      this.game.playMove(pos);
    } catch (e) {
      alert('Invalid move! Try again.');
      return;
    }

    $square.addClass("player-" + currentPlayer);

    if (this.game.isOver()) {
      // cleanup click handlers.
      this.$el.off('click');

      var winner = this.game.winner();
      if (winner) {
        this.$el.addClass('winner-' + winner);
      } else {
        this.$el.addClass('draw');
      }
    }
  };

  View.prototype.setupBoard = function () {
    for (var rowIdx = 0; rowIdx < 3; rowIdx++) {
      var $row = $('<div class="row"></div>');

      for (var colIdx = 0; colIdx < 3; colIdx++) {
        var $li = $('<div class="cell">');
        $li.data("pos", [rowIdx, colIdx]);

        $row.append($li);
      }

      this.$el.find(".board").append($row);
    }
  };
})();
