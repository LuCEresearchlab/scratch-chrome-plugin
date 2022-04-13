const CONNECTOR_PLACEHOLDER = '{{}}';

export default function serviceToTutor(
  diagram,
  connectorPlaceHolder = CONNECTOR_PLACEHOLDER,
) {
  const nodes = {};
  const edges = {};
  const nodeHoles = {};
  const selectedRootNode = diagram.root
    ? `n${diagram.root.nodePlug.valA}`
    : undefined;

  diagram.nodes.forEach((node) => {
    const key = `n${node.nodePlug.valA}`;
    const { type, value } = node;

    const holes = [];
    const pieces = node.content.map((piece, i) => {
      // Warning: loss of information happens
      // here because the `piece.type` attribute
      // is not used in the old data structure
      if (typeof piece.content === 'string') {
        return piece.content;
      }
      if (typeof piece.name === 'string') {
        return piece.name;
      }
      holes.push(i);
      return connectorPlaceHolder;
    });
    const { isHighlighted } = node;

    nodes[key] = {
      pieces,
      type,
      value,
      x: 0,
      y: 0,
      isHighlighted,
    };
    nodeHoles[key] = holes;
  });

  diagram.edges.forEach((edge, i) => {
    const key = `e${i}`;
    const parentNodeId = `n${edge.plugA.valA}`;
    const childNodeId = `n${edge.plugB.valA}`;
    const parentPieceId = nodeHoles[parentNodeId][edge.plugA.valB - 1];
    const { isHighlighted } = edge;

    edges[key] = {
      parentNodeId,
      childNodeId,
      parentPieceId,
      isHighlighted,
    };
  });

  return { nodes, edges, selectedRootNode };
}

export function tutorToService(
  diagram,
  connectorPlaceHolder = CONNECTOR_PLACEHOLDER,
) {
  const holeMap = {};

  const nodes = Object.keys(diagram.nodes).map((key) => {
    const node = diagram.nodes[key];
    const id = Number(key.substr(1));
    const nodePlug = {
      valA: id,
      valB: 0,
    };
    const { type, value } = node;

    let holeId = 0;
    holeMap[id] = {};
    const content = node.pieces.map((piece, i) => {
      if (piece === connectorPlaceHolder) {
        holeId += 1;
        holeMap[id][i] = holeId;
        return {
          type: 'hole',
          plug: {
            valA: id,
            valB: holeId,
          },
        };
      }
      // Note: due to "loss of information",
      // all non-hole pieces are assumed to be
      // of type "other".
      return {
        type: 'other',
        content: piece,
      };
    });

    return {
      nodePlug,
      content,
      type: type || '',
      value: value || '',
    };
  });

  const edges = Object.keys(diagram.edges).map((key) => {
    const edge = diagram.edges[key];
    const parentId = Number(edge.parentNodeId.substr(1));
    const childId = Number(edge.childNodeId.substr(1));
    const { parentPieceId } = edge;

    const parentHoleId = holeMap[parentId][parentPieceId];
    return {
      plugA: {
        valA: parentId,
        valB: parentHoleId,
      },
      plugB: {
        valA: childId,
        valB: 0,
      },
    };
  });

  const root = diagram.selectedRootNode
    ? nodes.find((node) => node.nodePlug.valA === Number(diagram.selectedRootNode.substr(1)))
    : undefined;

  return {
    nodes,
    edges,
    root,
  };
}
