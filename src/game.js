let Asteroid = require('./asteroid');

CONSTANTS = {
  DIM_X: 1000,
  DIM_Y: 600,
  NUM_ASTEROIDS: 4
}

function Game () {
  this.dim_x = CONSTANTS.DIM_X;
  this.dim_y = CONSTANTS.DIM_Y;
  this.num_asteroids = CONSTANTS.NUM_ASTEROIDS;
  this.addAsteroids();
}

Game.prototype.addAsteroids = function () {
  this.asteroids = []
  for(let i = 0;i<this.num_asteroids;i++) {
    this.asteroids.push(new Asteroid(this.randomPosition()));
  }
}

Game.prototype.randomPosition = function () {
  let pos = [];
  pos.push(Math.floor(Math.random() * this.dim_x));
  pos.push(Math.floor(Math.random() * this.dim_y));
  return pos;
}

Game.prototype.draw = function (ctx) {
  ctx.clearRect();
  this.asteroids.forEach(asteroid => {
    asteroid.draw(ctx);
  })
}


module.exports = Game;