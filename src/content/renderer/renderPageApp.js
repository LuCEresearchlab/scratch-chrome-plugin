import React from 'react';
import ReactDOM from 'react-dom';

import PageApp from '../components/PageApp/PageApp.js';

const renderPageApp = (data) => {
  const {
    isPluginEnabled,
    showEdges,
    showTypes,
    showValues,
    showSelectedRootNode,
  } = data;
  const injectedAppContainer = document.createElement('div');
  injectedAppContainer.id = 'my-expression-tutor-viewer';
  document.body.appendChild(injectedAppContainer);

  ReactDOM.render(<PageApp
    initialIsEnabled={isPluginEnabled}
    initialShowEdges={showEdges}
    initialShowTypes={showTypes}
    initialShowValues={showValues}
    initialShowSelectedRootNode={showSelectedRootNode}
  />, injectedAppContainer);
};

export default renderPageApp;
