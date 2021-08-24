const ApiError = require('../exceptions/api-errors');
const { jwtTokenService } = require('../configs/services-config');
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

    jwtTokenService.verify(token);

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isAuthenticated;
