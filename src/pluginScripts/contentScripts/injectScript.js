const createScriptElement = (filePath) => {
  const src = chrome.runtime.getURL(filePath);
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', src);
  return script;
};

/**
 * injectScript - Inject internal script to available access to the `window`
 *
 * @param  {type} filePath Local path of the internal script.
 * @param  {type} tag The tag as string, where the script will be append (default: 'body').
 * @see    {@link http://stackoverflow.com/questions/20499994/access-window-variable-from-content-script}
 */
export const injectScriptIntoTag = (fileName, tag, callback) => {
  const node = document.getElementsByTagName(tag)[0];
  const script = createScriptElement(fileName);
  script.onload = callback;
  node.appendChild(script);
};

export const injectScriptIntoDocument = (fileName, callback) => {
  const script = createScriptElement(fileName);
  script.onload = function remove() {
    this.remove();
    if (callback) {
      callback();
    }
  };
  (document.head || document.documentElement).appendChild(script);
};
