import assert from 'assert';
import createDiagramTests from './fixtures/diagramUtils/createDiagram/createDiagramTests.js';
import createDiagram, { createDiagramForEmptyHole, getNodesAndDepth, getSteps } from '../src/content/utils/diagramUtils.js';
import getStepsTests from './fixtures/diagramUtils/getSteps/getStepsTests.js';

describe('src/content/utils/diagramUtils', () => {
  describe('createDiagramForEmptyHole(type)', () => {
    const node = {
      nodePlug: { valA: 0, valB: 0 },
      content: [{
        content: '',
      }],
    };
    const expected = {
      nodes: [node],
      edges: [],
      root: node,
    };

    it('test when type is Boolean', () => {
      expected.root.type = 'Boolean';
      expected.root.value = 'false';
      assert.deepEqual(createDiagramForEmptyHole('Boolean'), expected);
    });

    it('test when type is a random string', () => {
      expected.root.type = 'Hello';
      expected.root.value = '';
      assert.deepEqual(createDiagramForEmptyHole('Hello'), expected);
    });
  });

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
