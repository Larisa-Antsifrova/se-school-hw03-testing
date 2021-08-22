require('dotenv').config();
const jwt = require('jsonwebtoken');

const RatesService = require('../services/rates-service');
const AuthService = require('../services/auth-service');
const PasswordService = require('../services/password-service');
const TokenService = require('../services/jwt-token-service');

const Users = require('../repositories/users-repository');
const CoinlayerProvider = require('../rates_providers/coinlayer-provider');
const ApiError = require('../exceptions/api-errors');

const { JWT_SECRET_KEY } = process.env;

const jwtTokenService = new TokenService({
  jwtProvider: jwt,
  secretKey: JWT_SECRET_KEY,
  errorHandler: ApiError,
});

const coinlayerRatesService = new RatesService({
  provider: CoinlayerProvider,
  errorHandler: ApiError,
});

const apiAuthService = new AuthService({
  usersCollection: Users,
  passwordService: PasswordService,
  tokenService: jwtTokenService,
  errorHandler: ApiError,
});

module.exports = { coinlayerRatesService, apiAuthService, jwtTokenService };
