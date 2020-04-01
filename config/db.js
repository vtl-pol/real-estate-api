const dbConfig = require('../knexfile')[process.env.NODE_ENV]
const knex = require('knex')(dbConfig)
const { attachPaginate } = require('knex-paginate')

attachPaginate()
module.exports = knex
