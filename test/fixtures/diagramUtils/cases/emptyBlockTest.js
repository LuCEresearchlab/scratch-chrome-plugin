const test = {
  it: 'create diagram for block ("" and ""): test for empty blocks',
  args: [
    {
      svgGroup_: { id: '' },
      svgPath_: { id: '' },
      rendered: true,
      useDragSurface_: true,
      id: '9pKWjlRNZ_J^CTj#(e]C',
      outputConnection: {},
      nextConnection: null,
      previousConnection: null,
      inputList: [
        {
          type: 1,
          name: 'OPERAND1',
          sourceBlock_: { id: '9pKWjlRNZ_J^CTj#(e]C' },
          connection: {
            sourceBlock_: { id: '9pKWjlRNZ_J^CTj#(e]C' },
            type: 1,
            db_: {},
            dbOpposite_: {},
            hidden_: false,
            offsetInBlock_: {},
            check_: {},
            x_: 206.66666666666657,
            y_: 836.0919438468302,
            inDB_: true,
          },
          fieldRow: [],
          outlinePath: { id: '' },
          renderHeight: 40,
          renderWidth: 48,
          fieldWidth: 0,
        },
        {
          type: 1,
          name: 'OPERAND2',
          sourceBlock_: { id: '9pKWjlRNZ_J^CTj#(e]C' },
          connection: {
            sourceBlock_: { id: '9pKWjlRNZ_J^CTj#(e]C' },
            type: 1,
            db_: {},
            dbOpposite_: {},
            hidden_: false,
            offsetInBlock_: {},
            check_: {},
            x_: 297.3697916666666,
            y_: 836.0919438468302,
            inDB_: true,
          },
          fieldRow: [
            {
              size_: {},
              text_: 'and',
              sourceBlock_: { id: '9pKWjlRNZ_J^CTj#(e]C' },
              textElement_: { id: '' },
              arrowWidth_: 0,
              renderWidth: 26.703125,
              renderSep: 0,
            },
          ],
          outlinePath: { id: '' },
          renderHeight: 40,
          renderWidth: 48,
          fieldWidth: 26.703125,
        },
      ],
      inputsInline: true,
      disabled: false,
      tooltip: '',
      contextMenu: true,
      parentBlock_: null,
      childBlocks_: {},
      deletable_: true,
      movable_: true,
      editable_: true,
      isShadow_: false,
      collapsed_: false,
      checkboxInFlyout_: false,
      comment: null,
      outputShape_: 1,
      category_: 'operators',
      xy_: {},
      workspace: { id: 'g;?rtD$G@*bK!NCKt3kw' },
      isInFlyout: false,
      isInMutator: false,
      RTL: false,
      isInsertionMarker_: false,
      type: 'operator_and',
      colour_: '#59C059',
      colourSecondary_: '#46B946',
      colourTertiary_: '#389438',
      inputsInlineDefault: true,
      eventsInit_: true,
      startHat_: false,
      squareTopLeftCorner_: true,
      edgeShapeWidth_: 20,
      edgeShape_: 1,
      width: 154.703125,
      height: 40,
      isGlowingStack_: false,
    },
    {
      topBlock: '9pKWjlRNZ_J^CTj#(e]C',
      stack: {},
      stackFrames: {},
      status: 4,
      isKilled: false,
      target: { id: 'I0ddSDhqgiwyi#j53n4#' },
      blockContainer: {
        _cache: {
          _executeCached: {
            '9pKWjlRNZ_J^CTj#(e]C': {
              id: '9pKWjlRNZ_J^CTj#(e]C',
              opcode: 'operator_and',
              fields: {},
              inputs: {},
              _profiler: null,
              _profilerFrame: null,
              _isHat: false,
              _definedBlockFunction: true,
              _isShadowBlock: false,
              _shadowValue: false,
              _fields: {},
              _inputs: {},
              _argValues: {},
              _parentKey: null,
              _parentValues: null,
              _ops: {},
            },
          },
        },
      },
      requestScriptGlowInFrame: true,
      blockGlowInFrame: '9pKWjlRNZ_J^CTj#(e]C',
      warpTimer: null,
      justReported: false,
      stackClick: false,
      updateMonitor: false,
    },
  ],
  expected: [{
    nodes: [
      {
        nodePlug: { valA: 1, valB: 0 },
        content: [{ content: '' }],
        type: 'Boolean',
        value: 'false',
      },
      {
        nodePlug: { valA: 2, valB: 0 },
        content: [{ content: '' }],
        type: 'Boolean',
        value: 'false',
      },
      {
        nodePlug: { valA: 0, valB: 0 },
        content: [
          { valA: 0, valB: 1, type: 'Boolean' },
          { content: ' and ' },
          { valA: 0, valB: 2, type: 'Boolean' },
        ],
        type: 'Boolean',
        value: 'false',
      },
    ],
    edges: [
      {
        plugA: { valA: 0, valB: 1, type: 'Boolean' },
        plugB: { valA: 1, valB: 0 },
      },
      {
        plugA: { valA: 0, valB: 2, type: 'Boolean' },
        plugB: { valA: 2, valB: 0 },
      },
    ],
    root: {
      nodePlug: { valA: 0, valB: 0 },
      content: [
        { valA: 0, valB: 1, type: 'Boolean' },
        { content: ' and ' },
        { valA: 0, valB: 2, type: 'Boolean' },
      ],
      type: 'Boolean',
      value: 'false',
    },
  }, [3, 2]],
};

export default test;
