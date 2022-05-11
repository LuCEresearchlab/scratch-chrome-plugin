import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { ExpressionTreeEditor } from 'react-expression-tree';

import { tutorToService } from '../../utils/serviceToTutor.js';
import typeToMsg, {
  argumentPlaceholder,
  holePlaceholder,
  listPlaceholder,
  shadowPlaceholder,
  variablePlaceholder,
} from '../../../assets/data/scratch_type_to_msg.js';
import { getBlockly, getScratchToolbox } from '../../utils/stateHandler.js';
import { pseudoShadowOpcodes, shadowOpcodes } from '../../../assets/data/scratch_shadow_opcodes.js';

import useContainerHeightOnWindowResize from '../hooks/useContainerHeightOnWindowResize.js';

window.showOptions = false;

function opcodeToXml(opcode) {
  const blockly = getBlockly();
  switch (opcode) {
    case 'argument_reporter_boolean':
      return blockly.Xml.textToDom('<block type="argument_reporter_boolean">'
        + '<field name="VALUE"></field>'
      + '</block>');

    case 'argument_reporter_string_number':
      return blockly.Xml.textToDom('<block type="argument_reporter_string_number">'
        + '<field name="VALUE"></field>'
      + '</block>');

    default:
  }
  const toolbox = getScratchToolbox().toolboxXML;
  return blockly.Xml.textToDom(toolbox).querySelector(`category > block[type=${opcode}]`)
    || blockly.DataCategory(blockly.mainWorkspace).find((xml) => xml.getAttribute('type') === opcode);
}

function nodeToString(node) {
  let str = '';
  node.content.forEach((part) => {
    if (part.type === 'hole') {
      str += holePlaceholder;
    } else {
      str += part.content;
    }
  });
  return str;
}

function nodeToOpcode(node) {
  const str = nodeToString(node);
  const opcodes = [];
  Object.entries(typeToMsg).forEach((entry) => {
    const key = entry[0];
    const value = entry[1];
    // check if block with opcode is available in toolbox. If not, we don't add to opcode list
    if (!shadowOpcodes.includes(key) && !opcodeToXml(key)) {
      return;
    }
    let msgs;
    if (!Array.isArray(value)) {
      msgs = [value];
    } else {
      msgs = value;
    }
    // update value/msgs containing variable and list placeholders
    msgs = msgs.flatMap((msg) => {
      // assume msg contains at most one placeholder
      if (msg.includes(variablePlaceholder)) {
        const variableList = getBlockly().mainWorkspace.getVariablesOfType('');
        return variableList.map((v) => msg.replace(variablePlaceholder, v.name));
      } if (msg.includes(listPlaceholder)) {
        const listList = getBlockly().mainWorkspace.getVariablesOfType('list');
        return listList.map((l) => msg.replace(listPlaceholder, l.name));
      }
      return msg;
    });
    // check if at least one msg matches the node string
    if (((msgs.includes(shadowPlaceholder) || msgs.includes(argumentPlaceholder))
        && !str.includes(holePlaceholder)) || msgs.includes(str)) {
      opcodes.push(key);
    }
  });
  return opcodes;
}

function getChildNodes(node, diagram) {
  const nodeId = node.nodePlug.valA;
  const outEdges = diagram.edges.filter((edge) => edge.plugA.valA === nodeId);
  const childIds = outEdges.map((edge) => edge.plugB.valA);
  return diagram.nodes.filter((child) => childIds.includes(child.nodePlug.valA));
}

/**
 * Inspired by scratch-blocks function Blockly.scratchBlocksUtils.duplicateAndDragCallback
 */
function createBlockFromXml(xml, lastCreatedBlock, ws) {
  const Blockly = getBlockly();
  let newBlock = null;
  // Disable events and manually emit events after the block has been
  // positioned and has had its shadow IDs fixed (Scratch-specific).
  Blockly.Events.disable();
  try {
    // Using domToBlock instead of domToWorkspace means that the new block
    // will be placed at position (0, 0) in main workspace units.
    newBlock = Blockly.Xml.domToBlock(xml, ws);

    // Scratch-specific: Give shadow dom new IDs to prevent duplicating on paste
    Blockly.scratchBlocksUtils.changeObscuredShadowIds(newBlock);

    const svgRootNew = newBlock.getSvgRoot();
    if (!svgRootNew) {
      throw new Error('newBlock is not rendered.');
    }

    if (lastCreatedBlock) {
      // The position of the old block in workspace coordinates.
      const oldBlockPosWs = lastCreatedBlock.getRelativeToSurfaceXY();

      // Place the new block as the same position as the old block.
      // TODO: Offset by the difference between the mouse position and the upper
      // left corner of the block.
      newBlock.moveBy(oldBlockPosWs.x, oldBlockPosWs.y);
    }
    const offsetX = ws.RTL ? -100 : 100;
    const offsetY = 100;
    newBlock.moveBy(offsetX, offsetY); // Just offset the block for touch.
  } finally {
    Blockly.Events.enable();
  }
  if (Blockly.Events.isEnabled()) {
    Blockly.Events.fire(new Blockly.Events.BlockCreate(newBlock));
  }
}

