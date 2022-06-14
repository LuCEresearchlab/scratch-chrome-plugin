import assert from 'assert';
import jsdomGlobal from 'jsdom-global';

import { labelDiagramWithOpcodes, pickOpcodesInDiagram } from '../src/content/utils/serviceToBlock.js';
import labelDiagramWithOpcodesTests from './fixtures/serviceToBlock/label/labelDiagramWithOpcodesTests.js';
import pickOpcodesInDiagramTests from './fixtures/serviceToBlock/pick/pickOpcodesInDiagramTests.js';
import blockly from './fixtures/serviceToBlock/blockly.js';
import scratchTB from './fixtures/serviceToBlock/scratchToolbox.js';

describe('src/content/utils/serviceToBlock', () => {
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
