const Redis = require('ioredis');
const uid = require('./uid');
const validation = require('./utils/validation');

const client = new Redis('6380');

const shortenURL = async (longUrl) => {
  // step 1: make sure it is a valid url
  if (!validation.isValidUrl(longUrl)) {
    throw new Error('invalid url.');
  }
  // step 2: generate a unique key
  const shortUrl = uid.generate();
  // step 3: save to redis
  await client.set(shortUrl, longUrl);
  // step 4: return the key
  return shortUrl;
};

const getLongUrl = async (id) => {
  // step 1: make sure it is a valid key
  if (!validation.isValidId(id)) {
    throw new Error(`invalid id: ${id}`);
  }
  // step 2: retrieve longUrl using key
  const longUrl = await client.get(id);
  if (longUrl == null) {
    throw new Error(`No url found with id: ${id}`);
  }
  return longUrl;
};

module.exports = {
  shortenURL,
  getLongUrl,
};
