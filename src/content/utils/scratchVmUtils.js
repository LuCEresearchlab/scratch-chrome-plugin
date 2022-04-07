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

export const getCachedVmValue = (block, type, thread) => {
  const { runtime } = getScratchVM();
  const c = runtime._editingTarget.blocks._cache._executeCached[block.id];
  let val;
  if (c._parentKey) {
    val = String(c._parentValues[c._parentKey]);
  } else {
    if (thread.topBlock !== block.id) {
      throw new Error('Invalid block being evaluated');
    }
    val = String(thread.justReported);
  }
  if (type === 'String') {
    val = `"${val}"`;
  }
  return val;
};
