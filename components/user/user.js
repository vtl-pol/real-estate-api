const { attributes } = require('structure')
const phoneFormatter = require('phone-formatter')

const User = attributes({
  id: {
    type: Number,
    default: null,
    nullable: true
  },
  fullName: String,
  rank: {
    type: Number,
    default: null,
    nullable: true
  },
  role: {
    type: Number,
    default: 0
  },
  isOnContract: {
    type: Boolean,
    default: false
  },
  isOfficial: {
    type: Boolean,
    default: false
  },
  attachmentId: Number,
  phone: String,
  email: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date,
    required: true
  }
})(class User {
  isAdmin () {
    return this.role === User.ROLES.ADMIN.key
  }

  isManager () {
    return this.isAdmin() || (this.role === User.ROLES.MANAGER.key)
  }

  isAgent () {
    return this.isAdmin() || (this.role === User.ROLES.AGENT.key)
  }

  isGuest () {
    return this.role === User.ROLES.GUEST.key
  }

  get phone () {
    if (this.get('phone') !== '') {
      return phoneFormatter.format(this.get('phone').toString(), '(NNN) NNN NNNN')
    } else {
      return ''
    }
  }

  set phone (newPhone) {
    if (newPhone !== null && newPhone !== undefined) {
      return this.set('phone', phoneFormatter.normalize(newPhone.toString()))
    } else {
      return this.set('phone', null)
    }
  }
})

User.RANKS = {
  NONE: { key: null, name: 'Немає' },
  INTERN: { key: 1, name: 'Стажер' },
  NEWBIE: { key: 2, name: 'Новачок' },
  AGENT: { key: 3, name: 'Агент' },
  PROFESSIONAL: { key: 4, name: 'Професіонал' }
}

User.ROLES = {
  GUEST: { key: 1, name: 'Гість' },
  AGENT: { key: 2, name: 'Агент' },
  MANAGER: { key: 3, name: 'Офіс-Менеджер' },
  ADMIN: { key: 4, name: 'Адміністратор' }
}

module.exports = User
