const Util = require("./util");
const MovingObject = require("./moving_object");

let DEFAULTS = {
  COLOR: 'gray',
  RADIUS: 25,
  SPEED: 4
}

function Asteroid(pos) {
  let options = {};
  options.pos = pos;
  options.vel = Util.randomVec(DEFAULTS.SPEED);
  options.radius = DEFAULTS.RADIUS;
  options.color = DEFAULTS.COLOR;

  MovingObject.call(this, options)
}

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;