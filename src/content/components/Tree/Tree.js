import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { ExpressionTreeEditor } from 'react-expression-tree';

import { tutorToService } from '../../utils/serviceToTutor.js';
import typeToMsg, {
  argumentPlaceholder,
  connectorPlaceholder,
  listPlaceholder,
  shadowPlaceholder,
  variablePlaceholder,
} from '../../../assets/data/scratch_type_to_msg.js';
import { getBlockly } from '../../utils/stateHandler.js';

function nodeToOpcode(node) {
  let str = '';
  node.content.forEach((part) => {
    if (part.type === 'hole') {
      str += connectorPlaceholder;
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
    if (msgs.includes(shadowPlaceholder)
        || msgs.includes(argumentPlaceholder)
        || msgs.includes(str)) {
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

function labelDiagram(diagram) {
  const labelNode = (node) => {
    node.type = nodeToOpcode(node);
    getChildNodes(node, diagram).forEach((child) => {
      labelNode(child);
    });
  };
  labelNode(diagram.root);
}

function Tree({ autolayout, diagram, setTemporaryDiagram }) {
  const {
    connectorPlaceholder,
    stagePos,
    stageScale,
    nodes,
    edges,
    selectedRootNode,
  } = diagram;

  const setTempDiagram = useCallback((state, payload) => {
    const diagram = tutorToService(state);
    labelDiagram(diagram);
    console.log(diagram);
    setTemporaryDiagram(state, payload);
  }, [setTemporaryDiagram]);

  return (
    <>
      <ExpressionTreeEditor
        height={600}
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
