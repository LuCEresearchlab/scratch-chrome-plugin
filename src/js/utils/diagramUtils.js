/* eslint-disable no-underscore-dangle */
import {
  connectionToType,
  getCachedVmValue,
  typeToDefaultValue,
} from './scratchVmUtils';

// true if parameters should be casted before function call
export const updateBeforePassing = true;

const createDiagram = (inputBlock, threads) => {
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

  function traverseDiagram(block, diagram, parentId, thisId, t) {
    const type = connectionToType(block.outputConnection);
    const value = getCachedVmValue(block, type, threads);
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
    } else {
      let o = [];
      const n = t || '?';
      if (block.collapsed_) {
        node.content.push({
          content: block.getInput('_TEMP_COLLAPSED_INPUT').fieldRow[0].text_.trim(),
        });
      } else {
        block.inputList.forEach((a, i) => {
          a.fieldRow.forEach((r) => {
            if (r.menuGenerator_ && !r.getValue()) {
            // if r instanceof Blockly.FieldDropdown
              o.push(n);
            } else {
              o.push(r.getText());
            }
          });
          if (!a.connection) {
            return;
          }
          const str = o.join(' ').trim();
          if (str.length === 0) {
            if (node.content.length !== 0) {
              node.content.push({
                content: ' ',
              });
            }
          } else {
            node.content.push({
              content: node.content.length === 0 ? `${str} ` : ` ${str} `,
            });
          }
          o = [];
          const childId = newID();
          const plugA = {
            valA: thisId,
            valB: i + 1,
          };
          node.content.push(plugA);
          if (a.connection.targetConnection || updateBeforePassing) {
            const edge = {
              plugA,
              plugB: {
                valA: childId,
                valB: 0,
              },
            };
            diagram.edges.push(edge);
          }
          if (a.connection.targetConnection) {
            traverseDiagram(
              a.connection.targetConnection.sourceBlock_,
              diagram,
              thisId,
              childId,
              t,
            );
          } else if (updateBeforePassing) {
            const emptyType = connectionToType(a.connection);
            const emptyValue = typeToDefaultValue(type);
            diagram.nodes.push({
              nodePlug: { valA: childId, valB: 0 },
              content: [{
                content: emptyValue,
              }],
              type: emptyType,
              value: emptyValue,
            });
          }
        });
        if (o.length > 0) {
          const str = o.join(' ').trim();
          if (str.length !== 0) {
            node.content.push({
              content: node.content.length === 0 ? str : ` ${str}`,
            });
          }
          o = [];
        }
      }
      if (updateBeforePassing && node.content.length === 0) {
        node.content.push({
          content: typeToDefaultValue(node.type),
        });
      }
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
