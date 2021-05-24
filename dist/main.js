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

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\nlet DEFAULTS = {\n  COLOR: 'gray',\n  RADIUS: 25,\n  SPEED: 4\n}\n\nfunction Asteroid(pos, game) {\n  let options = {};\n  options.pos = pos;\n  options.game = game;\n  options.vel = Util.randomVec(DEFAULTS.SPEED);\n  options.radius = DEFAULTS.RADIUS;\n  options.color = DEFAULTS.COLOR;\n\n  MovingObject.call(this, options)\n}\n\nUtil.inherits(Asteroid, MovingObject);\n\nAsteroid.prototype.collideWith = function (otherObject) {\n  if(otherObject instanceof Ship) {\n    otherObject.relocate();\n  }\n}\n\nmodule.exports = Asteroid;\n\n//# sourceURL=webpack:///./src/asteroid.js?");

/***/ }),

/***/ "./src/bullet.js":
/*!***********************!*\
  !*** ./src/bullet.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nlet DEFAULTS = {\n  COLOR: 'lightgreen',\n  RADIUS: 5,\n  SPEED: 10\n}\n\nfunction Bullet (ship) {\n  let options = {};\n  options.pos = JSON.parse(JSON.stringify(ship.pos));\n  options.vel = Util.scale(ship.vel, DEFAULTS.SPEED);\n  options.radius = DEFAULTS.RADIUS;\n  options.color = DEFAULTS.COLOR;\n  options.game = ship.game;\n\n  MovingObject.call(this, options);\n}\n\nUtil.inherits(Bullet, MovingObject);\n\nBullet.prototype.isWrappable = false;\n\nmodule.exports = Bullet;\n\n//# sourceURL=webpack:///./src/bullet.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("let Asteroid = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\");\nlet Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nlet Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\")\n\n\nfunction Game () {\n  this.ship = new Ship(this.randomPosition(), this);\n  this.asteroids = [];\n  this.bullets = [];\n  this.addAsteroids();\n}\n\nGame.DIM_X = 1000;\nGame.DIM_Y = 600;\nGame.NUM_ASTEROIDS = 4;\nGame.BACKGROUND = 'black';\n\nGame.prototype.allObjects = function () {\n  let objects = [];\n  objects.push(this.ship);\n  this.asteroids.forEach(asteroid => objects.push(asteroid));\n  this.bullets.forEach(bullet => objects.push(bullet));\n  return objects;\n}\n\n\nGame.prototype.addAsteroids = function () {\n  for(let i = 0;i<Game.NUM_ASTEROIDS;i++) {\n    this.asteroids.push(new Asteroid(this.randomPosition(), this));\n  }\n}\n\nGame.prototype.randomPosition = function () {\n  let pos = [];\n  pos.push(Math.floor(Math.random() * Game.DIM_X));\n  pos.push(Math.floor(Math.random() * Game.DIM_Y));\n  return pos;\n}\n\nGame.prototype.draw = function (ctx) {\n  ctx.clearRect(0,0,Game.DIM_X, Game.DIM_Y);\n  ctx.fillStyle = Game.BACKGROUND;\n  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);\n  \n  let objects = this.allObjects();\n  objects.forEach(object => {\n    object.draw(ctx);\n  })\n}\n\nGame.prototype.moveObjects = function () {\n  let objects = this.allObjects();\n  objects.forEach(object => {\n    object.move();\n  })\n}\n\nGame.prototype.wrap = function (pos) {\n  if(pos[0] < 0) {\n    pos[0] = Game.DIM_X;\n  } else if(pos[0] > Game.DIM_X) {\n    pos[0] = 0;\n  } \n\n  if(pos[1] < 0) {\n    pos[1] = Game.DIM_Y;\n  } else if(pos[1] > Game.DIM_Y) {\n    pos[1] = 0;\n  }\n  return pos;\n}\n\nGame.prototype.checkCollisions = function () {\n  let objects = this.allObjects();\n  for(let i=0;i<objects.length;i++) {\n    for(let j=0;j<objects.length;j++) {\n      var object1 = objects[i];\n      var object2 = objects[j];\n\n      if(i!=j && object1.isCollidedWith(object2)) {\n        // alert(\"COLLISION\");\n        let collision = object1.collideWith(object2);\n        if (collision) return;\n      }\n    }\n  }\n}\n\nGame.prototype.step = function () {\n  this.moveObjects();\n  this.checkCollisions();\n}\n\nGame.prototype.remove = function (object) {\n  if(object instanceof Asteroid){\n    let newAst = this.asteroids.filter(function(value,index,array){\n      return value != object;\n    });\n    this.asteroids = newAst;\n  } else if(object instanceof Bullet){\n    let newBul = this.bullets.filter(function (value, index, array) {\n      return value != object;\n    });\n    this.bullets = newBul;\n  }\n}\n\nGame.prototype.add = function (object) {\n  if(object instanceof Asteroid) {\n    this.asteroids.push(object);\n  } else if (object instanceof Bullet) {\n    this.bullets.push(object);\n  }\n}\n\nGame.prototype.isOutOfBounds = function (pos) {\n  let out = false;\n  if(pos[0] > DIM_X || pos[0] < 0) {\n    out = true;\n  } else if(pos[1] > DIM_Y || pos[1] < 0) {\n    out = true;\n  }\n  return out;\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("let Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\nfunction GameView (game, ctx) {\n  this.game = game;\n  this.ctx = ctx;\n};\n\nGameView.MOVES = {\n  w: [0, -1],\n  a: [-1, 0],\n  s: [0, 1],\n  d: [1, 0],\n};\n\nGameView.prototype.bindKeyHandlers = function bindKeyHandlers() {\n  const ship = this.game.ship;\n\n  Object.keys(GameView.MOVES).forEach(function (k) {\n    const move = GameView.MOVES[k];\n    key(k, function () { ship.power(move); });\n  });\n\n  key(\"space\", function () { ship.fireBullet(); });\n};\n\nGameView.prototype.start = function () {\n  this.bindKeyHandlers();\n  setInterval(() => {\n    this.game.step();\n    this.game.draw(this.ctx);\n  }, 20);\n};\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

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

eval("function MovingObject(options) {\n  this.pos = options.pos;\n  this.vel = options.vel;\n  this.radius = options.radius;\n  this.color = options.color;\n  this.game = options.game;\n}\n\nMovingObject.prototype.draw = function(ctx) {\n  ctx.fillStyle = this.color;\n  ctx.beginPath();\n  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);\n  ctx.fill();\n}\n\nMovingObject.prototype.move = function() {\n  this.pos[0] += this.vel[0];\n  this.pos[1] += this.vel[1];\n  this.pos = this.game.wrap(this.pos);\n}\n\nMovingObject.prototype.isCollidedWith = function (otherObject) {\n  let distance = Math.sqrt((this.pos[0] - otherObject.pos[0]) ** 2 + (this.pos[1] - otherObject.pos[1]) ** 2)\n  let sumRad = this.radius + otherObject.radius;\n  return distance < sumRad;\n}\n\nMovingObject.prototype.collideWith = function (otherObject) {\n  // this is now empty; overwritten by Asteroid.prototype.collideWith\n}\n\nMovingObject.prototype.isWrappable = true;\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Bullet = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\n\nlet DEFAULTS = {\n  COLOR: 'lightgreen',\n  RADIUS: 15,\n}\n\nfunction Ship(pos, game){\n  let options = {};\n  options.pos = pos;\n  options.game = game;\n  options.vel = [0,0];\n  options.radius = DEFAULTS.RADIUS;\n  options.color = DEFAULTS.COLOR;\n\n  MovingObject.call(this, options)\n}\n\nUtil.inherits(Ship, MovingObject);\n\nShip.prototype.relocate = function () {\n  this.pos = this.game.randomPosition();\n}\n\nShip.prototype.power = function (impulse) {\n  this.vel[0] += impulse[0];\n  this.vel[1] += impulse[1];\n}\n\nShip.prototype.fireBullet = function () {\n  if (!(this.vel[0] === 0 && this.vel[1] === 0)){\n    let bullet = new Bullet(this);\n    this.game.add(bullet);\n  }\n}\n\nmodule.exports = Ship;\n\n//# sourceURL=webpack:///./src/ship.js?");

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