require('dotenv').config();
const jwt = require('jsonwebtoken');

const ApiError = require('../exceptions/api-errors');
const { HttpCodes } = require('../helpers/constants');

const { JWT_SECRET_KEY } = process.env;

class TokenService {
  constructor({ secretKey, errorHandler }) {
    this.secretKey = secretKey;
    this.errorHandler = errorHandler;
  }

  generateToken(payload) {
    return jwt.sign(payload, this.secretKey, { expiresIn: '4h' });
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET_KEY);
    } catch (error) {
      throw new this.errorHandler({
        status: HttpCodes.UNAUTHORIZED,
        message: error.message,
      });
    }
  }
}

module.exports = new TokenService({
  secretKey: JWT_SECRET_KEY,
  errorHandler: ApiError,
});
