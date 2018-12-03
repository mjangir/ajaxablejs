import { extend } from '../utils';

export default class NotificationBase {

  /**
   * Set options
   *
   * @param {*} options
   * @memberof NotificationBase
   */
  setOptions(options) {
    this.options = (typeof options === 'object') ? extend(this.options, options) : this.options;
  }

  /**
   * Show success notification
   *
   * @param {*} message
   * @param {string} [title='Success!']
   * @memberof SwalNotify
   */
  success(message, title = 'Success!') {
    this.notify(title, message, 'success');
  }

  /**
   * Show error notification
   *
   * @param {*} message
   * @param {string} [title='Error!']
   * @memberof SwalNotify
   */
  error(message, title = 'Error!') {
    this.notify(title, message, 'error');
  }

  /**
   * Show info notification
   *
   * @param {*} message
   * @param {string} [title='Info!']
   * @memberof SwalNotify
   */
  info(message, title = 'Info!') {
    this.notify(title, message, 'info');
  }

  /**
   * Show warning notification
   *
   * @param {*} message
   * @param {string} [title='Warning!']
   * @memberof SwalNotify
   */
  warning(message, title = 'Warning!') {
    this.notify(title, message, 'warning');
  }
}
