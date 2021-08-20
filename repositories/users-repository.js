const path = require('path');
const { v4: uuidv4 } = require('uuid');

const FsDbMapper = require('../fs_odm/fs-db-mapper');

const usersPath = path.join(__dirname, '..', 'db', 'users.json');
const usersMapper = new FsDbMapper(usersPath);

class Users {
  constructor(mapper) {
    this.mapper = mapper;
  }

  async getAllUsers() {
    try {
      return await this.mapper.read();
    } catch (error) {
      console.log('Error in getAllUsers: ', error.message);
    }
  }

  async getOneUserBy(field, value) {
    try {
      const allUsers = await this.mapper.read();
      return allUsers.find(user => user[field] === value);
    } catch (error) {
      console.log('Error in getOneUserBy: ', error.message);
    }
  }

  async addNewUser({ name, email, password }) {
    try {
      const id = uuidv4();

      const newUser = {
        id,
        name,
        email,
        password,
      };

      const allUsers = await this.mapper.read();
      allUsers.push(newUser);

      await this.mapper.write(allUsers);

      return { id, name, email };
    } catch (error) {
      console.log('Error in addNewUser: ', error.message);
    }
  }
}

module.exports = new Users(usersMapper);
