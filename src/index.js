let MovingObject = require("./moving_object");
let Asteroid = require("./asteroid");
let Util = require("./util")
window.Asteroid = Asteroid;
window.MovingObject = MovingObject;

document.addEventListener("DOMContentLoaded", function () {
  let canvasEl = document.getElementById("game-canvas");
  let ctx = canvasEl.getContext('2d');
});
