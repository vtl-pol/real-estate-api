const phoneFormatter = require('phone-formatter')
const moment = require('moment')

module.exports = [
  {
    field: 'id',
    exec: (q, id) => q.where('buyers.id', id)
  },
  {
    field: 'phoneOrID',
    exec: (q, phoneOrID) => {
      phoneOrID = phoneFormatter.normalize(phoneOrID)
      return q.leftJoin('contacts_relations', 'contacts_relations.contactableID', '=', 'buyers.id', 'contacts_relations.contactableType', '=', 'buyers')
        .leftJoin('contacts', 'contacts_relations.contactID', '=', 'contacts.id')
        .leftJoin('phones', 'phones.contactID', '=', 'contacts.id')
        .where(function () {
          return this.where('phones.phone', 'LIKE', `%${phoneOrID}%`)
            .orWhere('buyers.id', 'LIKE', `%${phoneOrID}%`)
        })
    }
  },
  {
    field: 'name',
    exec: (q, name) => {
      return q.leftJoin('contacts_relations', 'contacts_relations.contactableID', '=', 'buyers.id', 'contacts_relations.contactableType', '=', 'buyers')
        .leftJoin('contacts', 'contacts_relations.contactID', '=', 'contacts.id')
        .where('contacts.name', 'LIKE', `%${name}%`)
    }
  },
  {
    field: 'phone',
    exec: (q, phone) => {
      phone = phoneFormatter.normalize(phone)
      return q.leftJoin('contacts_relations', 'contacts_relations.contactableID', '=', 'buyers.id', 'contacts_relations.contactableType', '=', 'buyers')
        .leftJoin('contacts', 'contacts_relations.contactID', '=', 'contacts.id')
        .leftJoin('phones', 'phones.contactID', '=', 'contacts.id')
        .where('phones.phone', 'LIKE', `%${phone}%`)
    }
  },
  {
    field: 'responsibleID',
    exec: (q, values) => q.whereIn('buyers.responsibleID', values)
  },
  {
    field: 'settlement',
    exec: (q, values) => q.whereIn('buyers.settlement', values)
  },
  {
    field: 'districtID',
    exec: (q, values) => q.whereIn('buyers.districtID', values)
  },
  {
    field: 'createdAt',
    exec: (q, createdAt) => {
      if (createdAt.from !== undefined && createdAt.till !== undefined) {
        return q.whereBetween('buyers.createdAt', [moment(createdAt.from, 'DD-MM-YYYY').startOf('day').format(), moment(createdAt.till, 'DD-MM-YYYY').endOf('day').format()])
      } else if (createdAt.from !== undefined) {
        return q.where('buyers.createdAt', '>=', moment(createdAt.from, 'DD-MM-YYYY').startOf('day').format())
      } else if (createdAt.till !== undefined) {
        return q.where('buyers.createdAt', '<=', moment(createdAt.till, 'DD-MM-YYYY').endOf('day').format())
      } else {
        return q
      }
    }
  },
  {
    field: 'maxPrice',
    exec: (q, maxPrice) => {
      if (maxPrice.from !== undefined && maxPrice.till !== undefined) {
        return q.whereBetween('buyers.maxPrice', [maxPrice.from, maxPrice.till])
      } else if (maxPrice.from !== undefined) {
        return q.where('buyers.maxPrice', '>=', maxPrice.from)
      } else if (maxPrice.till !== undefined) {
        return q.where('buyers.maxPrice', '<=', maxPrice.till)
      } else {
        return q
      }
    }
  },
  {
    field: 'buyerStatus',
    exec: (q, values) => q.whereIn('buyers.buyerStatus', values)
  },
  {
    field: 'contract',
    exec: (q, values) => q.whereIn('buyers.contract', values)
  },
  {
    field: 'motivation',
    exec: (q, values) => q.whereIn('buyers.motivation', values)
  },
  {
    field: 'buildingType',
    exec: (q, values) => q.whereIn('buyers.buildingType', values)
  },
  {
    field: 'material',
    exec: (q, values) => q.whereIn('buyers.material', values)
  },
  {
    field: 'floor',
    exec: (q, floor) => q.whereIn('buyers.floor', floor)
  },
  {
    field: 'isRenovated',
    exec: (q, value) => q.where('buyers.isRenovated', (value === 'true'))
  },
  {
    field: 'autonomousHeat',
    exec: (q, value) => q.where('buyers.autonomousHeat', (value === 'true'))
  },
  /** House Filters **/
  {
    field: 'noOfRooms',
    exec: (q, values) => q.whereIn('buyers.noOfRooms', values)
  },
  {
    field: 'range',
    exec: (q, values) => q.whereIn('buyers.range', values)
  },
  {
    field: 'squareTotal',
    exec: (q, squareTotal) => {
      if (squareTotal.from !== undefined && squareTotal.till !== undefined) {
        return q.whereBetween('buyers.squareTotal', [squareTotal.from, squareTotal.till])
      } else if (squareTotal.from !== undefined) {
        return q.where('buyers.squareTotal', '>=', squareTotal.from)
      } else if (squareTotal.till !== undefined) {
        return q.where('buyers.squareTotal', '<=', squareTotal.till)
      } else {
        return q
      }
    }
  },
  {
    field: 'squareLand',
    exec: (q, squareLand) => {
      if (squareLand.from !== undefined && squareLand.till !== undefined) {
        return q.whereBetween('buyers.squareLand', [squareLand.from, squareLand.till])
      } else if (squareLand.from !== undefined) {
        return q.where('buyers.squareLand', '>=', squareLand.from)
      } else if (squareLand.till !== undefined) {
        return q.where('buyers.squareLand', '<=', squareLand.till)
      } else {
        return q
      }
    }
  },
  {
    field: 'hasGarage',
    exec: (q, value) => q.where('buyers.hasGarage', (value === 'true'))
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
