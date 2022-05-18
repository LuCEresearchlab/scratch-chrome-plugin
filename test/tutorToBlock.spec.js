import assert from 'assert';
import ScratchVM from 'scratch-vm';
import jsdomGlobal from 'jsdom-global';

import { labelDiagramWithOpcodes, pickOpcodesInDiagram } from '../src/content/utils/tutorToBlock.js';
import labelDiagramWithOpcodesTests from './fixtures/tutorToBlock/label/labelDiagramWithOpcodesTests.js';
import pickOpcodesInDiagramTests from './fixtures/tutorToBlock/pick/pickOpcodesInDiagramTests.js';

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
    '<button text="Make a Variable" callbackkey="CREATE_VARIABLE"></button>',
    '<block type="data_variable" gap="8" id="h%{K[ti:.25q6W(B51Ry"><field name="VARIABLE" id="h%{K[ti:.25q6W(B51Ry" variabletype="\'\'">123</field>undefinedundefined</block>',
    '<block type="data_variable" gap="24" id="`jEk@4|i[#Fk?(8x)AV.-my variable"><field name="VARIABLE" id="`jEk@4|i[#Fk?(8x)AV.-my variable" variabletype="\'\'">my variable</field>undefinedundefined</block>',
    '<block type="data_setvariableto" gap="8"><field name="VARIABLE" id="h%{K[ti:.25q6W(B51Ry" variabletype="\'\'">123</field><value name="VALUE"><shadow type="text"><field name="TEXT">0</field></shadow></value>undefined</block>',
    '<block type="data_changevariableby" gap="8"><field name="VARIABLE" id="h%{K[ti:.25q6W(B51Ry" variabletype="\'\'">123</field><value name="VALUE"><shadow type="math_number"><field name="NUM">1</field></shadow></value>undefined</block>',
    '<block type="data_showvariable" gap="8"><field name="VARIABLE" id="h%{K[ti:.25q6W(B51Ry" variabletype="\'\'">123</field>undefinedundefined</block>',
    '<block type="data_hidevariable" gap="8"><field name="VARIABLE" id="h%{K[ti:.25q6W(B51Ry" variabletype="\'\'">123</field>undefinedundefined</block>',
    '<button text="Make a List" callbackkey="CREATE_LIST"></button>',
    '<block type="data_listcontents" gap="24" id=")`0_yuooimQ5)^|1?hog"><field name="LIST" id=")`0_yuooimQ5)^|1?hog" variabletype="list">sdf</field>undefinedundefined</block>',
    '<block type="data_addtolist" gap="8"><field name="LIST" id=")`0_yuooimQ5)^|1?hog" variabletype="list">sdf</field><value name="ITEM"><shadow type="text"><field name="TEXT">thing</field></shadow></value>undefined</block>',
    '<sep gap="36"/>',
    '<block type="data_deleteoflist" gap="8"><field name="LIST" id=")`0_yuooimQ5)^|1?hog" variabletype="list">sdf</field><value name="INDEX"><shadow type="math_integer"><field name="NUM">1</field></shadow></value>undefined</block>',
    '<block type="data_deletealloflist" gap="8"><field name="LIST" id=")`0_yuooimQ5)^|1?hog" variabletype="list">sdf</field>undefinedundefined</block>',
    '<block type="data_insertatlist" gap="8"><field name="LIST" id=")`0_yuooimQ5)^|1?hog" variabletype="list">sdf</field><value name="INDEX"><shadow type="math_integer"><field name="NUM">1</field></shadow></value><value name="ITEM"><shadow type="text"><field name="TEXT">thing</field></shadow></value></block>',
    '<block type="data_replaceitemoflist" gap="8"><field name="LIST" id=")`0_yuooimQ5)^|1?hog" variabletype="list">sdf</field><value name="INDEX"><shadow type="math_integer"><field name="NUM">1</field></shadow></value><value name="ITEM"><shadow type="text"><field name="TEXT">thing</field></shadow></value></block>',
    '<sep gap="36"/>',
    '<block type="data_itemoflist" gap="8"><field name="LIST" id=")`0_yuooimQ5)^|1?hog" variabletype="list">sdf</field><value name="INDEX"><shadow type="math_integer"><field name="NUM">1</field></shadow></value>undefined</block>',
    '<block type="data_itemnumoflist" gap="8"><field name="LIST" id=")`0_yuooimQ5)^|1?hog" variabletype="list">sdf</field><value name="ITEM"><shadow type="text"><field name="TEXT">thing</field></shadow></value>undefined</block>',
    '<block type="data_lengthoflist" gap="8"><field name="LIST" id=")`0_yuooimQ5)^|1?hog" variabletype="list">sdf</field>undefinedundefined</block>',
    '<block type="data_listcontainsitem" gap="8"><field name="LIST" id=")`0_yuooimQ5)^|1?hog" variabletype="list">sdf</field><value name="ITEM"><shadow type="text"><field name="TEXT">thing</field></shadow></value>undefined</block>',
    '<sep gap="36"/>',
    '<block type="data_showlist" gap="8"><field name="LIST" id=")`0_yuooimQ5)^|1?hog" variabletype="list">sdf</field>undefinedundefined</block>',
    '<block type="data_hidelist" gap="8"><field name="LIST" id=")`0_yuooimQ5)^|1?hog" variabletype="list">sdf</field>undefinedundefined</block>',
  ].map(blockly.Xml.textToDom),
  mainWorkspace: {
    getVariablesOfType: (type = '') => {
      switch (type) {
        case '':
          return [{ name: '123' }, { name: 'my variable' }];

        case 'list':
          return [{ name: 'sdf' }];

        default:
          return [];
      }
    },
    getBlockById: () => {},
    RTL: false,
  },
};

