const test = {
  it: 'get steps for diagram (touching color (answer)?): test for long texts in diagram',
  args: [
    {
      nodes: [
        {
          nodePlug: { valA: 1, valB: 0 },
          content: [{ content: 'answer' }],
          type: 'String',
          value: '',
        },
        {
          nodePlug: { valA: 0, valB: 0 },
          content: [
            { content: 'touching color ' },
            { valA: 0, valB: 1, type: 'Colour' },
            { content: '?' },
          ],
          type: 'Boolean',
          value: 'false',
        },
      ],
      edges: [
        {
          plugA: { valA: 0, valB: 1, type: 'Colour' },
          plugB: { valA: 1, valB: 0 },
          isHighlighted: true,
        },
      ],
      root: {
        nodePlug: { valA: 0, valB: 0 },
        content: [
          { content: 'touching color ' },
          { valA: 0, valB: 1, type: 'Colour' },
          { content: '?' },
        ],
        type: 'Boolean',
        value: 'false',
      },
    },
  ],
  expected: {
    expression: 'touching color answer?',
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
                  content: 'touching color ',
                },
                {
                  valA: 0,
                  valB: 1,
                  type: 'Colour',
                },
                {
                  content: '?',
                },
              ],
              type: 'Boolean',
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
                content: 'touching color ',
              },
              {
                valA: 0,
                valB: 1,
                type: 'Colour',
              },
              {
                content: '?',
              },
            ],
            type: 'Boolean',
            isHighlighted: true,
          },
        },
        start: 0,
        end: 22,
      },
      {
        diagram: {
          edges: [
            {
              plugA: {
                valA: 0,
                valB: 1,
                type: 'Colour',
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
                  content: 'touching color ',
                },
                {
                  valA: 0,
                  valB: 1,
                  type: 'Colour',
                },
                {
                  content: '?',
                },
              ],
              type: 'Boolean',
              isHighlighted: false,
            },
            {
              nodePlug: {
                valA: 1,
                valB: 0,
              },
              content: [
                {
                  content: 'answer',
                },
              ],
              type: 'String',
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
                content: 'touching color ',
              },
              {
                valA: 0,
                valB: 1,
                type: 'Colour',
              },
              {
                content: '?',
              },
            ],
            type: 'Boolean',
            isHighlighted: false,
          },
        },
        start: 15,
        end: 21,
      },
      {
        diagram: {
          edges: [
            {
              plugA: {
                valA: 0,
                valB: 1,
                type: 'Colour',
              },
              plugB: {
                valA: 1,
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
                  content: 'touching color ',
                },
                {
                  valA: 0,
                  valB: 1,
                  type: 'Colour',
                },
                {
                  content: '?',
                },
              ],
              type: 'Boolean',
              isHighlighted: false,
            },
            {
              nodePlug: {
                valA: 1,
                valB: 0,
              },
              content: [
                {
                  content: 'answer',
                },
              ],
              type: 'String',
              value: '',
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
                content: 'touching color ',
              },
              {
                valA: 0,
                valB: 1,
                type: 'Colour',
              },
              {
                content: '?',
              },
            ],
            type: 'Boolean',
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
                type: 'Colour',
              },
              plugB: {
                valA: 1,
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
                  content: 'touching color ',
                },
                {
                  valA: 0,
                  valB: 1,
                  type: 'Colour',
                },
                {
                  content: '?',
                },
              ],
              type: 'Boolean',
              value: 'false',
              isHighlighted: true,
            },
            {
              nodePlug: {
                valA: 1,
                valB: 0,
              },
              content: [
                {
                  content: 'answer',
                },
              ],
              type: 'String',
              value: '',
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
                content: 'touching color ',
              },
              {
                valA: 0,
                valB: 1,
                type: 'Colour',
              },
              {
                content: '?',
              },
            ],
            type: 'Boolean',
            value: 'false',
            isHighlighted: true,
          },
        },
      },
    ],
  },
};

export default test;
