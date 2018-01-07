const validUrl = require('valid-url');
const uid = require('../uid');

const isString = str => typeof str === 'string';
const isWhitespaceOrEmpty = str => !/[^\s]/.test(str);
const isValidChar = char => uid.CHARSET.indexOf(char) > -1;
const hasValidChars = str => str.split('').every(isValidChar);

const isValidUrl = (url) => {
  if (!validUrl.isUri(url)) {
    return false;
  }
  return true;
};
const isValidId = (id) => {
  if (isWhitespaceOrEmpty(id) ||
      !isString(id) ||
      id.length > uid.MAX_LENGTH ||
      !hasValidChars(id)) {
    return false;
  }
  return true;
};

module.exports = {
  isValidUrl,
  isValidId,
};
