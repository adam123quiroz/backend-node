const dao = require('../../../dao/sql-dao');
const bl = require('./service-user');

module.exports = bl(dao);