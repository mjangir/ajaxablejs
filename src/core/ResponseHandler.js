import { resolveFunctionName } from '../utils';

export default class ResponseHandler {
  /**
   * Creates an instance of ResponseHandler.
   * @param {*} element
   * @memberof ResponseHandler
   */
  constructor(element) {
    this.element = element;
  }

  /**
   * Handle ajax beforeSend
   *
   * @param {*} dataToSend
   * @memberof ResponseHandler
   */
  beforeSend(dataToSend) {
    const opts = this.element.options;
    const handler = resolveFunctionName(opts.ajaxBeforeSend);

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
  onSuccess(xhr, response) {
    const opts = this.element.options;
    const handler = resolveFunctionName(opts.ajaxOnSuccess);

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
  onError(xhr, response) {
    console.log(xhr);
    const opts = this.element.options;
    const handler = resolveFunctionName(opts.ajaxOnError);

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
  onComplete(xhr, response) {
    const opts = this.element.options;
    const handler = resolveFunctionName(opts.ajaxOnComplete);

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
  onAbort(xhr, response) {
    const opts = this.element.options;
    const handler = resolveFunctionName(opts.ajaxOnAbort);

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
  onTimeout(xhr, response) {
    const opts = this.element.options;
    const handler = resolveFunctionName(opts.ajaxOnTimeout);

    if (typeof handler === 'function') {
      handler.call(this.element, xhr, response);
    }
  }
}
