import additionBasicTest from './cases/additionBasicTest.js';
import multipleMatchingBlocksTest from './cases/multipleMatchingBlocksTest.js';
import matchingBlockHasEmptyHoleTest from './cases/matchingBlockHasEmptyHoleTest.js';
import matchingBlockNotInToolboxTest from './cases/matchingBlockNotInToolboxTest.js';
import matchingNonShadowBlockContainsDropdownTest from './cases/matchingNonShadowBlockContainsDropdownTest.js';
import matchingBlockContainsListTest from './cases/matchingBlockContainsListTest.js';
import matchingBlockIsListTest from './cases/matchingBlockIsListTest.js';
import matchingBlockIsVariableTest from './cases/matchingBlockIsVariableTest.js';
import notMatchingBlockWithOptionContainingHoleTest from './cases/notMatchingBlockWithOptionContainingHoleTest.js';

const labelDiagramWithOpcodesTests = [
  additionBasicTest,
  multipleMatchingBlocksTest,
  matchingBlockHasEmptyHoleTest,
  matchingBlockNotInToolboxTest,
  matchingNonShadowBlockContainsDropdownTest,
  matchingBlockContainsListTest,
  matchingBlockIsListTest,
  matchingBlockIsVariableTest,
  notMatchingBlockWithOptionContainingHoleTest,
];

export default labelDiagramWithOpcodesTests;
