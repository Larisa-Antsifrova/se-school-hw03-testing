const bcrypt = require('bcryptjs');

const PasswordService = require('../../services/password-service');
const { submittedPassword, hashedPassword } = require('./test-data');

jest.mock('bcryptjs');

const bcryptPasswordService = new PasswordService(bcrypt);

describe('PasswordService:', () => {
  describe('hash method ', () => {
    test('should return hashed password', async () => {
      bcrypt.hash = jest.fn(() => hashedPassword);

      const result = await bcryptPasswordService.hash(submittedPassword);

      expect(result).toBe(hashedPassword);
    });
  });

  describe('compare method', () => {
    test('should return true if passwords match', async () => {
      bcrypt.compare = jest.fn(() => true);

      const result = await bcryptPasswordService.compare(
        submittedPassword,
        hashedPassword,
      );

      expect(result).toBe(true);
    });

    test('should return false if passwords do not match', async () => {
      bcrypt.compare = jest.fn(() => false);

      const result = await bcryptPasswordService.compare(
        submittedPassword,
        hashedPassword,
      );

      expect(result).toBe(false);
    });
  });
});
