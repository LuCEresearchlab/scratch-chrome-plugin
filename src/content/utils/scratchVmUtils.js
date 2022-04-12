/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/extensions
import { expressionBlocks } from '../../assets/data/scratch-blocks-map.mjs';
import { getScratchVM } from './stateHandler';

export const opcodeToTypeInfo = (opcode) => {
  const blockTypeInfo = expressionBlocks[opcode];
  if (!blockTypeInfo) {
    throw new Error('Expected expression block, got non-expression block');
  }
  return blockTypeInfo;
};

const typeToDefaultRawValue = (type) => {
  switch (type) {
    case 'Boolean': return 'false';
    case 'Number': return '0';
    case 'String': return '';
    default: throw new Error('Unknown type');
  }
};

const unrawValue = (type, value) => (type === 'String' ? `"${value}"` : value);

export const typeToDefaultValue = (type) => {
  const raw = typeToDefaultRawValue(type);
  return unrawValue(type, raw);
};

export const getCachedVmValue = (block, type, thread) => {
  const getRawValue = () => {
    const { runtime } = getScratchVM();
    const c = runtime._editingTarget.blocks._cache._executeCached[block.id];
    if (c._isShadowBlock) {
      if (!c._shadowValue) {
        return typeToDefaultRawValue(type);
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
