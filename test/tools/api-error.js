const assert = require('assert');

const ApiError = require('../../app/tools/api-error');

const errData = {
  statusCode: 404,
  name: 'Not Found',
  message: 'Where is it',
};

describe('tool ApiError', () => {
  describe('instantiate', () => {
    it('should return an ApiError object', () => {
      const apiErr = new ApiError(errData.statusCode, errData.name, errData.message);
      assert.deepEqual(apiErr, errData);
    });
  });

  describe('generateApiError', () => {
    it('should return an untouched ApiError if given as parameter', () => {
      const apiErr = new ApiError(errData.statusCode, errData.name, errData.message);
      assert.equal(apiErr, ApiError.generateApiError(apiErr));
    });
    it('should return a new ApiError if given a regular Error', () => {
      const apiErr = ApiError.generateApiError(new Error('fail'));
      assert.deepEqual(apiErr, new ApiError(500, 'Error', 'fail'));
    });
    it('should return a new ApiError if given an empty object', () => {
      const apiErr = ApiError.generateApiError({});
      assert.deepEqual(apiErr, new ApiError(500, 'Internal Error', 'An Internal error occurred'));
    });
  });
});
