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

module.exports = { successResponse, ratesInfo, failResponse };
