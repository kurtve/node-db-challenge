// db configuration settings to initialize
// the database for use in our server code

const knex = require('knex');
const config = require('../knexfile.js');

module.exports = knex(config.development);
