const fs = require('fs/promises');
const path = require('path');

const FsDbMapper = require('../../fs_odm/fs-db-mapper');

const testDbPath = path.join(__dirname, '..', '..', 'db', 'test-db.json');
const testDbMapper = new FsDbMapper(testDbPath);

jest.mock('fs/promises');

describe('FsDbMapper:', () => {
  fs.readFile = jest.fn(() => JSON.stringify(testUsers));
  fs.writeFile = jest.fn();

  const testUsers = [
    {
      id: 'd40ddf50-386e-4d6c-a10a-2c08d599ab19',
      name: 'Software Engineering School',
      email: 'software@engineering.school',
      password: '$2a$08$qT85kN0AQU1mnl3fCyskzOfw/qxuQBRmzzIP1qwlB0QohZ0OghqSu',
    },
  ];

  test('should read data from fs db', async () => {
    const result = await testDbMapper.read();

    expect(result).toEqual(testUsers);
  });

  test('should write data to fs db', async () => {
    const stringifiedTestUsers = JSON.stringify(testUsers, null, 2);

    await testDbMapper.write(testUsers);

    expect(fs.writeFile).toBeCalledWith(testDbPath, stringifiedTestUsers);
  });

  test('should throw error if writing fails', async () => {
    fs.writeFile = jest.fn().mockRejectedValueOnce(new Error());

    await expect(() => testDbMapper.write()).rejects.toThrow();
  });

  test('should throw error if reading fails', async () => {
    fs.readFile = jest.fn().mockRejectedValueOnce(new Error());

    await expect(() => testDbMapper.read()).rejects.toThrow();
  });
});
