
/* eslint-env mocha */
const uid = require('../src/uid');
const chai = require('chai');

const { expect } = chai;

describe('uid unit', () => {
  describe('generate()', () => {
    it('should return Jv when base10 is 1235', async () => {
      const randomInt = 1235;
      const base62 = 'Jv';
      const result = uid.convertToBase62(randomInt);
      expect(result).to.equal(base62);
    });
    it('should return W7w when base10 is 123500', async () => {
      const randomInt = 123500;
      const base62 = 'W7w';
      const result = uid.convertToBase62(randomInt);
      expect(result).to.equal(base62);
    });
  });
});
