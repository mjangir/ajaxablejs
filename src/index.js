import Element from './core/Element';
import { extend, isElement, uuid } from './utils';

const EventEmitter = require('eventemitter3');

/**
 * Create elements array based on provided selector
 *
 * @param {*} selector
 * @param {*} filterElements
 * @returns array
 */
function _createElementsArray(selector, filterElements) {
  let elements = [];
  let i;
  let el;

  if (!selector) {
    selector = [];
  }

  if (typeof selector === 'string') {
    selector = document.querySelectorAll(selector);
  }

  if (isElement(selector)) {
    selector = [selector];
  }

  if (filterElements) {
    for (i = 0; i < selector.length; i = i + 1) {
      el = selector[i];
      if (isElement(el) && !el.getAttribute('data-ajaxable-id')) {
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
  var uniqueId = uuid();

  if (!element.getAttribute('data-ajaxable-id')) {
    element.setAttribute('data-ajaxable-id', uniqueId);
    element = new Element(element, this.options);
    return element;
  }
  return false;
}

export default class Ajaxable {
  /**
   * Creates an instance of Ajaxable.
   * @param {*} elements
   * @param {*} options
   * @memberof Ajaxable
   */
  constructor(elements, options) {
    this.emitter = new EventEmitter();
    this.options = (typeof options === 'object') ? extend({}, options) : {};
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
  addElements(selector) {
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
  removeElements(selector) {
    var elements = _createElementsArray(selector), i, k;

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
}
