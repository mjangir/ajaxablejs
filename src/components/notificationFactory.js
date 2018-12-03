import alertNotify from './AlertNotify';
import toastrNotify from './ToastrNotify';
import swalNotify from './SwalNotify';

export default function createNotifierObject(options) {
  const notificationType = options.notificationType || 'alert';
  let instance;

  switch (notificationType) {
    case 'alert':
      instance = alertNotify;
      break;
    case 'toastr':
      instance = toastrNotify;
      break;
    case 'swal':
      instance = swalNotify;
      break;
    default:
      instance = alertNotify;
      break;
  }
  instance.setOptions(options);
  return instance;
}
