import React, {
  useReducer,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';

import { ThemeProvider } from '@material-ui/core/styles/index.js';

import OpenModalButton from '../OpenModalButton/OpenModalButton.js';

import { reducer, initialState, createDispatchActions } from '../../store/pageAppReducer.js';

import theme from '../../../themes/pageTheme.js';
import { handleMessageFromContentScript } from '../../contentScripts/messages.js';
import AppModal from '../AppModal/AppModal.js';

function PageApp({ initialIsEnabled }) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    isEnabled: initialIsEnabled,
  });

  const {
    isEnabled,
    isModalOpen,
    autolayout,
    diagram,
  } = state;

  const {
    closeModal,
    openModal,
    setIsEnabled,
    setDiagram,
    setTemporaryDiagram,
  } = useMemo(() => createDispatchActions(dispatch), [dispatch]);

  const handleContentScriptMessage = useCallback((payload) => {
    const { action, value } = payload;
    switch (action) {
      case 'selectedNewDiagram':
        setDiagram(value);
        break;
      case 'isPluginEnabledChanged':
        setIsEnabled(value);
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
        <div
          style={{
            display: isEnabled ? 'block' : 'none',
          }}
        >
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
        </div>
      </ThemeProvider>
    </>
  );
}

PageApp.propTypes = {
  initialIsEnabled: PropTypes.bool,
};

PageApp.defaultProps = {
  initialIsEnabled: false,
};

export default PageApp;
