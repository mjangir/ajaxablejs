import NotificationBase from './NotificationBase';
import { addClass, escapeHtml } from '../utils';

const defaultOptions = {
  container: document.body,
  escapeHtml: true,
  newestOnTop: true,
  closeButton: true
};

class AlertNotify extends NotificationBase {
  constructor() {
    super();
    this.options = defaultOptions;
  }

  /**
   * Show actual notification
   *
   * @param {*} title
   * @param {*} message
   * @param {string} [type='success']
   * @memberof AlertNotify
   */
  notify(title, message, type = 'success') {
    const alertElement = document.createElement('div');
    const titleElement = document.createElement('strong');
    const messageElement = document.createElement('span');
    const closeElement = document.createElement('a');

    closeElement.setAttribute('title', 'close');
    closeElement.innerHTML = '&times;';

    addClass(alertElement, `alert alert-${type}`);

    if (title) {
      if (this.options.escapeHtml) {
        title = escapeHtml(title);
      }
      addClass(titleElement, this.options.titleClass);
      titleElement.insertAdjacentHTML('beforeend', title);
      alertElement.appendChild(titleElement);
    }

    if (message) {
      if (this.options.escapeHtml) {
        message = escapeHtml(message);
      }
      addClass(messageElement, this.options.messageClass);
      messageElement.insertAdjacentHTML('beforeend', message);
      alertElement.appendChild(messageElement);
    }

    if (this.options.closeButton) {
      addClass(closeElement, this.options.closeClass);
      alertElement.insertBefore(closeElement, alertElement.firstChild);
    }

    if (this.options.newestOnTop) {
      this.options.container.insertBefore(alertElement, this.options.container.firstChild);
    } else {
      this.options.container.appendChild(alertElement);
    }
  }
}

export default new AlertNotify();
