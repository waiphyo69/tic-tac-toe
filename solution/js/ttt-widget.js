(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var Widget = TTT.Widget = function (game, $el) {
    this.game = game;
    this.$el = $el;
  };

  Widget.prototype.bindEvents = function () {
    var widget = this;

    // install a handler on the `li` elements inside the board.
    this.$el.on('click', 'div.cell', function (event) {
      var $square = $(event.currentTarget);
      widget.makeMove($square);
    });
  };

  Widget.prototype.makeMove = function ($square) {
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

  Widget.prototype.play = function () {
    this.setupBoard();
    this.bindEvents();
  };

  Widget.prototype.setupBoard = function () {
    for (var rowIdx = 0; rowIdx < 3; rowIdx++) {
      var $row = $('<div class="row"></div>');

      for (var colIdx = 0; colIdx < 3; colIdx++) {
        var $li = $('<div class="cell">');
        $li.data("pos", [rowIdx, colIdx]);

        $row.append($li);
      }

      this.$el.append($row);
    }
  };
})();
