'use strict'

const path = require('path')
const router = require('express').Router()
const database = require('../modules/database/db-connections')
const HouseFns = require('../models/houseFns')

const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect('/login')
  } else {
    next()
  }
}

// house creation
router.post('/createHouse', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'createHouse.html'))
})

// house creation
router.post('/deleteHouse', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'deleteHouse.html'))
})

router.post('/api/createHouse', redirectLogin, function (req, res) {
  const houseName = req.body.houseName
  const username = req.session.username
  database.pools
    .then((pool) => {
      return pool.request()
        .query('SELECT * FROM BillCleave.Houses')
    })
    .then(result => {
      if (!HouseFns.isInHouseList(result.recordset, houseName)) {
        database.pools
          .then((pool) => {
            return pool.request()
              .query('INSERT INTO BillCleave.Houses  (houseName) VALUES (\'' + houseName + '\')')
          })
          .catch(err => {
            console.log(err)
          })

        database.pools
          .then((pool) => {
            return pool.request()
              .query('INSERT INTO BillCleave.UserHouseRelation (userId , houseId) SELECT userId,houseId FROM BillCleave.Users,BillCleave.Houses WHERE username = \'' + username + '\' AND houseName = \'' + houseName + '\'')
          })
          .catch(err => {
            console.log(err)
          })

        res.redirect('/login/home')
      } else {
        res.status(400).send('House name already exist, please choose a different name')
      }
    })
})

router.get('/api/houses', redirectLogin, function (req, res) {
  const username = req.session.username
  database.pools
    .then((pool) => {
      return pool.request()
        .query('SELECT houseName FROM BillCleave.Houses H JOIN BillCleave.UserHouseRelation UHR ON H.houseId = UHR.houseId JOIN BillCleave.Users U ON U.userId = UHR.userId WHERE username = \'' + username + '\'')
    })
    .then(result => {
      res.json(result.recordset)
    })
    .catch(err => {
      console.log(err)
    })
})

router.post('/api/deleteHouse', redirectLogin, function (req, res) {
  const houseName = req.body.houseName
  const userId = req.session.userId
  database.pools
    .then((pool) => {
      return pool.request()
        .query('SELECT * FROM BillCleave.Houses')
    })
    .then(result => {
      const houseId = HouseFns.getHouseId(result.recordset, houseName)
      if (!(houseId === 0)) {
        database.pools
          .then((pool) => {
            return pool.request()

              .query('DELETE FROM BillCleave.Houses WHERE  houseId =\'' + houseId + '\'')
          })
          .catch(err => {
            console.log(err)
          })

        database.pools
          .then((pool) => {
            return pool.request()

              .query('DELETE FROM BillCleave.UserHouseRelation WHERE userId = \'' + userId + '\'  AND houseId =\'' + houseId + '\'')
          })
          .catch(err => {
            console.log(err)
          })

        res.redirect('/login/home')
      } else {
        res.status(400).send('House name does not exist or you have not joined the given hosuse, choose a different name')
      }
    })
})
module.exports = router
