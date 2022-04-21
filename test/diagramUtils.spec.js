/* eslint-disable no-underscore-dangle */
import assert from 'assert';
import path from 'path';
import fs from 'fs';
import VirtualMachine from 'scratch-vm';
import { expressionBlocks } from '../src/assets/data/scratch-blocks-map.js';
import makeTestStorage from './fixtures/make-test-storage.js';

const svgButtonClassName = 'expressionButton';
const expressionButtonQuerySelector = `:scope > .${svgButtonClassName}`;

const isExpressionBlock = (block) => Object.keys(expressionBlocks).includes(block.type);
const isRootExpressionBlock = (block) => isExpressionBlock(block)
  && (block.parentBlock_ === null || !isExpressionBlock(block.parentBlock_));

const svgHasButton = (svg, button) => {
  if (button.dataset.blockId && svg.dataset.id) {
    return button.dataset.blockId === svg.dataset.id;
  }
  return svg.tagName === 'path' && button.getAttribute('transform') === svg.getAttribute('transform');
};
const blockHasSvgButton = (svg) => {
  if (svg.tagName !== 'path') {
    return svg.querySelector(expressionButtonQuerySelector) !== null;
  }
  return [...svg.parentNode.querySelectorAll(expressionButtonQuerySelector)]
    .some((e) => svgHasButton(svg, e));
};

describe('src/content/utils/diagramUtils', () => {
  describe('createDiagram(inputBlock, thread)', () => {
    // createDiagramTests.forEach((test) => {
    //   it(test.it, () => {
    //     const res = createDiagram(...test.args);
    //     assert.equal(res, test.expected);
    //   });
    // });

    it('hello', async () => {
      const uri = path.resolve('./test/fixtures/addition.sb3');
      const project = Buffer.from(fs.readFileSync(uri));
      const vm = new VirtualMachine();
      vm.attachStorage(makeTestStorage());

      vm.start();
      vm.clear();
      vm.setCompatibilityMode(false);
      vm.setTurboMode(false);
      await vm.loadProject(project);

      const { blocks } = vm.runtime.targets[0];
      Object.values(blocks).forEach((block) => {
        if (isRootExpressionBlock(block)) {
          console.log("khefks");
          assert.ok(blockHasSvgButton(block.svgGroup_));
        }
      });
    });

    it('', async () => {
      const uri = path.resolve('./test/fixtures/unknown-opcode.sb2');
      const project = Buffer.from(fs.readFileSync(uri));
      const vm = new VirtualMachine();

      vm.start();
      vm.clear();
      vm.setCompatibilityMode(false);
      vm.setTurboMode(false);
      await vm.loadProject(project);
      vm.greenFlag();

      // The project has 3 blocks in a single stack:
      //      play sound => "undefined" => play sound
      // the "undefined" block has opcode "0" and was found in the wild.
      // It should be parsed in without error and it should bridge together
      // the two play sound blocks, so there should not be a third block.
      const { blocks } = vm.runtime.targets[0];
      const topBlockId = blocks.getScripts()[0];
      const secondBlockId = blocks.getNextBlock(topBlockId);
      const thirdBlockId = blocks.getNextBlock(secondBlockId);

      assert.equal(blocks.getBlock(topBlockId).opcode, 'sound_play');
      assert.equal(blocks.getBlock(secondBlockId).opcode, 'sound_play');
      assert.equal(thirdBlockId, null);

      const target = vm.runtime.targets[0];
      const topCommentId = blocks.getBlock(topBlockId).comment;
      const secondCommentId = blocks.getBlock(secondBlockId).comment;

      assert.equal(target.comments[topCommentId].text, 'pop1 comment');
      assert.equal(target.comments[secondCommentId].text, 'pop2 comment');

      // The comment previously attached to the undefined block should become
      // a workspace comment, at 0/0, with the same text as it had.
      const undefinedCommentId = Object.keys(target.comments)
        .filter((id) => id !== topCommentId && id !== secondCommentId)[0];
      const undefinedComment = target.comments[undefinedCommentId];
      assert.equal(undefinedComment.blockId, null);
      assert.equal(undefinedComment.text, 'undefined comment');
      assert.equal(undefinedComment.x, 0);
      assert.equal(undefinedComment.y, 0);

      process.nextTick(process.exit);
    });
  });
});
