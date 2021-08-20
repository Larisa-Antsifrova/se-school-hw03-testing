const AuthService = require('../services/auth-service');
const { HttpCodes, Messages } = require('../helpers/constants');

const signupUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await AuthService.signUp({ name, email, password });

    return res.status(HttpCodes.CREATED).json({
      message: Messages.registrationSuccess,
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
      message: Messages.loginSuccess,
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signupUser, loginUser };
