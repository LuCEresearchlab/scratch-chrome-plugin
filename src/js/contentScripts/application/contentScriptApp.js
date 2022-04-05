import {
  getLocalStorage,
  observeLocalStorage,
} from '../../utils/chromeAPI';

import {
  handleMessageFromPageScript,
  postMessageToPageScript,
} from '../messages';

import { injectScriptIntoTag } from '../injectScript';

handleMessageFromPageScript((payload) => {
  // const { action, value } = payload;
  // switch (action) {
  //   default:
  //     throw new Error(`Unknown content script action: ${action} ${payload}`);
  // }
});

observeLocalStorage('isPluginEnabled', (newValue) => {
  postMessageToPageScript(
    'isPluginEnabledChanged',
    newValue,
  );
});

injectScriptIntoTag('pageScriptApp.js', 'body', () => {
  getLocalStorage('isPluginEnabled', (data) => {
    postMessageToPageScript(
      'isPluginEnabledChanged',
      data.isPluginEnabled,
    );
  });
});
