import React from 'react';
import { render } from 'react-dom';

import { clearBadge, getLocalStorage, setLocalStorage } from './utils/chromeAPI';

let enabled = true;
const toggle = document.getElementById('toggle');

getLocalStorage('enabled', (data) => {
  if (data.enabled !== undefined) {
    enabled = !!data.enabled;
  }
  toggle.textContent = enabled ? 'Disable' : 'Enable';
});

toggle.onclick = () => {
  enabled = !enabled;
  toggle.textContent = enabled ? 'Disable' : 'Enable';
  setLocalStorage({ enabled });
};

getLocalStorage(['diagram'], (data) => {
  const { diagram } = data;
});

clearBadge();
