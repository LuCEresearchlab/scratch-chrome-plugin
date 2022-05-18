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
import colorPickerBlockTest from './cases/colorPickerBlockTest.js';
import emptyDropdownTest from './cases/emptyDropdownTest.js';
import rootBlockTypeMatch2Test from './cases/rootBlockTypeMatch2Test.js';
import sideBySideInternalBlocksTest from './cases/sideBySideInternalBlocksTest.js';
import dynamicallyTypedChildBlockTest from './cases/dynamicallyTypedChildBlockTest.js';
import rootDropdownTest from './cases/rootDropdownTest.js';
import rootDropdownValueNotEqualToTextTest from './cases/rootDropdownValueNotEqualToTextTest.js';
import matrixBlockTest from './cases/matrixBlockTest.js';
import argumentReporterStringNumberShadowBlockTest from './cases/argumentReporterStringNumberShadowBlockTest.js';
import argumentReporterStringNumberBlockTest from './cases/argumentReporterStringNumberBlockTest.js';
import argumentReporterBooleanShadowBlockTest from './cases/argumentReporterBooleanShadowBlockTest.js';
import argumentReporterBooleanBlockTest from './cases/argumentReporterBooleanBlockTest.js';

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
  colorPickerBlockTest,
  emptyDropdownTest,
  sideBySideInternalBlocksTest,
  rootDropdownTest,
  rootDropdownValueNotEqualToTextTest,
  matrixBlockTest,
  argumentReporterStringNumberShadowBlockTest,
  argumentReporterStringNumberBlockTest,
  argumentReporterBooleanShadowBlockTest,
  argumentReporterBooleanBlockTest,
];

export default createDiagramTests;
