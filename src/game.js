let Asteroid = require('./asteroid');
let Ship = require('./ship');


function Game () {
  this.ship = new Ship(this.randomPosition(), this);
  this.asteroids = [];
  this.addAsteroids();
}

Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.NUM_ASTEROIDS = 4;
Game.BACKGROUND = 'black';

Game.prototype.allObjects = function () {
  let objects = [];
  objects.push(this.ship);
  this.asteroids.forEach(asteroid => objects.push(asteroid));
  return objects;
}


Game.prototype.addAsteroids = function () {
  for(let i = 0;i<Game.NUM_ASTEROIDS;i++) {
    this.asteroids.push(new Asteroid(this.randomPosition(), this));
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

Game.prototype.wrap = function (pos) {
  if(pos[0] < 0) {
    pos[0] = Game.DIM_X;
  } else if(pos[0] > Game.DIM_X) {
    pos[0] = 0;
  } 

  if(pos[1] < 0) {
    pos[1] = Game.DIM_Y;
  } else if(pos[1] > Game.DIM_Y) {
    pos[1] = 0;
  }
  return pos;
}

Game.prototype.checkCollisions = function () {
  for(let i=0;i<this.asteroids.length;i++) {
    for(let j=0;j<this.asteroids.length;j++) {
      var object1 = this.asteroids[i];
      var object2 = this.asteroids[j];

      if(i!=j && object1.isCollidedWith(object2)) {
        // alert("COLLISION");
        let collision = object1.collideWith(object2);
        if (collision) return;
      }
    }
  }
}

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
}

Game.prototype.remove = function (asteroid) {
  let newArr = this.asteroids.filter(function(value,index,array){
    return value != asteroid;
  });
  this.asteroids = newArr;
}

module.exports = Game;