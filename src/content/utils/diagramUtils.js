/* eslint-disable no-underscore-dangle */
import { shadowOpcodes } from '../../assets/data/scratch_shadow_opcodes.js';
import {
  getCachedVmValue,
  getEmptyOrShadowContent,
  opcodeToExpressionTypeInfo,
  opcodeToNonExpressionTypeInfo,
  typeToDefaultValue,
} from './scratchVmUtils.js';
import { getChildNodes, getTreeFeedback, nodeToDeepString } from './solutionFeedback.js';

/* For testing purposes */
const getCircularReplacer = () => {
  const seen = new WeakSet();
  const keys = [
    'blockContainer',
    '_cache',
    '_executeCached',
    '_isShadowBlock',
    '_shadowValue',
    '_parentKey',
    '_parentValues',
    'topBlock',
    'justReported',
    'inputList',
    'fieldRow',
    'id',
    'parentBlock_',
    'type',
    'connection',
    'targetConnection',
    'sourceBlock_',
    'menuGenerator_',
    'text_',
  ];
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (key && key.length !== 20 && Number.isNaN(parseInt(key, 10)) && !keys.includes(key)) {
        return { id: value.id };
      }
      if (key !== '_parentValues') {
        if (seen.has(value)) {
          return { id: value.id };
        }
        seen.add(value);
      }
    }
    return value;
  };
};

/**
 * Returns the diagram for an empty hole with the given type (only possibility is boolean).
 * @param {string} type the type of the hole
 * @returns the created diagram
 */
export const createDiagramForEmptyHole = (type) => {
  /* create diagram for empty block/hole */
  const value = typeToDefaultValue(type);
  const node = {
    nodePlug: { valA: 0, valB: 0 },
    content: [{
      content: getEmptyOrShadowContent(),
    }],
    type,
    value,
  };
  const d = {
    nodes: [node],
    edges: [],
    root: node,
  };
  return d;
};

