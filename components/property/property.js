class Property {
  restrictFor (user) {
    if (user.isAdmin()) return

    const guestUser = (!user || user.isGuest())
    const restrictedView = (this.source === 1 && !(this.responsibleID === user.id && user.isAgent()))

    if (guestUser || restrictedView) {
      this.contacts = undefined
      this.houseNo = undefined
      this.aptNo = undefined
    }
  }

  editableBy (user) {
    if (user.isAdmin()) return true
    if (user.isGuest()) return false

    if (user.isManager()) return (this.source !== 1 || user.id === this.responsibleID)

    return (user.id === this.responsibleID)
  }
}

module.exports = Property
