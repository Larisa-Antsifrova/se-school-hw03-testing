const bcrypt = require('bcryptjs');

class PasswordService {
  constructor(hashStrategy) {
    this.hashStrategy = hashStrategy;
    this.salt = 8;
  }

  async hashPassword(password) {
    return await this.hashStrategy.hash(password, this.salt);
  }

  async comparePassword(password, userPassword) {
    return await this.hashStrategy.compare(password, userPassword);
  }
}

module.exports = new PasswordService(bcrypt);
