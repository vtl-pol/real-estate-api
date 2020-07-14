const { extract } = require('../../utils/object')
const { buyerConstants } = require('../buyer')

const buyerAttributes = [
  'id',
  'name',
  'authorID',
  'responsibleID',
  'buyerStatus',
  'contract',
  'motivation',
  'source',
  'reasonToBuy',
  'description',
  'createdAt',
  'updatedAt',
  'noOfRooms',
  'districtID',
  'districtName',
  'settlement',
  'maxPrice',
  'buildingType',
  'squareTotal',
  'isRenovated',
  'autonomousHeat',
  'authorName',
  'isSaved',
  'contacts'
]

const archiveAttributes = [
  'archivedAt',
  'archivedTill',
  'archivedReason',
  'soldByID'
]

const full = (buyer) => {
  const result = extract(buyerAttributes, buyer)

  result.sourceName = buyerConstants.SOURCES[parseInt(buyer.source)]

  return result
}

const archive = (buyer) => {
  return { ...full(buyer), ...extract(archiveAttributes, buyer) }
}

module.exports = { full, archive }
