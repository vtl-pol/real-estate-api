const { attributes } = require('structure')

const ApartmentBuyer = attributes({
  id: {
    type: Number,
    default: null
  },
  lookingFor: String,
  name: String,
  phone: Number,
  birthday: Date,
  isOnViber: Boolean,
  isOnTelegram: Boolean,
  isOnFacebook: Boolean,
  isOnWhatsapp: Boolean,
  authorID: Number,
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
  districtID: Number, // 2. Район
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
  authorName: String
})(class ApartmentBuyer { })

module.exports = ApartmentBuyer
