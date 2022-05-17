import { pseudoShadowOpcodes, shadowOpcodes } from '../../assets/data/scratch_shadow_opcodes.js';
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

function opcodeToXml(opcode, blockly) {
  switch (opcode) {
    case 'argument_reporter_boolean':
      return blockly.Xml.textToDom('<block type="argument_reporter_boolean">'
        + '<field name="VALUE"></field>'
      + '</block>');

    case 'argument_reporter_string_number':
      return blockly.Xml.textToDom('<block type="argument_reporter_string_number">'
        + '<field name="VALUE"></field>'
      + '</block>');

    default:
  }
  const toolbox = getScratchToolbox().toolboxXML;
  return blockly.Xml.textToDom(toolbox).querySelector(`category > block[type=${opcode}]`)
    || blockly.DataCategory(blockly.mainWorkspace).find((xml) => xml.getAttribute('type') === opcode);
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

function nodeToOpcode(node, blockly, parentOpcodes = []) {
  const str = nodeToString(node);
  const opcodes = [];
  Object.entries(typeToMsg).forEach((entry) => {
    const key = entry[0];
    const value = entry[1];
    if (!shadowOpcodes.includes(key) && !opcodeToXml(key, blockly)) {
      return; // we don't add to opcode list if block with opcode is not available in toolbox
    }
    if (!Array.isArray(value) && typeof value === 'object') {
      value.options.some((option) => {
        const message = value.message
          .replaceAll(holePlaceholderRegex, holePlaceholder)
          .replaceAll(dropdownPlaceholder, option);
        if (message === str) {
          opcodes.push([key, option]);
          return true;
        }
        return false;
      });
      return;
    }
    let msgs = Array.of(value);
    // update msgs containing variable and list placeholders
    msgs = msgs.flatMap((msg) => {
      // assume msg contains at most one placeholder
      if (msg.includes(variablePlaceholder)) {
        const variableList = blockly.mainWorkspace.getVariablesOfType('');
        return variableList.map((v) => msg.replace(variablePlaceholder, v.name));
      }
      if (msg.includes(listPlaceholder)) {
        const listList = blockly.mainWorkspace.getVariablesOfType('list');
        return listList.map((l) => msg.replace(listPlaceholder, l.name));
      }
      return msg;
    });
    // add empty opcode
    if (parentOpcodes.length > 0 && opcodesContainingEmpties.includes(parentOpcodes[0][0]) && str === 'false') {
      opcodes.push(['']);
    }
    // check if at least one msg matches the node string
    if (((msgs.includes(shadowPlaceholder) || msgs.includes(argumentPlaceholder))
        && !str.includes(holePlaceholder))
        || msgs.map((msg) => msg.replaceAll(holePlaceholderRegex, holePlaceholder)).includes(str)) {
      opcodes.push([key]);
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
function createBlockFromXml(xml, lastCreatedBlock, ws) {
  const Blockly = getBlockly();
  let newBlock = null;
  // Disable events and manually emit events after the block has been
  // positioned and has had its shadow IDs fixed (Scratch-specific).
  Blockly.Events.disable();
  try {
    // Using domToBlock instead of domToWorkspace means that the new block
    // will be placed at position (0, 0) in main workspace units.
    newBlock = Blockly.Xml.domToBlock(xml, ws);

    // Scratch-specific: Give shadow dom new IDs to prevent duplicating on paste
    Blockly.scratchBlocksUtils.changeObscuredShadowIds(newBlock);

    const svgRootNew = newBlock.getSvgRoot();
    if (!svgRootNew) {
      throw new Error('newBlock is not rendered.');
    }
  } finally {
    Blockly.Events.enable();
  }
  if (Blockly.Events.isEnabled()) {
    Blockly.Events.fire(new Blockly.Events.BlockCreate(newBlock));

    if (lastCreatedBlock) {
      // The position of the old block in workspace coordinates.
      const oldBlockPosWs = lastCreatedBlock.getRelativeToSurfaceXY();

      // Place the new block as the same position as the old block.
      // TODO: Offset by the difference between the mouse position and the upper
      // left corner of the block.
      newBlock.moveBy(oldBlockPosWs.x, oldBlockPosWs.y);
    }
    const offsetX = ws.RTL ? -100 : 100;
    const offsetY = 100;
    newBlock.moveBy(offsetX, offsetY); // Just offset the block for touch.
  }
  return newBlock;
}

function getChildIndex(opcode, childNum) {
  let msg = typeToMsg[opcode];
  if (Array.isArray(msg)) {
    [msg] = msg;
  } else if (typeof msg === 'object') {
    msg = msg.message;
  }
  const matches = [...msg.matchAll(holePlaceholderRegex)];
  return parseInt(matches[childNum][0][2], 10) - 1;
}

function getValue(xml, childNum) {
  const i = getChildIndex(xml.getAttribute('type'), childNum);
  return xml.querySelectorAll(':scope > value')[i];
}

function getChildBlock(parentBlock, childNum) {
  const i = getChildIndex(parentBlock.type, childNum);
  return parentBlock.getChildren()[i];
}

function getInputConnection(parentBlock, childNum) {
  const i = getChildIndex(parentBlock.type, childNum);
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
    dropdown = input.fieldRow.find((field) => field instanceof getBlockly().FieldDropdown);
    return dropdown;
  });
  return dropdown;
}

function createBlocksFromLabeledDiagram(diagram, blockly) {
  const nodeToDom = (node, block) => {
    const opcode = node.opcode[0][0];
    if (opcode === '') {
      return; // empty block
    }
    if (!shadowOpcodes.includes(opcode)) {
      const xml = opcodeToXml(opcode, blockly);
      if (!xml) {
        throw new Error(`could not create block of type ${opcode}`);
      }
      block = createBlockFromXml(xml, null, getBlockly().mainWorkspace);
    }
    node.blockId = block.id;
    getChildNodes(node, diagram).forEach((n, i) => {
      nodeToDom(n, getChildBlock(block, i));
    });
  };
  const setValues = (node, dropdownInfoList, inputConnection) => {
    const block = getBlockly().mainWorkspace.getBlockById(node.blockId);
    if (!block) {
      return; // empty block
    }
    if (inputConnection) {
      block.outputConnection.connect(inputConnection);
    }
    if (block.isShadow() || pseudoShadowOpcodes.includes(block.type)) {
      const field = block.inputList[0].fieldRow[0];
      const newValue = node.value;
      if (!newValue) {
        throw new Error('missing value');
      }
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
      .forEach((n, i) => setValues(n, dropdownInfoList, getInputConnection(block, i)));
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

export function labelDiagramWithOpcodes(diagram, blockly) {
  const labelNode = (node, parentOpcodes) => {
    node.opcode = nodeToOpcode(node, blockly, parentOpcodes);
    getChildNodes(node, diagram).forEach((n) => {
      labelNode(n, node.opcode);
    });
  };
  const filterOptionsForNode = (node, parentNode, num = 0) => {
    if (parentNode) {
      // filter opcode options based on parent block
      const parentOp = parentNode.opcode[0][0];
      const value = getValue(opcodeToXml(parentOp, blockly), num);
      const shadowOp = value?.querySelector(':scope > shadow')?.getAttribute('type') ?? '';
      node.opcode = node.opcode
        .filter((op) => !shadowOpcodes.includes(op[0]) || op[0] === shadowOp);
    } else {
      node.opcode = node.opcode.filter((op) => !shadowOpcodes.includes(op[0]));
    }
    getChildNodes(node, diagram).forEach((n, i) => filterOptionsForNode(n, node, i));
  };
  labelNode(diagram.root);
  filterOptionsForNode(diagram.root);
  return diagram;
}

function pickOpcodesInDiagram(diagram, isBeginner) {
  const pickOpcodeForNode = (node, parentNode) => {
    if (node.opcode.length === 0) {
      throw new Error('could not create block of the tree');
    }
    if (node.opcode.length > 1) {
      if (isBeginner) {
        node.opcode = [node.opcode[0]];
      } else {
        const str = nodeToString(node);
        let option = prompt(`Select one for "${str}" in ${node.opcode}`, node.opcode[0][0]);
        while ((!parentNode || option !== '') && !node.opcode.includes(option)) {
          option = prompt(`Please try again...\nSelect one for "${str}"in ${node.opcode}`, node.opcode[0][0]);
        }
        node.opcode = [option];
      }
    }
    getChildNodes(node, diagram).forEach((n) => pickOpcodeForNode(n, node));
  };
  pickOpcodeForNode(diagram.root);
}

function tutorToBlock(diagram, isBeginner) {
  labelDiagramWithOpcodes(diagram, getBlockly());
  pickOpcodesInDiagram(diagram, isBeginner);
  createBlocksFromLabeledDiagram(diagram, getBlockly());
}

export default tutorToBlock;
