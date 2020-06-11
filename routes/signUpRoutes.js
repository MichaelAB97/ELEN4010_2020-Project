'use strict'

let path = require('path')
let express = require('express')
let router = express.Router()
let db = require('../modules/database/db-connections')
let signUpCheck = require('../models/signUpCheck')
const bcrypt = require('bcryptjs')
let salt = bcrypt.genSaltSync(10)

router.get('/signUp', function (_req, res) {
    res.sendFile(path.join(__dirname, '../views', 'signUp.html'))
  })

// Reading user credentials for signing up
router.post('/api/signUp', function (req, res) {
    // Get the user input
    const { username, email, password, confirmPassword } = req.body

    // generate hash of password and confirm password
    const passhash = bcrypt.hashSync(password, salt)
    const confirmPasswordHash = bcrypt.hashSync(confirmPassword, salt)
  
    db.pools
      .then((pool) => {
        return pool.request()
          .query('SELECT * FROM BillCleave.Users')
      })
      .then(result => {
        // check if user doesn't exist in the data base

        if(signUpCheck.SignUpEmail(result.recordset, email)){
            // Store details of new user if passwords match
            db.pools
              .then((pool) => {
                return pool.request()
                  .query('INSERT INTO BillCleave.Users (username, email, password) VALUES (\'' + username + '\',\'' + email + '\',\'' + passhash + '\')')
              })
            res.redirect('/')

        } else{
            res.redirect('/login')
        }

      })
      .catch(err => {
        console.log(err)
      })
  })

  module.exports = router