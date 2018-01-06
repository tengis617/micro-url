
/* eslint-env mocha */
const uid = require('../src/uid');
const chai = require('chai');

const expect = chai.expect

describe('uid unit', () => {
  describe('generate()', () => {
    it('should return ', async () => {
      const randomInt = 1235;
      const base62 = 'Jv';
      const result = uid.convertToBase62(randomInt);
      expect(result).to.equal(base62);
    });
    it('should return ', async () => {
      const randomInt = 123500;
      const base62 = 'W7w';
      const result = uid.convertToBase62(randomInt);
      expect(result).to.equal(base62);
    });
  });
});
