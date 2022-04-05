import React from 'react';
import ReactDOM from 'react-dom';

import {
  clearBadge,
  getLocalStorage,
  observeLocalStorage,
  setLocalStorage,
} from '../chromeAPI';

import Popup from './components/Popup/Popup';

const renderPopup = () => {
  const container = document.querySelector('#popup-container');
  ReactDOM.render(<Popup/>, container);
};

const toggleElement = document.getElementById('toggle');
const updateToggleText = (isPluginEnabled) => {
  toggleElement.textContent = isPluginEnabled ? 'Disable' : 'Enable';
};

toggleElement.onclick = () => {
  getLocalStorage('isPluginEnabled', (data) => {
    const { isPluginEnabled } = data;
    setLocalStorage({ isPluginEnabled: !isPluginEnabled }, () => {
      updateToggleText(!isPluginEnabled);
    });
  });
};

const errorMessageElement = document.getElementById('errorMessage');
const updateErrorMessage = () => {
  errorMessageElement.innerHTML = 'Redux error please disable redux-devTools and refresh';
};

getLocalStorage(['isPluginEnabled', 'isReduxError'], (data) => {
  const { isPluginEnabled, isReduxError } = data;
  if (isReduxError) {
    updateErrorMessage();
  }

  updateToggleText(isPluginEnabled);
  renderPopup();
});

observeLocalStorage('isPluginEnabled', (newValue) => {
  updateToggleText(newValue);
});

clearBadge();
