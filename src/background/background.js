import {
  onInstalled,
  setBadge,
  setLocalStorage,
  setIconRed,
  setIconGreen,
  observeLocalStorage,
  clearBadge,
} from '../chromeAPI';

import initialPluginState from './initialPluginState';

onInstalled(() => {
  setLocalStorage(initialPluginState);
});

observeLocalStorage('isReduxError', (isError) => {
  if (isError) {
    setBadge('!');
    setIconRed();
    return;
  }

  clearBadge();
  setIconGreen();
});
