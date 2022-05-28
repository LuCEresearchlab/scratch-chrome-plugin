import assert from 'assert';

import getFeedback from '../src/content/utils/solutionFeedback.js';
import getFeedbackTests from './fixtures/solutionFeedback/getFeedbackTest.js';

describe('src/content/utils/diagramUtils', () => {
  describe('getFeedbackTests(expectedDiagram, actualDiagram)', () => {
    getFeedbackTests.forEach((test) => {
      it(test.it, () => {
        assert.deepEqual(getFeedback(...test.args), test.expected);
      });
    });
  });
});
