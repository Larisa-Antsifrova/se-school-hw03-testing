const axios = require('axios');

const coinlayer = axios.create({
  baseURL: 'http://api.coinlayer.com', // only HTTP is available in free tier, HTTPS - in premium one
});

module.exports = coinlayer;
