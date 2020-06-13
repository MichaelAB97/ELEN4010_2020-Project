/* eslint-env jest */
const House = require('../modules/house.js')

describe('House contructor initialization', () => {
  const house1 = new House('houseAdmin', 'House001')
  test('House admin initialized property', () => {
    expect(house1.getAdmin()).toEqual('houseAdmin')
  })

  test('House name initialized property', () => {
    expect(house1.getHouseName()).toEqual('House001')
  })

  test('House member list initialized property', () => {
    expect(house1.getHouseMembers()).toEqual([])
  })

  test('House expense List initialized property', () => {
    expect(house1.getExpenseRecord()).toEqual([])
  })
})

describe('House set and other functions', () => {
  const house2 = new House('houseAdmin2', 'House002')
  test('House Admin can be changed.', () => {
    const houseAdmin = 'Newadmin'
    house2.setAdmin(houseAdmin)
    expect(house2.getAdmin()).toEqual(houseAdmin)
  })

  test('House name can be changed.', () => {
    const housename = 'newHouse002'
    house2.setHouseName(housename)
    expect(house2.getHouseName()).toEqual(housename)
  })
  test('House members can be added', () => {
    const member1 = 'member1'
    const member2 = 'member2'
    house2.addHouseMember(member1)
    house2.addHouseMember(member2)
    expect(house2.getHouseMembers()).toContain(member1)
  })

  test('House members can be removed', () => {
    const noOfMembers = house2.getHouseMembers().length
    const member1 = 'member1'
    const nonAddedMember = 'NonMember'
    house2.removeHouseMember(member1)
    house2.removeHouseMember(nonAddedMember)
    expect(house2.getHouseMembers().length).toEqual(noOfMembers - 1)
  })

  test('House expenses can be added', () => {
    const expense1 = 'expense1'
    const expense2 = 'expense2'
    house2.addToExpenseRecord(expense1)
    house2.addToExpenseRecord(expense2)
    expect(house2.getExpenseRecord()).toContain(expense1)
  })
})
