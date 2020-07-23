const { extract } = require('../../utils/object')

const { photoResource } = require('../photo')

const propertyAttributes = [
  'id',
  'authorName',
  'responsibleName',
  'responsibleID',
  'title',
  'noOfRooms',
  'districtID',
  'districtName',
  'settlement',
  'street',
  'houseNo',
  'aptNo',
  'floor',
  'autonomousHeat',
  'price',
  'material',
  'floors',
  'buildingType',
  'squareTotal',
  'squareLiving',
  'squareKitchen',
  'renovated',
  'builtAt',
  'description',
  'type',
  'createdAt',
  'updatedAt',
  'photos',
  'author',
  'propertyStatus',
  'contract',
  'motivation',
  'source',
  'reasonToSell',
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
