const binaryArithmetic = {
  type: 'Number',
  children: [
    {
      type: 'Number',
    },
    {
      type: 'Number',
    },
  ],
};

const inequality = {
  type: 'Boolean',
  children: [
    {
      type: 'Any',
    },
    {
      type: 'Any',
    },
  ],
};

const binaryLogical = {
  type: 'Boolean',
  children: [
    {
      type: 'Boolean',
    },
    {
      type: 'Boolean',
    },
  ],
};

const unaryArithmetic = {
  type: 'Number',
  children: [
    {
      type: 'Number',
    },
  ],
};

const expressionBlocks = {
  operator_mathop: unaryArithmetic,
  operator_round: unaryArithmetic,
  operator_add: binaryArithmetic,
  operator_subtract: binaryArithmetic,
  operator_divide: binaryArithmetic,
  operator_multiply: binaryArithmetic,
  operator_mod: binaryArithmetic,
  operator_random: binaryArithmetic,
  operator_gt: inequality,
  operator_lt: inequality,
  operator_equals: inequality,
  operator_and: binaryLogical,
  operator_or: binaryLogical,
  operator_not: {
    type: 'Boolean',
    children: [
      {
        type: 'Boolean',
      },
    ],
  },
  operator_join: {
    type: 'String',
    children: [
      {
        type: 'String',
      },
      {
        type: 'String',
      },
    ],
  },
  operator_letter_of: {
    type: 'String',
    children: [
      {
        type: 'Number',
      },
      {
        type: 'String',
      },
    ],
  },
  operator_length: {
    type: 'Number',
    children: [
      {
        type: 'String',
      },
    ],
  },
  operator_contains: {
    type: 'Boolean',
    children: [
      {
        type: 'String',
      },
      {
        type: 'String',
      },
    ],
  },
};

export default expressionBlocks;
