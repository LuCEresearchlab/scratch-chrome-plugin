const pluginReducers = {
  setIsEnabled: (state, payload) => {
    const { isEnabled } = payload;

    return {
      ...state,
      isEnabled,
    };
  },
};

export default pluginReducers;
