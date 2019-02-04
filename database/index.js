const config = require('../knexfile');
const environment = process.env.NODE_ENV || 'knex';
module.exports = require('knex')(config[environment]);