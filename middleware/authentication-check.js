const TokenService = require('../services/jwt-token-service');
const ApiError = require('../exceptions/api-errors');
const { HttpCodes, Messages } = require('../helpers/constants');

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new ApiError({
        status: HttpCodes.UNAUTHORIZED,
        message: Messages.noJWT,
      });
    }

    TokenService.verifyToken(token);

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isAuthenticated;
