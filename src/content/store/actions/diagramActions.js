const diagramActions = [
  {
    name: 'setDiagram',
    action: (diagram) => ({
      type: 'setDiagram',
      payload: { diagram },
    }),
  },

  {
    name: 'setTemporaryDiagram',
    action: (temporaryDiagram) => ({
      type: 'setTemporaryDiagram',
      payload: { temporaryDiagram },
    }),
  },
];

export default diagramActions;
