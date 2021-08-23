class UsersRepository {
  constructor({ mapper, idGenerator }) {
    this.mapper = mapper;
    this.idGenerator = idGenerator;
  }

  async getAllUsers() {
    try {
      return await this.mapper.read();
    } catch (error) {
      throw error;
    }
  }

  async getOneUserBy(field, value) {
    try {
      const allUsers = await this.mapper.read();

      return allUsers.find(user => user[field] === value);
    } catch (error) {
      throw error;
    }
  }

  async addNewUser({ name, email, password }) {
    try {
      const id = this.idGenerator();

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
      throw error;
    }
  }

  async deleteOneUserBy(field, value) {
    try {
      const allUsers = await this.mapper.read();

      const filteredUsers = allUsers.filter(user => user[field] !== value);

      await this.mapper.write(filteredUsers);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UsersRepository;
