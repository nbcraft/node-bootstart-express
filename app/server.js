const express = require('express');
const bodyParser = require('body-parser');
const swaggerize = require('swaggerize-express');

const api = require('./config/api.json');
const config = require('./config/config-local.json');
const logger = require('./tools/logger');

(async () => {
  const app = express();

  // parse application/json
  app.use(bodyParser.json());

  app.use(swaggerize({
    api,
    docspath: '/api-docs',
    handlers: './handlers',
  }));

  app.listen(config.port, () => logger.info('Server running on port: %j', config.port));
})();
