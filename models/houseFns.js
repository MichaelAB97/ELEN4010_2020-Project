'use strict'

const isInHouseList = function (houseList, newHouseName) {
  const house = houseList.filter(house => house.houseName === newHouseName)

  if (house.length === 0) { return false }

  return true
}

const getHouseId = function (houseList, houseName) {
  const house = houseList.filter(house => house.houseName === houseName)

  if (house.length === 0) { return 0 }

  return house[0].houseId
}
module.exports = {
  isInHouseList: isInHouseList,
  getHouseId: getHouseId
}
