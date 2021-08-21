const { HttpCodes } = require('../helpers/constants');
class RatesService {
  constructor({ provider, errorHandler }) {
    this.provider = provider;
    this.errorHandler = errorHandler;
  }

  async getBtcToUahRate() {
    try {
      return await this.provider.fetchBtcToUahRate();
    } catch (error) {
      throw new this.errorHandler({
        status: HttpCodes.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}

module.exports = RatesService;
