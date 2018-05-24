const handlerHelper = require('../tools/handler-helper');

module.exports = {
  get: handlerHelper.handleRoute(async () => ({
    statusCode: 200,
    content: {
      data: 'hello',
    },
  })),
};
