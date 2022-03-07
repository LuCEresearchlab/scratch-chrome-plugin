/* eslint-disable no-underscore-dangle */

import data from '../data/scratch-expression-blocks';

// eslint-disable-next-line no-undef
if (Blockly) {
  // eslint-disable-next-line no-undef
  const workspace = Blockly.getMainWorkspace();
  workspace.addChangeListener((event) => {
    if (event.type === 'endDrag') {
      const block = workspace.getBlockById(event.blockId);
      if (!block) return;
      console.log(block.type);
      if (data.includes(block.type)
        && (block.parentBlock_ === null || !data.includes(block.parentBlock_.type))) {
        if (block.svgGroup_.querySelector(':scope > .exp') === null) {
          const svgns = 'http://www.w3.org/2000/svg';
          const svgButton = document.createElementNS(svgns, 'rect');
          svgButton.classList.add('exp');
          svgButton.setAttribute('data-block', event.blockId);
          svgButton.setAttribute('x', '-10');
          svgButton.setAttribute('y', '-10');
          svgButton.setAttribute('width', '30');
          svgButton.setAttribute('height', '30');
          svgButton.setAttribute('fill', '#5cceee');
          svgButton.addEventListener('mousedown', (ev) => {
            const blockId = ev.target.dataset.block;
            const b = workspace.getBlockById(blockId).toString();
            window.postMessage(
              {
                direction: 'from-page-script',
                message: b,
              },
              '*',
            );
          });
          block.svgGroup_.append(svgButton);
        }
      } else if (block.svgGroup_.querySelector(':scope > .exp') !== null) {
        block.svgGroup_.removeChild(block.svgGroup_.querySelector(':scope > .exp'));
      }
    }
  });
}
