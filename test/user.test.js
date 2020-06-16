/* eslint-env jest */
const User = require('../modules/user.js')

describe('Contructor initialization', () => {
  const user1 = new User('userone', 'userone@gmail.com', 'useroneHash')
  test('Username initialized property', () => {
    expect(user1.getUsername()).toEqual('userone')
  })

  test('Email initialized property', () => {
    expect(user1.getEmail()).toEqual('userone@gmail.com')
  })

  test('PassHash initialized property', () => {
    expect(user1.getPassHash()).toEqual('useroneHash')
  })

  test('Houses initialized property', () => {
    expect(user1.getHouses()).toEqual([])
  })
})

describe('User set and other functions', () => {
  const user2 = new User('user2', 'user2@gmail.com', 'user2Hash')
  test('Username can be changed.', () => {
    const username = 'new2'
    user2.setUsername(username)
    expect(user2.getUsername()).toEqual(username)
  })

  test('Email can be changed.', () => {
    const email = 'new2@gmail.com'
    user2.setEmail(email)
    expect(user2.getEmail()).toEqual(email)
  })

  test('PassHash can be changed', () => {
    const PassHash = 'new2pass'
    user2.setPassHash(PassHash)
    expect(user2.getPassHash()).toEqual(PassHash)
  })

  test('Houses can be added', () => {
    const house = 'MyHome'
    const house2 = 'MyHome2'
    user2.addHouse(house)
    user2.addHouse(house2)
    expect(user2.getHouses()).toContain(house)
  })

  test('Only added Houses can be removed', () => {
    const noOfHouses = user2.getHouses().length
    const house = 'MyHome'
    const nonAddedHouse = 'Nohouse'
    user2.removeHouse(house)
    user2.removeHouse(nonAddedHouse)
    expect(user2.getHouses().length).toEqual(noOfHouses - 1)
  })
})
