const test = {
  it: 'label diagram of block (backdrop name of ("_stage_")): should not match looks_backdropnumbername',
  args: [
    {
      nodes: [
        {
          nodePlug: {
            valA: 1,
            valB: 0,
          },
          content: [
            {
              type: 'other',
              content: '"_stage_"',
            },
          ],
          type: 'String',
          value: '"_stage_"',
        },
        {
          nodePlug: {
            valA: 0,
            valB: 0,
          },
          content: [
            {
              type: 'other',
              content: 'backdrop name of ',
            },
            {
              type: 'hole',
              plug: {
                valA: 0,
                valB: 1,
              },
            },
            {
              type: 'other',
              content: '',
            },
          ],
          type: 'Number',
          value: '2',
        },
      ],
      edges: [],
      root: {
        nodePlug: {
          valA: 0,
          valB: 0,
        },
        content: [
          {
            type: 'other',
            content: 'backdrop name of ',
          },
          {
            type: 'hole',
            plug: {
              valA: 0,
              valB: 1,
            },
          },
          {
            type: 'other',
            content: '',
          },
        ],
        type: 'Number',
        value: '2',
      },
    },
  ],
  expected: {
    nodes: [
      {
        nodePlug: {
          valA: 1,
          valB: 0,
        },
        content: [
          {
            type: 'other',
            content: '"_stage_"',
          },
        ],
        type: 'String',
        value: '"_stage_"',
      },
      {
        nodePlug: {
          valA: 0,
          valB: 0,
        },
        content: [
          {
            type: 'other',
            content: 'backdrop name of ',
          },
          {
            type: 'hole',
            plug: {
              valA: 0,
              valB: 1,
            },
          },
          {
            type: 'other',
            content: '',
          },
        ],
        type: 'Number',
        value: '2',
      },
    ],
    edges: [],
    root: {
      nodePlug: {
        valA: 0,
        valB: 0,
      },
      content: [
        {
          type: 'other',
          content: 'backdrop name of ',
        },
        {
          type: 'hole',
          plug: {
            valA: 0,
            valB: 1,
          },
        },
        {
          type: 'other',
          content: '',
        },
      ],
      type: 'Number',
      value: '2',
      opcode: [
        [
          'sensing_of',
          'backdrop name',
        ],
        [
          'operator_mathop',
          'backdrop name',
        ],
      ],
    },
  },
};

export default test;
