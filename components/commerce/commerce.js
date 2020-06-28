const { attributes } = require('structure')
const { Property } = require('../property')

class PhotosCollection extends Array { }
class ContactsCollection extends Array { }

const Commerce = attributes({
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
  price: Number,
  floor: Number,
  floors: Number,
  buildingType: Number,
  squareTotal: Number,
  squareLiving: Number,
  renovated: Boolean,
  autonomousHeat: Boolean,
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
  districtName: String,
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
})(class Commerce extends Property { })

Commerce.BUILDING_TYPES = {
  1: 'Склад',
  2: 'Торгове',
  3: 'Кафе',
  4: 'Офіс',
  5: 'Виробниче',
  6: 'Вільне',
  7: 'Інше'
}

module.exports = Commerce
