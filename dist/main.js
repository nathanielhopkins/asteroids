/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nlet DEFAULTS = {\n  COLOR: 'gray',\n  RADIUS: 25,\n  SPEED: 4\n}\n\nfunction Asteroid(pos, game) {\n  let options = {};\n  options.pos = pos;\n  options.game = game;\n  options.vel = Util.randomVec(DEFAULTS.SPEED);\n  options.radius = DEFAULTS.RADIUS;\n  options.color = DEFAULTS.COLOR;\n\n  MovingObject.call(this, options)\n}\n\nUtil.inherits(Asteroid, MovingObject);\n\nmodule.exports = Asteroid;\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("let Asteroid = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\");\nlet Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\n\nfunction Game () {\n  this.ship = new Ship(this.randomPosition(), this);\n  this.asteroids = [];\n  this.addAsteroids();\n}\n\nGame.DIM_X = 1000;\nGame.DIM_Y = 600;\nGame.NUM_ASTEROIDS = 4;\nGame.BACKGROUND = 'black';\n\nGame.prototype.allObjects = function () {\n  let objects = [];\n  objects.push(this.ship);\n  this.asteroids.forEach(asteroid => objects.push(asteroid));\n  return objects;\n}\n\n\nGame.prototype.addAsteroids = function () {\n  for(let i = 0;i<Game.NUM_ASTEROIDS;i++) {\n    this.asteroids.push(new Asteroid(this.randomPosition(), this));\n  }\n}\n\nGame.prototype.randomPosition = function () {\n  let pos = [];\n  pos.push(Math.floor(Math.random() * Game.DIM_X));\n  pos.push(Math.floor(Math.random() * Game.DIM_Y));\n  return pos;\n}\n\nGame.prototype.draw = function (ctx) {\n  ctx.clearRect(0,0,Game.DIM_X, Game.DIM_Y);\n  ctx.fillStyle = Game.BACKGROUND;\n  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);\n  \n  let objects = this.allObjects();\n  objects.forEach(object => {\n    object.draw(ctx);\n  })\n}\n\nGame.prototype.moveObjects = function () {\n  let objects = this.allObjects();\n  objects.forEach(object => {\n    object.move();\n  })\n}\n\nGame.prototype.wrap = function (pos) {\n  if(pos[0] < 0) {\n    pos[0] = Game.DIM_X;\n  } else if(pos[0] > Game.DIM_X) {\n    pos[0] = 0;\n  } \n\n  if(pos[1] < 0) {\n    pos[1] = Game.DIM_Y;\n  } else if(pos[1] > Game.DIM_Y) {\n    pos[1] = 0;\n  }\n  return pos;\n}\n\nGame.prototype.checkCollisions = function () {\n  for(let i=0;i<this.asteroids.length;i++) {\n    for(let j=0;j<this.asteroids.length;j++) {\n      var object1 = this.asteroids[i];\n      var object2 = this.asteroids[j];\n\n      if(i!=j && object1.isCollidedWith(object2)) {\n        // alert(\"COLLISION\");\n        let collision = object1.collideWith(object2);\n        if (collision) return;\n      }\n    }\n  }\n}\n\nGame.prototype.step = function () {\n  this.moveObjects();\n  this.checkCollisions();\n}\n\nGame.prototype.remove = function (asteroid) {\n  let newArr = this.asteroids.filter(function(value,index,array){\n    return value != asteroid;\n  });\n  this.asteroids = newArr;\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("let Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\nfunction GameView (game, ctx) {\n  this.game = game;\n  this.ctx = ctx;\n};\n\nGameView.prototype.start = function () {\n  setInterval(() => {\n    this.game.step();\n    this.game.draw(this.ctx);\n  }, 20);\n};\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("let Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nlet GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  let canvasEl = document.getElementById(\"game-canvas\");\n  canvasEl.width = Game.DIM_X;\n  canvasEl.height = Game.DIM_Y;\n\n  let ctx = canvasEl.getContext('2d');\n  let gv = new GameView(new Game(), ctx);\n  gv.start();\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/***/ ((module) => {

eval("function MovingObject(options) {\n  this.pos = options.pos;\n  this.vel = options.vel;\n  this.radius = options.radius;\n  this.color = options.color;\n  this.game = options.game;\n}\n\nMovingObject.prototype.draw = function(ctx) {\n  ctx.fillStyle = this.color;\n  ctx.beginPath();\n  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);\n  ctx.fill();\n}\n\nMovingObject.prototype.move = function() {\n  this.pos[0] = this.pos[0] + this.vel[0];\n  this.pos[1] = this.pos[1] + this.vel[1];\n  this.pos = this.game.wrap(this.pos);\n}\n\nMovingObject.prototype.isCollidedWith = function (otherObject) {\n  let distance = Math.sqrt((this.pos[0] - otherObject.pos[0]) ** 2 + (this.pos[1] - otherObject.pos[1]) ** 2)\n  let sumRad = this.radius + otherObject.radius;\n  return distance < sumRad;\n}\n\nMovingObject.prototype.collideWith = function (otherObject) {\n  this.game.remove(otherObject);\n  this.game.remove(this);\n}\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nlet DEFAULTS = {\n  COLOR: 'lightgreen',\n  RADIUS: 15,\n}\n\nfunction Ship(pos, game){\n  let options = {};\n  options.pos = pos;\n  options.game = game;\n  options.vel = [0,0];\n  options.radius = DEFAULTS.RADIUS;\n  options.color = DEFAULTS.COLOR;\n\n  MovingObject.call(this, options)\n}\n\nUtil.inherits(Ship, MovingObject);\n\nmodule.exports = Ship;\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((module) => {

eval("const Util = {\n  inherits(childClass, parentClass) {\n    childClass.prototype = Object.create(parentClass.prototype)\n    childClass.prototype.constructor = childClass;\n  },\n\n  randomVec(length) {\n    const deg = 2 * Math.PI * Math.random();\n    return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n  },\n\n  scale(vec, m) {\n    return [vec[0] * m, vec[1] * m];\n  }\n}\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;