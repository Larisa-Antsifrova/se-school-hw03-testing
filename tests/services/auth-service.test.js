const AuthService = require('../../services/auth-service');
const { Users } = require('../../configs/users-repository-config');
const ApiError = require('../../exceptions/api-errors');
const {
  bcryptPasswordService,
  jwtTokenService,
} = require('../../configs/services-config');
const {
  candidate,
  savedUser,
  currentUser,
  tokenExample,
} = require('./test-data');

jest.mock('../../configs/users-repository-config');
jest.mock('../../services/password-service');
jest.mock('../../services/jwt-token-service');

const apiAuthService = new AuthService({
  usersCollection: Users,
  passwordService: bcryptPasswordService,
  tokenService: jwtTokenService,
  errorHandler: ApiError,
});

describe('AuthService:', () => {
  describe('signup method', () => {
    test('should return new user when successfully registered', async () => {
      Users.addNewUser = jest.fn(() => savedUser);

      const result = await apiAuthService.signup(candidate);

      expect(result).toHaveProperty('id');
      expect(result).not.toHaveProperty('password');
    });

    test('should throw error if user already exists', async () => {
      Users.getOneUserBy = jest.fn(() => savedUser);

      await expect(() => apiAuthService.signup(candidate)).rejects.toThrow();
    });
  });

  describe('login method', () => {
    beforeEach(() => {
      jwtTokenService.generateToken = jest.fn(() => tokenExample);
    });

    test('should return current user when successfully logged in', async () => {
      Users.getOneUserBy = jest.fn(() => savedUser);
      bcryptPasswordService.compare = jest.fn(() => true);

      const result = await apiAuthService.login(candidate);

      expect(result).toEqual(currentUser);
    });

    test('should throw error if email is incorrect', async () => {
      Users.getOneUserBy = jest.fn(() => {});
      bcryptPasswordService.compare = jest.fn(() => true);

      await expect(() => apiAuthService.login(candidate)).rejects.toThrow();
    });

    test('should throw error if password is incorrect', async () => {
      Users.getOneUserBy = jest.fn(() => savedUser);
      bcryptPasswordService.compare = jest.fn(() => false);

      await expect(() => apiAuthService.login(candidate)).rejects.toThrow();
    });
  });
});
