const path = require('path')
const database = require('./modules/database/db-connections')
const houseCreation = require('./modules/houseCreation')
// const profileData = require('./modules/database/db-profile-functions')
const router = require('express').Router()

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'default.html'))
})

router.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'about.html'))
})

router.post('/api/create', function (req, res) {
  const houseName = req.body.HouseName

  database.pools
    .then((pool) => {
      return pool.request()
        .query('SELECT * FROM BillCleave.Houses')
    })
    .then(result => {
      if (houseCreation.houseExists(result.recordset, houseName)) {
        console.log('house name already exist')
        res.redirect('/createHouse')
      } else {
        // const query = 'INSERT INTO BillCleave.Houses (housename) VALUES (\'' + houseName + '\')'
        profileData.createHouse(houseName, req.session.username)
        res.redirect('/login/home')
      }
    })
})

router.get('/signUp', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'signUp.html'))
})

// Updating user information
const user1 = {
  name: 'username',
  email: 'user@domain.com',
  password: 'default'
}

router.get('/edit', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'edit.html'))
})

router.post('/api/edit', function (req, res) {
  // const { username, email, userID } = req.body
  user1.name = req.body.username
  user1.email = req.body.email
  user1.password = req.body.password
  console.log('editing a student entry', req.body)
  res.redirect(req.baseUrl + '/api/list')
})

router.get('/api/list', function (req, res) {
  // res.json(user1) // Respond with JSON
  res.sendFile(path.join(__dirname, 'views', 'profile.html'))
})

module.exports = router
