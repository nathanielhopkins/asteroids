function MovingObject(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
}

MovingObject.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
  ctx.fill();
}

MovingObject.prototype.move = function(timeDelta) {
  let delta = timeDelta || 1;
  this.pos[0] += (this.vel[0] * delta) / 20;
  this.pos[1] += (this.vel[1] * delta) / 20;
  if(this.game.isOutOfBounds(this.pos)) {
    if(this.isWrappable === true) {
      this.pos = this.game.wrap(this.pos);
    } else {
      this.game.remove(this);
    }
  }
}

MovingObject.prototype.isCollidedWith = function (otherObject) {
  let distance = Math.sqrt((this.pos[0] - otherObject.pos[0]) ** 2 + (this.pos[1] - otherObject.pos[1]) ** 2)
  let sumRad = this.radius + otherObject.radius;
  return distance < sumRad;
}

MovingObject.prototype.collideWith = function (otherObject) {
  // this is now empty; overwritten by Asteroid.prototype.collideWith
}

MovingObject.prototype.isWrappable = true;

module.exports = MovingObject;