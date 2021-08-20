const Users = require('../repositories/users-repository');
const PasswordService = require('./password-service');
const TokenService = require('./jwt-token-service');
const ApiError = require('../exceptions/api-errors');

class AuthService {
  constructor({
    usersCollection,
    passwordService,
    tokenService,
    errorHandler,
  }) {
    this.usersCollection = usersCollection;
    this.passwordService = passwordService;
    this.tokenService = tokenService;
    this.errorHandler = errorHandler;
  }

  async signUp({ name, email, password }) {
    try {
      const doesAlreadyExist = await this.usersCollection.getOneUserBy(
        'email',
        email,
      );

      if (doesAlreadyExist) {
        throw ApiError.conflict();
      }

      const hashedPassword = await this.passwordService.hashPassword(password);

      return await this.usersCollection.addNewUser({
        name,
        email,
        password: hashedPassword,
      });
    } catch (error) {
      console.log('Error in createUser: ', error.message);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const user = await this.usersCollection.getOneUserBy('email', email);

      if (!user) {
        throw ApiError.invalidCreds();
      }

      const isPasswordCorrect = await PasswordService.comparePassword(
        password,
        user.password,
      );

      if (!isPasswordCorrect) {
        throw ApiError.invalidCreds();
      }

      const { id, name, email: userEmail } = user;

      const token = TokenService.generateToken({ id, name, email: userEmail });

      return { id, name, email: userEmail, token };
    } catch (error) {
      console.log('Error in loginUser: ', error.message);
      throw error;
    }
  }
}

module.exports = new AuthService({
  usersCollection: Users,
  passwordService: PasswordService,
  tokenService: TokenService,
  errorHandler: ApiError,
});
