'use strict'

const isInHouseList = function (houseList, newHouseName) {
  const house = houseList.filter(user => houseList.houseNmae === newHouseName)

  if (house.length === 0) { return false }

  return true
}

module.exports = {
  isInHouseList: isInHouseList
}
