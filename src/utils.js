export const extend = (defaults, options) => {
  const extended = {};
  let prop;

  for (prop in defaults) {
    if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
      extended[prop] = defaults[prop];
    }
  }
  for (prop in options) {
    if (Object.prototype.hasOwnProperty.call(options, prop)) {
      extended[prop] = options[prop];
    }
  }
  return extended;
};

export const isElement = (obj) => !!(obj && obj.nodeType === 1);

export const uuid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

export const resolveFunctionName = (func) => {
  let obj;

  if (typeof func === 'function') {
    return func;
  }
  if (typeof func === 'string') {
    if (func.indexOf('.') <= -1 && typeof window[func] === 'function') {
      return window[func];
    }
    obj = func.split('.').reduce((o, i) => o[i], window);
    if (typeof obj === 'function') {
      return obj;
    }
  }
  return null;
};

export const toCamelCase = (str) => {
  str = str.replace('data-ajaxable-', '').replace(/-/g, ' ');
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
    index === 0 ? letter.toLowerCase() : letter.toUpperCase()).replace(/\s+/g, '');
};

