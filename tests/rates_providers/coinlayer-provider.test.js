const CoinlayerProvider = require('../../rates_providers/coinlayer-provider');
const coinlayer = require('../../http/axios-coinlayer');

jest.mock('../../http/axios-coinlayer');

describe('CoinlayerProvider: fetchBtcToUahRate method', () => {
  const successResponse = {
    data: {
      success: true,
      terms: 'https://coinlayer.com/terms',
      privacy: 'https://coinlayer.com/privacy',
      timestamp: 1629755646,
      target: 'UAH',
      rates: { BTC: 1321519.72395 },
    },
  };

  const ratesInfo = {
    timestamp: 1629755646,
    target: 'UAH',
    rates: { BTC: 1321519.72395 },
  };

  const failResponse = {
    success: false,
    error: {
      code: 101,
      type: 'invalid_access_key',
      info: 'You have not supplied a valid API Access Key. [Technical Support: support@apilayer.com]',
    },
  };

  test('should return basic BTC to UAH rates info', async () => {
    coinlayer.get.mockReturnValue(successResponse);

    const response = await CoinlayerProvider.fetchBtcToUahRate();

    expect(response).toEqual(ratesInfo);
  });

  test('should throw error if fethc failed', async () => {
    coinlayer.get.mockReturnValue(failResponse);

    await expect(() => CoinlayerProvider.fetchBtcToUahRate()).rejects.toThrow();
  });
});
