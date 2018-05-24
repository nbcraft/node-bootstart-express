const _ = require('lodash');
const assert = require('assert');

const handlerHelper = require('../../app/tools/handler-helper');

const req = {
  method: 'POST',
  url: '/hello',
  body: {
    test: 'test',
    password: 'myPass',
  },
};

describe('tool handler-helper logger', () => {
  describe('handleRoute', () => {
    it('should return an array of two methods', () => assert.equal(handlerHelper.handleRoute(_.noop).length, 2));
  });
  describe('handleLogger', () => {
    it('should log content of a request on a handler', () => handlerHelper.handleLogger(req, {}, _.noop));
    it('should log content of a request without payload on a handler', () => handlerHelper.handleLogger(_.omit(req, 'body'), {}, _.noop));
    it('should log content of a request without password on a handler', () => handlerHelper.handleLogger(_.omit(req, 'body.password'), {}, _.noop));
    it('should log a warning on empty req but not crash', () => handlerHelper.handleLogger(null, {}, _.noop));
  });
  describe('logReq', () => {
    it('should log some info', () => handlerHelper.logReq(req, 'info'));
  });
});
