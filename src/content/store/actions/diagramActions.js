const diagramActions = [
  {
    name: 'setDiagram',
    action: (diagram) => ({
      type: 'setDiagram',
      payload: { diagram },
    }),
  },
];

export default diagramActions;
