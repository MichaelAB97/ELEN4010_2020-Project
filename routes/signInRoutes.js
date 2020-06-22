'use strict'

const path = require('path')
const router = require('express').Router()
const database = require('../modules/database/db-connections')
const loginCkeck = require('../models/loginVerification')

const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect('/login')
  } else {
    next()
  }
}

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'login.html'))
})

router.get('/unauth', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'unauthorised.html'))
})

router.get('/home', redirectLogin, function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'profile.html'))
})

router.get('/api/user', redirectLogin, function (req, res) {
  let User = { username: 'Undefined' }
  database.pools
    .then((pool) => {
      return pool.request()
        .query('SELECT * FROM BillCleave.Users')
    })
    .then(result => {
      User = loginCkeck.getUser(result.recordset, req.session.username)
      res.json(User)
    })
})

router.post('/api', function (req, res) {
  const { username, password } = req.body
  if (!username || !password) {
    console.log('One of both of the fields are empty')
    return res.status(400).redirect('/login')
  }

  database.pools
    .then((pool) => {
      return pool.request()
        .query('SELECT * FROM BillCleave.Users')
    })
    .then(result => {
      if (loginCkeck.isRegistered(result.recordset, username)) {
        if (loginCkeck.verifyPassword(result.recordset, username, password)) {
          // start the session
          const User = loginCkeck.getUser(result.recordset, username)
          req.session.userId = User.userId
          req.session.username = User.username
          req.session.email = User.email

          res.status(200).redirect('/login/home')
        } else {
          return res.status(401).redirect('/login/unauth')
        }
      } else {
        return res.status(401).redirect('/login/unauth')
      }
    })
})

router.post('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/')
    }
  })
})
module.exports = router