function createBlocksFromLabeledDiagram(diagram) {
  const nodeToDom = (node, xml, childNum = 0) => {
    const opcode = node.opcode[0];
    if (!opcode) {
      // empty block
      return;
    }
    if (shadowOpcodes.includes(opcode)) {
      const value = xml.children[childNum];
      value.children[0].children[0].innerHTML = node.content[0].content; // shadow and field
      return xml;
    }
    const childXml = opcodeToXml(opcode);
    if (!childXml) {
      throw new Error(`could not create block of type ${opcode}`);
    }
    getChildNodes(node, diagram).forEach((n, i) => {
      nodeToDom(n, childXml, i);
    });
    if (pseudoShadowOpcodes.includes(opcode)) {
      childXml.children[0].innerHTML = node.content[0].content;
    }
    if (xml) {
      const value = xml.children[childNum];
      value.appendChild(childXml);
      return xml;
    }
    return childXml;
  };
  const roots = [diagram.root];
  let prevBlock = null;
  roots.forEach((root) => {
    const xml = nodeToDom(root);
    prevBlock = createBlockFromXml(xml, prevBlock, getBlockly().mainWorkspace);
  });
}

function labelDiagramWithOpcodes(diagram) {
  const labelNode = (node) => {
    node.opcode = nodeToOpcode(node);
  };
  diagram.nodes.forEach(labelNode);
  if (window.showOptions) {
    // TODO: create block for all trees
    const showOptionsForNode = (node, parentNode, num = 0) => {
      if (parentNode) {
        // filter opcode options based on parent block
        const parentOp = parentNode.opcode[0];
        const shadowOp = opcodeToXml(parentOp).querySelectorAll(':scope > value > shadow')[num]?.getAttribute('type');
        node.opcode = node.opcode.filter((op) => !shadowOpcodes.includes(op) || op === shadowOp);
      } else {
        node.opcode = node.opcode.filter((op) => !shadowOpcodes.includes(op));
      }
      if (node.opcode.length === 0) {
        throw new Error('could not create block of the tree');
      }
      if (node.opcode.length > 1) {
        const str = nodeToString(node);
        let option = prompt(`Select one for "${str}" in ${node.opcode}`, node.opcode[0]);
        while (option && !node.opcode.includes(option)) {
          option = prompt(`Please try again...\nSelect one for "${str}"in ${node.opcode}`, node.opcode[0]);
        }
        node.opcode = [option];
      }
      getChildNodes(node, diagram).forEach((n, i) => showOptionsForNode(n, node, i));
    };
    showOptionsForNode(diagram.root);
    createBlocksFromLabeledDiagram(diagram);
  }
}

function Tree({
  containerRef,
  autolayout,
  diagram,
  setTemporaryDiagram,
}) {
  const {
    connectorPlaceholder,
    stagePos,
    stageScale,
    nodes,
    edges,
    selectedRootNode,
  } = diagram;

  const height = useContainerHeightOnWindowResize(containerRef);

  const setTempDiagram = useCallback((state, payload) => {
    const d = tutorToService(state);
    labelDiagramWithOpcodes(d);
    console.log(d);
    setTemporaryDiagram(state, payload);
  }, [setTemporaryDiagram]);

  return (
    <>
      <ExpressionTreeEditor
        height={height - 68}
        autolayout={autolayout}
        connectorPlaceholder={connectorPlaceholder}
        stagePos={stagePos}
        stageScale={stageScale}
        nodes={nodes}
        edges={edges}
        selectedRootNode={selectedRootNode}
        onStateChange={setTempDiagram}
      />
    </>
  );
}

Tree.propTypes = {
  containerRef: PropTypes.shape({}).isRequired,
  autolayout: PropTypes.bool,
  diagram: PropTypes.shape({
    connectorPlaceholder: PropTypes.string,
    stagePos: PropTypes.shape({}),
    stageScale: PropTypes.shape({}),
    nodes: PropTypes.shape({}),
    edges: PropTypes.shape({}),
    selectedRootNode: PropTypes.string,
  }),
  setTemporaryDiagram: PropTypes.func,
};

Tree.defaultProps = {
  autolayout: false,
  diagram: {
    connectorPlaceholder: '{{}}',
    stagePos: { x: 0, y: 0 },
    stageScale: { x: 1, y: 1 },
    nodes: {},
    edges: {},
    selectedRootNode: undefined,
  },
  setTemporaryDiagram: () => {},
};

export default Tree;
