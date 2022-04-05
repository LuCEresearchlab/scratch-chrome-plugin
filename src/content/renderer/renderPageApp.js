import React from 'react';
import ReactDOM from 'react-dom';

import PageApp from '../components/PageApp/PageApp';

const renderPageApp = (diagram) => {
  const injectedAppContainer = document.createElement('div');
  injectedAppContainer.id = 'my-expression-tutor-viewer';
  document.body.appendChild(injectedAppContainer);

  ReactDOM.render(<PageApp diagram={diagram}/>, injectedAppContainer);
};

export default renderPageApp;
