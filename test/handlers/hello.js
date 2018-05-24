const sinon = require('sinon');
const assert = require('assert');

const sandbox = sinon.createSandbox();

const hello = require('../../app/handlers/hello');

const req = {
  method: 'GET',
  url: '/hello',
};
const res = {
  status: () => ({
    end: (data => data),
    send: (data => data),
  }),
};

describe('handler hello', () => {
  afterEach(() => {
    sandbox.restore();
  });

  describe('get', () => {
    it('should return hello on success', async () => {
      const result = await hello.get[1](req, res);
      assert.equal(result, JSON.stringify({
        data: 'hello',
      }));
    });
  });
});
