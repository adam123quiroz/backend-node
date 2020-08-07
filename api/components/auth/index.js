const dao = require('../../../dao/sql-dao');
const bl = require('./service-auth');

module.exports = bl(dao);