/**
 * Converts the given block into a diagram.
 * @param {Object} inputBlock the block
 * @param {Object} thread the thread used to evaluate the block
 * @returns the created diagram
 */
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
    const r = fieldRow.find((row) => row.menuGenerator_ && row.text_);
    return r?.text_;
  }

  function getTexts(fieldRow, emptyDropdownPlaceHolder) {
    const texts = [];
    fieldRow.forEach((row) => {
      if (row.menuGenerator_ && !row.text_) {
        texts.push(emptyDropdownPlaceHolder || '');
      } else {
        texts.push(row.text_);
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
      /* ternary used to avoid adding an extra space before question mark */
      node.content.push({
        content: node.content.length === 0 || text === '?' ? text : ` ${text}`,
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
    const emptyType = opcodeToExpressionTypeInfo('empty').outputType;
    const emptyValue = typeToDefaultValue(emptyType);
    diagram.nodes.push({
      nodePlug: { valA: childId, valB: 0 },
      content: [{
        content: getEmptyOrShadowContent(thread),
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
    const expectedChildTypeInfo = opcodeToExpressionTypeInfo(parentBlock.type)
      .expectedArgs[childNum];
    console.assert(expectedChildTypeInfo, 'number-of-arguments mismatch between opcode-to-type map and block');
    return expectedChildTypeInfo.type;
  }

  function getChildIndex(parentBlock, childId) {
    let index = 0;
    const found = parentBlock.inputList.some((input) => {
      if (!input.connection) {
        return false;
      }
      if (input.connection.targetConnection) {
        const childBlock = input.connection.targetConnection.sourceBlock_;
        if (childBlock.id === childId) {
          return true;
        }
      }
      index += 1;
      return false;
    });
    console.assert(found, `could not find child ${childId} for parent ${parentBlock.id}`);
    return index;
  }

  function compareAndActTypes(node, edges, block, parentId, thisId, actualType) {
    if (parentId === undefined) {
      if (!block.parentBlock_) {
        return;
      }
      const i = getChildIndex(block.parentBlock_, block.id);
      let expectedTypes = opcodeToNonExpressionTypeInfo(block.parentBlock_.type);
      if (!expectedTypes) {
        // dynamically find expected type
        const pc = block.parentBlock_.procCode_;
        expectedTypes = Array.from(pc.matchAll('%s|%b'), (m) => (m[0] === '%b' ? 'Boolean' : ['String', 'Number']));
      }
      const expectedType = expectedTypes[i];
      if (typeMatches(expectedType, actualType)) {
        return;
      }
      // eslint-disable-next-line no-param-reassign
      node.isHighlighted = true;
      return;
    }
    const e = edges.find((edge) => edge.plugB.valA === thisId);
    console.assert(e, `could not find edge connecting to node with id ${thisId}`);
    if (typeMatches(e.plugA.type, actualType)) {
      return;
    }
    // eslint-disable-next-line no-param-reassign
    e.isHighlighted = true;
  }

  function getType(block, firstFieldDropdownText) {
    const type = opcodeToExpressionTypeInfo(block.type).outputType;
    if (!Array.isArray(type) && type instanceof Object) {
      return type[firstFieldDropdownText] ?? type.other;
    }
    return type;
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
    if (!shadowOpcodes.includes(block.type)) {
      let textsToAdd = [];
      // block example: think _ for _ seconds
      // input list example: ["think _", "for _", "seconds"]
      block.inputList.forEach((input, i) => {
      // field row example: "think"
        textsToAdd = textsToAdd.concat(getTexts(input.fieldRow, emptyDropdownPlaceHolder));
        if (firstFieldDropdownText === undefined) {
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
    // evaluate type and value
    node.type = getType(block, firstFieldDropdownText);
    compareAndActTypes(
      node,
      diagram.edges,
      block,
      parentId,
      thisId,
      node.type,
    );
    node.value = getCachedVmValue(block.id, node.type, thread);
    if (node.content.length === 0) {
      node.content.push({
        content: getEmptyOrShadowContent(thread, block.id),
      });
    }

    diagram.nodes.push(node);
    if (parentId === undefined) {
      // eslint-disable-next-line no-param-reassign
      diagram.root = node;
    }
  }

  traverseDiagram(inputBlock, diagramAccumulator, newID());
  if (process.env.NODE_ENV === 'testing') {
    console.log(JSON.stringify(inputBlock, getCircularReplacer()));
    console.log(JSON.stringify(thread, getCircularReplacer()));
    console.log(JSON.stringify(
      { _cache: { _executeCached: thread.blockContainer._cache._executeCached } },
      getCircularReplacer(),
    ));
    console.log(JSON.stringify(diagramAccumulator));
  }
  return diagramAccumulator;
};

/**
 * Returns the start and end indices of the given node string
 * with respect to the entire tree string.
 * @param {Object} node the node targeted
 * @param {Object} diagram the diagram to compare to
 * @returns {Array<int>} a pair of integers (start, end)
 */
function getStartAndEnd(node, diagram) {
  const nodeLength = nodeToDeepString(node, diagram).length;
  let start = 0;
  let ans;
  const tryFindAns = (n) => {
    if (node === n) {
      ans = [start, start + nodeLength];
      return;
    }
    const childNodes = getChildNodes(n, diagram);
    let holeNum = 0;
    n.content.some((part) => {
      if (typeof part.content !== 'string') {
        tryFindAns(childNodes[holeNum]);
        if (ans) {
          return true;
        }
        holeNum += 1;
      } else {
        start += part.content.length;
      }
      return false;
    });
  };
  tryFindAns(diagram.root);
  return ans;
}

/**
 * Returns the steps needed to create the given final diagram.
 * Structure of steps array: [
 *   {
 *     diagram: {...}
 *     start: int,
 *     end: int,
 *   },
 *   ...
 * ]
 * @param {Object} finalDiagram the final diagram
 * @param {Object} options options for hiding values, types, edges, and/or root
 * default {
 *   noShowTypes: false,
 *   noShowValues: false,
 *   noShowSelectedRootNode: false,
 *   noShowEdges: false,
 * }
 * @returns {Object} an empty object if diagram is not a tree;
 * otherwise, an object containing the steps: {
 *   expression: string,
 *   steps: Array,
 * }
 */
export const getSteps = (finalDiagram, options = {}) => {
  if (getTreeFeedback(finalDiagram).length > 0) {
    return {};
  }
  let steps = [];
  const diagram = {
    edges: [],
    nodes: [],
  };
  const startEnds = {};
  const preorder = (finalDiagramNode) => {
    const node = JSON.parse(JSON.stringify(finalDiagramNode));
    node.value = undefined;
    if (options.noShowTypes) {
      node.type = undefined;
    }
    node.isHighlighted = true;
    if (finalDiagramNode === finalDiagram.root) {
      if (!options.noShowSelectedRootNode) {
        // eslint-disable-next-line no-param-reassign
        diagram.root = node;
      }
    } else {
      diagram.nodes[diagram.nodes.length - 1].isHighlighted = false;
      if (diagram.edges.length > 0) {
        diagram.edges[diagram.edges.length - 1].isHighlighted = false;
      }
      const finalDiagramEdge = finalDiagram.edges.find((e) => e.plugB.valA === node.nodePlug.valA);
      const edge = JSON.parse(JSON.stringify(finalDiagramEdge));
      edge.isHighlighted = true;
      diagram.edges.push(edge);
    }
    diagram.nodes.push(node);
    const [start, end] = getStartAndEnd(finalDiagramNode, finalDiagram);
    startEnds[finalDiagramNode.nodePlug.valA] = [start, end];
    steps.push({
      diagram: JSON.parse(JSON.stringify(diagram)),
      start,
      end,
    });
    getChildNodes(finalDiagramNode, finalDiagram).forEach(preorder);
  };
  const postorder = (finalDiagramNode, prevNodeId) => {
    const childNodes = getChildNodes(finalDiagramNode, finalDiagram);
    childNodes.forEach((childNode, i) => {
      postorder(childNode, i === 0 ? prevNodeId : childNodes[i - 1].nodePlug.valA);
    });
    const node = diagram.nodes.find((n) => finalDiagramNode.nodePlug.valA === n.nodePlug.valA);
    node.value = finalDiagramNode.value;
    node.isHighlighted = true;
    const prevNode = diagram.nodes.find((n) => prevNodeId === n.nodePlug.valA);
    prevNode.isHighlighted = false;
    const [start, end] = startEnds[finalDiagramNode.nodePlug.valA];
    steps.push({
      diagram: JSON.parse(JSON.stringify(diagram)),
      start,
      end,
    });
  };
  preorder(finalDiagram.root);
  if (!options.noShowValues) {
    if (diagram.edges.length > 0) {
      diagram.edges[diagram.edges.length - 1].isHighlighted = false;
    }
    postorder(finalDiagram.root, diagram.nodes[diagram.nodes.length - 1].nodePlug.valA);
  }
  if (options.noShowEdges) {
    steps = steps.map((step) => {
      // eslint-disable-next-line no-param-reassign
      step.diagram.edges = [];
      return step;
    });
  }
  return {
    expression: nodeToDeepString(finalDiagram.root, finalDiagram),
    steps,
  };
};

/**
 * Gets the number of nodes and depth, respectively, of the given block
 * @param {Object} block the block to evaluate
 * @returns {Array<int>} the number of nodes and depth
 */
export function getNodesAndDepth(block) {
  let numNodes = 1;
  let depth = 1;
  block.inputList.forEach((input) => {
    if (input.connection) {
      const child = input.connection.targetConnection?.sourceBlock_;
      const [childNodes, childDepth] = child ? getNodesAndDepth(child) : [1, 1];
      numNodes += childNodes;
      if (childDepth + 1 > depth) {
        depth = childDepth + 1;
      }
    }
  });
  return [numNodes, depth];
}

export default createDiagram;
