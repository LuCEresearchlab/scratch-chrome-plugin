/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';

import data from '../data/scratch-expression-blocks';
import ETLogo from './components/ETLogo/ETLogo';

// Namespace for svg
const svgNS = 'http://www.w3.org/2000/svg';

// eslint-disable-next-line no-undef
const blockly = Blockly;

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

if (blockly) {
  const workspace = blockly.getMainWorkspace();
  workspace.addChangeListener((event) => {
    const buttonClassName = 'expressionButton';
    const expressionButtonQuerySelector = `:scope > .${buttonClassName}`;
    if (event.type === 'move') {
      const block = workspace.getBlockById(event.blockId);
      if (!block) return;
      console.log(block.type);
      if (
        data.includes(block.type)
        && (block.parentBlock_ === null || !data.includes(block.parentBlock_.type))
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
  });
}
