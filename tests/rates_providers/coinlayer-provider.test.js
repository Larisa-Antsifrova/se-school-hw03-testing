const CoinlayerProvider = require('../../rates_providers/coinlayer-provider');
const coinlayer = require('../../http/axios-coinlayer');

jest.mock('../../http/axios-coinlayer');

describe('CoinlayerProvider: fetchBtcToUahRate method', () => {
  const ratesData = {
    data: {
      timestamp: 1629672727,
      target: 'UAH',
      rates: {
        BTC: 1307520.273569,
      },
    },
  };

  test('should return basic BTC to UAH rates info', async () => {
    coinlayer.get = jest.fn(() => ratesData);

    const result = await CoinlayerProvider.fetchBtcToUahRate();

    expect(result).toEqual(ratesData.data);
  });

  test('should throw error if fethc failed', async () => {
    coinlayer.get = jest.fn(() => {
      throw Error();
    });

    await expect(() => CoinlayerProvider.fetchBtcToUahRate()).rejects.toThrow();
  });
});
