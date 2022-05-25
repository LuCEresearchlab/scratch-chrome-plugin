import {
  pseudoShadowOpcodes,
  shadowOpcodes,
} from '../../assets/data/scratch_shadow_opcodes.js';
import typeToMsg, {
  argumentPlaceholder,
  dropdownPlaceholder,
  holePlaceholderRegex,
  listPlaceholder,
  opcodesContainingEmpties,
  shadowPlaceholder,
  variablePlaceholder,
} from '../../assets/data/scratch_type_to_msg.js';
import { getBlockly, getScratchToolbox } from './stateHandler.js';

const holePlaceholder = '{{}}';

function opcodeToXml(opcode, blockly, scratchTB) {
  switch (opcode) {
    case 'argument_reporter_boolean':
      return blockly.Xml.textToDom(
        '<block type="argument_reporter_boolean">'
          + '<field name="VALUE"></field>'
          + '</block>',
      );

    case 'argument_reporter_string_number':
      return blockly.Xml.textToDom(
        '<block type="argument_reporter_string_number">'
          + '<field name="VALUE"></field>'
          + '</block>',
      );

    default:
  }
  const toolbox = scratchTB.toolboxXML;
  return (
    blockly.Xml.textToDom(toolbox).querySelector(
      `category > block[type=${opcode}]`,
    )
    || blockly
      .DataCategory(blockly.mainWorkspace)
      .find((xml) => xml.getAttribute('type') === opcode)
  );
}

function nodeToString(node) {
  let str = '';
  node.content.forEach((part) => {
    if (part.type === 'hole') {
      str += holePlaceholder;
    } else {
      str += part.content;
    }
  });
  return str;
}

