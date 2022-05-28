import badContentHoleTest from './cases/badContentHoleTest.js';
import badContentStringTest from './cases/badContentStringTest.js';
import badTypeTest from './cases/badTypeTest.js';
import badValueTest from './cases/badValueTest.js';
import correctBasicTest from './cases/correctBasicTest.js';
import correctFloatingNodesTest from './cases/correctFloatingNodesTest.js';
import cyclicTest from './cases/cyclicTest.js';
import emptyHoleTest from './cases/emptyHoleTest.js';
import noRootTest from './cases/noRootTest.js';
import overusedHoleTest from './cases/overusedHoleTest.js';

const getFeedbackTests = [
  noRootTest,
  overusedHoleTest,
  correctFloatingNodesTest,
  emptyHoleTest,
  correctBasicTest,
  badContentStringTest,
  badContentHoleTest,
  badTypeTest,
  badValueTest,
  cyclicTest,
];

export default getFeedbackTests;
