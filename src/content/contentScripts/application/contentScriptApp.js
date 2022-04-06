import {
  getLocalStorage,
  observeLocalStorage,
  setLocalStorage,
} from '../../../chromeAPI';

import {
  handleMessageFromPageScript,
  postMessageToPageScript,
} from '../messages';

import { injectScriptIntoTag } from '../injectScript';

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

injectScriptIntoTag('pageScriptApp.js', 'body', () => {
  getLocalStorage(['isPluginEnabled', 'isReduxError'], (data) => {
    const { isPluginEnabled, isReduxError } = data;
    reduxError = isReduxError;

    if (!isReduxError) {
      postMessageToPageScript(
        'startPluginApp',
        isPluginEnabled,
      );
    }
  });
});
