import NotificationBase from './NotificationBase';

const toastr = window.toastr;
const defaultOptions = {};

/**
 * ToastrNotify class for sweet alert messages
 *
 * @export
 * @class ToastrNotify
 */
class ToastrNotify extends NotificationBase {
  /**
   * Creates an instance of ToastrNotify.
   * @memberof ToastrNotify
   */
  constructor() {
    super();
    this.options = defaultOptions;
    this.toastr = toastr;
  }

  /**
   * Show actual notification
   *
   * @param {*} title
   * @param {*} message
   * @param {*} type
   * @memberof ToastrNotify
   */
  notify(title, message, type) {
    if (typeof this.toastr !== 'object') {
      throw new Error('You need to include toastr library in your webpage');
    }
    this.toastr[type](message, title);
  }
}

export default new ToastrNotify();
