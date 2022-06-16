const test = {
  it: 'get steps for diagram ("23"+"0"): more complex test',
  args: [
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
  ],
  expected: {
    expression: '23 + 0',
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
        end: 6,
      },
      {
        diagram: {
          edges: [
            {
              plugA: {
                valA: 0,
                valB: 1,
                type: 'Number',
              },
              plugB: {
                valA: 1,
                valB: 0,
              },
              isHighlighted: true,
            },
          ],
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
                  content: '23',
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
        end: 2,
      },
      {
        diagram: {
          edges: [
            {
              plugA: {
                valA: 0,
                valB: 1,
                type: 'Number',
              },
              plugB: {
                valA: 1,
                valB: 0,
              },
              isHighlighted: false,
            },
            {
              plugA: {
                valA: 0,
                valB: 2,
                type: 'Number',
              },
              plugB: {
                valA: 2,
                valB: 0,
              },
              isHighlighted: true,
            },
          ],
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
                  content: '23',
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
                  content: '0',
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
        start: 5,
        end: 6,
      },
      {
        diagram: {
          edges: [
            {
              plugA: {
                valA: 0,
                valB: 1,
                type: 'Number',
              },
              plugB: {
                valA: 1,
                valB: 0,
              },
              isHighlighted: false,
            },
            {
              plugA: {
                valA: 0,
                valB: 2,
                type: 'Number',
              },
              plugB: {
                valA: 2,
                valB: 0,
              },
              isHighlighted: false,
            },
          ],
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
                  content: '23',
                },
              ],
              type: 'Number',
              value: '23',
              isHighlighted: true,
            },
            {
              nodePlug: {
                valA: 2,
                valB: 0,
              },
              content: [
                {
                  content: '0',
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
      },
      {
        diagram: {
          edges: [
            {
              plugA: {
                valA: 0,
                valB: 1,
                type: 'Number',
              },
              plugB: {
                valA: 1,
                valB: 0,
              },
              isHighlighted: false,
            },
            {
              plugA: {
                valA: 0,
                valB: 2,
                type: 'Number',
              },
              plugB: {
                valA: 2,
                valB: 0,
              },
              isHighlighted: false,
            },
          ],
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
                  content: '23',
                },
              ],
              type: 'Number',
              value: '23',
              isHighlighted: false,
            },
            {
              nodePlug: {
                valA: 2,
                valB: 0,
              },
              content: [
                {
                  content: '0',
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
      },
      {
        diagram: {
          edges: [
            {
              plugA: {
                valA: 0,
                valB: 1,
                type: 'Number',
              },
              plugB: {
                valA: 1,
                valB: 0,
              },
              isHighlighted: false,
            },
            {
              plugA: {
                valA: 0,
                valB: 2,
                type: 'Number',
              },
              plugB: {
                valA: 2,
                valB: 0,
              },
              isHighlighted: false,
            },
          ],
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
              value: '28',
              isHighlighted: true,
            },
            {
              nodePlug: {
                valA: 1,
                valB: 0,
              },
              content: [
                {
                  content: '23',
                },
              ],
              type: 'Number',
              value: '23',
              isHighlighted: false,
            },
            {
              nodePlug: {
                valA: 2,
                valB: 0,
              },
              content: [
                {
                  content: '0',
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
            value: '28',
            isHighlighted: true,
          },
        },
      },
    ],
  },
};

export default test;
