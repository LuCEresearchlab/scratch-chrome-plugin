const pluginActions = [
  {
    name: 'setIsEnabled',
    action: (isEnabled) => ({
      type: 'setIsEnabled',
      payload: { isEnabled },
    }),
  },
];

export default pluginActions;
