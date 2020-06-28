const { attributes } = require('structure')

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
  phone: Number,
  email: {
    type: String,
    required: true
  },
  password: {
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
    return this.role === User.ROLE_ADMIN
  }

  isManager () {
    return this.isAdmin() || (this.role === User.ROLE_MANAGER)
  }

  isAgent () {
    return this.isAdmin() || (this.role === User.ROLE_AGENT)
  }

  isGuest () {
    return this.role === User.ROLE_GUEST
  }
})

User.RANK_NONE = null
User.RANK_INTERN = 1
User.RANK_NEWBIE = 2
User.RANK_AGENT = 3
User.RANK_PROFESSIONAL = 4

User.ROLE_GUEST = 0
User.ROLE_AGENT = 1
User.ROLE_MANAGER = 2
User.ROLE_ADMIN = 3

module.exports = User
