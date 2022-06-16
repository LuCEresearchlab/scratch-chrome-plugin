import additionBasicTest from './cases/additionBasicTest.js';
import additionTest from './cases/additionTest.js';
import valueOptionTest from './cases/valueOptionTest.js';
import typeOptionTest from './cases/typeOptionTest.js';
import edgeOptionTest from './cases/edgeOptionTest.js';
import rootOptionTest from './cases/rootOptionTest.js';
import notTreeTest from './cases/notTreeTest.js';
import longTextTest from './cases/longTextTest.js';
import deepTreeTest from './cases/deepTreeTest.js';

const getStepsTests = [
  additionBasicTest,
  additionTest,
  valueOptionTest,
  typeOptionTest,
  edgeOptionTest,
  rootOptionTest,
  notTreeTest,
  longTextTest,
  deepTreeTest,
];

export default getStepsTests;
