// Inject script at document_start
const script = document.createElement('script');
script.src = chrome.runtime.getURL('contentRedux.js');
(document.head || document.documentElement).appendChild(script);
