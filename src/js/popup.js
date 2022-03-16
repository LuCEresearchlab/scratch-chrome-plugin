import React from 'react';
import { render } from 'react-dom';

import Tree from './components/Tree/Tree';

import { clearBadge, getLocalStorage } from './utils/chrome';

getLocalStorage(['diagram'], (data) => {
  const { diagram } = data;
  render(
    <Tree diagram={JSON.parse(diagram)} />,
    window.document.getElementById('popup-container'),
  );
});

clearBadge();
