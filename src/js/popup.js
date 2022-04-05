import {
  clearBadge,
  getLocalStorage,
  observeLocalStorage,
  setLocalStorage,
} from './utils/chromeAPI';

const getIsPluginEnabled = (callback) => {
  getLocalStorage('isPluginEnabled', (data) => {
    const { isPluginEnabled } = data;
    callback(isPluginEnabled);
  });
};

const toggle = document.getElementById('toggle');

function updateToggleText(isPluginEnabled) {
  toggle.textContent = isPluginEnabled ? 'Disable' : 'Enable';
}

toggle.onclick = () => {
  getIsPluginEnabled((isPluginEnabled) => {
    setLocalStorage({ isPluginEnabled: !isPluginEnabled }, () => {
      updateToggleText(!isPluginEnabled);
    });
  });
};

getIsPluginEnabled((isPluginEnabled) => {
  updateToggleText(isPluginEnabled);
});

observeLocalStorage('isPluginEnabled', (newValue) => {
  updateToggleText(newValue);
});

clearBadge();
