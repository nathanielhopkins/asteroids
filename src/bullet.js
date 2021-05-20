const Util = require("./util");
const MovingObject = require("./moving_object");

let DEFAULTS = {
  COLOR: 'lightgreen',
  RADIUS: 5,
  SPEED: 10
}

function Bullet (ship) {
  let options = {};
  options.pos = JSON.parse(JSON.stringify(ship.pos));
  options.vel = Util.scale(ship.vel, DEFAULTS.SPEED);
  options.radius = DEFAULTS.RADIUS;
  options.color = DEFAULTS.COLOR;
  options.game = ship.game;

  MovingObject.call(this, options);
}

Util.inherits(Bullet, MovingObject);

module.exports = Bullet;