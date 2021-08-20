const { Messages } = require('../helpers/constants');

const showHomeMessage = (req, res, next) => {
  return res.json({
    message: Messages.welcomeHome,
  });
};

module.exports = { showHomeMessage };
