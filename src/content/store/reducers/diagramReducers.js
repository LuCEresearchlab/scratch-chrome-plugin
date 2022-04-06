const diagramReducers = {
  setDiagram: (state, payload) => {
    const { diagram } = payload;

    return {
      ...state,
      diagram,
      isModalOpen: true,
    };
  },
};

export default diagramReducers;
