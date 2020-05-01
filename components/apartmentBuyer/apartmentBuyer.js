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
  responsibleID: Number,
  buyerStatus: Number,
  contract: String,
  motivation: String,
  source: Number,
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
    default: 0
  }, // 6. Поверх (вибір між перший, середній, останній)
  isRenovated: Boolean, // 7. Ремонт
  autonomousHeat: Boolean, // 8. Автономне опалення

  /* JOINED PARAMS */
  authorName: String
})(class ApartmentBuyer { })

module.exports = ApartmentBuyer
