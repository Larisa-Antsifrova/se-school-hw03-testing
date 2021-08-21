const ApiError = require('../../exceptions/api-errors');
const { HttpCodes, Messages } = require('../../helpers/constants');

describe('ApiError:', () => {
  let result;
  const passedStatus = HttpCodes.UNAUTHORIZED;
  const passedMessage = Messages.noJWT;

  beforeAll(() => {
    result = new ApiError({ status: passedStatus, message: passedMessage });
  });

  test('should return passed status code', () => {
    expect(result.status).toBe(passedStatus);
  });

  test('should return passed message', () => {
    expect(result.message).toBe(passedMessage);
  });
});
