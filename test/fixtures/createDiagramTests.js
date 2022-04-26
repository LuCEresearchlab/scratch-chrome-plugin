import additionBasicTest from './cases/additionBasicTest.js';
import additionTest from './cases/additionTest.js';
import internalNonShadowBlockTest from './cases/internalNonShadowBlockTest.js';
import dynamicallyTypedDropdownBlockTest from './cases/dynamicallyTypedDropdownBlockTest.js';
import internalBlockTypeMismatchTest from './cases/internalBlockTypeMismatchTest.js';
import rootBlockTypeMismatchTest from './cases/rootBlockTypeMismatchTest.js';
import rootBlockTypeMatchTest from './cases/rootBlockTypeMatchTest.js';
import emptyBlockTest from './cases/emptyBlockTest.js';
import internalBooleanBlockTest from './cases/internalBooleanBlockTest.js';
import colorBlockTest from './cases/colorBlockTest.js';
import emptyDropdownTest from './cases/emptyDropdownTest.js';
import rootBlockTypeMatch2Test from './cases/rootBlockTypeMatch2Test.js';
import sideBySideInternalBlocksTest from './cases/sideBySideInternalBlocksTest.js';
import dynamicallyTypedChildBlockTest from './cases/dynamicallyTypedChildBlockTest.js';

const createDiagramTests = [
  additionBasicTest,
  additionTest,
  internalNonShadowBlockTest,
  dynamicallyTypedDropdownBlockTest,
  dynamicallyTypedChildBlockTest,
  internalBlockTypeMismatchTest,
  rootBlockTypeMismatchTest,
  rootBlockTypeMatchTest,
  rootBlockTypeMatch2Test,
  emptyBlockTest,
  internalBooleanBlockTest,
  colorBlockTest,
  emptyDropdownTest,
  sideBySideInternalBlocksTest,
];

export default createDiagramTests;
