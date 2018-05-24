const logger = require('../../app/tools/logger');

describe('tool logger', () => {
  it('should return a working logger', () => {
    logger.debug('test log');
  });
});
