class User {
  constructor (username, email, passHash) {
    this.username = username
    this.email = email
    this.passHash = passHash
    this.houses = []
  }

  getUsername () {
    return this.username
  }

  getEmail () {
    return this.email
  }

  getPassHash () {
    return this.passHash
  }

  getHouses () {
    return this.houses
  }

  setUsername (username) {
    this.username = username
  }

  setEmail (email) {
    this.email = email
  }

  setPassHash (passHash) {
    this.passHash = passHash
  }

  addHouse (house) {
    this.houses.push(house)
  }

  removeHouse (house) {
    const index = this.houses.indexOf(house)
    if (index > -1) {
      this.houses.splice(index, 1)
    }
  }
}

module.exports = User
