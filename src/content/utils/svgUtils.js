/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';

import ExpressionTutorLogo from '../components/ExpressionTutorLogo/ExpressionTutorLogo.js';

import { getBlockly, getScratchVM } from './stateHandler.js';
import createDiagram, { createDiagramForEmptyHole, getNodesAndDepth } from './diagramUtils.js';

import {
  opcodeToExpressionTypeInfo,
} from './scratchVmUtils.js';
import { postMessageToContentScript } from '../contentScripts/messages.js';
import serviceToTutor, { tutorToService } from './serviceToTutor.js';
import { expressionBlocks } from '../../assets/data/scratch-blocks-map.js';

const svgNS = 'http://www.w3.org/2000/svg';

const svgButtonClassName = 'expressionButton';
const expressionButtonQuerySelector = `:scope > .${svgButtonClassName}`;

let displaySvgButtons = true;

const isExpressionBlock = (block) => Object.keys(expressionBlocks).includes(block.type);
const isRootExpressionBlock = (block) => isExpressionBlock(block)
  && (block.parentBlock_ === null || !isExpressionBlock(block.parentBlock_));

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
 * Info about the last clicked SVG button: the button's block and service diagram.
 */
export const lastClickInfo = {
  diagram: undefined,
  block: undefined,
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
          svgButton.style.visibility = element.style.visibility === undefined ? 'visible' : element.style.visibility;
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
  const d = createDiagramForEmptyHole(type);
  postMessageToContentScript('selectedNewDiagram', serviceToTutor(d));
};

export const createSvgButtonExpressionListenerWithCallback = (
  block,
  callback,
  clickedEvaluate,
) => (e) => {
  if (e) {
    e.stopPropagation();
    e.preventDefault();
  }
  const { runtime } = getScratchVM();
  const { _editingTarget: currentTarget } = runtime;
  const newThreads = [];
  const otherThreads = [];

  let addedTemporaryScript = false;
  const targetListener = () => {
    runtime.removeListener('PROJECT_CHANGED', targetListener);
    // We create an artificial script if the block is not a topLevel block
    if (!currentTarget.blocks.getScripts().includes(block.id)) {
      currentTarget.blocks._blocks[block.id].topLevel = true;
      currentTarget.blocks._addScript(block.id);
      addedTemporaryScript = true;
    }
    runtime.allScriptsDo((topBlockId, target) => {
      if (block.id !== topBlockId) return;
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
    console.assert(newThreads.length === 1, 'Thread creation error');
    while (runtime.threads.length > 1) {
      otherThreads.push(runtime.threads.shift());
    }
  };

  const listener = () => {
    runtime.removeListener('PROJECT_RUN_STOP', listener);

    // We remove our artificial script if we previously added it
    if (addedTemporaryScript) {
      currentTarget.blocks._deleteScript(block.id);
    }

    const d = createDiagram(block, newThreads[0]);
    const dt = serviceToTutor(d);
    if (!clickedEvaluate) {
      lastClickInfo.block = block;
      lastClickInfo.diagram = tutorToService(dt);
    }
    callback(dt);

    // resume other threads
    otherThreads.forEach((thread) => runtime.threads.push(thread));

    if (clickedEvaluate) {
      block.dispose();
    }
  };

  if (clickedEvaluate) {
    runtime.addListener('PROJECT_CHANGED', targetListener);
  } else {
    targetListener();
  }
  runtime.addListener('PROJECT_RUN_STOP', listener);
};

const createSvgButtonExpressionListener = (block) => createSvgButtonExpressionListenerWithCallback(
  block,
  (tutorDiagram) => postMessageToContentScript('selectedNewDiagram', tutorDiagram),
);

/**
 * Returns the SVG path and type of each empty block directly under this block.
 * format: { outlinePath: path, type: string }
 * @param {Blockly.Block} block the parent block of the empty blocks
 * @returns {Array<Object>} the SVG path and type of each empty block directly under this block
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
        type: opcodeToExpressionTypeInfo('empty').outputType,
      });
    }
  });
  return emptyInfo;
};

const appendSvgButtonToExpressionBlock = (block) => {
  const { id: blockId, svgGroup_ } = block;
  const onClickListener = createSvgButtonExpressionListener(block);
  createSvgButton(svgGroup_, onClickListener, blockId);
};

/**
 * Adds a button to the given block
 * @param {Blockly.Block} block the block to add button to
 */
export const appendSvgButtonToBlock = (block) => {
  if (!block) return;

  if (isRootExpressionBlock(block)) {
    if (!blockHasSvgButton(block.svgGroup_)) {
      appendSvgButtonToExpressionBlock(block);
    }
    return;
  }

  if (!isExpressionBlock(block)) {
    const appendSvgButtonsInsideNonExpressionBlock = (b) => {
      // append buttons to child blocks
      b.childBlocks_.forEach(appendSvgButtonToBlock);
      // append buttons to child empties
      const emptyInfo = getEmptyBlockSvgElementsAndTypes(b);
      emptyInfo.forEach(({ outlinePath, type }) => {
        if (!blockHasSvgButton(outlinePath)) {
          const onClickListener = createSvgButtonEmptyListener(type);
          createSvgButton(outlinePath, onClickListener);
        }
      });
    };
    appendSvgButtonsInsideNonExpressionBlock(block);
    return;
  }

  if (blockHasSvgButton(block.svgGroup_)) {
    removeSvgButtonFromSvg(block.svgGroup_);
  }
};

/**
 * Returns an array of block ids (all blocks with buttons in this main workspace).
 * @returns an array of block ids (all blocks with buttons in this main workspace)
 */
const getAllBlockIds = () => {
  const allButtons = document.querySelectorAll(`.${svgButtonClassName}`);
  const ids = [];
  allButtons.forEach((button) => {
    if (button.dataset.blockId) ids.push(button.dataset.blockId);
  });
  return ids;
};

/**
 * Gets the list of all expression in the main workspace.
 * The structure of the returned objects is as follows:
 * { expression: string, blockId: string, nodes: int, depth: int }.
 * @returns {Array<Object>} the list of all expressions in the main workspace
 */
export function getExpressionList() {
  const ids = getAllBlockIds();
  return ids.map((id) => {
    const block = getBlockly().mainWorkspace.getBlockById(id);
    let expression = block.toString(); // toString may insert an extra space before question marks
    if (expression.endsWith(' ?')) {
      expression = `${expression.substring(0, expression.length - 2)}?`;
    }
    const blockId = id;
    const [nodes, depth] = getNodesAndDepth(block);
    return {
      expression,
      blockId,
      nodes,
      depth,
    };
  });
}

/**
 * Acts as a click on the svg button of the block with the given id.
 * @param {string} blockId the id of the block associated with the button to click
 */
export function clickSvgButtonOfBlock(blockId) {
  const block = getBlockly().mainWorkspace.getBlockById(blockId);
  createSvgButtonExpressionListenerWithCallback(
    block,
    (tutorDiagram) => postMessageToContentScript('selectedNewDiagram', tutorDiagram),
  )();
}

/**
 * Hides or displayes svg buttons based on the new value.
 * @param {*} newValue whether to display buttons
 */
export const updateDisplaySvgButtons = (newValue) => {
  if (displaySvgButtons === newValue) return;
  displaySvgButtons = newValue;
  const allButtons = document.querySelectorAll(`.${svgButtonClassName}`);
  allButtons.forEach((button) => {
    // eslint-disable-next-line no-param-reassign
    button.style.display = displaySvgButtons ? 'block' : 'none';
  });
};
