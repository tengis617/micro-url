
const lessThan = i => x => x < i;

const loopWhile = (fn, condition) => () => {
  let count = 0;
  while (condition(count)) {
    fn(...arguments);
    count += 1;
  }
};
module.exports = {
  lessThan,
  loopWhile,
};
