import React from 'react';
import { render } from 'react-dom';

import Popup from './components/Popup/Popup';

chrome.storage.sync.get('diagram', ({ diagram }) => {
  render(
    <Popup message={diagram} />,
    window.document.getElementById('popup-container'),
  );
});
