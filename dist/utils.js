"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.year = exports.preloadImages = exports.map = exports.lerp = exports.getCursorPos = exports.calcWinsize = void 0;
var _imagesloadedPkgd = _interopRequireDefault(require("imagesloaded/imagesloaded.pkgd.min"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * Preloads images specified by the CSS selector.
 * @function
 * @param {string} [selector='img'] - CSS selector for target images.
 * @returns {Promise} - Resolves when all specified images are loaded.
 */

var preloadImages = exports.preloadImages = function preloadImages() {
  var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'img';
  return new Promise(function (resolve) {
    // The imagesLoaded library is used to ensure all images (including backgrounds) are fully loaded.
    (0, _imagesloadedPkgd["default"])(document.querySelectorAll(selector), {
      background: true
    }, resolve);
  });
};

/**
 * Linear interpolation
 * @param {Number} a - first value to interpolate
 * @param {Number} b - second value to interpolate
 * @param {Number} n - amount to interpolate
 */
var lerp = exports.lerp = function lerp(a, b, n) {
  return (1 - n) * a + n * b;
};

/**
 * Gets the cursor position
 * @param {Event} ev - mousemove event
 */
var getCursorPos = exports.getCursorPos = function getCursorPos(ev) {
  return {
    x: ev.clientX,
    y: ev.clientY
  };
};

/**
 * Map number x from range [a, b] to [c, d]
 */
var map = exports.map = function map(x, a, b, c, d) {
  return (x - a) * (d - c) / (b - a) + c;
};

/**
 * Calculates the viewport size
 */
var calcWinsize = exports.calcWinsize = function calcWinsize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
};
var year = exports.year = function year() {
  var date = new Date();
  document.querySelector(".current_year").textContent = date.getFullYear();
};

// Exporting utility functions for use in other modules.
//# sourceMappingURL=utils.js.map