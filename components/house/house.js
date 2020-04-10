const { attributes } = require('structure')
const APP_URL = process.env.APP_URL
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
  createdAt: Date,
  updatedAt: Date,
  type: {
    type: String,
    default: 'House'
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
})(class House { })

House.MATERIALS = {
  BRICK: 0,
  BLOCKS: 1,
  WOOD: 2,
  OTHER: 3
}

// окремий, частина, котедж, дача
House.TYPES = {
  SEPARATE: 0,
  PARTIAL: 1,
  COTTAGE: 2,
  SUMMERHOUSE: 3
}

module.exports = House
