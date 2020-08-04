const dao = require('../../../dao/dummy');
const bl = require('./service-auth');

module.exports = bl(dao);