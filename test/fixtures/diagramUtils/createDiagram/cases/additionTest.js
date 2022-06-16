const test = {
  it: 'create diagram for block ("23"+"0"): test for non-empty shadow blocks, one with default value',
  args: [
    {
      id: '0c3v@0V;@PgX{Mgb0@Qb',
      inputList: [
        {
          type: 1,
          connection: {
            type: 1,
            targetConnection: {
              sourceBlock_: {
                id: '#H(RFB1t,+#Wl91iJ1oE',
                inputList: [
                  {
                    type: 5,
                    connection: null,
                    fieldRow: [{ text_: '23', useTouchInteraction_: false }],
                  },
                ],
                type: 'math_number',
                squareTopLeftCorner_: true,
              },
              type: 2,
            },
          },
          fieldRow: [],
        },
        {
          type: 1,
          connection: {
            type: 1,
            targetConnection: {
              sourceBlock_: {
                id: '}IjUDd;dX?Cb/CH^*4=f',
                inputList: [
                  {
                    type: 5,
                    connection: null,
                    fieldRow: [{ text_: '0', useTouchInteraction_: false }],
                  },
                ],
                type: 'math_number',
                squareTopLeftCorner_: true,
              },
              type: 2,
            },
          },
          fieldRow: [{ text_: '+' }],
        },
      ],
      parentBlock_: null,
      type: 'operator_add',
      squareTopLeftCorner_: true,
    },
    {
      topBlock: '0c3v@0V;@PgX{Mgb0@Qb',
      blockContainer: {
        _cache: {
          _executeCached: {
            '#H(RFB1t,+#Wl91iJ1oE': {
              id: '#H(RFB1t,+#Wl91iJ1oE',
              _isShadowBlock: true,
              _shadowValue: '23',
              _parentKey: 'NUM1',
              _parentValues: {},
            },
            '}IjUDd;dX?Cb/CH^*4=f': {
              id: '}IjUDd;dX?Cb/CH^*4=f',
              _isShadowBlock: true,
              _shadowValue: '0',
              _parentKey: 'NUM2',
            },
            '0c3v@0V;@PgX{Mgb0@Qb': {
              id: '0c3v@0V;@PgX{Mgb0@Qb',
              _isShadowBlock: false,
              _shadowValue: false,
              _parentKey: null,
              _parentValues: null,
            },
          },
        },
      },
      justReported: 28,
    },
  ],
  expected: [
    {
      nodes: [
        {
          nodePlug: { valA: 1, valB: 0 },
          content: [{ content: '23' }],
          type: 'Number',
          value: '23',
        },
        {
          nodePlug: { valA: 2, valB: 0 },
          content: [{ content: '0' }],
          type: 'Number',
          value: '0',
        },
        {
          nodePlug: { valA: 0, valB: 0 },
          content: [
            { valA: 0, valB: 1, type: 'Number' },
            { content: ' + ' },
            { valA: 0, valB: 2, type: 'Number' },
          ],
          type: 'Number',
          value: '28',
        },
      ],
      edges: [
        {
          plugA: { valA: 0, valB: 1, type: 'Number' },
          plugB: { valA: 1, valB: 0 },
        },
        {
          plugA: { valA: 0, valB: 2, type: 'Number' },
          plugB: { valA: 2, valB: 0 },
        },
      ],
      root: {
        nodePlug: { valA: 0, valB: 0 },
        content: [
          { valA: 0, valB: 1, type: 'Number' },
          { content: ' + ' },
          { valA: 0, valB: 2, type: 'Number' },
        ],
        type: 'Number',
        value: '28',
      },
    },
    [3, 2],
  ],
};

export default test;
