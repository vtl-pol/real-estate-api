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
  featuredPhotoNo: {
    type: Number,
    default: 0
  },
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
  featuredPhoto: {
    type: String,
    default: (inst) => inst.photos.length ? inst.photos[inst.featuredPhotoNo].fileURL : ''
  },

  /* RELATIONS */
  photos: {
    type: PhotosCollection,
    itemType: require('../photo/photo')
  }
})(class Apartment { })

Apartment.MATERIALS = {
  1: 'Цегла',
  5: 'Панель'
}

Apartment.TYPES = {
  5: 'Гуртожиток',
  6: 'Гостинка',
  7: 'Малосімейка',
  8: 'Повноцінна',
  9: 'Хрущовка',
  10: 'Покращене',
  11: 'Чешка',
  12: 'Новобудова',
  13: 'Сталінка'
}

module.exports = Apartment
