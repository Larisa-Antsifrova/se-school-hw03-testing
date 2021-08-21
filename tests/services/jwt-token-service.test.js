const TokenService = require('../../services/jwt-token-service');

describe('TokenService: generateToken method', () => {
  test('should return generated token', () => {
    const payload = {
      id: 'd40ddf50-386e-4d6c-a10a-2c08d599ab19',
      name: 'Software Engineering School',
      email: 'software@engineering.school',
    };

    const token = TokenService.generateToken(payload);

    expect(token).toEqual(expect.any(String));
  });
});

describe('TokenService: verifyToken method', () => {
  test('should return payload if verified successfully', () => {
    const payload = {
      id: 'd40ddf50-386e-4d6c-a10a-2c08d599ab19',
      name: 'Software Engineering School',
      email: 'software@engineering.school',
    };
    const token = TokenService.generateToken(payload);

    const result = TokenService.verifyToken(token);

    expect(result).toMatchObject(payload);
  });

  test('should throw if token verification failed', () => {
    const expiredToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI5MjYxMmE2LTg2ZDktNGM0YS1hYjk3LTU3ODlkYzg5ZTg0YyIsIm5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0MkBtYWlsLmNvbSIsImlhdCI6MTYyOTUwMTE0NiwiZXhwIjoxNjI5NTE1NTQ2fQ.iy3yeci1QjbKU1rz3hC2y0HfvG3FDGSOIEOayDxjH2Y';

    expect(() => TokenService.verifyToken(expiredToken)).toThrow();
  });
});
