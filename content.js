/* eslint-disable no-underscore-dangle */

// const json = require('./scratch-expression-blocks.json');
// eslint-disable-next-line no-undef
if (Blockly) {
  // eslint-disable-next-line no-undef
  const workspace = Blockly.getMainWorkspace();
  workspace.addChangeListener((event) => {
    console.log(event.type);
  });
  workspace.addChangeListener((event) => {
    if (event.type === 'endDrag') {
      const block = workspace.getBlockById(event.blockId);
      if (block.parentBlock_ === null) {
        if (block.svgGroup_.querySelector('.exp') === null) {
          const svgns = 'http://www.w3.org/2000/svg';
          const svgButton = document.createElementNS(svgns, 'rect');
          svgButton.classList.add('exp');
          svgButton.setAttribute('data-block', event.blockId);
          svgButton.setAttribute('x', '0');
          svgButton.setAttribute('y', '-10');
          svgButton.setAttribute('width', '100');
          svgButton.setAttribute('height', '100');
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
      } else if (block.svgGroup_.querySelector('.exp') !== null) {
        block.svgGroup_.removeChild(block.svgGroup_.querySelector('.exp'));
      }
    }
  });
}
