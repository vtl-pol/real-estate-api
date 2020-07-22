const { Apartment } = require('../apartment')
const { House } = require('../house')
const { Commerce } = require('../commerce')
const { propertyConstants } = require('../property')
const { buyerConstants } = require('../buyer')
const User = require('../user/user')

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
    const ARCHIVED_REASONS = propertyConstants.ARCHIVED_REASONS

    const BUYER_SOURCES = buyerConstants.SOURCES
    const BUYER_APT_FLOORS = buyerConstants.APT_FLOORS
    const BUYER_HOUSE_RANGES = buyerConstants.HOUSE_RANGES
    const SOLD_BYS = buyerConstants.SOLD_BYS
    const USER_ROLES = Object.fromEntries(Object.values(User.ROLES).map((r) => [r.key, r.name]))
    const USER_RANKS = Object.fromEntries(Object.values(User.RANKS).map((r) => [r.key, r.name]))

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
      BUYER_HOUSE_RANGES,
      ARCHIVED_REASONS,
      SOLD_BYS,
      USER_ROLES,
      USER_RANKS
    })
  }
}

module.exports = new ConstantsService()
