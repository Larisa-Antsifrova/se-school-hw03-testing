require('dotenv').config();
const jwt = require('jsonwebtoken');

const TokenService = require('../../services/jwt-token-service');
const ApiError = require('../../exceptions/api-errors');
const { JWT_SECRET_KEY } = process.env;

jest.mock('jsonwebtoken');

const jwtTokenService = new TokenService({
  jwtProvider: jwt,
  secretKey: JWT_SECRET_KEY,
  errorHandler: ApiError,
});

const payload = {
  id: 'd40ddf50-386e-4d6c-a10a-2c08d599ab19',
  name: 'Software Engineering School',
  email: 'software@engineering.school',
};

const tokenExample =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI5MjYxMmE2LTg2ZDktNGM0YS1hYjk3LTU3ODlkYzg5ZTg0YyIsIm5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0MkBtYWlsLmNvbSIsImlhdCI6MTYyOTUwMTE0NiwiZXhwIjoxNjI5NTE1NTQ2fQ.iy3yeci1QjbKU1rz3hC2y0HfvG3FDGSOIEOayDxjH2Y';

describe('TokenService: generateToken method', () => {
  test('should return generated token', () => {
    jwt.sign = jest.fn(() => tokenExample);

    const token = jwtTokenService.generateToken(payload);

    expect(token).toBe(tokenExample);
  });
});

describe('TokenService: verifyToken method', () => {
  test('should return payload if verified successfully', () => {
    jwt.verify = jest.fn(() => payload);

    const result = jwtTokenService.verifyToken(tokenExample);

    expect(result).toMatchObject(payload);
  });

  test('should throw error if token verification failed', () => {
    jwt.verify = jest.fn(() => {
      throw Error();
    });

    expect(() => jwtTokenService.verifyToken(tokenExample)).toThrow();
  });
});
