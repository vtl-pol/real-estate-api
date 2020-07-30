const { extract } = require('../../utils/object')

const { photoResource } = require('../photo')

const propertyAttributes = [
  'id',
  'title',
  'authorName',
  'responsibleName',
  'responsibleID',
  'propertyStatus',
  'contract',
  'motivation',
  'expiresAt',
  'source',
  'noOfRooms',
  'districtID',
  'districtName',
  'settlement',
  'street',
  'houseNo',
  'price',
  'floor',
  'floors',
  'buildingType',
  'squareTotal',
  'squareLiving',
  'renovated',
  'autonomousHeat',
  'description',
  'reasonToSell',
  'createdAt',
  'updatedAt',
  'author',
  'photos',
  'featuredPhoto',
  'isSaved',
  'contacts'
]

const archiveAttributes = [
  'archivedAt',
  'archivedTill',
  'archivedReason',
  'soldByID'
]

const full = (property) => {
  const result = extract(propertyAttributes, property)

  result.photos = property.photos.map(p => photoResource.full(p))

  return result
}

const archive = (property) => {
  return { ...full(property), ...extract(archiveAttributes, property) }
}

module.exports = { full, archive }
