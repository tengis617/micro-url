const CHARSET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const MAX_LENGTH = 8;

// generate random int within the maximum range
const generateRandomInt = max => Math.floor(Math.random() * (max + 1));

const convertToBase62 = (i) => {
  if (i === 0) return '0';
  let s = '';
  let remaining = i;
  while (remaining > 0) {
    const char = CHARSET[remaining % 62];
    s = char + s;
    remaining = Math.floor(remaining / 62);
  }
  return s;
};

const generate = () => {
  const base = CHARSET.length;
  // a random int within 62^8 = 218,340,105,584,896
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
