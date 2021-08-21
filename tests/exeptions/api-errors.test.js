const ApiError = require('../../exceptions/api-errors');
const { HttpCodes, Messages } = require('../../helpers/constants');

describe('ApiError: static method conflict', () => {
  let result;

  beforeAll(() => {
    result = ApiError.conflict();
  });

  test('should return conflict status code', () => {
    expect(result.status).toBe(HttpCodes.CONFLICT);
  });

  test('should return conflict message', () => {
    expect(result.message).toBe(Messages.emailConflict);
  });
});

describe('ApiError: static method invalidCreds', () => {
  let result;

  beforeAll(() => {
    result = ApiError.invalidCreds();
  });

  test('should return unauthorized status code', () => {
    expect(result.status).toBe(HttpCodes.UNAUTHORIZED);
  });

  test('should return invalid creds message', () => {
    expect(result.message).toBe(Messages.invalidCreds);
  });
});

describe('ApiError: called via constructor', () => {
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
