const AuthService = require('../../services/auth-service');
const Users = require('../../repositories/users-repository');
const PasswordService = require('../../services/password-service');
const TokenService = require('../../services/jwt-token-service');
const ApiError = require('../../exceptions/api-errors');

jest.mock('../../repositories/users-repository');
jest.mock('../../services/password-service');
jest.mock('../../services/jwt-token-service');

describe('AuthService: signUp method', () => {
  let apiAuthService;
  let user;

  beforeAll(() => {
    apiAuthService = new AuthService({
      usersCollection: Users,
      passwordService: PasswordService,
      tokenService: TokenService,
      errorHandler: ApiError,
    });

    user = {
      name: 'Test',
      email: 'test@test.com',
      password: 'test12345',
    };
  });

  test('should return new user when successfully signed up', async () => {
    apiAuthService.usersCollection.getOneUserBy = jest.fn(() => {});
    apiAuthService.usersCollection.addNewUser = jest.fn(() => ({
      id: '',
      name: user.name,
      email: user.email,
    }));

    const result = await apiAuthService.signUp(user);

    expect(result).toHaveProperty('id');
    expect(result).not.toHaveProperty('password');
  });

  test('should throw error if user already exists', async () => {
    apiAuthService.usersCollection.getOneUserBy = jest.fn(() => true);

    await expect(() => apiAuthService.signUp(user)).rejects.toThrow();
  });
});

describe('AuthService: login method', () => {
  let apiAuthService;
  let candidate;
  let user;
  let currentUser;

  beforeAll(() => {
    apiAuthService = new AuthService({
      usersCollection: Users,
      passwordService: PasswordService,
      tokenService: TokenService,
      errorHandler: ApiError,
    });

    candidate = {
      email: 'test@test.com',
      password: 'test12345',
    };

    user = {
      id: '',
      name: 'Test',
      email: 'test@test.com',
    };

    currentUser = {
      id: '',
      name: 'Test',
      email: 'test@test.com',
      token: '',
    };
  });

  beforeEach(() => {
    apiAuthService.tokenService.generateToken = jest.fn(() => '');
  });

  test('should return current user when successfully logged in', async () => {
    apiAuthService.usersCollection.getOneUserBy = jest.fn(() => user);
    apiAuthService.passwordService.comparePassword = jest.fn(() => true);

    const result = await apiAuthService.login(candidate);

    expect(result).toEqual(currentUser);
  });

  test('should throw error if email is not correct', async () => {
    apiAuthService.usersCollection.getOneUserBy = jest.fn(() => false);
    apiAuthService.passwordService.comparePassword = jest.fn(() => true);

    await expect(() => apiAuthService.login(candidate)).rejects.toThrow();
  });

  test('should throw error if password is not correct', async () => {
    apiAuthService.usersCollection.getOneUserBy = jest.fn(() => user);
    apiAuthService.passwordService.comparePassword = jest.fn(() => false);

    await expect(() => apiAuthService.login(candidate)).rejects.toThrow();
  });
});
