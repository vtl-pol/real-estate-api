const dbConfig = require('../../knexfile')[process.env.NODE_ENV]
const knex = require('knex')(dbConfig)

module.exports = knex
