/* eslint-disable import/extensions */
import assert from 'assert';
import expressionBlocks from '../../../src/assets/data/scratch-blocks-map.js';
import scratchExpBlocks from '../../../src/assets/data/scratch-expression-blocks.js';

describe('blocks', () => {
  describe('expressionBlocks', () => {
    it('should have same number of keys as scratchExpBlocks', () => {
      assert.equal(Object.keys(expressionBlocks).length, Object.keys(scratchExpBlocks).length);
    });
  });
});
