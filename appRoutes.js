const path = require('path')
const router = require('express').Router()

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'default.html'))
})

router.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'about.html'))
})

router.get('/signUp', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'signUp.html'))
})
module.exports = router
