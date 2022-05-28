function getNumHoles(node) {
  let count = 0;
  node.content.forEach((part) => {
    if (part.type === 'hole') {
      count += 1;
    }
  });
  return count;
}

export const holePlaceholder = '{{}}';

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

export function getChildNodes(node, diagram) {
  const nodeId = node.nodePlug.valA;
  const outEdges = diagram.edges.filter((edge) => edge.plugA.valA === nodeId);
  const childIds = outEdges.map((edge) => edge.plugB.valA);
  return diagram.nodes.filter((child) => childIds.includes(child.nodePlug.valA));
}

export function isTree(diagram) {
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
    console.assert(ns1.length === ns2.length, 'nodesEqual method is not correct');
    return ns1.every((n, i) => checkEqual(n, ns2[i]));
  };
  return checkEqual(expectedDiagram.root, actualDiagram.root);
}

export default getFeedback;