const scratchTB = {
  toolboxXML: `
<xml style="display: none">

    <category name="%{BKY_CATEGORY_MOTION}" id="motion" colour="#4C97FF" secondaryColour="#3373CC">
        
        <block type="motion_movesteps">
            <value name="STEPS">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="motion_turnright">
            <value name="DEGREES">
                <shadow type="math_number">
                    <field name="NUM">15</field>
                </shadow>
            </value>
        </block>
        <block type="motion_turnleft">
            <value name="DEGREES">
                <shadow type="math_number">
                    <field name="NUM">15</field>
                </shadow>
            </value>
        </block>
        <sep gap="36"/>
        <block type="motion_goto">
            <value name="TO">
                <shadow type="motion_goto_menu">
                </shadow>
            </value>
        </block>
        <block type="motion_gotoxy">
            <value name="X">
                <shadow id="movex" type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow id="movey" type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="motion_glideto" id="motion_glideto">
            <value name="SECS">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="TO">
                <shadow type="motion_glideto_menu">
                </shadow>
            </value>
        </block>
        <block type="motion_glidesecstoxy">
            <value name="SECS">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="X">
                <shadow id="glidex" type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow id="glidey" type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <sep gap="36"/>
        <block type="motion_pointindirection">
            <value name="DIRECTION">
                <shadow type="math_angle">
                    <field name="NUM">90</field>
                </shadow>
            </value>
        </block>
        <block type="motion_pointtowards">
            <value name="TOWARDS">
                <shadow type="motion_pointtowards_menu">
                </shadow>
            </value>
        </block>
        <sep gap="36"/>
        <block type="motion_changexby">
            <value name="DX">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="motion_setx">
            <value name="X">
                <shadow id="setx" type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="motion_changeyby">
            <value name="DY">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="motion_sety">
            <value name="Y">
                <shadow id="sety" type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <sep gap="36"/>
        <block type="motion_ifonedgebounce"/>
        <sep gap="36"/>
        <block type="motion_setrotationstyle"/>
        <sep gap="36"/>
        <block id="hER#2.?kly}vTKB)!GRc_xposition" type="motion_xposition"/>
        <block id="hER#2.?kly}vTKB)!GRc_yposition" type="motion_yposition"/>
        <block id="hER#2.?kly}vTKB)!GRc_direction" type="motion_direction"/>
        <sep gap="36"/>
    </category>
    
<sep gap="36"/>

    <category name="%{BKY_CATEGORY_LOOKS}" id="looks" colour="#9966FF" secondaryColour="#774DCB">
        
        <block type="looks_sayforsecs">
            <value name="MESSAGE">
                <shadow type="text">
                    <field name="TEXT">Hello!</field>
                </shadow>
            </value>
            <value name="SECS">
                <shadow type="math_number">
                    <field name="NUM">2</field>
                </shadow>
            </value>
        </block>
        <block type="looks_say">
            <value name="MESSAGE">
                <shadow type="text">
                    <field name="TEXT">Hello!</field>
                </shadow>
            </value>
        </block>
        <block type="looks_thinkforsecs">
            <value name="MESSAGE">
                <shadow type="text">
                    <field name="TEXT">Hmm...</field>
                </shadow>
            </value>
            <value name="SECS">
                <shadow type="math_number">
                    <field name="NUM">2</field>
                </shadow>
            </value>
        </block>
        <block type="looks_think">
            <value name="MESSAGE">
                <shadow type="text">
                    <field name="TEXT">Hmm...</field>
                </shadow>
            </value>
        </block>
        <sep gap="36"/>
        
        
            <block id="hER#2.?kly}vTKB)!GRc_switchcostumeto" type="looks_switchcostumeto">
                <value name="COSTUME">
                    <shadow type="looks_costume">
                        <field name="COSTUME">costume2</field>
                    </shadow>
                </value>
            </block>
            <block type="looks_nextcostume"/>
            <block type="looks_switchbackdropto">
                <value name="BACKDROP">
                    <shadow type="looks_backdrops">
                        <field name="BACKDROP">Baseball 1</field>
                    </shadow>
                </value>
            </block>
            <block type="looks_nextbackdrop"/>
            <sep gap="36"/>
            <block type="looks_changesizeby">
                <value name="CHANGE">
                    <shadow type="math_number">
                        <field name="NUM">10</field>
                    </shadow>
                </value>
            </block>
            <block type="looks_setsizeto">
                <value name="SIZE">
                    <shadow type="math_number">
                        <field name="NUM">100</field>
                    </shadow>
                </value>
            </block>
        
        <sep gap="36"/>
        <block type="looks_changeeffectby">
            <value name="CHANGE">
                <shadow type="math_number">
                    <field name="NUM">25</field>
                </shadow>
            </value>
        </block>
        <block type="looks_seteffectto">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="looks_cleargraphiceffects"/>
        <sep gap="36"/>
        
            <block type="looks_show"/>
            <block type="looks_hide"/>
        <sep gap="36"/>
            <block type="looks_gotofrontback"/>
            <block type="looks_goforwardbackwardlayers">
                <value name="NUM">
                    <shadow type="math_integer">
                        <field name="NUM">1</field>
                    </shadow>
                </value>
            </block>
        
        
            <block id="hER#2.?kly}vTKB)!GRc_costumenumbername" type="looks_costumenumbername"/>
            <block id="backdropnumbername" type="looks_backdropnumbername"/>
            <block id="hER#2.?kly}vTKB)!GRc_size" type="looks_size"/>
        
        <sep gap="36"/>
    </category>
    
<sep gap="36"/>

    <category name="%{BKY_CATEGORY_SOUND}" id="sound" colour="#D65CD6" secondaryColour="#BD42BD">
        <block id="hER#2.?kly}vTKB)!GRc_sound_playuntildone" type="sound_playuntildone">
            <value name="SOUND_MENU">
                <shadow type="sound_sounds_menu">
                    <field name="SOUND_MENU">Meow</field>
                </shadow>
            </value>
        </block>
        <block id="hER#2.?kly}vTKB)!GRc_sound_play" type="sound_play">
            <value name="SOUND_MENU">
                <shadow type="sound_sounds_menu">
                    <field name="SOUND_MENU">Meow</field>
                </shadow>
            </value>
        </block>
        <block type="sound_stopallsounds"/>
        <sep gap="36"/>
        <block type="sound_changeeffectby">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="sound_seteffectto">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        <block type="sound_cleareffects"/>
        <sep gap="36"/>
        <block type="sound_changevolumeby">
            <value name="VOLUME">
                <shadow type="math_number">
                    <field name="NUM">-10</field>
                </shadow>
            </value>
        </block>
        <block type="sound_setvolumeto">
            <value name="VOLUME">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        <block id="hER#2.?kly}vTKB)!GRc_volume" type="sound_volume"/>
        <sep gap="36"/>
    </category>
    
<sep gap="36"/>

    <category name="%{BKY_CATEGORY_EVENTS}" id="events" colour="#FFD500" secondaryColour="#CC9900">
        <block type="event_whenflagclicked"/>
        <block type="event_whenkeypressed">
        </block>
        
            <block type="event_whenthisspriteclicked"/>
        
        <block type="event_whenbackdropswitchesto">
        </block>
        <sep gap="36"/>
        <block type="event_whengreaterthan">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <sep gap="36"/>
        <block type="event_whenbroadcastreceived">
        </block>
        <block type="event_broadcast">
            <value name="BROADCAST_INPUT">
                <shadow type="event_broadcast_menu"></shadow>
            </value>
        </block>
        <block type="event_broadcastandwait">
            <value name="BROADCAST_INPUT">
              <shadow type="event_broadcast_menu"></shadow>
            </value>
        </block>
        <sep gap="36"/>
    </category>
    
<sep gap="36"/>

    <category name="%{BKY_CATEGORY_CONTROL}" id="control" colour="#FFAB19" secondaryColour="#CF8B17">
        <block type="control_wait">
            <value name="DURATION">
                <shadow type="math_positive_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <sep gap="36"/>
        <block type="control_repeat">
            <value name="TIMES">
                <shadow type="math_whole_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block id="forever" type="control_forever"/>
        <sep gap="36"/>
        <block type="control_if"/>
        <block type="control_if_else"/>
        <block id="wait_until" type="control_wait_until"/>
        <block id="repeat_until" type="control_repeat_until"/>
        <sep gap="36"/>
        <block type="control_stop"/>
        <sep gap="36"/>
        
            <block type="control_start_as_clone"/>
            <block type="control_create_clone_of">
                <value name="CLONE_OPTION">
                    <shadow type="control_create_clone_of_menu"/>
                </value>
            </block>
            <block type="control_delete_this_clone"/>
        
        <sep gap="36"/>
    </category>
    
<sep gap="36"/>

    <category name="%{BKY_CATEGORY_SENSING}" id="sensing" colour="#4CBFE6" secondaryColour="#2E8EB8">
        
            <block type="sensing_touchingobject">
                <value name="TOUCHINGOBJECTMENU">
                    <shadow type="sensing_touchingobjectmenu"/>
                </value>
            </block>
            <block type="sensing_touchingcolor">
                <value name="COLOR">
                    <shadow type="colour_picker"/>
                </value>
            </block>
            <block type="sensing_coloristouchingcolor">
                <value name="COLOR">
                    <shadow type="colour_picker"/>
                </value>
                <value name="COLOR2">
                    <shadow type="colour_picker"/>
                </value>
            </block>
            <block type="sensing_distanceto">
                <value name="DISTANCETOMENU">
                    <shadow type="sensing_distancetomenu"/>
                </value>
            </block>
            <sep gap="36"/>
        
        
            <block id="askandwait" type="sensing_askandwait">
                <value name="QUESTION">
                    <shadow type="text">
                        <field name="TEXT">What's your name?</field>
                    </shadow>
                </value>
            </block>
        
        <block id="answer" type="sensing_answer"/>
        <sep gap="36"/>
        <block type="sensing_keypressed">
            <value name="KEY_OPTION">
                <shadow type="sensing_keyoptions"/>
            </value>
        </block>
        <block type="sensing_mousedown"/>
        <block type="sensing_mousex"/>
        <block type="sensing_mousey"/>
        
            <sep gap="36"/>
            '<block type="sensing_setdragmode" id="sensing_setdragmode"></block>'+
            <sep gap="36"/>
        
        <sep gap="36"/>
        <block id="loudness" type="sensing_loudness"/>
        <sep gap="36"/>
        <block id="timer" type="sensing_timer"/>
        <block type="sensing_resettimer"/>
        <sep gap="36"/>
        <block id="of" type="sensing_of">
            <value name="OBJECT">
                <shadow id="sensing_of_object_menu" type="sensing_of_object_menu"/>
            </value>
        </block>
        <sep gap="36"/>
        <block id="current" type="sensing_current"/>
        <block type="sensing_dayssince2000"/>
        <sep gap="36"/>
        <block type="sensing_username"/>
        <sep gap="36"/>
    </category>
    
<sep gap="36"/>

    <category name="%{BKY_CATEGORY_OPERATORS}" id="operators" colour="#40BF4A" secondaryColour="#389438">
        <block type="operator_add">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <block type="operator_subtract">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <block type="operator_multiply">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <block type="operator_divide">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <sep gap="36"/>
        <block type="operator_random">
            <value name="FROM">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="TO">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <sep gap="36"/>
        <block type="operator_gt">
            <value name="OPERAND1">
                <shadow type="text">
                    <field name="TEXT"/>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="text">
                    <field name="TEXT">50</field>
                </shadow>
            </value>
        </block>
        <block type="operator_lt">
            <value name="OPERAND1">
                <shadow type="text">
                    <field name="TEXT"/>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="text">
                    <field name="TEXT">50</field>
                </shadow>
            </value>
        </block>
        <block type="operator_equals">
            <value name="OPERAND1">
                <shadow type="text">
                    <field name="TEXT"/>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="text">
                    <field name="TEXT">50</field>
                </shadow>
            </value>
        </block>
        <sep gap="36"/>
        <block type="operator_and"/>
        <block type="operator_or"/>
        <block type="operator_not"/>
        <sep gap="36"/>
        
            <block type="operator_join">
                <value name="STRING1">
                    <shadow type="text">
                        <field name="TEXT">apple </field>
                    </shadow>
                </value>
                <value name="STRING2">
                    <shadow type="text">
                        <field name="TEXT">banana</field>
                    </shadow>
                </value>
            </block>
            <block type="operator_letter_of">
                <value name="LETTER">
                    <shadow type="math_whole_number">
                        <field name="NUM">1</field>
                    </shadow>
                </value>
                <value name="STRING">
                    <shadow type="text">
                        <field name="TEXT">apple</field>
                    </shadow>
                </value>
            </block>
            <block type="operator_length">
                <value name="STRING">
                    <shadow type="text">
                        <field name="TEXT">apple</field>
                    </shadow>
                </value>
            </block>
            <block type="operator_contains" id="operator_contains">
              <value name="STRING1">
                <shadow type="text">
                  <field name="TEXT">apple</field>
                </shadow>
              </value>
              <value name="STRING2">
                <shadow type="text">
                  <field name="TEXT">a</field>
                </shadow>
              </value>
            </block>
        
        <sep gap="36"/>
        <block type="operator_mod">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <block type="operator_round">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <sep gap="36"/>
        <block type="operator_mathop">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM"/>
                </shadow>
            </value>
        </block>
        <sep gap="36"/>
    </category>
    
<sep gap="36"/>

    <category
        name="%{BKY_CATEGORY_VARIABLES}"
        id="variables"
        colour="#FF8C1A"
        secondaryColour="#DB6E00"
        custom="VARIABLE">
    </category>
    
<sep gap="36"/>

    <category
        name="%{BKY_CATEGORY_MYBLOCKS}"
        id="myBlocks"
        colour="#FF6680"
        secondaryColour="#FF4D6A"
        custom="PROCEDURE">
    </category>
    
</xml>
  `,
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
        pickOpcodesInDiagram(diagram, true);
        assert.deepEqual(
          diagram,
          test.expected,
        );
      });
    });
  });
});
