import assert from 'assert';
import {
  bool, color, number, string,
} from '../src/assets/data/scratch-blocks-map.js';
import {
  getCachedVmValue, opcodeToExpressionTypeInfo, opcodeToNonExpressionTypeInfo, typeToDefaultValue,
} from '../src/content/utils/scratchVmUtils.js';

describe('src/content/utils/scratchVmUtils', () => {
  describe('opcodeToExpressionTypeInfo(opcode)', () => {
    it('should return when opcode found', () => {
      assert.doesNotThrow(() => opcodeToExpressionTypeInfo('empty'));
    });

    it('should throw when opcode not found', () => {
      assert.throws(() => opcodeToExpressionTypeInfo('random'));
    });
  });

  describe('opcodeToNonExpressionTypeInfo(opcode)', () => {
    it('should return when opcode found', () => {
      assert.doesNotThrow(() => opcodeToNonExpressionTypeInfo('procedures_prototype'));
    });

    it('should throw when opcode not found', () => {
      assert.throws(() => opcodeToNonExpressionTypeInfo('random'));
    });
  });

  describe('typeToDefaultValue(type)', () => {
    it('should return string false when type is bool', () => {
      assert.equal(typeToDefaultValue(bool), 'false');
    });

    it('should return string 0 when type is number', () => {
      assert.equal(typeToDefaultValue(number), '0');
    });

    it('should return string "" when type is string', () => {
      assert.equal(typeToDefaultValue(string), '""');
    });

    it('should return string #000000 when type is color', () => {
      assert.equal(typeToDefaultValue(color), '#000000');
    });

    it('should return empty string when type is not any of the four', () => {
      assert.equal(typeToDefaultValue([string, color]), '');
    });
  });

  describe('getCachedVmValue(blockId, type, thread)', () => {
    it('should throw when blockId not found', () => {
      assert.throws(() => getCachedVmValue('random', string));
    });
  });
});
