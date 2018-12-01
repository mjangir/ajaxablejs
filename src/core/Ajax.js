/* global
alert, confirm, console, prompt, require, module, ActiveXObject
*/
import { extend } from '../utils';

const EventEmitter = require('eventemitter3');

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
  let result;

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
  let i;
  let headerName;
  let headerValue;

  if (typeof this.options.ajaxRequestHeaders === 'object') {
    for (i in this.options.ajaxRequestHeaders) {
      if (this.options.ajaxRequestHeaders.hasOwnProperty(i)) {
        headerName = i;
        headerValue = (typeof this.options.ajaxRequestHeaders[i] === 'string') ?
          this.options.ajaxRequestHeaders[i] :
          '';
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
  let xhrResult;

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
};

/**
 * Ajax class
 *
 * @export
 * @class Ajax
 */
export default class Ajax {
  /**
   * Creates an instance of Ajax.
   * @param {*} options
   * @memberof Ajax
   */
  constructor(options) {
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
  doRequest(data) {
    if (this.options.ajaxUrl === false || typeof this.options.ajaxUrl !== 'string') {
      throw new Error('Invalid Ajax URL');
    }
    this.xhr.open(
      this.options.ajaxMethod,
      this.options.ajaxUrl,
      this.options.ajaxAsync,
      this.options.ajaxUserName,
      this.options.ajaxPassword
    );
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
  setOptions(opts) {
    this.options = extend(this.options, opts);
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
  on(event, handler, context) {
    this.emitter.on(event, handler, context || undefined);
  };

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
  emit(event, a1, a2, a3, a4, a5) {
    this.emitter.emit(event, a1, a2, a3, a4, a5);
  }
}
