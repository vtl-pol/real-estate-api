const houseRouter = require('./houseRouter')
const houseService = require('./houseService')
const House = require('./house')
const houseDAL = require('./houseDAL')

module.exports = { House, houseService, houseRouter, houseDAL }
