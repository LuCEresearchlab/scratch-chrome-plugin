/* eslint-disable no-underscore-dangle */
import { getScratchVM } from './stateHandler';

export const connectionToType = (con) => {
  if (typeof con.check_[0] === 'boolean') {
    return 'Any';
  }

  return con.check_[0];
};

export const typeToDefaultValue = (type) => {
  switch (type) {
    case 'Boolean': return 'false';
    case 'Number': return '0';
    default: return '""';
  }
};

export const getCachedVmValue = (block, type) => {
  const { runtime } = getScratchVM();
  const c = runtime._editingTarget.blocks._cache._executeCached[block.id];
  if (c._isShadowBlock) {
    if (!c._shadowValue) {
      return typeToDefaultValue(type);
    }
    if (type === 'String') {
      return `"${c._shadowValue}"`;
    }
    return String(c._shadowValue);
  }
  return String(c._blockFunction(c._argValues));
};
