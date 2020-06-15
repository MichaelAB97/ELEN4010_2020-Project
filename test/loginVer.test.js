'use strict'

/* eslint-env jest */
const loginVer = require('../models/loginVerification')
const bcrypt = require('bcryptjs')

describe('log In verification', () => {
  // mock -db results
  const Users = [
    { userId: 1, username: 'Madix', email: 'madix@gmail.com', password: bcrypt.hashSync('madpass') },
    { userId: 2, username: 'Diz', email: 'Diz@gmail.com', password: bcrypt.hashSync('Dizpass') },
    { userId: 3, username: 'Nutz', email: 'Nutz@gmail.com', password: bcrypt.hashSync('Nutzpass') },
    { userId: 4, username: 'Tickles', email: 'Tickles@gmail.com', password: bcrypt.hashSync('Ticklespass') },
    { userId: 5, username: 'Tes', email: 'Tes@gmail.com', password: bcrypt.hashSync('Tespass') }
  ]
  test('check existing user\'s username', () => {
    const username = 'Madix'
    expect(loginVer.isRegistered(Users, username)).toEqual(true)
  })

  test('check non - existing user\'s username', () => {
    const username = 'mad'
    expect(loginVer.isRegistered(Users, username)).toEqual(false)
  })

  test('check existing user\'s password', () => {
    const password = 'Tespass'
    const username = 'Tes'
    expect(loginVer.verifyPassword(Users, username, password)).toEqual(true)
  })
  test('check existing user\'s password', () => {
    const password = 'Ticklespass'
    const username = 'Diz'
    expect(loginVer.verifyPassword(Users, username, password)).toEqual(false)
  })

  test('Getting existing user from the db list', () => {
    const user = Users[1]
    const username = 'Diz'
    expect(loginVer.getUser(Users, username)).toEqual(user)
  })

  test('Getting non existing user from the db list', () => {
    const user = {}
    const username = 'Max'
    expect(loginVer.getUser(Users, username)).toEqual(user)
  })
})
