(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Ajaxable", [], factory);
	else if(typeof exports === 'object')
		exports["Ajaxable"] = factory();
	else
		root["Ajaxable"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/eventemitter3/index.js":
/*!*********************************************!*\
  !*** ./node_modules/eventemitter3/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),

/***/ "./src/components/notification/AlertNotify.js":
/*!****************************************************!*\
  !*** ./src/components/notification/AlertNotify.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _NotificationBase2 = _interopRequireDefault(__webpack_require__(/*! ./NotificationBase */ "./src/components/notification/NotificationBase.js"));

var _utils = __webpack_require__(/*! ../../utils */ "./src/utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var defaultOptions = {
  container: document.body,
  escapeHtml: true,
  newestOnTop: true,
  closeButton: true
};

var AlertNotify =
/*#__PURE__*/
function (_NotificationBase) {
  _inherits(AlertNotify, _NotificationBase);

  function AlertNotify() {
    var _this;

    _classCallCheck(this, AlertNotify);

    _this = _possibleConstructorReturn(this, (AlertNotify.__proto__ || Object.getPrototypeOf(AlertNotify)).call(this));
    _this.options = defaultOptions;
    return _this;
  }
  /**
   * Show actual notification
   *
   * @param {*} title
   * @param {*} message
   * @param {string} [type='success']
   * @memberof AlertNotify
   */


  _createClass(AlertNotify, [{
    key: "notify",
    value: function notify(title, message) {
      var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'success';
      var alertElement = document.createElement('div');
      var titleElement = document.createElement('strong');
      var messageElement = document.createElement('span');
      (0, _utils.addClass)(alertElement, "alert alert-".concat(type));

      if (title) {
        if (this.options.escapeHtml) {
          title = (0, _utils.escapeHtml)(title);
        }

        (0, _utils.addClass)(titleElement, this.options.titleClass);
        titleElement.insertAdjacentHTML('beforeend', title);
        alertElement.appendChild(titleElement);
      }

      if (message) {
        if (this.options.escapeHtml) {
          message = (0, _utils.escapeHtml)(message);
        }

        (0, _utils.addClass)(messageElement, this.options.messageClass);
        messageElement.insertAdjacentHTML('beforeend', message);
        alertElement.appendChild(messageElement);
      }

      if (this.options.closeButton) {
        var closeElement = document.createElement('a');
        closeElement.setAttribute('title', 'close');
        closeElement.classList.add('close');
        closeElement.innerHTML = '&times;';
        (0, _utils.addClass)(closeElement, this.options.closeClass);
        alertElement.insertBefore(closeElement, alertElement.firstChild);

        closeElement.onclick = function () {
          return alertElement.remove();
        };
      }

      if (this.options.newestOnTop) {
        this.options.container.insertBefore(alertElement, this.options.container.firstChild);
      } else {
        this.options.container.appendChild(alertElement);
      }
    }
  }]);

  return AlertNotify;
}(_NotificationBase2.default);

var _default = new AlertNotify();

exports.default = _default;
module.exports = exports["default"];

/***/ }),

/***/ "./src/components/notification/NotificationBase.js":
/*!*********************************************************!*\
  !*** ./src/components/notification/NotificationBase.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = __webpack_require__(/*! ../../utils */ "./src/utils.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NotificationBase =
/*#__PURE__*/
function () {
  function NotificationBase() {
    _classCallCheck(this, NotificationBase);
  }

  _createClass(NotificationBase, [{
    key: "setOptions",

    /**
     * Set options
     *
     * @param {*} options
     * @memberof NotificationBase
     */
    value: function setOptions(options) {
      this.options = _typeof(options) === 'object' ? (0, _utils.extend)(this.options, options) : this.options;
    }
    /**
     * Show success notification
     *
     * @param {*} message
     * @param {string} [title='Success!']
     * @memberof SwalNotify
     */

  }, {
    key: "success",
    value: function success(message) {
      var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Success!';
      this.notify(title, message, 'success');
    }
    /**
     * Show error notification
     *
     * @param {*} message
     * @param {string} [title='Error!']
     * @memberof SwalNotify
     */

  }, {
    key: "error",
    value: function error(message) {
      var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Error!';
      this.notify(title, message, 'error');
    }
    /**
     * Show info notification
     *
     * @param {*} message
     * @param {string} [title='Info!']
     * @memberof SwalNotify
     */

  }, {
    key: "info",
    value: function info(message) {
      var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Info!';
      this.notify(title, message, 'info');
    }
    /**
     * Show warning notification
     *
     * @param {*} message
     * @param {string} [title='Warning!']
     * @memberof SwalNotify
     */

  }, {
    key: "warning",
    value: function warning(message) {
      var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Warning!';
      this.notify(title, message, 'warning');
    }
  }]);

  return NotificationBase;
}();

exports.default = NotificationBase;
module.exports = exports["default"];

/***/ }),

/***/ "./src/components/notification/SwalNotify.js":
/*!***************************************************!*\
  !*** ./src/components/notification/SwalNotify.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _NotificationBase2 = _interopRequireDefault(__webpack_require__(/*! ./NotificationBase */ "./src/components/notification/NotificationBase.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var swal = window.swal;
var defaultOptions = {};
/**
 * SwalNotify class for sweet alert messages
 *
 * @export
 * @class SwalNotify
 */

var SwalNotify =
/*#__PURE__*/
function (_NotificationBase) {
  _inherits(SwalNotify, _NotificationBase);

  /**
   * Creates an instance of SwalNotify.
   * @memberof SwalNotify
   */
  function SwalNotify() {
    var _this;

    _classCallCheck(this, SwalNotify);

    _this = _possibleConstructorReturn(this, (SwalNotify.__proto__ || Object.getPrototypeOf(SwalNotify)).call(this));
    _this.options = defaultOptions;
    _this.swal = swal;
    return _this;
  }
  /**
   * Show actual notification
   *
   * @param {*} title
   * @param {*} message
   * @param {*} type
   * @memberof SwalNotify
   */


  _createClass(SwalNotify, [{
    key: "notify",
    value: function notify(title, message, type) {
      if (typeof this.swal !== 'function') {
        throw new Error('You need to include swal library in your webpage');
      }

      this.swal(title, message, type);
    }
  }]);

  return SwalNotify;
}(_NotificationBase2.default);

var _default = new SwalNotify();

exports.default = _default;
module.exports = exports["default"];

/***/ }),

/***/ "./src/components/notification/ToastrNotify.js":
/*!*****************************************************!*\
  !*** ./src/components/notification/ToastrNotify.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _NotificationBase2 = _interopRequireDefault(__webpack_require__(/*! ./NotificationBase */ "./src/components/notification/NotificationBase.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var toastr = window.toastr;
var defaultOptions = {};
/**
 * ToastrNotify class for sweet alert messages
 *
 * @export
 * @class ToastrNotify
 */

var ToastrNotify =
/*#__PURE__*/
function (_NotificationBase) {
  _inherits(ToastrNotify, _NotificationBase);

  /**
   * Creates an instance of ToastrNotify.
   * @memberof ToastrNotify
   */
  function ToastrNotify() {
    var _this;

    _classCallCheck(this, ToastrNotify);

    _this = _possibleConstructorReturn(this, (ToastrNotify.__proto__ || Object.getPrototypeOf(ToastrNotify)).call(this));
    _this.options = defaultOptions;
    _this.toastr = toastr;
    return _this;
  }
  /**
   * Show actual notification
   *
   * @param {*} title
   * @param {*} message
   * @param {*} type
   * @memberof ToastrNotify
   */


  _createClass(ToastrNotify, [{
    key: "notify",
    value: function notify(title, message, type) {
      if (_typeof(this.toastr) !== 'object') {
        throw new Error('You need to include toastr library in your webpage');
      }

      this.toastr[type](message, title);
    }
  }]);

  return ToastrNotify;
}(_NotificationBase2.default);

var _default = new ToastrNotify();

exports.default = _default;
module.exports = exports["default"];

/***/ }),

/***/ "./src/components/notification/notificationFactory.js":
/*!************************************************************!*\
  !*** ./src/components/notification/notificationFactory.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createNotifierObject;

var _AlertNotify = _interopRequireDefault(__webpack_require__(/*! ./AlertNotify */ "./src/components/notification/AlertNotify.js"));

var _ToastrNotify = _interopRequireDefault(__webpack_require__(/*! ./ToastrNotify */ "./src/components/notification/ToastrNotify.js"));

var _SwalNotify = _interopRequireDefault(__webpack_require__(/*! ./SwalNotify */ "./src/components/notification/SwalNotify.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createNotifierObject(options) {
  var notificationType = options.notificationType || 'alert';
  var instance;

  switch (notificationType) {
    case 'alert':
      instance = _AlertNotify.default;
      break;

    case 'toastr':
      instance = _ToastrNotify.default;
      break;

    case 'swal':
      instance = _SwalNotify.default;
      break;

    default:
      instance = _AlertNotify.default;
      break;
  }

  instance.setOptions(options);
  return instance;
}

module.exports = exports["default"];

/***/ }),

/***/ "./src/core/Ajax.js":
/*!**************************!*\
  !*** ./src/core/Ajax.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = __webpack_require__(/*! ../utils */ "./src/utils.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var EventEmitter = __webpack_require__(/*! eventemitter3 */ "./node_modules/eventemitter3/index.js");
/**
 * Create XHR instance
 *
 */


function createXHR() {
  if (window.XMLHttpRequest === undefined) {
    window.XMLHttpRequest = function () {
      try {
        this.xhr = new ActiveXObject('Msxml2.XMLHTTP.6.0');
      } catch (e1) {
        try {
          this.xhr = new ActiveXObject('Mxsml2.XMLHTTP.3.0');
        } catch (e2) {
          this.xhr = new Error('Ajax not supported in your browser');
        }
      }
    };
  } else {
    this.xhr = new XMLHttpRequest();
  }
}
/**
 * Parse XHR response
 *
 * @returns object
 */


function parseXhrResponse() {
  var result;

  try {
    result = JSON.parse(this.xhr.responseText);
  } catch (e) {
    result = this.xhr.responseText;
  }

  return result;
}
/**
 * Set ajax content type
 *
 */


function setContentType() {
  if (this.options.ajaxContentType) {
    this.xhr.setRequestHeader('Content-Type', this.options.ajaxContentType);
  }
}
/**
 * Set request headers
 *
 */


function setRequestHeaders() {
  var i;
  var headerName;
  var headerValue;

  if (_typeof(this.options.ajaxRequestHeaders) === 'object') {
    for (i in this.options.ajaxRequestHeaders) {
      if (this.options.ajaxRequestHeaders.hasOwnProperty(i)) {
        headerName = i;
        headerValue = typeof this.options.ajaxRequestHeaders[i] === 'string' ? this.options.ajaxRequestHeaders[i] : '';
        this.xhr.setRequestHeader(headerName, headerValue);
      }
    }
  }
}
/**
 * Setup XHR onAbort option
 *
 */


function setupXHROnAbort() {
  this.xhr.onabort = function () {
    this.emit('onAbort', this.xhr);
  }.bind(this);
}
/**
 * Setup XHR onTimeout
 *
 */


function setupXHROnTimeout() {
  if (this.options.ajaxTimeout) {
    this.xhr.timeout = this.options.ajaxTimeout;
  }

  this.xhr.onabort = function () {
    this.emit('onTimeout', this.xhr);
  }.bind(this);
}
/**
 * Setup XHR onReadyStateChange
 *
 */


function setupOnReadyStateChange() {
  var xhrResult;

  if (this.xhr.readyState === 4) {
    xhrResult = parseXhrResponse.call(this);

    if (this.xhr.status >= 200 && this.xhr.status < 300) {
      this.emit('onSuccess', this.xhr, xhrResult);
    } else {
      this.emit('onError', this.xhr, xhrResult);
    }

    this.emit('onComplete', this.xhr, xhrResult);
  }
}
/**
 * Setup XHR ready
 *
 */


function setupXHRReadyState() {
  this.xhr.onreadystatechange = setupOnReadyStateChange.bind(this);
}
/**
 * Update XHR options
 *
 */


function updateXHROptions() {
  setupXHROnAbort.call(this);
  setupXHROnTimeout.call(this);
  setupXHRReadyState.call(this);
}

;
/**
 * Ajax class
 *
 * @export
 * @class Ajax
 */

var Ajax =
/*#__PURE__*/
function () {
  /**
   * Creates an instance of Ajax.
   * @param {*} options
   * @memberof Ajax
   */
  function Ajax(options) {
    _classCallCheck(this, Ajax);

    this.options = options;
    this.xhr = null;
    this.emitter = new EventEmitter();
    createXHR.call(this);
    updateXHROptions.call(this);
  }
  /**
   * Fire actual ajax request
   *
   * @param {*} data
   * @memberof Ajax
   */


  _createClass(Ajax, [{
    key: "doRequest",
    value: function doRequest(data) {
      if (this.options.ajaxUrl === false || typeof this.options.ajaxUrl !== 'string') {
        throw new Error('Invalid Ajax URL');
      }

      this.xhr.open(this.options.ajaxMethod, this.options.ajaxUrl, this.options.ajaxAsync, this.options.ajaxUserName, this.options.ajaxPassword);
      setContentType.call(this);
      setRequestHeaders.call(this);
      this.xhr.send(data);
    }
    /**
     * Set ajax options from outside
     *
     * @param {*} opts
     * @returns
     * @memberof Ajax
     */

  }, {
    key: "setOptions",
    value: function setOptions(opts) {
      this.options = (0, _utils.extend)(this.options, opts);
      updateXHROptions.call(this);
      return this;
    }
    /**
     * Listen events on the class
     *
     * @param {*} event
     * @param {*} handler
     * @param {*} context
     * @memberof Ajax
     */

  }, {
    key: "on",
    value: function on(event, handler, context) {
      this.emitter.on(event, handler, context || undefined);
    }
  }, {
    key: "emit",

    /**
     * Make the class an event emitter
     *
     * @param {*} event
     * @param {*} a1
     * @param {*} a2
     * @param {*} a3
     * @param {*} a4
     * @param {*} a5
     * @memberof Ajax
     */
    value: function emit(event, a1, a2, a3, a4, a5) {
      this.emitter.emit(event, a1, a2, a3, a4, a5);
    }
  }]);

  return Ajax;
}();

exports.default = Ajax;
module.exports = exports["default"];

/***/ }),

/***/ "./src/core/Element.js":
/*!*****************************!*\
  !*** ./src/core/Element.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Ajax = _interopRequireDefault(__webpack_require__(/*! ./Ajax */ "./src/core/Ajax.js"));

var _ResponseHandler = _interopRequireDefault(__webpack_require__(/*! ./ResponseHandler */ "./src/core/ResponseHandler.js"));

var _elementOpts = _interopRequireDefault(__webpack_require__(/*! ./elementOpts */ "./src/core/elementOpts.js"));

