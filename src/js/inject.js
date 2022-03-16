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
  injectScript(chrome.runtime.getURL('content.js'), 'body');
}

window.addEventListener('message', (event) => {
  if (
    event.source === window
    && event.data
    && event.data.direction === 'from-page-script'
  ) {
    const { diagram } = event.data;
    chrome.storage.sync.set({ diagram });
    chrome.runtime.sendMessage({ url: 'popup.html' });
  }
});

window.addEventListener('load', main);
