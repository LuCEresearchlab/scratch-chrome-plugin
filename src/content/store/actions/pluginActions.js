const pluginActions = [
  {
    name: 'setIsEnabled',
    action: (isEnabled) => ({
      type: 'setIsEnabled',
      payload: { isEnabled },
    }),
  },

  {
    name: 'setShowEdges',
    action: (showEdges) => ({
      type: 'setShowEdges',
      payload: { showEdges },
    }),
  },

  {
    name: 'setShowTypes',
    action: (showTypes) => ({
      type: 'setShowTypes',
      payload: { showTypes },
    }),
  },

  {
    name: 'setShowValues',
    action: (showValues) => ({
      type: 'setShowValues',
      payload: { showValues },
    }),
  },

  {
    name: 'setShowSelectedRootNode',
    action: (showSelectedRootNode) => ({
      type: 'setShowSelectedRootNode',
      payload: { showSelectedRootNode },
    }),
  },
];

export default pluginActions;
