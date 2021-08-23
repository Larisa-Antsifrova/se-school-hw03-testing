require('dotenv').config();
const coinlayer = require('../http/axios-coinlayer');
const ApiError = require('../exceptions/api-errors');

const { COINLAYER_API_KEY } = process.env;

class CoinlayerProvider {
  constructor(http, apiKey) {
    this.http = http;
    this.apiKey = apiKey;
  }

  async fetchBtcToUahRate() {
    try {
      const { data } = await this.http.get('/live', {
        params: {
          access_key: this.apiKey,
          target: 'UAH',
          symbols: 'BTC',
        },
      });

      if (!data.success) {
        throw new ApiError({
          message: data.error.type,
        });
      }

      const { timestamp, target, rates } = data;

      return { timestamp, target, rates };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CoinlayerProvider(coinlayer, COINLAYER_API_KEY);
