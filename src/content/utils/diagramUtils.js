/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/extensions
import expressionBlocks from '../../assets/data/scratch-blocks-map.mjs';
import {
  connectionToType,
  getCachedVmValue,
  typeToDefaultValue,
} from './scratchVmUtils';

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

  function getTexts(fieldRow, emptyDropdownPlaceHolder) {
    const texts = [];
    fieldRow.forEach((row) => {
      if (row.menuGenerator_ // if row instanceof Blockly.FieldDropdown
        && !row.getValue()) {
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

  function pushEmptyBlock(diagram, connection, childId) {
    const emptyType = connectionToType(connection);
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
    if (childBlock.isShadow_) {
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
    if (expectedChildTypeInfo.type !== getBlockTypeInfo(childBlock).type) {
      // eslint-disable-next-line no-param-reassign
      diagram.edges[diagram.edges.length - 1].isHighlighted = true;
    }
  }

  function traverseDiagram(block, diagram, parentId, thisId, emptyDropdownPlaceHolder) {
    const type = connectionToType(block.outputConnection);
    const value = getCachedVmValue(block, type, thread);
    const node = {
      nodePlug: { valA: thisId, valB: 0 },
      content: [],
      type,
      value,
    };
    if (block.isShadow_) {
      node.content.push({
        content: value,
      });
    } else if (block.collapsed_) {
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
          pushEmptyBlock(diagram, input.connection, childId);
        }
      });
      addTrailingTextToNode(node, textsToAdd.join(' ').trim());
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
