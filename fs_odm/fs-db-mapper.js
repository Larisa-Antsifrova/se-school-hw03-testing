const fs = require('fs/promises');

class FsDbMapper {
  constructor(path) {
    this.usersPath = path;
  }

  async read() {
    return JSON.parse(await fs.readFile(this.usersPath, 'utf-8'));
  }

  async write(data) {
    await fs.writeFile(this.usersPath, JSON.stringify(data, null, 2));
  }
}

module.exports = FsDbMapper;
