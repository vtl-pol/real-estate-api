const { attributes } = require('structure')
class ContactsCollection extends Array { }

const CommerceBuyer = attributes({
  id: {
    type: Number,
    default: null
  },
  lookingFor: String,
  name: String,
  authorID: Number,
  responsibleID: {
    type: Number,
    nullable: true
  },
  buyerStatus: {
    type: Number,
    default: 1
  },
  contract: String,
  motivation: String,
  source: {
    type: Number,
    nullable: true
  },
  reasonToBuy: String,
  description: String,
  createdAt: Date,
  updatedAt: Date,
  noOfRooms: {
    type: Number,
    min: 1,
    max: 6
  },
  districtID: {
    type: Number,
    nullable: true
  },
  settlement: String,
  maxPrice: Number,
  buildingType: Number,
  squareTotal: Number,
  isRenovated: Boolean,
  autonomousHeat: Boolean,

  archivedAt: {
    type: Date,
    nullable: true
  },
  archivedTill: {
    type: Date,
    nullable: true
  },
  archivedReason: {
    type: Number,
    nullable: true
  },
  soldBy: {
    type: Number,
    nullable: true
  },

  /* JOINED PARAMS */
  authorName: String,
  districtName: String,
  contacts: {
    type: ContactsCollection,
    itemType: require('../contact/contact')
  }
})(class CommerceBuyer { })

module.exports = CommerceBuyer
