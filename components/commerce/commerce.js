const { attributes } = require('structure')

class PhotosCollection extends Array { }

const Commerce = attributes({
  id: {
    type: Number,
    default: null
  },
  title: String,
  responsibleID: Number,
  propertyStatus: Number,
  contract: {
    type: String,
    nullable: true
  },
  motivation: {
    type: String,
    nullable: true
  },
  source: Number,
  noOfRooms: Number,
  districtId: Number,
  street: String,
  houseNo: String,
  price: Number,
  floor: Number,
  floors: Number,
  buildingType: Number,
  squareTotal: Number,
  squareLiving: Number,
  renovated: Boolean,
  autonomousHeat: Boolean,
  description: String,
  ownerName: String,
  ownerPhone: Number,
  ownerBirthday: Date,
  isOnViber: Boolean,
  isOnTelegram: Boolean,
  isOnFacebook: Boolean,
  isOnWhatsapp: Boolean,
  reasonToSell: String,
  createdAt: Date,
  updatedAt: Date,
  type: {
    type: String,
    default: 'House'
  },

  /* JOINED PARAMS */
  authorName: String,

  /* RELATIONS */
  photos: {
    type: PhotosCollection,
    itemType: require('../photo/photo')
  }
})(class Commerce { })

Commerce.BUILDING_TYPES = {
  0: 'Склад',
  1: 'Торгове',
  2: 'Кафе',
  3: 'Офіс',
  4: 'Виробниче',
  5: 'Вільне',
  6: 'Інше'
}

module.exports = Commerce
