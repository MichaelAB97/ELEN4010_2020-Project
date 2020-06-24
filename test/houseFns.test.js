'use strict'

const HouseFns = require('../models/houseFns')

const Houses = [
  { houseId: 1, houseName: 'house1' },
  { houseId: 2, houseName: 'house2' },
  { houseId: 3, houseName: 'house3' },
  { houseId: 4, houseName: 'house4' }
]
describe('House Management Functions', () => {
  test('check if house exist', () => {
    const houseName = 'house1'
    expect(HouseFns.isInHouseList(Houses, houseName)).toEqual(true)
  })

  test('check if house does not exist', () => {
    const houseName = 'house10'
    expect(HouseFns.isInHouseList(Houses, houseName)).toEqual(false)
  })
  test('Get house Id of Existing house', () => {
    const houseName = 'house1'
    const houseId = 1
    expect(HouseFns.getHouseId(Houses, houseName)).toEqual(houseId)
  })

  test('Get house Id of non Existing house', () => {
    const houseName = 'house10'
    const houseId = 0
    expect(HouseFns.getHouseId(Houses, houseName)).toEqual(houseId)
  })
})

const userHouseList = [
  { houseId: 1, houseName: 'house1', userId: 1, username: 'user1', email: 'user1@email.com', firstName: 'First', lastName: 'Myone', mobileNumber: '0123456789' },
  { houseId: 2, houseName: 'house2', userId: 2, username: 'user2', email: 'user2@email.com', firstName: 'Second', lastName: 'Mytwo', mobileNumber: '0234567891' },
  { houseId: 3, houseName: 'house3', userId: 3, username: 'user3', email: 'user3@email.com', firstName: 'Third', lastName: 'Mythree', mobileNumber: '0345678912' },
  { houseId: 4, houseName: 'house3', userId: 4, username: 'user4', email: 'user4@email.com', firstName: 'Fourth', lastName: 'Myfour', mobileNumber: '0456789123' },
  { houseId: 5, houseName: 'house5', userId: 5, username: 'user5', email: 'user5@email.com', firstName: 'Fifth', lastName: 'Myfive', mobileNumber: '0567891234' }
]
describe('User-House Management Functions', () => {
  test('Get user houses', () => {
    const username = 'user1'
    const userhouses = HouseFns.getUserHouses(userHouseList, username)
    expect(userhouses.length).toEqual(1)
  })

  test('Get House members', () => {
    const houseName = 'house3'
    const userhouses = HouseFns.getHouseMembers(userHouseList, houseName)
    expect(userhouses.length).toEqual(2)
  })
})

describe('House Transaction Management Function', () => {
  test('Get House members with amount owing', () => {
    const houseName = 'house3'
    const userID = 3
    const amount = 200
    const houseMembers = HouseFns.getExpenseTransactions(userHouseList, houseName, amount, userID)
    expect(parseInt(houseMembers[0].amount)).toEqual(amount / (houseMembers.length + 1))
  })
})
