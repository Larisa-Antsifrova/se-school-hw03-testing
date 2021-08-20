const userRouter = require('express').Router();

const {
  validateRegisterUser,
  validateLoginUser,
} = require('../middleware/validation');
const controllers = require('../controllers/user-controllers');

userRouter.post('/user/create', validateRegisterUser, controllers.signupUser);

userRouter.post('/user/login', validateLoginUser, controllers.loginUser);

module.exports = userRouter;
