const { attributes } = require('structure')

const CommerceBuyer = attributes({
  id: {
    type: Number,
    default: null
  },
  lookingFor: String,
  name: String,
  phone: Number,
  birthday: Date,
  isOnViber: Boolean,
  isOnTelegram: Boolean,
  isOnFacebook: Boolean,
  isOnWhatsapp: Boolean,
  authorID: Number,
  responsibleID: Number,
  buyerStatus: Number,
  contract: String,
  motivation: String,
  source: Number,
  reasonToBuy: String,
  description: String,
  createdAt: Date,
  updatedAt: Date,
  noOfRooms: {
    type: Number,
    max: 6
  },
  districtID: Number,
  maxPrice: Number,
  buildingType: Number,
  squareTotal: Number,
  isRenovated: Boolean,
  autonomousHeat: Boolean,

  /* JOINED PARAMS */
  authorName: String
})(class CommerceBuyer { })

module.exports = CommerceBuyer
