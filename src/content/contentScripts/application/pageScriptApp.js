/* eslint-disable no-underscore-dangle */
import { getBlockly } from '../../utils/stateHandler';
import {
  appendSvgButtonToBlock,
  updateDisplaySvgButtons,
} from '../../utils/svgUtils';
import { handleMessageFromContentScript } from '../messages';

const handleEnabledChanged = (e) => updateDisplaySvgButtons(e);

const moveEventListener = (event) => {
  const block = getBlockly().getMainWorkspace().getBlockById(event.blockId);
  appendSvgButtonToBlock(event, block);
};

const onBlocklyEvent = (event) => {
  if (event.type === 'move') {
    moveEventListener(event);
  }
};

const startPluginApp = (isPluginEnabled) => {
  handleEnabledChanged(isPluginEnabled);
  if (getBlockly()) {
    const workspace = getBlockly().getMainWorkspace();
    workspace.addChangeListener(onBlocklyEvent);
  }
};

handleMessageFromContentScript((payload) => {
  const { action, value } = payload;
  switch (action) {
    case 'startPluginApp':
      startPluginApp(value);
      break;
    case 'isPluginEnabledChanged':
      handleEnabledChanged(value);
      break;
    default:
      break;
  }
});
