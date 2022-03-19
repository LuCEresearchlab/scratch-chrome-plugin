import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { ExpressionTreeEditor } from 'react-expression-tree';

import serviceToTutor from '../../utils/serviceToTutor';

function Tree({ diagram }) {
  const {
    nodes,
    edges,
    selectedRootNode,
  } = useMemo(() => serviceToTutor(diagram), [diagram]);
  return (
    <>
      <ExpressionTreeEditor
        autolayout={true}
        connectorPlaceholder="{{}}"
        height={600}
        nodes={nodes}
        edges={edges}
        selectedRootNode={selectedRootNode}
      />
    </>
  );
}

Tree.propTypes = {
  diagram: PropTypes.shape({}),
};

Tree.defaultProps = {
  diagram: { nodes: [], edges: [], root: {} },
};

export default Tree;
