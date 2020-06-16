const path = require('path')
const database = require('./modules/database/db-connections')
const houseCreation = require('./modules/houseCreation')
const profileData = require('./modules/database/db-profile-functions')
const router = require('express').Router()

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'default.html'))
})

router.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'about.html'))
})

// house creation
router.post('/views/createHouse', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'createHouse.html'))
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
module.exports = router
