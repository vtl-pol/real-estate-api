const { attributes } = require('structure')

class PhotosCollection extends Array { }

const House = attributes({
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
  material: Number,
  floors: Number,
  buildingType: Number,
  squareTotal: Number,
  squareLiving: Number,
  squareKitchen: Number,
  squareLand: Number,
  registrationNo: String,
  renovated: Boolean,
  garage: Boolean,
  builtAt: String,
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
})(class House { })

House.MATERIALS = {
  0: 'Цегла',
  1: 'Блоки',
  2: 'Дерево',
  3: 'Інше'
}

House.TYPES = {
  0: 'Окремий',
  1: 'Частина',
  2: 'Котедж',
  3: 'Дача'
}

module.exports = House
