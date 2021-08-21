const RatesService = require('../services/rates-service');
const CoinlayerProvider = require('../rates_providers/coinlayer-provider');
const ApiError = require('../exceptions/api-errors');

const coinlayerRatesService = new RatesService({
  provider: CoinlayerProvider,
  errorHandler: ApiError,
});

module.exports = { coinlayerRatesService };
