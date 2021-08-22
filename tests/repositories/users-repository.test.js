const { v4: uuidv4 } = require('uuid');

const UsersRepository = require('../../repositories/users-repository');
const { usersFsMapper } = require('../../configs/fs-bd-mapper-config');

jest.mock('uuid');
jest.mock('../../configs/fs-bd-mapper-config');

const Users = new UsersRepository({
  mapper: usersFsMapper,
  idGenerator: uuidv4,
});

const allUsersExample = [
  {
    id: 'd40ddf50-386e-4d6c-a10a-2c08d599ab19',
    name: 'Software Engineering School',
    email: 'software@engineering.school',
    password: '$2a$08$qT85kN0AQU1mnl3fCyskzOfw/qxuQBRmzzIP1qwlB0QohZ0OghqSu',
  },
];

const userExample = {
  id: 'd40ddf50-386e-4d6c-a10a-2c08d599ab19',
  name: 'Software Engineering School',
  email: 'software@engineering.school',
  password: '$2a$08$qT85kN0AQU1mnl3fCyskzOfw/qxuQBRmzzIP1qwlB0QohZ0OghqSu',
};

const candidateExample = {
  name: 'Software Engineering School',
  email: 'software@engineering.school',
  password: 'ses12345',
};

const newUserExample = {
  id: 'd40ddf50-386e-4d6c-a10a-2c08d599ab19',
  name: 'Software Engineering School',
  email: 'software@engineering.school',
};

const idExample = 'd40ddf50-386e-4d6c-a10a-2c08d599ab19';

describe('Users repository: getAllUsers method', () => {
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

describe('Users repository: getOneUserBy method', () => {
  test('should return a user by provided field and its value', async () => {
    usersFsMapper.read = jest.fn(() => allUsersExample);

    const result = await Users.getOneUserBy(
      'email',
      'software@engineering.school',
    );

    expect(result).toEqual(userExample);
  });

  test('should throw error', async () => {
    usersFsMapper.read = jest.fn(() => {
      throw Error();
    });

    await expect(() =>
      Users.getOneUserBy('email', 'software@engineering.school'),
    ).rejects.toThrow();
  });
});

describe('Users repository: addNewUser method', () => {
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
