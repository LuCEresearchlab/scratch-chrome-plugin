import { setLocalStorage } from '../../../chromeAPI.js';
import { injectCodeBeforeAllOtherScripts } from '../injectScript.js';
import { handleMessageFromPageScript } from '../messages.js';
import myFunc from './pageScriptRedux.js';

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
  injectCodeBeforeAllOtherScripts(myFunc);
});
