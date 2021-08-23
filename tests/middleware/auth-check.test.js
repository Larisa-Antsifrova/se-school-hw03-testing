const isAuthenticated = require('../../middleware/authentication-check');
const { jwtTokenService } = require('../../configs/services-config');

jest.mock('../../configs/services-config');

describe('isAuthenticated middleware', () => {
  const res = {};
  const next = jest.fn();

  test('should pass on execution if user is authenticated', () => {
    const req = {
      headers: { authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9` },
    };
    jwtTokenService.verifyToken = jest.fn(() => true);

    isAuthenticated(req, res, next);

    expect(next).toHaveBeenCalledWith();
  });

  test('should pass on error if authentication failed', () => {
    const req = {
      headers: { authorization: '' },
    };

    try {
      isAuthenticated(req, res, next);
    } catch (error) {
      expect(next).toHaveBeenCalledWith(error);
    }
  });
});
