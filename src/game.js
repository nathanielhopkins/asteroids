let Asteroid = require('./asteroid');
let Ship = require('./ship');
let Bullet = require('./bullet')


function Game () {
  this.ship = new Ship(this.randomPosition(), this);
  this.asteroids = [];
  this.bullets = [];
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
  this.bullets.forEach(bullet => objects.push(bullet));
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
  
  let objects = this.allObjects();
  objects.forEach(object => {
    object.draw(ctx);
  })
}

Game.prototype.moveObjects = function () {
  let objects = this.allObjects();
  objects.forEach(object => {
    object.move();
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
  let objects = this.allObjects();
  for(let i=0;i<objects.length;i++) {
    for(let j=0;j<objects.length;j++) {
      var object1 = objects[i];
      var object2 = objects[j];

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

Game.prototype.remove = function (object) {
  if(object instanceof Asteroid){
    let newAst = this.asteroids.filter(function(value,index,array){
      return value != object;
    });
    this.asteroids = newAst;
  } else if(object instanceof Bullet){
    let newBul = this.bullets.filter(function (value, index, array) {
      return value != object;
    });
    this.bullets = newBul;
  }
}

Game.prototype.add = function (object) {
  if(object instanceof Asteroid) {
    this.asteroids.push(object);
  } else if (object instanceof Bullet) {
    this.bullets.push(object);
  }
}

Game.prototype.isOutOfBounds = function (pos) {
  let out = false;
  if(pos[0] > Game.DIM_X || pos[0] < 0) {
    out = true;
  } else if(pos[1] > Game.DIM_Y || pos[1] < 0) {
    out = true;
  }
  return out;
}

module.exports = Game;