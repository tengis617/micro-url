const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { logger } = require('./logger');

const app = express();
const jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(logger);
app.use('/', routes);


app.listen(3000);
