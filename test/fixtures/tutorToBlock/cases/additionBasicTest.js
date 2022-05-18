const test = {
  it: 'create diagram for block (""+""): simple test',
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
              content: '0',
            },
          ],
          type: 'Number',
          value: '0',
        },
        {
          nodePlug: {
            valA: 2,
            valB: 0,
          },
          content: [
            {
              type: 'other',
              content: '0',
            },
          ],
          type: 'Number',
          value: '0',
        },
        {
          nodePlug: {
            valA: 0,
            valB: 0,
          },
          content: [
            {
              type: 'hole',
              plug: {
                valA: 0,
                valB: 1,
              },
            },
            {
              type: 'other',
              content: ' + ',
            },
            {
              type: 'hole',
              plug: {
                valA: 0,
                valB: 2,
              },
            },
          ],
          type: 'Number',
          value: '0',
        },
      ],
      edges: [
        {
          plugA: {
            valA: 0,
            valB: 1,
          },
          plugB: {
            valA: 1,
            valB: 0,
          },
        },
        {
          plugA: {
            valA: 0,
            valB: 2,
          },
          plugB: {
            valA: 2,
            valB: 0,
          },
        },
      ],
      root: {
        nodePlug: {
          valA: 0,
          valB: 0,
        },
        content: [
          {
            type: 'hole',
            plug: {
              valA: 0,
              valB: 1,
            },
          },
          {
            type: 'other',
            content: ' + ',
          },
          {
            type: 'hole',
            plug: {
              valA: 0,
              valB: 2,
            },
          },
        ],
        type: 'Number',
        value: '0',
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
            content: '0',
          },
        ],
        type: 'Number',
        value: '0',
        opcode: [
          [
            'math_number',
          ],
          [
            'argument_reporter_string_number',
          ],
          [
            'argument_reporter_boolean',
          ],
        ],
      },
      {
        nodePlug: {
          valA: 2,
          valB: 0,
        },
        content: [
          {
            type: 'other',
            content: '0',
          },
        ],
        type: 'Number',
        value: '0',
        opcode: [
          [
            'math_number',
          ],
          [
            'argument_reporter_string_number',
          ],
          [
            'argument_reporter_boolean',
          ],
        ],
      },
      {
        nodePlug: {
          valA: 0,
          valB: 0,
        },
        content: [
          {
            type: 'hole',
            plug: {
              valA: 0,
              valB: 1,
            },
          },
          {
            type: 'other',
            content: ' + ',
          },
          {
            type: 'hole',
            plug: {
              valA: 0,
              valB: 2,
            },
          },
        ],
        type: 'Number',
        value: '0',
      },
    ],
    edges: [
      {
        plugA: {
          valA: 0,
          valB: 1,
        },
        plugB: {
          valA: 1,
          valB: 0,
        },
      },
      {
        plugA: {
          valA: 0,
          valB: 2,
        },
        plugB: {
          valA: 2,
          valB: 0,
        },
      },
    ],
    root: {
      nodePlug: {
        valA: 0,
        valB: 0,
      },
      content: [
        {
          type: 'hole',
          plug: {
            valA: 0,
            valB: 1,
          },
        },
        {
          type: 'other',
          content: ' + ',
        },
        {
          type: 'hole',
          plug: {
            valA: 0,
            valB: 2,
          },
        },
      ],
      type: 'Number',
      value: '0',
      opcode: [
        [
          'operator_add',
        ],
      ],
    },
  },
};

export default test;
