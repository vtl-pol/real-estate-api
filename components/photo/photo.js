const { adapter, Entity } = require('../../config/db')

/**
 * Photo = {
 *   id: Number,
 *   propertyId: Number,
 *   filePath: String,
 * }
 */
class Photo extends Entity { }

module.exports = new Photo(adapter, 'photos')
