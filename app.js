const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const homeRouter = require('./routes/home-route');
const userRouter = require('./routes/users-routes');
const btcRouter = require('./routes/btc-routes');

const { ApiLimiterConfig } = require('./configs/api-limiter-config');
const { Limits } = require('./configs/limits-config');
const { HttpCodes, Messages } = require('./helpers/constants');

const app = express();

app.use(helmet());
app.use(express.json({ limit: Limits.JSON }));
app.use(rateLimit(ApiLimiterConfig));

app.use(homeRouter);
app.use(userRouter);
app.use(btcRouter);

app.use((req, res) => {
  return res.status(HttpCodes.NOT_FOUND).json({ message: Messages.notFound });
});

app.use((err, req, res, next) => {
  const status = err.status || HttpCodes.INTERNAL_SERVER_ERROR;

  return res.status(status).json({
    message: err.message,
  });
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

module.exports = app;
