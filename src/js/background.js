import { onInstalled, setBadge, onChangeLocalStorage } from './utils/chrome';

onInstalled(() => {
  console.log('Installed correctly');
});

onChangeLocalStorage((changes, namespace) => {
  setBadge('change');
});
