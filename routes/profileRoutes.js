'use strict'

const path = require('path')
const router = require('express').Router()
const database = require('../modules/database/db-connections')
const HouseFns = require('../models/houseFns')
const loginCkeck = require('../models/loginVerification')

const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect('/login')
  } else {
    next()
  }
}

// house creation
router.post('/createHouse', redirectLogin, function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'createHouse.html'))
})

router.post('/deleteHouse', redirectLogin, function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'deleteHouse.html'))
})

router.post('/manageHouses', redirectLogin, function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'manageHouses.html'))
})

router.get('/manageHouses', redirectLogin, function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'manageHouses.html'))
})

router.post('/houseTransactions', redirectLogin, function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'manageTransactions.html'))
})

router.get('/houseTransactions', redirectLogin, function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'manageTransactions.html'))
})

router.get('/api/userList', redirectLogin, function (req, res) {
  database.pools
    .then((pool) => {
      return pool.request()
        .query('SELECT * FROM BillCleave.Users')
    })
    .then(result => {
      const userList = result.recordset
      userList.forEach(user => { user.password = '********' })
      res.json(userList)
    })
    .catch(err => {
      console.log(err)
    })
})

router.get('/api/userHouses', redirectLogin, function (req, res) {
  // const username = req.session.username
  database.pools
    .then((pool) => {
      return pool.request()
        .query('SELECT H.houseId, houseName, U.userId, username, email, firstName, lastName, mobileNumber FROM BillCleave.Houses H JOIN BillCleave.UserHouseRelation UHR ON H.houseId = UHR.houseId JOIN BillCleave.Users U ON U.userId = UHR.userId')
    })
    .then(result => {
      res.json(result.recordset)
    })
    .catch(err => {
      console.log(err)
    })
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
    .catch(err => {
      console.log(err)
    })
})
router.get('/api/userHouses', redirectLogin, function (req, res) {
  // const username = req.session.username
  database.pools
    .then((pool) => {
      return pool.request()
        .query('SELECT H.houseId, houseName, U.userId, username, email, firstName, LastName, mobileNumber FROM BillCleave.Houses H JOIN BillCleave.UserHouseRelation UHR ON H.houseId = UHR.houseId JOIN BillCleave.Users U ON U.userId = UHR.userId')
    })
    .then(result => {
      res.json(result.recordset)
    })
    .catch(err => {
      console.log(err)
    })
})

router.get('/api/houseTransactions', redirectLogin, function (req, res) {
  // const username = req.session.username
  const query1 = 'SELECT transId, u1.userId AS authorId, u1.username AS authorUsername,'
  const query2 = 'u1.email AS authorEmail, u2.userId AS receiptId, u2.username AS receiptUsername, '
  const query3 = 'u2.email AS receiptEmail, transType, transService, amount, H.houseId, houseName, transStatus FROM BillCleave.Users u1 JOIN '
  const query4 = 'BillCleave.Transactions T ON u1.userId = T.userId LEFT JOIN BillCleave.Users u2 ON u2.userId = T.memberId JOIN BillCleave.Houses H ON H.houseId = T.houseId'
  database.pools
    .then((pool) => {
      return pool.request()
        .query(query1 + query2 + query3 + query4)
    })
    .then(result => {
      res.json(result.recordset)
    })
    .catch(err => {
      console.log(err)
    })
})

