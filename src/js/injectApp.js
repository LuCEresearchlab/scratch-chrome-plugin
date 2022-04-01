import { getLocalStorage, onChangeLocalStorage, setLocalStorage } from './utils/chromeAPI';

/**
 * injectScript - Inject internal script to available access to the `window`
 *
 * @param  {type} filePath Local path of the internal script.
 * @param  {type} tag The tag as string, where the script will be append (default: 'body').
 * @see    {@link http://stackoverflow.com/questions/20499994/access-window-variable-from-content-script}
 */
function injectScript(filePath, tag) {
  const node = document.getElementsByTagName(tag)[0];
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', filePath);
  node.appendChild(script);
}

function main() {
  injectScript(chrome.runtime.getURL('contentApp.js'), 'body');
}

function notifyPageScript(enabled) {
  window.postMessage(
    {
      direction: 'from-content-script',
      payload: { enabled },
    },
    '*',
  );
}

onChangeLocalStorage((changes) => {
  const key = changes.enabled;
  if (!key) return;
  notifyPageScript(key.newValue);
});

window.addEventListener('message', (event) => {
  const { source, data } = event;
  if (source === window && data) {
    const { direction, payload } = data;
    if (direction === 'from-page-script') {
      const { diagram } = payload;
      setLocalStorage({ diagram }, () => console.log('Saved'));
    } else if (direction === 'from-new-page-script') {
      getLocalStorage('enabled', (d) => {
        notifyPageScript(d.enabled);
      });
    }
  }
});

window.addEventListener('load', main);