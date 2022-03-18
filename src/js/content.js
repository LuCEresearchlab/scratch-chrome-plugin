/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';

import scratchExpBlocks from '../data/scratch-expression-blocks';
import ETLogo from './components/ETLogo/ETLogo';

// Namespace for svg
const svgNS = 'http://www.w3.org/2000/svg';

// eslint-disable-next-line no-undef
const blockly = Blockly;

const buttonClassName = 'expressionButton';

let enabled = true;

function createContent(block, plugAs) {
  const s = block.toString();
  const content = [];
  let begin = 0;
  plugAs.forEach((e) => {
    const end = s.indexOf(e.string, begin);
    if (end === -1) {
      throw Error('Incorrect number of plugs');
    }
    if (end - begin > 0) {
      content.push({ content: s.substring(begin, end) });
    }
    content.push(e.plugA);
    begin = end + e.string.length;
  });
  if (s.length - begin > 0) {
    content.push({ content: s.substring(begin) });
  }
  return content;
}

function createEdge(plugB, diagram, parentId, childNum) {
  const edge = {
    plugA: { valA: parentId, valB: childNum },
    plugB,
  };
  diagram.edges.push(edge);
  return edge.plugA;
}

let id = 0;

const create = () => {
  const ans = id;
  id += 1;
  return ans;
};

const createNode = (block, plugAs, isRoot, diagram, thisId, parentId, childNum) => {
  const nodePlug = { valA: thisId, valB: 0 };
  const content = createContent(block, plugAs);
  const node = { nodePlug, content };
  diagram.nodes.push(node);
  if (isRoot) {
    diagram.root = node;
  }
  return isRoot ? null : createEdge(nodePlug, diagram, parentId, childNum);
};

const postOrderTraversal = (block, isRoot, diagram, thisId, parentId, childNum) => {
  const plugAs = block
    .getChildren(true)
    .map((child, i) => postOrderTraversal(child, false, diagram, create(), thisId, i + 1));
  const plugA = createNode(block, plugAs, isRoot, diagram, thisId, parentId, childNum);
  return { plugA, string: block.toString() };
};

const createDiagram = (root) => {
  id = 0;
  const diagram = {
    nodes: [],
    edges: [],
  };
  postOrderTraversal(root, true, diagram, create(), -1, -1);
  return diagram;
};

function onBlocklyEvent(event) {
  const workspace = blockly.getMainWorkspace();
  if (event.type === 'move') {
    const block = workspace.getBlockById(event.blockId);
    const expressionButtonQuerySelector = `:scope > .${buttonClassName}`;
    if (!block) return;
    console.log(block.type);
    console.log(enabled);
    if (
      scratchExpBlocks.includes(block.type)
      && (block.parentBlock_ === null || !scratchExpBlocks.includes(block.parentBlock_.type))
    ) {
      if (block.svgGroup_.querySelector(expressionButtonQuerySelector) === null) {
        const { blockId } = event;

        const onClickListener = (e) => {
          e.preventDefault();
          const d = createDiagram(workspace.getBlockById(blockId));
          console.log(JSON.stringify(d));
          window.postMessage(
            {
              direction: 'from-page-script',
              payload: { diagram: JSON.stringify(d) },
            },
            '*',
          );
        };

        const svgButton = document.createElementNS(svgNS, 'g');
        svgButton.classList.add(buttonClassName);
        svgButton.style.cursor = 'pointer';
        svgButton.style.display = enabled ? 'block' : 'none';
        svgButton.setAttribute('data-block', blockId);
        svgButton.addEventListener('mousedown', onClickListener);
        block.svgGroup_.append(svgButton);
        ReactDOM.render(<ETLogo />, svgButton);
      }
    } else if (block.svgGroup_.querySelector(expressionButtonQuerySelector) !== null) {
      block.svgGroup_.removeChild(
        block.svgGroup_.querySelector(expressionButtonQuerySelector),
      );
    }
  }
}

function handleEnabledChanged(e) {
  if (enabled === e) return;
  enabled = e;
  const allButtons = document.querySelectorAll(`.${buttonClassName}`);
  allButtons.forEach((button) => {
    button.style.display = enabled ? 'block' : 'none';
  });
}

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

if (blockly) {
  const workspace = blockly.getMainWorkspace();
  workspace.addChangeListener(onBlocklyEvent);
}
