import Ajax from './Ajax';
import ResponseHandler from './ResponseHandler';
import defaultOptions from './elementOpts';
import { toCamelCase, extend } from '../utils';

const EventEmitter = require('eventemitter3');

/**
 * Bind XHR events
 *
 */
function bindXhrEvents() {
  this.ajax.on('onSuccess', (x, r) => this.emit('ajaxable:on-ajax-success', x, r), this);
  this.ajax.on('onError', (x, r) => this.emit('ajaxable:on-ajax-error', x, r), this);
  this.ajax.on('onComplete', (x, r) => this.emit('ajaxable:on-ajax-complete', x, r), this);
  this.ajax.on('onAbort', (x, r) => this.emit('ajaxable:on-ajax-abort', x, r), this);
  this.ajax.on('onTimeout', (x, r) => this.emit('ajaxable:on-ajax-timeout', x, r), this);
}

/**
 * Bind class ajax events
 *
 */
function bindClassEvents() {
  const resHandlr = this.responseHandler;

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
  const ctx = this;
  const element = this.element;

  // Fire ajax after certain time
  const bindTimedAjax = () => {
    ctx.requestTimerId = setTimeout((() =>
      this.startAjaxRequest()), ctx.options.requestTimeout);
  };

  // Fire ajax on particular interval
  const bindIntervalAjax = () => {
    ctx.requestIntervalId = setInterval((() =>
      this.startAjaxRequest()), ctx.options.requestInterval);
  };

  // Fire ajax on click
  const bindClickAjax = () => {
    ctx.clickAjaxHandler = ((event) => {
      event.preventDefault();
      ctx.startAjaxRequest();
    });

    element.addEventListener('click', ctx.clickAjaxHandler, false);
  };

  // Fire ajax on hover
  const bindHoverAjax = () => {
    ctx.hoverAjaxHandler = ((event) => {
      event.preventDefault();
      ctx.startAjaxRequest();
    });

    element.addEventListener('hover', ctx.hoverAjaxHandler, false);
  };

  // Fire ajax on submit
  const bindSubmitAjax = () => {
    ctx.submitAjaxHandler = ((event) => {
      event.preventDefault();
      ctx.startAjaxRequest();
    });

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
  const element = this.element;

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
  let attribute;
  let i;
  const element = this.element;
  const attrs = element.attributes;
  const length = attrs.length;

  for (i = 0; i < length; i = i + 1) {
    attribute = attrs[i];
    if (typeof this.options[toCamelCase(attribute.nodeName)] !== 'undefined') {
      this.options[toCamelCase(attribute.nodeName)] = attribute.nodeValue;
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

export default class Element {
  /**
   * Creates an instance of Element.
   * @param {*} element
   * @param {*} options
   * @memberof Element
   */
  constructor(element, options) {
    this.element = element;
    this.options = (typeof options === 'object') ? extend(defaultOptions, options) : defaultOptions;
    this.emitter = new EventEmitter();
    this.ajax = new Ajax(this.options);
    this.responseHandler = new ResponseHandler(this);

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
  startAjaxRequest() {
    const data = prepareAjaxRequestData.call(this);

    this.ajax.doRequest(data);
  }

  /**
   * Destroy ajaxable on element
   *
   * @memberof Element
   */
  destroy() {
    detatchElementEvents.call(this, this.element);
  };

  /**
   * Get Dom element
   *
   * @returns
   * @memberof Element
   */
  getDomElement() {
    return this.element;
  }

  /**
   * Set element options once the Ajaxable has been instaniated
   *
   * @param {*} opts
   * @returns
   * @memberof Element
   */
  setOptions(opts) {
    const element = this.element;
    const attributes = element.attributes;
    const attrLength = attributes.length;
    const elementAttributeNodes = [];
    let i;
    let k;

    if (typeof opts === 'object') {

      for (i = 0; i < attrLength; i = i + 1) {
        elementAttributeNodes.push(toCamelCase(attributes[i].nodeName));
      }

      for (k in opts) {
        if (opts.hasOwnProperty(k)) {
          if (elementAttributeNodes.indexOf(k) > 0) {
            delete opts[k];
          }
        }
      }
    }
    this.options = (typeof opts === 'object') ? extend(this.options, opts) : this.options;
    bindClassEvents.call(this);
    this.ajax.setOptions(this.options);
    return this;
  };

  /**
   * Bind event to Element
   *
   * @param  {String} event
   * @param  {Function} handler
   * @param  {Object} context
   * @return {void}
   */
  on(event, handler, context) {
    this.emitter.on(event, handler, context || undefined);
  };

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
  emit(event, a1, a2, a3, a4, a5) {
    return this.emitter.emit(event, a1, a2, a3, a4, a5);
  }
};
