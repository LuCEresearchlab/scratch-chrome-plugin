/* eslint-disable no-underscore-dangle */
import {
  bool, color, expressionBlocks, nonExpressionBlocks, number,
} from '../../assets/data/scratch-blocks-map.js';

const opcodeToTypeInfo = (opcode, isExpression = true) => {
  const blockTypeInfo = isExpression ? expressionBlocks[opcode] : nonExpressionBlocks[opcode];
  if (blockTypeInfo === undefined) {
    throw new Error(`could not find opcode ${opcode} in opcode-to-type map`);
  }
  return blockTypeInfo;
};

/**
 * Returns the type information of an expression block with the given opcode.
 * @param {string} opcode the opcode to map
 * @returns {{outputType: string|Array.<string>|Object.<string, string>,
 *  expectedArgs: Array.<{type: string}>}}
 *  the type information of an expression block with the given opcode
 */
export const opcodeToExpressionTypeInfo = (opcode) => opcodeToTypeInfo(opcode);

/**
 * Returns the type information of a non-expression block with the given opcode.
 * @param {string} opcode the opcode to map
 * @returns {?Array.<string>} the type information of a non-expression block with the given opcode
 */
export const opcodeToNonExpressionTypeInfo = (opcode) => opcodeToTypeInfo(opcode, false);

/**
 * Returns the corresponding human-readable value based on the type and value given.
 * @param {string|Array.<string>} type the type of the value in the VM
 * @param {string} value the value in the VM
 * @returns {string} the corresponding human-readable value based on the type and value given
 */
const unrawValue = (type, value) => {
  switch (type) {
    case bool: return !value ? 'false' : String(value);
    case number: return !value ? '0' : String(value);
    case color: return !value ? '#000000' : String(value);
    default: return String(value);
  }
};

/**
 * Returns the default value corresponding to the given type(s).
 * @param {string|Array.<string>} type the type to consider
 * @returns {string} the default value corresponding to the given type(s)
 */
export const typeToDefaultValue = (type) => unrawValue(type, '');

export const getCachedVmValue = (blockId, type, thread) => {
  const getRawValue = () => {
    const c = thread.blockContainer._cache._executeCached[blockId];
    if (c._isShadowBlock) {
      if (!c._shadowValue) {
        return '';
      }
      return c._shadowValue;
    }
    if (c._parentKey) {
      return c._parentValues[c._parentKey];
    }
    console.assert(thread.topBlock === blockId, 'Invalid block being evaluated');
    return thread.justReported;
  };

  const raw = getRawValue();
  return unrawValue(type, raw);
};
