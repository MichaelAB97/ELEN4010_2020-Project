'use strict'

const { username } = require('../config/database')

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

const getUserHouses = function (UserHouseList, username) {
  const userHouses = UserHouseList.filter(userHouse => userHouse.username === username)
  return userHouses
}

const getHouseMembers = function (UserHouseList, houseName) {
  const housesMembers = UserHouseList.filter(houseMember => houseMember.houseName === houseName)
  return housesMembers
}

const getExpenseTransactions = function (UserHouseList, housename, amount, userId) {
  const houseMembers = getHouseMembers(UserHouseList, housename).filter(member => !(member.userId === userId))
  const pricePerMember = parseInt(amount)/parseInt(houseMembers.length + 1)

  houseMembers.forEach(member => {
    member.amount = pricePerMember
  })
  return houseMembers
}

module.exports = {
  isInHouseList: isInHouseList,
  getHouseId: getHouseId,
  getUserHouses: getUserHouses,
  getHouseMembers: getHouseMembers,
  getExpenseTransactions: getExpenseTransactions
}
