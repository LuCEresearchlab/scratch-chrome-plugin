/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/extensions
import {
  getCachedVmValue,
  opcodeToTypeInfo,
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
    return r?.getText();
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
    const emptyType = opcodeToTypeInfo('empty').outputType;
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

  function arrayIntersect(array1, array2) {
    return array1.some((value) => array2.includes(value));
  }

  function typeMatches(expectedType, actualType) {
    const toArray = (value) => (Array.isArray(value) ? value : [value]);
    return arrayIntersect(toArray(expectedType), toArray(actualType));
  }

  function getExpectedChildType(parentBlock, childNum) {
    const expectedChildTypeInfo = opcodeToTypeInfo(parentBlock.type).expectedArgs[childNum];
    if (!expectedChildTypeInfo) {
      throw new Error('number-of-arguments mismatch between opcode-to-type map and block');
    }
    return expectedChildTypeInfo.type;
  }

  function getChildIndex(parentBlock, childId) {
    let index;
    const found = parentBlock.inputList.some((input, i) => {
      if (!input.connection) {
        return false;
      }
      if (input.connection.targetConnection) {
        const childBlock = input.connection.targetConnection.sourceBlock_;
        if (childBlock.id === childId) {
          index = i;
          return true;
        }
      }
      return false;
    });
    if (!found) {
      throw new Error(`could not find child ${childId} for parent ${parentBlock.id}`);
    }
    return index;
  }

  function compareAndActTypes(node, edges, block, parentId, thisId, actualType) {
    if (parentId === undefined) {
      if (!block.parentBlock_) {
        return;
      }
      const i = getChildIndex(block.parentBlock_, block.id);
      const expectedType = opcodeToTypeInfo(block.parentBlock_.type, false)[i];
      if (typeMatches(expectedType, actualType)) {
        return;
      }
      // eslint-disable-next-line no-param-reassign
      node.isHighlighted = true;
      return;
    }
    const e = edges.find((edge) => edge.plugB.valA === thisId);
    if (!e) {
      throw new Error(`could not find edge connecting to node with id ${thisId}`);
    }
    if (typeMatches(e.plugA.type, actualType)) {
      return;
    }
    // eslint-disable-next-line no-param-reassign
    e.isHighlighted = true;
  }

  function getType(block, firstFieldDropdownText) {
    const type = opcodeToTypeInfo(block.type).outputType;
    if (!Array.isArray(type) && type instanceof Object) {
      if (firstFieldDropdownText) {
        return type[firstFieldDropdownText] ?? type.other;
      }
      throw new Error(`Could not determine type of block ${block.id}`);
    } else {
      return type;
    }
  }

  function traverseDiagram(
    block,
    diagram,
    thisId,
    parentId,
    emptyDropdownPlaceHolder,
  ) {
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
          type: getExpectedChildType(block, i),
        };
        node.content.push(plugA);
        pushEdge(diagram, plugA, childId);
        // target connection example: the block in "_"
        if (input.connection.targetConnection) {
          const childBlock = input.connection.targetConnection.sourceBlock_;
          traverseDiagram(
            childBlock,
            diagram,
            childId,
            thisId,
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
    compareAndActTypes(
      node,
      diagram.edges,
      block,
      parentId,
      thisId,
      node.type,
    );
    node.value = getCachedVmValue(block, node.type, thread);
    if (node.content.length === 0) {
      node.content.push({
        content: node.value,
      });
    }

    diagram.nodes.push(node);
    if (parentId === undefined) {
      // eslint-disable-next-line no-param-reassign
      diagram.root = node;
    }
  }

  traverseDiagram(inputBlock, diagramAccumulator, newID());
  return diagramAccumulator;
};

export default createDiagram;
