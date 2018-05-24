const _ = require('lodash');
const logger = require('./logger');
const ApiError = require('./api-error');

/** This method encapsulate the handler logic with call log and Result/Error handling
 * @param {Function} handler The logic of the handler
 * @returns {*[]} Array of functions for swaggerize-express to handle
 */
module.exports.handleRoute = handler => [
  exports.handleLogger,
  (async (req, res) => {
    try {
      const result = await handler(req, res);
      exports.logReq(req, 'info', ' returned '.concat(result.statusCode));
      return res.status(result.statusCode).end(JSON.stringify(result.content));
    } catch (err) {
      const apiError = ApiError.generateApiError(err);
      exports.logReq(req, 'error', ' returned '.concat(JSON.stringify(apiError)));
      return res.status(apiError.statusCode).send(JSON.stringify(apiError));
    }
  }),
];

/**
 * Method to log a route called through swaggerize-express
 * @param req Express request
 * @param res Express response
 * @param next Callback handled by swaggerize-express
 * @returns {*} Result of callback next()
 */
module.exports.handleLogger = (req, res, next) => {
  if (!req) {
    logger.warn('Empty req object on handler logger call');
  } else {
    exports.logReq(req, 'info', ' called');
    if (!_.isEmpty(req.body)) {
      const hiddenPassBody = _.cloneDeep(req.body);
      if (hiddenPassBody.password) {
        hiddenPassBody.password = 'xxxxxxxxxxxxxx';
      }
      exports.logReq(req, 'debug', ' Body: '.concat(JSON.stringify(hiddenPassBody)));
    }
  }
  return next();
};

/**
 * Logs some info about the request followed by the data un parameter
 * @param req Request to log
 * @param level Log level (https://github.com/winstonjs/winston#logging)
 * @param data Additional data to log
 */
module.exports.logReq = (req, level, data = '') => {
  logger.log(level, '[%s] %s%s', _.get(req, 'method', '').toUpperCase(), _.get(req, 'url', ''), data);
};
