import assert from 'assert';
import createDiagramTests from './fixtures/diagramUtils/createDiagram/createDiagramTests.js';
import createDiagram, { getNodesAndDepth, getSteps } from '../src/content/utils/diagramUtils.js';
import getStepsTests from './fixtures/diagramUtils/getSteps/getStepsTests.js';

describe('src/content/utils/diagramUtils', () => {
  describe('createDiagram(inputBlock, thread)', () => {
    createDiagramTests.forEach((test) => {
      it(test.it, () => {
        assert.deepEqual(createDiagram(...test.args), test.expected[0]);
      });
    });
  });

  describe('getNodesAndDepth(block)', () => {
    createDiagramTests.forEach((test) => {
      it(test.it, () => {
        assert.deepEqual(getNodesAndDepth(...test.args), test.expected[1]);
      });
    });
  });

  describe('getSteps(finalDiagram, options)', () => {
    getStepsTests.forEach((test) => {
      it(test.it, () => {
        assert.deepEqual(getSteps(...test.args), test.expected);
      });
    });
  });
});
