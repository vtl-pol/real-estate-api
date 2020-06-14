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
  'range',
  'districtID',
  'maxPrice',
  'material',
  'buildingType',
  'squareTotal',
  'squareLand',
  'isRenovated',
  'hasGarage',
  'authorName',
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
  result.range = buyerConstants.HOUSE_RANGES[parseInt(buyer.range)]

  return result
}

const archive = (buyer) => {
  return { ...full(buyer), ...extract(archiveAttributes, buyer) }
}

module.exports = { full, archive }
