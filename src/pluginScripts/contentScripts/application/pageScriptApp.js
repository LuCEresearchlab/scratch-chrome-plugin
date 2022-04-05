/* eslint-disable no-underscore-dangle */
import { getBlockly } from '../../utils/stateHandler';
import {
  appendSvgButtonToBlock,
  updateDisplaySvgButtons,
} from '../../utils/svgUtils';
import { handleMessageFromContentScript } from '../messages';

const handleEnabledChanged = (e) => updateDisplaySvgButtons(e);

handleMessageFromContentScript((payload) => {
  const { action, value } = payload;
  switch (action) {
    case 'isPluginEnabledChanged':
      handleEnabledChanged(value);
      break;
    default:
      break;
  }
});

function moveEventListener(event) {
  const block = getBlockly().getMainWorkspace().getBlockById(event.blockId);
  appendSvgButtonToBlock(event, block);
}

function onBlocklyEvent(event) {
  if (event.type === 'move') {
    moveEventListener(event);
  }
}

if (getBlockly()) {
  const workspace = getBlockly().getMainWorkspace();
  workspace.addChangeListener(onBlocklyEvent);
}
