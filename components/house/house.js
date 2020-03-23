const { adapter, Entity } = require('../../config/db')

/**
 * House = {
 *   title: String,
 *   noOfRooms: Integer,
 *   districtId: Integer,
 *   street: String,
 *   houseNo: String,
 *   price: Integer,
 *   material: Integer,
 *   floors: Integer,
 *   buildingType: Integer,
 *   squareTotal: Integer,
 *   squareLiving: Integer,
 *   squareKitchen: Integer,
 *   squareLand: Integer,
 *   registrationNo: String,
 *   renovated: Boolean,
 *   garage: Boolean,
 *   builtAt: String,
 *   description: Text,
 *   type: String,
 * }
 */
class House extends Entity {
  defaultFilter () {
    return { type: 'House' }
  }

  async filter (q, filter) {
    if (!filter || (Object.keys(filter).length === 0 && filter.constructor === Object)) {
      return q
    }
    return q
  }
}
module.exports = new House(adapter, 'properties')
