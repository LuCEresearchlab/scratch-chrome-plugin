import assert from 'assert';
import ScratchVM from 'scratch-vm';

// const getNewScratchVM = () => {
//   const vm = new ScratchVM();
//   vm.setCompatibilityMode(true);
//   vm.clear();

//   return vm;
// };

import { labelDiagramWithOpcodes } from '../src/content/utils/tutorToBlock.js';
import labelDiagramWithOpcodesTests from './fixtures/tutorToBlock/labelDiagramWithOpcodesTests.js';

describe('src/content/utils/tutorToBlock', () => {
  describe('labelDiagramWithOpcodes(diagram)', () => {
    labelDiagramWithOpcodesTests.forEach((test) => {
      it(test.it, () => {
        assert.deepEqual(labelDiagramWithOpcodes(...test.args), test.expected);
      });
    });
  });
});
