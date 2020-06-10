const moment = require('moment')
const { extract } = require('../../utils/object')

const { photoResource } = require('../photo')

const propertyAttributes = [
  'id',
  'authorName',
  'title',
  'noOfRooms',
  'districtId',
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
  'ownerName',
  'ownerPhone',
  'ownerBirthday',
  'isOnViber',
  'isOnTelegram',
  'isOnFacebook',
  'isOnWhatsapp',
  'reasonToSell',
  'featuredPhoto'
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
  result.ownerBirthday = moment(property.ownerBirthday).format('DD-MM-YYYY')

  return result
}

const archive = (property) => {
  return { ...full(property), ...extract(archiveAttributes, property) }
}

module.exports = { full, archive }
