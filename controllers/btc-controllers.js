const RatesService = require('../services/rates-service');

const getBtcRate = async (req, res, next) => {
  try {
    const rates = await RatesService.getBtcToUahRate();

    return res.json({ ...rates });
  } catch (error) {
    next(error);
  }
};

module.exports = { getBtcRate };
