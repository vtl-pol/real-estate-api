const { attributes } = require('structure')
const { Buyer } = require('../buyer')

class ContactsCollection extends Array { }

const ApartmentBuyer = attributes({
  id: {
    type: Number,
    default: null
  },
  lookingFor: String,
  name: String,
  authorID: {
    type: Number,
    nullable: true
  },
  responsibleID: {
    type: Number,
    nullable: true
  },
  buyerStatus: {
    type: Number,
    default: 1
  },
  contract: {
    type: String,
    default: 'Немає'
  },
  motivation: String,
  source: {
    type: Number,
    nullable: true
  },
  reasonToBuy: String,
  description: String,
  createdAt: Date,
  updatedAt: Date,
  expiresAt: {
    type: Date,
    nullable: true
  },
  noOfRooms: Number, // 1. Кількість кімнат
  districtID: {
    type: Number,
    nullable: true
  }, // 2. Район
  settlement: String,
  maxPrice: Number, // 3. Ціна (max)
  material: Number, // 4. Вид
  buildingType: Number, // 5. Тип
  floor: {
    type: Number,
    default: 1
  }, // 6. Поверх (вибір між перший, середній, останній)
  isRenovated: Boolean, // 7. Ремонт
  autonomousHeat: Boolean, // 8. Автономне опалення

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
  soldBy: {
    type: Number,
    nullable: true
  },

  /* JOINED PARAMS */
  authorName: String,
  responsibleName: String,
  districtName: String,
  isSaved: {
    type: Boolean,
    default: false
  },
  contacts: {
    type: ContactsCollection,
    itemType: require('../contact/contact')
  }
})(class ApartmentBuyer extends Buyer { })

module.exports = ApartmentBuyer
