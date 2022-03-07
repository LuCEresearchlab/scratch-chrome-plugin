window.addEventListener('message', (event) => {
  if (
    event.source === window
    && event.data
    && event.data.direction === 'from-page-script'
  ) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/translation', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = () => {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        console.log('Request finished.');
      }
    };
    xhr.send(event.data.message);
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
