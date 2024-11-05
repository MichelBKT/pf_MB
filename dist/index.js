"use strict";

var _utils = require("./utils.js");
var _interactiveTilt = _interopRequireDefault(require("./interactive-tilt.js"));
require("../stylesheets/style.css");
var _splittingLite = _interopRequireDefault(require("splitting/dist/splitting-lite.js"));
var _lenis = _interopRequireDefault(require("lenis"));
var _gsap = _interopRequireDefault(require("gsap"));
var _ScrollTrigger = require("gsap/ScrollTrigger");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
_gsap["default"].registerPlugin(_ScrollTrigger.ScrollTrigger);

// Define a variable to store the Lenis smooth scrolling object
var lenis;

// Initializes Lenis for smooth scrolling with specific properties
var initSmoothScrolling = function initSmoothScrolling() {
  // Instantiate the Lenis object with specified properties
  lenis = new _lenis["default"]({
    lerp: 0.1,
    // Lower values create a smoother scroll effect
    smoothWheel: true // Enables smooth scrolling for mouse wheel events
  });

  // Update ScrollTrigger each time the user scrolls
  lenis.on('scroll', function () {
    return _ScrollTrigger.ScrollTrigger.update();
  });

  // Define a function to run at each animation frame
  var _scrollFn = function scrollFn(time) {
    lenis.raf(time); // Run Lenis' requestAnimationFrame method
    requestAnimationFrame(_scrollFn); // Recursively call scrollFn on each frame
  };
  // Start the animation frame loop
  requestAnimationFrame(_scrollFn);
};

// Sets up default animation settings and merges with options
var setupAnimationDefaults = function setupAnimationDefaults(itemElement, options) {
  // Default settings for clip paths and scroll trigger
  var defaults = {
    clipPaths: {
      step1: {
        initial: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        "final": 'polygon(50% 0%, 50% 50%, 50% 50%, 50% 100%)'
      },
      step2: {
        initial: 'polygon(50% 50%, 50% 0%, 50% 100%, 50% 50%)',
        "final": 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
      }
    },
    // Default scroll trigger settings
    scrollTrigger: {
      trigger: itemElement,
      start: 'top 50%',
      end: '+=50%',
      scrub: true
    },
    // Default perspective setting
    perspective: false
  };

  // Merge defaults with options provided
  if (options && options.scrollTrigger) {
    defaults.scrollTrigger = _objectSpread(_objectSpread({}, defaults.scrollTrigger), options.scrollTrigger);
  }

  // Merge and return the complete settings
  return _objectSpread(_objectSpread(_objectSpread({}, defaults), options), {}, {
    scrollTrigger: defaults.scrollTrigger
  });
};

// Prepares text within an element for animation by splitting it into characters and setting their initial opacity.
var prepareTextForAnimation = function prepareTextForAnimation(itemElement) {
  // Query for the span elements within the itemElement
  var textSpans = itemElement.querySelectorAll('.content__text > span');

  // Perform the splitting operation
  (0, _splittingLite["default"])({
    target: textSpans
  });

  // Initialize an array to hold arrays of characters for each span
  var charsArray = Array.from(textSpans).map(function (span) {
    // Query for chars inside this span and return them as an array
    return Array.from(span.querySelectorAll('.char'));
  });

  // Set the opacity of all characters to 0 using GSAP
  charsArray.forEach(function (charArray) {
    _gsap["default"].set(charArray, {
      opacity: 0
    });
  });

  // Return the charsArray
  return charsArray;
};

// Animation profiles for each item

