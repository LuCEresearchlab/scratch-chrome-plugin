import React, { useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';

import { Modal } from '@material-ui/core';

import Tree from '../Tree/Tree';
import OpenModalButton from '../OpenModalButton/OpenModalButton';

import { reducer, initialState, createDispatchActions } from '../../store/injectedAppReducer';

function InjectedApp({ diagram }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    isModalOpen,
  } = state;

  const {
    // setIsModalOpen,
    closeModal,
    // openModal,
  } = useMemo(() => createDispatchActions(dispatch), [dispatch]);

  return (
    <>
      <OpenModalButton />
      <Modal
        open={isModalOpen}
        onClose={closeModal}
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

InjectedApp.propTypes = {
  diagram: PropTypes.shape({}),
};

InjectedApp.defaultProps = {
  diagram: { nodes: [], edges: [], root: {} },
};

export default InjectedApp;
