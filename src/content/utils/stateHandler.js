/**
 * We need to access the ScratchVM
 */
let scratchVMInstance = null;
export const getScratchVM = () => {
  if (scratchVMInstance) {
    return scratchVMInstance;
  }

  // eslint-disable-next-line no-underscore-dangle
  if (window && window.ScratchStore && window.ScratchStore.getState) {
    // eslint-disable-next-line no-underscore-dangle
    const state = window.ScratchStore.getState();

    if (state && state.scratchGui && state.scratchGui.vm) {
      const { scratchGui: { vm } } = state;
      scratchVMInstance = vm;
      return vm;
    }
  }

  return undefined;
};

/**
 * We need the Blockly object to access the workspace.
 * The workspace is required in order to manipulate the svg nodes and add our own menus
 *
 * window.Blockly is not the instance of Blockly used internally by the VM.
 * The Blockly instance used by the VM can be found inside the state of a React Component
 * Reference:
 *    scratch-gui/src/containers/blocks.jsx line 51
 *        -> this.ScratchBlocks = VMScratchBlocks(props.vm)
 * In this file we see that the Blockly instance is directly used from within the component
 *
 * Normally we cannot reach the state of a React component, but we can retrieve it by accessing
 * the internal state of a React Component
 *
 * The following function searches for the React Internal State.
 * The component is build in scratch-gui, therefore we start from the component with
 * class name "gui" and recursively search it within its children.
 */
let blocklyInstance = null;
export const getBlockly = () => {
  if (blocklyInstance) {
    window.blockly = blocklyInstance;
    return blocklyInstance;
  }

  /**
   * Reference:
   *  scratch-gui/src/components/gui/gui.jsx line 301
   *      -> <Box className={styles.blocksWrapper}>
   *
   * The children of className={styles.blocksWrapper) contains the Blocks component
   *
   * We cannot use the className={tabClassNames.tabPanel} because it is used multiple times
   */
  const querySelector = '[class*="blocks-wrapper"]';
  const element = document.querySelector(querySelector);

  if (!element) return undefined;

  const keys = Object.keys(element);
  const key = keys.find((el) => /__reactInternal/.test(el));

  if (!key) return undefined;

  let currentReactInternal = element[key].alternate;
  do {
    const { child } = currentReactInternal;

    // ScratchBlocks is the Blockly instance;
    if (child && child.stateNode && child.stateNode.ScratchBlocks) {
      const { stateNode: { ScratchBlocks } } = child;
      blocklyInstance = ScratchBlocks;
      window.blockly = blocklyInstance;

      return ScratchBlocks;
    }

    currentReactInternal = child;
  } while (currentReactInternal);

  return undefined;
};