var _utils = __webpack_require__(/*! ../utils */ "./src/utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EventEmitter = __webpack_require__(/*! eventemitter3 */ "./node_modules/eventemitter3/index.js");
/**
 * Bind XHR events
 *
 */


function bindXhrEvents() {
  var _this = this;

  this.ajax.on('onSuccess', function (x, r) {
    return _this.emit('ajaxable:on-ajax-success', x, r);
  }, this);
  this.ajax.on('onError', function (x, r) {
    return _this.emit('ajaxable:on-ajax-error', x, r);
  }, this);
  this.ajax.on('onComplete', function (x, r) {
    return _this.emit('ajaxable:on-ajax-complete', x, r);
  }, this);
  this.ajax.on('onAbort', function (x, r) {
    return _this.emit('ajaxable:on-ajax-abort', x, r);
  }, this);
  this.ajax.on('onTimeout', function (x, r) {
    return _this.emit('ajaxable:on-ajax-timeout', x, r);
  }, this);
}
/**
 * Bind class ajax events
 *
 */


function bindClassEvents() {
  var resHandlr = this.responseHandler;
  this.on('ajaxable:on-ajax-before', resHandlr.beforeSend.bind(resHandlr), this);
  this.on('ajaxable:on-ajax-success', resHandlr.onSuccess.bind(resHandlr), this);
  this.on('ajaxable:on-ajax-error', resHandlr.onError.bind(resHandlr), this);
  this.on('ajaxable:on-ajax-complete', resHandlr.onComplete.bind(resHandlr), this);
  this.on('ajaxable:on-ajax-abort', resHandlr.onAbort.bind(resHandlr), this);
  this.on('ajaxable:on-ajax-timeout', resHandlr.onTimeout.bind(resHandlr), this);
}
/**
 * Bind element dom events
 *
 */


function bindElementEvents() {
  var _this2 = this;

  var ctx = this;
  var element = this.element; // Fire ajax after certain time

  var bindTimedAjax = function bindTimedAjax() {
    ctx.requestTimerId = setTimeout(function () {
      return _this2.startAjaxRequest();
    }, ctx.options.requestTimeout);
  }; // Fire ajax on particular interval


  var bindIntervalAjax = function bindIntervalAjax() {
    ctx.requestIntervalId = setInterval(function () {
      return _this2.startAjaxRequest();
    }, ctx.options.requestInterval);
  }; // Fire ajax on click


  var bindClickAjax = function bindClickAjax() {
    ctx.clickAjaxHandler = function (event) {
      event.preventDefault();
      ctx.startAjaxRequest();
    };

    element.addEventListener('click', ctx.clickAjaxHandler, false);
  }; // Fire ajax on hover


  var bindHoverAjax = function bindHoverAjax() {
    ctx.hoverAjaxHandler = function (event) {
      event.preventDefault();
      ctx.startAjaxRequest();
    };

    element.addEventListener('hover', ctx.hoverAjaxHandler, false);
  }; // Fire ajax on submit


  var bindSubmitAjax = function bindSubmitAjax() {
    ctx.submitAjaxHandler = function (event) {
      event.preventDefault();
      ctx.startAjaxRequest();
    };

    element.addEventListener('submit', ctx.submitAjaxHandler, false);
  };

  if (element.nodeName === 'FORM') {
    bindSubmitAjax();
  }

  switch (ctx.options.triggerType) {
    case 'timeout':
      bindTimedAjax();
      break;

    case 'interval':
      bindIntervalAjax();
      break;

    case 'click':
      bindClickAjax();
      break;

    case 'hover':
      bindHoverAjax();
      break;

    default:
      break;
  }
}
/**
 * Detach element dom events
 *
 */


function detatchElementEvents() {
  var element = this.element;

  if (element.nodeName === 'FORM') {
    element.removeEventListener('submit', this.submitAjaxHandler);
  }

  switch (element.getAttribute('data-ajaxable-trigger-type')) {
    case 'timeout':
      clearTimeout(this.requestTimerId);
      break;

    case 'interval':
      clearTimeout(this.requestIntervalId);
      break;

    case 'click':
      element.removeEventListener('click', this.clickAjaxHandler);
      break;

    case 'hover':
      element.removeEventListener('click', this.hoverAjaxHandler);
      break;

    default:
      break;
  }
}
/**
 * Update element attributes to options
 *
 */


function updateElementAttributesToOptions() {
  var attribute;
  var i;
  var element = this.element;
  var attrs = element.attributes;
  var length = attrs.length;

  for (i = 0; i < length; i = i + 1) {
    attribute = attrs[i];

    if (typeof this.options[(0, _utils.toCamelCase)(attribute.nodeName)] !== 'undefined') {
      this.options[(0, _utils.toCamelCase)(attribute.nodeName)] = attribute.nodeValue;
    }
  }

  if (this.element.getAttribute('href')) {
    this.options['ajaxUrl'] = this.element.getAttribute('href');
  } else if (this.element.getAttribute('action')) {
    this.options['ajaxUrl'] = this.element.getAttribute('action');
  }
}
/**
 * Prepare ajax request data before send
 *
 */


function prepareAjaxRequestData() {
  this.emit('ajaxable:on-ajax-before', this.options.ajaxData);
}

var Element =
/*#__PURE__*/
function () {
  /**
   * Creates an instance of Element.
   * @param {*} element
   * @param {*} options
   * @memberof Element
   */
  function Element(element, options) {
    _classCallCheck(this, Element);

    this.element = element;
    this.options = _typeof(options) === 'object' ? (0, _utils.extend)(_elementOpts.default, options) : _elementOpts.default;
    this.emitter = new EventEmitter();
    this.ajax = new _Ajax.default(this.options);
    this.responseHandler = new _ResponseHandler.default(this);
    bindXhrEvents.call(this);
    bindClassEvents.call(this);
    bindElementEvents.call(this);
    updateElementAttributesToOptions.call(this);
  }
  /**
   * Start ajax request on the element
   *
   * @memberof Element
   */


  _createClass(Element, [{
    key: "startAjaxRequest",
    value: function startAjaxRequest() {
      var data = prepareAjaxRequestData.call(this);
      this.ajax.doRequest(data);
    }
    /**
     * Destroy ajaxable on element
     *
     * @memberof Element
     */

  }, {
    key: "destroy",
    value: function destroy() {
      detatchElementEvents.call(this, this.element);
    }
  }, {
    key: "getDomElement",

    /**
     * Get Dom element
     *
     * @returns
     * @memberof Element
     */
    value: function getDomElement() {
      return this.element;
    }
    /**
     * Set element options once the Ajaxable has been instaniated
     *
     * @param {*} opts
     * @returns
     * @memberof Element
     */

  }, {
    key: "setOptions",
    value: function setOptions(opts) {
      var element = this.element;
      var attributes = element.attributes;
      var attrLength = attributes.length;
      var elementAttributeNodes = [];
      var i;
      var k;

      if (_typeof(opts) === 'object') {
        for (i = 0; i < attrLength; i = i + 1) {
          elementAttributeNodes.push((0, _utils.toCamelCase)(attributes[i].nodeName));
        }

        for (k in opts) {
          if (opts.hasOwnProperty(k)) {
            if (elementAttributeNodes.indexOf(k) > 0) {
              delete opts[k];
            }
          }
        }
      }

      this.options = _typeof(opts) === 'object' ? (0, _utils.extend)(this.options, opts) : this.options;
      bindClassEvents.call(this);
      this.ajax.setOptions(this.options);
      return this;
    }
  }, {
    key: "on",

    /**
     * Bind event to Element
     *
     * @param  {String} event
     * @param  {Function} handler
     * @param  {Object} context
     * @return {void}
     */
    value: function on(event, handler, context) {
      this.emitter.on(event, handler, context || undefined);
    }
  }, {
    key: "emit",

    /**
     * Emit events bind to Element
     *
     * @param  {String} event
     * @param  {mixed} a1
     * @param  {mixed} a2
     * @param  {mixed} a3
     * @param  {mixed} a4
     * @param  {mixed} a5
     * @return {*}
     */
    value: function emit(event, a1, a2, a3, a4, a5) {
      return this.emitter.emit(event, a1, a2, a3, a4, a5);
    }
  }]);

  return Element;
}();

exports.default = Element;
;
module.exports = exports["default"];

/***/ }),

/***/ "./src/core/ResponseHandler.js":
/*!*************************************!*\
  !*** ./src/core/ResponseHandler.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _notificationFactory = _interopRequireDefault(__webpack_require__(/*! ../components/notification/notificationFactory */ "./src/components/notification/notificationFactory.js"));

var _utils = __webpack_require__(/*! ../utils */ "./src/utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ResponseHandler =
/*#__PURE__*/
function () {
  /**
   * Creates an instance of ResponseHandler.
   * @param {*} element
   * @memberof ResponseHandler
   */
  function ResponseHandler(element) {
    _classCallCheck(this, ResponseHandler);

    this.element = element;
    this.options = element.options;
    this.notifier = (0, _notificationFactory.default)(this.options);
  }
  /**
   * Handle ajax beforeSend
   *
   * @param {*} dataToSend
   * @memberof ResponseHandler
   */


  _createClass(ResponseHandler, [{
    key: "beforeSend",
    value: function beforeSend(dataToSend) {
      var handler = (0, _utils.resolveFunctionName)(this.options.ajaxBeforeSend);

      if (typeof handler === 'function') {
        return handler.call(this.element, dataToSend);
      }

      return dataToSend;
    }
    /**
     * Handle ajax onSuccess
     *
     * @param {*} xhr
     * @param {*} response
     * @memberof ResponseHandler
     */

  }, {
    key: "onSuccess",
    value: function onSuccess(xhr, response) {
      var handler = (0, _utils.resolveFunctionName)(this.options.ajaxOnSuccess);

      if (typeof handler === 'function') {
        handler.call(this.element, xhr, response);
      }
    }
    /**
     * Handle ajax onError
     *
     * @param {*} xhr
     * @param {*} response
     * @memberof ResponseHandler
     */

  }, {
    key: "onError",
    value: function onError(xhr, response) {
      var handler = (0, _utils.resolveFunctionName)(this.options.ajaxOnError);

      if (typeof handler === 'function') {
        handler.call(this.element, xhr, response);
      }
    }
    /**
     * Handle ajax onComplete
     *
     * @param {*} xhr
     * @param {*} response
     * @memberof ResponseHandler
     */

  }, {
    key: "onComplete",
    value: function onComplete(xhr, response) {
      var handler = (0, _utils.resolveFunctionName)(this.options.ajaxOnComplete);

      if (typeof handler === 'function') {
        handler.call(this.element, xhr, response);
      }

      this.handleAjaxCompleteEffects(response);
    }
    /**
     * Handle ajax onAbort
     *
     * @param {*} xhr
     * @param {*} response
     * @memberof ResponseHandler
     */

  }, {
    key: "onAbort",
    value: function onAbort(xhr, response) {
      var handler = (0, _utils.resolveFunctionName)(this.options.ajaxOnAbort);

      if (typeof handler === 'function') {
        handler.call(this.element, xhr, response);
      }
    }
    /**
     * Handle ajax onTimeout
     *
     * @param {*} xhr
     * @param {*} response
     * @memberof ResponseHandler
     */

  }, {
    key: "onTimeout",
    value: function onTimeout(xhr, response) {
      var handler = (0, _utils.resolveFunctionName)(this.options.ajaxOnTimeout);

      if (typeof handler === 'function') {
        handler.call(this.element, xhr, response);
      }
    }
    /**
     * Redirect after certain time or immediately
     *
     * @param {*} { redirect }
     * @memberof ResponseHandler
     */

  }, {
    key: "redirect",
    value: function redirect(_ref) {
      var _redirect = _ref.redirect;
      if (!this.options.enableRedirect) return;

      if (_redirect && _redirect.url) {
        setTimeout(function () {
          window.location.href = _redirect.url;
        }, _redirect.timeout || 0);
      }
    }
    /**
     * Reload current window after certain time or immediately
     *
     * @param {*} { redirect }
     * @memberof ResponseHandler
     */

  }, {
    key: "reload",
    value: function reload(_ref2) {
      var _reload = _ref2.reload;
      if (!this.options.enableReload) return;

      if (typeof _reload !== 'undefined') {
        setTimeout(function () {
          window.reload();
        }, _reload.timeout || 0);
      }
    }
    /**
     * Show notifications based on response
     *
     * @param {*} { notification }
     * @returns
     * @memberof ResponseHandler
     */

  }, {
    key: "notify",
    value: function notify(_ref3) {
      var _this = this;

      var notification = _ref3.notification;
      if (_typeof(notification) !== 'object') return;
      var notificationArr = Array.isArray(notification) ? notification : [notification];
      notificationArr.forEach(function (n) {
        return _this.notifier[n.level || 'info'](n.message || 'Some message sent by server', n.title || '');
      });
    }
    /**
     * Handle ajax complete after effects
     *
     * @param {*} response
     * @returns
     * @memberof ResponseHandler
     */

  }, {
    key: "handleAjaxCompleteEffects",
    value: function handleAjaxCompleteEffects(response) {
      if (!response) return;
      this.redirect(response);
      this.reload(response);
      this.notify(response);
    }
  }]);

  return ResponseHandler;
}();

exports.default = ResponseHandler;
module.exports = exports["default"];

/***/ }),

/***/ "./src/core/elementOpts.js":
/*!*********************************!*\
  !*** ./src/core/elementOpts.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  triggerType: 'click',
  requestTimeout: 1000,
  requestInterval: 1000,
  ajaxUrl: false,
  ajaxMethod: 'POST',
  ajaxAsync: true,
  ajaxUserName: null,
  ajaxPassword: null,
  ajaxContentType: 'application/x-www-form-urlencoded',
  ajaxTimeout: 30000,
  ajaxRequestHeaders: {
    'X-Requested-With': 'ajaxable'
  },
  ajaxData: {},
  ajaxBeforeSend: null,
  ajaxOnSuccess: null,
  ajaxOnError: null,
  ajaxOnComplete: null,
  ajaxOnAbort: null,
  ajaxOnTimeout: null,
  ajaxShowLoader: false,
  ajaxLoaderContainer: document.body,
  ajaxDoConfirm: false,
  domReplaceTo: false,
  domReplaceClosestTo: false,
  domReplaceInnerTo: false,
  domReplaceClosestInnerTo: false,
  domAppendTo: false,
  domPrepandTo: false,
  domClearTo: false,
  domClearClosestTo: false,
  domRemoveTo: false,
  domRemoveClosestTo: false,
  enableRedirect: true,
  notificationType: 'alert',
  // toastr|alert|swal
  alertOptions: {},
  toastrOptions: {},
  swalOptions: {}
};
exports.default = _default;
module.exports = exports["default"];

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Element = _interopRequireDefault(__webpack_require__(/*! ./core/Element */ "./src/core/Element.js"));

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EventEmitter = __webpack_require__(/*! eventemitter3 */ "./node_modules/eventemitter3/index.js");
/**
 * Create elements array based on provided selector
 *
 * @param {*} selector
 * @param {*} filterElements
 * @returns array
 */


function _createElementsArray(selector, filterElements) {
  var elements = [];
  var i;
  var el;

  if (!selector) {
    selector = [];
  }

  if (typeof selector === 'string') {
    selector = document.querySelectorAll(selector);
  }

  if ((0, _utils.isElement)(selector)) {
    selector = [selector];
  }

  if (filterElements) {
    for (i = 0; i < selector.length; i = i + 1) {
      el = selector[i];

      if ((0, _utils.isElement)(el) && !el.getAttribute('data-ajaxable-id')) {
        elements.push(el);
      }
    }
  } else {
    elements = Array.prototype.slice.apply(selector);
  }

  return elements;
}
/**
 * Create Element instance
 *
 * @param {*} element
 * @returns
 */


function _createElementInstance(element) {
  var uniqueId = (0, _utils.uuid)();

  if (!element.getAttribute('data-ajaxable-id')) {
    element.setAttribute('data-ajaxable-id', uniqueId);
    element = new _Element.default(element, this.options);
    return element;
  }

  return false;
}

