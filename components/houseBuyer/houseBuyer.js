const { attributes } = require('structure')
const { Buyer } = require('../buyer')

class ContactsCollection extends Array { }

const HouseBuyer = attributes({
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
  contract: String,
  motivation: String,
  source: {
    type: Number,
    nullable: true
  },
  reasonToBuy: String,
  description: String,
  createdAt: Date,
  updatedAt: Date,
  noOfRooms: Number, // 1. Кількість кімнат
  range: {
    type: Number,
    default: 1,
    min: 1,
    max: 3
  }, // 2. Межа (місто, до 5 км, від 5 км)
  districtID: {
    type: Number,
    nullable: true
  }, // 3. Район (Автовокзал, Чайка, Північний, Центр, Ювілейний, Щасливе, Окраїна, Відін etc)
  settlement: String,
  maxPrice: Number, // 4. Ціна (max)
  material: Number, // 5. Вид
  buildingType: Number, // 6. Тип
  squareTotal: Number, // 7. Загальна площа до (max — (максимальна цифра 999))
  squareLand: Number, // 8. Площа ділянки від (min — (максимальна цифра 99))
  isRenovated: Boolean, // 9. Ремонт
  hasGarage: Boolean, // 10. Гараж

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
})(class HouseBuyer extends Buyer { })

module.exports = HouseBuyer
