import assert from 'assert';
import ScratchVM from 'scratch-vm';

import { labelDiagramWithOpcodes } from '../src/content/utils/tutorToBlock.js';
import labelDiagramWithOpcodesTests from './fixtures/tutorToBlock/labelDiagramWithOpcodesTests.js';

const getNewScratchVM = () => {
  const vm = new ScratchVM();
  vm.setCompatibilityMode(true);
  vm.clear();

  return vm;
};

const blockly = {
  Xml: {
    textToDom: (text) => {
      const oParser = new DOMParser();
      const dom = oParser.parseFromString(text, 'text/xml');
      return dom.firstChild;
    },
    domToBlock: () => {},
  },
  scratchBlocksUtils: {
    changeObscuredShadowIds: () => {},
  },
  Events: {
    disable: () => {},
    BlockCreate: () => {},
    fire: () => {},
    isEnabled: () => {},
    enable: () => {},
  },
  DataCategory: () => [
    '<button xmlns="http://www.w3.org/1999/xhtml" text=…Variable" callbackkey="CREATE_VARIABLE"></button>',
    '<block type="data_variable" gap="8" id="h%{K[ti:.2…letype="\'\'">123</field>undefinedundefined</block>',
    '<block type="data_variable" gap="24" id="`jEk@4|i[…\'\'">my variable</field>undefinedundefined</block>',
    '<block type="data_setvariableto" gap="8"><field na…TEXT">0</field></shadow></value>undefined</block>',
    '<block type="data_changevariableby" gap="8"><field…"NUM">1</field></shadow></value>undefined</block>',
    '<block type="data_showvariable" gap="8"><field nam…letype="\'\'">123</field>undefinedundefined</block>',
    '<block type="data_hidevariable" gap="8"><field nam…letype="\'\'">123</field>undefinedundefined</block>',
    '<button xmlns="http://www.w3.org/1999/xhtml" text="Make a List" callbackkey="CREATE_LIST"></button>',
    '<block type="data_listcontents" gap="24" id=")`0_y…type="list">sdf</field>undefinedundefined</block>',
    '<block type="data_addtolist" gap="8"><field name="…">thing</field></shadow></value>undefined</block>',
    '<sep gap="36"/>',
    '<block type="data_deleteoflist" gap="8"><field nam…"NUM">1</field></shadow></value>undefined</block>',
    '<block type="data_deletealloflist" gap="8"><field …type="list">sdf</field>undefinedundefined</block>',
    '<block type="data_insertatlist" gap="8"><field nam…ame="TEXT">thing</field></shadow></value></block>',
    '<block type="data_replaceitemoflist" gap="8"><fiel…ame="TEXT">thing</field></shadow></value></block>',
    '<sep gap="36"/>',
    '<block type="data_itemoflist" gap="8"><field name=…"NUM">1</field></shadow></value>undefined</block>',
    '<block type="data_itemnumoflist" gap="8"><field na…">thing</field></shadow></value>undefined</block>',
    '<block type="data_lengthoflist" gap="8"><field nam…type="list">sdf</field>undefinedundefined</block>',
    '<block type="data_listcontainsitem" gap="8"><field…">thing</field></shadow></value>undefined</block>',
    '<sep gap="36"/>',
    '<block type="data_showlist" gap="8"><field name="L…type="list">sdf</field>undefinedundefined</block>',
    '<block type="data_hidelist" gap="8"><field name="L…type="list">sdf</field>undefinedundefined</block>',
  ],
  mainWorkspace: {
    getVariablesOfType: (type = '') => {
      switch (type) {
        case '':
          return [
            { name: '123' },
            { name: 'my variable' },
          ];

        case 'list':
          return [
            { name: 'sdf' },
          ];

        default:
          return [];
      }
    },
    getBlockById: () => {},
    RTL: false,
  },
};

const scratchTB = {
  toolboxXML: '',
};

describe('src/content/utils/tutorToBlock', () => {
  describe('labelDiagramWithOpcodes(diagram)', () => {
    labelDiagramWithOpcodesTests.forEach((test) => {
      it(test.it, () => {
        assert.deepEqual(labelDiagramWithOpcodes(...test.args, blockly, scratchTB), test.expected);
      });
    });
  });
});
