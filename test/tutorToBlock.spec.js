import assert from 'assert';
import ScratchVM from 'scratch-vm';
import jsdomGlobal from 'jsdom-global';

import { labelDiagramWithOpcodes, pickOpcodesInDiagram } from '../src/content/utils/tutorToBlock.js';
import labelDiagramWithOpcodesTests from './fixtures/tutorToBlock/label/labelDiagramWithOpcodesTests.js';
import pickOpcodesInDiagramTests from './fixtures/tutorToBlock/pick/pickOpcodesInDiagramTests.js';
import blockly from './fixtures/tutorToBlock/blockly.js';
import scratchTB from './fixtures/tutorToBlock/scratchToolbox.js';

const getNewScratchVM = () => {
  const vm = new ScratchVM();
  vm.setCompatibilityMode(true);
  vm.clear();

  return vm;
};

describe('src/content/utils/tutorToBlock', () => {
  it('setup', () => {
    jsdomGlobal();
    global.DOMParser = window.DOMParser;
  });

  describe('labelDiagramWithOpcodes(diagram)', () => {
    labelDiagramWithOpcodesTests.forEach((test) => {
      it(test.it, () => {
        const diagram = test.args[0];
        labelDiagramWithOpcodes(diagram, blockly, scratchTB);
        assert.deepEqual(
          diagram,
          test.expected,
        );
      });
    });
  });

  describe('pickOpcodesInDiagram(diagram, true)', () => {
    pickOpcodesInDiagramTests.forEach((test) => {
      it(test.it, () => {
        const diagram = test.args[0];
        if (test.expected) {
          pickOpcodesInDiagram(diagram, blockly, scratchTB, true);
          assert.deepEqual(
            diagram,
            test.expected,
          );
        } else {
          assert.throws(() => pickOpcodesInDiagram(diagram, blockly, scratchTB, true));
        }
      });
    });
  });
});
