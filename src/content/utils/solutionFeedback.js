import { getChildNodes, nodeToString } from './tutorToBlock.js';

function getNumHoles(node) {
  let count = 0;
  node.content.forEach((part) => {
    if (part.type === 'hole') {
      count += 1;
    }
  });
  return count;
}

function isTree(diagram) {
  if (!diagram.root) {
    return false;
  }
  const visited = {};
  const traverse = (node) => {
    if (visited[node.nodePlug.valA]) {
      return false; // cycle
    }
    visited[node.nodePlug.valA] = true;
    const childNodes = getChildNodes(node, diagram);
    if (childNodes.length !== getNumHoles(node)) {
      return false; // empty or overused hole
    }
    return childNodes.every(traverse);
  };
  return traverse(diagram.root);
}

function nodesEqual(n1, n2) {
  return nodeToString(n1) === nodeToString(n2)
    && n1.value === n2.value
    && n1.type === n2.type;
}

function getFeedback(expectedDiagram, actualDiagram) {
  console.assert(isTree(expectedDiagram), 'expected diagram is not a tree');
  if (!isTree(actualDiagram)) {
    return false;
  }
  const checkEqual = (n1, n2) => {
    if (!nodesEqual(n1, n2)) {
      return false;
    }
    const ns1 = getChildNodes(n1, expectedDiagram);
    const ns2 = getChildNodes(n2, actualDiagram);
    if (ns1.length !== ns2.length) {
      return false;
    }
    return ns1.every((n, i) => checkEqual(n, ns2[i]));
  };
  return checkEqual(expectedDiagram.root, actualDiagram.root);
}

export default getFeedback;
