/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';

// import scratchVM from 'scratch-vm';

import scratchExpBlocks from '../data/scratch-expression-blocks';
import ETLogo from './components/ETLogo/ETLogo';

// Namespace for svg
const svgNS = 'http://www.w3.org/2000/svg';

// eslint-disable-next-line no-undef
const blockly = Blockly;

const buttonClassName = 'expressionButton';

let enabled = true;

let id = 0;

function newID() {
  const ans = id;
  id += 1;
  return ans;
}

function connectionToType(con) {
  return typeof con.check_[0] === 'boolean' ? 'Any' : con.check_[0];
}

function typeToDefaultValue(type) {
  switch (type) {
    case 'Boolean': return 'false';
    case 'Number': return '0';
    default: return '';
  }
}

function toDiagram(block, diagram, parentId, thisId, t) {
  const node = {
    nodePlug: { valA: thisId, valB: 0 },
    content: [],
    type: connectionToType(block.outputConnection),
  };
  let o = [];
  const n = t || '?';
  // eslint-disable-next-line no-underscore-dangle
  if (block.collapsed_) {
    node.content.push({
      // eslint-disable-next-line no-underscore-dangle
      content: block.getInput('_TEMP_COLLAPSED_INPUT').fieldRow[0].text_.trim(),
    });
  } else {
    block.inputList.forEach((a, i) => {
      a.fieldRow.forEach((r) => {
        // eslint-disable-next-line no-undef
        if (r.menuGenerator_ && !r.getValue()) {
          // if r instanceof Blockly.FieldDropdown
          o.push(n);
        } else {
          o.push(r.getText());
        }
      });
      if (!a.connection) {
        return;
      }
      const str = o.join(' ').trim();
      if (str.length === 0) {
        if (node.content.length !== 0) {
          node.content.push({
            content: ' ',
          });
        }
      } else {
        node.content.push({
          content: node.content.length === 0 ? `${str} ` : ` ${str} `,
        });
      }
      o = [];
      const childId = newID();
      const plugA = {
        valA: thisId,
        valB: i + 1,
      };
      node.content.push(plugA);
      const edge = {
        plugA,
        plugB: {
          valA: childId,
          valB: 0,
        },
      };
      diagram.edges.push(edge);
      if (a.connection.targetBlock()) {
        toDiagram(a.connection.targetBlock(), diagram, thisId, childId, t);
      } else {
        const type = connectionToType(a.connection);
        diagram.nodes.push({
          nodePlug: { valA: childId, valB: 0 },
          content: [{
            content: typeToDefaultValue(type),
          }],
          type,
        });
      }
    });
    if (o.length > 0) {
      const str = o.join(' ').trim();
      if (str.length !== 0) {
        node.content.push({
          content: node.content.length === 0 ? str : ` ${str}`,
        });
      }
      o = [];
    }
  }
  if (node.content.length === 0) {
    node.content.push({
      content: typeToDefaultValue(node.type),
    });
  }
  diagram.nodes.push(node);
  if (parentId < 0) {
    diagram.root = node;
  }
}

function createDiagram(block) {
  id = 0;
  const diagram = {
    nodes: [],
    edges: [],
  };
  toDiagram(block, diagram, -1, newID());
  return diagram;
}

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

// const evalExpression = (blockId) => (

// );
