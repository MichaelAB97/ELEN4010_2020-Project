'use strict'

const houseExists = function (houseList, housename) {
  const house = houseList.filter(house => house.houseName === housename)

  if (house.length === 0) {
    return false
  } else {
    return true
  }
}

const userExists = function (houseUserList, username) {
  const houseUser = houseUserList.filter(houseUser => houseUser.username === username)
  if (houseUser.length === 0) {
    return false
  } else {
    return true
  }
}

module.exports = {
  houseExists: houseExists,
  userExists: userExists
}