// First animation effect
var fx1 = function fx1(itemElement, options) {
  // Set up the animation settings
  var settings = setupAnimationDefaults(itemElement, options);
  // Select the elements to animate
  var imageElement = itemElement.querySelector('.content__img');
  var innerElements = imageElement.querySelectorAll('.content__img-inner'); // Now it selects both inners
  // Prepare the text for animation and retrieve the character arrays
  var charsArray = prepareTextForAnimation(itemElement);

  // Define and return the GSAP timeline for the animation
  var tl = _gsap["default"].timeline({
    // Default easing for all animations in this timeline
    defaults: {
      ease: 'none'
    },
    // Event hook for when the timeline starts
    onStart: function onStart() {
      // Apply perspective if specified
      if (settings.perspective) {
        _gsap["default"].set(imageElement, {
          perspective: settings.perspective
        });
      }
    },
    // ScrollTrigger configuration for this timeline
    scrollTrigger: settings.scrollTrigger
  })
  // The sequence of animation steps
  .fromTo(imageElement, {
    // Initial state for the animation
    filter: 'brightness(100%)',
    'clip-path': settings.clipPaths.step1.initial
  }, {
    ease: 'sine.in',
    // Final state for the animation
    filter: 'brightness(800%)',
    'clip-path': settings.clipPaths.step1["final"]
  }, 0).to(innerElements[0], {
    ease: 'sine.in',
    // Rotation and scale effect for the inner element
    rotationY: -40,
    scale: 1.4
  }, 0)
  // Switch image
  .add(function () {
    // Toggle the visibility of the inner elements
    innerElements[0].classList.toggle('content__img-inner--hidden');
    innerElements[1].classList.toggle('content__img-inner--hidden');
  }).to(imageElement, {
    // Start state for the next animation step
    startAt: {
      'clip-path': settings.clipPaths.step2.initial
    },
    // Final state for the next animation step
    'clip-path': settings.clipPaths.step2["final"],
    filter: 'brightness(100%)'
  }).to(innerElements[1], {
    // Start state for rotation and scale reset
    startAt: {
      rotationY: 40,
      scale: 1.4
    },
    // Reset rotation and scale to original
    rotationY: 0,
    scale: 1
  }, '<') // '<' indicates that this step starts at the same time as the previous one
  .addLabel('texts', '<-=0.3');
  charsArray.forEach(function (charArray, index) {
    var staggerDirection = index % 2 === 0 ? 1 : -1; // Alternate stagger direction

    tl.to(charArray, {
      startAt: {
        opacity: 1,
        scale: .2
      },
      opacity: 1,
      scale: 1,
      yPercent: -staggerDirection * 40,
      stagger: staggerDirection * 0.04
    }, 'texts');
  });
  return tl;
};
var fx2 = function fx2(itemElement, options) {
  // Set up the animation settings
  var settings = setupAnimationDefaults(itemElement, options);
  // Select the elements to animate
  var imageElement = itemElement.querySelector('.content__img');
  var innerElements = imageElement.querySelectorAll('.content__img-inner'); // Now it selects both inners
  var charsArray = prepareTextForAnimation(itemElement);
  var tl = _gsap["default"].timeline({
    defaults: {
      ease: 'none'
    },
    onStart: function onStart() {
      if (settings.perspective) {
        _gsap["default"].set([imageElement, itemElement], {
          perspective: settings.perspective
        });
      }
    },
    scrollTrigger: settings.scrollTrigger
  }).fromTo(imageElement, {
    filter: 'brightness(100%) hue-rotate(0deg)',
    'clip-path': settings.clipPaths.step1.initial
  }, {
    filter: 'brightness(800%) hue-rotate(90deg)',
    'clip-path': settings.clipPaths.step1["final"]
  }, 0).to(innerElements[0], {
    rotationZ: -5,
    scaleX: 1.8
  }, 0)
  // Switch image
  .add(function () {
    // Toggle the visibility of the inner elements
    innerElements[0].classList.toggle('content__img-inner--hidden');
    innerElements[1].classList.toggle('content__img-inner--hidden');
  }).to(imageElement, {
    startAt: {
      'clip-path': settings.clipPaths.step2.initial
    },
    'clip-path': settings.clipPaths.step2["final"],
    filter: 'brightness(100%) hue-rotate(0deg)'
  }).to(innerElements[1], {
    startAt: {
      rotationZ: 5,
      scaleX: 1.8
    },
    rotationZ: 0,
    scaleX: 1
  }, '<').addLabel('texts', '<-=0.3');
  charsArray.forEach(function (charArray, index) {
    charArray.sort(function () {
      return Math.random() - 0.5;
    });
    var staggerDirection = index % 2 === 0 ? 1 : -1; // Alternate stagger direction

    tl.to(charArray, {
      duration: 0.1,
      opacity: 1,
      stagger: staggerDirection * 0.04
    }, 'texts');
  });
  return tl;
};
var fx3 = function fx3(itemElement, options) {
  // Set up the animation settings
  var settings = setupAnimationDefaults(itemElement, options);
  // Select the elements to animate
  var imageElement = itemElement.querySelector('.content__img');
  var innerElements = imageElement.querySelectorAll('.content__img-inner'); // Now it selects both inners
  var text = itemElement.querySelector('.content__text');
  return _gsap["default"].timeline({
    defaults: {
      ease: 'none'
    },
    onStart: function onStart() {
      if (settings.perspective) {
        _gsap["default"].set([imageElement, itemElement], {
          perspective: settings.perspective
        });
      }
    },
    scrollTrigger: settings.scrollTrigger
  }).fromTo(imageElement, {
    scaleX: 1.5,
    scaleY: 0.8,
    left: 100,
    filter: 'brightness(100%) contrast(100%)',
    'clip-path': settings.clipPaths.step1.initial
  }, {
    left: 0,
    ease: 'sine',
    rotationX: -35,
    rotationY: 35,
    filter: 'brightness(60%) contrast(400%)',
    scale: 1.4,
    'clip-path': settings.clipPaths.step1["final"]
  }, 0).to(innerElements[0], {
    ease: 'sine',
    skewY: 10,
    scaleY: 1.2
  }, 0)

  // Switch image
  .add(function () {
    // Toggle the visibility of the inner elements
    innerElements[0].classList.toggle('content__img-inner--hidden');
    innerElements[1].classList.toggle('content__img-inner--hidden');
  }, '>').to(imageElement, {
    ease: 'sine.in',
    startAt: {
      'clip-path': settings.clipPaths.step2.initial
    },
    'clip-path': settings.clipPaths.step2["final"],
    filter: 'brightness(100%) contrast(100%)',
    scale: 1,
    rotationX: 0,
    rotationY: 0
  }, '<').to(innerElements[1], {
    ease: 'sine.in',
    startAt: {
      skewY: 10,
      scaleY: 1.5
    },
    skewY: 0,
    scaleY: 0.8
  }, '<').fromTo(text, {
    opacity: 0,
    yPercent: 40
  }, {
    opacity: 5,
    yPercent: 0
  }, '>').to(imageElement, {
    ease: 'sine',
    startAt: {
      filter: 'brightness(100%) contrast(100%) opacity(100%)'
    },
    filter: 'brightness(60%) contrast(400%) opacity(20%)',
    rotationX: 25,
    rotationY: 1.5,
    scale: 1.2
  }, '<');
};
var fx4 = function fx4(itemElement, options) {
  // Set up the animation settings
  var settings = setupAnimationDefaults(itemElement, options);
  // Select the elements to animate
  var imageElement = itemElement.querySelector('.content__img');
  var innerElements = imageElement.querySelectorAll('.content__img-inner'); // Now it selects both inners
  // Prepare the text for animation and retrieve the character arrays
  var charsArray = prepareTextForAnimation(itemElement);
  var tl = _gsap["default"].timeline({
    defaults: {
      ease: 'power1.inOut'
    },
    onStart: function onStart() {
      if (settings.perspective) {
        _gsap["default"].set([imageElement, itemElement], {
          perspective: settings.perspective
        });
      }
    },
    scrollTrigger: settings.scrollTrigger
  }).fromTo(imageElement, {
    filter: 'brightness(100%) grayscale(0%)',
    'clip-path': settings.clipPaths.step1.initial
  }, {
    rotationZ: 90,
    scale: 0.6,
    filter: 'brightness(800%) grayscale(100%)',
    'clip-path': settings.clipPaths.step1["final"]
  }, 0).to(innerElements[0], {
    rotationZ: -5,
    scaleX: 1.4
  }, 0)
  // Switch image
  .add(function () {
    // Toggle the visibility of the inner elements
    innerElements[0].classList.toggle('content__img-inner--hidden');
    innerElements[1].classList.toggle('content__img-inner--hidden');
  }).to(imageElement, {
    startAt: {
      'clip-path': settings.clipPaths.step1["final"],
      rotationZ: -90
    },
    'clip-path': settings.clipPaths.step2["final"],
    filter: 'brightness(100%) grayscale(0%)',
    rotationZ: 0,
    scale: 1
  }).to(innerElements[1], {
    startAt: {
      rotationZ: -350,
      scaleX: 1.4
    },
    rotationZ: -360,
    scaleX: 1
  }, '<').addLabel('texts', '<-=0.3');
  charsArray.forEach(function (charArray, index) {
    var staggerDirection = index % 2 === 0 ? 1 : -1; // Alternate stagger direction

    tl.to(charArray, {
      startAt: {
        opacity: 1,
        scale: .2
      },
      opacity: 1,
      scale: 1,
      yPercent: staggerDirection * 400,
      stagger: staggerDirection * 0.02
    }, 'texts');
  });
  return tl;
};

