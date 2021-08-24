const { HttpCodes, Messages } = require('../helpers/constants');

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

  async signup({ name, email, password }) {
    try {
      const doesAlreadyExist = await this.usersCollection.getOneUserBy(
        'email',
        email,
      );

      if (doesAlreadyExist) {
        throw new this.errorHandler({
          status: HttpCodes.CONFLICT,
          message: Messages.emailConflict,
        });
      }

      const hashedPassword = await this.passwordService.hash(password);

      return await this.usersCollection.addNewUser({
        name,
        email,
        password: hashedPassword,
      });
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const user = await this.usersCollection.getOneUserBy('email', email);

      if (!user) {
        throw new this.errorHandler({
          status: HttpCodes.UNAUTHORIZED,
          message: Messages.invalidCreds,
        });
      }

      const isPasswordCorrect = await this.passwordService.compare(
        password,
        user.password,
      );

      if (!isPasswordCorrect) {
        throw new this.errorHandler({
          status: HttpCodes.UNAUTHORIZED,
          message: Messages.invalidCreds,
        });
      }

      const { id, name, email: userEmail } = user;

      const token = this.tokenService.generateToken({
        id,
        name,
        email: userEmail,
      });

      return { id, name, email: userEmail, token };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthService;
