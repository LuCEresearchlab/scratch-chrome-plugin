import React, {
  useReducer,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
// import PropTypes from 'prop-types';

import { Modal } from '@material-ui/core';

import { ThemeProvider } from '@material-ui/core/styles';

import Tree from '../Tree/Tree';
import OpenModalButton from '../OpenModalButton/OpenModalButton';

import { reducer, initialState, createDispatchActions } from '../../store/pageAppReducer';

import theme from '../../../themes/pageTheme';
import { handleMessageFromContentScript } from '../../contentScripts/messages';

function PageApp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    isModalOpen,
    autolayout,
    diagram,
  } = state;

  const {
    closeModal,
    openModal,
    setDiagram,
    setTemporaryDiagram,
  } = useMemo(() => createDispatchActions(dispatch), [dispatch]);

  const handleContentScriptMessage = useCallback((payload) => {
    const { action, value } = payload;
    switch (action) {
      case 'selectedNewDiagram':
        setDiagram(value);
        break;
      default:
        break;
    }
  }, [dispatch]);

  useEffect(() => {
    const removeEventListener = handleMessageFromContentScript(handleContentScriptMessage);

    return () => removeEventListener();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <OpenModalButton
          handleClick={openModal}
        />
        <Modal
          open={isModalOpen}
          onClose={closeModal}
        >
          <>
            <Tree
              autolayout={autolayout}
              diagram={diagram}
              setTemporaryDiagram={setTemporaryDiagram}
            />
          </>
        </Modal>
      </ThemeProvider>
    </>
  );
}

PageApp.propTypes = {};

PageApp.defaultProps = {};

export default PageApp;
