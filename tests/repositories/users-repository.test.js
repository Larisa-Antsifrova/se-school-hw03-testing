const { v4: uuidv4 } = require('uuid');

const UsersRepository = require('../../repositories/users-repository');
const { usersFsMapper } = require('../../configs/fs-bd-mapper-config');
const {
  allUsersExample,
  userExample,
  candidateExample,
  newUserExample,
  idExample,
} = require('./test-data');

jest.mock('uuid');
jest.mock('../../configs/fs-bd-mapper-config');

const Users = new UsersRepository({
  mapper: usersFsMapper,
  idGenerator: uuidv4,
});

describe('Users repository:', () => {
  describe('getAllUsers method', () => {
    test('should return array of all users', async () => {
      usersFsMapper.read = jest.fn(() => allUsersExample);

      const result = await Users.getAllUsers();

      expect(result).toEqual(allUsersExample);
    });

    test('should throw error', async () => {
      usersFsMapper.read = jest.fn(() => {
        throw Error();
      });

      await expect(() => Users.getAllUsers()).rejects.toThrow();
    });
  });

  describe('getOneUserBy method', () => {
    test('should return a user by provided field and its value', async () => {
      usersFsMapper.read = jest.fn(() => allUsersExample);

      const result = await Users.getOneUserBy('email', userExample.email);

      expect(result).toEqual(userExample);
    });

    test('should throw error', async () => {
      usersFsMapper.read = jest.fn(() => {
        throw Error();
      });

      await expect(() =>
        Users.getOneUserBy('email', userExample.email),
      ).rejects.toThrow();
    });
  });

  describe('addNewUser method', () => {
    test('should return a newly added user', async () => {
      usersFsMapper.read = jest.fn(() => allUsersExample);
      usersFsMapper.write = jest.fn(() => {});
      Users.idGenerator = jest.fn(() => idExample);

      const result = await Users.addNewUser(candidateExample);

      expect(result).toEqual(newUserExample);
    });

    test('should throw error', async () => {
      usersFsMapper.read = jest.fn(() => {
        throw Error();
      });

      await expect(() => Users.addNewUser(candidateExample)).rejects.toThrow();
    });
  });
});
