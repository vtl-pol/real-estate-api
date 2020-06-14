const moment = require('moment')

module.exports = [
  {
    name: 'Гончаренко Степан',
    birthday: moment('14-05-1990', 'DD-MM-YYYY').format(),
    phones: [
      {
        phone: '(099) 033 2211',
        isOnViber: false,
        isOnTelegram: true,
        isOnFacebook: false,
        isOnWhatsapp: false
      }
    ]
  },
  {
    name: 'Євген Гонта',
    birthday: moment('31-12-1980', 'DD-MM-YYYY').format(),
    phones: [
      {
        phone: '(095) 717 2166',
        isOnViber: false,
        isOnTelegram: false,
        isOnFacebook: false,
        isOnWhatsapp: true
      },
      {
        phone: '(093) 777 1625',
        isOnViber: true,
        isOnTelegram: false,
        isOnFacebook: false,
        isOnWhatsapp: true
      },
      {
        phone: '(096) 112 2631',
        isOnViber: false,
        isOnTelegram: false,
        isOnFacebook: false,
        isOnWhatsapp: false
      }
    ]
  },
  {
    name: 'Анна Сергіївна',
    birthday: moment('14-05-1987', 'DD-MM-YYYY').format(),
    phones: [
      {
        phone: '(095) 222 2222',
        isOnViber: true,
        isOnTelegram: true,
        isOnFacebook: true,
        isOnWhatsapp: false
      }
    ]
  },
  {
    name: 'Олена ІТ',
    birthday: moment('14-05-1987', 'DD-MM-YYYY').format(),
    phones: [
      {
        phone: '(093) 333 3333',
        isOnViber: true,
        isOnTelegram: true,
        isOnFacebook: true,
        isOnWhatsapp: false
      }
    ]
  },
  {
    name: 'Ігор Марченко',
    birthday: moment('14-05-1976', 'DD-MM-YYYY').format(),
    phones: [
      {
        phone: '(954) 444 4444',
        isOnViber: true,
        isOnTelegram: true,
        isOnFacebook: false,
        isOnWhatsapp: false
      }
    ]
  },
  {
    name: 'Цукерберг Марк Едвардович',
    birthday: moment('14-05-1976', 'DD-MM-YYYY').format(),
    phones: [
      {
        phone: '(095) 550 5050',
        isOnViber: false,
        isOnTelegram: false,
        isOnFacebook: true,
        isOnWhatsapp: false
      }
    ]
  },
  {
    name: 'Лілія С.',
    birthday: moment('14-05-1976', 'DD-MM-YYYY').format(),
    phones: [
      {
        phone: '(093) 551 5050',
        isOnViber: false,
        isOnTelegram: false,
        isOnFacebook: true,
        isOnWhatsapp: false
      }
    ]
  },
  {
    name: 'Катя МТС',
    birthday: moment('14-05-1976', 'DD-MM-YYYY').format(),
    phones: [
      {
        phone: '(093) 551 5050',
        isOnViber: false,
        isOnTelegram: false,
        isOnFacebook: false,
        isOnWhatsapp: false
      },
      {
        phone: '(095) 711 5050',
        isOnViber: false,
        isOnTelegram: true,
        isOnFacebook: true,
        isOnWhatsapp: false
      },
      {
        phone: '(093) 000 5050',
        isOnViber: false,
        isOnTelegram: true,
        isOnFacebook: true,
        isOnWhatsapp: false
      }
    ]
  }
]
