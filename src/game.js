let Asteroid = require('./asteroid');


function Game () {
  this.asteroids = [];
  this.addAsteroids();
}

Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.NUM_ASTEROIDS = 4;
Game.BACKGROUND = 'black';

Game.prototype.addAsteroids = function () {
  for(let i = 0;i<Game.NUM_ASTEROIDS;i++) {
    this.asteroids.push(new Asteroid(this.randomPosition()));
  }
}

Game.prototype.randomPosition = function () {
  let pos = [];
  pos.push(Math.floor(Math.random() * Game.DIM_X));
  pos.push(Math.floor(Math.random() * Game.DIM_Y));
  return pos;
}

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0,0,Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = Game.BACKGROUND;
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.asteroids.forEach(asteroid => {
    asteroid.draw(ctx);
  })
}

Game.prototype.moveObjects = function () {
  this.asteroids.forEach(asteroid => {
    asteroid.move();
  })
}


module.exports = Game;