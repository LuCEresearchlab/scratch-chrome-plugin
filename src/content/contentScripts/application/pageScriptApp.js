/* eslint-disable no-underscore-dangle */
import renderPageApp from '../../renderer/renderPageApp.js';
import { getBlockly, getScratchVM } from '../../utils/stateHandler.js';
import {
  appendSvgButtonToBlock,
  updateDisplaySvgButtons,
} from '../../utils/svgUtils.js';
import { handleMessageFromContentScript } from '../messages.js';

const handleEnabledChanged = (e) => updateDisplaySvgButtons(e);

const moveEventListener = (event) => {
  const workspace = getBlockly().Workspace.getById(event.workspaceId);
  const block = workspace.getBlockById(event.blockId);
  appendSvgButtonToBlock(block);
};

const onBlocklyEvent = (event) => {
  if (event.type === 'move') {
    moveEventListener(event);
  }
};

const startPluginApp = (isPluginEnabled) => {
  handleEnabledChanged(isPluginEnabled);
  const blockly = getBlockly();
  if (blockly) {
    // add listener to workspace
    let workspace = blockly.getMainWorkspace();
    workspace.addChangeListener(onBlocklyEvent);
    // make sure workspace always has listener
    const vm = getScratchVM();
    vm.addListener('workspaceUpdate', () => {
      workspace = blockly.getMainWorkspace();
      workspace.removeChangeListener(onBlocklyEvent);
      workspace.addChangeListener(onBlocklyEvent);
    });

    renderPageApp();
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
