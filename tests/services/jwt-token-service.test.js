require('dotenv').config();
const jwt = require('jsonwebtoken');

const TokenService = require('../../services/jwt-token-service');
const ApiError = require('../../exceptions/api-errors');
const { savedUser: payload, tokenExample } = require('./test-data');

jest.mock('jsonwebtoken');

const { JWT_SECRET_KEY } = process.env;
const jwtTokenService = new TokenService({
  jwtProvider: jwt,
  secretKey: JWT_SECRET_KEY,
  errorHandler: ApiError,
});

describe('TokenService:', () => {
  describe('generateToken method', () => {
    test('should return generated token', () => {
      jwt.sign = jest.fn(() => tokenExample);

      const token = jwtTokenService.generateToken(payload);

      expect(token).toBe(tokenExample);
    });
  });

  describe('verify method', () => {
    test('should return payload if verification succeeded', () => {
      jwt.verify = jest.fn(() => payload);

      const result = jwtTokenService.verify(tokenExample);

      expect(result).toMatchObject(payload);
    });

    test('should throw error if verification failed', () => {
      jwt.verify = jest.fn(() => {
        throw Error();
      });

      expect(() => jwtTokenService.verify(tokenExample)).toThrow();
    });
  });
});
