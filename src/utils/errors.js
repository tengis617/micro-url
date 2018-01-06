const ErrInvalidId = id => new Error(`invalid id: ${id}`);
const ErrUrlNotFound = id => new Error(`No url found with id: ${id}`);
const ErrInvalidUrl = url => new Error(`invalid url: ${url}`);

module.exports = {
  ErrInvalidId,
  ErrUrlNotFound,
  ErrInvalidUrl,
};
