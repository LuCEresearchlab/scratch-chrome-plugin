import {
  onInstalled,
  setBadge,
  setLocalStorage,
  observeLocalStorage,
  clearBadge,
  setIconColor,
} from '../chromeAPI.js';

import initialPluginState from './initialPluginState.js';

onInstalled(() => {
  setLocalStorage(initialPluginState);
});

observeLocalStorage('isReduxError', (isError) => {
  if (isError) {
    setBadge('!');
    setIconColor('red');
    return;
  }

  clearBadge();
  setIconColor('green');
});
