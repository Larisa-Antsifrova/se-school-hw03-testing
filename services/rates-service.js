const CoinlayerProvider = require('../rates_providers/coinlayer-provider');

class RatesService {
  constructor(provider) {
    this.provider = provider;
  }

  async getBtcToUahRate() {
    try {
      return await this.provider.fetchBtcToUahRate();
    } catch (error) {
      console.log('Error in getBtcToUahRate: ', error.message);
    }
  }
}

module.exports = new RatesService(CoinlayerProvider);
