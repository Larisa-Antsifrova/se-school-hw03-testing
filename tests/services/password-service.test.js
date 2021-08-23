const bcrypt = require('bcryptjs');

const PasswordService = require('../../services/password-service');
const { submittedPassword, hashedPassword } = require('./test-data');

jest.mock('bcryptjs');

const bcryptPasswordService = new PasswordService(bcrypt);

describe('PasswordService:', () => {
  describe('hashPassword method ', () => {
    test('should return hashed password', async () => {
      bcrypt.hash = jest.fn(() => hashedPassword);

      const result = await bcryptPasswordService.hashPassword(
        submittedPassword,
      );

      expect(result).toBe(hashedPassword);
    });
  });

  describe('comparePassword method', () => {
    test('should return true if passwords match', async () => {
      bcrypt.compare = jest.fn(() => true);

      const result = await bcryptPasswordService.comparePassword(
        submittedPassword,
        hashedPassword,
      );

      expect(result).toBe(true);
    });

    test('should return false if passwords do not match', async () => {
      bcrypt.compare = jest.fn(() => false);

      const result = await bcryptPasswordService.comparePassword(
        submittedPassword,
        hashedPassword,
      );

      expect(result).toBe(false);
    });
  });
});
