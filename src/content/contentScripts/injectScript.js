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

export const injectScriptIntoDocumentBeforeAllOthers = (fileName, callback) => {
  const script = createScriptElement(fileName);
  script.onload = function remove() {
    this.remove();
    if (callback) {
      callback();
    }
  };
  (document.head || document.documentElement).prepend(script);
};

/**
 * TODO, this is a 'hack':
 * https://bugs.chromium.org/p/chromium/issues/detail?id=1207006
 *
 * Currently in v3 there isn't any other way to do it. Still waiting for the API.
 *
 * Other possible solutions (that are not perfect):
 * https://stackoverflow.com/questions/9515704/use-a-content-script-to-access-the-page-context-variables-and-functions/9517879#9517879
 */
export const injectCodeBeforeAllOtherScripts = (code) => {
  const executeCode = `(${code})();`;
  const el = document.createElement('div');
  el.setAttribute('onclick', executeCode);
  (document.head || document.documentElement).appendChild(el);
  el.click();
  el.remove();
};
