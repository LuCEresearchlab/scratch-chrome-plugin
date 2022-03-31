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

const getShadows = (block) => {
  const shadows = [];
  block.inputList.forEach((a) => {
    if (!a.connection) {
      return;
    }
    const tb = a.connection?.targetConnection;
    if (tb && tb.sourceBlock_.isShadow_) {
      shadows.push(tb.sourceBlock_);
    }
  });
  return shadows;
};

const updateEmptyButtonsVisibilityById = (blockId) => {
  const group = getBlockly().getMainWorkspace().getBlockById(blockId).svgGroup_;
  const paths = group.querySelectorAll(':scope > path');
  const parentButtons = group.querySelectorAll(expressionButtonQuerySelector);
  parentButtons.forEach((e) => {
    const ans = [...paths].find((path) => e.getAttribute('transform') === path.getAttribute('transform'));
    e.style.visibility = ans.style.visibility;
  });
};

const updateButtonsVisibilityByEvent = (event) => {
  const { newParentId, oldParentId } = event;
  if (newParentId) {
    updateEmptyButtonsVisibilityById(newParentId);
  }
  if (oldParentId) {
    updateEmptyButtonsVisibilityById(oldParentId);
  }
};

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

const removeSvgButtonFromBlock = (block) => {
  const { svgGroup_ } = block;
  if (svgGroup_.tagName === 'g') {
    svgGroup_.querySelector(expressionButtonQuerySelector).remove();
  } else {
    [...svgGroup_.parentNode.querySelectorAll(expressionButtonQuerySelector)]
      .some((e) => {
        const ans = e.getAttribute('transform') === svgGroup_.getAttribute('transform')
            && e.style.visibility === svgGroup_.style.visibility;
        if (ans) {
          e.remove();
        }
        return ans;
      });
  }
};

const createSvgButton = (element, onClickListener) => {
  removeAllSvgButtonsFromScope(element);
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
    const ret = runtime.threads.some((t) => {
      if (t.target === target && t.topBlock === topBlockId
          // stack click threads and hat threads can coexist
          && !t.stackClick) {
        newThreads.push(runtime._restartThread(t));
        return true;
      }
      return false;
    });
    if (ret) return;
    if (blockId === topBlockId) {
      newThreads.push(runtime._pushThread(topBlockId, target));
    }
  }, currentTarget);
  // runtime.toggleScript(blockId);
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

const getEmptyBlockSvgElements = (block) => {
  const emptySvgs = [];
  block.inputList.forEach((a) => {
    if (!a.connection) {
      return;
    }
    const tb = a.connection.targetConnection;
    if (!tb && a.outlinePath) {
      emptySvgs.push({
        outlinePath: a.outlinePath,
        type: a.connection.check_[0],
      });
    }
  });
  return emptySvgs;
};

function appendSvgButtonToNonExpressionBlock(block) {
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
    const emptySvgs = getEmptyBlockSvgElements(block);
    emptySvgs.forEach((emptySvg) => {
      const { outlinePath, type } = emptySvg;
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
    updateButtonsVisibilityByEvent(event);
    return;
  }

  if (!isExpressionBlock(block)) {
    appendSvgButtonToNonExpressionBlock(block);
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
