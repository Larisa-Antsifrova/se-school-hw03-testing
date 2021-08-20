const { HttpCodes, Messages } = require('../helpers/constants');

class ApiError extends Error {
  constructor({ status, message }) {
    super(message);
    this.status = status;
  }

  static conflict() {
    return new ApiError({
      status: HttpCodes.CONFLICT,
      message: Messages.emailConflict,
    });
  }

  static invalidCreds() {
    return new ApiError({
      status: HttpCodes.UNAUTHORIZED,
      message: Messages.invalidCreds,
    });
  }
}

module.exports = ApiError;
