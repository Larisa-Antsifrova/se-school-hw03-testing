const Users = require('../repositories/users-repository');
const PasswordService = require('./password-service');
const TokenService = require('./jwt-token-service');

class AuthService {
  constructor({ usersCollection, passwordService, tokenService }) {
    this.usersCollection = usersCollection;
    this.passwordService = passwordService;
    this.tokenService = tokenService;
  }

  async signUp({ name, email, password }) {
    try {
      const doesAlreadyExist = await this.usersCollection.getOneUserBy(
        'email',
        email,
      );

      if (doesAlreadyExist) {
        // TODO: Write Error assembler
        const error = new Error();
        error.status = 409;
        error.message = 'The email here is taken.';
        throw error;
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
        // TODO: Write Error assembler
        const error = new Error();
        error.status = 400;
        error.message = 'The creds are wrong';
        throw error;
      }

      const isPasswordCorrect = await PasswordService.comparePassword(
        password,
        user.password,
      );

      if (!isPasswordCorrect) {
        // TODO: Write Error assembler
        const error = new Error();
        error.status = 400;
        error.message = 'The creds are wrong';
        throw error;
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
});
