require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const RatesService = require('../services/rates-service');
const AuthService = require('../services/auth-service');
const PasswordService = require('../services/password-service');
const TokenService = require('../services/jwt-token-service');

const { Users } = require('./users-repository-config');
const CoinlayerProvider = require('../rates_providers/coinlayer-provider');
const ApiError = require('../exceptions/api-errors');

const { JWT_SECRET_KEY } = process.env;

const coinlayerRatesService = new RatesService({
  provider: CoinlayerProvider,
  errorHandler: ApiError,
});

const jwtTokenService = new TokenService({
  jwtProvider: jwt,
  secretKey: JWT_SECRET_KEY,
  errorHandler: ApiError,
});

const bcryptPasswordService = new PasswordService(bcrypt);

const apiAuthService = new AuthService({
  usersCollection: Users,
  passwordService: bcryptPasswordService,
  tokenService: jwtTokenService,
  errorHandler: ApiError,
});

module.exports = {
  coinlayerRatesService,
  jwtTokenService,
  bcryptPasswordService,
  apiAuthService,
};
