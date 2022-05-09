import React, {
  useReducer,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
// import PropTypes from 'prop-types';

import { ThemeProvider } from '@material-ui/core/styles/index.js';

import OpenModalButton from '../OpenModalButton/OpenModalButton.js';

import { reducer, initialState, createDispatchActions } from '../../store/pageAppReducer.js';

import theme from '../../../themes/pageTheme.js';
import { handleMessageFromContentScript } from '../../contentScripts/messages.js';
import AppModal from '../AppModal/AppModal.js';

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
        <AppModal
          diagram={diagram}
          isModalOpen={isModalOpen}
          autolayout={autolayout}
          closeModal={closeModal}
          setTemporaryDiagram={setTemporaryDiagram}
          exportHandler={() => {}} // TODO
        />
      </ThemeProvider>
    </>
  );
}

PageApp.propTypes = {};

PageApp.defaultProps = {};

export default PageApp;
