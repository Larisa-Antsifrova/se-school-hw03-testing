const RatesService = require('../../services/rates-service');
const ApiError = require('../../exceptions/api-errors');
const CoinlayerProvider = require('../../rates_providers/coinlayer-provider');

jest.mock('../../rates_providers/coinlayer-provider');

describe('RatesService: getBtcToUahRate method', () => {
  let coinlayerRatesService;
  let response;

  beforeAll(() => {
    coinlayerRatesService = new RatesService({
      provider: CoinlayerProvider,
      errorHandler: ApiError,
    });

    response = {
      timestamp: 1629577925,
      target: 'UAH',
      rates: {
        BTC: 1304410.150852,
      },
    };
  });

  test('should return BTC to UAH rate', async () => {
    coinlayerRatesService.provider.fetchBtcToUahRate.mockReturnValue(response);

    const result = await coinlayerRatesService.getBtcToUahRate();

    expect(result).toEqual(response);
  });

  test('should handle errors', async () => {
    coinlayerRatesService.provider.fetchBtcToUahRate = jest.fn(() => {
      throw new Error();
    });

    await expect(() =>
      coinlayerRatesService.getBtcToUahRate(),
    ).rejects.toThrow();
  });
});
