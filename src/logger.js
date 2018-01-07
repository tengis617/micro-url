const chalk = require('chalk');

const logger = (req, res, next) => {
  const start = Date.now();
  next();
  const ms = Date.now() - start;
  const body = JSON.stringify(req.body);
  console.log(chalk.green(`${req.method} ${req.url} - ${ms}ms - req: ${body}`));
};

module.exports.logger = logger;
