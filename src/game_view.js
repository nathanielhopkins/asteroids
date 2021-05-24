let Game = require("./game");

function GameView (game, ctx) {
  this.game = game;
  this.ctx = ctx;
  this.lastTime = 0;
};

GameView.MOVES = {
  w: [0, -1],
  a: [-1, 0],
  s: [0, 1],
  d: [1, 0],
};

GameView.prototype.bindKeyHandlers = function bindKeyHandlers() {
  const ship = this.game.ship;

  Object.keys(GameView.MOVES).forEach(function (k) {
    const move = GameView.MOVES[k];
    key(k, function () { ship.power(move); });
  });

  key("space", function () { ship.fireBullet(); });
};

GameView.prototype.start = function () {
  this.bindKeyHandlers();
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.animate = function (time) {
  let delta = time - this.lastTime;
  this.game.step(delta);
  this.game.draw(this.ctx);
  this.lastTime = time;

  requestAnimationFrame(this.animate.bind(this));
}

module.exports = GameView;