const PasswordService = require('../../services/password-service');

describe('PasswordService: hashPassword method ', () => {
  test('should return hashed password', async () => {
    const password = '12345';

    const result = await PasswordService.hashPassword(password);

    expect(result).not.toBe(password);
  });
});

describe('PasswordService: comparePassword method ', () => {
  test('should return true if passwords match', async () => {
    const submittedPassword = '12345';
    const savedPassword = await PasswordService.hashPassword(submittedPassword);

    const result = await PasswordService.comparePassword(
      submittedPassword,
      savedPassword,
    );

    expect(result).toBe(true);
  });

  test('should return false if passwords do not match', async () => {
    const submittedPassword = '12345';
    const savedPassword =
      '$2a$08$hJDFnQNFK0LKglVazvqnsuHmL8u/XfuFNDFQCxKVR72kCuL2LthEi';

    const result = await PasswordService.comparePassword(
      submittedPassword,
      savedPassword,
    );

    expect(result).toBe(false);
  });
});
