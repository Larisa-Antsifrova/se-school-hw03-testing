require('dotenv').config();
const request = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('../../app');
const { coinlayerRatesService } = require('../../configs/services-config');
const { HttpCodes } = require('../../helpers/constants');

jest.mock('../../configs/services-config');

describe('btcRate endpoint', () => {
  describe('GET /btcRate', () => {
    const testUser = {
      id: 'd40ddf50-386e-4d6c-a10a-2c08d599ab19',
      name: 'Software Engineering School',
      email: 'software@engineering.school',
    };
    const { JWT_SECRET_KEY } = process.env;
    const token = jwt.sign(testUser, JWT_SECRET_KEY);
    const testRates = {
      target: 'UAH',
      rates: {
        BTC: 1234,
      },
    };

    coinlayerRatesService.getBtcToUahRate = jest.fn(() => testRates);

    it('should respond with 401 status code if user is unauthorized', async () => {
      const response = await request(app).get('/btcRate');

      expect(response.statusCode).toBe(HttpCodes.UNAUTHORIZED);
    });

    it('should respond with 200 status code and rates info', async () => {
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
  });
});
