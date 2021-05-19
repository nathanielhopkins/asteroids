const Util = require("./util");
const MovingObject = require("./moving_object");
const Ship = require("./ship");

let DEFAULTS = {
  COLOR: 'gray',
  RADIUS: 25,
  SPEED: 4
}

function Asteroid(pos, game) {
  let options = {};
  options.pos = pos;
  options.game = game;
  options.vel = Util.randomVec(DEFAULTS.SPEED);
  options.radius = DEFAULTS.RADIUS;
  options.color = DEFAULTS.COLOR;

  MovingObject.call(this, options)
}

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function (otherObject) {
  if(otherObject instanceof Ship) {
    otherObject.relocate();
  }
}

module.exports = Asteroid;