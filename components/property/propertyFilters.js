const phoneFormatter = require('phone-formatter')
const moment = require('moment')

module.exports = [
  {
    field: 'id',
    exec: (q, id) => q.where('properties.id', id)
  },
  {
    field: 'responsibleID',
    exec: (q, values) => q.whereIn('properties.responsibleID', values)
  },
  {
    field: 'phone',
    exec: (q, phone) => {
      phone = phoneFormatter.normalize(phone)
      return q.leftJoin('contacts_relations', 'contacts_relations.contactableID', '=', 'properties.id', 'contacts_relations.contactableType', '=', 'properties')
        .leftJoin('contacts', 'contacts_relations.contactID', '=', 'contacts.id')
        .leftJoin('phones', 'phones.contactID', '=', 'contacts.id')
        .where('phones.phone', 'LIKE', `%${phone}%`)
    }
  },
  {
    field: 'settlement',
    exec: (q, values) => q.whereIn('properties.settlement', values)
  },
  {
    field: 'districtID',
    exec: (q, values) => q.whereIn('properties.districtID', values)
  },
  {
    field: 'street',
    exec: (q, values) => q.whereIn('properties.street', values)
  },
  {
    field: 'buildingType',
    exec: (q, values) => q.whereIn('properties.buildingType', values)
  },
  {
    field: 'createdAt',
    exec: (q, createdAt) => {
      if (createdAt.from !== undefined && createdAt.till !== undefined) {
        return q.whereBetween('properties.createdAt', [moment(createdAt.from, 'DD-MM-YYYY').startOf('day').format(), moment(createdAt.till, 'DD-MM-YYYY').endOf('day').format()])
      } else if (createdAt.from !== undefined) {
        return q.where('properties.createdAt', '>=', moment(createdAt.from, 'DD-MM-YYYY').startOf('day').format())
      } else if (createdAt.till !== undefined) {
        return q.where('properties.createdAt', '<=', moment(createdAt.till, 'DD-MM-YYYY').endOf('day').format())
      } else {
        return q
      }
    }
  },
  {
    field: 'price',
    exec: (q, price) => {
      if (price.from !== undefined && price.till !== undefined) {
        return q.whereBetween('properties.price', [price.from, price.till])
      } else if (price.from !== undefined) {
        return q.where('properties.price', '>=', price.from)
      } else if (price.till !== undefined) {
        return q.where('properties.price', '<=', price.till)
      } else {
        return q
      }
    }
  },
  {
    field: 'propertyStatus',
    exec: (q, values) => q.whereIn('properties.propertyStatus', values)
  },
  {
    field: 'contract',
    exec: (q, values) => q.whereIn('properties.contract', values)
  },
  {
    field: 'motivation',
    exec: (q, values) => q.whereIn('properties.motivation', values)
  },
  {
    field: 'buildingType',
    exec: (q, values) => q.whereIn('properties.buildingType', values)
  },
  {
    field: 'material',
    exec: (q, values) => q.whereIn('properties.material', values)
  },
  {
    field: 'floor',
    exec: (q, floor) => {
      if (floor.from !== undefined && floor.till !== undefined) {
        return q.whereBetween('properties.floor', [floor.from, floor.till])
      } else if (floor.from !== undefined) {
        return q.where('properties.floor', '>=', floor.from)
      } else if (floor.till !== undefined) {
        return q.where('properties.floor', '<=', floor.till)
      } else {
        return q
      }
    }
  },
  {
    field: 'floors',
    exec: (q, floors) => q.where('properties.floors', floors)
  },
  {
    field: 'noOfRooms',
    exec: (q, values) => q.whereIn('properties.noOfRooms', values)
  },
  {
    field: 'autonomousHeat',
    exec: (q, value) => q.where('properties.autonomousHeat', (value === 'true'))
  },
  {
    field: 'squareTotal',
    exec: (q, squareTotal) => {
      if (squareTotal.from !== undefined && squareTotal.till !== undefined) {
        return q.whereBetween('properties.squareTotal', [squareTotal.from, squareTotal.till])
      } else if (squareTotal.from !== undefined) {
        return q.where('properties.squareTotal', '>=', squareTotal.from)
      } else if (squareTotal.till !== undefined) {
        return q.where('properties.squareTotal', '<=', squareTotal.till)
      } else {
        return q
      }
    }
  },
  {
    field: 'squareLiving',
    exec: (q, squareLiving) => {
      if (squareLiving.from !== undefined && squareLiving.till !== undefined) {
        return q.whereBetween('properties.squareLiving', [squareLiving.from, squareLiving.till])
      } else if (squareLiving.from !== undefined) {
        return q.where('properties.squareLiving', '>=', squareLiving.from)
      } else if (squareLiving.till !== undefined) {
        return q.where('properties.squareLiving', '<=', squareLiving.till)
      } else {
        return q
      }
    }
  },
  {
    field: 'squareKitchen',
    exec: (q, squareKitchen) => {
      if (squareKitchen.from !== undefined && squareKitchen.till !== undefined) {
        return q.whereBetween('properties.squareKitchen', [squareKitchen.from, squareKitchen.till])
      } else if (squareKitchen.from !== undefined) {
        return q.where('properties.squareKitchen', '>=', squareKitchen.from)
      } else if (squareKitchen.till !== undefined) {
        return q.where('properties.squareKitchen', '<=', squareKitchen.till)
      } else {
        return q
      }
    }
  },
  {
    field: 'renovated',
    exec: (q, value) => q.where('properties.renovated', (value === 'true'))
  },
  /** House Fields **/
  {
    field: 'squareLand',
    exec: (q, squareLand) => {
      if (squareLand.from !== undefined && squareLand.till !== undefined) {
        return q.whereBetween('properties.squareLand', [squareLand.from, squareLand.till])
      } else if (squareLand.from !== undefined) {
        return q.where('properties.squareLand', '>=', squareLand.from)
      } else if (squareLand.till !== undefined) {
        return q.where('properties.squareLand', '<=', squareLand.till)
      } else {
        return q
      }
    }
  },
  {
    field: 'garage',
    exec: (q, value) => q.where('properties.garage', value)
  },
  /** Archive Filters **/
  {
    field: 'archivedAt',
    exec: (q, archivedAt) => {
      if (archivedAt.from !== undefined && archivedAt.till !== undefined) {
        return q.whereBetween('archivedAt', [moment(archivedAt.from, 'DD-MM-YYYY').startOf('day').format(), moment(archivedAt.till, 'DD-MM-YYYY').endOf('day').format()])
      } else if (archivedAt.from !== undefined) {
        return q.where('archivedAt', '>=', moment(archivedAt.from, 'DD-MM-YYYY').startOf('day').format())
      } else if (archivedAt.till !== undefined) {
        return q.where('archivedAt', '<=', moment(archivedAt.till, 'DD-MM-YYYY').endOf('day').format())
      } else {
        return q
      }
    }
  },
  {
    field: 'archivedTill',
    exec: (q, archivedTill) => {
      if (archivedTill.from !== undefined && archivedTill.till !== undefined) {
        return q.whereBetween('archivedTill', [moment(archivedTill.from, 'DD-MM-YYYY').startOf('day').format(), moment(archivedTill.till, 'DD-MM-YYYY').endOf('day').format()])
      } else if (archivedTill.from !== undefined) {
        return q.where('archivedTill', '>=', moment(archivedTill.from, 'DD-MM-YYYY').startOf('day').format())
      } else if (archivedTill.till !== undefined) {
        return q.where('archivedTill', '<=', moment(archivedTill.till, 'DD-MM-YYYY').endOf('day').format())
      } else {
        return q
      }
    }
  },
  {
    field: 'archivedReason',
    exec: (q, values) => q.whereIn('archivedReason', values)
  }
]
