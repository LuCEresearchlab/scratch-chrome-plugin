const initialState = {
  // plugin
  isEnabled: false,

  // modal
  isModalOpen: false,

  // diagram
  autolayout: false,
  diagram: {
    connectorPlaceholder: '{{}}',
    stagePos: { x: 0, y: 0 },
    stageScale: { x: 1, y: 1 },
    nodes: {},
    edges: {},
    selectedRootNode: undefined,
  },
  temporaryDiagram: {
    connectorPlaceholder: '{{}}',
    stagePos: { x: 0, y: 0 },
    stageScale: { x: 1, y: 1 },
    nodes: {},
    edges: {},
    selectedRootNode: undefined,
  },
};

export default initialState;
