
const CHARSET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const MAX_LENGTH = 8;

const generateRandomInt = max => Math.floor(Math.random() * (max + 1));

const convertToBase62 = (i) => {
  if (i === 0) { return '0'; }
  let s = '';
  while (i > 0) {
    s = CHARSET[i % 62] + s;
    i = Math.floor(i / 62);
  }
  return s;
};

const generate = () => {
  // a random int within 62^8 = 218,340,105,584,896
  const base = CHARSET.length;
  const max = base ** MAX_LENGTH;
  const randomInt = generateRandomInt(max);
  const uid = convertToBase62(randomInt);
  return uid;
};

module.exports = {
  generate,
  convertToBase62,
  generateRandomInt,
  CHARSET,
  MAX_LENGTH,
};
