import assert from 'assert';
import { labelDiagramWithOpcodes } from '../src/content/utils/tutorToBlock.js';
import labelDiagramWithOpcodesTests from './fixtures/createDiagramTests.js';

describe('src/content/utils/tutorToBlock', () => {
  describe('labelDiagramWithOpcodes(diagram)', () => {
    labelDiagramWithOpcodesTests.forEach((test) => {
      it(test.it, () => {
        assert.deepEqual(labelDiagramWithOpcodes(...test.args), test.expected);
      });
    });
  });
});
