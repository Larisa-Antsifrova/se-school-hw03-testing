const RatesService = require('../../services/rates-service');
const ApiError = require('../../exceptions/api-errors');
const CoinlayerProvider = require('../../rates_providers/coinlayer-provider');
const { ratesExample } = require('./test-data');

jest.mock('../../rates_providers/coinlayer-provider');

const coinlayerRatesService = new RatesService({
  provider: CoinlayerProvider,
  errorHandler: ApiError,
});

describe('RatesService: getBtcToUahRate method', () => {
  test('should return BTC to UAH rate', async () => {
    CoinlayerProvider.fetchBtcToUahRate.mockReturnValue(ratesExample);

    const result = await coinlayerRatesService.getBtcToUahRate();

    expect(result).toEqual(ratesExample);
  });

  test('should handle errors', async () => {
    CoinlayerProvider.fetchBtcToUahRate = jest.fn(() => {
      throw new Error();
    });

    await expect(() =>
      coinlayerRatesService.getBtcToUahRate(),
    ).rejects.toThrow();
  });
});
