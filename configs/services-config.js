const RatesService = require('../services/rates-service');
const CoinlayerProvider = require('../rates_providers/coinlayer-provider');
const ApiError = require('../exceptions/api-errors');

const coinlayerRatesService = new RatesService({
  provider: CoinlayerProvider,
  errorHandler: ApiError,
});

const AuthService = require('../services/auth-service');
const Users = require('../repositories/users-repository');
const PasswordService = require('../services/password-service');
const TokenService = require('../services/jwt-token-service');

const apiAuthService = new AuthService({
  usersCollection: Users,
  passwordService: PasswordService,
  tokenService: TokenService,
  errorHandler: ApiError,
});

module.exports = { coinlayerRatesService, apiAuthService };
