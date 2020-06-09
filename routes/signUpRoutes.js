'use strict'

let path = require('path')
let express = require('express')
let router = express.Router()
let db = require('../modules/database/db-connections')
const bcrypt = require('bcryptjs')

let User = require('../modules/user')
let salt = bcrypt.genSaltSync(10)

router.get('/signUp', function (_req, res) {
    res.sendFile(path.join(__dirname, '../views', 'signUp.html'))
  })

// Reading user credentials for signing up
router.post('/api/signUp', function (req, res) {
    // Get the user input
    const { username, email, password, confirmPassword } = req.body

    // generate hash of password
    const passhash = bcrypt.hashSync(password, salt)
    // hash the confirm password
    const confirmPasswordHash = bcrypt.hashSync(confirmPassword, salt)
  
    db.pools
      .then((pool) => {
        return pool.request()
          .query('SELECT * FROM BillCleave.Users')
      })
      .then(result => {
          User.username = username
          User.email = email
        // check if user already exists in the data base
        console.log(User)
  
        if (User.findIndex(function (user) {
            return User.email === email
              })!==-1) {
                  console.log('Im am msms')
  
          // Store details of new user if passwords match
            db.pools
              .then((pool) => {
                return pool.request()
                  .query('INSERT INTO BillCleave.Users (username, email, password) VALUES (\'' + username + '\',\'' + email + '\',\'' + passhash + '\')')
              })
            res.redirect('/')
        } else {
          res.redirect('/login')
        }

      })
      .catch(err => {
        console.log(err)
      })
  })

  module.exports = router