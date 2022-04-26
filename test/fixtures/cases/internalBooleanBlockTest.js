const test = {
  it: 'create diagram for block (not (mouse down?)): test for boolean block inside another block',
  args: [
    {
      svgGroup_: { id: '' },
      svgPath_: { id: '' },
      rendered: true,
      useDragSurface_: true,
      id: 'IPo0:*8hoR#LWZQXjFzC',
      outputConnection: {},
      nextConnection: null,
      previousConnection: null,
      inputList: [
        {
          type: 1,
          name: 'OPERAND',
          sourceBlock_: { id: 'IPo0:*8hoR#LWZQXjFzC' },
          connection: {
            sourceBlock_: { id: 'IPo0:*8hoR#LWZQXjFzC' },
            type: 1,
            db_: {},
            dbOpposite_: {},
            hidden_: false,
            offsetInBlock_: {},
            check_: {},
            targetConnection: {
              sourceBlock_: {
                svgGroup_: { id: '' },
                svgPath_: { id: '' },
                rendered: true,
                useDragSurface_: true,
                id: ';Y{uT(`posn~E;y#,DfB',
                outputConnection: {},
                nextConnection: null,
                previousConnection: null,
                inputList: [
                  {
                    type: 5,
                    name: '',
                    sourceBlock_: { id: ';Y{uT(`posn~E;y#,DfB' },
                    connection: null,
                    fieldRow: [
                      {
                        size_: {},
                        text_: 'mouse down?',
                        sourceBlock_: { id: ';Y{uT(`posn~E;y#,DfB' },
                        textElement_: { id: '' },
                        arrowWidth_: 0,
                        renderWidth: 99.625,
                        renderSep: 0,
                      },
                    ],
                    outlinePath: null,
                    renderHeight: 40,
                    renderWidth: 0,
                    fieldWidth: 99.625,
                  },
                ],
                inputsInline: true,
                disabled: false,
                tooltip: '',
                contextMenu: true,
                parentBlock_: { id: 'IPo0:*8hoR#LWZQXjFzC' },
                childBlocks_: {},
                deletable_: true,
                movable_: true,
                editable_: true,
                isShadow_: false,
                collapsed_: false,
                checkboxInFlyout_: false,
                comment: null,
                outputShape_: 1,
                category_: 'sensing',
                xy_: {},
                workspace: { id: 'pF}Bu52r]j(*ZdH~7Ld|' },
                isInFlyout: false,
                isInMutator: false,
                RTL: false,
                isInsertionMarker_: false,
                type: 'sensing_mousedown',
                colour_: '#5CB1D6',
                colourSecondary_: '#47A8D1',
                colourTertiary_: '#2E8EB8',
                inputsInlineDefault: true,
                eventsInit_: true,
                startHat_: false,
                squareTopLeftCorner_: true,
                edgeShapeWidth_: 20,
                edgeShape_: 1,
                width: 139.625,
                height: 40,
              },
              type: 2,
              db_: {},
              dbOpposite_: {},
              hidden_: false,
              offsetInBlock_: {},
              check_: {},
              targetConnection: {},
              x_: 178.25,
              y_: 1095,
              inDB_: true,
            },
            x_: 178.25,
            y_: 1095,
            inDB_: true,
          },
          fieldRow: [
            {
              size_: {},
              text_: 'not',
              sourceBlock_: { id: 'IPo0:*8hoR#LWZQXjFzC' },
              textElement_: { id: '' },
              arrowWidth_: 0,
              renderWidth: 22.25,
              renderSep: 0,
            },
          ],
          outlinePath: { id: '' },
          renderHeight: 48,
          renderWidth: 139.625,
          fieldWidth: 22.25,
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
      workspace: { id: 'pF}Bu52r]j(*ZdH~7Ld|' },
      isInFlyout: false,
      isInMutator: false,
      RTL: false,
      isInsertionMarker_: false,
      type: 'operator_not',
      colour_: '#59C059',
      colourSecondary_: '#46B946',
      colourTertiary_: '#389438',
      inputsInlineDefault: true,
      eventsInit_: true,
      startHat_: false,
      squareTopLeftCorner_: true,
      edgeShapeWidth_: 24,
      edgeShape_: 1,
      width: 197.875,
      height: 48,
      isGlowingStack_: false,
    },
    {
      topBlock: 'IPo0:*8hoR#LWZQXjFzC',
      stack: {},
      stackFrames: {},
      status: 4,
      isKilled: false,
      target: { id: '=zyq?/kSSR|o@JTnD:OD' },
      blockContainer: {
        _cache: {
          _executeCached: {
            ';Y{uT(`posn~E;y#,DfB': {
              id: ';Y{uT(`posn~E;y#,DfB',
              opcode: 'sensing_mousedown',
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
              _parentKey: 'OPERAND',
              _parentValues: { OPERAND: false },
              _ops: {},
            },
            'IPo0:*8hoR#LWZQXjFzC': {
              id: 'IPo0:*8hoR#LWZQXjFzC',
              opcode: 'operator_not',
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
      blockGlowInFrame: 'IPo0:*8hoR#LWZQXjFzC',
      warpTimer: null,
      justReported: true,
      stackClick: false,
      updateMonitor: false,
    },
  ],
  expected: {
    nodes: [
      {
        nodePlug: { valA: 1, valB: 0 },
        content: [{ content: 'mouse down?' }],
        type: 'Boolean',
        value: 'false',
      },
      {
        nodePlug: { valA: 0, valB: 0 },
        content: [{ content: 'not ' }, { valA: 0, valB: 1, type: 'Boolean' }],
        type: 'Boolean',
        value: 'true',
      },
    ],
    edges: [
      {
        plugA: { valA: 0, valB: 1, type: 'Boolean' },
        plugB: { valA: 1, valB: 0 },
      },
    ],
    root: {
      nodePlug: { valA: 0, valB: 0 },
      content: [{ content: 'not ' }, { valA: 0, valB: 1, type: 'Boolean' }],
      type: 'Boolean',
      value: 'true',
    },
  },
};

export default test;
