class House {
  constructor (admin, houseName) {
    this.admin = admin
    this.houseName = houseName
    this.ListOfMembers = []
    this.expenseRecord = []
  }

  getAdmin () {
    return this.admin
  }

  getHouseName () {
    return this.houseName
  }

  getHouseMembers () {
    return this.ListOfMembers
  }

  getExpenseRecord () {
    return this.expenseRecord
  }

  setAdmin (admin) {
    this.admin = admin
  }

  setHouseName (houseName) {
    this.houseName = houseName
  }

  addHouseMember (member) {
    this.ListOfMembers.push(member)
  }

  removeHouseMember (member) {
    const index = this.ListOfMembers.indexOf(member)
    if (index > -1) {
      this.ListOfMembers.splice(index, 1)
    }
  }

  addToExpenseRecord (expense) {
    this.expenseRecord.push(expense)
  }
}

module.exports = House
