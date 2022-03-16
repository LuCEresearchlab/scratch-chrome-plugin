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
      content.push({ string: s.substring(begin, end) });
    }
    content.push(e.plugA);
    begin = end + e.string.length;
  });
  if (s.length - begin > 0) {
    content.push({ content: s.substring(begin) });
  }
  return content;
}

function createEdge(plugB, diagram, parentLevel, childNum) {
  const edge = {
    plugA: { valA: parentLevel, valB: childNum },
    plugB,
  };
  diagram.edges.push(edge);
  return edge.plugA;
}

const createNode = (block, plugAs, isRoot, diagram, parentLevel, childNum) => {
  const nodePlug = { valA: parentLevel + 1, valB: diagram.nodes.length };
  const content = createContent(block, plugAs);
  const node = { nodePlug, content };
  diagram.nodes.push(node);
  if (isRoot) {
    diagram.root = node;
  }
  return isRoot ? null : createEdge(nodePlug, diagram, parentLevel, childNum);
};

const postOrderTraversal = (block, isRoot, diagram, parentLevel, childNum) => {
  const plugAs = block
    .getChildren(true)
    .map((child, i) => postOrderTraversal(child, false, diagram, parentLevel + 1, i));
  const plugA = createNode(block, plugAs, isRoot, diagram, parentLevel, childNum);
  return { plugA, content: block.toString() };
};

const createDiagram = (root) => {
  const diagram = {
    nodes: [],
    edges: [],
  };
  postOrderTraversal(root, true, diagram, -1, -1);
  return diagram;
};

if (blockly) {
  const workspace = blockly.getMainWorkspace();
  workspace.addChangeListener((event) => {
    const buttonClassName = 'expressionButton';
    const expressionButtonQuerySelector = `:scope > .${buttonClassName}`;

    if (event.type === 'endDrag') {
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
