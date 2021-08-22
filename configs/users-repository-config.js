const { v4: uuidv4 } = require('uuid');

const UsersRepository = require('../repositories/users-repository');
const { usersFsMapper } = require('./fs-bd-mapper-config');

const Users = new UsersRepository({
  mapper: usersFsMapper,
  idGenerator: uuidv4,
});

module.exports = { Users };
