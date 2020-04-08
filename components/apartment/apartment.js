const { attributes } = require('structure')
const APP_URL = process.env.APP_URL
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
  createdAt: Date,
  updatedAt: Date,
  type: {
    type: String,
    default: 'Apartment'
  },

  /* JOINED PARAMS */
  authorName: String,
  featuredImage: String,
  imageURL: {
    type: String,
    default: inst => (inst.featuredImage) ? `${APP_URL}/${inst.featuredImage.replace('public/', '')}` : ''
  },

  /* RELATIONS */
  photos: {
    type: PhotosCollection,
    itemType: require('../photo/photo')
  }
})(class Apartment { })

Apartment.MATERIALS = {
  BRICK: 0,
  PANEL: 4
}

Apartment.TYPES = {
  DORM: 4,
  GUEST: 5,
  SMALL_FAM: 6,
  FULL_FEATURED: 7,
  KHRUSHCHEV_BUILD: 8,
  IMPROVED: 9,
  CZECH: 10,
  NEW_BUILD: 11,
  STALIN_BUILD: 12
}

module.exports = Apartment
