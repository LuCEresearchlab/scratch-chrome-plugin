import { setLocalStorage } from '../../../chromeAPI';
import { injectScriptIntoDocument } from '../injectScript';
import { handleMessageFromPageScript } from '../messages';

handleMessageFromPageScript((payload) => {
  const { action, value } = payload;
  switch (action) {
    case 'errorLoadingRedux':
      setLocalStorage({ isReduxError: true });
      break;
    default:
      break;
  }
});

// Reset reduxError and inject script;
setLocalStorage({ isReduxError: false }, () => {
  injectScriptIntoDocument('pageScriptRedux.js');
});
