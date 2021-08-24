class PasswordService {
  constructor(hashStrategy) {
    this.hashStrategy = hashStrategy;
    this.salt = 8;
  }

  async hash(password) {
    return await this.hashStrategy.hash(password, this.salt);
  }

  async compare(password, userPassword) {
    return await this.hashStrategy.compare(password, userPassword);
  }
}

module.exports = PasswordService;
