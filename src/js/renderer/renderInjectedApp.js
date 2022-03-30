import React from 'react';
import ReactDOM from 'react-dom';

import InjectedApp from '../components/InjectedApp/InjectedApp';

const renderApp = (diagram) => {
  const injectedAppContainer = document.createElement('div');
  injectedAppContainer.id = 'my-expression-tutor-viewer';
  document.body.appendChild(injectedAppContainer);

  ReactDOM.render(<InjectedApp diagram={diagram}/>, injectedAppContainer);
};

export default renderApp;
