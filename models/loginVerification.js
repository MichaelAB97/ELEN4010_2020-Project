'use strict'
const bcrypt = require('bcryptjs')

const isRegistered = function (users, username) {
  const user = users.filter(user => user.username === username)

  if (user.length === 0) { return false }

  return true
}

const verifyPassword = function (users, username, password) {
  const user = users.filter(user => user.username === username)
  if (bcrypt.compareSync(password, user[0].password) && user[0].username === username) { return true }

  return false
}

const getUser = function (users, username) {
  if (isRegistered(users, username)) {
    const user = users.filter(user => user.username === username)
    return user[0]
  }
  return {}
}

module.exports = {
  isRegistered: isRegistered,
  verifyPassword: verifyPassword,
  getUser: getUser
}
