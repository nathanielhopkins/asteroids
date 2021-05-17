let Game = require("./game");
let GameView = require("./game_view");


document.addEventListener("DOMContentLoaded", function () {
  let canvasEl = document.getElementById("game-canvas");
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  let ctx = canvasEl.getContext('2d');
  let gv = new GameView(new Game(), ctx);
  gv.start();
});
