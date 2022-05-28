const test = {
  it: 'create diagram for block (""+""): simple test',
  args: [
    {
      id: 'sN$?m0):kd}W:QhlX=xx',
      inputList: [
        {
          type: 1,
          connection: {
            type: 1,
            targetConnection: {
              sourceBlock_: {
                id: '142l46Xy(NLk-D#/oQ]9',
                inputList: [
                  { type: 5, connection: null, fieldRow: [{ text_: '' }] },
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
                id: 'd1fnzPD[kbn;de5ps~ZY',
                inputList: [
                  { type: 5, connection: null, fieldRow: [{ text_: '' }] },
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
      topBlock: 'sN$?m0):kd}W:QhlX=xx',
      blockContainer: {
        _cache: {
          _executeCached: {
            '142l46Xy(NLk-D#/oQ]9': {
              id: '142l46Xy(NLk-D#/oQ]9',
              _isShadowBlock: true,
              _shadowValue: '',
              _parentKey: 'NUM1',
              _parentValues: {},
            },
            'd1fnzPD[kbn;de5ps~ZY': {
              id: 'd1fnzPD[kbn;de5ps~ZY',
              _isShadowBlock: true,
              _shadowValue: '',
              _parentKey: 'NUM2',
            },
            'sN$?m0):kd}W:QhlX=xx': {
              id: 'sN$?m0):kd}W:QhlX=xx',
              _isShadowBlock: false,
              _shadowValue: false,
              _parentKey: null,
              _parentValues: null,
            },
          },
        },
      },
      justReported: 0,
    },
  ],
  expected: {
    nodes: [
      {
        nodePlug: { valA: 1, valB: 0 },
        content: [{ content: '' }],
        type: 'Number',
        value: '0',
      },
      {
        nodePlug: { valA: 2, valB: 0 },
        content: [{ content: '' }],
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
        value: '0',
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
      value: '0',
    },
  },
};

export default test;
