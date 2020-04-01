const Photo = require('./photo')
const photoDAL = require('./photoDAL')
const photoService = require('./photoService')
const photoResource = require('./photoResource')

module.exports = { Photo, photoService, photoResource, photoDAL }
