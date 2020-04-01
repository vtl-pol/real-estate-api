const { attributes } = require('structure')
const APP_URL = process.env.APP_URL
class PhotosCollection extends Array { }

const House = attributes({
  id: {
    type: Number,
    default: null
  },
  title: String,
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

House.MATERIAL_BRICK = 0
House.MATERIAL_BLOCKS = 1
House.MATERIAL_WOOD = 2
House.MATERIAL_OTHER = 3

// окремий, частина, котедж, дача
House.TYPE_SEPARATE = 0
House.TYPE_PARTIAL = 1
House.TYPE_COTTAGE = 2
House.TYPE_SUMMERHOUSE = 3

module.exports = House
