export const expressionBlocks = {
  operator_add: {
    type: 'Number',
    children: [
      {
        type: 'Number',
      },
      {
        type: 'Number',
      },
    ],
  },
  operator_and: {
    type: 'Boolean',
    children: [
      {
        type: 'Boolean',
      },
      {
        type: 'Boolean',
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
  operator_divide: {
    type: 'Number',
    children: [
      {
        type: 'Number',
      },
      {
        type: 'Number',
      },
    ],
  },
  operator_equals: {
    // TODO: 1e1 = 10 is a number comparison
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
  operator_gt: {
    // TODO: 1e1 > 10 is a number comparison
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
  operator_length: {
    // Note: Integer here means non-negative integer
    type: 'Integer',
    children: [
      {
        type: 'String',
      },
    ],
  },
  operator_letter_of: {
    // Note: Number instead of Integer because
    // block of type Number can be the first child
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
  operator_lt: {
    // TODO: 1e1 < 10 is a number comparison
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
  operator_mathop: {
    type: 'Number',
    children: [
      {
        type: 'Number',
      },
    ],
  },
  operator_mod: {
    type: 'Number',
    children: [
      {
        type: 'Number',
      },
      {
        type: 'Number',
      },
    ],
  },
  operator_multiply: {
    type: 'Number',
    children: [
      {
        type: 'Number',
      },
      {
        type: 'Number',
      },
    ],
  },
  operator_not: {
    type: 'Boolean',
    children: [
      {
        type: 'Boolean',
      },
    ],
  },
  operator_or: {
    type: 'Boolean',
    children: [
      {
        type: 'Boolean',
      },
      {
        type: 'Boolean',
      },
    ],
  },
  operator_random: {
    type: 'Number',
    children: [
      {
        type: 'Number',
      },
      {
        type: 'Number',
      },
    ],
  },
  operator_round: {
    type: 'Integer',
    children: [
      {
        type: 'Number',
      },
    ],
  },
  operator_subtract: {
    type: 'Number',
    children: [
      {
        type: 'Number',
      },
      {
        type: 'Number',
      },
    ],
  },
};

export const nonExpressionBlocks = {
  motion_movesteps: {
    children: [{
      type: 'Number',
    }],
  },
};