var Ajaxable =
/*#__PURE__*/
function () {
  /**
   * Creates an instance of Ajaxable.
   * @param {*} elements
   * @param {*} options
   * @memberof Ajaxable
   */
  function Ajaxable(elements, options) {
    _classCallCheck(this, Ajaxable);

    this.emitter = new EventEmitter();
    this.options = _typeof(options) === 'object' ? (0, _utils.extend)({}, options) : {};
    this.origElements = elements;
    this.elements = [];
    this.addElements(this.origElements);
  }
  /**
   * Register selector elements to ajaxable
   *
   * @param {*} selector
   * @returns
   * @memberof Ajaxable
   */


  _createClass(Ajaxable, [{
    key: "addElements",
    value: function addElements(selector) {
      var elements = _createElementsArray(selector, true);

      if (elements.length === 0) {
        return false;
      }

      elements.forEach(function (element) {
        element = _createElementInstance.call(this, element);
        this.elements.push(element);
      }, this);
      return undefined;
    }
    /**
     * Un-register added elements back to native
     *
     * @param {*} selector
     * @memberof Ajaxable
     */

  }, {
    key: "removeElements",
    value: function removeElements(selector) {
      var elements = _createElementsArray(selector),
          i,
          k;

      if (elements.length > 0) {
        for (i in elements) {
          if (elements[i].getAttribute('data-ajaxable-id')) {
            for (k in this.elements) {
              if (this.elements[k].getDomElement() === elements[i]) {
                this.elements[k].getDomElement().removeAttribute('data-ajaxable-id');
                this.elements[k].destroy();
                this.elements.splice(k, 1);
              }
            }
          }
        }
      }
    }
  }]);

  return Ajaxable;
}();

exports.default = Ajaxable;
module.exports = exports["default"];

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.escapeHtml = exports.addClass = exports.toCamelCase = exports.resolveFunctionName = exports.uuid = exports.isElement = exports.extend = void 0;

var extend = function extend(defaults, options) {
  var extended = {};
  var prop;

  for (prop in defaults) {
    if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
      extended[prop] = defaults[prop];
    }
  }

  for (prop in options) {
    if (Object.prototype.hasOwnProperty.call(options, prop)) {
      extended[prop] = options[prop];
    }
  }

  return extended;
};

exports.extend = extend;

var isElement = function isElement(obj) {
  return !!(obj && obj.nodeType === 1);
};

exports.isElement = isElement;

var uuid = function uuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

exports.uuid = uuid;

var resolveFunctionName = function resolveFunctionName(func) {
  var obj;

  if (typeof func === 'function') {
    return func;
  }

  if (typeof func === 'string') {
    if (func.indexOf('.') <= -1 && typeof window[func] === 'function') {
      return window[func];
    }

    obj = func.split('.').reduce(function (o, i) {
      return o[i];
    }, window);

    if (typeof obj === 'function') {
      return obj;
    }
  }

  return null;
};

exports.resolveFunctionName = resolveFunctionName;

var toCamelCase = function toCamelCase(str) {
  str = str.replace('data-ajaxable-', '').replace(/-/g, ' ');
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
    return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
};

exports.toCamelCase = toCamelCase;

var addClass = function addClass(element, classes) {
  if (typeof classes === 'undefined' || classes === null || classes === '' || !classes) {
    return;
  }

  var classList = classes.indexOf(' ') > -1 ? classes.split(' ') : classes;

  if (Array.isArray(classList)) {
    for (var i = 0; i < classList.length; i++) {
      element.classList.add(classList[i]);
    }
  } else {
    element.classList.add(classList);
  }
};

exports.addClass = addClass;

