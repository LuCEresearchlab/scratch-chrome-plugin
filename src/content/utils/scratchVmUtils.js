/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/extensions
import { expressionBlocks, nonExpressionBlocks } from '../../assets/data/scratch-blocks-map.mjs';
import { getScratchVM } from './stateHandler';

export const opcodeToTypeInfo = (opcode, isExpression = true) => {
  const blockTypeInfo = isExpression ? expressionBlocks[opcode] : nonExpressionBlocks[opcode];
  if (blockTypeInfo === undefined) {
    throw new Error(`could not find opcode ${opcode} in opcode-to-type map`);
  }
  return blockTypeInfo;
};

/**
 * Returns the corresponding human-readable value based on the type and value given.
 * @param {String} type the type of the value in the VM
 * @param {String} value the value in the VM
 * @returns the corresponding human-readable value based on the type and value given
 */
const unrawValue = (type, value) => {
  switch (type) {
    case 'Boolean': return value.length === 0 ? 'false' : value;
    case 'Number': return value.length === 0 ? '0' : value;
    case 'String': return `"${value}"`;
    default: return value;
  }
};

export const typeToDefaultValue = (type) => unrawValue(type, '');

export const getCachedVmValue = (block, type, thread) => {
  const getRawValue = () => {
    const { runtime } = getScratchVM();
    const c = runtime._editingTarget.blocks._cache._executeCached[block.id];
    if (c._isShadowBlock) {
      if (!c._shadowValue) {
        return '';
      }
      return String(c._shadowValue);
    }
    if (c._parentKey) {
      return String(c._parentValues[c._parentKey]);
    }
    if (thread.topBlock !== block.id) {
      throw new Error('Invalid block being evaluated');
    }
    return String(thread.justReported);
  };

  const raw = getRawValue();
  return unrawValue(type, raw);
};