router.post('/api/makePayment', redirectLogin, function (req, res) {
  const transId = req.body.paymentId
  database.pools
    .then((pool) => {
      return pool.request()
        .query('UPDATE BillCleave.Transactions SET transStatus = \'pending\' WHERE transId = \'' + parseInt(transId) + '\'')
    })
    .then(result => {
      database.pools
        .then((pool) => {
          return pool.request()
            .query('SELECT * FROM BillCleave.Transactions WHERE transId = \'' + parseInt(transId) + '\'')
        })
        .then(result => {
          const trans = result.recordset[0]
          database.pools
            .then((pool) => {
              return pool.request()
                .query('INSERT INTO BillCleave.Transactions  (userId, transType, memberId, transService, amount, houseId,transStatus) VALUES (\'' + trans.memberId + '\' , \'payment\' , \'' + trans.userId + '\', \'' + trans.transService + '\', \'' + Math.abs(trans.amount) + '\' , \'' + trans.houseId + '\' , \'none\')')
            })
            .then(result => {
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          console.log(err)
        })
    })
    .catch(err => {
      console.log(err)
    })
  res.redirect('/login/user/houseTransactions')
})

router.post('/api/approvePayment', redirectLogin, function (req, res) {
  const transId = req.body.approvalId
  database.pools
    .then((pool) => {
      return pool.request()
        .query('UPDATE BillCleave.Transactions SET transStatus = \'paid\' WHERE transId = \'' + parseInt(transId) + '\'')
    })
    .then(result => {
      console.log('Done')
    })
    .catch(err => {
      console.log(err)
    }) 
  res.redirect('/login/user/houseTransactions')
})

router.post('/api/addTransaction', redirectLogin, function (req, res) {
  const { houseName, service, amount } = req.body
  const userId = req.session.userId
  database.pools
    .then((pool) => {
      return pool.request()
        .query('INSERT INTO BillCleave.Transactions  (userId, transType, transService, amount, houseId, transStatus) SELECT \'' + userId + '\',\'expense\',\'' + service + '\', \'' + parseInt(amount) + '\', houseId, \'none\'  From [BillCleave].[Houses] where houseName = \'' + houseName + '\'')
    })
    .then(result => {
      console.log('adding main')
      database.pools
        .then((pool) => {
          return pool.request()
            .query('SELECT H.houseId, houseName, U.userId, username, email FROM BillCleave.Houses H JOIN BillCleave.UserHouseRelation UHR ON H.houseId = UHR.houseId JOIN BillCleave.Users U ON U.userId = UHR.userId')
        })
        .then(result => {
          const houseMembers = HouseFns.getExpenseTransactions(result.recordset, houseName, amount, userId)
          houseMembers.forEach(member => {
            database.pools
              .then((pool) => {
                return pool.request()
                  .query('INSERT INTO BillCleave.Transactions  (userId, transType, memberId, transService, amount, houseId,transStatus) VALUES (\'' + userId + '\' , \'debit\' , \'' + member.userId + '\', \'' + service + '\', \'' + Math.abs(member.amount) + '\' , \'' + member.houseId + '\' , \'outstanding\')')
              })
              .then(result => {

              })
              .catch(err => {
                console.log(err)
              })
          })
        })
        .catch(err => {
          console.log(err)
        })
    })
    .catch(err => {
      console.log(err)
    })

  res.redirect('/login/user/houseTransactions')
})

router.post('/api/addMember', redirectLogin, function (req, res) {
  const houseName = req.body.houseName
  const email = req.body.user
  database.pools
    .then((pool) => {
      return pool.request()
        .query('SELECT * FROM BillCleave.Users')
    })
    .then(result => {
      if (loginCkeck.isRegistered(result.recordset, email)) {
        const User = loginCkeck.getUser(result.recordset, email)
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

                    .query('INSERT INTO BillCleave.UserHouseRelation (userId , houseId) VALUES  (\'' + User.userId + '\', \'' + houseId + '\')')
                })
                .catch(err => {
                  console.log(err)
                })
            }
          })
          .catch(err => {
            console.log(err)
          })

        res.redirect('/login/user/manageHouses')
      } else {
        res.status(400).send('user or housen Name does not exist, please choose different names')
      }
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

              .query('DELETE FROM BillCleave.UserHouseRelation WHERE userId = \'' + userId + '\'  AND houseId =\'' + houseId + '\'')
          })
          .catch(err => {
            console.log(err)
          })
        database.pools
          .then((pool) => {
            return pool.request()

              .query('DELETE FROM BillCleave.Houses WHERE  houseId =\'' + houseId + '\'')
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

router.post('/api/removeUser', redirectLogin, function (req, res) {
  const houseName = req.body.houseName1
  const email = req.body.user
  database.pools
    .then((pool) => {
      return pool.request()
        .query('SELECT * FROM BillCleave.Users')
    })
    .then(result => {
      if (loginCkeck.isRegistered(result.recordset, email)) {
        const User = loginCkeck.getUser(result.recordset, email)
        database.pools
          .then((pool) => {
            return pool.request()
              .query('SELECT * FROM BillCleave.Houses')
          })
          .then(result => {
            const houseId = HouseFns.getHouseId(result.recordset, houseName)

            database.pools
              .then((pool) => {
                return pool.request()

                  .query('DELETE FROM BillCleave.UserHouseRelation WHERE userId = \'' + User.userId + '\'  AND houseId =\'' + houseId + '\'')
              })
              .catch(err => {
                console.log(err)
              })
          })
        res.redirect('/login/user/manageHouses')
      } else {
        res.status(400).send('user not part of the house, please choose a different name')
      }
    })
    .catch(err => {
      console.log(err)
    })
})
module.exports = router
