/**
 * Class used to instantiate errors that will facilitate Api responses
 * @type {module.ApiError}
 */
module.exports = class ApiError extends Error {
  constructor(statusCode, name, message) {
    super();
    this.statusCode = statusCode;
    this.name = name;
    this.message = message;
  }

  static generateApiError(err) {
    return err instanceof ApiError ? err :
      new ApiError(
        err.statusCode || 500,
        err.name || 'Internal Error',
        err.message || 'An Internal error occurred',
      );
  }
};
