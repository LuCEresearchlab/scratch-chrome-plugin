import {
  onInstalled,
  setBadge,
  onChangeLocalStorage,
  setLocalStorage,
} from './utils/chromeAPI';

onInstalled(() => {
  setLocalStorage({ isPluginEnabled: true }, () => {
    console.log('Set value `isPluginEnabled` to: ', true);
  });
});

// onChangeLocalStorage((changes, namespace) => {
//   setBadge('change');
// });
