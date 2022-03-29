/* eslint-disable no-underscore-dangle */
import { getBlockly } from './utils/stateHandler';
import {
  appendSvgButtonToBlock,
  updateDisplaySvgButtons,
} from './utils/svgUtils';

function moveEventListener(event) {
  const block = getBlockly().getMainWorkspace().getBlockById(event.blockId);
  appendSvgButtonToBlock(event, block);
}

function onBlocklyEvent(event) {
  if (event.type === 'move') {
    moveEventListener(event);
  }
}

const handleEnabledChanged = (e) => updateDisplaySvgButtons(e);

// receive response/notification for enabled
window.addEventListener('message', (event) => {
  const { source, data } = event;
  if (source === window && data) {
    const { direction, payload } = data;
    if (direction === 'from-content-script') {
      handleEnabledChanged(!!payload.enabled);
    }
  }
});

// send request for enabled
window.postMessage(
  {
    direction: 'from-new-page-script',
    payload: {},
  },
  '*',
);

if (getBlockly()) {
  const workspace = getBlockly().getMainWorkspace();
  workspace.addChangeListener(onBlocklyEvent);
}
