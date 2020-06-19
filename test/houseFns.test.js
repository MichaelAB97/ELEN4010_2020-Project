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
