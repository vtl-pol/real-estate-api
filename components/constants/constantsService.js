const { Apartment } = require('../apartment')
const { House } = require('../house')
const { Commerce } = require('../commerce')
const { propertyConstants } = require('../property')
const { buyerConstants } = require('../buyer')

class ConstantsService {
  get (_req, res) {
    const APARTMENT_MATERIALS = Apartment.MATERIALS
    const APARTMENT_TYPES = Apartment.TYPES
    const HOUSE_MATERIALS = House.MATERIALS
    const HOUSE_TYPES = House.TYPES
    const COMMERCE_BUILDING_TYPES = Commerce.BUILDING_TYPES
    const PROPERTY_STATUSES = propertyConstants.STATUSES
    const PROPERTY_CONTRACTS = propertyConstants.CONTRACTS
    const PROPERTY_MOTIVATIONS = propertyConstants.MOTIVATIONS
    const PROPERTY_SOURCES = propertyConstants.SOURCES
    const BUYER_SOURCES = buyerConstants.SOURCES
    const BUYER_APT_FLOORS = buyerConstants.APT_FLOORS
    const BUYER_HOUSE_RANGES = buyerConstants.HOUSE_RANGES

    return res.send({
      APARTMENT_MATERIALS,
      APARTMENT_TYPES,
      HOUSE_MATERIALS,
      HOUSE_TYPES,
      COMMERCE_BUILDING_TYPES,
      PROPERTY_STATUSES,
      PROPERTY_CONTRACTS,
      PROPERTY_MOTIVATIONS,
      PROPERTY_SOURCES,
      BUYER_SOURCES,
      BUYER_APT_FLOORS,
      BUYER_HOUSE_RANGES
    })
  }
}

module.exports = new ConstantsService()
