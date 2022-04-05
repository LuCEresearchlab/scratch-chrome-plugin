import { setLocalStorage } from '../../../chromeAPI';
import { injectCodeBeforeAllOtherScripts } from '../injectScript';
import { handleMessageFromPageScript } from '../messages';
import myFunc from './pageScriptRedux';

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
