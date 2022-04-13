/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';

import ExpressionTutorLogo from '../components/ExpressionTutorLogo/ExpressionTutorLogo';

import { getBlockly, getScratchVM } from './stateHandler';
import createDiagram from './diagramUtils';

import {
  opcodeToTypeInfo,
  typeToDefaultValue,
} from './scratchVmUtils';
import { postMessageToContentScript } from '../contentScripts/messages';
import serviceToTutor from './serviceToTutor';
// eslint-disable-next-line import/extensions
import { expressionBlocks } from '../../assets/data/scratch-blocks-map.mjs';

const svgNS = 'http://www.w3.org/2000/svg';

const svgButtonClassName = 'expressionButton';
const expressionButtonQuerySelector = `:scope > .${svgButtonClassName}`;

let displaySvgButtons = true;

const isExpressionBlock = (block) => Object.keys(expressionBlocks).includes(block.type);
const isShadowExpressionBlock = (block) => block.isShadow_ && isExpressionBlock(block);
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
    if (tb && isShadowExpressionBlock(tb.sourceBlock_)) {
      shadows.push(tb.sourceBlock_);
    }
  });
  return shadows;
};

/**
 * Check if button is on svg.
 * @param {HTMLElement} svg the svg
 * @param {HTMLElement} button the button
 * @returns true if button is on svg
 */
const svgHasButton = (svg, button) => {
  if (button.dataset.blockId && svg.dataset.id) {
    return button.dataset.blockId === svg.dataset.id;
  }
  return svg.tagName === 'path' && button.getAttribute('transform') === svg.getAttribute('transform');
};

/**
 * Update SVG buttons on leaf blocks of direct parent block with id.
 * @param {String} blockId the id of the direct parent of leaf buttons to update
 */
const updateLeafButtonsVisibilityById = (blockId) => {
  const group = getBlockly().getMainWorkspace().getBlockById(blockId).svgGroup_;
  const svgs = group.querySelectorAll(':scope > path, :scope > g');
  const buttons = group.querySelectorAll(expressionButtonQuerySelector);
  buttons.forEach((button) => {
    if (svgHasButton(group, button)) return;
    const leaf = [...svgs].find((svg) => svgHasButton(svg, button));
    if (leaf) {
      // eslint-disable-next-line no-param-reassign
      button.style.visibility = leaf.style.visibility === undefined ? 'visible' : leaf.style.visibility;
    } else {
      // eslint-disable-next-line no-param-reassign
      button.style.visibility = 'hidden';
    }
  });
};

/**
 * Update the visibility of SVG buttons on blocks with no children and
 * that have been affected by the event
 * @param {Object} event the event to handle
 * @param {String} event.newParentId the id of the new parent of the moved block
 * @param {String} event.oldParentId the id of the old parent of the moved block
 */
const updateLeafButtonsVisibilityByEvent = (event) => {
  const { newParentId, oldParentId } = event;
  if (newParentId) {
    updateLeafButtonsVisibilityById(newParentId);
  }
  if (oldParentId) {
    updateLeafButtonsVisibilityById(oldParentId);
  }
};

/**
 * Check if the SVG has an SVG button directly on it.
 * @param {HTMLElement} svg the top-level svg associated with the block
 * @returns true if the block has an SVG button directly on it
 */
const blockHasSvgButton = (svg) => {
  if (svg.tagName !== 'path') {
    return svg.querySelector(expressionButtonQuerySelector) !== null;
  }
  return [...svg.parentNode.querySelectorAll(expressionButtonQuerySelector)]
    .some((e) => svgHasButton(svg, e));
};

/**
 * Remove SVG button from this SVG.
 * @param {HTMLElement} svg the top-level svg associated with the block
 */
const removeSvgButtonFromSvg = (svg) => {
  if (svg.tagName !== 'path') {
    svg.querySelector(expressionButtonQuerySelector).remove();
    return;
  }
  [...svg.parentNode.querySelectorAll(expressionButtonQuerySelector)]
    .some((e) => {
      const remove = svgHasButton(svg, e);
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
 * @param {String} blockId the block id
 */
const createSvgButton = (element, onClickListener, blockId = '') => {
  const svgButton = document.createElementNS(svgNS, 'g');
  svgButton.classList.add(svgButtonClassName);
  svgButton.dataset.blockId = blockId;
  svgButton.style.cursor = 'pointer';
  svgButton.style.display = displaySvgButtons ? 'block' : 'none';

  if (!blockId) {
    svgButton.setAttribute('transform', element.getAttribute('transform'));
    svgButton.style.visibility = element.style.visibility;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          svgButton.setAttribute('transform', element.getAttribute('transform'));
        }
      });
    });
    observer.observe(element, {
      attributes: true,
    });
  }
  svgButton.addEventListener('mousedown', onClickListener);
  if (!blockId) {
    element.parentNode.appendChild(svgButton);
  } else {
    element.appendChild(svgButton);
  }
  ReactDOM.render(<ExpressionTutorLogo />, svgButton);
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
  postMessageToContentScript('selectedNewDiagram', serviceToTutor(d));
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
  if (newThreads.length !== 1) {
    throw new Error('Thread creation error');
  }
  const listener = () => {
    runtime.removeListener('PROJECT_RUN_STOP', listener);

    // We remove our artificial script if we previously added it
    if (addedTemporaryScript) {
      currentTarget.blocks._deleteScript(blockId);
    }

    const workspace = getBlockly().getMainWorkspace();
    const d = createDiagram(workspace.getBlockById(blockId), newThreads[0]);
    postMessageToContentScript('selectedNewDiagram', serviceToTutor(d));
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
        type: opcodeToTypeInfo('empty').outputType,
      });
    }
  });
  return emptyInfo;
};

export const appendSvgButtonToExpressionBlock = (block) => {
  const { id: blockId, svgGroup_ } = block;
  const onClickListener = createSvgButtonExpressionListener(blockId);
  createSvgButton(svgGroup_, onClickListener, blockId);
};

function appendSvgButtonsInsideNonExpressionBlock(block) {
  // Shadows are shadowBlocks in Blockly
  const shadows = getShadows(block);
  shadows.forEach((shadow) => {
    if (!blockHasSvgButton(shadow.svgGroup_)) {
      appendSvgButtonToExpressionBlock(shadow);
    }
  });

  const emptyInfo = getEmptyBlockSvgElementsAndTypes(block);
  emptyInfo.forEach(({ outlinePath, type }) => {
    if (!blockHasSvgButton(outlinePath)) {
      const onClickListener = createSvgButtonEmptyListener(type);
      createSvgButton(outlinePath, onClickListener);
    }
  });
}

export const appendSvgButtonToBlock = (event, block) => {
  if (!block) return;

  if (isRootExpressionBlock(block)) {
    if (!blockHasSvgButton(block.svgGroup_)) {
      appendSvgButtonToExpressionBlock(block);
    }
    updateLeafButtonsVisibilityByEvent(event);
    return;
  }

  if (!isExpressionBlock(block)) {
    appendSvgButtonsInsideNonExpressionBlock(block);
    return;
  }

  if (blockHasSvgButton(block.svgGroup_)) {
    removeSvgButtonFromSvg(block.svgGroup_);
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