// First animation effect
var fxIntro = function fxIntro(itemElement, options) {
  // Set up the animation settings
  var settings = setupAnimationDefaults(itemElement, options);
  // Select the elements to animate
  var imageElement = itemElement.querySelector('.content__img');
  var inner = imageElement.querySelector('.content__img-inner');

  // Define and return the GSAP timeline for the animation
  return _gsap["default"].timeline({
    // Default easing for all animations in this timeline
    defaults: {
      ease: 'none'
    },
    // Event hook for when the timeline starts
    onStart: function onStart() {
      // Apply perspective if specified
      if (settings.perspective) {
        _gsap["default"].set(imageElement, {
          perspective: settings.perspective
        });
      }
    },
    // ScrollTrigger configuration for this timeline
    scrollTrigger: settings.scrollTrigger
  })
  // The sequence of animation steps
  .fromTo(imageElement, {
    scale: 1,
    xPercent: 0,
    filter: 'brightness(100%)',
    'clip-path': settings.clipPaths.step1.initial
  }, {
    scale: 0.5,
    xPercent: -50,
    'clip-path': settings.clipPaths.step1["final"],
    filter: 'brightness(500%)'
  }, 0).to(inner, {
    rotationY: -40,
    scale: 1.4
  }, 0).to(imageElement, {
    startAt: {
      'clip-path': settings.clipPaths.step2.initial
    },
    scale: 0,
    xPercent: -100,
    'clip-path': settings.clipPaths.step2["final"],
    filter: 'brightness(100%)'
  }).to(inner, {
    startAt: {
      rotationY: 40
    },
    rotationY: 0,
    scale: 1
  }, '<');
};

