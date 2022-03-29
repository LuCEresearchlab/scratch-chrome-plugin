import {
  onInstalled,
  setBadge,
  onChangeLocalStorage,
} from './utils/chromeAPI';

onInstalled(() => {
  console.log('Installed correctly');
});

onChangeLocalStorage((changes, namespace) => {
  setBadge('change');
});
