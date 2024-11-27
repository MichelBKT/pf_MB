"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _utils = require("./utils.js");
require("./emailJS.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // Import utility functions from utils.js
// Calculate the viewport size
var winsize = (0, _utils.calcWinsize)();
// Add an event listener to re-calculate the viewport size when the window is resized
window.addEventListener('resize', function () {
  return winsize = (0, _utils.calcWinsize)();
});

// Initialize the cursor position to the center of the viewport
var cursor = {
  x: winsize.width / 2,
  y: winsize.height / 2
};
// Update the cursor position on mouse move
window.addEventListener('mousemove', function (ev) {
  return cursor = (0, _utils.getCursorPos)(ev);
});

// Export the InteractiveTilt class
var InteractiveTilt = exports["default"] = /*#__PURE__*/function () {
  /**
   * Constructor for the InteractiveTilt class.
   * @param {Element} DOM_el - The .content element to be animated
   * @param {Object} options - Custom options for the effect
   */
  function InteractiveTilt(DOM_el, options) {
    var _this = this;
    _classCallCheck(this, InteractiveTilt);
    // Object to hold references to DOM elements
    _defineProperty(this, "DOM", {
      el: null,
      // Main element (.content)
      wrapEl: null // Wrap element (.content__img-wrap)
    });
    // Default options for the InteractiveTilt effect
    _defineProperty(this, "defaults", {
      perspective: 800,
      // CSS perspective value for the 3D effect
      // Range of values for translation and rotation on x and y axes
      valuesFromTo: {
        x: [-35, 35],
        y: [-35, 35],
        rx: [-18, 18],
        // rotation on the X-axis
        ry: [-10, 10],
        // rotation on the Y-axis
        rz: [-4, 4] // rotation on the Z-axis
      },
      // Amount to interpolate values for smooth animation (higher value, less smoothing)
      amt: 0.1
    });
    // Object to store the current transform values for the image element
    _defineProperty(this, "imgTransforms", {
      x: 0,
      y: 0,
      rx: 0,
      ry: 0,
      rz: 0
    });
    // Assign DOM elements to the DOM object
    this.DOM.el = DOM_el;
    this.DOM.wrapEl = this.DOM.el.querySelector('.content__img-wrap');
    // Merge the default options with any user-provided options
    this.options = Object.assign(this.defaults, options);

    // If a perspective value is provided, apply it to the main element
    if (this.options.perspective) {
      this.DOM.el.style.perspective = "".concat(this.options.perspective, "px");
    }

    // Start the rendering loop for the animation
    requestAnimationFrame(function () {
      return _this.render();
    });
  }

  /**
   * Animation loop that applies the tilt effect based on the cursor position.
   */
  return _createClass(InteractiveTilt, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      // Interpolate the current transform values towards the target values
      // based on the cursor's position on the screen
      this.imgTransforms.x = (0, _utils.lerp)(this.imgTransforms.x, (0, _utils.map)(cursor.x, 0, winsize.width, this.options.valuesFromTo.x[0], this.options.valuesFromTo.x[1]), this.options.amt);
      this.imgTransforms.y = (0, _utils.lerp)(this.imgTransforms.y, (0, _utils.map)(cursor.y, 0, winsize.height, this.options.valuesFromTo.y[0], this.options.valuesFromTo.y[1]), this.options.amt);
      this.imgTransforms.rz = (0, _utils.lerp)(this.imgTransforms.rz, (0, _utils.map)(cursor.x, 0, winsize.width, this.options.valuesFromTo.rz[0], this.options.valuesFromTo.rz[1]), this.options.amt);

      // Apply rotation on the X and Y-axis only if perspective is enabled
      this.imgTransforms.rx = !this.options.perspective ? 0 : (0, _utils.lerp)(this.imgTransforms.rx, (0, _utils.map)(cursor.y, 0, winsize.height, this.options.valuesFromTo.rx[0], this.options.valuesFromTo.rx[1]), this.options.amt);
      this.imgTransforms.ry = !this.options.perspective ? 0 : (0, _utils.lerp)(this.imgTransforms.ry, (0, _utils.map)(cursor.x, 0, winsize.width, this.options.valuesFromTo.ry[0], this.options.valuesFromTo.ry[1]), this.options.amt);

      // Apply the calculated transform values to the wrap element to create the 3D tilt effect
      this.DOM.wrapEl.style.transform = "translateX(".concat(this.imgTransforms.x, "px) translateY(").concat(this.imgTransforms.y, "px) rotateX(").concat(this.imgTransforms.rx, "deg) rotateY(").concat(this.imgTransforms.ry, "deg) rotateZ(").concat(this.imgTransforms.rz, "deg)");

      // Continue the loop with the next animation frame
      requestAnimationFrame(function () {
        return _this2.render();
      });
    }
  }]);
}();
//# sourceMappingURL=interactive-tilt.js.map