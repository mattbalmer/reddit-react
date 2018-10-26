export function isEmpty(source: object) {
  return source ? Object.keys(source).length === 0 : true;
}

export function exists(source: Object, path: string): boolean {
  if(path.indexOf('.') < 0) {
    return source.hasOwnProperty(path);
  } else {
    let parts = path.split('.');
    let [head, tail] = [ parts[0], parts.slice(1).join('.') ];
    return exists(source[head], tail);
  }
}

export function retrieve(source: Object, path: string) {
  if(path.indexOf('.') < 0) {
    return source[path]
  } else {
    let parts = path.split('.');
    return retrieve(source[parts[0]], parts.slice(1).join('.'));
  }
}

export function assign(source: Object, path: string, data: any) {
  if(path.indexOf('.') < 0) {
    return source[path] = data;
  } else {
    let parts = path.split('.');
    return assign(source[parts[0]], parts.slice(1).join('.'), data);
  }
}

export function pathsFor(path: string) {
  return path
    .split('.')
    .map((part, i, paths) => paths.slice(0, i + 1).join('.'));
}

export function mapMongoList(list: any[]) {
  return list.reduce((map, item, i) => {
    return (Object as any).assign(map, {
      [item._id]: item,
    })
  }, {})
}

export function mongoObjToArray(obj: object = {}): any[] {
  return Object.values(obj);
}

export function mapObj(obj: object, callback: (any, string, number) => any) {
  return Object.keys(obj).map((key, i) => callback(obj[key], key, i));
}

/**
 * Wraps a function so that it is only executed after a specified delay.
 *
 * @param {Function} fn The function to execute.
 * @param {number} delay The delay before teh function is executed.
 * @returns {Function} wrapper function
 */
export function debounce<callback>(fn: callback, delay: number): callback {
  let timeoutId = null;
  // @ts-ignore
  return function() {
    let args = arguments;
    // @ts-ignore
    clearTimeout(timeoutId);
    // @ts-ignore
    timeoutId = setTimeout(() => fn.apply(null, args), delay);
  }
}

/**
 * Wraps a function so that it's throttled to not executed more than once every
 * so often.
 *
 * @param {Function} fn The function to execute.
 * @param {number} threshold The delay before the function is executed.
 * @returns {Function} wrapper function
 */
export function throttle(fn: Function, threshold: number) {
  let last = null;
  let deferTimer = null;

  return function() {
    let args = arguments;
    let now = +new Date;

    if(last && now < last + threshold) {
      // @ts-ignore
      clearTimeout(deferTimer);

      // @ts-ignore
      deferTimer = setTimeout(() => {
        last = now;
        fn.apply(null, args);
      }, threshold);
    } else {
      last = now;
      fn.apply(null, args);
    }
  }
}

export function bindAll(context, functionNames) {
  functionNames.forEach(func => {
    context[func] = context[func].bind(context);
  });
}