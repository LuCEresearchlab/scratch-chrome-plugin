const test = {
  it: 'overused hole in actual diagram',
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
              content: '34567',
            },
          ],
          type: 'Number',
          value: '34567',
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
          value: '34567',
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
        value: '34567',
      },
    },
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
              content: '34567',
            },
          ],
          type: 'Number',
          value: '34567',
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
          value: '34567',
        },
        {
          nodePlug: {
            valA: 460971077,
            valB: 0,
          },
          content: [
            {
              type: 'other',
              content: '234',
            },
          ],
          type: '',
          value: '',
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
        {
          plugA: {
            valA: 0,
            valB: 2,
          },
          plugB: {
            valA: 460971077,
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
        value: '34567',
      },
    },
  ],
  expected: '# of holes and child nodes of node 0 do not equal',
};

export default test;