function nodeToOpcode(node, blockly, scratchTB, parentOpcodes = []) {
  const str = nodeToString(node);
  const opcodes = [];
  // add empty opcode
  if (
    parentOpcodes.length > 0
    && opcodesContainingEmpties.includes(parentOpcodes[0][0])
    && str === 'false'
  ) {
    opcodes.push(['']);
  }
  // eslint-disable-next-line no-underscore-dangle
  Object.entries(typeToMsg[blockly.ScratchMsgs.currentLocale_]).forEach((entry) => {
    const key = entry[0];
    const value = entry[1];
    if (!shadowOpcodes.includes(key) && !opcodeToXml(key, blockly, scratchTB)) {
      return; // we don't add to opcode list if block with opcode `key` is not available in toolbox
    }
    let msgs = [value];
    /* update msg containing variable and list placeholders
       assuming msg contains at most one placeholder */
    if (value.includes(variablePlaceholder)) {
      const variableList = blockly.mainWorkspace.getVariablesOfType('');
      msgs = variableList.map((v) => value.replace(variablePlaceholder, v.name));
    } else if (value.includes(listPlaceholder)) {
      const listList = blockly.mainWorkspace.getVariablesOfType('list');
      msgs = listList.map((l) => value.replace(listPlaceholder, l.name));
    }
    /* turn msgs into regexps */
    msgs = msgs.map((msg) => new RegExp(msg
      .replaceAll(holePlaceholderRegex, holePlaceholder)
      .replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&') // escape regexp https://stackoverflow.com/a/6969486/17160612
      .replaceAll(dropdownPlaceholder.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&'), '(.*)')));
    /* check if at least one msg matches the node string
       and push pair (opcode, dropdown-option) for messages containing dropdown placeholders */
    let option = null;
    if (
      ((msgs.some((msg) => {
        const res = shadowPlaceholder.match(msg);
        return res ? res[0] === res.input : res; // match entire string
      })
        || msgs.some((msg) => {
          const res = argumentPlaceholder.match(msg);
          return res ? res[0] === res.input : res; // match entire string
        }))
        && !str.includes(holePlaceholder))
      || msgs.some((msg) => {
        const res = str.match(msg);
        if (res) {
          [, option] = res;
        }
        return res
          ? (!option || !option.includes(holePlaceholder)) && res[0] === res.input
          : res; // match entire string
      })
    ) {
      opcodes.push([key, option]);
    }
  });
  return opcodes;
}

function getChildNodes(node, diagram) {
  const nodeId = node.nodePlug.valA;
  const outEdges = diagram.edges.filter((edge) => edge.plugA.valA === nodeId);
  const childIds = outEdges.map((edge) => edge.plugB.valA);
  return diagram.nodes.filter((child) => childIds.includes(child.nodePlug.valA));
}

/**
 * Inspired by scratch-blocks function Blockly.scratchBlocksUtils.duplicateAndDragCallback
 */
function createBlockFromXml(xml, lastCreatedBlock, blockly) {
  let newBlock = null;
  // Disable events and manually emit events after the block has been
  // positioned and has had its shadow IDs fixed (Scratch-specific).
  blockly.Events.disable();
  try {
    // Using domToBlock instead of domToWorkspace means that the new block
    // will be placed at position (0, 0) in main workspace units.
    newBlock = blockly.Xml.domToBlock(xml, blockly.mainWorkspace);

    // Scratch-specific: Give shadow dom new IDs to prevent duplicating on paste
    blockly.scratchBlocksUtils.changeObscuredShadowIds(newBlock);

    const svgRootNew = newBlock.getSvgRoot();
    if (!svgRootNew) {
      throw new Error('newBlock is not rendered.');
    }
  } finally {
    blockly.Events.enable();
  }
  if (blockly.Events.isEnabled()) {
    blockly.Events.fire(new blockly.Events.BlockCreate(newBlock));

    if (lastCreatedBlock) {
      // The position of the old block in workspace coordinates.
      const oldBlockPosWs = lastCreatedBlock.getRelativeToSurfaceXY();

      // Place the new block as the same position as the old block.
      // TODO: Offset by the difference between the mouse position and the upper
      // left corner of the block.
      newBlock.moveBy(oldBlockPosWs.x, oldBlockPosWs.y);
    }
    const offsetX = blockly.mainWorkspace.RTL ? -100 : 100;
    const offsetY = 100;
    newBlock.moveBy(offsetX, offsetY); // Just offset the block for touch.
  }
  return newBlock;
}

function getChildIndex(opcode, childNum, blockly) {
  // eslint-disable-next-line no-underscore-dangle
  let msg = typeToMsg[blockly.ScratchMsgs.currentLocale_][opcode];
  if (Array.isArray(msg)) {
    [msg] = msg;
  } else if (typeof msg === 'object') {
    msg = msg.message;
  }
  const matches = [...msg.matchAll(holePlaceholderRegex)];
  return parseInt(matches[childNum][0][2], 10) - 1;
}

function getValue(xml, childNum, blockly) {
  const i = getChildIndex(xml.getAttribute('type'), childNum, blockly);
  return xml.querySelectorAll(':scope > value')[i];
}

function getChildBlock(parentBlock, childNum, blockly) {
  const i = getChildIndex(parentBlock.type, childNum, blockly);
  return parentBlock.getChildren()[i];
}

function getInputConnection(parentBlock, childNum, blockly) {
  const i = getChildIndex(parentBlock.type, childNum, blockly);
  const inputConnections = [];
  parentBlock.inputList.forEach((input) => {
    if (input.connection) {
      inputConnections.push(input.connection);
    }
  });
  return inputConnections[i];
}

function containsDropdown(block) {
  return block.inputList
    .some((input) => input.fieldRow
      .find((field) => field instanceof getBlockly().FieldDropdown));
}

function getDropdown(block) {
  let dropdown = null;
  block.inputList.some((input) => {
    dropdown = input.fieldRow.find(
      (field) => field instanceof getBlockly().FieldDropdown,
    );
    return dropdown;
  });
  return dropdown;
}

function createBlocksFromLabeledDiagram(diagram, blockly, scratchTB) {
  const nodeToDom = (node, block) => {
    const opcode = node.opcode[0][0];
    if (opcode === '') {
      return; // empty block
    }
    if (!shadowOpcodes.includes(opcode)) {
      const xml = opcodeToXml(opcode, blockly, scratchTB);
      if (!xml) {
        throw new Error(`could not create block of type ${opcode}`);
      }
      block = createBlockFromXml(xml, null, blockly);
    }
    node.blockId = block.id;
    getChildNodes(node, diagram).forEach((n, i) => {
      nodeToDom(n, getChildBlock(block, i, blockly));
    });
  };
  const setValues = (node, dropdownInfoList, inputConnection) => {
    const block = blockly.mainWorkspace.getBlockById(node.blockId);
    if (!block) {
      return; // empty block
    }
    if (inputConnection) {
      block.outputConnection.connect(inputConnection);
    }
    if (block.isShadow() || pseudoShadowOpcodes.includes(block.type)) {
      const field = block.inputList[0].fieldRow[0];
      const newValue = node.content[0].content;
      if (node.type === 'Number') {
        field.setValue(newValue.replace(/^0$/, ''));
      } else if (node.type === 'String') {
        field.setValue(newValue.replace(/^"(.*)"$/, '$1'));
      } else {
        field.setValue(newValue);
      }
      return;
    }
    if (containsDropdown(block)) {
      dropdownInfoList.push([getDropdown(block), node.opcode[0][1]]);
    }
    getChildNodes(node, diagram)
      .forEach((n, i) => setValues(n, dropdownInfoList, getInputConnection(block, i, blockly)));
  };
  const setDropdownValues = (dropdownInfoList) => {
    dropdownInfoList.forEach((dropdownInfo) => {
      const [dropdown, text] = dropdownInfo;
      const options = dropdown.getOptions();
      const pickedOption = options.find((option) => option[0] === text);
      if (!pickedOption) {
        throw new Error(`no option of ${text}`);
      }
      dropdown.setValue(pickedOption[1]);
    });
  };
  const roots = [diagram.root];
  roots.forEach((root) => {
    nodeToDom(root);
    const dropdownInfoList = [];
    setValues(root, dropdownInfoList);
    /* set dropdown values after all others to ensure their options are correctly set */
    setDropdownValues(dropdownInfoList);
  });
}

/**
 * Labels the diagram with blockly opcode fields based on nodes' strings.
 * @param {Object} diagram the tutor diagram to label with opcode fields
 * @param {Object} blockly the instance of Blockly to be used
 * @param {Object} scratchTB the instance of ScratchToolbox to be used
 */
export function labelDiagramWithOpcodes(diagram, blockly, scratchTB) {
  const labelNode = (node, parentOpcodes) => {
    node.opcode = nodeToOpcode(node, blockly, scratchTB, parentOpcodes);
    getChildNodes(node, diagram).forEach((n) => {
      labelNode(n, node.opcode);
    });
  };
  labelNode(diagram.root);
}

/**
 * Selects one opcode for each node in the diagram.
 * @param {Object} diagram the labeled tutor diagram to pick from
 * @param {Object} blockly the instance of Blockly to be used
 * @param {Object} scratchTB the instance of ScratchToolbox to be used
 * @param {boolean} isBeginner whether the user is a beginner or not
 */
export function pickOpcodesInDiagram(diagram, blockly, scratchTB, isBeginner) {
  const pickOpcodeForNode = (node, parentNode, num) => {
    if (parentNode) {
      // filter opcode options based on parent block
      const parentOp = parentNode.opcode[0][0];
      const value = getValue(opcodeToXml(parentOp, blockly, scratchTB), num, blockly);
      const shadowOp = value?.querySelector(':scope > shadow')?.getAttribute('type') ?? '';
      node.opcode = node.opcode.filter(
        (op) => !shadowOpcodes.includes(op[0]) || op[0] === shadowOp,
      );
    } else {
      node.opcode = node.opcode.filter((op) => !shadowOpcodes.includes(op[0]));
    }
    if (node.opcode.length === 0) {
      throw new Error('could not find block corresponding to node');
    } else if (node.opcode.length > 1) {
      if (isBeginner) {
        node.opcode = [node.opcode[0]];
      } else {
        const str = nodeToString(node);
        let option = prompt(
          `Select one for "${str}" in ${node.opcode}`,
          node.opcode[0][0],
        );
        while (
          (!parentNode || option !== '')
          && !node.opcode.includes(option)
        ) {
          option = prompt(
            `Please try again...\nSelect one for "${str}"in ${node.opcode}`,
            node.opcode[0][0],
          );
        }
        node.opcode = [option];
      }
    }
    getChildNodes(node, diagram).forEach((n, i) => pickOpcodeForNode(n, node, i));
  };
  pickOpcodeForNode(diagram.root);
}

function tutorToBlock(diagram, isBeginner) {
  if (process.env.NODE_ENV === 'testing') console.log(JSON.parse(JSON.stringify(diagram)));
  labelDiagramWithOpcodes(diagram, getBlockly(), getScratchToolbox());
  if (process.env.NODE_ENV === 'testing') console.log(JSON.parse(JSON.stringify(diagram)));
  try {
    pickOpcodesInDiagram(diagram, getBlockly(), getScratchToolbox(), isBeginner);
    if (process.env.NODE_ENV === 'testing') console.log(JSON.parse(JSON.stringify(diagram)));
    createBlocksFromLabeledDiagram(diagram, getBlockly(), getScratchToolbox());
  } catch (e) {
    alert('Sorry, something went wrong doing the export. The created blocks (if any) may be incorrect. Please try again.');
  }
}

export default tutorToBlock;
