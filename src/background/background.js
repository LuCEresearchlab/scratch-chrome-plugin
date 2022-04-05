import {
  onInstalled,
  setBadge,
  setLocalStorage,
  observeLocalStorage,
  clearBadge,
  setIconColor,
} from '../chromeAPI';

import initialPluginState from './initialPluginState';

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
