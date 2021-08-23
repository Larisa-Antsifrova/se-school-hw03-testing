const request = require('supertest');
const app = require('../../app');
const { HttpCodes, Messages } = require('../../helpers/constants');

describe('home endpoint', () => {
  describe('GET /', () => {
    let response;

    beforeAll(async () => {
      response = await request(app).get('/');
    });

    it('responds with json', async () => {
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('json'),
      );
    });

    it('responds with 200 status code', async () => {
      expect(response.statusCode).toBe(HttpCodes.OK);
    });

    it('responds with welcome message', async () => {
      expect(response.body.message).toBe(Messages.welcomeHome);
    });
  });
});