// Main function to apply scroll-triggered animations
var scroll = function scroll() {
  // Define items and associate them with their animation profiles and options
  var items = [{
    id: '#item-1',
    animationProfile: fx1,
    interactiveTilt: true,
    // This item should have the InteractiveTilt effect
    options: {
      perspective: 1000
    }
  }, {
    id: '#item-2',
    animationProfile: fx2,
    interactiveTilt: true,
    // This item should have the InteractiveTilt effect
    options: {
      clipPaths: {
        step1: {
          initial: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          "final": 'polygon(40% 50%, 60% 50%, 80% 50%, 20% 50%)'
        },
        step2: {
          initial: 'polygon(20% 50%, 80% 50%, 60% 50%, 40% 50%)',
          "final": 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
        }
      },
      scrollTrigger: {
        start: 'center bottom',
        end: 'top top'
      },
      perspective: 500
    }
  }, {
    id: '#item-3',
    animationProfile: fx3,
    options: {
      clipPaths: {
        step1: {
          initial: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          "final": 'polygon(50% 0%, 50% 50%, 50% 50%, 50% 100%)'
        },
        step2: {
          initial: 'polygon(50% 50%, 50% 0%, 50% 100%, 50% 50%)',
          "final": 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
        }
      },
      scrollTrigger: {
        start: 'center center',
        end: '+=150%',
        pin: true
      },
      perspective: 400
    }
  }, {
    id: '#item-4',
    animationProfile: fx4,
    // This item should have the InteractiveTilt effect
    options: {
      clipPaths: {
        step1: {
          initial: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          "final": 'polygon(40% 50%, 60% 50%, 80% 50%, 20% 50%)'
        },
        step2: {
          initial: 'polygon(20% 50%, 80% 50%, 60% 50%, 40% 50%)',
          "final": 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
        }
      },
      scrollTrigger: {
        start: 'center bottom',
        end: 'top top-=10%'
      },
      perspective: 500
    }
  }, {
    id: '#item-intro',
    animationProfile: fxIntro,
    interactiveTilt: true,
    // This item should have the InteractiveTilt effect
    options: {
      scrollTrigger: {
        start: 'clamp(top bottom)',
        end: 'center top'
      },
      perspective: 1000
    }
  }];

  // Iterate over the items and apply their animations
  items.forEach(function (item) {
    var itemElement = document.querySelector(item.id);
    // Check if element exists and has an animation profile
    if (itemElement && item.animationProfile) {
      // Apply the animation profile to the element with the specified options
      item.animationProfile(itemElement, item.options);

      // Check if the interactive tilt effect should be applied
      if (item.interactiveTilt) {
        // Instantiate the InteractiveTilt object for this item
        new _interactiveTilt["default"](itemElement);
      }
    } else {
      // Warn if the element or animation profile is not found
      console.warn("Element with ID ".concat(item.id, " or its animation profile is not defined."));
    }
  });
};

// Preloading all images specified by the selector
(0, _utils.preloadImages)('.content__img-inner').then(function () {
  // Once images are preloaded, remove the 'loading' indicator/class from the body
  document.body.classList.remove('loading');
  // Initialize Lenis
  initSmoothScrolling();
  // Apply scroll-triggered animations to each item
  scroll();
});
(0, _utils.year)();
_utils.toggleOpen.addEventListener('click', _utils.handleClick);
_utils.toggleClose.addEventListener('click', _utils.handleClick);
//# sourceMappingURL=index.js.map