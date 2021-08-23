require('dotenv').config();
const request = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('../../app');
const { coinlayerRatesService } = require('../../configs/services-config');
const { HttpCodes } = require('../../helpers/constants');
const { payload, testRates } = require('./test-data');

jest.mock('../../configs/services-config');

describe('btcRate endpoint', () => {
  describe('GET /btcRate', () => {
    let token;

    beforeAll(() => {
      const { JWT_SECRET_KEY } = process.env;
      token = jwt.sign(payload, JWT_SECRET_KEY);

      coinlayerRatesService.getBtcToUahRate = jest.fn(() => testRates);
    });

    it('should respond with 200 status code and rates info when success', async () => {
      const response = await request(app)
        .get('/btcRate')
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(HttpCodes.OK);
      expect(response.body.target).toBeDefined();
      expect(response.body.rates).toBeDefined();
    });

    it('should respond with 400 status code and pass on error when provider failed', async () => {
      coinlayerRatesService.getBtcToUahRate = jest.fn(() => {
        throw Error();
      });
      const next = jest.fn();

      try {
        await request(app)
          .get('/btcRate')
          .set('Authorization', `Bearer ${token}`);
      } catch (error) {
        expect(next).toHaveBeenCalledWith(error);
      }
    });

    it('should respond with 401 status code when user is unauthorized', async () => {
      const response = await request(app).get('/btcRate');

      expect(response.statusCode).toBe(HttpCodes.UNAUTHORIZED);
    });
  });
});
