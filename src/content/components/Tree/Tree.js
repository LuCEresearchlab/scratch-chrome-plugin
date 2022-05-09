import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { ExpressionTreeEditor } from 'react-expression-tree';

import { getBlockly } from '../../utils/stateHandler.js';
import { tutorToService } from '../../utils/serviceToTutor.js';
import typeToMsg, {
  argumentPlaceholder,
  holePlaceholder,
  listPlaceholder,
  shadowPlaceholder,
  variablePlaceholder,
} from '../../../assets/data/scratch_type_to_msg.js';
import { opcodeToShadowOpcode, shadowOpcodes } from '../../../assets/data/scratch_shadow_opcodes.js';

import useContainerHeightOnWindowResize from '../hooks/useContainerHeightOnWindowResize.js';

window.showOptions = false;

function nodeToOpcode(node) {
  let str = '';
  node.content.forEach((part) => {
    if (part.type === 'hole') {
      str += holePlaceholder;
    } else {
      str += part.content;
    }
  });
  const opcodes = [];
  Object.entries(typeToMsg).forEach((entry) => {
    const key = entry[0];
    const value = entry[1];
    let msgs;
    if (!Array.isArray(value)) {
      msgs = [value];
    } else {
      msgs = value;
    }
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

function labelDiagramWithOpcodes(diagram) {
  const labelNode = (node) => {
    node.opcode = nodeToOpcode(node);
  };
  const showOptionsForNode = (node, parentNode, num = 0) => {
    if (parentNode) {
      const parentOp = parentNode.opcode[0];
      const shadowOp = opcodeToShadowOpcode[parentOp][num];
      node.opcode = node.opcode.filter((op) => !shadowOpcodes.includes(op) || op === shadowOp);
    }
    if (node.opcode.length > 1) {
      let option = prompt(`Select one for ${node.content} in ${node.opcode}`, node.opcode[0]);
      while (!node.opcode.includes(option)) {
        option = prompt(`Please try again...\nSelect one for ${node.content} in ${node.opcode}`, node.opcode[0]);
      }
      node.opcode = [option];
    }
    getChildNodes(node, diagram).forEach((n, i) => showOptionsForNode(n, node, i));
  };
  diagram.nodes.forEach(labelNode);
  if (window.showOptions) {
    showOptionsForNode(diagram.root, null);
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
