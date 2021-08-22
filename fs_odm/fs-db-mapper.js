const fs = require('fs/promises');

class FsDbMapper {
  constructor(path) {
    this.usersPath = path;
  }

  async read() {
    try {
      return JSON.parse(await fs.readFile(this.usersPath, 'utf-8'));
    } catch (error) {
      throw error;
    }
  }

  async write(data) {
    try {
      await fs.writeFile(this.usersPath, JSON.stringify(data, null, 2));
    } catch (error) {
      throw error;
    }
  }
}

module.exports = FsDbMapper;
