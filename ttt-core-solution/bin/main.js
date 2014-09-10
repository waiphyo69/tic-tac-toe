#!/usr/bin/env node

var readline = require('readline');
var TTT = require("../src");

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var game = new TTT.Game(reader);
game.run(function () {
  reader.close();
});
