window.addEventListener('message', (event) => {
  if (
    event.source === window
    && event.data
    && event.data.direction === 'from-page-script'
  ) {
    const data = { id: event.data.id, xml: event.data.xml };
    const options = {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const url = 'http://localhost:3000/api';
    chrome.runtime.sendMessage({ url, options }, (response) => {
      console.log(response);
    });
  }
});

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
// eslint-disable-next-line no-undef
injectScript(chrome.runtime.getURL('content.js'), 'body');
