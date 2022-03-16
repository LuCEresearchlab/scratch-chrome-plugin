import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { ExpressionTreeEditor } from 'react-expression-tree';

import serviceToTutor from '../../utils/serviceToTutor';

function Tree({ diagram }) {
  console.log(diagram)
  const {
    nodes,
    edges,
    root,
  } = useMemo(() => serviceToTutor(diagram), [diagram]);

  console.log(nodes)
  return (
    <>
      <ExpressionTreeEditor
        autolayout={true}
        connectorPlaceholder="{{}}"
        height={600}
        nodes={nodes}
        edges={edges}
        root={root}
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
