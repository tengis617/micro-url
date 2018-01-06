/* eslint-env mocha */
const chai = require('chai');
const Redis = require('ioredis');

const service = require('../src/service');

const { expect } = chai;
const client = new Redis('6380');

describe('service unit', () => {
  describe('shortenUrl()', () => {
    it('should return a string', async () => {
      const longUrl = 'https://en.wikipedia.org/wiki/URL_shortening';
      const shortUrl = await service.shortenURL(longUrl);
      expect(shortUrl).to.be.a('string');
    });
    it('should throw error when url is of type object', async () => {
      const longUrl = {};
      let err;
      try {
        await service.shortenURL(longUrl);
      } catch (e) {
        err = e;
      }
      expect(err.message).to.equal('invalid url.');
    });
    it('should throw error when url is not a valid url', async () => {
      const longUrl = 'ht://ww.wiki.org/feafe';
      let err;
      try {
        await service.shortenURL(longUrl);
      } catch (e) {
        err = e;
      }
      expect(err.message).to.equal('invalid url.');
    });
  });
  describe('getLongUrl()', () => {
    it('should return a string', async () => {
      const longUrl = 'https://en.wikipedia.org/wiki/URL_shortening';
      const shortUrl = 'abcd';
      client.set(shortUrl, longUrl);
      const longUrlResult = await service.getLongUrl(shortUrl);
      expect(typeof longUrlResult).to.equal('string');
    });
    it('should return long url', async () => {
      const longUrl = 'https://en.wikipedia.org/wiki/URL_shortening';
      const shortUrl = 'abcd';
      client.set(shortUrl, longUrl);
      const longUrlResult = await service.getLongUrl(shortUrl);
      expect(longUrlResult).to.equal(longUrl);
    });
    it('should throw error if url does not exist', async () => {
      let err;
      const shortUrl = 'feafeak';
      try {
        await service.getLongUrl(shortUrl);
      } catch (e) {
        err = e;
      }
      expect(err.message).to.equal(`No url found with id: ${shortUrl}`);
    });
    it('should throw error if shortUrl is longer than 8 characters', async () => {
      let err;
      const shortUrl = 'feafeak9a';
      try {
        await service.getLongUrl(shortUrl);
      } catch (e) {
        err = e;
      }
      expect(err.message).to.equal(`invalid id: ${shortUrl}`);
    });
  });
});