var escapeHtml = function escapeHtml(source) {
  if (source == null) {
    source = '';
  }

  return source.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

exports.escapeHtml = escapeHtml;

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9BamF4YWJsZS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vQWpheGFibGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQWpheGFibGUvLi9ub2RlX21vZHVsZXMvZXZlbnRlbWl0dGVyMy9pbmRleC5qcyIsIndlYnBhY2s6Ly9BamF4YWJsZS8uL3NyYy9jb21wb25lbnRzL25vdGlmaWNhdGlvbi9BbGVydE5vdGlmeS5qcyIsIndlYnBhY2s6Ly9BamF4YWJsZS8uL3NyYy9jb21wb25lbnRzL25vdGlmaWNhdGlvbi9Ob3RpZmljYXRpb25CYXNlLmpzIiwid2VicGFjazovL0FqYXhhYmxlLy4vc3JjL2NvbXBvbmVudHMvbm90aWZpY2F0aW9uL1N3YWxOb3RpZnkuanMiLCJ3ZWJwYWNrOi8vQWpheGFibGUvLi9zcmMvY29tcG9uZW50cy9ub3RpZmljYXRpb24vVG9hc3RyTm90aWZ5LmpzIiwid2VicGFjazovL0FqYXhhYmxlLy4vc3JjL2NvbXBvbmVudHMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbkZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vQWpheGFibGUvLi9zcmMvY29yZS9BamF4LmpzIiwid2VicGFjazovL0FqYXhhYmxlLy4vc3JjL2NvcmUvRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9BamF4YWJsZS8uL3NyYy9jb3JlL1Jlc3BvbnNlSGFuZGxlci5qcyIsIndlYnBhY2s6Ly9BamF4YWJsZS8uL3NyYy9jb3JlL2VsZW1lbnRPcHRzLmpzIiwid2VicGFjazovL0FqYXhhYmxlLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL0FqYXhhYmxlLy4vc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbImRlZmF1bHRPcHRpb25zIiwiY29udGFpbmVyIiwiZG9jdW1lbnQiLCJib2R5IiwiZXNjYXBlSHRtbCIsIm5ld2VzdE9uVG9wIiwiY2xvc2VCdXR0b24iLCJBbGVydE5vdGlmeSIsIm9wdGlvbnMiLCJ0aXRsZSIsIm1lc3NhZ2UiLCJ0eXBlIiwiYWxlcnRFbGVtZW50IiwiY3JlYXRlRWxlbWVudCIsInRpdGxlRWxlbWVudCIsIm1lc3NhZ2VFbGVtZW50IiwidGl0bGVDbGFzcyIsImluc2VydEFkamFjZW50SFRNTCIsImFwcGVuZENoaWxkIiwibWVzc2FnZUNsYXNzIiwiY2xvc2VFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiY2xhc3NMaXN0IiwiYWRkIiwiaW5uZXJIVE1MIiwiY2xvc2VDbGFzcyIsImluc2VydEJlZm9yZSIsImZpcnN0Q2hpbGQiLCJvbmNsaWNrIiwicmVtb3ZlIiwiTm90aWZpY2F0aW9uQmFzZSIsIm5vdGlmeSIsInN3YWwiLCJ3aW5kb3ciLCJTd2FsTm90aWZ5IiwiRXJyb3IiLCJ0b2FzdHIiLCJUb2FzdHJOb3RpZnkiLCJjcmVhdGVOb3RpZmllck9iamVjdCIsIm5vdGlmaWNhdGlvblR5cGUiLCJpbnN0YW5jZSIsInNldE9wdGlvbnMiLCJFdmVudEVtaXR0ZXIiLCJyZXF1aXJlIiwiY3JlYXRlWEhSIiwiWE1MSHR0cFJlcXVlc3QiLCJ1bmRlZmluZWQiLCJ4aHIiLCJBY3RpdmVYT2JqZWN0IiwiZTEiLCJlMiIsInBhcnNlWGhyUmVzcG9uc2UiLCJyZXN1bHQiLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZVRleHQiLCJlIiwic2V0Q29udGVudFR5cGUiLCJhamF4Q29udGVudFR5cGUiLCJzZXRSZXF1ZXN0SGVhZGVyIiwic2V0UmVxdWVzdEhlYWRlcnMiLCJpIiwiaGVhZGVyTmFtZSIsImhlYWRlclZhbHVlIiwiYWpheFJlcXVlc3RIZWFkZXJzIiwiaGFzT3duUHJvcGVydHkiLCJzZXR1cFhIUk9uQWJvcnQiLCJvbmFib3J0IiwiZW1pdCIsImJpbmQiLCJzZXR1cFhIUk9uVGltZW91dCIsImFqYXhUaW1lb3V0IiwidGltZW91dCIsInNldHVwT25SZWFkeVN0YXRlQ2hhbmdlIiwieGhyUmVzdWx0IiwicmVhZHlTdGF0ZSIsImNhbGwiLCJzdGF0dXMiLCJzZXR1cFhIUlJlYWR5U3RhdGUiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJ1cGRhdGVYSFJPcHRpb25zIiwiQWpheCIsImVtaXR0ZXIiLCJkYXRhIiwiYWpheFVybCIsIm9wZW4iLCJhamF4TWV0aG9kIiwiYWpheEFzeW5jIiwiYWpheFVzZXJOYW1lIiwiYWpheFBhc3N3b3JkIiwic2VuZCIsIm9wdHMiLCJldmVudCIsImhhbmRsZXIiLCJjb250ZXh0Iiwib24iLCJhMSIsImEyIiwiYTMiLCJhNCIsImE1IiwiYmluZFhockV2ZW50cyIsImFqYXgiLCJ4IiwiciIsImJpbmRDbGFzc0V2ZW50cyIsInJlc0hhbmRsciIsInJlc3BvbnNlSGFuZGxlciIsImJlZm9yZVNlbmQiLCJvblN1Y2Nlc3MiLCJvbkVycm9yIiwib25Db21wbGV0ZSIsIm9uQWJvcnQiLCJvblRpbWVvdXQiLCJiaW5kRWxlbWVudEV2ZW50cyIsImN0eCIsImVsZW1lbnQiLCJiaW5kVGltZWRBamF4IiwicmVxdWVzdFRpbWVySWQiLCJzZXRUaW1lb3V0Iiwic3RhcnRBamF4UmVxdWVzdCIsInJlcXVlc3RUaW1lb3V0IiwiYmluZEludGVydmFsQWpheCIsInJlcXVlc3RJbnRlcnZhbElkIiwic2V0SW50ZXJ2YWwiLCJyZXF1ZXN0SW50ZXJ2YWwiLCJiaW5kQ2xpY2tBamF4IiwiY2xpY2tBamF4SGFuZGxlciIsInByZXZlbnREZWZhdWx0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImJpbmRIb3ZlckFqYXgiLCJob3ZlckFqYXhIYW5kbGVyIiwiYmluZFN1Ym1pdEFqYXgiLCJzdWJtaXRBamF4SGFuZGxlciIsIm5vZGVOYW1lIiwidHJpZ2dlclR5cGUiLCJkZXRhdGNoRWxlbWVudEV2ZW50cyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJnZXRBdHRyaWJ1dGUiLCJjbGVhclRpbWVvdXQiLCJ1cGRhdGVFbGVtZW50QXR0cmlidXRlc1RvT3B0aW9ucyIsImF0dHJpYnV0ZSIsImF0dHJzIiwiYXR0cmlidXRlcyIsImxlbmd0aCIsIm5vZGVWYWx1ZSIsInByZXBhcmVBamF4UmVxdWVzdERhdGEiLCJhamF4RGF0YSIsIkVsZW1lbnQiLCJkb1JlcXVlc3QiLCJhdHRyTGVuZ3RoIiwiZWxlbWVudEF0dHJpYnV0ZU5vZGVzIiwiayIsInB1c2giLCJpbmRleE9mIiwiUmVzcG9uc2VIYW5kbGVyIiwibm90aWZpZXIiLCJkYXRhVG9TZW5kIiwiYWpheEJlZm9yZVNlbmQiLCJyZXNwb25zZSIsImFqYXhPblN1Y2Nlc3MiLCJhamF4T25FcnJvciIsImFqYXhPbkNvbXBsZXRlIiwiaGFuZGxlQWpheENvbXBsZXRlRWZmZWN0cyIsImFqYXhPbkFib3J0IiwiYWpheE9uVGltZW91dCIsInJlZGlyZWN0IiwiZW5hYmxlUmVkaXJlY3QiLCJ1cmwiLCJsb2NhdGlvbiIsImhyZWYiLCJyZWxvYWQiLCJlbmFibGVSZWxvYWQiLCJub3RpZmljYXRpb24iLCJub3RpZmljYXRpb25BcnIiLCJBcnJheSIsImlzQXJyYXkiLCJmb3JFYWNoIiwibiIsImxldmVsIiwiYWpheFNob3dMb2FkZXIiLCJhamF4TG9hZGVyQ29udGFpbmVyIiwiYWpheERvQ29uZmlybSIsImRvbVJlcGxhY2VUbyIsImRvbVJlcGxhY2VDbG9zZXN0VG8iLCJkb21SZXBsYWNlSW5uZXJUbyIsImRvbVJlcGxhY2VDbG9zZXN0SW5uZXJUbyIsImRvbUFwcGVuZFRvIiwiZG9tUHJlcGFuZFRvIiwiZG9tQ2xlYXJUbyIsImRvbUNsZWFyQ2xvc2VzdFRvIiwiZG9tUmVtb3ZlVG8iLCJkb21SZW1vdmVDbG9zZXN0VG8iLCJhbGVydE9wdGlvbnMiLCJ0b2FzdHJPcHRpb25zIiwic3dhbE9wdGlvbnMiLCJfY3JlYXRlRWxlbWVudHNBcnJheSIsInNlbGVjdG9yIiwiZmlsdGVyRWxlbWVudHMiLCJlbGVtZW50cyIsImVsIiwicXVlcnlTZWxlY3RvckFsbCIsInByb3RvdHlwZSIsInNsaWNlIiwiYXBwbHkiLCJfY3JlYXRlRWxlbWVudEluc3RhbmNlIiwidW5pcXVlSWQiLCJBamF4YWJsZSIsIm9yaWdFbGVtZW50cyIsImFkZEVsZW1lbnRzIiwiZ2V0RG9tRWxlbWVudCIsInJlbW92ZUF0dHJpYnV0ZSIsImRlc3Ryb3kiLCJzcGxpY2UiLCJleHRlbmQiLCJkZWZhdWx0cyIsImV4dGVuZGVkIiwicHJvcCIsIk9iamVjdCIsImlzRWxlbWVudCIsIm9iaiIsIm5vZGVUeXBlIiwidXVpZCIsInM0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG9TdHJpbmciLCJzdWJzdHJpbmciLCJyZXNvbHZlRnVuY3Rpb25OYW1lIiwiZnVuYyIsInNwbGl0IiwicmVkdWNlIiwibyIsInRvQ2FtZWxDYXNlIiwic3RyIiwicmVwbGFjZSIsImxldHRlciIsImluZGV4IiwidG9Mb3dlckNhc2UiLCJ0b1VwcGVyQ2FzZSIsImFkZENsYXNzIiwiY2xhc3NlcyIsInNvdXJjZSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRmE7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Q1ZQLE9BREksQ0FDSSxJQURKLEVBQ1UsT0FEVixFQUVKQSxPQUZJLENBRUksSUFGSixFQUVVLFFBRlYsRUFHSkEsT0FISSxDQUdJLElBSEosRUFHVSxPQUhWLEVBSUpBLE9BSkksQ0FJSSxJQUpKLEVBSVUsTUFKVixFQUtKQSxPQUxJLENBS0ksSUFMSixFQUtVLE1BTFYsQ0FBUDtBQU1ELENBWE0iLCJmaWxlIjoiQWpheGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIkFqYXhhYmxlXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkFqYXhhYmxlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkFqYXhhYmxlXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuICAsIHByZWZpeCA9ICd+JztcblxuLyoqXG4gKiBDb25zdHJ1Y3RvciB0byBjcmVhdGUgYSBzdG9yYWdlIGZvciBvdXIgYEVFYCBvYmplY3RzLlxuICogQW4gYEV2ZW50c2AgaW5zdGFuY2UgaXMgYSBwbGFpbiBvYmplY3Qgd2hvc2UgcHJvcGVydGllcyBhcmUgZXZlbnQgbmFtZXMuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBFdmVudHMoKSB7fVxuXG4vL1xuLy8gV2UgdHJ5IHRvIG5vdCBpbmhlcml0IGZyb20gYE9iamVjdC5wcm90b3R5cGVgLiBJbiBzb21lIGVuZ2luZXMgY3JlYXRpbmcgYW5cbi8vIGluc3RhbmNlIGluIHRoaXMgd2F5IGlzIGZhc3RlciB0aGFuIGNhbGxpbmcgYE9iamVjdC5jcmVhdGUobnVsbClgIGRpcmVjdGx5LlxuLy8gSWYgYE9iamVjdC5jcmVhdGUobnVsbClgIGlzIG5vdCBzdXBwb3J0ZWQgd2UgcHJlZml4IHRoZSBldmVudCBuYW1lcyB3aXRoIGFcbi8vIGNoYXJhY3RlciB0byBtYWtlIHN1cmUgdGhhdCB0aGUgYnVpbHQtaW4gb2JqZWN0IHByb3BlcnRpZXMgYXJlIG5vdFxuLy8gb3ZlcnJpZGRlbiBvciB1c2VkIGFzIGFuIGF0dGFjayB2ZWN0b3IuXG4vL1xuaWYgKE9iamVjdC5jcmVhdGUpIHtcbiAgRXZlbnRzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgLy9cbiAgLy8gVGhpcyBoYWNrIGlzIG5lZWRlZCBiZWNhdXNlIHRoZSBgX19wcm90b19fYCBwcm9wZXJ0eSBpcyBzdGlsbCBpbmhlcml0ZWQgaW5cbiAgLy8gc29tZSBvbGQgYnJvd3NlcnMgbGlrZSBBbmRyb2lkIDQsIGlQaG9uZSA1LjEsIE9wZXJhIDExIGFuZCBTYWZhcmkgNS5cbiAgLy9cbiAgaWYgKCFuZXcgRXZlbnRzKCkuX19wcm90b19fKSBwcmVmaXggPSBmYWxzZTtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRhdGlvbiBvZiBhIHNpbmdsZSBldmVudCBsaXN0ZW5lci5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHBhcmFtIHtCb29sZWFufSBbb25jZT1mYWxzZV0gU3BlY2lmeSBpZiB0aGUgbGlzdGVuZXIgaXMgYSBvbmUtdGltZSBsaXN0ZW5lci5cbiAqIEBjb25zdHJ1Y3RvclxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gRUUoZm4sIGNvbnRleHQsIG9uY2UpIHtcbiAgdGhpcy5mbiA9IGZuO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB0aGlzLm9uY2UgPSBvbmNlIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIEFkZCBhIGxpc3RlbmVyIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7RXZlbnRFbWl0dGVyfSBlbWl0dGVyIFJlZmVyZW5jZSB0byB0aGUgYEV2ZW50RW1pdHRlcmAgaW5zdGFuY2UuXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHBhcmFtIHtCb29sZWFufSBvbmNlIFNwZWNpZnkgaWYgdGhlIGxpc3RlbmVyIGlzIGEgb25lLXRpbWUgbGlzdGVuZXIuXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gYWRkTGlzdGVuZXIoZW1pdHRlciwgZXZlbnQsIGZuLCBjb250ZXh0LCBvbmNlKSB7XG4gIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICB2YXIgbGlzdGVuZXIgPSBuZXcgRUUoZm4sIGNvbnRleHQgfHwgZW1pdHRlciwgb25jZSlcbiAgICAsIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG5cbiAgaWYgKCFlbWl0dGVyLl9ldmVudHNbZXZ0XSkgZW1pdHRlci5fZXZlbnRzW2V2dF0gPSBsaXN0ZW5lciwgZW1pdHRlci5fZXZlbnRzQ291bnQrKztcbiAgZWxzZSBpZiAoIWVtaXR0ZXIuX2V2ZW50c1tldnRdLmZuKSBlbWl0dGVyLl9ldmVudHNbZXZ0XS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZSBlbWl0dGVyLl9ldmVudHNbZXZ0XSA9IFtlbWl0dGVyLl9ldmVudHNbZXZ0XSwgbGlzdGVuZXJdO1xuXG4gIHJldHVybiBlbWl0dGVyO1xufVxuXG4vKipcbiAqIENsZWFyIGV2ZW50IGJ5IG5hbWUuXG4gKlxuICogQHBhcmFtIHtFdmVudEVtaXR0ZXJ9IGVtaXR0ZXIgUmVmZXJlbmNlIHRvIHRoZSBgRXZlbnRFbWl0dGVyYCBpbnN0YW5jZS5cbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldnQgVGhlIEV2ZW50IG5hbWUuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjbGVhckV2ZW50KGVtaXR0ZXIsIGV2dCkge1xuICBpZiAoLS1lbWl0dGVyLl9ldmVudHNDb3VudCA9PT0gMCkgZW1pdHRlci5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICBlbHNlIGRlbGV0ZSBlbWl0dGVyLl9ldmVudHNbZXZ0XTtcbn1cblxuLyoqXG4gKiBNaW5pbWFsIGBFdmVudEVtaXR0ZXJgIGludGVyZmFjZSB0aGF0IGlzIG1vbGRlZCBhZ2FpbnN0IHRoZSBOb2RlLmpzXG4gKiBgRXZlbnRFbWl0dGVyYCBpbnRlcmZhY2UuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG59XG5cbi8qKlxuICogUmV0dXJuIGFuIGFycmF5IGxpc3RpbmcgdGhlIGV2ZW50cyBmb3Igd2hpY2ggdGhlIGVtaXR0ZXIgaGFzIHJlZ2lzdGVyZWRcbiAqIGxpc3RlbmVycy5cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHZhciBuYW1lcyA9IFtdXG4gICAgLCBldmVudHNcbiAgICAsIG5hbWU7XG5cbiAgaWYgKHRoaXMuX2V2ZW50c0NvdW50ID09PSAwKSByZXR1cm4gbmFtZXM7XG5cbiAgZm9yIChuYW1lIGluIChldmVudHMgPSB0aGlzLl9ldmVudHMpKSB7XG4gICAgaWYgKGhhcy5jYWxsKGV2ZW50cywgbmFtZSkpIG5hbWVzLnB1c2gocHJlZml4ID8gbmFtZS5zbGljZSgxKSA6IG5hbWUpO1xuICB9XG5cbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICByZXR1cm4gbmFtZXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZXZlbnRzKSk7XG4gIH1cblxuICByZXR1cm4gbmFtZXM7XG59O1xuXG4vKipcbiAqIFJldHVybiB0aGUgbGlzdGVuZXJzIHJlZ2lzdGVyZWQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge0FycmF5fSBUaGUgcmVnaXN0ZXJlZCBsaXN0ZW5lcnMuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKGV2ZW50KSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50XG4gICAgLCBoYW5kbGVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmICghaGFuZGxlcnMpIHJldHVybiBbXTtcbiAgaWYgKGhhbmRsZXJzLmZuKSByZXR1cm4gW2hhbmRsZXJzLmZuXTtcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGhhbmRsZXJzLmxlbmd0aCwgZWUgPSBuZXcgQXJyYXkobCk7IGkgPCBsOyBpKyspIHtcbiAgICBlZVtpXSA9IGhhbmRsZXJzW2ldLmZuO1xuICB9XG5cbiAgcmV0dXJuIGVlO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gdGhlIG51bWJlciBvZiBsaXN0ZW5lcnMgbGlzdGVuaW5nIHRvIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge051bWJlcn0gVGhlIG51bWJlciBvZiBsaXN0ZW5lcnMuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uIGxpc3RlbmVyQ291bnQoZXZlbnQpIHtcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnRcbiAgICAsIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmICghbGlzdGVuZXJzKSByZXR1cm4gMDtcbiAgaWYgKGxpc3RlbmVycy5mbikgcmV0dXJuIDE7XG4gIHJldHVybiBsaXN0ZW5lcnMubGVuZ3RoO1xufTtcblxuLyoqXG4gKiBDYWxscyBlYWNoIG9mIHRoZSBsaXN0ZW5lcnMgcmVnaXN0ZXJlZCBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBldmVudCBoYWQgbGlzdGVuZXJzLCBlbHNlIGBmYWxzZWAuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQoZXZlbnQsIGExLCBhMiwgYTMsIGE0LCBhNSkge1xuICB2YXIgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1tldnRdKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdXG4gICAgLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgLCBhcmdzXG4gICAgLCBpO1xuXG4gIGlmIChsaXN0ZW5lcnMuZm4pIHtcbiAgICBpZiAobGlzdGVuZXJzLm9uY2UpIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVycy5mbiwgdW5kZWZpbmVkLCB0cnVlKTtcblxuICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICBjYXNlIDE6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCksIHRydWU7XG4gICAgICBjYXNlIDI6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEpLCB0cnVlO1xuICAgICAgY2FzZSAzOiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiksIHRydWU7XG4gICAgICBjYXNlIDQ6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMyksIHRydWU7XG4gICAgICBjYXNlIDU6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMywgYTQpLCB0cnVlO1xuICAgICAgY2FzZSA2OiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiwgYTMsIGE0LCBhNSksIHRydWU7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMSwgYXJncyA9IG5ldyBBcnJheShsZW4gLTEpOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIGxpc3RlbmVycy5mbi5hcHBseShsaXN0ZW5lcnMuY29udGV4dCwgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbmd0aCA9IGxpc3RlbmVycy5sZW5ndGhcbiAgICAgICwgajtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGxpc3RlbmVyc1tpXS5vbmNlKSB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcnNbaV0uZm4sIHVuZGVmaW5lZCwgdHJ1ZSk7XG5cbiAgICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICAgIGNhc2UgMTogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQpOyBicmVhaztcbiAgICAgICAgY2FzZSAyOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEpOyBicmVhaztcbiAgICAgICAgY2FzZSAzOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEsIGEyKTsgYnJlYWs7XG4gICAgICAgIGNhc2UgNDogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQsIGExLCBhMiwgYTMpOyBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBpZiAoIWFyZ3MpIGZvciAoaiA9IDEsIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0xKTsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgICBhcmdzW2ogLSAxXSA9IGFyZ3VtZW50c1tqXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsaXN0ZW5lcnNbaV0uZm4uYXBwbHkobGlzdGVuZXJzW2ldLmNvbnRleHQsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBBZGQgYSBsaXN0ZW5lciBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IFtjb250ZXh0PXRoaXNdIFRoZSBjb250ZXh0IHRvIGludm9rZSB0aGUgbGlzdGVuZXIgd2l0aC5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IGB0aGlzYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKGV2ZW50LCBmbiwgY29udGV4dCkge1xuICByZXR1cm4gYWRkTGlzdGVuZXIodGhpcywgZXZlbnQsIGZuLCBjb250ZXh0LCBmYWxzZSk7XG59O1xuXG4vKipcbiAqIEFkZCBhIG9uZS10aW1lIGxpc3RlbmVyIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW2NvbnRleHQ9dGhpc10gVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKGV2ZW50LCBmbiwgY29udGV4dCkge1xuICByZXR1cm4gYWRkTGlzdGVuZXIodGhpcywgZXZlbnQsIGZuLCBjb250ZXh0LCB0cnVlKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBsaXN0ZW5lcnMgb2YgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBPbmx5IHJlbW92ZSB0aGUgbGlzdGVuZXJzIHRoYXQgbWF0Y2ggdGhpcyBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBPbmx5IHJlbW92ZSB0aGUgbGlzdGVuZXJzIHRoYXQgaGF2ZSB0aGlzIGNvbnRleHQuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9uY2UgT25seSByZW1vdmUgb25lLXRpbWUgbGlzdGVuZXJzLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGZuLCBjb250ZXh0LCBvbmNlKSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW2V2dF0pIHJldHVybiB0aGlzO1xuICBpZiAoIWZuKSB7XG4gICAgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmIChsaXN0ZW5lcnMuZm4pIHtcbiAgICBpZiAoXG4gICAgICBsaXN0ZW5lcnMuZm4gPT09IGZuICYmXG4gICAgICAoIW9uY2UgfHwgbGlzdGVuZXJzLm9uY2UpICYmXG4gICAgICAoIWNvbnRleHQgfHwgbGlzdGVuZXJzLmNvbnRleHQgPT09IGNvbnRleHQpXG4gICAgKSB7XG4gICAgICBjbGVhckV2ZW50KHRoaXMsIGV2dCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvciAodmFyIGkgPSAwLCBldmVudHMgPSBbXSwgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGxpc3RlbmVyc1tpXS5mbiAhPT0gZm4gfHxcbiAgICAgICAgKG9uY2UgJiYgIWxpc3RlbmVyc1tpXS5vbmNlKSB8fFxuICAgICAgICAoY29udGV4dCAmJiBsaXN0ZW5lcnNbaV0uY29udGV4dCAhPT0gY29udGV4dClcbiAgICAgICkge1xuICAgICAgICBldmVudHMucHVzaChsaXN0ZW5lcnNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vXG4gICAgLy8gUmVzZXQgdGhlIGFycmF5LCBvciByZW1vdmUgaXQgY29tcGxldGVseSBpZiB3ZSBoYXZlIG5vIG1vcmUgbGlzdGVuZXJzLlxuICAgIC8vXG4gICAgaWYgKGV2ZW50cy5sZW5ndGgpIHRoaXMuX2V2ZW50c1tldnRdID0gZXZlbnRzLmxlbmd0aCA9PT0gMSA/IGV2ZW50c1swXSA6IGV2ZW50cztcbiAgICBlbHNlIGNsZWFyRXZlbnQodGhpcywgZXZ0KTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYWxsIGxpc3RlbmVycywgb3IgdGhvc2Ugb2YgdGhlIHNwZWNpZmllZCBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gW2V2ZW50XSBUaGUgZXZlbnQgbmFtZS5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IGB0aGlzYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnMoZXZlbnQpIHtcbiAgdmFyIGV2dDtcblxuICBpZiAoZXZlbnQpIHtcbiAgICBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuICAgIGlmICh0aGlzLl9ldmVudHNbZXZ0XSkgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuX2V2ZW50cyA9IG5ldyBFdmVudHMoKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vXG4vLyBBbGlhcyBtZXRob2RzIG5hbWVzIGJlY2F1c2UgcGVvcGxlIHJvbGwgbGlrZSB0aGF0LlxuLy9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uO1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBwcmVmaXguXG4vL1xuRXZlbnRFbWl0dGVyLnByZWZpeGVkID0gcHJlZml4O1xuXG4vL1xuLy8gQWxsb3cgYEV2ZW50RW1pdHRlcmAgdG8gYmUgaW1wb3J0ZWQgYXMgbW9kdWxlIG5hbWVzcGFjZS5cbi8vXG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBtb2R1bGUuXG4vL1xuaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgbW9kdWxlKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xufVxuIiwiaW1wb3J0IE5vdGlmaWNhdGlvbkJhc2UgZnJvbSAnLi9Ob3RpZmljYXRpb25CYXNlJztcclxuaW1wb3J0IHsgYWRkQ2xhc3MsIGVzY2FwZUh0bWwgfSBmcm9tICcuLi8uLi91dGlscyc7XHJcblxyXG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcclxuICBjb250YWluZXI6IGRvY3VtZW50LmJvZHksXHJcbiAgZXNjYXBlSHRtbDogdHJ1ZSxcclxuICBuZXdlc3RPblRvcDogdHJ1ZSxcclxuICBjbG9zZUJ1dHRvbjogdHJ1ZVxyXG59O1xyXG5cclxuY2xhc3MgQWxlcnROb3RpZnkgZXh0ZW5kcyBOb3RpZmljYXRpb25CYXNlIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBkZWZhdWx0T3B0aW9ucztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3cgYWN0dWFsIG5vdGlmaWNhdGlvblxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsqfSB0aXRsZVxyXG4gICAqIEBwYXJhbSB7Kn0gbWVzc2FnZVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbdHlwZT0nc3VjY2VzcyddXHJcbiAgICogQG1lbWJlcm9mIEFsZXJ0Tm90aWZ5XHJcbiAgICovXHJcbiAgbm90aWZ5KHRpdGxlLCBtZXNzYWdlLCB0eXBlID0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICBjb25zdCBhbGVydEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IHRpdGxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0cm9uZycpO1xyXG4gICAgY29uc3QgbWVzc2FnZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcblxyXG4gICAgYWRkQ2xhc3MoYWxlcnRFbGVtZW50LCBgYWxlcnQgYWxlcnQtJHt0eXBlfWApO1xyXG5cclxuICAgIGlmICh0aXRsZSkge1xyXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmVzY2FwZUh0bWwpIHtcclxuICAgICAgICB0aXRsZSA9IGVzY2FwZUh0bWwodGl0bGUpO1xyXG4gICAgICB9XHJcbiAgICAgIGFkZENsYXNzKHRpdGxlRWxlbWVudCwgdGhpcy5vcHRpb25zLnRpdGxlQ2xhc3MpO1xyXG4gICAgICB0aXRsZUVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCB0aXRsZSk7XHJcbiAgICAgIGFsZXJ0RWxlbWVudC5hcHBlbmRDaGlsZCh0aXRsZUVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChtZXNzYWdlKSB7XHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZXNjYXBlSHRtbCkge1xyXG4gICAgICAgIG1lc3NhZ2UgPSBlc2NhcGVIdG1sKG1lc3NhZ2UpO1xyXG4gICAgICB9XHJcbiAgICAgIGFkZENsYXNzKG1lc3NhZ2VFbGVtZW50LCB0aGlzLm9wdGlvbnMubWVzc2FnZUNsYXNzKTtcclxuICAgICAgbWVzc2FnZUVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBtZXNzYWdlKTtcclxuICAgICAgYWxlcnRFbGVtZW50LmFwcGVuZENoaWxkKG1lc3NhZ2VFbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmNsb3NlQnV0dG9uKSB7XHJcbiAgICAgIGNvbnN0IGNsb3NlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHJcbiAgICAgIGNsb3NlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ2Nsb3NlJyk7XHJcbiAgICAgIGNsb3NlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjbG9zZScpO1xyXG4gICAgICBjbG9zZUVsZW1lbnQuaW5uZXJIVE1MID0gJyZ0aW1lczsnO1xyXG4gICAgICBhZGRDbGFzcyhjbG9zZUVsZW1lbnQsIHRoaXMub3B0aW9ucy5jbG9zZUNsYXNzKTtcclxuICAgICAgYWxlcnRFbGVtZW50Lmluc2VydEJlZm9yZShjbG9zZUVsZW1lbnQsIGFsZXJ0RWxlbWVudC5maXJzdENoaWxkKTtcclxuXHJcbiAgICAgIGNsb3NlRWxlbWVudC5vbmNsaWNrID0gKCkgPT4gYWxlcnRFbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLm9wdGlvbnMubmV3ZXN0T25Ub3ApIHtcclxuICAgICAgdGhpcy5vcHRpb25zLmNvbnRhaW5lci5pbnNlcnRCZWZvcmUoYWxlcnRFbGVtZW50LCB0aGlzLm9wdGlvbnMuY29udGFpbmVyLmZpcnN0Q2hpbGQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5vcHRpb25zLmNvbnRhaW5lci5hcHBlbmRDaGlsZChhbGVydEVsZW1lbnQpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmV3IEFsZXJ0Tm90aWZ5KCk7XHJcbiIsImltcG9ydCB7IGV4dGVuZCB9IGZyb20gJy4uLy4uL3V0aWxzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vdGlmaWNhdGlvbkJhc2Uge1xyXG5cclxuICAvKipcclxuICAgKiBTZXQgb3B0aW9uc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHsqfSBvcHRpb25zXHJcbiAgICogQG1lbWJlcm9mIE5vdGlmaWNhdGlvbkJhc2VcclxuICAgKi9cclxuICBzZXRPcHRpb25zKG9wdGlvbnMpIHtcclxuICAgIHRoaXMub3B0aW9ucyA9ICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ29iamVjdCcpID8gZXh0ZW5kKHRoaXMub3B0aW9ucywgb3B0aW9ucykgOiB0aGlzLm9wdGlvbnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTaG93IHN1Y2Nlc3Mgbm90aWZpY2F0aW9uXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyp9IG1lc3NhZ2VcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3RpdGxlPSdTdWNjZXNzISddXHJcbiAgICogQG1lbWJlcm9mIFN3YWxOb3RpZnlcclxuICAgKi9cclxuICBzdWNjZXNzKG1lc3NhZ2UsIHRpdGxlID0gJ1N1Y2Nlc3MhJykge1xyXG4gICAgdGhpcy5ub3RpZnkodGl0bGUsIG1lc3NhZ2UsICdzdWNjZXNzJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTaG93IGVycm9yIG5vdGlmaWNhdGlvblxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsqfSBtZXNzYWdlXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IFt0aXRsZT0nRXJyb3IhJ11cclxuICAgKiBAbWVtYmVyb2YgU3dhbE5vdGlmeVxyXG4gICAqL1xyXG4gIGVycm9yKG1lc3NhZ2UsIHRpdGxlID0gJ0Vycm9yIScpIHtcclxuICAgIHRoaXMubm90aWZ5KHRpdGxlLCBtZXNzYWdlLCAnZXJyb3InKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3cgaW5mbyBub3RpZmljYXRpb25cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Kn0gbWVzc2FnZVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbdGl0bGU9J0luZm8hJ11cclxuICAgKiBAbWVtYmVyb2YgU3dhbE5vdGlmeVxyXG4gICAqL1xyXG4gIGluZm8obWVzc2FnZSwgdGl0bGUgPSAnSW5mbyEnKSB7XHJcbiAgICB0aGlzLm5vdGlmeSh0aXRsZSwgbWVzc2FnZSwgJ2luZm8nKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3cgd2FybmluZyBub3RpZmljYXRpb25cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Kn0gbWVzc2FnZVxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbdGl0bGU9J1dhcm5pbmchJ11cclxuICAgKiBAbWVtYmVyb2YgU3dhbE5vdGlmeVxyXG4gICAqL1xyXG4gIHdhcm5pbmcobWVzc2FnZSwgdGl0bGUgPSAnV2FybmluZyEnKSB7XHJcbiAgICB0aGlzLm5vdGlmeSh0aXRsZSwgbWVzc2FnZSwgJ3dhcm5pbmcnKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IE5vdGlmaWNhdGlvbkJhc2UgZnJvbSAnLi9Ob3RpZmljYXRpb25CYXNlJztcclxuXHJcbmNvbnN0IHN3YWwgPSB3aW5kb3cuc3dhbDtcclxuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7fTtcclxuXHJcbi8qKlxyXG4gKiBTd2FsTm90aWZ5IGNsYXNzIGZvciBzd2VldCBhbGVydCBtZXNzYWdlc1xyXG4gKlxyXG4gKiBAZXhwb3J0XHJcbiAqIEBjbGFzcyBTd2FsTm90aWZ5XHJcbiAqL1xyXG5jbGFzcyBTd2FsTm90aWZ5IGV4dGVuZHMgTm90aWZpY2F0aW9uQmFzZSB7XHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTd2FsTm90aWZ5LlxyXG4gICAqIEBtZW1iZXJvZiBTd2FsTm90aWZ5XHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5vcHRpb25zID0gZGVmYXVsdE9wdGlvbnM7XHJcbiAgICB0aGlzLnN3YWwgPSBzd2FsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2hvdyBhY3R1YWwgbm90aWZpY2F0aW9uXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyp9IHRpdGxlXHJcbiAgICogQHBhcmFtIHsqfSBtZXNzYWdlXHJcbiAgICogQHBhcmFtIHsqfSB0eXBlXHJcbiAgICogQG1lbWJlcm9mIFN3YWxOb3RpZnlcclxuICAgKi9cclxuICBub3RpZnkodGl0bGUsIG1lc3NhZ2UsIHR5cGUpIHtcclxuICAgIGlmICh0eXBlb2YgdGhpcy5zd2FsICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG5lZWQgdG8gaW5jbHVkZSBzd2FsIGxpYnJhcnkgaW4geW91ciB3ZWJwYWdlJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnN3YWwodGl0bGUsIG1lc3NhZ2UsIHR5cGUpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmV3IFN3YWxOb3RpZnkoKTtcclxuXHJcbiIsImltcG9ydCBOb3RpZmljYXRpb25CYXNlIGZyb20gJy4vTm90aWZpY2F0aW9uQmFzZSc7XHJcblxyXG5jb25zdCB0b2FzdHIgPSB3aW5kb3cudG9hc3RyO1xyXG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHt9O1xyXG5cclxuLyoqXHJcbiAqIFRvYXN0ck5vdGlmeSBjbGFzcyBmb3Igc3dlZXQgYWxlcnQgbWVzc2FnZXNcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgVG9hc3RyTm90aWZ5XHJcbiAqL1xyXG5jbGFzcyBUb2FzdHJOb3RpZnkgZXh0ZW5kcyBOb3RpZmljYXRpb25CYXNlIHtcclxuICAvKipcclxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFRvYXN0ck5vdGlmeS5cclxuICAgKiBAbWVtYmVyb2YgVG9hc3RyTm90aWZ5XHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5vcHRpb25zID0gZGVmYXVsdE9wdGlvbnM7XHJcbiAgICB0aGlzLnRvYXN0ciA9IHRvYXN0cjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3cgYWN0dWFsIG5vdGlmaWNhdGlvblxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsqfSB0aXRsZVxyXG4gICAqIEBwYXJhbSB7Kn0gbWVzc2FnZVxyXG4gICAqIEBwYXJhbSB7Kn0gdHlwZVxyXG4gICAqIEBtZW1iZXJvZiBUb2FzdHJOb3RpZnlcclxuICAgKi9cclxuICBub3RpZnkodGl0bGUsIG1lc3NhZ2UsIHR5cGUpIHtcclxuICAgIGlmICh0eXBlb2YgdGhpcy50b2FzdHIgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG5lZWQgdG8gaW5jbHVkZSB0b2FzdHIgbGlicmFyeSBpbiB5b3VyIHdlYnBhZ2UnKTtcclxuICAgIH1cclxuICAgIHRoaXMudG9hc3RyW3R5cGVdKG1lc3NhZ2UsIHRpdGxlKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBUb2FzdHJOb3RpZnkoKTtcclxuIiwiaW1wb3J0IGFsZXJ0Tm90aWZ5IGZyb20gJy4vQWxlcnROb3RpZnknO1xyXG5pbXBvcnQgdG9hc3RyTm90aWZ5IGZyb20gJy4vVG9hc3RyTm90aWZ5JztcclxuaW1wb3J0IHN3YWxOb3RpZnkgZnJvbSAnLi9Td2FsTm90aWZ5JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZU5vdGlmaWVyT2JqZWN0KG9wdGlvbnMpIHtcclxuICBjb25zdCBub3RpZmljYXRpb25UeXBlID0gb3B0aW9ucy5ub3RpZmljYXRpb25UeXBlIHx8ICdhbGVydCc7XHJcbiAgbGV0IGluc3RhbmNlO1xyXG5cclxuICBzd2l0Y2ggKG5vdGlmaWNhdGlvblR5cGUpIHtcclxuICAgIGNhc2UgJ2FsZXJ0JzpcclxuICAgICAgaW5zdGFuY2UgPSBhbGVydE5vdGlmeTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICd0b2FzdHInOlxyXG4gICAgICBpbnN0YW5jZSA9IHRvYXN0ck5vdGlmeTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdzd2FsJzpcclxuICAgICAgaW5zdGFuY2UgPSBzd2FsTm90aWZ5O1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIGluc3RhbmNlID0gYWxlcnROb3RpZnk7XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxuICBpbnN0YW5jZS5zZXRPcHRpb25zKG9wdGlvbnMpO1xyXG4gIHJldHVybiBpbnN0YW5jZTtcclxufVxyXG4iLCIvKiBnbG9iYWxcclxuYWxlcnQsIGNvbmZpcm0sIGNvbnNvbGUsIHByb21wdCwgcmVxdWlyZSwgbW9kdWxlLCBBY3RpdmVYT2JqZWN0XHJcbiovXHJcbmltcG9ydCB7IGV4dGVuZCB9IGZyb20gJy4uL3V0aWxzJztcclxuXHJcbmNvbnN0IEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50ZW1pdHRlcjMnKTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgWEhSIGluc3RhbmNlXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVYSFIoKSB7XHJcbiAgaWYgKHdpbmRvdy5YTUxIdHRwUmVxdWVzdCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICB3aW5kb3cuWE1MSHR0cFJlcXVlc3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgdGhpcy54aHIgPSBuZXcgQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAuNi4wJyk7XHJcbiAgICAgIH0gY2F0Y2ggKGUxKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIHRoaXMueGhyID0gbmV3IEFjdGl2ZVhPYmplY3QoJ014c21sMi5YTUxIVFRQLjMuMCcpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUyKSB7XHJcbiAgICAgICAgICB0aGlzLnhociA9IG5ldyBFcnJvcignQWpheCBub3Qgc3VwcG9ydGVkIGluIHlvdXIgYnJvd3NlcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhpcy54aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQYXJzZSBYSFIgcmVzcG9uc2VcclxuICpcclxuICogQHJldHVybnMgb2JqZWN0XHJcbiAqL1xyXG5mdW5jdGlvbiBwYXJzZVhoclJlc3BvbnNlKCkge1xyXG4gIGxldCByZXN1bHQ7XHJcblxyXG4gIHRyeSB7XHJcbiAgICByZXN1bHQgPSBKU09OLnBhcnNlKHRoaXMueGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgcmVzdWx0ID0gdGhpcy54aHIucmVzcG9uc2VUZXh0O1xyXG4gIH1cclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IGFqYXggY29udGVudCB0eXBlXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZSgpIHtcclxuICBpZiAodGhpcy5vcHRpb25zLmFqYXhDb250ZW50VHlwZSkge1xyXG4gICAgdGhpcy54aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgdGhpcy5vcHRpb25zLmFqYXhDb250ZW50VHlwZSk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogU2V0IHJlcXVlc3QgaGVhZGVyc1xyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcnMoKSB7XHJcbiAgbGV0IGk7XHJcbiAgbGV0IGhlYWRlck5hbWU7XHJcbiAgbGV0IGhlYWRlclZhbHVlO1xyXG5cclxuICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5hamF4UmVxdWVzdEhlYWRlcnMgPT09ICdvYmplY3QnKSB7XHJcbiAgICBmb3IgKGkgaW4gdGhpcy5vcHRpb25zLmFqYXhSZXF1ZXN0SGVhZGVycykge1xyXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmFqYXhSZXF1ZXN0SGVhZGVycy5oYXNPd25Qcm9wZXJ0eShpKSkge1xyXG4gICAgICAgIGhlYWRlck5hbWUgPSBpO1xyXG4gICAgICAgIGhlYWRlclZhbHVlID0gKHR5cGVvZiB0aGlzLm9wdGlvbnMuYWpheFJlcXVlc3RIZWFkZXJzW2ldID09PSAnc3RyaW5nJykgP1xyXG4gICAgICAgICAgdGhpcy5vcHRpb25zLmFqYXhSZXF1ZXN0SGVhZGVyc1tpXSA6XHJcbiAgICAgICAgICAnJztcclxuICAgICAgICB0aGlzLnhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlck5hbWUsIGhlYWRlclZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFNldHVwIFhIUiBvbkFib3J0IG9wdGlvblxyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gc2V0dXBYSFJPbkFib3J0KCkge1xyXG4gIHRoaXMueGhyLm9uYWJvcnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmVtaXQoJ29uQWJvcnQnLCB0aGlzLnhocik7XHJcbiAgfS5iaW5kKHRoaXMpO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0dXAgWEhSIG9uVGltZW91dFxyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gc2V0dXBYSFJPblRpbWVvdXQoKSB7XHJcbiAgaWYgKHRoaXMub3B0aW9ucy5hamF4VGltZW91dCkge1xyXG4gICAgdGhpcy54aHIudGltZW91dCA9IHRoaXMub3B0aW9ucy5hamF4VGltZW91dDtcclxuICB9XHJcbiAgdGhpcy54aHIub25hYm9ydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZW1pdCgnb25UaW1lb3V0JywgdGhpcy54aHIpO1xyXG4gIH0uYmluZCh0aGlzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldHVwIFhIUiBvblJlYWR5U3RhdGVDaGFuZ2VcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIHNldHVwT25SZWFkeVN0YXRlQ2hhbmdlKCkge1xyXG4gIGxldCB4aHJSZXN1bHQ7XHJcblxyXG4gIGlmICh0aGlzLnhoci5yZWFkeVN0YXRlID09PSA0KSB7XHJcbiAgICB4aHJSZXN1bHQgPSBwYXJzZVhoclJlc3BvbnNlLmNhbGwodGhpcyk7XHJcbiAgICBpZiAodGhpcy54aHIuc3RhdHVzID49IDIwMCAmJiB0aGlzLnhoci5zdGF0dXMgPCAzMDApIHtcclxuICAgICAgdGhpcy5lbWl0KCdvblN1Y2Nlc3MnLCB0aGlzLnhociwgeGhyUmVzdWx0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZW1pdCgnb25FcnJvcicsIHRoaXMueGhyLCB4aHJSZXN1bHQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5lbWl0KCdvbkNvbXBsZXRlJywgdGhpcy54aHIsIHhoclJlc3VsdCk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogU2V0dXAgWEhSIHJlYWR5XHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBzZXR1cFhIUlJlYWR5U3RhdGUoKSB7XHJcbiAgdGhpcy54aHIub25yZWFkeXN0YXRlY2hhbmdlID0gc2V0dXBPblJlYWR5U3RhdGVDaGFuZ2UuYmluZCh0aGlzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFVwZGF0ZSBYSFIgb3B0aW9uc1xyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gdXBkYXRlWEhST3B0aW9ucygpIHtcclxuICBzZXR1cFhIUk9uQWJvcnQuY2FsbCh0aGlzKTtcclxuICBzZXR1cFhIUk9uVGltZW91dC5jYWxsKHRoaXMpO1xyXG4gIHNldHVwWEhSUmVhZHlTdGF0ZS5jYWxsKHRoaXMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFqYXggY2xhc3NcclxuICpcclxuICogQGV4cG9ydFxyXG4gKiBAY2xhc3MgQWpheFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWpheCB7XHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBBamF4LlxyXG4gICAqIEBwYXJhbSB7Kn0gb3B0aW9uc1xyXG4gICAqIEBtZW1iZXJvZiBBamF4XHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuICAgIHRoaXMueGhyID0gbnVsbDtcclxuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBjcmVhdGVYSFIuY2FsbCh0aGlzKTtcclxuICAgIHVwZGF0ZVhIUk9wdGlvbnMuY2FsbCh0aGlzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpcmUgYWN0dWFsIGFqYXggcmVxdWVzdFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsqfSBkYXRhXHJcbiAgICogQG1lbWJlcm9mIEFqYXhcclxuICAgKi9cclxuICBkb1JlcXVlc3QoZGF0YSkge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hamF4VXJsID09PSBmYWxzZSB8fCB0eXBlb2YgdGhpcy5vcHRpb25zLmFqYXhVcmwgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBBamF4IFVSTCcpO1xyXG4gICAgfVxyXG4gICAgdGhpcy54aHIub3BlbihcclxuICAgICAgdGhpcy5vcHRpb25zLmFqYXhNZXRob2QsXHJcbiAgICAgIHRoaXMub3B0aW9ucy5hamF4VXJsLFxyXG4gICAgICB0aGlzLm9wdGlvbnMuYWpheEFzeW5jLFxyXG4gICAgICB0aGlzLm9wdGlvbnMuYWpheFVzZXJOYW1lLFxyXG4gICAgICB0aGlzLm9wdGlvbnMuYWpheFBhc3N3b3JkXHJcbiAgICApO1xyXG4gICAgc2V0Q29udGVudFR5cGUuY2FsbCh0aGlzKTtcclxuICAgIHNldFJlcXVlc3RIZWFkZXJzLmNhbGwodGhpcyk7XHJcbiAgICB0aGlzLnhoci5zZW5kKGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IGFqYXggb3B0aW9ucyBmcm9tIG91dHNpZGVcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Kn0gb3B0c1xyXG4gICAqIEByZXR1cm5zXHJcbiAgICogQG1lbWJlcm9mIEFqYXhcclxuICAgKi9cclxuICBzZXRPcHRpb25zKG9wdHMpIHtcclxuICAgIHRoaXMub3B0aW9ucyA9IGV4dGVuZCh0aGlzLm9wdGlvbnMsIG9wdHMpO1xyXG4gICAgdXBkYXRlWEhST3B0aW9ucy5jYWxsKHRoaXMpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBMaXN0ZW4gZXZlbnRzIG9uIHRoZSBjbGFzc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHsqfSBldmVudFxyXG4gICAqIEBwYXJhbSB7Kn0gaGFuZGxlclxyXG4gICAqIEBwYXJhbSB7Kn0gY29udGV4dFxyXG4gICAqIEBtZW1iZXJvZiBBamF4XHJcbiAgICovXHJcbiAgb24oZXZlbnQsIGhhbmRsZXIsIGNvbnRleHQpIHtcclxuICAgIHRoaXMuZW1pdHRlci5vbihldmVudCwgaGFuZGxlciwgY29udGV4dCB8fCB1bmRlZmluZWQpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ha2UgdGhlIGNsYXNzIGFuIGV2ZW50IGVtaXR0ZXJcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Kn0gZXZlbnRcclxuICAgKiBAcGFyYW0geyp9IGExXHJcbiAgICogQHBhcmFtIHsqfSBhMlxyXG4gICAqIEBwYXJhbSB7Kn0gYTNcclxuICAgKiBAcGFyYW0geyp9IGE0XHJcbiAgICogQHBhcmFtIHsqfSBhNVxyXG4gICAqIEBtZW1iZXJvZiBBamF4XHJcbiAgICovXHJcbiAgZW1pdChldmVudCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7XHJcbiAgICB0aGlzLmVtaXR0ZXIuZW1pdChldmVudCwgYTEsIGEyLCBhMywgYTQsIGE1KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IEFqYXggZnJvbSAnLi9BamF4JztcclxuaW1wb3J0IFJlc3BvbnNlSGFuZGxlciBmcm9tICcuL1Jlc3BvbnNlSGFuZGxlcic7XHJcbmltcG9ydCBkZWZhdWx0T3B0aW9ucyBmcm9tICcuL2VsZW1lbnRPcHRzJztcclxuaW1wb3J0IHsgdG9DYW1lbENhc2UsIGV4dGVuZCB9IGZyb20gJy4uL3V0aWxzJztcclxuXHJcbmNvbnN0IEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50ZW1pdHRlcjMnKTtcclxuXHJcbi8qKlxyXG4gKiBCaW5kIFhIUiBldmVudHNcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIGJpbmRYaHJFdmVudHMoKSB7XHJcbiAgdGhpcy5hamF4Lm9uKCdvblN1Y2Nlc3MnLCAoeCwgcikgPT4gdGhpcy5lbWl0KCdhamF4YWJsZTpvbi1hamF4LXN1Y2Nlc3MnLCB4LCByKSwgdGhpcyk7XHJcbiAgdGhpcy5hamF4Lm9uKCdvbkVycm9yJywgKHgsIHIpID0+IHRoaXMuZW1pdCgnYWpheGFibGU6b24tYWpheC1lcnJvcicsIHgsIHIpLCB0aGlzKTtcclxuICB0aGlzLmFqYXgub24oJ29uQ29tcGxldGUnLCAoeCwgcikgPT4gdGhpcy5lbWl0KCdhamF4YWJsZTpvbi1hamF4LWNvbXBsZXRlJywgeCwgciksIHRoaXMpO1xyXG4gIHRoaXMuYWpheC5vbignb25BYm9ydCcsICh4LCByKSA9PiB0aGlzLmVtaXQoJ2FqYXhhYmxlOm9uLWFqYXgtYWJvcnQnLCB4LCByKSwgdGhpcyk7XHJcbiAgdGhpcy5hamF4Lm9uKCdvblRpbWVvdXQnLCAoeCwgcikgPT4gdGhpcy5lbWl0KCdhamF4YWJsZTpvbi1hamF4LXRpbWVvdXQnLCB4LCByKSwgdGhpcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBCaW5kIGNsYXNzIGFqYXggZXZlbnRzXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBiaW5kQ2xhc3NFdmVudHMoKSB7XHJcbiAgY29uc3QgcmVzSGFuZGxyID0gdGhpcy5yZXNwb25zZUhhbmRsZXI7XHJcblxyXG4gIHRoaXMub24oJ2FqYXhhYmxlOm9uLWFqYXgtYmVmb3JlJywgcmVzSGFuZGxyLmJlZm9yZVNlbmQuYmluZChyZXNIYW5kbHIpLCB0aGlzKTtcclxuICB0aGlzLm9uKCdhamF4YWJsZTpvbi1hamF4LXN1Y2Nlc3MnLCByZXNIYW5kbHIub25TdWNjZXNzLmJpbmQocmVzSGFuZGxyKSwgdGhpcyk7XHJcbiAgdGhpcy5vbignYWpheGFibGU6b24tYWpheC1lcnJvcicsIHJlc0hhbmRsci5vbkVycm9yLmJpbmQocmVzSGFuZGxyKSwgdGhpcyk7XHJcbiAgdGhpcy5vbignYWpheGFibGU6b24tYWpheC1jb21wbGV0ZScsIHJlc0hhbmRsci5vbkNvbXBsZXRlLmJpbmQocmVzSGFuZGxyKSwgdGhpcyk7XHJcbiAgdGhpcy5vbignYWpheGFibGU6b24tYWpheC1hYm9ydCcsIHJlc0hhbmRsci5vbkFib3J0LmJpbmQocmVzSGFuZGxyKSwgdGhpcyk7XHJcbiAgdGhpcy5vbignYWpheGFibGU6b24tYWpheC10aW1lb3V0JywgcmVzSGFuZGxyLm9uVGltZW91dC5iaW5kKHJlc0hhbmRsciksIHRoaXMpO1xyXG59XHJcblxyXG4vKipcclxuICogQmluZCBlbGVtZW50IGRvbSBldmVudHNcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIGJpbmRFbGVtZW50RXZlbnRzKCkge1xyXG4gIGNvbnN0IGN0eCA9IHRoaXM7XHJcbiAgY29uc3QgZWxlbWVudCA9IHRoaXMuZWxlbWVudDtcclxuXHJcbiAgLy8gRmlyZSBhamF4IGFmdGVyIGNlcnRhaW4gdGltZVxyXG4gIGNvbnN0IGJpbmRUaW1lZEFqYXggPSAoKSA9PiB7XHJcbiAgICBjdHgucmVxdWVzdFRpbWVySWQgPSBzZXRUaW1lb3V0KCgoKSA9PlxyXG4gICAgICB0aGlzLnN0YXJ0QWpheFJlcXVlc3QoKSksIGN0eC5vcHRpb25zLnJlcXVlc3RUaW1lb3V0KTtcclxuICB9O1xyXG5cclxuICAvLyBGaXJlIGFqYXggb24gcGFydGljdWxhciBpbnRlcnZhbFxyXG4gIGNvbnN0IGJpbmRJbnRlcnZhbEFqYXggPSAoKSA9PiB7XHJcbiAgICBjdHgucmVxdWVzdEludGVydmFsSWQgPSBzZXRJbnRlcnZhbCgoKCkgPT5cclxuICAgICAgdGhpcy5zdGFydEFqYXhSZXF1ZXN0KCkpLCBjdHgub3B0aW9ucy5yZXF1ZXN0SW50ZXJ2YWwpO1xyXG4gIH07XHJcblxyXG4gIC8vIEZpcmUgYWpheCBvbiBjbGlja1xyXG4gIGNvbnN0IGJpbmRDbGlja0FqYXggPSAoKSA9PiB7XHJcbiAgICBjdHguY2xpY2tBamF4SGFuZGxlciA9ICgoZXZlbnQpID0+IHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY3R4LnN0YXJ0QWpheFJlcXVlc3QoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjdHguY2xpY2tBamF4SGFuZGxlciwgZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gIC8vIEZpcmUgYWpheCBvbiBob3ZlclxyXG4gIGNvbnN0IGJpbmRIb3ZlckFqYXggPSAoKSA9PiB7XHJcbiAgICBjdHguaG92ZXJBamF4SGFuZGxlciA9ICgoZXZlbnQpID0+IHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY3R4LnN0YXJ0QWpheFJlcXVlc3QoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaG92ZXInLCBjdHguaG92ZXJBamF4SGFuZGxlciwgZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gIC8vIEZpcmUgYWpheCBvbiBzdWJtaXRcclxuICBjb25zdCBiaW5kU3VibWl0QWpheCA9ICgpID0+IHtcclxuICAgIGN0eC5zdWJtaXRBamF4SGFuZGxlciA9ICgoZXZlbnQpID0+IHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY3R4LnN0YXJ0QWpheFJlcXVlc3QoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgY3R4LnN1Ym1pdEFqYXhIYW5kbGVyLCBmYWxzZSk7XHJcbiAgfTtcclxuXHJcbiAgaWYgKGVsZW1lbnQubm9kZU5hbWUgPT09ICdGT1JNJykge1xyXG4gICAgYmluZFN1Ym1pdEFqYXgoKTtcclxuICB9XHJcblxyXG4gIHN3aXRjaCAoY3R4Lm9wdGlvbnMudHJpZ2dlclR5cGUpIHtcclxuICAgIGNhc2UgJ3RpbWVvdXQnOlxyXG4gICAgICBiaW5kVGltZWRBamF4KCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnaW50ZXJ2YWwnOlxyXG4gICAgICBiaW5kSW50ZXJ2YWxBamF4KCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnY2xpY2snOlxyXG4gICAgICBiaW5kQ2xpY2tBamF4KCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnaG92ZXInOlxyXG4gICAgICBiaW5kSG92ZXJBamF4KCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogRGV0YWNoIGVsZW1lbnQgZG9tIGV2ZW50c1xyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gZGV0YXRjaEVsZW1lbnRFdmVudHMoKSB7XHJcbiAgY29uc3QgZWxlbWVudCA9IHRoaXMuZWxlbWVudDtcclxuXHJcbiAgaWYgKGVsZW1lbnQubm9kZU5hbWUgPT09ICdGT1JNJykge1xyXG4gICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLnN1Ym1pdEFqYXhIYW5kbGVyKTtcclxuICB9XHJcblxyXG4gIHN3aXRjaCAoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYWpheGFibGUtdHJpZ2dlci10eXBlJykpIHtcclxuICAgIGNhc2UgJ3RpbWVvdXQnOlxyXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5yZXF1ZXN0VGltZXJJZCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnaW50ZXJ2YWwnOlxyXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5yZXF1ZXN0SW50ZXJ2YWxJZCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnY2xpY2snOlxyXG4gICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja0FqYXhIYW5kbGVyKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdob3Zlcic6XHJcbiAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhvdmVyQWpheEhhbmRsZXIpO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFVwZGF0ZSBlbGVtZW50IGF0dHJpYnV0ZXMgdG8gb3B0aW9uc1xyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gdXBkYXRlRWxlbWVudEF0dHJpYnV0ZXNUb09wdGlvbnMoKSB7XHJcbiAgbGV0IGF0dHJpYnV0ZTtcclxuICBsZXQgaTtcclxuICBjb25zdCBlbGVtZW50ID0gdGhpcy5lbGVtZW50O1xyXG4gIGNvbnN0IGF0dHJzID0gZWxlbWVudC5hdHRyaWJ1dGVzO1xyXG4gIGNvbnN0IGxlbmd0aCA9IGF0dHJzLmxlbmd0aDtcclxuXHJcbiAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSA9IGkgKyAxKSB7XHJcbiAgICBhdHRyaWJ1dGUgPSBhdHRyc1tpXTtcclxuICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zW3RvQ2FtZWxDYXNlKGF0dHJpYnV0ZS5ub2RlTmFtZSldICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICB0aGlzLm9wdGlvbnNbdG9DYW1lbENhc2UoYXR0cmlidXRlLm5vZGVOYW1lKV0gPSBhdHRyaWJ1dGUubm9kZVZhbHVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSkge1xyXG4gICAgdGhpcy5vcHRpb25zWydhamF4VXJsJ10gPSB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCdocmVmJyk7XHJcbiAgfSBlbHNlIGlmICh0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCdhY3Rpb24nKSkge1xyXG4gICAgdGhpcy5vcHRpb25zWydhamF4VXJsJ10gPSB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCdhY3Rpb24nKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQcmVwYXJlIGFqYXggcmVxdWVzdCBkYXRhIGJlZm9yZSBzZW5kXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBwcmVwYXJlQWpheFJlcXVlc3REYXRhKCkge1xyXG4gIHRoaXMuZW1pdCgnYWpheGFibGU6b24tYWpheC1iZWZvcmUnLCB0aGlzLm9wdGlvbnMuYWpheERhdGEpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbGVtZW50IHtcclxuICAvKipcclxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEVsZW1lbnQuXHJcbiAgICogQHBhcmFtIHsqfSBlbGVtZW50XHJcbiAgICogQHBhcmFtIHsqfSBvcHRpb25zXHJcbiAgICogQG1lbWJlcm9mIEVsZW1lbnRcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBvcHRpb25zKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgdGhpcy5vcHRpb25zID0gKHR5cGVvZiBvcHRpb25zID09PSAnb2JqZWN0JykgPyBleHRlbmQoZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpIDogZGVmYXVsdE9wdGlvbnM7XHJcbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB0aGlzLmFqYXggPSBuZXcgQWpheCh0aGlzLm9wdGlvbnMpO1xyXG4gICAgdGhpcy5yZXNwb25zZUhhbmRsZXIgPSBuZXcgUmVzcG9uc2VIYW5kbGVyKHRoaXMpO1xyXG5cclxuICAgIGJpbmRYaHJFdmVudHMuY2FsbCh0aGlzKTtcclxuICAgIGJpbmRDbGFzc0V2ZW50cy5jYWxsKHRoaXMpO1xyXG4gICAgYmluZEVsZW1lbnRFdmVudHMuY2FsbCh0aGlzKTtcclxuICAgIHVwZGF0ZUVsZW1lbnRBdHRyaWJ1dGVzVG9PcHRpb25zLmNhbGwodGhpcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydCBhamF4IHJlcXVlc3Qgb24gdGhlIGVsZW1lbnRcclxuICAgKlxyXG4gICAqIEBtZW1iZXJvZiBFbGVtZW50XHJcbiAgICovXHJcbiAgc3RhcnRBamF4UmVxdWVzdCgpIHtcclxuICAgIGNvbnN0IGRhdGEgPSBwcmVwYXJlQWpheFJlcXVlc3REYXRhLmNhbGwodGhpcyk7XHJcblxyXG4gICAgdGhpcy5hamF4LmRvUmVxdWVzdChkYXRhKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlc3Ryb3kgYWpheGFibGUgb24gZWxlbWVudFxyXG4gICAqXHJcbiAgICogQG1lbWJlcm9mIEVsZW1lbnRcclxuICAgKi9cclxuICBkZXN0cm95KCkge1xyXG4gICAgZGV0YXRjaEVsZW1lbnRFdmVudHMuY2FsbCh0aGlzLCB0aGlzLmVsZW1lbnQpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBEb20gZWxlbWVudFxyXG4gICAqXHJcbiAgICogQHJldHVybnNcclxuICAgKiBAbWVtYmVyb2YgRWxlbWVudFxyXG4gICAqL1xyXG4gIGdldERvbUVsZW1lbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IGVsZW1lbnQgb3B0aW9ucyBvbmNlIHRoZSBBamF4YWJsZSBoYXMgYmVlbiBpbnN0YW5pYXRlZFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsqfSBvcHRzXHJcbiAgICogQHJldHVybnNcclxuICAgKiBAbWVtYmVyb2YgRWxlbWVudFxyXG4gICAqL1xyXG4gIHNldE9wdGlvbnMob3B0cykge1xyXG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZWxlbWVudDtcclxuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBlbGVtZW50LmF0dHJpYnV0ZXM7XHJcbiAgICBjb25zdCBhdHRyTGVuZ3RoID0gYXR0cmlidXRlcy5sZW5ndGg7XHJcbiAgICBjb25zdCBlbGVtZW50QXR0cmlidXRlTm9kZXMgPSBbXTtcclxuICAgIGxldCBpO1xyXG4gICAgbGV0IGs7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBvcHRzID09PSAnb2JqZWN0Jykge1xyXG5cclxuICAgICAgZm9yIChpID0gMDsgaSA8IGF0dHJMZW5ndGg7IGkgPSBpICsgMSkge1xyXG4gICAgICAgIGVsZW1lbnRBdHRyaWJ1dGVOb2Rlcy5wdXNoKHRvQ2FtZWxDYXNlKGF0dHJpYnV0ZXNbaV0ubm9kZU5hbWUpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZm9yIChrIGluIG9wdHMpIHtcclxuICAgICAgICBpZiAob3B0cy5oYXNPd25Qcm9wZXJ0eShrKSkge1xyXG4gICAgICAgICAgaWYgKGVsZW1lbnRBdHRyaWJ1dGVOb2Rlcy5pbmRleE9mKGspID4gMCkge1xyXG4gICAgICAgICAgICBkZWxldGUgb3B0c1trXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMub3B0aW9ucyA9ICh0eXBlb2Ygb3B0cyA9PT0gJ29iamVjdCcpID8gZXh0ZW5kKHRoaXMub3B0aW9ucywgb3B0cykgOiB0aGlzLm9wdGlvbnM7XHJcbiAgICBiaW5kQ2xhc3NFdmVudHMuY2FsbCh0aGlzKTtcclxuICAgIHRoaXMuYWpheC5zZXRPcHRpb25zKHRoaXMub3B0aW9ucyk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBCaW5kIGV2ZW50IHRvIEVsZW1lbnRcclxuICAgKlxyXG4gICAqIEBwYXJhbSAge1N0cmluZ30gZXZlbnRcclxuICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG4gICAqIEBwYXJhbSAge09iamVjdH0gY29udGV4dFxyXG4gICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICovXHJcbiAgb24oZXZlbnQsIGhhbmRsZXIsIGNvbnRleHQpIHtcclxuICAgIHRoaXMuZW1pdHRlci5vbihldmVudCwgaGFuZGxlciwgY29udGV4dCB8fCB1bmRlZmluZWQpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEVtaXQgZXZlbnRzIGJpbmQgdG8gRWxlbWVudFxyXG4gICAqXHJcbiAgICogQHBhcmFtICB7U3RyaW5nfSBldmVudFxyXG4gICAqIEBwYXJhbSAge21peGVkfSBhMVxyXG4gICAqIEBwYXJhbSAge21peGVkfSBhMlxyXG4gICAqIEBwYXJhbSAge21peGVkfSBhM1xyXG4gICAqIEBwYXJhbSAge21peGVkfSBhNFxyXG4gICAqIEBwYXJhbSAge21peGVkfSBhNVxyXG4gICAqIEByZXR1cm4geyp9XHJcbiAgICovXHJcbiAgZW1pdChldmVudCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7XHJcbiAgICByZXR1cm4gdGhpcy5lbWl0dGVyLmVtaXQoZXZlbnQsIGExLCBhMiwgYTMsIGE0LCBhNSk7XHJcbiAgfVxyXG59O1xyXG4iLCJpbXBvcnQgY3JlYXRlTm90aWZpZXJPYmplY3QgZnJvbSAnLi4vY29tcG9uZW50cy9ub3RpZmljYXRpb24vbm90aWZpY2F0aW9uRmFjdG9yeSc7XHJcbmltcG9ydCB7IHJlc29sdmVGdW5jdGlvbk5hbWUgfSBmcm9tICcuLi91dGlscyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNwb25zZUhhbmRsZXIge1xyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUmVzcG9uc2VIYW5kbGVyLlxyXG4gICAqIEBwYXJhbSB7Kn0gZWxlbWVudFxyXG4gICAqIEBtZW1iZXJvZiBSZXNwb25zZUhhbmRsZXJcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgdGhpcy5vcHRpb25zID0gZWxlbWVudC5vcHRpb25zO1xyXG4gICAgdGhpcy5ub3RpZmllciA9IGNyZWF0ZU5vdGlmaWVyT2JqZWN0KHRoaXMub3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGUgYWpheCBiZWZvcmVTZW5kXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyp9IGRhdGFUb1NlbmRcclxuICAgKiBAbWVtYmVyb2YgUmVzcG9uc2VIYW5kbGVyXHJcbiAgICovXHJcbiAgYmVmb3JlU2VuZChkYXRhVG9TZW5kKSB7XHJcbiAgICBjb25zdCBoYW5kbGVyID0gcmVzb2x2ZUZ1bmN0aW9uTmFtZSh0aGlzLm9wdGlvbnMuYWpheEJlZm9yZVNlbmQpO1xyXG5cclxuICAgIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICByZXR1cm4gaGFuZGxlci5jYWxsKHRoaXMuZWxlbWVudCwgZGF0YVRvU2VuZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRhdGFUb1NlbmQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGUgYWpheCBvblN1Y2Nlc3NcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Kn0geGhyXHJcbiAgICogQHBhcmFtIHsqfSByZXNwb25zZVxyXG4gICAqIEBtZW1iZXJvZiBSZXNwb25zZUhhbmRsZXJcclxuICAgKi9cclxuICBvblN1Y2Nlc3MoeGhyLCByZXNwb25zZSkge1xyXG4gICAgY29uc3QgaGFuZGxlciA9IHJlc29sdmVGdW5jdGlvbk5hbWUodGhpcy5vcHRpb25zLmFqYXhPblN1Y2Nlc3MpO1xyXG5cclxuICAgIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICBoYW5kbGVyLmNhbGwodGhpcy5lbGVtZW50LCB4aHIsIHJlc3BvbnNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZSBhamF4IG9uRXJyb3JcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Kn0geGhyXHJcbiAgICogQHBhcmFtIHsqfSByZXNwb25zZVxyXG4gICAqIEBtZW1iZXJvZiBSZXNwb25zZUhhbmRsZXJcclxuICAgKi9cclxuICBvbkVycm9yKHhociwgcmVzcG9uc2UpIHtcclxuICAgIGNvbnN0IGhhbmRsZXIgPSByZXNvbHZlRnVuY3Rpb25OYW1lKHRoaXMub3B0aW9ucy5hamF4T25FcnJvcik7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLmVsZW1lbnQsIHhociwgcmVzcG9uc2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlIGFqYXggb25Db21wbGV0ZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsqfSB4aHJcclxuICAgKiBAcGFyYW0geyp9IHJlc3BvbnNlXHJcbiAgICogQG1lbWJlcm9mIFJlc3BvbnNlSGFuZGxlclxyXG4gICAqL1xyXG4gIG9uQ29tcGxldGUoeGhyLCByZXNwb25zZSkge1xyXG4gICAgY29uc3QgaGFuZGxlciA9IHJlc29sdmVGdW5jdGlvbk5hbWUodGhpcy5vcHRpb25zLmFqYXhPbkNvbXBsZXRlKTtcclxuXHJcbiAgICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgaGFuZGxlci5jYWxsKHRoaXMuZWxlbWVudCwgeGhyLCByZXNwb25zZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmhhbmRsZUFqYXhDb21wbGV0ZUVmZmVjdHMocmVzcG9uc2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlIGFqYXggb25BYm9ydFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsqfSB4aHJcclxuICAgKiBAcGFyYW0geyp9IHJlc3BvbnNlXHJcbiAgICogQG1lbWJlcm9mIFJlc3BvbnNlSGFuZGxlclxyXG4gICAqL1xyXG4gIG9uQWJvcnQoeGhyLCByZXNwb25zZSkge1xyXG4gICAgY29uc3QgaGFuZGxlciA9IHJlc29sdmVGdW5jdGlvbk5hbWUodGhpcy5vcHRpb25zLmFqYXhPbkFib3J0KTtcclxuXHJcbiAgICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgaGFuZGxlci5jYWxsKHRoaXMuZWxlbWVudCwgeGhyLCByZXNwb25zZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGUgYWpheCBvblRpbWVvdXRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Kn0geGhyXHJcbiAgICogQHBhcmFtIHsqfSByZXNwb25zZVxyXG4gICAqIEBtZW1iZXJvZiBSZXNwb25zZUhhbmRsZXJcclxuICAgKi9cclxuICBvblRpbWVvdXQoeGhyLCByZXNwb25zZSkge1xyXG4gICAgY29uc3QgaGFuZGxlciA9IHJlc29sdmVGdW5jdGlvbk5hbWUodGhpcy5vcHRpb25zLmFqYXhPblRpbWVvdXQpO1xyXG5cclxuICAgIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICBoYW5kbGVyLmNhbGwodGhpcy5lbGVtZW50LCB4aHIsIHJlc3BvbnNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZGlyZWN0IGFmdGVyIGNlcnRhaW4gdGltZSBvciBpbW1lZGlhdGVseVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsqfSB7IHJlZGlyZWN0IH1cclxuICAgKiBAbWVtYmVyb2YgUmVzcG9uc2VIYW5kbGVyXHJcbiAgICovXHJcbiAgcmVkaXJlY3QoeyByZWRpcmVjdCB9KSB7XHJcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5lbmFibGVSZWRpcmVjdCkgcmV0dXJuO1xyXG4gICAgaWYgKHJlZGlyZWN0ICYmIHJlZGlyZWN0LnVybCkge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlZGlyZWN0LnVybDtcclxuICAgICAgfSwgcmVkaXJlY3QudGltZW91dCB8fCAwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbG9hZCBjdXJyZW50IHdpbmRvdyBhZnRlciBjZXJ0YWluIHRpbWUgb3IgaW1tZWRpYXRlbHlcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Kn0geyByZWRpcmVjdCB9XHJcbiAgICogQG1lbWJlcm9mIFJlc3BvbnNlSGFuZGxlclxyXG4gICAqL1xyXG4gIHJlbG9hZCh7IHJlbG9hZCB9KSB7XHJcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5lbmFibGVSZWxvYWQpIHJldHVybjtcclxuICAgIGlmICh0eXBlb2YgcmVsb2FkICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB3aW5kb3cucmVsb2FkKCk7XHJcbiAgICAgIH0sIHJlbG9hZC50aW1lb3V0IHx8IDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2hvdyBub3RpZmljYXRpb25zIGJhc2VkIG9uIHJlc3BvbnNlXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyp9IHsgbm90aWZpY2F0aW9uIH1cclxuICAgKiBAcmV0dXJuc1xyXG4gICAqIEBtZW1iZXJvZiBSZXNwb25zZUhhbmRsZXJcclxuICAgKi9cclxuICBub3RpZnkoeyBub3RpZmljYXRpb24gfSkge1xyXG4gICAgaWYgKHR5cGVvZiBub3RpZmljYXRpb24gIT09ICdvYmplY3QnKSByZXR1cm47XHJcbiAgICBjb25zdCBub3RpZmljYXRpb25BcnIgPSBBcnJheS5pc0FycmF5KG5vdGlmaWNhdGlvbikgPyBub3RpZmljYXRpb24gOiBbbm90aWZpY2F0aW9uXTtcclxuXHJcbiAgICBub3RpZmljYXRpb25BcnIuZm9yRWFjaCgobikgPT4gdGhpcy5ub3RpZmllcltuLmxldmVsIHx8ICdpbmZvJ10oXHJcbiAgICAgIG4ubWVzc2FnZSB8fCAnU29tZSBtZXNzYWdlIHNlbnQgYnkgc2VydmVyJywgbi50aXRsZSB8fCAnJylcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGUgYWpheCBjb21wbGV0ZSBhZnRlciBlZmZlY3RzXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyp9IHJlc3BvbnNlXHJcbiAgICogQHJldHVybnNcclxuICAgKiBAbWVtYmVyb2YgUmVzcG9uc2VIYW5kbGVyXHJcbiAgICovXHJcbiAgaGFuZGxlQWpheENvbXBsZXRlRWZmZWN0cyhyZXNwb25zZSkge1xyXG4gICAgaWYgKCFyZXNwb25zZSkgcmV0dXJuO1xyXG4gICAgdGhpcy5yZWRpcmVjdChyZXNwb25zZSk7XHJcbiAgICB0aGlzLnJlbG9hZChyZXNwb25zZSk7XHJcbiAgICB0aGlzLm5vdGlmeShyZXNwb25zZSk7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IHtcclxuICB0cmlnZ2VyVHlwZTogJ2NsaWNrJyxcclxuICByZXF1ZXN0VGltZW91dDogMTAwMCxcclxuICByZXF1ZXN0SW50ZXJ2YWw6IDEwMDAsXHJcbiAgYWpheFVybDogZmFsc2UsXHJcbiAgYWpheE1ldGhvZDogJ1BPU1QnLFxyXG4gIGFqYXhBc3luYzogdHJ1ZSxcclxuICBhamF4VXNlck5hbWU6IG51bGwsXHJcbiAgYWpheFBhc3N3b3JkOiBudWxsLFxyXG4gIGFqYXhDb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXHJcbiAgYWpheFRpbWVvdXQ6IDMwMDAwLFxyXG4gIGFqYXhSZXF1ZXN0SGVhZGVyczogeydYLVJlcXVlc3RlZC1XaXRoJzogJ2FqYXhhYmxlJ30sXHJcbiAgYWpheERhdGE6IHt9LFxyXG4gIGFqYXhCZWZvcmVTZW5kOiBudWxsLFxyXG4gIGFqYXhPblN1Y2Nlc3M6IG51bGwsXHJcbiAgYWpheE9uRXJyb3I6IG51bGwsXHJcbiAgYWpheE9uQ29tcGxldGU6IG51bGwsXHJcbiAgYWpheE9uQWJvcnQ6IG51bGwsXHJcbiAgYWpheE9uVGltZW91dDogbnVsbCxcclxuICBhamF4U2hvd0xvYWRlcjogZmFsc2UsXHJcbiAgYWpheExvYWRlckNvbnRhaW5lcjogZG9jdW1lbnQuYm9keSxcclxuICBhamF4RG9Db25maXJtOiBmYWxzZSxcclxuICBkb21SZXBsYWNlVG86IGZhbHNlLFxyXG4gIGRvbVJlcGxhY2VDbG9zZXN0VG86IGZhbHNlLFxyXG4gIGRvbVJlcGxhY2VJbm5lclRvOiBmYWxzZSxcclxuICBkb21SZXBsYWNlQ2xvc2VzdElubmVyVG86IGZhbHNlLFxyXG4gIGRvbUFwcGVuZFRvOiBmYWxzZSxcclxuICBkb21QcmVwYW5kVG86IGZhbHNlLFxyXG4gIGRvbUNsZWFyVG86IGZhbHNlLFxyXG4gIGRvbUNsZWFyQ2xvc2VzdFRvOiBmYWxzZSxcclxuICBkb21SZW1vdmVUbzogZmFsc2UsXHJcbiAgZG9tUmVtb3ZlQ2xvc2VzdFRvOiBmYWxzZSxcclxuICBlbmFibGVSZWRpcmVjdDogdHJ1ZSxcclxuICBub3RpZmljYXRpb25UeXBlOiAnYWxlcnQnLCAvLyB0b2FzdHJ8YWxlcnR8c3dhbFxyXG4gIGFsZXJ0T3B0aW9uczoge30sXHJcbiAgdG9hc3RyT3B0aW9uczoge30sXHJcbiAgc3dhbE9wdGlvbnM6IHt9XHJcbn07XHJcbiIsImltcG9ydCBFbGVtZW50IGZyb20gJy4vY29yZS9FbGVtZW50JztcclxuaW1wb3J0IHsgZXh0ZW5kLCBpc0VsZW1lbnQsIHV1aWQgfSBmcm9tICcuL3V0aWxzJztcclxuXHJcbmNvbnN0IEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50ZW1pdHRlcjMnKTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgZWxlbWVudHMgYXJyYXkgYmFzZWQgb24gcHJvdmlkZWQgc2VsZWN0b3JcclxuICpcclxuICogQHBhcmFtIHsqfSBzZWxlY3RvclxyXG4gKiBAcGFyYW0geyp9IGZpbHRlckVsZW1lbnRzXHJcbiAqIEByZXR1cm5zIGFycmF5XHJcbiAqL1xyXG5mdW5jdGlvbiBfY3JlYXRlRWxlbWVudHNBcnJheShzZWxlY3RvciwgZmlsdGVyRWxlbWVudHMpIHtcclxuICBsZXQgZWxlbWVudHMgPSBbXTtcclxuICBsZXQgaTtcclxuICBsZXQgZWw7XHJcblxyXG4gIGlmICghc2VsZWN0b3IpIHtcclxuICAgIHNlbGVjdG9yID0gW107XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJykge1xyXG4gICAgc2VsZWN0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuICB9XHJcblxyXG4gIGlmIChpc0VsZW1lbnQoc2VsZWN0b3IpKSB7XHJcbiAgICBzZWxlY3RvciA9IFtzZWxlY3Rvcl07XHJcbiAgfVxyXG5cclxuICBpZiAoZmlsdGVyRWxlbWVudHMpIHtcclxuICAgIGZvciAoaSA9IDA7IGkgPCBzZWxlY3Rvci5sZW5ndGg7IGkgPSBpICsgMSkge1xyXG4gICAgICBlbCA9IHNlbGVjdG9yW2ldO1xyXG4gICAgICBpZiAoaXNFbGVtZW50KGVsKSAmJiAhZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWFqYXhhYmxlLWlkJykpIHtcclxuICAgICAgICBlbGVtZW50cy5wdXNoKGVsKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBlbGVtZW50cyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShzZWxlY3Rvcik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZWxlbWVudHM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgRWxlbWVudCBpbnN0YW5jZVxyXG4gKlxyXG4gKiBAcGFyYW0geyp9IGVsZW1lbnRcclxuICogQHJldHVybnNcclxuICovXHJcbmZ1bmN0aW9uIF9jcmVhdGVFbGVtZW50SW5zdGFuY2UoZWxlbWVudCkge1xyXG4gIHZhciB1bmlxdWVJZCA9IHV1aWQoKTtcclxuXHJcbiAgaWYgKCFlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1hamF4YWJsZS1pZCcpKSB7XHJcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1hamF4YWJsZS1pZCcsIHVuaXF1ZUlkKTtcclxuICAgIGVsZW1lbnQgPSBuZXcgRWxlbWVudChlbGVtZW50LCB0aGlzLm9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgfVxyXG4gIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWpheGFibGUge1xyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQWpheGFibGUuXHJcbiAgICogQHBhcmFtIHsqfSBlbGVtZW50c1xyXG4gICAqIEBwYXJhbSB7Kn0gb3B0aW9uc1xyXG4gICAqIEBtZW1iZXJvZiBBamF4YWJsZVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnRzLCBvcHRpb25zKSB7XHJcbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSAodHlwZW9mIG9wdGlvbnMgPT09ICdvYmplY3QnKSA/IGV4dGVuZCh7fSwgb3B0aW9ucykgOiB7fTtcclxuICAgIHRoaXMub3JpZ0VsZW1lbnRzID0gZWxlbWVudHM7XHJcbiAgICB0aGlzLmVsZW1lbnRzID0gW107XHJcbiAgICB0aGlzLmFkZEVsZW1lbnRzKHRoaXMub3JpZ0VsZW1lbnRzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZ2lzdGVyIHNlbGVjdG9yIGVsZW1lbnRzIHRvIGFqYXhhYmxlXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyp9IHNlbGVjdG9yXHJcbiAgICogQHJldHVybnNcclxuICAgKiBAbWVtYmVyb2YgQWpheGFibGVcclxuICAgKi9cclxuICBhZGRFbGVtZW50cyhzZWxlY3Rvcikge1xyXG4gICAgdmFyIGVsZW1lbnRzID0gX2NyZWF0ZUVsZW1lbnRzQXJyYXkoc2VsZWN0b3IsIHRydWUpO1xyXG5cclxuICAgIGlmIChlbGVtZW50cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgICAgZWxlbWVudCA9IF9jcmVhdGVFbGVtZW50SW5zdGFuY2UuY2FsbCh0aGlzLCBlbGVtZW50KTtcclxuICAgICAgdGhpcy5lbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xyXG4gICAgfSwgdGhpcyk7XHJcblxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVuLXJlZ2lzdGVyIGFkZGVkIGVsZW1lbnRzIGJhY2sgdG8gbmF0aXZlXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyp9IHNlbGVjdG9yXHJcbiAgICogQG1lbWJlcm9mIEFqYXhhYmxlXHJcbiAgICovXHJcbiAgcmVtb3ZlRWxlbWVudHMoc2VsZWN0b3IpIHtcclxuICAgIHZhciBlbGVtZW50cyA9IF9jcmVhdGVFbGVtZW50c0FycmF5KHNlbGVjdG9yKSwgaSwgaztcclxuXHJcbiAgICBpZiAoZWxlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgICBmb3IgKGkgaW4gZWxlbWVudHMpIHtcclxuICAgICAgICBpZiAoZWxlbWVudHNbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLWFqYXhhYmxlLWlkJykpIHtcclxuICAgICAgICAgIGZvciAoayBpbiB0aGlzLmVsZW1lbnRzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmVsZW1lbnRzW2tdLmdldERvbUVsZW1lbnQoKSA9PT0gZWxlbWVudHNbaV0pIHtcclxuICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzW2tdLmdldERvbUVsZW1lbnQoKS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtYWpheGFibGUtaWQnKTtcclxuICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzW2tdLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzLnNwbGljZShrLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY29uc3QgZXh0ZW5kID0gKGRlZmF1bHRzLCBvcHRpb25zKSA9PiB7XHJcbiAgY29uc3QgZXh0ZW5kZWQgPSB7fTtcclxuICBsZXQgcHJvcDtcclxuXHJcbiAgZm9yIChwcm9wIGluIGRlZmF1bHRzKSB7XHJcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRlZmF1bHRzLCBwcm9wKSkge1xyXG4gICAgICBleHRlbmRlZFtwcm9wXSA9IGRlZmF1bHRzW3Byb3BdO1xyXG4gICAgfVxyXG4gIH1cclxuICBmb3IgKHByb3AgaW4gb3B0aW9ucykge1xyXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvcHRpb25zLCBwcm9wKSkge1xyXG4gICAgICBleHRlbmRlZFtwcm9wXSA9IG9wdGlvbnNbcHJvcF07XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBleHRlbmRlZDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpc0VsZW1lbnQgPSAob2JqKSA9PiAhIShvYmogJiYgb2JqLm5vZGVUeXBlID09PSAxKTtcclxuXHJcbmV4cG9ydCBjb25zdCB1dWlkID0gKCkgPT4ge1xyXG4gIGZ1bmN0aW9uIHM0KCkge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSk7XHJcbiAgfVxyXG4gIHJldHVybiBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyBzNCgpICsgczQoKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCByZXNvbHZlRnVuY3Rpb25OYW1lID0gKGZ1bmMpID0+IHtcclxuICBsZXQgb2JqO1xyXG5cclxuICBpZiAodHlwZW9mIGZ1bmMgPT09ICdmdW5jdGlvbicpIHtcclxuICAgIHJldHVybiBmdW5jO1xyXG4gIH1cclxuICBpZiAodHlwZW9mIGZ1bmMgPT09ICdzdHJpbmcnKSB7XHJcbiAgICBpZiAoZnVuYy5pbmRleE9mKCcuJykgPD0gLTEgJiYgdHlwZW9mIHdpbmRvd1tmdW5jXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICByZXR1cm4gd2luZG93W2Z1bmNdO1xyXG4gICAgfVxyXG4gICAgb2JqID0gZnVuYy5zcGxpdCgnLicpLnJlZHVjZSgobywgaSkgPT4gb1tpXSwgd2luZG93KTtcclxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHRvQ2FtZWxDYXNlID0gKHN0cikgPT4ge1xyXG4gIHN0ciA9IHN0ci5yZXBsYWNlKCdkYXRhLWFqYXhhYmxlLScsICcnKS5yZXBsYWNlKC8tL2csICcgJyk7XHJcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oPzpeXFx3fFtBLVpdfFxcYlxcdykvZywgKGxldHRlciwgaW5kZXgpID0+XHJcbiAgICBpbmRleCA9PT0gMCA/IGxldHRlci50b0xvd2VyQ2FzZSgpIDogbGV0dGVyLnRvVXBwZXJDYXNlKCkpLnJlcGxhY2UoL1xccysvZywgJycpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGFkZENsYXNzID0gKGVsZW1lbnQsIGNsYXNzZXMpID0+IHtcclxuICBpZiAodHlwZW9mIGNsYXNzZXMgPT09ICd1bmRlZmluZWQnIHx8IGNsYXNzZXMgPT09IG51bGwgfHwgY2xhc3NlcyA9PT0gJycgfHwgIWNsYXNzZXMpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgY29uc3QgY2xhc3NMaXN0ID0gKGNsYXNzZXMuaW5kZXhPZignICcpID4gLTEpID8gY2xhc3Nlcy5zcGxpdCgnICcpIDogY2xhc3NlcztcclxuXHJcbiAgaWYgKEFycmF5LmlzQXJyYXkoY2xhc3NMaXN0KSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbGFzc0xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTGlzdFtpXSk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc0xpc3QpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBlc2NhcGVIdG1sID0gKHNvdXJjZSkgPT4ge1xyXG4gIGlmIChzb3VyY2UgPT0gbnVsbCkge1xyXG4gICAgc291cmNlID0gJyc7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gc291cmNlXHJcbiAgICAucmVwbGFjZSgvJi9nLCAnJmFtcDsnKVxyXG4gICAgLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKVxyXG4gICAgLnJlcGxhY2UoLycvZywgJyYjMzk7JylcclxuICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcclxuICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7Jyk7XHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=