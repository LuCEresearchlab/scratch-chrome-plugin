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

const expressionButtonQuerySelector = `:scope > .${buttonClassName}`;

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
      if (a.connection.targetConnection) {
        toDiagram(a.connection.targetConnection.sourceBlock_, diagram, thisId, childId, t);
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

function isExpression(block) {
  return scratchExpBlocks.includes(block.type) || block.isShadow_;
}

function isRootExpression(block) {
  return isExpression(block)
      && (block.parentBlock_ === null || !isExpression(block.parentBlock_));
}

function hasButton(blockSvg) {
  if (blockSvg.tagName === 'g') {
    return blockSvg.querySelector(`:scope > .${buttonClassName}`) !== null;
  }
  return [...blockSvg.parentNode.querySelectorAll(`:scope > .${buttonClassName}`)]
    .some((e) => e.getAttribute('transform') === blockSvg.getAttribute('transform')
        && e.style.visibility === blockSvg.style.visibility);
}

function getShadows(block) {
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
}

function getEmptySvgs(block) {
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
}

function removeAllButtons(scope) {
  if (scope.tagName === 'g') {
    scope.querySelectorAll(`:scope > g .${buttonClassName}`).forEach((e) => {
      e.remove();
    });
  }
}

function removeButton(blockSvg) {
  if (blockSvg.tagName === 'g') {
    blockSvg.querySelector(`:scope > .${buttonClassName}`).remove();
  } else {
    [...blockSvg.parentNode.querySelectorAll(`:scope > .${buttonClassName}`)]
      .some((e) => {
        const ans = e.getAttribute('transform') === blockSvg.getAttribute('transform')
            && e.style.visibility === blockSvg.style.visibility;
        if (ans) {
          e.remove();
        }
        return ans;
      });
  }
}

function insertSvgButton(child, onClickListener) {
  removeAllButtons(child);
  const paths = child.parentNode.querySelectorAll(':scope > path');
  const parentButtons = child.parentNode.querySelectorAll(`:scope > .${buttonClassName}`);
  [...parentButtons].some((e) => {
    const ans = [...paths].every((path) => e.getAttribute('transform') !== path.getAttribute('transform')
        || e.style.visibility !== path.style.visibility);
    if (ans) {
      e.remove();
    }
    return ans;
  });
  const svgButton = document.createElementNS(svgNS, 'g');
  svgButton.classList.add(buttonClassName);
  svgButton.style.cursor = 'pointer';
  svgButton.style.display = enabled ? 'block' : 'none';
  if (child.tagName !== 'g') {
    svgButton.setAttribute('transform', child.getAttribute('transform'));
    svgButton.style.visibility = child.style.visibility;
  }
  svgButton.addEventListener('mousedown', onClickListener);
  if (child.tagName === 'g') {
    child.appendChild(svgButton);
  } else {
    child.parentNode.appendChild(svgButton);
  }
  ReactDOM.render(<ETLogo />, svgButton);
}

function addButton(block) {
  const workspace = blockly.getMainWorkspace();

  const blockId = block.id;

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

  insertSvgButton(block.svgGroup_, onClickListener);
}

function tryAddSmallButtons(block) {
  const shadows = getShadows(block);
  shadows.forEach((shadow) => {
    if (!hasButton(shadow.svgGroup_)) {
      addButton(shadow);
    }
  });
  const emptySvgs = getEmptySvgs(block);
  emptySvgs.forEach((emptySvg) => {
    const { outlinePath, type } = emptySvg;
    if (!hasButton(outlinePath)) {
      const onClickListener = (e) => {
        e.preventDefault();
        const node = {
          nodePlug: { valA: 0, valB: 0 },
          content: [{
            content: typeToDefaultValue(type),
          }],
          type,
        };
        const d = {
          nodes: [node],
          edges: [],
          root: node,
        };
        console.log(JSON.stringify(d));
        window.postMessage(
          {
            direction: 'from-page-script',
            payload: { diagram: JSON.stringify(d) },
          },
          '*',
        );
      };
      insertSvgButton(outlinePath, onClickListener);
    }
  });
}

function tryAddButton(block) {
  console.log(block.type);
  console.log(enabled);
  if (isRootExpression(block)) {
    console.log('root');
    if (!hasButton(block.svgGroup_)) {
      console.log('add');
      addButton(block);
    }
  } else if (!isExpression(block)) {
    tryAddSmallButtons(block);
  } else if (hasButton(block.svgGroup_)) {
    removeButton(block.svgGroup_);
  }
}

function onBlocklyEvent(event) {
  const workspace = blockly.getMainWorkspace();
  if (event.type === 'move') {
    const block = workspace.getBlockById(event.blockId);
    if (!block) return;
    tryAddButton(block);
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
