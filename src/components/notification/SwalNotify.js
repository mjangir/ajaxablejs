import NotificationBase from './NotificationBase';

const swal = window.swal;
const defaultOptions = {};

/**
 * SwalNotify class for sweet alert messages
 *
 * @export
 * @class SwalNotify
 */
class SwalNotify extends NotificationBase {
  /**
   * Creates an instance of SwalNotify.
   * @memberof SwalNotify
   */
  constructor() {
    super();
    this.options = defaultOptions;
    this.swal = swal;
  }

  /**
   * Show actual notification
   *
   * @param {*} title
   * @param {*} message
   * @param {*} type
   * @memberof SwalNotify
   */
  notify(title, message, type) {
    if (typeof this.swal !== 'function') {
      throw new Error('You need to include swal library in your webpage');
    }
    this.swal(title, message, type);
  }
}

export default new SwalNotify();

