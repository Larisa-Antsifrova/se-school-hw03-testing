const { HttpCodes, responseMessages } = require('../helpers/constants');

class ApiError extends Error {
  constructor({ status, message }) {
    super(message);
    this.status = status;
  }

  static conflict() {
    return new ApiError({
      status: HttpCodes.CONFLICT,
      message: responseMessages.emailConflict,
    });
  }

  static invalidCreds() {
    return new ApiError({
      status: HttpCodes.UNAUTHORIZED,
      message: responseMessages.invalidCreds,
    });
  }
}

module.exports = ApiError;
