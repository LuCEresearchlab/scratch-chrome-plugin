const pluginReducers = {
  setIsEnabled: (state, payload) => {
    const { isEnabled } = payload;

    return {
      ...state,
      isEnabled,
    };
  },

  setShowEdges: (state, payload) => {
    const { showEdges } = payload;

    return {
      ...state,
      showEdges,
    };
  },

  setShowTypes: (state, payload) => {
    const { showTypes } = payload;

    return {
      ...state,
      showTypes,
    };
  },

  setShowValues: (state, payload) => {
    const { showValues } = payload;

    return {
      ...state,
      showValues,
    };
  },

  setShowSelectedRootNode: (state, payload) => {
    const { showSelectedRootNode } = payload;

    return {
      ...state,
      showSelectedRootNode,
    };
  },
};

export default pluginReducers;
