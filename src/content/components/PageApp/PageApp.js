import React, {
  useReducer,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';

import { ThemeProvider } from '@material-ui/core/styles/index.js';

import { tutorToService } from '../../utils/serviceToTutor.js';

import OpenModalButton from '../OpenModalButton/OpenModalButton.js';

import { reducer, initialState, createDispatchActions } from '../../store/pageAppReducer.js';

import theme from '../../../themes/pageTheme.js';
import { handleMessageFromContentScript } from '../../contentScripts/messages.js';
import AppModal from '../AppModal/AppModal.js';
import { serviceToBlock } from '../../utils/serviceToBlock.js';
import {
  createSvgButtonExpressionListenerWithCallback, lastClickInfo, getExpressionList,
} from '../../utils/svgUtils.js';
import getFeedback from '../../utils/solutionFeedback.js';
import { getSteps } from '../../utils/diagramUtils.js';

function PageApp({
  initialIsEnabled,
  initialShowEdges,
  initialShowTypes,
  initialShowValues,
  initialShowSelectedRootNode,
}) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    isEnabled: initialIsEnabled,
    showEdges: initialShowEdges,
    showTypes: initialShowTypes,
    showValues: initialShowValues,
    showSelectedRootNode: initialShowSelectedRootNode,
  });

  const {
    isBegginner,
    isEnabled,
    isModalOpen,
    autolayout,
    diagram,
    temporaryDiagram,
    showEdges,
    showTypes,
    showValues,
    showSelectedRootNode,
  } = state;

  const {
    closeModal,
    openModal,
    setIsEnabled,
    setDiagram,
    setTemporaryDiagram,
    setShowEdges,
    setShowTypes,
    setShowValues,
    setShowSelectedRootNode,
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
      case 'setShowEdges':
        setShowEdges(value);
        break;
      case 'setShowTypes':
        setShowTypes(value);
        break;
      case 'setShowValues':
        setShowValues(value);
        break;
      case 'setShowSelectedRootNode':
        setShowSelectedRootNode(value);
        break;
      default:
        break;
    }
  }, [dispatch]);

  useEffect(() => {
    const removeEventListener = handleMessageFromContentScript(handleContentScriptMessage);

    return () => removeEventListener();
  }, []);

  const exportHandler = useCallback(() => {
    const d = tutorToService(temporaryDiagram);
    serviceToBlock(d, lastClickInfo.block, isBegginner);
  }, [temporaryDiagram]);

  const evaluateHandler = useCallback(() => {
    const d = tutorToService(temporaryDiagram);
    const block = serviceToBlock(d, undefined, isBegginner);
    createSvgButtonExpressionListenerWithCallback(block, (dt) => setDiagram(dt), true)();
  }, [temporaryDiagram]);

  const checkHandler = useCallback(() => {
    const d = tutorToService(temporaryDiagram);
    if (lastClickInfo.diagram) {
      console.log(getFeedback(lastClickInfo.diagram, d));
    }
  }, [temporaryDiagram]);

  const listHandler = useCallback(() => {
    console.log(getExpressionList());
  }, [temporaryDiagram]);

  const getStepsHandler = useCallback(() => {
    const d = tutorToService(temporaryDiagram);
    console.log(getSteps(d));
  }, [temporaryDiagram]);

  useEffect(() => {
    if (!showEdges) {
      diagram.edges = {};
    }
    if (!showTypes) {
      Object.values(diagram.nodes).forEach((node) => {
        // eslint-disable-next-line no-param-reassign
        node.type = undefined;
      });
    }
    if (!showValues) {
      Object.values(diagram.nodes).forEach((node) => {
        // eslint-disable-next-line no-param-reassign
        node.value = undefined;
      });
    }
    if (!showSelectedRootNode) {
      diagram.selectedRootNode = undefined;
    }
  }, [showEdges, showTypes, showValues, showSelectedRootNode, diagram]);

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
            exportHandler={exportHandler}
            evaluateHandler={evaluateHandler}
            checkHandler={checkHandler}
            listHandler={listHandler}
            getStepsHandler={getStepsHandler}
          />
        </div>
      </ThemeProvider>
    </>
  );
}

PageApp.propTypes = {
  initialIsEnabled: PropTypes.bool,
  initialShowEdges: PropTypes.bool,
  initialShowTypes: PropTypes.bool,
  initialShowValues: PropTypes.bool,
  initialShowSelectedRootNode: PropTypes.bool,
};

PageApp.defaultProps = {
  initialIsEnabled: false,
  initialShowEdges: true,
  initialShowTypes: true,
  initialShowValues: true,
  initialShowSelectedRootNode: true,
};

export default PageApp;
