import additionBasicTest from './cases/additionBasicTest.js';
import noMatchingBlockExceptionTest from './cases/noMatchingBlockExceptionTest.js';
import multipleMatchingBlocksTest from './cases/multipleMatchingBlocksTest.js';
import matchingBlockHasEmptyHoleTest from './cases/matchingBlockHasEmptyHoleTest.js';

const pickOpcodesInDiagramTests = [
  additionBasicTest,
  noMatchingBlockExceptionTest,
  multipleMatchingBlocksTest,
  matchingBlockHasEmptyHoleTest,
];

export default pickOpcodesInDiagramTests;
