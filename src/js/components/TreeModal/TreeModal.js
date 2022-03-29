import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Modal } from '@material-ui/core';

import Tree from '../Tree/Tree';

function TreeModal({ diagram }) {
  const [isOpen, setIsOpen] = useState(true);

  const openHandle = useCallback(() => setIsOpen(true), [setIsOpen]);
  const closeHandle = useCallback(() => setIsOpen(false), [setIsOpen]);

  return (
    <>
      <Modal
        open={isOpen}
        onClose={closeHandle}
      >
        <>
          <Tree
            diagram={diagram}
          />
        </>
      </Modal>
    </>
  );
}

TreeModal.propTypes = {
  diagram: PropTypes.shape({}),
};

TreeModal.defaultProps = {
  diagram: { nodes: [], edges: [], root: {} },
};

export default TreeModal;
