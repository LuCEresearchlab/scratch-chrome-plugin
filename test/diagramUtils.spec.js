import assert from 'assert';
import createDiagramTests from './fixtures/diagramUtils/createDiagramTests.js';
import createDiagram from '../src/content/utils/diagramUtils.js';

describe('src/content/utils/diagramUtils', () => {
  describe('createDiagram(inputBlock, thread)', () => {
    createDiagramTests.forEach((test) => {
      it(test.it, () => {
        assert.deepEqual(createDiagram(...test.args), test.expected);
      });
    });
  });
});
