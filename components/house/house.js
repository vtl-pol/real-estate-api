const { attributes } = require('structure')

class PhotosCollection extends Array { }
class ContactsCollection extends Array { }

const House = attributes({
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
    default: 'House'
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
  },
  contacts: {
    type: ContactsCollection,
    itemType: require('../contact/contact')
  }
})(class House { })

House.MATERIALS = {
  1: 'Цегла',
  2: 'Блоки',
  3: 'Дерево',
  4: 'Інше'
}

House.TYPES = {
  1: 'Окремий',
  2: 'Частина',
  3: 'Котедж',
  4: 'Дача'
}

module.exports = House
