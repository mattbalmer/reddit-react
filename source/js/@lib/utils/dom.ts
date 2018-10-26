/**
 * Creates a DOM element from an HTML string.
 *
 * @param {string} html The HTML string to render.
 * @returns {Element} The DOM element constructed.
 */
function createElement(html) {
  let wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  return wrapper.firstElementChild;
}

/**
 * Finds all elements matching the given selector, within the given root element.
 *
 * @param {Element=document} root The root element to search under.
 * @param {string|Array.<string>} selectors The selectors to query for. If an array,
 * all results are flattened.
 * @returns {Array.<Element>}
 */
function findAll(root, selectors) {
  if(arguments.length === 1) {
    selectors = root;
    root = document.documentElement || document.body;
  }

  if(!Array.isArray(selectors)) {
    selectors = [selectors]
  }

  // Grab elements from all selectors.
  selectors = selectors.map(selector => {
    return Array.prototype.slice.call(
      root.querySelectorAll(selector), 0)
  });

  // Flatten the elements from all of the selectors.
  return selectors.reduce((all, single) => {
    return all.concat(single)
  }, [])
}

/**
 * Finds a single elemnt matching the given selector, within the given root element.
 *
 * @param {Element=document} root The root element to search under.
 * @param {string} selector The selector to query for.
 * @returns {Element}
 */
function findOne(root, selector) {
  if(arguments.length === 1) {
    selector = root;
    root = document.documentElement || document.body;
  }
  return root.querySelector(selector);
}

/**
 * Delegate events.
 *
 * @param root
 * @param event
 * @param handlers
 * @param context
 */
function delegate(root, event, handlers, context) {
  root.addEventListener(event, (e) => {
    for(let selector in handlers) {
      if(e.target.matches(selector)) {
        handlers[selector].call(context, e);
        return;
      }
    }
  });
}

export {
  findOne,
  findAll,
  createElement,
  delegate
};