const test = {
  it: 'get steps for diagram ("3"*("2"+"1")): test for deep tree',
  args: [
    {
      nodes: [
        {
          nodePlug: { valA: 1, valB: 0 },
          content: [{ content: '3' }],
          type: 'Number',
          value: '3',
        },
        {
          nodePlug: { valA: 3, valB: 0 },
          content: [{ content: '2' }],
          type: 'Number',
          value: '2',
        },
        {
          nodePlug: { valA: 4, valB: 0 },
          content: [{ content: '1' }],
          type: 'Number',
          value: '1',
        },
        {
          nodePlug: { valA: 2, valB: 0 },
          content: [
            { valA: 2, valB: 1, type: 'Number' },
            { content: ' + ' },
            { valA: 2, valB: 2, type: 'Number' },
          ],
          type: 'Number',
          value: '3',
        },
        {
          nodePlug: { valA: 0, valB: 0 },
          content: [
            { valA: 0, valB: 1, type: 'Number' },
            { content: ' * ' },
            { valA: 0, valB: 2, type: 'Number' },
          ],
          type: 'Number',
          value: '9',
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
        {
          plugA: { valA: 2, valB: 1, type: 'Number' },
          plugB: { valA: 3, valB: 0 },
        },
        {
          plugA: { valA: 2, valB: 2, type: 'Number' },
          plugB: { valA: 4, valB: 0 },
        },
      ],
      root: {
        nodePlug: { valA: 0, valB: 0 },
        content: [
          { valA: 0, valB: 1, type: 'Number' },
          { content: ' * ' },
          { valA: 0, valB: 2, type: 'Number' },
        ],
        type: 'Number',
        value: '9',
      },
    },
  ],
  expected: {
    expression: '3 * 2 + 1',
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
                  content: ' * ',
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
                content: ' * ',
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
        end: 9,
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
                  content: ' * ',
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
                  content: '3',
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
                content: ' * ',
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
        end: 1,
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
                  content: ' * ',
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
                  content: '3',
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
                  valA: 2,
                  valB: 1,
                  type: 'Number',
                },
                {
                  content: ' + ',
                },
                {
                  valA: 2,
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
                content: ' * ',
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
        start: 4,
        end: 9,
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
            {
              plugA: {
                valA: 2,
                valB: 1,
                type: 'Number',
              },
              plugB: {
                valA: 3,
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
                  content: ' * ',
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
                  content: '3',
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
                  valA: 2,
                  valB: 1,
                  type: 'Number',
                },
                {
                  content: ' + ',
                },
                {
                  valA: 2,
                  valB: 2,
                  type: 'Number',
                },
              ],
              type: 'Number',
              isHighlighted: false,
            },
            {
              nodePlug: {
                valA: 3,
                valB: 0,
              },
              content: [
                {
                  content: '2',
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
                content: ' * ',
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
        start: 4,
        end: 5,
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
            {
              plugA: {
                valA: 2,
                valB: 1,
                type: 'Number',
              },
              plugB: {
                valA: 3,
                valB: 0,
              },
              isHighlighted: false,
            },
            {
              plugA: {
                valA: 2,
                valB: 2,
                type: 'Number',
              },
              plugB: {
                valA: 4,
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
                  content: ' * ',
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
                  content: '3',
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
                  valA: 2,
                  valB: 1,
                  type: 'Number',
                },
                {
                  content: ' + ',
                },
                {
                  valA: 2,
                  valB: 2,
                  type: 'Number',
                },
              ],
              type: 'Number',
              isHighlighted: false,
            },
            {
              nodePlug: {
                valA: 3,
                valB: 0,
              },
              content: [
                {
                  content: '2',
                },
              ],
              type: 'Number',
              isHighlighted: false,
            },
            {
              nodePlug: {
                valA: 4,
                valB: 0,
              },
              content: [
                {
                  content: '1',
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
                content: ' * ',
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
        start: 8,
        end: 9,
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
            {
              plugA: {
                valA: 2,
                valB: 1,
                type: 'Number',
              },
              plugB: {
                valA: 3,
                valB: 0,
              },
              isHighlighted: false,
            },
            {
              plugA: {
                valA: 2,
                valB: 2,
                type: 'Number',
              },
              plugB: {
                valA: 4,
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
                  content: ' * ',
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
                  content: '3',
                },
              ],
              type: 'Number',
              value: '3',
              isHighlighted: true,
            },
            {
              nodePlug: {
                valA: 2,
                valB: 0,
              },
              content: [
                {
                  valA: 2,
                  valB: 1,
                  type: 'Number',
                },
                {
                  content: ' + ',
                },
                {
                  valA: 2,
                  valB: 2,
                  type: 'Number',
                },
              ],
              type: 'Number',
              isHighlighted: false,
            },
            {
              nodePlug: {
                valA: 3,
                valB: 0,
              },
              content: [
                {
                  content: '2',
                },
              ],
              type: 'Number',
              isHighlighted: false,
            },
            {
              nodePlug: {
                valA: 4,
                valB: 0,
              },
              content: [
                {
                  content: '1',
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
                content: ' * ',
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
        end: 1,
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
            {
              plugA: {
                valA: 2,
                valB: 1,
                type: 'Number',
              },
              plugB: {
                valA: 3,
                valB: 0,
              },
              isHighlighted: false,
            },
            {
              plugA: {
                valA: 2,
                valB: 2,
                type: 'Number',
              },
              plugB: {
                valA: 4,
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
                  content: ' * ',
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
                  content: '3',
                },
              ],
              type: 'Number',
              value: '3',
              isHighlighted: false,
            },
            {
              nodePlug: {
                valA: 2,
                valB: 0,
              },
              content: [
                {
                  valA: 2,
                  valB: 1,
                  type: 'Number',
                },
                {
                  content: ' + ',
                },
                {
                  valA: 2,
                  valB: 2,
                  type: 'Number',
                },
              ],
              type: 'Number',
              isHighlighted: false,
            },
            {
              nodePlug: {
                valA: 3,
                valB: 0,
              },
              content: [
                {
                  content: '2',
                },
              ],
              type: 'Number',
              value: '2',
              isHighlighted: true,
            },
            {
              nodePlug: {
                valA: 4,
                valB: 0,
              },
              content: [
                {
                  content: '1',
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
                content: ' * ',
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
        start: 4,
        end: 5,
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
            {
              plugA: {
                valA: 2,
                valB: 1,
                type: 'Number',
              },
              plugB: {
                valA: 3,
                valB: 0,
              },
              isHighlighted: false,
            },
            {
              plugA: {
                valA: 2,
                valB: 2,
                type: 'Number',
              },
              plugB: {
                valA: 4,
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
                  content: ' * ',
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
                  content: '3',
                },
              ],
              type: 'Number',
              value: '3',
              isHighlighted: false,
            },
            {
              nodePlug: {
                valA: 2,
                valB: 0,
              },
              content: [
                {
                  valA: 2,
                  valB: 1,
                  type: 'Number',
                },
                {
                  content: ' + ',
                },
                {
                  valA: 2,
                  valB: 2,
                  type: 'Number',
                },
              ],
              type: 'Number',
              isHighlighted: false,
            },
            {
              nodePlug: {
                valA: 3,
                valB: 0,
              },
              content: [
                {
                  content: '2',
                },
              ],
              type: 'Number',
              value: '2',
              isHighlighted: false,
            },
            {
              nodePlug: {
                valA: 4,
                valB: 0,
              },
              content: [
                {
                  content: '1',
                },
              ],
              type: 'Number',
              value: '1',
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
                content: ' * ',
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
        start: 8,
        end: 9,
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
            {
              plugA: {
                valA: 2,
                valB: 1,
                type: 'Number',
              },
              plugB: {
                valA: 3,
                valB: 0,
              },
              isHighlighted: false,
            },
            {
              plugA: {
                valA: 2,
                valB: 2,
                type: 'Number',
              },
              plugB: {
                valA: 4,
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
                  content: ' * ',
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
                  content: '3',
                },
              ],
              type: 'Number',
              value: '3',
              isHighlighted: false,
            },
            {
              nodePlug: {
                valA: 2,
                valB: 0,
              },
              content: [
                {
                  valA: 2,
                  valB: 1,
                  type: 'Number',
                },
                {
                  content: ' + ',
                },
                {
                  valA: 2,
                  valB: 2,
                  type: 'Number',
                },
              ],
              type: 'Number',
              value: '3',
              isHighlighted: true,
            },
            {
              nodePlug: {
                valA: 3,
                valB: 0,
              },
              content: [
                {
                  content: '2',
                },
              ],
              type: 'Number',
              value: '2',
              isHighlighted: false,
            },
            {
              nodePlug: {
                valA: 4,
                valB: 0,
              },
              content: [
                {
                  content: '1',
                },
              ],
              type: 'Number',
              value: '1',
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
                content: ' * ',
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
        start: 4,
        end: 9,
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
            {
              plugA: {
                valA: 2,
                valB: 1,
                type: 'Number',
              },
              plugB: {
                valA: 3,
                valB: 0,
              },
              isHighlighted: false,
            },
            {
              plugA: {
                valA: 2,
                valB: 2,
                type: 'Number',
              },
              plugB: {
                valA: 4,
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
                  content: ' * ',
                },
                {
                  valA: 0,
                  valB: 2,
                  type: 'Number',
                },
              ],
              type: 'Number',
              value: '9',
              isHighlighted: true,
            },
            {
              nodePlug: {
                valA: 1,
                valB: 0,
              },
              content: [
                {
                  content: '3',
                },
              ],
              type: 'Number',
              value: '3',
              isHighlighted: false,
            },
            {
              nodePlug: {
                valA: 2,
                valB: 0,
              },
              content: [
                {
                  valA: 2,
                  valB: 1,
                  type: 'Number',
                },
                {
                  content: ' + ',
                },
                {
                  valA: 2,
                  valB: 2,
                  type: 'Number',
                },
              ],
              type: 'Number',
              value: '3',
              isHighlighted: true,
            },
            {
              nodePlug: {
                valA: 3,
                valB: 0,
              },
              content: [
                {
                  content: '2',
                },
              ],
              type: 'Number',
              value: '2',
              isHighlighted: false,
            },
            {
              nodePlug: {
                valA: 4,
                valB: 0,
              },
              content: [
                {
                  content: '1',
                },
              ],
              type: 'Number',
              value: '1',
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
                content: ' * ',
              },
              {
                valA: 0,
                valB: 2,
                type: 'Number',
              },
            ],
            type: 'Number',
            value: '9',
            isHighlighted: true,
          },
        },
        start: 0,
        end: 9,
      },
    ],
  },
};

export default test;
