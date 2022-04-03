/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';

import scratchExpBlocks from '../../data/scratch-expression-blocks';

import ExpressionTutorLogo from '../components/ExpressionTutorLogo/ExpressionTutorLogo';

import { getBlockly, getScratchVM } from './stateHandler';
import createDiagram, { updateBeforePassing } from './diagramUtils';

import {
  typeToDefaultValue,
} from './scratchVmUtils';
import renderInjectedApp from '../renderer/renderInjectedApp';

const svgNS = 'http://www.w3.org/2000/svg';

const svgButtonClassName = 'expressionButton';
const expressionButtonQuerySelector = `:scope > .${svgButtonClassName}`;

let displaySvgButtons = true;

const isExpressionBlock = (block) => scratchExpBlocks.includes(block.type) || block.isShadow_;
const isRootExpressionBlock = (block) => isExpressionBlock(block)
  && (block.parentBlock_ === null || !isExpressionBlock(block.parentBlock_));

/**
 * Returns all shadow blocks directly under this block.
 * @param {Object} block the parent block of the shadow blocks
 * @returns all shadow blocks directly under this block
 */
const getShadows = (block) => {
  const shadows = [];
  block.inputList.forEach((a) => {
    const tb = a.connection?.targetConnection;
    if (tb && tb.sourceBlock_.isShadow_) {
      shadows.push(tb.sourceBlock_);
    }
  });
  return shadows;
};

/**
 * Update SVG buttons on empty blocks of direct parent block with id.
 * @param {String} blockId the id of the direct parent of empty buttons to update
 */
const updateEmptyButtonsVisibilityById = (blockId) => {
  const group = getBlockly().getMainWorkspace().getBlockById(blockId).svgGroup_;
  const paths = group.querySelectorAll(':scope > path');
  const buttons = group.querySelectorAll(expressionButtonQuerySelector);
  buttons.forEach((button) => {
    const empty = [...paths].find((path) => button.getAttribute('transform') === path.getAttribute('transform'));
    // eslint-disable-next-line no-param-reassign
    button.style.visibility = empty.style.visibility;
  });
};

/**
 * Update the visibility of SVG buttons on empty blocks
 * that have been affected by the event
 * @param {Object} event the event to handle
 * @param {String} event.newParentId the id of the new parent of the moved block
 * @param {String} event.oldParentId the id of the old parent of the moved block
 */
const updateEmptyButtonsVisibilityByEvent = (event) => {
  const { newParentId, oldParentId } = event;
  if (newParentId) {
    updateEmptyButtonsVisibilityById(newParentId);
  }
  if (oldParentId) {
    updateEmptyButtonsVisibilityById(oldParentId);
  }
};

/**
 * Check if the block has an SVG button directly on it.
 * @param {Object} block the block to check if has SVG button
 * @param {HTMLElement} block.svgGroup_ the top-level svg associated with the block
 * @returns true if the block has an SVG button directly on it
 */
const blockHasSvgButton = (block) => {
  const { svgGroup_ } = block;
  if (svgGroup_.tagName === 'g') {
    return svgGroup_.querySelector(expressionButtonQuerySelector) !== null;
  }
  return [...svgGroup_.parentNode.querySelectorAll(expressionButtonQuerySelector)]
    .some((e) => e.getAttribute('transform') === svgGroup_.getAttribute('transform')
        && e.style.visibility === svgGroup_.style.visibility);
};

const removeAllSvgButtonsFromScope = (scope) => {
  if (scope.tagName === 'g') {
    scope.querySelectorAll(`:scope > g .${svgButtonClassName}`).forEach((e) => {
      e.remove();
    });
  }
};

/**
 * Remove SVG button from this block.
 * @param {Object} block the block of the button to remove
 * @param {HTMLElement} block.svgGroup_ the top-level svg associated with the block
 */
const removeSvgButtonFromBlock = (block) => {
  const { svgGroup_ } = block;
  if (svgGroup_.tagName === 'g') {
    svgGroup_.querySelector(expressionButtonQuerySelector).remove();
    return;
  }
  [...svgGroup_.parentNode.querySelectorAll(expressionButtonQuerySelector)]
    .some((e) => {
      const remove = e.getAttribute('transform') === svgGroup_.getAttribute('transform')
          && e.style.visibility === svgGroup_.style.visibility;
      if (remove) {
        e.remove();
      }
      return remove;
    });
};

/**
 * Add an SVG button to this element and onclick listener
 * @param {HTMLElement} element the element to have a button
 * @param {Function} onClickListener the click listener for the new button
 */
const createSvgButton = (element, onClickListener) => {
  removeAllSvgButtonsFromScope(element); // TODO remove
  const svgButton = document.createElementNS(svgNS, 'g');
  svgButton.classList.add(svgButtonClassName);
  svgButton.style.cursor = 'pointer';
  svgButton.style.display = displaySvgButtons ? 'block' : 'none';

  if (element.tagName !== 'g') {
    svgButton.setAttribute('transform', element.getAttribute('transform'));
    svgButton.style.visibility = element.style.visibility;
  }
  svgButton.addEventListener('mousedown', onClickListener);
  if (element.tagName === 'g') {
    element.appendChild(svgButton);
  } else {
    element.parentNode.appendChild(svgButton);
  }
  ReactDOM.render(<ExpressionTutorLogo />, svgButton);
};

