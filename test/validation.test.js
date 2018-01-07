
/* eslint-env mocha */
const chai = require('chai');
const validation = require('../src/utils/validation');

const { expect } = chai;

describe('validation unit', () => {
  // since unit tests on the library are quite good, im doing minimal unit testing here.
  describe('isValidUrl()', () => {
    it('should return true when valid url', async () => {
      const url = 'https://wiki.org';
      const result = validation.isValidUrl(url);
      expect(result).to.equal(true);
    });
    it('should return false when invalid url', async () => {
      const url = 'wiki';
      const result = validation.isValidUrl(url);
      expect(result).to.equal(false);
    });
    it('should return false when invalid url', async () => {
      const url = 'wiki.or/%sef';
      const result = validation.isValidUrl(url);
      expect(result).to.equal(false);
    });
  });
  describe('isValidId()', () => {
    it('should return true when id is shorten than 8 characters', async () => {
      const id = 'abcdefgh';
      const result = validation.isValidId(id);
      expect(result).to.equal(true);
    });
    it('should return false when id is longer than 8 characters', async () => {
      const id = 'abcdefghi';
      const result = validation.isValidId(id);
      expect(result).to.equal(false);
    });
    it('should return false when id is an object', async () => {
      const id = {};
      const result = validation.isValidId(id);
      expect(result).to.equal(false);
    });
    it('should return false when id is null', async () => {
      const id = null;
      const result = validation.isValidId(id);
      expect(result).to.equal(false);
    });
    it('should return false when id is empty string', async () => {
      const id = '';
      const result = validation.isValidId(id);
      expect(result).to.equal(false);
    });
    it('should return false when id is whitespace string', async () => {
      const id = ' ';
      const result = validation.isValidId(id);
      expect(result).to.equal(false);
    });
    it('should return false when id is array', async () => {
      const id = [1, 2, 3, 4];
      const result = validation.isValidId(id);
      expect(result).to.equal(false);
    });
    it('should return false when id has invalid characters', async () => {
      const id = 'abc_d-1';
      const result = validation.isValidId(id);
      expect(result).to.equal(false);
    });
  });
});
