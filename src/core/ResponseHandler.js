import createNotifierObject from '../components/notification/notificationFactory';
import { resolveFunctionName } from '../utils';

export default class ResponseHandler {
  /**
   * Creates an instance of ResponseHandler.
   * @param {*} element
   * @memberof ResponseHandler
   */
  constructor(element) {
    this.element = element;
    this.options = element.options;
    this.notifier = createNotifierObject(this.options);
  }

  /**
   * Handle ajax beforeSend
   *
   * @param {*} dataToSend
   * @memberof ResponseHandler
   */
  beforeSend(dataToSend) {
    const handler = resolveFunctionName(this.options.ajaxBeforeSend);

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
    const handler = resolveFunctionName(this.options.ajaxOnSuccess);

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
    const handler = resolveFunctionName(this.options.ajaxOnError);

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
    const handler = resolveFunctionName(this.options.ajaxOnComplete);

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
  onAbort(xhr, response) {
    const handler = resolveFunctionName(this.options.ajaxOnAbort);

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
    const handler = resolveFunctionName(this.options.ajaxOnTimeout);

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
  redirect({ redirect }) {
    if (!this.options.enableRedirect) return;
    if (redirect && redirect.url) {
      setTimeout(() => {
        window.location.href = redirect.url;
      }, redirect.timeout || 0);
    }
  }

  /**
   * Reload current window after certain time or immediately
   *
   * @param {*} { redirect }
   * @memberof ResponseHandler
   */
  reload({ reload }) {
    if (!this.options.enableReload) return;
    if (typeof reload !== 'undefined') {
      setTimeout(() => {
        window.reload();
      }, reload.timeout || 0);
    }
  }

  /**
   * Show notifications based on response
   *
   * @param {*} { notification }
   * @returns
   * @memberof ResponseHandler
   */
  notify({ notification }) {
    if (typeof notification !== 'object') return;
    const notificationArr = Array.isArray(notification) ? notification : [notification];

    notificationArr.forEach((n) => this.notifier[n.level || 'info'](
      n.message || 'Some message sent by server', n.title || '')
    );
  }

  /**
   * Handle ajax complete after effects
   *
   * @param {*} response
   * @returns
   * @memberof ResponseHandler
   */
  handleAjaxCompleteEffects(response) {
    if (!response) return;
    this.redirect(response);
    this.reload(response);
    this.notify(response);
  }
}
