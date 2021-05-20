const Util = require("./util");
const MovingObject = require("./moving_object");

let DEFAULTS = {
  COLOR: 'lightgreen',
  RADIUS: 5,
}

function Bullet (ship) {
  let options = {};
  options.pos = ship.pos;
  options.vel = ship.vel;
  options.radius = DEFAULTS.RADIUS;
  options.color = DEFAULTS.COLOR;
  options.game = ship.game;

  MovingObject.call(this, options);
}

Util.inherits(Bullet, MovingObject);

module.exports = Bullet;