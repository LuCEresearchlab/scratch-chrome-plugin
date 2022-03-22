import {
  onInstalled,
  setBadge,
  onChangeLocalStorage,
  onResourceRequest,
  getResourceURL,
} from './utils/chrome';

onInstalled(() => {
  console.log('Installed correctly');
});

onChangeLocalStorage((changes, namespace) => {
  setBadge('change');
});
