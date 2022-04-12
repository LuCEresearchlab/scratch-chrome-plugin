/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/extensions
import { expressionBlocks } from '../../assets/data/scratch-blocks-map.mjs';
import {
  getCachedVmValue,
  opcodeToType,
  typeToDefaultValue,
} from './scratchVmUtils';
import { getBlockly } from './stateHandler';

const createDiagram = (inputBlock, thread) => {
  let uuid = 0;

  const newID = () => {
    const currentId = uuid;
    uuid += 1;
    return currentId;
  };

  const diagramAccumulator = {
    nodes: [],
    edges: [],
  };

  function getFirstFieldDropdownText(fieldRow) {
    const r = fieldRow.find((row) => row instanceof getBlockly().FieldDropdown && row.getValue());
    return r.getText();
  }

  function getTexts(fieldRow, emptyDropdownPlaceHolder) {
    const texts = [];
    fieldRow.forEach((row) => {
      if (row instanceof getBlockly().FieldDropdown && !row.getValue()) {
        texts.push(emptyDropdownPlaceHolder || '?');
      } else {
        texts.push(row.getText());
      }
    });
    return texts;
  }

  function addTextToNode(node, text) {
    if (text.length === 0) {
      if (node.content.length !== 0) {
        node.content.push({
          content: ' ',
        });
      }
    } else {
      node.content.push({
        content: node.content.length === 0 ? `${text} ` : ` ${text} `,
      });
    }
  }

  function addTrailingTextToNode(node, text) {
    if (text.length !== 0) {
      node.content.push({
        content: node.content.length === 0 ? text : ` ${text}`,
      });
    }
  }

  function pushEdge(diagram, plugA, childId) {
    const edge = {
      plugA,
      plugB: {
        valA: childId,
        valB: 0,
      },
    };
    diagram.edges.push(edge);
  }

  function pushEmptyBlock(diagram, childId) {
    const emptyType = opcodeToType('empty');
    const emptyValue = typeToDefaultValue(emptyType);
    diagram.nodes.push({
      nodePlug: { valA: childId, valB: 0 },
      content: [{
        content: emptyValue,
      }],
      type: emptyType,
      value: emptyValue,
    });
  }

  function checkLastEdge(diagram, parentBlock, childBlock, childNum) {
    if (childBlock.isShadow_) { // shadow blocks are always correctly placed
      return;
    }
    const getBlockTypeInfo = (block) => {
      const blockTypeInfo = expressionBlocks[block.type];
      if (!blockTypeInfo) {
        throw new Error(`cannot find opcode ${block.type} in opcode-to-type map`);
      }
      return blockTypeInfo;
    };
    const expectedChildTypeInfo = getBlockTypeInfo(parentBlock).expectedArgs[childNum];
    if (!expectedChildTypeInfo) {
      throw new Error('number-of-arguments mismatch between opcode-to-type map and block');
    }
    if (expectedChildTypeInfo.type !== getBlockTypeInfo(childBlock).outputType) {
      // eslint-disable-next-line no-param-reassign
      diagram.edges[diagram.edges.length - 1].isHighlighted = true;
    }
  }

  function getType(block, firstFieldDropdownText) {
    const type = opcodeToType(block.type);
    if (type instanceof Object) {
      if (firstFieldDropdownText) {
        return type[firstFieldDropdownText];
      }
      throw new Error(`Could not determine type of block ${block.id}`);
    } else {
      return type;
    }
  }

  function traverseDiagram(block, diagram, parentId, thisId, emptyDropdownPlaceHolder) {
    const node = {
      nodePlug: { valA: thisId, valB: 0 },
      content: [],
    };
    let firstFieldDropdownText;
    if (block.collapsed_) {
      node.content.push({
        content: block.getInput('_TEMP_COLLAPSED_INPUT').fieldRow[0].text_.trim(),
      });
    } else {
      let textsToAdd = [];
      // block example: think _ for _ seconds
      // input list example: ["think _", "for _", "seconds"]
      block.inputList.forEach((input, i) => {
        // field row example: "think"
        textsToAdd.push(getTexts(input.fieldRow, emptyDropdownPlaceHolder));
        if (!firstFieldDropdownText) {
          firstFieldDropdownText = getFirstFieldDropdownText(input.fieldRow);
        }
        // connection example: "_"
        if (!input.connection) {
          return;
        }
        addTextToNode(node, textsToAdd.join(' ').trim());
        textsToAdd = [];
        const childId = newID();
        const plugA = {
          valA: thisId,
          valB: i + 1,
        };
        node.content.push(plugA);
        pushEdge(diagram, plugA, childId);
        // target connection example: the block in "_"
        if (input.connection.targetConnection) {
          const childBlock = input.connection.targetConnection.sourceBlock_;
          checkLastEdge(diagram, block, childBlock, i);
          traverseDiagram(
            childBlock,
            diagram,
            thisId,
            childId,
            emptyDropdownPlaceHolder,
          );
        } else {
          pushEmptyBlock(diagram, childId);
        }
      });
      addTrailingTextToNode(node, textsToAdd.join(' ').trim());
    }
    // reevaluate type if it depends on field dropdown text
    node.type = getType(block, firstFieldDropdownText);
    node.value = getCachedVmValue(block, node.type, thread);
    if (node.content.length === 0) {
      node.content.push({
        content: node.value,
      });
    }

    diagram.nodes.push(node);
    if (parentId < 0) {
      // eslint-disable-next-line no-param-reassign
      diagram.root = node;
    }
  }

  traverseDiagram(inputBlock, diagramAccumulator, -1, newID());
  return diagramAccumulator;
};

export default createDiagram;
