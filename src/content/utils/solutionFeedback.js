export const holePlaceholder = '{{}}';

function getNumHoles(node, labelIndex) {
  let count = 0;
  let index = 0;
  node.content.some((part) => {
    if (labelIndex !== undefined && labelIndex <= index) {
      return true;
    }
    if (part.type === 'hole') {
      count += 1;
      index += holePlaceholder.length;
    } else {
      index += part.content.length;
    }
    return false;
  });
  return count;
}

export function nodeToString(node) {
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

function getInEdges(node, diagram) {
  const nodeId = node.nodePlug.valA;
  return diagram.edges.filter((edge) => edge.plugB.valA === nodeId);
}

function getOutEdges(node, diagram, holeNumberLow, holeNumberHigh) {
  const nodeId = node.nodePlug.valA;
  return diagram.edges.filter((edge) => edge.plugA.valA === nodeId
    && (holeNumberLow === undefined
      || (holeNumberLow + 1 <= edge.plugA.valB && edge.plugA.valB < holeNumberHigh + 1)));
}

function getParentNodes(node, diagram) {
  const inEdges = getInEdges(node, diagram);
  const parentIds = inEdges.map((edge) => edge.plugA.valA);
  return diagram.nodes.filter((n) => parentIds.includes(n.nodePlug.valA));
}

export function getChildNodes(node, diagram, holeNumberLow, holeNumberHigh) {
  const outEdges = getOutEdges(node, diagram, holeNumberLow, holeNumberHigh);
  const childIds = outEdges.map((edge) => edge.plugB.valA);
  return diagram.nodes.filter((n) => childIds.includes(n.nodePlug.valA));
}

export function getTreeFeedback(diagram) {
  const feedback = [];
  if (!diagram.root) {
    feedback.push({ type: 'structuralRoot' });
    return feedback;
  }
  const visited = {};
  const traverse = (node) => {
    if (visited[node.nodePlug.valA]) {
      return;
    }
    visited[node.nodePlug.valA] = true;
    const parentNodes = getParentNodes(node, diagram);
    if (diagram.root === node) {
      if (parentNodes.length > 0) {
        feedback.push({
          type: 'structuralRootEdges',
          node: node.nodePlug.valA,
          edges: getInEdges(node, diagram),
        });
      }
    } else if (parentNodes.length > 1) {
      feedback.push({
        type: 'structuralMultipleParents',
        node: node.nodePlug.valA,
        edges: getInEdges(node, diagram),
      });
    }
    let holeNumber = 0;
    let labelIndex = 0;
    node.content.forEach((part) => {
      if (part.type === 'hole') {
        const childNodes = getChildNodes(node, diagram, holeNumber, holeNumber + 1);
        if (childNodes.length === 0) {
          feedback.push({ type: 'structuralMissingChild', node: node.nodePlug.valA, labelIndex });
        } else if (childNodes.length > 1) {
          feedback.push({
            type: 'structuralMultipleChildren',
            node: node.nodePlug.valA,
            edges: getOutEdges(node, diagram, holeNumber, holeNumber + 1),
            labelIndex,
          });
        } else {
          traverse(childNodes[0]);
        }
        holeNumber += 1;
        labelIndex += holePlaceholder.length;
      } else {
        labelIndex += part.content.length;
      }
    });
  };
  traverse(diagram.root);
  return feedback;
}

function filterFeedback(feedback, options) {
  if (!options) return feedback;
  return feedback.filter((feedbackEntry) => !options.includes(feedbackEntry.type));
}

/**
 * Compares the expect and the actual diagram and returns feedback for the latter.
 *
 * Feedback types:
 *
 * structuralRoot: { type: 'structuralRoot' }
 * structuralRootEdges: { type: 'structuralRoot', node: 1, edges: [] }
 * structuralMissingChild: { type: 'structuralMissingChild', node: 1, labelIndex: 0 }
 * structuralMultipleChildren:
 *   { type: 'structuralMultipleChildren', node: 1, edges: [], labelIndex: 0 }
 * structuralMultipleParents: { type: 'structuralMultipleParents', node: 1, edges: [] }
 * nodeLabel -> { type: 'nodeLabel', node: 1, labelIndex: 0 }
 * nodeType -> { type: 'nodeType', node: 1 }
 * nodeValue -> { type: 'nodeValue', node: 1 }
 *
 * @param {Object} expectedDiagram the expect service diagram
 * @param {Object} actualDiagram the actual service diagram
 * @param {Array<string>} options array of feedback types to not include
 * @returns {Array<Object>} feedback
 */
function getFeedback(expectedDiagram, actualDiagram, options) {
  console.assert(getTreeFeedback(expectedDiagram).length === 0, 'expected diagram is not a tree');
  const feedback = getTreeFeedback(actualDiagram);
  if (feedback.length > 0) {
    return filterFeedback(feedback, options);
  }
  const findFirstDiffPos = (a, b) => {
    let i = 0;
    while (a[i] === b[i]) i += 1;
    return i;
  };
  const nodesEqual = (n1, n2) => {
    if (n1.value !== n2.value) {
      feedback.push({
        type: 'nodeValue',
        node: n2.nodePlug.valA,
      });
    }
    if (n1.type !== n2.type) {
      feedback.push({
        type: 'nodeType',
        node: n2.nodePlug.valA,
      });
    }
    const s1 = nodeToString(n1);
    const s2 = nodeToString(n2);
    let labelIndex;
    if (s1 !== s2) {
      labelIndex = findFirstDiffPos(s1, s2);
      feedback.push({
        type: 'nodeLabel',
        node: n2.nodePlug.valA,
        labelIndex,
      });
    }
    return labelIndex;
  };
  const checkEqual = (n1, n2) => {
    const labelIndex = nodesEqual(n1, n2);
    const numHoles = getNumHoles(n2, labelIndex);
    const ns1 = getChildNodes(n1, expectedDiagram, 0, numHoles);
    const ns2 = getChildNodes(n2, actualDiagram, 0, numHoles);
    ns1.forEach((n, i) => checkEqual(n, ns2[i]));
  };
  checkEqual(expectedDiagram.root, actualDiagram.root);
  return filterFeedback(feedback, options);
}

export default getFeedback;
