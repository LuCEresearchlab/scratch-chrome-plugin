const test = {
  it: 'get steps for diagram (""+""): test for no edges',
  args: [
    {
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
    {
      noShowEdges: true,
    },
  ],
  expected: {
    expression: ' + ',
    steps: [
      {
        diagram: {
          edges: [],
          nodes: [
            {
              nodePlug: {
                valA: 0,
                valB: 0,
              },
              content: [
                {
                  valA: 0,
                  valB: 1,
                  type: 'Number',
                },
                {
                  content: ' + ',
                },
                {
                  valA: 0,
                  valB: 2,
                  type: 'Number',
                },
              ],
              type: 'Number',
              isHighlighted: true,
            },
          ],
          root: {
            nodePlug: {
              valA: 0,
              valB: 0,
            },
            content: [
              {
                valA: 0,
                valB: 1,
                type: 'Number',
              },
              {
                content: ' + ',
              },
              {
                valA: 0,
                valB: 2,
                type: 'Number',
              },
            ],
            type: 'Number',
            isHighlighted: true,
          },
        },
        start: 0,
        end: 3,
      },
      {
        diagram: {
          edges: [],
          nodes: [
            {
              nodePlug: {
                valA: 0,
                valB: 0,
              },
              content: [
                {
                  valA: 0,
                  valB: 1,
                  type: 'Number',
                },
                {
                  content: ' + ',
                },
                {
                  valA: 0,
                  valB: 2,
                  type: 'Number',
                },
              ],
              type: 'Number',
              isHighlighted: false,
            },
            {
              nodePlug: {
                valA: 1,
                valB: 0,
              },
              content: [
                {
                  content: '',
                },
              ],
              type: 'Number',
              isHighlighted: true,
            },
          ],
          root: {
            nodePlug: {
              valA: 0,
              valB: 0,
            },
            content: [
              {
                valA: 0,
                valB: 1,
                type: 'Number',
              },
              {
                content: ' + ',
              },
              {
                valA: 0,
                valB: 2,
                type: 'Number',
              },
            ],
            type: 'Number',
            isHighlighted: false,
          },
        },
        start: 0,
        end: 0,
      },
      {
        diagram: {
          edges: [],
          nodes: [
            {
              nodePlug: {
                valA: 0,
                valB: 0,
              },
              content: [
                {
                  valA: 0,
                  valB: 1,
                  type: 'Number',
                },
                {
                  content: ' + ',
                },
                {
                  valA: 0,
                  valB: 2,
                  type: 'Number',
                },
              ],
              type: 'Number',
              isHighlighted: false,
            },
            {
              nodePlug: {
                valA: 1,
                valB: 0,
              },
              content: [
                {
                  content: '',
                },
              ],
              type: 'Number',
              isHighlighted: false,
            },
            {
              nodePlug: {
                valA: 2,
                valB: 0,
              },
              content: [
                {
                  content: '',
                },
              ],
              type: 'Number',
              isHighlighted: true,
            },
          ],
          root: {
            nodePlug: {
              valA: 0,
              valB: 0,
            },
            content: [
              {
                valA: 0,
                valB: 1,
                type: 'Number',
              },
              {
                content: ' + ',
              },
              {
                valA: 0,
                valB: 2,
                type: 'Number',
              },
            ],
            type: 'Number',
            isHighlighted: false,
          },
        },
        start: 3,
        end: 3,
      },
      {
        diagram: {
          edges: [],
          nodes: [
            {
              nodePlug: {
                valA: 0,
                valB: 0,
              },
              content: [
                {
                  valA: 0,
                  valB: 1,
                  type: 'Number',
                },
                {
                  content: ' + ',
                },
                {
                  valA: 0,
                  valB: 2,
                  type: 'Number',
                },
              ],
              type: 'Number',
              isHighlighted: false,
            },
            {
              nodePlug: {
                valA: 1,
                valB: 0,
              },
              content: [
                {
                  content: '',
                },
              ],
              type: 'Number',
              value: '0',
              isHighlighted: true,
            },
            {
              nodePlug: {
                valA: 2,
                valB: 0,
              },
              content: [
                {
                  content: '',
                },
              ],
              type: 'Number',
              isHighlighted: false,
            },
          ],
          root: {
            nodePlug: {
              valA: 0,
              valB: 0,
            },
            content: [
              {
                valA: 0,
                valB: 1,
                type: 'Number',
              },
              {
                content: ' + ',
              },
              {
                valA: 0,
                valB: 2,
                type: 'Number',
              },
            ],
            type: 'Number',
            isHighlighted: false,
          },
        },
        start: 0,
        end: 0,
      },
      {
        diagram: {
          edges: [],
          nodes: [
            {
              nodePlug: {
                valA: 0,
                valB: 0,
              },
              content: [
                {
                  valA: 0,
                  valB: 1,
                  type: 'Number',
                },
                {
                  content: ' + ',
                },
                {
                  valA: 0,
                  valB: 2,
                  type: 'Number',
                },
              ],
              type: 'Number',
              isHighlighted: false,
            },
            {
              nodePlug: {
                valA: 1,
                valB: 0,
              },
              content: [
                {
                  content: '',
                },
              ],
              type: 'Number',
              value: '0',
              isHighlighted: false,
            },
            {
              nodePlug: {
                valA: 2,
                valB: 0,
              },
              content: [
                {
                  content: '',
                },
              ],
              type: 'Number',
              value: '0',
              isHighlighted: true,
            },
          ],
          root: {
            nodePlug: {
              valA: 0,
              valB: 0,
            },
            content: [
              {
                valA: 0,
                valB: 1,
                type: 'Number',
              },
              {
                content: ' + ',
              },
              {
                valA: 0,
                valB: 2,
                type: 'Number',
              },
            ],
            type: 'Number',
            isHighlighted: false,
          },
        },
        start: 3,
        end: 3,
      },
      {
        diagram: {
          edges: [],
          nodes: [
            {
              nodePlug: {
                valA: 0,
                valB: 0,
              },
              content: [
                {
                  valA: 0,
                  valB: 1,
                  type: 'Number',
                },
                {
                  content: ' + ',
                },
                {
                  valA: 0,
                  valB: 2,
                  type: 'Number',
                },
              ],
              type: 'Number',
              value: '0',
              isHighlighted: true,
            },
            {
              nodePlug: {
                valA: 1,
                valB: 0,
              },
              content: [
                {
                  content: '',
                },
              ],
              type: 'Number',
              value: '0',
              isHighlighted: false,
            },
            {
              nodePlug: {
                valA: 2,
                valB: 0,
              },
              content: [
                {
                  content: '',
                },
              ],
              type: 'Number',
              value: '0',
              isHighlighted: false,
            },
          ],
          root: {
            nodePlug: {
              valA: 0,
              valB: 0,
            },
            content: [
              {
                valA: 0,
                valB: 1,
                type: 'Number',
              },
              {
                content: ' + ',
              },
              {
                valA: 0,
                valB: 2,
                type: 'Number',
              },
            ],
            type: 'Number',
            value: '0',
            isHighlighted: true,
          },
        },
        start: 0,
        end: 3,
      },
    ],
  },
};

export default test;
