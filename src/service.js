const Redis = require('ioredis');
const uid = require('./uid');
const validation = require('./utils/validation');
const errors = require('./utils/errors');

const REDIS_PORT = '6380';
const client = new Redis(REDIS_PORT);

const shortenURL = async (longUrl) => {
  // step 1: make sure it is a valid url
  if (!validation.isValidUrl(longUrl)) {
    throw errors.ErrInvalidUrl(longUrl);
  }
  // step 2: generate a unique key
  const id = uid.generate();
  // step 3: save to redis
  await client.set(id, longUrl);
  // step 4: return the key
  return id;
};

const getLongUrl = async (id) => {
  // step 1: make sure it is a valid key
  if (!validation.isValidId(id)) {
    throw errors.ErrInvalidId(id);
  }
  // step 2: retrieve longUrl using key
  const longUrl = await client.get(id);
  if (longUrl == null) {
    throw errors.ErrUrlNotFound(id);
  }
  return longUrl;
};

module.exports = {
  shortenURL,
  getLongUrl,
};
