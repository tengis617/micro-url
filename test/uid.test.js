
/* eslint-env mocha */
const uid = require('../src/uid');
const chai = require('chai');

const { expect } = chai;

describe('uid unit', () => {
  describe('generate()', () => {
    it('should return z when base10 is 61', async () => {
      const randomInt = 61;
      const base62 = 'z';
      const result = uid.convertToBase62(randomInt);
      expect(result).to.equal(base62);
    });
    it('should return 1z when base10 is 123', async () => {
      const randomInt = 123;
      const base62 = '1z';
      const result = uid.convertToBase62(randomInt);
      expect(result).to.equal(base62);
    });
    it('should return 10 when base10 is 62', async () => {
      const randomInt = 62;
      const base62 = '10';
      const result = uid.convertToBase62(randomInt);
      expect(result).to.equal(base62);
    });
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
