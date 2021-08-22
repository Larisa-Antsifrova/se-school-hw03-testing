const path = require('path');

const FsDbMapper = require('../fs_odm/fs-db-mapper');

const usersPath = path.join(__dirname, '..', 'db', 'users.json');
const usersFsMapper = new FsDbMapper(usersPath);

module.exports = { usersFsMapper };
