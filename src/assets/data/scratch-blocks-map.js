const binaryArithmetic = {
  type: 'Number',
  expectedArgs: [
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
  expectedArgs: [{}, {}],
};

const binaryLogical = {
  type: 'Boolean',
  expectedArgs: [
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
  expectedArgs: [
    {
      type: 'Number',
    },
  ],
};

const leaf = (type) => ({
  type,
  expectedArgs: [],
});
const numberLeaf = leaf('Number');
const stringLeaf = leaf('String');

const looksNumberName = {
  type: {
    number: 'Number',
    other: 'String',
  },
  expectedArgs: [],
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
    expectedArgs: [
      {
        type: 'Boolean',
      },
    ],
  },
  operator_join: {
    type: 'String',
    expectedArgs: [
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
    expectedArgs: [
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
    expectedArgs: [
      {
        type: 'String',
      },
    ],
  },
  operator_contains: {
    type: 'Boolean',
    expectedArgs: [
      {
        type: 'String',
      },
      {
        type: 'String',
      },
    ],
  },
  motion_direction: numberLeaf,
  motion_xposition: numberLeaf,
  motion_yposition: numberLeaf,
  motion_glideto_menu: stringLeaf,
  motion_goto_menu: stringLeaf,
  motion_pointtowards_menu: stringLeaf,
  looks_backdrops: stringLeaf,
  looks_costume: stringLeaf,
  looks_costumenumbername: looksNumberName,
  looks_backdropnumbername: looksNumberName,
  looks_size: numberLeaf,
  sound_volume: numberLeaf,
  sound_sounds_menu: stringLeaf,
  control_create_clone_of_menu: stringLeaf,
};

export default expressionBlocks;
