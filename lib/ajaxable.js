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

var _utils = __webpack_require__(/*! ../utils */ "./src/utils.js");

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
      var opts = this.element.options;
      var handler = (0, _utils.resolveFunctionName)(opts.ajaxBeforeSend);

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
      var opts = this.element.options;
      var handler = (0, _utils.resolveFunctionName)(opts.ajaxOnSuccess);

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
      console.log(xhr);
      var opts = this.element.options;
      var handler = (0, _utils.resolveFunctionName)(opts.ajaxOnError);

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
      var opts = this.element.options;
      var handler = (0, _utils.resolveFunctionName)(opts.ajaxOnComplete);

      if (typeof handler === 'function') {
        handler.call(this.element, xhr, response);
      }
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
      var opts = this.element.options;
      var handler = (0, _utils.resolveFunctionName)(opts.ajaxOnAbort);

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
      var opts = this.element.options;
      var handler = (0, _utils.resolveFunctionName)(opts.ajaxOnTimeout);

      if (typeof handler === 'function') {
        handler.call(this.element, xhr, response);
      }
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
    'x-request-with': 'smartajax'
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
exports.toCamelCase = exports.resolveFunctionName = exports.uuid = exports.isElement = exports.extend = void 0;

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

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9BamF4YWJsZS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vQWpheGFibGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQWpheGFibGUvLi9ub2RlX21vZHVsZXMvZXZlbnRlbWl0dGVyMy9pbmRleC5qcyIsIndlYnBhY2s6Ly9BamF4YWJsZS8uL3NyYy9jb3JlL0FqYXguanMiLCJ3ZWJwYWNrOi8vQWpheGFibGUvLi9zcmMvY29yZS9FbGVtZW50LmpzIiwid2VicGFjazovL0FqYXhhYmxlLy4vc3JjL2NvcmUvUmVzcG9uc2VIYW5kbGVyLmpzIiwid2VicGFjazovL0FqYXhhYmxlLy4vc3JjL2NvcmUvZWxlbWVudE9wdHMuanMiLCJ3ZWJwYWNrOi8vQWpheGFibGUvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQWpheGFibGUvLi9zcmMvdXRpbHMuanMiXSwibmFtZXMiOlsiRXZlbnRFbWl0dGVyIiwicmVxdWlyZSIsImNyZWF0ZVhIUiIsIndpbmRvdyIsIlhNTEh0dHBSZXF1ZXN0IiwidW5kZWZpbmVkIiwieGhyIiwiQWN0aXZlWE9iamVjdCIsImUxIiwiZTIiLCJFcnJvciIsInBhcnNlWGhyUmVzcG9uc2UiLCJyZXN1bHQiLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZVRleHQiLCJlIiwic2V0Q29udGVudFR5cGUiLCJvcHRpb25zIiwiYWpheENvbnRlbnRUeXBlIiwic2V0UmVxdWVzdEhlYWRlciIsInNldFJlcXVlc3RIZWFkZXJzIiwiaSIsImhlYWRlck5hbWUiLCJoZWFkZXJWYWx1ZSIsImFqYXhSZXF1ZXN0SGVhZGVycyIsImhhc093blByb3BlcnR5Iiwic2V0dXBYSFJPbkFib3J0Iiwib25hYm9ydCIsImVtaXQiLCJiaW5kIiwic2V0dXBYSFJPblRpbWVvdXQiLCJhamF4VGltZW91dCIsInRpbWVvdXQiLCJzZXR1cE9uUmVhZHlTdGF0ZUNoYW5nZSIsInhoclJlc3VsdCIsInJlYWR5U3RhdGUiLCJjYWxsIiwic3RhdHVzIiwic2V0dXBYSFJSZWFkeVN0YXRlIiwib25yZWFkeXN0YXRlY2hhbmdlIiwidXBkYXRlWEhST3B0aW9ucyIsIkFqYXgiLCJlbWl0dGVyIiwiZGF0YSIsImFqYXhVcmwiLCJvcGVuIiwiYWpheE1ldGhvZCIsImFqYXhBc3luYyIsImFqYXhVc2VyTmFtZSIsImFqYXhQYXNzd29yZCIsInNlbmQiLCJvcHRzIiwiZXZlbnQiLCJoYW5kbGVyIiwiY29udGV4dCIsIm9uIiwiYTEiLCJhMiIsImEzIiwiYTQiLCJhNSIsImJpbmRYaHJFdmVudHMiLCJhamF4IiwieCIsInIiLCJiaW5kQ2xhc3NFdmVudHMiLCJyZXNIYW5kbHIiLCJyZXNwb25zZUhhbmRsZXIiLCJiZWZvcmVTZW5kIiwib25TdWNjZXNzIiwib25FcnJvciIsIm9uQ29tcGxldGUiLCJvbkFib3J0Iiwib25UaW1lb3V0IiwiYmluZEVsZW1lbnRFdmVudHMiLCJjdHgiLCJlbGVtZW50IiwiYmluZFRpbWVkQWpheCIsInJlcXVlc3RUaW1lcklkIiwic2V0VGltZW91dCIsInN0YXJ0QWpheFJlcXVlc3QiLCJyZXF1ZXN0VGltZW91dCIsImJpbmRJbnRlcnZhbEFqYXgiLCJyZXF1ZXN0SW50ZXJ2YWxJZCIsInNldEludGVydmFsIiwicmVxdWVzdEludGVydmFsIiwiYmluZENsaWNrQWpheCIsImNsaWNrQWpheEhhbmRsZXIiLCJwcmV2ZW50RGVmYXVsdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJiaW5kSG92ZXJBamF4IiwiaG92ZXJBamF4SGFuZGxlciIsImJpbmRTdWJtaXRBamF4Iiwic3VibWl0QWpheEhhbmRsZXIiLCJub2RlTmFtZSIsInRyaWdnZXJUeXBlIiwiZGV0YXRjaEVsZW1lbnRFdmVudHMiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZ2V0QXR0cmlidXRlIiwiY2xlYXJUaW1lb3V0IiwidXBkYXRlRWxlbWVudEF0dHJpYnV0ZXNUb09wdGlvbnMiLCJhdHRyaWJ1dGUiLCJhdHRycyIsImF0dHJpYnV0ZXMiLCJsZW5ndGgiLCJub2RlVmFsdWUiLCJwcmVwYXJlQWpheFJlcXVlc3REYXRhIiwiYWpheERhdGEiLCJFbGVtZW50IiwiZG9SZXF1ZXN0IiwiYXR0ckxlbmd0aCIsImVsZW1lbnRBdHRyaWJ1dGVOb2RlcyIsImsiLCJwdXNoIiwiaW5kZXhPZiIsInNldE9wdGlvbnMiLCJSZXNwb25zZUhhbmRsZXIiLCJkYXRhVG9TZW5kIiwiYWpheEJlZm9yZVNlbmQiLCJyZXNwb25zZSIsImFqYXhPblN1Y2Nlc3MiLCJjb25zb2xlIiwibG9nIiwiYWpheE9uRXJyb3IiLCJhamF4T25Db21wbGV0ZSIsImFqYXhPbkFib3J0IiwiYWpheE9uVGltZW91dCIsImFqYXhTaG93TG9hZGVyIiwiYWpheExvYWRlckNvbnRhaW5lciIsImRvY3VtZW50IiwiYm9keSIsImFqYXhEb0NvbmZpcm0iLCJkb21SZXBsYWNlVG8iLCJkb21SZXBsYWNlQ2xvc2VzdFRvIiwiZG9tUmVwbGFjZUlubmVyVG8iLCJkb21SZXBsYWNlQ2xvc2VzdElubmVyVG8iLCJkb21BcHBlbmRUbyIsImRvbVByZXBhbmRUbyIsImRvbUNsZWFyVG8iLCJkb21DbGVhckNsb3Nlc3RUbyIsImRvbVJlbW92ZVRvIiwiZG9tUmVtb3ZlQ2xvc2VzdFRvIiwibm90aWZpY2F0aW9uVHlwZSIsImFsZXJ0T3B0aW9ucyIsInRvYXN0ck9wdGlvbnMiLCJzd2FsT3B0aW9ucyIsIl9jcmVhdGVFbGVtZW50c0FycmF5Iiwic2VsZWN0b3IiLCJmaWx0ZXJFbGVtZW50cyIsImVsZW1lbnRzIiwiZWwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImFwcGx5IiwiX2NyZWF0ZUVsZW1lbnRJbnN0YW5jZSIsInVuaXF1ZUlkIiwic2V0QXR0cmlidXRlIiwiQWpheGFibGUiLCJvcmlnRWxlbWVudHMiLCJhZGRFbGVtZW50cyIsImZvckVhY2giLCJnZXREb21FbGVtZW50IiwicmVtb3ZlQXR0cmlidXRlIiwiZGVzdHJveSIsInNwbGljZSIsImV4dGVuZCIsImRlZmF1bHRzIiwiZXh0ZW5kZWQiLCJwcm9wIiwiT2JqZWN0IiwiaXNFbGVtZW50Iiwib2JqIiwibm9kZVR5cGUiLCJ1dWlkIiwiczQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ0b1N0cmluZyIsInN1YnN0cmluZyIsInJlc29sdmVGdW5jdGlvbk5hbWUiLCJmdW5jIiwic3BsaXQiLCJyZWR1Y2UiLCJvIiwidG9DYW1lbENhc2UiLCJzdHIiLCJyZXBsYWNlIiwibGV0dGVyIiwiaW5kZXgiLCJ0b0xvd2VyQ2FzZSIsInRvVXBwZXJDYXNlIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7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Q0FBUDtBQUVELENBSk0iLCJmaWxlIjoiQWpheGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIkFqYXhhYmxlXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkFqYXhhYmxlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkFqYXhhYmxlXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuICAsIHByZWZpeCA9ICd+JztcblxuLyoqXG4gKiBDb25zdHJ1Y3RvciB0byBjcmVhdGUgYSBzdG9yYWdlIGZvciBvdXIgYEVFYCBvYmplY3RzLlxuICogQW4gYEV2ZW50c2AgaW5zdGFuY2UgaXMgYSBwbGFpbiBvYmplY3Qgd2hvc2UgcHJvcGVydGllcyBhcmUgZXZlbnQgbmFtZXMuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBFdmVudHMoKSB7fVxuXG4vL1xuLy8gV2UgdHJ5IHRvIG5vdCBpbmhlcml0IGZyb20gYE9iamVjdC5wcm90b3R5cGVgLiBJbiBzb21lIGVuZ2luZXMgY3JlYXRpbmcgYW5cbi8vIGluc3RhbmNlIGluIHRoaXMgd2F5IGlzIGZhc3RlciB0aGFuIGNhbGxpbmcgYE9iamVjdC5jcmVhdGUobnVsbClgIGRpcmVjdGx5LlxuLy8gSWYgYE9iamVjdC5jcmVhdGUobnVsbClgIGlzIG5vdCBzdXBwb3J0ZWQgd2UgcHJlZml4IHRoZSBldmVudCBuYW1lcyB3aXRoIGFcbi8vIGNoYXJhY3RlciB0byBtYWtlIHN1cmUgdGhhdCB0aGUgYnVpbHQtaW4gb2JqZWN0IHByb3BlcnRpZXMgYXJlIG5vdFxuLy8gb3ZlcnJpZGRlbiBvciB1c2VkIGFzIGFuIGF0dGFjayB2ZWN0b3IuXG4vL1xuaWYgKE9iamVjdC5jcmVhdGUpIHtcbiAgRXZlbnRzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgLy9cbiAgLy8gVGhpcyBoYWNrIGlzIG5lZWRlZCBiZWNhdXNlIHRoZSBgX19wcm90b19fYCBwcm9wZXJ0eSBpcyBzdGlsbCBpbmhlcml0ZWQgaW5cbiAgLy8gc29tZSBvbGQgYnJvd3NlcnMgbGlrZSBBbmRyb2lkIDQsIGlQaG9uZSA1LjEsIE9wZXJhIDExIGFuZCBTYWZhcmkgNS5cbiAgLy9cbiAgaWYgKCFuZXcgRXZlbnRzKCkuX19wcm90b19fKSBwcmVmaXggPSBmYWxzZTtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRhdGlvbiBvZiBhIHNpbmdsZSBldmVudCBsaXN0ZW5lci5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHBhcmFtIHtCb29sZWFufSBbb25jZT1mYWxzZV0gU3BlY2lmeSBpZiB0aGUgbGlzdGVuZXIgaXMgYSBvbmUtdGltZSBsaXN0ZW5lci5cbiAqIEBjb25zdHJ1Y3RvclxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gRUUoZm4sIGNvbnRleHQsIG9uY2UpIHtcbiAgdGhpcy5mbiA9IGZuO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB0aGlzLm9uY2UgPSBvbmNlIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIEFkZCBhIGxpc3RlbmVyIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7RXZlbnRFbWl0dGVyfSBlbWl0dGVyIFJlZmVyZW5jZSB0byB0aGUgYEV2ZW50RW1pdHRlcmAgaW5zdGFuY2UuXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHBhcmFtIHtCb29sZWFufSBvbmNlIFNwZWNpZnkgaWYgdGhlIGxpc3RlbmVyIGlzIGEgb25lLXRpbWUgbGlzdGVuZXIuXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gYWRkTGlzdGVuZXIoZW1pdHRlciwgZXZlbnQsIGZuLCBjb250ZXh0LCBvbmNlKSB7XG4gIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICB2YXIgbGlzdGVuZXIgPSBuZXcgRUUoZm4sIGNvbnRleHQgfHwgZW1pdHRlciwgb25jZSlcbiAgICAsIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG5cbiAgaWYgKCFlbWl0dGVyLl9ldmVudHNbZXZ0XSkgZW1pdHRlci5fZXZlbnRzW2V2dF0gPSBsaXN0ZW5lciwgZW1pdHRlci5fZXZlbnRzQ291bnQrKztcbiAgZWxzZSBpZiAoIWVtaXR0ZXIuX2V2ZW50c1tldnRdLmZuKSBlbWl0dGVyLl9ldmVudHNbZXZ0XS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZSBlbWl0dGVyLl9ldmVudHNbZXZ0XSA9IFtlbWl0dGVyLl9ldmVudHNbZXZ0XSwgbGlzdGVuZXJdO1xuXG4gIHJldHVybiBlbWl0dGVyO1xufVxuXG4vKipcbiAqIENsZWFyIGV2ZW50IGJ5IG5hbWUuXG4gKlxuICogQHBhcmFtIHtFdmVudEVtaXR0ZXJ9IGVtaXR0ZXIgUmVmZXJlbmNlIHRvIHRoZSBgRXZlbnRFbWl0dGVyYCBpbnN0YW5jZS5cbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldnQgVGhlIEV2ZW50IG5hbWUuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjbGVhckV2ZW50KGVtaXR0ZXIsIGV2dCkge1xuICBpZiAoLS1lbWl0dGVyLl9ldmVudHNDb3VudCA9PT0gMCkgZW1pdHRlci5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICBlbHNlIGRlbGV0ZSBlbWl0dGVyLl9ldmVudHNbZXZ0XTtcbn1cblxuLyoqXG4gKiBNaW5pbWFsIGBFdmVudEVtaXR0ZXJgIGludGVyZmFjZSB0aGF0IGlzIG1vbGRlZCBhZ2FpbnN0IHRoZSBOb2RlLmpzXG4gKiBgRXZlbnRFbWl0dGVyYCBpbnRlcmZhY2UuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG59XG5cbi8qKlxuICogUmV0dXJuIGFuIGFycmF5IGxpc3RpbmcgdGhlIGV2ZW50cyBmb3Igd2hpY2ggdGhlIGVtaXR0ZXIgaGFzIHJlZ2lzdGVyZWRcbiAqIGxpc3RlbmVycy5cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHZhciBuYW1lcyA9IFtdXG4gICAgLCBldmVudHNcbiAgICAsIG5hbWU7XG5cbiAgaWYgKHRoaXMuX2V2ZW50c0NvdW50ID09PSAwKSByZXR1cm4gbmFtZXM7XG5cbiAgZm9yIChuYW1lIGluIChldmVudHMgPSB0aGlzLl9ldmVudHMpKSB7XG4gICAgaWYgKGhhcy5jYWxsKGV2ZW50cywgbmFtZSkpIG5hbWVzLnB1c2gocHJlZml4ID8gbmFtZS5zbGljZSgxKSA6IG5hbWUpO1xuICB9XG5cbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICByZXR1cm4gbmFtZXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZXZlbnRzKSk7XG4gIH1cblxuICByZXR1cm4gbmFtZXM7XG59O1xuXG4vKipcbiAqIFJldHVybiB0aGUgbGlzdGVuZXJzIHJlZ2lzdGVyZWQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge0FycmF5fSBUaGUgcmVnaXN0ZXJlZCBsaXN0ZW5lcnMuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKGV2ZW50KSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50XG4gICAgLCBoYW5kbGVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmICghaGFuZGxlcnMpIHJldHVybiBbXTtcbiAgaWYgKGhhbmRsZXJzLmZuKSByZXR1cm4gW2hhbmRsZXJzLmZuXTtcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGhhbmRsZXJzLmxlbmd0aCwgZWUgPSBuZXcgQXJyYXkobCk7IGkgPCBsOyBpKyspIHtcbiAgICBlZVtpXSA9IGhhbmRsZXJzW2ldLmZuO1xuICB9XG5cbiAgcmV0dXJuIGVlO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gdGhlIG51bWJlciBvZiBsaXN0ZW5lcnMgbGlzdGVuaW5nIHRvIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge051bWJlcn0gVGhlIG51bWJlciBvZiBsaXN0ZW5lcnMuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uIGxpc3RlbmVyQ291bnQoZXZlbnQpIHtcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnRcbiAgICAsIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmICghbGlzdGVuZXJzKSByZXR1cm4gMDtcbiAgaWYgKGxpc3RlbmVycy5mbikgcmV0dXJuIDE7XG4gIHJldHVybiBsaXN0ZW5lcnMubGVuZ3RoO1xufTtcblxuLyoqXG4gKiBDYWxscyBlYWNoIG9mIHRoZSBsaXN0ZW5lcnMgcmVnaXN0ZXJlZCBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBldmVudCBoYWQgbGlzdGVuZXJzLCBlbHNlIGBmYWxzZWAuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQoZXZlbnQsIGExLCBhMiwgYTMsIGE0LCBhNSkge1xuICB2YXIgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1tldnRdKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdXG4gICAgLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgLCBhcmdzXG4gICAgLCBpO1xuXG4gIGlmIChsaXN0ZW5lcnMuZm4pIHtcbiAgICBpZiAobGlzdGVuZXJzLm9uY2UpIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVycy5mbiwgdW5kZWZpbmVkLCB0cnVlKTtcblxuICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICBjYXNlIDE6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCksIHRydWU7XG4gICAgICBjYXNlIDI6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEpLCB0cnVlO1xuICAgICAgY2FzZSAzOiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiksIHRydWU7XG4gICAgICBjYXNlIDQ6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMyksIHRydWU7XG4gICAgICBjYXNlIDU6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMywgYTQpLCB0cnVlO1xuICAgICAgY2FzZSA2OiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiwgYTMsIGE0LCBhNSksIHRydWU7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMSwgYXJncyA9IG5ldyBBcnJheShsZW4gLTEpOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIGxpc3RlbmVycy5mbi5hcHBseShsaXN0ZW5lcnMuY29udGV4dCwgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbmd0aCA9IGxpc3RlbmVycy5sZW5ndGhcbiAgICAgICwgajtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGxpc3RlbmVyc1tpXS5vbmNlKSB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcnNbaV0uZm4sIHVuZGVmaW5lZCwgdHJ1ZSk7XG5cbiAgICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICAgIGNhc2UgMTogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQpOyBicmVhaztcbiAgICAgICAgY2FzZSAyOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEpOyBicmVhaztcbiAgICAgICAgY2FzZSAzOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEsIGEyKTsgYnJlYWs7XG4gICAgICAgIGNhc2UgNDogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQsIGExLCBhMiwgYTMpOyBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBpZiAoIWFyZ3MpIGZvciAoaiA9IDEsIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0xKTsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgICBhcmdzW2ogLSAxXSA9IGFyZ3VtZW50c1tqXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsaXN0ZW5lcnNbaV0uZm4uYXBwbHkobGlzdGVuZXJzW2ldLmNvbnRleHQsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBBZGQgYSBsaXN0ZW5lciBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IFtjb250ZXh0PXRoaXNdIFRoZSBjb250ZXh0IHRvIGludm9rZSB0aGUgbGlzdGVuZXIgd2l0aC5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IGB0aGlzYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKGV2ZW50LCBmbiwgY29udGV4dCkge1xuICByZXR1cm4gYWRkTGlzdGVuZXIodGhpcywgZXZlbnQsIGZuLCBjb250ZXh0LCBmYWxzZSk7XG59O1xuXG4vKipcbiAqIEFkZCBhIG9uZS10aW1lIGxpc3RlbmVyIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW2NvbnRleHQ9dGhpc10gVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKGV2ZW50LCBmbiwgY29udGV4dCkge1xuICByZXR1cm4gYWRkTGlzdGVuZXIodGhpcywgZXZlbnQsIGZuLCBjb250ZXh0LCB0cnVlKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBsaXN0ZW5lcnMgb2YgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBPbmx5IHJlbW92ZSB0aGUgbGlzdGVuZXJzIHRoYXQgbWF0Y2ggdGhpcyBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBPbmx5IHJlbW92ZSB0aGUgbGlzdGVuZXJzIHRoYXQgaGF2ZSB0aGlzIGNvbnRleHQuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9uY2UgT25seSByZW1vdmUgb25lLXRpbWUgbGlzdGVuZXJzLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGZuLCBjb250ZXh0LCBvbmNlKSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW2V2dF0pIHJldHVybiB0aGlzO1xuICBpZiAoIWZuKSB7XG4gICAgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmIChsaXN0ZW5lcnMuZm4pIHtcbiAgICBpZiAoXG4gICAgICBsaXN0ZW5lcnMuZm4gPT09IGZuICYmXG4gICAgICAoIW9uY2UgfHwgbGlzdGVuZXJzLm9uY2UpICYmXG4gICAgICAoIWNvbnRleHQgfHwgbGlzdGVuZXJzLmNvbnRleHQgPT09IGNvbnRleHQpXG4gICAgKSB7XG4gICAgICBjbGVhckV2ZW50KHRoaXMsIGV2dCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvciAodmFyIGkgPSAwLCBldmVudHMgPSBbXSwgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGxpc3RlbmVyc1tpXS5mbiAhPT0gZm4gfHxcbiAgICAgICAgKG9uY2UgJiYgIWxpc3RlbmVyc1tpXS5vbmNlKSB8fFxuICAgICAgICAoY29udGV4dCAmJiBsaXN0ZW5lcnNbaV0uY29udGV4dCAhPT0gY29udGV4dClcbiAgICAgICkge1xuICAgICAgICBldmVudHMucHVzaChsaXN0ZW5lcnNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vXG4gICAgLy8gUmVzZXQgdGhlIGFycmF5LCBvciByZW1vdmUgaXQgY29tcGxldGVseSBpZiB3ZSBoYXZlIG5vIG1vcmUgbGlzdGVuZXJzLlxuICAgIC8vXG4gICAgaWYgKGV2ZW50cy5sZW5ndGgpIHRoaXMuX2V2ZW50c1tldnRdID0gZXZlbnRzLmxlbmd0aCA9PT0gMSA/IGV2ZW50c1swXSA6IGV2ZW50cztcbiAgICBlbHNlIGNsZWFyRXZlbnQodGhpcywgZXZ0KTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYWxsIGxpc3RlbmVycywgb3IgdGhvc2Ugb2YgdGhlIHNwZWNpZmllZCBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gW2V2ZW50XSBUaGUgZXZlbnQgbmFtZS5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IGB0aGlzYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnMoZXZlbnQpIHtcbiAgdmFyIGV2dDtcblxuICBpZiAoZXZlbnQpIHtcbiAgICBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuICAgIGlmICh0aGlzLl9ldmVudHNbZXZ0XSkgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuX2V2ZW50cyA9IG5ldyBFdmVudHMoKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vXG4vLyBBbGlhcyBtZXRob2RzIG5hbWVzIGJlY2F1c2UgcGVvcGxlIHJvbGwgbGlrZSB0aGF0LlxuLy9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uO1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBwcmVmaXguXG4vL1xuRXZlbnRFbWl0dGVyLnByZWZpeGVkID0gcHJlZml4O1xuXG4vL1xuLy8gQWxsb3cgYEV2ZW50RW1pdHRlcmAgdG8gYmUgaW1wb3J0ZWQgYXMgbW9kdWxlIG5hbWVzcGFjZS5cbi8vXG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBtb2R1bGUuXG4vL1xuaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgbW9kdWxlKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xufVxuIiwiLyogZ2xvYmFsXHJcbmFsZXJ0LCBjb25maXJtLCBjb25zb2xlLCBwcm9tcHQsIHJlcXVpcmUsIG1vZHVsZSwgQWN0aXZlWE9iamVjdFxyXG4qL1xyXG5pbXBvcnQgeyBleHRlbmQgfSBmcm9tICcuLi91dGlscyc7XHJcblxyXG5jb25zdCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudGVtaXR0ZXIzJyk7XHJcblxyXG4vKipcclxuICogQ3JlYXRlIFhIUiBpbnN0YW5jZVxyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gY3JlYXRlWEhSKCkge1xyXG4gIGlmICh3aW5kb3cuWE1MSHR0cFJlcXVlc3QgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgd2luZG93LlhNTEh0dHBSZXF1ZXN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHRoaXMueGhyID0gbmV3IEFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQLjYuMCcpO1xyXG4gICAgICB9IGNhdGNoIChlMSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICB0aGlzLnhociA9IG5ldyBBY3RpdmVYT2JqZWN0KCdNeHNtbDIuWE1MSFRUUC4zLjAnKTtcclxuICAgICAgICB9IGNhdGNoIChlMikge1xyXG4gICAgICAgICAgdGhpcy54aHIgPSBuZXcgRXJyb3IoJ0FqYXggbm90IHN1cHBvcnRlZCBpbiB5b3VyIGJyb3dzZXInKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSBlbHNlIHtcclxuICAgIHRoaXMueGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogUGFyc2UgWEhSIHJlc3BvbnNlXHJcbiAqXHJcbiAqIEByZXR1cm5zIG9iamVjdFxyXG4gKi9cclxuZnVuY3Rpb24gcGFyc2VYaHJSZXNwb25zZSgpIHtcclxuICBsZXQgcmVzdWx0O1xyXG5cclxuICB0cnkge1xyXG4gICAgcmVzdWx0ID0gSlNPTi5wYXJzZSh0aGlzLnhoci5yZXNwb25zZVRleHQpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHJlc3VsdCA9IHRoaXMueGhyLnJlc3BvbnNlVGV4dDtcclxuICB9XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCBhamF4IGNvbnRlbnQgdHlwZVxyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gc2V0Q29udGVudFR5cGUoKSB7XHJcbiAgaWYgKHRoaXMub3B0aW9ucy5hamF4Q29udGVudFR5cGUpIHtcclxuICAgIHRoaXMueGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsIHRoaXMub3B0aW9ucy5hamF4Q29udGVudFR5cGUpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFNldCByZXF1ZXN0IGhlYWRlcnNcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIHNldFJlcXVlc3RIZWFkZXJzKCkge1xyXG4gIGxldCBpO1xyXG4gIGxldCBoZWFkZXJOYW1lO1xyXG4gIGxldCBoZWFkZXJWYWx1ZTtcclxuXHJcbiAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMuYWpheFJlcXVlc3RIZWFkZXJzID09PSAnb2JqZWN0Jykge1xyXG4gICAgZm9yIChpIGluIHRoaXMub3B0aW9ucy5hamF4UmVxdWVzdEhlYWRlcnMpIHtcclxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5hamF4UmVxdWVzdEhlYWRlcnMuaGFzT3duUHJvcGVydHkoaSkpIHtcclxuICAgICAgICBoZWFkZXJOYW1lID0gaTtcclxuICAgICAgICBoZWFkZXJWYWx1ZSA9ICh0eXBlb2YgdGhpcy5vcHRpb25zLmFqYXhSZXF1ZXN0SGVhZGVyc1tpXSA9PT0gJ3N0cmluZycpID9cclxuICAgICAgICAgIHRoaXMub3B0aW9ucy5hamF4UmVxdWVzdEhlYWRlcnNbaV0gOlxyXG4gICAgICAgICAgJyc7XHJcbiAgICAgICAgdGhpcy54aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXJOYW1lLCBoZWFkZXJWYWx1ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXR1cCBYSFIgb25BYm9ydCBvcHRpb25cclxuICpcclxuICovXHJcbmZ1bmN0aW9uIHNldHVwWEhST25BYm9ydCgpIHtcclxuICB0aGlzLnhoci5vbmFib3J0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5lbWl0KCdvbkFib3J0JywgdGhpcy54aHIpO1xyXG4gIH0uYmluZCh0aGlzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldHVwIFhIUiBvblRpbWVvdXRcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIHNldHVwWEhST25UaW1lb3V0KCkge1xyXG4gIGlmICh0aGlzLm9wdGlvbnMuYWpheFRpbWVvdXQpIHtcclxuICAgIHRoaXMueGhyLnRpbWVvdXQgPSB0aGlzLm9wdGlvbnMuYWpheFRpbWVvdXQ7XHJcbiAgfVxyXG4gIHRoaXMueGhyLm9uYWJvcnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmVtaXQoJ29uVGltZW91dCcsIHRoaXMueGhyKTtcclxuICB9LmJpbmQodGhpcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXR1cCBYSFIgb25SZWFkeVN0YXRlQ2hhbmdlXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBzZXR1cE9uUmVhZHlTdGF0ZUNoYW5nZSgpIHtcclxuICBsZXQgeGhyUmVzdWx0O1xyXG5cclxuICBpZiAodGhpcy54aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xyXG4gICAgeGhyUmVzdWx0ID0gcGFyc2VYaHJSZXNwb25zZS5jYWxsKHRoaXMpO1xyXG4gICAgaWYgKHRoaXMueGhyLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy54aHIuc3RhdHVzIDwgMzAwKSB7XHJcbiAgICAgIHRoaXMuZW1pdCgnb25TdWNjZXNzJywgdGhpcy54aHIsIHhoclJlc3VsdCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmVtaXQoJ29uRXJyb3InLCB0aGlzLnhociwgeGhyUmVzdWx0KTtcclxuICAgIH1cclxuICAgIHRoaXMuZW1pdCgnb25Db21wbGV0ZScsIHRoaXMueGhyLCB4aHJSZXN1bHQpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFNldHVwIFhIUiByZWFkeVxyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gc2V0dXBYSFJSZWFkeVN0YXRlKCkge1xyXG4gIHRoaXMueGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IHNldHVwT25SZWFkeVN0YXRlQ2hhbmdlLmJpbmQodGhpcyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVcGRhdGUgWEhSIG9wdGlvbnNcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIHVwZGF0ZVhIUk9wdGlvbnMoKSB7XHJcbiAgc2V0dXBYSFJPbkFib3J0LmNhbGwodGhpcyk7XHJcbiAgc2V0dXBYSFJPblRpbWVvdXQuY2FsbCh0aGlzKTtcclxuICBzZXR1cFhIUlJlYWR5U3RhdGUuY2FsbCh0aGlzKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBamF4IGNsYXNzXHJcbiAqXHJcbiAqIEBleHBvcnRcclxuICogQGNsYXNzIEFqYXhcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFqYXgge1xyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQWpheC5cclxuICAgKiBAcGFyYW0geyp9IG9wdGlvbnNcclxuICAgKiBAbWVtYmVyb2YgQWpheFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICB0aGlzLnhociA9IG51bGw7XHJcbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgY3JlYXRlWEhSLmNhbGwodGhpcyk7XHJcbiAgICB1cGRhdGVYSFJPcHRpb25zLmNhbGwodGhpcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaXJlIGFjdHVhbCBhamF4IHJlcXVlc3RcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Kn0gZGF0YVxyXG4gICAqIEBtZW1iZXJvZiBBamF4XHJcbiAgICovXHJcbiAgZG9SZXF1ZXN0KGRhdGEpIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuYWpheFVybCA9PT0gZmFsc2UgfHwgdHlwZW9mIHRoaXMub3B0aW9ucy5hamF4VXJsICE9PSAnc3RyaW5nJykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgQWpheCBVUkwnKTtcclxuICAgIH1cclxuICAgIHRoaXMueGhyLm9wZW4oXHJcbiAgICAgIHRoaXMub3B0aW9ucy5hamF4TWV0aG9kLFxyXG4gICAgICB0aGlzLm9wdGlvbnMuYWpheFVybCxcclxuICAgICAgdGhpcy5vcHRpb25zLmFqYXhBc3luYyxcclxuICAgICAgdGhpcy5vcHRpb25zLmFqYXhVc2VyTmFtZSxcclxuICAgICAgdGhpcy5vcHRpb25zLmFqYXhQYXNzd29yZFxyXG4gICAgKTtcclxuICAgIHNldENvbnRlbnRUeXBlLmNhbGwodGhpcyk7XHJcbiAgICBzZXRSZXF1ZXN0SGVhZGVycy5jYWxsKHRoaXMpO1xyXG4gICAgdGhpcy54aHIuc2VuZChkYXRhKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCBhamF4IG9wdGlvbnMgZnJvbSBvdXRzaWRlXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyp9IG9wdHNcclxuICAgKiBAcmV0dXJuc1xyXG4gICAqIEBtZW1iZXJvZiBBamF4XHJcbiAgICovXHJcbiAgc2V0T3B0aW9ucyhvcHRzKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBleHRlbmQodGhpcy5vcHRpb25zLCBvcHRzKTtcclxuICAgIHVwZGF0ZVhIUk9wdGlvbnMuY2FsbCh0aGlzKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTGlzdGVuIGV2ZW50cyBvbiB0aGUgY2xhc3NcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Kn0gZXZlbnRcclxuICAgKiBAcGFyYW0geyp9IGhhbmRsZXJcclxuICAgKiBAcGFyYW0geyp9IGNvbnRleHRcclxuICAgKiBAbWVtYmVyb2YgQWpheFxyXG4gICAqL1xyXG4gIG9uKGV2ZW50LCBoYW5kbGVyLCBjb250ZXh0KSB7XHJcbiAgICB0aGlzLmVtaXR0ZXIub24oZXZlbnQsIGhhbmRsZXIsIGNvbnRleHQgfHwgdW5kZWZpbmVkKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBNYWtlIHRoZSBjbGFzcyBhbiBldmVudCBlbWl0dGVyXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyp9IGV2ZW50XHJcbiAgICogQHBhcmFtIHsqfSBhMVxyXG4gICAqIEBwYXJhbSB7Kn0gYTJcclxuICAgKiBAcGFyYW0geyp9IGEzXHJcbiAgICogQHBhcmFtIHsqfSBhNFxyXG4gICAqIEBwYXJhbSB7Kn0gYTVcclxuICAgKiBAbWVtYmVyb2YgQWpheFxyXG4gICAqL1xyXG4gIGVtaXQoZXZlbnQsIGExLCBhMiwgYTMsIGE0LCBhNSkge1xyXG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoZXZlbnQsIGExLCBhMiwgYTMsIGE0LCBhNSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBBamF4IGZyb20gJy4vQWpheCc7XHJcbmltcG9ydCBSZXNwb25zZUhhbmRsZXIgZnJvbSAnLi9SZXNwb25zZUhhbmRsZXInO1xyXG5pbXBvcnQgZGVmYXVsdE9wdGlvbnMgZnJvbSAnLi9lbGVtZW50T3B0cyc7XHJcbmltcG9ydCB7IHRvQ2FtZWxDYXNlLCBleHRlbmQgfSBmcm9tICcuLi91dGlscyc7XHJcblxyXG5jb25zdCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudGVtaXR0ZXIzJyk7XHJcblxyXG4vKipcclxuICogQmluZCBYSFIgZXZlbnRzXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBiaW5kWGhyRXZlbnRzKCkge1xyXG4gIHRoaXMuYWpheC5vbignb25TdWNjZXNzJywgKHgsIHIpID0+IHRoaXMuZW1pdCgnYWpheGFibGU6b24tYWpheC1zdWNjZXNzJywgeCwgciksIHRoaXMpO1xyXG4gIHRoaXMuYWpheC5vbignb25FcnJvcicsICh4LCByKSA9PiB0aGlzLmVtaXQoJ2FqYXhhYmxlOm9uLWFqYXgtZXJyb3InLCB4LCByKSwgdGhpcyk7XHJcbiAgdGhpcy5hamF4Lm9uKCdvbkNvbXBsZXRlJywgKHgsIHIpID0+IHRoaXMuZW1pdCgnYWpheGFibGU6b24tYWpheC1jb21wbGV0ZScsIHgsIHIpLCB0aGlzKTtcclxuICB0aGlzLmFqYXgub24oJ29uQWJvcnQnLCAoeCwgcikgPT4gdGhpcy5lbWl0KCdhamF4YWJsZTpvbi1hamF4LWFib3J0JywgeCwgciksIHRoaXMpO1xyXG4gIHRoaXMuYWpheC5vbignb25UaW1lb3V0JywgKHgsIHIpID0+IHRoaXMuZW1pdCgnYWpheGFibGU6b24tYWpheC10aW1lb3V0JywgeCwgciksIHRoaXMpO1xyXG59XHJcblxyXG4vKipcclxuICogQmluZCBjbGFzcyBhamF4IGV2ZW50c1xyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gYmluZENsYXNzRXZlbnRzKCkge1xyXG4gIGNvbnN0IHJlc0hhbmRsciA9IHRoaXMucmVzcG9uc2VIYW5kbGVyO1xyXG5cclxuICB0aGlzLm9uKCdhamF4YWJsZTpvbi1hamF4LWJlZm9yZScsIHJlc0hhbmRsci5iZWZvcmVTZW5kLmJpbmQocmVzSGFuZGxyKSwgdGhpcyk7XHJcbiAgdGhpcy5vbignYWpheGFibGU6b24tYWpheC1zdWNjZXNzJywgcmVzSGFuZGxyLm9uU3VjY2Vzcy5iaW5kKHJlc0hhbmRsciksIHRoaXMpO1xyXG4gIHRoaXMub24oJ2FqYXhhYmxlOm9uLWFqYXgtZXJyb3InLCByZXNIYW5kbHIub25FcnJvci5iaW5kKHJlc0hhbmRsciksIHRoaXMpO1xyXG4gIHRoaXMub24oJ2FqYXhhYmxlOm9uLWFqYXgtY29tcGxldGUnLCByZXNIYW5kbHIub25Db21wbGV0ZS5iaW5kKHJlc0hhbmRsciksIHRoaXMpO1xyXG4gIHRoaXMub24oJ2FqYXhhYmxlOm9uLWFqYXgtYWJvcnQnLCByZXNIYW5kbHIub25BYm9ydC5iaW5kKHJlc0hhbmRsciksIHRoaXMpO1xyXG4gIHRoaXMub24oJ2FqYXhhYmxlOm9uLWFqYXgtdGltZW91dCcsIHJlc0hhbmRsci5vblRpbWVvdXQuYmluZChyZXNIYW5kbHIpLCB0aGlzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEJpbmQgZWxlbWVudCBkb20gZXZlbnRzXHJcbiAqXHJcbiAqL1xyXG5mdW5jdGlvbiBiaW5kRWxlbWVudEV2ZW50cygpIHtcclxuICBjb25zdCBjdHggPSB0aGlzO1xyXG4gIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnQ7XHJcblxyXG4gIC8vIEZpcmUgYWpheCBhZnRlciBjZXJ0YWluIHRpbWVcclxuICBjb25zdCBiaW5kVGltZWRBamF4ID0gKCkgPT4ge1xyXG4gICAgY3R4LnJlcXVlc3RUaW1lcklkID0gc2V0VGltZW91dCgoKCkgPT5cclxuICAgICAgdGhpcy5zdGFydEFqYXhSZXF1ZXN0KCkpLCBjdHgub3B0aW9ucy5yZXF1ZXN0VGltZW91dCk7XHJcbiAgfTtcclxuXHJcbiAgLy8gRmlyZSBhamF4IG9uIHBhcnRpY3VsYXIgaW50ZXJ2YWxcclxuICBjb25zdCBiaW5kSW50ZXJ2YWxBamF4ID0gKCkgPT4ge1xyXG4gICAgY3R4LnJlcXVlc3RJbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoKCgpID0+XHJcbiAgICAgIHRoaXMuc3RhcnRBamF4UmVxdWVzdCgpKSwgY3R4Lm9wdGlvbnMucmVxdWVzdEludGVydmFsKTtcclxuICB9O1xyXG5cclxuICAvLyBGaXJlIGFqYXggb24gY2xpY2tcclxuICBjb25zdCBiaW5kQ2xpY2tBamF4ID0gKCkgPT4ge1xyXG4gICAgY3R4LmNsaWNrQWpheEhhbmRsZXIgPSAoKGV2ZW50KSA9PiB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGN0eC5zdGFydEFqYXhSZXF1ZXN0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3R4LmNsaWNrQWpheEhhbmRsZXIsIGZhbHNlKTtcclxuICB9O1xyXG5cclxuICAvLyBGaXJlIGFqYXggb24gaG92ZXJcclxuICBjb25zdCBiaW5kSG92ZXJBamF4ID0gKCkgPT4ge1xyXG4gICAgY3R4LmhvdmVyQWpheEhhbmRsZXIgPSAoKGV2ZW50KSA9PiB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGN0eC5zdGFydEFqYXhSZXF1ZXN0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2hvdmVyJywgY3R4LmhvdmVyQWpheEhhbmRsZXIsIGZhbHNlKTtcclxuICB9O1xyXG5cclxuICAvLyBGaXJlIGFqYXggb24gc3VibWl0XHJcbiAgY29uc3QgYmluZFN1Ym1pdEFqYXggPSAoKSA9PiB7XHJcbiAgICBjdHguc3VibWl0QWpheEhhbmRsZXIgPSAoKGV2ZW50KSA9PiB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGN0eC5zdGFydEFqYXhSZXF1ZXN0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGN0eC5zdWJtaXRBamF4SGFuZGxlciwgZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gIGlmIChlbGVtZW50Lm5vZGVOYW1lID09PSAnRk9STScpIHtcclxuICAgIGJpbmRTdWJtaXRBamF4KCk7XHJcbiAgfVxyXG5cclxuICBzd2l0Y2ggKGN0eC5vcHRpb25zLnRyaWdnZXJUeXBlKSB7XHJcbiAgICBjYXNlICd0aW1lb3V0JzpcclxuICAgICAgYmluZFRpbWVkQWpheCgpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ2ludGVydmFsJzpcclxuICAgICAgYmluZEludGVydmFsQWpheCgpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ2NsaWNrJzpcclxuICAgICAgYmluZENsaWNrQWpheCgpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ2hvdmVyJzpcclxuICAgICAgYmluZEhvdmVyQWpheCgpO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIERldGFjaCBlbGVtZW50IGRvbSBldmVudHNcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIGRldGF0Y2hFbGVtZW50RXZlbnRzKCkge1xyXG4gIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnQ7XHJcblxyXG4gIGlmIChlbGVtZW50Lm5vZGVOYW1lID09PSAnRk9STScpIHtcclxuICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5zdWJtaXRBamF4SGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICBzd2l0Y2ggKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWFqYXhhYmxlLXRyaWdnZXItdHlwZScpKSB7XHJcbiAgICBjYXNlICd0aW1lb3V0JzpcclxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucmVxdWVzdFRpbWVySWQpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ2ludGVydmFsJzpcclxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucmVxdWVzdEludGVydmFsSWQpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ2NsaWNrJzpcclxuICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tBamF4SGFuZGxlcik7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnaG92ZXInOlxyXG4gICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5ob3ZlckFqYXhIYW5kbGVyKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBicmVhaztcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVcGRhdGUgZWxlbWVudCBhdHRyaWJ1dGVzIHRvIG9wdGlvbnNcclxuICpcclxuICovXHJcbmZ1bmN0aW9uIHVwZGF0ZUVsZW1lbnRBdHRyaWJ1dGVzVG9PcHRpb25zKCkge1xyXG4gIGxldCBhdHRyaWJ1dGU7XHJcbiAgbGV0IGk7XHJcbiAgY29uc3QgZWxlbWVudCA9IHRoaXMuZWxlbWVudDtcclxuICBjb25zdCBhdHRycyA9IGVsZW1lbnQuYXR0cmlidXRlcztcclxuICBjb25zdCBsZW5ndGggPSBhdHRycy5sZW5ndGg7XHJcblxyXG4gIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkgPSBpICsgMSkge1xyXG4gICAgYXR0cmlidXRlID0gYXR0cnNbaV07XHJcbiAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9uc1t0b0NhbWVsQ2FzZShhdHRyaWJ1dGUubm9kZU5hbWUpXSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgdGhpcy5vcHRpb25zW3RvQ2FtZWxDYXNlKGF0dHJpYnV0ZS5ub2RlTmFtZSldID0gYXR0cmlidXRlLm5vZGVWYWx1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmICh0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCdocmVmJykpIHtcclxuICAgIHRoaXMub3B0aW9uc1snYWpheFVybCddID0gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZSgnaHJlZicpO1xyXG4gIH0gZWxzZSBpZiAodGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZSgnYWN0aW9uJykpIHtcclxuICAgIHRoaXMub3B0aW9uc1snYWpheFVybCddID0gdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZSgnYWN0aW9uJyk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogUHJlcGFyZSBhamF4IHJlcXVlc3QgZGF0YSBiZWZvcmUgc2VuZFxyXG4gKlxyXG4gKi9cclxuZnVuY3Rpb24gcHJlcGFyZUFqYXhSZXF1ZXN0RGF0YSgpIHtcclxuICB0aGlzLmVtaXQoJ2FqYXhhYmxlOm9uLWFqYXgtYmVmb3JlJywgdGhpcy5vcHRpb25zLmFqYXhEYXRhKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWxlbWVudCB7XHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBFbGVtZW50LlxyXG4gICAqIEBwYXJhbSB7Kn0gZWxlbWVudFxyXG4gICAqIEBwYXJhbSB7Kn0gb3B0aW9uc1xyXG4gICAqIEBtZW1iZXJvZiBFbGVtZW50XHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgb3B0aW9ucykge1xyXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgIHRoaXMub3B0aW9ucyA9ICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ29iamVjdCcpID8gZXh0ZW5kKGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKSA6IGRlZmF1bHRPcHRpb25zO1xyXG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgdGhpcy5hamF4ID0gbmV3IEFqYXgodGhpcy5vcHRpb25zKTtcclxuICAgIHRoaXMucmVzcG9uc2VIYW5kbGVyID0gbmV3IFJlc3BvbnNlSGFuZGxlcih0aGlzKTtcclxuXHJcbiAgICBiaW5kWGhyRXZlbnRzLmNhbGwodGhpcyk7XHJcbiAgICBiaW5kQ2xhc3NFdmVudHMuY2FsbCh0aGlzKTtcclxuICAgIGJpbmRFbGVtZW50RXZlbnRzLmNhbGwodGhpcyk7XHJcbiAgICB1cGRhdGVFbGVtZW50QXR0cmlidXRlc1RvT3B0aW9ucy5jYWxsKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnQgYWpheCByZXF1ZXN0IG9uIHRoZSBlbGVtZW50XHJcbiAgICpcclxuICAgKiBAbWVtYmVyb2YgRWxlbWVudFxyXG4gICAqL1xyXG4gIHN0YXJ0QWpheFJlcXVlc3QoKSB7XHJcbiAgICBjb25zdCBkYXRhID0gcHJlcGFyZUFqYXhSZXF1ZXN0RGF0YS5jYWxsKHRoaXMpO1xyXG5cclxuICAgIHRoaXMuYWpheC5kb1JlcXVlc3QoZGF0YSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZXN0cm95IGFqYXhhYmxlIG9uIGVsZW1lbnRcclxuICAgKlxyXG4gICAqIEBtZW1iZXJvZiBFbGVtZW50XHJcbiAgICovXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIGRldGF0Y2hFbGVtZW50RXZlbnRzLmNhbGwodGhpcywgdGhpcy5lbGVtZW50KTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBHZXQgRG9tIGVsZW1lbnRcclxuICAgKlxyXG4gICAqIEByZXR1cm5zXHJcbiAgICogQG1lbWJlcm9mIEVsZW1lbnRcclxuICAgKi9cclxuICBnZXREb21FbGVtZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCBlbGVtZW50IG9wdGlvbnMgb25jZSB0aGUgQWpheGFibGUgaGFzIGJlZW4gaW5zdGFuaWF0ZWRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Kn0gb3B0c1xyXG4gICAqIEByZXR1cm5zXHJcbiAgICogQG1lbWJlcm9mIEVsZW1lbnRcclxuICAgKi9cclxuICBzZXRPcHRpb25zKG9wdHMpIHtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnQ7XHJcbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gZWxlbWVudC5hdHRyaWJ1dGVzO1xyXG4gICAgY29uc3QgYXR0ckxlbmd0aCA9IGF0dHJpYnV0ZXMubGVuZ3RoO1xyXG4gICAgY29uc3QgZWxlbWVudEF0dHJpYnV0ZU5vZGVzID0gW107XHJcbiAgICBsZXQgaTtcclxuICAgIGxldCBrO1xyXG5cclxuICAgIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ29iamVjdCcpIHtcclxuXHJcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBhdHRyTGVuZ3RoOyBpID0gaSArIDEpIHtcclxuICAgICAgICBlbGVtZW50QXR0cmlidXRlTm9kZXMucHVzaCh0b0NhbWVsQ2FzZShhdHRyaWJ1dGVzW2ldLm5vZGVOYW1lKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZvciAoayBpbiBvcHRzKSB7XHJcbiAgICAgICAgaWYgKG9wdHMuaGFzT3duUHJvcGVydHkoaykpIHtcclxuICAgICAgICAgIGlmIChlbGVtZW50QXR0cmlidXRlTm9kZXMuaW5kZXhPZihrKSA+IDApIHtcclxuICAgICAgICAgICAgZGVsZXRlIG9wdHNba107XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLm9wdGlvbnMgPSAodHlwZW9mIG9wdHMgPT09ICdvYmplY3QnKSA/IGV4dGVuZCh0aGlzLm9wdGlvbnMsIG9wdHMpIDogdGhpcy5vcHRpb25zO1xyXG4gICAgYmluZENsYXNzRXZlbnRzLmNhbGwodGhpcyk7XHJcbiAgICB0aGlzLmFqYXguc2V0T3B0aW9ucyh0aGlzLm9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogQmluZCBldmVudCB0byBFbGVtZW50XHJcbiAgICpcclxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IGV2ZW50XHJcbiAgICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcclxuICAgKiBAcGFyYW0gIHtPYmplY3R9IGNvbnRleHRcclxuICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAqL1xyXG4gIG9uKGV2ZW50LCBoYW5kbGVyLCBjb250ZXh0KSB7XHJcbiAgICB0aGlzLmVtaXR0ZXIub24oZXZlbnQsIGhhbmRsZXIsIGNvbnRleHQgfHwgdW5kZWZpbmVkKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBFbWl0IGV2ZW50cyBiaW5kIHRvIEVsZW1lbnRcclxuICAgKlxyXG4gICAqIEBwYXJhbSAge1N0cmluZ30gZXZlbnRcclxuICAgKiBAcGFyYW0gIHttaXhlZH0gYTFcclxuICAgKiBAcGFyYW0gIHttaXhlZH0gYTJcclxuICAgKiBAcGFyYW0gIHttaXhlZH0gYTNcclxuICAgKiBAcGFyYW0gIHttaXhlZH0gYTRcclxuICAgKiBAcGFyYW0gIHttaXhlZH0gYTVcclxuICAgKiBAcmV0dXJuIHsqfVxyXG4gICAqL1xyXG4gIGVtaXQoZXZlbnQsIGExLCBhMiwgYTMsIGE0LCBhNSkge1xyXG4gICAgcmV0dXJuIHRoaXMuZW1pdHRlci5lbWl0KGV2ZW50LCBhMSwgYTIsIGEzLCBhNCwgYTUpO1xyXG4gIH1cclxufTtcclxuIiwiaW1wb3J0IHsgcmVzb2x2ZUZ1bmN0aW9uTmFtZSB9IGZyb20gJy4uL3V0aWxzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3BvbnNlSGFuZGxlciB7XHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBSZXNwb25zZUhhbmRsZXIuXHJcbiAgICogQHBhcmFtIHsqfSBlbGVtZW50XHJcbiAgICogQG1lbWJlcm9mIFJlc3BvbnNlSGFuZGxlclxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcclxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGUgYWpheCBiZWZvcmVTZW5kXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyp9IGRhdGFUb1NlbmRcclxuICAgKiBAbWVtYmVyb2YgUmVzcG9uc2VIYW5kbGVyXHJcbiAgICovXHJcbiAgYmVmb3JlU2VuZChkYXRhVG9TZW5kKSB7XHJcbiAgICBjb25zdCBvcHRzID0gdGhpcy5lbGVtZW50Lm9wdGlvbnM7XHJcbiAgICBjb25zdCBoYW5kbGVyID0gcmVzb2x2ZUZ1bmN0aW9uTmFtZShvcHRzLmFqYXhCZWZvcmVTZW5kKTtcclxuXHJcbiAgICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgcmV0dXJuIGhhbmRsZXIuY2FsbCh0aGlzLmVsZW1lbnQsIGRhdGFUb1NlbmQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkYXRhVG9TZW5kO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlIGFqYXggb25TdWNjZXNzXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyp9IHhoclxyXG4gICAqIEBwYXJhbSB7Kn0gcmVzcG9uc2VcclxuICAgKiBAbWVtYmVyb2YgUmVzcG9uc2VIYW5kbGVyXHJcbiAgICovXHJcbiAgb25TdWNjZXNzKHhociwgcmVzcG9uc2UpIHtcclxuICAgIGNvbnN0IG9wdHMgPSB0aGlzLmVsZW1lbnQub3B0aW9ucztcclxuICAgIGNvbnN0IGhhbmRsZXIgPSByZXNvbHZlRnVuY3Rpb25OYW1lKG9wdHMuYWpheE9uU3VjY2Vzcyk7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLmVsZW1lbnQsIHhociwgcmVzcG9uc2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlIGFqYXggb25FcnJvclxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsqfSB4aHJcclxuICAgKiBAcGFyYW0geyp9IHJlc3BvbnNlXHJcbiAgICogQG1lbWJlcm9mIFJlc3BvbnNlSGFuZGxlclxyXG4gICAqL1xyXG4gIG9uRXJyb3IoeGhyLCByZXNwb25zZSkge1xyXG4gICAgY29uc29sZS5sb2coeGhyKTtcclxuICAgIGNvbnN0IG9wdHMgPSB0aGlzLmVsZW1lbnQub3B0aW9ucztcclxuICAgIGNvbnN0IGhhbmRsZXIgPSByZXNvbHZlRnVuY3Rpb25OYW1lKG9wdHMuYWpheE9uRXJyb3IpO1xyXG5cclxuICAgIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICBoYW5kbGVyLmNhbGwodGhpcy5lbGVtZW50LCB4aHIsIHJlc3BvbnNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZSBhamF4IG9uQ29tcGxldGVcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Kn0geGhyXHJcbiAgICogQHBhcmFtIHsqfSByZXNwb25zZVxyXG4gICAqIEBtZW1iZXJvZiBSZXNwb25zZUhhbmRsZXJcclxuICAgKi9cclxuICBvbkNvbXBsZXRlKHhociwgcmVzcG9uc2UpIHtcclxuICAgIGNvbnN0IG9wdHMgPSB0aGlzLmVsZW1lbnQub3B0aW9ucztcclxuICAgIGNvbnN0IGhhbmRsZXIgPSByZXNvbHZlRnVuY3Rpb25OYW1lKG9wdHMuYWpheE9uQ29tcGxldGUpO1xyXG5cclxuICAgIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICBoYW5kbGVyLmNhbGwodGhpcy5lbGVtZW50LCB4aHIsIHJlc3BvbnNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZSBhamF4IG9uQWJvcnRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Kn0geGhyXHJcbiAgICogQHBhcmFtIHsqfSByZXNwb25zZVxyXG4gICAqIEBtZW1iZXJvZiBSZXNwb25zZUhhbmRsZXJcclxuICAgKi9cclxuICBvbkFib3J0KHhociwgcmVzcG9uc2UpIHtcclxuICAgIGNvbnN0IG9wdHMgPSB0aGlzLmVsZW1lbnQub3B0aW9ucztcclxuICAgIGNvbnN0IGhhbmRsZXIgPSByZXNvbHZlRnVuY3Rpb25OYW1lKG9wdHMuYWpheE9uQWJvcnQpO1xyXG5cclxuICAgIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICBoYW5kbGVyLmNhbGwodGhpcy5lbGVtZW50LCB4aHIsIHJlc3BvbnNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZSBhamF4IG9uVGltZW91dFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsqfSB4aHJcclxuICAgKiBAcGFyYW0geyp9IHJlc3BvbnNlXHJcbiAgICogQG1lbWJlcm9mIFJlc3BvbnNlSGFuZGxlclxyXG4gICAqL1xyXG4gIG9uVGltZW91dCh4aHIsIHJlc3BvbnNlKSB7XHJcbiAgICBjb25zdCBvcHRzID0gdGhpcy5lbGVtZW50Lm9wdGlvbnM7XHJcbiAgICBjb25zdCBoYW5kbGVyID0gcmVzb2x2ZUZ1bmN0aW9uTmFtZShvcHRzLmFqYXhPblRpbWVvdXQpO1xyXG5cclxuICAgIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICBoYW5kbGVyLmNhbGwodGhpcy5lbGVtZW50LCB4aHIsIHJlc3BvbnNlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQge1xyXG4gIHRyaWdnZXJUeXBlOiAnY2xpY2snLFxyXG4gIHJlcXVlc3RUaW1lb3V0OiAxMDAwLFxyXG4gIHJlcXVlc3RJbnRlcnZhbDogMTAwMCxcclxuICBhamF4VXJsOiBmYWxzZSxcclxuICBhamF4TWV0aG9kOiAnUE9TVCcsXHJcbiAgYWpheEFzeW5jOiB0cnVlLFxyXG4gIGFqYXhVc2VyTmFtZTogbnVsbCxcclxuICBhamF4UGFzc3dvcmQ6IG51bGwsXHJcbiAgYWpheENvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcclxuICBhamF4VGltZW91dDogMzAwMDAsXHJcbiAgYWpheFJlcXVlc3RIZWFkZXJzOiB7J3gtcmVxdWVzdC13aXRoJzogJ3NtYXJ0YWpheCd9LFxyXG4gIGFqYXhEYXRhOiB7fSxcclxuICBhamF4QmVmb3JlU2VuZDogbnVsbCxcclxuICBhamF4T25TdWNjZXNzOiBudWxsLFxyXG4gIGFqYXhPbkVycm9yOiBudWxsLFxyXG4gIGFqYXhPbkNvbXBsZXRlOiBudWxsLFxyXG4gIGFqYXhPbkFib3J0OiBudWxsLFxyXG4gIGFqYXhPblRpbWVvdXQ6IG51bGwsXHJcbiAgYWpheFNob3dMb2FkZXI6IGZhbHNlLFxyXG4gIGFqYXhMb2FkZXJDb250YWluZXI6IGRvY3VtZW50LmJvZHksXHJcbiAgYWpheERvQ29uZmlybTogZmFsc2UsXHJcbiAgZG9tUmVwbGFjZVRvOiBmYWxzZSxcclxuICBkb21SZXBsYWNlQ2xvc2VzdFRvOiBmYWxzZSxcclxuICBkb21SZXBsYWNlSW5uZXJUbzogZmFsc2UsXHJcbiAgZG9tUmVwbGFjZUNsb3Nlc3RJbm5lclRvOiBmYWxzZSxcclxuICBkb21BcHBlbmRUbzogZmFsc2UsXHJcbiAgZG9tUHJlcGFuZFRvOiBmYWxzZSxcclxuICBkb21DbGVhclRvOiBmYWxzZSxcclxuICBkb21DbGVhckNsb3Nlc3RUbzogZmFsc2UsXHJcbiAgZG9tUmVtb3ZlVG86IGZhbHNlLFxyXG4gIGRvbVJlbW92ZUNsb3Nlc3RUbzogZmFsc2UsXHJcbiAgbm90aWZpY2F0aW9uVHlwZTogJ2FsZXJ0JywgLy8gdG9hc3RyfGFsZXJ0fHN3YWxcclxuICBhbGVydE9wdGlvbnM6IHt9LFxyXG4gIHRvYXN0ck9wdGlvbnM6IHt9LFxyXG4gIHN3YWxPcHRpb25zOiB7fVxyXG59O1xyXG4iLCJpbXBvcnQgRWxlbWVudCBmcm9tICcuL2NvcmUvRWxlbWVudCc7XHJcbmltcG9ydCB7IGV4dGVuZCwgaXNFbGVtZW50LCB1dWlkIH0gZnJvbSAnLi91dGlscyc7XHJcblxyXG5jb25zdCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudGVtaXR0ZXIzJyk7XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGVsZW1lbnRzIGFycmF5IGJhc2VkIG9uIHByb3ZpZGVkIHNlbGVjdG9yXHJcbiAqXHJcbiAqIEBwYXJhbSB7Kn0gc2VsZWN0b3JcclxuICogQHBhcmFtIHsqfSBmaWx0ZXJFbGVtZW50c1xyXG4gKiBAcmV0dXJucyBhcnJheVxyXG4gKi9cclxuZnVuY3Rpb24gX2NyZWF0ZUVsZW1lbnRzQXJyYXkoc2VsZWN0b3IsIGZpbHRlckVsZW1lbnRzKSB7XHJcbiAgbGV0IGVsZW1lbnRzID0gW107XHJcbiAgbGV0IGk7XHJcbiAgbGV0IGVsO1xyXG5cclxuICBpZiAoIXNlbGVjdG9yKSB7XHJcbiAgICBzZWxlY3RvciA9IFtdO1xyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcclxuICAgIHNlbGVjdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgfVxyXG5cclxuICBpZiAoaXNFbGVtZW50KHNlbGVjdG9yKSkge1xyXG4gICAgc2VsZWN0b3IgPSBbc2VsZWN0b3JdO1xyXG4gIH1cclxuXHJcbiAgaWYgKGZpbHRlckVsZW1lbnRzKSB7XHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgc2VsZWN0b3IubGVuZ3RoOyBpID0gaSArIDEpIHtcclxuICAgICAgZWwgPSBzZWxlY3RvcltpXTtcclxuICAgICAgaWYgKGlzRWxlbWVudChlbCkgJiYgIWVsLmdldEF0dHJpYnV0ZSgnZGF0YS1hamF4YWJsZS1pZCcpKSB7XHJcbiAgICAgICAgZWxlbWVudHMucHVzaChlbCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgZWxlbWVudHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkoc2VsZWN0b3IpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGVsZW1lbnRzO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIEVsZW1lbnQgaW5zdGFuY2VcclxuICpcclxuICogQHBhcmFtIHsqfSBlbGVtZW50XHJcbiAqIEByZXR1cm5zXHJcbiAqL1xyXG5mdW5jdGlvbiBfY3JlYXRlRWxlbWVudEluc3RhbmNlKGVsZW1lbnQpIHtcclxuICB2YXIgdW5pcXVlSWQgPSB1dWlkKCk7XHJcblxyXG4gIGlmICghZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYWpheGFibGUtaWQnKSkge1xyXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWpheGFibGUtaWQnLCB1bmlxdWVJZCk7XHJcbiAgICBlbGVtZW50ID0gbmV3IEVsZW1lbnQoZWxlbWVudCwgdGhpcy5vcHRpb25zKTtcclxuICAgIHJldHVybiBlbGVtZW50O1xyXG4gIH1cclxuICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFqYXhhYmxlIHtcclxuICAvKipcclxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEFqYXhhYmxlLlxyXG4gICAqIEBwYXJhbSB7Kn0gZWxlbWVudHNcclxuICAgKiBAcGFyYW0geyp9IG9wdGlvbnNcclxuICAgKiBAbWVtYmVyb2YgQWpheGFibGVcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihlbGVtZW50cywgb3B0aW9ucykge1xyXG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgdGhpcy5vcHRpb25zID0gKHR5cGVvZiBvcHRpb25zID09PSAnb2JqZWN0JykgPyBleHRlbmQoe30sIG9wdGlvbnMpIDoge307XHJcbiAgICB0aGlzLm9yaWdFbGVtZW50cyA9IGVsZW1lbnRzO1xyXG4gICAgdGhpcy5lbGVtZW50cyA9IFtdO1xyXG4gICAgdGhpcy5hZGRFbGVtZW50cyh0aGlzLm9yaWdFbGVtZW50cyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZWdpc3RlciBzZWxlY3RvciBlbGVtZW50cyB0byBhamF4YWJsZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsqfSBzZWxlY3RvclxyXG4gICAqIEByZXR1cm5zXHJcbiAgICogQG1lbWJlcm9mIEFqYXhhYmxlXHJcbiAgICovXHJcbiAgYWRkRWxlbWVudHMoc2VsZWN0b3IpIHtcclxuICAgIHZhciBlbGVtZW50cyA9IF9jcmVhdGVFbGVtZW50c0FycmF5KHNlbGVjdG9yLCB0cnVlKTtcclxuXHJcbiAgICBpZiAoZWxlbWVudHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBlbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICAgIGVsZW1lbnQgPSBfY3JlYXRlRWxlbWVudEluc3RhbmNlLmNhbGwodGhpcywgZWxlbWVudCk7XHJcbiAgICAgIHRoaXMuZWxlbWVudHMucHVzaChlbGVtZW50KTtcclxuICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVbi1yZWdpc3RlciBhZGRlZCBlbGVtZW50cyBiYWNrIHRvIG5hdGl2ZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsqfSBzZWxlY3RvclxyXG4gICAqIEBtZW1iZXJvZiBBamF4YWJsZVxyXG4gICAqL1xyXG4gIHJlbW92ZUVsZW1lbnRzKHNlbGVjdG9yKSB7XHJcbiAgICB2YXIgZWxlbWVudHMgPSBfY3JlYXRlRWxlbWVudHNBcnJheShzZWxlY3RvciksIGksIGs7XHJcblxyXG4gICAgaWYgKGVsZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgZm9yIChpIGluIGVsZW1lbnRzKSB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnRzW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS1hamF4YWJsZS1pZCcpKSB7XHJcbiAgICAgICAgICBmb3IgKGsgaW4gdGhpcy5lbGVtZW50cykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5lbGVtZW50c1trXS5nZXREb21FbGVtZW50KCkgPT09IGVsZW1lbnRzW2ldKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5lbGVtZW50c1trXS5nZXREb21FbGVtZW50KCkucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWFqYXhhYmxlLWlkJyk7XHJcbiAgICAgICAgICAgICAgdGhpcy5lbGVtZW50c1trXS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5zcGxpY2UoaywgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IGV4dGVuZCA9IChkZWZhdWx0cywgb3B0aW9ucykgPT4ge1xyXG4gIGNvbnN0IGV4dGVuZGVkID0ge307XHJcbiAgbGV0IHByb3A7XHJcblxyXG4gIGZvciAocHJvcCBpbiBkZWZhdWx0cykge1xyXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChkZWZhdWx0cywgcHJvcCkpIHtcclxuICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBkZWZhdWx0c1twcm9wXTtcclxuICAgIH1cclxuICB9XHJcbiAgZm9yIChwcm9wIGluIG9wdGlvbnMpIHtcclxuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3B0aW9ucywgcHJvcCkpIHtcclxuICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBvcHRpb25zW3Byb3BdO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gZXh0ZW5kZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaXNFbGVtZW50ID0gKG9iaikgPT4gISEob2JqICYmIG9iai5ub2RlVHlwZSA9PT0gMSk7XHJcblxyXG5leHBvcnQgY29uc3QgdXVpZCA9ICgpID0+IHtcclxuICBmdW5jdGlvbiBzNCgpIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKS50b1N0cmluZygxNikuc3Vic3RyaW5nKDEpO1xyXG4gIH1cclxuICByZXR1cm4gczQoKSArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KCk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcmVzb2x2ZUZ1bmN0aW9uTmFtZSA9IChmdW5jKSA9PiB7XHJcbiAgbGV0IG9iajtcclxuXHJcbiAgaWYgKHR5cGVvZiBmdW5jID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICByZXR1cm4gZnVuYztcclxuICB9XHJcbiAgaWYgKHR5cGVvZiBmdW5jID09PSAnc3RyaW5nJykge1xyXG4gICAgaWYgKGZ1bmMuaW5kZXhPZignLicpIDw9IC0xICYmIHR5cGVvZiB3aW5kb3dbZnVuY10gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgcmV0dXJuIHdpbmRvd1tmdW5jXTtcclxuICAgIH1cclxuICAgIG9iaiA9IGZ1bmMuc3BsaXQoJy4nKS5yZWR1Y2UoKG8sIGkpID0+IG9baV0sIHdpbmRvdyk7XHJcbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB0b0NhbWVsQ2FzZSA9IChzdHIpID0+IHtcclxuICBzdHIgPSBzdHIucmVwbGFjZSgnZGF0YS1hamF4YWJsZS0nLCAnJykucmVwbGFjZSgvLS9nLCAnICcpO1xyXG4gIHJldHVybiBzdHIucmVwbGFjZSgvKD86Xlxcd3xbQS1aXXxcXGJcXHcpL2csIChsZXR0ZXIsIGluZGV4KSA9PlxyXG4gICAgaW5kZXggPT09IDAgPyBsZXR0ZXIudG9Mb3dlckNhc2UoKSA6IGxldHRlci50b1VwcGVyQ2FzZSgpKS5yZXBsYWNlKC9cXHMrL2csICcnKTtcclxufTtcclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=