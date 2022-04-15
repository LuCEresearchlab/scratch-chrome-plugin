import React from 'react';
import ReactDOM from 'react-dom';

import PageApp from '../components/PageApp/PageApp.js';

const renderPageApp = () => {
  const injectedAppContainer = document.createElement('div');
  injectedAppContainer.id = 'my-expression-tutor-viewer';
  document.body.appendChild(injectedAppContainer);

  ReactDOM.render(<PageApp />, injectedAppContainer);
};

export default renderPageApp;
