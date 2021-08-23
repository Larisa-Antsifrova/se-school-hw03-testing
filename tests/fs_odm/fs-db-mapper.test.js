const fs = require('fs/promises');
const path = require('path');

const FsDbMapper = require('../../fs_odm/fs-db-mapper');

const testDbPath = path.join(__dirname, 'test-db.json');
const testDbMapper = new FsDbMapper(testDbPath);

const testUsers = [
  {
    id: 'd40ddf50-386e-4d6c-a10a-2c08d599ab19',
    name: 'Software Engineering School',
    email: 'software@engineering.school',
    password: '$2a$08$qT85kN0AQU1mnl3fCyskzOfw/qxuQBRmzzIP1qwlB0QohZ0OghqSu',
  },
];

describe('FsDbMapper: write method', () => {
  test('should write data to fs db', async () => {
    await testDbMapper.write(testUsers);
    fs.readFile = fs.readFile;

    const result = await testDbMapper.read();

    expect(result).toEqual(testUsers);
  });

  test('should throw error if writing fails', async () => {
    fs.writeFile = jest.fn().mockRejectedValueOnce(new Error());

    await expect(() => testDbMapper.write()).rejects.toThrow();
  });
});

describe('FsDbMapper: read method', () => {
  test('should return data from fs db', async () => {
    const result = await testDbMapper.read();

    expect(result).toBeDefined();
  });

  test('should throw error if reading fails', async () => {
    fs.readFile = jest.fn().mockRejectedValueOnce(new Error());

    await expect(() => testDbMapper.read()).rejects.toThrow();
  });
});
