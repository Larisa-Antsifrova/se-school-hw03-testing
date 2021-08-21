const { coinlayerRatesService } = require('../configs/services-config');

const getBtcRate = async (req, res, next) => {
  try {
    const rates = await coinlayerRatesService.getBtcToUahRate();

    return res.json({ ...rates });
  } catch (error) {
    next(error);
  }
};

module.exports = { getBtcRate };
