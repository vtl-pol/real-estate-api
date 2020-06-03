const { attributes } = require('structure')

class PhotosCollection extends Array { }

const Apartment = attributes({
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
  aptNo: String,
  price: Number,
  material: Number,
  floor: Number,
  floors: Number,
  buildingType: Number,
  squareTotal: Number,
  squareLiving: Number,
  squareKitchen: Number,
  renovated: Boolean,
  description: String,
  autonomousHeat: Boolean,
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
  soldByID: {
    type: Number,
    nullable: true
  },

  type: {
    type: String,
    default: 'Apartment'
  },

  /* JOINED PARAMS */
  authorName: String,

  /* RELATIONS */
  photos: {
    type: PhotosCollection,
    itemType: require('../photo/photo')
  }
})(class Apartment { })

Apartment.MATERIALS = {
  0: 'Цегла',
  4: 'Панель'
}

Apartment.TYPES = {
  4: 'Гуртожиток',
  5: 'Гостинка',
  6: 'Малосімейка',
  7: 'Повноцінна',
  8: 'Хрущовка',
  9: 'Покращене',
  10: 'Чешка',
  11: 'Новобудова',
  12: 'Сталінка'
}

module.exports = Apartment
