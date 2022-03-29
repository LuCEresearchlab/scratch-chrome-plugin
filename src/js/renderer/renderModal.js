import React from 'react';
import ReactDOM from 'react-dom';

import TreeModal from '../components/TreeModal/TreeModal';

const renderApp = (diagram) => {
  const expressionTutorApp = document.createElement('div');
  expressionTutorApp.id = 'my-expression-tutor-viewer';
  document.body.appendChild(expressionTutorApp);

  ReactDOM.render(<TreeModal diagram={diagram}/>, expressionTutorApp);
};

export default renderApp;
