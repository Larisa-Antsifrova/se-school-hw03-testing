const { HttpCodes, Messages } = require('../helpers/constants');

const ApiLimiterConfig = {
  windowMs: 900000, // period of 15 minutes
  max: 100,
  handler: (req, res, next) => {
    return res.status(HttpCodes.TOO_MANY_REQUESTS).json({
      message: Messages.tooManyRequests,
    });
  },
};

module.exports = { ApiLimiterConfig };
