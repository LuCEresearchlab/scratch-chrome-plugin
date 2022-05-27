import {
  getLocalStorage,
  observeLocalStorage,
  setLocalStorage,
} from '../../../chromeAPI.js';

import {
  handleMessageFromPageScript,
  postMessageToPageScript,
} from '../messages.js';

import { injectScriptIntoTag } from '../injectScript.js';

let reduxError;

handleMessageFromPageScript((payload) => {
  const { action, value } = payload;
  switch (action) {
    case 'selectedNewDiagram':
      setLocalStorage({ diagram: value }, () => {
        postMessageToPageScript(
          'selectedNewDiagram',
          value,
        );
      });
      break;
    default:
      break;
  }
});

observeLocalStorage('isPluginEnabled', (isPluginEnabled) => {
  if (!reduxError) {
    postMessageToPageScript(
      'isPluginEnabledChanged',
      isPluginEnabled,
    );
  }
});

observeLocalStorage('showEdges', (showEdges) => {
  if (!reduxError) {
    postMessageToPageScript(
      'setShowEdges',
      showEdges,
    );
  }
});

observeLocalStorage('showTypes', (showTypes) => {
  if (!reduxError) {
    postMessageToPageScript(
      'setShowTypes',
      showTypes,
    );
  }
});

observeLocalStorage('showValues', (showValues) => {
  if (!reduxError) {
    postMessageToPageScript(
      'setShowValues',
      showValues,
    );
  }
});

observeLocalStorage('showSelectedRootNode', (showSelectedRootNode) => {
  if (!reduxError) {
    postMessageToPageScript(
      'setShowSelectedRootNode',
      showSelectedRootNode,
    );
  }
});

injectScriptIntoTag('pageScriptApp.js', 'body', () => {
  getLocalStorage([
    'isPluginEnabled',
    'showEdges',
    'showTypes',
    'showValues',
    'showSelectedRootNode',
    'isReduxError',
  ], (data) => {
    const {
      isPluginEnabled,
      isReduxError,
      showEdges,
      showTypes,
      showValues,
      showSelectedRootNode,
    } = data;
    reduxError = isReduxError;

    if (!isReduxError) {
      postMessageToPageScript(
        'startPluginApp',
        {
          isPluginEnabled,
          showEdges,
          showTypes,
          showValues,
          showSelectedRootNode,
        },
      );
    }
  });
});
