const request = require('supertest');

const app = require('../../app');
const { Users } = require('../../configs/users-repository-config');
const { HttpCodes } = require('../../helpers/constants');
const { candidate, candidateWithWrongCreds } = require('./test-data');

describe('/user endpoints', () => {
  beforeAll(async () => {
    await Users.deleteOneUserBy('email', candidate.email);
  });

  afterAll(async () => {
    await Users.deleteOneUserBy('email', candidate.email);
  });

  describe('POST /user/create', () => {
    it('should respond with 201 status code when successfully registered', async () => {
      const response = await request(app)
        .post('/user/create')
        .send(candidate)
        .set('Accept', 'application/json');

      expect(response.statusCode).toBe(HttpCodes.CREATED);
    });

    it('should respond with 409 status code when user already exists', async () => {
      const response = await request(app)
        .post('/user/create')
        .send(candidate)
        .set('Accept', 'application/json');

      expect(response.statusCode).toBe(HttpCodes.CONFLICT);
    });

    it('should respond with 400 status code when provided data is invalid', async () => {
      const response = await request(app)
        .post('/user/create')
        .send({})
        .set('Accept', 'application/json');

      expect(response.statusCode).toBe(HttpCodes.BAD_REQUEST);
    });
  });

  describe('POST /user/login', () => {
    it('should respond with 200 status code when successfully logged in', async () => {
      const response = await request(app)
        .post('/user/login')
        .send({ email: candidate.email, password: candidate.password })
        .set('Accept', 'application/json');

      expect(response.statusCode).toBe(HttpCodes.OK);
    });

    it('should respond with access token when successfully logged in', async () => {
      const response = await request(app)
        .post('/user/login')
        .send({ email: candidate.email, password: candidate.password })
        .set('Accept', 'application/json');

      expect(response.body.user.token).toBeDefined();
    });

    it('should respond with 400 status code when provided data is invalid', async () => {
      const response = await request(app)
        .post('/user/login')
        .send({})
        .set('Accept', 'application/json');

      expect(response.statusCode).toBe(HttpCodes.BAD_REQUEST);
    });

    it('should respond with 401 status code when user does not exist', async () => {
      const response = await request(app)
        .post('/user/login')
        .send(candidateWithWrongCreds)
        .set('Accept', 'application/json');

      expect(response.statusCode).toBe(HttpCodes.UNAUTHORIZED);
    });
  });
});
