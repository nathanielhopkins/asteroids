const Util = require("./util");
const MovingObject = require("./moving_object");
const Bullet = require("./bullet");

let DEFAULTS = {
  COLOR: 'lightgreen',
  RADIUS: 15,
}

function Ship(pos, game){
  let options = {};
  options.pos = pos;
  options.game = game;
  options.vel = [0,0];
  options.radius = DEFAULTS.RADIUS;
  options.color = DEFAULTS.COLOR;

  MovingObject.call(this, options)
}

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function () {
  this.pos = this.game.randomPosition();
}

Ship.prototype.power = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
}

Ship.prototype.fireBullet = function () {
  let bullet = new Bullet(this);
  this.game.add(bullet);
}

module.exports = Ship;