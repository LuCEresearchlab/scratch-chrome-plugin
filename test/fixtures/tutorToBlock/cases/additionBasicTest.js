const test = {
  it: 'create diagram for block (""+""): simple test',
  args: [{
    nodes: [
      {
        nodePlug: { valA: 1, valB: 0 },
        content: [{ content: '0' }],
        type: 'Number',
        value: '0',
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
  }],
  expected: {
    nodes: [
      {
        nodePlug: { valA: 1, valB: 0 },
        content: [{ content: '0' }],
        type: 'Number',
        value: '0',
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
