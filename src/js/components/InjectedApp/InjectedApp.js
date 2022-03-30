import React, { useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';

import { Modal } from '@material-ui/core';

import { ThemeProvider } from '@material-ui/core/styles';

import Tree from '../Tree/Tree';
import OpenModalButton from '../OpenModalButton/OpenModalButton';

import { reducer, initialState, createDispatchActions } from '../../store/injectedAppReducer';

import theme from '../../themes/injectedAppTheme';

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
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
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
