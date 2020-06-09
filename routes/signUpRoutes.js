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
    const confirmPasswordHash = bcrypt.hashSync(confirmpassword, salt)
  
    db.pools
      .then((pool) => {
        return pool.request()
          .query('SELECT * FROM users')
      })
      .then(result => {
          // check if user already exists in the data base
        //let confirmemail = signUpVer.verifySignUpEmail(result.recordset, email)
  
        if (passhash===confirmPasswordHash) {
  
          // Store details of new user if passwords match
          //if (isPasswordsMatch && passWordLength && validCellphone) {
            db.pools
              .then((pool) => {
                return pool.request()
                  .query('INSERT INTO users (username, email, passHash) VALUES (\'' + username + '\',\'' + email + '\',\'' + passhash + '\')')
              })
            res.redirect('/')
          //} else {
            //res.redirect('/login')
          //}
        } else {
          res.redirect('/signUp')
        }
      })
      .catch(err => {
        console.log(err)
      })
  })

  module.exports = router