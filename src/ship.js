const Util = require("./util");
const MovingObject = require("./moving_object");

let DEFAULTS = {
  COLOR: 'lightgreen',
  RADIUS: 15,
}

function Ship(pos, game){
  let options = {};
  options.pos = pos;
  options.game = game;
  options.vel = 0;
  options.radius = DEFAULTS.RADIUS;
  options.color = DEFAULTS.COLOR;

  MovingObject.call(this, options)
}

Util.inherits(Ship, MovingObject);

module.exports = Ship;