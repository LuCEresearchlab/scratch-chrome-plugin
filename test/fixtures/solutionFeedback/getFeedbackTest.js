import badContentHoleTest from './cases/badContentHoleTest.js';
import badContentStringTest from './cases/badContentStringTest.js';
import badTypeTest from './cases/badTypeTest.js';
import badValueTest from './cases/badValueTest.js';
import correctBasicTest from './cases/correctBasicTest.js';
import correctFloatingNodesTest from './cases/correctFloatingNodesTest.js';
import rootCyclicTest from './cases/rootCyclicTest.js';
import noRootCyclicTest from './cases/noRootCyclicTest.js';
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
  rootCyclicTest,
  noRootCyclicTest,
];

export default getFeedbackTests;
