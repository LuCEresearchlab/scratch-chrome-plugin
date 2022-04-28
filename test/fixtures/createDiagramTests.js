import additionBasicTest from './cases/additionBasicTest.js';
import additionTest from './cases/additionTest.js';
import internalNonShadowBlockTest from './cases/internalNonShadowBlockTest.js';
import dynamicallyTypedDropdownBlockTest from './cases/dynamicallyTypedDropdownBlockTest.js';
import internalBlockTypeMismatchNumberStringTest from './cases/internalBlockTypeMismatchNumberStringTest.js';
import internalBlockTypeMismatchColorStringTest from './cases/internalBlockTypeMismatchColorStringTest.js';
import rootBlockTypeMismatchTest from './cases/rootBlockTypeMismatchTest.js';
import rootBlockTypeMatchTest from './cases/rootBlockTypeMatchTest.js';
import emptyBlockTest from './cases/emptyBlockTest.js';
import internalBooleanBlockTest from './cases/internalBooleanBlockTest.js';
import colorBlockTest from './cases/colorBlockTest.js';
import emptyDropdownTest from './cases/emptyDropdownTest.js';
import rootBlockTypeMatch2Test from './cases/rootBlockTypeMatch2Test.js';
import sideBySideInternalBlocksTest from './cases/sideBySideInternalBlocksTest.js';
import dynamicallyTypedChildBlockTest from './cases/dynamicallyTypedChildBlockTest.js';
import rootDropdownTest from './cases/rootDropdownTest.js';
import rootDropdownValueNotEqualToTextTest from './cases/rootDropdownValueNotEqualToTextTest.js'

const createDiagramTests = [
  additionBasicTest,
  additionTest,
  internalNonShadowBlockTest,
  dynamicallyTypedDropdownBlockTest,
  dynamicallyTypedChildBlockTest,
  internalBlockTypeMismatchNumberStringTest,
  internalBlockTypeMismatchColorStringTest,
  rootBlockTypeMismatchTest,
  rootBlockTypeMatchTest,
  rootBlockTypeMatch2Test,
  emptyBlockTest,
  internalBooleanBlockTest,
  colorBlockTest,
  emptyDropdownTest,
  sideBySideInternalBlocksTest,
  rootDropdownTest,
  rootDropdownValueNotEqualToTextTest,
];

export default createDiagramTests;