const createSvgButtonShadowListener = () => (e) => {
  e.stopPropagation();
  e.preventDefault();
  // TODO
};

const createSvgButtonEmptyListener = (type) => (e) => {
  e.stopPropagation();
  e.preventDefault();
  const value = typeToDefaultValue(type);
  const node = {
    nodePlug: { valA: 0, valB: 0 },
    content: [{
      content: value,
    }],
    type,
    value,
  };
  const d = {
    nodes: [node],
    edges: [],
    root: node,
  };
  window.postMessage(
    {
      direction: 'from-page-script',
      payload: { diagram: JSON.stringify(d) },
    },
    '*',
  );
  renderInjectedApp(d);
};

const createSvgButtonExpressionListener = (blockId) => (e) => {
  e.stopPropagation();
  e.preventDefault();
  const { runtime } = getScratchVM();
  const { _editingTarget: currentTarget } = runtime;
  const newThreads = [];

  // We create an artificial script if the block is not a topLevel block
  let addedTemporaryScript = false;
  if (!currentTarget.blocks.getScripts().includes(blockId)) {
    currentTarget.blocks._addScript(blockId);
    addedTemporaryScript = true;
  }
  runtime.allScriptsDo((topBlockId, target) => {
    if (blockId !== topBlockId) return;
    const pushedThread = runtime.threads.some((t) => {
      if (t.target === target && t.topBlock === topBlockId
          // stack click threads and hat threads can coexist
          && !t.stackClick) {
        newThreads.push(runtime._restartThread(t));
        return true;
      }
      return false;
    });
    if (pushedThread) return;
    newThreads.push(runtime._pushThread(topBlockId, target));
  }, currentTarget);
  const listener = () => {
    runtime.removeListener('PROJECT_RUN_STOP', listener);

    // We remove our artificial script if we previously added it
    if (addedTemporaryScript) {
      currentTarget.blocks._deleteScript(blockId);
    }

    const workspace = getBlockly().getMainWorkspace();
    const d = createDiagram(workspace.getBlockById(blockId), newThreads);
    window.postMessage(
      {
        direction: 'from-page-script',
        payload: { diagram: JSON.stringify(d) },
      },
      '*',
    );

    renderInjectedApp(d);
  };
  runtime.addListener('PROJECT_RUN_STOP', listener);
};

/**
 * Returns the SVG path and type of each empty block directly under this block
 * @param {Blockly.Block} block the parent block of the empty blocks
 * @returns the SVG path and type of each empty block directly under this block
 */
const getEmptyBlockSvgElementsAndTypes = (block) => {
  const emptyInfo = [];
  block.inputList.forEach((a) => {
    if (!a.connection) {
      return;
    }
    const tb = a.connection.targetConnection;
    if (!tb && a.outlinePath) {
      emptyInfo.push({
        outlinePath: a.outlinePath,
        type: a.connection.check_[0],
      });
    }
  });
  return emptyInfo;
};

function appendSvgButtonsInsideNonExpressionBlock(block) {
  // Shadows are shadowBlocks in Blockly
  const shadows = getShadows(block);
  shadows.forEach((shadow) => {
    if (!blockHasSvgButton(shadow)) {
      const { svgGroup_ } = shadow;
      const onClickListener = createSvgButtonShadowListener();
      createSvgButton(svgGroup_, onClickListener);
    }
  });

  if (updateBeforePassing) {
    const emptyInfo = getEmptyBlockSvgElementsAndTypes(block);
    emptyInfo.forEach(({ outlinePath, type }) => {
      if (!blockHasSvgButton({ svgGroup_: outlinePath })) {
        const onClickListener = createSvgButtonEmptyListener(type);
        createSvgButton(outlinePath, onClickListener);
      }
    });
  }
}

export const appendSvgButtonToExpressionBlock = (block) => {
  const { id: blockId, svgGroup_ } = block;
  const onClickListener = createSvgButtonExpressionListener(blockId);
  createSvgButton(svgGroup_, onClickListener);
};

export const appendSvgButtonToBlock = (event, block) => {
  if (!block) return;

  if (isRootExpressionBlock(block)) {
    if (!blockHasSvgButton(block)) {
      appendSvgButtonToExpressionBlock(block);
    }
    updateEmptyButtonsVisibilityByEvent(event);
    return;
  }

  if (!isExpressionBlock(block)) {
    appendSvgButtonsInsideNonExpressionBlock(block);
    return;
  }

  if (blockHasSvgButton(block)) {
    removeSvgButtonFromBlock(block);
  }
};

export const updateDisplaySvgButtons = (newValue) => {
  if (displaySvgButtons === newValue) return;
  displaySvgButtons = newValue;
  const allButtons = document.querySelectorAll(`.${svgButtonClassName}`);
  allButtons.forEach((button) => {
    // eslint-disable-next-line no-param-reassign
    button.style.display = displaySvgButtons ? 'block' : 'none';
  });
};
