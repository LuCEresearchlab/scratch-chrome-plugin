import {
  onInstalled,
  setBadge,
  setLocalStorage,
  setIconRed,
  setIconGreen,
  observeLocalStorage,
} from '../chromeAPI';

import initialPluginState from './initialPluginState';

onInstalled(() => {
  setLocalStorage(initialPluginState, () => {
    console.log('Set value `isPluginEnabled` to: ', true);
  });
});

observeLocalStorage('isReduxError', (isError) => {
  if (isError) {
    setBadge('!');
    setIconRed();
    return;
  }

  setIconGreen();
});
