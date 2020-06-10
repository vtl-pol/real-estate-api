const moment = require('moment')
const { extract } = require('../../utils/object')

const { photoResource } = require('../photo')

const propertyAttributes = [
  'id',
  'title',
  'responsibleID',
  'propertyStatus',
  'contract',
  'motivation',
  'source',
  'noOfRooms',
  'districtId',
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
  'ownerName',
  'ownerPhone',
  'isOnViber',
  'isOnTelegram',
  'isOnFacebook',
  'isOnWhatsapp',
  'reasonToSell',
  'createdAt',
  'updatedAt',
  'authorName',
  'photos',
  'ownerBirthday',
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
