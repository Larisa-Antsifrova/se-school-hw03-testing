const AuthService = require('../../services/auth-service');
const { Users } = require('../../configs/users-repository-config');
const ApiError = require('../../exceptions/api-errors');
const {
  bcryptPasswordService,
  jwtTokenService,
} = require('../../configs/services-config');

jest.mock('../../configs/users-repository-config');
jest.mock('../../services/password-service');
jest.mock('../../services/jwt-token-service');

const apiAuthService = new AuthService({
  usersCollection: Users,
  passwordService: bcryptPasswordService,
  tokenService: jwtTokenService,
  errorHandler: ApiError,
});

const candidate = {
  email: 'test@test.com',
  password: 'test12345',
};

const savedUser = {
  id: '',
  name: 'Test',
  email: 'test@test.com',
};

const currentUser = {
  id: '',
  name: 'Test',
  email: 'test@test.com',
  token: '',
};

describe('AuthService: signUp method', () => {
  test('should return new user when successfully signed up', async () => {
    Users.addNewUser = jest.fn(() => savedUser);

    const result = await apiAuthService.signUp(candidate);

    expect(result).toHaveProperty('id');
    expect(result).not.toHaveProperty('password');
  });

  test('should throw error if user already exists', async () => {
    Users.getOneUserBy = jest.fn(() => savedUser);

    await expect(() => apiAuthService.signUp(candidate)).rejects.toThrow();
  });
});

describe('AuthService: login method', () => {
  beforeEach(() => {
    apiAuthService.tokenService.generateToken = jest.fn(() => '');
  });

  test('should return current user when successfully logged in', async () => {
    Users.getOneUserBy = jest.fn(() => savedUser);
    bcryptPasswordService.comparePassword = jest.fn(() => true);

    const result = await apiAuthService.login(candidate);

    expect(result).toEqual(currentUser);
  });

  test('should throw error if email is not correct', async () => {
    Users.getOneUserBy = jest.fn(() => {});
    bcryptPasswordService.comparePassword = jest.fn(() => true);

    await expect(() => apiAuthService.login(candidate)).rejects.toThrow();
  });

  test('should throw error if password is not correct', async () => {
    Users.getOneUserBy = jest.fn(() => savedUser);
    bcryptPasswordService.comparePassword = jest.fn(() => false);

    await expect(() => apiAuthService.login(candidate)).rejects.toThrow();
  });
});
