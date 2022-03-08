/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';

import data from '../data/scratch-expression-blocks';
import ETLogo from './components/ETLogo/ETLogo';

// Namespace for svg
const svgNS = 'http://www.w3.org/2000/svg';

// eslint-disable-next-line no-undef
const blockly = Blockly;

if (blockly) {
  const workspace = blockly.getMainWorkspace();
  workspace.addChangeListener((event) => {
    const buttonClassName = 'expressionButton';
    const expressionButtonQuerySelector = `:scope > .${buttonClassName}`;

    if (event.type === 'endDrag') {
      const block = workspace.getBlockById(event.blockId);
      if (!block) return;
      console.log(block.type);
      if (
        data.includes(block.type)
        && (block.parentBlock_ === null || !data.includes(block.parentBlock_.type))
      ) {
        if (block.svgGroup_.querySelector(expressionButtonQuerySelector) === null) {
          const { blockId } = event;

          const onClickListener = (e) => {
            e.preventDefault();
            const b = workspace.getBlockById(blockId).toString();
            window.postMessage(
              {
                direction: 'from-page-script',
                message: b,
              },
              '*',
            );
          };

          const svgButton = document.createElementNS(svgNS, 'g');
          svgButton.classList.add(buttonClassName);
          svgButton.style.pointerEvents = 'auto';
          svgButton.style.cursor = 'pointer';
          svgButton.setAttribute('data-block', blockId);
          svgButton.addEventListener('click', onClickListener);
          block.svgGroup_.append(svgButton);
          ReactDOM.render(<ETLogo />, svgButton);
        }
      } else if (block.svgGroup_.querySelector(expressionButtonQuerySelector) !== null) {
        block.svgGroup_.removeChild(
          block.svgGroup_.querySelector(expressionButtonQuerySelector),
        );
      }
    }
  });
}
