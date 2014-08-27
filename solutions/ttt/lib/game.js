var Board = require("./board");
var MoveError = require("./moveError");

function Game (reader) {
  this.board = new Board();
  this.currentPlayer = Board.marks[0];

  this.reader = reader;
}

Game.prototype.isOver = function () {
  return this.board.isOver();
};

Game.prototype.playMove = function (pos) {
  this.board.placeMark(pos, this.currentPlayer);
  this.swapTurn();
};

Game.prototype.promptMove = function (callback) {
  var game = this;

  this.board.print();
  console.log("Current Turn: " + this.currentPlayer)

  this.reader.question("Enter rowIdx: ", function (rowIdxStr) {
    var rowIdx = parseInt(rowIdxStr);
    game.reader.question("Enter colIdx: ", function (colIdxStr) {
      var colIdx = parseInt(colIdxStr);
      callback([rowIdx, colIdx]);
    });
  });
};

Game.prototype.run = function (gameCompletionCallback) {
  var game = this;
  this.promptMove(function (move) {
    try {
      game.playMove(move);
    } catch (e) {
      if (e instanceof MoveError) {
        console.log(e.msg);
      } else {
        throw e;
      }
    }

    if (game.isOver()) {
      game.board.print();
      if (game.winner()) {
        console.log(game.winner() + " has won!");
      } else {
        console.log("NO ONE WINS!");
      }
      gameCompletionCallback();
    } else {
      // continue loop
      game.run(gameCompletionCallback);
    }
  });
};

Game.prototype.swapTurn = function () {
  if (this.currentPlayer === Board.marks[0]) {
    this.currentPlayer = Board.marks[1];
  } else {
    this.currentPlayer = Board.marks[0];
  }
};

Game.prototype.winner = function () {
  return this.board.winner();
};

module.exports = Game;
