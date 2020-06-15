const { attributes } = require('structure')

class PhotosCollection extends Array { }
class ContactsCollection extends Array { }

const Apartment = attributes({
  id: {
    type: Number,
    default: null
  },
  title: String,
  responsibleID: Number,
  propertyStatus: {
    type: Number,
    default: 1
  },
  contract: {
    type: String,
    nullable: true
  },
  motivation: {
    type: String,
    nullable: true
  },
  source: {
    type: Number,
    nullable: true
  },
  noOfRooms: Number,
  districtID: {
    type: Number,
    nullable: true
  },
  settlement: String,
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
  districtName: String,
  featuredPhoto: {
    type: String,
    default: (inst) => (inst.photos && inst.photos.length) ? inst.photos[inst.featuredPhotoNo].fileURL : ''
  },

  /* RELATIONS */
  photos: {
    type: PhotosCollection,
    itemType: require('../photo/photo')
  },
  contacts: {
    type: ContactsCollection,
    itemType: require('../contact/contact')
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
