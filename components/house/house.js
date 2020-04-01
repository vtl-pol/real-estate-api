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

// заявка, оброблений, в рекламі
House.STATUSES = {
  APPLICATION: 0,
  PROCESSED: 1,
  PROMOTION: 2
}

House.CONTRACTS = ['НЕД', 'ЕД']
House.MOTIVATIONS = ['A', 'B', 'C', 'AA']

House.SOURCES = {
  1: 'Особистий агента',
  2: 'Пошук квартири',
  3: 'Сайти',
  4: 'olx.ua',
  5: 'domria.com',
  6: 'mesto.ua',
  7: 'Vlasnyky-rv.at.ua',
  8: 'Розклейка',
  9: 'Куплю',
  10: 'Реклама послуг',
  11: 'Внутрішня база  Архів',
  12: 'Заміна',
  13: 'Бази власників',
  14: 'Рента',
  15: 'Реально',
  16: 'Газети',
  17: 'Інше АН',
  18: 'Соціальні мережі',
  19: 'Реклама АН',
  20: 'Зовнішня реклама',
  21: 'Соц. мережі',
  22: 'Інстаграм',
  23: 'Сторінка HalDen.estate  Фейсбук',
  24: 'Ютуб',
  25: 'Сайт HalDen.estate',
  26: 'Реклама по сайтах',
  27: 'Рекомендація',
  28: 'Знайомий',
  29: 'Колега',
  30: 'Ключова людина',
  31: 'Повторне звернення',
  32: 'Невідомо'
}

module.exports = House
