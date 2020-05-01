const { attributes } = require('structure')

const HouseBuyer = attributes({
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
  range: {
    type: Number,
    default: 0,
    min: 0,
    max: 2
  }, // 2. Межа (місто, до 5 км, від 5 км)
  districtID: Number, // 3. Район (Автовокзал, Чайка, Північний, Центр, Ювілейний, Щасливе, Окраїна, Відін etc)
  maxPrice: Number, // 4. Ціна (max)
  material: Number, // 5. Вид
  buildingType: Number, // 6. Тип
  squareTotal: Number, // 7. Загальна площа до (max — (максимальна цифра 999))
  squareLand: Number, // 8. Площа ділянки від (min — (максимальна цифра 99))
  isRenovated: Boolean, // 9. Ремонт
  hasGarage: Boolean, // 10. Гараж

  /* JOINED PARAMS */
  authorName: String
})(class HouseBuyer { })

module.exports = HouseBuyer
