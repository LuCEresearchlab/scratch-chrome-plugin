import React from 'react';
import ReactDOM from 'react-dom';

import {
  clearBadge,
  getLocalStorage,
  observeLocalStorage,
  setLocalStorage,
} from '../pluginScripts/utils/chromeAPI';

import Popup from './components/Popup/Popup';

const renderPopup = () => {
  const container = document.querySelector('#popup-container');
  ReactDOM.render(<Popup/>, container);
};

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
  renderPopup();
});

observeLocalStorage('isPluginEnabled', (newValue) => {
  updateToggleText(newValue);
});

clearBadge();
