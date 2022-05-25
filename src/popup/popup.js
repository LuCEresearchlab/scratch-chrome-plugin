import React from 'react';
import ReactDOM from 'react-dom';

import {
  clearBadge,
  getLocalStorage,
  observeLocalStorage,
  setLocalStorage,
} from '../chromeAPI.js';

import Popup from './components/Popup/Popup.js';

const renderPopup = () => {
  const container = document.querySelector('#popup-container');
  ReactDOM.render(<Popup/>, container);
};

const updateToggleText = (buttonId, isEnabled) => {
  document.getElementById(buttonId).textContent = `${isEnabled ? 'Disable' : 'Enable'} ${buttonId}`;
};
const setToggleOnclick = (buttonId) => {
  const toggleElement = document.getElementById(buttonId);
  toggleElement.onclick = () => {
    getLocalStorage(buttonId, (data) => {
      const isEnabled = data[buttonId];
      setLocalStorage({ [buttonId]: !isEnabled }, () => {
        updateToggleText(buttonId, !isEnabled);
      });
    });
  };
};

const errorMessageElement = document.getElementById('errorMessage');
const updateErrorMessage = () => {
  errorMessageElement.innerHTML = 'Redux error please disable redux-devTools and refresh';
};

const buttonIds = [
  'isPluginEnabled',
  'showEdges',
  'showTypes',
  'showValues',
  'showSelectedRootNode',
];
buttonIds.forEach(setToggleOnclick);

getLocalStorage([...buttonIds, 'isReduxError'], (data) => {
  const { isReduxError } = data;
  if (isReduxError) {
    updateErrorMessage();
  }

  buttonIds.forEach((id) => {
    updateToggleText(id, data[id]);
  });
  renderPopup();
});

buttonIds.forEach((id) => {
  observeLocalStorage(id, (newValue) => {
    updateToggleText(id, newValue);
  });
});

clearBadge();
