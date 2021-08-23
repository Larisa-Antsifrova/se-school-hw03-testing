require('dotenv').config();
const path = require('path');

const FsDbMapper = require('../fs_odm/fs-db-mapper');

const usersPath =
  process.env.NODE_ENV === 'test'
    ? path.join(__dirname, '..', 'db', 'test-bd.json')
    : path.join(__dirname, '..', 'db', 'users.json');

const usersFsMapper = new FsDbMapper(usersPath);

module.exports = { usersFsMapper };
