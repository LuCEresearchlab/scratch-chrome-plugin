import additionBasicTest from './cases/additionBasicTest.js';
import noMatchingBlockExceptionTest from './cases/noMatchingBlockExceptionTest.js';
import multipleMatchingBlocksTest from './cases/multipleMatchingBlocksTest.js';
import matchingBlockHasEmptyHoleTest from './cases/matchingBlockHasEmptyHoleTest.js';
import pickArgRepBoolNotStrNumTest from './cases/pickArgRepBoolNotStrNumTest.js';

const pickOpcodesInDiagramTests = [
  additionBasicTest,
  noMatchingBlockExceptionTest,
  multipleMatchingBlocksTest,
  matchingBlockHasEmptyHoleTest,
  pickArgRepBoolNotStrNumTest,
];

export default pickOpcodesInDiagramTests;
