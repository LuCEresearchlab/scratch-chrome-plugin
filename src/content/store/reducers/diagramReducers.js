const diagramReducers = {
  setDiagram: (state, payload) => {
    const { diagram } = payload;

    const diagramExtended = {
      ...diagram,
      connectorPlaceholder: '{{}}',
      stagePos: { x: 0, y: 0 },
      stageScale: { x: 1, y: 1 },
    };

    return {
      ...state,
      diagram: diagramExtended,
      temporaryDiagram: diagramExtended,
      autolayout: true,
      isModalOpen: true,
    };
  },

  setTemporaryDiagram: (state, payload) => {
    const { temporaryDiagram } = payload;

    return {
      ...state,
      temporaryDiagram,
    };
  },
};

export default diagramReducers;
