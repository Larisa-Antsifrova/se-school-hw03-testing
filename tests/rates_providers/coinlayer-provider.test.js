const CoinlayerProvider = require('../../rates_providers/coinlayer-provider');
const coinlayer = require('../../http/axios-coinlayer');
const { successResponse, ratesInfo, failResponse } = require('./test-data');

jest.mock('../../http/axios-coinlayer');

describe('CoinlayerProvider: fetchBtcToUahRate method', () => {
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
