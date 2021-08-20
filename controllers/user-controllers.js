const AuthService = require('../services/auth-service');
const { HttpCodes, responseMessages } = require('../helpers/constants');

const signupUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await AuthService.signUp({ name, email, password });

    return res.status(HttpCodes.CREATED).json({
      message: responseMessages.registrationSuccess,
      user,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await AuthService.login({ email, password });

    return res.status(HttpCodes.OK).json({
      message: responseMessages.loginSuccess,
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signupUser, loginUser };
